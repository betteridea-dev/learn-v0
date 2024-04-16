export interface TExpectedResult {
  run: string;
  out: string;
}

export interface TExerciseData {
  route: string;
  nextRoute: string;
  prevRoute: string;
  title: string;
  content: string;
  defaultCode: string;
  expectedResult: string | TExpectedResult
  allowNext?: boolean;
  runLua?: boolean;
  fromId?: "SELF" | string;
  validateTimestamp?: boolean;
}
