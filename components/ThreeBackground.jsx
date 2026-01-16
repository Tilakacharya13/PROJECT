import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars, Torus } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedSphere = ({ position, color, scale, speed }) => {
  const meshRef = useRef(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3 * speed;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 32, 32]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

const AnimatedTorus = ({ position, color, scale, speed, isCentral = false }) => {
  const meshRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotate faster when hovered
      const rotationSpeed = hovered ? speed * 4 : speed;
      meshRef.current.rotation.x += delta * 0.1 * rotationSpeed;
      meshRef.current.rotation.y += delta * 0.2 * rotationSpeed;
      
      // Pulse emission intensity when hovered
      const material = meshRef.current.material;
      const targetIntensity = hovered ? 2.5 : 0.2;
      material.emissiveIntensity = THREE.MathUtils.lerp(material.emissiveIntensity, targetIntensity, delta * 5);
    }
  });

  return (
    <Float speed={speed} rotationIntensity={isCentral ? 0.2 : 0.5} floatIntensity={isCentral ? 0.5 : 1}>
      <Torus 
        ref={meshRef} 
        args={isCentral ? [2.5, 0.2, 32, 100] : [3, 0.15, 16, 100]} 
        position={position} 
        scale={scale}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { setHovered(false); document.body.style.cursor = 'auto'; }}
      >
        <meshStandardMaterial
          color={color}
          roughness={0.1}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.2}
          wireframe
        />
      </Torus>
    </Float>
  );
};

const CameraRig = () => {
  const focusPoint = useRef(new THREE.Vector3(0, 0, -5));

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    
    // Sophisticated organic movement using Perlin-noise-like combinations of sine waves
    // This avoids the mechanical feel of a single sine wave
    const organicX = Math.sin(t * 0.1) * 2 + Math.cos(t * 0.2) * 0.5;
    const organicY = Math.cos(t * 0.15) * 1.5 + Math.sin(t * 0.1) * 0.5;
    const organicZ = 10 + Math.sin(t * 0.05) * 2 + Math.sin(t * 0.3) * 0.5;

    // Use exponential smoothing for fluid camera movement
    // The damping factor is adjusted by delta to maintain consistency across frame rates
    const cameraDamping = 1 - Math.exp(-2 * delta); 
    state.camera.position.lerp(new THREE.Vector3(organicX, organicY, organicZ), cameraDamping);

    // Focus Point Logic:
    // Tracks the central torus at [0,0,-5] but is pulled by mouse interactions.
    // We use independent damping for the focus point to create a sense of weight.
    const mouseX = state.pointer.x * 4; // Amplified reach
    const mouseY = state.pointer.y * 2;
    
    const targetFocus = new THREE.Vector3(mouseX, mouseY, -5);
    
    // Higher damping factor means faster response, lower means more drag/weight
    const focusDamping = 1 - Math.exp(-5 * delta); 
    focusPoint.current.lerp(targetFocus, focusDamping);

    state.camera.lookAt(focusPoint.current);
  });
  return null;
};

export const ThreeBackground = () => {
  return (
    <div className="fixed inset-0 z-0 opacity-40">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <CameraRig />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#eeff00" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#b026ff" />
        
        <AnimatedSphere position={[-4, 2, -5]} color="#222" scale={1.5} speed={1.5} />
        <AnimatedSphere position={[5, -2, -8]} color="#1a1a1a" scale={2} speed={1} />
        <AnimatedSphere position={[0, -5, -10]} color="#333" scale={3} speed={0.8} />

        {/* Central Main Torus */}
        <AnimatedTorus position={[0, 0, -5]} color="#b026ff" scale={1.8} speed={0.5} isCentral={true} />
        
        {/* Secondary Torus */}
        <AnimatedTorus position={[4, 3, -10]} color="#eeff00" scale={1.2} speed={0.7} />
        
        {/* Tiny particles for depth */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
};
