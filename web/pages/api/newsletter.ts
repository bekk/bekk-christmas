import sendGridClient from "@sendgrid/client";
import * as EmailValidator from "email-validator";
import { NextApiHandler } from "next";

const newsletterHandler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { errors, hasErrors } = validateInput(req.body);
  if (hasErrors) {
    return res.status(400).json({ errors });
  }

  if (await signUpForNewsletter(req.body)) {
    return res.status(201).json({ message: "Thanks for subscribing" });
  }
  return res.status(500).json({ message: "Internal server error" });
};
export default newsletterHandler;

const validateInput = (input: Record<string, string>) => {
  const errors: Record<string, string> = {};
  if (!input.interval) {
    errors.interval = "Please choose an interval";
  } else if (!["weekly", "daily"].includes(input.interval)) {
    errors.interval =
      "I'll put you right on the naughtly list if you even try that again";
  }
  if (!input.email) {
    errors.email = "Please fill out an email";
  } else if (!EmailValidator.validate(input.email)) {
    errors.email = "Please fill out a valid email";
  }
  return { hasErrors: Object.keys(errors).length > 0, errors };
};

type SignUpForNewsletterArgs = {
  email: string;
  interval: "daily" | "weekly";
};
// These are the group IDs from SendGrid
const WEEKLY_GROUP_ID = "e73a3126-37a7-4f9f-8e3b-10fa0f4ce100";
const DAILY_GROUP_ID = "8bb548e6-5e3e-4d17-a219-733e77e863a8";

sendGridClient.setApiKey(process.env.SENDGRID_API_KEY);

const signUpForNewsletter = async ({
  email,
  interval,
}: SignUpForNewsletterArgs) => {
  const [req] = await sendGridClient.request({
    url: "/v3/marketing/contacts",
    method: "PUT",
    body: {
      list_ids: [interval === "daily" ? DAILY_GROUP_ID : WEEKLY_GROUP_ID],
      contacts: [
        {
          email,
        },
      ],
    },
  });
  return req.statusCode === 202;
};
