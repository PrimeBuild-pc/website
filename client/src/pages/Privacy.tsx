import { useEffect } from "react";
import { Link } from "wouter";
import { FaArrowLeft } from "react-icons/fa";

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/">
          <a className="inline-flex items-center text-[#ff7514] hover:underline mb-8">
            <FaArrowLeft className="mr-2" />
            Torna alla Home
          </a>
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold font-montserrat mb-8 text-[#ff7514]">
          Privacy Policy e Cookie Policy
        </h1>

        <div className="prose prose-invert prose-neutral max-w-none space-y-8">
          <section>
            <p className="text-neutral-300 text-sm">
              Ultimo aggiornamento: 7 Dicembre 2025
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Titolare del Trattamento</h2>
            <p className="text-neutral-300">
              Il titolare del trattamento dei dati personali e Prime Build, con sede a Padova, Italia.
            </p>
            <p className="text-neutral-300">
              Email di contatto: <a href="mailto:primebuild.official@gmail.com" className="text-[#ff7514] hover:underline">primebuild.official@gmail.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Dati Raccolti</h2>
            <h3 className="text-xl font-medium text-white mb-2">2.1 Dati forniti volontariamente</h3>
            <p className="text-neutral-300 mb-4">
              Quando compili il modulo di contatto, raccogliamo:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-1 ml-4">
              <li>Nome</li>
              <li>Indirizzo email</li>
              <li>Oggetto e contenuto del messaggio</li>
            </ul>

            <h3 className="text-xl font-medium text-white mb-2 mt-6">2.2 Dati raccolti automaticamente (con consenso)</h3>
            <p className="text-neutral-300 mb-4">
              Previo tuo consenso, tramite Google Analytics raccogliamo dati anonimi quali:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-1 ml-4">
              <li>Pagine visitate e tempo di permanenza</li>
              <li>Tipo di dispositivo e browser utilizzato</li>
              <li>Paese di provenienza (non la posizione esatta)</li>
              <li>Interazioni con pulsanti e link</li>
            </ul>
            <p className="text-neutral-300 mt-4">
              <strong>Nota:</strong> Utilizziamo l'opzione <code>anonymize_ip</code> di Google Analytics
              per mascherare l'ultimo ottetto del tuo indirizzo IP, garantendo un ulteriore livello di anonimato.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Finalita del Trattamento</h2>
            <p className="text-neutral-300 mb-4">I tuoi dati vengono utilizzati per:</p>
            <ul className="list-disc list-inside text-neutral-300 space-y-1 ml-4">
              <li><strong>Rispondere alle richieste</strong> inviate tramite il modulo di contatto</li>
              <li><strong>Migliorare il sito web</strong> analizzando statistiche anonime di utilizzo</li>
              <li><strong>Garantire la sicurezza</strong> del sito prevenendo abusi e spam</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Cookie Utilizzati</h2>

            <h3 className="text-xl font-medium text-white mb-2">4.1 Cookie Tecnici (sempre attivi)</h3>
            <p className="text-neutral-300 mb-4">
              Sono essenziali per il funzionamento del sito e non richiedono consenso:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-1 ml-4">
              <li><code>cookie-consent</code> - Memorizza la tua scelta sui cookie</li>
            </ul>

            <h3 className="text-xl font-medium text-white mb-2 mt-6">4.2 Cookie di Analisi (previo consenso)</h3>
            <p className="text-neutral-300 mb-4">
              Utilizziamo Google Analytics 4 per raccogliere statistiche anonime:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-1 ml-4">
              <li><code>_ga</code> - Identificatore anonimo (durata: 2 anni)</li>
              <li><code>_ga_*</code> - Mantiene lo stato della sessione (durata: 2 anni)</li>
            </ul>
            <p className="text-neutral-300 mt-4">
              Puoi revocare il consenso in qualsiasi momento cancellando i cookie del browser
              o contattandoci all'indirizzo email indicato sopra.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Condivisione dei Dati</h2>
            <p className="text-neutral-300">
              I tuoi dati non vengono venduti a terzi. Potrebbero essere condivisi solo con:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-1 ml-4 mt-4">
              <li><strong>Google LLC</strong> - Per l'elaborazione delle statistiche Analytics (soggetto alle loro policy privacy)</li>
              <li><strong>Cloudflare Inc.</strong> - Per l'hosting e la protezione del sito</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Conservazione dei Dati</h2>
            <ul className="list-disc list-inside text-neutral-300 space-y-1 ml-4">
              <li>I messaggi inviati tramite il form di contatto vengono conservati per il tempo necessario a evadere la richiesta</li>
              <li>I dati di Google Analytics vengono conservati per 14 mesi, poi automaticamente eliminati</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. I Tuoi Diritti (GDPR)</h2>
            <p className="text-neutral-300 mb-4">Ai sensi del Regolamento UE 2016/679 (GDPR), hai diritto a:</p>
            <ul className="list-disc list-inside text-neutral-300 space-y-1 ml-4">
              <li><strong>Accesso</strong> - Richiedere quali dati abbiamo su di te</li>
              <li><strong>Rettifica</strong> - Correggere dati inesatti</li>
              <li><strong>Cancellazione</strong> - Richiedere l'eliminazione dei tuoi dati</li>
              <li><strong>Opposizione</strong> - Opporti al trattamento per finalita di marketing</li>
              <li><strong>Portabilita</strong> - Ricevere i tuoi dati in formato leggibile</li>
              <li><strong>Revoca del consenso</strong> - Ritirare il consenso ai cookie in qualsiasi momento</li>
            </ul>
            <p className="text-neutral-300 mt-4">
              Per esercitare questi diritti, contattaci a{" "}
              <a href="mailto:primebuild.official@gmail.com" className="text-[#ff7514] hover:underline">
                primebuild.official@gmail.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Sicurezza</h2>
            <p className="text-neutral-300">
              Adottiamo misure tecniche e organizzative adeguate per proteggere i tuoi dati,
              tra cui connessione HTTPS cifrata, protezione DDoS tramite Cloudflare e accesso
              limitato ai dati solo al personale autorizzato.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Modifiche alla Policy</h2>
            <p className="text-neutral-300">
              Questa policy puo essere aggiornata periodicamente. In caso di modifiche sostanziali,
              ti informeremo tramite un avviso sul sito. Ti invitiamo a consultare regolarmente
              questa pagina.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. Contatti</h2>
            <p className="text-neutral-300">
              Per qualsiasi domanda riguardante questa Privacy Policy o il trattamento dei tuoi dati,
              puoi contattarci a:
            </p>
            <ul className="list-none text-neutral-300 space-y-1 mt-4">
              <li>Email: <a href="mailto:primebuild.official@gmail.com" className="text-[#ff7514] hover:underline">primebuild.official@gmail.com</a></li>
              <li>Instagram: <a href="https://www.instagram.com/prime_build_/" target="_blank" rel="noopener noreferrer" className="text-[#ff7514] hover:underline">@prime_build_</a></li>
              <li>Discord: <a href="https://discord.gg/jBNk2vXKKd" target="_blank" rel="noopener noreferrer" className="text-[#ff7514] hover:underline">Prime Build Community</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
