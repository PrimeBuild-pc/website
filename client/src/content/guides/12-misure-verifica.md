# Misure e verifica: capire se una modifica ha davvero aiutato

Non basta che tutti i contatori siano verdi per considerare riuscito un setup. È riuscito quando il problema iniziale è stato risolto o ridotto, le funzioni necessarie continuano a funzionare e il compromesso scelto è comprensibile. Una media FPS più alta, un grafico più piatto e un ping più basso possono essere informazioni utili, ma non rispondono alla stessa domanda.

Questa guida è un metodo autonomo: insegna a scegliere la misura, preparare un confronto e leggere un risultato senza attribuirgli più di quanto dimostri. Puoi usarla per un limite FPS, un endpoint audio, una proprietà di rete o una configurazione Windows. Non richiede di aver applicato tutte le altre guide.

**Ambito e stato delle prove.** Riferimento Windows 11 25H2/26H2, senza certificare automaticamente nuove build, driver o anti-cheat. Per questa stesura non sono stati eseguiti benchmark hardware, script operativi, stress, catture, cambi di configurazione o rollback. Gli esempi sono identificati come documentali, ipotetici, osservazioni esistenti o risultati di altri autori.

## 1. Scegli la domanda prima dello strumento

Comincia da un evento preciso: «scatto durante una rotazione con Discord aperto», «voce che si interrompe» oppure «ritardo che cresce mentre carico file». «PC lento» non indica che cosa acquisire.

Se il PC ha crash, riavvii o errori hardware, prima affronta la stabilità. Un confronto prestazionale su una configurazione instabile può misurare un errore, non un'ottimizzazione. Se il sintomo è chiaramente di rete, invece, puoi partire dal collegamento e dal traffico: non è necessario provare timer e rendering.

| Sintomo | Prima osservazione o confronto | Conclusione consentita |
|---|---|---|
| Crash, riavvii, eventi WHEA | Configurazione hardware supportata, log e prova di stabilità pertinente | Descrivere gli errori e il carico che li provoca; non compensarli con FPS più alti. |
| Scatti con FPS medi alti | Stessa scena e limite FPS, intervalli dei frame registrati | Descrivere cadenza e picchi; non assegnare una latenza fisica all'input. |
| Immagine regolare, comando percepito in ritardo | Una prova alla volta su coda, sync, cap, input e display | Senza strumento end-to-end, il cambiamento resta percepito, non un numero in ms. |
| Crepitii o voce interrotta | Stesso endpoint, routing e app; buffer/driver pertinenti | Una correlazione ISR/DPC orienta l'indagine, non identifica da sola il colpevole. |
| Ping alto durante upload | Riposo e carico, Ethernet/Wi-Fi, code del router | Valutare un problema sotto carico e l'eventuale SQM, non prescrivere Nagle/MMCSS. |
| Schermo nero o flicker | Cavo/link, firmware, VRR e overlay separatamente | Approfondire collegamento e presentazione prima di registri globali. |

**WHEA** è il sistema Windows di segnalazione degli errori hardware; il dettaglio dell'evento conta, non soltanto la sua presenza. **Endpoint audio** è il dispositivo di uscita o ingresso scelto; **routing** è il percorso tra applicazioni e dispositivi. **Cap** è un limite FPS; **VRR** è la frequenza di aggiornamento variabile del display. Questi termini descrivono condizioni da annotare, non impostazioni obbligatorie.

## 2. Non confondere grandezze che hanno tutte l'unità «tempo»

| Grandezza | Che cosa osserva | Che cosa non dimostra |
|---|---|---|
| **Frame time**, in ms | Un intervallo tra eventi dei frame, secondo la definizione del tool | Il tempo completo dal gesto al pixel. |
| **CPU/GPU Busy e Wait** | Lavoro e attese attribuiti alla pipeline con la metodologia dello strumento | Una sequenza di durate tutte sommabili o la latenza fisica del display. |
| **ISR/DPC**, spesso in µs | Esecuzione di routine driver e lavoro differito | RTT Internet, latenza totale del mouse o dell'audio. |
| **RTT**, in ms | Andata e ritorno di una sonda con protocollo e target dichiarati | Ritardo a senso unico o qualità di ogni servizio. |
| **Input→fotone / input→suono** | Intervallo fra evento iniziale e risposta fisica definiti | Una proprietà universale del solo mouse, DAC o gioco. |

Un millisecondo contiene 1.000 microsecondi. Convertire l'unità non rende le metriche equivalenti. Una ISR risponde a un interrupt; una DPC esegue lavoro del driver rimandato. Il massimo ISR, il massimo DPC e il massimo interrupt→process di una sessione possono riferirsi a eventi diversi: non sommarli per costruire una latenza totale.

Anche CPU e GPU lavorano in modo sovrapposto su frame diversi. **Busy** e **Wait** non sono sinonimi e le percentuali di utilizzo non sono durate. Sottrarre GPU Busy medio da Frame Time medio non ricava CPU Busy o queue time, cioè il tempo di attesa in coda. Per attribuire una coda servono eventi correlati e definizioni pertinenti [1].

QPC, il contatore Windows usato per timestamp ad alta risoluzione, aiuta a misurare intervalli sullo stesso sistema. Non sincronizza automaticamente due dispositivi o due PC e non elimina l'incertezza dell'acquisizione [2]. Non cambiare la sorgente del timer per ottenere prima un numero migliore.

## 3. Guarda la distribuzione, non soltanto una media

La **media** riassume tutti i valori ma risente dei picchi. La **mediana**, o p50, divide il campione ordinato a metà. Un **percentile** come p95 indica un valore sotto cui cade circa il 95% del campione, secondo il metodo di calcolo. Il **massimo** è il peggior valore osservato: dipende anche dalla durata e dal numero di osservazioni.

Per tempi di frame o ritardi, percentili alti descrivono la coda dei valori più lenti. Per FPS, invece, valori più bassi possono descrivere i momenti peggiori. «1% low», «P90» e «90% Worst» non sono etichette automaticamente equivalenti: verifica algoritmo, unità e popolazione inclusa. Un software può interpolare percentili, un altro usare un valore del campione.

**ESEMPIO DIDATTICO — NON BENCHMARK, NON DATI DEL TUO PC.** Dieci intervalli inventati, già ordinati: nove da 5 ms e uno da 20 ms. La media è 6,5 ms e la mediana è 5 ms. Con il metodo *nearest rank*, che prende la posizione arrotondata verso l'alto di `p × N` con `p` espresso fra 0 e 1, p90 è 5 ms e p95 è 20 ms. Il calcolo è definito per questo esempio: dieci intervalli non permettono una stima robusta di eventi rari né della distribuzione futura.

Riporta durata, numero di campioni, definizione della metrica e metodo del tool. Non ricostruire percentili da minimo/media/massimo e non cancellare picchi perché peggiorano il confronto. Escludere caricamenti può essere sensato se misuri una scena già avviata, ma il criterio va deciso prima e applicato a tutte le prove. Conserva anche il tratto escluso.

L'inverso della media degli intervalli non coincide generalmente con la media degli FPS istantanei: indica come sono stati calcolati i dati. I frame di una stessa sessione non sono necessariamente campioni indipendenti; molti campioni non sostituiscono più passaggi controllati. Non imporre una soglia percentuale di vittoria senza conoscere variabilità e incertezza.

Una differenza statisticamente visibile non è automaticamente una differenza pratica. Se lo scarto fra le mediane di A e B è più piccolo dell'oscillazione osservata fra i passaggi dello stesso A, il confronto resta inconclusivo. Non esiste una soglia universale: riporta la dispersione, evita di scegliere la coppia di prove più favorevole e non calcolare la media dei percentili di sessioni diverse come se fossero un unico campione.

## 4. Prepara un riferimento riproducibile

Il riferimento **A** è una configurazione insieme alle sue condizioni, non soltanto una schermata di impostazioni. Annota hardware, build Windows, BIOS, driver, gioco e versione, risoluzione/Hz, limite FPS, sync, alimentazione, temperature e app concorrenti. Per lo scaling distingui risoluzione desktop e segnale attivo; per audio e rete aggiungi endpoint/routing o collegamento/host.

Salva i valori originali, compreso lo stato «assente» di eventuali chiavi, e la procedura di ritorno. Un punto di ripristino non sostituisce ogni backup; se non puoi ricostruire il prima, non iniziare un esperimento invasivo. Un aggiornamento o un cambio driver rende il vecchio riferimento meno comparabile: annotalo e ripeti le prove pertinenti.

Prepara una scena ripetibile. Completa il caricamento degli shader e il riscaldamento necessario, poi usa lo stesso percorso, gli stessi input e la stessa durata. Non confrontare un menu con una partita affollata. Una prova online risponde a condizioni d'uso reali ma controlla meno variabili: server, avversari e percorso possono cambiare.

Riduci monitoraggi e overlay non necessari prima di fissare il protocollo. Mantieni poi gli stessi strumenti in A e B: anche misurare ha un costo. Non avviare contemporaneamente cinque acquisizioni per ottenere un verdetto più autorevole. Se anti-cheat o policy vietano un hook/overlay, usa un percorso supportato o rinuncia a quella misura; non aggirare il blocco.

## 5. Esegui il ragionamento A–B–A, non una gara di risultati migliori

**B** cambia una sola variabile. Il ritorno ad **A** aiuta a distinguere l'effetto della modifica da temperatura, cache o condizioni esterne. Non rende il confronto perfetto, ma è più informativo di due screenshot isolati.

1. Definisci sintomo, ipotesi e metrica primaria. Aggiungi le regressioni da controllare: audio, input perso, consumo, errori o throughput.
2. Registra più passaggi A, con dati grezzi, identica durata e condizioni. Una prova preliminare può servire a controllare che il tool registri il processo corretto, non a scegliere il risultato da conservare.
3. Applica soltanto B dopo i prerequisiti previsti. Rileggi la configurazione e verifica lo stato attivo; se serve un riavvio, mantieni preparazione comparabile anche negli altri stati.
4. Ripeti B con lo stesso scenario. Annota eventi imprevisti senza eliminarli silenziosamente.
5. Torna ad A quando è sicuro e fattibile, verifica il ritorno e ripeti. Se possibile alterna l'ordine in confronti successivi; non scegliere soltanto il passaggio migliore.
6. Decidi: beneficio ripetibile senza regressioni, risultato inconclusivo oppure peggioramento. Conserva B soltanto nel primo caso; negli altri rimetti il riferimento e registra anche l'esito nullo.

Tre passaggi per stato possono essere un punto di partenza pratico, non una garanzia statistica. Prove più lunghe osservano più eventi, ma possono introdurre temperatura e carico differenti. Non puoi affermare che il sistema non avrà mai dropout soltanto perché non ne hai visti in pochi minuti.

Il rollback fa parte della prova. «Default» non significa «originale», chiudere una utility non annulla necessariamente impostazioni persistenti e un riavvio non rimuove ogni regola. Se il ritorno fallisce, interrompi altri cambi e conserva errore e backup; non nascondere la regressione dietro un risultato prestazionale.

## 6. Acquisisci frame time senza trasformarli in click→fotone

PresentMon usa eventi Windows per analizzare la presentazione dei frame; CapFrameX offre un altro percorso di acquisizione/analisi basato su queste informazioni. Versione, opzioni e definizioni contano: la documentazione console PresentMon 2.6.0 distingue intervalli fra Present, tempi di visualizzazione, lavoro GPU e metriche strumentate [1].

Se disponi già di uno strumento verificato e il titolo lo consente:

1. Seleziona il processo effettivo del gioco, non soltanto il launcher. Controlla l'eventuale presenza di più processi o swap chain, cioè sequenze di superfici presentate dal programma.
2. Scegli una sola metrica di cadenza primaria, output locale e durata fissa; registra la versione. Completa warm-up e scena.
3. Avvia una prova breve e poi arrestala esplicitamente. Controlla che il file contenga processo, intervallo temporale e colonne attesi. La sola presenza dell'overlay non prova l'acquisizione.
4. Registra i passaggi A–B–A stabiliti. Conserva CSV e note separati per prova.
5. Confronta la serie nel tempo, mediana/percentili pertinenti, eventi di stutter e modalità di presentazione. Non mescolare frame scartati, visualizzati o generati senza spiegare la selezione.

Per chi usa già la **console 2.6.0**, questi sono gli argomenti documentati di un esempio delimitato, non un comando eseguito qui:

```text
--process_name "Gioco.exe" --output_file "A-01.csv" --timed 120 --terminate_after_timed
```

Vanno passati al proprio eseguibile PresentMon verificato, da una cartella di output scrivibile, sostituendo il nome del processo. I 120 secondi sono una durata di esempio, non uno standard. Non aggiungere `--stop_existing_session` per terminare una raccolta altrui; controlla sessioni esistenti. Prima di B verifica che la prima raccolta sia davvero conclusa e usa un nome file nuovo. La raccolta ETW richiede i permessi previsti da PresentMon: in caso di accesso negato, verifica con l'amministratore l'autorizzazione, senza aggirare policy o aggiungere automaticamente `--restart_as_admin`. Senza elevazione, alcuni processi di altri utenti o di breve durata possono comparire come `<unknown>` e non essere selezionabili per nome [1].

La disponibilità di alcune colonne dipende da opzioni, driver e strumentazione dell'applicazione. `NA` non significa zero. Nomi come `MsClickToPhotonLatency` non garantiscono un sensore ottico: distingui l'inferenza dagli eventi software, la misura strumentata dell'app e l'eventuale hardware dedicato. `MsPCLatency` copre il tratto dal ricevimento dell'input nel PC all'invio del frame al display, non tutta la periferica e il pannello [1].

I frame generati non sono automaticamente nuove risposte all'input. Se usi Frame Generation, registra lo stato e, quando disponibile, il tipo di frame. Nella console 2.6.0, `FrameType` richiede `--track_frame_type` e strumentazione compatibile del gioco e/o del driver: l'esempio minimo sopra non la abilita. Se il tipo non è disponibile, dichiara il limite; non dedurlo dal numero totale né confrontare ogni immagine come se derivasse da una nuova simulazione [1]. L'approfondimento [CPU/GPU e PresentMon](04-cpu-gpu-presentmon.md) spiega la pipeline, ma per questa prova bastano metrica dichiarata, processo corretto e selezione coerente.

## 7. Misura la risposta fisica soltanto con una catena identificata

Per input→fotone devi definire l'inizio, per esempio contatto fisico del pulsante oppure invio di un report HID, e la fine, per esempio variazione luminosa in una precisa zona del display. Le due scelte misurano catene differenti. Un trigger sintetico che invia direttamente un report può escludere una parte della periferica reale: non chiamarlo latenza del mouse acquistato.

Un sensore ottico o un sistema come Reflex Analyzer richiede compatibilità, evento visivo adatto, posizione e configurazione documentate [3]. Soglia del sensore, zona dello schermo e scansione del display influenzano il risultato. Ripeti gli eventi, conserva campioni e calibrazione; evita effetti che cambiano risposta visiva fra A e B.

Con una videocamera devi rendere visibili e definire gli eventi iniziale e finale. A una frequenza di acquisizione `f`, il periodo nominale è `1000/f` millisecondi: non promette però quell'accuratezza, né precisione superiore al campionamento. Esposizione, rolling shutter, fase fra sistemi e rilevazione dell'onset, cioè l'inizio del cambiamento, aggiungono incertezza. Più cifre decimali non la eliminano.

Per input→suono definisci trigger, endpoint, routing e criterio di rilevazione acustica. Geometria e distanza del sensore, volume, rumore e soglia devono restare comparabili. Un loopback digitale può misurare una parte del percorso senza includere DAC, trasduttore e propagazione acustica. Il numero di campioni di un buffer diviso per la frequenza audio ne descrive una durata teorica, non tutta la latenza sonora.

Curve EQ calcolate e «Latency 0.0 ms» nell'Editor APO non sono misure acustiche end-to-end. Non usare un volume più alto per far superare prima una soglia e poi chiamarlo miglioramento di latenza; mantieni ascolto sicuro e condizioni documentate. Se non hai una catena adatta, scrivi **«non misurato»**. La percezione resta utile per descrivere il sintomo, non per inventare millisecondi.

## 8. Usa LatencyMon e le prove di rete come indizi nel loro ambito

LatencyMon orienta su ISR/DPC, interrupt→process e hard pagefault nel carico osservato [4]. Distingui il controllo generale a riposo dalla raccolta mirata sotto carico: la FAQ raccomanda in generale prove senza altri software in background e limita l'uso simultaneo dell'app audio all'indagine dei suoi hard pagefault. Una raccolta mentre riproduci il sintomo è un approfondimento con condizioni diverse, non lo stesso test a riposo.

Prepara lo scenario dichiarato, avvia Start, annota tempi ed eventi, quindi Stop e salva report e durata. Per l'analisi completa seleziona tutte le CPU disponibili; registra eventuali esclusioni e le opzioni di misura, mantenendole uguali nei confronti. Il monitoraggio stesso può generare lavoro ISR/DPC. Se LatencyMon si arresta perché perde buffer di eventi, la raccolta non garantisce più accuratezza: segnala l'incompletezza, non disabilitare il controllo per ottenere un risultato apparentemente valido. Non mescolare nello stesso riepilogo riposo e carichi diversi senza separarli.

Un **hard pagefault** richiede il recupero di una pagina non residente, anche da un file mappato: non è un errore di integrità della RAM. Conta se interessa il processo sensibile al tempo e coincide con il sintomo. Non disabilitare il pagefile per far sparire un contatore; puoi perdere capacità di commit o dump utili.

Il verdetto verde non certifica input rapido; un risultato rosso non identifica da solo la causa. La documentazione stessa presenta soglie orientative dipendenti dal carico audio e dai buffer. Un modulo di sistema come `dxgkrnl.sys` o `Wdf01000.sys` può rappresentare un percorso, non una condanna del singolo dispositivo. Per collegare eventi e sintomo può servire una traccia ETW, il sistema di eventi Windows, registrata con WPR e analizzata con WPA [5].

Per la rete, misura RTT a riposo e sotto carico separando download/upload. Registra endpoint, protocollo, IPv4/IPv6, sonde, timeout e collegamento. Ping non è input→fotone, una porta TCP raggiungibile non descrive UDP e un hop intermedio silenzioso non dimostra perdita end-to-end. La [guida rete](10-rete-domestica.md) fornisce comandi, interpretazione e arresti senza imporre catture avanzate.

## 9. Leggi tre tipi di esempio senza mescolarli

### Una cattura reale esistente, ma non un benchmark controllato

L'originale LatencyMon Home Edition 7.31 conservato nel progetto mostra 1 minuto e 45 secondi di raccolta: current interrupt→process 37,60 µs; highest interrupt→process 148,80 µs; ISR massimo 23,20 µs associato a `Wdf01000.sys`; DPC massimo 143,070 µs associato a `dxgkrnl.sys`; 679 hard pagefaults.

Sono campi realmente visibili, non numeri inventati. Mancano però condizioni registrate di workload e raccolta: la cattura non dimostra un prima/dopo, una causa o la qualità del PC del lettore. Non sommare i massimi, non leggere i pagefault come errori RAM e non trasformare il verde in una certificazione. Non è stata eseguita una nuova raccolta per questa stesura.

### Esempi dei produttori, non guadagni locali

Nel materiale NVIDIA usato dalla base editoriale, 56/28 ms e «50%» sono un esempio del produttore nella sua presentazione della latenza, non il risultato di questo progetto. Gli schemi della pipeline spiegano meccanismi: non prevedono il miglioramento di ogni gioco o hardware [3].

La figura dimostrativa Intel GPU Busy mostra **Frame Time medio 7,24 ms**, **GPU Busy medio 6,07 ms** e **GPU Utilization 97,1%** [6]. La differenza aritmetica di 1,17 ms non è una misura di CPU Busy né di queue time: medie e lavori sovrapposti non isolano un segmento della pipeline. L'utilizzo percentuale non si trasforma direttamente in millisecondi.

Le UI locali PresentMon della revisione precedente sono catture dell'app e dell'editor widget, non acquisizioni di gioco. Una schermata autentica può spiegare un controllo senza diventare benchmark. Analogamente il materiale OCCT è documentazione ufficiale, non un'app installata o una prova superata: un futuro uso deve rispettare la licenza pertinente, perché Personal esclude uso professionale/commerciale.

### Risultati e impressioni dei video

CS2 Kitchen, *Everyone is Lying about Input Latency Settings* [7], dichiara confronti con 1.000 campioni. Nell'esempio GPU molto caricata riportato nei materiali, Reflex Disabled/Enabled/Boost ha medie di circa 20,0/16,7/15,6 ms; questi risultati non diventano un guadagno promesso altrove. La scena, l'hardware e l'inizio del trigger delimitano ciò che il confronto osserva.

Nel video audio *You are using the WRONG Audio Settings* [8] sono dichiarati 100 campioni per impostazione e una misura dal trigger al suono rilevato. Le trascrizioni arabe hanno ambiguità: una descrive Arduino Leonardo, mentre varie slide indicano Teensy 4.1. Nei materiali ricevuti mancano raw data e descrizione completa della calibrazione. Non risolviamo il conflitto inventando la catena e non equipariamo «90% Worst» a p90 senza definizione.

*Front Edge Sync Guide 2026* è di **Scotty-2-Hotty354** [9]. Everything OLED è citato come riferimento nel transcript, ma non è l'autore del video. Il filmato mostra impostazioni RTSS e impressioni di reattività, non una misura end-to-end che dimostri la superiorità di Front Edge Sync. Async del limiter non va confuso con Adaptive-Sync del monitor; marker Reflex esterni non provano equivalenza con integrazione nativa del gioco. Un grafico più regolare resta una prova della metrica mostrata, non del tempo dal gesto al pixel.

I grafici firmati input/audio appartengono a CS2 Kitchen; l'autore del grafico blu identificato come 215903 resta non riscontrato. Non attribuiamo materiali incerti a Prime Build e non li usiamo come prova quantitativa. Identità e associazioni dei video derivano dalla [verifica documentale del progetto](../analisi/VERIFICA-VIDEO-E-RTSS.md), non dall'ordine dei file.

## 10. Consegna un risultato leggibile, comprese le incertezze

Una scheda breve rende il lavoro ricostruibile:

```text
Problema e ipotesi:
Hardware / Windows / driver / applicazione e versioni:
Scenario, warm-up, durata, strumenti e impostazioni di acquisizione:
Configurazione A; unica modifica B; stato attivo verificato:
Metrica, unità, campioni inclusi/esclusi e criterio:
Risultati di tutti i passaggi; variabilità; sintomo osservato:
Costi/regressioni; eventi imprevisti; limiti della misura:
Ritorno A: come è stato eseguito, che cosa è stato verificato:
Decisione: mantenere B / inconclusivo / ripristinato:
File grezzi conservati localmente:
```

Se manca una misura, scrivi «non misurato»; se un campo del tool manca, «n/d». Non compilare con numeri dedotti da un'immagine o da una lettera. Differenze piccole rispetto alla variabilità richiedono prudenza, non più decimali.

Prima di considerare concluso il setup, controlla:

1. **Funzionamento e recupero:** driver/build annotati, backup accessibile, nessuna regola persistente sconosciuta; sicurezza e aggiornamenti non sacrificati.
2. **Stabilità nel carico provato:** errori, temperature, memoria, riavvio, sospensione, USB e audio osservati. Non è una promessa di stabilità assoluta.
3. **Rendering:** risoluzione/Hz e percorso sync dichiarati, un solo cap intenzionale, frame generati separati. HAGS/presentazione confrontati soltanto se pertinenti, senza preset universali.
4. **Input e audio:** niente comandi persi o dropout; polling sostenibile; endpoint/routing corretti. EQ confrontato a pari volume e con margine per evitare clipping, senza chiamare «più forte» un guadagno tecnico.
5. **Rete:** traffico e collegamento annotati, RTT/variabilità/risposte mancanti nelle condizioni d'uso; SQM calibrato solo se necessario.
6. **Uso reale:** prova con applicazioni e periferiche abituali, come Discord/OBS. Registra ciò che cambia rispetto al banco prova.

Ripeti le verifiche pertinenti dopo modifiche significative a Windows, driver, gioco o hardware. Per chiedere aiuto sul [Discord Prime Build](https://discord.gg/ERUwSxE79q) condividi sintomo, versioni e confronti minimizzati, non credenziali, IP pubblici, seriali o dump/trace integrali. Un allegato non autorizza comandi remoti sul PC.

## 11. Script e allegati: inventario non significa misura

I quattro pack operativi restano **v4**, anche nella distribuzione editoriale v5. Sono autonomi: non serve First Setup per usare un pack tematico. I sorgenti sono non firmati e richiedono ancora validazione funzionale su PC di prova autorizzato [10].

| Pack esistente | Per che cosa serve | Che cosa non dimostra |
|---|---|---|
| [Diagnostica v4](../discord-revisione-v5/pacchetti/PrimeBuild-Diagnostica-v4.zip) | Letture MMCSS, BCD, adattatori/QoS e inventario USB | Partecipazione del gioco a MMCSS, timer attivo, priorità Internet o benchmark USB. |
| [First Setup v4](../discord-revisione-v5/pacchetti/PrimeBuild-FirstSetup-v4.zip) | Organizza setup e include le funzioni dei pack tematici | Necessità di applicare tutto o guadagno di latenza. |
| [Input v4](../discord-revisione-v5/pacchetti/PrimeBuild-Input-v4.zip) | Stato/parametri di accelerazione del puntatore e inventario USB | Raw Input del gioco, latenza fisica del mouse o installazione/rimozione HIDUSBF. |
| [Audio v4](../discord-revisione-v5/pacchetti/PrimeBuild-Audio-v4.zip) | Gestisce l'avvio LowAudioLatency dopo una prova manuale stabile | Periodo realmente accettato dall'endpoint o latenza acustica. Il tool esterno non è incluso né certificato. |

Per l'uso previsto, verifica la provenienza, estrai **tutto** lo ZIP appropriato in una cartella nuova e apri `Avvia-PrimeBuild.bat`. Non lanciare PS1 sparsi e non mescolare componenti/versioni. BCD richiede Esegui come amministratore sul BAT; gli altri contratti sono nel README. Il launcher usa ExecutionPolicy Bypass soltanto nel processo avviato, senza disabilitare antivirus, SmartScreen o policy gestite: se una protezione blocca l'avvio, fermati.

Una lettura può fallire e lasciare il report parziale. La diagnostica non esegue benchmark e non ripristina presunti default. Nessuno script annulla automaticamente timer, MMCSS, servizi, FSO, QoS o filtri dei vecchi pack. Rimuovere un avvio audio, inoltre, non equivale a terminare un processo già aperto. Non usare questi allegati per dichiarare recuperato un sistema senza controllo individuale.

I sette PDF preesistenti sono consultabili come **base editoriale precedente**, non come esportazione dei nuovi Markdown:

- [Primo setup](../discord-revisione-v5/pdf/01-primo-setup.pdf)
- [LatencyMon e driver](../discord-revisione-v5/pdf/02-latencymon-e-driver.pdf)
- [Audio competitivo](../discord-revisione-v5/pdf/03-audio-competitivo.pdf)
- [Frame cap e presentazione](../discord-revisione-v5/pdf/04-frame-cap-e-presentazione.pdf)
- [DisplayPort e HDMI](../discord-revisione-v5/pdf/05-displayport-hdmi.pdf)
- [Input, mouse e USB](../discord-revisione-v5/pdf/06-input-mouse-usb.pdf)
- [Rete](../discord-revisione-v5/pdf/07-rete.pdf)

Non sono stati rigenerati in questa fase. Quando testi e allegati divergono, non mescolare automaticamente le procedure; identifica versione e contesto prima di usare un'istruzione operativa.

## 12. Che cosa rende attendibile una fonte

La fonte giusta dipende dalla domanda. Microsoft definisce API e policy; OEM e autori dei progetti descrivono requisiti, driver e strumenti; i video mostrano risultati della propria catena; una discussione nella community suggerisce un'ipotesi da riprodurre. Una pagina primaria non certifica ogni raccomandazione prestazionale né la corrispondenza fra sorgente e binario scaricato.

Le fonti più vecchie possono spiegare meccanismi ancora usati, senza convalidare preset di quell'epoca. Un accesso 403/404 o un errore TLS non è una consultazione riuscita. Una schermata, un diagramma qualitativo, un esempio ipotetico e un risultato misurato devono restare riconoscibili.

**Crediti e permessi sono distinti.** La consegna precedente include 54 figure di terzi/UI con diritti di riuso da verificare. Il [registro dei crediti](../bozza-v3/CREDITI-IMMAGINI.md) conserva provenienza e limiti, non concede una licenza. Codice open source non significa automaticamente screenshot, loghi e grafici liberi. Questo testo non incorpora nuove immagini, non autorizza pubblicazione o integrazione nel sito e non risolve quei permessi.

## Fonti essenziali

1. Intel/GameTechDev, [PresentMon Console Application 2.6.0, commit fissato](https://github.com/GameTechDev/PresentMon/blob/e13fce6acdb55a808fd8318175a56863e532d95f/README-ConsoleApplication.md); [README 2.6.0: accesso e limiti](https://github.com/GameTechDev/PresentMon/blob/e13fce6acdb55a808fd8318175a56863e532d95f/README.md). Definizioni e disponibilità delle colonne dipendono da release/opzioni. [CapFrameX](https://www.capframex.com/) è un riferimento allo strumento, non una prova eseguita.
2. Microsoft, [Acquiring high-resolution time stamps](https://learn.microsoft.com/en-us/windows/win32/sysinfo/acquiring-high-resolution-time-stamps).
3. NVIDIA, [System Latency Optimization Guide](https://www.nvidia.com/en-us/geforce/guides/system-latency-optimization-guide/), [Reflex e Analyzer](https://www.nvidia.com/en-us/geforce/technologies/reflex/). Esempi commerciali e meccanismi non sono risultati locali né preset universali.
4. Resplendence, [Using LatencyMon](https://www.resplendence.com/latencymon_using) e [FAQ](https://www.resplendence.com/latencymon_faq). Cattura originale interna letta: LatencyMon 7.31, senza condizioni controllate.
5. Microsoft, [Windows Performance Toolkit](https://learn.microsoft.com/en-us/windows-hardware/test/wpt/).
6. Intel, [PresentMon e figura GPU Busy](https://game.intel.com/us/intel-presentmon/), esempio dimostrativo del produttore.
7. CS2 Kitchen, [Everyone is Lying about Input Latency Settings](https://www.youtube.com/watch?v=zNHFAAJkIvo), 12 luglio 2026; trascrizione e grafici associati nella verifica del progetto.
8. CS2 Kitchen, [You are using the WRONG Audio Settings](https://www.youtube.com/watch?v=P-3Os4btIg4), 5 ottobre 2026. Limiti di trascrizione, trigger e calibrazione dichiarati nel testo.
9. Scotty-2-Hotty354, [Front Edge Sync Guide 2026](https://www.youtube.com/watch?v=n6mskKHpEPc), 19 giugno 2026; [RTSS, distribuzione/changelog Guru3D](https://www.guru3d.com/download/rtss-rivatuner-statistics-server-download/). I dettagli di alcune opzioni non dispongono di una documentazione primaria completa nei materiali consultati: nessun consiglio universale o certificazione anti-cheat.
10. Prime Build, [README degli script mantenuti](../discord-revisione-v5/scripts/README.md) e [sorgente Diagnostica](../discord-revisione-v5/scripts/PrimeBuild-Diagnostica.ps1), letti senza eseguirli.

Il risultato finale può essere «non ho evidenza sufficiente per conservare B». È una conclusione più utile di una falsa vittoria: lascia il PC funzionante, il riferimento ricostruibile e una domanda chiara per la prova successiva.
