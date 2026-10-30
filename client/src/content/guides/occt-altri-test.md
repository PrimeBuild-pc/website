### Gli altri cinque test di OCCT, uno per uno

Finora abbiamo visto i pannelli che servono più spesso: CPU, CPU + RAM, Memory, 3D Adaptive e VRAM. OCCT ne offre altri cinque: **Linpack**, **Storage**, **Power**, **Monitoring only** e **Combined**. Tutti seguono lo stesso schema: scegli il test nella colonna centrale, imposti le opzioni nel pannello a destra, scegli la durata in alto a sinistra e premi **Start**, il pulsante verde in basso. Le schermate sono quelle ufficiali OCCT 17.0.14 Supporter: i valori che vedi selezionati servono a riconoscere i controlli, non sono impostazioni consigliate.

Un'idea ti aiuta a scegliere. Secondo OCCT, un componente instabile può generare errori in qualsiasi momento, non solo sotto stress: il carico serve a farli comparire prima. Ogni test, quindi, è un modo diverso di mettere sotto pressione una parte diversa del PC. Ti conviene sceglierlo in base al sospetto, non in base a quanto suona impegnativo.

### Linpack: calcolo intenso e verifica dei risultati

**Che cosa fa.** Linpack nasce da Intel. Ogni passaggio ha due fasi: nella prima la CPU esegue calcoli molto pesanti; nella seconda, molto più leggera, il test ricontrolla i risultati. Più memoria gli concedi, più durano le due fasi.

**Quando usarlo.** Come conferma, non come primo test. Il manuale OCCT dice che il test CPU è in genere il più efficace, ma che in alcuni casi Linpack trova errori che CPU non vede: consiglia di partire da CPU e di usare Linpack per confermare la stabilità. Funziona meglio sulle CPU Intel.

**Istruzione per istruzione**

1. Seleziona **Linpack** nella colonna dei test.
2. **Version** sceglie la versione del test. Il manuale distingue una versione AMD64 (la più compatibile, ma meno gravosa sulle CPU moderne), una del 2012 (più carico e miglior rilevamento degli errori) e una "Large" (la più recente, fino ad AVX2, con il carico più alto). Nella schermata è selezionato 2019, il valore predefinito: parti da quello.
3. **Threads** decide quanti thread partono. *Physical only* ne avvia uno per core fisico (circa il 50% di utilizzo su una CPU con Hyper-Threading/SMT); *Physical and virtual* ne avvia uno per ogni core logico (circa il 100%). È il valore predefinito, ed è quello selezionato nella schermata.
4. **Memory** è la memoria in MB: 2048 nella schermata. Il manuale consiglia di restare vicino a 2 GB; la pagina delle funzioni indica 2–4 GB per tenere brevi le fasi. Non serve riempire la RAM.
5. Imposta una durata finita e premi **Start**.

**Come leggere il risultato.** Un errore ti dice che il carico ha prodotto un risultato sbagliato, non quale componente sia responsabile. Confrontalo con il test CPU fatto nelle stesse condizioni.

### Storage: scrivere e rileggere dati sul disco

**Che cosa fa.** Sollecita SSD e HDD con carichi pesanti e temperature elevate. OCCT avverte che un uso frequente può accorciare la vita dell'unità, mentre un uso normale comporta un rischio basso.

**Quando usarlo.** Solo se il sospetto riguarda il disco: file che si corrompono, errori di lettura, crash in fase di caricamento, un SSD che scalda molto. Non serve per validare overclock di CPU, RAM o GPU.

**Istruzione per istruzione**

1. Seleziona **Storage**.
2. **Paths to test** indica dove il test lavora. Il menu a sinistra sceglie l'unità (nella schermata, `C:\`); *Subfolder (optional)* permette di indicare una cartella; il pulsante con la cartella serve a sfogliare; il pulsante **+** aggiunge un altro percorso all'elenco.
3. **Test size (MiB)** è la quantità di dati di prova: 2048 MiB nella schermata, circa 2 GiB.
4. Verifica di avere spazio libero e un backup dei dati importanti. Imposta una durata finita e premi **Start**.

### Power: CPU e GPU insieme per l'alimentatore

**Che cosa fa.** Secondo il manuale, Power combina un test CPU e un test 3D per mettere sotto carico contemporaneamente i due componenti che consumano di più. Il risultato è un picco di assorbimento, utile per capire se l'alimentatore regge il massimo. Se l'alimentazione non basta, il sintomo più comune non è un messaggio di errore: è un riavvio improvviso.

**Quando usarlo.** Dopo che CPU e GPU hanno superato da sole i rispettivi test, e solo se sospetti l'alimentatore: riavvii o spegnimenti sotto carico in gioco, oppure dopo aver cambiato alimentatore, scheda video o overclock. OCCT lo indica come test per l'alimentatore; questa guida lo colloca dopo gli altri perché un riavvio durante Power non dice quale dei tre pezzi sia in causa.

**Istruzione per istruzione**

1. Salva e chiudi tutto: un riavvio improvviso è un esito possibile.
2. Seleziona **Power**.
3. **Device selection** sceglie la GPU da caricare. Nella schermata è *Discrete GPUs*; secondo il manuale, con più schede compare un selettore, e per impostazione predefinita sono incluse tutte quelle non integrate.
4. **Instruction set** sceglie le istruzioni della CPU: *Auto* usa il livello AVX più alto disponibile (con eccezioni su alcune Ryzen di prima generazione); *SSE* gira su quasi tutte le CPU; *AVX*, *AVX2* e *AVX512* consentono quelle famiglie. Lascia *Auto* se non hai un motivo per cambiare.
5. Imposta una durata breve e premi **Start**. Resta davanti al PC.

**Come leggere il risultato.** Un riavvio improvviso indica un problema di alimentazione o di stabilità sotto picco, ma non identifica da solo l'alimentatore: ripeti i test singoli di CPU e GPU prima di concludere.

### Monitoring only: osservare senza stressare

**Che cosa fa.** Non genera carico. Ha due modalità, selezionabili con i pulsanti in alto:

- **Only record values** registra i sensori e produce il report, senza eseguire nessun test. È anche la pausa che puoi inserire tra due test programmati.
- **Launch external program** avvia un programma esterno tramite tre script batch scritti da te (avvio, arresto e stato/risultato) e registra i sensori mentre gira.

**Quando usarlo.** Per fissare una baseline a PC a riposo, oppure per registrare temperature, frequenze e potenza durante una sessione di gioco reale e leggerle nel report. È il modo più semplice di vedere cosa succede in uso normale.

**Istruzione per istruzione**

1. Seleziona **Monitoring only**.
2. Lascia *Only record values* (la schermata mostra la scritta *This test only record values*).
3. Avvia la registrazione, fai quello che vuoi osservare (per esempio una partita) e fermala al termine.
4. Salva il report. Usa *Launch external program* solo se sai preparare i tre script richiesti.

### Combined: più test nello stesso momento

**Che cosa fa.** Esegue in parallelo la combinazione di test che scegli. Alcuni abbinamenti si contendono le stesse risorse e rendono meno di quanto ti aspetti. OCBASE cita come esempio efficace il test 3D Adaptive in modalità *Switch* insieme a VRAM per far emergere il coil whine, il fischio elettrico delle schede sotto carico.

**Quando usarlo.** Solo dopo che i test singoli passano, per cercare problemi che compaiono quando più parti lavorano insieme. Non è il punto di partenza: con più variabili, un errore è difficile da attribuire.

**Istruzione per istruzione**

1. Seleziona **Combined**.
2. Spunta in alto i test da eseguire: CPU + RAM, CPU, Linpack, Memory, 3D Adaptive, VRAM. Nella schermata ne sono spuntati quattro solo per mostrare l'interfaccia.
3. Sotto compare una sezione di configurazione per ogni test spuntato; scorri la pagina per vederle tutte. Per CPU + RAM trovi *Priority*, *Data set*, *Mode*, *Load type*, *Start at cycle*, *Instruction set* e *Thread settings*; per CPU trovi *Priority*, *Mode*, *Load type* e *Start at cycle*. Il significato è lo stesso dei test singoli descritti sopra.
4. *Priority* indica la priorità con cui quel carico compete con il resto del sistema; lascia *Normal*.
5. Imposta una durata finita e premi **Start**.

### Leggere la finestra durante il test

Quando il test parte, la schermata cambia. Secondo il manuale OCCT trovi:

- un **riepilogo** con il nome del test e i parametri usati;
- l'**indicatore di stato**: segno di spunta verde, nessun problema rilevato; punto esclamativo giallo, un avviso (per esempio un errore WHEA o il raggiungimento della temperatura massima consentita); punto esclamativo rosso, un errore di calcolo o un crash del test;
- il **timer**: tempo trascorso e tempo totale, oppure il simbolo di infinito se non hai fissato una durata;
- il **log**, con gli eventi della prova e un'icona che ne indica la gravità; un pulsante permette di copiarlo, utile per condividerlo;
- i pulsanti per **fermare** il test, **salvare il report** (nella versione Personal è un'immagine PNG) e **tornare** alla configurazione.

Per la durata, **Infinite** è il valore predefinito: il test gira finché non lo fermi o, se hai attivato *Stop on error*, finché non trova un errore. **Fixed** lo ferma dopo il tempo indicato. La versione gratuita limita i test a un'ora.

### Quale test per quale domanda: guida pratica all'uso

| Situazione | Test da usare | Che cosa dimostra |
|---|---|---|
| Hai cambiato RAM, EXPO/XMP o timing | **Memory**, poi **CPU + RAM** | I dati restano corretti sotto carico sulla memoria e sul percorso CPU–RAM. |
| Hai cambiato PBO, Curve Optimizer o tensioni CPU | **CPU** (con Core Cycling per controllare un core alla volta), poi **Linpack** come conferma | Che i core completino il calcolo senza errori. |
| Hai cambiato clock, undervolt o power limit della GPU | **3D Adaptive** (Steady, poi Variable o Switch per i transitori) | Che la GPU regga un carico da gioco senza artefatti o errori. |
| Hai alzato la frequenza della memoria video | **VRAM** | Che i chip di memoria video leggano e scrivano correttamente. |
| Il PC si riavvia sotto carico pesante | Prima i test singoli di CPU e GPU, poi **Power** | Che l'alimentatore regga il picco di CPU e GPU insieme. |
| Sospetti il disco | **Storage** | Che l'unità gestisca scritture e letture sostenute. |
| Vuoi cercare coil whine o problemi di interazione | **Combined** | Come si comportano più componenti insieme. |
| Vuoi capire cosa succede in gioco | **Monitoring only** | Temperature, frequenze e potenza in uso reale. |

Un percorso ragionevole, in ordine:

1. **Prepara la base.** Annota la configurazione, azzera le statistiche di HWiNFO e apri *Settings → Security* per attivare *Stop on error* e *Stop on WHEA error*.
2. **Cambia una cosa sola** e scegli il test che corrisponde a quella modifica, dalla tabella.
3. **Parti con una finestra finita e breve**, sorvegliata. Se non compaiono errori, ripeti con una sessione più lunga.
4. **Aggiungi Linpack, Power o Combined solo dopo**, per confermare o per cercare problemi di interazione.
5. **Chiudi il cerchio in uso reale**, con *Monitoring only* e con il gioco che ti interessa: un test sintetico superato non garantisce fluidità né assenza di instabilità in gioco.

Un test che finisce senza errori è un'evidenza, non una certificazione: copre solo quella combinazione di carico, durata e temperatura.

