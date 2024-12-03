import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <CheckCircle className="w-20 h-20 text-cyan-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
        <p className="text-xl mb-8 text-gray-300">
          We've received your message and will get back to you soon.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-cyan-500 hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
}