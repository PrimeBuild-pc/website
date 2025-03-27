import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import GallerySection from "@/components/GallerySection";
import BuildsSection from "@/components/BuildsSection";
import ComponentsSection from "@/components/ComponentsSection";
import AppsSection from "@/components/AppsSection";
import ContactSection from "@/components/ContactSection";

const Home = () => {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <ServicesSection />
      <GallerySection />
      <BuildsSection />
      <ComponentsSection />
      <AppsSection />
      <ContactSection />
    </div>
  );
};

export default Home;
