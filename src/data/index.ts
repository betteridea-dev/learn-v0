import { TExerciseData } from "@/types";

export default {
  "1-connect-wallet": require("@/data/1.connect-wallet").default,
  "2-spawn-process": require("@/data/2.spawn-process").default,
  "3-hello-ao": require("@/data/3.hello-ao").default,
  "4-calculate": require("@/data/4.calculate").default,
} as { [foo: string]: TExerciseData };
