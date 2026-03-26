import { useEffect, useRef, lazy, Suspense } from "react";
import HeroSection from "@/components/HeroSection";
import { trackSectionView } from "@/lib/analytics";

// Lazy load section components per migliorare le performance nel First Load
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const GallerySection = lazy(() => import("@/components/GallerySection"));
const BuildsSection = lazy(() => import("@/components/BuildsSection"));
const ComponentsSection = lazy(() => import("@/components/ComponentsSection"));
const AppsSection = lazy(() => import("@/components/AppsSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

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
      
      <Suspense fallback={<div className="h-64 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff7514]"></div></div>}>
        <ServicesSection />
        <GallerySection />
        <BuildsSection />
        <ComponentsSection />
        <AppsSection />
        <FAQSection />
        <ContactSection />
      </Suspense>
    </div>
  );
};

export default Home;
