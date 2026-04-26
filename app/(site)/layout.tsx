import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <WhatsAppButton />
    </>
  );
}
