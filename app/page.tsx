import Navbar from "@/components/NavBar";
import HeroSection from "@/components/Herosection";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/Servicessection";
import LatestDesigns from "@/components/InteriorDesign";
import LatestConstruction from "@/components/Construction";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <LatestDesigns />
      <LatestConstruction />
      <Footer />
    </main>
  );
}