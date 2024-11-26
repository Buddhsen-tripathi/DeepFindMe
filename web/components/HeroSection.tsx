"use client"

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import * as THREE from 'three'

export default function HeroSection() {
  const globeRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!globeRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    globeRef.current.appendChild(renderer.domElement)

    const geometry = new THREE.SphereGeometry(5, 32, 32)
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    })
    const globe = new THREE.Mesh(geometry, material)
    scene.add(globe)

    camera.position.z = 15

    function animate() {
      requestAnimationFrame(animate)
      globe.rotation.x += 0.001
      globe.rotation.y += 0.001
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      renderer.dispose()
      if (globeRef.current) {
        globeRef.current.removeChild(renderer.domElement)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up')
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden opacity-0 h-screen flex items-center justify-center pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-black to-blue-900 z-0"></div>
      <div ref={globeRef} className="absolute inset-0 z-10"></div>
      <div className="container mx-auto px-4 relative z-20">
        <div className="text-center">
          <h1 className="text-6xl md:text-6xl font-bold mb-6 text-white leading-tight">
            Unveil the <span className="text-cyan-400">Digital Cosmos</span>
          </h1>
          <p className="text-2xl mb-8 text-gray-100 max-w-2xl mx-auto">
            Navigate the vast expanse of online data with DeepFind.Me's cutting-edge OSINT tools and visualizations.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/explore" className="bg-cyan-500 text-black font-bold py-3 px-6 rounded-full hover:bg-cyan-400 transition duration-300">
              Start Exploring
            </Link>
            <Link href="/demo" className="bg-gray-800 text-white font-bold py-3 px-6 rounded-full hover:bg-gray-700 transition duration-300">
              Watch Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
