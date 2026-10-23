# DLSS, FSR e frame generation: ricostruzione, interpolazione e neural rendering

Un contatore può passare da 70 a 210 FPS con Multi Frame Generation, ma gli aggiornamenti della simulazione non diventano automaticamente sei volte più numerosi. Lo stesso menu può mostrare DLSS 4.5, FSR 4.1 e un moltiplicatore 6X come se fossero tre livelli della stessa funzione: non lo sono. Prima separa ciò che ricostruisce un'immagine, ciò che inserisce immagini aggiuntive e ciò che modifica l'aspetto della scena; poi scegli il compromesso.

Questa guida considera Windows 11 25H2/26H2 e lo stato documentale di ottobre 2026. Non certifica build future, driver, elenchi di giochi o anti-cheat. Non sono stati eseguiti test hardware, benchmark, catture o modifiche di gioco per questa stesura: i dati di prestazioni citati sono dichiarazioni dei produttori o esempi documentali, non misure di questo PC. Le guide [CPU/GPU e PresentMon](04-cpu-gpu-presentmon.md), [Sincronizzazione e limiter](05-sincronizzazione-limiter.md) e [Misure e verifica](12-misure-verifica.md) restano i riferimenti per il percorso del frame e per un confronto A–B–A.

## 1. Tre funzioni che non vanno confuse

| Funzione | Cosa riceve | Cosa produce | Cosa non garantisce |
|---|---|---|---|
| **Upscaling** | Un frame a risoluzione interna, dati di movimento e storia temporale | Un frame alla risoluzione di uscita scelta | Una nuova simulazione o una latenza inferiore |
| **Frame Generation (FG)** | Frame già renderizzati, motion vector, depth e, quando disponibili, buffer di interfaccia | Immagini intermedie presentate al display | Nuovi campionamenti dell'input; può aggiungere latenza |
| **Ray Reconstruction (RR)** | Buffer ray-tracing rumoroso e dati del motore | Una ricostruzione denoisata dell'illuminazione | Frame aggiuntivi o prestazioni maggiori |
| **DLSS 5 / neural rendering** | Colore e motion vector di un frame renderizzato | Un frame migliorato con illuminazione e materiali neurali | Un upscaler attivabile su ogni gioco o frame aggiuntivi |

L'upscaling riduce il numero di pixel che la GPU deve campionare, ma aggiunge un passaggio di ricostruzione e può cambiare dettaglio, bordi e stabilità. La Frame Generation non inventa una nuova posizione del giocatore o un nuovo evento di gioco: genera immagini intermedie plausibili. Il neural rendering di DLSS 5 non è né l'uno né l'altro; è uno stadio che modifica l'immagine già renderizzata, con un ingresso e un'uscita per frame [3][4].

Questa distinzione conta anche quando leggi un overlay. Gli FPS mostrati descrivono immagini presentate, non necessariamente nuovi tick della simulazione. In PresentMon, `Frame Type` va interpretato solo se il gioco e il driver forniscono una classificazione valida; un valore generico non dimostra che tutte le immagini siano applicative [4]. Non dividere CPU Busy per il moltiplicatore di FG per ricavare una presunta latenza.

## 2. DLSS 4.5: upscaling, Ray Reconstruction e Multi Frame Generation

DLSS 4.5 Super Resolution è disponibile dal 5 gennaio 2026 su tutte le GPU GeForce RTX, con un secondo modello transformer e oltre 400 giochi e applicazioni dichiarati [1]. Non è un unico interruttore: comprende almeno Super Resolution, Ray Reconstruction, Frame Generation e Multi Frame Generation, con requisiti hardware e disponibilità per gioco differenti.

### Preset M, L e K

NVIDIA App sostituisce la voce “Latest” con “Recommended”. La scelta automatica applica:

| Modalità DLSS | Preset “Recommended” | Nota |
|---|---|---|
| DLAA, Quality, Balanced | K | È il modello transformer di DLSS 4.0; resta il riferimento per questi modi. |
| Performance | M | Ottimizzato per DLSS Performance. |
| Ultra Performance | L | Ottimizzato per DLSS Ultra Performance a 4K. |

M e L possono essere selezionati anche in Quality, Balanced e DLAA, ma il vantaggio qualità/prestazioni previsto è soprattutto in Performance e Ultra Performance [1]. Su RTX 20 e 30 manca il supporto nativo FP8: M e L hanno un impatto prestazionale più pesante e K può essere il compromesso migliore. Non esiste quindi un preset “migliore” indipendente dalla GPU, dalla risoluzione e dal gioco.

Il preset si applica per gioco o globalmente. Prima di lasciarlo attivo, verifica nell'overlay NVIDIA quale modello è realmente in uso: una voce selezionata nell'app non dimostra che il titolo la accetti. Se compaiono ghosting, shimmering o un calo di prestazioni, confronta K, M e L nella stessa scena invece di attribuire il difetto all'upscaler in generale [1].

### DLSS 4.5 Ray Reconstruction

DLSS 4.5 Ray Reconstruction è disponibile da agosto 2026 per tutte le GPU RTX e usa un secondo modello transformer dedicato al denoising di contenuti ray-tracing e path-tracing [5]. NVIDIA App espone “Recommended” o il preset F. Non è Frame Generation: ricostruisce illuminazione e dettaglio dove i raggi non sono stati campionati, e può migliorare stabilità e pulizia dell'immagine senza aumentare il numero di frame.

La qualità dipende anche dai dati del motore. Un gioco con path tracing e buffer ben preparati può trarre un beneficio diverso da uno che usa solo ray-tracing parziale. Non promettere da questa funzione un guadagno FPS universale: il costo del modello e il risultato visivo vanno verificati nel titolo [5].

### Multi Frame Generation: moltiplicatore, modalità e preset

La Frame Generation classica introduce un moltiplicatore 2X: un frame aggiuntivo per ogni frame renderizzato. DLSS 4 ha portato il Multi Frame Generation 4X su RTX 50; DLSS 4.5 aggiunge i modi 5X e 6X, dove 6X significa un frame renderizzato e cinque frame generati [2]. Il 2X è disponibile su RTX 40 e 50; MFG 4X, 5X e 6X richiedono RTX 50. Nei titoli MFG il 4X è la base, mentre 5X e 6X dipendono da una DLL di Frame Generation recente e dall'integrazione del gioco [2].

I preset M, L e K non sono preset di MFG: appartengono a Super Resolution. Nel menu NVIDIA App la Frame Generation distingue invece:

| Voce | Cosa seleziona | Effetto | Disponibilità |
|---|---|---|---|
| **Frame Generation Mode: Fixed** | Un moltiplicatore scelto | Forza lo stesso numero di frame generati per frame renderizzato | RTX 40: 2X; RTX 50: fino a 6X, secondo il titolo |
| **Frame Generation Mode: Dynamic** | Un target di refresh o un limite custom | Cambia il moltiplicatore durante il gioco per raggiungere il target | RTX 50; non compatibile con limiter e V-Sync [2] |
| **Model Preset B** | Enhanced Frame Generation | Usa buffer di interfaccia aggiuntivi per HUD, minimappa e UI | RTX 40/50, titoli supportati [2] |
| **Model Preset C** | Performance Mode per FG | Sostituisce il secondo modello di optical flow con un algoritmo più leggero | RTX 40/50 e RTX Spark, NVIDIA App beta [19] |

“Use 3D application setting” lascia decidere al gioco e non è equivalente a forzare 2X dall'app. Se vuoi il 2X puro, seleziona quell'opzione e attiva la Frame Generation nel gioco, invece di sovrapporre un override Fixed [2].

Il preset C è la novità di ottobre 2026. Non è un moltiplicatore aggiuntivo e non è il preset “Performance” di Super Resolution: è una modalità della Frame Generation che riduce il costo del modello di optical flow, con un compromesso minore sulla qualità dell'immagine. NVIDIA dichiara fino al 35% in più su una RTX 5060; sono dati del produttore, non una misura indipendente [19]. Preset C non riduce da solo la latenza d'input: aumenta il throughput della generazione, mentre la reattività dipende anche da base frame rate, Reflex, coda CPU/GPU e display.

Per attivarlo, serve la beta dell'app: `Settings > About > Opt in to access Beta or experimental features`, poi `Graphics > Driver Settings > DLSS Override - Model Presets > Custom > Frame Generation > Preset C`. Se la voce non compare, NVIDIA suggerisce un riavvio [19]. Applica il preset per gioco, non globalmente, finché non hai verificato artefatti e stabilità.

Con Dynamic Multi Frame Generation, il sistema sceglie il moltiplicatore in tempo reale per raggiungere un target di refresh o un limite scelto. Non è un cap del gioco: è una politica che cambia quanti frame generare. NVIDIA specifica che la modalità Dynamic non è attualmente compatibile con frame rate limiter e V-Sync [2]. Se usi quel percorso, non aggiungere un cap o V-Sync e poi attribuire il comportamento strano alla GPU. Preset C può essere usato anche con Dynamic, ma l'incompatibilità con limiter e V-Sync resta.

NVIDIA dichiara che il passaggio da 4X a 6X aumenta fino al 35% gli FPS a 4K nei titoli path-traced, e che Reflex può contenere l'impatto sulla reattività [2]. Sono dati del produttore, non una garanzia per ogni gioco. La generazione ha un costo, richiede una base di frame già sostenibile e non corregge un limite CPU.

Il modello Enhanced Frame Generation, selezionabile come preset B in titoli supportati, usa buffer di interfaccia aggiuntivi per gestire meglio minimappa, HUD e altri elementi statici su RTX 40 e 50 [2]. Non è lo stesso modello di Super Resolution e non si applica necessariamente a ogni gioco.

## 3. DLSS 5: neural rendering, non un upscaler

DLSS 5 è stato annunciato il 16 marzo 2026 ed è disponibile da settembre 2026 in NBA 2K27 su GPU RTX 50 desktop e laptop e GeForce NOW, con RTX Spark dal 16 ottobre 2026 [3][4][19]. Non è un'opzione che si attiva dall'overlay NVIDIA su un gioco qualsiasi: richiede integrazione nel motore e un modello addestrato per quel contesto.

Il modello usa il frame renderizzato dal motore, inclusi geometria, texture e buffer di illuminazione, come base. Prende colore e motion vector e aggiunge illuminazione e materiali fotorealistici ancorati alla scena 3D, con un modello **one-frame-in, one-frame-out**: un frame in ingresso, un frame in uscita, senza generare immagini intermedie [4]. Gira localmente su una singola RTX 50 e arriva fino a 4K. NVIDIA precisa che i modelli girano su ogni frame, quindi non esiste un frame rate minimo per attivarlo [20].

I controlli sono nelle mani dello sviluppatore: selezione del modello, intensità della struttura, intensità del tono, maschere semantiche e maschere a livello di motore. Questo serve a preservare identità dei personaggi, composizione e intenzione artistica. Un input ray-tracing o path-tracing più ricco può dare risultati più precisi; anche il raster tradizionale può essere migliorato, ma con meno informazioni [4]. Per il giocatore, invece, DLSS 5 è un semplice on/off; i controlli granulari non sono esposti [20].

### Cosa è cambiato il 13 ottobre 2026

Il modello distribuito a ottobre è più leggero: NVIDIA dichiara il doppio delle prestazioni rispetto alla versione di settembre, il 24% di parametri in meno (circa 118 milioni), il 20% di VRAM in meno a 4K e metà del carico GPU, con qualità visiva comparabile. Rispetto al modello annunciato a marzo, il guadagno complessivo dichiarato è 10X [19]. Il nuovo modello debutta in NBA 2K27 il 16 ottobre 2026 e aumenta gli FPS fino a 1,4X su RTX 50, RTX Spark e GeForce NOW [19]. Sono claim del produttore, non misure indipendenti.

Il calendario ufficiale delle implementazioni è: RTX Remix il 23 ottobre 2026, Hogwarts Legacy il 5 novembre 2026, Where Winds Meet nella parte finale di novembre 2026 [19]. RTX Spark è una piattaforma laptop, non una scheda desktop: non confonderla con una fascia RTX 50 desktop.

DLSS 5 non è DLSS 4.5 con un numero più alto. DLSS 4.5 è la famiglia di upscaling, Ray Reconstruction e Frame Generation; DLSS 5 è uno stadio di neural rendering. Non è nemmeno Frame Generation: non crea cinque frame da uno. Se un gioco usa DLSS 5 e MFG, sono due funzioni distinte nella pipeline e vanno valutate separatamente.

La disponibilità è per titolo. NBA 2K27 è la prima implementazione documentata; NVIDIA ha annunciato altri giochi, ma un annuncio non equivale a una build pubblica con la funzione attiva [4]. Al 23 ottobre 2026 DLSS 5 è ufficiale su RTX 50, RTX Spark e GeForce NOW, non su RTX 40. NVIDIA ha confermato a The Verge che, dopo aver ottimizzato la versione RTX 50, intende estendere il supporto ufficiale alla RTX 40; non è una data di rilascio e non riguarda RTX 20/30 [20]. Non promettere quindi che DLSS 5 “sistemi” un gioco vecchio o che sia già disponibile su RTX 40: oggi richiede RTX 50 o RTX Spark e integrazione del titolo [3][4][19].

## 4. FSR 4.1 e Redstone: hardware e funzioni separati

AMD FSR “Redstone” è una suite di tecnologie ML: FSR Upscaling, FSR Frame Generation, FSR Ray Regeneration e FSR Radiance Caching. Non tutte sono disponibili su tutte le GPU e non tutte sono attive solo perché il gioco offre “FSR” [6].

| GPU | FSR Upscaling 4.1 | Redstone completo | Nota |
|---|---|---|---|
| Radeon RX 9000 / RDNA 4 | Sì | Sì, dove il gioco integra le funzioni | Upscaling ML, FG ML, Ray Regeneration e Radiance Caching previsti. |
| Radeon RX 7000 / RDNA 3 | Sì da luglio 2026 | No | Supporto dichiarato solo per l'upscaling. |
| Radeon RX 6000 / RDNA 2 | Sì dal 20 ottobre 2026 | No | Richiede driver Adrenalin 26.10.1 o successivo; solo upscaling. |
| Radeon RX 5000 / RDNA 1 | No, resta su FSR 3 | No | Frame Generation FSR 3, non Redstone. |
| Ryzen AI Max 300/400, Ryzen AI 9 300/400 | Sì | No | Upscaling 4.1; non è Redstone completo. |

FSR Upscaling 4.1 è disponibile su RX 6000, 7000 e 9000; il supporto RX 6000 è stato distribuito con il driver 26.10.1 del 20 ottobre 2026 [7][8]. RX 7000 lo ha ricevuto da luglio 2026. “Redstone completo” resta invece una disponibilità RX 9000, e anche lì dipende dal gioco e dalle funzioni effettivamente integrate [6]. La disponibilità su Ryzen AI Max 300/400 e Ryzen AI 9 300/400 riguarda l'upscaling, non l'intera suite Redstone [8].

Per i giochi con FSR 3.1, AMD Software può aggiornare l'upscaling a ML senza una patch del titolo; per la Frame Generation ML serve almeno FSR 3.1.4, Windows 11 e DirectX 12, secondo la pagina dei giochi supportati [9]. Questo non significa che ogni gioco FSR 3.1 riceva anche Ray Regeneration o Radiance Caching: sono funzioni separate.

FSR 4.1 non è “FSR 3 con un numero più alto”. Il modello ML ricostruisce da una risoluzione interna e mira a migliorare qualità e stabilità rispetto a FSR 3.1, ma il risultato varia con il gioco e con la modalità. Le prestazioni dichiarate da AMD sono misure di laboratorio su hardware specifico, non un valore da sommare al tuo FPS [6].

### FSR 4 tramite OptiScaler

OptiScaler può sostituire l'upscaler nativo e instradare FSR 4 su GPU discrete RDNA 3 e RDNA 4; è un percorso della community, non un supporto AMD ufficiale [10]. Su RDNA 2 il supporto FSR 4 non è quello dichiarato dal progetto, anche se altri esperimenti della community possono esistere. Non presentare un test riuscito su una configurazione come compatibilità generale.

## 5. Matrice di supporto NVIDIA: cosa è ufficiale e cosa no

La tabella descrive il supporto dichiarato al 23 ottobre 2026, non ciò che un mod può forzare. “Titoli supportati” significa che il gioco deve integrare la funzione: la presenza della GPU non basta.

| GPU | DLSS 4.5 SR/RR | FG 2X | MFG 4X–6X | Dynamic MFG | DLSS 5 | Preset C | Note |
|---|---|---|---|---|---|---|---|
| RTX 50 desktop/laptop | Sì | Sì | Sì; 4X nei titoli MFG, 5X/6X solo con DLL recente | Sì | Sì nei titoli integrati | Sì, beta | 6X non è universale; richiede gioco e DLL compatibili [2][19]. |
| RTX 40 | Sì | Sì | No | No | No al 23 ottobre; piano annunciato | Sì, beta; solo FG 2X | NVIDIA intende estendere DLSS 5 dopo l'ottimizzazione RTX 50, senza data [20]. |
| RTX 20/30 | Sì | No | No | No | No | No | M/L più pesanti senza FP8; nessuna FG hardware [1]. |
| GTX 10/16 | No | No | No | No | No | No | DLSS non supportato. |
| RTX Spark laptop | Sì | Sì | Sì, Dynamic MFG | Sì | Sì | Sì, beta | Piattaforma laptop; supporto dichiarato, non una GPU desktop [19]. |

La matrice non dice che una funzione sia conveniente. Per esempio, MFG 6X su RTX 50 richiede una base di frame sostenibile e un gioco con DLL recente; DLSS 5 richiede un titolo che la integri e, oggi, una RTX 50. Una RTX 40 può usare DLSS 4.5, FG 2X e Preset C, ma non MFG o DLSS 5 ufficiale. Una RTX 20/30 può usare SR e RR 4.5, ma non Frame Generation o DLSS 5.

In pratica:

- **RTX 50**: tutte le funzioni NVIDIA discusse qui, con disponibilità per titolo; MFG fino a 6X e Preset C sono le novità più rilevanti.
- **RTX 40**: SR/RR 4.5, FG 2X e Preset C; niente MFG, niente DLSS 5 al 23 ottobre 2026. Il piano RTX 40 per DLSS 5 è ufficiale ma senza data [20].
- **RTX 20/30**: SR/RR 4.5; nessuna FG/MFG/DLSS 5. I mod leakati non cambiano il supporto.
- **GTX 10/16**: nessuna funzione DLSS; resta il percorso FSR del gioco, se disponibile.

## 6. Sviluppi futuri: annunci ufficiali, test isolati e leak

### Ufficiale e datato

| Data | Cosa | Stato |
|---|---|---|
| 23 ottobre 2026 | RTX Remix: DLSS 5 e Preset C | Annunciato da NVIDIA; non verificato su questo PC [19]. |
| 5 novembre 2026 | Hogwarts Legacy: DLSS 5 | Annunciato per RTX 50, GeForce NOW e RTX Spark [19]. |
| Fine novembre 2026 | Where Winds Meet: DLSS 5 | Annunciato, senza giorno esatto [19]. |
| Nessuna data | DLSS 5 su RTX 40 | Piano confermato a The Verge; non rilasciato al 23 ottobre 2026 [20]. |
| Nessuna data | Altri titoli DLSS 5 | Annunci vari; NVIDIA non ha riconfermato l'elenco precedente [20]. |

### Non ufficiale: test, mod e leak

Queste informazioni non sono supporto NVIDIA e non vanno usate per decidere un acquisto o per dichiarare una compatibilità.

- **RTX 4070 Super, DLSS 5 con libreria/mod non ufficiale (17 ottobre 2026).** Un post su X riporta, in Control Resonant a 1440p con DLSS Quality e RT/FG off, circa 43–44 FPS prima e 53–54 FPS dopo, 1% low da 39–41 a 47–48 FPS e latenza da 107,3 a 65,1 ms. È una singola esecuzione della community, non una replica indipendente; non dimostra che DLSS 5 sia supportato su RTX 40 [21].
- **RTX 30, DLSS 5 leakato (30 agosto 2026).** Un post di TechPowerUp descrive prestazioni non utilizzabili e crash. Non è un percorso supportato e non va presentato come “DLSS 5 su RTX 30” [22].
- **MFG forzato su RTX 40.** Sono comparsi addon della community che sbloccano 3X/4X/6X su RTX 40 e correggono il midpoint temporale. Non sono supportati da NVIDIA, possono rompere il frame pacing e non cambiano la matrice ufficiale: RTX 40 resta FG 2X.
- **MFG 8X/10X.** Al 23 ottobre 2026 non esiste una fonte credibile: il massimo ufficiale è 6X. Non inserire 8X o 10X in una guida come se fossero annunciati.
- **DLSS 5 su RTX 20/30.** Non è stato annunciato da NVIDIA; i test con mod non sono supporto. Aspettati crash, qualità incoerente e prestazioni non rappresentative.

La conclusione operativa è semplice: se hai una RTX 40, oggi puoi usare FG 2X e Preset C, non MFG; se hai una RTX 50, puoi valutare MFG e Dynamic, ma il guadagno dipende dal titolo. Non comprare una GPU per un leak, per un test X o per un moltiplicatore che non è ancora ufficiale.

## 7. Scegliere un preset senza inseguire il numero più alto

Un punto di partenza ragionevole è:

| Uscita | Prima prova | Alternativa | Cosa controllare |
|---|---|---|---|
| 1080p | Quality | DLAA o nativo | Bordi, erba, particelle, UI |
| 1440p | Quality | Balanced | Dettaglio in movimento e stabilità |
| 4K | Quality o Balanced | Performance | Foliage, riflessi, testo e HUD |
| 4K ad alto refresh | Balanced o Performance | Ultra Performance solo se necessario | Artefatti e carico GPU reale |

Non è una tabella di preset universali. A parità di etichetta, la risoluzione interna cambia con il gioco e con la modalità; “Performance” a 1080p è molto più aggressivo di “Performance” a 4K. Ultra Performance ha senso soprattutto quando il monitor o il titolo richiedono molti pixel e la GPU non sostiene la modalità superiore; il preset L è ottimizzato per 4K Ultra Performance, non per ogni risoluzione [1].

Procedura prudente:

1. Fissa risoluzione, refresh, VRR, cap e Reflex/Anti-Lag. Non cambiare anche questi durante il confronto dell'upscaler.
2. Crea una baseline nativa o con TAA nella stessa scena, alla stessa risoluzione di uscita. Salva un'immagine ferma e una in movimento.
3. Prova una sola modalità di upscaling. Se possibile, confronta K, M e L senza cambiare il resto.
4. Solo dopo valuta la Frame Generation. La base deve già essere giocabile e il compromise di reattività accettabile; non usare FG per nascondere un limite CPU. Se provi Preset C, mantieni lo stesso moltiplicatore e confronta B/C.
5. Se usi Dynamic MFG, togli cap e V-Sync come richiesto dalla modalità e imposta il target di refresh. Se usi Fixed, scegli un moltiplicatore e verifica il frame pacing.
6. Controlla artefatti su personaggi, capelli, tessuti, vetri, erba, particelle e HUD, non solo su un paesaggio fermo.
7. Esegui A–B–A: baseline, modifica, ritorno. Se A non torna simile ad A, il confronto non ha isolato la variabile.

In competitivo, la Frame Generation non è automaticamente vantaggiosa. Può rendere il movimento più continuo, ma non riduce il tempo di simulazione e può aggiungere latenza. Provala con la stessa scena e con un metodo di misura pertinente; se non hai una misura end-to-end, puoi descrivere la percezione, non un guadagno in millisecondi [4][12].

## 8. Problemi frequenti e diagnosi

| Sintomo | Meccanismo plausibile | Verifica |
|---|---|---|
| Scia o ghosting su personaggi e oggetti | Storia temporale insufficiente, motion vector imprecisi, denoiser o FG | Confronta upscaler nativo, preset diversi e FG OFF; osserva oggetti che si sovrappongono. |
| Shimmering su erba, griglie e riflessi | Risoluzione interna bassa, dettaglio sottile, sharpening | Passa a Quality, riduci sharpening, prova DLAA/nativo. |
| HUD o mirino che vibra | Frame Generation senza buffer UI adeguati | Prova il modello Enhanced FG se disponibile; altrimenti disabilita FG. |
| Artefatti su UI o riflessi con Preset C | Optical flow più leggero, con compromesso dichiarato | Confronta B/C nello stesso punto e con lo stesso moltiplicatore; se il difetto resta, torna a B. |
| Input più lento con FG attiva | Costo di generazione e coda aggiuntiva | Misura la base senza FG, poi con FG; controlla Reflex e il frame pacing. |
| FPS alti ma movimento a scatti | Frame pacing, VRR, cap o carico CPU | Guarda frame time e Frame Type, non solo il contatore medio. |
| Crash o schermo nero dopo un override | DLL o modello incompatibile, driver, mod | Ripristina la DLL originale e verifica l'integrità del gioco. |
| Microstutter dopo l'avvio | Compilazione shader o cache in aggiornamento | Attendi la compilazione, ripeti la scena, non attribuire tutto all'upscaler. |

Un upscaler non corregge un gioco limitato dalla CPU, un server lento o una simulazione irregolare. La Frame Generation non rende più fresca la posizione del giocatore e non moltiplica gli eventi di rete. Se il sintomo è un comando percepito in ritardo, separa coda CPU/GPU, sync, input e display: la guida [Sincronizzazione e limiter](05-sincronizzazione-limiter.md) descrive il percorso.

## 9. Miti da chiudere

- **“DLSS 5 è DLSS 4.5 con più frame.”** No: DLSS 5 è neural rendering, con un frame in ingresso e uno in uscita; MFG è una funzione diversa [3][4].
- **“6X significa sei volte la reattività.”** No: significa un frame renderizzato e cinque generati; la simulazione non diventa sei volte più frequente [2].
- **“Preset C è un moltiplicatore in più.”** No: è un modello di Frame Generation più leggero; il moltiplicatore resta quello scelto [19].
- **“La MFG ha i preset M, L e K.”** No: M, L e K sono preset di Super Resolution; per la Frame Generation hai modalità Fixed/Dynamic e preset B/C [1][2][19].
- **“DLSS 5 è già ufficiale su RTX 40.”** No: al 23 ottobre 2026 è ufficiale su RTX 50, RTX Spark e GeForce NOW; il supporto RTX 40 è pianificato, senza data [19][20].
- **“Un test su X dimostra che RTX 40 o RTX 30 supportano DLSS 5.”** No: un mod può avviarsi e produrre numeri in una scena, ma non è supporto, stabilità o qualità garantita [20][21][22].
- **“Arriverà MFG 8X/10X.”** No: al 23 ottobre 2026 il massimo ufficiale è 6X; non c'è una fonte credibile per 8X o 10X.
- **“La Frame Generation elimina il collo di bottiglia CPU.”** No: può aumentare la fluidità visiva, ma non accelerare la logica di gioco o la rete.
- **“L'upscaling riduce sempre la latenza.”** No: riduce il lavoro GPU solo se il carico è GPU-bound e il costo di ricostruzione non annulla il guadagno.
- **“Il preset più recente è sempre il migliore.”** No: M e L possono pesare di più su RTX 20/30 e K può essere preferibile [1].
- **“FSR 4 funziona su tutte le GPU.”** No: l'upscaling ML ha requisiti hardware; il Redstone completo è RX 9000 e le funzioni dipendono dal gioco [6][7].
- **“Una DLL nuova basta per aggiornare qualsiasi gioco.”** No: servono integrazione, API, modello e compatibilità; un override può peggiorare stabilità o qualità.
- **“Più FPS mostrati = meno latenza.”** No: gli FPS descrivono il throughput delle immagini presentate, non il tempo di un singolo input.

## 10. Mod e tool della community

Gli override ufficiali coprono molti casi: NVIDIA App per DLSS, driver AMD per l'upscaling FSR 4.1. I tool della community servono soprattutto quando il gioco spedisce una DLL vecchia, non offre FSR 4 o non espone un'opzione. Sono strumenti non ufficiali: possono violare regole di gioco, essere rilevati da anti-cheat, introdurre crash o essere sovrascritti da un aggiornamento. Non usarli in competitivo senza verificare la policy del titolo.

| Tool | Cosa fa | Link | Limite |
|---|---|---|---|
| **OptiScaler** | Sostituisce l'upscaler e instrada DLSS, XeSS, FSR 2/3/4 | [github.com/optiscaler/OptiScaler](https://github.com/optiscaler/OptiScaler) | FSR 4 dichiarato su RDNA 3/4 discrete; non è supporto AMD ufficiale. |
| **OptiPatcher** | Plugin ASI che espone input DLSS/DLSSG senza spoofing | [github.com/optiscaler/OptiPatcher](https://github.com/optiscaler/OptiPatcher) | Compatibilità per gioco; può essere bloccato o instabile. |
| **DLSS Swapper** | Gestisce e sostituisce DLL DLSS, con backup | [github.com/beeradmoore/dlss-swapper](https://github.com/beeradmoore/dlss-swapper) | La DLL giusta non garantisce che il gioco accetti il modello. |
| **DLSS Enabler** | Installer e wrapper per abilitare percorsi DLSS su giochi supportati | [github.com/artur-graniszewski/DLSS-Enabler](https://github.com/artur-graniszewski/DLSS-Enabler) | Progetto non ufficiale; qualità e stabilità variano. |
| **UPSCALE IT** | Manager MIT per OptiScaler, DLSS Enabler e aggiornamento DLL | [github.com/NODIX-TECH/UPSCALE-IT](https://github.com/NODIX-TECH/UPSCALE-IT) | Gestisce tool di terzi; non certifica compatibilità o sicurezza. |
| **DLSS 5 MANAGER** | Manager indipendente per DLSS 5, ReShade e OptiScaler | [github.com/NODIX-TECH/DLSS-5-MANAGER](https://github.com/NODIX-TECH/DLSS-5-MANAGER) | Non affiliato a NVIDIA; raccoglie mod e componenti di terzi. |

Le date e le release cambiano rapidamente. Al momento della revisione, OptiScaler risultava `v0.9.4` del 18 luglio 2026, OptiPatcher una release `rolling` del 14 maggio 2026, DLSS Swapper `v1.2.7.0` del 18 ottobre 2026 e DLSS Enabler `v0.9.4` del 19 luglio 2026 [10][11][12][13]. UPSCALE IT risultava `1.0.1` del 13 giugno 2026 e DLSS 5 MANAGER `1.3.7` del 19 ottobre 2026 [14][15]. Verifica sempre la release e il sorgente prima di eseguire un binario.

Procedura di prova:

1. Conserva la cartella del gioco e il file di configurazione originali; annota versione del gioco, driver e tool.
2. Prova un solo tool e un solo gioco, preferibilmente offline o single-player.
3. Disabilita overlay e mod concorrenti; non sommare OptiScaler, DLSS Enabler e un manager nello stesso titolo.
4. Se il gioco non si avvia, ripristina le DLL e il config, poi verifica l'integrità dei file. Non aggirare l'anti-cheat.
5. Se funziona, documenta artefatti, crash, frame pacing e versione usata. Un avvio riuscito non è una certificazione di qualità.

Le risorse ufficiali per download e sviluppo restano [NVIDIA App](https://www.nvidia.com/en-us/software/nvidia-app/), [NVIDIA Streamline](https://github.com/NVIDIA-RTX/Streamline), [AMD FidelityFX SDK](https://github.com/GPUOpen-LibrariesAndSDKs/FidelityFX-SDK) e i driver AMD dal sito ufficiale [16][17][18]. Non scaricare DLL o “unlocker” da repository non identificati, non distribuire file di gioco modificati e non assumere che un hash pubblicato su un forum sia una verifica di sicurezza.

## 11. Limiti e fonti

Questa guida non stabilisce quale preset sia migliore per il tuo gioco. Non dispone di misure di latenza end-to-end, non certifica la disponibilità futura di DLSS 5, non conferma il supporto RTX 40 — oggi solo pianificato — e non verifica le promesse di FPS dei produttori. Le prestazioni dipendono da GPU, CPU, risoluzione, API, driver, versione del gioco e integrazione. I test X citati sono singole esecuzioni non replicate e non sono misure di questa guida. Un test riuscito con un tool della community non dimostra compatibilità generale né assenza di rischi. Non sono stati eseguiti test di Preset C, DLSS 5 o MFG su questo PC.

1. NVIDIA, [NVIDIA App Update Adds DLSS 4.5 Super Resolution & New GeForce Game Ready Driver](https://www.nvidia.com/en-us/geforce/news/dlss-4-5-geforce-game-ready-driver/), 5 gennaio 2026. Preset M/L/K, requisiti RTX 20/30 e oltre 400 titoli.
2. NVIDIA, [DLSS 4.5 Dynamic Multi Frame Generation & Multi Frame Generation 6X Available Now](https://www.nvidia.com/en-us/geforce/news/dlss-4-5-dynamic-multi-frame-generation-6x-mode-released/), 31 marzo 2026. 6X, Dynamic, incompatibilità con limiter/V-Sync e dato “fino al 35%”.
3. NVIDIA, [NVIDIA DLSS 5 Delivers AI-Powered Breakthrough In Visual Fidelity For Games](https://www.nvidia.com/en-us/geforce/news/dlss5-breakthrough-in-visual-fidelity-for-games/), 16 marzo 2026. Annuncio, input, controlli e requisito RTX 50.
4. NVIDIA Developer, [What's New for Game Developers: DLSS 5 with 3D-Guided Neural Rendering](https://developer.nvidia.com/blog/whats-new-for-game-developers-dlss-5-with-3d-guided-neural-rendering-nvidia-ace-updates-and-new-rtx-kit-capabilities/), 22 settembre 2026. One-frame-in/one-frame-out, 4K, controlli e NBA 2K27.
5. NVIDIA, [GeForce at Gamescom 2026: DLSS 4.5 Ray Reconstruction & More](https://www.nvidia.com/en-us/geforce/news/gamescom-2026-nvidia-geforce-rtx-dlss-4-5-announcements), 25 agosto 2026. Disponibilità, preset F/Recommended e perimetro RTX.
6. AMD, [AMD FSR Technologies](https://www.amd.com/fsr), consultato il 23 ottobre 2026. Suite Redstone, requisiti RX 9000/7000/6000 e definizioni delle funzioni.
7. AMD Newsroom, [AMD FSR Upscaling 4.1 Boosts Frames and Image Quality on More Devices](https://newsroom.amd.com/news/amd-fsr-upscaling-4-1-boosts-frames-image-quality/), 20 ottobre 2026. RX 6000, driver 26.10.1 e cronologia RX 7000.
8. AMD, [AMD Software: Adrenalin Edition 26.10.1 Release Notes](https://www.amd.com/en/resources/support-articles/release-notes/rn-rad-win-26-10-1.html), 20 ottobre 2026. FSR Upscaling 4.1 su RX 6000 e Ryzen AI.
9. AMD, [AMD Gaming Technologies Supported Games](https://www.amd.com/en/products/graphics/technologies/fidelityfx/supported-games.html), consultato il 23 ottobre 2026. Requisiti FSR 3.1/3.1.4 e aggiornamento via driver.
10. OptiScaler, [repository ufficiale](https://github.com/optiscaler/OptiScaler), release `v0.9.4` del 18 luglio 2026. Licenza GPL-3.0 e perimetro FSR 4 su RDNA 3/4.
11. OptiPatcher, [repository ufficiale](https://github.com/optiscaler/OptiPatcher), release `rolling` del 14 maggio 2026. Plugin ASI, letto staticamente.
12. DLSS Swapper, [repository ufficiale](https://github.com/beeradmoore/dlss-swapper), release `v1.2.7.0` del 18 ottobre 2026. Gestione DLL e backup.
13. DLSS Enabler, [repository ufficiale](https://github.com/artur-graniszewski/DLSS-Enabler), release `v0.9.4` del 19 luglio 2026. Installer non ufficiale.
14. NODIX-TECH, [UPSCALE IT](https://github.com/NODIX-TECH/UPSCALE-IT), release `1.0.1` del 13 giugno 2026, licenza MIT. Manager di tool di terzi.
15. NODIX-TECH, [DLSS 5 MANAGER](https://github.com/NODIX-TECH/DLSS-5-MANAGER), release `1.3.7` del 19 ottobre 2026. Progetto indipendente, non affiliato a NVIDIA.
16. NVIDIA, [NVIDIA App](https://www.nvidia.com/en-us/software/nvidia-app/), pagina ufficiale del programma.
17. NVIDIA, [Streamline](https://github.com/NVIDIA-RTX/Streamline), repository SDK per l'integrazione DLSS.
18. AMD GPUOpen, [FidelityFX SDK](https://github.com/GPUOpen-LibrariesAndSDKs/FidelityFX-SDK), repository SDK per le tecnologie FidelityFX.
19. NVIDIA, [DLSS 5 Comes To Hogwarts Legacy & RTX Spark, Powered By 2X Faster Model](https://www.nvidia.com/en-us/geforce/news/dlss-5-faster-ai-model-hogwarts-legacy-rtx-spark-laptops/), 13 ottobre 2026. Modello 2X, 118 milioni di parametri, 24% in meno, 20% di VRAM in meno, 10X complessivo, 1,4X in NBA 2K27, Hogwarts Legacy, Where Winds Meet, RTX Remix e Preset C.
20. The Verge, [Nvidia will officially bring DLSS 5 to older GPUs — but won’t give gamers full control](https://www.theverge.com/games/989978/nvidia-dlss-5-rtx-40), 4 settembre 2026. Piano RTX 40, natura on/off per il giocatore e modelli eseguiti su ogni frame.
21. GameGPU (@GameGPU_com), [post su X del 17 ottobre 2026](https://x.com/GameGPU_com/status/2111476910064562591), consultato il 23 ottobre 2026. Test community su RTX 4070 Super; dati non replicati.
22. TechPowerUp (@TechPowerUp), [post su X del 30 agosto 2026](https://x.com/TechPowerUp/status/2094103704597098568), consultato il 23 ottobre 2026. DLSS 5 su RTX 30: prestazioni e stabilità non utilizzabili.
