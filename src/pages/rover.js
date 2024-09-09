import React, { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import dynamic from "next/dynamic";
const Editor = dynamic(import("@monaco-editor/react"), { ssr: false });

const Rover = ({ position, rotation }) => {
  const { pos, rot } = useSpring({
    pos: position,
    rot: [0, rotation, 0],
    config: { mass: 1, tension: 180, friction: 12 },
  });

  return (
    <animated.group position={pos} rotation={rot}>
      <mesh position={[0, 0.5, 0]} castShadow={true}>
        <boxGeometry args={[1, 0.5, 1.5]} />
        <meshPhongMaterial color="silver" />
      </mesh>
      {[
        [-0.6, 0.3, 0.7],
        [0.6, 0.3, 0.7],
        [-0.6, 0.3, -0.7],
        [0.6, 0.3, -0.7],
      ].map((wheelPos, index) => (
        <mesh
          key={index}
          position={wheelPos}
          rotation={[0, 0, Math.PI / 2]}
          castShadow={true}
        >
          <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
          <meshPhongMaterial color="black" />
        </mesh>
      ))}
    </animated.group>
  );
};

const RoverSimulator = () => {
  // const [code, setCode] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [output, setOutput] = useState("");
  const [position, setPosition] = useState([0, 0, 0]);
  const [rotation, setRotation] = useState(0);

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
    <div className="flex h-screen">
      <div className="w-1/3 bg-gray-100 p-4">
        <h2 className="mb-4 text-2xl font-bold">Lesson pane</h2>
      </div>
      <div className="w-1/3">
        <Canvas camera={{ position: [0, 10, 10], fov: 50 }} shadows>
          <ambientLight intensity={2} />
          <pointLight position={[10, 10, 10]} castShadow={true} />
          <OrbitControls
            maxDistance={40}
            minDistance={2}
            maxPolarAngle={Math.PI / 2}
            screenSpacePanning={false}
          />
          <gridHelper args={[30, 30]} />
          <Rover position={position} rotation={rotation} />
        </Canvas>
      </div>
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
    </div>
  );
};

export default RoverSimulator;
