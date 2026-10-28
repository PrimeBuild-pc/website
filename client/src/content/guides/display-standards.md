### HDMI e DisplayPort: che cosa cambia nel collegamento

Entrambi trasportano video e audio digitali. **DisplayPort** nasce per il collegamento fra computer e display: usa un flusso a pacchetti su un massimo di quattro corsie principali, con un canale ausiliario per controllo e negoziazione. **HDMI** è molto diffuso fra TV, console, soundbar e ricevitori audio/video. Il vecchio trasporto **TMDS** impiega tre coppie dati e una coppia di clock; **FRL**, introdotto con HDMI 2.1, può usare tre o quattro corsie dati con clock incorporato. Non sono segnali intercambiabili: cambiare la forma del connettore non equivale a convertire il protocollo. [VESA](https://www.displayport.org/faq/), [Keysight, trasporti HDMI](https://www.keysight.com/us/en/assets/7018-06874/data-sheets/5992-4349.pdf).

La versione descrive una specifica; **il rate del link descrive quanti dati possono attraversare quella porta**. Gbit/s significa miliardi di bit al secondo, non GB/s: per passare ai byte si divide per otto. Questi numeri non sono la banda della VRAM della GPU e non indicano gli FPS del gioco.

### Tabella delle generazioni e della banda

I valori seguenti si riferiscono al massimo collegamento indicato, senza dock o condivisione di corsie. La colonna “dopo codifica” è il calcolo del solo rapporto di codifica: **non è tutta banda disponibile per i pixel**. Pacchetti, audio, controllo e correzione degli errori possono consumarne una parte; per UHBR i payload pratici indicativi, comprensivi di FEC, sono riportati nella sezione 4. FEC corregge errori del link, non aumenta la qualità dell'immagine renderizzata.

| Famiglia / generazioni | Rate per corsia × corsie dati | Banda lorda | Codifica | Dopo la sola codifica | Classe di cavo pertinente |
|---|---:|---:|---|---:|---|
| DP 1.0 / 1.1, HBR | 2,7 × 4 Gbit/s | 10,8 Gbit/s | 8b/10b | 8,64 Gbit/s | DP certificato per il rate richiesto |
| DP 1.2 / 1.2a, HBR2 | 5,4 × 4 Gbit/s | 21,6 Gbit/s | 8b/10b | 17,28 Gbit/s | DP certificato HBR2 o superiore |
| DP 1.3 / 1.4 / 1.4a, HBR3 | 8,1 × 4 Gbit/s | 32,4 Gbit/s | 8b/10b | 25,92 Gbit/s | DP8K / HBR3 |
| DP 2.0 / 2.1 / 2.1a / 2.1b, UHBR10 | 10 × 4 Gbit/s | 40 Gbit/s | 128b/132b | 38,79 Gbit/s | DP40 storico, DP54 o DP80 |
| Stesse generazioni, UHBR13.5 | 13,5 × 4 Gbit/s | 54 Gbit/s | 128b/132b | 52,36 Gbit/s | DP54 o DP80 |
| Stesse generazioni, UHBR20 | 20 × 4 Gbit/s | 80 Gbit/s | 128b/132b | 77,58 Gbit/s | DP80; DP80LL per il percorso attivo previsto |
| HDMI 1.0–1.2a, TMDS | 1,65 × 3 Gbit/s | 4,95 Gbit/s | 8→10 bit | 3,96 Gbit/s | High Speed; Standard solo entro le modalità certificate |
| HDMI 1.3 / 1.4 / 1.4a / 1.4b, TMDS | 3,4 × 3 Gbit/s | 10,2 Gbit/s | 8→10 bit | 8,16 Gbit/s | High Speed |
| HDMI 2.0 / 2.0a / 2.0b, TMDS | 6 × 3 Gbit/s | 18 Gbit/s | 8→10 bit | 14,40 Gbit/s | Premium High Speed |
| HDMI 2.1 / 2.1a / 2.1b, FRL al massimo rate | 12 × 4 Gbit/s | 48 Gbit/s | 16b/18b | 42,67 Gbit/s | Ultra High Speed |
| HDMI 2.2, FRL di nuova generazione | Verificare il livello implementato | fino a 96 Gbit/s; livelli Ultra96 da 64 / 80 / 96 | Non dettagliata nell'overview HDMI LA citata | Non dedotta dal solo numero “96” | Ultra96 |

Fonti dei rate: [evoluzione DisplayPort, VESA](https://vesa.org/wp-content/uploads/2023/11/VESA-October-2023-Taipei-Workshop-Presentations.pdf), [parametri HDMI, Nexperia](https://assets.nexperia.com/documents/user-manual/nexperia_ESD_Handbook_230720_lowres.pdf), [TMDS e FRL, Keysight](https://www.keysight.com/us/en/assets/7018-06874/data-sheets/5992-4349.pdf), [HDMI 2.2, HDMI LA](https://www.hdmi.org/spec/hdmi2), [classi dei cavi HDMI](https://www.hdmi.org/resource/cables). I risultati dopo codifica sono calcoli, arrotondati a due decimali; non misure di laboratorio.

Un ingresso HDMI 2.1 può avere un rate FRL inferiore al massimo. Per esempio, **32 / 40 / 48 Gbit/s lordi** diventano rispettivamente **28,44 / 35,56 / 42,67 Gbit/s dopo la sola codifica 16b/18b**. Due porte commercializzate con la stessa versione possono quindi offrire combinazioni diverse. Analogamente, una porta DP 2.1 con UHBR13.5 non diventa UHBR20 grazie a un cavo DP80.

Le revisioni che condividono la banda non sono identiche nelle funzioni. DP 1.4 aggiunge il percorso DSC e metadati HDR rispetto alla generazione 1.3; DP 1.4a aggiorna il riferimento DSC. DP 2.1a/2.1b migliorano anche requisiti e cablaggio senza alzare il massimo oltre UHBR20. HDMI 2.0a aggiunge il trasporto dei metadati HDR statici; HDMI 2.1 introduce fra le proprie funzioni FRL, VRR, ALLM ed eARC, mentre 2.1a aggiunge SBTM. **Versione e presenza effettiva delle funzioni vanno controllate separatamente**: non usare una tabella di “sì” universali per tutti i prodotti. [Panoramica HDMI](https://hdmi.org/spec/), [DisplayPort e DSC](https://www.displayport.org/faq/).

### Risoluzione, Hz e colore: perché “supporta 4K” non basta

Non esiste un unico “massimo Hz” per una versione: cambiano risoluzione, timing, bit per canale, chroma e DSC. Questi esempi calcolano **solo i pixel visibili RGB/4:4:4 non compressi**, prima degli altri overhead:

| Segnale | Bit per canale | Bit per pixel | Video attivo | Implicazione pratica |
|---|---:|---:|---:|---|
| 1920×1080, 240 Hz | 8 | 24 | 11,94 Gbit/s | Supera il payload HDMI 1.4; verificare timing e modalità delle porte più capaci |
| 2560×1440, 240 Hz | 10 | 30 | 26,54 Gbit/s | Supera già HBR3 non compresso: servono un altro rate, DSC o un diverso formato |
| 3840×2160, 60 Hz | 10 | 30 | 14,93 Gbit/s | Supera TMDS 18 Gbit/s dopo codifica; “4K60” non garantisce RGB a 10 bit |
| 3840×2160, 120 Hz | 10 | 30 | 29,86 Gbit/s | Supera HBR3 e FRL32 dopo codifica; confrontare anche l'overhead reale |
| 3840×2160, 144 Hz | 10 | 30 | 35,83 Gbit/s | Supera FRL40 dopo codifica anche prima dell'overhead |
| 3840×2160, 240 Hz | 10 | 30 | 59,72 Gbit/s | Supera FRL48 e UHBR13.5 non compressi; UHBR20 offre un budget superiore |

Superare il budget dimostra che quel segnale **non entra non compresso**; stare sotto non dimostra da solo che il monitor lo accetti. La tabella modalità del display resta decisiva. Un 4K240 può usare DSC anche se il pannello è a 10 bit: DSC e profondità colore sono proprietà diverse. Un 4K120 ottenuto riducendo il chroma a 4:2:0 non è equivalente a RGB per il testo del desktop.
