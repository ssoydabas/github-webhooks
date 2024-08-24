import express, { Request, Response } from "express";
import crypto from "crypto";
import { githubWebhookSecret } from "../config";

export const verifySignature = (
  req: Request,
  res: Response,
  buf: Buffer,
  encoding: string
) => {
  const signature = req.headers["x-hub-signature-256"] as string;
  console.log(" ");
  console.log(" ");
  console.log(" ");
  console.log(signature);
  console.log(" ");
  console.log(" ");
  console.log(" ");
  const hmac = crypto.createHmac("sha256", githubWebhookSecret);
  hmac.update(buf);
  const expectedSignature = `sha256=${hmac.digest("hex")}`;

  if (signature !== expectedSignature) {
    throw new Error("Invalid signature");
  }
};
