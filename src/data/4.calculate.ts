import { TExerciseData } from "@/types";

export default {
  route: "4-calculate",
  title: "Let's Calculate!",
  content: `
Just like we printed something before, we can also do mathematical operations on AO using LUA

---
# TASK

Your task is to find out the solution of the following equation:

~~~
(6×7)−(12÷2)+(9×2)-12
~~~

---

Hint: Just type this expression with code compatible characters
`,
  defaultCode: "1+1",
  expectedResult: `42`,
  nextRoute: "5-messaging",
  prevRoute: "3-hello-ao",
} as TExerciseData;
