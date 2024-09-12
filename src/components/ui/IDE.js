import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useWebSocket } from "../../lib/useWebSocket";
import { customEditorTheme } from "../../lib/editorTheme";
import { editorOptions } from "../../lib/editorOptions";
import { EditorControls } from "./EditorControls";

const Editor = dynamic(import("@monaco-editor/react"), { ssr: false });

export default function IDE({ mission, lesson, exercise, code }) {
  // const [currentCode, setCurrentCode] = useState(code);
  const [editorTheme, setEditorTheme] = useState("vs-dark");
  const editorRef = useRef(null);
  const { isConnected, output, sendCode } = useWebSocket();

  const handleEditorWillMount = (monaco) => {
    monaco.editor.defineTheme("myCustomTheme", customEditorTheme);
    setEditorTheme("myCustomTheme");
  };

  // const updateEditorContent = (newCode) => {
  //   if (editorRef.current) {
  //     editorRef.current.setValue(newCode);
  //   }
  //   setCurrentCode(newCode);
  // };

  // useEffect(() => {
  //   updateEditorContent(code);
  // }, [code]);

  const runCode = () => {
    const code = editorRef.current.getValue();
    sendCode(code);
  };

  return (
    <div className="w-full">
      <div>
        {isConnected ? "Connected to server" : "Disconnected from server"}
      </div>
      <div className="bg-slate-900">
        <p className="w-fit bg-slate-800 p-2 text-slate-400">rover.py</p>
      </div>
      <Editor
        height={"50%"}
        defaultLanguage="python"
        value={exercise.codeTemplate}
        onMount={(editor) => {
          editorRef.current = editor;
        }}
        beforeMount={handleEditorWillMount}
        theme={editorTheme}
        options={editorOptions}
      />
      <EditorControls
        runCode={runCode}
        mission={mission}
        lesson={lesson}
        exercise={exercise}
      />
      <div className="mt-5 h-full">
        <h3 className="mb-2 text-xl font-bold">Mission Log:</h3>
        <pre className="h-full overflow-auto bg-slate-950 p-2 text-white">
          {output}
        </pre>
      </div>
    </div>
  );
}
