# Sincronizzazione, presentazione e limiter: scegliere il compromesso giusto

Non esiste un profilo che massimizzi insieme reattività, immagine integra, fluidità, consumi e FPS. Prima scegli **che cosa vuoi migliorare**: la risposta in un gioco competitivo, l'assenza di tearing, la regolarità visiva o il margine per registrare. Poi verifica come il motore produce e presenta i frame; soltanto dopo scegli il limiter.

Questa guida considera Windows 11 25H2/26H2, ma le impostazioni dipendono anche da gioco, API, driver e display. Descrive procedure ripristinabili: non applica preset, script o modifiche al sistema. Se non hai un problema osservabile, non occorre modificare composizione del desktop, ottimizzazioni fullscreen o pianificazione GPU.

## 1. Contenere l'anticipo: cap, Reflex e Anti-Lag

CPU e GPU lavorano in sovrapposizione. Se la CPU prepara frame più velocemente di quanto la GPU li completi, il lavoro già inviato può accumularsi. Questo anticipo può aumentare il **throughput**, il numero di frame prodotti per unità di tempo, ma un frame pronto molto prima del proprio turno può portare al display input meno recente. Il **frametime** è un intervallo fra eventi di frame successivi; la latenza segue invece uno stesso input lungo un percorso.

CPU Busy è un intervallo ricostruito prima di Present che può includere attese di worker, asset o limiter; non è un profiler delle istruzioni. GPU Busy descrive attività GPU attribuita al processo, mentre CPU/GPU Wait suddividono gli intervalli secondo le definizioni dello strumento. L'utilizzo percentuale è telemetria: queste grandezze non sono intercambiabili. Il tempo di coda non si ricava sottraendo la media GPU Busy dalla media del frametime: gli estremi sono diversi. Nemmeno le durate delle routine interrupt dei driver, ISR/DPC, né il RTT, il tempo di andata e ritorno in rete, misurano quel viaggio.

Un limite di framerate, o **cap**, può lasciare margine limitando il ritmo di produzione. Una funzione integrata nel motore può invece coordinare **quando** iniziare il lavoro, in prossimità della possibilità di eseguirlo. I due interventi possono collaborare, ma non sono equivalenti e non hanno beneficio fisso. La risposta del server segue inoltre un percorso di rete diverso: non si somma indistintamente il RTT a ogni movimento locale della visuale.

Nei disegni commerciali NVIDIA presenti nella base, **56 ms, 28 ms e “50% Faster”** illustrano un caso del produttore. Non sono dati di questo PC né una previsione del guadagno; non sono disponibili qui i dati grezzi di quel confronto [13].

### NVIDIA Reflex: ON, Boost e Frame Warp sono tre cose diverse

**Reflex ON** sfrutta l'integrazione del gioco per coordinare il lavoro CPU con la GPU e contenere la coda. Il beneficio è spesso più evidente quando la GPU è il limite; non elimina il costo di simulazione, il lavoro di rendering o la scansione del display. Se il gioco offre Reflex, NVIDIA indica di preferirlo alla modalità Low Latency del driver; abilitarle entrambe non somma due riduzioni [1–2].

**ON + Boost** aggiunge una politica che mantiene frequenze GPU più alte in condizioni supportate, anche quando il carico è limitato a monte. Può evitare transizioni di clock sfavorevoli, ma può aumentare consumo, calore e rumore. Non è un livello universalmente migliore: confronta ON e ON + Boost nella scena reale, inclusa la cattura se la usi. Se non appare un vantaggio ripetibile, torna a ON.

La pagina NVIDIA distingue inoltre **Reflex 2 Frame Warp**: dopo che l'immagine è stata renderizzata, un passaggio aggiorna la vista usando l'ultimo input mouse prima dell'invio al display [2]. È un'altra fase del percorso, non un sinonimo di Boost. Concettualmente è una **riproiezione** della scena già calcolata: non riesegue fisica, animazioni, logica dello sparo o risposta del server. Una visuale aggiornata prima non dimostra che un colpo sia stato simulato o confermato dalla rete prima.

Il cambio di prospettiva può scoprire superfici assenti nell'immagine originale, per esempio dietro il bordo di un oggetto: queste **disocclusioni** devono essere gestite dall'implementazione. Oltre alla latenza, andranno verificati bordi, aree ricostruite e coerenza durante il movimento. Non ricaviamo da questo principio una soglia FPS o un costo fisso in ms.

Alla data di questa revisione, ottobre 2026, la pagina NVIDIA consultata indica Frame Warp ancora come **coming soon**. Non viene dunque proposto come impostazione generalmente disponibile. Servono release pubblica, titolo, GPU e driver documentati; demo, previsioni e supporto di Reflex Low Latency non certificano disponibilità o compatibilità di Frame Warp [2].

L'opzione **Low Latency** del driver tenta di gestire l'anticipo a un livello diverso. Comportamento e disponibilità dipendono da API, driver e motore: non è “Reflex in tutti i giochi”. Nei titoli con Reflex usa il controllo nativo come riferimento; negli altri tratta la modalità driver come una variazione singola, non come una promessa di coda nulla. La guida NVIDIA del 2020 documenta Reflex fino alla serie GTX 900 e consiglia di provare la modalità driver nel solo profilo del gioco: vecchie tabelle di compatibilità non sostituiscono la documentazione corrente [1].

Per un confronto nativo salva il valore nel menu del gioco, prova OFF e ON mantenendo cap e sync, poi valuta Boost in una serie separata a sessione calda. Torna al valore iniziale se la prova produce regressioni; non compensarle attivando contemporaneamente un cap diverso. Registra clock, potenza, temperatura e stabilità, non soltanto FPS; su notebook con budget condiviso conta l'effetto sull'intera macchina. Le metriche in-engine espongono timestamp: **Reflex Analyzer**, con hardware compatibile, osserva invece clic e cambiamento luminoso in una regione. Reflex ON non significa che tu disponga già di quella misura fisica. La guida NVIDIA del 2020 è utile per i principi, non certifica un preset per tutte le build successive di Windows [1].

Nel video CS2 Kitchen [12], il test Cache **4K Ultra con dieci bot** riporta medie **20,0 ms OFF, 16,7 ON e 15,6 Boost**, con P90 22,2, 18,9 e 17,7 ms. Il carico leggero dà un altro risultato: a cap nominale 200, Boost 8,6 ms contro 8,8 per OFF/ON, con “90% Worst” 11,1 per tutte; alle etichette 600 le tre medie sono 6,5 ms. Sono prove dell'autore, con 1000 campioni per modalità nel setup descritto più avanti, non benefici locali garantiti. **P90 e “90% Worst” sono etichette diverse:** senza definizione non vanno equiparate; mancano serie frametime e intervalli di confidenza.

### AMD Anti-Lag e Anti-Lag 2

Il README AMD letto distingue **Anti-Lag**, funzione driver che coordina il ritmo CPU rispetto alla GPU nei percorsi supportati, e **Anti-Lag 2**, integrato nei titoli compatibili e capace di intervenire in un punto noto del motore [3]. Lo scopo generale è ridurre l'anticipo e la latenza in condizioni appropriate; non garantisce un miglioramento quando il tempo è dominato da un'altra fase.

Il **README ufficiale Anti-Lag 2 SDK** chiarisce il punto decisivo: l'attesa viene inserita subito prima che il gioco campioni i controlli, non soltanto nel rapporto fra produttore CPU e consumatore GPU del driver [3]. Indica hardware RDNA 1/RX 5000 e successivi, Adrenalin 24.6.1 e successivi per DX11 e 24.7.1 per DX12; questi requisiti del documento non sostituiscono quelli del titolo. Con FSR 3 Frame Generation sono previsti dati aggiuntivi per distinguere frame interpolati e applicativi: non basta l'esistenza di una voce nel menu per dimostrare integrazione completa.

Verifica disponibilità e controlli della release installata: **Anti-Lag+ storico non è Anti-Lag 2** e non va ripristinato tramite workaround. Preferisci l'integrazione nativa quando documentata; non accumulare funzioni senza capire chi determina il ritmo. **Radeon Boost** riduce carico grafico attraverso risoluzione/shading nei percorsi supportati; **Chill** gestisce il framerate. Non svolgono il compito di Anti-Lag e non correggono automaticamente una simulazione lenta. Un'implementazione compatibile non autorizza qualsiasi hook in un gioco protetto.

### Upscaling e Frame Generation: più immagini non equivalgono a più simulazioni

**DLSS/FSR upscaling** ricostruiscono un'immagine d'uscita da una risoluzione interna inferiore. Meno pixel possono ridurre il lavoro GPU, ma esistono un costo di ricostruzione e una qualità da confrontare. In presenza di un limite GPU, il ritmo può migliorare; con un limite CPU o un cap, il risultato può essere soprattutto un minor carico GPU. Mantieni il segnale monitor identico: upscaling del gioco e scaling del display non sono la stessa operazione.

La **Frame Generation**, o FG, produce immagini aggiuntive a partire da quelle renderizzate e da altri dati del percorso. Questo principio include Multi Frame Generation, MFG, e generazione driver, pur con implementazioni e compatibilità differenti. Può rendere il movimento più continuo, ma non genera necessariamente un nuovo campionamento input per ciascuna immagine aggiunta. Il moltiplicatore di FPS non moltiplica automaticamente la reattività; la generazione ha inoltre un proprio costo.

Reflex può contenere alcune attese, ma non rende gratuito quel passaggio. Frame Warp aggiorna la vista con input recente e non va confuso con la generazione di nuovi frame. Per confrontare FG ON/OFF conserva risoluzione, qualità e profilo sync, e riporta separatamente ritmo applicativo e immagini mostrate. Non dividere CPU Busy per il moltiplicatore.

In PresentMon controlla **Frame Type** soltanto se app e driver forniscono classificazione valida. Valori generici o non impostati non dimostrano che ogni immagine sia applicativa. Un cap può agire sulla cadenza di base oppure su un'altra parte dell'uscita a seconda dell'integrazione: leggi la documentazione del titolo e verifica gli FPS effettivi, invece di moltiplicare o dividere il target a priori. Per una prima diagnosi CPU/GPU usa una baseline senza FG [4].

## 2. Come arrivano le immagini al monitor

Un monitor a refresh fisso scandisce nuove immagini secondo la propria cadenza. A 240 Hz l'intervallo nominale è circa 4,17 ms. Se il buffer cambia durante la scansione, lo schermo può contenere porzioni di frame diversi: è il **tearing**, la separazione visibile lungo una o più linee. Più FPS possono aggiornare il contenuto più spesso, ma non rendono quella scansione simultanea.

### V-Sync OFF

Consente un percorso che non attende necessariamente il confine del refresh. È un punto di partenza per privilegiare reattività, accettando tearing, ma non garantisce da solo bassa latenza: CPU e GPU possono ancora accumulare lavoro. FPS sbloccati possono aumentare carico, calore, rumore e contesa con OBS. Se il carico GPU spinge il percorso verso una coda più lunga, un cap o la coordinazione nativa possono migliorare il compromesso.

### V-Sync ON

Coordina la presentazione con la scansione per evitare tearing. Quando un frame non arriva in tempo, il sistema può mantenere l'immagine precedente o applicare il comportamento previsto dal buffering. Attese e latenza dipendono da swapchain, motore e scheduling: “V-Sync aggiunge sempre un frame” è una semplificazione non valida per ogni percorso.

Il **triple buffering** non è un unico algoritmo disponibile con lo stesso effetto in ogni API. La relativa opzione driver può riguardare soltanto determinati percorsi, per esempio OpenGL. Più buffer non sono automaticamente meno coda. Non abilitarli come cura generica senza sapere quale implementazione stai modificando.

### VRR: G-SYNC, FreeSync e Adaptive-Sync

Il **Variable Refresh Rate**, o VRR, permette al display di adattare gli intervalli di aggiornamento entro un intervallo operativo. VESA Adaptive-Sync, G-SYNC/G-SYNC Compatible e FreeSync indicano supporti e certificazioni diversi, non monitor identici. Il VRR aiuta quando la consegna dei frame varia, ma non ripara simulazione irregolare, scatti di streaming o frame persi.

Controlla supporto del monitor **per la porta usata**, relativo intervallo, cavo, GPU, driver, OSD (il menu del monitor) e impostazioni del gioco. Non basta trovare “VRR” nella scheda del pannello: porta HDMI e DisplayPort possono esporre capacità diverse. Un indicatore del driver o dell'OSD può aiutare a verificare l'attivazione; un contatore Displayed FPS non la certifica. L'OSD può mostrare il refresh nominale o un multiplo LFC e non è un logger ad alta frequenza: una media o un numero stabile non descrivono gli intervalli mancanti o le transizioni.

Ai due estremi cambia il problema:

- **Sopra il massimo VRR**, il monitor non può seguire ogni nuova consegna. A seconda di V-Sync e percorso possono comparire tearing oppure attese vicino al tetto.
- **Sotto il minimo**, il display può uscire dal regime VRR ordinario. La **Low Framerate Compensation**, LFC, ripete immagini per mantenere una frequenza operativa nel range quando supportata: non crea nuova simulazione e non cancella lo stutter del frame originale. Il comportamento dipende dalla combinazione e non è garantito da ogni etichetta FreeSync [5]. Nell'esempio AMD, 40 FPS su un display compatibile 60–144 Hz vengono mostrati con refresh ripetuti a 80 Hz: il gioco resta a 40 FPS, senza 80 nuove simulazioni. Multipli nell'OSD non sono automaticamente un guasto VRR.

V-Sync e VRR possono quindi coesistere. Nel profilo sotto il tetto, V-Sync può fungere da guardia superiore anziché imporre continuamente un ritmo fisso. Vedere V-Sync ON non dimostra che il VRR sia spento; la sua disattivazione non è requisito universale del VRR. Il VRR può ridurre tearing e alcune attese, ma non azzera scanout, risposta dei pixel o latenza fisica; frame prodotti più rapidamente del refresh non vengono tutti mostrati.

### Fast Sync ed Enhanced Sync

Sono modalità orientate a ridurre alcuni compromessi del V-Sync tradizionale, ma non sostituiscono il VRR. Nel percorso tipico di **Fast Sync**, fra i frame completati si seleziona quello adatto alla successiva scansione senza mostrare ogni frame prodotto. **Enhanced Sync** usa una politica AMD diversa, dipendente dalle condizioni e dal supporto. Possono essere opzioni da provare quando la cadenza è elevata rispetto al refresh, ma vicino o sotto il tetto possono produrre ritmo o risposta diversi da quelli desiderati.

Non combinarle automaticamente con ogni modalità VRR. Verifica tearing, regolarità e latenza nel titolo; se emergono scatti, flicker o incompatibilità, ripristina la modalità precedente. Una media FPS molto alta non garantisce il migliore intervallo fra le immagini selezionate.

### Strobo della retroilluminazione e OLED

Lo strobo illumina per una parte ridotta dell'intervallo e può migliorare la chiarezza del movimento. Richiede una cadenza adatta alla modalità del monitor; irregolarità e frame ripetuti possono diventare più visibili. Luminosità, flicker e compatibilità con VRR dipendono dal modello. Non è un'ottimizzazione gratuita della latenza e non va attivato contemporaneamente al VRR se il monitor non supporta esplicitamente la combinazione.

Un OLED può avere transizioni dei pixel molto rapide, ma conserva scansione ed elaborazione del segnale. Non cancella tearing, coda CPU/GPU o eventuale flicker VRR. Il tempo di risposta dei pixel non è la latenza totale.

## 3. Scegliere un profilo iniziale senza trasformarlo in un preset universale

### Priorità: reattività competitiva

V-Sync OFF, tearing accettato e coordinazione nativa Reflex/Anti-Lag 2 quando disponibile costituiscono una base di confronto. Non serve tenere la GPU obbligatoriamente al massimo: prova un cap che preservi il ritmo nelle scene pesanti e lasci margine per i carichi abituali. Confronta comportamento sbloccato e limitato, tenendo tutto il resto identico.

Il target non si sceglie soltanto dal refresh: contano throughput sostenibile, code e variabilità. Senza coda significativa, abbassare inutilmente il ritmo può ridurre la frequenza dei nuovi frame applicativi. Puoi usare VRR OFF come riferimento a refresh fisso per isolare il comportamento, ma non è un obbligo competitivo universale. Se non hai un metodo valido per l'input, puoi documentare carico e pacing, ma non promettere millisecondi di clic→fotone risparmiati.

### Priorità: immagine integra e fluidità entro il VRR

1. Verifica refresh e segnale attivo, quindi abilita il VRR dove richiesto da monitor e driver.
2. Scegli **un percorso V-Sync documentato** per la combinazione gioco/driver. La guida NVIDIA del 2020 descrive G-SYNC con V-Sync e Reflex oppure Ultra Low Latency, non un obbligo generale di V-Sync interno OFF. È un riferimento di quel contesto, non una prescrizione trasversale ad AMD, Intel e tutte le API [1]. La guida segnala limiti dell'override in finestra e su notebook MS Hybrid: se non si applica, verifica il controllo del gioco invece di presumere che la spunta abbia effetto. AMD indica V-Sync oppure cap quando si supera regolarmente il refresh [5], senza trasferire automaticamente gli automatismi NVIDIA.
3. Imposta un cap con margine sotto il massimo VRR e verifica il ritmo effettivo nelle scene critiche.
4. Controlla che overshoot e variabilità non riportino continuamente al tetto; osserva anche comportamento sotto il minimo, tearing e flicker. Un cap non elimina necessariamente il flicker: vicino ai cambi di cadenza e alla zona LFC servono diagnosi separate.

“Refresh meno 3 FPS” è soltanto un punto da esplorare. A 144 Hz, 141 FPS e a 360 Hz, 357 FPS non rappresentano lo stesso margine temporale: la differenza va valutata in ms e rispetto alla precisione del limiter. Anche a 500 Hz e 497 FPS il margine è di circa 0,01 ms, non di tre frame interi; nemmeno una percentuale fissa garantisce il risultato.

NVIDIA documenta che, nei contesti compatibili con G-SYNC e V-Sync, Reflex o alcune modalità Low Latency possono già produrre un **limite automatico** sotto il refresh [1]. Misura il limite realmente dominante prima di aggiungerne uno manuale. Un cap nominale di 235 non è il target effettivo se un altro meccanismo ferma il gioco a 225. La documentazione nota anche che l'autocap può avere latenza leggermente maggiore rispetto a Reflex con FPS sbloccati: non ordinare le modalità dal nome, misura la coda nella scena che usi.

Il criterio è un solo limite intenzionale e una configurazione comprensibile, non il massimo numero di opzioni abilitate. Se il gioco non sostiene il target, abbassalo o modifica un solo carico pertinente; il VRR non rende istantaneo un frame lento.

### Priorità: single-player, silenzio o registrazione

Un cap sostenibile può stabilizzare il carico e lasciare spazio a composizione/codifica. Il limiter interno resta il primo confronto; uno esterno può essere utile se il pacing interno è problematico o manca un cap, purché compatibile. FG può aumentare fluidità visiva, ma va valutata separatamente da latenza, artefatti e cadenza di base.

Per la registrazione non basta il contatore del gioco: controlla statistiche OBS e uscita. Un video a cadenza fissa non segue automaticamente tutti gli intervalli del monitor VRR. Non scegliere un target soltanto perché è un multiplo degli FPS di registrazione.

## 4. DWM, flip model, MPO e FSO: verificare il percorso prima dei tweak

**DWM**, Desktop Window Manager, compone le superfici del desktop. Non significa che ogni gioco in finestra debba seguire in ogni istante lo stesso percorso di composizione. Il **flip model** consente di condividere con il sistema i buffer da presentare in modo più efficiente del vecchio trasferimento per copia, o blit. In condizioni appropriate, DirectFlip, Independent Flip e overlay hardware possono ridurre il lavoro di composizione [6].

**MPO**, Multi-Plane Overlay, permette all'hardware di usare piani separati per superfici idonee. Non è né un sinonimo di VRR né la causa universale degli scatti. La sua disponibilità dipende da contenuto, driver, dimensioni, formato e altre condizioni. Un piano dedicato può mantenere un percorso Independent Flip anche quando altri contenuti sono visibili. Una finestra sopra il gioco, un overlay o una cattura possono cambiare il percorso, ma non tutti gli overlay lo cambiano sempre nello stesso modo.

Su Windows 11, l'opzione **Ottimizzazioni per i giochi in finestra** riguarda i giochi DirectX 10/11 compatibili in finestra o borderless e può spostarli dal modello legacy al flip moderno. Microsoft associa questo percorso a minore latenza di presentazione e accesso a funzionalità come VRR e Auto HDR [7]. Non è una trasformazione universale di ogni gioco Vulkan, OpenGL o DirectX 12. DirectX 12 usa già il flip: l'opzione non è il suo interruttore. Se provi il controllo per un'app, annota il valore e riavvia il gioco prima del confronto. Nel percorso documentato da Microsoft: **Impostazioni → Sistema → Schermo → Grafica → opzioni dell'app**, seleziona il gioco e il controllo delle ottimizzazioni, salva e riavvia. UI e voci possono cambiare per build. **Auto HDR** può abilitarle automaticamente; per spegnerle può essere necessario disattivare prima Auto HDR. Registra entrambi gli stati e ripristinali, senza cambiare insieme GPU preferita o altre opzioni.

Le **Fullscreen Optimizations**, FSO, permettono un percorso gestito da Windows che cerca vantaggi del fullscreen mantenendo integrazione con il desktop [8]. Il toggle di compatibilità “Disabilita ottimizzazioni schermo intero” riguarda quel meccanismo; non disattiva ogni ottimizzazione grafica e non garantisce il ritorno a un percorso identico su qualsiasi gioco.

Di conseguenza, la scritta **“schermo intero” nel menu non prova fullscreen esclusivo**. Il fullscreen esclusivo classico, FSE, concede all'app il possesso dello schermo, senza fermare ogni attività in background; borderless è una finestra che lo copre. Quest'ultima può raggiungere Independent Flip e non ha una penalità fissa ricavabile dal nome.

PresentMon documenta `Hardware: Legacy Flip` per possesso dello schermo e scambio superficie, `Hardware: Independent Flip` per scambio senza quel possesso, `Composed: Flip` per superfici condivise con DWM e `Hardware Composed: Independent Flip` per un piano overlay hardware; le modalità Copy distinguono percorsi di copia [4]. Conserva le stringhe originali: sono osservazioni del percorso, non voti di qualità.

**PresentMode non certifica VRR, V-Sync OFF o latenza fisica.** `SyncInterval` descrive la richiesta dell'app, modificabile dal driver; `AllowsTearing` indica la possibilità di frame parziali, non che uno strappo sia apparso. Anche copie fra GPU su sistemi ibridi possono incidere: non attribuire tutto a borderless senza verificare il percorso.

PresentMode non è uno stato permanente: può cambiare quando compare un secondo monitor, un overlay o una notifica. Conserva la stringa nel tempo e la frequenza delle transizioni, non soltanto il valore iniziale. In **Impostazioni → Sistema → Schermo → Schermo avanzato** verifica refresh attivo, HDR e modalità del segnale: quella pagina descrive l'uscita, non misura la latenza.

### HAGS non è il modello di presentazione

HAGS modifica chi gestisce parte della pianificazione GPU; non seleziona da sola esclusivo, borderless, VRR o MPO. Microsoft la descrive come modifica dello scheduler che richiede hardware/driver compatibili [9]. Effetti su gioco, cattura e supporto FG sono dipendenti dalla combinazione. PresentMon segnala inoltre possibili imprecisioni dei tempi GPU con HAGS [4].

Se una funzione richiede HAGS, non spegnerla casualmente durante una prova FG. Per una prova motivata, chiudi gioco e cattura, annota il valore in **Impostazioni → Sistema → Schermo → Grafica → impostazioni grafiche predefinite/avanzate**, quindi cambia soltanto **Pianificazione GPU con accelerazione hardware** e riavvia Windows. Il nome della pagina può variare; se il controllo manca, non forzarlo tramite registro. Confronta A–B–A mantenendo driver e carico, poi riporta il valore annotato, riavvia nuovamente e verifica il funzionamento delle funzioni abituali. Arresta la serie con crash, errori di cattura o perdita di funzionalità. Un numero cambiato potrebbe riflettere anche un diverso limite dell'osservazione. Non è un tweak consigliato per ottenere a priori meno latenza [4,9].

### Una prova per gioco, con ripristino

1. Salva profilo e impostazioni correnti. Mantieni risoluzione, refresh, cap, sync, FG e carico identici.
2. Acquisisci un tratto ripetibile e osserva PresentMode, scarti, cadenza mostrata e soltanto le latenze valide.
3. Cambia **una** modalità di visualizzazione o il controllo Windows pertinente; riavvia il titolo e ripeti A–B–A.
4. Verifica anche Alt-Tab, overlay abituale e cattura come prove distinte. Aggiungi separatamente secondo monitor, Discord, video e notifiche: una transizione breve può sparire dalla media. Un secondo display a 60 Hz non impone automaticamente 60 FPS al principale. Un percorso favorevole a gioco pulito può cambiare quando appare un'altra finestra.
5. Se non c'è un beneficio ripetibile, o peggiorano compatibilità e cattura, riporta l'impostazione al valore iniziale e riavvia il gioco.

Per una prova **FSO** documentata: chiudi il titolo, apri **Proprietà dell'eseguibile reale → Compatibilità → Disabilita ottimizzazioni schermo intero**, annota lo stato, cambia la sola casella e applica [8]. Riapri il gioco, confronta e poi riporta la casella allo stato iniziale, riaprendo nuovamente. Non confondere la casella con il toggle Grafica per giochi in finestra.

Nel test CS2 Kitchen, Cache con impostazioni Ropz e **nove bot in movimento**, fullscreen e borderless hanno entrambe media 9,0 ms (“90% Worst” 10,5 e 10,4). La prova della casella FSO in Workshop riporta 6,1 ms disabilitando le ottimizzazioni contro 6,0 normale, con 7,1 nella statistica “90% Worst” per entrambe [12]. Sono confronti distinti dal test Reflex a dieci bot. Mancano intervalli di confidenza e una traccia ETW (Event Tracing for Windows) nel PNG: non dimostrano identità universale delle modalità né bypass DWM.

Non disattivare globalmente MPO tramite registro né inseguire l'eliminazione di DWM come primo intervento. Una diagnosi documentata su una specifica versione può richiedere una procedura di supporto del produttore, ma non rende quel workaround una regola generale. Per questa guida non è necessario alcun cambio del registro.

## 5. I limiter: quale ritmo controllano e dove aspettano

Il **frame pacing** è la regolarità della cadenza in un punto dichiarato della pipeline. Un limiter evita di iniziare o presentare più velocemente di un target. Può usare attese, cessione del tempo allo scheduler o strategie attive. Un'attesa posta prima che il motore legga l'input non equivale a una posta dopo rendering e Present. **Un grafico più regolare non prova che il contenuto mostrato sia più recente.**

| Metodo | Perché provarlo | Limite da verificare |
|---|---|---|
| Cap interno | Il motore può intervenire vicino a simulazione e input | Posizione, precisione e qualità del pacing variano fra giochi |
| Cap driver | Utile se il titolo non offre un limite adatto | Non conosce necessariamente il punto di input; API e implementazione contano |
| RTSS | Profili, controllo del pacing e osservazione con strumenti supportati | Hook, anti-cheat, compatibilità e modalità effettiva del limiter |
| Special K | Controllo e diagnostica in contesti compatibili | È uno strumento iniettato: non usarlo automaticamente nei giochi protetti [11] |

Il primo confronto è il cap interno. Se funziona bene e soddisfa l'obiettivo, non aggiungere tool. Con un'alternativa esterna usa un profilo per l'eseguibile, non un profilo globale che modifica anche altri giochi; salva prima i valori. Usa distribuzioni ufficiali e rispetta policy e compatibilità [10–11].

### Che cosa dimostra il benchmark CS2 Kitchen

Il video identificato **Everyone is Lying about Input Latency Settings**, CS2 Kitchen, 12 luglio 2026, confronta limiter in CS2 con un sistema e un metodo fisico specifici [12]. Il generatore Teensy invia un **report HID→risposta visiva nero/bianco**: la misura non caratterizza switch, debounce o latenza del mouse commerciale del lettore. Usa Ropz settings Workshop Map, RTX 5070 Ti, RAM 32 GB 6000 CL30, Teensy 4.1/8000 Hz e Zowie 400 Hz con DyAc Premium; il transcript indica 9800X3D. I grafici dichiarano 1000 campioni per limiter.

| Cap nominale | NVIDIA, media | RTSS, media | `fps_max`, media |
|---|---|---|---|
| 600 | 7,3 ms | 7,3 ms, etichetta “RTS” nel PNG | 6,5 ms |
| 400 | 8,6 ms | 8,3 ms | 6,9 ms |
| 200 | 12,5 ms | 12,4 ms | 8,8 ms |
| 100 | 20,0 ms | 20,5 ms | 12,2 ms |

Il cap interno ha medie inferiori **in quei confronti**, soprattutto a target 100. Questo giustifica provarlo per primo, non affermare che ogni limiter esterno aggiunga esattamente un frame. Il video identifica la riga “RTS” come RTSS. La trascrizione arrotonda il gruppo a cap 200, mentre il PNG distingue NVIDIA 12,5 da RTSS 12,4: sono conservati i valori del grafico. Un cap nominale non prova FPS sempre sostenuti. Cambiare cap cambia anche il periodo disponibile per lavoro e attese: non interpolare guadagni del PC del lettore e non sommare queste differenze a quelle dei test mouse/polling. La coincidenza di alcune medie non rende identiche le distribuzioni.

La trascrizione introduce il confronto limiter nel contesto dell'uso senza Reflex; i PNG non riportano tutti gli stati di sync e driver. Non estendere quindi quei valori a Reflex ON o a un profilo VRR diverso. Il metodo non documenta ogni backend RTSS, non classifica universalmente FES contro Async e non è un test completo del frametime. L'overlay semplice RTSS visibile non dimostra che la modalità avanzata fosse quella citata in altri video. La variazione fra mouse/rate nel secondo tratto del video non isola il limiter: non unire quelle condizioni per creare una classifica.

La cattura grafica locale duplicata a cap 100 rappresenta gli **stessi dati**, non una replica e non 2000 campioni. La coincidenza di una seconda immagine con il primo grafico non aumenta la forza della prova. Questi risultati non sono misure del nostro PC e non forniscono un preset per altri motori, monitor o profili VRR.

### RTSS 7.3.7: documentazione e punti ancora condizionali

La pagina Guru3D consultata propone **RTSS 7.3.7 Final** e avverte di incompatibilità fra OSD e restrizioni anti-cheat [10]. Il changelog documenta il provider PresentMon V2 e il punto di calcolo frametime **present-to-present** oppure **start-to-start**. Il primo osserva chiamate Present successive, il secondo gli inizi CPU ricostruiti. Cambiare **Frametime calculation point** può cambiare il grafico senza cambiare quando il gioco legge l'input.

Per **Async, Front Edge Sync e Back Edge Sync**, il report di verifica locale conserva una citazione community attribuita a Unwinder: Front attenderebbe prima di Present, Async/Back dopo. Non è stato recuperato il post primario collegato né un help completo della versione; il dettaglio resta **condizionale** [12]. Anche “prima di Present”, se confermato, non significa necessariamente “prima dell'input”: il motore potrebbe averlo già letto. Questi nomi descrivono limiter, non Adaptive-Sync del monitor.

**Passive Waiting** riguarda il modo di attendere. Strategie che cedono tempo allo scheduler oppure mantengono attesa attiva possono cambiare precisione, consumo e contesa CPU. Verifica l'help della release; **Passive Waiting OFF non è un consiglio universale**, soprattutto con CPU già critica o x264. Non sacrificare carico e frame lenti altrove per una curva leggermente meno oscillante.

**Scanline Sync** è un controllo distinto, orientato al momento della presentazione rispetto alla scansione. Non aggiungerlo al profilo VRR come un miglioramento gratuito e non confonderlo con Front/Back. Richiede un contesto adatto e verifica della posizione del tearing e del margine, non la selezione del nome più convincente.

Il changelog documenta anche **marker NVIDIA Reflex iniettati**. Un marker esterno non prova l'integrazione Reflex nel motore e può non conoscere l'autentico momento di input o simulazione. Una latenza derivata da marker nativi non va confrontata senza spiegazioni con quella ottenuta da marker inseriti da un altro tool. Il provider RTSS può inoltre trasformare i dati, per esempio rappresentare con il valore zero i campioni non validi/scartati nel percorso documentato: conserva versione del provider e dati grezzi, non interpretare automaticamente quello zero come latenza nulla.

Lo stesso vale per un limiter che usa **Reflex Sleep**: riutilizzare un'attesa non crea da solo la coordinazione nativa fra input, simulazione e submission. Non è una ricetta “Reflex in ogni gioco”. Servono documentazione dell'implementazione, compatibilità e punti di misura noti; un valore apparentemente migliore con marker cambiati può non essere un confronto equivalente.

### I video FES e il «video 4»: idee da verificare, non ricette

Il video identificato **Front Edge Sync Guide 2026 | Reduce Micro Stutter, Improve Frame Pacing & Smoother PC Gaming**, 19 giugno 2026, è di **Scotty-2-Hotty354**. Everything OLED è citato, non è l'autore [12]. Termini come “Instant” e impressioni di fluidità non sono misure fisiche. La proposta di ricavare il cap dagli **1% low** può suggerire un valore da esplorare, ma dipende da percorso, durata e algoritmo: non è una regola ufficiale RTSS e non garantisce che i frame futuri rispettino il target.

La schermata locale con cap 120, frame presentation, percentile buffer ring, Front Edge Sync e Passive Waiting OFF orienta sui controlli della UI. È una cattura fornita dall'utente, senza autore dichiarato; non è provata come frame di quel video né come benchmark. Il profilo Global visibile è un ulteriore motivo per non copiarla come preset.

Per il **«video 4»** sono disponibili transcript e analisi locale, ma non URL, canale, titolo e data: resta non identificato. Vi compare **FramePacer**, descritto come limiter a pagamento, senza identificazione verificabile del prodotto o documentazione primaria: non ne deriviamo algoritmo, API supportate, prezzo attuale o superiorità. I confronti in Cyberpunk descrivono molti overlay, reset, cambi camera, incompatibilità e crash. Sono domande da indagare, non condizioni sufficienti per isolare il limiter.

In particolare, PC Latency osserva input ricevuto nel PC→invio al display, con strumentazione compatibile; Render Present Latency osserva Present→completamento GPU. Display Latency ha descrizioni non identiche fra README app e console. Una colonna “Click To Photon” non dimostra da sola un sensore ottico; Animation Error non equivale genericamente a CPU/GPU fuori sync; Displayed FPS non certifica VRR [4]. Non scegliere il numero più basso comparso prima di un crash e non sommare offset stimati per trasformare software in misura fisica.

### Cosa adottiamo, cosa lasciamo come ipotesi

| Affermazione diffusa | Lettura prudente |
|---|---|
| “Reflex ON abbassa sempre la latenza” | Nei giochi supportati e con coda GPU il meccanismo è coerente; non è disponibile ovunque e non sostituisce un carico già fuori scala. |
| “Cap sotto il refresh = più reattivo” | Può stabilizzare il frame time e ridurre l'accodamento con VRR/V-Sync; il valore dipende da gioco, display e limiter. |
| “Il cap interno vince sempre” | Nel test CS2 Kitchen vinceva in quelle condizioni; non è una legge per ogni motore e ogni scena. |
| “RTSS aggiunge sempre un frame” | I confronti mostrano differenze variabili; un frame di penalità non è una costante universale. |
| “Disabilitare FSO è sempre meglio” | Nel test FSO la differenza era 6,1 vs 6,0 ms, senza intervalli di confidenza: non conclude. |
| “HAGS alza FPS e abbassa latenza” | È una modalità di scheduling; alcune funzioni FG la richiedono, ma non è un guadagno universale. |
| “Disattivare MPO risolve gli stutter” | È un workaround di casi specifici, non una regola generale. |
| “Frame Generation riduce la latenza” | Aggiunge immagini mostrate; la simulazione e il percorso input non diventano più rapidi per moltiplicazione. |

## 6. Un confronto piccolo, completo e ripristinabile

1. **Controlla gioco, torneo e anti-cheat.** ETW, finestra overlay e OSD/limiter iniettati sono diversi, ma questa distinzione non autorizza nessuno automaticamente. In caso di dubbio evita injection e chiedi conferma; non cambiare hook per aggirare un blocco.
2. **Definisci un solo cap intenzionale.** Salva prima valori e profili di cap interno, driver e tool esterni, oltre a sync e coordinazione nativa. Scegli un target sostenibile nella scena difficile. Disabilita gli altri cap manuali e annota quelli automatici. Verifica il target effettivo, non soltanto il numero nel menu. Mantieni sync, Reflex/Anti-Lag, FG, HAGS, qualità e segnale identici.
3. **Separa limiter e misura.** Controlla inizialmente con un overlay essenziale; per la serie decisiva preferisci CSV con la stessa raccolta ETW, senza aggiungere OSD. RTSS può usare i dati di PresentMon: due contatori non diventano indipendenti. Controlla anche se cambia PresentMode. Per configurare la raccolta nell'app PresentMon: seleziona eseguibile/PID del gioco, verifica adapter, in Custom → Edit scegli le metriche indicate al punto 5, poi durata finita, hotkey non conflittuale e cartella output. Fai una breve acquisizione di controllo prima della serie. La UI 2.6.0 orienta sui controlli, non certifica il supporto di ogni metrica.
4. **Esegui A–B–A.** Completa il warm-up e considera A–B–A un blocco: riferimento, una sola alternativa, ritorno al riferimento. Acquisisci lo stesso tratto per la stessa durata, per esempio 60 secondi, e ripeti il blocco almeno tre volte; così avrai almeno tre acquisizioni per ciascuno stato. Avvia e ferma con la hotkey; evita Alt-Tab nel tratto utile. Prova prima il cap interno, poi una sola alternativa se esiste un problema. PresentMon 2.6.0 documenta CSV per frame e `-stats.csv` in `%LOCALAPPDATA%\Intel\PresentMon\Capture`: conserva entrambi, intestazioni e annotazioni, senza sostituire dati mancanti con zero o cancellare selettivamente picchi/scarti.
5. **Leggi aspetti distinti.** Intervalli CPU, Present e mostrati; scarti; distribuzione dei frame lenti; Busy/Wait; latenza soltanto valida. Mantieni identici finestra statistica, definizione dei percentili e origine dei marker. Non ricavare queue time da medie.
6. **Verifica l'uso reale.** Ripeti nel combattimento/area critica e con OBS abituale se necessario. Nel profilo VRR osserva contatti col tetto e comportamento sotto il minimo. Nel profilo reattivo distingui riduzione della coda da semplice riduzione degli FPS; senza misura adatta la prima resta un'ipotesi.
7. **Ripristina e verifica.** Rimuovi il profilo limiter di prova o riporta i valori salvati; ripristina i cap interni/driver e la sincronizzazione annotata. Chiudi i tool esterni e riavvia il titolo quando richiesto. Se crash o blocchi persistono, interrompi senza disattivare protezioni. Non cancellare i file di confronto.

Esempio ipotetico: due limiter producono circa 200 FPS, CPU Busy resta intorno a 3 ms e GPU Busy a 4 ms, ma B riduce le oscillazioni fra le chiamate Present. Puoi concludere che B ha migliorato il **pacing presentato** in quella prova. Se il ritmo mostrato resta irregolare, occorre indagare a valle; senza dato input valido non puoi affermare che il mouse risponda prima. Se B e il ritorno ad A differiscono meno della variabilità delle baseline, non proclamare un vincitore.

## 7. Miti da chiudere

| Mito | Correzione |
|---|---|
| “V-Sync aggiunge sempre un frame” | Dipende da swapchain, motore, buffering e percorso; non è una costante. |
| “VRR significa nessun tearing e nessuno stutter” | Il VRR riduce il disallineamento, non ripara frame lenti, streaming o carichi irregolari. |
| “LFC crea FPS” | Ripete immagini per restare nel range del display; la simulazione resta alla cadenza originale. |
| “Fullscreen esclusivo è sempre più veloce” | Il percorso conta più del nome; borderless può usare Independent Flip e il risultato va verificato. |
| “Disattivare DWM o MPO è una baseline” | Sono workaround di casi specifici, non ottimizzazioni universali. |
| “Un cap più basso riduce sempre la latenza” | Può ridurre la coda, ma può anche ridurre i nuovi frame applicativi; dipende dal collo di bottiglia. |
| “Reflex è solo un cap” | Coordina il lavoro e la submission; un cap da solo non conosce il punto di input. |
| “Il limiter con la media più bassa è il migliore” | La media non descrive distribuzione, frame lenti, pacing o latenza fisica. |

## 8. Limiti e fonti

Questa guida descrive meccanismi e procedure, non certifica risultati. Le prove citate usano un PC, un gioco, un metodo fisico e versioni precise; non sono trasferibili come preset. Le cifre NVIDIA e AMD sono dichiarazioni dei produttori. Frame Warp, HAGS, FSO e i backend RTSS possono cambiare con release, driver e titolo. Non sono state eseguite nuove acquisizioni o modifiche di sistema per questa stesura.

1. NVIDIA, [System Latency Optimization Guide](https://www.nvidia.com/en-us/geforce/guides/system-latency-optimization-guide/), 1 ottobre 2020: coordinazione, priorità Reflex e profilo G-SYNC nel contesto documentato.
2. NVIDIA, [Reflex](https://www.nvidia.com/en-us/geforce/technologies/reflex/): distinzione Low Latency, Boost e Frame Warp; disponibilità da verificare per titolo e release.
3. AMD GPUOpen, [Anti-Lag 2 SDK — README](https://github.com/GPUOpen-LibrariesAndSDKs/AntiLag2-SDK), copie locali `analisi/fonti-v3/render-amd-antilag.txt` e `analisi/amd-sdk.txt`: punto dell'attesa, requisiti e integrazione FSR 3.
4. Intel/GameTechDev, [PresentMon 2.6.0](https://github.com/GameTechDev/PresentMon/blob/e13fce6acdb55a808fd8318175a56863e532d95f/README.md), [metriche console](https://github.com/GameTechDev/PresentMon/blob/e13fce6acdb55a808fd8318175a56863e532d95f/README-ConsoleApplication.md) e [Capture Application](https://github.com/GameTechDev/PresentMon/blob/e13fce6acdb55a808fd8318175a56863e532d95f/README-CaptureApplication.md).
5. AMD, [FreeSync e Low Framerate Compensation](https://www.amd.com/en/products/graphics/technologies/freesync.html).
6. Microsoft, [For best performance, use DXGI flip model](https://learn.microsoft.com/en-us/windows/win32/direct3ddxgi/for-best-performance--use-dxgi-flip-model).
7. Microsoft, [Optimizations for windowed games in Windows 11](https://support.microsoft.com/en-us/windows/optimizations-for-windowed-games-in-windows-11-3f006843-2c7e-4ed0-9a5e-f9389e535952).
8. Microsoft DirectX, [Demystifying Fullscreen Optimizations](https://devblogs.microsoft.com/directx/demystifying-full-screen-optimizations/).
9. Microsoft DirectX, [Hardware Accelerated GPU Scheduling](https://devblogs.microsoft.com/directx/hardware-accelerated-gpu-scheduling/).
10. Guru3D, [RTSS Rivatuner Statistics Server](https://www.guru3d.com/download/rtss-rivatuner-statistics-server-download/), distribuzione 7.3.7 Final e changelog consultati; non verifica universale di compatibilità.
11. Special K, [README del progetto](https://github.com/SpecialKO/SpecialK/blob/6d6198f50688aae5d85f981d0e43d2dd7cac02c0/README.md): payload iniettato; non certificazione per giochi protetti.
12. [Verifica documentale video e RTSS](../analisi/VERIFICA-VIDEO-E-RTSS.md), con [CS2 Kitchen](https://www.youtube.com/watch?v=zNHFAAJkIvo), [Scotty-2-Hotty354](https://www.youtube.com/watch?v=n6mskKHpEPc), transcript e limiti del video non identificato.
13. NVIDIA, figure dimostrative [Latency Pipeline, 56 ms](https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/news/reflex-2-even-lower-latency-gameplay-with-frame-warp/latency-pipeline.jpg) e [Reflex, 28 ms e “50% Faster”](https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/news/reflex-2-even-lower-latency-gameplay-with-frame-warp/nvidia-reflex-how-it-works.jpg): esempi del produttore, non benchmark locali.

Letture collegate: [CPU/GPU e acquisizione PresentMon](04-cpu-gpu-presentmon.md), [display e cavi](06-display-cavi.md), [input e USB](07-input-usb.md), [metodo di misura](12-misure-verifica.md). Approfondimento online separato: [DLSS e Frame Generation](https://primebuild.website/guides/guida-dlss-frame-generation/), non necessario per applicare le distinzioni di questa guida.
