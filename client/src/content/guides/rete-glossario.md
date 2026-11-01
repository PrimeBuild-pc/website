## Glossario: le parole che tornano

Qui trovi prima un'immagine concreta, poi la definizione tecnica. Le similitudini servono a fissare l'idea, ma la definizione è quella che vale quando devi scegliere un'impostazione. Le voci sono raggruppate idealmente in tre famiglie: indirizzi e servizi (NAT, port forwarding, UPnP, DHCP, reverse proxy), tempi e code (ping, jitter, packet burst, bufferbloat, QoS/SQM), contorno (DMZ, gateway, DNS).

<details class="guide-term">
<summary><strong>NAT — Network Address Translation</strong></summary>

**In pratica.** Immagina un condominio con un solo numero di telefono pubblico e un centralino. Ogni appartamento ha un numero interno; il centralino smista le chiamate in uscita e ricorda chi ha chiamato chi, così le risposte tornano all'appartamento giusto. Dall'esterno, però, senza una regola il centralino non sa a quale appartamento consegnare una chiamata non richiesta.

**In termini tecnici.** Il NAT riscrive indirizzi IP e, nella forma più comune, porte di trasporto mentre i pacchetti attraversano il router. I dispositivi interni usano indirizzi privati; il router li traduce in uno o più indirizzi pubblici e mantiene una tabella di stato per la traduzione inversa. Si parla di **SNAT** quando cambia l'indirizzo sorgente, tipico del traffico in uscita; di **DNAT** quando cambia l'indirizzo di destinazione, tipico del port forwarding; di **PAT/NAPT** quando molti dispositivi condividono un solo IP pubblico usando porte diverse. Il NAT non è un firewall: il fatto che dall'esterno non arrivino connessioni non richieste dipende dall'assenza di una mappatura, non da una regola di sicurezza.

**Le varianti che senti nominare.** Per capire i nomi «cone» e «symmetric» servono due parole: la **mappatura** è il numero esterno che il NAT assegna a un dispositivo; il **filtro** è la regola che decide quali pacchetti in ingresso possono usare quella mappatura.

- **NAT statico.** Una mappatura uno-a-uno fissa, spesso usata per esporre un server. «Statico» descrive la persistenza, non il comportamento del filtro.
- **NAT dinamico.** Le mappature vengono create al bisogno, spesso da un pool di indirizzi pubblici, e scadono.
- **PAT/NAPT.** È il NAT del router domestico: molti indirizzi privati dietro un solo IP pubblico, distinti dalle porte. Quando in casa dici «NAT», quasi sempre intendi questo.
- **Full Cone NAT.** Metafora: il centralino apre una linea per l'appartamento e poi lascia passare chiunque conosca il numero esterno. In termini tecnici: mappatura indipendente dalla destinazione (**EIM**, endpoint-independent mapping) e filtro indipendente dalla destinazione (**EIF**, endpoint-independent filtering). Una volta creata la mappatura, un host esterno può inviare pacchetti a quell'indirizzo:porta esterno.
- **Restricted Cone NAT.** Metafora: lascia passare solo le persone che l'appartamento ha già chiamato, da qualunque numero della loro azienda. In termini tecnici: **EIM** e filtro dipendente dall'indirizzo di origine (**ADF**, address-dependent filtering). Il traffico in ingresso è ammesso solo dagli IP a cui l'host interno ha già inviato qualcosa.
- **Port Restricted Cone NAT.** Metafora: lascia passare solo la persona esatta e il numero esatto che l'appartamento ha chiamato. In termini tecnici: **EIM** e filtro dipendente da indirizzo e porta di origine (**APDF**, address-and-port-dependent filtering). Serve aver contattato prima quello specifico IP:porta.
- **Symmetric NAT.** Metafora: il centralino assegna un numero esterno diverso per ogni persona chiamata; chi non è stato chiamato non sa quale numero usare. In termini tecnici: mappatura dipendente dalla destinazione (**ADM**, address-dependent mapping), spesso con filtro **APDF**. Per ogni destinazione può esserci una porta esterna diversa, quindi il peer-to-peer e le connessioni in ingresso sono più difficili.
- **CGNAT / NAT444.** Non è un tipo di filtro, ma un NAT gestito dal provider: il router di casa fa NAT verso un indirizzo privato o condiviso, e l'operatore fa un secondo NAT verso Internet. Il port forwarding può non funzionare perché l'indirizzo pubblico non è tuo; servono un IP pubblico dedicato, PCP o un tunnel/VPN.
- **Doppio NAT.** Due router che traducono in cascata, per esempio modem/router dell'operatore più router personale. Le mappature possono essere create due volte e il port forwarding diventa più fragile. La soluzione ordinaria è mettere un apparato in bridge o il secondo in modalità access point, se supportato; il DMZ del primo router verso il secondo è un workaround, non una soluzione pulita.

**Una nota sui nomi.** «Cone» e «symmetric» vengono dai test di comportamento NAT usati da STUN e dai giochi; la terminologia più recente della RFC 4787 parla di comportamento di mappatura (EIM/ADM) e di filtro (EIF/ADF/APDF). Le console usano spesso **Open / Moderate / Strict**: sono etichette commerciali che riassumono questi comportamenti, non una classificazione universale. «Full Cone» non è automaticamente meglio: riduce l'isolamento e va attivato solo se serve.

**Differenza e quando usarlo.** Il NAT traduce indirizzi e porte; il port forwarding è una regola DNAT che crea un passaggio in ingresso. Lascia il NAT attivo in una normale rete IPv4 e non disattivarlo per inseguire il ping. Se il router offre «Full Cone NAT», può aiutare console e P2P, ma espone di più: provalo solo con un problema documentato e ripristina se non serve. Con CGNAT o doppio NAT, il port forwarding può richiedere una configurazione a monte, non solo una regola nel router.

</details>

<details class="guide-term">
<summary><strong>Port forwarding — inoltro di porta</strong></summary>

**In pratica.** È come dare un'istruzione al portiere: «chi bussa alla porta 443 deve andare all'appartamento del server web, non a quello del PC». Il portiere non apre tutto il palazzo: apre solo quella porta e solo verso quell'appartamento.

**In termini tecnici.** È una regola **DNAT**: i pacchetti che arrivano dall'esterno su una porta dell'indirizzo pubblico vengono inoltrati a un preciso indirizzo IP interno e a una porta interna. La regola è statica, cioè resta finché non la rimuovi, e riguarda solo il traffico in ingresso su quella porta.

**Differenza e quando usarlo.** Il port forwarding è manuale e mirato; **UPnP** crea regole automaticamente; il **DMZ** inoltra tutte o quasi tutte le porte a un solo dispositivo. Esiste anche il **port triggering**, che apre una porta solo dopo un traffico in uscita su una porta «trigger»: è più temporaneo, ma non è equivalente al forwarding. Usa il forwarding solo per porte documentate, con IP interno fisso o prenotato via DHCP, autenticazione e aggiornamenti. Per un accesso privato preferisci una VPN. Non esporre RDP, SMB, pannelli di amministrazione o porte di test.

</details>

<details class="guide-term">
<summary><strong>UPnP — Universal Plug and Play</strong></summary>

**In pratica.** È come un citofono che si apre da solo quando un elettrodomestico lo chiede: comodo, ma se lo chiede qualcosa di compromesso, la porta si apre lo stesso.

**In termini tecnici.** UPnP è un insieme di protocolli che permette a un'applicazione o a una console di chiedere al router la creazione di una regola di inoltro porta. La parte che interessa la rete è spesso **UPnP IGD**, Internet Gateway Device. La richiesta avviene senza che tu scriva la regola e senza un'autenticazione paragonabile a quella di un pannello amministrativo.

**Differenza e quando usarlo.** Rispetto al port forwarding, UPnP è automatico e temporaneo; il forwarding manuale è più prevedibile. Non è la stessa cosa di **NAT-PMP** o **PCP**, che sono altri protocolli di richiesta. Se non ti serve, tieni UPnP disattivato. Se una console o un gioco non funziona senza, abilitalo per la prova, controlla le regole create e disabilitalo quando non serve. UPnP non riduce il ping.

</details>

<details class="guide-term">
<summary><strong>DHCP — Dynamic Host Configuration Protocol</strong></summary>

**In pratica.** È come l'ufficio anagrafe di un condominio: assegna un indirizzo temporaneo a chi arriva, con una scadenza. La **prenotazione DHCP** è una targa personalizzata che l'ufficio tiene pronta per un inquilino; l'**IP statico** è una targa che l'inquilino si mette da solo, senza chiedere.

**In termini tecnici.** DHCP assegna automaticamente indirizzo IP, maschera di rete, gateway e server DNS, con un affitto (`lease`) che scade e viene rinnovato. La prenotazione lega un indirizzo MAC a un IP, ma il dispositivo continua a chiedere la configurazione via DHCP; l'IP statico viene configurato direttamente sul dispositivo.

**Differenza e quando usarlo.** DHCP non è DNS: DHCP dice al dispositivo quali server DNS usare; DNS traduce i nomi in indirizzi. Non riserva banda e non decide la velocità. Lascia il DHCP automatico per PC, telefoni e ospiti. Usa una prenotazione per stampanti, NAS, server e per l'IP a cui fai port forwarding. Evita due server DHCP nella stessa rete locale. Se cambi router, le prenotazioni vanno ricreate.

</details>

<details class="guide-term">
<summary><strong>Reverse proxy</strong></summary>

**In pratica.** È come la reception di un ufficio: i visitatori entrano da un solo ingresso, la reception li manda all'ufficio giusto e non vedono i corridoi interni. Fuori sembra che ci sia un solo servizio; dentro possono esserci più server.

**In termini tecnici.** È un componente che sta davanti a uno o più server web: riceve le richieste dei client, le inoltra al server giusto e restituisce la risposta. Lavora a livello applicativo, tipicamente HTTP/HTTPS, e può terminare TLS, fare caching, autenticazione, compressione, limitazione di frequenza e bilanciamento. Instrada in base a nome host, percorso o header.

**Differenza e quando usarlo.** Non è NAT e non è port forwarding: quelli lavorano su indirizzi e porte, il reverse proxy lavora sulle richieste applicative. Non è un proxy «per navigare», cioè un forward proxy, e non è una VPN. Da solo non rende pubblico un servizio: la porta deve comunque arrivare al reverse proxy tramite forwarding, tunnel o rete esposta. Serve se ospiti più servizi web e vuoi un solo ingresso HTTPS, certificati e regole comuni. Per un singolo servizio o per il gaming non serve. Non sostituisce firewall, autenticazione e aggiornamenti: se lo esponi, tienilo aggiornato e non mettere pannelli di amministrazione sotto lo stesso nome pubblico.

</details>

<details class="guide-term">
<summary><strong>Ping e RTT</strong></summary>

**In pratica.** È come mandare un messaggero e misurare quanto tempo impiega ad andare e tornare. Sai quanto dura il viaggio completo, non quanto ci mette solo all'andata.

**In termini tecnici.** Il ping è uno strumento che invia messaggi ICMP Echo Request e misura il tempo fino alla risposta, detto **RTT**, Round Trip Time. Nel linguaggio comune «ping» indica spesso il valore di latenza mostrato da un gioco o da uno speedtest: non sono la stessa misura.

**Differenza e quando usarlo.** L'RTT è andata e ritorno, non ritardo a senso unico. Un ping basso non garantisce che il gioco sia fluido: contano jitter, perdita, carico e comportamento del server. Un ping alto a riposo può dipendere dalla distanza o dal percorso; un ping che sale solo sotto carico è un indizio di code, cioè di bufferbloat. ICMP può essere filtrato o deprioritizzato: una risposta mancante non prova che il gioco perda pacchetti. Usa il ping per verificare raggiungibilità e tendenza, con più sonde e condizioni annotate. Non usarlo come voto universale e non confrontare millisecondi ottenuti con strumenti o percorsi diversi.

</details>

<details class="guide-term">
<summary><strong>Jitter</strong></summary>

**In pratica.** È come un autobus che in media passa ogni dieci minuti, ma un giorno arriva dopo otto, un altro dopo quindici, un altro dopo nove. La media può sembrare accettabile, ma il servizio è irregolare.

**In termini tecnici.** Il jitter è la variazione del ritardo fra pacchetti. Non esiste una sola formula: alcuni strumenti calcolano la differenza media fra campioni successivi di RTT, altri la variazione del ritardo a senso unico, l'**IPDV** della RFC 3393. Due numeri di jitter sono confrontabili solo se conosci metodo, campione e condizioni.

**Differenza e quando usarlo.** Conta per voce, video e giochi in tempo reale: un ritardo medio accettabile ma molto variabile produce scatti, micro-freeze e correzioni. Il jitter può esistere anche senza bufferbloat; il bufferbloat è una causa tipica di jitter quando la linea è carica. Misuralo con lo stesso strumento e la stessa durata prima e dopo una modifica. Non c'è un'impostazione «jitter» nel router: si riduce con un collegamento stabile, meno interferenze Wi-Fi, meno carico e, se serve, SQM. Non dichiarare un valore «buono» universale.

</details>

<details class="guide-term">
<summary><strong>Packet burst</strong></summary>

**In pratica.** È come una mandata di auto che passa tutta insieme al semaforo verde e poi lascia una pausa. Il traffico non è sempre un fiume continuo: spesso arriva a gruppi.

**In termini tecnici.** «Packet burst» non è un termine univoco. In generale indica un gruppo di pacchetti inviati uno dietro l'altro in un intervallo molto breve. Un gioco può accorpare aggiornamenti, TCP può inviare una finestra intera e il Wi-Fi può aggregare frame. In alcuni router o access point la voce «burst» o «frame bursting» riguarda l'aggregazione Wi-Fi: può aumentare il throughput, non è una funzione che promette meno ping. In alcuni speedtest «burst» indica anche la fase iniziale in cui la linea supera brevemente il rate sostenibile: è una descrizione del test, non una funzione da attivare.

**Differenza e quando usarlo.** Non è sinonimo di bufferbloat: la raffica è il modo in cui arriva il traffico; il bufferbloat è l'attesa che si accumula in coda. Una raffica può però riempire una coda lenta e far salire la latenza. Se «burst» è un'opzione del router, lasciala di default finché non hai un problema misurato. Se la stai valutando, confronta la latenza sotto carico, non solo lo speedtest. Se il termine compare nel grafico di un gioco, indica batching o raffiche: non è di per sé un guasto.

</details>

<details class="guide-term">
<summary><strong>Bufferbloat</strong></summary>

**In pratica.** È come un magazzino che accetta tutti i pacchi e li lascia in attesa: il corriere continua a scaricare, ma l'ultimo pacco esce molto dopo. La linea «fa presto» a ricevere, ma il tempo di consegna percepito esplode.

**In termini tecnici.** È l'aumento della latenza causato da code troppo lunghe che si riempiono quando la linea è satura. Il sintomo tipico: ping basso a riposo, ping molto più alto durante download o upload, e la sensazione che tutto diventi lento o a scatti appena qualcuno trasferisce dati. La causa non è «la fibra» o «il Wi-Fi» in sé: è una coda che trattiene pacchetti invece di segnalare al mittente di rallentare. Può stare nel router, nel modem, nell'accesso o nel Wi-Fi.

**Differenza e quando usarlo.** Un ping alto sempre, anche a riposo, non è bufferbloat: è distanza o percorso. Prima misura a riposo e sotto carico, separando download e upload. Se il ritardo sale solo sotto carico, SQM o AQM con shaping può aiutare; se il router non lo supporta, limita i trasferimenti concorrenti o valuta un apparato adeguato. Non si risolve cambiando DNS o attivando una voce «gaming» senza code gestite.

</details>

<details class="guide-term">
<summary><strong>QoS e SQM</strong></summary>

**In pratica.** QoS è il vigile che decide chi passa prima; SQM è il dosatore all'ingresso del magazzino che evita di riempirlo. Il vigile da solo non basta se il magazzino è già pieno.

**In termini tecnici.** **QoS**, Quality of Service, è un insieme di regole che classificano e prioritizzano il traffico. **SQM**, Smart Queue Management, è un approccio che gestisce le code e, di solito, limita il rate per tenere sotto controllo il collo di bottiglia. `fq_codel` e CAKE sono esempi di code o AQM; non sono la stessa cosa di una semplice priorità.

**Differenza e quando usarlo.** QoS può dare priorità a un gioco o a una videochiamata, ma se la coda è enorme e nessuno la gestisce, la priorità da sola non basta. SQM con shaping riduce l'attesa in coda, al costo di limitare leggermente il throughput. «Gaming QoS» è un'etichetta commerciale: verifica cosa fa davvero. Usa SQM se hai bufferbloat misurato e un router che lo supporta; usa QoS se sai quale traffico proteggere. Non attivare più shaper insieme e non copiare rate da una linea diversa.

</details>

<details class="guide-term">
<summary><strong>DMZ</strong></summary>

**In pratica.** È come togliere la porta di casa e lasciare tutto l'appartamento aperto: chiunque può provare a entrare da qualsiasi finestra. Non è una protezione, è l'opposto.

**In termini tecnici.** Su molti router domestici la voce **DMZ**, demilitarized zone, significa: inoltra tutte o quasi tutte le porte in ingresso a un solo dispositivo della rete locale. Non è una vera zona separata e non isola il dispositivo dagli altri.

**Differenza e quando usarlo.** Il port forwarding apre solo le porte scelte; il DMZ le apre quasi tutte. UPnP è una richiesta automatica per una porta; il DMZ è una regola fissa e globale. Evitalo nella rete di casa. Se ti serve per un test isolato, fallo su un dispositivo dedicato, senza dati personali, con firewall e aggiornamenti, e rimuovilo subito. Non mettere il PC principale in DMZ per «migliorare il gioco».

</details>

<details class="guide-term">
<summary><strong>Gateway</strong></summary>

**In pratica.** È come il casello d'uscita del quartiere: per andare fuori devi passare da lì. Non è la destinazione finale, è il primo passaggio obbligato.

**In termini tecnici.** È l'apparato a cui il dispositivo invia il traffico destinato a un'altra rete; in casa è di solito il router. È l'indirizzo che vedi in `ipconfig` come «Gateway predefinito».

**Differenza e quando usarlo.** Non è il DNS e non è il server del gioco. Un ping al gateway verifica solo il primo tratto locale: un gateway che risponde non dimostra che Internet sia sano, e un gateway che non risponde a ICMP non dimostra che sia guasto. Usalo per separare problemi locali da problemi esterni. Se il gateway è stabile e un host remoto no, il sospetto si sposta; non basta per incolpare il provider.

</details>

<details class="guide-term">
<summary><strong>DNS</strong></summary>

**In pratica.** È come la rubrica del telefono: cerchi un nome e ottieni il numero da chiamare. Se la rubrica è lenta o sbagliata, non riesci a partire, ma non è detto che la strada sia lenta.

**In termini tecnici.** Il DNS traduce nomi, per esempio `example.com`, in indirizzi IP. Il resolver che usi è configurato dal router o dal dispositivo e può mantenere una cache delle risposte.

**Differenza e quando usarlo.** Cambiare DNS può cambiare la risoluzione dei nomi, non il percorso dei pacchetti già instradati. Un DNS lento può far sembrare lenta l'apertura di un sito, ma non aumenta il ping della partita dopo che la connessione è stabilita. DHCP può comunicare quale DNS usare; DNS è il servizio che risponde alle domande. Cambialo se hai un problema di risoluzione o vuoi un resolver diverso, non per «abbassare il ping». Se un nome fallisce e l'IP funziona, il DNS è un indizio; verifica con un altro nome o un altro resolver.

</details>

### Riepilogo: quale impostazione scegliere

| Obiettivo | Cosa usare | Cosa evitare |
|---|---|---|
| Esporre un solo servizio interno | Port forwarding mirato, con IP prenotato e autenticazione | DMZ e aperture di intere porte |
| Console o gioco che chiede porte | UPnP temporaneo oppure forwarding manuale documentato | UPnP sempre attivo senza controllo |
| IP stabile per NAS, stampante o server | Prenotazione DHCP | IP statico scelto a caso o fuori subnet |
| Più servizi web dietro un solo HTTPS | Reverse proxy aggiornato e segmentato | Un forwarding per ogni servizio e pannelli esposti |
| Latenza che sale sotto carico | SQM o AQM con shaping, dopo una misura | DNS, DMZ o preset «gaming» |
| Capire se il problema è in casa | Ping a gateway e host, confronto A-B-A | Un singolo speedtest o un hop silenzioso |
| Accesso privato a un servizio | VPN | Port forwarding aperto a tutti |
| Gioco o console con NAT restrittivo | Verifica mapping e filtro; Full Cone solo se serve | Attivare Full Cone o DMZ senza un problema documentato |
