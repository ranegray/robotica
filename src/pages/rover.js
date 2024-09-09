import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import IDE from "@/components/ui/IDE";

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
  const [position, setPosition] = useState([0, 0, 0]);
  const [rotation, setRotation] = useState(0);

  return (
    <div className="flex h-screen">
      <div className="w-1/3 bg-gray-100 p-4">
        <h2 className="mb-4 text-2xl font-bold">Lesson pane</h2>
      </div>
      <IDE />
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
    </div>
  );
};

export default RoverSimulator;
