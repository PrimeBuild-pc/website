# Verifica sicurezza — 23 ottobre 2026

Scope: Website e `Fantafort/fantafort`, modifiche locali rispetto a HEAD. Nessun commit, push, deploy, pentest remoto, invio email o scrittura su database ospitati. Audit npm iniziale: 13 nodi Website, 6 Fantafort; audit finale completo e `--omit=dev`: **zero** per entrambi. I nodi transitivi non equivalgono a vulnerabilità indipendenti o certamente sfruttabili.

## Screenshot e runtime

| Segnalazione | Esposizione verificata e trattamento |
|---|---|
| Node CVE-2026-111497, Brotli, gravità ufficiale high | Node locale era 24.20.0. L'attacco richiede dati Brotli ostili decompressi dal runtime; non è stato dimostrato un percorso sfruttabile nelle app. Node 24.22.1 scaricato dal sito ufficiale e verificato con SHA-256, usato per test e server. Website `.node-version`/CI 24.22.1; Fantafort `.node-version`/quattro workflow 22.23.4; engines limitati alle linee 22/24 corrette. [Avviso Node](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases). |
| PHP / PHP2Shell | Nessun runtime, sorgente PHP o configurazione PHP nei repository. Le release ufficiali sono 8.5.12 / 8.4.27 / 8.3.36 / 8.2.35; nessuna patch PHP applicabile al codice esaminato. [PHP](https://www.php.net/). |
| GitLab CVE-2026-110264 | Repository e CI GitHub, nessuna installazione GitLab gestita dal progetto. Nessuna correzione applicabile qui. [Patch GitLab](https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-5-1-released/). |
| F5/NGINX K000163408 | Nessuna configurazione F5/NGINX nei due progetti; hosting esterno non ispezionato. La pagina dell'advisory restituisce solo un errore CSS: versioni/condizioni specifiche **non verificabili**, non dedotte dallo screenshot. [Advisory F5](https://my.f5.com/manage/s/article/K000163408). |

Il Node globale del PC non è stato sostituito: gli eseguibili di prova sono isolati in TEMP. I vincoli nel repository non dimostrano la versione attiva su Vercel/Cloudflare/GitHub: questa verifica resta alla fase autorizzata di pubblicazione. Cloudflare Workers non usa il Node installato sul PC.

## Website: dipendenze

| Pacchetto | Prima → dopo | Advisory, intervallo e condizioni |
|---|---|---|
| DOMPurify | 3.4.16 → 3.4.17 | Versioni ≤3.4.16; patch 3.4.17. [SAFE_FOR_TEMPLATES/shadow DOM](https://github.com/advisories/GHSA-cg2g-xh64-v4q7), [IN_PLACE/hook](https://github.com/advisories/GHSA-mrv2-3pqr-j5jr), [XHTML/SMIL](https://github.com/advisories/GHSA-c6gr-qvv4-5v3f). Severità massima critical nell'audit iniziale. Le combinazioni specifiche non sono usate: l'app sanitizza stringhe HTML con profilo HTML; patch comunque applicata. |
| sanitize-html | 2.17.7 → 2.18.1 | <2.18.0; patch 2.18.0. Moderate: [nonTextTags](https://github.com/advisories/GHSA-x3q4-9hxx-gx8m), [SMIL](https://github.com/advisories/GHSA-374f-7chj-9948), [meta refresh](https://github.com/advisories/GHSA-cv27-6wvh-8x7j). Solo build su sorgenti locali; configurazione nuova esclude meta, SVG e script. |
| Vite | 8.2.1 → 8.3.5 | Per la linea originaria vulnerabili 8.2.0–8.2.3, patch 8.2.4; per 8.3 patch 8.3.3. Dettagli sotto. Solo dev server; sito distribuito statico. |
| postcss-selector-parser | 6.0.10 → 7.1.7 | <7.1.6, patch 7.1.6, moderate, CPU exhaustion con selettori ostili. [GHSA-rj75-hqrm-r3gf](https://github.com/advisories/GHSA-rj75-hqrm-r3gf). Override transitive unico invece di una migrazione Tailwind; compatibilità verificata da build e browser. Input CSS del repository, nessun parser CSS pubblico. |
| source-map-js | 1.2.1 → 1.2.2 | ≥1.0.0 e <1.2.2, patch 1.2.2, high, offset enormi nelle mappe indicizzate bloccano l'event loop. [GHSA-68fv-2mgg-jv7q](https://github.com/advisories/GHSA-68fv-2mgg-jv7q). Transitive PostCSS, solo build. |
| smol-toml | 1.8.0 → 1.9.1 | ≤1.8.0, patch 1.9.0, moderate, parsing quadratico di TOML. [GHSA-r4xh-jqrq-34v2](https://github.com/advisories/GHSA-r4xh-jqrq-34v2). Transitive Knip, configurazione locale; non esposto alle richieste web. |

PostCSS è stato risolto da 8.5.26 a 8.5.31 nel normale aggiornamento del lockfile. Nessun `--force`, downgrade per silenziare l'audit o disattivazione delle verifiche.

Vite, sei advisory distinti con gli stessi intervalli 8.2 sopra:

- [GHSA-698v-4r3x-3vcv](https://github.com/advisories/GHSA-698v-4r3x-3vcv), moderate: escaping `%` di launch-editor su Windows, con controllo di file/ambiente da parte dell'attaccante.
- [GHSA-r825-w8mm-5pxw](https://github.com/advisories/GHSA-r825-w8mm-5pxw), moderate: nomi file interpretati come opzioni dagli editor; per Vite condizioni WSL/editor specifici.
- [GHSA-587h-7wmj-h5pm](https://github.com/advisories/GHSA-587h-7wmj-h5pm), high: bypass del controllo esistenza Windows, combinabile con l'iniezione precedente. Motivo concreto per aggiornare anche un ambiente Windows locale.
- [GHSA-9jrq-w75r-8gcw](https://github.com/advisories/GHSA-9jrq-w75r-8gcw), low: middleware HTML personalizzato con URL non normalizzato e moduli inline. Il progetto usa la modalità SPA ordinaria.
- [GHSA-rq7h-c2jc-7f22](https://github.com/advisories/GHSA-rq7h-c2jc-7f22), moderate: accesso file fuori allowlist su sistemi non Windows e server esposto. Non riprodotto sul PC Windows.
- [GHSA-vfpm-58rq-9qcg](https://github.com/advisories/GHSA-vfpm-58rq-9qcg), moderate: primi quattro byte di file tramite query WASM sul dev server. Patch applicata; anteprime vincolate a loopback.

## Fantafort

Next e eslint-config-next 16.4.0 → **16.4.2**, lockfile coerente; React invariato. Per gli advisory seguenti la patch della linea 16.4 è 16.4.1:

| Advisory | Esposizione |
|---|---|
| [GHSA-2464-fhr4-w9xw](https://github.com/advisories/GHSA-2464-fhr4-w9xw), critical | Image Optimization su Linux glibc con libreria nativa vulnerabile. Il precedente override `sharp:0.35.5` era già una mitigazione; rimane presente. Next aggiornato, nessuna dimostrazione di RCE locale o remota. |
| [GHSA-673q-mjm6-r5xr](https://github.com/advisories/GHSA-673q-mjm6-r5xr), critical | Cache Components / `use cache` con più typed array. Non trovati `cacheComponents` né direttive `use cache` nel progetto. |
| [GHSA-p3m5-59mp-jv5r](https://github.com/advisories/GHSA-p3m5-59mp-jv5r), high | DoS App Router con Server Actions. Non trovate direttive `use server`; le mutazioni esaminate passano per route API. Next comunque corretto. |

### Advisory braces ritirato

`braces:3.0.3` resta transitivo nei tool Tailwind/ESLint. I cinque nodi high residui dei primi audit erano propagazioni di [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm), ≤3.0.3, nessuna patch. **GitHub lo ha ritirato il 23 ottobre 2026**, giudicandolo non praticamente sfruttabile; il registro npm ha recepito il ritiro durante la missione. Gli audit finali sono zero senza eccezioni o filtri. Non è stato dichiarato corretto tramite un aggiornamento inesistente.

## Correzioni applicative Website

1. **Resolver pubblico GitHub:** prima inoltrava Authorization anche agli host di download e poteva restituire release di repository privati accessibili al token. Ora verifica `private === false`, confina il token a `api.github.com`, consente solo HTTPS su host espliciti, senza credenziali/porte arbitrarie, blocca redirect di metadati, limita durata e annulla il body della richiesta Range. Casi public/private, token e redirect verificati con fetch simulato. Non è stata provata l'esistenza di un token privilegiato in produzione.
2. **Contatto:** limite reale di 16 KiB sullo stream, JSON oggetto con campi stringa, rifiuto 400/413 prima di chiamate esterne; timeout di rete. Il test originale di notifica/conferma continua a passare e gli input invalidi non inviano email. Resend e Turnstile reali non contattati.

## Evidenze e limiti

- Website: TypeScript, test contatto/resolver/contenuto, build e SEO 20 route superati. Browser delle 13 guide a 1440 e 390 px, fedeltà del testo DOM, 69 immagini caricate per viewport, zero errori JS e zero rilievi axe WCAG A/AA nell'area guide.
- Fantafort: lint, `tsc --noEmit`, build 77 pagine, check auth/admin/JWT/header/API bounds/player pool/client-secrets superati. Provider pubblico: 102 tornei EU / 33 team nel controllo limitato. Test social, wallet, leghe, admin, community/privacy su **Supabase localhost**, senza account reali; superati. DB lint conserva una warning preesistente: parametro `confirm_username` inutilizzato in `public.delete_account`.
- Gitleaks: nessun riscontro nei diff e nelle nuove sorgenti/allegati Website. Lo scan completo della cartella Fantafort segnala 47 corrispondenze nei file ignorati `.env*`, `.next` e `supabase/.temp/start-secrets`; non sono modifiche da committare. Il controllo specifico del bundle client passa. Nessun valore è riportato qui.
- Nessuna verifica di produzione, sessioni reali, CAPTCHA o servizi email. L'audit non è una prova dell'assenza di qualunque vulnerabilità.

## Review Standards

Review indipendente della skill `mattpocock-skills:code-review`: individuato il mantenimento dello scroll passando alla guida successiva; corretto e riverificato nel browser (`scrollY = 0`). Nessuna violazione documentata o astrazione superflua residua nel diff esaminato. Correzioni resolver/form coerenti; Fantafort limitato a dipendenze e runtime.

## Review Spec

Un difetto di navigazione corretto; cinque PDF storici con diritti delle immagini pendenti restano un blocco noto al requisito di tutti i link funzionanti. Verificati 49 collegamenti interni fra guide/frammenti. Nessuno scope creep evidente. Non equiparare build riuscita a sito completamente pronto per pubblicazione.
