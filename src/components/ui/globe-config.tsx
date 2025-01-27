"use client";

import { useEffect, useRef } from "react";
import Globe from "three-globe"; // Ensure you have this package installed
import * as THREE from "three"; // Required for Three.js context

const GlobeConfig = () => {
  const globeEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let globeInstance: Globe | null = null;

    if (globeEl.current) {
      // Create a Three.js scene
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(176, 176);

      if (globeEl.current) {
        globeEl.current.appendChild(renderer.domElement);
      }

      // Instantiate the globe
      globeInstance = new Globe();
      globeInstance
        .globeImageUrl("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
        .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
        .backgroundColor("rgba(0,0,0,0)");

      scene.add(globeInstance);
      camera.position.z = 400;

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        globeInstance?.rotation.y += 0.001; // Add rotation to the globe
        renderer.render(scene, camera);
      };

      animate();
    }

    return () => {
      // Cleanup
      if (globeInstance) {
        globeInstance.dispose?.(); // Dispose of the globe
      }
    };
  }, []);

  return <div ref={globeEl} />;
};

export default GlobeConfig;
