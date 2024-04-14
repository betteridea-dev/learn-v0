"use client";

import { useRouter } from "next/router";
import data from "@/data";
import Exercise from "@/components/exercise";

export default function ExercisePage() {
  const router = useRouter();
  const exerciseID = router.query.exerciseID as string;

  if (!exerciseID) return <div>Loading...</div>;
  if (!Object.keys(data).includes(exerciseID)) router.push("/");

  const exercise = data[exerciseID];

  return <Exercise data={exercise} />;
}
