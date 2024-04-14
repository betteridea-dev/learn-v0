import { TExerciseData } from "@/types";

export default {
  route: "3-hello-ao",
  title: "Hello AO!",
  content: `

In the previous exercise, you spawned a process. Now it's time to write some code for it.

# TASK

Your goal is to modify the lua code from \`print("Hello World")\` to \`print("Hello AO!")\` and run it.`,
  defaultCode: `--change this
print("Hello World")`,
  expectedResult: "Hello AO!",
  nextRoute: "4-calculate",
  prevRoute: "2-spawn-process",
} as TExerciseData;
