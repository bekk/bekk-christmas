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
  if (!input.name) {
    errors.name = "Name is required";
  }
  if (!input.email) {
    errors.email = "Email is required";
  } else if (!EmailValidator.validate(input.email)) {
    errors.email = "Email is invalid";
  }
  return { hasErrors: Object.keys(errors).length > 0, errors };
};

type SignUpForNewsletterArgs = {
  email: string;
  name: string;
};
const signUpForNewsletter = async ({
  name,
  email,
}: SignUpForNewsletterArgs) => {
  const response = await fetch(
    "https://connect.mailerlite.com/api/subscribers",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        fields: {
          name,
        },
        // These are the group IDs from MailerLite
        // for weekly and daily newsletters, respectively
        groups: ["70574898356946087", "70574890549249837"],
        status: "active",
      }),
    }
  );
  return response.ok;
};
