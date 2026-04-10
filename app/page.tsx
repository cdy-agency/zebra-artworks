import Navbar from "@/components/NavBar";
import HeroSection from "@/components/Herosection";
import ArchitectureSection from "@/components/ArchitectureSection";
import InteriorGallery from "@/components/InteriorGallery";
import ModernHero from "@/components/ModernHero";
import FeedbackSection from "@/components/FeedbackSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ArchitectureSection />
      <InteriorGallery/>
      <ModernHero/>
      <FeedbackSection/>
      <Footer/>
    </main>
  );
}