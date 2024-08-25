import { Request, Response } from "express";
import { githubWebhookSecret } from "../config";

export const verifySignature = (
  req: Request,
  res: Response,
  buf: Buffer,
  encoding: string
) => {
  const authorization = req.headers["authorization"] as string;
  if (!authorization) {
    console.error("Authorization header missing");
    res.status(401).send("Authorization header missing");
    return;
  }
  const expectedToken = `Bearer ${githubWebhookSecret}`;
  if (authorization !== expectedToken) {
    console.error("Invalid token");
    res.status(401).send("Invalid token");
  } else {
    console.log("Token verified");
  }
};
