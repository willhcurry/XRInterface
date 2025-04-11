// App.jsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, Box } from "@react-three/drei";

function Panel({ position, label }) {
  return (
    <Box position={position} args={[2, 1, 0.1]}>
      <meshStandardMaterial color="#3399ff" transparent opacity={0.7} />
      <Html center>{label}</Html>
    </Box>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.3} />
      <Panel position={[-2, 0, 0]} label="Settings" />
      <Panel position={[0, 0, 0]} label="App 1" />
      <Panel position={[2, 0, 0]} label="Notifications" />
      <OrbitControls />
    </>
  );
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <Scene />
    </Canvas>
  );
}
