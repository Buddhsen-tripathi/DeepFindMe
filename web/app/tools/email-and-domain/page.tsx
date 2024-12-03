import Link from 'next/link'
import { User, Search } from 'lucide-react'

export default function SocialMediaTools() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold mb-8 text-center">Social Media Investigative Tools</h1>
                <div className="grid md:grid-cols-2 gap-8">
                    <Link href="/tools/email-and-domain/domain-whois-lookup" className="block">
                        <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500 hover:border-cyan-400 transition-colors">
                            <h2 className="text-2xl font-semibold mb-4 flex items-center">
                                <User className="w-6 h-6 mr-2 text-cyan-400" />
                                Domain WHOIS Lookup
                            </h2>
                            <p className="text-gray-400">Extract registration details of a domain.</p>
                        </div>
                    </Link>
                    <Link href="/tools/email-and-domain/email-validator" className="block">
                        <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500 hover:border-cyan-400 transition-colors">
                            <h2 className="text-2xl font-semibold mb-4 flex items-center">
                                <Search className="w-6 h-6 mr-2 text-cyan-400" />
                                Email Validator
                            </h2>
                            <p className="text-gray-400">Check if an email exists and identify associated breaches.</p>
                        </div>
                    </Link>
                    <Link href="/tools/email-and-domain/reverse-email-search" className="block">
                        <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500 hover:border-cyan-400 transition-colors">
                            <h2 className="text-2xl font-semibold mb-4 flex items-center">
                                <Search className="w-6 h-6 mr-2 text-cyan-400" />
                                Reverse Email Search
                            </h2>
                            <p className="text-gray-400">Discover linked accounts, platforms, or public records.</p>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    )
}