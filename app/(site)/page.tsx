import HeroSection from "@/components/Herosection";
import ServicesSection from "@/components/Servicessection";
import LatestDesigns from "@/components/InteriorDesign";
import LatestConstruction from "@/components/Construction";
import ReadySection from "@/components/ReadToConnect";
import NewsSection from "@/components/NewsSection";
import PartnersSection from "@/components/PartnersSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <LatestDesigns />
      <PartnersSection />
      <LatestConstruction />
      <NewsSection />
      <ReadySection />
    </main>
  );
}
