import { TExerciseData } from "@/types";

export default {
  "10-connect-wallet": require("@/data/10.connect-wallet").default,
  "20-spawn-process": require("@/data/20.spawn-process").default,
  "30-hello-ao": require("@/data/30.hello-ao").default,
  "40-calculate": require("@/data/40.calculate").default,
  "50-variables": require("@/data/50.variables").default,
  "60-messaging": require("@/data/60.messaging").default,
  "70-morpheus": require("@/data/70.morpheus").default,
  "80-my-inbox": require("@/data/80.inbox").default,
} as { [foo: string]: TExerciseData };
