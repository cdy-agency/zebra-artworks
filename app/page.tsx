import Navbar from "@/components/NavBar";
import HeroSection from "@/components/Herosection";
import InteriorGallery from "@/components/InteriorGallery";
import ModernHero from "@/components/ModernHero";
import Footer from "@/components/Footer";
import CompanyIntro from "@/components/CompanyIntro";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <InteriorGallery/>
      <ModernHero/>
      <CompanyIntro/>
      <Footer/>
    </main>
  );
}