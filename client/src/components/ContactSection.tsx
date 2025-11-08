import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaInstagram, FaDiscord } from "react-icons/fa";
import AnimatedElement from "@/lib/AnimatedElement";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    // Honeypot field: real users won't see this (hidden via CSS)
    website: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Skip submission if honeypot filled
      if (formData.website) {
        setFormData({ name: "", email: "", subject: "", message: "", website: "" });
        return;
      }
      const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;
      if (!endpoint) {
        console.error('Missing VITE_CONTACT_ENDPOINT env variable');
        toast({
          title: "Invio non disponibile",
          description: "Configurazione mancante. Riprova più tardi.",
        });
        return;
      }
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      // Best-effort response handling
      if (!res.ok) {
        const txt = await res.text().catch(() => '');
        console.error('Contact form error', txt);
        toast({
          title: "Errore di invio",
          description: "Si è verificato un problema. Riprova tra qualche minuto.",
        });
      }
      setFormData({ name: "", email: "", subject: "", message: "", website: "" });
      toast({
        title: "Messaggio inviato",
        description: "Ti ricontatteremo al più presto.",
      });
    } catch (err) {
      console.error('Network error submitting contact form', err);
      toast({
        title: "Errore di rete",
        description: "Controlla la connessione e riprova.",
      });
    }
  };

  const contactInfo = [
    {
      icon: <FaEnvelope className="text-[#ff7514]" />,
      title: "Email",
      value: "primebuild.official@gmail.com"
    },
    {
      icon: <FaMapMarkerAlt className="text-[#ff7514]" />,
      title: "Sede",
      value: "Padova, Italia"
    }
  ];

  const socialLinks = [
    {
      icon: <FaInstagram />,
      url: "https://www.instagram.com/prime_build_/",
      name: "Instagram"
    },
    {
      icon: <FaDiscord />,
      url: "https://discord.gg/jBNk2vXKKd",
      name: "Discord"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-neutral-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <AnimatedElement>
              <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4 text-[#ff7514] inline-block border-b-2 border-[#ff7514] pb-2">
                Contattaci
              </h2>
              <p className="text-lg text-neutral-300 mb-8">
                Sei interessato ai nostri servizi o hai domande? Contattaci per ricevere un preventivo personalizzato o per maggiori informazioni.
              </p>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Honeypot field (hidden) */}
                <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input id="website" type="text" value={formData.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                </div>
                {/* Removed Turnstile widget for static GitHub Pages deployment. */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-1">
                      Nome
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Il tuo nome"
                      className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff7514] text-white"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="La tua email"
                      className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff7514] text-white"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-neutral-300 mb-1">
                    Oggetto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Oggetto del messaggio"
                    className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff7514] text-white"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-1">
                    Messaggio
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Il tuo messaggio"
                    className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff7514] text-white"
                    required
                  ></textarea>
                </div>
                
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#ff7514] hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-md transition-all"
                >
                  Invia Messaggio
                </motion.button>
                <p className="text-xs text-neutral-400">
                  Inviando questo modulo, dichiari di aver letto la nostra informativa privacy e acconsenti al trattamento dei dati forniti ai soli fini di ricontatto.
                </p>
              </form>
            </AnimatedElement>
            
            <AnimatedElement direction="right">
              <div className="bg-black p-8 rounded-xl h-full">
                <h3 className="text-2xl font-bold font-montserrat mb-6">
                  Informazioni di <span className="text-[#ff7514]">contatto</span>
                </h3>
                
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-[#ff7514]/10 p-3 rounded-lg mr-4">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-neutral-400">{item.value}</p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-2">
                    <h4 className="font-medium mb-3 text-lg text-[#ff7514]">Contattaci preferibilmente su:</h4>
                    <div className="flex flex-col space-y-3">
                      {socialLinks.map((link, index) => (
                        <motion.a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          className="bg-neutral-800 hover:bg-[#ff7514] p-3 rounded-lg flex items-center transition-colors"
                        >
                          <div className="bg-[#ff7514]/20 p-2 rounded-full mr-3">
                            {link.icon}
                          </div>
                          <span className="font-medium">{link.name}</span>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
