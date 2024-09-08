import React, { useState, useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Plane } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import Editor from "@monaco-editor/react";
import * as THREE from "three";

const MartianSurface = () => {
  //   const texture = useLoader(THREE.TextureLoader, "/martian_surface.jpeg");
  //   return (
  //     <Plane
  //       args={[30, 30]}
  //       rotation={[-Math.PI / 2, 0, 0]}
  //       position={[0, -0.5, 0]}
  //     >
  //       <meshStandardMaterial map={texture} />
  //     </Plane>
  //   );
};

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
  const [code, setCode] = useState(`# Control the rover using these commands:
# move_forward()
# move_backward()
# turn_left()
# turn_right()

move_forward()
move_forward()
turn_right()
move_forward()
`);
  const [output, setOutput] = useState("");
  const [position, setPosition] = useState([0, 0, 0]);
  const [rotation, setRotation] = useState(0);
  const commandQueue = useRef([]);

  const runCode = () => {
    setOutput("");

    // https://emkc.org/api/v2/piston/runtimes
    // POST /api/v2/piston/execute
    async function executeCode() {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: "python3",
          version: "3.10.0",
          files: [
            {
              name: "lesson1.js",
              content: code,
            },
          ],
        }),
      });
      const data = await response.json();
      console.log(data);
    }

    executeCode();

    // commandQueue.current = [];

    // // Parse the code and add commands to the queue
    // // TODO - Make this more robust
    // const lines = code.split("\n");
    // lines.forEach((line) => {
    //   if (line[0] == "#") return;

    //   if (line.includes("move_forward()")) {
    //     commandQueue.current.push("forward");
    //   } else if (line.includes("move_backward()")) {
    //     commandQueue.current.push("backward");
    //   } else if (line.includes("turn_left()")) {
    //     commandQueue.current.push("left");
    //   } else if (line.includes("turn_right()")) {
    //     commandQueue.current.push("right");
    //   }
    // });

    // executeNextCommand();
  };

  const executeNextCommand = () => {
    if (commandQueue.current.length === 0) return;

    const command = commandQueue.current.shift();
    switch (command) {
      case "forward":
        setPosition((prev) => [
          prev[0] + Math.sin(rotation) * 2,
          prev[1],
          prev[2] - Math.cos(rotation) * 2,
        ]);
        setOutput((prev) => prev + `Moving forward.\n`);
        break;
      case "backward":
        setPosition((prev) => [
          prev[0] - Math.sin(rotation) * 2,
          prev[1],
          prev[2] + Math.cos(rotation) * 2,
        ]);
        setOutput((prev) => prev + `Moving backward.\n`);
        break;
      case "left":
        setRotation((prev) => prev + Math.PI / 2);
        setOutput((prev) => prev + `Turning left.\n`);
        break;
      case "right":
        setRotation((prev) => prev - Math.PI / 2);
        setOutput((prev) => prev + `Turning right.\n`);
        break;
    }

    setTimeout(executeNextCommand, 1000);
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
          <MartianSurface />
          <Rover position={position} rotation={rotation} />
        </Canvas>
      </div>
      <div className="w-1/3 bg-gray-100 p-4">
        <h2 className="mb-4 text-2xl font-bold">Rover Control Center</h2>
        <Editor
          height="300px"
          defaultLanguage="python"
          value={code}
          onChange={setCode}
          theme="vs-dark"
        />
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
