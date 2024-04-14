import { TExerciseData } from "@/types";

export default {
  route: "3-hello-ao",
  title: "Hello AO!",
  content: `
Your goal is to modify the lua code from \`print("Hello World")\` to \`print("Hello AO!")\` and run it using the process ID you created`,
  defaultCode: `--change this
print("Hello World")`,
  expectedResult: "Hello AO!",
  nextRoute: "4-calculate",
  prevRoute: "2-spawn-process",
} as TExerciseData;
