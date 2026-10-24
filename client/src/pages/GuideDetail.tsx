import React, { useEffect, useState } from "react";
import { Link, Redirect, useRoute } from "wouter";
import { guides } from "@/data/guides";
import useSEO from "@/hooks/useSEO";
import NotFound from "@/pages/not-found";
import DOMPurify from "dompurify";

type Content = { html: string; toc: { id: string; text: string }[] };
type Guide = (typeof guides)[number];
const initialGuide = typeof document === 'undefined' ? null : document.querySelector<HTMLElement>('[data-guide-slug]');
const initialArticle = initialGuide?.querySelector('article.guide-prose');
const sanitize = (html: string) => DOMPurify.sanitize(html, {USE_PROFILES:{html:true}, ADD_ATTR:['target']});
const initialContent: Content | null = initialArticle ? {
  html: sanitize(initialArticle.innerHTML),
  toc: Array.from(initialArticle.querySelectorAll('h2[id]'), heading => ({id:heading.id,text:heading.textContent || ''})),
} : null;

const GuideArticle = ({ guide }: { guide: Guide }) => {
  const hasInitialContent = initialGuide?.dataset.guideSlug === guide.slug && initialContent !== null;
  const [content, setContent] = useState<Content | null>(hasInitialContent ? initialContent : null);
  const [failed, setFailed] = useState(false);
  useSEO({title:`${guide.title} | Prime Build`,description:guide.description,path:`/guides/${guide.slug}/`,image:"/og-image.png",type:"article",datePublished:guide.datePublished,dateModified:guide.dateModified});
  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0);
    const scrollToHash = () => {
      if (location.hash) requestAnimationFrame(() => {
        try { document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView(); } catch { /* Ignore malformed fragment URLs. */ }
      });
    };
    if (hasInitialContent) { scrollToHash(); return; }
    const controller = new AbortController();
    fetch(`/guide-content/${guide.slug}.json`, { signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error("Guide unavailable"); return response.json(); })
      .then((value: Content) => {
        setContent({...value, html:sanitize(value.html)});
        scrollToHash();
      })
      .catch(error => { if (error.name !== "AbortError") setFailed(true); });
    return () => controller.abort();
  }, [guide.slug, hasInitialContent]);
  return <GuideArticleView guide={guide} content={content} failed={failed} />;
};

export const GuideArticleView = ({guide,content,failed=false}: {guide:Guide;content:Content|null;failed?:boolean}) => {
  const previous = guides[guide.id - 2];
  const next = guides[guide.id];
  return <section data-guide-slug={guide.slug} className="guide-page px-4 pb-20 pt-28 sm:px-6">
    <div className="mx-auto max-w-7xl">
      <nav aria-label="Percorso" className="mb-7 flex flex-wrap items-center gap-3 text-sm text-zinc-300">
        <Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/guides/">Tutte le guide</Link><span aria-hidden="true">/</span><span>Guida {String(guide.id).padStart(2,"0")}</span>
      </nav>
      <div className="guide-layout">
        <aside className="guide-index"><details open={typeof window !== 'undefined' && window.matchMedia('(min-width: 1100px)').matches}>
          <summary>In questa guida</summary>
          <nav aria-label="Indice della guida"><ol>{content?.toc.map(item=><li key={item.id}><a href={`#${item.id}`}>{item.text}</a></li>)}</ol></nav>
        </details></aside>
        <div className="min-w-0">
          <div className="mb-6 flex flex-wrap gap-3 text-sm text-zinc-400">
            <span className="text-primary">{String(guide.id).padStart(2,"0")} / 13</span>
            <time dateTime={guide.dateModified}>Aggiornata il {guide.date}</time>
            <Link href="/chi-siamo/">Team tecnico Prime Build</Link>
          </div>
          {failed ? <div role="alert"><p>Non è stato possibile caricare la guida.</p><a href={`/guides/${guide.slug}/`} className="underline">Riprova</a></div>
            : content ? <article className="guide-prose" dangerouslySetInnerHTML={{__html:content.html}} />
            : <p role="status">Caricamento guida…</p>}
          <nav aria-label="Altre guide" className="mt-14 flex flex-wrap justify-between gap-6 border-t border-white/15 pt-6 text-sm">
            {previous && <Link href={`/guides/${previous.slug}/`} className="max-w-xs text-zinc-300">← {previous.title}</Link>}
            {next && <Link href={`/guides/${next.slug}/`} className="max-w-xs text-zinc-300">{next.title} →</Link>}
          </nav>
        </div>
      </div>
    </div>
  </section>;
};

export default function GuideDetail() {
  const [,params] = useRoute("/guides/:slug");
  const slug = params?.slug ?? "";
  const guide = guides.find(item=>item.slug===slug);
  const sourceAlias = guides.find(item=>item.file===slug);
  if (sourceAlias) return <Redirect to={`/guides/${sourceAlias.slug}/`} />;
  return guide ? <GuideArticle key={guide.slug} guide={guide} /> : <NotFound />;
}
