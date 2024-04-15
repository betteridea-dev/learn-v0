import { TExerciseData } from "@/types";

export default {
  prevRoute: "20-spawn-process",
  route: "30-hello-ao",
  nextRoute: "40-calculate",
  title: "Hello AO! 🤩",
  content: `

In the previous exercise, you spawned a process. Now it's time to write some code for it.

---
# TASK

Your goal is to modify the lua code from \`print("Hello World")\` to \`print("Hello AO!")\` and run it.

---
`,
  defaultCode: `--change this
print("Hello World")`,
  expectedResult: "Hello AO!",
  runLua: false,
} as TExerciseData;
