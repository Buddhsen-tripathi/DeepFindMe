import Link from 'next/link'
import { User } from 'lucide-react'

export default function Sponsor() {
  const individualTiers = [
    { icon: <User className="w-8 h-8 text-cyan-400" />, name: "Gold Contributor", description: "Your name listed on our contributors page as a valued supporter" },
    { icon: <User className="w-8 h-8 text-cyan-400" />, name: "Platinum Contributor", description: "Featured on the homepage and an exclusive shoutout on our platforms" },
  ]

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center text-white">Support Us</h2>
        <p className="text-xl mb-12 text-center text-gray-300 max-w-3xl mx-auto">
          Contribute to the growth and success of our platform.<br />Choose to contribute as an individual and get featured, or contact us if you're an organization looking to collaborate with us.
        </p>

        {/* Individual Contributors Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {individualTiers.map((tier, index) => (
              <div key={index} className="bg-black bg-opacity-50 p-6 rounded-lg border border-cyan-500 hover:border-cyan-400 transition-colors group hover:bg-cyan-900 hover:bg-opacity-20">
                <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {tier.icon}
                </div>
                <h4 className="text-xl font-semibold mb-2 text-white text-center group-hover:text-cyan-400 transition-colors">
                  {tier.name}
                </h4>
                <p className="text-gray-400 text-center group-hover:text-white transition-colors">
                  {tier.description}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link 
              href="/contribute" 
              className="inline-flex items-center bg-cyan-500 text-gray-900 font-bold py-3 px-6 rounded-full hover:bg-cyan-400 transition duration-300 transform hover:scale-105 shadow-lg"
            >
              Contribute Now
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Organization Collaboration CTA */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-semibold text-white mb-4">Are You an Organization?</h3>
          <Link 
            href="/contact" 
            className="inline-flex items-center bg-gray-700 text-white font-bold py-3 px-6 rounded-full hover:bg-gray-600 transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Contact Us for Collaboration
          </Link>
        </div>
      </div>
    </section>
  )
}
