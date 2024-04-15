import { TExerciseData } from "@/types";

const simpleCheckOutput = {
  prevRoute: "00-name",
  route: "10-name",
  nextRoute: "20-name",
  title: "Welcome Human 👋",
  content: `Markdown **description**`,
  defaultCode: `print("Sample")`,
  expectedResult: `Sample`,
  runLua: false, // keep this false whenever expected result is not an object
  allowNext: true,
} as TExerciseData;

const checkLuaResult = {
  prevRoute: "10-name",
  route: "20-name",
  nextRoute: "30-name",
  title: "Welcome Human 👋",
  content: `Markdown **description**`,
  defaultCode: `print("Sample")`,
  expectedResult: {
    run: "return Inbox[#Inbox].Data", // Runs this
    out: "Hello World", // Checks if the output of run is equal to this, omit this if you want to compare with the output of the code the user has written
  },
  runLua: true,
  allowNext: true,
} as TExerciseData;
