# Windows 11: costruire una base misurabile

Un buon setup non è il Windows con meno voci in Gestione attività. È un sistema che riconosce l'hardware, esegue ciò che ti serve, resta aggiornabile e ti permette di capire che cosa è cambiato quando compare un problema. Da questa base si possono confrontare prestazioni e ottimizzazioni; senza una base riconoscibile, ogni tweak aggiunge soltanto incertezza.

Questa guida parte dal sistema operativo e arriva a driver, applicazioni, energia e attività in background. Non è una lista di tweak da applicare in blocco: è il capitolo che costruisce il riferimento per i successivi. La latenza che percepisci, infatti, attraversa più strati:

```text
input → simulazione → rendering CPU/GPU → presentazione → display
audio: applicazione → mixer → driver → DAC/cuffie
rete: gioco → stack di rete → NIC/Wi-Fi → router → ISP
```

Il setup Windows non è l'unico strato, ma è quello che rende gli altri osservabili. Se il sistema è instabile o non sai ricostruire le modifiche, un risultato apparentemente migliore non è una misura: è una coincidenza non riproducibile.

La guida è rivolta a Windows 11 25H2 e 26H2 su hardware supportato. Windows 11 26H1 esiste, ma è un ramo OEM con regole proprie: non è l'aggiornamento da installare su un PC esistente. I percorsi delle impostazioni possono cambiare leggermente con la build e con l'edizione. Le procedure sono documentate, non collaudate sul PC del lettore.

## Come leggere questa guida

- **Se Windows funziona già**, non reinstallarlo per seguire la guida. Leggi la parte su versioni, memoria, inventario e recupero, poi passa ad applicazioni, energia e background.
- **Se scegli un'installazione pulita**, considera la cancellazione dei dischi una decisione separata, da prendere solo dopo un backup verificato.
- **Se stai inseguendo un sintomo**, non partire dal tweak. Definisci che cosa succede, quando succede e come misurerai il cambiamento. La [guida misure](12-misure-verifica.md) entra nel dettaglio; qui costruisci le condizioni perché quella misura abbia senso.

L'ordine consigliato è: capire il sistema → preparare il recupero → installare o verificare → scegliere driver e applicazioni → impostare energia e background → conservare una baseline.

## 1. Definire il problema prima di cambiare qualcosa

### Una frase verificabile

«Il PC ha latenza» non distingue un problema di input, frame time, audio, rete o storage. Una descrizione utile è già un'ipotesi:

- «la voce si interrompe quando parte il download»;
- «la scena scatta dopo il caricamento della nuova area»;
- «il mouse sembra in ritardo solo con il gioco in finestra»;
- «l'audio gracchia quando apro OBS»;
- «il frame time peggiora dopo dieci minuti, non subito».

Scrivi anche il contesto: gioco o applicazione, risoluzione, refresh, frame cap, impostazioni grafiche, periferiche, rete, carico in background. Una prova senza contesto non è ripetibile.

### La regola A–B–A

1. **A**: registra lo stato iniziale e ripeti la scena senza modifiche.
2. **B**: cambia una sola cosa.
3. **A**: torna allo stato iniziale e ripeti.

Se B migliora solo quando A peggiora, o se il risultato cambia senza una modifica, stai misurando rumore, temperatura, cache o rete. La regola vale per un piano energia, un driver, un'opzione del gioco e un tool di debloat.

### Baseline minima

Prima di toccare il sistema, conserva:

| Voce | Perché serve |
|---|---|
| Edizione, versione e build di Windows (`winver`) | Identifica patch, note e percorso di aggiornamento. |
| Modello di CPU, GPU, scheda madre/notebook e revisione BIOS | Senza questi dati i consigli “universali” non sono verificabili. |
| RAM installata, configurazione e profilo (JEDEC/XMP/EXPO) | Distingue capacità, frequenza e stabilità. |
| Dischi e controller (SATA, NVMe, VMD/RST, RAID) | Spiega gran parte dei problemi di installazione e storage. |
| Driver effettivi di GPU, chipset, rete, audio e storage | “Ultimo driver” non significa “driver giusto per questo hardware”. |
| Piano e modalità di alimentazione, profilo OEM | Cambiano boost, ventole e transizioni. |
| Applicazioni e servizi necessari | Il PC deve restare usabile, non solo vuoto. |
| Punto di ripristino, backup e chiave BitLocker | Stabiliscono come tornare indietro. |

Un inventario non è una collezione di screenshot. È un file di testo o un foglio che puoi rileggere fra una settimana, con versioni e date.

### Strumenti di prima lettura

| Strumento | Come iniziare | Che cosa non conclude |
|---|---|---|
| Gestione attività | **Ctrl+Maiusc+Esc**. In Processi ordina per CPU, memoria o disco durante il sintomo; in Prestazioni → CPU osserva i processori logici. | Un utilizzo totale moderato non esclude un thread limitante. Non terminare processi sconosciuti per “pulizia”. |
| Monitoraggio risorse | Cerca **resmon**. Controlla CPU, Memoria, Disco e Rete; usa la ricerca I/O per collegare il processo all'orario del sintomo. | Un hard fault non dimostra RAM guasta; un contatore alto non attribuisce da solo la causa. |
| Visualizzatore eventi | Cerca **eventvwr.msc**. In Registri di Windows → Sistema/Applicazione filtra l'intervallo e salva origine, ID e messaggio; cerca anche errori driver o WHEA ripetuti. | Kernel-Power dopo uno spegnimento descrive un evento, non ne identifica automaticamente la causa. |
| Process Explorer | Scaricalo dalla pagina Microsoft Sysinternals, estrailo e apri le proprietà del processo. L'elevazione mostra più dettagli, non autorizza a chiudere componenti critici. | Firma e produttore aiutano a identificare il binario; non provano che sia utile o sicuro da chiudere. |
| Autoruns | Inventaria programmi al login, task, servizi e driver. Salva l'inventario prima di intervenire. | Il filtro Microsoft facilita la lettura, ma non certifica tutte le voci rimaste. |

Process Explorer e Autoruns sono strumenti Sysinternals [2]. In Autoruns togli la spunta a un autostart opzionale invece di cancellarlo: riavvia, prova la funzione e rimetti la spunta se serve. Non applicare lo stesso metodo ai driver di boot o di sicurezza.

## 2. Windows 11 nel 2026: 25H2, 26H1, 26H2

La versione di Windows non è un numero da inseguire. È un percorso di aggiornamento con regole diverse:

| Versione | Stato e percorso | Supporto indicativo | A chi serve |
|---|---|---|---|
| **25H2** | Feature update distribuito dal 30 settembre 2025 come enablement package sopra 24H2 [29]. | Home/Pro 24 mesi; Enterprise/Education 36 mesi. | PC esistenti che non sono ancora passati a 26H2. |
| **26H1** | Rilascio hardware-optimized, preinstallato su dispositivi selezionati da inizio 2026. Non viene offerto via Windows Update e non è un in-place update da 24H2/25H2. | Pro 24 mesi; Enterprise 36 mesi. | Solo hardware che nasce con questo ramo; non è una tappa verso 26H2. |
| **26H2** | Feature update GA dal 29 settembre 2026, distribuito come enablement package a 24H2/25H2, con un solo riavvio nella maggior parte dei casi. | Home/Pro 24 mesi; Enterprise/Education 36 mesi. | Aggiornamento annuale per i PC esistenti compatibili. |

Se sei ancora su 24H2, il percorso di aggiornamento è 26H2; controlla il ciclo di supporto della tua edizione, perché per Home/Pro 24H2 è arrivato a fine servicing a ottobre 2026 [22]. 24H2 non è il riferimento di questa guida.

Windows 11 26H1 non è una versione “migliore” da installare manualmente. Microsoft la descrive come release specializzata per nuova piattaforma hardware, non destinata alla distribuzione ampia. I dispositivi 26H1 non possono passare al successivo feature update annuale del secondo semestre 2026 perché il ramo di base è diverso; avranno un percorso in una release futura [22][23]. Se hai un PC 24H2 o 25H2, il percorso normale è 26H2, non 26H1.

26H2 non è un “Windows nuovo” da zero: condivide la base di servicing con 24H2 e 25H2. Molte funzionalità sono già arrivate con gli aggiornamenti mensili; il passaggio abilita selezioni e resetta il ciclo di supporto [24]. Questo ha due conseguenze pratiche:

- un aggiornamento cumulativo può cambiare comportamento anche senza un nuovo numero di versione;
- un problema noto può essere già presente prima del passaggio a 26H2.

Al 21 ottobre 2026 il rollout di 26H2 è a disponibilità piena per i dispositivi 25H2 e 24H2, ma restano problemi noti. Fra questi, alcuni dispositivi **USB Audio Class 1.0** hanno mostrato errori Code 10 o mancata uscita audio dopo il passaggio a 26H2 o gli aggiornamenti di settembre 2026; il problema è stato mitigato, non necessariamente risolto per ogni combinazione [25]. Se usi una scheda audio o un DAC USB di classe 1.0, controlla lo stato prima di aggiornare e tieni pronto il rollback. La [guida audio](09-audio-windows-eq.md) entra nel merito del percorso audio.

La versione conta anche per i driver: il nuovo criterio di fiducia del kernel, entrato nel servicing da aprile 2026 e incluso in 26H2, riguarda i driver firmati con il vecchio programma cross-signed. Non è un dettaglio da smanettoni: un driver vecchio ma funzionante può essere bloccato se non rientra nel programma WHCP o nella allow list. Ne parliamo nella sezione driver.

**Cosa fare in pratica:** apri `winver`, annota versione, build ed edizione. Non forzare 26H1. Se 26H2 è disponibile, aggiorna solo dopo backup e controllo dei driver critici. Se un problema noto riguarda il tuo hardware, attendi la correzione invece di accumulare workaround.

## 3. Il sistema come catena

### Processi, thread, scheduler e driver

Il **kernel** coordina le risorse centrali. Le applicazioni operano normalmente in modalità utente e chiedono al sistema accesso a memoria e dispositivi; i **driver** collegano quelle richieste all'hardware. La separazione limita i danni di un'app difettosa, ma un problema in modalità kernel può coinvolgere l'intero sistema.

Un **processo** è un programma in esecuzione con le proprie risorse. I suoi **thread** sono le attività che il processore può eseguire: un gioco può averne per simulazione, preparazione grafica, audio e caricamenti. Lo **scheduler** distribuisce il tempo ai thread pronti sui processori logici disponibili. Un thread che aspetta un file o una risposta di rete non diventa pronto solo perché gli assegni una priorità più alta.

Windows non è un sistema hard real-time: non promette un limite temporale rigoroso per ogni evento. Gestisce comunque attività con scadenze, come l'audio. Carichi concorrenti, firmware e driver possono influire sul rispetto di quelle scadenze. Impostare un gioco su «Tempo reale», copiare affinità da un'altra CPU o disabilitare servizi in blocco può togliere risorse alle attività necessarie: non è un punto di partenza.

Un **interrupt** segnala un evento al processore. La **ISR** (Interrupt Service Routine) gestisce la risposta immediata; la **DPC** (Deferred Procedure Call) svolge successivamente parte del lavoro del driver. Sul processore interessato questo lavoro può ritardare i thread ordinari. Non bisogna eliminarlo: durata, frequenza e coincidenza con una scadenza sono ciò che conta. [LatencyMon](03-driver-latencymon.md) aiuta a indagare queste condizioni, ma non misura il tempo fra clic e immagine sul display.

### RAM: quattro cose che non sono la stessa cosa

Molti problemi nascono dal confondere **RAM fisica**, **spazio di indirizzi virtuale**, **commit** e **working set**.

- La **RAM fisica** è la memoria installata. Il firmware può riservarne una parte per hardware, iGPU o altre funzioni; per questo “installata” e “utilizzabile” possono differire.
- Lo **spazio virtuale** è l'insieme degli indirizzi che un processo può usare. Non è una quantità di RAM consumata.
- Il **commit** è la memoria che Windows si è impegnato a fornire a processi e kernel. Può superare la RAM fisica perché può essere sostenuto dal pagefile.
- Il **working set** è la parte di memoria di un processo che in questo momento è residente in RAM. Include pagine condivise e private; non coincide con tutto ciò che il processo ha riservato [30].

Gestione attività mostra questi valori con etichette che possono variare leggermente tra build:

| Voce | Che cosa rappresenta | Come leggerla |
|---|---|---|
| **In use** | Working set dei processi + memoria non paginata + pagine modificate. | È la memoria attivamente coinvolta, non tutta quella “persa”. |
| **Available** | Memoria standby + memoria libera. | È la memoria che il sistema può riassegnare senza andare subito su disco. |
| **Cached** | Cache del sistema, standby e pagine modificate in attesa di scrittura. | Può essere riutilizzata; un valore alto non è un errore. |
| **Committed** | Memoria promessa a processi e kernel. | Se si avvicina al limite, il sistema può fallire le allocazioni. |
| **Commit limit** | RAM fisica + tutti i pagefile. | È il tetto del commit, non il tetto della RAM. |
| **Paged pool** | Memoria kernel che può essere spostata su disco. | Un valore in crescita può indicare un driver o un componente kernel. |
| **Non-paged pool** | Memoria kernel che non può essere spostata su disco. | Una crescita continua è un caso da driver, non da “pulizia RAM”. |
| **Hardware reserved** | RAM riservata da firmware/hardware. | Non è recuperabile con un tweak software. |

Le formule semplificate aiutano a non leggere un solo numero: **Memory In Use ≈ working set + non-paged + modified**; **Available ≈ standby + free** [27]. In Gestione attività, “Cached” può includere standby, modified e cache di sistema. Non pretendere che la somma delle righe dei processi sia identica a “In use”: il kernel, i driver e le pagine condivise contano.

#### Working set e standby non sono RAM «sprecata»

La **standby list** contiene pagine non modificate che sono state tolte dai working set ma restano in RAM come cache. Se un processo le richiede, tornano disponibili senza leggere dal disco: è un **soft fault**. Se serve memoria, Windows può riutilizzarle. Per questo “RAM libera” non è l'obiettivo: un sistema che usa la RAM per cache è spesso più reattivo di uno che la tiene vuota.

Il **working set** può essere ridotto dal sistema o da un tool. Ridurlo non cancella i dati: le pagine possono essere ricaricate. Ma svuotarlo a forza mentre un'applicazione sta lavorando provoca fault e letture che altrimenti non servirebbero. Un tool che “libera RAM” spesso sposta il costo dal presente al momento successivo.

La **memoria compressa** è un altro livello: Windows può comprimere pagine in RAM invece di scriverle subito su disco. Gestione attività mostra una parte di “In use” come compressa. La compressione usa CPU e memoria; non è un leak e non va giudicata dal solo numero. Se vedi compressione alta insieme a un'applicazione che consuma molta memoria, la domanda è quale applicazione stia crescendo, non come disattivare la compressione.

#### Pagefile: non è “RAM in più” nel senso comune

Il **pagefile** assolve a tre funzioni distinte:

1. permette di rimuovere dalla RAM pagine modificate e usate di rado, liberando spazio per dati più utili;
2. estende il **commit limit** oltre la RAM fisica;
3. può sostenere un **crash dump** di sistema.

Il commit limit è la somma della RAM fisica e di tutti i pagefile. Se il commit charge arriva al limite, applicazioni e sistema possono non ottenere memoria, con errori, freeze o crash. Disattivare il pagefile non “elimina il paging”: riduce il tetto del commit e può rendere impossibile il dump. Su un sistema con molta RAM il pagefile può essere poco usato, ma questo non lo rende inutile.

La gestione automatica è una base pratica. Microsoft la descrive come adattiva: il pagefile cresce in base alla cronologia d'uso, alla RAM e alle impostazioni di dump; quando il commit supera il 90% del limite, può crescere fino a tre volte la RAM o 4 GB, scegliendo il valore maggiore, con il vincolo dello spazio sul volume [1][26]. Non è una formula universale, ma è un comportamento documentato.

Se scegli una dimensione manuale, devi considerare due cose separate:

| Esigenza | Conseguenza |
|---|---|
| **Crash dump** | Il pagefile o un file di dump dedicato deve essere grande abbastanza per il tipo di dump scelto. |
| **Picco del commit** | Il pagefile deve sostenere il picco di memoria promessa, non solo la RAM “media” osservata a desktop. |

Minimi documentati per i dump [26]:

| Tipo di dump | Requisito minimo del pagefile |
|---|---|
| Small memory dump (256 KB) | 1 MB |
| Kernel memory dump | Dipende dalla memoria virtuale del kernel. |
| Complete memory dump | 1 × RAM + 257 MB circa. |
| Automatic memory dump | Dipende dal kernel; può crescere dopo crash ravvicinati. |

Un **hard pagefault** è una pagina richiesta che deve essere recuperata dallo storage. Può riguardare il pagefile, ma anche eseguibili, DLL o file mappati in memoria. Non è un errore fisico della RAM e non dimostra da solo un problema di memoria. Durante un sintomo, confronta commit, available, attività del disco e processi; un picco isolato è normale, una raffica continua durante il gioco merita indagine.

**Cosa fare se il commit è alto:**

- identifica il processo che cresce nel tempo, non solo quello che occupa di più all'avvio;
- chiudi una sola applicazione pesante e ripeti la scena;
- controlla se il problema è un leak, una cache o un'app che tiene aperti troppi dati;
- se il picco supera stabilmente la RAM e il disco è sotto pressione, valuta più RAM o un pagefile adeguato;
- non cancellare il pagefile a mano e non impostarlo a zero per “guadagnare latenza”.

Se avevi già disattivato, azzerato o spostato il pagefile, non continuare a misurare su quello stato: ripristina la gestione automatica o il valore annotato, riavvia e conserva l'esito come parte del rollback.

#### RAM cleaner, standby list e ISLC

Strumenti come **ISLC** (Intelligent Standby List Cleaner), **EmptyStandbyList** o le funzioni di pulizia di RAMMap possono svuotare la standby list o ridurre i working set. Che cosa cambiano davvero?

- Non aumentano la RAM fisica.
- Non eliminano un leak: se un'applicazione continua a chiedere memoria, il problema torna.
- Possono ridurre temporaneamente la cache e costringere il sistema a rileggere dati dal disco.
- In alcuni casi segnalati di stutter associato alla standby list, possono mascherare il sintomo; non sono una cura universale.

Anche svuotare di continuo la **shader cache** del driver o della piattaforma sposta il costo: le shader vanno ricompilate e la prima esecuzione, soprattutto con emulatori, può essere più irregolare. Non è un guadagno permanente di latenza.

La domanda corretta non è «quanta RAM libera ho?», ma «quale processo o driver sta consumando memoria in modo anomalo, e che cosa succede al commit e al disco?». Se non hai questa risposta, un RAM cleaner aggiunge una variabile, non una soluzione.

Un caso legittimo è la diagnosi: osservi il sintomo, svuoti la standby list una volta, ripeti la scena e vedi se il comportamento cambia. Se cambia, hai un'indizio; se non cambia, non serve tenerlo attivo. Non impostare una pulizia periodica come baseline senza una prova A–B–A.

## 4. Preparare un recupero reale

Un punto di ripristino Windows, un export dei driver e un backup dei dati coprono oggetti diversi. Nessuno dei tre, da solo, ricostruisce l'intero PC. Prima di reinstallare o aggiornare il firmware prepara:

- una copia esterna di dati, salvataggi e configurazioni, verificando che sia leggibile e non solo “copiata”;
- credenziali e password disponibili anche senza quel PC, licenza ed edizione Windows previste;
- chiave di recupero BitLocker o Crittografia dispositivo, conservata su un supporto sicuro accessibile dall'esterno;
- modello completo del notebook/preassemblato, oppure modello e revisione della scheda madre; CPU, RAM, GPU e dischi identificati per modello e capacità;
- manuale del modello, supporto Windows originale e istruzioni di recupero consultabili offline;
- installer completi di GPU, chipset, rete, audio e storage, con un documento delle versioni e dei link di origine; per storage e controller conserva anche i file `.inf`, `.sys` e `.cat` forniti dal produttore, perché il solo export della cartella driver non è un supporto di reinstallazione.

**Fermati se non sai distinguere il disco da cancellare o non hai accesso al recupero della cifratura.** Un account locale non garantisce che la chiave BitLocker sia archiviata nel cloud. Un backup sulla USB che stai per formattare non è un backup. Prova ad aprire almeno un file dalla copia esterna prima di considerarla valida.

Per una modifica sul Windows già installato puoi verificare **Protezione sistema** e creare un punto di ripristino, controllando l'esito. È un aiuto per alcune modifiche del sistema, non un'assicurazione contro cancellazioni, firmware fallito o perdita dei dati personali.

## 5. ISO, USB e firmware

### ISO e chiavetta: conservare un originale riconoscibile

Una **ISO** è un'immagine del supporto d'installazione. Scarica Windows dalla pagina Microsoft, scegliendo lingua e architettura compatibili con il PC e l'edizione corretta per la licenza. Quando Microsoft pubblica SHA-256 per quell'immagine, confrontalo con il file scaricato. Un hash calcolato senza un riferimento attendibile identifica il file, ma non dimostra chi lo abbia prodotto [3].

Per il percorso di base usa la ISO Microsoft conservata e **Rufus** ufficiale [4]. Prepara una USB Windows dedicata: almeno 16 GB è un margine pratico, non una promessa che qualunque immagine personalizzata vi entri.

1. In Rufus controlla **Dispositivo** per nome e capacità, poi seleziona la ISO conservata.
2. Per il percorso Windows 11 supportato scegli **Installazione Windows standard**, schema **GPT** e destinazione **UEFI**, senza CSM. UEFI è il firmware moderno; GPT è lo schema delle partizioni. Non scegliere Windows To Go, che ha un altro scopo.
3. Lascia il filesystem proposto per quell'immagine. Non imporre FAT32 quando file grandi richiedono NTFS o un trattamento specifico del supporto.
4. Nel dialogo **Windows User Experience** leggi tutte le caselle, comprese quelle già spuntate. Sul PC supportato non aggiungere bypass dei controlli TPM, Secure Boot, RAM o CPU. Account, preferenze regionali, cifratura, automazione e rimozioni app sono decisioni separate.
5. Ricontrolla il dispositivo prima di confermare. La creazione cancella **tutte le partizioni della USB**, non soltanto una cartella. Attendi la conclusione e conserva log/opzioni utili.

Una USB preparata con risposte personalizzate non è identica al supporto senza personalizzazioni, anche se la ISO sorgente rimane originale. Se il boot è rifiutato, verifica compatibilità di media, versione Rufus e firmware: non disattivare Secure Boot automaticamente per superare l'avviso. Gli aggiornamenti delle firme e delle revoche richiedono indicazioni Microsoft/OEM pertinenti alla macchina, non una procedura improvvisata sulle chiavi del firmware.

Il ritorno consiste nel ricreare il supporto dalla ISO originale con opzioni note. **Non recupera ciò che la formattazione ha cancellato.** Per il BIOS prepara una USB distinta secondo il manuale: filesystem, nome file e porta possono essere diversi da quelli della USB Windows.

### Firmware: aggiornare con uno scopo e con i prerequisiti

Il firmware inizializza piattaforma, memoria e controller. Una release aggiornata può correggere sicurezza e compatibilità anche prima di un guasto evidente; non è però una misura diretta di input lag. Cerca l'ultima release **stabile e pertinente al modello/revisione**, leggendo note, CPU supportate e dipendenze. “Ultima” non autorizza a saltare un BIOS intermedio, un aggiornamento ME/EC o un passaggio previsto dal produttore (OEM). Una beta va considerata per un'esigenza specifica, non perché ha il numero più alto [5].

Prima del flash fotografa soltanto le impostazioni pertinenti: UEFI e ordine di boot, storage/VMD/RAID, TPM/Secure Boot, ventole e pompa, profilo RAM, ReBAR ed eventuali overclock o undervolt. Non includere chiavi e dati riservati. Leggi prima la procedura di recovery: FlashBack o dual BIOS non esistono su ogni modello, e il downgrade può essere vietato.

Se la procedura lo richiede, sospendi la protezione BitLocker tramite il percorso supportato. Dove disponibile: **Pannello di controllo → Sistema e sicurezza → Crittografia unità BitLocker → Sospendi protezione**; dopo l'intervento usa **Riprendi protezione** e controlla lo stato [5]. Con la sospensione il volume resta cifrato, ma la protezione BitLocker è temporaneamente sospesa: riprendila appena concluso l'intervento. Decrittare rimuove invece la cifratura dal volume e non è un sinonimo della sospensione. Entrambe le operazioni sono distinte dal cancellare il TPM. Non presumere che ogni flasher OEM gestisca automaticamente sospensione e riattivazione.

Usa alimentazione stabile; su notebook rispetta requisiti di alimentatore e batteria. Se il modello prevede un flasher Windows, può essere necessario un sistema funzionante prima dell'aggiornamento. Segui il metodo OEM, non un percorso di menu copiato da un'altra scheda. Non interrompere il flash o il primo avvio previsto dal manuale soltanto perché sembra lento.

Dopo l'aggiornamento verifica versione e impostazioni. Un reset può cambiare storage, boot e sicurezza: controllali prima di avviare il Windows precedente. Non importare automaticamente un vecchio profilo di overclock fra BIOS diversi. Prova avvio e dispositivi a impostazioni sicure; ricostruisci poi una scelta alla volta. Riprendi BitLocker e verifica TPM/Secure Boot e le funzioni richieste. Un punto di ripristino Windows non recupera un firmware fallito.

**XMP/EXPO** sono profili RAM e restano overclock da verificare per stabilità. **PBO** modifica margini di boost/potenza sulle piattaforme che lo prevedono e può aumentare calore. **Resizable BAR/ReBAR** dipende da supporto della piattaforma, GPU, driver e applicazione. Non sono prerequisiti per un desktop funzionante: annota la singola scelta e verifica il carico reale. La [guida stabilità](02-stabilita-occt.md) spiega come separare configurazione standard, profilo memoria e undervolt.

#### Nota per piattaforme AM5

Le guide video AM5 possono aiutare a riconoscere i menu, ma non sostituiscono il manuale della scheda e della revisione BIOS installata. Le voci PBO possono comparire in più menu e valori/nomi non sono identici fra produttori e release. Il video FR33THY dedicato alle impostazioni e all'overclock AM5 riporta una correzione nei commenti: i limiti predefiniti dipendono dalla classe della CPU e il comportamento dell'opzione PBO “Disabled” può variare per scheda; l'autore consiglia di verificare i limiti effettivi invece di assumere che una selezione significhi “illimitato” [19]. Non copiare i numeri del video o attivare PBO, EXPO e altre voci in blocco. Registra il valore iniziale, cambia un solo parametro con un obiettivo preciso e controlla stabilità, temperatura e prestazione nel carico reale.

Allo stesso modo, disabilitare una iGPU, il Bluetooth o un componente OEM non è automaticamente “pulizia”. Possono servire al display ibrido, all'encoding, a controller/cuffie, a ventole o tasti del notebook. Intervieni soltanto con una funzione alternativa certa, annota la voce e riattivala se perdi funzionalità.

## 6. Installare sul disco giusto, con il controller giusto

La parola **M.2** descrive un formato, non garantisce il protocollo. Un'unità M.2 può essere SATA oppure NVMe. **AHCI** riguarda il controller SATA; **NVMe** è un protocollo distinto per storage PCIe. Un SSD NVMe può inoltre essere presentato a Windows attraverso un controller VMD/RST o un array RAID [6].

| Situazione identificata | Percorso prima dell'installazione | Cosa evitare |
|---|---|---|
| SATA senza necessità RAID/Optane | Se il modello lo prevede, scegli AHCI prima dell'installazione nuova. | Non passare ad AHCI sul Windows esistente come tweak: può non avviarsi. |
| NVMe gestito nativamente | Usa lo stack storage compatibile previsto da Windows/piattaforma. | Non cercare “AHCI per NVMe” o cambiare driver perché si chiama “faster”. |
| NVMe dietro VMD/RST | Prepara il driver controller corretto ed estratto. In Setup usa **Carica driver** e indica quella cartella. | Non rimuovere il driver di boot dopo l'installazione. |
| RAID/Optane o configurazione OEM necessaria | Conserva modalità, volumi e driver del modello, inclusi eventuali pacchetti RAID AMD. | Non disattivare il controller o cancellare volumi per provare. |
| Installazione nuova, VMD non necessario | Se l'OEM documenta il ramo e non ci sono array/Optane o altre dipendenze, puoi scegliere gestione nativa prima di installare. | Non trasferire il menu ASUS a ogni notebook, né applicare il cambio dopo l'installazione. |

Avvia la voce **UEFI della USB** nel menu temporaneo di boot. La scelta “installazione pulita” comporta perdita delle partizioni eliminate: confronta modello e capacità del disco con il tuo inventario. Quando possibile e previsto dalle precauzioni hardware, scollega i dischi non destinati all'installazione; altrimenti lasciali intatti. Se non sai distinguerli, fermati. Non descrivere l'eliminazione di tutte le partizioni come una normale manutenzione del PC.

In Setup scegli lingua e tastiera, poi **Installa Windows 11** e conferma la cancellazione soltanto se hai scelto davvero il percorso pulito. Se compare la scelta dell'edizione, seleziona quella coperta dalla tua licenza; una chiave nel firmware può preselezionarla. Alla schermata della destinazione, se vuoi azzerare il disco identificato, elimina una per una **soltanto le sue partizioni**, comprese quelle di recupero OEM che perderai. Non presumere che il bersaglio sia sempre «Disco 0». Seleziona lo **spazio non allocato sul disco destinazione**, prosegui con **Avanti**, ricontrolla il riepilogo e conferma **Installa** quando richiesto: Setup crea le partizioni necessarie. Nomi e schermate variano con il supporto di installazione. Questo passaggio non conserva file, applicazioni o personalizzazioni e non può essere annullato: il ritorno richiede il backup preparato [18].

Se il firmware non rileva il disco, indaga hardware, collegamenti e configurazione con il manuale. Se il firmware lo rileva ma Setup no, verifica il controller e carica il driver di preinstallazione corretto. Formattare altri dischi non risolve un controller non riconosciuto. Dopo il primo riavvio segui **Windows Boot Manager** sul disco, senza ricominciare dalla USB.

Per un mancato avvio dopo un cambio storage o reset BIOS, il primo recupero è ripristinare la modalità annotata. Non concatenare conversioni o riparazioni distruttive. Intel avverte esplicitamente che cambiare il percorso VMD/RST di un sistema già installato, o rimuoverne il driver necessario, può causare **INACCESSIBLE_BOOT_DEVICE** e compromettere l'accesso ai dati [6].

## 7. Account, driver e ritorno online

### Account locale e fase offline

La fase iniziale guidata di Windows è chiamata **OOBE**, Out-of-Box Experience. Può richiedere rete e account Microsoft, secondo build, edizione e supporto. Un account locale è legato al dispositivo; non significa account senza password, auto-login, Windows Hello disattivato o cifratura spenta [7].

La FAQ Rufus descrive l'opzione per rimuovere il requisito account online e, per quel percorso, richiede assenza di connettività **alla creazione dell'account**, non soltanto al primo boot [4]. Puoi sceglierla e annotarla quando prepari il supporto, ma la riuscita non è garantita su ogni build, modalità S o release del tool.

Se il ramo locale non è disponibile, non ripetere comandi OOBE storici, URI o indirizzi email fittizi come procedura universale. Segui il percorso supportato disponibile oppure ricrea un supporto verificato. Se hai completato con un account Microsoft e vuoi successivamente passare al locale, Microsoft documenta **Impostazioni → Account → Le tue info → Accedi con un account locale**, con nome, password e conferma del cambio [7]. Verifica anche il metodo di recupero della password e dove conserverai la chiave della cifratura.

Restare inizialmente offline può aiutare a installare i driver scelti senza download concorrenti. Non è un miglioramento di latenza dimostrato, né un motivo per mantenere Windows senza patch. Preparare i pacchetti completi prima rende possibile questa scelta; se manca il driver di rete, un link salvato non sostituisce l'installer.

### Driver: ordine, identità e ritorno

Non esiste un ordine universale che riduca la latenza. **GPU → chipset/piattaforma → rete/audio/periferiche** è una variante praticabile quando Windows dispone già delle funzioni di base e gli installer non impongono dipendenze differenti. Il driver storage necessario a riconoscere il disco viene naturalmente prima. Su notebook e sistemi ibridi possono precedere chipset, system interface, MEI, Serial IO, SST o iGPU richiesti dall'OEM; un installer online richiede invece una rete funzionante.

Installa i pacchetti preparati, rispettando i riavvii. In Gestione dispositivi controlla stato, fornitore e versione; prova display/refresh, rete, audio e microfono, sospensione e funzioni OEM. L'assenza di triangoli gialli non significa che le prestazioni siano ottimali. Conserva il pacchetto precedente: la [guida driver](03-driver-latencymon.md) spiega identità, export, rollback e quando DDU ha senso. Non serve DDU come rito dopo un'installazione pulita.

Ricollega Internet, completa **Windows Update** e gli aggiornamenti **Microsoft Store**, compresi App Installer e pannelli DCH necessari. Controlla nuovamente le versioni effettivamente associate se interviene un aggiornamento. Aspetta che download, indicizzazione e riavvii siano conclusi prima di misurare.

L'esclusione dei driver dai normali aggiornamenti Windows è opzionale: serve a gestire manualmente versioni note, non a spegnere tutte le patch, e non blocca ogni percorso OEM o di installazione. Se la mantieni, assumi anche la manutenzione di rete, chipset e storage. Per annullarla torna allo stato registrato, non a un presunto “default” uguale su tutti i PC.

### 26H2 e la fiducia dei driver kernel

Windows 11 26H2 include il nuovo criterio con cui il kernel considera affidabili i driver firmati con il vecchio programma **cross-signed**. Microsoft rimuove la fiducia predefinita per questi driver; restano ammessi i driver certificati **WHCP** e una allow list esplicita di driver legacy considerati affidabili. Il passaggio non è un interruttore immediato: il sistema entra in una fase di valutazione, osserva i driver caricati e attiva l'enforcement solo se non rileva driver che violerebbero il nuovo criterio [28].

Al momento della verifica, la pagina “What's new” di 26H2 riportava **100 ore e 3 riavvii**, mentre il blog Microsoft, con la nota di aggiornamento di giugno 2026, indica **250 ore di sistema e 3 riavvii**. Prendi la soglia più recente come condizione di rollout, non come garanzia sul tuo PC. Se un driver cross-signed non è nella allow list, può essere bloccato dopo l'attivazione.

Che cosa significa per te:

- un driver vecchio ma funzionante non è automaticamente compatibile con 26H2;
- “il dispositivo funziona ancora” durante la valutazione non dimostra che funzionerà dopo l'enforcement;
- non disattivare la firma dei driver o le protezioni del kernel per far passare un driver non supportato;
- controlla se il produttore offre un driver WHCP o una versione aggiornata prima di aggiornare Windows;
- per hardware legacy o industriale, verifica la allow list e il supporto del vendor, non un workaround trovato online.

Questo è un motivo in più per conservare i pacchetti driver e per non aggiornare tutto nello stesso momento. La [guida driver](03-driver-latencymon.md) approfondisce identità, rollback e diagnosi.

## 8. Applicazioni e dipendenze: installare ciò che serve

### WinGet senza ambiguità

**WinGet** è il gestore applicazioni Microsoft distribuito con **App Installer**. Non è un driver manager generale né un ottimizzatore. Al primissimo login potrebbe non essere ancora registrato o aggiornato: aggiorna App Installer dal suo Store e verifica prima di ricorrere a download casuali [8].

Apri Terminale normalmente, senza elevare tutto per abitudine. Il seguente esempio installa 7-Zip solo se decidi di usarlo; cataloghi e installer possono cambiare, quindi leggi i risultati prima di procedere:

```text
winget --version
winget source list
winget search 7zip --source winget
winget show --id 7zip.7zip --exact --source winget
```

Controlla produttore, versione e URL dell'installer. Il nome visibile non è l'ID: `winget` è il catalogo comunitario, `msstore` è la sorgente Store. Se i metadati corrispondono alla tua scelta:

```text
winget install --id 7zip.7zip --exact --source winget
```

Leggi gli accordi e l'eventuale richiesta del **Controllo account utente (UAC)**. L'installer determina anche l'ambito dell'installazione, per l'utente o per la macchina; il terminale non elevato non garantisce che ogni pacchetto tocchi soltanto quell'utente. Modalità silenziosa e accettazione automatica sono scelte deliberate, non prove dell'assenza di componenti opzionali. Non usare `--ignore-security-hash` o esclusioni delle scansioni per superare un errore.

`winget list` mostra le app riconosciute; `winget upgrade` elenca aggiornamenti. Per aggiornare il solo esempio, dopo aver verificato l'elenco:

```text
winget upgrade --id 7zip.7zip --exact --source winget
```

Non aggiornare tutto durante una misura. Per il ritorno usa la disinstallazione supportata, dopo aver salvato dati/configurazioni; downgrade e conservazione dei profili non sono garantiti. L'installazione normale richiede rete: il comando download può preparare alcuni pacchetti, dipendenze e licenze, ma non rende ogni applicazione Store installabile o redistribuibile offline. Per la fase iniziale è più chiaro usare installer completi del produttore già preparati [8].

### Visual C++ e DirectX legacy

Un **runtime** fornisce librerie richieste da un'applicazione. Installarlo può risolvere una dipendenza mancante; non è un tweak FPS. Le generazioni Visual C++ precedenti possono convivere con quelle recenti. L'architettura deve corrispondere all'app: su Windows x64 possono servire sia x86 per programmi a 32 bit sia x64 per quelli a 64 bit [9]. Non applicare quella coppia indiscriminatamente a ogni architettura di PC.

Per un setup con molti giochi, anche vecchi, **Visual C++ All-in-One di TechPowerUp** è un'opzione di comodità offline. Installa però anche generazioni ulteriori rispetto a quelle necessarie per una singola app. L'alternativa mirata è scaricare i redistributable Microsoft richiesti; molti installer dei giochi lo fanno già. All-in-One non comprende automaticamente .NET, DirectX o tutte le dipendenze MSIX.

Se scegli il pack, scaricalo dalla pagina esatta, confronta SHA-256 della **stessa release**, estrai tutto, leggi `install_all.bat` e verifica le firme Microsoft dei redistributable prima dell'esecuzione richiesta dal pacchetto. Le pagine sono state consultate, ma gli ZIP, i batch inclusi e le firme binarie non sono stati autenticati in questa stesura. Registra errori e riavvii. Per recuperare una dipendenza usa Repair o reinstalla la generazione richiesta; non eliminare tutti i VC++ come pulizia, perché le applicazioni li condividono. Il supporto dei runtime legacy resta un limite di compatibilità da considerare [9].

**DirectX End-User Runtimes June 2010** aggiunge componenti legacy affiancati, fra cui D3DX, XAudio 2.7 e XInput 1.3. Non sostituisce né aggiorna il DirectX 12 di Windows. Un gioco può richiedere queste librerie anche su un sistema moderno [10]. Puoi usare il redistributable Microsoft completo, oppure il pacchetto offline TechPowerUp dopo gli stessi controlli di provenienza e del batch. Estrai e segui `DXSETUP.exe`; non scaricare DLL isolate né copiarle a mano in System32/SysWOW64. Evita la doppia installazione di due raccolte dello stesso runtime senza motivo.

Microsoft specifica che il runtime DirectX legacy **non dispone di disinstallazione ordinaria**. Non promettere un Undo: per uno stato seriamente compromesso serve una riparazione appropriata o il backup, non cancellare le librerie manualmente. .NET Framework, .NET Desktop Runtime e Windows App Runtime sono ulteriori dipendenze distinte: aggiungi la versione richiesta dall'app, non tutto il catalogo perché contiene la parola “gaming”.

### Debloat: ridurre attività inutili senza perdere dipendenze

“Debloat” può significare rimuovere applicazioni non usate, ma molti tool cambiano anche servizi, policy e sicurezza. Una **policy** è una regola di configurazione; un **task** è un'attività automatica pianificata. Non sono equivalenti a un'app che occupa spazio. Meno software presente non dimostra, da solo, meno latenza fisica.

Parti da **Impostazioni → App → App installate** per software riconosciuto e da **App di avvio** per ciò che parte al login. Disabilitare l'autostart non disinstalla il programma: puoi aprirlo manualmente e riabilitare la voce. Prima di disinstallare salva dati, salvataggi e profili, controlla dipendenze e possibilità di reinstallazione. La rimozione di pacchetti app **AppX** per l'utente corrente, la rimozione per tutti gli utenti e la modifica di un servizio hanno ambiti diversi.

Se vuoi un'interfaccia più ampia, usa principalmente un solo tool per le modifiche scelte: non per un'incompatibilità tecnica fra tool, ma come modo per sapere chi abbia scritto l'ultimo valore. Non serve Select All e non è necessario eseguire contenuto remoto con `irm … | iex`.

| Tool | Uso pertinente | Limite da conoscere prima di applicare |
|---|---|---|
| **CTT/WinUtil** | Installazione app e singole impostazioni sul Windows attuale. | Anche il preset Minimal modifica servizi/telemetria e altre voci. Restore point e Undo Selected non sono un'immagine completa. Non confonderlo con Creator [11]. |
| **Winhance** | Gestione app e impostazioni, con import/export configurazioni. | Recommended non è neutro. Import può applicare subito la configurazione oppure selezionare le caselle: verifica il dialogo della release. Il backup copre le impostazioni gestite dal tool, non tutto il PC [12]. |
| **Wintoys di Bogdan Pătrăucean** | Frontend Store per app, servizi, informazioni e impostazioni. | Codice chiuso; le descrizioni non equivalgono a ispezione interna. Non è un builder ISO. Il percorso offline richiede pacchetti e dipendenze, non un EXE universale [13]. |

Prima di applicare, salva lo stato precedente e una piccola lista delle voci comprese; dopo, prova le funzioni interessate e il percorso di ritorno documentato. **Default Windows non equivale necessariamente allo stato OEM/utente precedente. Disinstallare il frontend non annulla i suoi interventi.** Una release tracciabile aiuta a ricostruire la provenienza del pacchetto, ma non autentica ogni dipendenza o download successivo.

#### FR33THY, WinSux e ZapTweaks

Il profilo FR33THY collega alternative diverse, non un'unica procedura da applicare integralmente. **WinSux** è un one-click: nel commit esaminato scarica e avvia componenti esterni, avvia più fasi automatiche anche dopo un riavvio in modalità provvisoria, usa PowerShell elevato e modifica numerose aree del sistema. Nei sorgenti si vedono, fra l'altro, interventi su UAC, Defender/SmartScreen, integrità memoria/VBS, firewall e attività di sicurezza; rimozione di Edge, app e feature Windows; cambi a servizi, attività pianificate, driver, risparmio energetico USB/rete e configurazioni di sistema. La prima fase invoca DDU per rimuovere driver audio e GPU di più produttori e riavviare. Non è una “pulizia leggera” né una prova di latenza: rimozioni e modifiche in blocco rendono difficile attribuire gli effetti e tornare esattamente allo stato iniziale [14][20].

**Ultimate** è più modulare: il repository separa controlli/benchmark, reinstallazione e setup, installer, driver/impostazioni grafiche, Windows, hardware e opzioni avanzate. Il suo script **BIOS Check** è una checklist stampata, non un rilevamento automatico della scheda: propone fra l'altro EXPO e PBO per AMD, ReBAR, disattivazione di funzioni considerate inutilizzate e ventole/pompa al massimo. Sono suggerimenti generici da valutare con manuale, CPU, raffreddamento e uso, non una configurazione AM5 universale [21]. Nelle sezioni avanzate il repository contiene anche modifiche a Defender/firewall, servizi, timer, priorità, MPO e driver: la presenza di script separati non dimostra che ognuno sia utile o reversibile sul tuo PC. Il video Ultimate è una panoramica, non il changelog né il manuale di ogni script. Se lo consulti come alternativa, parti da verifiche/inventario e leggi il codice della specifica revisione prima di qualsiasi applicazione; non usare URL di esecuzione remota come `iwr | iex`. Un commit fissato non autentica i download variabili puntati dal codice [14][20].

In particolare, lo script NVMe “faster” esaminato avverte di incompatibilità con DirectStorage, e il suo ramo di ritorno cancella una chiave più ampia dei soli valori aggiunti. Non è un driver OEM scelto tramite Hardware ID, né una baseline per principianti. Non vengono qui consigliati aumenti di tensione, C-state OFF per categoria di CPU o disabilitazioni di sicurezza tratti da un one-click.

Il **wizard ZapTweaks** verificato organizza inventario, informazioni hardware, controllo Windows Update, driver, app, debloat, privacy/interfaccia, preview, applicazione e report. La sua “baseline” è un inventario CPU/GPU/RAM/build, non un benchmark. L'apertura di Windows Update e la conferma dell'utente non provano che tutti gli update siano riusciti; contare dispositivi senza INF non certifica driver ottimali [15].

Nel percorso esaminato selezioni app WinGet, AppX riconosciute dell'utente corrente e una scelta End Task nella taskbar. Controlla la preview e il risultato di ogni elemento. Il wizard **non applica tuning rete, servizi o sicurezza**: il TCP Optimizer è distinto. Il journal/snapshot nativo aiuta a ricostruire le impostazioni, ma non recupera automaticamente dati app cancellati e non va attribuito ai percorsi legacy. Non è stato provato un beneficio prestazionale locale.

### Pack Prime Build opzionale

Il [pack First Setup v4 già presente](../discord-revisione-v5/pacchetti/PrimeBuild-FirstSetup-v4.zip) raccoglie un menu per app, diagnostica, input e avvio audio. Non è un requisito per seguire i passaggi manuali e non applica automaticamente gli altri menu. Il [README degli script](../discord-revisione-v5/scripts/README.md) descrive privilegi e limiti: sorgenti non firmati, Windows 11 client build 26200+, cartelle script/TEMP senza `!`, provenienza dell'intero ZIP da verificare e collaudi funzionali ancora pendenti.

Se lo scegli in una successiva attività autorizzata, estrai il pack intero in una cartella nuova e usa il launcher BAT, senza mescolare file o versioni. First Setup richiede elevazione per le azioni amministrative. La coda distingue installazioni WinGet da URL che aprono pagine: pagina aperta non significa app installata. Le voci WinUtil/Winhance non eseguono un launcher remoto; installazioni silenziose e accordi automatici delle voci WinGet sono invece azioni del pack da leggere prima della conferma.

La policy driver opzionale conserva lo stato precedente di quella sola impostazione in `%LOCALAPPDATA%\PrimeBuild\Backups\WU-driver-policy.json`, nel profilo che esegue l'azione elevata. Credenziali di un altro amministratore possono quindi usare un altro profilo. Il ritorno verifica identità e stato e archivia il backup: non ripristina driver, GPO o tutto Windows. Se fallisce, conserva messaggio e backup; non forzare il registro. I pack correnti non annullano i vecchi preset di timer, servizi o MMCSS.

### Media personalizzati: quando ha senso

Per una singola installazione, ISO Microsoft conservata, Rufus e selezioni manuali sono più facili da controllare. I builder restano alternative legittime quando serve automatizzare un percorso già verificato. Un **answer file**, spesso `autounattend.xml`, contiene risposte per Setup e può avviare script: non è innocuo per il solo fatto di essere XML.

**Win11 Creator di CTT/WinUtil** richiede una ISO Microsoft originale, montaggio/verifica, scelta edizione, eventuali driver e export ISO/USB. Prepara spazio temporaneo (circa 10–15 GB). L'edizione Pro preselezionata non crea una licenza Pro. La verifica di struttura WIM/ESD non sostituisce la verifica dell'origine. Prima di eseguire, considera che account locale/unattended, bypass hardware, cifratura, rimozioni, policy e task possono essere azioni fisse dello snapshot, non caselle indipendenti. L'esportazione ISO richiede `oscdimg`; la scrittura USB cancella il dispositivo. **Inject current system drivers richiede `sources\install.wim`; se la ISO contiene `install.esd`, lascia disattivata l'opzione** [11].

Il percorso documentato dell'interfaccia è **Browse → Mount & Verify ISO → scelta edizione → driver facoltativi → Run Modification → export ISO/USB**; la barra indica l'avanzamento. Il pannello documenta 19 app e stima dimensioni vicine all'originale, non una mini-ISO garantita. Se **Create USB** cancella la chiavetta, non usare l'unica copia dei dati. L'export dei driver può includere solo una parte delle suite OEM: controlla anche `C:\Windows\Drivers` e conserva gli installer del produttore. Se la ISO include `install.esd`, l'iniezione dei driver non è disponibile con quel percorso.

**WIMUtil di Winhance** richiede una ISO Microsoft ufficiale e una directory di lavoro con circa 15–20 GB liberi. Il percorso dell'interfaccia va da **Select ISO** alla directory di lavoro, **Start Extraction**, scelta di un XML e driver facoltativi, quindi **Create ISO** tramite `oscdimg`/ADK: usa solo i passaggi presenti nella release. La conversione WIM↔ESD riguarda compressione e formato, non latenza gaming. Un XML personale può catturare gli stati Optimize/Customize del PC di preparazione; il template della release esaminata contiene già bypass, interventi OOBE/rete e abilitazione .NET 3.5. Zero app selezionate **non produce automaticamente un XML neutro**. Le app esterne non sono incluse nell'XML; il collegamento Install Winhance richiede rete. Se rimuovi Edge senza preparare un altro browser completo, puoi perdere il percorso pratico di download [12].

Per entrambi i builder conserva originale, output, configurazioni e log. **Non sovrapporre unattended Rufus, Winhance e FR33THY.** Un profilo creato dalle impostazioni del PC corrente non equivale al template remoto UnattendedWinstall: se non vuoi catturare quello stato, usa un ambiente separato. Prima del PC principale prova il media in una VM o su un disco cancellabile; dopo il test controlla Windows Update, Store, cifratura e servizi, perché riabilitare un servizio non ricrea task o app rimossi. Il ripristino del sistema personalizzato può richiedere un'immagine di backup o una reinstallazione da originale, non la disinstallazione del programma che ha costruito la ISO. Microsoft documenta limitazioni di SetupComplete con chiavi OEM: non garantire l'installazione automatica di tutti i pacchetti su Home/Pro OEM [16].

## 9. Energia, scheduler e sicurezza

### Piano Windows, modalità e profilo OEM

Il **piano di alimentazione** regola politiche energetiche; la modalità nelle Impostazioni aggiunge preferenze dove supportata. Il profilo OEM di un notebook può inoltre controllare potenza e ventole. Annota tutti e tre, insieme all'alimentazione da rete o batteria, prima di confrontare.

Apri **Impostazioni → Sistema → Alimentazione e batteria**, o Alimentazione su desktop; poi **Pannello di controllo → Opzioni risparmio energia** per il piano attivo. Il piano Bilanciato sulle piattaforme moderne può aumentare rapidamente le prestazioni quando serve: non significa CPU sempre lenta. Prestazioni elevate o una modalità più aggressiva possono modificare transizioni e reattività, ma aumentare calore e rumore fino a peggiorare il boost sostenuto.

Prova soltanto piani/modalità disponibili e supportati. `powercfg /a`, da Terminale, legge gli stati di sospensione supportati; su Modern Standby alcuni piani classici o Ultimate Performance possono non essere disponibili. Non forzarli tramite registro per imitare un desktop differente.

Per una prova ripetibile:

1. Registra piano, modalità e profilo OEM iniziali (**A**); scegli una scena ripetibile, stessa risoluzione, cap FPS, applicazioni e durata.
2. Lascia assestare temperature e caricamenti. Su notebook usa la stessa alimentazione e non cambiare anche il profilo ventole.
3. Cambia una sola scelta (**B**), ripeti e registra andamento dei frame time, potenza, temperature e frequenze effettive, non soltanto FPS medi.
4. Torna ad A e ripeti. Se B non migliora in modo concordante o introduce regressioni, conserva A.

Il **frame time** descrive l'intervallo temporale dei frame nella metrica raccolta, non la latenza completa input→fotone. Una frequenza a riposo più alta o il minimo CPU al 100% non dimostrano un vantaggio; il minimo al 100% può anche impedire risparmi energetici e il contatore CPU non dice da solo dove il gioco stia attendendo. La [guida misure](12-misure-verifica.md) approfondisce i confronti; il metodo essenziale è già qui.

### Boost, C-state, parking, E-core e SMT

Questi controlli non formano un preset da cumulare. Prima servono piattaforma e driver corretti; poi un sintomo e un'ipotesi.

- **Boost** aumenta frequenza entro limiti di carico, potenza e temperatura. Disabilitarlo può servire a una diagnosi termica o a preferenze di rumore/autonomia, ma può ridurre le prestazioni. Se il controllo è documentato, salva lo stato, cambia solo quello e verifica il carico reale; ripristina il valore precedente. Non sbloccare opzioni nascoste come primo intervento.
- **C-state** riducono consumo dei core inattivi. Il ritorno all'attività ha un costo dipendente dalla piattaforma; disabilitarli può cambiare jitter in casi specifici ma anche aumentare calore e ridurre margine di boost. “Intel K” non è una prova. Una voce documentata si confronta singolarmente, con monitoraggio termico e ritorno allo stato registrato.
- **Core parking** permette a Windows di evitare temporaneamente alcuni processori logici quando non servono. Non significa core eliminati. Confronta prima i piani supportati; per attribuire un problema al parking servono dati di scheduling, non l'idea che “tutti sbloccati” sia sempre meglio.
- **E-core** sulle CPU ibride aggiungono capacità e possono aiutare i carichi concorrenti. Escluderli può aggirare un problema specifico, ma riduce capacità complessiva. Solo con sintomo ripetibile e controllo documentato prova l'esclusione, poi riabilitali se non è utile; non copiare maschere da un'altra CPU.
- **SMT** consente a due processori logici di condividere risorse di un core fisico. Disabilitarlo può favorire alcuni carichi e penalizzarne altri. Una prova firmware richiede riavvio, stessa scena e controllo anche di voce, streaming e multitasking; conserva il valore iniziale.

**MSI/MSI-X** sono modalità di segnalazione interrupt tramite messaggi, non installer MSI e non priorità massima. Supporto e uso dipendono dal driver. Forzarli può rendere un dispositivo inutilizzabile. L'hand-off EHCI/XHCI riguarda, dove esposto, il passaggio del controllo USB dal firmware al sistema: non è un interruttore generale di input lag. Priorità interrupt, timer, affinità e forzature restano interventi specialistici nella [guida parametri Windows](11-parametri-windows.md), non passaggi del primo setup.

### Game Mode, Game Bar, catture e HAGS

Tenere attiva la modalità gioco, in **Impostazioni → Giochi → Modalità gioco**, è una base ragionevole, non una certificazione. Un confronto OFF ha senso per un problema ripetibile e termina ripristinando lo stato annotato se la modifica non è utile.

**Xbox Game Bar** è distinta: con **Win+G** verifica overlay e funzioni realmente usate. In **Giochi → Acquisizioni** controlla la registrazione in background, per esempio “Registra quello che è successo”. Se non serve, disattiva quella funzione. È diverso dal disinstallare Game Bar o lo stack Xbox, da cui giochi e accessori possono dipendere. Per recuperare riattiva la stessa opzione e prova chat/cattura se rientrano nell'uso normale.

**HAGS**, Hardware-Accelerated GPU Scheduling, trasferisce parte dello scheduling GPU ad alta frequenza a un processore dedicato della GPU; Windows mantiene le decisioni di priorità. Non è Reflex e non elimina ogni coda [17]. Dove supportato trovi il controllo in **Sistema → Schermo → Grafica → impostazioni grafiche predefinite/avanzate**, secondo build. Annota stato, GPU e driver, cambia solo ON/OFF, **riavvia** e ripeti la scena e le funzioni di cattura. Alcune funzioni, inclusa Frame Generation in determinate implementazioni, possono richiederlo: controlla i requisiti prima. Per tornare indietro ripristina lo stato e riavvia. Non esiste un ON/OFF universale, né un obbligo universale di abbinarlo a MPO.

Mantieni **TPM, Secure Boot, Defender, firewall e protezioni come integrità della memoria/VBS** nella baseline. Possono avere costi dipendenti dal carico, ma spegnerle cambia sicurezza e talvolta requisiti degli anti-cheat. Non è equivalente a chiudere un launcher. Nessun colore di LatencyMon o benchmark di un'altra CPU giustifica automaticamente quelle disattivazioni.

## 10. Background e servizi: il numero non è l'obiettivo

Un launcher disabilitato in App di avvio non parte al login, ma può essere già aperto e continuare download, sync o overlay. Chiudilo dalla sua interfaccia e verifica Gestione attività. Le autorizzazioni per le attività in background di Windows esistono solo per alcune app: non controllano ogni programma desktop.

I **servizi** lavorano anche senza finestra. “Manuale” può significare avvio su evento, non inutilità. Con `services.msc` leggi descrizione e dipendenze. Se devi intervenire su un servizio opzionale identificato, conserva tipo di avvio, eventuale avvio ritardato e stato in esecuzione; cambia una sola voce, prova la funzione dipendente e ripristina gli stessi valori in caso di regressione. Non cambiare in blocco le voci da Manuale a Disabilitato e non spegnere update, storage, rete, audio o sicurezza.

L'obiettivo finale è un PC che funziona con **le applicazioni che userai davvero**: gioco, voce, Alt-Tab, sospensione, rete, update e accessori. Fai una prima lettura con gli strumenti diagnostici, poi chiudili per il confronto finale: anche il monitoraggio introduce lavoro. Conserva soltanto modifiche comprese e utili in prove concordanti. Se non riesci a ricostruire lo stato, usa inventario e backup invece di sommare un altro optimizer.

## 11. La baseline da conservare

Alla fine del setup non ti serve un desktop “minimale”. Ti serve un sistema di cui puoi rispondere a quattro domande:

1. Che cosa è installato e da quale fonte?
2. Quali driver e firmware sono attivi?
3. Quali modifiche ho fatto e come le annullo?
4. Come misuro se un cambiamento ha migliorato qualcosa?

Compila un registro semplice:

| Campo | Esempio |
|---|---|
| Windows | 25H2 o 26H2, build, edizione, data ultimo update. |
| Firmware | Versione BIOS/UEFI, data, impostazioni cambiate. |
| Driver | GPU, chipset, storage, rete, audio; versione e provenienza. |
| Energia | Piano, modalità, profilo OEM, alimentazione. |
| Applicazioni | Solo quelle necessarie; runtime e versione. |
| Modifiche | Una riga per modifica, con stato iniziale e ritorno. |
| Misure | Scena, durata, frame time/commit/driver latency e data. |

Verifica accesso all'account, cifratura, aggiornamenti, Store, display, rete, audio, sospensione e gioco. Una base stabile e aggiornabile è il risultato del setup; una riduzione della latenza è una domanda successiva da misurare, non il timbro che si ottiene completando una lista.

## Miti da chiudere

**“Più RAM libera significa più prestazioni.”**  
No. La RAM usata come cache evita letture dal disco. Un sistema con molta standby list può essere più reattivo di uno con la RAM “vuota”. La domanda utile è se il commit è sotto controllo e se un processo consuma memoria in modo anomalo.

**“Disattivare il pagefile elimina gli stutter.”**  
No. Riduce il commit limit, può impedire i crash dump e può far fallire allocazioni anche quando la RAM sembra libera. Se il paging è frequente, la causa è la pressione di memoria o un'applicazione, non il file in sé.

**“La formula giusta è 1,5× o 2× la RAM.”**  
Non esiste una formula universale. Il pagefile dipende dal tipo di crash dump e dal picco del commit. La gestione automatica è una base ragionevole; una dimensione manuale richiede dati, non una proporzione copiata.

**“26H1 è l'aggiornamento 2026 per tutti.”**  
No. 26H1 è un ramo OEM preinstallato, non offerto via Windows Update ai PC esistenti e non percorso di upgrade verso 26H2. Per un PC 24H2/25H2 il riferimento è 26H2.

**“Il driver più recente è sempre il migliore.”**  
No. Contano modello, revisione, note del vendor e compatibilità con la build. Con 26H2 conta anche il nuovo criterio di fiducia del kernel: un driver vecchio può essere bloccato, ma un driver “nuovo” non certificato non è automaticamente una buona scelta.

**“Debloat significa meno latenza.”**  
No. Rimuovere app o servizi può ridurre lavoro in background, ma non dimostra un miglioramento di latenza. Un one-click che cambia in blocco servizi, sicurezza e driver rende difficile capire che cosa ha funzionato e come tornare indietro.

**“Ultimate Performance, C-state OFF e HAGS ON sono sempre meglio.”**  
No. Sono scelte dipendenti da piattaforma, carico, temperatura e driver. Possono migliorare una scena e peggiorarne un'altra. Vanno provate una alla volta, con ritorno allo stato iniziale.

**“Disattivare Defender o VBS regala FPS.”**  
No. Può cambiare il costo di alcune operazioni, ma altera sicurezza e a volte i requisiti degli anti-cheat. Non è una baseline e non è giustificato da un singolo numero.

## Fonti e limiti delle evidenze

Le fonti del progetto sono istantanee documentali raccolte nell'ottobre 2026. Un sorgente letto non autentica automaticamente il binario di release o i suoi download successivi. Non sono stati collaudati firmware, storage, OOBE, installer, builder, rollback o guadagni su hardware del lettore. Le fonti 22–30 sono state consultate il 23 ottobre 2026 per aggiornare la parte su versioni, memoria e driver.

1. Microsoft, [Introduction to the page file](https://learn.microsoft.com/en-us/troubleshoot/windows-client/performance/introduction-to-the-page-file). Riferimento per commit e dump; il setup mantiene la gestione automatica.
2. Microsoft Sysinternals, [Process Explorer](https://learn.microsoft.com/en-us/sysinternals/downloads/process-explorer) e [Autoruns](https://learn.microsoft.com/en-us/sysinternals/downloads/autoruns).
3. Microsoft, [Download Windows 11](https://www.microsoft.com/en-us/software-download/windows11).
4. Rufus, [sito ufficiale](https://rufus.ie/en/) e [FAQ fissata](https://github.com/pbatard/rufus/wiki/FAQ/1b7c603c439a04d007d72d36063fc378a8930685). Indicazioni del progetto, non garanzia OOBE futura.
5. ASUS, [aggiornamento BIOS](https://www.asus.com/support/faq/1044348/); Microsoft, [sospensione BitLocker per aggiornamenti non Microsoft](https://learn.microsoft.com/en-us/troubleshoot/windows-client/windows-security/suspend-bitlocker-protection-non-microsoft-updates). Esempio ASUS: prevale il manuale del modello reale.
6. Intel, [VMD/RST](https://www.intel.com/content/www/us/en/support/articles/000057787/memory-and-storage/intel-optane-memory.html); ASUS, [disco non rilevato in Setup](https://www.asus.com/support/faq/1044458/); Microsoft, [StorNVMe](https://learn.microsoft.com/en-us/windows-hardware/drivers/storage/nvme-features-supported-by-stornvme).
7. Microsoft Support, [passaggio fra account locale e Microsoft](https://support.microsoft.com/en-us/windows/change-from-a-local-account-to-a-microsoft-account-395203bf-9f1b-eb24-b042-5b8dae6c1d20).
8. Microsoft, [WinGet](https://learn.microsoft.com/en-us/windows/package-manager/winget/), [install](https://learn.microsoft.com/en-us/windows/package-manager/winget/install), [source](https://learn.microsoft.com/en-us/windows/package-manager/winget/source), [download](https://learn.microsoft.com/en-us/windows/package-manager/winget/download).
9. Microsoft, [Visual C++ Redistributable supportati](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-170); TechPowerUp, [raccolta All-in-One](https://www.techpowerup.com/download/visual-c-redistributable-runtime-package-all-in-one/).
10. Microsoft, [DirectX End-User Runtimes June 2010](https://www.microsoft.com/en-us/download/details.aspx?id=8109); TechPowerUp, [raccolta DirectX offline](https://www.techpowerup.com/download/directx-redistributable-runtime/).
11. WinUtil, [documentazione Creator al commit verificato](https://github.com/ChrisTitusTech/winutil/blob/07ccd8e2e755a706f31569808b31f5b77acad6a9/docs/src/content/docs/guides/win11creator.mdx) e [script ISO](https://github.com/ChrisTitusTech/winutil/blob/07ccd8e2e755a706f31569808b31f5b77acad6a9/functions/private/Invoke-WinUtilISOScript.ps1).
12. Winhance, [configurazioni](https://winhance.net/docs/guides/configuration-files.html), [WIMUtil](https://winhance.net/docs/guides/wimutil.html), [Autounattend](https://winhance.net/docs/guides/autounattend.html), [template della release verificata](https://github.com/memstechtips/Winhance/blob/f23d554eb2d6400b1827bcc46b91294ffa53fbc9/src/Winhance.UI/Features/Common/Resources/AdvancedTools/autounattend-template.xml).
13. Wintoys, [Store dell'app](https://apps.microsoft.com/detail/9p8ltpgcbzxd), [FAQ autore](https://bogdan-patraucean.github.io/about/wintoys/faq) e [limiti offline](https://bogdan-patraucean.github.io/about/wintoys/offline).
14. FR33THY, [Ultimate fissato](https://github.com/FR33THYFR33THY/Ultimate/tree/a0a33a57078434201f582b0db5107dcbb502292a) e [WinSux fissato](https://github.com/FR33THYFR33THY/WinSux/tree/91adbfd63b7ed2eb5fcf0821fd53405a3cf63573); sorgenti consultati in sola lettura, non eseguiti.
15. ZapTweaks, [wizard al commit verificato](https://github.com/PrimeBuild-pc/ZapTweaks/blob/f2d190387e21e8aee8a1d0f8818e7792ebfaaf6e/lib/features/setup/presentation/guided_setup_page.dart); [analisi statica del progetto, §3](../analisi/VERIFICA-TOOL-PRIMEBUILD-RETE-V3.md).
16. Microsoft, [script durante Windows Setup e limiti SetupComplete](https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/add-a-custom-script-to-windows-setup?view=windows-11).
17. Microsoft DirectX, [Hardware Accelerated GPU Scheduling](https://devblogs.microsoft.com/directx/hardware-accelerated-gpu-scheduling/). Descrive il meccanismo introdotto nel 2020, non un confronto ON/OFF sulla build corrente.
18. Microsoft Support, [reinstallare Windows con il supporto di installazione](https://support.microsoft.com/en-us/windows/reinstall-windows-with-the-installation-media-d8369486-3e33-7d9c-dccc-859e2b022fc7). La sequenza descrive un'installazione pulita; il numero del disco nell'esempio non identifica il bersaglio sul PC del lettore.
19. FR33THY, [AM5 (BIOS Settings & Overclock Guide)](https://www.youtube.com/watch?v=POFZSTsX0w8), guida video di terzi e commento dell'autore con correzione sui limiti PBO; esempio AM5, non valori universali. Consultato il 13 ottobre 2026.
20. FR33THY, [WinSux](https://www.youtube.com/watch?v=-eEuodGf3sE) e [Ultimate](https://www.youtube.com/watch?v=Xc7l8PCTJyg), video introduttivi collegati dai README dei rispettivi repository. La descrizione non sostituisce il codice; nessuno script è stato eseguito.
21. FR33THY, [Ultimate — BIOS Check](https://github.com/FR33THYFR33THY/Ultimate/blob/a0a33a57078434201f582b0db5107dcbb502292a/1%20Check/1%20Bios%20Check.ps1), script che stampa indicazioni generiche, non modifica o rileva automaticamente il BIOS.
22. Microsoft, [Windows 11 release information](https://learn.microsoft.com/en-us/windows/release-health/windows11-release-information). Date di disponibilità, build e fine del supporto per 25H2, 26H1 e 26H2.
23. Microsoft, [Windows 11, version 26H1 for IT pros](https://learn.microsoft.com/en-us/windows/whats-new/windows-11-version-26h1). Release specializzata, non feature update; percorso di aggiornamento distinto.
24. Microsoft, [What's new in Windows 11, version 26H2](https://learn.microsoft.com/en-us/windows/whats-new/whats-new-windows-11-version-26h2). Enablement package, servicing, driver trust e funzionalità abilitate.
25. Microsoft, [Windows 11, version 26H2 known issues](https://learn.microsoft.com/en-us/windows/release-health/status-windows-11-26h2). Stato del rollout e problemi noti, inclusi i dispositivi USB Audio Class 1.0.
26. Microsoft, [How to determine the appropriate page file size for 64-bit versions of Windows](https://learn.microsoft.com/en-us/troubleshoot/windows-client/performance/how-to-determine-the-appropriate-page-file-size-for-64-bit-versions-of-windows). Minimi per i dump, commit limit e crescita del pagefile gestito dal sistema.
27. Microsoft, [Identify processes with large working sets](https://learn.microsoft.com/en-us/windows-hardware/test/wpt/memory-footprint-optimization-exercise-1). Relazione fra memoria in uso, available, standby e modified.
28. Microsoft, [Advancing Windows driver security: removing trust for the cross-signed driver program](https://techcommunity.microsoft.com/blog/windows-itpro-blog/advancing-windows-driver-security-removing-trust-for-the-cross-signed-driver-pro/4504818). Criterio WHCP, allow list e fase di valutazione.
29. Microsoft, [What's new in Windows 11, version 25H2](https://learn.microsoft.com/en-us/windows/whats-new/whats-new-windows-11-version-25h2). Enablement package e ciclo di servicing della versione 25H2.
30. Microsoft, [Working Set](https://learn.microsoft.com/en-us/windows/win32/memory/working-set). Definizione di working set, hard fault e soft fault.

La [verifica setup e strumenti del progetto](../analisi/VERIFICA-SETUP-E-STRUMENTI-V3.md) conserva commit, provenienza e limiti delle copie lette, compresi accessi 403 a pagine Dell/Microsoft non usati come consultazioni riuscite. Le informazioni su piani, servizi e scelte firmware non sostituiscono la documentazione del modello: non è stato fornito un hardware su cui verificare quei controlli.
