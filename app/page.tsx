import HeroSection from "@/components/Herosection";
import ServicesSection from "@/components/Servicessection";
import LatestDesigns from "@/components/InteriorDesign";
import LatestConstruction from "@/components/Construction";
import ReadySection from "@/components/ReadToConnect";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <LatestDesigns />
      <LatestConstruction />
      <ReadySection />
    </main>
  );
}
