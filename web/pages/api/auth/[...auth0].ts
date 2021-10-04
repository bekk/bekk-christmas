import { handleAuth, handleCallback, Session } from "@auth0/nextjs-auth0";
import { SanityDocument } from "@sanity/client";
import { createHash } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import { sanityConfig } from "../../../utils/sanity/config";
import { authClient, writeClient } from "../../../utils/sanity/sanity.server";

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback: logIntoSanity });
    } catch (error) {
      console.error("Error while authenticating", error);
      res.status(500).json({
        message: "Error while authenticating. See server logs for details",
      });
    }
  },
});

type State = { returnTo: string };

const logIntoSanity = async (
  _: NextApiRequest,
  __: NextApiResponse,
  session: Session,
  state: State
) => {
  try {
    const { user: auth0User } = session;
    const existingSanityUser = await getSanityUser();
    console.info(
      `User ${auth0User.email} ${existingSanityUser ? "is already" : "was not"} logged into Sanity`
    );

    // If you're already logged in, and your sanity user stems from your Bekk user we're going to just log you in to Sanity.
    // This will be what happens most of the time.
    // TODO: Is this safe, given the context?
    if (existingSanityUser?.provider === "external") {
      console.info(
        `User ${auth0User.email} had a valid session in Sanity, redirecting to the Studio`
      );
      state.returnTo = process.env.SANITY_STUDIO_URL;
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
    state.returnTo = await getEndUserClaimUrl(sanityAuthor, auth0User);
    return session;
  } catch (e) {
    console.error("Error while authenticating", e);
  }
};

async function getSanityUser() {
  try {
    const res = await fetch(
      `https://${sanityConfig.projectId}.api.sanity.io/${sanityConfig.apiVersion}/users/me`,
      {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (res.status === 401) {
      return null;
    }
    const body = await res.json();
    console.log(res.status, body);

    // This endpoint returns an empty object if we're logged in.
    // We're going to check for that and return null if it's empty.
    return body?.id ? body : null;
  } catch (error) {
    return null;
  }
}

async function createOrUpdateAuthorInSanity(user: Session["user"]) {
  const existingAuthor = await getExistingAuthorFromSanity(user.name);
  if (existingAuthor) {
    console.info(`Found an existing author called ${user.name}. Updating it with newest data`);
  } else {
    console.info(`Could not find a matching author for ${user.name}. Creating it.`);
  }
  const authorId = existingAuthor ? existingAuthor._id : userIdFromEmail(user.email);
  const socialMediaLinks = existingAuthor?.socialMediaLinks ?? [];
  return createAuthorInSanity({
    id: authorId,
    name: user.name,
    imageUrl: user.picture,
    socialMediaLinks,
  });
}

type AuthorDetails = {
  id: string;
  name: string;
  imageUrl: string;
  socialMediaLinks: unknown[];
};
async function createAuthorInSanity(authorDetails: AuthorDetails) {
  try {
    return writeClient.createOrReplace({
      _type: "author",
      _id: authorDetails.id,
      fullName: authorDetails.name,
      companyName: "Bekk",
      profilePicture: authorDetails.imageUrl,
      socialMediaLinks: authorDetails.socialMediaLinks,
    });
  } catch (error) {
    // If the user exists already, we'll just update their profile picture
    if (error.statusCode === 409) {
      console.log(`User ${authorDetails.id} already exists, updating the profile picture`);
      return writeClient
        .patch(authorDetails.id)
        .set({
          profilePicture: authorDetails.imageUrl,
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
  }
}

function createGroupIfNotExists(groupName: string) {
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
  console.info(`Creating a session for ${auth0User.email}`);
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
