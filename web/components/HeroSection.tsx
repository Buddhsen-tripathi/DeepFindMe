"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

// Dynamically import the globe rendering logic
const GlobeRenderer = dynamic(() => import("@/components/GlobeRenderer"), { ssr: false });

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden h-screen flex items-center justify-center pt-16"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black to-blue-900 z-0"></div>
      <noscript>
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold">
            Unveil the <span className="text-cyan-400">Digital Cosmos</span>
          </h1>
          <p className="text-xl mt-4">
            DeepFind.Me's cutting-edge OSINT tools and visualizations await
            you.
          </p>
        </div>
      </noscript>
      {/* Render the dynamically loaded client-side globe */}
      <GlobeRenderer />
      <div className="container mx-auto px-4 relative z-20">
        <div className="text-center">
          <h1 className="text-6xl md:text-6xl font-bold mb-6 text-white leading-tight">
            Unveil the <span className="text-cyan-400">Digital Cosmos</span>
          </h1>
          <p className="text-2xl mb-8 text-gray-100 max-w-2xl mx-auto">
            Navigate the vast expanse of online data with DeepFind.Me&#39;s cutting-edge OSINT tools and visualizations.
          </p>

          <div className="flex justify-center space-x-4">
            <Link
              href="/tools"
              aria-label="Explore Tools"
              className="bg-cyan-500 text-black font-bold py-3 px-6 rounded-full hover:bg-cyan-400 transition duration-300"
            >
              Start Exploring
            </Link>
            <Link
              href="/demo"
              aria-label="Watch Demo"
              className="bg-gray-800 text-white font-bold py-3 px-6 rounded-full hover:bg-gray-700 transition duration-300"
            >
              Watch Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
