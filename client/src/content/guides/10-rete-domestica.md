# Rete domestica: trovare il problema prima di cambiare impostazioni

Una connessione può trasferire molti dati e diventare poco reattiva appena parte un backup. Può funzionare bene accanto al router e male nella stanza del PC. Può anche raggiungere senza difficoltà quasi tutti i servizi, tranne il server di un gioco. Sono problemi diversi: chiamarli tutti «lag» porta facilmente a intervenire nel posto sbagliato.

Questa guida ti accompagna dal collegamento di casa alla raccolta di evidenze per il provider. Il percorso parte dalle osservazioni e arriva alle impostazioni avanzate soltanto quando servono. Non occorre completare ogni sezione: trovare una spiegazione utile, oppure conservare un sistema già funzionante, è un risultato sufficiente.

**Ambito e stato delle prove.** Gli esempi Windows riguardano Windows 11 25H2/26H2, senza certificare anticipatamente nuove build, driver o apparati. Per questa stesura non sono stati eseguiti ping, speedtest, catture o modifiche a PC e router. I comandi sono esempi documentali; le procedure devono essere adattate e verificate su hardware autorizzato. Nessuna impostazione promette un ping minimo universale.

## 1. Parti da ciò che succede, non dal nome di un tweak

Scrivi una frase che descriva un evento osservabile: «la voce si interrompe quando carico file», «il PC perde il collegamento via cavo» oppure «un gioco peggiora soltanto la sera». Aggiungi dispositivo, stanza, ora, servizio e attività contemporanee. È il primo riferimento con cui giudicare un eventuale miglioramento.

Uno scatto dell'immagine non dimostra un problema di rete. Il PC può produrre frame a intervalli irregolari; il server può elaborare lentamente; i pacchetti possono arrivare in ritardo. Un contatore FPS descrive la produzione o visualizzazione dei frame secondo la sua definizione, non il viaggio dei dati su Internet.

| Quando compare il sintomo | Prima domanda utile |
|---|---|
| Soltanto in Wi-Fi | Cambia usando Ethernet nello stesso scenario? |
| Durante download o upload | Il ritardo cresce con il carico e scende quando il trasferimento termina? |
| Anche via cavo, con disconnessioni | Cade il link del PC oppure l'accesso del router? |
| Soltanto con un servizio o una regione | Che cosa mostrano le statistiche dell'applicazione e altri servizi? |

Se puoi farlo in sicurezza, un collegamento temporaneo alla LAN del router permette di escludere uno switch o una tratta radio intermedia. Non assolve automaticamente il router e non dimostra la responsabilità del provider. Se manca completamente il servizio, apri subito una segnalazione: non aspettare di completare tutte le prove della guida.

## 2. Impara a distinguere capacità, ritardo e risposte mancanti

La **capacità** indica quanti dati un collegamento può trasportare al secondo. Il **throughput** è il trasferimento effettivamente ottenuto in una prova, con i suoi protocolli e limiti. Mbit/s significa megabit al secondo; MB/s significa megabyte al secondo, e un byte contiene otto bit. La velocità negoziata fra PC e porta Ethernet non è la velocità Internet.

**Download** è ricezione, **upload** è invio. Anche un download richiede traffico di ritorno: saturare l'upload può disturbare attività che sembrano di sola ricezione.

Il comando **ping** invia sonde e misura il **RTT**, Round Trip Time, cioè il tempo di andata e ritorno, in millisecondi. Non è il ritardo a senso unico. Dividere per due presupporrebbe una simmetria di percorsi e code che non puoi dare per certa [1].

La **variabilità del RTT** descrive quanto cambiano le risposte. La parola **jitter** richiede invece la definizione dello strumento: alcuni usano differenze fra campioni successivi, altri statistiche diverse. La variazione del ritardo IP a senso unico della RFC 3393 non coincide semplicemente con massimo meno minimo del ping [2]. La **perdita**, o packet loss, va accompagnata da protocollo, numero di sonde e timeout. Una risposta ICMP mancante può essere filtrata o de-prioritizzata; non è automaticamente un datagramma del gioco perso.

Servono anche alcune parole per riconoscere il percorso:

- **IP:** indirizzo di un'interfaccia nel contesto di una rete. Gli indirizzi privati non sono direttamente instradabili su Internet pubblico; il provider può condividere un indirizzo pubblico fra clienti.
- **Gateway:** il prossimo apparato verso altre reti, normalmente il router domestico. **DNS** traduce nomi in indirizzi: non è una scorciatoia universale verso un server già scelto.
- **TCP:** trasporto con consegna ordinata e ritrasmissioni. **UDP:** trasporto di datagrammi senza quelle garanzie; gli eventuali recuperi spettano all'applicazione. **ICMP:** protocollo usato anche per messaggi e diagnostica di rete. Un test TCP non descrive tutto un gioco che usa UDP.
- **Porta TCP/UDP:** identificatore logico di un servizio, non la presa fisica. **NAT:** traduzione di indirizzi e spesso porte. Doppio NAT e NAT del provider possono complicare connessioni in ingresso, ma non spiegano ogni ritardo.
- **MTU:** dimensione massima del pacchetto IP sul collegamento. Ridurla a tentativi o abilitare jumbo frame non è un passaggio ordinario per migliorare il gioco.

## 3. Disegna il percorso che hai davvero

Il **provider**, o ISP, vende l'accesso a Internet, usando infrastrutture proprie oppure di altri gestori. La **LAN** è la rete locale; la **WAN** è il lato del router rivolto all'accesso esterno. Il router instrada fra reti e spesso riunisce altre funzioni: modem, switch Ethernet e access point Wi-Fi. Uno **switch** collega dispositivi Ethernet nella LAN; un **access point**, AP, collega client radio alla rete.

La tecnologia di accesso cambia ciò che trovi prima del router:

| Accesso | Tratto finale e apparati |
|---|---|
| **FTTH**, fibra fino all'abitazione | Fibra e borchia ottica, poi ONT esterno o integrato. L'ONT termina il collegamento ottico: da solo non è un router. |
| **FTTC**, fibra fino all'armadio | Fibra fino all'armadio stradale e rame fino a casa; un modem VDSL gestisce il tratto finale. |
| **FWA**, accesso radio fisso | Collegamento radio fra operatore e apparato cliente, detto CPE, esterno o indoor. Non è il Wi-Fi dentro casa. |

Schema semplificato, con funzioni eventualmente integrate nella stessa scatola:

```text
ONT / modem / CPE ⇄ ingresso WAN del router ⇄ LAN ⇄ switch ⇄ PC
                                                 ⇄ AP ⇄ Wi-Fi ⇄ PC
```

Le frecce sono bidirezionali. Sul lato ottico dell'operatore possono esserci apparati OLT, splitter e distribuzione: FTTH non significa assenza di armadi. Oltre l'accesso trovi aggregazione, dorsale o **backbone**, interconnessioni fra reti (**peering**) oppure passaggio attraverso una rete di transito, e infine rete del servizio e server. Il ritorno può seguire un'altra strada.

Disegna la tua catena con modelli e tipo di collegamento, senza password o indirizzi personali. Ti servirà soprattutto per riconoscere le tratte radio nascoste e il confine fra interventi domestici e assistenza ISP.

## 4. Verifica la copertura italiana senza confonderla con un ordine

«Comune coperto», «lavori completati» e «offerta ordinabile al mio civico» non sono sinonimi. Anche edifici vicini possono avere esiti diversi. La parola commerciale «fibra» non basta: controlla se il contratto e la proposta parlano di FTTH, FTTC o FWA.

La verifica ha tre livelli: informazione territoriale, presenza o piano dell'infrastruttura, fattibilità commerciale. Per non sovrapporli:

1. Consulta privatamente [AGCOM Broadbandmap](https://maps.agcom.it/). Leggi data, legenda, tecnologia e dettaglio geografico: una mappa non conferma l'ordine.
2. Controlla [Infratel](https://www.infratelitalia.it/) e [Piano BUL](https://bandaultralarga.italia.it/indirizzo/) per piani e avanzamento. Le coperture previsionali descrivono sviluppi futuri, non una connessione già attivabile [3].
3. Verifica i portali dei gestori di infrastruttura, come [Open Fiber](https://openfiber.it/verifica-copertura/) e [FiberCop](https://www.fibercop.com/verifica-copertura/). Il proprietario della rete può essere diverso da chi emette la bolletta.
4. Usa il verificatore dell'operatore da cui vorresti acquistare. [TIM](https://www.tim.it/fisso-e-mobile/fibra-e-adsl/verifica-copertura) e [Fastweb](https://www.fastweb.it/AVT/) sono esempi di portali, non raccomandazioni commerciali. Controlla tecnologia, profilo, condizioni e fattibilità; per FWA conta anche la verifica radio.

Annota fonte, data, tecnologia, esito e natura «prevista» oppure «ordinabile». In caso di discordanza chiedi una verifica manuale all'operatore, attraverso un canale privato. Non pubblicare civico e unità immobiliare per ottenere consigli.

Nella ricerca archiviata Broadbandmap era in manutenzione e BUL aveva un errore TLS: non è stata disattivata la verifica del certificato. Nessun indirizzo personale è stato interrogato. I messaggi positivi contenuti nei template dei verificatori non sono risultati per un'abitazione specifica. La disponibilità va controllata quando serve davvero.

## 5. Conserva un riferimento prima di toccare la rete

La **baseline** è il riferimento iniziale nelle condizioni annotate. L'inventario aiuta a descriverla, ma non misura da solo la latenza.

Registra tecnologia e profilo contrattuale, router e firmware, switch/AP, modello della scheda di rete (**NIC**), driver e build Windows. Aggiungi alimentazione, VPN, proxy e traffico concorrente. Per Ethernet annota la velocità del link; per Wi-Fi banda, canale, larghezza, nodo e posizione. Una VPN cambia il percorso: se è aziendale, non rimuoverla aggirando le policy.

Non installare cinque strumenti insieme e non scambiare un inventario per una misura. Conserva i valori avanzati originali, perché un contatore cumulativo va letto come incremento fra inizio e fine, non come totale isolato.

In Windows trovi stato e proprietà in Impostazioni di rete e Gestione dispositivi. Questi esempi PowerShell sono in lettura; sostituisci `Ethernet` con il nome effettivo della scheda:

```powershell
# Esempi documentali, non eseguiti per questa guida.
Get-NetAdapter | Select-Object Name, InterfaceDescription, Status, LinkSpeed
Get-NetAdapterStatistics -Name "Ethernet"
Get-NetAdapterAdvancedProperty -Name "Ethernet"
netsh interface tcp show global
```

Salva i valori avanzati originali localmente. I contatori di scarti ed errori possono essere cumulativi: confronta lettura iniziale e finale con la durata, non un totale isolato. Un link a 100 Mbit/s inatteso, con entrambe le porte capaci di 1 Gbit/s, fa controllare prima cavo, coppie e porte. Viceversa, un link a 1 Gbit/s non certifica un canale privo di errori.

Il [pack Diagnostica v4](../discord-revisione-v5/pacchetti/PrimeBuild-Diagnostica-v4.zip) è un'alternativa per leggere adattatori e policy QoS, non per fare benchmark o applicare configurazioni. Le istruzioni e i limiti sono nel [README degli script](../discord-revisione-v5/scripts/README.md). Prima di condividere un inventario elimina identificativi, MAC, IP e nomi non necessari. Se non emerge un problema riproducibile, fermati qui.

## 6. Scegli Ethernet per il requisito, non per la scritta «gaming»

Per un normale collegamento domestico a 1 Gbit/s, un Cat5e conforme e sano è sufficiente. Cat6 è una scelta comune per un nuovo cavetto, ma sostituire un Cat5e funzionante non promette meno ping. La categoria descrive requisiti di trasmissione, non il percorso del provider.

Conta il **canale completo**: cavo fisso, prese, connettori e cavetti di collegamento, detti patch cord. La parte fissa è il **permanent link**. Aumentare la categoria di un solo pezzo non aggiorna automaticamente tutto il sistema [4].

| Collegamento | Indicazione di progetto | Condizioni |
|---|---|---|
| Cat5e/Cat6, 1 Gbit/s | Canale ordinario fino a 100 m | Modello 90 m fissi più 10 m complessivi di patch cord; non 100 m più prolunghe. |
| Cat6, 10 Gbit/s | Spesso riassunto come circa 55 m | L'ambito 37–55 m dipende anche dalla diafonia fra cavi, o alien crosstalk; occorre verificare il canale. Non è una garanzia né una soglia fisica assoluta. |
| Cat6A, 10 Gbit/s | Progetto per canale fino a 100 m | Sistema completo, posa e porte 10G adeguati. Temperatura e cordoni sottili o lunghi possono richiedere riduzioni. |

**Solid** indica un conduttore pieno, tipico del cablaggio fisso; **stranded** indica un conduttore multifilare, più flessibile per i patch cord. Non sono classi di ping. Prese e plug devono essere compatibili con conduttore, diametro, categoria e **AWG**, la misura della sua sezione.

Evita **CCA**, alluminio rivestito di rame venduto come normale cavo di categoria: resistenza e conformità sono problemi concreti, soprattutto con **PoE**, l'alimentazione attraverso Ethernet. Non riconoscere il materiale con raschiature o combustioni. Usa documentazione del produttore e, per una posa fissa, verifica professionale.

Nemmeno la schermatura risolve tutto: richiede un sistema correttamente installato, non messe a terra improvvisate. Cat7/Class F esiste negli standard ISO, ma «Cat7 gaming RJ45» su una confezione non dimostra un canale Class F; GG45 e TERA hanno requisiti propri. Per 10G su normali porte RJ45, Cat6A è la scelta ordinaria [4]. Una porta 1G rimane tale qualunque cavo colleghi.

Prima di acquistare o rifare l'impianto, prova un patch cord assemblato e documentato, poi una porta alternativa, una variabile alla volta. Annota velocità del link, cadute e incrementi degli errori; infine rimetti il collegamento originale per controllare se il difetto ricompare. Non sostituire alla cieca tutti gli elementi.

## 7. T568A e T568B: cambia il colore, non la prestazione

T568A e T568B indicano il collegamento dei colori ai pin del connettore. Hanno la stessa prestazione: scambiano le coppie verde e arancione. Per un cavo diritto, o **straight-through**, usa A–A oppure B–B, rispettando lo schema già presente. A–B incrocia le coppie 1–2 e 3–6, come nel crossover classico 10/100 Mbit/s; molti apparati gestiscono l'incrocio con Auto-MDI-X, ma non è il modello da adottare per un nuovo cavo diritto [5].

Vista del plug dall'alto: contatti dorati visibili, linguetta sotto, cavo verso di te, punta lontana; pin 1 a sinistra.

| Pin | T568A | T568B |
|---|---|---|
| 1 | Bianco/verde | Bianco/arancione |
| 2 | Verde | Arancione |
| 3 | Bianco/arancione | Bianco/verde |
| 4 | Blu | Blu |
| 5 | Bianco/blu | Bianco/blu |
| 6 | Arancione | Verde |
| 7 | Bianco/marrone | Bianco/marrone |
| 8 | Marrone | Marrone |

Le coppie sono **1–2, 3–6, 4–5, 7–8**: la coppia 3–6 non occupa pin adiacenti. Uno **split pair** usa fili di coppie diverse pur conservando la continuità dei singoli conduttori. Un semplice tester LED può non vederlo. Sulle prese modulari, o keystone, segui il codice del produttore: l'ordine dei contatti posteriori non è necessariamente quello del plug. Mantieni la torsione delle coppie vicina alla terminazione, secondo le istruzioni del connettore.

Fluke distingue tre domande [5]: la **verifica** controlla i collegamenti, la **qualificazione** valuta il supporto di una specifica applicazione, la **certificazione** confronta misure con i requisiti di categoria. Otto luci verdi non certificano Cat6A o 10G e non misurano il RTT.

Per un principiante è preferibile un patch cord già assemblato. Per posa fissa, usa cavo adeguato terminato su prese o patch panel da un installatore. Un tester elementare va usato con il cavo scollegato da apparati e PoE, salvo idoneità esplicita del modello. Non aprire impianti elettrici, non fare fori alla cieca e non manipolare la fibra per completare questa prova.

## 8. Wi-Fi: frequenza e larghezza non bastano a scegliere

Le bande **2,4, 5 e 6 GHz** sono intervalli di frequenza radio, non livelli di latenza. A 2,4 GHz il collegamento spesso resiste meglio agli ostacoli, ma convive con molti dispositivi e meno spazio disponibile. A 5 GHz ci sono più opportunità di canali e capacità, a condizione che segnale e interferenze lo permettano. A 6 GHz servono AP e client compatibili Wi-Fi 6E o Wi-Fi 7 e supporto regionale: Wi-Fi 6, senza E, non significa 6 GHz [6].

Il **canale** identifica una porzione della banda radio. La selezione Auto è un riferimento pratico supportato da molti AP; una scelta manuale va confrontata nell'ambiente reale e limitata ai canali ammessi dal firmware per il paese corretto [6]. Non trasferire automaticamente numeri di canale da una guida statunitense a un impianto italiano.

La **larghezza del canale**, in MHz, indica quanto spettro occupa una trasmissione. Più larghezza può aumentare il picco di trasferimento, ma occupa anche più spazio e può peggiorare la coesistenza o la stabilità. A 2,4 GHz, 20 MHz è una base sensata negli ambienti condivisi. A 5/6 GHz parti dalle opzioni supportate dal produttore, spesso Auto; confronta 40, 80 o 160 MHz soltanto quando disponibili. Wi-Fi 7 può offrire 320 MHz a 6 GHz dove consentito. Non sono numeri da imporre a qualsiasi router.

Per una prova utile, scegli la stanza d'uso e conserva posizione e orientamento del PC. Annota banda, canale e larghezza **effettivi**, ostacoli, porte aperte o chiuse e attività degli altri dispositivi. Confronta reattività, disconnessioni e throughput, non soltanto tacche o picco dello speedtest. Cambia una condizione alla volta e ripristinala se peggiora.

Non esiste una distanza universale in metri per ogni banda: muri, solai, metallo, mobili, antenne e client modificano la copertura. Non disattivare cifratura o protezioni per ottenere un numero migliore.

## 9. Cerca la tratta radio che non vedi: DFS, AP e backhaul

Alcuni canali 5 GHz richiedono **DFS**, selezione dinamica della frequenza, per proteggere i radar. L'apparato può attendere prima di trasmettere e abbandonare un canale durante il funzionamento: una pausa o disconnessione può coincidere con quell'evento [7]. Controlla log e canale nell'orario del sintomo. Se il firmware lo consente, un confronto con un canale non-DFS ammesso può chiarire l'ipotesi; conserva e ripristina la scelta iniziale. Non falsificare il paese e non disabilitare le protezioni radar.

Colloca l'AP in un punto aperto e utile alle stanze, non dentro un mobile metallico o nascosto dietro il PC. La posizione della borchia ottica non obbliga a tenere lì anche il Wi-Fi: una tratta Ethernet installata correttamente può portare un AP altrove. Non scegliere la posizione dalle sole tacche viste accanto al router: spostamenti modesti ma confrontati possono dare informazioni più utili.

Una **mesh** coordina più nodi. Il **backhaul** collega un nodo al resto della rete; è distinto dal collegamento del PC a quel nodo:

```text
Router ⇄ Ethernet ⇄ AP        ⇄ Wi-Fi    ⇄ PC
Router ⇄ radio    ⇄ satellite ⇄ Ethernet ⇄ PC
```

Nel secondo caso il PC è cablato soltanto al satellite: resta una tratta radio verso il router. Mettere il satellite nella zona già senza segnale non crea un buon collegamento upstream. Un backhaul Ethernet elimina la contesa radio di quel tratto; una radio dedicata può aiutare, ma non equivale al cavo.

Nell'app o nel pannello controlla nodo servente, tipo di backhaul e **roaming**, il passaggio del client fra AP. Le topologie ammesse e l'uso delle porte dipendono da modalità e modello [7]. La modalità AP/bridge, nel contesto domestico qui descritto, lascia l'instradamento al router principale: non attivarla alla cieca e non creare anelli Ethernet. La FAQ di un produttore non autorizza a disabilitare genericamente la protezione dai loop.

Separare temporaneamente i nomi delle bande, o SSID, può facilitare una diagnosi su alcuni modelli, ma non è obbligatorio; Apple raccomanda un nome comune per compatibilità [6]. Prima di qualsiasi prova salva nomi, modalità e connessioni originali. Se perdi accesso, interrompi e torna attraverso la via locale prevista dal manuale, non con un reset di fabbrica impulsivo.

## 10. NIC e optimizer: una funzione supportata non è un beneficio dimostrato

Identifica la scheda e il driver prima di modificare proprietà. Usa il produttore del PC o della scheda, non un pack generico; conserva versione e possibilità di ritorno. Mantieni normalmente **auto-negotiation**, la negoziazione automatica di velocità e duplex. Forzare valori può rompere il collegamento.

Le proprietà avanzate non sono identiche fra driver. Una voce assente non va inventata nel registro. Le note Microsoft Server spiegano meccanismi e compromessi, non certificano preset gaming per Windows 11 [8].

| Funzione | Che cosa fa | Perché non disattivarla automaticamente |
|---|---|---|
| **RSS**, Receive Side Scaling | Distribuisce l'elaborazione di flussi ricevuti su più CPU, preservando l'ordine del singolo flusso | Disabilitarlo può concentrare il lavoro; non esiste un numero di code valido per ogni PC. |
| **Interrupt moderation** | Raggruppa arrivi prima di notificare la CPU | Riduce interrupt ma può aggiungere attesa; Off può aumentare lavoro CPU. |
| **Checksum offload** | Delega alla scheda calcolo o verifica dei controlli di integrità | Un checksum apparentemente errato in cattura locale può essere un artefatto del punto di osservazione. |
| **LSO / RSC** | Segmentazione di grandi blocchi in invio / aggregazione di segmenti ricevuti | Disabilitarli insieme cambia il costo per pacchetto e confonde la diagnosi. |
| **Buffer RX/TX** | Risorse per ricevere e trasmettere sulla NIC | Troppo piccoli possono causare scarti; non sono le code WAN gestite da SQM. |
| **EEE**, Energy Efficient Ethernet, e risparmio energetico | Funzioni energetiche distinte, dipendenti da hardware e driver | Valuta soltanto una prova coerente con un difetto riproducibile, includendo consumo e stabilità. |

L'autotuning regola la finestra di ricezione **TCP**; Microsoft documenta Normal come riferimento nel contesto Server. Disabled non è una regolazione del ping UDP. MTU e jumbo frame restano ai valori funzionanti senza una diagnosi di incompatibilità. Cambiare DNS può risolvere un problema di risoluzione, non accorcia automaticamente la partita. ACK/Nagle, affinità e «IPv4 Only» non fanno parte del percorso base; firewall, antivirus e VPN obbligatorie non sono sacrificabili.

Se una proprietà è realmente pertinente, salva il valore originale, prova solo quella sul target corretto, rileggi lo stato e confronta sintomo, CPU, throughput e cadute. Alcuni cambi riavviano il link: non farli sulla connessione che sostiene una sessione remota indispensabile. Ripristina il valore esatto, non un generico «default».

### ZapTweaks: separa editor nativo e catalogo legacy

La verifica statica riguarda il commit `f2d190387e21e8aee8a1d0f8818e7792ebfaaf6e` [9]. Il wizard organizza setup e inventario: non ottimizza automaticamente la rete. Il TCP Optimizer nativo è una pagina distinta, che legge template TCP e offload con cmdlet strutturati. Espone autotuning, heuristics, ECN e congestion provider; i template non Custom rimangono in lettura. Nessun valore proposto scopre da solo la configurazione migliore per un gioco.

I percorsi nativi controllano target, privilegi ed esiti del piano. RSS per adattatore usa capability, gruppi/processori, code e stato precedente; non va trasformato in «tutte le NIC su CPU 2». RSC/RSS globali e RSS della singola NIC non sono lo stesso ambito. Per QoS sono verificati EXE, protocollo, porte e DSCP; le policy non possedute restano in lettura. Una policy locale non riserva banda Internet e non configura SQM.

La diagnostica esaminata usa normalmente sei connessioni TCP a un server HTTPS e un download limitato a 10 MiB. «Latency» è tempo di connessione, «jitter» è differenza media fra tempi successivi, «packet loss» è percentuale di tentativi falliti. Non sono RTT ICMP, jitter IP a senso unico o perdita diretta dei datagrammi CS2. Non chiamare pacchetti persi i soli handshake falliti. La baseline mostrata nella pagina non dimostra da sola un confronto causale persistente né un guadagno input→fotone.

Il catalogo legacy ha garanzie differenti. Alcuni launcher sono bloccati, altri oggetti possono raggiungere un fallback quando l'app è già elevata. Low-Latency Profile coinvolge impostazioni globali, template TCP, DHCP e proprietà/binding di adattatori, anche virtuali, con ritorni a valori fissi: può perdere configurazioni IP statiche. Il nome “Low-Latency” non è una garanzia di latenza migliore e non autorizza un'applicazione globale. «IPv4 Only» rimuove binding ulteriori, non cambia soltanto una preferenza. In due rami energia il percorso del backup PowerShell non quotato impedisce di considerare operativo il salvataggio previsto. Il revert non conserva tutte le assenze iniziali: se non ricostruisci lo stato preesistente, non usare un reset collettivo come scorciatoia. Non estendere a questi percorsi il journal nativo e non correggere comandi per eseguirli comunque.

Se usi un editor avanzato, entra prima in lettura. Prima della conferma controlla preview, target, valore precedente e criterio di verifica; dopo, rileggi ogni esito e prova il collegamento. Per il ritorno usa soltanto il piano riconosciuto, quindi verifica lo stato. Un checkpoint offerto non è una precondizione obbligatoria in tutti i rami esaminati; chiudere il programma non annulla le modifiche.

### Sparkle e SockTuner: due limiti diversi

**Sparkle**, commit `c4f5b88c6bfb58468ae3925b49a172e8a5eab398`, applica in «Optimize Network Settings» otto comandi netsh: heuristics, CTCP, RSS, ECN, timestamps, Fast Open, fallback e ICW. Non misura o imposta MTU, non configura esplicitamente checksum/LSO/RSC e non confronta prestazioni. Tocca ambiti globali o template, senza scegliere la NIC del gioco; il messaggio conclusivo non verifica ogni comando. Unapply impone valori fissi/default, non recupera quelli precedenti. Recommended include rete e servizi: deselezionali se usi l'app per altro. Il reset DNS torna ad automatico e può perdere DNS statici anche su adapter virtuali; Network Reset non è un rollback preciso. Le funzioni separate su HVCI, Defender e BitLocker non vanno usate come baseline di latenza [9].

**SockTuner**, commit `24a8bb34f1a62c2498cbc6b9de1d33b858f5dede`, è una versione alpha per la diagnostica. Offre inventario, diagnostica Wi-Fi, capability, preview e target per GUID, l'identificatore dell'adattatore. Nel percorso NIC ci sono stato atteso e rilettura, ma alcune proposte vengono scartate prima della preview e diversi percorsi globali/DNS/QoS/IRQ sono respinti dal worker. Il backend presente non prova una funzione GUI operativa. Alcune proposte vengono abbinate per proprietà senza preservare il target originario: ricontrolla la NIC nella preview. Le istruzioni SQM non configurano il router. Il ritorno mirato è più utile di un preset inverso, ma crash, scritture parziali, cronologia e riavvio del link restano limiti; non promette recupero totale [9].

Puoi usare gli inventari per orientarti, limitando i dati nei report che contengono SSID/BSSID e identificativi. Non aggirare funzioni bloccate copiando comandi. Questa è una verifica di porzioni selezionate del codice sorgente, non un audit completo di sicurezza né un collaudo degli EXE o delle release future. Nessuno dei tre programmi è necessario per misurare la connessione.

## 11. Usa ping e Test-NetConnection per domande precise

Prima di inviare sonde, individua in `ipconfig` il gateway dell'interfaccia che vuoi osservare, non quello della prima scheda elencata. Con più NIC o una VPN, il percorso scelto da Windows può essere diverso: annota interfaccia e famiglia IP effettive; non rimuovere VPN obbligatorie per forzare il confronto. Non pubblicare l'output integrale. Scegli una destinazione remota per cui il test sia consentito: un servizio che non espone un endpoint testabile si osserva attraverso le statistiche in-app, affiancando eventualmente un riferimento separato e dichiarando che i percorsi sono diversi.

Concorda il momento delle prove e sospendi soltanto i tuoi trasferimenti non necessari. Non interrompere lavoro o chiamate altrui. Questi sono modelli di comandi, non risultati:

```text
ipconfig
ping -n 60 IP_GATEWAY
ping -n 60 HOST_AUTORIZZATO
```

Sostituisci i segnaposto con target autorizzati. Il campione da 60 sonde è introduttivo, non una durata universale. Registra data e ora, IPv4/IPv6, inviati e ricevuti, timeout, minimo, media e massimo. Anche dimensione dei dati e timeout contano: ping Windows usa normalmente 32 byte di dati e un timeout predefinito; se li cambi, documentalo [1]. Il riepilogo dei tempi riguarda le risposte ricevute: i timeout non sono RTT pari a zero. Un valore mostrato come `<1 ms` non è una misura esatta di zero; l'output non giustifica confronti al decimo di millisecondo. Per interrompere usa Ctrl+C.

Zero risposte mancanti in un campione breve non esclude eventi rari. Un timeout può essere un filtro; il gateway può limitare ICMP. Gateway stabile e remoto instabile orientano un approfondimento oltre la LAN, senza localizzare il difetto.

Per verificare una **porta TCP documentata**, PowerShell offre [10]:

```powershell
# 443 soltanto se il gestore documenta quel servizio HTTPS.
Test-NetConnection -ComputerName "HOST_AUTORIZZATO" -Port 443 -InformationLevel Detailed
```

Leggi nome risolto, indirizzo remoto, interfaccia e `TcpTestSucceeded`. Quest'ultimo indica raggiungibilità TCP, non throughput, jitter UDP o qualità del gioco. Se un nome fallisce e l'IP corretto funziona, la risoluzione merita attenzione; non cambiare DNS soltanto perché una sessione è lenta. Non servono scansioni di porte, intere subnet o ping flood.

## 12. Leggi un percorso senza inventare il punto guasto

Un **hop** è un passaggio attraverso un router. `tracert` usa sonde con **TTL** crescente: il TTL limita i passaggi del pacchetto. `pathping` aggiunge sonde ripetute e statistiche, e può richiedere minuti [11].

```text
# Modelli: stessa destinazione autorizzata, non eseguiti.
tracert -d HOST_AUTORIZZATO
pathping -n HOST_AUTORIZZATO
```

Le opzioni evitano la risoluzione dei nomi degli hop. Attendi il riepilogo oppure interrompi con Ctrl+C; non avviare molte copie. Quello che vedi è una parte del percorso, non tutte le scatole né una geografia certa degli IP.

La regola più importante è questa: **un hop che risponde poco, seguito da una destinazione sana, non dimostra perdita end-to-end**. Rispondere a una sonda e inoltrare il traffico sono lavori diversi; un router può limitare ICMP senza bloccare il gioco.

**ESEMPIO DIDATTICO — NON BENCHMARK, NON DATI DEL TUO PC:** se una riga intermedia mostra risposte mancanti e la destinazione no, non chiamarla guasto di inoltro. Se l'anomalia compare e resta fino alla destinazione, hai un indizio più significativo, da correlare con l'applicazione: ancora non una prova certa del punto responsabile. Anche il server può limitare le sonde.

Non sommare i RTT delle righe e non sottrarli per calcolare il ritardo esatto di una tratta. Ritorni asimmetrici, bilanciamento e timeout limitano questa lettura. Un asterisco (`*`) in `tracert` indica che quella sonda non ha ricevuto risposta entro il timeout: non prova che il router abbia perso il traffico inoltrato. MTR combina percorso e sonde, ma non è preinstallato in Windows: non scaricare omonimi casuali e non installare un ambiente Linux soltanto per finire la guida. Asterischi e cambi di percorso, da soli, non diagnosticano «la cabina».

## 13. Confronta riposo, download e upload

Una prova sotto carico risponde alla domanda «la connessione resta reattiva mentre trasferisce dati?». Può saturare la linea, consumare traffico a pagamento e disturbare chiamate o lavoro. Scegli un momento concordato, mantieni la scheda del browser visibile e registra browser, VPN, collegamento, host e traffico concorrente.

[LibreQoS Internet Quality Test](https://test.libreqos.com/) documenta una sequenza con riferimento a riposo, calibrazione download, download, calibrazione upload, upload, fase bidirezionale e recupero [12]. Ripeti, per esempio, tre volte nelle stesse condizioni come piccolo protocollo introduttivo, non come garanzia statistica. Conserva risultati di tutte le prove, non il migliore.

Nella metodologia archiviata:

- la latenza sotto carico è riassunta anche come **p95**, il percentile sotto cui cade il 95% dei campioni;
- il voto bufferbloat usa invece **p90 loaded meno p5 idle**, valuta separatamente download/upload e prende il peggiore;
- la fase bidirezionale è diagnostica e non entra nel voto;
- la perdita deriva da round di sonde falliti, non dal conteggio universale dei datagrammi del gioco.

Non sono definizioni intercambiabili. La metodologia filtra e aggrega sonde: il percentile riguarda quei campioni, non ogni pacchetto trasportato dalla linea. Un voto «gaming» è un modello dello strumento, non il collaudo del tuo titolo.

[Waveform](https://www.waveform.com/tools/bufferbloat) è un'alternativa citata anche da OpenWrt. Nella ricerca archiviata l'accesso diretto restituiva 403: formula, backend, UI e privacy correnti non sono stati verificati. Non trasferire a Waveform i percentili di LibreQoS o confrontare lettere prodotte da metodi diversi.

Salva il RTT a riposo e sotto carico, distinguendo download e upload, il throughput, la perdita e il jitter con le rispettive definizioni, e host/versione quando disponibili. Se un campo manca, scrivi «n/d». Il browser è il client: il risultato comprende PC, radio/LAN, ISP, percorso e server. Più host possono contribuire al carico; non è una misura di «tutta Internet». La CLI LibreQoS documentata è Linux e invia risultati alle classifiche per default, con opzione di esclusione: non serve per il percorso base. Controlla privacy e pubblicazione prima di qualsiasi test; non eseguire installer remoti alla cieca.

## 14. Capisci quale coda può controllare SQM

Un **collo di bottiglia** è il tratto la cui capacità limita il trasferimento. Se i dati arrivano più rapidamente di quanto possano uscire, attendono in coda. **Bufferbloat** indica l'aumento indesiderato del ritardo dovuto a code eccessive sotto carico. Un RTT alto già a riposo può invece dipendere da distanza o percorso.

I nomi dei menu non bastano per sapere come un router gestisce il traffico:

| Meccanismo | Compito |
|---|---|
| **QoS** | Può assegnare priorità a classi di traffico. |
| **AQM**, Active Queue Management | Gestisce attivamente le code. |
| **Fair queueing** | Separa flussi per condividere meglio il servizio. |
| **Shaping** | Limita il rate per rendere controllabile il collo di bottiglia. |

**SQM**, Smart Queue Management, combina più di questi meccanismi. **fq_codel** è accodamento/AQM, non uno shaper autonomo: sqm-scripts lo abbina a un limitatore, per esempio HTB. **CAKE** integra shaping, code e fairness [13]. «Gaming QoS» non garantisce la presenza di tutto questo.

Prima di comprare un router, puoi confrontare lo stesso scenario limitando temporaneamente l'upload della tua applicazione cloud e poi rimettendo il limite originale. Se torna reattivo, emerge un indizio di code sotto carico, non la loro localizzazione certa.

SQM controlla le code raggiungibili. In download non ritira pacchetti già accodati dall'ISP: può rendere controllabile un collo di bottiglia e far reagire i trasporti, ma capacità variabile e traffico non responsivo complicano il lavoro. Non elimina distanza, server lento o congestione esterna al suo ambito.

## 15. Calibra SQM su OpenWrt, senza trasformare la guida in un flash

La procedura riguarda **un router OpenWrt già supportato, installato e funzionante** [13]. Non richiede di cambiare firmware. Su altri router verifica manuale e capacità reali del modello.

Prima di intervenire servono autorizzazione di chi gestisce la rete, accesso locale via LAN e una finestra senza attività critiche. Salva il backup del router e le impostazioni di SQM, interfacce e offload. Un backup può contenere segreti: custodiscilo privatamente e prepara il recupero previsto dalla release.

1. **Misura il riferimento via cavo.** Annota la capacità sostenibile down/up, non il massimo pubblicitario. Se SQM esiste già, conserva tutti i valori prima di una prova senza di esso: non sovrapporre shaper.
2. **Identifica la WAN reale.** In LuCI, il pannello web, consulta Network → Interfaces e il manuale della release. Il nome non è necessariamente `eth0`; PPPoE può usare un'interfaccia logica. Non cambiare credenziali, VLAN o profili ISP.
3. **Controlla i pacchetti.** Se manca Network → SQM QoS, verifica `luci-app-sqm` e dipendenze nel gestore ufficiale della release. Un'eventuale installazione va pianificata con backup: niente script di sviluppo o firmware casuali.
4. **Imposta Basic Settings.** Seleziona l'interfaccia verificata, abilita la configurazione di prova con **Enable** e inserisci down/up in **kbit/s**. Circa il 90% della capacità misurata è un avvio da calibrare, non un valore garantito; una FWA variabile può richiedere più margine.
5. **Scegli disciplina e script compatibili.** Per una prima prova documentata, `cake` con `piece_of_cake.qos`, se disponibili, lasciando invariati i parametri avanzati. Se valuti fq_codel per un limite CPU, serve uno script con shaper appropriato, non `piece_of_cake.qos`, che richiede CAKE.
6. **Verifica Link Layer Adaptation.** Tecnologia e incapsulamento cambiano la contabilità: Ethernet/fibra, PPPoE, VLAN, VDSL PTM e ADSL ATM non sono equivalenti. L'**overhead** indica i byte aggiuntivi per pacchetto; **MPU** è la dimensione minima conteggiata. Usa dati ISP e tabella della documentazione pertinente alla versione. Se mancano, chiedi supporto: non copiare un numero unico per ogni «fibra».
7. **Applica e osserva.** Ripeti lo stesso test, controllando RTT sotto carico, throughput, errori, CPU del router anche per singolo core quando disponibile e contatori delle code. Un menu abilitato non prova che il traffico le attraversi; contatori fermi durante il carico atteso fanno ricontrollare interfaccia e percorso.
8. **Regola una direzione per volta.** Se le code restano, riduci un rate; se il controllo è stabile, aumentalo gradualmente, tornando al valore precedente quando ricompare il peggioramento. Registra ogni passaggio e verifica il sintomo reale.

**ESEMPIO DIDATTICO — NON BENCHMARK, NON DATI DEL TUO PC:** una capacità sostenibile ipotetica di 100/20 Mbit/s dà, al 90%, una prima prova di 90.000/18.000 kbit/s. Non copiarla su una linea chiamata «100 mega»: misure e overhead cambiano il rate utile.

L'offload del router non è quello della NIC Windows. La fonte OpenWrt archiviata indica **hardware flow offloading incompatibile con SQM** e software flow offloading utilizzabile. Verifica release e target; se disabiliti hardware flow offloading, salva prima lo stato e considera il costo CPU. Non spegnere tutte le accelerazioni insieme. A velocità gigabit e oltre, la CPU può limitare SQM prima della porta; funzioni multi-queue non sono disponibili ovunque.

Interrompi per disconnessioni, errori o un calo sproporzionato. Meno throughput può essere il compromesso intenzionale dello shaping, ma non qualsiasi regressione è accettabile solo perché migliora il voto espresso con una lettera. Per tornare indietro ripristina configurazione SQM, stato Enable e offload originali: se hai creato una nuova configurazione, disabilita soltanto quella; se hai modificato SQM già attivo, rimetti i suoi valori e il suo stato precedente. Verifica accesso e carico originale. Non cancellare la WAN e non usare il reset di fabbrica come primo rollback.

## 16. Fai un confronto A–B–A che risponda alla tua domanda

**A** è lo stato iniziale; **B** cambia una sola condizione; il secondo **A** controlla il ritorno. Ripeti più prove per ciascuno stato, mantenendo PC, postazione, cavo, endpoint, browser, famiglia IP, durata e carico. Un cambio contemporaneo di driver, canale e SQM non permette di attribuire il risultato.

Confrontare mattina e sera serve a indagare la congestione per fascia oraria: è una domanda diversa da «questa proprietà NIC migliora la rete?». Anche un A–B–A può essere disturbato da un cambio di server o dal traffico esterno; annota questi limiti invece di nasconderli.

Scheda da compilare con dati reali, non risultati predefiniti:

```text
Data, ora e fuso:
PC / Windows / NIC / driver; router / firmware; accesso:
Ethernet: velocità link; oppure Wi-Fi: banda, canale, larghezza, nodo, backhaul:
Postazione, VPN/proxy, alimentazione e traffico concorrente:
Tool e versione; host, protocollo, IPv4/IPv6; durata e campioni:
A / B / ritorno A; unica modifica; valore originale e valore provato:
RTT idle e loaded down/up, con nome della statistica:
Perdita: definizione e timeout; jitter: definizione; throughput down/up:
CPU, errori, stabilità e sintomo percepito:
Ripetizioni, risultato, ripristino verificato e decisione:
```

Mediana e percentili aiutano quando sono calcolabili dai campioni; non ricostruirli da minimo/media/massimo. Una piccola differenza può essere rumore. Classifica l'esito come ripetibile, indeterminato o peggiorativo, tenendo conto dei costi e del problema iniziale. Se B non aiuta, rimetti il valore esatto: «default» non significa necessariamente «com'era prima». Anche un risultato nullo va conservato.

## 17. Localizza un'ipotesi con almeno due evidenze

La diagnosi diventa più utile quando osservazioni indipendenti convergono. Problemi presenti soltanto in Wi-Fi, con Ethernet stabile, orientano verso radio, roaming o backhaul. Link che cade insieme a incrementi dei contatori NIC orienta verso cavo, porta, driver o alimentazione. Ritardo durante upload proprio, ridotto limitando quell'applicazione, orienta verso code sotto carico; controlla anche CPU del router.

Se LAN/gateway sono stabili, il traffico domestico è contenuto e più destinazioni remote peggiorano nelle ore di punta, considera accesso, aggregazione o interconnessione ISP. Quando il servizio è utilizzabile, raccogli alcuni giorni con una fascia tranquilla e una problematica, mantenendo condizioni comparabili. Una sola destinazione anomala porta invece a considerare servizio, server e percorso specifico.

Una VPN cambia percorso ma aggiunge dipendenze e costi. Un risultato diverso non prova definitivamente la colpa del provider e non la rende una cura universale.

In FTTC contano lunghezza e qualità del rame, giunti, diafonia e profilo; in FTTH un difetto ottico può causare errori o cadute. Puoi annotare in lettura sincronizzazione e log DSL, allarmi **LOS** dell'ONT, cioè perdita del segnale ottico, e disconnessioni del router, se il manuale li espone. Non interpretare potenza ottica senza specifiche, stimare distanze a occhio o aprire borchie e armadi. Il PC non ripara rame o fibra e non dimensiona il backbone.

## 18. Riserva le catture a una domanda precisa

Una **cattura** registra pacchetti o eventi del percorso locale. Serve quando le prove semplici non bastano e qualcuno competente può interpretarla, non come rito iniziale.

Wireshark richiede su Windows un driver appropriato, normalmente Npcap. PktMon è integrato e può richiedere privilegi elevati [14]. Prima di acquisire concorda scopo, interfaccia, endpoint/protocollo, filtro, durata, limite del file e arresto. Non catturare traffico altrui o usare monitor mode per completare questa guida.

In Wireshark un **filtro di visualizzazione** nasconde righe ma non elimina dati dal file. Per minimizzare all'origine servono filtri di cattura e opzioni di stop/rotazione. In PktMon consulta l'help della build, verifica filtri preesistenti e componenti, prepara un limite o una modalità circolare e controlla i contatori. La raccolta termina esplicitamente con `pktmon stop`; conversione e sintassi dipendono dalla versione. Non rimuovere globalmente filtri e non azzerare uno stato sconosciuto. Qui non è proposta una sequenza di cattura non collaudata da copiare.

L'interpretazione richiede il punto di osservazione. Checksum apparentemente errati nei pacchetti trasmessi localmente possono precedere il calcolo effettuato dalla scheda; segmentazione e RSC cambiano l'aspetto dei dati. PktMon può registrare più snapshot dello stesso pacchetto in componenti diversi: non contarli come ritrasmissioni. Anche «TCP Retransmission» in Wireshark è un indizio, influenzato da visibilità incompleta e perdita nella cattura, non una diagnosi automatica della tratta ISP [14].

PCAP ed ETL possono esporre IP, MAC, nomi, DNS, tempi, contenuti e token. Cifratura non significa anonimato; oscurare uno screenshot non anonimizza il file originale. Per una richiesta pubblica usa un riepilogo minimizzato. Invia i file completi soltanto a un supporto fidato, privatamente e con modalità di conservazione concordate; niente chiavi TLS o catture nei pack pubblici.

## 19. Trasforma le osservazioni in una segnalazione ISP

Apri un ticket se l'accesso cade, perdita o disconnessioni persistono anche via cavo, oppure un peggioramento remoto ricorre in fasce documentate. Per un guasto grave non rinviare l'assistenza aspettando un diario perfetto.

Un ticket utile raccoglie confronti, non soltanto lo screenshot peggiore. Se possibile aggiungi altro cavo/porta, altro dispositivo e due destinazioni indipendenti. Il solo ping al gateway non assolve il router sotto carico. Chiedi verifica dell'accesso, di errori/sincronizzazione dove pertinenti e dell'eventuale congestione o instradamento; non indicare il primo hop silenzioso come colpevole certo. Un ticket con orari e log coerenti vale più di un generico “cabina fix”; una riparazione in cabina non sostituisce la verifica della causa.

**Modello per canale privato, da completare con osservazioni reali:**

> Segnalo [sintomo] nei giorni [date] e nelle fasce [orari/fuso]. Accesso [FTTH/FTTC/FWA], profilo [contratto], router [modello/firmware]. PC via Ethernet [velocità link]; traffico concorrente e VPN [condizioni]. Allego riepilogo [endpoint, protocollo, durata/campioni, RTT e risposte mancanti, riposo/carico], confronto [fascia tranquilla o destinazione alternativa] e log [se disponibili]. Wi-Fi valutato separatamente. Chiedo verifica dell'accesso e dell'eventuale congestione/instradamento: dai soli hop non posso localizzare il guasto. Segnalazione precedente [numero, se presente].

Conserva numero ticket, risposte e date. Se occorre, usa reclamo e canali previsti dal contratto. Cambiare provider può cambiare percorso, ma non garantisce di risolvere ogni problema su qualsiasi infrastruttura.

[AGCOM MisuraInternet](https://misurainternet.it/) distingue speedtest informale e misura certificata **Ne.Me.Sys.** [15]. Prima della misura certificata controlla requisiti, condizioni, parametri contrattuali e procedura vigenti. Ping, speedtest e voto A+ non la sostituiscono; non promette certificazione del jitter verso qualsiasi gioco. Indirizzo e dati contrattuali vanno soltanto nei canali ufficiali dell'operatore; password WAN, seriali ONT e PCAP completi non sono allegati ordinari.

## 20. Decidi che cosa tenere e dove fermarti

Alla fine devi poter ricostruire una catena di ragionamento: sintomo → collegamento reale → riferimento → prova pertinente → interpretazione → decisione. Non devi aver applicato tutti i menu disponibili.

- Hai distinto rete, frame e server, e annotato luogo, ora e attività scatenante?
- Sai quali tratti sono cablati e quali radio, compreso il backhaul?
- Hai separato copertura prevista, infrastruttura e servizio ordinabile?
- Hai conservato valori originali, inventario e condizioni delle prove?
- Hai controllato link e, quando possibile, confrontato Ethernet e Wi-Fi?
- Hai distinto riposo, download e upload, con host e metodo dichiarati?
- Hai evitato di trattare un hop silenzioso, un test TCP o una lettera web come verdetto sul gioco?
- Hai provato una sola modifica, incluso i costi e verificato il ritorno?
- Hai evitato preset invasivi e stime visive scambiate per misure?
- Hai preparato un riepilogo privato per l'ISP se il problema rimane?

«Non cambiare nulla» è una decisione valida. Nessun Cat7, schema T568B, DNS o gaming router garantisce una latenza minore. Per il metodo generale di confronto puoi approfondire [Misure e verifica](12-misure-verifica.md); i parametri di scheduler e interrupt sono spiegati in [Parametri Windows](11-parametri-windows.md), ma non sono passaggi obbligatori di rete.

Il confine di sicurezza resta concreto: niente lavori in quota, impianti elettrici, fori senza verifica, antenne esterne o armadi pubblici. Non guardare nei connettori ottici e non tirare o piegare la fibra. I cavi temporanei non devono creare inciampi. Posa fissa, separazioni, requisiti antincendio e certificazione spettano a personale qualificato; WAN, seriali e profili ISP non si cambiano per inseguire il ping.

## Fonti e limiti documentali

Le fonti sostengono i meccanismi e le procedure nei rispettivi ambiti, non un benchmark del tuo PC. Le note Fluke includono riferimenti storici e non sostituiscono le norme complete IEEE/TIA/ISO. Apple e TP-Link descrivono anche ecosistemi propri; le note Microsoft Server non sono preset desktop. I sorgenti dei tool sono riferiti ai commit indicati, non a tutte le release binarie.

1. Microsoft, [ping](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/ping).
2. IETF, [RFC 3393: IP Packet Delay Variation Metric](https://www.rfc-editor.org/rfc/rfc3393), riferimento per distinguere IPDV e variabilità RTT.
3. Infratel, [La nuova mappatura delle reti fisse e mobili](https://www.infratelitalia.it/archivio-news/notizie/la-nuova-mappatura-delle-reti-fisse-e-mobili). I portali di verifica sono collegati nella sezione 4, con i limiti di accesso della ricerca.
4. Fluke Networks: [solid/stranded e canale](https://www.flukenetworks.com/blog/cabling-chronicles/considerations-choosing-stranded-vs-solid-cable), [10GBASE-T](https://www.flukenetworks.com/knowledge-base/applicationstandards-articles-copper/10gbase-t-field-testing-requirements), [CCA](https://www.flukenetworks.com/content/application-note-copper-clad-aluminum-cables), [Category 7](https://www.flukenetworks.com/blog/cabling-chronicles/what-ever-happened-category-7), [1000BASE-T e quattro coppie](https://www.flukenetworks.com/knowledge-base/application-or-standards-articles-copper/1000base-t-over-category-5).
5. Fluke Networks: [T568A/T568B](https://www.flukenetworks.com/knowledge-base/application-or-standards-articles-copper/differences-between-wiring-codes-t568a-vs), [terminazioni](https://www.flukenetworks.com/knowledge-base/applicationstandards-articles-copper/terminating-category-6-5e-and-5-connector), [verifica, qualificazione, certificazione](https://www.flukenetworks.com/blog/cabling-chronicles/verification-qualification-certification-which-do-i-need).
6. Apple: [impostazioni router/AP](https://support.apple.com/en-us/102766), [compatibilità 6E e 7](https://support.apple.com/en-us/102285).
7. TP-Link: [DFS](https://www.tp-link.com/us/support/faq/763/), [posizione Deco](https://www.tp-link.com/us/support/faq/1446/), [backhaul e topologie](https://www.tp-link.com/us/support/faq/1794/). Non sono tabelle normative italiane di canali o potenze.
8. Microsoft: [tuning NIC e autotuning, ambito Server](https://learn.microsoft.com/en-us/windows-server/networking/technologies/network-subsystem/net-sub-performance-tuning-nics), [RSS](https://learn.microsoft.com/en-us/windows-hardware/drivers/network/introduction-to-receive-side-scaling), [interrupt moderation](https://learn.microsoft.com/en-us/windows-hardware/drivers/network/interrupt-moderation).
9. Sorgenti fissati: ZapTweaks [diagnostica](https://github.com/PrimeBuild-pc/ZapTweaks/blob/f2d190387e21e8aee8a1d0f8818e7792ebfaaf6e/lib/platform/windows/network_diagnostics_service.dart), [Plan Engine](https://github.com/PrimeBuild-pc/ZapTweaks/blob/f2d190387e21e8aee8a1d0f8818e7792ebfaaf6e/lib/core/plans/plan_engine.dart), [rete legacy](https://github.com/PrimeBuild-pc/ZapTweaks/blob/f2d190387e21e8aee8a1d0f8818e7792ebfaaf6e/lib/models/networking_tweaks.dart); Sparkle [Apply](https://github.com/thedogecraft/sparkle/blob/c4f5b88c6bfb58468ae3925b49a172e8a5eab398/tweaks/optimize-network-settings/apply.ps1) e [Unapply](https://github.com/thedogecraft/sparkle/blob/c4f5b88c6bfb58468ae3925b49a172e8a5eab398/tweaks/optimize-network-settings/unapply.ps1); SockTuner [worker](https://github.com/PrimeBuild-pc/SockTuner/blob/24a8bb34f1a62c2498cbc6b9de1d33b858f5dede/src/SockTuner/Services/ElevatedWorker.cs) e [preview/proposte](https://github.com/PrimeBuild-pc/SockTuner/blob/24a8bb34f1a62c2498cbc6b9de1d33b858f5dede/src/SockTuner/Views/TuningPlanView.xaml.cs). La verifica statica estesa del progetto è in [Verifica tool rete V3](../analisi/VERIFICA-TOOL-PRIMEBUILD-RETE-V3.md).
10. Microsoft, [Test-NetConnection](https://learn.microsoft.com/en-us/powershell/module/nettcpip/test-netconnection).
11. Microsoft, [tracert](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/tracert) e [pathping](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/pathping).
12. LibreQoS, [metodologia](https://test.libreqos.com/methodology/) e [ambito/privacy CLI](https://test.libreqos.com/cli/). Formule riferite alla copia archiviata, non garantite per future revisioni del servizio.
13. OpenWrt: [SQM](https://openwrt.org/docs/guide-user/network/traffic-shaping/sqm?do=export_raw), [configurazione](https://openwrt.org/docs/guide-user/network/traffic-shaping/sqm_configuration?do=export_raw), [dettagli e overhead](https://openwrt.org/docs/guide-user/network/traffic-shaping/sqm-details?do=export_raw); upstream [sqm-scripts](https://github.com/tohojo/sqm-scripts); IETF [RFC 8290, FQ-CoDel](https://www.rfc-editor.org/rfc/rfc8290).
14. Wireshark, [opzioni di cattura](https://www.wireshark.org/docs/wsug_html_chunked/ChCapCaptureOptions.html) e [checksum/offload](https://www.wireshark.org/docs/wsug_html_chunked/ChAdvChecksums.html); Microsoft, [sintassi PktMon](https://learn.microsoft.com/en-us/windows-server/networking/technologies/pktmon/pktmon-syntax).
15. AGCOM, [MisuraInternet](https://misurainternet.it/): ingresso al servizio, non verifica della procedura certificata su una linea personale.

Questo testo non risolve i collaudi hardware, il recupero reale delle configurazioni né i permessi delle figure della consegna precedente. Non incorpora nuove immagini e non costituisce autorizzazione alla pubblicazione.
