import data from "@/data";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-3">
      <div className="text-3xl">Exercises:</div>
      {/* <div className="grid grid-cols-12 gap-2 aspect-square"> */}
      {Object.keys(data).map((e: string, _) => (
        <Button
          key={_}
          variant="outline"
          className="min-w-[269px]"
          onClick={() => router.push(`/${data[e].route}`)}
        >
          {/* {_ + 1} */}
          {data[e].title}
        </Button>
      ))}
      {/* </div> */}
    </div>
  );
}
