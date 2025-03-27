import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import GallerySection from "@/components/GallerySection";
import BuildsSection from "@/components/BuildsSection";
import ComponentsSection from "@/components/ComponentsSection";
import ContactSection from "@/components/ContactSection";

const Home = () => {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <ServicesSection />
      <GallerySection />
      <BuildsSection />
      <ComponentsSection />
      <ContactSection />
    </div>
  );
};

export default Home;
