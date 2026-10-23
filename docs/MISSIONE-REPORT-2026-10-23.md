# Missione guide, sicurezza e QA — checkpoint locale

Data: 23 ottobre 2026. Nessun commit, push, merge, modifica remota o deploy.

## Stato

- **Completato:** integrazione delle 13 guide; sorgenti identiche byte per byte ai Markdown definitivi, confronto dell’albero HTML e del testo DOM nel browser; 69 illustrazioni caricate su desktop e mobile.
- **Completato:** patch applicabili, audit finali zero nei due repository, build/test/review e anteprime locali.
- **Bloccato:** cinque PDF storici della guida 12 contengono immagini con permessi non documentati; non inclusi. Quattro URL esterni restituiscono 404 e altri 13 non sono verificabili automaticamente. Le sorgenti definitive restano inalterate. Website non è dichiarato integralmente pronto alla pubblicazione finché questi punti non sono risolti o accettati esplicitamente come eccezioni.
- **Non verificabile in questa fase:** runtime e funzionalità pubblicate, CI/CD remota, account reali e servizi email. Nessuna approvazione di pubblicazione ricevuta.

## Guide

Tutte le righe: SHA-256 identico all’originale, struttura/testo HTML fedeli, singolo H1, route funzionante, immagini decodificate a 1440 e 390 px. I cinque URL preesistenti sono mantenuti.

| N. | Titolo | URL locale | Immagini |
|---|---|---|---:|
| 01 | Windows 11: costruire una base misurabile | [Apri](http://127.0.0.1:4173/guides/low-latency-gaming-guide/) | 5 |
| 02 | Stabilità e overclock: CPU, GPU, RAM e test che contano | [Apri](http://127.0.0.1:4173/guides/stabilita-occt/) | 5 |
| 03 | Driver e LatencyMon: dal sintomo a una verifica utile | [Apri](http://127.0.0.1:4173/guides/driver-latencymon/) | 5 |
| 04 | CPU e GPU: la pipeline, PresentMon e il collo di bottiglia | [Apri](http://127.0.0.1:4173/guides/ottimizzazione-build-240hz/) | 5 |
| 05 | Sincronizzazione, presentazione e limiter: scegliere il compromesso giusto | [Apri](http://127.0.0.1:4173/guides/sincronizzazione-limiter/) | 5 |
| 06 | Display e cavi: verificare il segnale prima di ottimizzare | [Apri](http://127.0.0.1:4173/guides/display-cavi/) | 5 |
| 07 | Mouse, tastiere e USB: capire il percorso prima di cambiare il polling | [Apri](http://127.0.0.1:4173/guides/input-usb/) | 5 |
| 08 | Cuffie, IEM e DAC: scegliere la catena sonora in base al problema | [Apri](http://127.0.0.1:4173/guides/audio-cuffie-dac/) | 5 |
| 09 | Audio Windows, Peace ed EQ: configurare un percorso verificabile | [Apri](http://127.0.0.1:4173/guides/setup-audio/) | 5 |
| 10 | Rete domestica: trovare il problema prima di cambiare impostazioni | [Apri](http://127.0.0.1:4173/guides/setup-rete-anti-bufferbloat/) | 9 |
| 11 | Parametri Windows: interrupt, priorità e timer senza preset universali | [Apri](http://127.0.0.1:4173/guides/parametri-windows/) | 5 |
| 12 | Misure e verifica: capire se una modifica ha davvero aiutato | [Apri](http://127.0.0.1:4173/guides/misure-verifica/) | 5 |
| 13 | DLSS, FSR e frame generation: ricostruzione, interpolazione e neural rendering | [Apri](http://127.0.0.1:4173/guides/guida-dlss-frame-generation/) | 5 |

47 SVG distinti: 17 originali Prime Build riutilizzati, 30 originali nuovi. [Provenienza e hash](GUIDE-IMAGE-PROVENANCE.md). Nessuna delle 54 figure di terzi bloccate è inserita. Gli schemi numerici sono esempi didattici dichiarati, non benchmark. Rendering dal Markdown al build; nessun recupero dei testi delle vecchie guide.

13 allegati esplicitamente citati copiati senza modifiche; cinque PDF esclusi. [Dettaglio link, permessi e HTTP](GUIDE-LINK-CHECK-2026-10-23.md).

## Verifiche Website

| Verifica | Esito |
|---|---|
| npm run check | PASS: TypeScript, contatto, resolver GitHub, 13 guide/69 figure |
| npm run build | PASS: Vite 8.3.5, prerender condiviso con React, SEO 20 route |
| Audit completo / produzione | PASS: 0 / 0 |
| Browser produzione | PASS: 26 casi guide, fedeltà DOM, immagini, ancore/indice, singolo H1, zero overflow/errori JS |
| Navigazione reale successiva | PASS: apertura all’inizio; bug di scroll corretto e riverificato |
| axe WCAG A/AA | PASS: 0 rilievi nell’area guide ai due viewport |
| Lighthouse mobile guida 01 | Performance 97, accessibilità 100, best practices 100, SEO 100; LCP 2,4 s, CLS 0, lab locale |
| Link interni | PASS: 49 collegamenti guida/frammento e hash 13 allegati |
| npm run check:guide-links | BLOCCATO/exit 1: cinque PDF non distribuiti per diritti pendenti |
| Link esterni | 233/250 raggiungibili ; 17 da verificare, di cui 4 HTTP 404 |
| Gitleaks | PASS sui diff e nuove sorgenti/allegati; nessun valore segreto nei report |

Lighthouse iniziale aveva performance 74 e CLS 0,497: corretto il passaggio dalla pagina statica a React riutilizzando lo stesso componente e il contenuto HTML sanitizzato già presente. Nessun placeholder transitorio che sposti il testo. È una prova di laboratorio su una guida, non dati di campo sull’intero sito. Non esiste uno script lint dedicato Website; sono stati eseguiti TypeScript, test mirati e review.

## Verifiche Fantafort

PASS: lint, TypeScript, build Next 16.4.2 con 77 pagine, auth, admin/config/JWT, header, API bounds, player pool, bundle client, provider Osirion (102 tornei EU/33 team nel campione), SEO. PASS anche test social/wallet/leghe/admin e community/privacy su Supabase localhost. DB lint: una warning preesistente per confirm_username inutilizzato, non mascherata. Browser: 7 percorsi a 2 viewport, redirect login e tre API admin anonime 403. Nessun errore JS/overflow nei casi esaminati.

La prima richiesta /players falliva con 500 perché Supabase localhost era spento; dopo avvio Docker/Supabase, pagina, test integrazione e SEO superati. Nessun workaround nel codice.

## Sicurezza

[Advisory, versioni, condizioni, patch, rischi e review](SECURITY-REVIEW-2026-10-23.md). Website: DOMPurify 3.4.17, Vite 8.3.5, sanitize-html 2.18.1, parser CSS 7.1.7, source-map-js 1.2.2, smol-toml 1.9.1. Fantafort: Next/eslint-config-next 16.4.2. Corrette anche riservatezza/token/redirect del resolver GitHub e validazione/dimensioni del form contatti. Node corretto usato per prove e fissato nei progetti/CI. Il Node globale rimane 24.20.0.

L’advisory braces è stato ritirato dal database ufficiale durante la missione: audit finali zero senza soppressioni. Gitleaks completo Fantafort trova 47 corrispondenze esclusivamente in file ignorati .env/.next/Supabase temp, tutte confermate da git check-ignore; diff pulito e test specifico bundle client passato.

## Anteprime e limiti

- Website produzione: http://127.0.0.1:4173/guides/ ; sviluppo: http://127.0.0.1:5173/ .
- Fantafort produzione locale: http://127.0.0.1:3001/ ; Supabase locale avviato.
- Chromium headless ha aperto e controllato concretamente le pagine; screenshot in tmp/browser-qa/production-final e tmp/browser-qa/fantafort-*.png. Il connettore browser grafico non è disponibile (nessun browser registrato, iab unavailable); non è stata aperta una scheda visibile all’utente.
- Server lasciati attivi finché l’ambiente mantiene le sessioni. Nessun test di pagamento, email reale, sessione reale, CAPTCHA, hardware o script di tuning Windows allegati.

## Scope Git proposto, non eseguito

Website: branch `codex/fix-dompurify-3-4-16`, baseline 68411fc, remote `https://github.com/PrimeBuild-pc/website.git`. Commit proposto unico: guide definitive/rendering/UX/assets/allegati permessi, test/report e patch sicurezza/runtime. Push esclusivamente sullo stesso branch di origin. Il workflow Pages è su main: il push del branch non equivale a pubblicazione production, e non è proposto alcun merge automatico.

Fantafort: repository effettivo `C:/Users/Lorenzo/Documents/Projects/Fantafort/fantafort`, branch main, baseline d58a6b5, remote `https://github.com/PrimeBuild-pc/FantaFort.git`. Commit proposto: Next/eslint-config-next+lockfile, engines/.node-version, quattro workflow Node, report locale. Push origin/main soltanto se autorizzato e consentito dalle protezioni; nessun bypass.

Esclusioni: cancellazione staged preesistente `.claude/settings.local.json`, .env*, node_modules, build, temporanei, credenziali, screenshot QA grezzi e cinque PDF senza permessi. Nessuna modifica ai testi originali Desktop.

### File Website modificati o aggiunti dalla missione

- `.gitattributes`
- `.github/workflows/deploy.yml`
- `.gitignore`
- `.node-version`
- `client/public/guide-materials/analisi/REVISIONE-TEMATICA.md`
- `client/public/guide-materials/analisi/VERIFICA-SETUP-E-STRUMENTI-V3.md`
- `client/public/guide-materials/analisi/VERIFICA-TOOL-PRIMEBUILD-RETE-V3.md`
- `client/public/guide-materials/analisi/VERIFICA-VIDEO-E-RTSS.md`
- `client/public/guide-materials/bozza-v3/CREDITI-IMMAGINI.md`
- `client/public/guide-materials/discord-revisione-v5/pacchetti/PrimeBuild-Audio-v4.zip`
- `client/public/guide-materials/discord-revisione-v5/pacchetti/PrimeBuild-Diagnostica-v4.zip`
- `client/public/guide-materials/discord-revisione-v5/pacchetti/PrimeBuild-FirstSetup-v4.zip`
- `client/public/guide-materials/discord-revisione-v5/pacchetti/PrimeBuild-Input-v4.zip`
- `client/public/guide-materials/discord-revisione-v5/pdf/01-primo-setup.pdf`
- `client/public/guide-materials/discord-revisione-v5/pdf/07-rete.pdf`
- `client/public/guide-materials/discord-revisione-v5/scripts/PrimeBuild-Diagnostica.ps1`
- `client/public/guide-materials/discord-revisione-v5/scripts/README.md`
- `client/public/images/guides/diagrams/audio-percorsi.svg`
- `client/public/images/guides/diagrams/bandwidth.svg`
- `client/public/images/guides/diagrams/boundaries.svg`
- `client/public/images/guides/diagrams/buffers.svg`
- `client/public/images/guides/diagrams/cadence.svg`
- `client/public/images/guides/diagrams/dac.svg`
- `client/public/images/guides/diagrams/display.svg`
- `client/public/images/guides/diagrams/distribution.svg`
- `client/public/images/guides/diagrams/driver.svg`
- `client/public/images/guides/diagrams/endpoint.svg`
- `client/public/images/guides/diagrams/eq-strategia-b.svg`
- `client/public/images/guides/diagrams/ethernet-canale.svg`
- `client/public/images/guides/diagrams/ethernet-t568.svg`
- `client/public/images/guides/diagrams/fg.svg`
- `client/public/images/guides/diagrams/fit.svg`
- `client/public/images/guides/diagrams/frequenza-clock.svg`
- `client/public/images/guides/diagrams/hidfilter.svg`
- `client/public/images/guides/diagrams/input.svg`
- `client/public/images/guides/diagrams/isr.svg`
- `client/public/images/guides/diagrams/kernel-scheduler.svg`
- `client/public/images/guides/diagrams/latencymon.svg`
- `client/public/images/guides/diagrams/limits.svg`
- `client/public/images/guides/diagrams/memory-clocks.svg`
- `client/public/images/guides/diagrams/memory.svg`
- `client/public/images/guides/diagrams/mmcss.svg`
- `client/public/images/guides/diagrams/noapo.svg`
- `client/public/images/guides/diagrams/pipeline-limiter.svg`
- `client/public/images/guides/diagrams/pipeline-rendering.svg`
- `client/public/images/guides/diagrams/polling.svg`
- `client/public/images/guides/diagrams/power.svg`
- `client/public/images/guides/diagrams/presentazione-percorsi.svg`
- `client/public/images/guides/diagrams/quality.svg`
- `client/public/images/guides/diagrams/recovery.svg`
- `client/public/images/guides/diagrams/rete-aba.svg`
- `client/public/images/guides/diagrams/rete-diagnosi.svg`
- `client/public/images/guides/diagrams/rete-hop.svg`
- `client/public/images/guides/diagrams/rete-metriche.svg`
- `client/public/images/guides/diagrams/rete-percorsi.svg`
- `client/public/images/guides/diagrams/rete-sqm.svg`
- `client/public/images/guides/diagrams/scanout.svg`
- `client/public/images/guides/diagrams/timers.svg`
- `client/public/images/guides/diagrams/transport.svg`
- `client/public/images/guides/diagrams/upscale.svg`
- `client/public/images/guides/diagrams/usb-percorsi.svg`
- `client/public/images/guides/diagrams/validation.svg`
- `client/public/images/guides/diagrams/vrr.svg`
- `client/public/images/guides/diagrams/wifi-mesh.svg`
- `client/public/sitemap.xml`
- `client/src/App.tsx`
- `client/src/content/guides/01-windows-setup.md`
- `client/src/content/guides/02-stabilita-occt.md`
- `client/src/content/guides/03-driver-latencymon.md`
- `client/src/content/guides/04-cpu-gpu-presentmon.md`
- `client/src/content/guides/05-sincronizzazione-limiter.md`
- `client/src/content/guides/06-display-cavi.md`
- `client/src/content/guides/07-input-usb.md`
- `client/src/content/guides/08-audio-cuffie-dac.md`
- `client/src/content/guides/09-audio-windows-eq.md`
- `client/src/content/guides/10-rete-domestica.md`
- `client/src/content/guides/11-parametri-windows.md`
- `client/src/content/guides/12-misure-verifica.md`
- `client/src/content/guides/13-dlss-fsr-frame-generation.md`
- `client/src/content/guides/manifest.json`
- `client/src/content/guides/materials.json`
- `client/src/data/guides.ts`
- `client/src/guides.css`
- `client/src/lib/githubReleaseDownload.ts`
- `client/src/lib/schema.ts`
- `client/src/main.tsx`
- `client/src/pages/GuideDetail.tsx`
- `client/src/pages/Guides.tsx`
- `docs/GUIDE-IMAGE-PROVENANCE.md`
- `docs/GUIDE-LINK-CHECK-2026-10-23.md`
- `docs/SECURITY-REVIEW-2026-10-23.md`
- `docs/missione-guide-sicurezza-TODO.md`
- `functions/contact.js`
- `functions/github-release-download.js`
- `package-lock.json`
- `package.json`
- `scripts/check-contact-email.mjs`
- `scripts/check-guide-browser.mjs`
- `scripts/check-guide-links.mjs`
- `scripts/check-guides.mjs`
- `scripts/check-release-download.mjs`
- `scripts/generate-guide-diagrams.mjs`
- `scripts/prepare-guides.mjs`
- `scripts/prerender-meta.ts`

Questo report (`docs/MISSIONE-REPORT-2026-10-23.md`) è incluso nello scope Website. Grafi AST aggiornati: Website 993 nodi, Fantafort 1020.

### File Fantafort

- package.json, package-lock.json, .node-version
- .github/workflows/revival-ci.yml, migrate-staging.yml, sync-fortnite.yml, sync-player-pool.yml
- docs/SECURITY-REVIEW-2026-10-23.md

## Decisione richiesta

1. Approvo entrambi i repository: autorizzo commit, push e monitoraggio dei deploy previsti dallo scope sopra.
2. Approvo solo uno dei due repository: specificare quale.
3. Non approvo ancora: indicare ulteriori modifiche.

Per Website occorre inoltre risolvere diritti dei cinque PDF e collegamenti non disponibili, oppure accettare esplicitamente queste eccezioni. L’approvazione non può essere dedotta dal silenzio.
