import Exercise from "@/components/exercise";
import { TExerciseData } from "@/types";

const exerciseData: TExerciseData = {
  content: `
# Hello AO!

Your goal is to modify the lua code from \`print("Hello World")\` to \`print("Hello AO!")\` and run it using the process ID you created`,
  defaultCode: `--change this
print("Hello World")`,
  expectedResult: `Hello AO!`,
};

export default function Home() {
  return <Exercise data={exerciseData} />;
}
