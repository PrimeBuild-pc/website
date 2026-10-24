# Audio Windows, Peace ed EQ: configurare un percorso verificabile

L'equalizzazione (EQ) non risolve un'uscita sbagliata, un buffer più piccolo non corregge la tenuta delle cuffie e una voce più forte può coprire proprio l'evento che volevi sentire. Per configurare l'audio serve un ordine: identificare il percorso, costruire un riferimento stabile (baseline), liberare il mix e soltanto dopo affrontare un difetto tonale o una prova di latenza.

Questa guida è autonoma e riguarda Windows 11 25H2/26H2, senza certificare build future, driver o release delle app. Distingue un ramo **No APO**, senza Equalizer APO nel percorso, e un ramo **EQ consapevole**, con APO attivo sull'endpoint corretto. Non sono due opzioni da applicare insieme: se disabiliti il motore effetti che ospita l'EQ, non puoi aspettarti che quell'EQ continui a funzionare.

Durante questa redazione non è stato cambiato alcun parametro audio, non sono stati eseguiti tool o applicati filtri e non è stata creata alcuna task. Le procedure descrivono azioni eventuali del lettore; la verifica reale e il rollback su hardware restano separati dalla revisione documentale.

## Preparare il riferimento e riconoscere l'endpoint

Un **endpoint** è l'ingresso o l'uscita logica presentata a Windows. Lo stesso dispositivo può averne più di uno; «Game», «Chat» e «Virtual» possono indicare percorsi software e non prese differenti. Il **routing** è l'instradamento dal programma all'uscita: un'app che ha scelto esplicitamente un dispositivo può ignorare il predefinito di Windows.

Prima di intervenire conserva nomi e ruoli degli endpoint, porta, collegamento, formato, effetti, livelli, gain hardware, cioè guadagno dello stadio fisico, e impostazioni del gioco. Se Equalizer APO è già installato, copia i file della sua configurazione senza sovrascriverli. Registra anche lo stato **ON/OFF** dell'EQ e l'associazione ai dispositivi: profilo, filtri e associazione endpoint non sono la stessa cosa.

### Aprire i pannelli e seguire il segnale

1. Collega le cuffie e abbassa il livello. Apri **Win+I → Sistema → Audio**. In **Uscita** scegli il dispositivo fisico previsto e apri le proprietà; in **Ingresso** identifica il microfono.
2. Apri **Mixer volume**. Durante la tua prova avvia l'app da controllare: una sessione inattiva può non apparire. Verifica uscita e volume del gioco e della comunicazione, non solo il master.
3. Apri il pannello classico con **Win+R → `mmsys.cpl` → Invio**. È raggiungibile anche da Audio → Altre impostazioni audio, secondo la build. In **Riproduzione** identifica il dispositivo e aprine le proprietà.
4. Con clic destro controlla **Dispositivo predefinito** e **Dispositivo di comunicazione predefinito**. In **Registrazione** controlla gli stessi ruoli per il microfono. Possono coincidere oppure essere distinti: conserva la scelta voluta.
5. Usa il test d'uscita a livello prudente e il misuratore d'ingresso. Nel gioco, in Discord e nel software di streaming verifica i dispositivi esplicitamente selezionati. Riapri l'app se non recepisce il cambio.
6. Ricontrolla dopo riconnessione USB, cambio porta o aggiornamento driver: un endpoint nuovo può richiedere una nuova selezione anche in APO.

Non disabilitare tutti gli endpoint per rendere più corto l'elenco. Audio onboard, HDMI, Bluetooth, webcam e dock possono servire a usi diversi; una voce apparentemente duplicata può essere un ingresso o una funzione dello stesso hardware. Il silenzio si affronta prima ripristinando uscita, mute e routing, non disinstallando driver.

## Formato, shared ed exclusive: non scegliere il massimo per principio

Nelle proprietà classiche dell'uscita apri **Avanzate → Formato predefinito**, quando disponibile. La frequenza di campionamento indica quanti frame di campioni rappresentano un secondo; la profondità in bit descrive il formato numerico. Nessuno dei due numeri misura la precisione con cui localizzi un avversario.

**48.000 Hz e 24 bit** sono un riferimento pratico se supportati, non un obbligo. 16 bit non significa automaticamente audio sbagliato; 96/192 kHz e 32 bit non promettono più dettaglio utile o meno ritardo. Non tutti i contenuti di ogni gioco hanno lo stesso formato. Una conversione corretta non implica da sola perdita di localizzazione [1].

Salva il formato iniziale, cambia solo quello, prova a livello basso e verifica gioco e voce. Con silenzio, click o incompatibilità torna al valore registrato e riapri le app. Il formato shared del mixer non forza un'app exclusive o ASIO a usare gli stessi parametri e non imposta tutti i buffer.

**WASAPI shared** consente a più programmi di condividere l'endpoint. **Exclusive** richiede un'apertura specifica da parte dell'app, può bypassare il normale mixer e occupare l'endpoint impedendone l'uso ad altri. La casella «Consenti alle applicazioni di assumere il controllo esclusivo» e quella relativa alla priorità sono autorizzazioni: spuntarle non cambia il backend del gioco. Se un programma monopolizza l'uscita, chiudilo e verifica quel caso; un confronto delle caselle deve conservare e ripristinare gli stati iniziali.

**ASIO** serve ad applicazioni che lo implementano, come alcune DAW, applicazioni per la produzione audio. Installare ASIO o ASIO4ALL non aggiunge quel backend a CS2. DirectSound, XAudio2 e WASAPI sono API, cioè interfacce di programmazione usate dal software, non un selettore universale nel pannello Suoni. Non usare wrapper o sostituzioni di DLL come scorciatoia: possono cambiare routing e buffering e creare incompatibilità con il titolo o l'anti-cheat.

La figura documentale 215758 confronta API in un'app di prova: medie **96,785 ms DirectSound**, **26,629 WASAPI exclusive** e **46,182 shared low latency** nel caso nominale «buffer zero» [5]. Non sono impostazioni equivalenti del gioco; zero non elimina i buffer fisici. Il grafico blu 215903 confronta invece ASIO/Cakewalk Next, CS2 e LDAT App, con valori 3/96/36 ms: autore del grafico, statistica delle barre e significato dei baffi restano non riscontrati. Techless è soltanto un candidato della ricerca precedente. Non fondere i due dataset e non sottrarli alle medie di CS2 per inventare il buffer del motore.

## Baseline No APO: escludere trattamenti opzionali, non tutte le funzioni OEM

Un **APO**, Audio Processing Object, è un componente di elaborazione nel percorso effetti Windows. Può fare EQ, compressione o virtualizzazione; altre elaborazioni digitali del segnale (DSP) possono risiedere nel dispositivo stesso. Per capire se un trattamento contribuisce al difetto, crea una baseline con gli effetti opzionali esclusi e annota ciò che non puoi o non devi disattivare.

No APO qui significa **Equalizer APO fuori dal percorso scelto**, non la prova che ogni elaborazione del driver sia assente. Un notebook può dipendere da funzioni del produttore (OEM) per altoparlanti, microfoni e protezione del trasduttore.

1. Nelle proprietà moderne dell'uscita cerca **Miglioramenti audio → Disattivato** e **Audio spaziale → Disattivato** per costruire questo riferimento. Nel pannello classico le voci possono essere in Miglioramenti, Avanzate o Audio spaziale. Se non esistono, non inventarle nel registro.
2. Se Equalizer APO è associato, conserva la configurazione e rimuovi l'associazione al **solo endpoint** mediante Device Selector/Configurator, con il riavvio previsto. In alternativa, documenta un bypass degli effetti verificato realmente: un profilo senza filtri non prova assenza di APO caricato.
3. Spegni separatamente surround, bass boost, loudness o DSP opzionali nel pannello del dispositivo. L'interruttore Windows non spegne necessariamente il DSP hardware del DAC.
4. Nel gioco seleziona il percorso cuffie/HRTF previsto. **HRTF** è il trattamento che simula indizi di direzione per le due orecchie. Su un segnale già binaurale evita un secondo spatializer; se il titolo integra esplicitamente Windows Spatial Audio, segui invece quella combinazione documentata.
5. Ripeti una scena riconoscibile e torna agli stati iniziali per verificare il confronto. Per annullare il ramo No APO ripristina anche l'associazione nel Device Selector, quando rimossa, e riavvia se richiesto: ricaricare il profilo non la reinstalla.

La documentazione APO spiega che disabilitare tutti gli enhancement (miglioramenti audio) può escludere anche Equalizer APO [2]. È una distinzione essenziale per il successivo ramo EQ: spegnere gli effetti OEM superflui è diverso da spegnere il percorso che ospita il filtro voluto.

Nella prova 215729 con Sony Inzone H7, le medie passano da **103,521 ms base** a **108,790 con Loudness Equalisation**, **110,450 con virtualizzazione aggiunta** e **136,409 con bassi e spatial aggiunti** [5]. Sono combinazioni cumulative, non costi isolati dei singoli effetti. Non dimostrano una penalità fissa per qualsiasi enhancement e non misurano intelligibilità o sicurezza uditiva.

## Il mix del gioco viene prima della curva EQ

Il **mascheramento** avviene quando un suono rende un altro meno percepibile. Musica, esplosioni e voce possono competere con un passo nello spettro e nel tempo. L'EQ sull'uscita agisce su tutti quei suoni insieme: non sa quale sia il nemico e non separa passi e spari come tracce indipendenti.

Salva il profilo in-game e regola inizialmente il master per rendere tollerabile anche una scena intensa. Riduci o azzera la **musica non informativa** durante il confronto. Prima di eliminarla completamente identifica però countdown, obiettivi e avvisi che alcuni giochi instradano su quel canale. «Musica sempre a zero» non è una regola per ogni modalità. Controlla anche dialoghi e suoni d'interfaccia, che possono appartenere ad altre categorie.

La **gamma dinamica** è la differenza fra suoni deboli e forti. «Night mode», «Low Dynamic Range» e Loudness Equalisation possono ridurla, ma implementazioni e nomi variano. «Headphones» può selezionare solo routing o HRTF, non necessariamente un compressore. Compressione ed EQ sono processi diversi, e una modalità dinamica non è una correzione universale delle curve di uguale sensazione sonora.

Una dinamica ridotta può aiutare a volume prudente o in una stanza rumorosa; può anche rendere meno affidabile la distanza dedotta dal livello e modificare gli attacchi. Prova una modalità del gioco da sola, senza sommare subito un normalizzatore Windows. Mantieni la voce comprensibile riducendo il canale dominante, non alzando tutto.

Per verificare le direzioni usa un'area d'allenamento, replay o scena controllata quando disponibile. Confronta eventi noti davanti, dietro, ai lati, su piani e distanze diversi; poi aggiungi spari e voce. Se togliere la musica libera l'evento, hai isolato una competizione nel mix. Se night mode fa sembrare vicino un suono lontano, il compromesso non riguarda solo il volume. Se cambia fronte/retro con HRTF, non attribuirlo al DAC. Ripristina ogni opzione non convincente prima di provarne un'altra.

I due canali stereo possono già contenere indizi tridimensionali. L'etichetta «7.1» non certifica precisione; evita la doppia virtualizzazione sul segnale binaurale già prodotto dal gioco. Il supporto esplicito a Windows Spatial Audio è invece un percorso distinto, da seguire secondo il titolo.

## Driver supportato e routing minimo

Un cambio driver deve risolvere un errore, un'incompatibilità o una regressione riproducibile. Un dispositivo USB class-compliant può funzionare con il driver incluso in Windows; audio integrato e notebook possono richiedere il pacchetto OEM per jack, array microfonico o DSP. **Realtek non è sinonimo di lento.**

La procedura Microsoft sul generico High Definition Audio riguarda hardware compatibile [1]: non autorizza a forzarlo su USB, Intel SST o ogni interfaccia professionale. Conserva versione e installer precedente prima di un aggiornamento necessario. Se perdi una funzione, torna al pacchetto supportato; se il rollback del driver non è disponibile, segui la reinstallazione documentata dal produttore. Non rimuovere una suite indispensabile soltanto perché contiene un EQ disattivabile.

Per il solo ascolto, invia il gioco al dispositivo fisico senza un mixer virtuale non necessario. Se Voicemeeter, Sonar o un ponte serve allo streaming, scrivi invece **ingresso virtuale → backend → uscita fisica**, formato, buffer e monitoring. È un ramo legittimo con condizioni proprie, non un errore da cancellare automaticamente. Per annullarlo seleziona prima l'uscita fisica nelle app e nei ruoli Windows; disabilitare il virtuale mentre è ancora predefinito può lasciare silenzio.

Nella prova 215716, il percorso Voicemeeter WDM presenta medie **155,452 ms a 128**, **151,683 a 256** e **195,885 a 512 default**, contro **82,661 diretto** [5]. Il numero più piccolo non vince: la casella non descrive tutte le code. Il dato riguarda quel backend e quella catena, non ogni ASIO/KS o dispositivo.

Un periodo di N frame di campioni dura **N ÷ frequenza × 1000 ms**: a 48 kHz, 128/256/512 frame sono circa 2,67/5,33/10,67 ms. In stereo ogni frame contiene un campione per canale, quindi la durata non raddoppia. Non sono tempi input→suono, né buffer supportati garantiti.

### Opzioni di avvio e comandi legacy: conservare prima di togliere

Salva la stringa delle opzioni di avvio del gioco e gli eventuali file di configurazione. Rimuovi soltanto un'opzione non motivata, riavvia il titolo, ripeti la scena e torna al valore precedente se occorre. Non aggiungere una lista di comandi storici a un percorso moderno.

Il test 215811 riguarda CS2: **82,661 ms default**, **83,365 con `-nopreloadsounds`**, **136,168 con `-directsound`**. È distinto dall'app di confronto API. Le opzioni sono oggetti della prova, non istruzioni da aggiungere; disponibilità e comportamento possono cambiare.

La 215849 mostra **CS:GO** con `snd_mixahead 0.001` a **69,675 ms**, contro CS:GO default **82,023** e CS2 **82,661**. La modifica appartiene alla riga legacy; la trascrizione segnala audio deteriorato. Non è un test del comando in CS2, un parametro Windows o un guadagno trasferibile. Una latenza inferiore accompagnata da un segnale deteriorato non soddisfa l'obiettivo.

## LowAudioLatency: una prova facoltativa del periodo shared

Se il difetto rimasto è il ritardo, non il timbro, puoi considerare una prova separata del periodo audio. **LowAudioLatency di spddl non è necessario per Peace.** Il sorgente consultato usa `IAudioClient3` per leggere formato e periodi e mantenere uno stream shared con il periodo richiesto [3].

Senza argomenti sceglie l'uscita **`eRender/eConsole`** e l'ingresso **`eCapture/eCommunications`**. Sono i predefiniti di quei ruoli, non tutti gli endpoint e non necessariamente l'ingresso selezionato esplicitamente in Discord. Il ramo audio stampa Friendly Name e periodi; può uscire senza richiedere una riduzione. Un processo visibile non prova il successo di entrambi i rami.

### Prova manuale, esiti e arresti

1. Ottieni il tool solo dalle [release ufficiali](https://github.com/spddl/LowAudioLatency/releases), verifica provenienza e versione e conserva l'EXE in una cartella locale stabile. Il nome non certifica il binario. Non indebolire SmartScreen, antivirus o policy aziendali.
2. Prima della prova registra i ruoli in `mmsys.cpl`, gli endpoint usati dalle app e la stabilità della baseline, con gioco e voce.
3. Se scegli di provare, apri un terminale nella cartella e avvia `.\low_audio_latency.exe` senza argomenti. Leggi l'output anziché affidarti soltanto all'assenza di una finestra d'errore.
4. Annota **entrambi i Friendly Name**, sample rate e periodi default/min/max. Confrontali con i predefiniti previsti. Il tool mostra durate del periodo, non misure acustiche.
5. **«no change necessary, exit»** indica che quel ramo non richiede la riduzione automatica secondo il suo controllo. Non certifica il minimo end-to-end. Un ramo può uscire mentre l'altro mantiene lo stream.
6. Confronta **OFF/ON/OFF** nella stessa scena e durata, poi con comunicazione e carico abituale. Controlla click, dropout, consumi, riconnessione e risveglio dopo sospensione. Conserva la versione del tool e gli esiti.
7. Con errori di endpoint, inizializzazione o privilegi, fermati e salva il testo. Se compare crackling, chiudi il processo, verifica altre istanze e ripeti la baseline. Dopo riconnessione puoi dover riaprire le app o ripetere l'identificazione.

Il periodo fondamentale determina i multipli leciti; la richiesta deve rientrare fra minimo e massimo [1,3]. Il «336» del README non è un preset per ogni PC. Senza una misura fisica la conclusione è «periodo richiesto inferiore» o «stabile nella prova», non «latenza totale ridotta di X ms».

La FAQ Microsoft descrive il periodo condiviso dai client sullo **stesso endpoint e nella stessa modalità**. Non riduce tutti i buffer del gioco, ASIO, codec, radio o rete. Alla chiusura il motore segue i client rimasti e le impostazioni applicabili: non promettiamo un ritorno immediato e universale a 10 ms. Un altro client a bassa latenza può mantenere una richiesta diversa.

Il sorgente ha anche gestione CPU Set e privilegi condizionali. Non prova lo spostamento globale dell'audio dal Core 0 né una nuova affinità di gioco o `audiodg.exe`. Se una release non funziona senza privilegi ulteriori, non trasformare l'avvio in SYSTEM o Highest per nascondere il problema. Il periodo minimo dichiarato dal driver può non essere stabile sotto il tuo carico.

### Avvio automatico: solo dopo una prova convincente

Il [pack Audio v4 esistente](../discord-revisione-v5/pacchetti/PrimeBuild-Audio-v4.zip) è autonomo [4]. Non scarica né include l'EXE terzo. Per un eventuale uso verifica lo ZIP, estrailo interamente in una cartella nuova e apri `Avvia-PrimeBuild.bat` con doppio clic, **nel tuo utente** e senza credenziali di un altro account. Non aprire i PS1 interni.

Il menu mostra stato, creazione e rimozione dell'avvio. Il controllo comune richiede **Windows 11 client, build almeno 26200**: superarlo non certifica driver, tool o build future. Prima usa Stato: mostra soltanto la task Prime Build omonima del tuo utente, se presente. Controlla separatamente in Utilità di pianificazione gli altri avvii, in Gestione attività i processi e nella cartella Esecuzione automatica gli eventuali collegamenti; Stato non ne fornisce un inventario completo. La creazione apre il selettore di `low_audio_latency.exe`; annullarlo non crea nulla. Dopo una prova manuale stabile, seleziona il file locale e conferma **INSTALLA**. La selezione non autentica il contenuto del binario.

Il contratto dello script crea una task all'accesso del proprio utente interattivo, **RunLevel Limited**, senza password, SYSTEM, elevazione forzata o argomenti personalizzati. Non avvia immediatamente il tool. Una versione che richiede altri privilegi, un percorso spostato o una policy possono impedirne il funzionamento. Verifica al successivo accesso processo, endpoint e stabilità; «task creata» non prova «audio modificato».

Lo script rifiuta una task omonima esistente e un altro avvio che esegua direttamente lo stesso EXE, senza cancellarlo. Wrapper, cartella Esecuzione automatica e avvii indiretti possono sfuggire al riconoscimento: controllali manualmente. In Utilità di pianificazione confronta account, azione, percorso e argomenti. La task del pack usa nome `PrimeBuild-LowAudioLatency-<SID>` e descrizione v3 di compatibilità, pur essendo distribuita nel pack v4; non rinominarla per suggerire una release nuova.

Per annullare, confronta prima la task con i dati registrati: account, percorso locale dell'EXE, argomenti vuoti, accesso interattivo e livello Limited. Il riconoscimento dello script controlla nome, descrizione, utente e una singola azione col nome dell'EXE, ma non verifica tutti questi dettagli: se la task è stata alterata o non la riconosci, fermati. Altrimenti usa la rimozione del pack e conferma **RIMUOVI**, oppure disabilita/rimuovi solo la task identificata in Utilità di pianificazione. **Rimuovere l'avvio non termina il processo già aperto**: chiudilo separatamente, verifica le altre istanze e controlla che non riparta all'accesso successivo. Cancellare soltanto l'EXE lascia una task non funzionante. Non riutilizzare il vecchio `startup.bat` e non eliminare attività sconosciute per somiglianza del nome.

I BAT impiegano `ExecutionPolicy Bypass` soltanto nel processo PowerShell avviato; i criteri di gruppo (GPO) e le protezioni restano in vigore. I sorgenti non firmati richiedono ancora collaudo funzionale su PC autorizzato. Questa descrizione deriva da lettura statica, non da una task creata qui.

## Equalizer APO e Peace: dimostrare prima che il filtro raggiunga l'uscita

Se il problema rimasto è tonale, per esempio un rimbombo costante con fit stabile, cioè aderenza e posizione delle cuffie ripetibili, l'EQ è più pertinente di un periodo ridotto. **Equalizer APO** esegue filtri nel percorso effetti supportato; **Peace** è l'interfaccia che gestisce e scrive la configurazione, non un mixer virtuale aggiuntivo. L'elaborazione può continuare con la finestra Peace chiusa [2].

Il **Device Selector**, chiamato Configurator nelle versioni precedenti, associa APO agli endpoint. Il **Configuration Editor** modifica e analizza i filtri. Il dispositivo selezionato dal gioco è un terzo controllo. Devono riferirsi allo stesso percorso: aprire un profilo non significa averlo applicato all'uscita ascoltata.

### Preparazione e installazione sul solo dispositivo previsto

Conserva la baseline, lo stato degli enhancement, il profilo in-game e l'EQ esistente. La cartella è normalmente `C:\Program Files\EqualizerAPO\config`, salvo installazione diversa: copiala con un nome nuovo se contiene profili personali. Non importare un preset per provare se l'installazione funziona.

1. Ottieni Equalizer APO dal [progetto ufficiale](https://sourceforge.net/projects/equalizerapo/) nella versione compatibile e segui il suo installer. Nel **Device Selector/Configurator** scegli il solo endpoint di riproduzione realmente ascoltato, controllando nome e connessione contro `mmsys.cpl`. Non selezionare tutti gli output o il microfono se vuoi soltanto EQ cuffie.
2. Riavvia quando richiesto. Per questo ramo mantieni **attivo il percorso enhancement che ospita APO**: «Disabilita tutti i miglioramenti» deve normalmente essere deselezionato oppure «Abilita miglioramenti audio» attivo. Le etichette dipendono dal driver; non dedurre l'efficacia da una casella ambigua.
3. Spegni separatamente i trattamenti OEM opzionali che non servono, senza togliere funzioni indispensabili. La documentazione tratta «Use original APO» come troubleshooting specifico: disabilitarlo può comportare la perdita di funzioni del driver, non è un preset per ogni notebook.
4. Installa [Peace dal progetto ufficiale](https://sourceforge.net/projects/peace-equalizer-apo-extension/) dopo APO e usa la sua cartella di configurazione. Se il setup non trova APO, fermati; non sovrascrivere profili senza la copia. Apri i controlli completi quando devi gestire tipo e Q.
5. Prepara e salva **Riferimento-piatto**, senza filtri o boost. «Piatto» descrive il filtro, non la risposta acustica della cuffia. Verifica quale profilo è effettivamente applicato, non solo quello evidenziato nell'elenco.

### La prova di attenuazione richiede EQ ON

Prima salva preamp e stato ON/OFF. **Per questa prova attiva esplicitamente l'EQ**, verificando che Peace non mostri «Equalizer deactivated». Con un breve contenuto ripetibile a volume basso, **riduci temporaneamente il preamp di 10 dB rispetto al valore salvato** (per esempio, da 0 a −10 dB), applica e confronta col valore precedente senza cambiare il master. Se il controllo non consente una riduzione, fermati: non aumentare il valore per aggirare il limite. Il livello deve diminuire e tornare al valore precedente quando ripristini il preamp. Non usare un boost come test.

Ripeti nell'app realmente usata: un'attenuazione efficace nel browser non dimostra che il gioco attraversi lo stesso percorso. Al termine **ripristina il preamp e lo stato ON/OFF iniziali**, anche se erano OFF. Il successo dimostra attività del filtro, non latenza, calibrazione acustica o localizzazione.

Se non cambia nulla, controlla in ordine:

1. EQ ON e filtro/preamp abilitato;
2. endpoint effettivo dell'app e associazione nel Device Selector;
3. percorso enhancement attivo e riavvio richiesto;
4. modalità dell'app: exclusive, ASIO o raw possono bypassare APO;
5. istruzioni ufficiali di troubleshooting, mantenendo una sola modifica alla volta.

Non costruire la curva finché la prova non funziona. Non sostituire DLL, modificare sicurezza o selezionare tutte le modalità del Configurator per tentativi. Dopo aggiornamento driver o cambio porta verifica nuovamente l'associazione. Due cuffie analogiche collegate allo stesso DAC possono condividere l'endpoint: Windows vede l'uscita, non necessariamente il modello di cuffia. Seleziona il profilo corretto a livello basso prima dell'ascolto.

### Che cosa mostrano realmente le catture locali

Nella documentazione del progetto, **Peace 1.6.9.11 aveva l'EQ disattivato**. Il grafico è stato mostrato con la sola opzione visuale «Add pre amplifying», poi riportata allo stato precedente. Non è una prova di attenuazione eseguita o di suono equalizzato.

**Equalizer APO Editor 1.4.2 mostrava «APO not installed to device»** per il dispositivo selezionato; non è stata creata l'associazione elevata. Il pannello Analysis calcola la risposta dei filtri. Non misura cuffia, pressione sonora o latenza fisica; «Latency 0.0 ms» nell'Editor non significa zero end-to-end. La presenza di `Include: peace.txt` non prova da sola che l'uscita ascoltata fosse sottoposta all'elaborazione [6].

Il confronto di terzi 215706 mostra **82,661 ms senza EQ** e **85,052 con Equalizer APO/Peace Custom EQ**; «90% Worst» non aumenta nello stesso verso [5]. Filtri e versioni non sono documentati: non è un costo universale, né una garanzia per plugin o convoluzione.

## Filtri parametrici: tipo, frequenza, gain e Q

Un filtro parametrico completo richiede **tipo, frequenza, gain e parametro di larghezza**. La frequenza in Hz colloca l'intervento; il gain in dB indica aumento o riduzione; Q descrive la selettività. A parità degli altri parametri, un Q più alto rende un peaking più stretto.

| Tipo | Intervento | Controllo da non omettere |
|---|---|---|
| Peaking, PK/PEQ | Intorno alla frequenza centrale | Gain e Q, oltre alla frequenza |
| Low shelf | Soprattutto nella regione bassa | Variante del filtro e parametro di pendenza/larghezza |
| High shelf | Soprattutto nella regione alta | Variante e transizione, non un taglio netto |

Q e bandwidth in ottave non sono numeri intercambiabili; le varianti shelf possono usare parametri diversi. Segui il tipo nell'export e i controlli supportati dalla versione. «2» nel gain non significa «2» nel Q. Controlla anche stato abilitato e canali. Per la normale correzione tonale parti dai due canali insieme; non compensare una voce decentrata con due curve diverse prima di aver escluso fit, bilanciamento e collegamenti.

Salva il profilo con cuffia e obiettivo. Se vuoi inserire manualmente un filtro in Peace, seleziona il tipo previsto, frequenza in Hz, segno e valore del gain, Q o parametro richiesto; applica e confronta la curva. Le formule esatte e la sintassi sono nel riferimento APO raggiungibile dalla sua documentazione [2], non in una curva disegnata qualitativamente.

### Headroom: conta la risposta combinata

Il **preamp negativo** attenua prima dei filtri e crea headroom, margine prima del limite digitale. Un boost su un segnale già alto può superarlo e produrre **clipping**, taglio del segnale. Più filtri larghi sovrapposti possono superare il gain massimo di una sola banda; sommare indiscriminatamente tutti i gain non descrive però la curva, perché non agiscono sempre sulla stessa frequenza.

Apri il grafico complessivo Peace o Analysis nel Configuration Editor e verifica filtri inclusi, canali e preamp. Parti dal preamp dell'export. Se aggiungi filtri, distingui il massimo aumento dei **filtri combinati senza preamp** dalla curva **con il preamp già incluso**: nel primo caso serve un'attenuazione almeno pari a quell'aumento; nel secondo controlla il massimo netto e aggiungi solo il margine ancora necessario. Non compensare due volte lo stesso boost. In Peace «Add pre amplifying» cambia proprio questa visualizzazione. Nell'esempio **ipotetico** di filtri combinati senza preamp a +5,5 dB, un preamp −5,5 dB porta il massimo calcolato a 0 dB: è solo la compensazione teorica, alla quale aggiungere un ulteriore margine prudente, non una garanzia contro picchi temporali, DSP successivi o distorsione del trasduttore.

Il grafico è la risposta calcolata del filtro, non la risposta della cuffia né un misuratore di tutta la catena. Verifica a basso livello un passaggio intenso, senza provocare deliberatamente clipping. Un preamp corretto non rende innocuo un boost estremo nei bassi. Non togliere il margine per recuperare volume: attenua il riferimento più forte o regola prudentemente il controllo finale, rispettando il livello tollerabile anche per spari ed esplosioni.

## Due strategie EQ, senza preset ricostruiti

### Strategia manuale: un difetto e un piccolo intervento

L'idea valida della strategia manuale originale è usare pochi interventi controllati. Le frequenze **333 Hz, 2 e 4 kHz**, con gain predefiniti e preamp −4 dB, non specificavano tipo e Q: non definivano una curva riproducibile né headroom garantito. Non vengono quindi trasformate in un preset [6].

Anche le fasce «corpo», «riconoscimento» e «attacco dei passi» della vecchia guida sono descrizioni orientative, non bande universali. Superficie, campione, distanza e motore cambiano lo spettro; gli spari condividono parte dell'informazione. Non esiste un filtro di sistema che amplifichi soltanto il passo dell'avversario.

Duplica Riferimento-piatto e scrivi il problema, per esempio «il rimbombo delle esplosioni copre il movimento». Per un eccesso esteso valuta una riduzione larga o uno shelf; per un difetto circoscritto un peaking moderato. Registra tipo, frequenza, gain e Q e fai **un solo piccolo tentativo**, anche di 0,5–1 dB: è la dimensione della variazione, non un boost obbligatorio.

Controlla headroom e livello comparabile, poi ascolta passo e sparo nella stessa scena. Se togli rimbombo ma perdi indizi di distanza, non hai ancora raggiunto l'obiettivo. Se guadagni solo brillantezza e fatica, non chiamarlo imaging migliore, cioè maggiore capacità di distinguere le posizioni nel segnale riprodotto. Disabilita il filtro o ricarica il riferimento prima di provare un'altra regione. Aggiungi un secondo intervento solo dopo aver conservato e verificato il primo.

### AutoEq: modello esatto, misura e target

AutoEq genera impostazioni da una misura della cuffia e un target scelto; non aggiunge da solo un programma di elaborazione in tempo reale [7]. Può fornire una base tonale coerente, ma non permette di sfruttare qualunque cuffia «al 100%». Fit, anatomia, differenze fra unità e limiti del trasduttore restano.

1. Identifica **modello esatto, revisione e pad/inserti** quando pertinenti. Cerca quel modello su [autoeq.app](https://autoeq.app/) e controlla fonte della misura e target. Se manca, non sostituirlo con un nome simile.
2. Scegli un export parametrico compatibile con Equalizer APO/Peace. Conserva il testo originale, modello, fonte, target e data. Un export per un EQ grafico diverso non è equivalente.
3. Duplica il riferimento e importa con la funzione della versione utilizzata, oppure inserisci manualmente ogni filtro. Confronta numero, stato, tipo, frequenza, gain con segno corretto e Q/parametro richiesto contro l'export.
4. Applica il preamp indicato e verifica che non sia stato omesso o duplicato. Controlla risposta complessiva e canali prima di ascoltare.
5. Non caricare contemporaneamente la stessa correzione come parametrico e convoluzione. Non reimportare filtri in Peace se sono già inclusi altrove nel file APO.
6. Salva il profilo e confronta a pari volume col riferimento. Se non corrisponde all'export, correggi la configurazione prima di aggiungere ritocchi personali; se peggiora all'ascolto, torna al profilo precedente.

Una curva grezza su simulatore d'orecchio non deve essere piatta; una compensata esprime lo scarto dal target. Laboratorio, apparato di misura (rig), unità e posizionamento cambiano la trasferibilità. Con le IEM l'inserimento può spostare picchi stretti negli alti: non ricavarne notch estremi o grandi boost per colmare ogni avvallamento. La [guida cuffie e DAC](08-audio-cuffie-dac.md) approfondisce i criteri hardware; qui basta sapere che la misura del modello non è la misura del tuo orecchio.

Controlla bassi, voce, sibilanza e fatica, poi fronte/retro e distanza. Se una regione peggiora, conserva una copia e riduci o disabilita l'intervento interessato, anziché cambiare tutti i filtri. Non alzare il livello per rendere gradevole una correzione aggressiva.

Se serve una rifinitura del gioco, salva facoltativamente **AutoEq-gioco** accanto ad **AutoEq** e **Riferimento-piatto**. Non sommare automaticamente strategia manuale e AutoEq: un solo ritocco verificato, poi ricalcolo del margine completo. Mantieni fissi EQ in-game, software OEM e DSP del DAC, oppure documenta esattamente che cosa rimane attivo.

Natural/Smooth/Crisp nel grafico 215832 sono preset **interni a CS2**, con EPZ G30: medie **82,503/84,332/82,572 ms**, con «90% Worst» e Maximum separati [5]. Non sono APO ON/OFF o curve AutoEq. La spiegazione dell'autore su un outlier di Smooth non è verificabile senza campioni grezzi; il massimo non è il ritardo tipico. Scegli il timbro e verifica il compromesso, non il preset dal solo decimale della media.

## Confrontare a pari volume senza perdere la protezione

Per il timbro lascia APO installato sullo stesso endpoint e alterna profilo piatto e corretto: cambia la curva, non l'installazione. Per studiare il costo del percorso occorre un esperimento separato **No APO/APO**, con associazione e riavvii documentati. Non trattare i due riferimenti come intercambiabili.

Un profilo col preamp negativo può suonare meno forte. Prepara quindi un riferimento di confronto distinto da quello originale e **attenua il più forte** fino a un livello percepito simile. Non rimuovere il preamp necessario dall'EQ. Pareggiare la percentuale Windows o i picchi del grafico non pareggia necessariamente la percezione. Il confronto a orecchio è approssimativo, non un'equivalenza calibrata del livello di pressione sonora in dB SPL.

Mantieni fit, routing e scena. Fai riprodurre eventi da direzioni e distanze note, superfici e piani diversi, prima isolati e poi insieme a spari o voce. Se possibile chiedi a qualcuno di variare la posizione senza anticipartela e dichiara la direzione prima di controllare: è più utile che ascoltare sapendo già la risposta.

Alterna **A/B/A**, ripeti dopo una pausa e annota errori fronte/retro, distanza, picchi fastidiosi e fatica. Un passo più evidente con più errori di distanza è un compromesso, non una vittoria. Se il vantaggio non si ripete, torna ad A senza accumulare filtri. La prova è percettiva: non misura latenza né costituisce automaticamente un esperimento statistico controllato.

Fai pause e interrompi con dolore, ovattamento o acufeni. Per sintomi persistenti consulta un professionista. Non usare sweep forti e non assegnare un livello sicuro universale alla percentuale del mixer. I principi generali di [ascolto sicuro WHO](https://www.who.int/news-room/questions-and-answers/item/deafness-and-hearing-loss-safe-listening) sono un approfondimento esterno, non una calibrazione o una visita inclusa nella guida.

## Microfono, Discord e ritorno della voce

La voce va configurata su una riga separata dalla riproduzione del gioco. In **Impostazioni → Privacy e sicurezza → Microfono** verifica accesso e permessi, incluse le app desktop dove previsto. In **Sistema → Audio → Ingresso** usa misuratore e test disponibili. Prima del software regola distanza, orientamento e gain hardware: una voce già saturata non viene riparata dalla soppressione del rumore.

In **Discord → Impostazioni utente → Voce e video** scegli ingresso e uscita espliciti e prova il microfono. Con una frase ripetibile e un ascoltatore, confronta soppressione del rumore, cancellazione dell'eco, sensibilità e controllo automatico del gain **uno alla volta**. Una soglia alta può tagliare le prime sillabe; una troppo bassa trasmette stanza e tastiera. Con altoparlanti l'eco può richiedere cancellazione; con cuffie e stanza quieta può servire meno trattamento. Non spegnere tutto come preset e non assegnare un costo fisso in ms a ogni filtro.

Regola la voce ricevuta nel livello d'uscita Discord o sul singolo interlocutore. Verifica una frase mentre il gioco riproduce la scena abituale. Se la voce copre i passi, riduci quel canale; se non si comprende, controlla la sorgente e il mix prima di alzare tutto. Per problemi della tua trasmissione correggi posizione e soglia prima di aggiungere gain o soppressione.

### Ducking e monitoring sono due controlli diversi

Il **ducking** attenua altre sorgenti quando qualcuno parla. Può liberare la voce oppure abbassare un passo proprio durante una chiamata. Possono agire separatamente attenuazione Discord, **`mmsys.cpl → Comunicazioni`** e ducking del gioco.

Salva gli stati, fai pronunciare una frase e confronta il livello del gioco durante e dopo. Cambia un controllo alla volta. Per un mix costante puoi provare **Non intervenire** in Windows e poi, separatamente, attenuazione nulla in Discord dove disponibile. Per dare priorità alla voce mantieni l'effetto utile senza sommare attenuazioni inattese. Se perdi intelligibilità, ripristina i valori registrati. Questo modifica i livelli, non il periodo audio.

Controlla infine il ritorno della tua voce. «Ascolta il dispositivo» di Windows, monitoring in OBS, test Discord e **direct monitoring hardware** attraversano percorsi differenti. Se sono attivi insieme puoi sentire copie sfasate o eco: mantieni un solo ritorno necessario e disabilita quello aggiunto per ultimo durante la prova. Sentirti immediatamente nel ritorno hardware non certifica il tempo impiegato dalla voce per arrivare al compagno.

La voce remota attraversa capture, DSP, codec, pacchettizzazione, rete, jitter buffer e riproduzione sull'altro PC. Roundtrip della scheda, tempo di andata e ritorno della comunicazione di rete (RTT) e conversazione completa non sono la stessa metrica. LowAudioLatency può riguardare il capture predefinito di comunicazione, non promette lo stesso guadagno sulla voce Internet. Non associare per errore l'EQ cuffie al microfono: un filtro voce ha obiettivo e confronto separati. La [guida Discord Voce e video](https://support.discord.com/hc/en-us/articles/360045138471-Discord-Voice-and-Video-Troubleshooting-Guide) è un riferimento esterno per interfaccia e troubleshooting, non una UI collaudata qui.

## Rollback: profilo, associazione e avvio non si annullano nello stesso modo

Ritornare indietro significa ripristinare **la modifica fatta**, non cancellare tutto l'audio. Un profilo precedente annulla filtri e preamp; uno stato OFF esclude l'EQ secondo il percorso verificato; la rimozione nel Device Selector cambia l'associazione dell'APO; togliere una task impedisce un avvio futuro, non termina quello corrente.

| Sintomo | Prima verifica | Ritorno minimo e controllo successivo |
|---|---|---|
| Nessun suono | Mute, master, endpoint app, collegamento, app exclusive | Uscita e routing precedenti; riaprire le app e usare il test a livello basso |
| Microfono assente | Mute fisico, permessi, ingresso app e ruolo comunicazioni | Ingresso noto e stati registrati; prova con una frase |
| EQ non reagisce | ON/OFF, filtri abilitati, endpoint, enhancement, riavvio e bypass app | Non costruire altri filtri; profilo precedente, oppure rimozione della sola associazione APO con riavvio |
| Distorsione dopo EQ | Risposta combinata, boost, preamp, gain e altri DSP | Profilo precedente a livello basso; non compensare con più boost |
| Click dopo periodo ridotto | Processo LowAudioLatency, istanze e altri client | Chiudere il tool, ripetere la baseline; rimuovere anche l'avvio se creato |
| Eco o voce doppia | Ritorni hardware, Windows, OBS e app | Un solo ritorno verificato oppure nessuno |
| Ritardo solo nel mixer virtuale | Percorso diretto/virtuale, formato e scena | Selezionare il fisico nelle app prima di disabilitare il virtuale |
| Perdita di funzione dopo driver | Versione, pacchetto OEM e funzione dipendente | Rollback disponibile o installer supportato conservato; verificare riproduzione, jack e voce |

Per tornare da EQ a No APO, conserva i file e togli l'associazione dal **solo endpoint** nel Device Selector, riavviando quando richiesto; rimetti gli effetti iniziali. Per tornare da No APO all'EQ precedente, ristabilisci l'associazione, riavvia e ricarica filtri, preamp e stato ON/OFF registrati. **Chiudere Peace non rimuove APO**. Un'eventuale disinstallazione completa va eseguita soltanto dopo aver salvato i profili e seguendo l'uninstaller della release, non cancellando cartelle a mano.

Ripeti prima gioco da solo, poi Discord e poi eventuale streaming, aggiungendo un programma alla volta. Controlla livelli, riproduzione, cattura, sospensione e riconnessione. Con click persistenti nella baseline, [driver e LatencyMon](03-driver-latencymon.md) offrono un percorso di diagnosi: LatencyMon osserva tempi ISR/DPC (routine di servizio delle interruzioni e chiamate di procedura differite) e altri segnali del sistema, **non input→suono**. Un nome driver o un verdetto rosso non provano da soli la causa. Non applicare affinità globali o riduzioni indefinite di buffer.

Il registro minimo conserva build Windows e gioco, driver, endpoint fisici/virtuali, porta, ruoli, formato, API se nota, enhancement, profilo/preamp, ON/OFF, associazione APO, versione del tool, scena e sintomo. Scrivi A, B e ritorno ad A. Se manca la misura fisica, dichiara «stabile nella prova» o «periodo richiesto inferiore», non «latenza totale dimezzata».

## Fonti e stato della verifica

Le fonti primarie disponibili sono state lette nelle copie locali; i programmi descritti non sono stati avviati. I collegamenti esterni indirizzano al responsabile del progetto; non sono un nuovo controllo HTTP o una certificazione delle release correnti.

1. Microsoft, [Low Latency Audio](https://learn.microsoft.com/en-us/windows-hardware/drivers/audio/low-latency-audio), copia integrale `analisi/ms-audio.txt`: stack, shared/exclusive, API, periodo, driver e compromessi.
2. Equalizer APO, [Documentation](https://sourceforge.net/p/equalizerapo/wiki/Documentation/), copia integrale `analisi/eqapo.txt`: installazione, configurazione e troubleshooting. I suggerimenti storici su DLL non sono adottati come procedura per principianti.
3. spddl, [LowAudioLatency](https://github.com/spddl/LowAudioLatency), [main.rs](https://github.com/spddl/LowAudioLatency/blob/master/src/main.rs) e [sound.rs](https://github.com/spddl/LowAudioLatency/blob/master/src/sound.rs). Copie integrali `fonti/documentazione-script/lal-readme.txt`, `lal-source.txt`, `lal-sound.txt`: ruoli default, stream mantenuto e rami condizionali. Il sorgente non autentica il binario scaricato dal lettore.
4. Prime Build, [README dei pack](../discord-revisione-v5/scripts/README.md), `PrimeBuild-LowAudioLatency-Startup.ps1`, helper comune e launcher v4, letti in sola lettura. Nessuna task creata e nessuna prova UAC o picker effettuata.
5. CS2 Kitchen, [You are using the WRONG Audio Settings](https://www.youtube.com/watch?v=P-3Os4btIg4), 5 ottobre 2026. Letti transcript tradotto, sorgente audio e `analisi/INVENTARIO-FIGURE-FORNITE-V3.md`. Il video non è stato riprodotto durante questa stesura. Numeri di terzi, condizioni incomplete, non misure Prime Build.
6. Prime Build, `fonti/prime-build-audio-setup-guide.html`, fonti audio storiche e [registro delle acquisizioni](../analisi/REVISIONE-TEMATICA.md), con `analisi/fonti-v3/FIGURE-AGGIUNTE.json`. Curve incomplete, stato OFF e mancata associazione endpoint conservati, non convertiti in preset o prove acustiche.
7. Jaakko Pasanen, [AutoEq README](https://github.com/jaakkopasanen/AutoEq), copia integrale `analisi/autoeq.txt`: generazione di impostazioni, misure e target. Nessun profilo specifico esportato o applicato qui.

WHO e Discord sono approfondimenti esterni già pertinenti alla base; le loro pagine non sono state consultate nuovamente in questa passata. Il dettaglio aggiornato delle UI e le compatibilità vanno verificati durante l'eventuale prova autorizzata.

Nei sedici grafici audio firmati, il template dichiara **100 campioni per condizione**, Teensy 4.1/8000 Hz, RTX 5070 Ti, Ryzen 9800X3D, 32 GB 6000 CL30 e monitor Zowie 400 Hz. La trascrizione descrive Arduino Leonardo e sensore sonoro: la differenza resta irrisolta, il monitor non è il sensore audio. Le etichette CS2/CS:GO delle singole prove non vengono sostituite dalla traduzione. Average, «90% Worst» e Maximum restano statistiche distinte. Il grafico blu ha provenienza non definitivamente riscontrata.

Nessuna cattura locale certifica l'elaborazione effettiva del segnale, la curva della cuffia o zero latenza end-to-end. Restano collaudi reali, campioni grezzi e compatibilità; i precedenti test di script o PDF non validano queste istruzioni sul PC del lettore. Non sono state incorporate immagini e i diritti di riuso delle figure preesistenti non vengono considerati risolti.
