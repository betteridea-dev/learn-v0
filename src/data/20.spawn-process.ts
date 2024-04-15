import { TExerciseData } from "@/types";

export default {
  prevRoute: "10-connect-wallet",
  route: "20-spawn-process",
  nextRoute: "30-hello-ao",
  title: "Time to bootup a process!",
  content: `
A process in AO is like a smart contract that's alive.

All the lua code that you write will be executed on your process.

Processes can interact with each other by sending messages, which we will try out in upcoming exercises

---
# TASK

Your task is to click on the spawn process button on the top and wait for a process id to show up

Once the process id appears, you may move to the next exercise

---
`,
  defaultCode: `-- You will be writing lua code here soon ;)`,
  expectedResult: ``,
  runLua: false,
  allowNext: true,
} as TExerciseData;
