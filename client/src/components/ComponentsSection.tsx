import AnimatedElement from "@/lib/AnimatedElement";

interface Component {
  image: string;
  title: string;
  brands: string;
}

const ComponentsSection = () => {
  const components: Component[] = [
    {
      image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80",
      title: "Processori",
      brands: "AMD & Intel"
    },
    {
      image: "https://images.unsplash.com/photo-1591405351990-4726e331f141?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80",
      title: "Schede Video",
      brands: "NVIDIA & AMD"
    },
    {
      image: "https://images.unsplash.com/photo-1562976540-1502c2145186?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80",
      title: "Memorie RAM",
      brands: "Corsair & G.Skill"
    },
    {
      image: "https://images.unsplash.com/photo-1600348712270-5a9564fe3e62?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80",
      title: "Storage",
      brands: "Samsung & WD"
    },
    {
      image: "https://images.unsplash.com/photo-1587202372616-b43abea06c2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80",
      title: "Raffreddamento",
      brands: "NZXT & Corsair"
    },
    {
      image: "https://images.unsplash.com/photo-1587202372634-32705e3bf443?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80",
      title: "Case",
      brands: "Lian Li & Fractal"
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <AnimatedElement className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
            Componenti <span className="text-[#FF5722]">Premium</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-neutral-300">
            Utilizziamo solo hardware di alta qualità delle migliori marche
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
              <h3 className="font-medium text-[#FF5722]">{component.title}</h3>
              <p className="text-xs text-neutral-400">{component.brands}</p>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComponentsSection;
