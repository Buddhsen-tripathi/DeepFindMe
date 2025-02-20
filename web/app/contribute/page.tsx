'use client';

import { useRouter } from 'next/navigation';
import { User } from 'lucide-react';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';

export default function Contribute() {
  const router = useRouter();
  const githubSponsorsLink = 'https://github.com/sponsors/buddhsen-tripathi';

  return (
    <main className='flex flex-col min-h-screen'>
      <NavBar />
      <section className="pt-24 flex-grow bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center text-white">Support Our Work</h2>
          <p className="text-xl mb-12 text-center text-gray-300 max-w-3xl mx-auto">
            Your support helps us keep building free and open-source OSINT tools.
            <br />
            Every contributor will be <strong>featured on the homepage and this page</strong> as a token of appreciation.
          </p>

          {/* Individual Sponsorship Section */}
          <div className="text-center mt-8">
            <button
              onClick={() => window.open(githubSponsorsLink, '_blank')}
              className="inline-flex items-center bg-cyan-500 text-gray-900 font-bold py-3 px-6 rounded-full hover:bg-cyan-400 transition duration-300 transform hover:scale-105 shadow-lg"
            >
              Sponsor via GitHub
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

          {/* Organization Sponsorship Section */}
          <div className="text-center mt-20">
            <h3 className="text-3xl font-semibold text-white mb-4">Are You an Organization?</h3>
            <p className="text-gray-400 mb-6">
              If you're an organization interested in sponsoring or collaborating with us, let's talk!
            </p>
            <button
              onClick={() => router.push('/contribute/organization')}
              className="inline-flex items-center bg-gray-700 text-white font-bold py-3 px-6 rounded-full hover:bg-gray-600 transition duration-300 transform hover:scale-105 shadow-lg"
            >
              Contact Us for Sponsorship
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}