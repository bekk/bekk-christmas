import { handleAuth, handleCallback, Session } from "@auth0/nextjs-auth0";
import { SanityDocument } from "@sanity/client";
import { createHash } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import { sanityConfig } from "../../../utils/sanity/config";
import { authClient, writeClient } from "../../../utils/sanity/sanity.server";

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error) {
      console.error("Error while authenticating", error);
      res.status(500).json({
        message: "Error while authenticating. See server logs for details",
      });
    }
  },
});

const afterCallback = async (_: NextApiRequest, res: NextApiResponse, session: Session) => {
  try {
    const { user: auth0User } = session;
    const existingSanityUser = await getSanityUser();
    console.info(
      `User ${auth0User.email} ${existingSanityUser ? "is already" : "was not"} logged into Sanity`
    );

    // If you're already logged in, and your sanity user stems from your Bekk user
    // we're going to just log you in to Sanity.
    // This will be what happens most of the time.
    // TODO: Is this safe, given the context?
    if (existingSanityUser?.provider === "external") {
      console.info(
        `User ${auth0User.email} had a valid session in Sanity, redirecting to the Studio`
      );
      res.writeHead(302, { Location: process.env.SANITY_STUDIO_URL });
      return session;
    }

    // If you get here, you're a Bekk user who hasn't logged in to Sanity before.
    // We're going to create a new author object in Sanity (or update the existing one)
    const sanityAuthor = await createOrUpdateAuthorInSanity(auth0User);

    // And then we're going to add the new user to the group,
    // if they're not already a member.
    await addUserToGroup(sanityAuthor._id);

    // And then we're going to get your "log in to Sanity" URL,
    // which will set the user's session cookie.
    const redirectUrl = await getEndUserClaimUrl(sanityAuthor, auth0User);

    res.writeHead(302, { Location: redirectUrl });
    return session;
  } catch (e) {
    console.error("Error while authenticating", e);
  }
};

async function getSanityUser() {
  try {
    const res = await fetch("https://api.sanity.io/v1/users/me", {
      credentials: "include",
    });
    if (res.status === 401) {
      return null;
    }
    return res.json();
  } catch (error) {
    return null;
  }
}

async function createOrUpdateAuthorInSanity(user: Session["user"]) {
  console.info("Checking if the author exists already", user);
  const existingAuthor = await getExistingAuthorFromSanity(user.name);
  if (existingAuthor) {
    console.info(
      `Found an existing author called ${user.name}. Updating it instead of creating a new one.`
    );
  }
  const authorId = existingAuthor ? existingAuthor._id : userIdFromEmail(user.email);
  const socialMediaLinks = existingAuthor?.socialMediaLinks ?? [];
  return createAuthorInSanity({ ...user, _id: authorId }, socialMediaLinks);
}

// TODO: The socialMediaLinks add-on is a crap way to do this.
// Review this code before merging
async function createAuthorInSanity(user: Session["user"], socialMediaLinks?: any[]) {
  try {
    return writeClient.createOrReplace({
      _type: "author",
      _id: user._id,
      fullName: "SANITY " + user.name, // TODO: Remove the prefix
      companyName: "Bekk",
      profilePicture: user.picture,
      socialMediaLinks,
    });
  } catch (error) {
    // If the user exists already, we'll just update their profile picture
    if (error.statusCode === 409) {
      console.log(`User ${user._id} already exists, updating the profile picture`);
      return writeClient
        .patch(user._id)
        .set({
          profilePicture: user.picture,
        })
        .commit();
    } else {
      throw error;
    }
  }
}

async function getExistingAuthorFromSanity(name: string) {
  const query = `*[_type == "author" && fullName == "${name}"]`;
  const result = await writeClient.fetch(query);
  return result.length ? result[0] : null;
}

const userIdFromEmail = (email: string) => {
  const hash = createHash("md5").update(email).digest("hex");
  return `e-${hash}`;
};

async function addUserToGroup(userId: string) {
  const group = await createGroupIfNotExists("bekker");
  const members = group.members || [];
  if (!members.includes(userId)) {
    console.info(`Adding user "${userId}" to group "${group._id}"`);
    return authClient
      .patch(group._id)
      .setIfMissing({ members: [] })
      .append("members", [userId])
      .commit();
  } else {
    console.info(`User "${userId}" is already a member of group "${group._id}".`);
  }
}

function createGroupIfNotExists(groupName: string) {
  console.info(`Creating group "${groupName}" if it does not yet exist`);
  return authClient.createIfNotExists({
    _id: `_.groups.${groupName}`,
    _type: "system.group",
    grants: [
      {
        path: "**",
        permissions: ["create", "read", "update", "history"],
      },
    ],
    members: [],
  });
}

async function getEndUserClaimUrl(sanityUser: SanityDocument, auth0User: Session["user"]) {
  console.info(`Creating a session for ${sanityUser._id}`);
  const dateIn24Hours = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const response = await fetch(
    `https://${sanityConfig.projectId}.api.sanity.io/${sanityConfig.apiVersion}/auth/thirdParty/session`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.SANITY_SESSION_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: sanityUser._id,
        userFullName: sanityUser.fullName,
        userEmail: auth0User.email,
        userImage: auth0User.picture,
        userRole: "editor",
        sessionExpires: dateIn24Hours.toISOString(),
        sessionLabel: "SSO",
      }),
    }
  );
  const json = await response.json();
  return `${json.endUserClaimUrl}?origin=${process.env.SANITY_STUDIO_URL}`;
}
