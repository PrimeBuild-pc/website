# Chiusura guide — 28 ottobre 2026

## Stato reale della pubblicazione precedente

- GitHub PR55 <https://github.com/PrimeBuild-pc/website/pull/55>: `MERGED`; `main` è `5e22d783fa3339b9ee599a540950deb1116de437` alla verifica.
- Workflow `Deploy Vite site to GitHub Pages` del 24 ottobre, run `40119148897`: completato con successo. CodeQL su `main` risulta riuscito anche il 26 ottobre.
- Controllo pubblico in sola lettura: `/guides/`, `/guides/display-cavi/`, `/guides/stabilita-occt/` e `/guide-content/stabilita-occt.json` rispondono 200; la pagina OCCT e il relativo JSON contengono già la revisione 17.0.14.
- I vecchi promemoria «revisione immagini/OCCT non pubblicata» e «PR55 con conflitti» erano quindi obsoleti. La presente sessione non ha effettuato alcuna pubblicazione.

## Lavoro locale pronto per approvazione

- Completati e verificati `display-standards.md` e `display-gaming.md`, già presenti come lavoro locale: generazioni HDMI/DP, trasporti/codifiche, banda lorda e dopo codifica, carico dei segnali, DSC, scelta PC/console e compatibilità GPU/cavo/ingresso monitor.
- Integrazione tramite `editorial-updates.json`; corretta la frase che attribuiva ai dati USB le due/quattro corsie assegnate invece a DisplayPort.
- Verificate le pagine prodotto NVIDIA RTX 5090/5080 e AMD RX 9070 XT/9070, il comunicato AMD RX 7900 con UHBR13.5, l'overview HDMI 2.2 e il catalogo cavi DisplayPort. I massimi NVIDIA restano esplicitamente condizionati a DSC; nessuna banda UHBR dedotta dal solo nome della revisione AMD.
- Sostituiti i quattro riferimenti esterni 404 (TestMem5, configurazioni anta777, HID 1.11 e catalogo VESA). Versione CoolCmd distinta dall'originale di Serj; nessun software scaricato o eseguito dalle fonti delle guide.
- Aggiunti controlli di regressione in `scripts/check-guides.mjs`: presenza degli approfondimenti, corretta allocazione corsie e assenza dei quattro URL obsoleti.
- Aggiornati il TODO e lo stato della revisione precedente. Dettaglio link in `GUIDE-LINK-CHECK-2026-10-28.md`.

I 13 Markdown originali, manifest/hash, renderer, immagini e dipendenze non sono stati modificati. Nessuna nuova dipendenza o configurazione applicativa.

## Verifiche eseguite

| Controllo | Risultato |
|---|---|
| `npm run check` | TypeScript, contatto, download, hash dei 13 originali, emendamenti, HTML, 83 figure e 13 copertine: superati |
| `npm run build` | Build, prerender e SEO di 20 route: superati |
| `npm run check:guide-links` | Route, ancore e hash degli 11 allegati inclusi: superati |
| `npm run check:guide-links -- --external` + GET sui casi dubbi | 277 URL; 268 raggiungibili; nessun 404 rilevato; nove limiti esterni documentati |
| `npm audit --json` | Zero vulnerabilità, incluse le dipendenze di sviluppo |
| `QA_OUTPUT=tmp/completion-2026-10-28/browser npm run check:browser -- http://127.0.0.1:4173` | 26 casi, 1440/390 px: testo fedele, tutte le figure/copertine caricate, indice/navigazione corretti, nessun overflow o errore JS, zero rilievi automatici axe WCAG A/AA |
| Verifica mirata delle due nuove tabelle a 1440/390 px | Contenitori focusabili e scorrimento orizzontale con freccia destra nei casi di overflow; screenshot ispezionati |
| `git diff --check` | Superato |
| `graphify update .` | Grafo codice locale aggiornato: 1053 nodi, 1487 archi; AST-only, nessun costo API |

Il primo tentativo browser era bloccato dall'assenza della versione headless richiesta: installati Chromium Headless Shell/FFmpeg tramite il Playwright già presente, senza modificare lockfile o dipendenze. Un primo assert esplorativo con il tasto `End` non verificava lo scorrimento orizzontale; ripetuto correttamente con `ArrowRight` e attesa dello scroll, senza modifiche applicative.

Check, build e link interni sono stati ripetuti con Node **24.22.1**, come in `.node-version`. Il Node di sistema è 24.20.0, sotto il requisito del repository: usato un eseguibile temporaneo ufficiale, verificato contro `SHASUMS256.txt`, senza sostituire il runtime di sistema. Evidenze, audit e screenshot restano in `tmp/`, esclusi dallo scope Git.

## Limiti e prossima azione

- Sette siti rispondono con protezione anti-bot; AGCOM resetta la connessione e Banda Ultra Larga presenta problemi TLS/503. Non sono dichiarati risolti e non sono stati aggirati controlli TLS o CAPTCHA.
- Nessun collaudo hardware, benchmark, invio del modulo contatti/email o verifica assistiva manuale completa. I controlli automatici non garantiscono da soli conformità totale.
- Graphify non ha aggiornato semanticamente i documenti: `graphify update .` aggiorna soltanto il codice. L'estrattore non produce simboli per `PrimeBuild-Diagnostica.ps1`, `postcss.config.js` e `tailwind.config.ts`; questo non sostituisce i controlli applicativi eseguiti.
- Fantafort non modificato né ricontrollato in questa sessione.
- La cancellazione staged preesistente di `.claude/settings.local.json` è preservata e fuori dallo scope proposto.
- Alla consegna del riepilogo non erano stati eseguiti commit, staging delle nuove modifiche, push, merge o deploy. Il proprietario ha successivamente autorizzato **commit e push**, non merge o deploy. La base locale e `origin/main` hanno alberi identici nonostante il merge squash di PR55: usare un nuovo branch basato su `origin/main`, preservando la cancellazione staged dell'utente ed escludendola dal commit.
