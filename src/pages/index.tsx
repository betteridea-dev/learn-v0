import data from "@/data";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Navbar />

      <div className="container min-h-[calc(100vh-92px)] flex flex-col items-center justify-center gap-3 p-3">
        <div className="max-w-screen-xl p-20 flex flex-col gap-12 justify-center items-center text-center">
          <h1 className="text-7xl font-bold">Hands-on learning for everyone</h1>

          <div className="py-2 max-w-md text-[#3F3F3F]">
            Understand what ao offers, and crack Lua, all without a wallet
            connection.
          </div>
        </div>

        <div className="h16"></div>

        <div className="flex flex-row flex-wrap justify-center gap-2">
          {Object.keys(data).map((e: string, _) => (
            <Button
              key={_}
              variant="outline"
              className="w-[269px] font-mono p-10 relative"
              onClick={() => router.push(`/${data[e].route}`)}
            >
              <div className="absolute top-2 left-3">{_ + 1}</div>
              {data[e].title}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}
