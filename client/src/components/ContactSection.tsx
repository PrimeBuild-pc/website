import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaInstagram, FaDiscord } from "react-icons/fa";
import AnimatedElement from "@/lib/AnimatedElement";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
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
