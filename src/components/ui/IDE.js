import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
const Editor = dynamic(import("@monaco-editor/react"), { ssr: false });

export default function IDE() {
  const [isConnected, setIsConnected] = useState(false);
  const [output, setOutput] = useState("");
  const wsRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (wsRef.current) wsRef.current.close();
    };
  }, []);

  const connectWebSocket = () => {
    if (
      wsRef.current &&
      (wsRef.current.readyState === WebSocket.OPEN ||
        wsRef.current.readyState === WebSocket.CONNECTING)
    ) {
      console.log("WebSocket is already connected or connecting");
      return;
    }

    // TODO - Replace with your own WebSocket server URL
    wsRef.current = new WebSocket("ws://localhost:8765");

    wsRef.current.onopen = (event) => {
      console.log("WebSocket Connected", event);
      setIsConnected(true);
    };

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "output") {
        setOutput(data.data + "\n");
      }
    };

    wsRef.current.onclose = (event) => {
      console.log("WebSocket Disconnected", event);
      setIsConnected(false);
      setTimeout(connectWebSocket, 5000);
    };

    wsRef.current.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };
  };

  const runCode = () => {
    if (!isConnected) {
      setOutput("Not connected to server. Please wait...\n");
      return;
    }
    const code = editorRef.current.getValue();
    wsRef.current.send(JSON.stringify({ type: "runCode", code }));
  };

  return (
    <div className="w-1/3 bg-gray-100 p-4">
      <h2 className="mb-4 text-2xl font-bold">Rover Control Center</h2>
      <Editor
        height="300px"
        defaultLanguage="python"
        onMount={(editor) => {
          editorRef.current = editor;
        }}
        theme="vs-dark"
      />
      <div>
        {isConnected ? "Connected to server" : "Disconnected from server"}
      </div>
      <button
        onClick={runCode}
        className="mt-4 w-full rounded bg-green-500 px-4 py-2 text-white"
      >
        Run Mission
      </button>
      <div className="mt-4">
        <h3 className="mb-2 text-xl font-bold">Mission Log:</h3>
        <pre className="h-40 overflow-auto rounded bg-gray-200 p-2">
          {output}
        </pre>
      </div>
    </div>
  );
}
