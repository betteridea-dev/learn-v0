"use client";

import { useState, useEffect } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Editor from "@monaco-editor/react";
import { PlayIcon, ReloadIcon } from "@radix-ui/react-icons";
import { connect, createDataItemSigner } from "@permaweb/aoconnect";
import { Separator } from "@/components/ui/separator";
import { Module, Scheduler } from "@/lib/ao";
import { TExerciseData } from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/router";
import Link from "next/link";

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

  const router = useRouter();

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

    console.log(Output.data.output);
    setOutputText(Output.data.output);
    if (Output.data.output == data.expectedResult) {
      setPassed(true);
    } else {
      setPassed(false);
    }
    setRunning(false);
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
          <Markdown remarkPlugins={markdownPlugins}>{data.content}</Markdown>
          <div className="flex justify-between p-2 items-center">
            <Button
              variant="outline"
              onClick={() => router.replace(`/${data.prevRoute}`)}
            >
              Previous
            </Button>
            <Button
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
                  Output{" "}
                  {outputText != "..." ? <>{passed ? "✅" : "❌"}</> : null}{" "}
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
