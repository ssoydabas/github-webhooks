import express, { Request, Response } from "express";
import { exec } from "child_process";

const router = express.Router();

router.post("/", (req: Request, res: Response) => {
  const event = req.headers["x-github-event"];
  console.log(" ");
  console.log(" ");
  console.log(" ");
  console.log("Github event", event);
  console.log(" ");
  console.log(" ");
  console.log(" ");
  console.log(`Received GitHub event: ${event}`);

  const repository = req.body.repository.full_name;
  console.log(" ");
  console.log(" ");
  console.log(" ");
  console.log(repository);
  console.log(" ");
  console.log(" ");
  console.log(" ");

  // Execute a bash script when a push event is received
  // if (event === "push") {
  //   exec("./deploy.sh", (error, stdout, stderr) => {
  //     if (error) {
  //       console.error(`Error executing script: ${error}`);
  //       return res.status(500).send("Script execution failed");
  //     }
  //     console.log(`Script output: ${stdout}`);
  //     console.error(`Script error output: ${stderr}`);
  //     res.status(200).send("Script executed successfully");
  //   });
  // } else {
  //   res.status(200).send("Event received");
  // }
  res.status(200).send("Event received");
});

export default router;
