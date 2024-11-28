import HeroSection from "@/components/HeroSection";
import NavBar from "@/components/NavBar";
import FeatureSection from "@/components/FeatureSection";
import Footer from "@/components/Footer";
import Sponsor from "@/components/Sponsor";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />
      <main className="flex-grow">
        <HeroSection />
        <FeatureSection />
        <Sponsor />
      </main>
      <Footer />
    </div>
  );
}
