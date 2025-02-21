import Link from 'next/link'
import { User, Search } from 'lucide-react'

export default function DarkWebTools() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Dark Web Exploration Tools</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <Link href="/tools/dark-web-exploration/dark-web-link" className="block">
            <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500 hover:border-cyan-400 transition-colors hover:bg-cyan-900 hover:bg-opacity-20">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <User className="w-6 h-6 mr-2 text-cyan-400" />
                Dark Web Link Checker
              </h2>
              <p className="text-gray-400">Search public Tor directories.</p>
            </div>
          </Link>
          <Link href="/tools/dark-web-exploration/data-breach-scanner" className="block">
            <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500 hover:border-cyan-400 transition-colors hover:bg-cyan-900 hover:bg-opacity-20">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Search className="w-6 h-6 mr-2 text-cyan-400" />
                Data Breach Scanner
              </h2>
              <p className="text-gray-400">Find emails or passwords exposed on the dark web.</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}