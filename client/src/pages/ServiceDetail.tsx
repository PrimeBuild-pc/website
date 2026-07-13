import { ArrowRight, Check } from "lucide-react";
import { Link, useRoute } from "wouter";
import BackgroundEffect from "@/components/BackgroundEffect";
import useSEO from "@/hooks/useSEO";
import { getService, services } from "@/data/services";

const ServiceDetail = () => {
  const [, params] = useRoute("/servizi/:slug");
  const service = getService(params?.slug ?? "");

  useSEO({
    title: service?.seoTitle ?? "Servizio non trovato | Prime Build",
    description: service?.metaDescription ?? "La pagina richiesta non è disponibile.",
    path: service ? `/servizi/${service.slug}` : window.location.pathname,
    noindex: !service,
  });

  if (!service) {
    return (
      <section className="grid min-h-[70vh] place-items-center bg-black px-5 pt-28 text-center">
        <div><h1 className="text-4xl font-semibold">Servizio non trovato</h1><Link href="/" className="button-primary mt-6">Torna alla home</Link></div>
      </section>
    );
  }

  return (
    <article className="relative isolate overflow-hidden bg-[#050505] pb-24 pt-32 md:pb-32 md:pt-40">
      <BackgroundEffect />
      <header className="relative z-10 mx-auto max-w-5xl px-5 text-center sm:px-8">
        <p className="section-kicker">{service.eyebrow}</p>
        <h1 className="font-montserrat text-4xl font-semibold leading-tight tracking-[-0.05em] text-white sm:text-5xl md:text-7xl">{service.title}</h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-neutral-300 md:text-xl">{service.description}</p>
        <a href="/#contact" className="button-primary mt-9">Richiedi un preventivo <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
      </header>

      <div className="relative z-10 mx-auto mt-20 max-w-6xl px-5 sm:px-8 md:mt-28">
        <section className="grid gap-10 border-y border-white/[0.08] py-12 md:grid-cols-[.8fr_1.2fr] md:py-16">
          <h2 className="font-montserrat text-3xl font-semibold tracking-tight">Un progetto prima di un prodotto</h2>
          <p className="text-base leading-8 text-neutral-400 md:text-lg">{service.intro}</p>
        </section>

        <section className="py-20 md:py-28">
          <p className="section-kicker">Cosa ottieni</p>
          <div className="grid gap-4 md:grid-cols-3">
            {service.benefits.map((benefit) => (
              <div key={benefit.title} className="surface-card p-7">
                <Check className="mb-7 h-6 w-6 text-primary" aria-hidden="true" />
                <h2 className="font-montserrat text-xl font-semibold">{benefit.title}</h2>
                <p className="mt-3 leading-relaxed text-neutral-400">{benefit.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/[0.08] bg-[#0a0a0a] p-6 sm:p-10 md:p-14">
          <p className="section-kicker">Come lavoriamo</p>
          <h2 className="font-montserrat text-3xl font-semibold tracking-tight md:text-5xl">Un processo chiaro, dall'inizio alla verifica.</h2>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] md:grid-cols-4">
            {service.process.map((step, index) => (
              <li key={step.title} className="bg-[#0a0a0a] p-6">
                <span className="text-sm font-semibold text-primary">0{index + 1}</span>
                <h3 className="mt-5 font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="py-20 md:py-28">
          <p className="section-kicker">Cosa valutiamo</p>
          <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
            {service.insights.map((insight) => (
              <div key={insight.title} className="border-t border-white/[0.08] pt-6">
                <h2 className="font-montserrat text-xl font-semibold">{insight.title}</h2>
                <p className="mt-3 leading-7 text-neutral-400">{insight.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-10 border-y border-white/[0.08] py-16 md:grid-cols-2">
          <h2 className="font-montserrat text-3xl font-semibold tracking-tight md:text-4xl">{service.detailsTitle}</h2>
          <div className="space-y-5 text-base leading-8 text-neutral-400">{service.details.map((detail) => <p key={detail}>{detail}</p>)}</div>
        </section>

        <section className="py-20 md:py-28">
          <p className="section-kicker">Domande comuni</p>
          <div className="mx-auto max-w-4xl divide-y divide-white/[0.08]">
            {service.questions.map((item) => (
              <div key={item.question} className="grid gap-3 py-7 md:grid-cols-[.8fr_1.2fr] md:gap-10">
                <h2 className="font-semibold text-white">{item.question}</h2>
                <p className="leading-7 text-neutral-400">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <aside className="rounded-[2rem] border border-primary/20 bg-primary/[0.07] p-7 text-center sm:p-10">
          <h2 className="font-montserrat text-3xl font-semibold">Parliamo del tuo caso</h2>
          <p className="mx-auto mt-3 max-w-2xl text-neutral-300">Il primo confronto e il preventivo sono gratuiti. Spiegaci cosa vuoi ottenere e partiamo dai dati utili.</p>
          <a href="/#contact" className="button-primary mt-7">Contatta Prime Build</a>
        </aside>

        <nav className="mt-16 border-t border-white/[0.08] pt-8" aria-label="Altri servizi">
          <p className="mb-5 text-sm text-neutral-500">Scopri anche</p>
          <div className="flex flex-wrap gap-3">
            {services.filter((item) => item.slug !== service.slug).map((item) => (
              <Link key={item.slug} href={`/servizi/${item.slug}`} className="button-secondary">{item.name}</Link>
            ))}
          </div>
        </nav>
      </div>
    </article>
  );
};

export default ServiceDetail;
