import Link from "next/link";

export default function Blogs() {
  return (
    <div className="flex-grow pt-28 justify-center items-center">
      <h1 className="text-4xl font-bold text-center text-cyan-400 mb-4">Welcome to Our Blog!</h1>
      <p className="text-lg text-center text-gray-300 mb-8">
        We're working hard to bring you great content. Stay tuned for exciting blog posts on tech, programming, and more!
      </p>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-xl font-semibold text-yellow-400 text-center mb-4">
          This page is currently under construction
        </h2>
        <p className="text-center text-gray-400 mb-6">
          We are putting the finishing touches on our blog. Check back soon for new articles and updates!
        </p>
        <div className="flex justify-center">
          <Link href="">
          <button className="px-4 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition">
            Back to Home
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}