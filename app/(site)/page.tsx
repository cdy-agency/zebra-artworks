import HeroSection from "@/components/Herosection";
import ServicesSection from "@/components/Servicessection";
import LatestDesigns from "@/components/InteriorDesign";
import LatestConstruction from "@/components/Construction";
import ReadySection from "@/components/ReadToConnect";
import NewsSection from "@/components/NewsSection";
import PartnersSection from "@/components/PartnersSection";
import WhyChooseUs from "@/components/services/Whychooseus";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <LatestDesigns />
      <LatestConstruction />
      <PartnersSection />
      <WhyChooseUs />
      <ReadySection />
      <NewsSection />
    </main>
  );
}
