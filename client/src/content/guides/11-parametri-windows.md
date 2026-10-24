# Parametri Windows: interrupt, priorità e timer senza preset universali

Una casella chiamata «High», un timer da 0,5 ms o un valore nel registro possono sembrare scorciatoie per rendere il PC più rapido. In realtà controllano parti diverse del sistema. Alcuni modificano la precedenza di un thread, altri il modo in cui un dispositivo avvisa la CPU, altri ancora la misura del tempo. Senza sapere quale percorso è coinvolto, è facile migliorare un contatore e peggiorare il funzionamento del gioco, dell'audio o delle periferiche.

Questa guida spiega quei meccanismi e come valutare una configurazione già presente. Non aggiunge un passaggio obbligatorio al primo setup e non propone un pacchetto di valori da applicare. È rivolta a Windows 11 25H2/26H2, senza certificare automaticamente build future, hardware, driver o anti-cheat.

**Stato della verifica:** stesura documentale, senza esecuzione di utility, modifica di registro/BCD, cambio di priorità o prova di recupero. Le procedure avanzate richiedono autorizzazione, documentazione pertinente e un ambiente di prova. Se il sistema funziona e manca un problema riproducibile, conservare lo stato attuale è la decisione più utile.

## 1. Chiedi prima che cosa controlla un'impostazione

Un **processo** contiene risorse e uno o più **thread**, le unità di lavoro che Windows può assegnare ai processori. Lo **scheduler** sceglie quali thread pronti eseguire in base a priorità e risorse disponibili. Un dispositivo segue un altro percorso: segnala un evento con un interrupt, il driver esegue una breve **ISR**, Interrupt Service Routine, e può rimandare parte del lavoro a una **DPC**, Deferred Procedure Call. La DPC non è un normale thread del gioco.

Priorità del processo, priorità dei suoi thread, policy degli interrupt, precedenza I/O e MMCSS non sono livelli di un'unica scala «gaming». Modificarne uno non modifica automaticamente gli altri. Anche la durata ISR/DPC resta distinta dal tempo fra un comando fisico e il cambiamento del pixel.

Per valutare una ricetta, separa tre domande:

1. **Supporto della funzione (capability):** hardware e driver supportano la funzione?
2. **Configurazione:** quale valore è stato richiesto e per quale target?
3. **Stato attivo:** Windows sta effettivamente usando quella modalità?

Il pulsante Apply risponde, al massimo, alla seconda. Rilettura, riavvio quando richiesto, risorse assegnate e verifica funzionale servono per la terza. Nessuna delle tre dimostra da sola un beneficio.

| Classificazione | Significato utile |
|---|---|
| **Supportato** | Il meccanismo è documentato nel suo ambito, non necessariamente vantaggioso da modificare. |
| **Situazionale** | Una modifica affronta una contesa o un difetto specifico e va ritirata se non aiuta. |
| **Legacy** | La raccomandazione nasce da piattaforme precedenti: occorre rivalutarne motivazione e applicabilità. |
| **Non verificato** | Mancano prove adeguate per build, dispositivo, applicazione o beneficio dichiarato. |
| **Obsoleto** | La specifica funzione non è più usata oppure la vecchia garanzia è stata rimossa. |

«Non utile nel mio caso» non significa «è tutto placebo». Allo stesso modo, la presenza di una chiave non prova che Windows corrente la usi. Prima di un esperimento scrivi sintomo, ipotesi, metrica pertinente e procedura di ritorno.

## 2. Interrupt su linea, MSI e MSI-X: il target è un dispositivo

Nel percorso tradizionale un interrupt può usare una linea condivisa. I driver coinvolti devono riconoscere se l'evento riguarda il proprio dispositivo. **MSI**, Message Signaled Interrupts, usa invece scritture verso indirizzi dedicati; **MSI-X** amplia le possibilità di messaggi e distribuzione. Non è una funzione del marchio MSI e non accelera universalmente il mouse [1].

Molti dispositivi moderni sono già configurati così. `MSISupported=1` nel ramo di un dispositivo esprime una configurazione: non dimostra da solo supporto del driver, risorse allocate o vantaggio. Un valore assente non significa necessariamente hardware incapace. Le capability PCI e la configurazione prevista dal file **INF** del driver vanno considerate separatamente; anche un massimo di messaggi consentiti può differire dai messaggi realmente assegnati [2].

Il target richiede più di un nome leggibile. Prepara una scheda con nome, percorso istanza, hardware ID, modello, driver/versione, controller padre, modalità osservata e motivo della prova. Due controller con lo stesso nome possono essere istanze diverse. Per un mouse USB il target PCI può essere il controller **xHCI**, non il singolo mouse: modificarlo può coinvolgere anche tastiera, audio e altri dispositivi collegati.

### Un percorso prudente di valutazione

1. In Gestione dispositivi leggi proprietà e risorse del dispositivo identificato; usa Informazioni di sistema come inventario iniziale della condivisione. Un numero IRQ isolato non misura la latenza e non ricostruisce tutte le capability.
2. Cerca una motivazione nella documentazione OEM e del driver. Microsoft documenta l'abilitazione attraverso INF/registro per chi sviluppa o installa driver: non è un invito a forzare ogni dispositivo [2].
3. Conserva il ramo esatto interessato, nomi, tipi, valori e assenze. Prepara recupero e backup prima della scrittura. Se non puoi salvare o identificare il target, fermati; non cambiare permessi del ramo Enum per aggirare un rifiuto.
4. Soltanto con supporto e difetto identificati, valuta una modifica isolata. Rileggi la configurazione e, dopo l'eventuale riavvio, verifica le risorse effettivamente assegnate.
5. Ripeti lo stesso carico e controlla anche avvio, audio, input e altre periferiche. Se il sintomo non migliora o compare una regressione, ripristina esattamente lo stato precedente e ricontrolla dopo il riavvio.

Un export del registro non elimina automaticamente un valore aggiunto dopo il salvataggio. Il ritorno deve distinguere «prima valeva X» da «prima non esisteva». Non importare un ramo proveniente da un altro PC e non considerare un punto di ripristino una garanzia totale.

**Controller di storage e di avvio non sono bersagli per tentativi da principiante.** Un errore può impedire l'avvio di Windows; un controller USB non operativo può togliere anche l'accesso agli strumenti di recupero. Conserva chiave BitLocker e supporto di recupero accessibili da un altro dispositivo. Se manca una via di recupero verificabile, non fare l'esperimento.

## 3. Affinità e priorità degli interrupt: prima la topologia

L'**affinità di processo** limita i processori su cui possono essere eseguiti i suoi thread. L'**affinità degli interrupt** riguarda i processori che servono gli eventi di un dispositivo. Non sono lo stesso controllo e non assegnano tutta la pipeline del gioco a un core [3].

Una restrizione può ridurre migrazioni, ma anche concentrare il lavoro su una CPU occupata. «CPU 0» indica normalmente un **processore logico**, non l'intero core fisico. Con **SMT**, due processori logici possono condividere risorse di un core. Chiplet, CCD e cache introducono località; su CPU ibride P-core ed E-core hanno caratteristiche differenti. Il conteggio totale non ricostruisce queste relazioni. La regola «pari = core, dispari = SMT» non è una mappa affidabile.

Le maschere di affinità indicano processori logici nel contesto di un gruppo. Oltre 64 processori logici contano i **gruppi processore**; Windows 11 può distribuire per impostazione predefinita processi e thread su più gruppi [4]. Una utility vecchia o una maschera di larghezza limitata può rappresentare soltanto una parte del sistema. Non copiare valori esadecimali da un altro PC.

Microsoft descrive policy con processori vicini, processori specificati e distribuzione dei messaggi, raccomandando il riferimento predefinito quando applicabile [3]. «Load balanced» in un'interfaccia va ricondotto alla policy concreta: non significa che un singolo interrupt venga eseguito contemporaneamente su tutti i core. Contano messaggi assegnati, supporto e code del driver; la condivisione di una linea limita le scelte.

Anche la **priorità dell'interrupt** ha un ambito proprio. Una voce High in una utility non è High del processo e non garantisce minore latenza dell'intera applicazione. Non assegnare una priorità elevata a tutti i dispositivi per creare una presunta gerarchia gaming.

### Quando ha senso una prova

Serve una contesa credibile: osserva carico per processore logico e correlazione temporale con il sintomo, eventualmente con una traccia WPR/WPA, gli strumenti Windows di registrazione e analisi delle prestazioni [11]. Il massimo DPC di una sessione, senza quella correlazione, non basta.

Per un confronto temporaneo di processo, Gestione attività → Dettagli → tasto destro sul processo corretto → Imposta affinità mostra i processori selezionabili, quando l'accesso è consentito. Prima registra la selezione originale e verifica che non esistano regole persistenti di utility. Una prova degli interrupt è invece una modifica del dispositivo, da pianificare con target, policy, maschera/gruppo e recupero documentati: non trasferire lì la selezione del gioco.

Prova un solo target e controlla anche audio, rete e input sotto carico simultaneo. Per tornare indietro ripristina selezione o policy e ogni regola effettivamente modificata, poi rileggi lo stato dopo il riavvio richiesto. Un riavvio del gioco può non eliminare una regola persistente. Se l'anti-cheat o una protezione rifiuta l'accesso, fermati.

Non è obbligatorio mettere tutto su CPU 0, né spostare tutto fuori da CPU 0. Disabilitare SMT, E-core o un CCD non è una scorciatoia necessaria; può ridurre capacità disponibile o peggiorare località.

## 4. Normal, High e Realtime: precedenza quando c'è contesa

La classe di priorità contribuisce alla precedenza dei thread che competono per CPU. Non aggiunge GHz, banda o FPS. Contano anche priorità dei singoli thread e aggiustamenti dello scheduler [5]. **Normal è il riferimento**, non un difetto da correggere.

High può essere una prova circoscritta per una contesa accertata. Se assegni High contemporaneamente a gioco, browser, Discord e OBS, non hai risolto la competizione: puoi averla soltanto spostata. **Evita Realtime**: può sottrarre tempo a input e attività necessarie per interagire con il PC.

Per una prova temporanea autorizzata:

1. Annota il processo corretto e la classe iniziale; cerca regole persistenti già attive.
2. In Gestione attività → Dettagli → Imposta priorità valuta soltanto la classe pertinente. Non modificare servizi di sistema e non aggirare rifiuti dell'anti-cheat.
3. Ripeti il carico completo, includendo applicazioni e periferiche normalmente usate. Giudica sintomo, audio, input e stabilità, non soltanto FPS medi.
4. Al primo peggioramento torna alla classe originale, Normal se era quella, e verifica che utility o launcher non la riscrivano. Se il risultato è inconclusivo, conserva il riferimento.

Priorità I/O, interrupt e categorie MMCSS non sono alternative equivalenti a questa operazione.

## 5. MMCSS: la presenza di Games non registra un gioco

**MMCSS**, Multimedia Class Scheduler Service, favorisce le attività multimediali sensibili al tempo, mantenendo risorse per altri task. L'applicazione registra i thread tramite API come `AvSetMmThreadCharacteristics` o `AvSetMmMaxThreadCharacteristics`, indicando il task [6]. Una chiave `Tasks\Games` presente nel registro non prova che tutti i thread del tuo gioco la usino.

Il riferimento documentato è:

```text
HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile
```

Il sottoinsieme `Tasks` contiene profili che gli OEM possono integrare. Per un inventario conserva nomi, tipi, valori e assenze, oltre a stato e tipo di avvio del servizio. Non applicare un registro «gaming» estraneo al sistema.

La documentazione Microsoft delimita diverse ricette diffuse:

| Valore | Significato e limite |
|---|---|
| `SystemResponsiveness` | Risorse garantite ai task a bassa priorità nel contesto MMCSS, non una tassa fissa del 20% sugli FPS. Valori non multipli di dieci sono arrotondati verso il basso; sotto 10 o sopra 100 vengono riportati a 20. Quindi 0 non prova «riserva eliminata»; 100 disabilita MMCSS. |
| `Priority` | Da 1 a 8; con Scheduling Category High viene trattato come 2. Scrivere 8 ovunque non costruisce una graduatoria migliore. |
| `GPU Priority` / `SFIO Priority` | Documentati come non usati: il nome e la presenza non dimostrano attività operativa. |
| `Clock Rate` | La vecchia garanzia di Vista è stata rimossa da Windows 7. Non è un vincolo temporale attuale da copiare. |

Le categorie MMCSS non coincidono con la classe High del processo. Modificare Games non rende prioritari gli interrupt della NIC. Per chiavi come NoLazyMode occorrono prove specifiche di utilizzo e beneficio, non una tradizione di preset.

### Se il sistema ha già ricevuto un vecchio pack

Il vecchio ramo Prime Build «CX» cercava quella stringa in nomi, provider o servizi e poteva fermare/disabilitare MMCSS prima del backup. Una stringa non identifica affidabilmente **NetAdapterCx**, il modello di driver di rete Windows, e non dimostra un bug. Una diagnosi richiede driver e build precisi, sintomo riproducibile, traccia o riscontro del produttore. Non ereditiamo «MMCSS OFF» come impostazione consigliata.

Per il recupero, parti dall'inventario di servizio e registro, dai backup disponibili e dall'elenco reale delle operazioni eseguite. Riavviare MMCSS non annulla tutte le chiavi modificate; importare un registro di un altro PC non ricostruisce il tuo stato. Se il backup è successivo a una disabilitazione, non chiamarlo stato originario. Quando manca la documentazione dello stato precedente, chiedi una verifica individuale invece di promettere un rollback esatto.

## 6. Timer, timestamp e risvegli: quattro proprietà differenti

**QPC**, QueryPerformanceCounter, legge timestamp per misurare intervalli sullo stesso sistema. Windows sceglie una sorgente adatta: spesso **TSC**, il contatore del processore, sulle piattaforme x86/x64 idonee; può usare alternative quando necessario. Sui dispositivi Arm il riferimento può essere il contatore di sistema Arm Generic Timer o un contatore della piattaforma [7]. **HPET** è un timer hardware, non un sinonimo di QPC. Disabilitare HPET in Gestione dispositivi non dimostra quale sorgente usi QPC.

La misura del tempo ha proprietà differenti:

- **Risoluzione:** intervallo minimo distinguibile dal contatore.
- **Accuratezza:** vicinanza al riferimento temporale reale.
- **Costo di lettura:** tempo necessario ad acquisire il timestamp.
- **Risveglio:** momento in cui un thread può riprendere dopo un'attesa, che dipende anche dallo scheduler.

QPC non è sincronizzato a un riferimento esterno come UTC; il valore della sua frequenza non identifica da solo la frequenza del timer hardware sottostante. Una lettura rapida non prova un input rapido e non richiede di bloccare il thread su un solo core: Microsoft sconsiglia di sostituire QPC con letture TSC dirette o affinità arbitrarie [7].

`Sleep` sospende un thread. Scaduto il tempo, il thread deve comunque ottenere CPU. La **timer resolution** influenza alcuni percorsi di attesa: non è la risoluzione di QPC e non rappresenta l'intera pipeline input→display. «0,5 ms» in una utility non significa mouse, gioco o schermo con latenza 0,5 ms.

Il comportamento di `timeBeginPeriod` è cambiato [8]. Prima di Windows 10 2004 influenzava globalmente il timer; dalle versioni successive la richiesta non vale automaticamente per tutti i processi. Windows 11 non garantisce la maggiore risoluzione a processi con finestra completamente nascosta, minimizzata o non visibile/udibile. Il dettaglio dipende dall'API e dalle richieste dell'applicazione: il risultato di una utility non si trasferisce a ogni gioco. Richieste frequenti possono aumentare risvegli e consumi.

Se un'applicazione richiede davvero un timer diverso, verifica il suo percorso e misura il carico pertinente. Non lasciare un timer manager all'avvio soltanto per abbassare il numero mostrato, né pulire memoria o modificare il boot come prerequisito della misura. Per terminare una prova, arresta il tool attraverso il percorso previsto e ripristina soltanto le sue regole di avvio effettivamente modificate; poi ricontrolla nelle condizioni iniziali, senza altri gestori timer concorrenti. Non cancellare BCD o chiavi sconosciute come presunto ritorno della timer resolution.

## 7. BCD: riconosci una forzatura senza cancellare alla cieca

**BCD**, Boot Configuration Data, conserva opzioni di avvio. È un ambito più delicato di una preferenza temporanea: una modifica può rendere il PC non avviabile [9].

| Opzione trovata nei pack | Ambito documentato |
|---|---|
| `useplatformclock` | Forza il platform clock come performance counter; Microsoft lo indica per debug. |
| `useplatformtick` | Forza una sorgente platform senza timer sintetici; documentato per debug. |
| `disabledynamictick` | Controlla il tick dinamico; documentato per debug. |
| `tscsyncpolicy` | Policy di sincronizzazione TSC, non preset gaming; documentata per debug. |
| Opzioni APIC | Cambiano il comportamento dei controller interrupt; non sono un secondo pacchetto da sommare a MSI/affinità. |
| `hypervisorlaunchtype` | Controlla l'avvio dell'hypervisor, non la timer resolution; Off può compromettere virtualizzazione, protezioni e requisiti applicativi. |

Puoi documentare lo stato con un comando **in lettura**, in un terminale autorizzato con i privilegi richiesti:

```powershell
# Esempio documentale, non eseguito per questa guida.
bcdedit /enum "{current}"
```

Le virgolette attorno all'identificatore sono importanti in PowerShell [9]. Conserva l'output e verifica a quale installazione si riferisce `{current}`. Una voce assente non richiede di scrivere un valore esplicito «ottimale». La lettura non misura la sorgente attiva di QPC né le prestazioni.

### Recupero proporzionato

Prima di qualsiasi intervento autorizzato servono inventario, export BCD, chiave BitLocker e supporto di recupero accessibile. Questo testo non fornisce un blocco `/set` o `/deletevalue` da eseguire in massa. La decisione dipende dallo stato originale:

- se una voce era presente, ripristinare significa riportare **quel valore** sull'identificatore corretto;
- se era assente ed è stata aggiunta da una modifica riconosciuta, rimuovere solo quella forzatura può restituire la scelta a Windows;
- se lo stato è sconosciuto, cancellare non dimostra il ritorno al prima.

Le modifiche BCD richiedono riavvio per avere effetto. Dopo il ritorno controlla configurazione, avvio, sicurezza e applicazioni. Non importare un BCD esterno e non cambiare Secure Boot, HVCI o requisiti anti-cheat per ottenere un contatore migliore. La documentazione BCDEdit cita precauzioni di sicurezza per alcune operazioni: non costituisce una prescrizione di disabilitare protezioni per il gaming.

Se Windows non si avvia, interrompi i tentativi e usa il percorso di recupero preparato, con supporto competente. In ambiente di recupero `{current}`, store e lettere di unità non vanno presunti identici alla sessione normale. Senza identificazione certa non applicare comandi copiati. Un rollback non reinstalla automaticamente componenti rimossi dal vecchio pack.

## 8. NetworkThrottlingIndex, Nagle e DSCP: non sono timer

`NetworkThrottlingIndex` appartiene a ricette storiche sul traffico in contesti multimedia. Il valore `FFFFFFFF` o la presenza della chiave non provano un beneficio nella build e nel carico attuali. Il miglioramento gaming universale resta **non verificato**, non una certezza né un placebo dimostrato.

**Nagle** riguarda il raggruppamento di piccole scritture TCP. Disabilitarlo non accelera automaticamente UDP; le applicazioni possono usare proprie opzioni socket. Ricette ACK/registro non correggono qualsiasi gameplay.

**DSCP** marca una classe di traffico. La rete deve riconoscere quella marcatura, che può essere ignorata o riscritta lungo il percorso. Una policy locale non crea una corsia Internet garantita e non configura **SQM**, la gestione delle code nel router.

Prima di questi parametri, controlla collegamento, risposte mancanti, RTT sotto carico, code e servizio: [Rete domestica](10-rete-domestica.md) contiene procedure autonome. Non confondere NetworkThrottlingIndex con interrupt moderation della NIC o con shaping nel router. Un intervento sensato deve raggiungere il protocollo e il collo di bottiglia effettivamente coinvolti.

## 9. Usa gli strumenti senza sommare automatismi

Windows offre Gestione attività per processi e prove temporanee, Gestione dispositivi e Informazioni di sistema per inventario, Registro di sistema per letture mirate e WPR/WPA per tracce più approfondite. Nessuno ricostruisce da solo tutta la topologia o certifica un guadagno input→fotone.

| Strumento di approfondimento | Uso e cautela |
|---|---|
| **Process Lasso**, Bitsum | Gestisce regole persistenti. Registra ProBalance, profili energetici e regole già attive: possono cambiare il riferimento durante la prova. |
| **System Informer**, Winsider | Osserva processi, thread e attività. Non terminare servizi di sistema o caricare componenti bloccati dalle protezioni per finire una misura. |
| **ISLC**, Wagnardsoft | Gestisce standby list e richieste timer. Standby non significa RAM inutilizzabile; pulirla può richiedere nuove letture. Non giustifica la disabilitazione del pagefile. |
| **MSI Mode Utility**, repository PowerShell indicato nelle fonti | È distinta dalla vecchia MSI Utility v3 distribuita nei forum. Una casella non prova capability, stato attivo o recupero. |
| **GoInterruptPolicy**, spddl | Espone policy interrupt/MSI. Devi ricondurre i campi al target e al contratto Windows, non copiare maschere o priorità. |

Sono riferimenti [10], non programmi da installare tutti. Nella ricerca del progetto il sito System Informer e la pagina ISLC hanno rifiutato l'accesso automatico; il repository ufficiale del primo è stato consultato, mentre la release del secondo resta da verificare. Non attribuire ai tool collaudi assenti. Per un download usa la fonte del progetto, registra versione/hash e firma quando disponibile; un README non sostituisce controllo del sorgente e della release.

Il [pack Diagnostica v4](../discord-revisione-v5/pacchetti/PrimeBuild-Diagnostica-v4.zip) legge servizio e profili MMCSS, BCD, adattatori/policy QoS e inventario USB. Estrai tutto in una cartella nuova e avvia `Avvia-PrimeBuild.bat`, senza mescolare versioni; la lettura BCD richiede Esegui come amministratore sul BAT. I sorgenti sono non firmati e il collaudo funzionale resta pendente: verifica la provenienza e fermati se una policy gestita blocca l'avvio. Consulta il [README](../discord-revisione-v5/scripts/README.md). Un errore può lasciare un report parziale; nessun output prova partecipazione del gioco a MMCSS, priorità Internet o latenza USB. Lo script non corregge vecchi preset e non modifica timer o hypervisor.

Chiudere o disinstallare un programma non annulla necessariamente registro, BCD, task o regole persistenti. Evita sovrapposizioni fra utility, launcher e script all'avvio. Energia, boost e core parking sono un altro ambito: [Windows, setup ed energia](01-windows-setup.md) li tratta senza aggiungere qui un secondo preset.

## 10. Conserva soltanto un risultato verificabile

Una prova utile cambia una sola variabile e mantiene invariati carico, durata, strumenti e condizioni. Registra più passaggi nello stato A, prova B, quindi torna ad A quando è sicuro e fattibile. La [guida al metodo](12-misure-verifica.md) approfondisce metriche, variabilità e limiti.

Controlla separatamente richiesta, stato attivo e sintomo. Una riduzione ISR/DPC non dimostra da sola meno click→fotone; avere più FPS non equivale automaticamente a minore latenza fisica. Se i risultati si sovrappongono, scrivi «inconclusivo». Se il sistema peggiora, il ritorno al valore originale è parte dell'esperimento, non un passaggio opzionale.

Per un PC già modificato, comincia da inventario e backup esistenti. Se non puoi ricostruire il prima, dichiaralo. Un «restore defaults» universale è meno affidabile di una verifica individuale e può cancellare personalizzazioni valide. Non sacrificare sicurezza o accesso al sistema per conservare una differenza non dimostrata.

## Fonti e limiti

1. Microsoft, [Introduction to Message-Signaled Interrupts](https://learn.microsoft.com/en-us/windows-hardware/drivers/kernel/introduction-to-message-signaled-interrupts).
2. Microsoft, [Enabling Message-Signaled Interrupts in the Registry](https://learn.microsoft.com/en-us/windows-hardware/drivers/kernel/enabling-message-signaled-interrupts-in-the-registry). Contratto per driver/configurazione, non ricetta prestazionale universale.
3. Microsoft, [Interrupt Affinity and Priority](https://learn.microsoft.com/en-us/windows-hardware/drivers/kernel/interrupt-affinity-and-priority) e [IRQ_DEVICE_POLICY](https://learn.microsoft.com/en-us/windows-hardware/drivers/ddi/wdm/ne-wdm-_irq_device_policy).
4. Microsoft, [Processor Groups](https://learn.microsoft.com/en-us/windows/win32/procthread/processor-groups).
5. Microsoft, [Scheduling Priorities](https://learn.microsoft.com/en-us/windows/win32/procthread/scheduling-priorities).
6. Microsoft, [Multimedia Class Scheduler Service](https://learn.microsoft.com/en-us/windows/win32/procthread/multimedia-class-scheduler-service).
7. Microsoft, [Acquiring high-resolution time stamps](https://learn.microsoft.com/en-us/windows/win32/sysinfo/acquiring-high-resolution-time-stamps).
8. Microsoft, [timeBeginPeriod](https://learn.microsoft.com/en-us/windows/win32/api/timeapi/nf-timeapi-timebeginperiod).
9. Microsoft, [BCDEdit /set](https://learn.microsoft.com/en-us/windows-hardware/drivers/devtest/bcdedit--set) e [BCDEdit /enum](https://learn.microsoft.com/en-us/windows-hardware/drivers/devtest/bcdedit--enum).
10. Riferimenti dei tool: [Process Lasso](https://bitsum.com/processlasso-docs/), [System Informer](https://github.com/winsiderss/systeminformer), [ISLC](https://www.wagnardsoft.com/ISLCw), [MSI Mode Utility PowerShell](https://github.com/vadyaravadim/msi-mode-utility), [GoInterruptPolicy](https://github.com/spddl/GoInterruptPolicy). Collegamenti di approfondimento: non audit completo, verifica della release binaria o promessa di compatibilità.
11. Microsoft, [Windows Performance Toolkit](https://learn.microsoft.com/en-us/windows-hardware/test/wpt/), per il percorso di registrazione/analisi avanzato.

Le fonti API possono essere più vecchie di Windows 11 e restare pertinenti al meccanismo; questo non rende valide tutte le ricette dell'epoca. Le prove funzionali su hardware, l'efficacia dei cambi e il recupero reale restano attività separate, non effettuate per questa stesura.
