import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { ChevronRight, Play, Pause, RotateCw } from 'lucide-react'

export default function Contribute() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavBar />
      <main className="flex-grow container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-6 text-white text-center">Explore DeepFind.Me in Action</h1>
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-8">
            <div className="aspect-w-16 aspect-h-9 mb-6">
              <iframe
                className="w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="DeepFind.Me Demo Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="flex justify-center space-x-4">
              <button className="bg-cyan-500 text-black font-bold py-2 px-4 rounded-full hover:bg-cyan-400 transition duration-300 flex items-center">
                <Play className="mr-2" size={20} />
                Play
              </button>
              <button className="bg-gray-700 text-white font-bold py-2 px-4 rounded-full hover:bg-gray-600 transition duration-300 flex items-center">
                <Pause className="mr-2" size={20} />
                Pause
              </button>
              <button className="bg-gray-700 text-white font-bold py-2 px-4 rounded-full hover:bg-gray-600 transition duration-300 flex items-center">
                <RotateCw className="mr-2" size={20} />
                Restart
              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">Key Features</h2>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <ChevronRight className="text-cyan-400 mr-2" size={20} />
                  Advanced OSINT Tools
                </li>
                <li className="flex items-center">
                  <ChevronRight className="text-cyan-400 mr-2" size={20} />
                  Real-time Data Visualization
                </li>
                <li className="flex items-center">
                  <ChevronRight className="text-cyan-400 mr-2" size={20} />
                  Customizable Dashboards
                </li>
                <li className="flex items-center">
                  <ChevronRight className="text-cyan-400 mr-2" size={20} />
                  Secure and Private
                </li>
              </ul>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">Why DeepFind.Me?</h2>
              <p className="text-gray-300 mb-4">
                DeepFind.Me offers cutting-edge OSINT capabilities, allowing you to uncover hidden connections and gather crucial intelligence with ease. Our platform is designed for both beginners and experts, providing powerful tools in an intuitive interface.
              </p>
              <a href="/signup" className="inline-block bg-cyan-500 text-black font-bold py-2 px-6 rounded-full hover:bg-cyan-400 transition duration-300">
                Get Started Now
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}