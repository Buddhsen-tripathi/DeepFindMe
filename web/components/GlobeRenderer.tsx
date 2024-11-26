"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function GlobeRenderer() {
  const globeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!globeRef.current) return;

    const container = globeRef.current; 
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(5, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      })
    );

    scene.add(globe);
    camera.position.z = 15;

    function animate() {
      requestAnimationFrame(animate);
      globe.rotation.x += 0.002;
      globe.rotation.y += 0.002;
      globe.rotation.z += 0.00025;
      renderer.render(scene, camera);
    }
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      renderer.dispose();
      container.removeChild(renderer.domElement); 
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div ref={globeRef} className="absolute inset-0 z-10"></div>;
}
