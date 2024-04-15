import { TExerciseData } from "@/types";

export default {
  prevRoute: "50-variables",
  route: "60-messaging",
  nextRoute: "70-my-inbox",
  title: "Sending Messages 💬",
  content: `
Now that you know how to print stuff, do basic calculations and make variables,
let's move on to the next step. In this exercise, you will learn how to send messages to a process.

To send a message, you need to use the \`Send\` function. The \`Send\` function takes a table containing data for whom and what to send.

- **Send**: The Send function is globally available in the aos interactive environment.
- **Target**: The Target field is a string containing the process ID of the process you want to send the message to.
- **Data**: The Data is the text message you want received by the receiving process. In this example, the message is "Hello World!".

Here is an example of how to send a message to a process:

~~~
Send({ Target = "process ID", Data = "Hello World!" })
~~~

---

# TASK

Your task is to send a message to yourself with the text "Hello World!".

Your own process ID is stored in the global variable \`ao.id\`.

You can either copy and paste the process ID as a string or use the global variable \`ao.id\` in Target.

---

`,
  defaultCode: `Send({
  Target = "process ID",
  Data = "Hello World!"
})`,
  expectedResult: {
    run: `Inbox[#Inbox]`,
    out: "Hello World!",
  },
  runLua: true,
  fromId: "SELF",
  validateTimestamp: true,
} as TExerciseData;
