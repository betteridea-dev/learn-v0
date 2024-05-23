import data from "@/data";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>LearnAO | Home</title>
      </Head>

      {/* <Navbar /> */}
      {/* min-h-[calc(100vh-92px)] */}

      <div className="min-h-[85vh] flex flex-col items-center justify-center bg-[#D2FFFA] text-[#008A79]">
        <Image
          src="/images/cloud.svg"
          height={50}
          width={350}
          alt=""
          className="absolute top-[10%] left-0"
        />

        <Image
          src="/images/sun.svg"
          height={106}
          width={215}
          alt=""
          className="absolute top-[10%] right-[5%]"
        />

        <div className="flex flex-col gap-2 items-center">
          <p className="py-2">Learn and build on ao, easy breezy</p>

          <h1 className="text-[160px] font-extrabold font-heading">learn ao</h1>

          <Button>Begin learning</Button>
        </div>

        {/* <div className="h-[200px]"></div> */}

        <Image
          src="/images/hero-bottom-left.svg"
          height={233}
          width={750}
          alt=""
          className="absolute bottom-[15vh] left-0"
        />

        <Image
          src="/images/hero-bottom-right.svg"
          height={291}
          width={221}
          alt=""
          className="absolute bottom-[calc(15vh-1px)] right-0"
        />
      </div>

      <div className="relative min-h-screen flex flex-col items-center gap-8 justify-center bg-[#008A79] text-[#D2FFFA]">
        <h3 className="text-3xl font-heading">Get started with basics. </h3>

        <div
          className="flex flex-row gap-4 max-w-screen-md bg-[#B2FFF6] p-4 rounded-md"
          style={{
            border: "2px solid #003C35",
            boxShadow: "0px 4px 0px 0px #003C35",
          }}
        >
          <div className="w-[494px] h-[380px] bg-[#003C35]"></div>
          <div className="w-[246px] h-[380px]"></div>
        </div>

        <Image
          src="/images/cattus.svg"
          height={124}
          width={52}
          alt=""
          className="absolute bottom-0 left-[8%]"
        />
        <Image
          src="/images/cattus.svg"
          height={62}
          width={26}
          alt=""
          className="absolute bottom-0 left-[16%]"
        />
      </div>

      <section className="bg-[#D2FFFA] text-[#454545] py-24">
        <div className="relative container">
          <div className="flex flex-row flex-wrap justify-center gap-2">
            {Object.keys(data).map((e: string, _) => (
              <Link href={`/${data[e].route}`} className="">
                <div
                  key={_}
                  className="w-[269px] h-full font-mono p-10 relative border border-[#008A79] rounded-md cursor-pointer hover:bg-gray-100"
                >
                  <div className="absolute top-2 left-3">{_ + 1}</div>
                  {data[e].title}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* <div className="h-16"></div> */}

      {/* <div className="flex flex-row flex-wrap justify-center gap-2">
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
        </div> */}
    </>
  );
}
