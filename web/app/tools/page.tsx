"use client"

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { User, MapPin, Mail, FileText, Search, Network, Shield } from 'lucide-react'

const toolCategories = [
  {
    name: "Social Media Investigative Tools",
    icon: <User className="w-12 h-12 text-cyan-400" />,
    description: "Analyze social media profiles and search usernames across platforms.",
    link: "/tools/social-media"
  },
  {
    name: "Geolocation Tools",
    icon: <MapPin className="w-12 h-12 text-cyan-400" />,
    description: "Extract location data from images and track IP addresses.",
    link: "/tools/geo-location"
  },
  {
    name: "Email & Domain Investigation",
    icon: <Mail className="w-12 h-12 text-cyan-400" />,
    description: "Validate emails, lookup domains, and perform reverse searches.",
    link: "/tools/email-and-domain"
  },
  {
    name: "File Analysis Tools",
    icon: <FileText className="w-12 h-12 text-cyan-400" />,
    description: "Extract metadata, verify file integrity, and search documents.",
    link: "/tools/file-analysis"
  },
  {
    name: "People Finder Tools",
    icon: <Search className="w-12 h-12 text-cyan-400" />,
    description: "Find people, perform facial recognition, and deep search public records.",
    link: "/tools/people-finder"
  },
  {
    name: "Network & Cyber Tools",
    icon: <Network className="w-12 h-12 text-cyan-400" />,
    description: "Discover subdomains, scan ports, and analyze DNS records.",
    link: "/tools/network-and-cyber"
  },
  {
    name: "Dark Web Exploration Tools",
    icon: <Shield className="w-12 h-12 text-cyan-400" />,
    description: "Check dark web links and scan for data breaches.",
    link: "/tools/dark-web-exploration"
  }
]

export default function ToolsPage() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up')
          }
        })
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
    <div className="flex-grow bg-gray-900 text-white">

      <main className="pt-4">
        <section ref={sectionRef} className="py-20 opacity-0">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-8 text-center">DeepFind.Me Tools</h1>
            <p className="text-xl mb-12 text-center text-gray-300 max-w-3xl mx-auto">
              Explore our comprehensive suite of OSINT tools designed to enhance your digital investigations and research.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {toolCategories.map((category, index) => (
                <Link href={category.link} key={index}>
                  <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500 hover:border-cyan-400 transition-all duration-300 transform hover:scale-105 cursor-pointer h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      {category.icon}
                      <h2 className="text-2xl font-semibold ml-4">{category.name}</h2>
                    </div>
                    <p className="text-gray-400 flex-grow">{category.description}</p>
                    <div className="mt-4 text-cyan-400 font-semibold">Explore Tools →</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}