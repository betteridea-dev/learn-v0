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

declare global {
  interface Window {
    arweaveWallet: any;
  }
}

const markdownPlugins = [remarkGfm];

const exerciseData = {
  content: `
# Hello AO!

Your goal is to modify the lua code from \`print("Hello World")\` to \`print("Hello AO!")\` and run it using the process ID you created`,
  defaultCode: `--change this
print("Hello World")`,
  expectedResult: `Hello AO!`,
};

export default function Layout() {
  const [running, setRunning] = useState(false);
  const [currentCode, setCurrentCode] = useState(exerciseData.defaultCode);
  const [outputText, setOutputText] = useState("...");
  const [passed, setPassed] = useState(false);
  const [address, setAddress] = useState("");
  const [processId, setProcessId] = useState("");
  const [spawning, setSpawning] = useState(false);

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

    const { data } = Output;

    console.log(data.output);
    setOutputText(data.output);
    if (data.output == exerciseData.expectedResult) {
      setPassed(true);
    } else {
      setPassed(false);
    }
    setRunning(false);
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="p-2 px-3 flex justify-between items-center">
        <div>Learn AO DAO</div>
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
          {/* <div className="text-center text-3xl p-4 pb-7">Hello AO!</div> */}
          <Markdown remarkPlugins={markdownPlugins}>
            {exerciseData.content}
          </Markdown>
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
                defaultValue={exerciseData.defaultCode}
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
