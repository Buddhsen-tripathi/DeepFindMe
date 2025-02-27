import Link from 'next/link'
import { Lock, FileText, Image, Hash } from 'lucide-react'

export default function EncryptionAndHashingTools() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Encryption & Hashing Tools</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <Link href="/tools/encryption-and-hashing/message-encryptor" className="block">
            <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500 hover:border-cyan-400 transition-colors hover:bg-cyan-900 hover:bg-opacity-20">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Lock className="w-6 h-6 mr-2 text-cyan-400" />
                Message Encryptor
              </h2>
              <p className="text-gray-400">Securely encrypt and decrypt text messages.</p>
            </div>
          </Link>
          <Link href="/tools/encryption-and-hashing/file-protector" className="block">
            <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500 hover:border-cyan-400 transition-colors hover:bg-cyan-900 hover:bg-opacity-20">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <FileText className="w-6 h-6 mr-2 text-cyan-400" />
                File Protector
              </h2>
              <p className="text-gray-400">Encrypt PDFs, images, and other sensitive files.</p>
            </div>
          </Link>
          <Link href="/tools/encryption-and-hashing/steganography-tool" className="block">
            <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500 hover:border-cyan-400 transition-colors hover:bg-cyan-900 hover:bg-opacity-20">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Image className="w-6 h-6 mr-2 text-cyan-400" />
                Steganography Tool
              </h2>
              <p className="text-gray-400">Hide and reveal secret messages inside images.</p>
            </div>
          </Link>
          <Link href="/tools/encryption-and-hashing/hashing-tool" className="block">
            <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500 hover:border-cyan-400 transition-colors hover:bg-cyan-900 hover:bg-opacity-20">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Hash className="w-6 h-6 mr-2 text-cyan-400" />
                Hashing Tool
              </h2>
              <p className="text-gray-400">Generate secure cryptographic hashes (SHA, MD5, etc.).</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}