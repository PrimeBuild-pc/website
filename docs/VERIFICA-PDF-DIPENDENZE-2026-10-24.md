# Copertura PDF e verifica dipendenze — 24 ottobre 2026

## Esito del confronto documentale

Verificati i sette PDF storici (214 pagine), con estrazione del testo dai PDF effettivi e inventario delle 127 sezioni / 778 blocchi di testo, liste e tabelle dei relativi sorgenti HTML. Questi ultimi sono stati usati solo per segmentare il confronto, non come nuova sorgente editoriale del sito.

Il confronto automatico propone corrispondenze lessicali; non certifica equivalenza semantica. Sono stati controllati i punti con minore sovrapposizione, le procedure di installazione/rimozione/recupero, le tabelle e i comandi. Non sono emersi capitoli tecnici o procedure operative mancanti; non si dichiara una trasposizione letterale completa di ogni didascalia, valore derivato o metadato storico.

| PDF | Pagine | Sezioni | Guide web di riferimento |
|---|---:|---:|---|
| 01-primo-setup | 16 | 22 | 01 Windows setup; 03 driver; 11 parametri |
| 02-latencymon-e-driver | 28 | 23 | 02 stabilità/OCCT; 03 driver/LatencyMon; 11 parametri |
| 03-audio-competitivo | 61 | 18 | 08 audio/cuffie/DAC; 09 audio Windows/EQ |
| 04-frame-cap-e-presentazione | 52 | 19 | 04 CPU/GPU/PresentMon; 05 sincronizzazione/limiter; 13 DLSS/FG |
| 05-displayport-hdmi | 8 | 5 | 06 display/cavi |
| 06-input-mouse-usb | 19 | 19 | 07 input/USB |
| 07-rete | 30 | 21 | 10 rete domestica |

## Riscontri e differenze da non nascondere

- Setup: strumenti di lettura, ISO/USB, firmware, account offline, SATA/NVMe/VMD, driver, WinGet/runtime, debloat, energia e scheduling presenti nella guida 01; spiegazioni ISR/DPC e parametri distribuite anche fra 03/11.
- Driver: baseline, HWiNFO, OCCT, MemTest86/WHEA, identità driver, RAPR/DDU, cinque schede LatencyMon, A–B–A, WPR/WPA, MSI/affinità/MMCSS/timer presenti nelle guide 02/03/11. Le schermate v13 e le note storiche sono superate dall'integrazione OCCT 17.0.14.
- Audio: catena, trasporti, API, periodo shared, LowAudioLatency, installazione/verifica/rimozione APO/Peace, filtri/Q/headroom, strategie EQ, AutoEq, pari volume e microfono/ducking/monitoring presenti in 08/09. Conservati anche i limiti delle catture con EQ disattivato e APO non associato; il grafico blu con autore incerto non è stato importato. I dettagli del suo hardware/baffi nella didascalia del PDF non sono tutti riprodotti; il testo mantiene valori 3/96/36 ms e incertezza della fonte, senza usarlo come prova affidabile.
- Rendering: pipeline, metriche Busy/Wait, esempi 8/6/6, 12/10/4 e 12/4/11, acquisizione, OBS, Reflex/Anti-Lag, FG/Frame Warp, VRR, flip/MPO/FSO, RTSS e confronto cap presenti in 04/05/13. Non serve il PDF per seguire il protocollo.
- Display: refresh, segnale/scaling, banda, DP/HDMI, DSC e intermediari presenti in 06. La tabella web conserva 144–540 Hz e gli intervalli; non ripete la colonna numerica “metà intervallo” (3,47/2,08/1,39/1,04/0,93 ms), ma ne spiega espressamente il significato aritmetico e il limite. Non è una misurazione omessa.
- Input: polling 125–8000 Hz, Raw Input, topologia, MouseTester, limiti HID, tastiere/SOCD/controller e HIDUSBF con installazione selettiva, verifica, Remove e Recovery presenti in 07.
- Rete: copertura, inventario, Ethernet/T568, Wi-Fi/DFS/mesh, NIC, ping/Test-NetConnection/tracert/pathping, bufferbloat/SQM, confronto, diagnosi ISP e catture presenti in 10. Tabelle di cablaggio e comandi conservano i limiti e i target autorizzati.
- Copertine, numeri pagina, rimandi alla vecchia guida completa, avvisi “bozza interna/non pubblicare” e riferimenti ai PDF non sono contenuto operativo da reinserire. Nessun recupero automatico della vecchia prosa nei Markdown definitivi.

## Immagini vecchio sito

Confrontati i blob degli asset effettivamente associati alle guide con quelli del vecchio main 936d2f7: 0 asset byte-identici riutilizzati. Le immagini dei PDF sono un insieme distinto. La risposta iniziale “sì” era riferita a questi materiali; per le vecchie guide online la risposta è “no”.

## Nuovo controllo sicurezza

- Audit iniziale di oggi: una segnalazione high su Zod 4.4.3, transitivo di Knip 6.32.2, solo sviluppo. [GHSA-mrhx-c7xc-m3w5](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5): consumo di memoria con collezioni ostili, versioni <4.6.6; advisory pubblicato 1 ottobre, aggiornato 23 ottobre 2026. Nessun percorso pubblico di validazione Zod individuato nel sito: non si dichiara un DoS remoto dimostrato.
- Aggiornamento mirato: Zod **4.4.3 → 4.6.7**, entro il range di Knip. Solo package-lock.json modificato; nessun override nuovo, major forzato o audit disabilitato.
- Audit completo e produzione dopo la patch: **0 vulnerabilità**. Evidenze: tmp/occt-integration/audit-final.json e audit-production.json.
- Già corretti: DOMPurify 3.4.17, sanitize-html 2.18.1, Vite 8.3.5; dettaglio degli advisory nel report sicurezza del 23 ottobre. L'advisory Vite [21 ottobre GHSA-8g5g-mxqh-grgj](https://github.com/vitejs/vite/security/advisories/GHSA-8g5g-mxqh-grgj) riguarda 6.4.4, non la 8.3.5 installata.
- .node-version e runtime di verifica: **24.22.1**, release corretta del [21 ottobre 2026](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases). Il Node globale del PC e il runtime effettivo dell'hosting non sono stati modificati o verificati in produzione.
- Dopo la patch: check TypeScript/test applicativi/contenuti, build produzione, SEO 20 route e link interni superati. Il bundle applicativo risultante conserva gli stessi hash della build precedente: Zod resta nei tool di sviluppo.
- Nessun commit, push o deploy eseguito. Zero advisory noti non significa assenza garantita di ogni vulnerabilità.

## Impronte dei PDF verificati

| PDF | SHA-256 |
|---|---|
| 01-primo-setup.pdf | c9534d4f906a24bd9f93cb2fac81a0f9622341f42dac73013fad69631561ed70 |
| 02-latencymon-e-driver.pdf | 0a4a4f53d93f4e9e9387206fb20e35225ba0cb5d0d70f6226915207751b27fbb |
| 03-audio-competitivo.pdf | ae8dd06d0caf400fcd78c4e4823e7dd712e5e4477767aa2fd6d380ddfd7ce9fb |
| 04-frame-cap-e-presentazione.pdf | 85747142ee477a26625962078d1de6c4687b114b58c943cc757bc8047050af9a |
| 05-displayport-hdmi.pdf | a68317fd504b34a79ed3b53203913013c758a26dab535683a55d9f57b295fcf4 |
| 06-input-mouse-usb.pdf | 5d102dcf87419ce341c1b6b5b84be990356b07366f69e67db2a1022868101170 |
| 07-rete.pdf | b238949cebdda8dd718c6b747fb165d5403babbe315eab9f23ac04e3bb316405 |
