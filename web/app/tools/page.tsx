"use client"

import { useRef, useEffect } from 'react'
import { User, Globe, Shield, Zap, FileSearch, Mail } from 'lucide-react'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

const tools = [
  {
    category: "People Search",
    icon: <User className="w-12 h-12 text-cyan-400" />,
    tools: [
      { name: "People Finder", description: "Aggregate public records, social media, and news mentions." },
      { name: "Social Media Analyzer", description: "In-depth analysis of social media profiles and activity." },
    ]
  },
  {
    category: "Web Intelligence",
    icon: <Globe className="w-12 h-12 text-cyan-400" />,
    tools: [
      { name: "Domain Investigator", description: "Comprehensive domain and website analysis." },
      { name: "Dark Web Scanner", description: "Search and monitor dark web mentions and activities." },
    ]
  },
  {
    category: "Digital Forensics",
    icon: <Shield className="w-12 h-12 text-cyan-400" />,
    tools: [
      { name: "Metadata Extractor", description: "Analyze files for hidden metadata and information." },
      { name: "Image Forensics", description: "Advanced image analysis and verification tools." },
    ]
  },
  {
    category: "Network Analysis",
    icon: <Zap className="w-12 h-12 text-cyan-400" />,
    tools: [
      { name: "IP Geolocation", description: "Trace IP addresses to physical locations and gather related info." },
      { name: "Network Mapper", description: "Visualize and analyze network structures and connections." },
    ]
  },
  {
    category: "Data Extraction",
    icon: <FileSearch className="w-12 h-12 text-cyan-400" />,
    tools: [
      { name: "Web Scraper", description: "Extract structured data from websites and web applications." },
      { name: "PDF Analyzer", description: "Extract and analyze content from PDF documents." },
    ]
  },
  {
    category: "Communication Analysis",
    icon: <Mail className="w-12 h-12 text-cyan-400" />,
    tools: [
      { name: "Email Tracker", description: "Analyze email headers and track email origins." },
      { name: "Phone Number Lookup", description: "Gather information associated with phone numbers." },
    ]
  },
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
    <div className="min-h-screen bg-gray-900 text-white">
      <NavBar />
      <main className="pt-16">
        <section ref={sectionRef} className="py-16 opacity-0">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-8 text-center">DeepFind.Me Tools</h1>
            <p className="text-xl mb-12 text-center text-gray-300 max-w-3xl mx-auto">
              Explore our comprehensive suite of OSINT tools designed to enhance your digital investigations and research.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools.map((category, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-lg border border-cyan-500 hover:border-cyan-400 transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center mb-4">
                    {category.icon}
                    <h2 className="text-2xl font-semibold ml-4">{category.category}</h2>
                  </div>
                  <ul className="space-y-4">
                    {category.tools.map((tool, toolIndex) => (
                      <li key={toolIndex}>
                        <h3 className="text-lg font-medium text-cyan-400">{tool.name}</h3>
                        <p className="text-gray-400">{tool.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

