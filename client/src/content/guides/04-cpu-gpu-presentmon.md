# CPU e GPU: la pipeline, PresentMon e il collo di bottiglia

Un gioco può mostrare molti frame al secondo e rispondere ai comandi con un ritardo percepibile. Può anche avere una media FPS alta e presentare scatti. Sono problemi diversi: la media descrive **quanto lavoro viene prodotto**, non **quanto tempo impiega un comando a diventare luce sul pannello**, né **quanto regolarmente arrivano le immagini**.

Questa guida spiega come leggere la pipeline CPU→GPU→presentazione e come usare PresentMon per costruire un confronto ripetibile. Il riferimento è **PresentMon 2.6.0** (21 settembre 2026) su Windows 11 25H2/26H2; versioni successive, driver, giochi e anti-cheat non sono certificati in anticipo [1][8]. Le procedure sono descritte, non eseguite su questo PC. Non serve modificare Windows, installare un limiter o applicare un preset per capirle.

## 1. Dal comando all'immagine: un percorso con più code

La CPU esegue la parte del motore che legge i controlli, aggiorna simulazione, fisica e animazioni e prepara i comandi grafici. Il momento in cui viene campionato un input dipende dal gioco: non coincide necessariamente con l'inizio di ogni frame. Una parte del lavoro può essere distribuita su più thread, ma le dipendenze fra loro contano quanto il numero di core. Un thread che coordina la simulazione può dettare il ritmo anche quando molti altri core sono liberi.

Driver e sistema operativo partecipano all'invio e alla pianificazione dei comandi. La GPU li esegue per costruire geometria, ombre, illuminazione e post-processing. Grafica, compute e copie possono usare motori o code differenti: talvolta lavorano insieme, talvolta aspettano un risultato necessario. L'immagine finita passa poi alla presentazione, allo **scanout** — l'invio progressivo dell'immagine al display — e all'elaborazione e alla risposta luminosa del pannello.

La chiamata `Present()` consegna al sistema un buffer da presentare; **non afferma che il rendering sia già terminato o che tutti i pixel siano visibili**. Mentre la GPU disegna il frame N, la CPU può preparare N+1. Questa sovrapposizione aumenta le immagini producibili per unità di tempo, ma permette anche di accumulare lavoro in anticipo. Se la CPU prepara frame più velocemente di quanto la GPU li smaltisca, un frame può restare in coda: quando raggiunge il monitor contiene un input ormai meno recente.

Il **frame time** è un intervallo fra eventi successivi. A una cadenza costante di 100 FPS corrispondono 10 ms per intervallo; a 200 FPS, 5 ms. La **latenza** segue invece un evento lungo un percorso con inizio e fine dichiarati. Una pipeline può consegnare un frame ogni 5 ms pur impiegando molto più tempo a mostrare il risultato di un comando, perché più frame sono in lavorazione o in attesa contemporaneamente.

Anche gli intervalli hanno estremi diversi: inizio CPU→inizio CPU, Present→Present e cambio d'immagine→cambio d'immagine non sono la stessa serie. Prima di confrontare numeri, chiediti: *che cosa è iniziato, che cosa è finito e a quale frame appartengono gli eventi?* Le durate ISR/DPC dei driver e il RTT della rete non rispondono a questa domanda: non sono frametime né misure fisiche clic→fotone.

**La coda non è tutta colpa della CPU.** Un cap, V-Sync, una tecnologia di latenza o un engine che prepara in anticipo possono cambiare quante immagini sono in volo. NVIDIA descrive Reflex come una sincronizzazione CPU/GPU che punta a completare il lavoro “just in time”, riducendo la coda di rendering e la pressione sulla CPU nei casi GPU-bound [10]. Non è un aumento di FPS: è una diversa distribuzione del lavoro e dell'attesa.

## 2. PresentMon: componenti distinti, non un solo contatore

PresentMon è un progetto open source utilizzabile anche con hardware non Intel. Comprende parti con compiti diversi [1]:

- Il **collector** raccoglie e analizza eventi ETW, le tracce temporali emesse da Windows.
- Il **servizio** combina i dati sui frame con la telemetria hardware disponibile, per esempio potenza e temperatura.
- La **Capture Application** configura overlay e acquisizioni per frame attraverso il servizio. Il suo overlay è una finestra con rendering Direct3D, non coincide con il collector.
- La **Console Application** permette di selezionare processi ed esportare CSV, senza lo stesso percorso grafico dell'app.

CapFrameX, OCAT, RTSS e altri strumenti possono usare PresentMon. Due contatori diversi possono partire dalla stessa fonte, ma applicare finestre statistiche o filtri differenti. Non sono automaticamente due misure indipendenti.

La versione 2.6.0 aggiunge metriche per la **compilazione dei PSO** (Pipeline State Object) Direct3D 12, eventi di flip più recenti, supporto multi-dispositivo e un campo **Animation Time**, cioè un riferimento temporale all'inizio del lavoro di animazione CPU sul frame [8]. Sono strumenti utili per separare stutter da shader, animazione e presentazione; non trasformano PresentMon in un profiler della latenza fisica.

Le definizioni seguenti fanno riferimento ai README della release 2.6.0, commit `e13fce6acdb55a808fd8318175a56863e532d95f` [1–3]. Il calcolatore open source esaminato separatamente è fissato a un altro commit: aiuta a capire la costruzione delle metriche, ma non costituisce una verifica di ogni binario della release [4].

### Cadenza, lavoro e attesa

| Metrica | Che cosa descrive | Che cosa non dimostra |
|---|---|---|
| Frame Time | Intervallo fra frame lato CPU nella Capture Application | Non è necessariamente l'intervallo fra Present o fra immagini mostrate |
| CPU Busy | Tratto temporale attribuito alla preparazione CPU del frame | Non è utilizzo CPU totale, somma di tutti i thread o tempo di sole istruzioni attive |
| CPU Wait | Attesa attribuita alla CPU prima del frame successivo; nel calcolatore letto deriva dal tempo in Present | Un valore alto non identifica da solo una CPU lenta |
| GPU Busy | Tempo durante il quale almeno un motore GPU esegue lavoro del processo osservato | Non è la somma delle code concorrenti né il carico di tutta la scheda |
| GPU Time | Intervallo dall'inizio al completamento del lavoro GPU attribuito al frame | La GPU non deve essere attiva per tutto l'intervallo |
| GPU Wait | Parte inattiva interna a GPU Time | Non è tutta l'inattività fra due frame e non è l'attesa in coda prima dell'avvio GPU |
| Presented FPS / Presented Frame Time | Cadenza delle chiamate Present | Non garantisce che tutti i frame vengano mostrati |
| Displayed FPS / Displayed Frame Time | Cadenza dei cambi di frame rilevati sul percorso display | Non misura da sola la luce del pannello, il VRR o la frequenza della simulazione |
| Dropped Frames / Displayed Time | Frame non mostrati e durata di esposizione attribuita ai frame mostrati | Uno scarto non va cancellato automaticamente come errore del file |
| PSO compilation | Conteggio, durata e percentuale di lavoro di compilazione PSO attribuiti al frame | Non è la causa di ogni stutter e non misura il tempo di gioco perso dall'utente |
| Animation Time | Riferimento all'inizio del lavoro di animazione CPU sul frame | Non è una latenza input→display né una durata completa del frame |

**Busy non significa sempre “risorsa che calcola senza aspettare”.** Nel codice consultato, CPU Busy usa l'intervallo fra l'inizio CPU attribuito al frame e l'inizio della sua Present, oppure timestamp propagati dall'applicazione quando disponibili. Una pausa per attendere un worker, un asset o un limiter prima di Present può ricadere nel tratto chiamato Busy. CPU Wait usa invece la durata della chiamata Present. Sono intervalli ricostruiti, non un profiler delle istruzioni eseguite [4].

Nel calcolatore il tempo CPU è composto da Busy e Wait. Questo non autorizza a imporre la stessa identità a qualsiasi colonna chiamata “frametime”: gli estremi possono essere diversi, e anche l'inizio CPU è condizionato dalla strumentazione. Un cap, cioè un limite di framerate, può spostare un'attesa fra i tratti osservati senza cambiare il costo della simulazione.

Sul lato GPU, il lavoro simultaneo di grafica e compute non va contato due volte come durata trascorsa. GPU Busy descrive l'attività attribuita al processo, mentre GPU Time comprende anche pause durante il suo completamento. Nel calcolatore GPU Wait deriva dalla differenza non negativa fra durata GPU ricostruita e GPU Busy **del frame**; GPU Time viene poi restituito come Busy + Wait. Se l'attività attribuita supera la durata ricostruita, Wait viene limitato a zero e Time coincide con Busy: il risultato non è sempre una sottrazione diretta di timestamp. È una costruzione della metrica, non un metodo per ricostruire una coda sottraendo medie [3–4]. Un intervallo allungato può coinvolgere dipendenze o contesa; quel campo non indica quale processo o quale coda ne sia responsabile.

La percentuale **GPU Utilization** appartiene a un altro piano: è telemetria sull'utilizzo della risorsa, non una durata in millisecondi. Desktop, browser, OBS e codifica possono impegnare la GPU senza comparire tutti nel Busy del gioco. Una scheda molto occupata non è necessariamente occupata soltanto da quel processo; Busy basso del gioco non significa GPU globalmente libera.

## 3. Le latenze: conservare gli estremi, non soltanto il nome

| Campo | Estremi documentati e cautele |
|---|---|
| GPU Latency | Inizio CPU attribuito al frame→inizio del lavoro GPU. Comprende preparazione CPU: non è “queue time” puro |
| Render Present Latency | Chiamata Present→completamento GPU del frame. Non comprende tutta la simulazione precedente |
| Display Latency | La console la descrive come inizio CPU→frame mostrato; il README dell'app usa “frame submission”→scanout. Specificare componente, colonna e versione |
| PC Latency | Ricezione dell'input nel PC→invio del frame al display; richiede strumentazione applicativa compatibile |
| Instrumented Latency | Inizio strumentato del frame→display; l'inizio dipende dai marker disponibili |
| Click To Photon / All Input To Photon Latency | Eventi input associati al frame→display secondo il percorso tracciato. L'etichetta non prova l'impiego di un sensore ottico |
| Animation Error | Differenza fra il delta CPU precedente e quello display; osserva coerenza temporale, non è una diagnosi generica di “CPU e GPU fuori sync” |

La scomposizione a stadi usata dai produttori — input, simulazione, submission, driver, coda, GPU — è utile per **nominare** il percorso [7]. Non è una misura: ogni stadio può avere strumentazione diversa e un nome comune non garantisce estremi comuni. Quando NVIDIA usa **Game Latency** o **Render Latency**, quelle etichette delimitano porzioni diverse e non coprono l'intero percorso fisico: non sono intercambiabili con PC Latency, Display Latency o con un campo PresentMon solo perché contengono la parola “latency”. Segui un input lungo il tempo e conserva nome, versione ed estremi dichiarati.

Per affermare una **latenza fisica clic→fotone** serve un metodo che identifichi l'evento iniziale e osservi il cambiamento luminoso in una regione del pannello. Posizione del sensore, scansione e soglia luminosa influenzano il risultato. PresentMon può ricevere anche misure hardware nei percorsi compatibili, ma un campo presente nel CSV non prova che quei dispositivi siano stati usati [3]. Non aggiungere una stima fissa di mouse e monitor a PC Latency per trasformarla in una misura fisica.

Lo stesso vale per i confronti fra tecnologie. NVIDIA pubblica riduzioni di latenza fino al 75% con Reflex 2 in scenari selezionati, ma sono dati del produttore, non una promessa valida per ogni gioco, GPU e scena [11]. La domanda corretta non è “quanti ms promette la tecnologia?”, ma “quale percorso misura il mio test e quale condizione cambia?”.

## 4. Frame Type, Frame Generation e HAGS

Con **Frame Generation** (FG) una parte delle immagini aggiuntive non nasce da una nuova simulazione del gioco. PresentMon espone **Frame Type**, ma la console indica che il tracciamento richiede strumentazione compatibile dell'applicazione e/o del driver [3]. Non tutte le tecnologie e versioni sono riconosciute nello stesso modo.

Anche la visualizzazione può nascondere differenze: nell'enumerazione del codice consultato, valori non impostati e ripetuti possono avere l'etichetta visibile “Application”; esiste inoltre “Unspecified” [5]. Una scritta generica non dimostra quindi che ogni immagine contenga un nuovo campionamento input. Conserva i valori grezzi e le informazioni sul supporto; se la classificazione non è verificabile, dichiarala incompleta.

La **Hardware-accelerated GPU Scheduling** (HAGS) è una funzione di pianificazione GPU introdotta con WDDM 2.6; richiede supporto di GPU e driver e alcune tecnologie di frame generation la richiedono [9]. Non è automaticamente un guadagno di latenza: cambia chi gestisce la pianificazione e può interagire con driver, capture e giochi. Se la attivi o disattivi, trattala come una variabile separata e verifica con A–B–A.

Per diagnosticare CPU/GPU prepara inizialmente una baseline **senza FG**. Quando la riattivi, separa la cadenza applicativa dalle immagini generate e dai cambi d'immagine mostrati. “240 FPS con FG” e “240 FPS senza FG” non sono workload equivalenti; non dividere i tempi CPU per il moltiplicatore di generazione. Le immagini generate possono aumentare la fluidità percepita, ma non riducono automaticamente la latenza del comando che le ha precedute; con Reflex o Frame Warp il quadro cambia e va misurato a parte [10][11].

## 5. Cercare un limite senza inventare il tempo di coda

Un **limite CPU** significa che il percorso critico lato CPU determina il ritmo. Un **limite GPU** significa che il lavoro GPU lo determina. Non sono proprietà permanenti dell'intero PC: possono cambiare fra scene, risoluzioni e impostazioni. Un utilizzo CPU totale del 25% può convivere con un thread decisivo molto occupato; un singolo core al 100% non basta comunque a dimostrare che sia proprio lui a bloccare il frame.

Questi sono esempi didattici inventati, non acquisizioni:

| Scenario schematico | Frame Time | CPU Busy | GPU Busy | Domanda da verificare |
|---|---:|---:|---:|---|
| Contributi comparabili | 8 ms | 6 ms | 6 ms | Alleggerire la GPU migliora il ritmo o si incontra subito un limite a monte? |
| Possibile limite a monte | 12 ms | 10 ms | 4 ms | Esistono cap, attese di worker, streaming o un percorso CPU critico? |
| Possibile limite GPU | 12 ms | 4 ms | 11 ms | Ridurre soltanto il carico grafico accorcia sia Busy GPU sia intervallo dei frame? |

Nel primo caso, 6 ms CPU e 6 ms GPU non implicano un frame ogni 12 ms: i lavori possono sovrapporsi fra frame. Nel secondo, la distanza fra Frame Time e GPU Busy invita a indagare a monte, ma potrebbe essere un limiter intenzionale o una dipendenza. Nel terzo, il lavoro GPU vicino al ritmo è un indizio coerente, non un verdetto isolato.

Un controllo utile consiste nel ridurre **soltanto la risoluzione interna** o un effetto prevalentemente GPU, mantenendo segnale del monitor, simulazione e sync identici. Esempio ipotetico: con A osservi circa 12 ms di Frame Time e 11 ms di GPU Busy; con B, rispettivamente 8 e 7 ms; tornando ad A riappaiono i valori iniziali. Questo sostiene l'ipotesi che il carico GPU limitasse quella scena. Se il frame resta a 12 ms mentre Busy scende, controlla prima cap, sincronizzazione e tetto display. A ritmo imposto, un carico ridotto può essere il risultato atteso anche senza più FPS.

Esclusi i limiti intenzionali, una scarsa risposta alla riduzione del carico GPU orienta verso CPU, motore o dipendenze. Scene con più fisica, personaggi o comandi di disegno possono fornire altri indizi. Per attribuire il problema a un thread specifico serve però un profiler o una traccia più approfondita, non una percentuale.

**Non esiste una sottrazione universale per il tempo di coda.** L'overlay dimostrativo Intel conservato nel progetto mostra Frame Time medio 7,24 ms, GPU Busy medio 6,07 ms e utilizzo GPU 97,1%. La differenza 1,17 ms non è CPU Busy né queue time: sono medie di grandezze con estremi diversi. Il 97,1% non è 97,1 ms. Mancano inoltre condizioni complete e dati grezzi di quell'esempio [6].

Distingui infine un limite sostenuto dagli **stutter transitori**, gli scatti dovuti a uno o pochi frame lunghi. Entrare in un'area nuova può attivare streaming, compilazione shader, allocazioni o attività concorrenti. Le nuove metriche PSO di PresentMon 2.6.0 aiutano a vedere la compilazione degli shader, ma non ogni stutter è una compilazione e non ogni compilazione produce uno stutter visibile [8]. Busy bassi e intervallo lungo possono indicare attese, non hardware insufficiente. Non esiste un obiettivo obbligatorio “GPU al 95%”: il margine utile dipende da reattività, variabilità e carico abituale, compresa la cattura.

## 6. Preparare e acquisire una prova leggibile

Lo scopo non è trovare il numero più favorevole, ma ottenere dati che permettano di rispondere a una domanda. Prima verifica le regole del gioco e del torneo: collector ETW, finestra overlay e strumenti iniettati sono meccanismi diversi, ma nessuno è automaticamente autorizzato ovunque. Se la policy è incerta, rinuncia all'overlay/injection; non aggirare un blocco dell'anti-cheat.

### Preparazione

1. **Scrivi la domanda.** Per esempio: “questo effetto limita il rendering nella scena con fumo?” oppure “OBS introduce scatti mentre registro?”. Un test sbloccato può servire per il throughput massimo, ma non rappresenta automaticamente il profilo quotidiano con cap.
2. **Registra il riferimento iniziale.** Conserva gioco e versione, API, CPU/GPU, adapter scelto, driver, build Windows e HAGS. Aggiungi qualità, risoluzione interna, risoluzione desktop e segnale attivo, refresh, HDR, modalità finestra, VRR/V-Sync, cap, Reflex/Anti-Lag e FG. Se usi OBS annota scena, sorgente, anteprima ed encoder.
3. **Scegli un percorso ripetibile.** Un benchmark interno, un replay o un'inquadratura controllabile sono preferibili a partite casuali. Prevedi una scena abituale e una critica. Completa il riscaldamento operativo e separa caricamenti e shader iniziali dal tratto già caldo.
4. **Stabilisci durata e ripetizioni prima della prova.** Per esempio, 60 secondi utili e almeno tre acquisizioni per configurazione. È una convenzione pratica, non una garanzia statistica o una durata sufficiente per ogni problema intermittente.
5. **Salva le impostazioni che cambierai.** Annotale o conserva un profilo. Non fare aggiornamenti driver o modifiche OS durante la stessa serie: cambierebbero il riferimento.

### Configurazione della Capture Application

La UI 2.6.0 documentata dalle schermate locali mostra `Process`, `Auto-target`, `Custom → Edit`, durata, hotkey e cartella delle catture. Quelle schermate documentano una visita dell'interfaccia senza processo selezionato né acquisizione di gioco: orientano sui controlli, non attestano risultati.

1. In **Process**, seleziona l'eseguibile del gioco e verifica il PID, il suo identificativo di processo. Non scegliere il launcher. Auto-target cerca il processo con maggiore utilizzo GPU: è comodo, ma con browser o OBS aperti può non essere il bersaglio voluto.
2. Per un overlay essenziale apri **Custom → Edit**. Nel `Loadout Configuration` verifica il **Default adapter**: la scheda corretta è particolarmente importante su notebook e sistemi multi-GPU.
3. Aggiungi Frame Time, CPU Busy e GPU Busy con unità ms e scale confrontabili; affianca CPU Wait e GPU Time/Wait. La UI consente widget `Graph` e `Line`, selezione della statistica e assi distinti. Una lettura `avg` è una media di visualizzazione, non il singolo campione grezzo.
4. In un altro gruppo osserva Presented/Displayed FPS, scarti e Present Mode. Usa Frame Type e latenze soltanto quando supportati e di origine nota. Percentuali, clock, watt e temperature devono restare su gruppi o assi leggibili: non confrontarli verticalmente con i millisecondi come se avessero la stessa unità.
5. Controlla **Overlay Hotkey**, **Preset Cycle Hotkey** e **Capture Hotkey**: devono avere comandi distinti e non confliggere con il gioco. Se usi un arresto automatico, abilita **Capture Duration** e imposta la durata scelta.
6. Verifica **Capture Storage → Open in Explorer** e lo spazio disponibile. Esegui una breve acquisizione di controllo: deve contenere il processo corretto e le colonne necessarie. Se overlay o collector producono errori o alterano il gioco, interrompi e chiarisci il problema prima della serie utile.

Conserva scale, finestra temporale, aggiornamento e statistica dell'overlay uguali fra le configurazioni. `AutoHide 40Hz/10fps`, visibile nelle schermate, riguarda l'interfaccia: non imposta il cap del gioco.

### Acquisizione e ritorno al riferimento

Avvia e termina la cattura tramite la hotkey configurata; evita Alt-Tab durante il tratto utile. La Capture Application 2.6.0 documenta il CSV `pmcap-[executablename]-YYMMDD-HHMMSS.csv` e il riepilogo separato `-stats.csv` sotto `%LOCALAPPDATA%\Intel\PresentMon\Capture`. Controlla comunque il percorso effettivo nella versione usata [2]. Conserva entrambi, intestazioni e originale non filtrato, con le note della configurazione.

Ripeti **A–B–A**: baseline, una sola modifica, ritorno alla baseline. Mantieni percorso, durata e applicazioni concorrenti confrontabili; non alterare contemporaneamente sync e cap. Se i due A divergono quanto A e B, il confronto è inconclusivo. Registra gli eventi estranei; una cattura interrotta va ripetuta, non ripulita selettivamente finché produce il risultato desiderato.

L'overlay serve a orientarsi, ma per il confronto decisivo può essere utile raccogliere CSV senza la sua finestra, mantenendo collector e condizioni identici. La console offre selezione per nome/PID, output scelto, durata finita e hotkey; alcune opzioni disabilitano tracciamento GPU, input o display [3]. Non usare un export ridotto per sostenere una conclusione su dati che hai escluso. Anche escludere preventivamente i frame scartati può nascondere parte del comportamento.

In caso di errore di accesso alla traccia, consulta il requisito ufficiale relativo al gruppo **Performance Log Users** e le policy della macchina [1]. Non disattivare antivirus, UAC o protezioni per forzare la raccolta; l'elevazione non rende un processo automaticamente autorizzato dal gioco. Su macchine gestite chiedi supporto. Prima di condividere file rimuovi informazioni personali non necessarie dalle copie, preservando gli originali.

Il ripristino di una prova consiste nel fermare cattura e overlay, chiudere gli strumenti non necessari e **riportare la singola impostazione provata al valore annotato**, poi ricontrollare il gioco. Non cancellare CSV o profili utili al confronto. Un errore persistente, un crash o un blocco anti-cheat è un motivo per arrestare la serie, non per cambiare hook o accumulare altri tool.

### OBS e cattura: una pipeline in più

OBS non si limita a “leggere” il frame. Deve acquisire una sorgente, comporre la scena, eventualmente ridimensionare o convertire il colore, codificare e scrivere o inviare il video. NVENC usa il motore di codifica NVIDIA, AMF quello disponibile su AMD; x264 è un encoder software e carica la CPU. La codifica hardware alleggerisce la CPU, ma composizione, copie, memoria e filtri continuano a costare, e alcune opzioni richiedono lavoro GPU aggiuntivo. Un encoder hardware non rende gratuita l'intera cattura.

Non basta leggere GPU Busy del gioco per sapere se OBS abbia margine. Il lavoro video può essere svolto da motori diversi e il carico di un altro processo non diventa automaticamente Busy del gioco. PresentMon espone `--track_gpu_video` e **VideoBusy** per l'attività video rilevata del processo osservato: tracciando solo il gioco, non è una misura completa di tutto OBS. Leggi insieme telemetria dei motori e statistiche di OBS, senza ridurle a un unico “utilizzo GPU”.

Nelle statistiche OBS separa tre sintomi: frame saltati per ritardo di **rendering**, frame saltati per ritardo di **codifica** e frame persi per **rete**. Possono coesistere, ma non sono tre nomi della stessa saturazione GPU. Un gioco fluido può avere una registrazione irregolare, oppure il video può sembrare regolare mentre la CPU soffre per x264. Il filmato dello stream non misura il clic→fotone del monitor del giocatore.

Per localizzare il costo confronta la stessa scena con OBS chiuso, con sorgente e anteprima attive ma output fermo, poi con registrazione o streaming attivi, tornando ogni volta al riferimento. Conserva scena, filtri, encoder e metodo di cattura; valuta l'anteprima in una prova separata. Game Capture, Window Capture e Display Capture seguono percorsi diversi. Display Capture non è una ripresa ottica del pannello e non incorpora automaticamente ogni effetto del VRR; Game Capture non garantisce costo zero né compatibilità universale. Gioco, monitor e output possono avere cadenze differenti: un video a ritmo fisso seleziona o ripete immagini da una sorgente variabile, e un cap multiplo della cadenza video non garantisce da solo una fase di campionamento perfetta. Scegli dal sintomo misurato, non da un valore obbligatorio di utilizzo, bitrate o modello hardware.

## 7. Interpretare il CSV e formulare una conclusione

Isola processo, swapchain — l'insieme dei buffer usati per presentare — e tratto utile. Non mescolare menu, finestra secondaria e vista di gioco. Traccia le serie sullo stesso asse temporale, con unità dichiarate. Le medie aiutano a riassumere, ma distribuzione, coda dei frame lenti e sequenza degli eventi spiegano dove si trova uno scatto.

I nomi delle colonne cambiano fra componenti e versioni: la console documenta `MsCPUBusy` e `MsGPUBusy`, l'app `CPUBusy` e `GPUBusy`. Leggi l'intestazione prima di importare e conserva versione, modalità di esportazione e unità: le durate sono in millisecondi, ma i timestamp possono avere un altro formato. Un valore `NA`, assente o non supportato non equivale a zero lavoro. Il README segnala limiti dell'instrumentazione OpenGL/Vulkan e possibili imprecisioni dei tempi GPU con HAGS. Una discrepanza inattesa va verificata, non “corretta” sottraendo un numero fisso.

Un “1% low” richiede anche una definizione dell'algoritmo: non è intercambiabile con qualunque percentile FPS o frametime. CapFrameX documenta almeno due famiglie, la media del peggiore x% e il valore sotto il quale si passa per x% del tempo; MSI Afterburner e altri strumenti possono adottare convenzioni diverse [13]. Se confronti due report, confronta anche il metodo.

- **Frame Time e GPU Busy aumentano insieme:** lavoro GPU maggiore è un'ipotesi plausibile, da verificare alleggerendo una sola variabile grafica.
- **CPU Busy cresce mentre GPU Busy cambia poco:** indaga il percorso CPU, comprese le attese inglobate dalla metrica.
- **CPU Wait lungo con sync/cap:** può essere una conseguenza attesa della limitazione o della pressione a valle, non un difetto CPU.
- **GPU Time cresce più di GPU Busy:** cerca dipendenze e contesa, senza attribuirle subito a un componente.
- **Present regolari, immagini mostrate irregolari:** guarda presentazione, scarti, sync e generazione. Il solo lato CPU non descrive l'uscita.
- **PSO compilation concentrate in una scena:** valuta shader compilation e cache, ma non attribuire ogni stutter alla compilazione [8].

A causa della sovrapposizione, esamina anche i frame vicini al picco: un ritardo può propagarsi e non apparire nella stessa posizione di tutte le curve. Un grafico auto-ingrandito amplifica visivamente oscillazioni minuscole; uno troppo compresso nasconde eventi. Non sostituire celle mancanti con zero e non eliminare gli scarti soltanto perché abbassano il risultato.

Una conclusione valida ha un perimetro: “ridurre quell'effetto ha accorciato GPU Busy e l'intervallo dei frame nella scena pesante, nelle tre ripetizioni”. Se hai misurato soltanto la cadenza, non scrivere “il mouse ha meno latenza”. Se il dato non distingue le configurazioni oltre la variabilità delle baseline, **non c'è ancora un vincitore**.

## 8. Pro e tweaker: cosa adottare, cosa non copiare

Le configurazioni pubbliche dei pro e dei tweaker sono un **inventario di compromessi**, non un esperimento controllato. Di solito mostrano risoluzione, qualità, cap, sensibilità, polling e talvolta Reflex, ma non dichiarano sample della CPU/GPU, driver, temperatura, server, rete o condizioni della scena. Un pro su un monitor ad alta frequenza con una GPU top non rappresenta un PC comune; un preset pubblicato senza contesto non è una prova.

| Affermazione diffusa | Lettura prudente |
|---|---|
| “I pro giocano tutto al minimo, quindi il minimo riduce la latenza” | Ridurre il carico GPU può aumentare gli FPS e ridurre la coda, ma in un gioco CPU-bound o con cap fisso il guadagno può sparire. Dipende da scena e collo di bottiglia. |
| “Un cap sotto il refresh rende più reattivo” | Può stabilizzare il frame time e ridurre l'accodamento con VRR/V-Sync, ma non è una legge per ogni gioco. Blur Busters documenta il ruolo del cap e della sincronizzazione, non un valore universale [12]. |
| “Reflex abbassa sempre la latenza” | Nei giochi supportati e nelle condizioni in cui c'è coda GPU il meccanismo è coerente; non è disponibile ovunque e non sostituisce un carico GPU già fuori scala [10]. |
| “Disattivare le ottimizzazioni fullscreen è sempre meglio” | È un'euristica da testare. Può cambiare presentazione, overlay e composizione; non c'è una regola valida per tutti i giochi. |
| “HAGS alza gli FPS e abbassa la latenza” | È una modalità di pianificazione, richiesta da alcune tecnologie FG; non è un guadagno universale. Va confrontata a parità di tutto il resto [9]. |
| “Processo a priorità alta = meno stutter” | Può aiutare in caso di contesa CPU, ma può anche affamare audio, capture o thread di sistema. Non è una baseline. |
| “Più FPS = sempre meno input lag” | In genere la latenza scende con l'aumentare della cadenza, ma coda, sync, display e carico CPU possono annullare il vantaggio. La stabilità conta quanto la media. |

La pratica adottabile è più sobria: **cap stabile e sostenibile**, una sola variabile per volta, Reflex o Anti-Lag solo se supportati e verificati, qualità grafica scelta in base al collo di bottiglia, nessun preset copiato senza misura. Se il gioco è CPU-bound, abbassare la risoluzione può non spostare il frame time; se è GPU-bound, un cap troppo alto o un sync possono aggiungere coda. La guida successiva tratta sincronizzazione e limiter in dettaglio.

## 9. Miti da chiudere

| Mito | Correzione |
|---|---|
| “La media FPS descrive la reattività” | La media non descrive la coda, la latenza input→display né la distribuzione dei frame lenti. |
| “GPU al 99% significa collo di bottiglia GPU” | La percentuale è telemetria globale; può includere altri processi e non dimostra quale frame o coda sia limitante. |
| “CPU al 30% significa nessun limite CPU” | Un thread critico può essere saturo mentre la media totale è bassa. |
| “Frame time e input lag sono la stessa cosa” | Il frame time è un intervallo; la latenza ha un evento iniziale e uno finale dichiarati. |
| “Il mio 1% low è confrontabile con qualsiasi report” | L'algoritmo e la finestra statistica possono cambiare; dichiara il metodo [13]. |
| “Frame Generation riduce la latenza” | Aggiunge immagini mostrate, non nuova simulazione; la latenza del comando va misurata separatamente, con o senza Reflex [10][11]. |
| “Un cap è sempre un peggioramento” | Un cap sostenibile può ridurre l'accodamento e stabilizzare il frame time; il valore va testato [12]. |
| “HAGS è sempre meglio” | È una modalità di scheduling, richiesta da alcune funzioni FG; non è un guadagno universale [9]. |

## 10. Limiti e fonti

Questa guida descrive un metodo, non certifica un risultato. PresentMon aggiunge un costo di tracciamento e può interagire con anti-cheat, overlay e driver; l'ETW non è una misura fisica del pannello. Le metriche CPU/GPU sono ricostruzioni, non un profiler hardware. Frame Type e latenze dipendono dal supporto dell'applicazione e del driver. Le cifre dei produttori, comprese quelle di Reflex 2, sono dichiarazioni vendor e non sostituiscono una prova sul campo [11].

Per approfondire le scelte dopo la diagnosi: [sincronizzazione e limiter](05-sincronizzazione-limiter.md), [display e collegamenti](06-display-cavi.md), [diagnosi driver e LatencyMon](03-driver-latencymon.md), [metodo di verifica](12-misure-verifica.md). Le spiegazioni necessarie a raccogliere e interpretare questa prova sono già incluse qui.

1. Intel/GameTechDev, [PresentMon 2.6.0 — README e limiti](https://github.com/GameTechDev/PresentMon/blob/e13fce6acdb55a808fd8318175a56863e532d95f/README.md), con [architettura del servizio](https://github.com/GameTechDev/PresentMon/blob/e13fce6acdb55a808fd8318175a56863e532d95f/README-Service.md).
2. Intel/GameTechDev, [Capture Application: metriche, CSV e overlay](https://github.com/GameTechDev/PresentMon/blob/e13fce6acdb55a808fd8318175a56863e532d95f/README-CaptureApplication.md).
3. Intel/GameTechDev, [Console Application: opzioni, colonne e PresentMode](https://github.com/GameTechDev/PresentMon/blob/e13fce6acdb55a808fd8318175a56863e532d95f/README-ConsoleApplication.md).
4. Intel/GameTechDev, [MetricsCalculatorCpuGpu.cpp](https://github.com/GameTechDev/PresentMon/blob/5a2059c1a4411bb99ca69a8163a260329c731528/IntelPresentMon/CommonUtilities/mc/MetricsCalculatorCpuGpu.cpp), commit distinto dalla documentazione release.
5. Intel/GameTechDev, [EnumFrameType.h](https://github.com/GameTechDev/PresentMon/blob/5a2059c1a4411bb99ca69a8163a260329c731528/IntelPresentMon/Interprocess/source/metadata/EnumFrameType.h).
6. Intel, [PresentMon: presentazione del progetto](https://game.intel.com/us/intel-presentmon/) e [overlay dimostrativo GPU Busy del 2024](https://game.intel.com/wp-content/uploads/2024/01/GPU-Busy-1.png), conservato localmente; workload e condizioni complete non disponibili.
7. NVIDIA, [System Latency Optimization Guide](https://www.nvidia.com/en-us/geforce/guides/system-latency-optimization-guide/), 1 ottobre 2020: terminologia e percorso, non preset valido per ogni Windows successivo.
8. Intel/GameTechDev, [PresentMon v2.6.0 release notes](https://github.com/GameTechDev/PresentMon/releases/tag/v2.6.0), 21 settembre 2026: metriche PSO, flip DDI, Animation Time e supporto multi-dispositivo.
9. Microsoft Learn, [WDDM Overview](https://learn.microsoft.com/en-us/windows-hardware/drivers/display/windows-vista-display-driver-model-design-guide) e [Video Memory Management and GPU Scheduling](https://learn.microsoft.com/en-us/windows-hardware/drivers/display/video-memory-management-and-gpu-scheduling). HAGS nel percorso WDDM; supporto richiesto da GPU e driver.
10. NVIDIA Developer, [NVIDIA Reflex](https://developer.nvidia.com/performance-rendering-tools/reflex). Low Latency mode, sincronizzazione CPU/GPU e metriche; documentazione sviluppatore, non benchmark indipendente.
11. NVIDIA, [Reflex 2 with Frame Warp](https://www.nvidia.com/en-us/geforce/news/reflex-2-even-lower-latency-gameplay-with-frame-warp), 7 gennaio 2025. Dati e percentuali dichiarati dal produttore; disponibilità per gioco e GPU da verificare.
12. Blur Busters, [G-SYNC 101: input lag tests and settings](https://blurbusters.com/gsync/gsync101-input-lag-tests-and-settings/). Metodo su cap, V-Sync e latenza; condizioni e giochi del test sono specifici.
13. CapFrameX, [Explanation of different performance metrics](https://www.capframex.com/blog/post/Erkl%C3%A4rung%20unterschiedlicher%20Performance-Metriken). Definizioni di frametime, percentili e x% low; verificare la versione dello strumento.
