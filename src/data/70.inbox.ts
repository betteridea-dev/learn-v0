import { TExerciseData } from "@/types";

export default {
  nextRoute: "/",
  route: "70-my-inbox",
  prevRoute: "60-messaging",
  title: "Checking Inbox 📥",
  content: `
So we know how to send messages, but how do we check what messages we have received?

In AOS you can check your inbox messages by using the \`Inbox\` variable.

---

# TASK

Your task is to check your inbox and print the latest message Data.

---

#### EXTRA

1. Total messages in Inbox: \`#Inbox\`
2. Latest message in Inbox: \`Inbox[#Inbox]\`
3. Print in an easy to read format: \`Dump(Inbox)\`

`,
  defaultCode: `Inbox`,
  expectedResult: { run: `Inbox[#Inbox]` },
  runLua: true,
  fromId: "SELF",
  validateTimestamp: false,
} as TExerciseData;
