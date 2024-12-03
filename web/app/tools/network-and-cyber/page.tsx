import Link from 'next/link'
import { User, Search } from 'lucide-react'

export default function NetworkCyberTools() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Network and Cyber Tools</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <Link href="/tools/network-and-cyber/dns-lookup" className="block">
            <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500 hover:border-cyan-400 transition-colors">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <User className="w-6 h-6 mr-2 text-cyan-400" />
                DNS Lookup
              </h2>
              <p className="text-gray-400">Analyze DNS records and history.</p>
            </div>
          </Link>
          <Link href="/tools/network-and-cyber/port-scanner" className="block">
            <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500 hover:border-cyan-400 transition-colors">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <User className="w-6 h-6 mr-2 text-cyan-400" />
                Port Scanner
              </h2>
              <p className="text-gray-400">Identify open ports on a server.</p>
            </div>
          </Link>
          <Link href="/tools/network-and-cyber/subdomain-finder" className="block">
            <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500 hover:border-cyan-400 transition-colors">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Search className="w-6 h-6 mr-2 text-cyan-400" />
                Subdomain Finder
              </h2>
              <p className="text-gray-400">Discover subdomains of a given website.</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}