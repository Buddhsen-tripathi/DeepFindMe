import Link from 'next/link'
import { User, Search } from 'lucide-react'

export default function PeopleFinderTools() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">People Finder Tools</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <Link href="/tools/people-finder/face-recognition-search" className="block">
            <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500 hover:border-cyan-400 transition-colors">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <User className="w-6 h-6 mr-2 text-cyan-400" />
                Face Recognition Search
              </h2>
              <p className="text-gray-400">Use reverse image search to find faces across the web.</p>
            </div>
          </Link>
          <Link href="/tools/people-finder/deep-search" className="block">
            <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500 hover:border-cyan-400 transition-colors">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Search className="w-6 h-6 mr-2 text-cyan-400" />
                Deep Search
              </h2>
              <p className="text-gray-400">Crawl obscure public records like court documents or archives.</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}