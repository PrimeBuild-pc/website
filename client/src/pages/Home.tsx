import { useEffect, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import GallerySection from "@/components/GallerySection";
import BuildsSection from "@/components/BuildsSection";
import ComponentsSection from "@/components/ComponentsSection";
import AppsSection from "@/components/AppsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import { trackSectionView } from "@/lib/analytics";

const Home = () => {
  const sectionsRef = useRef<Map<string, boolean>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            // Only track each section once per session
            if (sectionId && !sectionsRef.current.get(sectionId)) {
              trackSectionView(sectionId);
              sectionsRef.current.set(sectionId, true);
            }
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of section is visible
    );

    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <HeroSection />
      <ServicesSection />
      <GallerySection />
      <BuildsSection />
      <ComponentsSection />
      <AppsSection />
      <FAQSection />
      <ContactSection />
    </div>
  );
};

export default Home;
