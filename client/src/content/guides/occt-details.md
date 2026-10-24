### Leggere le schermate: versione e impostazioni non sono una ricetta

Le schermate della [pagina ufficiale OCCT Personal Features](https://www.ocbase.com/personal-features) mostrano **OCCT 17.0.14 Supporter**. Servono a riconoscere i controlli, non a prescrivere Extreme, un'ora di prova o il preset Heat. Temperature, frequenze e hardware nella barra superiore appartengono alla cattura del produttore. La tua versione, edizione e CPU possono presentare opzioni differenti.

**CPU**, **CPU + RAM** e **Memory** rispondono a domande diverse. CPU concentra il lavoro di calcolo nelle cache; CPU + RAM coinvolge anche trasferimenti verso la memoria; Memory cerca errori nei dati sotto carico RAM/IMC. Un errore restringe l'indagine, ma non identifica da solo il componente guasto. Power somma carichi importanti e non diventa il primo passo di questo percorso solo perché è disponibile nel menu.

### CPU: modalità, cicli e core da osservare

Nel [manuale CPU](https://www.ocbase.com/support/stability-testing-configuration-cpu), **Normal** dedica più lavoro alle verifiche; **Extreme** privilegia il carico di calcolo, mantenendo controlli d'errore. Non significa “più accurato in ogni situazione”. **Variable** cambia operandi tra i cicli; **Steady** mantiene il carico scelto, utile per osservare l'andamento termico. **Start at cycle** seleziona gli operandi iniziali: non imposta minuti né numero di ripetizioni.

**Thread settings → Auto** fissa l'affinità dei worker; **Fixed** lascia allo scheduler i thread nel numero scelto, quindi l'attribuzione dell'errore a un core non è equivalente. **Core Cycling** permette una selezione avanzata: nella schermata, *Cycle through all cores*, *Cycle interval* e *Threads per core* indicano ordine, permanenza e thread per core. *Custom* richiede di verificare la propria selezione. Cinque minuti e due thread sono valori della cattura, non raccomandazioni universali.

Per confrontare una modifica per-core, conserva ordine e intervallo; per osservare il carico simultaneo non confondere il passaggio su un core alla volta con una prova all-core.

### SSE, AVX, AVX2 e AVX-512: quale lavoro cambia

Sono **famiglie di istruzioni**, non quattro test associati rispettivamente a CPU, cache, RAM e alimentatore. Con SIMD, una singola istruzione opera su più elementi di dati. La larghezza del vettore non è la larghezza del bus della RAM, né una misura degli FPS.

| Scelta | Differenza tecnica | Come interpretare la prova |
|---|---|---|
| **SSE** | Famiglia SIMD con vettori da 128 bit. | Un percorso di istruzioni distinto; superarlo non convalida automaticamente AVX. |
| **AVX** | Introduce operazioni vettoriali fino a 256 bit. | Cambia il lavoro richiesto al processore, non seleziona una diversa periferica. |
| **AVX2** | Estende anche le operazioni intere a 256 bit. | Non è “AVX a 512 bit”; la copertura dipende dal kernel di test. |
| **AVX-512** | Famiglia con operazioni fino a 512 bit e capacità aggiuntive. | Richiede supporto hardware/software; un'opzione assente non va forzata. |

Riferimenti: [Intel, famiglie di istruzioni](https://www.intel.com/content/www/us/en/support/articles/000005779/processors.html) e [architettura AVX-512](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-avx-512-instructions.html).

**Auto non significa la stessa cosa in ogni pannello.** Per CPU/CPU + RAM, il [manuale OCCT](https://www.ocbase.com/support/stability-testing-configuration-cpu-memory) descrive la scelta dell'AVX più alto disponibile, con eccezioni per alcune CPU. Per Memory, il [manuale specifico](https://www.ocbase.com/support/stability-testing-configuration-memory) descrive attualmente Auto come SSE: letture/scritture da 128 bit, contro i 256 bit dell'opzione AVX. Registra ciò che la release effettivamente usa; non dedurlo dal solo nome Auto.

Il menu consente una famiglia di istruzioni, ma non espone la sequenza completa del kernel. Non permette quindi di affermare “questo verifica solo l'ALU” o “AVX512 prova soltanto la cache”. Potenza, frequenza e temperatura vanno osservate durante ciascuna prova. Intel documenta, per gli [Xeon W con carichi AVX](https://www.intel.com/content/www/us/en/support/articles/000090746/processors.html), possibili riduzioni di frequenza per rispettare i limiti: non trasferire una percentuale di calo a ogni CPU.

### Memory: il preset e i blocchi non sono istruzioni della CPU

Nella schermata ufficiale è selezionato **Presets → Heat**. **Selected preset** sceglie una sequenza; **Copy to Custom** consente di modificarla. Prima di eseguirla annota autore, nome e blocchi. L'80% visualizzato riguarda la memoria libera, non tutta la RAM installata; il pannello indica MB mentre il manuale usa MiB: conserva unità e quantità riportate dalla tua release.

La [presentazione del Memory Test v17](https://www.ocbase.com/news/occt-v17-beta-memory-test-overhaul) separa generazione dei dati, trasformazioni e verifica. Un blocco che produce carico senza una verifica non dimostra assenza di errori. Nelle sequenze personalizzate occorre inizializzare i dati e poi controllarli; i blocchi All-In-One, come Legacy, includono già il controllo e non vanno trattati come semplici generatori. I loop non devono sovrapporsi. Un preset pronto è preferibile a una sequenza improvvisata di cui non comprendi le dipendenze.

| Blocco del manuale | Operazione sui dati |
|---|---|
| TM5 Refresh / Simple | Pattern dipendente dall'indirizzo; Simple aggiunge interleaving. |
| TM5 Inverted / Arithmetic | Inversioni o semi aritmetici nella generazione. |
| Checkerboard | Alternanza di zero e uno. |
| Walking Zero / One | Spostamento del bit diverso dagli altri. |
| Blank Read | Lettura senza modifica. |
| Mirror Move 1 / 2 / 4 / 128 | Scambi ripetuti, con partizioni o interleaving differenti. |
| Double Flip | Doppia inversione dei bit. |
| Check | Confronto con il pattern inizializzato. |
| Loop / Idle | Ripetizioni o pause; non sostituiscono Check. |
| Legacy Test | Test completo con verifica interna. |

Nomi e funzioni: [manuale Memory](https://www.ocbase.com/support/stability-testing-configuration-memory). Questi pattern sollecitano accessi differenti: non assegnare a ciascuno un timing difettoso certo. Un fallimento resta da riprodurre con configurazione e condizioni annotate.
