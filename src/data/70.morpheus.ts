import { TExerciseData } from "@/types";

export default {
  prevRoute: "60-messaging",
  route: "70-morpheus",
  nextRoute: "80-my-inbox",
  title: "Red pill or blue pill? 💊",
  content: `

*"This is your last chance. After this, there is no turning back. You take the blue pill -
the story ends, you wake up in your bed and believe whatever you want to believe. You take
the red pill - you stay in Wonderland and I show you how deep the rabbit hole goes"*

---

# TASK

1. Use the process ID provided below and store it as a variable called "Morpheus".

\`wu_tAUDUveetQZpcN8UxHt51d9dyUkI4Z-MfQV8LnUU\`

2. Send a message to Morpheus

\`Send({ Target = Morpheus, Data = "Morpheus?" })\`

3. You will receive a reply from Morpheus. Print the message.

---

`,
  defaultCode: `-- Declare the variable Morpheus below this line
Morpheus = ...

Send({
  Target = Morpheus,
  Data = "Wake up Neo!"
})

-- After you get a message from Morpheus
-- Comment the above code and run the following:
-- Inbox[#Inbox].Data
`,
  expectedResult: "I am here. You are finally awake. Are you ready to see how far the rabbit hole goes?",
  fromId: "SELF",
  validateTimestamp: false,
} as TExerciseData;
