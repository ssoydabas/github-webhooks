import { port } from "./config";
import express from "express";
import bodyParser from "body-parser";

import { verifySignature } from "./middlewares/verifySignature";
import githubWebhook from "./handlers/githubWebhook";

const app = express();

app.use(bodyParser.json({ verify: verifySignature }));

app.use("/", githubWebhook);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
