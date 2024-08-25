import express, { Request, Response } from "express";
import { exec } from "child_process";
import { appsToListen } from "../constants";

const router = express.Router();

router.post("/", (req: Request, res: Response) => {
  const event = req.headers["x-github-event"];
  const repository = req.body.repository.full_name;

  const isAppAvailable = appsToListen.includes(repository);
  if (!isAppAvailable) return res.status(401).send("App not available");
  const isPushEvent = event === "push";

  const repositoryName = repository.split("/")[1];

  if (isPushEvent) {
    exec(`../bash/deploy/${repositoryName}.sh`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing script: ${error}`);
        return res.status(500).send("Script execution failed");
      }
      console.log(`Script output: ${stdout}`);
      console.error(`Script error output: ${stderr}`);
      res.status(200).send("Script executed successfully");
    });
  } else {
    res.status(200).send(`${event} event received`);
  }
});

export default router;
