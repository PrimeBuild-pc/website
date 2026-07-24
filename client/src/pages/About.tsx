import { Link } from "wouter";
import useSEO from "@/hooks/useSEO";

const About = () => {
  useSEO({
    title: "Chi siamo | Prime Build",
    description: "Metodo, servizi e contatti del team tecnico Prime Build: PC gaming su misura, assistenza e ottimizzazione a Padova e in tutta Italia.",
    path: "/chi-siamo",
  });

  return (
    <article className="min-h-screen bg-[#050505] px-5 pb-24 pt-32 text-white">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Prime Build</p>
        <h1 className="mt-4 text-4xl font-bold font-montserrat md:text-6xl">
          PC gaming progettati intorno alle persone
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-neutral-300">
          Prime Build progetta e assembla PC gaming su misura, offre assistenza tecnica e ottimizzazione da Montegrotto Terme, in provincia di Padova, con servizi disponibili anche da remoto e tramite spedizione in tutta Italia.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            ["Prima si ascolta", "Budget, giochi, monitor, software e possibilità di upgrade guidano ogni proposta."],
            ["Prima si misura", "Temperature, stabilità, frametime e comportamento reale contano più dei numeri promozionali."],
            ["Tutto deve essere chiaro", "Componenti, interventi e limiti vengono spiegati prima di procedere e verificati alla fine."],
          ].map(([title, text]) => (
            <section key={title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-3 leading-relaxed text-neutral-400">{text}</p>
            </section>
          ))}
        </div>

        <section className="mt-14 border-t border-white/10 pt-10">
          <h2 className="text-3xl font-bold">Il team tecnico Prime Build</h2>
          <p className="mt-4 leading-relaxed text-neutral-300">
            Le guide e le configurazioni pubblicate sul sito sono curate dal team tecnico Prime Build. Quando un contenuto cita test, specifiche o strumenti esterni, le fonti sono indicate nella pagina. Date e configurazioni restano visibili per permettere di valutarne l’attualità.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/guides/" className="rounded-full bg-primary px-5 py-3 font-semibold text-black">Consulta le guide</Link>
            <a href="/#contact" className="rounded-full border border-white/15 px-5 py-3 font-semibold">Contatta Prime Build</a>
          </div>
        </section>

        <section className="mt-14 border-t border-white/10 pt-10">
          <h2 className="text-3xl font-bold">Identità e contatti ufficiali</h2>
          <ul className="mt-5 space-y-3 text-neutral-300">
            <li>Sede operativa: Montegrotto Terme, 35036 (PD), Italia</li>
            <li>Email: <a className="text-primary underline" href="mailto:preventivi@primebuild.website">preventivi@primebuild.website</a></li>
            <li><a className="text-primary underline" href="https://www.instagram.com/prime_build_/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a className="text-primary underline" href="https://github.com/PrimeBuild-pc" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a className="text-primary underline" href="https://discord.gg/ERUwSxE79q" target="_blank" rel="noopener noreferrer">Community Discord</a></li>
          </ul>
        </section>
      </div>
    </article>
  );
};

export default About;
