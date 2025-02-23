import Link from 'next/link'
import { Code, Hash, Database } from 'lucide-react'

export default function EncodingAndDecodingTools() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Encoding & Decoding Tools</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <Link href="/tools/encoding-and-decoding/base64-converter" className="block">
            <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500 hover:border-cyan-400 transition-colors hover:bg-cyan-900 hover:bg-opacity-20">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Code className="w-6 h-6 mr-2 text-cyan-400" />
                Base64 Converter
              </h2>
              <p className="text-gray-400">Encode and decode text or files using Base64.</p>
            </div>
          </Link>
          <Link href="/tools/encoding-and-decoding/url-encoder" className="block">
            <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500 hover:border-cyan-400 transition-colors hover:bg-cyan-900 hover:bg-opacity-20">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Hash className="w-6 h-6 mr-2 text-cyan-400" />
                URL Encoder/Decoder
              </h2>
              <p className="text-gray-400">Convert URLs to encoded format and back.</p>
            </div>
          </Link>
          <Link href="/tools/encoding-and-decoding/json-formatter" className="block">
            <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500 hover:border-cyan-400 transition-colors hover:bg-cyan-900 hover:bg-opacity-20">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Database className="w-6 h-6 mr-2 text-cyan-400" />
                JSON Formatter
              </h2>
              <p className="text-gray-400">Format, minify, and beautify JSON data.</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}