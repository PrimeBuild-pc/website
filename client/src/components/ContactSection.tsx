import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaInstagram, FaDiscord } from "react-icons/fa";
import { Link } from "wouter";
import AnimatedElement from "@/lib/AnimatedElement";
import { useToast } from "@/hooks/use-toast";
import { trackFormSubmit, trackSocialClick } from "@/lib/analytics";

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    // Honeypot field: real users won't see this (hidden via CSS)
    website: ""
  });

  const initialState = { name: "", email: "", subject: "", message: "", website: "" };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSocialClick = (platform: string, url: string) => {
    trackSocialClick(platform, url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.website) { setFormData(initialState); return; }
    if (isSubmitting) return;

    setIsSubmitting(true);

    // Use the Cloudflare Pages endpoint
    // For primebuild.website (hosted on GitHub Pages), call Cloudflare Pages function
    // For pages.dev domains, use relative endpoint
    const isGitHubPages = window.location.hostname === 'primebuild.website';
    const endpoint = isGitHubPages
      ? 'https://website-6al.pages.dev/contact'
      : '/contact';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok || !json.success) {
        trackFormSubmit('contact', false);
        toast({ title: "Errore di invio", description: json.error || "Problema temporaneo." });
        return;
      }

      trackFormSubmit('contact', true);
      setFormData(initialState);
      toast({ title: "Messaggio inviato", description: "Ti contatteremo al piu presto." });
    } catch (err) {
      console.error('Network/contact error', err);
      trackFormSubmit('contact', false);
      toast({ title: "Errore di rete", description: "Riprova piu tardi." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Obfuscate email to prevent spam harvesters
  const getEmail = () => {
    const user = "primebuild.official";
    const domain = "gmail.com";
    return `${user}@${domain}`;
  };

  const contactInfo = [
    {
      icon: <FaEnvelope className="text-[#ff7514]" />,
      title: "Email",
      value: getEmail(),
      isEmail: true
    },
    {
      icon: <FaMapMarkerAlt className="text-[#ff7514]" />,
      title: "Sede",
      value: "Montegrotto Terme (PD), Italia"
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
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                  className="bg-[#ff7514] hover:bg-[#e06500] text-black font-semibold py-3 px-8 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Invio in corso..." : "Invia Messaggio"}
                </motion.button>
                <p className="text-xs text-neutral-400">
                  Inviando questo modulo, dichiari di aver letto la nostra{" "}
                  <Link href="/privacy">
                    <a className="text-[#ff7514] hover:underline">informativa privacy</a>
                  </Link>{" "}
                  e acconsenti al trattamento dei dati forniti ai soli fini di ricontatto.
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
                          onClick={() => handleSocialClick(link.name, link.url)}
                          whileHover={{ scale: 1.05 }}
                          className="bg-neutral-800 hover:bg-[#ff7514] p-3 rounded-lg flex items-center transition-colors"
                          aria-label={`Contattaci su ${link.name}`}
                        >
                          <div className="bg-[#ff7514]/20 p-2 rounded-full mr-3" aria-hidden="true">
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
