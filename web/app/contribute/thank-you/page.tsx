import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
        <p className="text-xl mb-8 text-gray-300">
          We appreciate your support and contribution to our platform.
        </p>
        <Link
          href="/"
          className="inline-flex items-center bg-cyan-500 text-gray-900 font-bold py-3 px-6 rounded-full hover:bg-cyan-400 transition duration-300 transform hover:scale-105 shadow-lg"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}