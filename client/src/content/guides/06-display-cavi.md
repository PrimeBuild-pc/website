# Display e cavi: verificare il segnale prima di ottimizzare

Un collegamento che trasporta correttamente la modalità desiderata non diventa più reattivo soltanto perché il cavo costa di più. Il problema pratico è **ottenere e mantenere il segnale corretto**, con refresh, colore e funzionalità richiesti. Una porta o un cavo insufficienti possono impedire quel risultato; una catena già adeguata non ottiene automaticamente più FPS o una latenza inferiore cambiando marchio.

La verifica riguarda l'intera catena: uscita della GPU, eventuale adattatore o dock, cavo, ingresso e modalità del monitor, driver e configurazione. Questa guida descrive controlli e ripristino senza eseguirli, installare firmware o applicare script. Specifiche e certificazioni aiutano a scegliere; non sostituiscono il manuale dei dispositivi.

## 1. Il collegamento è una catena, non un cavo

Un cavo HDMI o DisplayPort non è un tubo nel quale l'immagine scorre già formata. La GPU genera un flusso digitale, il trasmettitore lo serializza sulle corsie, il ricevitore del display ricostruisce il flusso e il pannello lo scandisce. In mezzo possono esserci un dock, un adattatore, un ricevitore audio/video o una capture card. Ogni elemento deve sostenere la stessa modalità, non soltanto accendersi.

Questo porta a tre conseguenze pratiche.

- **Un cavo stabile non aumenta gli FPS.** Non crea frame, non riduce il lavoro della GPU e non migliora la simulazione. Se la modalità è già corretta, il suo contributo alla latenza percepita è normalmente trascurabile rispetto a scanout, elaborazione del monitor e attesa a monte.
- **Un cavo marginale non rallenta come un download.** I collegamenti display non recuperano i frame persi con una normale ritrasmissione applicativa. Errori o margine insufficiente si manifestano piuttosto come scintillii, righe, schermate nere, perdita di segnale o fallback a una modalità inferiore.
- **La modalità osservata è il risultato della negoziazione.** GPU, cavo, dock e monitor concordano rate e corsie; un componente più capace non forza gli altri a usare il massimo. "La porta è 2.1" o "il cavo è certificato" non prova quale modalità sia attiva.

La propagazione elettrica nel cavo è dell'ordine dei nanosecondi per metro, quindi non spiega da sola un ritardo percepibile. Un cavo attivo o ottico può aggiungere conversione e buffering, ma non è qui misurato e non va confuso con il tempo di scansione del pannello. Il punto operativo resta un altro: **se il collegamento è marginale, il sistema può perdere stabilità o funzioni**.

Prima di cambiare qualcosa, annota la configurazione. Una scheda semplice evita di attribuire al cavo un problema nato altrove.

| Voce | Esempio di dato da registrare |
|---|---|
| GPU e uscita | Modello, porta usata, eventuale uscita secondaria |
| Monitor e ingresso | Modello, HDMI/DP/USB-C, numero della porta |
| Cavo | Tipo, lunghezza, certificazione, eventuale direzione |
| Intermedi | Dock, adattatore, AVR, switch, capture card |
| Segnale | Risoluzione, refresh, bit per canale, chroma, HDR, VRR |
| Software | Driver GPU, versione del sistema, modalità del gioco |
| Sintomo | Quando compare e quale cambiamento lo fa sparire |

## 2. Refresh, scanout e latenza: tre misure diverse

Il refresh indica quanti aggiornamenti nominali può scandire il display, non quanti frame il gioco riesca a produrre. Un monitor 240 Hz non garantisce 240 FPS; un gioco a 400 FPS non trasforma un monitor 144 Hz in uno a 400 Hz. L'intervallo matematico è **1000 / Hz**:

| Refresh | Intervallo nominale |
|---|---:|
| 144 Hz | 6,94 ms |
| 240 Hz | 4,17 ms |
| 360 Hz | 2,78 ms |
| 480 Hz | 2,08 ms |
| 540 Hz | 1,85 ms |

Lo **scanout** invia normalmente le righe in successione: lo stesso cambiamento può comparire prima in alto che in basso. La metà di questi intervalli è soltanto un riferimento aritmetico, **non il ritardo medio garantito del monitor**. Timing, blanking — gli intervalli fuori dall'immagine attiva — e posizione del sensore influenzano una misura ottica.

Il "1 ms" commerciale può indicare **GtG**, una transizione fra livelli del pixel, oppure **MPRT**, la persistenza del movimento percepita: nessuno dei due misura automaticamente input lag completo. HDR e local dimming, il controllo locale della retroilluminazione, non hanno una penalità universale indipendente dall'implementazione. Su notebook, **Dynamic Refresh Rate** e risparmio energetico non sono il VRR del gioco: controlla alimentazione e modalità del produttore.

Un refresh più alto può ridurre l'intervallo nel quale un nuovo frame può essere mostrato, ma non corregge un frame prodotto tardi. Per questo la diagnosi distingue:

- **FPS**: quanti frame il motore o la pipeline dichiarano di produrre;
- **frametime**: l'intervallo fra eventi di frame successivi;
- **refresh attivo**: la cadenza con cui il display accetta e scandisce immagini;
- **latenza**: il viaggio di uno stesso input fino alla risposta visibile.

Un contatore può mostrare 240 FPS mentre il monitor è a 60 Hz, oppure 60 FPS mentre il pannello è a 240 Hz. Sono configurazioni diverse, non semplici varianti dello stesso numero.

### Risoluzione interna, desktop e segnale attivo

Tre impostazioni possono avere numeri uguali senza indicare la stessa cosa.

- La **risoluzione interna** è quella a cui il gioco produce la scena prima di eventuale ricostruzione, upscaling o ridimensionamento.
- La **risoluzione del desktop** definisce il raster usato dal desktop Windows. Lo scaling dell'interfaccia, per esempio 125% o 150%, modifica le dimensioni logiche di testi e controlli: non abbassa automaticamente la risoluzione del segnale.
- La **modalità segnale attiva** è ciò che viaggia verso il monitor: risoluzione, frequenza e altri parametri effettivi.

Un gioco può renderizzare internamente a 1920×1080, ricostruire a 2560×1440 e inviare 2560×1440 a 240 Hz. Alleggerire la risoluzione interna può ridurre il lavoro GPU senza cambiare la banda del collegamento. Al contrario, cambiare il segnale attivo modifica il lavoro richiesto alla catena e può cambiare le modalità offerte dal display.

Con **scaling GPU**, la scheda ridimensiona il contenuto prima dell'uscita; con **scaling display**, il monitor riceve un segnale da adattare al pannello. "No scaling", mantenimento delle proporzioni e riempimento dello schermo sono scelte distinte, disponibili secondo il percorso. Un desktop impostato a risoluzione inferiore con scaling GPU può ancora uscire alla risoluzione nativa. Alla risoluzione nativa potrebbe invece non esserci un ridimensionamento significativo: la casella GPU/Display da sola non prova quale operazione sia avvenuta. DLSS/FSR ricostruiscono l'immagine dentro il rendering e non coincidono con la selezione di questo scaler.

Per confrontare GPU e display scaling salva il profilo iniziale e conserva risoluzione interna, modalità finestra, proporzioni e refresh. Usa il controllo di scaling del driver soltanto se previsto per quella combinazione; verifica poi Schermo avanzato e OSD, non la sola casella. Con contenuto non nativo, il percorso GPU può inviare il raster nativo e quello display il raster inferiore: il segnale diverso può essere proprio ciò che conferma il cambio di scaler. Annota entrambi i segnali e i timing; se differiscono, stai confrontando percorsi completi, non il solo costo aritmetico del ridimensionamento. Valuta prima nitidezza, proporzioni e stabilità, poi un'eventuale latenza con metodo adeguato; ripristina il profilo precedente se peggiora.

Nel test **CS2 Kitchen**, Workshop Map con impostazioni Ropz, le medie sono **5,9 ms con display scaling e 6,1 ms con GPU scaling**, con 1000 campioni per percorso [6]. Usa RTX 5070 Ti, RAM 32 GB 6000 CL30, Teensy 4.1/8000 Hz e Zowie XL2566X+ 400 Hz DyAc Premium; il transcript indica 9800X3D. La misura parte da un report HID del generatore e termina alla risposta visiva, non descrive lo switch di un mouse commerciale. Mancano nel PNG risoluzioni/timing e intervalli di confidenza: due decimi non classificano tutti gli scaler e non giustificano timing personalizzati alla cieca. Il test non documenta una procedura CRU per forzare i timing né una misura di nitidezza: è una latenza visiva, non un giudizio completo sulla qualità del ridimensionamento. Conserva il profilo timing e confronta testo e bordi sul pannello.

### Controllo del segnale in Windows e OSD

1. Apri **Impostazioni → Sistema → Schermo** e seleziona il monitor corretto. Su più display, identifica quello di gioco; duplicazione e catene condivise possono imporre compromessi.
2. In **Schermo avanzato**, registra risoluzione desktop, modalità segnale attiva e refresh effettivo. Un valore come 239,76 Hz invece di 240 può essere il timing nominale disponibile, non una perdita di prestazioni.
3. Nel pannello del driver controlla formato colore, profondità per canale, range RGB e modalità disponibili. Non confondere 8/10 bit **per canale** con il totale dei bit di un pixel.
4. Apri l'OSD del monitor, cioè il menu sul display, e verifica ingresso, modalità PC/gioco, refresh ricevuto, VRR, HDR ed eventuale strobo. Un numero OSD può indicare refresh istantaneo oppure nominale: interpreta ciò che documenta il produttore.
5. Controlla il gioco: la sua risoluzione può essere interna oppure d'uscita, e borderless può seguire il desktop. Se passa a una modalità diversa, ricontrolla il segnale.

**VRR** significa refresh variabile, che segue l'arrivo dei frame entro il range del display [5]; **HDR** indica un percorso per contenuti ad ampia gamma dinamica, non un refresh più alto. Registra questi dati prima di cambiare cavo. HDR e VRR attivi nel menu non provano da soli che tutte le funzionalità siano operative nel percorso corrente. Un contatore FPS non misura il segnale trasportato.

## 3. Che cosa determina la banda necessaria

Il numero di pixel, il refresh e i dati colore contribuiscono al flusso. Vanno inoltre considerati timing, blanking e codifica del collegamento: **bitrate nominale di linea e banda utile non sono sinonimi**. Una moltiplicazione dei soli pixel visibili dà un riferimento incompleto, non la prova che una modalità entri nella porta.

| Parametro | Conseguenza da verificare |
|---|---|
| Risoluzione e refresh maggiori | Richiedono generalmente più dati nel segnale |
| 10 bit invece di 8 per canale | Aumentano i dati colore a parità degli altri parametri |
| RGB / YCbCr 4:4:4 | Mantengono informazione cromatica per ciascun pixel |
| YCbCr 4:2:2 o 4:2:0 | Riducono informazione cromatica e possono ridurre banda, ma penalizzare testi e bordi colorati |
| HDR | Richiede supporto lungo la catena e un formato adeguato; aumenta i dati colore, ma non moltiplica la banda per un fattore fisso e non è soltanto un toggle del gioco |
| DSC | Comprime il flusso nei percorsi compatibili per ottenere modalità altrimenti non trasportabili |

Il calcolo di riferimento per un flusso RGB non compresso è:

`pixel visibili × refresh × bit per pixel`

dove un pixel RGB a 8 bit per canale usa 24 bit, a 10 bit per canale ne usa 30 e a 12 bit per canale ne usa 36. Il risultato è una stima del **video attivo**, prima di blanking e overhead di codifica. Non è una certificazione di compatibilità.

Per esempio, 3840 × 2160 × 120 × 30 bit vale circa **29,86 Gbit/s** di video attivo RGB a 10 bit per canale. A 240 Hz raddoppia a circa **59,72 Gbit/s**. Il primo valore supera il payload HBR3 non compresso; il secondo supera anche i 48 Gbit/s nominali di HDMI 2.1. Sono calcoli didattici: la modalità può essere trasportata con DSC, con un rate superiore o non essere offerta affatto.

Il **chroma subsampling** riduce la risoluzione del colore rispetto alla luminanza. Può essere appropriato in alcuni contenuti video, ma sul desktop testi piccoli e contorni possono perdere definizione. Non accettare inconsapevolmente 4:2:0 soltanto per vedere il refresh massimo. Confronta l'intera modalità, non il numero Hz isolato.

Il **range RGB Full/Limited** è un'altra scelta: definisce l'intervallo dei livelli, non è un modo per aumentare il refresh. Uscita e aspettativa del display devono essere coerenti; una combinazione errata può schiacciare neri e bianchi o rendere l'immagine slavata. Per un monitor PC RGB Full può essere il percorso adatto, ma va verificato sul dispositivo, non imposto a qualsiasi televisore.

### DSC: compressione del collegamento, non Frame Generation

**Display Stream Compression**, DSC, è uno standard VESA di compressione del flusso video, progettato come **visually lossless** e con buffering e latenza ridotti [1]. Non è una codifica lunga da streaming, non genera frame e non aumenta la risoluzione interna del gioco. "Visually lossless" descrive l'obiettivo di qualità percepita: non significa identità matematica con il flusso originale o latenza totale nulla.

La FAQ VESA descrive il decoder DSC come un'aggiunta non superiore a **una linea di scansione**, citando meno di 8 µs nel proprio esempio 4K a 60 Hz [1]. È un limite riferito al decoder nel contesto documentato: non certifica tutto il processing di un monitor e non va trasformato in zero latenza end-to-end.

DSC può essere necessario per usare refresh elevato, alta risoluzione e colore completo insieme. Deve essere supportato dalla catena e dalla modalità; un dock, un adattatore o un ingresso senza il percorso richiesto possono impedirlo. Non spegnerlo soltanto perché contiene la parola compressione: potresti perdere refresh, profondità colore o 4:4:4. Non abbassare il refresh soltanto per evitare DSC se la modalità che vuoi richiede quella banda; confronta l'alternativa completa e usa una connessione distinta se vuoi isolare la variabile.

Se cerchi una modalità non compressa, confrontala come un'altra configurazione completa. Eventuali schermate nere durante cambi di modalità, incompatibilità di funzioni o problemi con più display richiedono diagnosi per driver/dispositivo; non dimostrano che DSC provochi sempre più ritardo. La documentazione di specifica non misura il costo dell'intera implementazione di un monitor.

## 4. DisplayPort: versione, link rate e certificazione del cavo

DisplayPort separa capacità del dispositivo, velocità del collegamento e caratteristiche del cavo. Il connettore di dimensioni standard, Mini DisplayPort e l'uso attraverso USB-C non garantiscono le stesse risorse. Per orientarsi, i rate **aggregati di linea** tipici a quattro corsie sono:

| Collegamento DP | Rate nominale aggregato | Payload utile indicativo | Avvertenza |
|---|---:|---:|---|
| HBR2 | 21,6 Gbit/s | 17,28 Gbit/s con 8b/10b | Banda utile inferiore al nominale |
| HBR3 | 32,4 Gbit/s | 25,92 Gbit/s con 8b/10b | Riferimento frequente per DP 1.4; la modalità può richiedere DSC |
| UHBR10 | 40 Gbit/s | circa 38,69 Gbit/s con 128b/132b | Va verificato sul dispositivo, non dedotto dal connettore |
| UHBR13.5 | 54 Gbit/s | circa 52,22 Gbit/s con 128b/132b | Supporto e catena specifici |
| UHBR20 | 80 Gbit/s | circa 77,37 Gbit/s con 128b/132b | Massimo nominale a quattro corsie del collegamento, non promessa di ogni porta DP 2.1 |

HBR2 e HBR3 usano codifica **8b/10b**: ogni 10 bit trasmessi ne portano 8 di dati, con un overhead del 20%. UHBR usa **128b/132b**, con un overhead di circa il 3%; i payload UHBR in tabella sono valori indicativi che comprendono anche l'overhead di FEC. La FAQ VESA indica circa **77,37 Gbit/s di payload massimo** per UHBR20 [1]. Non confrontare il fabbisogno video con il solo bitrate lordo.

DP 2.1 e **2.1b** non significano automaticamente UHBR20 in ogni implementazione. La FAQ VESA spiega che un dispositivo 2.1b deve supportare almeno HBR2 con DSC e almeno una funzione aggiuntiva, per esempio UHBR oppure AdaptiveSync; esistono quindi prodotti certificati 2.1b senza UHBR [1]. Controlla la velocità effettivamente supportata e il numero di corsie, non soltanto la versione.

In USB-C/DP Alt Mode il percorso può riservare **due o quattro corsie** ai dati USB; un dock può condividere banda fra display e altri flussi. Anche la funzione MST, che trasporta più schermi sullo stesso collegamento, deve dividere le risorse disponibili. Un KVM o un hub può introdurre un limite ulteriore. "USB-C" da solo non specifica uscita video, potenza, rate DP o capacità del dock.

### Le classi di cavo DisplayPort

La nomenclatura VESA è più precisa del generico "cavo gaming". Le classi non sono intercambiabili e non indicano tutte la stessa lunghezza.

- **HBR3/DP8K** è la classe certificata per un collegamento HBR3; non implica UHBR.
- **DP54** sostituisce la vecchia classe DP40 e copre UHBR10 e UHBR13.5, fino a 54 Gbit/s nominali aggregati. La specifica 2.1a la introduce per cavi passivi fino a circa due metri [7].
- **DP80** identifica supporto certificato alle velocità fino a UHBR20, 80 Gbit/s nominali aggregati, con passive tipicamente intorno al metro.
- **DP80LL** ("low loss", non "bassa latenza"), associata alla specifica 2.1b, identifica cavi attivi per portare UHBR20 su lunghezze maggiori; la documentazione VESA parla di fino a tre metri [1].

DP54 è verificata sul comunicato VESA, non su un test indipendente. Resta un limite di specifica, non la prova che un cavo commerciale di qualsiasi lunghezza sia passivo, correttamente certificato o adatto al tuo monitor [7].

Queste etichette non abilitano una funzione mancante su GPU o monitor. **DP80** certifica il supporto a UHBR20: non accelera una porta o un monitor che negoziano HBR3 e non aumenta la banda di un collegamento HBR3. Scegli un prodotto certificato della lunghezza effettiva richiesta; una pagina commerciale con "DP 2.1" non basta. Usa la lista pubblica VESA per verificare modello e produttore, invece di fidarti soltanto della stampa sulla confezione [3].

I cavi attivi possono essere **direzionali**: rispetta le etichette Source e Display e il manuale. Un cavo ottico o attivo non è automaticamente più veloce; serve a superare distanze o problemi di integrità che un passivo non copre. Non piegarlo oltre le specifiche e non presumere che funzioni in entrambe le direzioni.

## 5. HDMI: non basta leggere «2.1» o «2.2»

HDMI usa famiglie di cavi con nomi di certificazione. Per le modalità più impegnative sono rilevanti **Premium High Speed**, **Ultra High Speed** e la nuova **Ultra96**. Premium High Speed è il riferimento certificato fino a 18 Gbit/s; Ultra High Speed fino a 48 Gbit/s; Ultra96 supporta il livello fino a 96 Gbit/s [2,4,8]. Questi sono limiti del percorso pertinente, non quantità sempre negoziate.

**HDMI 2.1/2.1b può arrivare a 48 Gbit/s; HDMI 2.2 può arrivare a 96 Gbit/s. Sono massimi di specifica dipendenti dall'implementazione.** Una porta dichiarata 2.1 può offrire un rate inferiore; non ogni prodotto 2.2 deve usare il massimo o tutte le funzionalità. Anche il flusso utile è inferiore al bitrate di linea. Non scegliere una combinazione sulla sola cifra stampata accanto al connettore.

Il nome della funzione **Ultra96** sui dispositivi può riferirsi a massimi **64, 80 o 96 Gbit/s**: non confonderlo con la capacità della classe di cavo e leggi il rate dichiarato [8]. Il cavo Ultra96 è quello che HDMI indica come necessario per tutte le applicazioni 2.2; un Ultra High Speed adeguato resta sufficiente per una catena fino a 48 Gbit/s.

HDMI 2.2, secondo l'overview pubblicata da HDMI Licensing Administrator per la specifica HDMI Forum, introduce rate più elevati e **Latency Indication Protocol**, LIP, per aiutare l'allineamento audio/video nelle catene compatibili, anche con soundbar o ricevitori [2]. LIP non riduce automaticamente il ritardo del rendering e non rende più veloce un collegamento PC già adeguato. Una specifica più nuova non certifica meno latenza nel monitor.

Le funzioni gaming HDMI non sono sinonimi:

- **VRR** adatta il refresh ai frame entro il range supportato;
- **ALLM** chiede al display di passare a una modalità a bassa elaborazione, se il produttore la espone;
- **QFT** riduce il tempo di trasporto del frame nei percorsi compatibili;
- **QMS** mira a evitare l'interruzione quando cambia la cadenza video;
- **LIP** comunica informazioni per l'allineamento audio/video.

Nessuna di queste voci, da sola, dimostra che la modalità sia attiva o che la latenza end-to-end sia inferiore. Verifica l'ingresso, il profilo OSD e il comportamento reale [2].

Verifica che uscita GPU e **quell'ingresso** del display supportino refresh, HDR, VRR e formato richiesti. Un televisore può avere porte differenti e un'opzione OSD di modalità potenziata. Se il manuale richiede di abilitarla, registra prima il valore; non assumere che tutte le porte si comportino ugualmente. Un ricevitore, uno switch o una capture card può diventare il limite anche quando GPU, cavo principale e pannello sarebbero sufficienti.

Le certificazioni ufficiali e la verifica dell'etichetta aiutano a controllare il cavo [4]. Scansiona il QR dell'etichetta di certificazione e confronta marca, modello e lunghezza restituiti con la confezione: un QR pubblicitario che apre la pagina del venditore non è la stessa verifica. "8K", "gaming", placcatura e schermatura pubblicitaria non sono una misura di latenza. Scegli la classe sufficiente per la modalità, senza pagare per un massimo che la catena non usa. Prima di acquistare, verifica modello e lunghezza: non assumere che tutta la famiglia commerciale abbia la stessa certificazione.

## 6. DisplayPort o HDMI? Scegliere la funzione reale

| Esigenza | Controllo decisivo |
|---|---|
| Massimo refresh a risoluzione nativa | Tabella modalità del monitor per la porta e formato colore/DSC necessari |
| VRR | Supporto concreto GPU–driver–ingresso, range e impostazioni |
| HDR e desktop nitido | Profondità, formato colore e 4:4:4/RGB alla modalità scelta |
| Dock o più monitor | Corsie, banda condivisa, MST e capacità effettiva del dock |
| Televisore e catena audio/video | Porte, modalità PC/gioco, passthrough dei dispositivi intermedi |
| Cavo lungo | Certificazione della lunghezza, eventuale elettronica attiva e stabilità della catena |

DisplayPort non è sempre più veloce in termini di latenza; HDMI non è intrinsecamente inadatto al competitivo. Conta la modalità ottenuta e il percorso del display. Se entrambe le porte permettono la stessa uscita stabile e le funzioni necessarie, il connettore da solo non determina la risposta.

Se disponibile e previsto per quella porta/modalità, parti dal **cavo fornito con il monitor** e verifica la stabilità: non deve essere sostituito per principio. Il fatto che sia incluso non certifica tutte le modalità di ogni ingresso.

Per un PC fisso, un collegamento diretto alla GPU e al monitor riduce le variabili della diagnosi. Assicurati di usare l'uscita corretta: una porta sulla scheda madre può seguire la grafica integrata anziché il percorso previsto. Su notebook verifica nel manuale quali uscite siano instradate verso quale GPU e il ruolo dell'eventuale **MUX**, il selettore del percorso grafico. Schede grafiche custom e notebook possono esporre un numero o un rate di porte diverso dal modello di riferimento: controlla il manuale del prodotto, non la scheda del chip. Non cambiare modalità MUX durante lo stesso test del cavo.

GPU-Z, OSD e diagnostiche del produttore possono mostrare il rate del link, ma non su ogni combinazione. "4K 240 Hz" in Windows non dimostra UHBR20 né assenza di DSC: se il rate non è disponibile, annota **non verificato**.

Adattatori passivi e attivi, conversioni DP→HDMI e USB-C con video non sono equivalenti. Possono perdere VRR, HDR, profondità colore o una modalità di refresh. Non trattare "si accende" come prova di piena compatibilità; controlla l'uscita effettiva. Un cavo ottico/attivo può essere direzionale e richiedere un'installazione precisa: segui le etichette Source/Display e il manuale, senza presumere reversibilità.

## 7. Una procedura di verifica e diagnosi senza accumulare cambi

### Prima della sostituzione

1. Annota GPU, monitor, driver, porta, cavo, lunghezza e dispositivi intermedi. Conserva foto o note della configurazione OSD e del pannello driver.
2. Consulta il manuale per la modalità desiderata: risoluzione, refresh, bit per canale, chroma, HDR/VRR e DSC. La sola lista dei massimi non dimostra che siano disponibili simultaneamente.
3. Registra segnale attivo e formato corrente. Se il display espone una modalità corretta e non presenta problemi, non occorre cambiare hardware per principio.
4. Salva una baseline: profilo del monitor, impostazioni del driver, modalità del gioco e screenshot di Schermo avanzato. Serve a distinguere un miglioramento reale da un fallback.

### Se mancano modalità o compare instabilità

| Sintomo | Primo controllo | Cosa non concludere subito |
|---|---|---|
| Refresh massimo non selezionabile | Ingresso, modalità OSD, formato/bit colore, tabella del monitor | Che il pannello sia guasto o il cavo sempre insufficiente |
| Schermo nero o nessun segnale | Cavo, porta, dock, modalità richiesta, link training | Che la GPU sia danneggiata |
| Scintillii, righe, dropout intermittenti | Integrità del collegamento, lunghezza, adattatore, firmware/driver | Che sia sempre colpa del cavo senza prova |
| Testi morbidi o bordi colorati | Risoluzione attiva, scaling, chroma, overscan del TV | Che il pannello abbia una risoluzione inferiore |
| Neri schiacciati o bianchi bruciati | Range RGB, percorso HDR, impostazioni del display | Che manchi banda |
| Flicker al variare del frame rate | VRR, range, scena, driver, pannello | Che il cavo sia la causa principale |

**Refresh non disponibile.** Verifica l'ingresso, la modalità OSD richiesta, il formato/bit colore e la tabella del monitor. Escludi temporaneamente dock o adattatori con un collegamento diretto noto, se disponibile. Non creare subito risoluzioni o timing personalizzati: potrebbero oltrepassare condizioni non validate e rendere il test meno leggibile.

**Schermate nere, scintillii o disconnessioni.** Possono riguardare integrità del collegamento, cavo, porta, firmware/driver, negoziazione o cambio modalità. Riduci un solo parametro, per esempio il refresh, e verifica se l'instabilità scompare. Questo localizza una condizione, non dimostra ancora che il cavo sia colpevole. Prova un altro cavo certificato della classe richiesta e poi una porta compatibile, una variazione per volta.

**Flicker quando varia il frame rate.** Può essere un comportamento del pannello/VRR, soprattutto vicino agli estremi o con frame irregolari. Non attribuirlo immediatamente al cavo. Confronta VRR ON/OFF separatamente, mantenendo scena e uscita; torna al riferimento dopo la prova. Un cambio globale di colore o refresh non deve mescolarsi allo stesso confronto.

**Immagine morbida o testi colorati degradati.** Controlla risoluzione attiva, scaling, chroma e formato PC prima di cercare un difetto del pannello. Su un televisore verifica anche overscan ed elaborazioni: il segnale può essere ridimensionato ulteriormente.

**Neri o bianchi errati.** Controlla coerenza del range RGB e percorso HDR; non confondere la saturazione dei livelli con banda insufficiente. Se HDR non è desiderato nella prova, annota e disattiva soltanto quella funzione, poi ripristina.

Per sostituire fisicamente un cavo, ferma cattura e attività che non vuoi interrompere; segui le istruzioni dei dispositivi, evita trazioni e curvature strette e sblocca l'eventuale fermo del connettore. Non forzare Mini DP, USB-C o HDMI in una porta diversa. Dopo il collegamento, verifica nuovamente **segnale attivo, refresh e formato**: Windows o driver possono scegliere un fallback.

Se una modifica del segnale produce uno schermo nero, attendi l'eventuale ritorno automatico offerto dal sistema e non confermare alla cieca. Se non ritorna, ripristina il collegamento noto o usa un display funzionante per rimettere i valori salvati. Non continuare a cambiare più impostazioni senza vedere che cosa stai confermando.

### Conferma e rollback

Con la nuova configurazione ripeti lo stesso tratto di gioco, verifica OSD, tearing/flicker e stabilità nei cambi abituali: Alt-Tab, standby/risveglio e uso multi-monitor. Ridurre Hz può cambiare anche DSC e timing, non soltanto il numero del refresh: annotalo. Un reset del driver, una perdita di segnale e il flicker VRR sono sintomi distinti; conserva eventuali errori e non attribuirli tutti al cavo. Se la prova riguarda fluidità o latenza, usa misure con estremi dichiarati: un cavo stabile non dimostra da solo una riduzione del ritardo.

Per tornare alla baseline ripristina porta, cavo e intermedi iniziali, quindi modalità OSD, refresh, formato, HDR e VRR annotati; ricontrolla il segnale attivo. Un valore desktop uguale non basta. Se aggiorni il firmware del monitor, usa un'alimentazione affidabile e le istruzioni del produttore: un'interruzione può rendere il dispositivo non avviabile o far sparire una modalità. Non aggiornare contemporaneamente firmware e driver mentre stai isolando il collegamento: se serve un intervento di supporto, trattalo come una nuova serie con istruzioni e rollback del produttore.

La scheda finale dovrebbe rispondere a poche domande: *quale segnale arriva, su quale porta, con quale cavo, con quali funzioni verificate e con quale stabilità*. Se manca uno di questi dati, il confronto non è completo.

## 8. Elaborazione del monitor: non confonderla con il cavo

Su un televisore, interpolazione del movimento, riduzione del rumore, sharpening, overscan e altre elaborazioni possono cambiare ritardo e immagine. Una **modalità PC/gioco** documentata è il riferimento da confrontare, non la garanzia che ogni filtro sia spento. Controlla anche HDR e VRR nella modalità scelta; non assumere che una combinazione abbia le stesse prestazioni di un'altra.

L'**overdrive** modifica la risposta dei pixel. Un livello aggressivo può generare overshoot o inverse ghosting, e il compromesso può cambiare con il refresh e il VRR. Non scegliere automaticamente "Extreme": confronta il livello raccomandato per il range usato e torna al valore precedente se i contorni peggiorano. Overdrive, scansione, tempo di risposta e latenza totale sono grandezze differenti.

Lo strobo della retroilluminazione può aumentare chiarezza del movimento, con vincoli di cadenza, luminosità e compatibilità; non sommarlo al VRR se il monitor non documenta il supporto. Può risultare meno confortevole o più flicker di una modalità continua; valuta anche la sensibilità personale e confronta nomi come DyAc o ULMB per ciò che fanno in quella modalità, non per una promessa di latenza. Gli OLED hanno transizioni rapide, ma non eliminano scanout, elaborazione o attesa a monte. Anche qui, nessun numero del cavo sostituisce una misura del percorso completo.

L'**upscaling del monitor** è un'altra fase: un ingresso a 1080p su un pannello 4K viene ridimensionato dal display, mentre un'uscita GPU a 4K può arrivare già nativa. Non confrontare i due percorsi chiamandoli entrambi "4K": cambiano il carico GPU, il segnale trasportato e il processing del monitor.

## 9. Miti da chiudere

- **"Un cavo più costoso riduce la latenza."** Se il segnale è stabile, il cavo non crea frame né riduce il tempo di rendering. Un cavo inadeguato può impedire una modalità o causare errori, non un guadagno misurabile per il solo prezzo.
- **"DisplayPort è sempre più reattivo di HDMI."** Conta la modalità e il percorso. A parità di segnale stabile e funzioni, il connettore non stabilisce da solo la risposta.
- **"HDMI 2.2 rende automaticamente più veloce il PC."** La specifica aumenta la banda e aggiunge funzioni; non certifica latenza del monitor né prestazioni del gioco.
- **"1 ms GtG è input lag."** È una transizione del pixel. MPRT è un'altra misura; la latenza end-to-end comprende altro.
- **"DSC aggiunge sempre millisecondi."** Il decoder è descritto come non superiore a una linea di scansione in un esempio VESA; il costo completo dipende dal monitor e non è la somma di quel valore.
- **"4K 240 Hz in Windows prova UHBR20."** Può essere DSC, un rate inferiore o un formato colore ridotto. Serve il rate effettivo o la documentazione della modalità.
- **"Un cavo certificato garantisce tutte le modalità."** La certificazione vale per classe, modello e lunghezza; la modalità dipende anche da GPU, ingresso, dock e monitor.
- **"Un cavo lungo aggiunge ritardo percebibile."** La propagazione è molto piccola; i problemi tipici di una lunghezza eccessiva sono integrità, dropout o necessità di cavo attivo.
- **"Il cavo ottico è sempre migliore."** È utile in certe distanze e installazioni, ma può essere direzionale e non sostituisce la verifica della modalità.

Il risultato utile è una scheda di configurazione leggibile: *quale segnale, su quale porta, con quale cavo e funzioni verificate*. Soltanto dopo ha senso ottimizzare cap e sync. Un'uscita stabile e coerente con l'obiettivo vale più di un marchio "più nuovo" che obbliga a rinunciare a una funzione necessaria.

## Fonti e approfondimenti

1. VESA/DisplayPort, [DisplayPort FAQ](https://www.displayport.org/faq/), copia locale in `analisi/vesa-dsc.txt` e `fonti/documentazione-script/dp-faq.txt`: DSC, payload UHBR, requisiti di certificazione 2.1b e DP80LL.
2. HDMI Licensing Administrator / HDMI Forum, [HDMI 2.2 Specification Overview](https://www.hdmi.org/spec/hdmi2), copia locale `fonti/documentazione-script/hdmi.txt`: massimo 96 Gbit/s, Ultra96, LIP, VRR, ALLM, QFT e QMS; non una prova di ogni implementazione.
3. [VESA Certified Products](https://www.vesa.org/vesa-certified-products/): risorsa per verificare modello, produttore e classe del cavo; nessun prodotto commerciale testato in questa guida.
4. HDMI Licensing Administrator, [Premium High Speed](https://www.hdmi.org/spec/premiumcable) e [Ultra High Speed](https://www.hdmi.org/spec21sub/ultrahighspeedcable): programmi di certificazione e verifica di marca, modello e lunghezza tramite etichetta; nessun cavo commerciale testato.
5. AMD, [FreeSync e LFC](https://www.amd.com/en/products/graphics/technologies/freesync.html), e NVIDIA, [System Latency Optimization Guide](https://www.nvidia.com/en-us/geforce/guides/system-latency-optimization-guide/): relazione con sync e percorso, non classifiche dei cavi.
6. CS2 Kitchen, [Everyone is Lying about Input Latency Settings](https://www.youtube.com/watch?v=zNHFAAJkIvo), 12 luglio 2026; transcript locale e [verifica di attribuzione e limiti](../analisi/VERIFICA-VIDEO-E-RTSS.md).
7. VESA, [DisplayPort 2.1a e nuova specifica cavo DP54](https://vesa.org/press/vesa-announces-displayport-updates-and-extensions-for-gaming-and-automotive-market-at-ces), 8 gennaio 2024: DP54 sostituisce DP40, UHBR10/13.5 e passive fino a circa due metri. Comunicato di specifica, non test indipendente.
8. HDMI Licensing Administrator, [Ultra96 Feature Name](https://www.hdmi.org/spec2sub/ultra96): possibilità di indicare 64, 80 o 96 Gbit/s e requisito del cavo Ultra96 per le funzioni che lo richiedono.

Le copie locali `vesa-dp54.txt` e `dp-cables.txt` restituivano rispettivamente 403 e una protezione Cloudflare: **non sono usate come prova tecnica**. DP54 è stata verificata sul comunicato VESA citato, non su un test di laboratorio indipendente. Non sono stati effettuati test di banda, misure del pannello o verifiche di uno specifico modello commerciale. I manuali di GPU, dock e monitor restano necessari per validare il proprio collegamento.

Per continuare: [sincronizzazione e cap](05-sincronizzazione-limiter.md), [misure PresentMon e limiti dei contatori](04-cpu-gpu-presentmon.md), [misure e verifica del setup](12-misure-verifica.md).
