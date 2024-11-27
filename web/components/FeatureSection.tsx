"use client"

import { useEffect, useRef } from 'react'
import { Network, Search, Shield, Zap } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function FeatureSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const router = useRouter()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up')
            entry.target.classList.add(`animate-fade-in-up-${index}`);
          }
        })
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    )

    const features = sectionRef.current?.querySelectorAll('.feature-card')
    features?.forEach(feature => observer.observe(feature))

    return () => {
      features?.forEach(feature => observer.unobserve(feature))
    }
  }, [])

  const features = [
    {
      icon: <Network className="w-12 h-12 text-cyan-400" />,
      title: "People Finder",
      description: "Aggregate public records, social media, and news mentions.",
      href: "/tools/people-finder"
    },
    {
      icon: <Search className="w-12 h-12 text-cyan-400" />,
      title: "Username Search",
      description: "Search for a username across multiple platforms (Twitter, Instagram, TikTok, etc.)",
      href: "/tools/social-media/username-search"
    },
    {
      icon: <Shield className="w-12 h-12 text-cyan-400" />,
      title: "Metadata Extractor",
      description: "Analyze files (documents, images, videos) for hidden metadata.",
      href: "/tools/file-analysis/metadata-extractor"
    },
    {
      icon: <Zap className="w-12 h-12 text-cyan-400" />,
      title: "IP to Location Tracker",
      description: "Trace IP addresses to physical locations.",
      href: "/tools/ip-tracker"
    }
  ]

  const handleCardClick = (href: string) => {
    if (href) {
      router.push(href)
    } else {
      alert("This feature is coming soon!")
    }
  }

  return (
    <section ref={sectionRef} className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-white pb-1">Frequently Used Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card bg-black bg-opacity-50 p-6 rounded-lg border border-cyan-500 hover:border-cyan-400 transition-colors group hover:bg-cyan-900 hover:bg-opacity-20 cursor-pointer"
              onClick={() => handleCardClick(feature.href)}
            >
              <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white text-center group-hover:text-cyan-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-center group-hover:text-white transition-colors">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center pt-1">
          <Link 
            href="/tools" 
            className="inline-flex items-center bg-cyan-500 text-gray-900 font-bold py-3 px-6 rounded-full hover:bg-cyan-400 transition duration-300 transform hover:scale-105 shadow-lg"
          >
            More Tools
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}