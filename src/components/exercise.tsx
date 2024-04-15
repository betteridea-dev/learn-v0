"use client";

import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Module, Scheduler } from "@/lib/ao";
import { TExerciseData } from "@/types";
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

declare global {
  interface Window {
    arweaveWallet: any;
  }
}

const markdownPlugins = [remarkGfm];

export default function Exercise({ data }: { data: TExerciseData }) {
  const [running, setRunning] = useState(false);
  const [currentCode, setCurrentCode] = useState(data.defaultCode);
  const [outputText, setOutputText] = useState("...");
  const [passed, setPassed] = useState(false);
  const [address, setAddress] = useState("");
  const [processId, setProcessId] = useState("");
  const [spawning, setSpawning] = useState(false);
  const [intrvl, setIntrvl] = useState<any>(0);
  const [firstRun, setFirstRun] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (!processId) return;
    if (!window) return;
    clearInterval(intrvl);
    setIntrvl(
      setInterval(async () => {
        await connect()
          .results({
            process: processId,
            from: localStorage.getItem("cursor") || "",
            sort: "DESC",
            limit: 25,
          })
          .then((r) => {
            // console.log("checking inbox", r.edges);
            if (r.edges.length > 0) {
              r.edges.forEach((e: any) => {
                const isPrint = e.node.Output.print;
                const d = e.node.Output.data;
                // console.log(d);
                isPrint &&
                  localStorage.getItem("cursor") &&
                  typeof d == "string" &&
                  toast(
                    <Ansi className="bg-transparent p-1">
                      {d.replace("34m", "37m")}
                    </Ansi>,
                  );
                // if (!isPrint) {
                //   try {
                //     const messageData = e.node.Messages[0].Data;
                //     console.log(messageData);
                //   } catch {
                //     console.log("No message data");
                //   }
                // }
              });
              window && localStorage.setItem("cursor", r.edges[0].cursor);
            }
          });
      }, 2500),
    );
    return () => clearInterval(intrvl);
  }, [processId]);

  useEffect(() => {
    // console.log(router.query);
    setCurrentCode(data.defaultCode);
    setPassed(false);
    setOutputText("...");
  }, [router.query]);

  useEffect(() => {
    if (window) {
      window.arweaveWallet = window.arweaveWallet || {};

      try {
        getWalletAddress();
      } catch (e) {
        console.log("No wallet connected");
      }

      const pid = localStorage.getItem("processId");
      if (pid) setProcessId(pid);
    }
  }, []);

  async function getWalletAddress() {
    const addr = await window.arweaveWallet.getActiveAddress();
    setAddress(addr);
  }

  async function connectWallet() {
    try {
      await window.arweaveWallet.getActiveAddress();
    } catch (e) {
      await window.arweaveWallet.connect([
        "SIGN_TRANSACTION",
        "ACCESS_ADDRESS",
      ]);
      getWalletAddress();
    }
  }

  async function spawnProcess() {
    if (processId) return;
    if (!address)
      return toast("Please connect wallet before spawning a process");
    setSpawning(true);
    console.log("Spawning process...");
    const r = await connect().spawn({
      module: Module,
      scheduler: Scheduler,
      signer: createDataItemSigner(window.arweaveWallet),
      tags: [],
      data: "",
    });
    if (r) {
      console.log(r);
      localStorage.setItem("processId", r);
      setProcessId(r);
      setSpawning(false);
    }
  }

  async function runCode() {
    if (!address) return toast("Please connect wallet before running code");
    if (!processId) return toast("Please spawn a process before running code");

    setRunning(true);
    setOutputText("...");

    const old_ts = new Date().getTime();
    const r = await connect().message({
      process: processId,
      data: currentCode,
      signer: createDataItemSigner(window.arweaveWallet),
      tags: [{ name: "Action", value: "Eval" }],
    });

    const { Output } = await connect().result({
      message: r,
      process: processId,
    });

    setOutputText(Output.data.output);
    if (data.checkInbox) {
      //check inbox for message output after 5s
      setTimeout(async () => {
        const r = await connect().message({
          process: processId,
          data: `json = require('json')
        return json.encode(Inbox[#Inbox])`,
          signer: createDataItemSigner(window.arweaveWallet),
          tags: [{ name: "Action", value: "Eval" }],
        });

        const { Output } = await connect().result({
          message: r,
          process: processId,
        });

        const message = JSON.parse(Output.data.output);
        const new_ts = message.Timestamp;
        const valid = new_ts - old_ts > 0;
        const from = data.fromId == "SELF" ? processId : data.fromId;
        console.log(message);
        setPassed(
          message.Data == data.expectedResult && message.From == from && valid,
        );
        setRunning(false);
      }, 5000);
    } else {
      setPassed(Output.data.output == data.expectedResult);
      setRunning(false);
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="p-2 px-3 flex justify-between items-center">
        <Link href="/">Learn AO DAO</Link>
        <div>
          <Button variant="link" onClick={spawnProcess} disabled={spawning}>
            {spawning ? <ReloadIcon className="mr-2 animate-spin" /> : null}
            {processId ? processId : "Spawn Process"}
          </Button>
          <Button variant="link" onClick={connectWallet}>
            {address ? address : "Connect"}
          </Button>
        </div>
      </div>
      <Separator />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel maxSize={45} minSize={15} className="p-3">
          <div className="text-center text-3xl p-4 pb-7">{data.title}</div>
          <Markdown
            className="markdown overflow-scroll max-h-[73vh]"
            remarkPlugins={markdownPlugins}
          >
            {data.content}
          </Markdown>
          <div className="flex justify-between p-2 items-center">
            <Button
              variant="outline"
              onClick={() => router.replace(`/${data.prevRoute}`)}
            >
              Previous
            </Button>
            <Button
              disabled={
                typeof data.allowNext == "boolean" ? !data.allowNext : !passed
              }
              variant="outline"
              onClick={() => {
                const nextable =
                  typeof data.allowNext == "boolean" ? data.allowNext : passed;
                if (!nextable)
                  return toast(
                    "You need to complete the exercise to proceed :p",
                  );
                router.replace(`/${data.nextRoute}`);
              }}
            >
              Next
            </Button>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel maxSize={80} className="p-3">
              Code Editor
              <Editor
                language="lua"
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 16,
                  wordWrap: "on",
                }}
                value={currentCode}
                defaultValue={data.defaultCode}
                onChange={(v) => v && setCurrentCode(v)}
              />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel maxSize={70} className="p-3">
              <div className="flex justify-between">
                <div>
                  Output {!running ? <>{passed ? "✅" : "❌"}</> : null}{" "}
                </div>
                <Button variant="ghost" disabled={running} onClick={runCode}>
                  {running ? (
                    <ReloadIcon className="mr-2 animate-spin" />
                  ) : (
                    <PlayIcon className="mr-2" />
                  )}
                  {running ? "Running..." : "Run Code"}
                </Button>
              </div>
              <pre
                className={`ring-1 p-1 px-2 ring-white/10 min-h-[10vh] max-h-[66vh] ${passed ? "text-green-200" : "text-red-200"}`}
              >
                {outputText}
              </pre>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
