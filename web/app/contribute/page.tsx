'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from 'lucide-react';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';

export default function Contribute() {
  const router = useRouter();
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const individualTiers = [
    {
      icon: <User className="w-8 h-8 text-cyan-400" />,
      name: 'Gold Contributor',
      description: 'Your name listed on our contributors page as a valued supporter',
      amount: 'Up to $5',
    },
    {
      icon: <User className="w-8 h-8 text-cyan-400" />,
      name: 'Platinum Contributor',
      description: 'Featured on the homepage and an exclusive shoutout on our platforms',
      amount: '$10+',
    },
  ];

  const handleContribute = () => {
    if (selectedTier) {
      router.push(`/contribute/${selectedTier.toLowerCase().replace(' ', '-')}`);
    }
  };

  return (
    <main className='flex flex-col min-h-screen'>
      <NavBar />
      <section className="pt-20 flex-grow bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center text-white">Support Us</h2>
          <p className="text-xl mb-12 text-center text-gray-300 max-w-3xl mx-auto">
            Contribute to the growth and success of our platform.
            <br />
            Choose to contribute as an individual and get featured, or contact us if you're an
            organization looking to collaborate with us.
          </p>

          {/* Individual Contributors Section */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {individualTiers.map((tier, index) => (
                <div
                  key={index}
                  className={`sponsor-card bg-black bg-opacity-50 p-6 rounded-lg border transition-colors group cursor-pointer ${selectedTier === tier.name
                    ? 'border-cyan-400 bg-cyan-900 bg-opacity-20'
                    : 'border-cyan-500 hover:border-cyan-400 hover:bg-cyan-900 hover:bg-opacity-20'
                    }`}
                  onClick={() => setSelectedTier(tier.name)}
                >
                  <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {tier.icon}
                  </div>
                  <h4 className="text-xl font-semibold mb-2 text-white text-center group-hover:text-cyan-400 transition-colors">
                    {tier.name}
                  </h4>
                  <p className="text-gray-400 text-center group-hover:text-white transition-colors">
                    {tier.description}
                  </p>
                  <p className="text-cyan-400 text-center mt-4">
                    {tier.amount} contribution
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button
                onClick={handleContribute}
                disabled={!selectedTier}
                className={`inline-flex items-center bg-cyan-500 text-gray-900 font-bold py-3 px-6 rounded-full hover:bg-cyan-400 transition duration-300 transform hover:scale-105 shadow-lg ${!selectedTier && 'opacity-50 cursor-not-allowed'
                  }`}
              >
                Contribute Now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Organization Collaboration CTA */}
          <div className="text-center mt-12">
            <h3 className="text-2xl font-semibold text-white mb-4">Are You an Organization?</h3>
            <button
              onClick={() => router.push('/contribute/organization')}
              className="inline-flex items-center bg-gray-700 text-white font-bold py-3 px-6 rounded-full hover:bg-gray-600 transition duration-300 transform hover:scale-105 shadow-lg"
            >
              Contact Us for Collaboration
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}