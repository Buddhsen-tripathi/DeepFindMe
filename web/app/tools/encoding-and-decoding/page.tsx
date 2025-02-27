import Link from 'next/link'
import { Code, Hash, Database, Key, QrCode } from 'lucide-react'

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
                Base64 Encoder/Decoder
              </h2>
              <p className="text-gray-400">Encode and decode text or files using Base64.</p>
            </div>
          </Link>
          <Link href="/tools/encoding-and-decoding/hex-converter" className="block">
            <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500 hover:border-cyan-400 transition-colors hover:bg-cyan-900 hover:bg-opacity-20">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Hash className="w-6 h-6 mr-2 text-cyan-400" />
                Hex Encoder/Decoder
              </h2>
              <p className="text-gray-400">Convert text to hexadecimal and vice versa.</p>
            </div>
          </Link>
          <Link href="/tools/encoding-and-decoding/jwt-decoder" className="block">
            <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500 hover:border-cyan-400 transition-colors hover:bg-cyan-900 hover:bg-opacity-20">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Key className="w-6 h-6 mr-2 text-cyan-400" />
                JWT Decoder
              </h2>
              <p className="text-gray-400">Decode and inspect JSON Web Tokens (JWT) without a secret.</p>
            </div>
          </Link>
          <Link href="/tools/encoding-and-decoding/qr-code-generator" className="block">
            <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500 hover:border-cyan-400 transition-colors hover:bg-cyan-900 hover:bg-opacity-20">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <QrCode className="w-6 h-6 mr-2 text-cyan-400" />
                QR Code Generator & Decoder
              </h2>
              <p className="text-gray-400">Generate QR codes from text or URLs and decode them back.</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}