# Driver e LatencyMon: dal sintomo a una verifica utile

Un nome di driver in cima a una tabella non è ancora una diagnosi. Può identificare il componente coinvolto, oppure una parte di Windows che lavora per dispositivi e filtri diversi. Questa guida unisce due operazioni che devono rimanere collegate: conoscere e recuperare i driver effettivamente usati dal PC e raccogliere indizi senza trasformarli in un verdetto di “input lag”.

La stessa indagine deve considerare la **topologia USB/PCIe**: due periferiche su porte diverse possono condividere lo stesso controller, e una scheda aggiuntiva può sembrare “diretta alla CPU” pur passando da un bridge. Una parte di questa guida è dedicata proprio a quel percorso, perché un nome di driver non basta a spiegare tutti i sintomi.

Puoi usarla dopo una reinstallazione, ma anche su un sistema già funzionante. Non richiede una pulizia generale: aggiornare un driver, tornare a quello precedente e non cambiare nulla sono tutte scelte possibili, secondo il problema. Il riferimento è Windows 11 25H2/26H2; versioni future, GUI, hardware e anti-cheat non vengono certificati in anticipo. Nessuna pulizia driver, nuova raccolta LatencyMon o procedura operativa è stata eseguita per questa stesura.

## Stabilire che cosa non funziona

Inizia da un sintomo osservabile. Per esempio: «la voce si interrompe durante il trasferimento di un file», oppure «il gioco scatta quando apro l'overlay». Annota applicazioni, scena, periferiche, frequenza e durata. Un crash, un click audio, un frame lento e un ping alto non sono la stessa cosa.

Il **frame time** riguarda il ritmo dei frame nella metrica raccolta; il **RTT**, round-trip time, è il tempo di andata e ritorno di una comunicazione di rete. La latenza fisica input→fotone comprende invece l'intero percorso fino al display. LatencyMon non misura né RTT né quel percorso fisico. Se compaiono errori di calcolo o segnalazioni WHEA (Windows Hardware Error Architecture) ripetute a configurazione standard, affronta prima la [stabilità](02-stabilita-occt.md), non il colore di un riepilogo.

Ricostruisci anche quando è iniziato il problema: nuovo driver, aggiornamento Windows, periferica, firmware o applicazione. La coincidenza suggerisce un'ipotesi, non prova il responsabile. Evita di aggiornare cinque componenti prima della prima raccolta: perderesti la possibilità di capire quale abbia cambiato il comportamento.

## Identificare il driver e preparare il ritorno

### Dispositivo, pacchetto e versione caricata

Apri **Gestione dispositivi**, poi **Proprietà** del componente. In Generale registra stato e codice d'errore; in **Dettagli → ID hardware** conserva gli identificativi pertinenti. Gli **Hardware ID** servono al matching, cioè a scegliere pacchetti compatibili: PCI usa campi come `VEN`, `DEV`, `SUBSYS`; USB normalmente `VID`, `PID`. Non sono la stessa cosa del percorso dell'istanza del singolo dispositivo [1].

Nella scheda **Driver** annota fornitore, data e versione; in Dettagli cerca anche il nome INF quando disponibile. Il file `.inf` descrive un pacchetto/installazione, mentre un `.sys` è un componente driver: nome del pacchetto, numero di release dell'installer e versione del singolo componente possono differire. Registra inoltre modello completo, build Windows e architettura.

Per notebook e preassemblati parti dal supporto **OEM del modello esatto**. Grafica ibrida, audio, touchpad, alimentazione ed estensioni possono richiedere componenti assenti nel pacchetto generico. Per componenti standard valuta il produttore, leggendo compatibilità e note della release. La data più recente non dimostra minore latenza; gli aggiornamenti facoltativi di Windows Update non sono una lista da applicare tutta. Anche una firma valida non garantisce tutte le funzioni OEM.

### Il backup deve esistere prima della modifica

Salva dati e profili, conserva localmente l'installer scelto e quello precedente e prepara l'accesso al recupero Windows. Se usi Protezione sistema, verifica che il punto di ripristino sia stato creato: non è un backup completo. Per un'operazione che comporta recupero/riavvio prepara anche chiave BitLocker e password dell'account, disponibili senza quel PC.

Per inventariare ed esportare pacchetti INF di terze parti puoi usare **PnPUtil**, incluso in Windows [2]. Crea prima una cartella su un supporto adatto: nell'esempio `E:\Backup-driver` deve essere un percorso reale sotto il tuo controllo, non una lettera da copiare senza verifica. Da Prompt eseguito come amministratore:

```text
pnputil /enum-drivers
pnputil /export-driver * "E:\Backup-driver"
```

Controlla l'esito e i file prodotti. L'export conserva i pacchetti disponibili di terze parti, non tutti i driver inbox di Windows, suite OEM, profili, applicazioni, pannelli o firmware. Una lista o un CSV non sono i file necessari per reinstallare.

Il ritorno più semplice è **Proprietà → Driver → Ripristina driver**, quando disponibile, oppure l'installer precedente già conservato. Riavvia se richiesto e controlla **la versione realmente associata** e la funzione. Aggiungere un INF allo store non garantisce che Windows lo selezioni: PnPUtil non forza automaticamente un driver con ranking inferiore [2].

Il **Driver Store** è l'archivio dei pacchetti disponibili. Non è la lista dei soli moduli in esecuzione. Un vecchio pacchetto non caricato non produce DPC semplicemente perché occupa spazio. Recupero e liberazione di spazio sono obiettivi diversi dalla latenza.

## Tre strumenti, tre compiti diversi

### DDU: una pulizia motivata, non manutenzione di routine

**Display Driver Uninstaller**, DDU di Wagnardsoft, rimuove driver grafici e residui quando la disinstallazione normale fallisce o serve una pulizia approfondita [3]. Non va usato a ogni aggiornamento, né perché LatencyMon ha mostrato `dxgkrnl.sys`. Controlla la versione e i dispositivi supportati: la procedura grafica non autorizza pulizie di audio, chipset o storage.

**Prima di entrare nel recupero:** conserva DDU della fonte ufficiale, installer corretto e precedente, dati e profili. Su notebook ibridi identifica quale GPU stai trattando e l'ordine OEM: non rimuovere automaticamente entrambi i produttori. Se la cifratura è attiva, verifica accesso alla **chiave di recupero BitLocker**, custodita in modo sicuro e non pubblicata. Se manca, fermati [4].

1. **Evita installazioni concorrenti.** Completa aggiornamenti già in corso, chiudi le applicazioni e scollega temporaneamente Internet: Ethernet staccata e Wi-Fi disconnesso, senza riconnessione automatica durante il percorso. Questo evita un download driver mentre lo rimuovi; non serve spegnere Defender, firewall, Windows Update o impostare policy permanenti.
2. **Usa la modalità provvisoria temporanea di Windows.** Apri **Impostazioni → Sistema → Ripristino → Avvio avanzato → Riavvia ora**. Nel recupero scegli **Risoluzione dei problemi → Opzioni avanzate → Impostazioni di avvio → Riavvia**, poi **4/F4** per la modalità provvisoria senza rete [4]. Prepara la password: PIN e biometria possono non essere disponibili. Non impostare un avvio sicuro persistente in `msconfig` e non cambiare BCD.
3. **Controlla il bersaglio in DDU.** In modalità provvisoria seleziona tipo dispositivo e produttore corretti. Per reinstallare sulla stessa macchina usa la pulizia con **riavvio**. L'opzione con **spegnimento** riguarda il percorso di sostituzione fisica della GPU. Non aggiungere pulizie di altri componenti e non interrompere l'operazione.
4. **Reinstalla offline in Windows normale.** Esegui l'installer preparato, rispetta i riavvii e controlla versione, monitor, refresh, audio HDMI/DisplayPort e funzioni OEM.
5. **Ricollega la rete e verifica ancora.** Se Windows Update interviene, controlla nuovamente la versione effettiva. Riproduci il sintomo nelle condizioni iniziali: un'installazione conclusa non equivale a problema risolto.

Dopo la rimozione può comparire una risoluzione ridotta per il driver video di base: non prova un guasto, ma neppure la riuscita completa del percorso. **DDU non offre un Undo che ricostruisca tutto.** Per recuperare può servire reinstallare il pacchetto conservato e ricreare profili. Se non rientri in Windows normale, usa il recupero documentato/assistenza; non concatenare altre cancellazioni o modifiche al boot.

### Driver Store Explorer/RAPR: vedere ed esportare

**Driver Store Explorer**, RAPR del repository `lostindark`, è uno strumento avanzato per il Driver Store [5]. In questa guida il suo ruolo è inventario e backup, non cancellazione generale.

Scarica l'archivio dalle release ufficiali, estrailo e avvia `Rapr.exe` con i privilegi richiesti. Confronta classe, fornitore, data, versione e nome pubblicato `oem*.inf` con Gestione dispositivi. Quel nome è locale al PC: `oem42.inf` non identifica universalmente lo stesso pacchetto su tutte le macchine.

Seleziona i pacchetti pertinenti ed esportali in una cartella separata; per un inventario più ampio puoi esportare quelli disponibili. Verifica il log e il contenuto esportato e conserva comunque gli installer OEM. L'export CSV salva metadati, non sostituisce l'export dei pacchetti.

**Select Old Driver(s)** prepara una selezione da riesaminare, non un ordine di eliminazione. Un dispositivo scollegato può tornare utile; una versione precedente può essere proprio il rollback che ti serve. Due versioni nello store non significano due driver contemporaneamente impegnati a generare DPC.

**Non usare Force Deletion in questo percorso.** Eliminare pacchetti in uso può togliere funzioni o impedire l'avvio. Storage, controller di boot, chipset e ACPI non sono bersagli di pulizia. Anche un export riuscito non rende innocua la rimozione: il recupero potrebbe richiedere un ambiente esterno e competenza specifica. Se l'obiettivo è recuperare spazio, trattalo separatamente, senza promettere input lag inferiore.

### SDIO Origin: un candidato selettivo per un driver mancante

**Snappy Driver Installer Origin**, SDIO di Glenn Delahoy, non è un generico “Snappy” o un downloader omonimo [6]. Parti dalla pagina ufficiale e dai link lì indicati per applicazione, sorgenti e driver pack. L'archivio dell'app non contiene necessariamente i pack: una copia offline richiede anche quelli pertinenti.

Usalo quando manca un driver e OEM/produttore non risolvono, non per aggiornare indiscriminatamente un sistema funzionante. Aggiorna gli indici per individuare candidati e scarica solo i pack necessari. Per un PC senza rete preparali su un'altra macchina prima: un'app vuota su USB non crea driver offline.

Confronta ogni proposta con Hardware ID, variante OEM, build Windows e architettura; leggi fornitore, versione, firma e provenienza. Matching automatico e firma valida non provano tutte le funzioni personalizzate. **Se l'origine o la compatibilità non sono chiare, non installare e non aggirare i controlli di sicurezza.**

Quando il backup e l'installer precedente sono pronti, seleziona un solo dispositivo per cui l'intervento sia motivato. Nessun “aggiorna tutto” né scripting automatico è richiesto. Riavvia quando previsto, controlla versione/stato in Gestione dispositivi e prova la funzione reale: rete, audio, sospensione o periferica. Se peggiora, usa il rollback disponibile o il pacchetto OEM conservato e ripeti la prova iniziale. SDIO non garantisce meno DPC o input lag.

## La topologia USB/PCIe: quando il driver non è il colpevole

Se il sintomo è «il mouse non registra il click mentre mi muovo» oppure «la tastiera perde input a 8 kHz», un nome di driver in cima a LatencyMon può essere un indizio, ma il problema può stare nel percorso fisico fra dispositivo e CPU. Windows vede **controller host, hub e porte**; non vede “il mouse” come un'entità isolata. Due periferiche collegate a porte diverse possono condividere lo stesso controller, e una scheda PCIe aggiuntiva può sembrare “diretta alla CPU” pur passando da un bridge.

Questa sezione spiega come leggere la topologia e come verificare le raccomandazioni più diffuse, senza trasformare un'ipotesi da forum in una diagnosi.

### Controller, hub e porte non sono la stessa cosa

Il percorso USB tipico è:

```text
dispositivo → hub (eventuale) → root hub → controller xHCI → PCIe → CPU
```

- Il **controller host** gestisce le transazioni USB e genera interrupt. Un controller può avere più porte e più hub sotto di sé.
- Il **root hub** è l'hub virtuale del controller; le porte fisiche vi sono collegate.
- Un **hub esterno** (front panel, dock, monitor USB, adattatore) aggiunge un livello e può condividere la banda e la gestione degli interrupt.
- Il **bridge PCIe** della scheda madre o di una scheda aggiuntiva introduce un ulteriore passaggio.

Una scheda madre desktop ha in genere **due o più controller**: uno o più nel chipset e, su alcune piattaforme, controller aggiuntivi. Le porte posteriori non sono tutte equivalenti: gruppi vicini possono appartenere allo stesso controller, mentre una porta frontale può passare da un header e da un hub interno. Il manuale della scheda madre e il block diagram sono più affidabili dei colori delle porte [18].

**CPU lanes e chipset:** una scheda PCIe inserita in uno slot collegato direttamente alla CPU evita il percorso attraverso il chipset, ma non elimina il bridge PCIe né il controller USB. Una scheda in uno slot x1 o in uno slot secondario passa spesso dal chipset, anche se il BIOS la descrive come “PCIe”. “CPU lanes” non significa automaticamente meno latenza per una periferica HID: significa un percorso diverso, che va misurato.

### Perché 8 kHz è diverso da 1 kHz

A **1000 Hz** il dispositivo invia un report ogni 1 ms. A **8000 Hz** lo invia ogni 0,125 ms, otto volte più spesso. Un report HID è piccolo: con report di 8–16 byte, 8000 report/s corrispondono a circa 64–128 KB/s, una frazione della banda di USB 2.0 [16]. Il problema non è quindi la banda, ma la **regolarità con cui il controller e il sistema servono i report**.

Se mouse, tastiera, audio e hub condividono lo stesso controller, il controller deve arbitrare più flussi. Questo può produrre jitter o report persi, soprattutto se il carico CPU o il driver non tengono il ritmo. Il fenomeno è reale, ma non universale: dipende da controller, firmware, driver, CPU, gioco e qualità del dispositivo. Le prove della comunità su controller xHCI mostrano differenze notevoli tra chip e driver, e una scheda PCIe non è automaticamente migliore di quella integrata [14][15].

Da qui nasce la raccomandazione “un dispositivo ad alto polling per controller”. È un'**euristica**, non una legge:

- può ridurre la contesa se il controller è il collo di bottiglia;
- non serve se il controller è già scarico o il problema è altrove;
- non garantisce che 8 kHz sia meglio di 2 kHz o 4 kHz nel tuo gioco;
- può peggiorare la situazione se la scheda aggiuntiva usa un bridge o un driver peggiore.

### Mappare le porte con USBView

**USBView** è lo strumento Microsoft che enumera controller, hub e dispositivi [12]. È un'applicazione di esempio del Windows SDK; la documentazione avverte che, essendo datata, può non mostrare tutte le informazioni dei dispositivi più recenti [12][13]. **USBTreeView** è un'alternativa diffusa, ma va scaricata dalla fonte ufficiale [17].

Procedura prudente:

1. Apri USBView (o USBTreeView) e osserva l'albero: ogni ramo principale è un controller/root hub.
2. In **Gestione dispositivi → Visualizza → Dispositivi per connessione** trova lo stesso dispositivo e il controller a cui è appeso.
3. Etichetta le porte fisiche posteriori e frontali. Scollega e ricollega **un solo dispositivo**, aggiorna l'albero e osserva dove compare.
4. Annota controller, hub e porta per mouse, tastiera, audio e hub.
5. Sposta **un solo dispositivo** su una porta di un altro controller e ripeti la prova A–B–A.
6. Se vuoi liberare un controller, disabilita solo dispositivi che sai di non usare (audio integrato, LED, Bluetooth) e conserva il modo per riattivarli. Non disabilitare il controller di avvio o l'USB necessario per comandare il PC.

USBView mostra la topologia, non la latenza. Una periferica può essere sola su un controller e avere comunque DPC alti per driver o firmware; un'altra può condividere un controller senza sintomi. La mappa serve a **formulare un'ipotesi**, non a chiudere la diagnosi.

### Schede PCIe USB: quattro porte non significano quattro controller

Una scheda PCIe-USB economica può avere quattro porte e **un solo controller**: tutte le porte condividono lo stesso root hub. Una scheda con quattro controller indipendenti espone invece quattro root hub separati. La differenza si vede in USBView, non nella foto del prodotto.

Quando valuti una scheda:

- verifica quanti **controller indipendenti** espone, non quante porte;
- controlla se le porte sono dietro un **hub/bridge** interno;
- verifica lo slot (CPU o chipset), la larghezza PCIe e l'alimentazione ausiliaria;
- usa un driver supportato e confronta Microsoft xHCI con l'eventuale driver del produttore;
- acquista da una fonte con reso, perché il comportamento varia per chip, firmware e scheda madre.

La banda PCIe non è il parametro principale per un mouse: anche PCIe x1 è ampia. Contano il controller, il driver, la gestione degli interrupt e la condivisione del percorso. Una scheda “10 Gbps” non è automaticamente più reattiva di una “5 Gbps” per una periferica HID.

### La trascrizione: che cosa confermare e che cosa correggere

La relazione tecnica diffusa nei video e nei forum contiene parti utili e alcune semplificazioni. Questa è la lettura adottata dalla guida:

| Affermazione | Valutazione |
|---|---|
| «Mouse e tastiera ad alto polling possono entrare in collisione sullo stesso controller» | **Plausibile e verificabile**: dipende da controller, driver, CPU e dispositivo. Va riprodotto con una prova A–B–A. |
| «Serve un controller separato per ogni dispositivo a 8 kHz» | **Euristica ragionevole**, non requisito. Può ridurre la contesa; non è detto che 8 kHz sia stabile o utile su ogni sistema. |
| «Mettere tutte le periferiche sulle CPU lanes risolve la latenza» | **Da dimostrare**: evita il chipset, ma aggiunge bridge PCIe e controller. Il guadagno dipende da scheda, slot e driver. |
| «La banda non conta, conta la latenza» | **In gran parte vero per HID**: 8 kHz genera pochi KB/s. Il problema è la regolarità degli interrupt e dei report, non la saturazione di USB 2.0 [16]. |
| «Una scheda con quattro controller indipendenti è la soluzione» | **Può aiutare** se i controller sono davvero indipendenti e il resto del sistema regge. Va verificata in USBView e con il sintomo reale. |
| «Thunderbolt bypassa il controller USB» | **Falso per un dispositivo USB**: un mouse USB collegato a Thunderbolt passa comunque da un controller USB. Solo un dispositivo Thunderbolt nativo evita quel percorso. |
| «Disabilitare audio integrato e LED nel BIOS libera risorse» | **Possibile**, se quei dispositivi sono inutilizzati e condividono il controller. Non è un tweak universale e va reversibile. |
| «USBView è vecchio ma funziona» | **Vero**, con il limite dichiarato da Microsoft: può non mostrare informazioni recenti [12]. |
| «2 kHz sono spesso meglio di 8 kHz» | **Opinione community plausibile** in alcuni giochi e sistemi, non una legge. Dipende da CPU, gioco, controller e refresh del monitor. |

### Come misurare senza ingannarsi

LatencyMon misura ISR/DPC e hard pagefault; **non misura la stabilità del polling** né il percorso input→display. Per verificare una modifica:

1. Registra la mappa delle porte e il dispositivo spostato.
2. Riproduci lo stesso scenario (gioco, sensibilità, polling, refresh, carico CPU).
3. Confronta **sintomo**, frame time e, se disponibile, un test di polling del mouse.
4. Controlla DPC/ISR nella stessa sessione, ma non usare un massimo isolato come prova.
5. Torna alla configurazione A e ripeti. Se il sintomo segue la porta, l'ipotesi guadagna forza.

Un DPC più basso senza riduzione del sintomo non è un risultato utile; un sintomo ridotto senza variazioni di DPC può comunque essere un risultato, se ripetibile. La [guida input e USB](07-input-usb.md) approfondisce polling, cavi, ricevitori e power management.

### Limiti

- La topologia varia per scheda madre, BIOS e revisione hardware; lo stesso nome di porta può cambiare significato su un'altra scheda.
- Windows può sospendere selettivamente le porte USB; disattivare il risparmio energetico **globalmente** non è una baseline e può aumentare consumi e calore.
- Una scheda PCIe USB può introdurre nuove instabilità, driver duplicati o problemi di alimentazione. Conserva la possibilità di rimuoverla.
- 8 kHz non è automaticamente “meglio”: su alcuni sistemi 2 kHz o 4 kHz sono più regolari. La scelta va misurata, non eletta a preset.

## Che cosa osserva LatencyMon

**LatencyMon di Resplendence** è orientato ai problemi di esecuzione dell'audio in tempo reale (real-time): click, interruzioni e attività che devono rispettare scadenze [7]. È utile anche come indizio durante altre indagini, ma non misura la latenza audio completa, il polling del mouse, il ping o click→fotone.

Un **interrupt** segnala un evento. La **ISR**, Interrupt Service Routine, gestisce la risposta immediata a priorità elevata; la **DPC**, Deferred Procedure Call, svolge una parte del lavoro differita. Sul processore interessato possono ritardare thread ordinari. Se un thread audio non prepara il buffer entro la scadenza, puoi sentire un dropout, cioè un'interruzione. Contano però anche buffer, carico applicativo e scheduling: non basta cercare il file `.sys` con il massimo più alto.

L'**interrupt-to-process latency** descrive il ritardo osservato dal monitor fra interrupt e possibilità di esecuzione del suo processo di misura. Non è la sola durata ISR/DPC e non copre la catena periferica→gioco→display.

**1000 µs = 1 ms.** Leggi l'unità di ogni campo/colonna: le schede possono mostrarne di diverse. Un massimo non è una media, un percentile o un ritardo inflitto a ogni frame. Non sommare massimi ISR, DPC e interrupt-to-process: possono provenire da eventi differenti. Non sottrarre medie di rendering per ricavare una coda da questi dati.

La documentazione d'uso dichiara arbitrari i criteri numerici del verdetto. Un buffer audio piccolo tollera meno ritardo di uno grande; non esiste un verde universale “ottimo per il gaming”. **Verde non certifica il PC; rosso non dimostra che ogni input sia lento** [7].

## Preparare due raccolte che rispondono a domande diverse

Annota versione LatencyMon, build Windows, BIOS, CPU/GPU/RAM, driver, alimentazione e piano energetico. Per l'audio aggiungi endpoint, driver, frequenza di campionamento, buffer e **routing**, cioè il percorso scelto fra applicazioni e dispositivi. Completa update e riavvii, lascia finire download/caricamenti iniziali e non cambiare tweak durante la raccolta.

### Baseline senza altre applicazioni

Le FAQ ufficiali raccomandano normalmente una prova **senza altri software in esecuzione**, perché la misura interrupt-to-process simula già il comportamento di un processo audio [8]. Chiudi gioco, **DAW** (applicazione di produzione audio), browser, overlay e monitoraggi non necessari; non disattivare sicurezza o servizi in blocco. Questa è la raccolta di riferimento (baseline) del monitor, non una riproduzione dell'intero uso quotidiano.

### Workload per riprodurre il problema

Se il sintomo compare solo con gioco, Discord, OBS o una DAW, prepara una **seconda raccolta distinta**. L'autore indica esplicitamente l'esecuzione del software audio per misurare i suoi hard pagefault. Per altri problemi sotto carico definisci una sequenza e annota, rispetto a Start, apertura app, ingresso nella scena, caricamenti e sintomi.

Non confrontare una sessione a riposo in A con un gioco diverso in B. Il massimo di una sessione e la comparsa di uno stutter non dimostrano, da soli, che i due eventi coincidano: il riepilogo non è una timeline.

### Opzioni e influenza del monitor

Nelle opzioni includi **tutti i processori** per una lettura completa. Conserva le impostazioni: le FAQ citano **Measure latency by means of a kernel timer**, **Measure SMI and CPU stalls** e **Perform CPU speed sanity check** come possibili contributi del monitor al lavoro osservato [8]. Se studi quella perturbazione, fai una prova separata e registra il cambio. Spegnerle per ottenere verde altera la prova, non risolve il sistema.

Se l'avvio è bloccato da protezioni o policy, conserva l'errore e verifica provenienza/requisiti: non aggirarle come passaggio standard. Se il problema scompare soltanto con LatencyMon aperto, registralo: il monitor può modificare il comportamento energetico e lo scheduling.

## Start, Stop, salvataggio e sessione nuova

1. **Avvia con Start** e controlla che timer e contatori avanzino. Una prima baseline di 5–10 minuti è orientativa; un problema raro richiede una finestra adeguata. Non paragonare un massimo di un minuto a uno di un'ora.
2. **Premi Stop** prima di leggere e ordinare le tabelle. Registra durata effettiva e sintomi. Se LatencyMon si ferma per perdita di eventi, la raccolta è incompleta: disabilitare l'arresto non ricostruisce gli eventi mancanti [8].
3. **Salva il report completo di Stats**, con la funzione disponibile nella versione oppure copiandone il testo in un file. Riaprilo per verificare che contenga il risultato. Aggiungi tabelle/schermate con intestazioni, unità e ordinamento visibili, non solo il commento verde/rosso.
4. **Dopo il salvataggio chiudi e riapri LatencyMon** per la prova nuova; controlla durata e statistiche azzerate. Non presumere che Stop seguito da Start sia un reset completo. Nei nomi dei file distingui baseline/workload, condizione, data e ripetizione.

Per interpretare, leggi tutte e cinque le schede: ognuna risponde a una domanda diversa.

## Main: che cosa riassume la sessione

**Main** mostra interrupt-to-process, massimi ISR/DPC e hard pagefault. Il modulo della routine più lunga è un candidato; il commento automatico orienta l'indagine audio, non localizza uno stutter del gioco. Risultati favorevoli possono convivere con saturazione CPU, buffer troppo piccoli o problemi di presentazione.

### Una cattura originale, non un benchmark

Il PNG originale conservato dal progetto [11] mostra **LatencyMon Home Edition v7.31**, una raccolta ancora attiva e una durata di **0:01:45**. I valori sono stati riletti nell'asset originale, senza nuova raccolta:

| Campo Main visibile | Valore originale |
|---|---|
| Current measured interrupt to process latency | **37.60 µs** |
| Highest measured interrupt to process latency | **148.80 µs** |
| Highest reported ISR routine execution time | **23.20 µs**, `Wdf01000.sys` |
| Highest reported DPC routine execution time | **143.070 µs**, `dxgkrnl.sys` |
| Reported total hard pagefault count | **679** |

La formattazione con punto decimale riproduce quella dell'applicazione. Current non è la media della sessione. Il verdetto visibile è favorevole all'audio real-time, ma mancano condizioni, scena, hardware e report completo: non è un confronto controllato e non consente una diagnosi del PC. Non sommare 23.20 e 143.070 al ritardo interrupt-to-process; non sono necessariamente fasi dello stesso evento. I 679 hard pagefault non indicano 679 errori della RAM, né dimostrano da soli memoria insufficiente.

Il [registro di provenienza del progetto](../analisi/REVISIONE-TEMATICA.md) documenta il recupero della cattura; questa guida non incorpora la figura e non presume risolti i diritti di pubblicazione. I numeri sono qui un esempio di lettura, non un obiettivo da raggiungere.

## Stats: massimo, conteggio e tempo totale

**Stats** riunisce informazioni di sistema, durata, massimi, categorie temporali e pagefault. Leggi separatamente:

- **massimo**, la durata della routine o dell'evento più lungo registrato;
- **conteggio**, quante chiamate o eventi sono stati registrati;
- **tempo totale**, lavoro accumulato durante il periodo.

Una routine lunga isolata e molte routine brevi pongono domande diverse. Un totale cresce anche perché osservi più a lungo; un massimo può crescere perché una sessione lunga offre più occasioni per un evento raro. Non confrontare totali di durate differenti come se fossero prestazioni; una normalizzazione non rende equivalenti una sessione a riposo (idle) e una di gioco.

Conserva il testo completo, anche le parti che non sembrano confermare la tua ipotesi. Il report aggregato è adatto a orientarsi, non a dimostrare l'ordine temporale fra routine e dropout.

## Drivers: ordinare prima di attribuire

In **Drivers**, a raccolta ferma, ordina prima per massimo di esecuzione e poi osserva tempo totale e conteggio. Leggi quali colonne riguardano ISR e quali DPC, con le rispettive unità. Conserva nome, versione e funzione del candidato.

Alcuni moduli appartengono a stack condivisi, cioè a percorsi con più componenti:

| Modulo | Indizio utile | Deduzione da evitare |
|---|---|---|
| `ndis.sys`, `tcpip.sys` | Percorso rete: adattatore, driver e filtri, traffico e workload. | “È sicuramente il Wi-Fi”: verifica prima con un confronto sicuro e mirato. |
| `Wdf01000.sys` | Framework dei driver: cerca il dispositivo/driver sottostante. | “È USB difettoso” o “va cancellato il framework”. |
| `dxgkrnl.sys` | Stack grafico Windows: driver GPU, scena, cattura e overlay. | “Serve DDU” senza sintomo/versione/prova. |
| `ACPI.sys` | Piattaforma, firmware ed energia: consulta OEM e condizioni. | Disabilitare ACPI per abbassare un massimo. |
| `storport.sys` | Percorso storage: controller, driver e I/O. | Rimuovere o disabilitare il controller di avvio. |

Un modulo specifico del produttore, per esempio NVIDIA o AMD, richiede comunque hardware, versione e sintomo verificati. **Non cancellare file `.sys` e non togliere componenti critici per migliorare la classifica.** Un pacchetto nello store e un modulo caricato non sono la stessa cosa: la pulizia RAPR non discende da questa tabella.

Una prova con una periferica non critica scollegata, un overlay opzionale chiuso o una versione driver supportata differente può aiutare. Se provi a disabilitare un dispositivo, prima identifica la funzione e il percorso alternativo; non usare questa tecnica su storage, controller di boot, ACPI o il solo dispositivo necessario per comandare il PC.

## CPUs: dove viene eseguito il lavoro

**CPUs** distribuisce tempi e conteggi per processore logico. Una concentrazione di interrupt può dipendere dall'organizzazione del driver e della piattaforma: non dimostra un core guasto né impone un'affinità nuova.

Core fisici, thread SMT e core di architetture ibride non sono intercambiabili. Escludere una CPU dal monitor nasconde parte del lavoro, non lo elimina. Non copiare maschere di affinità da altri processori o assegnare tutti gli interrupt “al core meno usato” sulla base di un riepilogo. Per stabilire un problema di scheduling occorrono dati temporali e una prova motivata, non soltanto la scheda CPUs.

## Processes: gli hard pagefault del processo interessato

Un **hard pagefault** richiede dati dallo storage perché la pagina non è disponibile in memoria fisica nel modo necessario. Il thread interessato attende il recupero. Può riguardare pagefile, eseguibili o file mappati: non significa RAM guasta e non prova da solo che la RAM sia poca [7, 9].

In **Processes**, dopo Stop, ordina per numero di hard pagefault e cerca l'applicazione pertinente. Molti fault all'avvio di un'app possono essere normali. Per collegarli a un'interruzione audio bisogna verificare che interessino il processo che produce audio **mentre lo sta producendo**, non solo nella stessa sessione.

Indaga pressione di memoria, caricamento librerie/contenuti e storage. Chiudere una sola app pesante o ripetere con contenuti già caricati può aiutare a distinguere le condizioni. Non ripulire continuamente cache e standby list: potresti ricreare proprio il lavoro che stai cercando di evitare.

La pagina d'uso Resplendence include anche la disattivazione del pagefile fra i rimedi possibili, avvertendo di esaurimento memoria e perdita dei dump. **Non viene adottata come baseline in questa guida.** Ridurrebbe la capacità di commit e non eliminerebbe i fault sui file mappati. Mantieni il paging gestito dal sistema, salvo un'esigenza specialistica documentata; per ripristinarlo usa **Impostazioni avanzate di sistema → Prestazioni → Impostazioni → Avanzate → Memoria virtuale → Cambia**, riattiva gestione automatica e riavvia se richiesto [9].

## Una sola modifica, poi confronto A–B–A

Una raccolta ha valore se ti aiuta a scegliere. Conserva configurazione e report **A**, poi applica in **B** una sola modifica motivata: una versione driver supportata, una periferica non critica scollegata, un'app opzionale chiusa oppure un buffer audio differente. Non sommare queste variabili.

Mantieni scena, durata, opzioni del monitor, alimentazione e preparazione uguali. Riavvia quando necessario. Per un driver controlla che sia davvero attiva la versione scelta; poi prova funzione e sintomo, non soltanto LatencyMon. Baseline e workload rimangono due serie distinte.

Quando è sicuro, torna ad **A** con il ritorno documentato e ripeti. Se il sintomo torna e una nuova B lo riduce ancora, l'ipotesi guadagna forza. Non reintrodurre un driver vulnerabile, un'instabilità o una situazione pericolosa per completare lo schema. Cache, temperatura e variabilità restano possibili spiegazioni: cerca ripetizioni concordanti.

Un massimo più basso, senza una riduzione del sintomo, non è automaticamente un miglioramento utile. Se B elimina i click ma compromette la sospensione o il microfono, non è un risultato completo. Con un buffer più grande puoi guadagnare continuità ma anche aumentare l'attesa audio: descrivi il compromesso, non un vantaggio gratuito.

Per annullare torna alla versione, periferica, app o buffer annotati, con i riavvii richiesti e controllo delle funzioni. Non usare “ripristina tutti i default” per ricostruire uno stato che non hai salvato.

## Quando serve una timeline: WPR e WPA

LatencyMon raccoglie un campione finito e mostra soprattutto riepiloghi. Se devi collegare il problema a eventi nel tempo, considera **Windows Performance Recorder**, WPR, e **Windows Performance Analyzer**, WPA, del toolkit Microsoft, eventualmente con assistenza [10]. WPR registra eventi **ETW**, Event Tracing for Windows; WPA li presenta in timeline e tabelle.

Scegli un profilo pertinente alla domanda, una riproduzione breve e un percorso di destinazione con spazio sufficiente per il file. Annota l'istante del sintomo e conserva il contesto. Non ogni profilo raccoglie tutte le informazioni: scheduling, I/O, stack e simboli devono essere disponibili per l'analisi che vuoi fare. Qui non vengono prescritti comandi o profili universali né una nuova installazione del toolkit.

Nella medesima finestra temporale puoi esaminare DPC/ISR, CPU, scheduling e storage realmente raccolti. La coincidenza temporale restringe l'indagine, ma attribuzione e confronto restano necessari. Una traccia non autorizza automaticamente timer, priorità o affinità.

**Un file di traccia ETL non è anonimo.** Può contenere nomi, percorsi, processi e attività personali. Limita durata e attività riservate durante la raccolta, esamina report/schermate e condividi solo con destinatari affidabili. Non caricare tracce automaticamente in un canale pubblico. Per chiedere supporto sono utili hardware/versioni, sintomo, opzioni, durata, Stats completo, tabelle ordinate e confronto A–B–A; una sola schermata rossa senza contesto dice molto meno.

## Il pack Diagnostica non sostituisce LatencyMon

Il [pack PrimeBuild-Diagnostica v4 già presente](../discord-revisione-v5/pacchetti/PrimeBuild-Diagnostica-v4.zip) contiene letture di MMCSS, BCD, rete/QoS e inventario USB. È autonomo: non serve scaricare il pack completo First Setup. Il [README](../discord-revisione-v5/scripts/README.md) indica di estrarre tutto in una cartella nuova e usare il BAT, lasciando insieme i componenti interni. Sono sorgenti non firmati con collaudi funzionali ancora pendenti.

Le letture non sono benchmark, non cambiano quei parametri e non ripristinano presunti default. BCD legge `bcdedit /enum {current}` e richiede privilegi amministrativi: per quella lettura chiudi il BAT e riaprilo con **tasto destro → Esegui come amministratore**. Il menu non si eleva automaticamente; se mancano i privilegi, la lettura fallisce senza modificare BCD. USB è un inventario PnP, non la topologia completa di USBTreeView. Una lettura fallita può lasciare un report parziale: conserva il messaggio e non trattare il resto come completo. Non disattivare protezioni o policy gestite per far partire il pack.

Questo strumento non raccoglie le cinque schede LatencyMon, non esegue pulizie o installazioni driver tramite DDU/RAPR/SDIO e non annulla vecchi tweak MMCSS, timer o servizi. Prima di condividere il report, rimuovi gli identificativi personali; un inventario non diagnostica da solo il responsabile dello stutter. Il contratto è stato letto in sola lettura, non eseguito.

## Una conclusione proporzionata all'evidenza

Una diagnosi utile collega sintomo, configurazione, indizio, singola modifica e risultato ripetibile, includendo funzioni e recupero. Può concludere «il driver precedente riduce il problema in questa scena» senza promettere «tutti i driver nuovi hanno più latenza». Può anche concludere che i DPC osservati non spiegano il sintomo e che serve indagare rendering, audio applicativo o rete.

Conserva soltanto modifiche comprese, supportate e utili. Il traguardo non è il massimo più basso della classifica, ma meno problemi senza perdere stabilità, sicurezza e funzioni.

## Fonti e limiti

1. Microsoft Learn, [Hardware IDs](https://learn.microsoft.com/en-us/windows-hardware/drivers/install/hardware-ids).
2. Microsoft Learn, [PnPUtil Command Syntax](https://learn.microsoft.com/en-us/windows-hardware/drivers/devtest/pnputil-command-syntax).
3. Wagnardsoft, [DDU ufficiale](https://www.wagnardsoft.com/display-driver-uninstaller-ddu-). Scopo verificato nella documentazione; dispositivi/opzioni dipendono dalla release.
4. Microsoft Support, [chiave BitLocker](https://support.microsoft.com/en-us/windows/find-your-bitlocker-recovery-key-6b71ad27-0b89-ea08-f143-056f5ab347d6) e [Impostazioni di avvio](https://support.microsoft.com/en-us/windows/windows-startup-settings-1af6ec8c-4d4a-4b23-adb7-e76eef0b847f).
5. lostindark, [README Driver Store Explorer](https://github.com/lostindark/DriverStoreExplorer) e [release](https://github.com/lostindark/DriverStoreExplorer/releases).
6. Glenn Delahoy, [Snappy Driver Installer Origin](https://www.glenn.delahoy.com/snappy-driver-installer-origin/).
7. Resplendence, [LatencyMon](https://www.resplendence.com/latencymon) e [Using LatencyMon](https://www.resplendence.com/latencymon_using).
8. Resplendence, [LatencyMon FAQ](https://www.resplendence.com/latencymon_faq). Raccomandazione baseline, effetti del monitor e perdita di eventi.
9. Microsoft Learn, [Introduction to the page file](https://learn.microsoft.com/en-us/troubleshoot/windows-client/performance/introduction-to-the-page-file). Il progetto mantiene gestione automatica e distingue commit, dump e fault su file mappati.
10. Microsoft Learn, [Windows Performance Recorder](https://learn.microsoft.com/en-us/windows-hardware/test/wpt/windows-performance-recorder) e [Windows Performance Analyzer](https://learn.microsoft.com/en-us/windows-hardware/test/wpt/windows-performance-analyzer).
11. Materiale locale: PNG `analisi/fonti-v3/latencymon-cattura-originale.png`, riletto visivamente per i valori, e [registro di acquisizioni/limiti](../analisi/REVISIONE-TEMATICA.md). Cattura non controllata, nessuna nuova misura.
12. Microsoft Learn, [USBView](https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/usbview). Strumento per controller, hub e dispositivi; la documentazione avverte che può non mostrare informazioni recenti.
13. Microsoft, [USBView sample application](https://learn.microsoft.com/en-us/samples/microsoft/windows-driver-samples/usbview-sample-application/). Enumerazione di controller, root hub e dispositivi; codice di esempio, non un benchmark.
14. Blur Busters Forums, [Evaluating xHCI USB controller performance](https://forums.blurbusters.com/viewtopic.php?t=12484). Test di comunità su chip e driver diversi; non è uno studio controllato.
15. Blur Busters Forums, [8 kHz devices and USB ports](https://forums.blurbusters.com/viewtopic.php?t=9286). Esperienze su polling elevato, porte e controller; dati aneddotici.
16. USB-IF, [HID 1.11 specification](https://www.usb.org/document-library/hid-1-11). Struttura dei report HID; non contiene consigli di tuning.
17. Uwe Sieber, [USBTreeView](https://www.uwe-sieber.de/usbtreeview_e.html). Visualizzatore di topologia USB; verificare versione e fonte.
18. Manuale della scheda madre, sezione block diagram/porte USB. Mappatura e condivisione dei controller variano per modello e revisione.

Le copie delle fonti ufficiali sono conservate nel progetto e riguardano le versioni consultate, non ogni futura release. Non sono stati verificati su un hardware reale installer, UAC, modalità provvisoria, pulizia, export/rollback o effetti prestazionali. Una procedura documentata non è un collaudo e un lettore simulato non può certificare questi comportamenti.
