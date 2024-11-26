import Link from 'next/link'
import { User, Search } from 'lucide-react'

export default function SocialMediaTools() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Social Media Investigative Tools</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <Link href="/tools/social-media/username-search" className="block">
            <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500 hover:border-cyan-400 transition-colors">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <User className="w-6 h-6 mr-2 text-cyan-400" />
                Username Search
              </h2>
              <p className="text-gray-400">Search for a username across multiple platforms (Twitter, Instagram, TikTok, etc.)</p>
            </div>
          </Link>
          <Link href="/tools/social-media/profile-analyzer" className="block">
            <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500 hover:border-cyan-400 transition-colors">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Search className="w-6 h-6 mr-2 text-cyan-400" />
                Profile Analyzer
              </h2>
              <p className="text-gray-400">Extract and analyze public data from social media profiles.</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}