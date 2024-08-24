import dotenv from "dotenv";

dotenv.config();

export const nodeEnv = process.env.NODE_ENV || "development";
export const port = process.env.PORT || 3000;
export const githubWebhookSecret =
  process.env.GITHUB_WEBHOOK_SECRET || "your-secret";
