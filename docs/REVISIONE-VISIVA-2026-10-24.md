# Integrazione finale guide — 24 ottobre 2026

> Aggiornamento del 28 ottobre: la revisione descritta qui è stata pubblicata con PR55, unita il 24 ottobre (`5e22d783`). Le indicazioni «non pubblicata», conflitti e prossimo commit nella sezione finale descrivono lo stato storico precedente alla pubblicazione, non quello attuale. Per gli approfondimenti HDMI/DisplayPort, la correzione dei link e i controlli correnti vedere `CHIUSURA-GUIDE-2026-10-28.md` e `GUIDE-LINK-CHECK-2026-10-28.md`.

## Completato localmente

- Backup completo delle vecchie guide: `backups/guide-pre-aggiornamento-2026-10-24/website-main-936d2f7.zip`, SHA-256 e CRC verificati. Escluso da Git; originali conservati.
- 13 copertine quadrate originali nello stile precedente nero/arancione e 30 schemi ridisegnati.
- 83 figure nel corpo, comprese 30 immagini raster distinte: cinque schermate OCCT ufficiali 17.0.14, sette schermate open source e 18 immagini dai materiali forniti. Didascalie con fonte originale e limiti dei dati; zoom alla risoluzione originale, caricamento differito, dimensioni dichiarate.
- Riferimenti ai sette PDF storici rimossi dal rendering. I cinque PDF prima bloccati non sono più un'eccezione: non vengono richiamati. Restano le fonti tecniche originali dei produttori eventualmente in formato PDF.
- OCCT: descritti CPU, CPU+RAM, Memory, 3D Adaptive e VRAM, dataset/modalità/cicli/thread/Core Cycling, SSE/AVX/AVX2/AVX-512, Auto diverso fra CPU e Memory, preset e blocchi del test memoria. Nessun preset della schermata imposto come raccomandazione universale.
- I 13 Markdown originali restano byte-identici a `testi-guide`. Solo le modifiche esplicitamente richieste sono applicate tramite `editorial-updates.json` e i due approfondimenti OCCT; confrontata la struttura HTML completa con questa sorgente effettiva.
- Aggiornate le note obsolete che dichiaravano assenza di immagini o schermate OCCT v13; conservati i limiti tecnici e di collaudo.

## Verifiche

- `npm run check`: superato, inclusi TypeScript, contatto, download, fedeltà, immagini e regressione delle note obsolete.
- `npm run build`: superato; prerender e SEO di 20 route superati.
- `check-guides.mjs <testi-guide>`: 13 originali identici, 83 figure, 13 copertine.
- `check-guide-links.mjs`: route, ancore, immagini e hash degli 11 allegati rimasti superati; nessun PDF storico collegato.
- Chromium a 1440 e 390 px: 26 casi, tutte le figure/coperte decodificate, fedeltà del testo, indice e navigazione verificati, nessun overflow o errore JS, zero rilievi automatici axe WCAG A/AA. Evidenze in `tmp/occt-integration/browser/`.
- Review Standards: nessun difetto concreto. Review Spec: corrette le due incoerenze su versione OCCT e dichiarazioni di assenza immagini; aggiunta verifica automatica.
- Ispezione visiva del pannello CPU OCCT a 1440/390 px e apertura dell'immagine a piena risoluzione superate. `git diff --check` superato. Grafo AST aggiornato: 1026 nodi, 1465 archi.
- Fonti OCCT: pagina Personal Features e dati del manuale ufficiale `/support/` (contenuti delle schede nel JSON `__NEXT_DATA__`). Il manuale pubblico può descrivere release diverse: i limiti sono espliciti nel testo.
- Ricontrollo successivo su richiesta: Zod transitivo aggiornato da 4.4.3 a 4.6.7 per un advisory high recepito dal nuovo audit. Audit completo/produzione zero, check e build ripetuti con successo. Confronto dei sette PDF documentato in `VERIFICA-PDF-DIPENDENZE-2026-10-24.md`. Fantafort non modificato qui.

## Conteggi nel corpo (copertina esclusa)

| Guida | Immagini |
|---|---:|
| 01 low-latency-gaming-guide | 5 |
| 02 stabilita-occt | 7 |
| 03 driver-latencymon | 5 |
| 04 ottimizzazione-build-240hz | 8 |
| 05 sincronizzazione-limiter | 6 |
| 06 display-cavi | 5 |
| 07 input-usb | 5 |
| 08 audio-cuffie-dac | 8 |
| 09 setup-audio | 8 |
| 10 setup-rete-anti-bufferbloat | 9 |
| 11 parametri-windows | 5 |
| 12 misure-verifica | 7 |
| 13 guida-dlss-frame-generation | 5 |

## Stato e limiti

- Anteprima Website: http://127.0.0.1:4173/guides/ — OCCT: http://127.0.0.1:4173/guides/stabilita-occt/.
- 264 URL esterni controllati: 244 rispondono 2xx/3xx; 20 richiedono verifica, inclusi quattro 404 già presenti nelle fonti definitive. I tre nuovi link Intel sono consultabili tramite ricerca web ma respingono il controllo HEAD con 403. Dettaglio in `GUIDE-LINK-CHECK-2026-10-24.md`; gli URL editoriali preesistenti non sono stati sostituiti autonomamente.
- Immagini di terzi riusate su esplicita indicazione del proprietario dei materiali con fonte originale; nessuna licenza aperta presunta. Registro per-file con SHA-256 in `GUIDE-IMAGE-IMPORTS-2026-10-24.json`.
- Nessun collaudo hardware OCCT/overclock/audio/rete eseguito: le immagini non rappresentano nuovi benchmark Prime Build. L'accessibilità automatica non sostituisce ogni verifica assistiva manuale.
- Website su `codex/fix-dompurify-3-4-16`, revisione locale non pubblicata. Preservata la cancellazione staged dell'utente `.claude/settings.local.json`, esclusa dallo scope. Nessun nuovo commit/push/merge/deploy.
- La precedente autorizzazione ha prodotto Website PR55 (e985460) e Fantafort PR99 (2706b08). Website ha conflitti di lockfile con main; Fantafort richiede review indipendente GitHub. Non sono state aggirate le protezioni né dichiarata riuscita la pubblicazione in produzione.
- Scope del prossimo commit Website: copertine/figure e fonti, associazioni e renderer, emendamenti editoriali richiesti, verifiche e documentazione. Esclusi backup, temporanei, cancellazione staged dell'utente e qualunque modifica Fantafort. Pubblicazione della nuova revisione subordinata a conferma esplicita.
