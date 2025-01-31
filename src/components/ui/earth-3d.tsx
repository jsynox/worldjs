"use client"

import React, { useRef } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import * as THREE from "three"
import { TextureLoader } from "three"

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null)
  const cloudRef = useRef<THREE.Mesh>(null)
  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(TextureLoader, [
    "/earth_daymap.jpg",
    "/earth_normal_map.jpg",
    "/earth_specular_map.jpg",
    "/earth_clouds.jpg",
  ])

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()
    if (earthRef.current) earthRef.current.rotation.y = elapsedTime / 6
    if (cloudRef.current) cloudRef.current.rotation.y = elapsedTime / 5.5
  })

  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight color="#f6f3ea" position={[2, 0, 5]} intensity={1.2} />
      <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade />
      <mesh ref={cloudRef}>
        <sphereGeometry args={[1.005, 32, 32]} />
        <meshPhongMaterial map={cloudsMap} opacity={0.4} depthWrite={true} transparent={true} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial specularMap={specularMap} />
        <meshStandardMaterial map={colorMap} normalMap={normalMap} metalness={0.4} roughness={0.7} />
      </mesh>
    </>
  )
}

export default function Earth3D() {
  return (
    <Canvas>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 1.5}
      />
      <Earth />
    </Canvas>
  )
}




