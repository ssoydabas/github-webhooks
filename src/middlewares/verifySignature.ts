import { Request, Response } from "express";
import crypto from "crypto";
import { githubWebhookSecret } from "../config";

export const verifySignature = (
  req: Request,
  res: Response,
  buf: Buffer,
  encoding: string
) => {
  const signature = req.headers["x-hub-signature-256"] as string;
  if (!signature) {
    console.error("Signature header missing");
    res.status(401).send("Signature header missing");
    return;
  }

  const hmac = crypto.createHmac("sha256", githubWebhookSecret);
  hmac.update(buf);
  const expectedSignature = `sha256=${hmac.digest("hex")}`;

  if (signature !== expectedSignature) {
    console.error("Invalid signature");
    res.status(401).send("Invalid signature");
  } else {
    console.log("Signature verified");
  }
};
