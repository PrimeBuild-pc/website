# Missione guide e sicurezza — 23 ottobre 2026

Stato aggiornato il 24 ottobre: intervento iniziale autorizzato e inviato nelle PR55 Website / PR99 Fantafort; nuova revisione visiva/editoriale completata localmente, non pubblicata. I punti della baseline del 23 ottobre sotto restano storico del lavoro.

- [x] Percorsi verificati; website su `codex/fix-dompurify-3-4-16`, Fantafort su `main` nella sottocartella `fantafort`.
- [x] Baseline Git: website ha la cancellazione staged preesistente di `.claude/settings.local.json`; Fantafort pulito. Preservare la cancellazione ed escluderla dai commit proposti.
- [x] Inventario dei 13 Markdown definitivi, hash e struttura; nessuna immagine incorporata nei Markdown.
- [x] Audit iniziali: website 13 dipendenze segnalate; Fantafort 6. Distinguere advisory radice da propagazioni transitive.
- [x] Analisi integrale automatizzata dei contenuti/struttura; inventario e diritti immagini, associazioni alle sezioni.
- [x] Rendering unico Markdown, 13 route, navigazione, indice, responsive e SEO.
- [x] 69 immagini caricate: cinque per guida, nove nella guida rete; 47 SVG originali distinti.
- [x] Patch dipendenze e runtime; advisory ufficiali ed esposizione applicativa. Audit finali completi e produzione: zero.
- [x] Verifiche fedeltà, sicurezza, tipi, build, test e review dei due repository, inclusi test Supabase locali.
- [x] Anteprime e Chromium desktop/mobile, immagini e console. Lighthouse mobile guida 01: 97/100/100/100, CLS 0.
- [x] Grafi AST aggiornati: Website 993 nodi; Fantafort 1020. Estrazione PDF/SQL non disponibile nel runtime graphify, distinta dai test applicativi.
- [x] Report locale e scope proposto: MISSIONE-REPORT-2026-10-23.md.
- [x] Rimossi i riferimenti ai sette PDF storici su richiesta: superato il precedente blocco dei cinque PDF. Restano quattro URL esterni 404; report aggiornato del 24 ottobre.
- [x] Approvazione del primo intervento ricevuta: commit/push su branch di lavoro e PR; produzione non dichiarata verificata. Nuove correzioni da approvare prima della pubblicazione.

Vincoli verifiche: non eseguire script che scrivono su Supabase remoto, inviano email o avviano deploy. La configurazione locale Fantafort cita un vecchio branch `revival-next`; il branch realmente presente è `main`.


## Revisione visiva richiesta il 24 ottobre

- [x] Backup guide precedenti verificato.
- [x] 13 copertine nello stile precedente, schemi ridisegnati e screenshot open source.
- [x] Verifica contenuti, build, responsive e accessibilità.
- [x] Cinque screenshot OCCT ufficiali 17.0.14 e spiegazioni dettagliate; 18 ulteriori immagini dai materiali con fonte originale. Totale 83 figure + 13 copertine.
- [x] Review e correzione note obsolete, originali immutabili e nessun richiamo ai PDF.
- [x] Check, build, link interni e 26 casi browser superati; link esterni documentati separatamente.
- [ ] Nuova approvazione prima di pubblicare le correzioni.

Dettagli: `REVISIONE-VISIVA-2026-10-24.md`.

- [x] Verificata la copertura dei sette PDF (214 pagine, 127 sezioni): nessun capitolo/procedura mancante individuato; differenze non letterali documentate.
- [x] Nuovo audit: Zod dev transitivo 4.4.3 → 4.6.7; audit completo/produzione zero, check/build/link interni superati. Vedi `VERIFICA-PDF-DIPENDENZE-2026-10-24.md`.
