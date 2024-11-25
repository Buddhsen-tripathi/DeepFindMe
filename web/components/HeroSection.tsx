import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden h-[60vh] flex items-center">

      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-500 to-teal-400"></div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
            DeepFind.Me
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-200">
            Your Gateway to Smarter OSINT.
          </p>
          <p className="mt-2 max-w-2xl mx-auto text-base sm:text-lg text-gray-300 italic">
            Mapping the web, one footprint at a time.
          </p>
          <div className="mt-10">
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-50 hover:text-blue-600 transition duration-150 ease-in-out"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Optional: Add a subtle pattern overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/[0.15] to-transparent mix-blend-overlay"></div>
    </section>
  )
}