"use client";

import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { TExerciseData, TExpectedResult } from "@/types";
import Editor from "@monaco-editor/react";
import { connect, createDataItemSigner } from "@permaweb/aoconnect";
import { PlayIcon, ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";
import Ansi from "ansi-to-react";
import { ScrollArea } from "./ui/scroll-area";
import { useLocalStorage } from "usehooks-ts";
import { runLua, spawnProcess, getResults } from "@/lib/ao-vars";
import { GraphQLClient, gql } from "graphql-request";



declare global {
  interface Window {
    arweaveWallet: any;
    othentWallet: any;
  }
}

const markdownPlugins = [remarkGfm];

export default function Exercise({ data }: { data: TExerciseData }) {
  const [wallet, setWallet] = useState<any>(undefined);
  const [running, setRunning] = useState(false);
  const [currentCode, setCurrentCode] = useState(data.defaultCode);
  const [outputText, setOutputText] = useState("...");
  const [passed, setPassed] = useState(false);
  const [address, setAddress] = useState("");
  const [processId, setProcessId] = useState("");
  const [spawning, setSpawning] = useState(false);
  const [intrvl, setIntrvl] = useState<any>(0);
  const [firstRun, setFirstRun] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [autoconnect, setAutoconnect] = useLocalStorage("autoconnect", false, { initializeWithValue: true });

  const router = useRouter();

  // useEffect(() => {
  //   if (!processId) return;
  //   if (!window) return;
  //   clearInterval(intrvl);
  //   setIntrvl(
  //     setInterval(async () => {
  //       await connect()
  //         .results({
  //           process: processId,
  //           from: localStorage.getItem("cursor") || "",
  //           sort: "DESC",
  //           limit: 25,
  //         })
  //         .then((r) => {
  //           // console.log("checking inbox", r.edges);
  //           if (r.edges.length > 0) {
  //             r.edges.forEach((e: any) => {
  //               const isPrint = e.node.Output.print;
  //               const d = e.node.Output.data;
  //               // console.log(d);
  //               isPrint && localStorage.getItem("cursor") && typeof d == "string" && toast(<Ansi className="bg-transparent p-1">{d.replace("34m", "37m")}</Ansi>);
  //               // if (!isPrint) {
  //               //   try {
  //               //     const messageData = e.node.Messages[0].Data;
  //               //     console.log(messageData);
  //               //   } catch {
  //               //     console.log("No message data");
  //               //   }
  //               // }
  //             });
  //             window && localStorage.setItem("cursor", r.edges[0].cursor);
  //           }
  //         });
  //     }, 2500),
  //   );
  //   return () => clearInterval(intrvl);
  // }, [processId]);

  useEffect(() => {
    // RESET STUFF ON EXERCISE CHANGE
    // console.log(router.query);
    setCurrentCode(data.defaultCode);
    setPassed(false);
    setFirstRun(true);
    setOutputText("...");
  }, [router.query]);

  async function connectWallet() {
    if (!window) return
    const arw = require("@othent/kms");
    window.othentWallet = arw;
    setWallet(arw);
    await window.othentWallet.connect();
    setAddress(await window.othentWallet.getActiveAddress());
    setAutoconnect(true);
    setTimeout(spawnProcessHandler, 500)
  }

  function disconnectWallet() {
    window.othentWallet.disconnect();
    setAutoconnect(false);
  }

  useEffect(() => {
    if (window)
      if (autoconnect) connectWallet();
  }, [autoconnect]);

  // async function getWalletAddress() {
  //   if (typeof wallet == "undefined") return "";
  //   const addr = await wallet.getActiveAddress();
  //   setAddress(addr);
  // }

  // async function spawnProcess() {
  //   if (processId) return;
  //   if (!address) return toast("Please connect wallet before spawning a process");
  //   setSpawning(true);
  //   console.log("Spawning process...");
  //   const r = await connect().spawn({
  //     module: Module,
  //     scheduler: Scheduler,
  //     signer: createDataItemSigner(wallet),
  //     tags: [
  //       { name: "App-Name", value: "LearnAO" },
  //       { name: "Name", value: "LearnAO-Process" },
  //     ],
  //     data: "",
  //   });
  //   if (r) {
  //     console.log(r);
  //     localStorage.setItem("processId", r);
  //     setProcessId(r);
  //     setSpawning(false);
  //   }
  // }

  // async function runCode() {
  //   if (!address) return toast("Please connect wallet before running code");
  //   if (!processId) return toast("Please spawn a process before running code");

  //   setRunning(true);
  //   setFirstRun(false);
  //   setOutputText("...");

  //   const old_ts = Date.parse(new Date().toUTCString()) / 1000;
  //   const r = await connect().message({
  //     process: processId,
  //     data: currentCode,
  //     signer: createDataItemSigner(wallet),
  //     tags: [{ name: "Action", value: "Eval" }],
  //   });

  //   const { Output } = await connect().result({
  //     message: r,
  //     process: processId,
  //   });

  //   console.log("code result:", Output);

  //   const codeResult = Output.data.json == "undefined" ? Output.data.output : Output.data.json;
  //   setOutputText(codeResult);
  //   if (data.runLua) {
  //     setConfirming(true);
  //     //check inbox for message output after 5s
  //     setTimeout(async () => {
  //       const r = await connect().message({
  //         process: processId,
  //         data: (data.expectedResult as TExpectedResult).run,
  //         signer: createDataItemSigner(wallet),
  //         tags: [{ name: "Action", value: "Eval" }],
  //       });

  //       const { Output } = await connect().result({
  //         message: r,
  //         process: processId,
  //       });

  //       console.log("run lua result: ", Output);
  //       const luaOutput = Output.data.output;
  //       try {
  //         const message = Output.data.json || JSON.parse(luaOutput);
  //         const new_ts = parseInt((message.Timestamp / 1000).toString());
  //         const valid = new_ts - old_ts > 0;
  //         // console.log(new_ts, old_ts, new_ts - old_ts)
  //         const from = data.fromId == "SELF" ? processId : data.fromId;
  //         console.log("lua message :", message);

  //         const passVal = message.From == from && (!data.validateTimestamp || valid) && (message.Data == (data.expectedResult as TExpectedResult).out || message.Data == codeResult);

  //         setPassed(passVal);
  //       } catch {
  //         console.log(luaOutput);
  //         // if (luaOutput == data.expectedResult.out)
  //       }
  //       setRunning(false);
  //       setConfirming(false);
  //     }, 5000);
  //   } else {
  //     setPassed(Output.data.output == data.expectedResult);
  //     setRunning(false);
  //   }
  // }

  async function spawnProcessHandler() {
    if (spawning) return;
    if (!address) return toast("Please connect wallet before spawning a process");
    setSpawning(true);

    const client = new GraphQLClient("https://arweave.net/graphql");

    const queryToFetchAlreadyCreatedProcess = gql`
    query {
  transactions(
    owners: "${address}"
    tags: [
      { name: "Data-Protocol", values: ["ao"] }
      { name: "Type", values: ["Process"] }
      { name: "Name", values: ["LearnAO-Process"] }
    ]
  ) {
    edges {
      node {
        id
        tags {
          name
          value
        }
      }
    }
  }
}

    `;
    const res: any = await client.request(queryToFetchAlreadyCreatedProcess);

    const ids = res.transactions.edges.map((edge: any) => ({
      label: `${edge.node.tags[2].value} (${edge.node.id})`,
      value: edge.node.id,
    }));
    console.log(ids)

    if (ids.length == 0) {
      console.log("No process found, creating one")
      const r = await spawnProcess("LearnAO-Process");
      if (r) {
        setProcessId(r);
        setSpawning(false);
      }
    } else {
      console.log("Found existing process using", ids[0].value)
      setProcessId(ids[0].value);
      setSpawning(false);
    }
  }

  async function runCodeHandler() {
    if (running) return;
    setRunning(true);
    setFirstRun(false);
    setOutputText("...");

    const old_ts = Date.parse(new Date().toUTCString()) / 1000;
    const r = await runLua(currentCode, processId);
    console.log("user res", r);
    const { Output } = r;
    const codeResult = Output.data.json == "undefined" ? Output.data.output : Output.data.json;
    setOutputText(codeResult);

    if (data.runLua) {
      setConfirming(true);
      setTimeout(async () => {
        const r = await runLua((data.expectedResult as TExpectedResult).run, processId);
        const { Output } = r;
        const luaOutput = Output.data.output;
        try {
          const message = JSON.parse(luaOutput);
          console.log("validation res:", message)
          const new_ts = parseInt((message.Timestamp / 1000).toString());
          const valid = new_ts - old_ts > 0;
          const from = data.fromId == "SELF" ? processId : data.fromId;
          const passVal = message.From == from && (!data.validateTimestamp || valid) && (message.Data == (data.expectedResult as TExpectedResult).out || message.Data == codeResult);
          setPassed(passVal);
        } catch {
          console.log(luaOutput);
          if (luaOutput == codeResult)
            setPassed(true);
          else
            setPassed(false);
        }
        setRunning(false);
        setConfirming(false);
      }, 2500);
    } else {
      setPassed(Output.data.output == data.expectedResult);
      setRunning(false);
    }

    setRunning(false);
  }

  return (
    <div className="h-[calc(100vh-92px)] container flex flex-col">
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={spawnProcessHandler} disabled={spawning}>
          {spawning ? <ReloadIcon className="mr-2 animate-spin" /> : null}
          {processId ? `PID: ${processId}` : "Load Process"}
        </Button>

        <Button variant="ghost" onClick={connectWallet}>
          {address ? `Connected: ${address.substring(0, 4)}...${address.substring(address.length - 4, address.length)}` : "Sign in"}
        </Button>
      </div>

      <Separator className="mt-2 mb-4" />

      <ResizablePanelGroup direction="horizontal" className="flex h-full flex-grow">
        <ResizablePanel maxSize={45} minSize={15} className="flex p-8 pb-20 flex-col gap-4 justify-between">
          <h2 className="text-2xl">{data.title}</h2>

          <ScrollArea className="flex-grow">
            <Markdown className="markdown" remarkPlugins={markdownPlugins}>
              {data.content}
            </Markdown>
          </ScrollArea>

          <div className="flex gap-4 p-2 items-center">
            <Button variant="outline" onClick={() => router.push(`/${data.prevRoute}`)} className="w-full">
              Previous
            </Button>

            <Button
              disabled={typeof data.allowNext == "boolean" ? !data.allowNext : !passed}
              variant="default"
              onClick={() => {
                const nextable = typeof data.allowNext == "boolean" ? data.allowNext : passed;
                if (!nextable) return toast("You need to complete the exercise to proceed :p");
                router.push(`/${data.nextRoute}`);
              }}
              className="w-full"
            >
              Next
            </Button>
          </div>
        </ResizablePanel>

        <ResizableHandle className="mx-8" />

        <ResizablePanel>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel maxSize={80} className="flex flex-col gap-4">
              <div className="flex flex-row gap-4 justify-between items-center">
                <h3 className="text-xl">
                  Code <span className="ml-2 text-lg text-[#555]">Lua editor</span>
                </h3>

                <Button variant="default" disabled={running || confirming} onClick={runCodeHandler}>
                  {running ? <ReloadIcon className="mr-2 animate-spin fill-black" /> : <PlayIcon className="mr-2" />}
                  {confirming ? "Validating..." : <>{running ? "Running..." : "Run Code"}</>}
                </Button>
              </div>

              <div className="h-full w-full rounded-xl overflow-hidden">
                <Editor
                  language="lua"
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 16,
                    wordWrap: "on",
                    scrollBeyondLastLine: false,
                  }}
                  value={currentCode}
                  defaultValue={data.defaultCode}
                  onChange={(v) => v && setCurrentCode(v)}
                />
              </div>
            </ResizablePanel>

            <ResizableHandle className="my-6" />

            <ResizablePanel maxSize={70} className="flex flex-col gap-4 pb-20">
              <div className="text-xl">Output {!running && !firstRun ? <>{passed ? "✅" : confirming ? "🟡" : "❌"}</> : null} </div>

              <ScrollArea className="bg-[#1e1e1e] rounded-xl max-h-full min-h-[10vh]">
                <pre className={`px-4 py-2 rounded-xl ${passed ? "text-green-200" : "text-white"}`}><Ansi>{typeof outputText == "string" ? outputText : JSON.stringify(outputText, null, 2)}</Ansi></pre>
              </ScrollArea>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
