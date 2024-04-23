"use client";

import data from "@/data";
import Exercise from "@/components/exercise";
import { TExerciseData } from "@/types";
import { GetStaticPathsContext, GetStaticPropsContext } from "next";

export default function ExercisePage({ excercise }: { excercise: TExerciseData }) {
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
