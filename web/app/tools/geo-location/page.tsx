import Link from 'next/link'
import { User, Search } from 'lucide-react'

export default function GeoLocationTools() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Geo Location Tools</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <Link href="/tools/geo-location/ip-geolocation-lookup" className="block">
            <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500 hover:border-cyan-400 transition-colors hover:bg-cyan-900 hover:bg-opacity-20">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <User className="w-6 h-6 mr-2 text-cyan-400" />
                IP Geolocation Lookup
              </h2>
              <p className="text-gray-400">Trace IP addresses to physical locations.</p>
            </div>
          </Link>
          <Link href="/tools/geo-location/satelite-street-view-search" className="block">
            <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500 hover:border-cyan-400 transition-colors hover:bg-cyan-900 hover:bg-opacity-20">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Search className="w-6 h-6 mr-2 text-cyan-400" />
                Satellite Street View Search
              </h2>
              <p className="text-gray-400">Find relative streetview location using AI.</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}