import { TExerciseData } from "@/types";

export default {
  route: "",
  title: "",
  content: `# Welcome Human 👋`,
  defaultCode: `print("Sample")`,
  expectedResult: `Sample`,
  allowNext: true,
  nextRoute: "1-connect-wallet",
  prevRoute: "#",
} as TExerciseData;
