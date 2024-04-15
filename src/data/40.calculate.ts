import { TExerciseData } from "@/types";

export default {
  prevRoute: "30-hello-ao",
  route: "40-calculate",
  nextRoute: "50-variables",
  title: "Let's Calculate!",
  content: `
Just like we printed something before, we can also do mathematical operations on AO using LUA

---
# TASK

Your task is to find out the solution of the following equation:

~~~
(6×7)-(12÷2)+(9×2)-12
~~~

---

Hint: Just type this expression with code compatible characters
`,
  defaultCode: "1+1",
  expectedResult: `42`,
  runLua: false,
} as TExerciseData;
