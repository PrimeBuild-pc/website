import { useState } from "react";
import AnimatedElement from "@/lib/AnimatedElement";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "Perché nasce PrimeBuild?",
    answer: "PrimeBuild nasce con l'obiettivo di rendere il PC Gaming accessibile a tutti, superando l'idea che sia un settore di nicchia riservato solo a configurazioni costose o sovradimensionate. In un mercato spesso orientato a vendere build inutilmente care, PrimeBuild mette al centro le reali esigenze del cliente, offrendo consulenza, assemblaggio e ottimizzazione su misura in base al budget e all'utilizzo reale. Non vendiamo semplicemente hardware, ma un servizio completo: aiutiamo il cliente a scegliere i componenti migliori al giusto prezzo, seguiamo l'andamento del mercato e realizziamo PC equilibrati, performanti ed esteticamente curati. L'obiettivo è semplificare tutto il processo, far risparmiare tempo e denaro e dimostrare che un buon PC Gaming è possibile con qualsiasi budget realistico."
  },
  {
    question: "Dove si trova Prime Build?",
    answer: "Prime Build ha sede a Montegrotto Terme (PD), ma opera in tutta Italia grazie a spedizioni e servizi da remoto."
  },
  {
    question: "Come posso contattare Prime Build?",
    answer: "Puoi contattarci tramite Instagram (@prime_build_) o unirti al nostro server Discord per assistenza diretta e preventivi personalizzati."
  },
  {
    question: "Quanto costa un PC Gaming assemblato da Prime Build?",
    answer: "I nostri PC Gaming partono indicativamente da 750€ per configurazioni entry-level. Il prezzo può variare in base al mercato, alla disponibilità dei componenti e alle esigenze specifiche. Non esiste una soglia minima fissa: valutiamo ogni caso, anche utilizzando componenti già in possesso del cliente, parti usate o ricondizionate, per realizzare la miglior configurazione possibile in base al budget. Preventivi gratuiti e personalizzati."
  },
  {
    question: "Offrite assistenza tecnica per PC già assemblati?",
    answer: "Sì, offriamo assistenza tecnica completa: diagnostica, riparazioni, upgrade hardware, overclock, ottimizzazione software e pulizia. Serviamo sia PC assemblati da noi che da altri."
  },
  {
    question: "Quanto tempo ci vuole per assemblare un PC?",
    answer: "Generalmente consegniamo/spediamo il PC assemblato, testato e ottimizzato entro 3-5 giorni lavorativi dalla ricezione dei componenti."
  },
  {
    question: "Fornite garanzia sui PC assemblati?",
    answer: "Sì, tutti i componenti hanno la garanzia del produttore (generalmente dai 2 anni e oltre per alcuni componenti). Inoltre offriamo supporto post-vendita gratuito per configurazione e ottimizzazione."
  },
  {
    question: "Posso scegliere i componenti del mio PC?",
    answer: "Assolutamente sì! Lavoriamo insieme a te per selezionare i componenti migliori in base al tuo budget e alle tue esigenze, che sia gaming, streaming, editing video o lavoro."
  },
  {
    question: "Offrite servizi a domicilio o da remoto?",
    answer: "Sì, offriamo assistenza a domicilio nella zona di Padova, Montegrotto Terme e comuni limitrofi, sia per assemblaggio PC che per assistenza e servizi legati al PC Gaming. Forniamo anche servizi da remoto, che ci permettono di operare in tutta Italia. Per quanto riguarda i computer assemblati o riparati, il ritiro può avvenire in sede, con consegna a domicilio su richiesta, oppure tramite spedizione assicurata."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-black via-neutral-950 to-black">
      <div className="container mx-auto px-4">
        <AnimatedElement className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
            Domande <span className="text-[#ff7514]">frequenti</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-neutral-300">
            Tutto quello che devi sapere su Prime Build e i nostri servizi
          </p>
        </AnimatedElement>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <AnimatedElement key={index} delay={0.05 * index}>
              <div className="bg-neutral-900 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-neutral-800 transition-colors"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-semibold text-white">{faq.question}</span>
                  <span className={`text-[#ff7514] text-2xl transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 pb-4' : 'max-h-0'}`}
                >
                  <p className="px-6 text-neutral-300">{faq.answer}</p>
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>

        <AnimatedElement className="text-center mt-12" delay={0.4}>
          <p className="text-neutral-400 mb-4">Hai altre domande?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.instagram.com/prime_build_/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
              Scrivici su Instagram
            </a>
            <a
              href="https://discord.gg/BcPsRQqJ4s"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              Unisciti al Discord
            </a>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

export default FAQSection;
