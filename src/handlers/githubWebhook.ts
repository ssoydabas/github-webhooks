import express, { Request, Response } from "express";
import { exec } from "child_process";
import { appsToListen } from "../constants";
import path from "path";

const router = express.Router();

router.post("/", (req: Request, res: Response) => {
  const repository = req.body.repository.full_name;

  const isAppAvailable = appsToListen.includes(repository);
  if (!isAppAvailable) return res.status(401).send("App not available");

  const repositoryName = repository.split("/")[1];
  if (repositoryName === "")
    return res.status(401).send("Repository name is empty");

  const scriptPath = path.resolve(
    __dirname,
    "../../bash/deploy",
    `${repositoryName}.sh`
  );

  exec(scriptPath, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error}`);
      return res.status(500).send("Script execution failed");
    }
    console.log(`Script output: ${stdout}`);
    console.error(`Script error output: ${stderr}`);
    res.status(200).send("Script executed successfully");
  });
});

export default router;
