# Missione guide e sicurezza — 23 ottobre 2026

Pubblicazione bloccata fino ad approvazione esplicita: nessun commit, push, merge o deploy.

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
- [ ] Blocco documentale: cinque PDF senza permessi verificati; quattro URL esterni 404, altri tredici non verificabili automaticamente. Nessuna alterazione dei link definitivi.
- [ ] Approvazione commit/push/deploy: non ricevuta. Nessuna pubblicazione eseguita.

Vincoli verifiche: non eseguire script che scrivono su Supabase remoto, inviano email o avviano deploy. La configurazione locale Fantafort cita un vecchio branch `revival-next`; il branch realmente presente è `main`.
