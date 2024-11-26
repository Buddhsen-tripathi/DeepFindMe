"use client"

import { useRef, useEffect } from 'react'
import { useParams } from 'next/navigation'

const toolsData = {
  'social-media': {
    title: "Social Media Investigative Tools",
    tools: [
      { name: "Username Search", description: "Search for a username across multiple platforms (Twitter, Instagram, TikTok, etc.)" },
      { name: "Profile Analyzer", description: "Extract and analyze public data from social media profiles." }
    ]
  },
  'geolocation': {
    title: "Geolocation Tools",
    tools: [
      { name: "Image Geotagger", description: "Extract metadata (EXIF) from photos to determine location and device info." },
      { name: "Satellite & Street View Search", description: "Integrate with Google Maps or OpenStreetMap for location-based searches." },
      { name: "IP to Location Tracker", description: "Trace IP addresses to physical locations." }
    ]
  },
  'email-domain': {
    title: "Email & Domain Investigation",
    tools: [
      { name: "Email Validator", description: "Check if an email exists and identify associated breaches." },
      { name: "Domain WHOIS Lookup", description: "Extract registration details of a domain." },
      { name: "Reverse Email Search", description: "Discover linked accounts, platforms, or public records." }
    ]
  },
  'file-analysis': {
    title: "File Analysis Tools",
    tools: [
      { name: "Metadata Extractor", description: "Analyze files (documents, images, videos) for hidden metadata." },
      { name: "File Hash Checker", description: "Verify file integrity or check against known malicious hashes." },
      { name: "Document Search", description: "Crawl PDFs and docs from public sources for relevant keywords." }
    ]
  },
  'people-search': {
    title: "People Search Tools",
    tools: [
      { name: "People Finder", description: "Aggregate public records, social media, and news mentions." },
      { name: "Face Recognition Search", description: "Use reverse image search to find faces across the web." },
      { name: "Deep Search", description: "Crawl obscure public records like court documents or archives." }
    ]
  },
  'network-cyber': {
    title: "Network & Cyber Tools",
    tools: [
      { name: "Subdomain Finder", description: "Discover subdomains of a given website." },
      { name: "Port Scanner", description: "Identify open ports on a server." },
      { name: "DNS Lookup", description: "Analyze DNS records and history." }
    ]
  },
  'dark-web': {
    title: "Dark Web Exploration Tools",
    tools: [
      { name: "Dark Web Link Checker", description: "Search public Tor directories." },
      { name: "Data Breach Scanner", description: "Find emails or passwords exposed on the dark web." }
    ]
  }
}

export default function ToolCategoryPage() {
  const sectionRef = useRef<HTMLElement>(null)
  const params = useParams()
  const category = params.category as string
  const categoryData = toolsData[category as keyof typeof toolsData]

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

  if (!categoryData) {
    return <div>Category not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="py-16">
        <section ref={sectionRef} className="opacity-0">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-8 text-center">{categoryData.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {categoryData.tools.map((tool, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-lg border border-cyan-500 hover:border-cyan-400 transition-all duration-300 transform hover:scale-105">
                  <h2 className="text-2xl font-semibold mb-4 text-cyan-400">{tool.name}</h2>
                  <p className="text-gray-400">{tool.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}