"use client";

import { useEffect, useRef } from "react";
import Globe from "three-globe"; // Ensure you have this package installed
import * as THREE from "three"; // Required for Three.js context

const GlobeConfig = () => {
  const globeEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let globeInstance: Globe | null = null;
    let renderer: THREE.WebGLRenderer | null = null; // Store renderer for cleanup
    let animationFrameId: number;

    if (globeEl.current) {
      // Create a Three.js scene
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(176, 176);

      if (globeEl.current) {
        globeEl.current.appendChild(renderer.domElement);
      }

      // Instantiate the globe
      globeInstance = new Globe();
      globeInstance
        .globeImageUrl("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
        .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png");
        // .backgroundColor("rgba(0,0,0,0)"); // ❌ This method does not exist

      scene.add(globeInstance);
      camera.position.z = 400;

      // Animation loop
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        if (globeInstance) {
          (globeInstance as any).rotation.y += 0.001; // Fix TypeScript issue
        }
        renderer?.render(scene, camera);
      };

      animate();
    }

    return () => {
      // Cleanup function
      if (globeInstance) {
        (globeInstance as any).dispose?.(); // Ensure safe disposal
      }
      if (renderer) {
        renderer.dispose(); // Clean up Three.js renderer
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId); // Stop animation loop
      }
    };
  }, []);

  return <div ref={globeEl} />;
};

export default GlobeConfig;
