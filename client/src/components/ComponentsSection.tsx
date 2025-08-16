import AnimatedElement from "@/lib/AnimatedElement";

interface Component {
  image: string;
  title: string;
  brands: string;
}

const ComponentsSection = () => {
  const components: Component[] = [
    {
      image: "https://i.postimg.cc/W4MBFXXM/cpu.png",
      title: "Processori",
      brands: "AMD & Intel"
    },
    {
      image: "https://images.unsplash.com/photo-1591405351990-4726e331f141?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80",
      title: "Schede Video",
      brands: "NVIDIA & AMD"
    },
    {
      image: "https://i.postimg.cc/Gtk8Z0Q4/ram.png",
      title: "Memorie RAM",
      brands: "Corsair & G.Skill"
    },
    {
      image: "https://i.postimg.cc/28VgFz0j/ssd.jpg",
      title: "Storage",
      brands: "Samsung & WD"
    },
    {
      image: "https://images.unsplash.com/photo-1587202372616-b43abea06c2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80",
      title: "Raffreddamento",
      brands: "NZXT & Thermalright"
    },
    {
      image: "https://i.postimg.cc/FK1WyGrf/case.png",
      title: "Case",
      brands: "Lian Li & Phanteks"
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <AnimatedElement className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
            Componenti <span className="text-[#ff7514]">premium</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-neutral-300">
            Ecco alcuni dei marchi che trovi nelle nostre build
          </p>
        </AnimatedElement>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
          {components.map((component, index) => (
            <AnimatedElement 
              key={index} 
              className="bg-neutral-900 p-5 rounded-xl text-center hover:bg-neutral-800 transition-colors"
              delay={0.1 * index}
            >
              <img 
                src={component.image} 
                alt={component.title} 
                className="w-16 h-16 object-cover mx-auto mb-4 rounded-lg"
              />
              <h3 className="font-medium text-[#ff7514]">{component.title}</h3>
              <p className="text-xs text-neutral-400">{component.brands}</p>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComponentsSection;
