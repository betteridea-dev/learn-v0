"use client";

import data from "@/data";
import Exercise from "@/components/exercise";
import { TExerciseData } from "@/types";
import { GetStaticPathsContext, GetStaticPropsContext } from "next";
import Navbar from "@/components/navbar";

export default function ExercisePage({
  excercise,
}: {
  excercise: TExerciseData;
}) {
  return (
    <>
      <title suppressHydrationWarning>Learn AO | {excercise.title}</title>
      <Navbar />
      <Exercise data={excercise} />
    </>
  );
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
