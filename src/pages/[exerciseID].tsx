"use client";

import { useRouter } from "next/router";
import data from "@/data";
import Exercise from "@/components/exercise";
import exp from "constants";
import { TExerciseData } from "@/types";
import { GetStaticPathsContext, GetStaticPropsContext } from "next";

export default function ExercisePage({
  excercise,
}: {
  excercise: TExerciseData;
}) {
  // const router = useRouter();
  // const exerciseID = router.query.exerciseID as string;

  // if (!exerciseID) return <div>Loading...</div>;
  // if (!Object.keys(data).includes(exerciseID)) router.push("/");

  // const exercise = data[exerciseID];

  return <Exercise data={excercise} />;
}

export async function getStaticPaths(context: GetStaticPathsContext) {
  return {
    paths: Object.keys(data).map((exerciseID) => ({ params: { exerciseID } })),
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const exerciseID = context.params?.exerciseID as string;
  const excercise = data[exerciseID];

  return {
    props: {
      excercise,
    },
  };
}
