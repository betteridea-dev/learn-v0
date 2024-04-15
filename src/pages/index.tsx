import data from "@/data";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-3">
      <div className="text-3xl">Welcome to Learn AO</div>
      <div className="py-2">
        These are a series of interactive exercises you can do to learn how to develop on AO step by step
      </div>
      <div className="grid grid-cols-4 gap-2">
        {Object.keys(data).map((e: string, _) => (
          <Button
            key={_}
            variant="outline"
            className="min-w-[269px] font-mono p-10 relative"
            onClick={() => router.push(`/${data[e].route}`)}
          >
            <div className="absolute top-2 left-3">{_ + 1}</div>
            {data[e].title}
          </Button>
        ))}
      </div>
    </div>
  );
}
