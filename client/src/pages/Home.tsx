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

    // Observe all sections. Using a MutationObserver to catch lazy-loaded sections
    const observeSections = () => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => observer.observe(section));
    };
    
    observeSections();
    
    // Retry finding sections after Suspense resolves by watching the dom body
    const domObserver = new MutationObserver(() => {
      observeSections();
    });
    
    domObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      domObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  return (
    <div className="overflow-hidden bg-black">
      <HeroSection />
      
      <Suspense fallback={<div className="flex h-64 items-center justify-center bg-black"><div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-primary"></div></div>}>
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

