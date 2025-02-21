import Link from 'next/link'
import { User, Search } from 'lucide-react'

export default function FileAnalysisTools() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">File Analysis Tools</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <Link href="/tools/file-analysis/metadata-extractor" className="block">
            <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500 hover:border-cyan-400 transition-colors hover:bg-cyan-900 hover:bg-opacity-20">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <User className="w-6 h-6 mr-2 text-cyan-400" />
                Metadata Extractor
              </h2>
              <p className="text-gray-400">Analyze files (documents, images, videos) for hidden metadata.</p>
            </div>
          </Link>
          <Link href="/tools/file-analysis/file-hash-checker" className="block">
            <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500 hover:border-cyan-400 transition-colors hover:bg-cyan-900 hover:bg-opacity-20">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Search className="w-6 h-6 mr-2 text-cyan-400" />
                File Hash Checker
              </h2>
              <p className="text-gray-400">Verify file integrity or check against known malicious hashes.</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}