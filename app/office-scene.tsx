"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

export type SceneAgent = {
  name: string;
  status: "IDLE" | "THINKING" | "WORKING" | "CHATTING" | "DONE";
  icon: string;
  color: string;
};

type SceneProps = {
  agents: SceneAgent[];
  activeAgent: SceneAgent;
  onSelect: (agent: SceneAgent) => void;
};

const agentPositions: Record<string, [number, number, number]> = {
  manager: [0.2, 0, -1.55],
  membership: [-4.05, 0, 0.85],
  promo: [-2.1, 0, 3.2],
  creative: [3.95, 0, 0.7],
  cs: [2.25, 0, 3.25],
  support: [5.1, 0, 3.65],
};

function Box({ position, size, color, castShadow = true }: { position: [number, number, number]; size: [number, number, number]; color: string; castShadow?: boolean }) {
  return <mesh position={position} castShadow={castShadow} receiveShadow><boxGeometry args={size} /><meshStandardMaterial color={color} roughness={0.66} metalness={0.12} /></mesh>;
}

function NeonTube({ position, length, rotation = [0, 0, 0] }: { position: [number, number, number]; length: number; rotation?: [number, number, number] }) {
  return <mesh position={position} rotation={rotation}><boxGeometry args={[length, 0.035, 0.035]} /><meshStandardMaterial color="#ff465d" emissive="#ff1739" emissiveIntensity={2.5} /></mesh>;
}

function Wall({ position, size, accent = false }: { position: [number, number, number]; size: [number, number, number]; accent?: boolean }) {
  return <group><Box position={position} size={size} color="#172338" /><Box position={[position[0], position[1] + size[1] / 2 + 0.03, position[2]]} size={[size[0], 0.06, size[2]]} color="#39475c" />{accent && <NeonTube position={[position[0], position[1], position[2] + size[2] / 2 + 0.025]} length={size[0] * 0.72} />}</group>;
}

function Desk({ position, color }: { position: [number, number, number]; color: string }) {
  return <group position={position}><Box position={[0, 0.93, 0]} size={[1.6, 0.14, 0.82]} color="#6f4b40" /><Box position={[0.68, 0.43, 0.28]} size={[0.11, 0.86, 0.11]} color="#2b3141" /><Box position={[-0.68, 0.43, 0.28]} size={[0.11, 0.86, 0.11]} color="#2b3141" /><Box position={[0.68, 0.43, -0.28]} size={[0.11, 0.86, 0.11]} color="#2b3141" /><Box position={[-0.68, 0.43, -0.28]} size={[0.11, 0.86, 0.11]} color="#2b3141" /><Box position={[-0.35, 1.27, -0.18]} size={[0.48, 0.36, 0.08]} color="#102944" /><Box position={[-0.35, 1.29, -0.22]} size={[0.39, 0.26, 0.02]} color="#1aa5df" castShadow={false} /><Box position={[0.35, 1.25, -0.18]} size={[0.43, 0.32, 0.08]} color="#102944" /><Box position={[0.35, 1.27, -0.22]} size={[0.34, 0.21, 0.02]} color="#4bcfff" castShadow={false} /><Box position={[0.68, 1.04, 0.22]} size={[0.08, 0.08, 0.08]} color={color} castShadow={false} /></group>;
}

function Chair({ position }: { position: [number, number, number] }) {
  return <group position={position}><Box position={[0, 0.61, 0]} size={[0.64, 0.12, 0.63]} color="#263247" /><Box position={[0, 1.02, 0.22]} size={[0.64, 0.77, 0.13]} color="#303d56" /><Box position={[0, 0.28, 0]} size={[0.1, 0.45, 0.1]} color="#3b4353" /><mesh position={[0, 0.05, 0]}><cylinderGeometry args={[0.52, 0.1, 0.1, 8]} /><meshStandardMaterial color="#414b5d" /></mesh></group>;
}

function BlockyEmployee({ agent, position, selected, onSelect }: { agent: SceneAgent; position: [number, number, number]; selected: boolean; onSelect: () => void }) {
  const group = useRef<THREE.Group>(null);
  const arm = useRef<THREE.Group>(null);
  const hatColor = useMemo(() => new THREE.Color(agent.color).offsetHSL(0, 0, -0.23).getStyle(), [agent.color]);
  useFrame(({ clock }) => {
    if (!group.current) return;
    const time = clock.getElapsedTime();
    group.current.position.y = 0.04 + Math.sin(time * 2 + position[0]) * 0.035;
    if (arm.current && agent.status === "WORKING") arm.current.rotation.x = -0.3 + Math.sin(time * 10) * 0.22;
    if (agent.status === "THINKING") group.current.rotation.y = Math.sin(time * 1.5) * 0.16;
  });
  const handleClick = (event: ThreeEvent<MouseEvent>) => { event.stopPropagation(); onSelect(); };
  return <group ref={group} position={position} onClick={handleClick} onPointerOver={(event) => { event.stopPropagation(); document.body.style.cursor = "pointer"; }} onPointerOut={() => { document.body.style.cursor = "default"; }}>
    {selected && <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[0.52, 0.61, 32]} /><meshBasicMaterial color={agent.color} transparent opacity={0.9} /></mesh>}
    <Box position={[-0.16, 0.32, 0]} size={[0.24, 0.58, 0.24]} color="#26364d" /><Box position={[0.16, 0.32, 0]} size={[0.24, 0.58, 0.24]} color="#26364d" /><Box position={[0, 0.85, 0]} size={[0.68, 0.72, 0.38]} color={agent.color} /><Box position={[0, 1.56, 0]} size={[0.58, 0.56, 0.55]} color="#efb990" /><Box position={[0, 1.83, 0.02]} size={[0.65, 0.16, 0.58]} color={hatColor} /><group ref={arm} position={[-0.46, 0.98, 0.05]}><Box position={[0, -0.2, 0]} size={[0.19, 0.55, 0.22]} color="#efb990" /></group><group position={[0.46, 0.98, 0.05]}><Box position={[0, -0.2, 0]} size={[0.19, 0.55, 0.22]} color="#efb990" /></group>
    <mesh position={[-0.13, 1.58, 0.286]}><boxGeometry args={[0.07, 0.07, 0.02]} /><meshBasicMaterial color="#111827" /></mesh><mesh position={[0.13, 1.58, 0.286]}><boxGeometry args={[0.07, 0.07, 0.02]} /><meshBasicMaterial color="#111827" /></mesh>
    <mesh position={[0, 2.19, 0]}><sphereGeometry args={[0.12, 16, 16]} /><meshBasicMaterial color={agent.status === "WORKING" ? "#45e0ad" : agent.status === "THINKING" ? "#ffc46c" : agent.status === "CHATTING" ? "#58c8ff" : "#a6b2c1"} /></mesh>
  </group>;
}

function ServerRack({ position }: { position: [number, number, number] }) {
  return <group position={position}>{[0, 0.62, 1.24].map((offset) => <group key={offset}><Box position={[0, offset, 0]} size={[0.8, 0.58, 0.5]} color="#111d2c" /><Box position={[0, offset, -0.26]} size={[0.56, 0.06, 0.02]} color="#3acaff" castShadow={false} /></group>)}</group>;
}

function Plant({ position }: { position: [number, number, number] }) {
  return <group position={position}><mesh position={[0, 0.25, 0]}><cylinderGeometry args={[0.26, 0.2, 0.48, 8]} /><meshStandardMaterial color="#6e4a3f" /></mesh>{[-0.35, 0, 0.35].map((angle) => <mesh key={angle} position={[0, 0.82, 0]} rotation={[0, angle, 0.45]}><coneGeometry args={[0.19, 0.76, 5]} /><meshStandardMaterial color="#2b9a70" /></mesh>)}</group>;
}

function Lounge() {
  return <group position={[-3.8, 0, 4.35]}><Box position={[0, 0.46, 0]} size={[1.82, 0.5, 0.68]} color="#28405f" /><Box position={[0, 0.99, 0.27]} size={[1.82, 0.68, 0.14]} color="#344e71" /><Box position={[1.07, 0.31, 0.2]} size={[0.54, 0.25, 0.54]} color="#805d4c" /><mesh position={[1.07, 0.49, 0.2]}><cylinderGeometry args={[0.38, 0.38, 0.08, 20]} /><meshStandardMaterial color="#bd9571" /></mesh></group>;
}

function FocusCamera({ activeAgent }: { activeAgent: SceneAgent }) {
  const { camera } = useThree();
  useEffect(() => {
    const target = new THREE.Vector3(...agentPositions[activeAgent.icon]);
    camera.position.lerp(new THREE.Vector3(target.x + 7.2, 8.2, target.z + 9.3), 0.12);
  }, [activeAgent, camera]);
  return null;
}

function OfficeWorld({ agents, activeAgent, onSelect }: SceneProps) {
  return <><color attach="background" args={["#070c16"]} /><ambientLight intensity={1.3} color="#9db7ff" /><hemisphereLight intensity={0.7} color="#9ecbff" groundColor="#1a1021" /><directionalLight castShadow position={[5, 10, 4]} intensity={2.4} color="#ffe1cb" shadow-mapSize={[1024, 1024]} shadow-camera-far={30} /><pointLight position={[0, 4, -2]} intensity={25} distance={8} color="#ff3b55" /><pointLight position={[-5, 3, 3]} intensity={12} distance={7} color="#2aaeff" /><FocusCamera activeAgent={activeAgent} />
    <mesh receiveShadow position={[0, -0.2, 1]}><boxGeometry args={[12, 0.42, 10]} /><meshStandardMaterial color="#252b3c" roughness={0.76} /></mesh><mesh receiveShadow position={[0, 0.03, 1]}><planeGeometry args={[11.7, 9.7]} /><meshStandardMaterial color="#303348" roughness={0.9} /></mesh>
    <Wall position={[0, 1.2, -3.84]} size={[12, 2.4, 0.28]} accent /><Wall position={[-5.86, 1.2, 1]} size={[0.28, 2.4, 10]} /><Wall position={[5.86, 1.2, 1]} size={[0.28, 2.4, 10]} /><Wall position={[0, 1.2, 5.84]} size={[12, 2.4, 0.28]} />
    <ServerRack position={[-4.75, 0.12, -2.7]} /><ServerRack position={[-3.75, 0.12, -2.7]} /><Box position={[3.85, 0.55, -2.85]} size={[2.25, 1.1, 0.22]} color="#10243c" /><Box position={[3.85, 0.57, -2.99]} size={[1.86, 0.68, 0.02]} color="#174f7c" castShadow={false} />
    <group position={[0, 0, -2.95]}><mesh position={[0, 0.94, 0]} castShadow receiveShadow><cylinderGeometry args={[1.12, 1.12, 0.18, 32]} /><meshStandardMaterial color="#574a5b" /></mesh>{[[0, 1.1], [1.1, 0], [0, -1.1], [-1.1, 0]].map(([x, z]) => <Chair key={`${x}-${z}`} position={[x, 0, z]} />)}</group>
    <Lounge /><Plant position={[-2.85, 0.03, -1.65]} /><Plant position={[4.6, 0.03, 4.85]} />
    {agents.map((agent) => { const position = agentPositions[agent.icon]; return <group key={agent.name}><Desk position={position} color={agent.color} /><Chair position={[position[0], 0, position[2] + 0.92]} /><BlockyEmployee agent={agent} position={[position[0], 0, position[2] + 0.36]} selected={activeAgent.name === agent.name} onSelect={() => onSelect(agent)} /></group>; })}
    <group position={[-3.85, 0, -0.5]}><Box position={[0, 0.93, 0]} size={[1.9, 0.15, 0.95]} color="#73483c" /><Box position={[0, 1.29, -0.19]} size={[0.65, 0.43, 0.08]} color="#112946" /><Box position={[0, 1.31, -0.24]} size={[0.52, 0.3, 0.02]} color="#f4a85c" castShadow={false} /><BlockyEmployee agent={{ name: "Owner", status: "WORKING", icon: "owner", color: "#f1bf72" }} position={[0, 0, 0.42]} selected={false} onSelect={() => onSelect(agents[0])} /></group>
    <NeonTube position={[0, 2.25, -3.62]} length={3.3} /><NeonTube position={[-5.45, 2.15, 1]} length={3.2} rotation={[0, Math.PI / 2, 0]} /><OrbitControls makeDefault enableDamping dampingFactor={0.08} minDistance={7.6} maxDistance={19} maxPolarAngle={Math.PI / 2.15} minPolarAngle={Math.PI / 4.3} target={[0, 0, 0.5]} />
  </>;
}

export default function OfficeScene({ agents, activeAgent, onSelect }: SceneProps) {
  return <div className="three-office-canvas"><Canvas shadows dpr={[1, 1.75]} camera={{ position: [8, 9, 11], fov: 42 }}><OfficeWorld agents={agents} activeAgent={activeAgent} onSelect={onSelect} /></Canvas><div className="scene-guide"><span>DRAG</span> pan camera <i /> <span>SCROLL</span> zoom <i /> click employee for detail</div></div>;
}
