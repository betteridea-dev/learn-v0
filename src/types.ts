export interface TExerciseData {
  route: string;
  nextRoute: string;
  prevRoute: string;
  title: string;
  content: string;
  defaultCode: string;
  expectedResult: string;
  allowNext?: boolean;
}
