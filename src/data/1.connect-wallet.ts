import { TExerciseData } from "@/types";

export default {
  route: "1-connect-wallet",
  title: "Welcome Human 👋",
  content: `
In your first exercise, you will be connecting your wallet to this web application.

This will allow you to interact with the blockchain and perform various tasks.

## TASK

Your task is to click on the Connect button on the top right of your screen,
this will open a popup of the ArConnect wallet, where you need to type your
password and allow the wallet to connect to this page.
`,
  defaultCode: `-- You will be writing lua code here soon ;)`,
  expectedResult: ``,
  allowNext: true,
  nextRoute: "2-spawn-process",
  prevRoute: "/",
} as TExerciseData;
