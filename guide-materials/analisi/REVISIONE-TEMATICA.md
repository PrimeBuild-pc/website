# Ripresa editoriale e revisione indipendente — 11 ottobre 2026

## Richiesta e risultato

Approfondire parti frettolose e transizioni, recuperare contenuti/immagini delle guide esistenti, mostrare opzioni delle app, restaurare dati LatencyMon e dividere la mega-guida. Realizzati catalogo + 12 guide autonome, mantenendo 21 sezioni, ID pubblici e 33 PNG originali. Sito consultato soltanto in lettura; nessuna integrazione o pubblicazione.

Ampliati soprattutto stabilità/OCCT, rendering/PresentMon/limiter e audio (cuffie, fit, DAC, Windows, APO/Peace, AutoEq, headroom e voce). Recupero critico, non copia di preset: numeri EQ incompleti, consigli FSO universali e compatibilità storiche non sono ricette correnti. DLSS resta specialistico separato.

## Acquisizioni reali

- Peace 1.6.9.11: profilo già presente, EQ disattivato. Main e grafico acquisiti; solo `Add pre amplifying` nella vista del grafico selezionato per illustrare il preamp e poi riportato allo stato iniziale. Nessun gain/profilo applicato.
- PresentMon 2.6.0: Capture Application e editor widget reali, nessun processo scelto o acquisizione/overlay avviato manualmente. Il primo `PresentMonUI.exe` è stato chiuso, poi è stata aperta l’app corretta. Le finestre aperte per le acquisizioni sono state chiuse.
- Equalizer APO Editor 1.4.2: primo avvio fallito per plugin Qt; riaperto con ambiente Qt isolato al solo processo, senza installazione/riparazione né modifica dell’ambiente globale. Avviso iniziale APO non associato al device selezionato; declinato senza aprire Device Selector elevato. Nessun edit/Apply/Save del filtro. Il pannello Analysis è calcolato, non misura sonora.
- OCCT: non trovato, non scaricato/installato/eseguito. La versione Personal gratuita esclude attività professionali/commerciali; usato manuale ufficiale. Screenshot UI 13.0.0 (CPU, non CPU+RAM) con annotazioni, pagina web Security con arresti documentati. Non attestano UI 17.1.7. Download Python del PNG ha restituito 403; l’immagine pubblica già resa nel browser è stata acquisita ai pixel nativi, senza bypass di accesso o CAPTCHA.
- LatencyMon: recuperato il PNG originale dall’archivio di pulizia. Ritaglio dei soli bordi/desktop; durata 1:45, numeri, moduli, barre e verdetto visibili. Non eseguita nuova raccolta. Rimane non controllata e priva di condizioni registrate; non si inventa una diagnosi.
- NVIDIA: sette immagini ufficiali, incluse CPU/GPU-bound e pipeline sovrapposta. Numeri commerciali 56/28 ms e 50% restano esempi del produttore, non risultati locali.
- Intel: overlay pubblico GPU Busy (asset 2024), con interpretazione; l’interfaccia locale mostra anche i controlli CPU Busy/Wait. Differenza Frame Time−GPU Busy non dichiarata CPU Busy.
- Sito: recuperate due schermate audio e illustrazioni cuffia/DAC; autore/build/modello non verificati, nessuna falsa fotografia o raccomandazione di prodotto. Candidati DLSS e low-latency driver non pertinenti non inclusi nel bundle di lettura.

Metadati: `fonti-v3/FIGURE-AGGIUNTE.json`, JSON di acquisizione e fonti primarie locali. 72 figure finali; 54 con diritto di riproduzione non riscontrato.

## Due revisioni indipendenti

Revisori separati, modalità sola lettura: rendering/metrologia/navigazione e stabilità/audio. Nessun P1; cinque P2 corretti:

1. Protocollo sync/limiter reso autosufficiente (warm-up, stessa durata, ripetizioni A–B–A), con link puntuale a PresentMon.
2. Rimando “capitolo 19” sostituito con link alla guida Parametri Windows.
3. Rollback No APO comprende ripristino dell’associazione nel Device Selector e riavvio richiesto, non il solo profilo.
4. Test di attenuazione prescrive EQ ON e conservazione/ripristino dello stato ON/OFF; EQ disattivato incluso nel troubleshooting.
5. OCCT “release 17 installata” corretto: nessuna installazione locale, soltanto materiale documentale.

Corretto inoltre un problema rilevato dal browser a 941px: regola di chiusura dell’indice confinata al mobile. Eliminati i numeri globali dai titoli web e un residuo rimando “sezione 03”, preservando gli ID. Un requisito spurio dei test su tre fotografie è stato rimosso: l’utente aveva richiesto schermate/immagini, non tre fotografie; le illustrazioni non vengono riclassificate per far passare un test.

## Limiti

Revisioni e verifiche statiche/browser/PDF non provano hardware, anti-cheat, installer, UAC, stress o rollback reale. Nessun tuning Windows/driver/registro/router, nessuna applicazione EQ o nuova raccolta di gioco. OCCT locale resta non acquisito; necessaria edizione/licenza appropriata per eventuale uso professionale. Diritti immagini, integrazione nel sito e pubblicazione restano da autorizzare/verificare.
