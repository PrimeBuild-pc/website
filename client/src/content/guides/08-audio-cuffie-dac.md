# Cuffie, IEM e DAC: scegliere la catena sonora in base al problema

Un passo può arrivare presto ed essere difficile da localizzare; può essere riconoscibile ma coperto dalla voce; può sembrare più evidente soltanto perché hai alzato il volume. Tempestività, leggibilità e comfort non sono la stessa qualità. Prima di comprare una cuffia o cambiare uscita, identifica che cosa non funziona: rumore, tenuta, direzioni confuse, picchi fastidiosi, interruzioni oppure ritardo.

Questa guida costruisce il percorso dalla sorgente all'orecchio e spiega dove cuffie, IEM, DAC e collegamenti possono essere utili. Include i concetti necessari per leggere API e buffer senza trasformarli in ricette Windows. Si rivolge a sistemi Windows 11 25H2/26H2, ma non certifica future build o dispositivi. Durante la redazione non sono state eseguite prove sonore, installazioni o misure hardware; i numeri citati appartengono alle fonti, non al PC del lettore.

## Prima domanda: dove comincia e finisce il suono che misuri?

Un possibile percorso è **input → stato del gioco → evento sonoro → mixer del motore → API e buffer → motore audio Windows ed effetti → driver → dispositivo → cuffie**. Un'API è l'interfaccia con cui il programma chiede di riprodurre o acquisire audio; un buffer conserva campioni in attesa di essere elaborati. Il DSP, Digital Signal Processing, elabora il segnale, per esempio con equalizzazione, compressione o spazializzazione.

Non tutti i giochi attraversano gli stessi componenti, e alcuni lavori si sovrappongono. Lo schema serve a riconoscere un percorso, non a sommare massimi o numeri presi da applicazioni differenti.

Microsoft distingue render, capture e roundtrip latency [1]. Per interpretare un confronto, esplicita sempre i due estremi:

| Grandezza | Inizio e fine | Che cosa non dimostra da sola |
|---|---|---|
| Input→suono, o click-to-sound | Trigger scelto → suono fisico rilevato | Ritardo della sola cuffia; un trigger sintetico può escludere switch e firmware del mouse |
| Render latency | Buffer consegnato alle API di riproduzione → suono ascoltabile | Attesa precedente del motore del gioco |
| Capture latency | Suono acquisito dal microfono → dati disponibili all'app | Tempo della conversazione Internet completa |
| Roundtrip audio | Acquisizione → elaborazione applicativa → riproduzione nel percorso dichiarato | Ping di rete o latenza dello sparo del gioco |

Un loopback software può restare prima del DAC e del trasduttore; un loopback fisico attraversa anche la cattura usata per rilevare il segnale. Un test acustico include posizione e comportamento del sensore: distanza dal trasduttore, livello e soglia di rilevazione possono cambiare quando viene riconosciuto l'inizio del suono. Un evento attenuato dall'equalizzazione (EQ) potrebbe superare la soglia più tardi senza che sia cambiato il periodo audio. Per confrontare catene conserva geometria, livello e criterio di rilevazione e documenta la calibrazione, oltre a formato, punti iniziale/finale e apparato. La sensazione di maggiore chiarezza non misura millisecondi.

### Evento locale ed evento remoto

Il proprio sparo può essere generato sul client prima della conferma remota. Un evento dell'avversario può dipendere da dati del server, aggiornamenti e ricostruzione dello stato. Se il problema riguarda soltanto suoni remoti, una nuova cuffia non corregge il percorso di rete.

Nel dataset audio di CS2 Kitchen, il confronto 215519 riporta medie **82,661 ms client**, **122,968 ms server a ping 0**, **186,341 ms a ping 55** e **247,931 ms a ping 115** [2]. Il caso server a ping zero è già diverso dal locale: non è lecito usare «82 ms più ping» come formula per tutti gli eventi. RTT, cioè tempo di andata e ritorno della comunicazione, e input→suono non sono intercambiabili.

Una prova pratica comincia quindi da un evento locale ripetibile. Confrontalo poi con un evento remoto noto senza cambiare uscita o effetti. Se il ritardo compare solo nel secondo, registra anche server e condizioni della rete; la [guida rete](10-rete-domestica.md) sviluppa quel ramo. Se anche il locale si interrompe o tarda, continua con la catena di riproduzione.

## La cuffia va adattata prima di equalizzarla

Il **fit** è il modo in cui il trasduttore si appoggia all'orecchio o vi si inserisce. Non è soltanto comodità: tenuta e posizione cambiano ciò che ascolti. Un EQ calcolato su un fit diverso può correggere il problema sbagliato.

Con una over-ear controlla spazio per il padiglione, pressione dell'archetto, serraggio, peso e calore durante una sessione normale. Occhiali, capelli e cuscinetti usurati possono rompere la tenuta, soprattutto nei bassi. Togli e rimetti la cuffia e muovila appena: se il bilanciamento cambia molto, stabilizza posizione e cuscinetti prima di fissare una curva. Sostituire i cuscinetti (pad) con un tipo diverso può essere anche un cambiamento acustico, non una manutenzione neutra.

### Aperta o chiusa: partire dalla stanza

Una cuffia aperta lascia entrare ventole, conversazioni e rumori esterni, e lascia uscire parte del contenuto ascoltato. Può essere comoda e dare un'impressione ariosa; non garantisce però una migliore precisione di posizione. Una chiusa può attenuare l'ambiente e limitare la dispersione, con efficacia dipendente da modello e tenuta.

In una stanza rumorosa l'isolamento può rendere udibili eventi che cercheresti altrimenti di recuperare alzando il volume. In una stanza quieta puoi privilegiare comfort e preferenza di ascolto. Non scegliere «open per gli FPS» se poi devi sovrastare l'ambiente; non isolarti però quando devi restare consapevole di segnali esterni per la sicurezza. Il criterio non è una categoria commerciale, ma una sessione tollerabile nel luogo reale d'uso.

### IEM: inserti, tenuta e igiene

Le **IEM**, in-ear monitor, sono auricolari inseriti nel condotto uditivo. Possono offrire isolamento con poco peso sulla testa, ma richiedono inserti adatti a ciascun orecchio. Misura, silicone o schiuma, profondità e posizione cambiano tenuta e risposta, anche negli alti.

Inseriscile secondo il manuale, senza forzare. Verifica che il basso non scompaia muovendo la mandibola e che il cavo non trasferisca troppo rumore da sfregamento. Dolore, pressione fastidiosa o una tenuta che cambia continuamente non sono difetti da correggere con un boost. Pulisci inserti e griglie come previsto dal produttore e non condividere inserti usati.

L'isolamento non rende l'IEM intrinsecamente più rapida di una cuffia cablata. La forma del trasduttore non misura il ritardo di driver, radio o buffer. Se cambi cuscinetti o inserti, rifai il confronto e conserva quelli precedenti per annullare la modifica.

## Timbro, imaging e scena sono criteri distinti

Il **timbro** è il bilanciamento di bassi, medi e alti. L'**imaging** è la capacità di distinguere posizioni nel segnale riprodotto; la **scena sonora** è l'impressione di estensione. Una scena ampia può risultare piacevole senza migliorare fronte/retro o distanza.

Un profilo «a V» enfatizza bassi e alti rispetto ai medi. Un basso dominante può mascherare dettagli, ma «gaming», «studio», «analitica» e «mid-forward» non sono specifiche che prevedono da sole il risultato. Passi e spari possono condividere regioni spettrali: più brillantezza può renderli entrambi aggressivi. Non esiste una banda dei passi valida per ogni superficie, motore e distanza.

Una correzione tonale moderata non è un uso «contro natura» del driver, come suggeriva una fonte precedente. Può essere utile nei limiti del trasduttore. Non ricostruisce però un evento assente dal mix né garantisce che la **HRTF** del gioco, il trattamento che simula gli indizi direzionali per le due orecchie, corrisponda alla tua anatomia. Se fronte e retro restano confusi, verifica quel percorso prima di acquistare un DAC.

### Leggere una risposta in frequenza

L'asse orizzontale di un grafico mostra la frequenza, generalmente in scala logaritmica; quello verticale mostra un livello in dB. Una risposta grezza rilevata su un simulatore d'orecchio **non deve essere una retta**: il sistema di misura e l'accoppiamento hanno una risposta propria. Una curva compensata mostra invece lo scarto da un **target**, dove lo zero significa aderenza a quel riferimento, non neutralità assoluta.

Prima di confrontare linee controlla modello, revisione, cuscinetti o inserti, laboratorio, apparato di misura (rig) e target. Differenze fra unità, posizionamento e anatomia limitano la trasferibilità. Picchi stretti negli alti delle IEM possono spostarsi con l'inserimento. Un grafico regolare non certifica comfort, distorsione, bilanciamento fra canali o localizzazione.

Non colmare ogni avvallamento con un boost: può dipendere dall'accoppiamento e non essere correggibile utilmente. AutoEq genera impostazioni da misure e target, ma non applica da solo l'elaborazione e non risolve tutte queste differenze [3]. La [guida Windows ed EQ](09-audio-windows-eq.md) spiega importazione e verifica senza ricostruire preset da curve incomplete.

### Una prova d'ascolto utile prima dell'acquisto

1. Usa la cuffia attuale su un'uscita nota, a livello basso, con effetti e gain annotati. Il gain è il guadagno dello stadio d'uscita, non un obbligo di ascoltare forte.
2. Ascolta una voce mono e controlla che il centro sia stabile. Se si sposta, controlla fit, bilanciamento, connettori e canali prima dell'EQ.
3. Scegli una scena del gioco con eventi da posizioni note; includi fronte/retro, lati, distanze e piani diversi. Ripeti dopo aver tolto e rimesso la cuffia.
4. Valuta anche una scena intensa con spari e voce. Un passo più evidente insieme a picchi intollerabili non è un miglioramento completo.
5. Se confronti due modelli, mantieni invariati routing ed effetti e cerca un volume percepito simile, senza spingere quello meno sensibile. Annota comfort e fatica, non solo l'impressione iniziale.
6. Se un cambio di pad, inserto o profilo peggiora, torna alla configurazione registrata e ripeti A. Non accumulare correzioni per compensare una tenuta instabile.

Il pareggiamento a orecchio è approssimativo, non una misura calibrata del livello di pressione sonora in dB SPL. Interrompi in presenza di dolore, ovattamento o acufeni; per sintomi persistenti rivolgiti a un professionista. Non usare toni o sweep forti per «calibrare» l'udito e non dedurre sicurezza dalla percentuale Windows.

## Cavo, radio proprietaria e Bluetooth

Per un riferimento semplice, quando possibile usa cuffia cablata e uscita fisica diretta. Non significa latenza zero: elimina una variabile radio e rende più facile ricostruire il percorso. Un dongle proprietario può essere un compromesso valido se il cavo intralcia; «2,4 GHz» indica la banda, non un tempo garantito. Bluetooth dipende da codec, firmware, sistema e profilo di comunicazione.

La sincronizzazione labiale di un film può ritardare il video per allinearlo al suono. Non anticipa un'azione imprevedibile del giocatore. Anche una riproduzione ben sincronizzata non prova quindi bassa latenza interattiva.

Nel confronto 215609, le medie sono **82,661 ms cablato**, **103,521 ms Sony Inzone H7 a 2,4 GHz** e **401,993 ms auricolari OnePlus Bluetooth** [2]. Non sono tre modalità della stessa cuffia: cambiano trasduttore, elettronica e protocollo. Il dato motiva la scelta di un riferimento cablato, non una penalità universale per ogni radio o codec.

Per verificare un wireless:

1. Registra endpoint, profilo e collegamento realmente attivo; il solo filo presente potrebbe non significare audio via cavo.
2. Ripeti la stessa scena prima senza microfono, poi con comunicazione duplex. Controlla qualità, interruzioni e nomi degli endpoint.
3. In alcune configurazioni la chiamata cambia profilo o formato: non estendere il comportamento a tutti i Bluetooth attuali.
4. Se il difetto compare solo in chiamata, prova il percorso precedente o un microfono separato mantenendo l'uscita. Se compare anche cablato, indaga routing e gioco.
5. Ripristina la configurazione iniziale dopo il confronto. La prova può isolare una condizione; senza trigger e sensore non misura millisecondi.

## USB e jack analogico: cercare il sintomo giusto

USB trasporta dati digitali verso un dispositivo che li converte. Un jack da 3,5 mm trasporta un segnale analogico già convertito. Su USB controlli cavo, disconnessioni e compatibilità; sul jack devi considerare anche rumore, contatto e qualità del percorso analogico.

Con un DAC USB che si disconnette, annota porta e modello, poi prova un cavo integro o un'altra porta, **una variabile alla volta**, mantenendo driver e firmware. Se non cambia nulla, torna alla porta iniziale. Un collegamento frontale non è automaticamente più lento; un hub non è automaticamente colpevole.

Nel confronto 215622, il dispositivo AB13X misura **82,661 ms sulla porta frontale** e **82,322 ms sulla posteriore**; la statistica «90% Worst» va nel verso opposto, 87,783 contro 88,586 ms [2]. Senza intervalli di confidenza, il piccolo scarto non sostiene una graduatoria delle prese o dei controller. È un confronto USB, non una misura del jack analogico.

Sul jack frontale, il cavo interno può essere esposto a interferenze. Se senti un ronzio o fruscio, confronta il posteriore a pari livello. Se il rumore sparisce, hai un indizio sulla qualità del percorso analogico, non millisecondi risparmiati. Un click intermittente, un fruscio continuo e un ritardo sono sintomi distinti.

Il grafico 215641 presenta due righe EPZ G20, con medie **82,780 e 82,475 ms**: solo la prima specifica «3.5mm Back». L'associazione front/back viene dal contesto narrato, non dall'etichetta completa della seconda riga. Non trasformare una raccomandazione contro interferenze in una promessa di latenza o in una misura di rumore elettrico.

Un adattatore USB-A/USB-C deve supportare dati, non soltanto alimentazione. Per un collegamento analogico da USB-C verifica che l'adattatore includa il DAC compatibile: uno passivo richiede supporto specifico dell'host e non è equivalente. Il connettore da solo non garantisce uscita, ingresso microfono o formato.

Dopo un cambio di porta verifica nuovamente il dispositivo nelle app e, se usi Equalizer APO, nell'associazione dell'endpoint: Windows può esporre un'uscita differente. Non cancellare controller USB per risolvere una selezione di uscita. La [guida input/USB](07-input-usb.md) distingue inventario e topologia senza proporre tuning globale.

### 26H2 e USB Audio Class 1.0

Windows 11 26H2 aggiunge un controllo di compatibilità da fare prima di aggiornare, non una regola per scegliere un DAC. Microsoft documenta che alcuni dispositivi **USB Audio Class 1.0** possono mostrare errore **Code 10** o nessuna uscita audio dopo il passaggio a 26H2 o gli aggiornamenti di settembre 2026; il problema è stato mitigato, non necessariamente risolto per ogni combinazione [5].

Se il tuo DAC o la scheda audio USB è dichiarata UAC 1.0, annota classe, driver e stato attuale, verifica il dispositivo dopo l'aggiornamento e tieni pronto il percorso di rollback. Non è una prova che UAC 1.0 sia più lento di UAC 2.0: è un problema di compatibilità e installazione. Un dispositivo che continua a funzionare non acquisisce automaticamente un vantaggio di latenza; uno che scompare dal sistema non è un candidato per un confronto audio.

## Uscite del monitor e presa cuffie del microfono

Un **endpoint** è un ingresso o un'uscita logica presentata a Windows. Lo stesso hardware può esporne più di uno. HDMI e DisplayPort portano audio dalla GPU al display; la presa cuffie del monitor dipende poi dal suo trattamento interno. Un dock o un ponte USB può aggiungere un percorso proprio. La presa più vicina non è necessariamente la più diretta.

La presa cuffie di un microfono USB può riprodurre il PC e offrire **direct monitoring**, ascolto locale della voce prima del percorso applicativo. Sentirti subito non dimostra la stessa velocità del gioco o della voce ricevuta dall'interlocutore. Consulta il manuale per distinguere i due segnali.

Nel confronto 215745, le medie **Direct 82,661**, **NVIDIA High Definition Audio 88,301**, **Shure MV7+ 87,643** e **Realtek Line Out 82,780 ms** descrivono catene complete [2]. La narrazione identifica NVIDIA come HDMI/monitor; il grafico non specifica modello e impostazioni del display. Non misurano il solo chip DAC, il roundtrip del microfono o ogni uscita HDMI/DP.

Prima di scegliere queste prese per comodità, verifica formato, uscita dell'app e livello. Non attivare insieme «Ascolta il dispositivo» di Windows, monitoring in OBS e ritorno hardware: puoi ottenere eco o due copie sfasate della tua voce. Per annullare una prova, reimposta l'uscita iniziale nelle app prima di scollegare o disabilitare il dispositivo aggiunto.

## DAC e amplificatore: acquistare per un limite identificato

Un **DAC**, Digital-to-Analog Converter, trasforma campioni digitali in tensione analogica. Lo stadio d'uscita fornisce tensione e corrente adatte al carico. Queste funzioni esistono già in schede madri, dongle, cuffie USB e sistemi wireless. Un'interfaccia audio può aggiungere conversione analogico-digitale, ingressi microfonici e monitoring: usarla per un microfono XLR è un'esigenza diversa dall'ascolto del gioco.

Se la sorgente attuale è stabile, silenziosa al normale livello e sufficiente anche dopo l'attenuazione dell'EQ, non c'è un limite evidente da risolvere con un nuovo DAC. Non è però corretto dichiarare che l'hardware non possa mai influire sulla latenza: driver, firmware, buffer e DSP del dispositivo possono differire.

### Impedenza e sensibilità: gli ohm non bastano

L'**impedenza** è il carico elettrico, spesso variabile con la frequenza. La **sensibilità** indica il livello acustico prodotto per una tensione o potenza specificata. dB SPL/V e dB SPL/mW non si confrontano direttamente. Una cuffia ad alta impedenza può richiedere soprattutto tensione; una a bassa impedenza e poco sensibile può richiedere corrente. Lo stadio deve fornirle senza saturare al carico richiesto.

«250 Ω» non basta quindi a dire che una cuffia sia poco efficiente. Un volume insufficiente non dimostra immediatamente poca potenza: controlla mixer, master del gioco, mute, profili attenuati e preamp. Non rimuovere il margine digitale dell'EQ per recuperare volume. Se resta insufficiente a una regolazione prudente, valuta una sorgente adeguata al modello e al carico.

L'**impedenza d'uscita** forma un partitore con quella della cuffia. Se il carico varia con la frequenza, può cambiare il bilanciamento. Questo conta in particolare per IEM multidriver con crossover passivo. È ragionevole preferire una sorgente con impedenza d'uscita molto più bassa di quella del carico; la tradizionale «regola dell'ottavo» è però orientativa, non una certificazione, perché l'impedenza nominale non descrive l'intera curva [4].

La sensibilità elevata rende più evidente il rumore residuo; non basta da sola a prevedere la variazione tonale dovuta all'impedenza. Una bassa impedenza d'uscita non certifica assenza di fruscio.

### IEM sensibili: gain, rumore e controllo del livello

Per molte IEM contano gradualità del volume, rumore residuo e gain più della potenza massima. Parti da low gain, quando disponibile, e livello minimo prima di collegare o cambiare modalità. Verifica che i passi del controllo siano fini e i canali bilanciati al tuo livello d'uso.

Un amplificatore potente non distorce un'IEM solo perché può erogare molto. Può però essere inadatto se un movimento minimo della manopola produce un livello eccessivo, se il gain è troppo alto o se il rumore è udibile. Il preamp negativo dell'EQ crea headroom, cioè margine prima del limite digitale: non sostituisce la prudenza del controllo finale.

Un dongle semplice può essere sufficiente se supporta il carico, non aggiunge rumore e consente una regolazione adeguata. La fonte precedente citava Apple USB-C–jack e FiiO KA11, ma la classificazione «economico e misto» non è definita abbastanza da ricavarne un confronto affidabile. Non sono raccomandazioni con specifiche o prezzi verificati: variante, tensione/potenza al carico, impedenza d'uscita e microfono vanno controllati sul modello esatto. «32 bit/384 kHz» non misura questi requisiti e non prevede la latenza.

TRS per cuffie e TRRS per cuffia più microfono non offrono tutte le stesse funzioni; pinout, per esempio CTIA, e adattatori devono essere compatibili. Una line out non è automaticamente un'uscita cuffie. Non adattare un'uscita bilanciata a una comune cuffia single-ended cortocircuitando terminali.

### Quando cambiare uscita ha un motivo concreto

Ascolta brevemente una pausa a volume normale, senza alzare per cercare il rumore. Confronta stessa cuffia e contenuto su un'uscita nota a pari livello. Un ronzio che cambia col carico GPU suggerisce un problema nel percorso ma non ne prova la causa; un DAC esterno può aiutare, senza essere immune a masse e disturbi USB. **Non eliminare mai terra o protezioni elettriche** per togliere un ronzio.

Se il rumore sparisce, hai una ragione pratica per cambiare sorgente. Se il livello resta insufficiente dopo aver escluso attenuazioni software, valuta un amplificatore adeguato. Se il problema è soltanto direzionale, ritorna invece a fit, HRTF e mix. Riporta porta, gain e livello ai valori iniziali dopo ogni confronto non convincente.

Il dataset 215822 mostra perché anche la modalità va registrata: riferimento **82,661 ms**, TP35 PRO **106,066**, FOSI C3 UAC 1.0 7.1 **95,055**, FPS MODE **94,484**, UAC 2.0 **82,786 ms** [2]. Si tratta di dispositivi e modalità specifici: non dimostrano la superiorità universale di UAC 2.0. «FPS MODE» è il nome di un profilo DAC, non il frame rate del gioco. Maggiore potenza o prezzo non significa maggiore tempestività.

## Il motore, l'API e i buffer restano nel percorso

Il mixer del gioco può aspettare eventi e lavoro che il periodo audio Windows non controlla. Una regressione in un solo titolo richiede di conservare patch, scena e opzioni in-game, non di sostituire immediatamente il driver funzionante dell'intero PC.

Nella serie 215840, CS2 e CS:GO default sono vicini a 82 ms; CS 1.6 e Source riportano **112,806 e 178,415 ms**. Nella 215928, Overwatch è a **112,460** e Apex Legends a **97,437 ms**, contro CS2 **82,661** e CS:GO **82,023** [2]. Non sono misure della sola API: build, evento e condizioni server non sono interamente equivalenti. Il dato mostra la dipendenza dal titolo, non una classifica universale.

Anche il momento in cui l'input viene elaborato può influire sull'evento audio. Nella prova 215939, alle etichette 1200/400/64 fps corrispondono medie **82,014/84,413/88,447 ms**. Il metodo d'imposizione e la distribuzione degli FPS non sono specificati. È una risposta sonora, non input→fotone e non un confronto di limiter o di `snd_mixahead`. Non giustifica togliere ogni cap o sovraccaricare CPU/GPU.

### Shared, exclusive e ASIO: li sceglie l'applicazione

**WASAPI shared** permette a più app di condividere un endpoint attraverso il motore audio Windows. **Exclusive** richiede che l'app lo apra in quella modalità; può bypassare il normale mixer e impedire ad altre app di usarlo. Le caselle Windows che autorizzano il controllo esclusivo non trasformano il gioco in un client exclusive.

**ASIO** è un altro backend che deve essere implementato dall'applicazione, per esempio una DAW, un'applicazione per la produzione audio. Installare un driver ASIO o ASIO4ALL non lo aggiunge automaticamente al motore del gioco. XAudio2, DirectSound e WASAPI non sono tre modalità universali selezionabili nel pannello Suoni [1].

La prova 215758 confronta API in un'app di test: DirectSound **96,785 ms**, WASAPI exclusive **26,629**, shared low latency **46,182** nel caso nominale «buffer zero». Mostra solo medie. «Zero» è un'etichetta della prova, non assenza di buffering fisico. La trascrizione descrive CS2 come shared low latency, non certifica tutte le build. Non sottrarre quelle medie dalle misure di CS2 per ricavare il buffer del gioco.

Il grafico blu 215903 presenta ASIO/Cakewalk Next **3 ms**, CS2 **96** e LDAT App **36**, con RME a 32 campioni. L'autore del grafico non è riscontrato; techless è soltanto un candidato individuato nella ricerca precedente. Statistica e significato dei baffi non sono definiti. È un confronto fra applicazioni, non tre interruttori di CS2 e non un dataset da fondere con CS2 Kitchen. Non vengono suggeriti wrapper o sostituzioni di DLL per ottenere quel percorso.

### Durata del blocco non significa latenza totale

Un periodo di N frame di campioni dura **N ÷ frequenza × 1000 ms**. A 48 kHz, 128 frame durano circa 2,67 ms, 256 circa 5,33 e 512 circa 10,67. In stereo un frame contiene un campione per canale: non raddoppiare la durata. Sono valori matematici, non buffer garantiti sul tuo dispositivo.

Motore, mixer virtuale, driver, firmware, DSP e radio possono avere altri buffer. Un valore «128» non implica quindi 2,67 ms input→suono. Periodi piccoli richiedono lavoro più frequente e possono aumentare consumi e rischio di interruzioni sotto carico; quello minimo dichiarato non è necessariamente quello minimo stabile [1].

La [guida audio Windows ed EQ](09-audio-windows-eq.md) applica queste distinzioni a routing, effetti e prova opzionale LowAudioLatency. Qui il criterio è già sufficiente: non scegliere hardware o software dal più piccolo numero di una casella.

## La tua catena di riferimento

Prima della configurazione scrivi **gioco → endpoint scelto → eventuale mixer/DSP → dispositivo fisico → cuffia**, con porta e collegamento. Su una riga separata registra microfono e ritorno ascoltato. Se non sai dove passa un segnale, identifica il percorso prima di modificarne il buffer.

Conserva poi fit, pad/inserti, gain, livelli, formato, effetti e scena. Confronta una sola modifica e torna ad A. Un risultato affidabile può essere «rumore assente al normale livello» o «fit ripetibile e meno errori fronte/retro nella scena»: non chiamarlo riduzione di latenza senza misura fisica. Una cuffia più confortevole e leggibile è utile anche senza un numero in millisecondi.

## Fonti e limiti delle evidenze

1. Microsoft, [Low Latency Audio](https://learn.microsoft.com/en-us/windows-hardware/drivers/audio/low-latency-audio). Copia letta integralmente: `analisi/ms-audio.txt`. Terminologia, API, driver e compromessi; i numeri storici dello stack non sono benchmark locali.
2. CS2 Kitchen, [You are using the WRONG Audio Settings](https://www.youtube.com/watch?v=P-3Os4btIg4), 5 ottobre 2026. Letti `fonti/transcript video 1.txt`, la sorgente audio corrente e `analisi/INVENTARIO-FIGURE-FORNITE-V3.md`. Valori recuperati dal materiale documentale del progetto, non da nuove misure. Il video non è stato riprodotto qui.
3. Jaakko Pasanen, [AutoEq](https://github.com/jaakkopasanen/AutoEq). README letto: `analisi/autoeq.txt`; genera impostazioni, non è un processore audio in tempo reale.
4. Prime Build, fonti editoriali lette: `fonti/prime-build-audio-setup-guide.html`, originale storico `attached_assets/guida audio/index.html` e contenuto renderizzato `client/src/content/setup-audio-sections.html`, nel repository sito consultato solo sui percorsi assegnati. Criteri fit/DAC e consigli precedenti sono rielaborati criticamente, non certificazioni di modelli.
5. Microsoft, [Windows 11, version 26H2 known issues](https://learn.microsoft.com/en-us/windows/release-health/status-windows-11-26h2), consultato il 21 ottobre 2026: problemi USB Audio Class 1.0, Code 10 e mitigazione. Non certifica il singolo DAC né la sua latenza.

Nei sedici grafici audio firmati CS2 Kitchen l'intestazione dichiara RTX 5070 Ti, Ryzen 9800X3D, 32 GB 6000 CL30, Teensy 4.1 a 8000 Hz, Zowie XL2566X+ 400 Hz DyAc Premium e **100 campioni per condizione**. La trascrizione tradotta descrive invece Arduino Leonardo e sensore sonoro; il monitor nel template non diventa il sensore audio. L'incoerenza non è risolta. La traduzione menziona anche CS:GO dove diverse immagini scrivono CS2: si conserva l'etichetta della singola prova. Average, «90% Worst» e Maximum restano distinti, senza rinominare la seconda statistica P90.

Le catture locali di interfacce Peace/APO non provano l'elaborazione effettiva del segnale o il risultato acustico; le illustrazioni cuffia/DAC non identificano modelli raccomandati. Non sono state incorporate nuove immagini o ricostruite curve. Campioni grezzi, intervalli di confidenza, provenienza del grafico blu, compatibilità e diritti di riuso restano aperti. Una procedura documentata non è un collaudo della catena del lettore.
