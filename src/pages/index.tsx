import data from "@/data";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Toaster } from "@/components/ui/toaster"
import othentLogo from "@/assets/othent.png"
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast"
import { DiscordLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import learnAOSVG from "@/assets/learn-ao.svg"

export default function Home() {
  const { toast } = useToast()

  function joinWaitlist() {
    const email = (document.getElementById("email") as HTMLInputElement).value;
    console.log(email);
    // validate email
    if (email === "") {
      return toast({ title: "Please enter an email address" })
    }
    // check string is an email
    const regex = /\S+@\S+\.\S+/;
    if (!regex.test(email)) {
      return toast({ title: "Please enter a valid email address" })
    }

    fetch('https://sheetdb.io/api/v1/2pxxi2846am8j', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: [
          {
            'email': email,
          }
        ]
      })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        toast({ title: "Successfully joined waitlist", description: "We will notify you as soon as we launch" })
      });

  }

  return (
    <>
      <Head>
        <title>LearnAO | Home</title>
      </Head>
      <Toaster />


      {/* <Navbar /> */}
      {/* min-h-[calc(100vh-92px)] */}

      <div className="h-screen flex flex-col items-center justify-center bg-[#D2FFFA] text-[#008A79]">
        <Image draggable={false}
          src="/images/cloud.svg"
          height={50}
          width={350}
          alt=""
          className="absolute top-[10%] left-0 w-1/3 max-w-[350px] animate-left-right"
        />

        <Image draggable={false}
          src="/images/sun.svg"
          height={106}
          width={215}
          alt=""
          className="absolute top-[10%] right-[5%] w-1/3 max-w-[215px]"
        />

        <div className="flex flex-col gap-2 items-center">
          <p className="py-2 text-md md:text-xl">Learn and build on ao, easy breezy</p>

          {/* <div className="text-7xl md:text-9xl font-extrabold font-heading drop-shadow-lg">Learn AO</div> */}
          <Image src={learnAOSVG} draggable={false} width={600} height={300} alt="Learn AO" className="drop-shadow-lg px-2" />
          <p className="py-2 text-md md:text-xl">Launching soon</p>

          {/* <Button size="lg">Connect
            <Image src={othentLogo} width={35} height={35} alt="othent" className="ml-1.5" />
          </Button> */}
          {/* <Button size="lg">Start learning</Button> */}
          <div className="flex gap-2 w-full mx-auto p-1 items-center justify-center">
            <Input placeholder="Email address" id="email" type="email" className="block bg-white text-black z-20 w-[60%]" />
          </div>
          <Button className="z-10 text-[#D2FFFA] bg-[#008A79] hover:-translate-y-1 hover:shadow-lg active:translate-y-1 transition-all duration-250 animate-bounce" onClick={joinWaitlist}>Join waitlist</Button>

          <div className="absolute left-3 top-3 flex gap-2.5">
            <Link href="https://discord.gg/nm6VKUQBrA" target="_blank" className=" cursor-pointer z-50">
              <div className="flex gap-2 items-center z-50 drop-shadow-lg justify-left font-bold">
                <DiscordLogoIcon className="w-10 h-10 bg-[#008A79] rounded-md text-[#D2FFFA] p-1" />
              </div>
            </Link>
            <Link href="https://twitter.com/betteridea_dev" target="_blank" className=" cursor-pointer z-50 font-bold">
              <div className="flex gap-2 items-center drop-shadow-lg z-50 justify-center">
                <TwitterLogoIcon className="w-10 h-10 bg-[#008A79] rounded-md text-[#D2FFFA] p-1" />
              </div>
            </Link>
          </div>
          <Link href="https://ide.betteridea.dev" target="_blank" className="absolute mx-auto bottom-5 z-30">
            <Button className="z-30 bg-[#008A79] text-[#D2FFFA]" size="sm">Powered By BetterIDEa</Button>
          </Link>
        </div>

        {/* <div className="h-[200px]"></div> */}

        <Image draggable={false}
          src="/images/hero-bottom-left.svg"
          height={233}
          width={750}
          alt=""
          className="absolute bottom-0 left-0"
        />

        <Image draggable={false}
          src="/images/hero-bottom-right.svg"
          height={291}
          width={221}
          alt=""
          className="absolute bottom-0 right-0"
        />
      </div>

      {/* <div className="relative min-h-screen flex flex-col items-center gap-8 justify-center bg-[#008A79] text-[#D2FFFA]">
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
      </div> */}

      {/* <section className="bg-[#D2FFFA] text-[#454545] py-24">
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
      </section> */}

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
