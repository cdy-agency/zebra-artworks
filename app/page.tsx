import Navbar from "@/components/NavBar";
import HeroSection from "@/components/Herosection";
import ArchitectureSection from "@/components/ArchitectureSection";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ArchitectureSection />
    </main>
  );
}