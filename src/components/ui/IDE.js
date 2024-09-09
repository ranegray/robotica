import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
const Editor = dynamic(import("@monaco-editor/react"), { ssr: false });

export default function IDE() {
  const [isConnected, setIsConnected] = useState(false);
  const [output, setOutput] = useState("");
  const [editorTheme, setEditorTheme] = useState("vs-dark");
  const wsRef = useRef(null);
  const editorRef = useRef(null);

  const handleEditorWillMount = (monaco) => {
    monaco.editor.defineTheme("myCustomTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "7c7c7c", fontStyle: "italic" },
        { token: "keyword", foreground: "c792ea", fontStyle: "bold" },
        { token: "identifier", foreground: "82aaff" },
        { token: "string", foreground: "ecc48d" },
        { token: "number", foreground: "f78c6c" },
        { token: "delimiter", foreground: "89ddff" },
        { token: "type", foreground: "ffcb6b" },
        { token: "function", foreground: "82aaff", fontStyle: "bold" },
        { token: "variable", foreground: "f07178" },
        { token: "class", foreground: "ffcb6b", fontStyle: "bold" },
        { token: "interface", foreground: "ffcb6b", fontStyle: "bold" },
        { token: "namespace", foreground: "ffcb6b", fontStyle: "bold" },
        { token: "parameter", foreground: "f78c6c" },
        { token: "property", foreground: "82aaff" },
        { token: "punctuation", foreground: "89ddff" },
        { token: "operator", foreground: "89ddff" },
        { token: "regexp", foreground: "ecc48d" },
        { token: "decorator", foreground: "c792ea", fontStyle: "bold" },
        { token: "tag", foreground: "ff5370" },
        { token: "attribute.name", foreground: "c792ea" },
        { token: "attribute.value", foreground: "ecc48d" },
        { token: "meta.embedded", foreground: "ffffff" },
        { token: "meta.tag", foreground: "ff5370" },
        { token: "meta.tag.attributes", foreground: "c792ea" },
        { token: "meta.tag.content", foreground: "ffffff" },
      ],
      colors: {
        "editor.background": "#1e293b", // Tailwind bg-slate-800
        "editor.foreground": "#ffffff", // Tailwind text-white
        "editor.selectionBackground": "#ADD6FF4D", // Custom selection color
        "editor.lineHighlightBackground": "#2d3748", // Tailwind bg-gray-800
        "editorCursor.foreground": "#ffffff", // Tailwind text-white
        "editorWhitespace.foreground": "#4a5568", // Tailwind text-gray-600
        "editorIndentGuide.background": "#4a5568", // Tailwind text-gray-600
        "editorIndentGuide.activeBackground": "#a0aec0", // Tailwind text-gray-400
      },
    });
    setEditorTheme("myCustomTheme");
  };

  const editorOptions = {
    lineNumbers: "on",
    minimap: { enabled: false },
    scrollbar: {
      vertical: "auto",
      horizontal: "off",
    },
    folding: true,
    lineDecorationsWidth: 2,
    overviewRulerLanes: 0,
    hideCursorInOverviewRuler: false,
    renderLineHighlight: "none",
    renderIndentGuides: true,
    highlightActiveIndentGuide: true,
    renderWhitespace: "none",
    renderControlCharacters: false,
    fontSize: 14,
    fontFamily: "'Fira Code', monospace",
    cursorStyle: "line",
    cursorBlinking: "smooth",
    smoothScrolling: true,
    scrollBeyondLastLine: false,
  };

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
    <div className="w-1/3 border-r border-r-slate-600">
      <div>
        {isConnected ? "Connected to server" : "Disconnected from server"}
      </div>
      {/* TODO set up toggle button for code theme */}
      <div className="bg-slate-900">
        <p className="p-2 bg-slate-800 w-fit text-slate-400">rover.py</p>
      </div>
      <Editor
        height={"50%"}
        defaultLanguage="python"
        defaultValue="# start writing your code below"
        onMount={(editor) => {
          editorRef.current = editor;
        }}
        beforeMount={handleEditorWillMount}
        theme={editorTheme}
        options={editorOptions}
      />
      <div className="bg-slate-900 p-3">
        <button
          onClick={runCode}
          className="rounded-md p-2 bg-yellow-500 text-black"
        >
          Run Code
        </button>
      </div>
      <div className="mt-4">
        <h3 className="mb-2 text-xl font-bold">Mission Log:</h3>
        <pre className="h-40 overflow-auto p-2">{output}</pre>
      </div>
    </div>
  );
}
