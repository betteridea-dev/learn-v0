import { TExerciseData } from "@/types";

export default {
  prevRoute: "40-calculate",
  route: "50-variables",
  nextRoute: "60-messaging",
  title: "Variables 📦",
  content: `
Variables are used to store data that can be used later in the program.

To declare a variable, you need to use the \`=\` operator. The \`=\` operator assigns a value to a variable.

- **Name**: The Name is the name of the variable.

Here is an example of how to declare a variable:

~~~
Name = "Melon Musk"
~~~

In this example, the variable Name is assigned the value "Melon Musk".

---

# TASK

Your task is to fix the variable Name so that it contains the correct name "Elon Musk" and then print it

---
`,
  defaultCode: `Name = "Melon Musk"
return Name`,
  expectedResult: `Elon Musk`,
  runLua: false,
} as TExerciseData;
