# Stabilità e overclock: CPU, GPU, RAM e test che contano

Un overclock può alzare gli FPS, ma non è automaticamente un intervento sulla latenza. Può migliorare la regolarità dei frame quando il collo di bottiglia è la CPU o la GPU, peggiorarla quando introduce errori corretti in silenzio, e lasciare tutto invariato quando il limite è il gioco, il server o il display. Prima di cercare un millisecondo conviene risolvere una domanda più semplice: il PC esegue il lavoro corretto, con margini termici ed elettrici credibili?

Questa guida separa tre livelli che vengono spesso confusi:

- **stabilità**: il sistema non produce errori di calcolo, crash, artefatti o riavvii;
- **prestazioni**: il lavoro viene svolto più velocemente o con frame time più regolari;
- **latenza percepita**: il percorso input→gioco→display→occhio umano. L'overclock può influirvi, ma non la misura da solo.

**Stabilità, prestazioni e latenza non sono sinonimi.** Gli FPS descrivono il ritmo di produzione dei frame; il frame time descrive gli intervalli nella metrica raccolta. Le **ISR** (Interrupt Service Routine) e le **DPC** (Deferred Procedure Call) sono routine dei driver il cui lavoro può interferire con attività a scadenza. Un test memoria non misura nessuna di queste latenze, e un report LatencyMon favorevole non dimostra RAM affidabile.

Il riferimento è Windows 11 25H2/26H2, con piattaforme desktop AMD AM5, Intel LGA1851 e GPU NVIDIA/AMD recenti. Non vengono certificate in anticipo build future, BIOS non pubblicati o sample engineering. Le procedure seguenti sono documentate: per questa stesura non sono stati installati OCCT, eseguiti stress test o collaudati recuperi sul PC del lettore.

## 1. Prima di toccare il BIOS: baseline e ritorno

Una **baseline** è la configurazione di riferimento a cui confrontare una modifica. Non basta annotare “tutto stock”: un BIOS può applicare automaticamente profili memoria, boost estesi, limiti di potenza OEM o impostazioni diverse da quelle dichiarate dal produttore della CPU.

Registra almeno:

- modello CPU, GPU, scheda madre e versione BIOS;
- versione **AGESA** o microcode, se disponibile;
- kit RAM, capacità, numero di moduli, slot occupati e profilo JEDEC/XMP/EXPO;
- overclock e undervolt attivi, compresi quelli applicati da utility Windows;
- piano energetico, driver GPU e versione di Windows;
- alimentatore, dissipatore, ventole e temperatura ambiente;
- risultati delle prove baseline, non solo il punteggio massimo.

Un **undervolt** riduce la tensione rispetto al percorso di riferimento; può funzionare in alcune condizioni e fallire in altre. **XMP ed EXPO** applicano profili di frequenza, timing e tensione RAM: sono overclock, anche se disponibili con un clic [6][7][23]. **PBO** è anch'esso overclock secondo AMD e può invalidare la garanzia [1][3]. Non chiamare “stock” una configurazione che non lo è.

Salva il lavoro, i dati importanti e le impostazioni pertinenti. Prepara il **rollback** prima di modificare:

- profilo BIOS esportato su USB, se la scheda lo supporta;
- foto delle schermate con i valori originali;
- posizione del jumper/clear CMOS o del pulsante di reset del firmware;
- chiave di recupero BitLocker e password dell'account, accessibili da un altro dispositivo;
- installer o pacchetto driver GPU conservato, se stai per cambiarli.

Non caricare indiscriminatamente tutti i default BIOS. Potresti cambiare storage/VMD/RAID, boot o sicurezza e rendere non avviabile il Windows esistente. Un profilo salvato non garantisce di poter entrare nel firmware se la configurazione della memoria impedisce l'avvio.

Dopo una modifica RAM, il **memory training** cerca parametri di funzionamento. Soprattutto con DDR5 può rendere il primo avvio più lungo e includere riavvii. Segui tempi e LED del manuale; non interrompere ripetutamente l'alimentazione durante il training previsto. Il completamento del training significa che il sistema è riuscito ad avviarsi, non che la memoria sia stabile. Se non riparte, usa il recupero documentato o assistenza, senza alzare tensioni a tentativi.

## 2. Che cosa cambia davvero un overclock

### La scala dei guadagni non è universale

Un overclock della CPU aiuta soprattutto quando il gioco è **CPU-bound**: molti oggetti, fisica, IA, draw call, simulazioni, risoluzioni basse o competitive con GPU molto veloce. Un overclock della GPU aiuta quando il limite è il rendering: risoluzione alta, ray tracing, texture, effetti. La RAM e la cache aiutano di più nei giochi con accessi frequenti alla memoria e nei minimi, non necessariamente nella media.

Questo significa che:

- **+5% di clock non equivale a +5% di FPS**: il collo di bottiglia può spostarsi;
- **la media può salire e i minimi peggiorare** se l'overclock introduce errori corretti o instabilità termica;
- **la risoluzione cambia il collo di bottiglia**: un profilo CPU stabile a 1080p può essere irrilevante a 4K, e viceversa;
- **il frame time è più informativo della media** per capire se il gioco “scatta” nonostante FPS alti.

La [guida alle misure](12-misure-verifica.md) entra nel merito di presentazione e frame time. Qui basta fissare il principio: un overclock si valuta con la metrica che descrive il problema, non con un numero scelto a priori.

### La silicon lottery non è una scusa: è un dato

Ogni CPU e GPU esce dalla fabbrica con una curva tensione/frequenza leggermente diversa. Due 9800X3D possono raggiungere la stessa frequenza con tensioni diverse, e due RTX 5090 possono avere limiti di potenza e temperature diversi. Per questo:

- i valori “stabili” visti su un forum sono **punti di partenza**, non obiettivi;
- un offset di tensione che funziona su un sample può essere instabile su un altro;
- la stessa scheda può comportarsi diversamente dopo un aggiornamento BIOS, driver o dissipatore;
- il silicio può degradarsi nel tempo se sottoposto a tensione, corrente e temperatura elevate.

La guida non propone quindi un “profilo universale”. Propone un **metodo** per trovare il limite del tuo sample e per riconoscere quando il guadagno non vale il rischio.

### Le quattro variabili che contano

1. **Frequenza**: il clock target. Non è libero: dipende dalla curva V/F, dai limiti e dalla temperatura.
2. **Tensione**: spinge la frequenza, ma aumenta potenza, calore e stress. “Più tensione” non significa “più stabile” oltre un certo punto.
3. **Corrente e potenza**: CPU e GPU hanno limiti PPT/TDC/EDC o PL1/PL2/ICCMax. Sbloccarli senza raffreddamento adeguato produce throttling, non prestazioni.
4. **Temperatura**: riduce l'efficienza della curva e può attivare protezioni. Un margine termico è parte del progetto, non un optional.

## 3. Mappa delle piattaforme nel 2026

| Piattaforma | Leve principali | Rischi tipici | Verifica minima |
|---|---|---|---|
| **AMD AM5, Ryzen 7000/9000** | PBO, Curve Optimizer, Curve Shaper, boost override, eCLK su schede selezionate, EXPO | tensioni SoC, instabilità per-core, clock stretching, calore IOD | test per-core, WHEA, effective clock, temperature, EXPO/JEDEC |
| **Intel LGA1851, Core Ultra 200S** | PL1/PL2/Tau, ICCMax, adaptive voltage, LLC, ratio P/E, ring, XMP | limiti OEM, throttling, instabilità a basso carico, tensione adattiva | profilo Intel Default, test misti, temperature, frequenze effettive |
| **DDR5 su entrambe** | XMP/EXPO, frequenza, timing primari/secondari/terziari, tensione VDD/VDDQ/VDDIO, tREFI | training, errori tardivi, sensibilità al calore, IMC | TM5/y-cruncher/Karhu/OCCT, test a caldo, cold boot |
| **NVIDIA RTX 50** | power limit, curva V/F, core offset, memory offset, undervolt | 12V-2x6, transient, artefatti, memoria con correzione errori | 3DMark/giochi, OCCT VRAM, driver reset, temperature |
| **AMD RX 9000** | power limit, voltage offset, core/memory offset, undervolt | instabilità a frequenze intermedie, driver reset, calore memoria | giochi, stress GPU, artefatti, frame time |

La tabella non è un elenco di preset. È una mappa di ciò che può essere regolato e di ciò che va verificato. Le piattaforme più vecchie (AM4, LGA1700, RTX 30/40, RX 6000/7000) seguono gli stessi principi, ma non riutilizzare valori o guide pensate per un'altra generazione: cambiano IMC, VRM, curve e protezioni.

## 4. CPU: PBO, Curve Optimizer, tensione e LLC

### 4.1 AMD: PBO non è “turbo mode”

**Precision Boost Overdrive** permette alla CPU di operare oltre i limiti di fabbrica, entro i limiti della scheda madre e del raffreddamento [1]. Le schede prodotto AMD elencano PBO, EXPO e Curve Optimizer tra le funzioni supportate, non un esito garantito [2]. I parametri principali sono:

- **PPT**: potenza totale del socket;
- **TDC**: corrente sostenuta;
- **EDC**: corrente di picco;
- **Boost Override**: alza il limite massimo di frequenza, non la garantisce;
- **PBO Scalar**: modifica l'aggressività della curva di boost;
- **Curve Optimizer**: sposta la curva tensione/frequenza, di solito in negativo per ridurre la tensione a parità di frequenza [1].

Un errore comune è credere che `+200 MHz` significhi “+200 MHz sempre”. Significa che la CPU è autorizzata a salire fino a quel limite **se** la curva V/F, la temperatura, la corrente e la potenza lo consentono. Con un carico all-core, il limite può essere raggiunto solo per poco.

**Curve Optimizer** non è un undervolt lineare: è un offset alla curva V/F. Un valore negativo può far raggiungere una frequenza più alta a parità di tensione, oppure ridurre la tensione a parità di frequenza. Per questo va testato per core, non solo con un test all-core. Un core “buono” può reggere -30 mentre un altro è instabile a -15.

**Curve Shaper**, disponibile su Ryzen 9000 e gestito da Ryzen Master recente, permette di modulare la curva in regioni diverse (minimo, basso, medio, alto, massimo) e in base alla temperatura. È un secondo passaggio: prima si trova un offset all-core stabile, poi si raffina. Non è un modo per “aggirare” un core instabile. La comunità AM5 discute per-core offset, eCLK e Curve Shaper con risultati molto diversi; usali come ipotesi, non come valori [9].

**eCLK** (clock esterno asincrono) è una leva avanzata disponibile su alcune schede. Può alzare la frequenza senza aumentare direttamente la tensione della curva, ma cambia il dominio di clock e può interagire con PCIe, memoria e stabilità del sistema. Non è una prima scelta e non va attivato senza sapere quale clock stai modificando.

**Esempio verificato, non preset:** nella recensione TechPowerUp del 9800X3D, un sample ha raggiunto 5,3 GHz all-core a 1,35 V, con guadagno limitato rispetto al boost stock; con PBO ha trovato `-20` stabile e `-25` no. Lo stesso sample ha gestito DDR5-6200 1:1 a circa 1,23 V SoC, mentre DDR5-6400 a 1,3 V si avviava ma crashava nei benchmark [8]. Sono dati di **un** sample, non una ricetta.

**Tensioni SoC:** sulle piattaforme AM5 la tensione SoC alimenta anche il controller di memoria e parte dell'I/O. Non impostare un valore “per sentito dire”: verifica il valore applicato da EXPO, la stabilità e le temperature. Un valore più alto può aiutare una frequenza, ma non è gratis in termini di calore e affidabilità. TechPowerUp riporta 1,3 V come massimo consentito dal BIOS del sample, non come valore consigliato [8]. La guida non propone una tensione SoC universale.

**Clock stretching:** un undervolt troppo aggressivo può ridurre il lavoro utile senza crash evidente. Il sistema “sembra” stabile, ma i core effettivi calano e le prestazioni peggiorano. Confronta clock effettivi, punteggio e frame time tra stock e undervolt; non fermarti al fatto che il test non sia esploso.

### 4.2 Intel: limiti, tensione adattiva e LLC

Sulle CPU Intel Core Ultra 200S i parametri più importanti sono:

- **PL1**: potenza media sostenuta;
- **PL2**: potenza di picco a breve termine;
- **Tau**: durata della finestra PL2;
- **ICCMax**: corrente massima;
- **ratio P-core/E-core**: moltiplicatori dei due tipi di core;
- **ring/cache ratio**: frequenza della cache;
- **adaptive voltage offset**: riduce la tensione mantenendo il comportamento dinamico;
- **load-line calibration (LLC)**: compensa la caduta di tensione sotto carico.

Intel documenta, per esempio, che una SKU 125 W con 8 P-core e 16 E-core può avere PL1 125 W, PL2 250 W e Tau 56 s [5]. Questo non significa che la tua scheda applichi quegli stessi valori: molti BIOS usano profili “performance” o “extreme” che alzano PL1/PL2 e allungano Tau. Prima di overclockare, identifica il profilo attivo e confrontalo con il profilo Intel Default.

Intel raccomanda di partire dalla baseline, cambiare un parametro per volta e, con raffreddamento ad aria o liquido tradizionale, di non superare 1,4 V e di tenere le temperature sotto controllo; sono indicazioni generali, non una garanzia per il tuo SKU [4].

**LLC** non è “più alto = meglio”. Un LLC aggressivo riduce il vdroop, ma può causare overshoot nei transitori e rendere la tensione meno prevedibile. Nella maggior parte dei casi si parte da un valore moderato, si misura la tensione sotto carico e si evita di compensare un LLC esagerato con un offset di tensione altrettanto esagerato. La tensione va letta sotto carico, non a riposo.

**Tensione adattiva e carichi leggeri:** un offset negativo stabile in Cinebench può fallire in idle, sospensione, avvio a freddo o carichi burst. Intel e la comunità segnalano da tempo che l'instabilità a basso carico è una categoria separata. Per questo la validazione include idle, sleep, browser, video e transizioni, non solo stress all-core.

**Degradazione:** non usare vecchi profili “daily” creati per altre generazioni o per BIOS precedenti. Se la piattaforma ha ricevuto aggiornamenti di microcodice o modifiche ai limiti, riparti dalla baseline e verifica le tensioni. La guida non fornisce valori di tensione “sicuri” universali: dipendono da SKU, scheda madre, LLC, raffreddamento e sample.

### 4.3 La zona che non conviene oltrepassare

- **Non disabilitare protezioni** (OCP, OVP, UVP, thermal throttling) per completare un test.
- **Non usare un LLC massimo** solo perché “tiene la tensione”.
- **Non alzare la tensione** per compensare un test fallito senza capire se il limite è termico, di corrente o di curva.
- **Non lasciare un overclock “quasi stabile”** come daily: un errore corretto in silenzio è peggio di un crash evidente.
- **Non copiare un profilo BIOS** da un altro sample, anche con lo stesso modello di CPU.

## 5. RAM: il guadagno più sottile, la validazione più lunga

### 5.1 JEDEC, XMP ed EXPO

DDR5 parte da una configurazione **JEDEC**: frequenza, timing e tensione standard, conservativi. XMP (Intel) ed EXPO (AMD) applicano un profilo verificato dal produttore del kit, ma restano overclock del controller di memoria e della RAM [6][7][23]. Un kit “6000” indica 6000 MT/s (milioni di trasferimenti al secondo), non un clock fisico di 6000 MHz.

Un profilo XMP/EXPO può essere stabile su una scheda e non su un'altra. Contano:

- numero di moduli e capacità;
- tipo di IC (Hynix A/M, Samsung, Micron) e ranking;
- topologia della scheda madre (2 o 4 slot, daisy-chain o T-topology);
- qualità dell'IMC (Integrated Memory Controller) della CPU;
- BIOS, AGESA/microcode e training;
- temperatura delle RAM e airflow.

**Due moduli sono generalmente più facili da validare di quattro.** Quattro moduli aumentano il carico sul controller e spesso richiedono frequenze più basse o timing più rilassati. Non è una regola assoluta, ma è un punto di partenza per capire perché lo stesso kit non raggiunge la stessa frequenza su un'altra build.

### 5.2 AM5: UCLK, MCLK e FCLK

Su AM5 la frequenza della memoria non è l'unica variabile:

- **MCLK** è il clock della DRAM;
- **UCLK** è il clock del controller di memoria;
- **FCLK** è il clock dell'Infinity Fabric.

La modalità **1:1** (UCLK = MCLK) è spesso preferibile per la latenza. Salire di frequenza in 2:1 può aumentare la banda ma peggiorare la latenza, e non sempre compensa. TechPowerUp, per esempio, riporta che DDR5-8000 sul sample non era abbastanza vantaggioso rispetto alla perdita di UCLK 1:2 [8].

FCLK e UCLK non sono indipendenti dalla stabilità: un FCLK troppo alto può causare errori che sembrano della RAM. La comunità AM5 usa spesso FCLK intorno a 2000–2133 MHz, ma il valore stabile dipende dal sample e dalla tensione. Non copiare un numero: testa con y-cruncher, TM5 e carichi misti, e controlla WHEA.

**Esempio:** un sample 9800X3D ha gestito 6200 MT/s 1:1 “facilmente” a circa 1,23 V SoC, mentre 6400 MT/s a 1,3 V si avviava ma crashava [8]. Questo illustra perché “6400 CL30 è meglio” non è una legge: su AM5 la combinazione 1:1, FCLK e tensioni può rendere 6000 CL30 più equilibrata di 6400 CL30.

### 5.3 Timing: che cosa toccare e in che ordine

I timing DDR5 si dividono in:

- **primari**: tCL, tRCD, tRP, tRAS;
- **secondari**: tRFC, tREFI, tFAW, tRRD, tWTR, tWR;
- **terziari**: resistenze e parametri di segnalazione, spesso dipendenti dalla scheda.

La comunità (Overclock.net, r/overclocking) usa un metodo incrementale: si parte dal profilo XMP/EXPO stabile, si cambia **un timing alla volta**, si testa, si annota, e si torna indietro al primo errore. Non si toccano insieme frequenza, timing primari e tensioni. Un test breve può dare falsa sicurezza: alcuni errori compaiono solo dopo molti cicli o quando la RAM è calda [10]. La cheat sheet AM5 di r/overclocking raccoglie ordini di test e osservazioni, ma mescola sample e configurazioni: va letta come appunti, non come specifica [11].

**tREFI** è un caso tipico. Alzarlo può ridurre la latenza media, ma aumenta la sensibilità alla temperatura e può produrre errori tardivi. Un valore “massimo” visto su un forum non è un default sicuro. Se lo alzi, testa a lungo con RAM calda e verifica che il guadagno sia reale nel tuo workload.

**Tensioni DDR5** hanno nomi diversi tra piattaforme: VDD, VDDQ, VDDIO, VPP, SoC/SA. Non esiste una mappa unica “sicura” per ogni kit. Il produttore del kit e il BIOS della scheda sono il riferimento; la comunità può suggerire intervalli, ma il sample e la temperatura decidono. Non alzare VDDIO o SoC per far passare un test senza capire quale segnale stai compensando.

### 5.4 Come si valida la RAM

Nessun singolo programma è definitivo. Una strategia ragionevole, usata dalla comunità e compatibile con i tool descritti in questa guida:

| Prova | A cosa serve | Limite |
|---|---|---|
| **TestMem5 con config anta777/1usmus** | rilevare errori di timing e pattern; rapido per fare ipotesi [12] | un config non copre ogni condizione; servono cicli e temperature representative |
| **y-cruncher (VT3, N63, VST)** | stressare IMC, cache e calcolo con pattern diversi [13] | non è un test “RAM only”; può fallire per CPU/IMC |
| **Karhu RAM Test** | carico sostenuto con coverage elevata [14] | licenza a pagamento; non sostituisce test misti |
| **OCCT Memory / CPU+RAM** | carichi controllati con rilevamento errori | opzioni e durate cambiano per versione |
| **MemTest86** | test fuori da Windows, utile per escludere il sistema operativo | non copre carichi reali e non misura DPC |
| **Test a caldo + cold boot** | errori termici e di training | richiede tempo e condizioni controllate |

La combinazione minima non è “un’ora di un test”. È **più prove con pattern diversi**, seguite da un uso reale: avvio a freddo, sospensione, gioco, browser con molte schede, compilazione shader, trasferimento file. Un errore in TM5 è sufficiente per fermarsi; un pass di TM5 non è una certificazione. Con TestMem5 leggi la config prima di importarla: Auto e SSE non sono equivalenti e un preset 1usmus/anta777 va usato con la versione e i cicli previsti. Anche un ciclo può durare circa dieci minuti, quindi tre cicli non sono una pausa veloce.

### 5.5 Errori, temperatura e diagnosi

Se compare un errore:

1. **Ferma il test** e annota configurazione, timing, tensione, temperatura e numero del test.
2. **Torna all'ultima modifica** o al profilo precedente; non aggiungere tensione a caso.
3. **Ripeti** con la stessa durata e le stesse condizioni per verificare se l'errore è riproducibile.
4. **Separa le variabili**: RAM JEDEC, poi EXPO/XMP, poi timing manuali, poi FCLK/SoC.
5. **Controlla il raffreddamento** delle RAM e il ricircolo d'aria: DDR5 è sensibile alla temperatura.

Un errore sotto EXPO non prova automaticamente che un modulo sia guasto. Può essere il profilo, l'IMC, la scheda, il BIOS o la temperatura. Un errore a JEDEC, invece, è un segnale più forte e richiede diagnosi hardware.

## 6. GPU: overclock, undervolt e power limit

### 6.1 Le tre strade

1. **Power limit**: riduce o aumenta il budget energetico. Abbassarlo riduce temperature e rumore, spesso con perdita contenuta di FPS; alzarlo ha senso solo se il dissipatore e l'alimentatore hanno margine.
2. **Core offset**: sposta la curva V/F verso l'alto. Può aumentare il boost, ma il guadagno dipende dal limite di potenza e dalla temperatura.
3. **Undervolt**: fissa una tensione più bassa per una data frequenza, o “appiattisce” la curva a un punto di tensione. Può ridurre consumi e temperature mantenendo prestazioni simili.

L'undervolt non è la stessa cosa dell'overclock CPU e non garantisce più FPS. È spesso il compromesso più interessante per un PC daily: meno calore, meno rumore, prestazioni vicine allo stock. Ma anche qui non esistono valori universali.

### 6.2 Esempio verificato, non preset

ASUS ROG ha documentato un RTX 5090 Astral OC con curva appiattita a circa 2.902 MHz a 950 mV, con una riduzione media di circa 10 °C e prestazioni nell'ordine di 1–3 FPS dal profilo OC, a seconda del gioco [18]. È un risultato di **un sample** con un dissipatore particolare: non copiare 950 mV o 2.902 MHz.

TechPowerUp, nella recensione della RTX 5090 TUF, riporta un limite di memoria di +375 MHz stabile su diversi sample, con power limit 575/600 W [19]. Questo non significa che +375 sia il massimo per ogni scheda: significa che gli offset di memoria non sono comparabili tra generazioni.

Sulle GeForce RTX 50 con GDDR7, NVIDIA dichiara ECC integrata nel die e sempre attiva, con correzione single-bit e **EDR** (Error Detection and Replay); non è un'opzione da attivare o disattivare [24]. Un offset di memoria troppo alto può quindi non produrre artefatti evidenti ma causare correzioni/retry e un guadagno nullo o negativo. Confronta punteggio e frame time, non solo l'assenza di crash.

### 6.3 Come si cerca il limite

1. **Baseline**: stock, ventole fisse o curva nota, driver e gioco registrati.
2. **Power limit**: decidi il budget in base a PSU, temperature e rumore. Non alzarlo se il hotspot o le memorie sono già al limite.
3. **Core**: piccoli passi, un solo parametro per volta. Dopo ogni passo, test breve e poi gioco reale.
4. **Memoria**: separata dal core. Se il punteggio sale ma il frame time peggiora, la memoria può correggere o ritrasmettere dati: torna indietro.
5. **Undervolt**: se vuoi efficienza, lavora sulla curva a una tensione target; non sommare offset core, undervolt e power limit nello stesso passaggio.
6. **Validazione**: giochi diversi, scene con shader compilation, transizioni, menu, idle. Un benchmark breve non basta.

**Segnali di instabilità GPU:** artefatti, flicker, texture corrotte, driver che si resetta (TDR), crash, schermo nero, ventole a fondo scala, frame time che peggiora nonostante clock più alto. Se compare uno di questi segnali, torna indietro e riprova: non “salvare” il profilo sperando che sia stabile.

### 6.4 Alimentazione e connettore

La RTX 5090 ha un TGP di 575 W e NVIDIA raccomanda un alimentatore da 1000 W, con cavo 12V-2x6 nativo o adattatore a quattro PCIe 8-pin [17]. Non è una raccomandazione valida per ogni scheda, ma mostra perché l'alimentazione è parte dell'overclock:

- usa cavi dedicati, non daisy-chain, quando il produttore lo richiede;
- inserisci il connettore fino in fondo, senza pieghe strette;
- non collegare/scollegare il connettore sotto carico;
- verifica che la PSU abbia margine per i transienti, non solo per la potenza media;
- se la scheda ha sensori per-pin, controllali dopo un carico sostenuto.

Un overclock GPU che supera il budget della PSU può sembrare stabile in un benchmark e fallire in un gioco con transienti. La protezione dell'alimentatore non è un test di stabilità.

## 7. Protocollo di validazione: A–B–A, non “un test e via”

### 7.1 Una modifica per volta

Parti da **A** (baseline stabile), applica **B** (una sola modifica), testa, e torna ad **A** per verificare che il comportamento segua la modifica. Se non puoi tornare ad A, non hai un esperimento: hai una configurazione nuova.

Annota per ogni prova:

- data, temperatura ambiente, versione BIOS/driver;
- configurazione completa (non solo il valore cambiato);
- test, versione, durata, numero di cicli/pass;
- risultato: errori, WHEA, artefatti, crash, temperature, clock effettivi, punteggio, 1% lows;
- cosa hai ripristinato e come.

### 7.2 Matrice minima

| Area | Prova breve | Prova più lunga | Cosa guardare |
|---|---|---|---|
| CPU | Cinebench/y-cruncher/OCCT CPU, 10–20 min | 1–2 h di carichi misti, se sorvegliata | WHEA, clock effettivi, temperatura, tensione sotto carico |
| RAM | TM5 3 cicli o y-cruncher VT3 | più cicli/pattern, test a caldo, cold boot | errori, temperatura RAM, training, sospensione |
| GPU | 3DMark/gioco, 10–20 min | 1 h di giochi diversi + OCCT VRAM | artefatti, TDR, clock, potenza, hotspot/VRAM |
| Sistema | gioco + Discord/OBS/browser | uso reale per alcuni giorni | frame time, stutter, crash, audio, rete |

Le durate sono **orientative**, non certificazioni. Una prova breve serve a scartare subito i profili palesemente instabili; una prova lunga serve a cercare errori tardivi. Nessuna delle due copre ogni workload.

### 7.3 I test che la comunità usa, e perché

- **Cinebench** è utile come termometro e per confrontare la CPU, ma non è un test di stabilità definitivo.
- **y-cruncher** stressa calcolo, cache e IMC con pattern diversi; è apprezzato per scoprire instabilità che altri test non vedono.
- **OCCT** offre carichi separati e rilevamento errori; le opzioni vanno lette nella versione installata.
- **TestMem5** con config anta777 è un punto di riferimento per la RAM, ma richiede configurazioni e cicli adeguati.
- **Karhu** è usato per coverage elevata e carichi sostenuti.
- **3DMark** è utile per confronti GPU, non per certificare stabilità.
- **Giochi reali** sono indispensabili: shader compilation, streaming e transizioni non si riproducono in un benchmark sintetico.

La [guida alle misure](12-misure-verifica.md) spiega come leggere frame time e presentazione con PresentMon/CapFrameX [22]; un test di stabilità non risponde alla domanda “il gioco è più fluido?”.

## 8. OCCT: prima la domanda, poi il test

**OCCT** controlla risultati di calcoli e trasferimenti sotto carichi scelti: non è un certificatore universale del PC [15]. Scaricalo soltanto dal produttore e scegli un'edizione con licenza adatta all'uso. **Personal non autorizza attività professionali/commerciali**: un menu che propone quella versione non modifica la licenza.

Le schermate ufficiali usate dal progetto mostrano l'interfaccia **v13**; la pagina download della precedente verifica indicava **17.1.7**. Non sono una cattura della GUI corrente installata. Il manuale contiene riferimenti di release diverse: controlli, disponibilità, limiti di durata e report vanno verificati per la versione/edizione effettiva.

**Salva il lavoro e resta presente.** CPU, RAM e GPU possono essere saturate; il sistema può scaldarsi, bloccarsi o riavviarsi. Chiudi documenti e applicazioni non necessarie. Nessun test pesante incustodito o notturno è richiesto qui.

### 8.1 Separare i carichi

| Domanda | Prova pertinente | Limite dell'attribuzione |
|---|---|---|
| Il percorso memoria mantiene dati corretti sotto carico? | **Memory**, da sola. | Sollecita RAM e IMC: errore non significa automaticamente modulo guasto. |
| Calcolo e trasferimenti CPU/RAM sono regolari? | **CPU + RAM**, in una sessione distinta. | Coinvolge più parti, inclusa alimentazione: non localizza da sola il guasto. |
| La CPU presenta errori in un carico più mirato? | **CPU**, se necessario e documentato dalla versione. | Un core indicato non è una diagnosi completa; serve confronto della configurazione. |
| Il problema compare sulla grafica? | **3D** con rilevamento errori e, separatamente, **VRAM**. | Test 3D e memoria video cercano condizioni diverse; zero errori non copre ogni uso. |

Se inizi da memoria, seleziona Memory e non avviare insieme uno stress GPU o un secondo checker. Dopo la prova lascia scendere le temperature e registra i risultati prima di cambiare carico. **Power non è la prima prova**: combina carichi importanti su CPU/GPU e può provocare un riavvio improvviso; non è un requisito di questo percorso.

### 8.2 Memory: opzioni che contano

Il manuale distingue tre **Test type** [15]:

- **Legacy**: test memoria storico, utile per una prima prova senza costruire sequenze.
- **Presets**: sequenza inclusa; registra nome e versione, perché “ho fatto Memory” non rende la prova ripetibile.
- **Custom**: sequenza di blocchi costruita/importata. Non è automaticamente “più approfondito”; i blocchi che scrivono e verificano dati devono rispettare un ordine e includere i controlli previsti.

I blocchi **All-In-One**, come Legacy Test, includono scrittura, trasformazione e verifica: i loro dati non vanno controllati con un Check separato né trasformati con un blocco idempotente. Non costruire una sequenza senza verificarne le regole nel manuale.

La voce **Memory** può esprimere quantità in percentuale o **MiB**. La percentuale si riferisce alla memoria libera, non automaticamente alla capacità totale. L'80% è un default della versione descritta, non un valore obbligatorio. Lascia margine per Windows, OCCT, monitoraggio e driver; non portare tutto al 100% della memoria libera. Se compaiono pressione di memoria e paging intenso, ferma o riduci l'allocazione.

**Instruction set** sceglie le istruzioni CPU (SSE, AVX, Auto). SSE e AVX non sono etichette di sicurezza; Auto non significa carico leggero. **Threads** decide quanti thread lavorano: Auto usa i processori disponibili; un numero fisso abilita il conteggio. Registra i valori effettivi.

### 8.3 CPU + RAM: non copiare il pannello come preset

| Controllo | Significato documentato | Come usarlo |
|---|---|---|
| **Data set** | Large insiste sui trasferimenti CPU/RAM; Medium usa insiemi più piccoli e più grandi. | Registra il dataset; non attribuire il guasto dal nome. |
| **Mode** | Normal dedica più lavoro al controllo errori; Extreme privilegia potenza/temperatura. | Normal è un punto iniziale ragionevole, non innocuo. |
| **Load type** | Variable cambia operandi in cicli; Steady mantiene un carico costante. | Scegli in base alla domanda; una prova breve può non coprire un ciclo. |
| **Instruction set** | Auto può scegliere AVX più alto disponibile; SSE/AVX2/AVX512 dipendono dalla CPU. | L'Auto qui non è l'Auto di Memory. |
| **Start at cycle** | Sceglie il ciclo/insieme di operandi iniziale, non la durata totale. | Lascia il primo se non stai riproducendo un ciclo già individuato. |
| **Thread settings** | Auto fissa affinità; Fixed usa il numero scelto; Core cycling gestisce i core. | Registra scelta e numero; non cambiare più opzioni nella stessa prova. |

Con Auto il programma può riferire un errore al core di esecuzione; con Fixed quell'attribuzione non è equivalente. Neppure il core indicato prova che il core fisico sia guasto.

### 8.4 Sicurezza e risultato

Prima di Start prepara una scheda della prova: configurazione, versione/edizione OCCT, test, tutte le opzioni, quantità memoria, temperatura iniziale, durata prevista e sensori osservati. Non basta uno screenshot del contatore finale.

1. **Imposta una durata finita.** Una prima finestra sorvegliata di 5–10 minuti controlla risposta, errori immediati e andamento termico. Se regolare, una nuova sessione più lunga cerca errori tardivi. Non sono durate certificate.
2. **Apri Settings → Security.** Abilita **Stop on error** e **Stop on WHEA error** se pertinenti; verifica il rilevamento errori del test.
3. **Valuta Critical temperature.** Anche questo arresto può essere disabilitato per default. Quando attivo confronta la soglia con **qualsiasi sensore di temperatura abilitato in OCCT**. Un sensore escluso non partecipa.
4. **Azzera le statistiche e annota l'orario.** Avvia il solo carico scelto; controlla che timer e sensori rispondano.
5. **Segui l'andamento, non solo il picco.** Ferma al primo errore, nuovo WHEA, comportamento anomalo o temperatura prossima al limite.
6. **Salva prima della prova successiva.** Conserva log, report, opzioni, durata effettiva e dati sensori.

Gli arresti software non proteggono da ogni blocco o riavvio. Se il sistema si blocca e non salva il report, conserva orario e condizioni: non ripetere automaticamente lo stesso carico più aggressivo. **Stop on error** non è sempre attivo: senza quell'opzione OCCT può continuare e produrre un report incompleto. Guarda l'esito, non soltanto la fine del timer; un test interrotto non è un pass.

Per la CPU, una sessione sorvegliata di 30–60 minuti è un punto di partenza per un sospetto di instabilità, non una certificazione; test più lunghi richiedono presenza e margini termici. Un test completato senza errori non esclude un guasto intermittente, un errore di storage o un difetto che si manifesta solo in gioco.

### 8.5 GPU e VRAM

Per una sessione GPU seleziona la scheda corretta, abilita il rilevamento errori previsto e parti da intensità contenuta. Nel 3D Adaptive documentato, **Steady** mantiene l'intensità costante, **Variable** la varia gradualmente e **Switch** introduce transitori: intensità non equivale alla percentuale d'uso letta dalla GPU. Per VRAM lascia spazio a desktop e altri usi della memoria video; non trasferire le opzioni Memory alla grafica.

Un controllo sorvegliato di 5–10 minuti e un'eventuale nuova sessione indicativa di 20–30 minuti sono tappe prudenti di osservazione, non prescrizioni del produttore né certificazioni. Un test 3D non prova la stabilità della memoria video e un test VRAM non prova la stabilità del core grafico.

## 9. MemTest86, WHEA e lettura dei sensori

### 9.1 MemTest86

**MemTest86 di PassMark** è un percorso complementare fuori dal sistema operativo [21]. Non è LatencyMon, non misura DPC e non va confuso con Memtest86+, progetto distinto. Prepara una USB dedicata senza dati da conservare, avvia dal menu temporaneo di boot e non disattivare protezioni alla cieca. Verifica che la modalità di avvio e Secure Boot corrispondano alle istruzioni della release; non cambiare controller o timing tra una sessione e l'altra. Registra versione, test/passaggi e durata; zero errori è un'evidenza aggiuntiva, non una garanzia contro instabilità sotto altri carichi. Al termine rimuovi la USB e ripristina l'ordine di boot.

### 9.2 WHEA

**WHEA**, Windows Hardware Error Architecture, raccoglie segnalazioni hardware della piattaforma. I record possono contenere dati relativi a CPU, memoria, PCIe e altre sezioni [20]. Non sono sinonimo di hard pagefault e non vanno ridotti a “driver andato in crash”.

Apri **Visualizzatore eventi → Registri di Windows → Sistema → Filtra registro corrente**, seleziona l'origine **WHEA-Logger** e l'intervallo della prova. Annota orario, ID, messaggio e dettagli; conserva o esporta gli eventi pertinenti senza cancellare il registro. «Corretto» non significa da ignorare, ma un evento isolato non identifica da solo il pezzo da sostituire. L'assenza di WHEA dopo una prova breve non dimostra che la macchina sia stabile in ogni condizione.

### 9.3 HWiNFO

Apri **HWiNFO** dalla fonte ufficiale in modalità sensori e lascia assestare il sistema a riposo [16]. Le colonne hanno ruoli distinti: **Current**, **Minimum/Maximum** e **Average**. Azzera le statistiche subito prima del singolo carico; un massimo rimasto da una sessione precedente non descrive la prova nuova.

Se disponibili, aggiungi **Effective Clock** e **Clock Stretching**. Il clock nominale non prova che il core completi lavoro: l'Effective Clock riflette il tempo effettivamente produttivo e lo stretching segnala cicli di attesa. A riposo possono essere normali; leggili sotto lo stesso carico. Salva un CSV separato per ogni prova e annota l'intervallo di campionamento.

Guarda CPU package/core, GPU, hotspot, memoria video (se disponibile), potenza e indicatori di limitazione. Hotspot e temperatura GPU generale non sono la stessa misura. Il **throttling termico** riduce frequenze per rispettare limiti; un limite di potenza può ridurre il boost anche con temperature moderate. Un indicatore di limite non dimostra da solo un guasto.

## 10. Che cosa dicono community e pro, e che cosa adottiamo

Le impostazioni dei pro e dei tweaker sono utili come **inventario di ipotesi**, non come benchmark controllato. Cambiano con gioco, patch, monitor, sensibilità, sample e periodo. Le ho confrontate con specifiche, recensioni e test comunitari; quando una raccomandazione non è verificabile o è troppo rischiosa, la guida adotta la versione più conservativa.

| Affermazione diffusa | Cosa c'è di vero | Verdetto |
|---|---|---|
| “PBO e Curve Optimizer -30 sono il setup giusto per 9800X3D” | Il CO è sample-specific; un sample review ha trovato -20 stabile e -25 no [8]. | Parti da un offset piccolo, testa per core, non copiare -30. |
| “DDR5-6400 CL30 è sempre meglio di 6000 CL30 su AM5” | 6400 può richiedere 2:1 o tensioni che peggiorano la latenza; 6000 1:1 è spesso più equilibrato, ma non universale. | Confronta 1:1, FCLK e frame time; non solo la frequenza. |
| “tREFI al massimo è gratis” | Riduce la latenza media, ma aumenta la sensibilità al calore e può creare errori tardivi. | Testa a caldo e a lungo; se non guadagni nel workload, lascia perdere. |
| “LLC al massimo tiene la tensione” | Riduce il vdroop, ma può causare overshoot e mascherare problemi. | Usa un LLC moderato e misura sotto carico. |
| “GPU +1500 MHz di memoria è sempre meglio” | La correzione errori può nascondere instabilità; il guadagno dipende dal modello [19]. | Verifica frame time e artefatti, non solo il punteggio. |
| “8 kHz di polling riduce sempre l'input lag” | Dipende da CPU, gioco, controller USB e stabilità del polling; 2 kHz può essere più affidabile su alcuni sistemi. | Trattalo come esperimento misurato, non come upgrade garantito. Vedi [guida input](07-input-usb.md). |
| “Un'ora di stress test = stabile” | Copre solo quella combinazione di carico, durata e temperatura. | Aggiungi pattern diversi, cold boot, sleep e uso reale. |
| “XMP/EXPO è stock” | È un profilo di overclock validato dal produttore del kit, non una garanzia sul tuo IMC [6][7]. | Trattalo come B, non come A. |
| “Più tensione = più stabile” | Oltre il punto ottimale aumentano calore, corrente e degradazione. | Cerca il minimo stabile, non il massimo tollerato. |
| “Il delid risolve le temperature” | Può ridurre la temperatura, ma introduce rischio meccanico e invalidazione. | Fuori dallo scopo di questa guida daily. |

## 11. Miti da chiudere

- **“Overclock = meno latenza”**: può aumentare gli FPS e i minimi, ma non riduce automaticamente il ritardo input→display. La latenza dipende anche da gioco, render queue, display e input.
- **“La RAM più veloce è sempre meglio”**: su AM5 la combinazione 1:1/FCLK può contare più della frequenza; su Intel conta la modalità Gear e il training.
- **“Un test passato certifica il PC”**: nessun test copre ogni workload, temperatura, driver o aggiornamento futuro.
- **“La CPU throttla solo se è troppo calda”**: può limitare per potenza, corrente o tempo, anche con temperature moderate.
- **“L'undervolt è sempre sicuro”**: è più sicuro di un overvoltage, ma un undervolt instabile può corrompere dati o causare crash. Va validato.
- **“La memoria GDDR corregge gli errori, quindi posso salire”**: la ECC GDDR7 è sempre attiva e corregge errori singoli, ma non rende sicuro un offset fuori specifica. Se il guadagno sparisce, stai generando lavoro di correzione o replay [24].
- **“Basta alzare il power limit”**: senza dissipatore, VRM e PSU adeguati ottieni più rumore e throttling, non più prestazioni.

## 12. Quando la base è abbastanza chiara per proseguire

L'esito utile non è “stabile per sempre”, ma un registro con configurazione, prove svolte, parametri, durate, sensori, errori e recupero. Se compare un errore, la priorità è risolverlo, non applicare timer o priorità. Se il problema rimasto è un click audio o un sospetto driver, passa alla [guida driver e LatencyMon](03-driver-latencymon.md). Se è regolarità dei frame, serve una misura di rendering. Non trasformare una prova riuscita in una promessa di minore latenza fisica.

## Fonti e limiti

1. AMD, [Ryzen Master User Guide — PBO e Curve Optimizer](https://docs.amd.com/r/en-US/68886-ryzen-master-user-guide/CPU). Definizioni di PPT, TDC, EDC, Boost Override, Scalar e Curve Optimizer; disponibilità per modello.
2. AMD, [Ryzen 7 9800X3D](https://www.amd.com/en/products/processors/desktops/ryzen/9000-series/amd-ryzen-7-9800x3d.html) e [Ryzen 9 9950X3D](https://www.amd.com/en/products/processors/desktops/ryzen/9000-series/amd-ryzen-9-9950x3d.html). Specifiche, PBO, EXPO e CO dichiarati; nessun valore di tensione o overclock locale.
3. AMD, [Ryzen Master](https://www.amd.com/en/products/software/ryzen-master.html), note su garanzia e overclock (GD-26, GD-135). PBO è overclock e può invalidare la garanzia.
4. Intel, [How to Overclock Your Unlocked Intel Core Ultra Processor](https://www.intel.com/content/www/us/en/gaming/resources/how-to-overclock.html). Baseline, incrementi, tensione, temperature e avvertenze; guida generale, non specifica per ogni SKU.
5. Intel, [Core Ultra 200S datasheet — power specifications](https://edc.intel.com/content/www/us/en/design/products/platforms/details/arrow-lake-s/core-ultra-200s-series-processors-datasheet-volume-1-of-2/processor-line-thermal-and-power-specifications). PL1/PL2/Tau per configurazioni 125 W/65 W/35 W; i valori del BIOS possono differire.
6. Intel, [XMP](https://www.intel.com/content/www/us/en/gaming/extreme-memory-profile-xmp.html). XMP è overclock di memoria; note su garanzia e profili DDR5.
7. JEDEC, [DDR5 SDRAM Standard JESD79-5D](https://www.jedec.org/standards-documents/docs/jesd79-5d). Standard DDR5; non contiene consigli di overclock.
8. TechPowerUp, [Ryzen 7 9800X3D — Overclocking](https://www.techpowerup.com/review/amd-ryzen-7-9800x3d/26.html). Un sample: 5,3 GHz all-core a 1,35 V, PBO -20 stabile, 6200 1:1 a ~1,23 V SoC, 6400 a 1,3 V instabile. Non trasferibile.
9. Overclock.net, [Zen 5 X3D Owners Club](https://www.overclock.net/threads/official-zen-5-x3d-owners-club-9800x3d-9900x3d-9950x3d.1812505/) e [Curve Optimizer tips](https://www.overclock.net/threads/9800x3d-curve-optimizer-tips.1814218). Esperienze community su CO, per-core, eCLK e tensioni; non benchmark controllati.
10. Overclock.net, [AMD Hynix DDR5 Overclocking Guide](https://www.overclock.net/threads/amd-hynix-ddr5-overclocking-guide.1801842). Metodo incrementale sui timing, Karhu/TM5, tREFI; dati di comunità, non universali.
11. Reddit r/overclocking, [AM5 DDR5 tuning cheat sheet](https://www.reddit.com/r/overclocking/comments/1k3o7qe/am5_ddr5_tuning_cheat_sheet_observations_and_notes/). Raccolta di pratiche AM5; da verificare sul proprio sample.
12. TestMem5, [release ufficiali](https://github.com/TestMem5/.github/releases) e [config anta777](https://github.com/TestMem5-Config). Tool e config di comunità; verificare provenienza e integrità.
13. y-cruncher, [sito ufficiale](https://www.numberworld.org/y-cruncher/). Test CPU/IMC; non è un certificatore universale.
14. Karhu Software, [RAM Test](https://www.karhusoftware.com/ramtest/index.html). Test memoria a pagamento; licenza e risultati dipendono dalla versione.
15. OCBASE, [manuale OCCT](https://www.ocbase.com/support) e [OCCT](https://www.ocbase.com/). Opzioni documentali; la GUI e le durate cambiano per release/edizione.
16. HWiNFO, [sito ufficiale](https://www.hwinfo.com/). Sensori e nomi dipendono da hardware/versione.
17. NVIDIA, [RTX 5090 specifications](https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5090/) e [user guide](https://www.nvidia.com/content/geforce-gtx/GeForce_RTX_5090_User_Guide_Rev1.pdf). TGP 575 W, PSU consigliata 1000 W, connettore 12V-2x6.
18. ASUS ROG, [Undervolting ROG Astral OC RTX 5090](https://rog-forum.asus.com/t5/push-the-limits/power-meets-precision-undervolting-your-rog-astral-oc-rtx-5090/ba-p/1093066). Un sample: ~2.902 MHz a 950 mV, ~10 °C in meno, 1–3 FPS di differenza; non trasferibile.
19. TechPowerUp, [ASUS RTX 5090 TUF — Overclocking & Power Limits](https://www.techpowerup.com/review/asus-geforce-rtx-5090-tuf/41.html). Offset memoria +375 MHz su più sample, power limit 575/600 W; risultati di recensione.
20. Microsoft Learn, [WHEA Error Records](https://learn.microsoft.com/en-us/windows-hardware/drivers/whea/error-records). Struttura e significato dei record; non è una diagnosi automatica.
21. PassMark, [MemTest86](https://www.memtest86.com/). Test fuori da Windows; richiede USB dedicata e istruzioni della release.
22. PresentMon/CapFrameX e la [guida alle misure](12-misure-verifica.md) del progetto. Strumenti per frame time e presentazione; non misurano la latenza fisica input→display.
23. AMD, [EXPO Technology](https://www.amd.com/en/products/processors/technologies/expo.html). Profili di memoria overclock per AM5; la compatibilità con il singolo kit va verificata.
24. NVIDIA, [RTX Blackwell PRO GPU Architecture](https://www.nvidia.com/content/dam/en-zz/Solutions/design-visualization/quadro-product-literature/pdf/NVIDIA-RTX-Blackwell-PRO-GPU-Architecture-v1_1.pdf). ECC GDDR7 integrata e sempre attiva sulle GeForce RTX con GDDR7, correzione single-bit ed EDR; documento architetturale, non una guida di overclock.

I tempi proposti sono tappe indicative di una prova sorvegliata, non soglie scientifiche di certificazione. Le fonti di comunità sono esperienze condivise, non studi controllati; le recensioni descrivono sample specifici. Questa versione Markdown non incorpora nuove figure né risolve i permessi di riuso. Nessun software di stress può promettere protezione da tutti i guasti o un recupero automatico.
