# Verifica video, grafici e RTSS

**Perimetro.** Verifica documentale eseguita il **9 ottobre 2026**. Nessun HTML, asset del sito, script o impostazione di sistema è stato modificato; RTSS non è stato scaricato, installato né avviato. Il log minimo dei metadati e degli accessi riusciti è in [fonti-web/2026-10-09-video-rtss-rilevamento.md](fonti-web/2026-10-09-video-rtss-rilevamento.md).

Ho letto `APPUNTI-PROSSIMA-REVISIONE.md` e la sezione conclusiva di `discord-revisione/sorgenti-pdf/04-frame-cap-e-presentazione.md`: entrambi richiedono di non trasformare una percezione o un grafico di frametime in una misura input→fotone e di non trattare RTSS come preset universale.

## 1. Identità e associazione delle tre fonti video

I titoli e i canali provengono dall'endpoint **YouTube oEmbed** ufficiale; la data è il metadato HTML `datePublished`/`uploadDate` della pagina diretta. Orari indicati come pubblicati da YouTube con offset `-07:00`.

| ID / URL canonico | Titolo verificato | Autore/canale verificato | Data verificata | Trascrizione locale associata | Base dell'associazione |
|---|---|---|---|---|---|
| [`zNHFAAJkIvo`](https://www.youtube.com/watch?v=zNHFAAJkIvo) | *Everyone is Lying about Input Latency Settings* | **CS2 Kitchen** (`@cs2kitchen`) | 12 luglio 2026, 05:32:07 `-07:00` | `transcript video 2.txt` | Il titolo riguarda input latency; la trascrizione tratta Reflex, carico GPU, fullscreen/borderless, limiter esterni e raw keyboard input. I grafici locali corrispondenti riportano gli stessi confronti e valori. |
| [`P-3Os4btIg4`](https://www.youtube.com/watch?v=P-3Os4btIg4) | *You are using the WRONG Audio Settings* | **CS2 Kitchen** (`@cs2kitchen`) | 5 ottobre 2026, 04:14:08 `-07:00` | `transcript video 1.txt` | Il titolo riguarda audio; la trascrizione tratta input→suono, cablato/2,4 GHz/Bluetooth, DAC, EQ, Voicemeeter e API audio. I grafici locali selezionati riportano gli stessi soggetti e valori. |
| [`n6mskKHpEPc`](https://www.youtube.com/watch?v=n6mskKHpEPc) | *Front Edge Sync Guide 2026 \| Reduce Micro Stutter, Improve Frame Pacing & Smoother PC Gaming* | **Scotty-2-Hotty354** (`@scotty-2-hotty354`) | 19 giugno 2026, 03:56:35 `-07:00` | `trascritto video 3.txt` | L'URL è in testa alla trascrizione; contenuto e titolo coincidono con Front Edge Sync/RTSS. |

**Esito attribuzione.** I primi due transcript non sono stati abbinati per la sola posizione dei link: la corrispondenza semantica è confermata dai titoli oEmbed ufficiali e dai dati leggibili nei grafici. Il terzo video è di **Scotty-2-Hotty354**, non di Everything OLED. Nella trascrizione *Everything OLED* è un ringraziamento/citazione dell'autore: non costituisce un'attribuzione del video, del canale o dei suoi grafici.

## 2. Grafici e screenshot locali

### Associazioni supportate

| Video / transcript | Materiale locale | Stato e limite probatorio |
|---|---|---|
| CS2 Kitchen — audio / `transcript video 1.txt` | Serie `Screenshot 2026-10-08 215519.png`–`215939.png`; in particolare `215609` (cablato/Inzone H7/Bluetooth) e `215716` (Voicemeeter WDM). Le copie in `bozza/assets/audio-collegamenti.png` e `audio-mixer.png` derivano rispettivamente da tali due originali, come registrato in `REVISIONE-EDITORIALE.md`. | Associazione solida per tema e valori: la trascrizione descrive esattamente i confronti. I PNG non incorporano un credito/licenza leggibile: il canale è l'attribuzione editoriale verificabile, non una prova di concessione dei diritti. |
| CS2 Kitchen — input latency / `transcript video 2.txt` | Serie `Screenshot 2026-10-08 222152.png`–`222429.png`; in particolare `222206` (Reflex 20,0 / 16,7 / 15,6 ms), `222307` (borderless/fullscreen 9,0 ms) e `222349` (`fps_max` 8,8 ms, NVIDIA 12,5 ms, RTSS 12,4 ms). Le tre copie `reflex-carico.png`, `fullscreen-borderless.png`, `limiter-200.png` sono mappate agli originali nello stesso documento. | Associazione solida per soggetto, scenario e numeri dichiarati nella trascrizione. Sono risultati dell'autore nel suo setup/scena, non valori universali o una validazione indipendente. |
| Scotty-2-Hotty354 — Front Edge / `trascritto video 3.txt` | Nessun PNG nella raccolta è provato come frame o grafico estratto da questo video. | **Non attribuire alcuna immagine a questo video.** In particolare non associare Everything OLED al materiale. |

`Screenshot-2026-09-30-003336.png` mostra un'interfaccia RTSS 7.3.7 con un cap, il campo “Frametime calculation point” impostato a “frame presentation”, Front Edge Sync e Passive Waiting non selezionato. È utile soltanto come cattura locale dell'interfaccia: non ha provenienza/autore/licenza documentati e non dimostra il meccanismo né un risultato di latenza. `Screenshot 2026-10-09 142222.png` (WhatsApp), `image.png` (tabella USB) e gli screenshot Rufus non sono materiali dei tre video e vanno esclusi da crediti e illustrazioni video.

### Come presentare i grafici, se verranno autorizzati

1. Didascalia completa: **autore/canale, titolo, URL canonico, data di pubblicazione, scenario e metodo dichiarati dall'autore**; indicare “grafico/cattura dal video” anziché presentarlo come benchmark Prime Build.
2. Conservare i limiti: una serie di 100/1.000 campioni o una media misurata dall'autore descrive quel banco prova, gioco, scena, driver e cap. Un grafico di frametime non misura da solo input→fotone.
3. Non tagliare watermark, marchi, scale, condizioni e testo metodologico; non rifare le barre come se fossero misure proprie.
4. Prima della pubblicazione, chiedere **permesso scritto del titolare dei grafici/video** oppure verificare una licenza esplicita che copra riproduzione sul sito. Nei metadati/pagine consultati non è emersa una licenza di riuso per nessuno dei tre video.
5. L'oEmbed e l'embed del player non sono una licenza per copiare thumbnail, frame o grafici. I termini YouTube consentono l'embed, ma per riproduzione/distribuzione/modifica richiedono autorizzazione del titolare, permesso del servizio o base di legge applicabile. Anche con consenso del canale, verificare eventuali elementi di terzi visibili nei frame.

Per ora l'uso sicuro è un collegamento/iframe YouTube autorizzato dal servizio e il credito testuale; non la ripubblicazione dei PNG.

## 3. RTSS: fonti correnti, supporto e limiti

### Accessi riusciti e versione

La pagina di distribuzione che si presenta come homepage ufficiale di RivaTuner su Guru3D era raggiungibile e proponeva **RTSS 7.3.7 Final**, con sviluppatore indicato “Guru3D / Unwinder”. Dichiara supporto per monitoraggio/OSD/frame limiter con applicazioni DirectX, Vulkan e OpenGL.

Requisiti dichiarati dalla pagina: Windows XP–Windows 11 (x86/x64), privilegi amministrativi completi e GPU compatibile con una di tali API. Questo è un requisito del software, **non** una promessa che l'hook, l'OSD o il limiter funzionino in ogni gioco, API, overlay, Frame Generation o anti-cheat. La stessa pagina avverte che alcuni anti-cheat possono restringere l'OSD o bloccare la connessione al server; non va aggirato il divieto rinominando DLL o forzando injection.

Il changelog 7.3.7 conferma miglioramenti all'opzione **“Inject NVIDIA Reflex latency markers”**. Ciò riguarda marker iniettati da RTSS e la loro compatibilità; non dimostra che RTSS replichi l'integrazione **NVIDIA Reflex nativa** nel motore, né che una voce di limiter chiamata Reflex abbia lo stesso comportamento/risultato.

### Cosa si può dire delle modalità — e cosa no

| Voce | Riscontro disponibile | Fatti utilizzabili | Non verificato / da non promettere |
|---|---|---|---|
| **Async** | La pagina corrente conferma il limiter, non un help per-opzione. Un thread Guru3D del 2025 riporta una citazione attribuita a Unwinder. | Secondo quella citazione di seconda mano, Async applica il ritardo subito **dopo** la chiamata `Present` originale. | Non dichiarare costo fisso in frame/ms, “meno input lag” universale, né che sia Adaptive-Sync del monitor. |
| **Front Edge Sync** | Stesso thread; la UI è visibile anche nella cattura locale RTSS 7.3.7. | La citazione riportata dice che applica l'attesa immediatamente **prima** del `Present` originale; tutti e tre i modi citati userebbero l'hook di `Present`. Un grafico present-to-present può quindi apparire più piatto senza dimostrare un percorso input→fotone migliore. | Non trasformare “smooth” percepito nel video in benchmark; nessuna regola “Front Edge sempre migliore”, né cap pari agli 1% low. |
| **Back Edge Sync** | Solo la citazione di seconda mano nel thread per il dettaglio meccanico. | Vi è descritto come attesa immediatamente **dopo** `Present`, insieme ad Async. | Non confonderlo con Scanline Sync o con V-Sync/VRR; non attribuire un vantaggio quantitativo senza prova per gioco/versione. |
| **Frame Start** | La cattura locale mostra il controllo **Frametime calculation point** su “frame presentation”; il thread discute la scelta fra frame start e frame presentation. Non è stata trovata una guida ufficiale accessibile che ne definisca tutti gli effetti. | Trattarlo come punto di calcolo/campionamento della **metrica di frametime**, non come prova di dove un gioco campiona l'input o di quando il limiter attende. | Non presentarlo come ottimizzazione di latenza o come requisito di Front Edge Sync. |
| **Passive Waiting** | Checkbox presente nella cattura locale; non è emersa documentazione primaria per-opzione nella pagina/changelog corrente. Commenti nel thread sono esperienze della community. | Esistenza dell'opzione nella UI locale, non la sua efficacia. | Non raccomandare “disattivato” globalmente e non dedurre consumo CPU, precisione o stutter senza test ripetibile nella stessa versione. |
| **NVIDIA Reflex (RTSS)** | Changelog 7.3.7: marker RTSS iniettati. | Separare marker/injection RTSS da Reflex implementato dal gioco. | Non dire che l'opzione RTSS sostituisce Reflex nel gioco, né sommarli come se fossero complementari senza documentazione del titolo. |
| **Scanline Sync** | La UI RTSS locale lo mostra come controllo distinto; la pagina di download conferma il limiter ma non offre qui una definizione per-opzione. | È distinto da Front/Back Edge e da Async; il suo nome non rende il frame “senza tearing” né abilita VRR. | Non configurarlo come rimedio generico per flicker VRR, Frame Generation o stutter; non usare valori/tuning presi dal video come preset. |

La fonte più precisa su Front/Back/Async è però un post della community che *riporta* Unwinder senza collegare il post originale. È stata usata per delimitare le affermazioni, non elevata a manuale ufficiale. Mancando una guida primaria web per le singole opzioni e non avendo aperto l'help del pacchetto, le celle “non verificato” restano volutamente tali.

### Conseguenze editoriali e per i test

- **VRR/Adaptive-Sync, V-Sync, limiter RTSS, NVIDIA Reflex e Scanline Sync non sono sinonimi.** VRR è una capacità negoziata da display/driver; Front/Back/Async sono posizionamenti dell'attesa del limiter RTSS secondo la citazione; Scanline Sync è un controllo separato; Reflex integrato conosce il motore, RTSS no per definizione.
- Scegliere un solo limiter come baseline per gioco, documentare gioco/API/driver/refresh/sync/Frame Generation/overlay e confrontare A/B nella stessa scena. Evita sovrapposizioni di limiter e conclusioni basate solo su una media FPS, 1% low o un grafico più regolare.
- Il video 3 dichiara impressioni come “tight”, “instant” e fluidità percepita: sono **impressioni dell'autore**, non misure input→fotone. Il suo consiglio di usare gli 1% low o il cap proposto dall'interfaccia non è corroborato da una regola RTSS ufficiale rintracciata.
- La risposta dei pixel OLED, scanout, code CPU/GPU, punto di campionamento input e presentazione sono passaggi diversi. Un monitor veloce non convalida da solo una configurazione di limiter.
- Per online/competitivo, se la policy del gioco è incerta, non usare hooking/overlay RTSS come workaround: preferire funzione nel gioco/driver espressamente supportata o rinunciare al test.

## 4. Fonti consultate

1. YouTube oEmbed ufficiale: gli endpoint esatti e gli output sono nel [log](fonti-web/2026-10-09-video-rtss-rilevamento.md); pagine dirette dei tre URL in tabella per `datePublished`/`uploadDate`.
2. Guru3D / RTSS 7.3.7: <https://www.guru3d.com/download/rtss-rivatuner-statistics-server-download/> — pagina raggiunta, requisiti, limitazioni e changelog 7.3.7.
3. Guru3D Forums, thread community FES: <https://forums.guru3d.com/threads/understanding-fes-mode-is-front-edge-sync-mode-visually-smoother-looking-than-async-back-edge.456412/> — citazione attribuita a Unwinder, ma non fonte primaria collegata.
4. YouTube Terms of Service: <https://www.youtube.com/static?template=terms> — permessi/restrizioni e player embed.
5. Fonti locali di contesto: `analisi/APPUNTI-PROSSIMA-REVISIONE.md`; `discord-revisione/sorgenti-pdf/04-frame-cap-e-presentazione.md`, soprattutto §§7, 9 e 12; `analisi/REVISIONE-EDITORIALE.md` per la mappa delle cinque copie asset→screenshot.

## 5. Stato per una futura revisione

Utilizzabili con attribuzione: identità, titoli, URL e date dei tre video; l'associazione dei due set CS2 Kitchen alle rispettive trascrizioni; la distinzione fra risultati del loro banco prova e fatti generali.

Da lasciare condizionale o da completare prima di istruzioni operative: manuale RTSS primario per Async/Front/Back/Passive Waiting/Frame Start/Scanline, supporto per versione esatta e combinazione gioco/API/anti-cheat, e permesso/licenza di ogni grafico. Non c'è alcuna base per attribuire il terzo video o i suoi eventuali grafici a Everything OLED.
