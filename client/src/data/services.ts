type Service = {
  slug: string;
  name: string;
  eyebrow: string;
  title: string;
  seoTitle: string;
  description: string;
  metaDescription: string;
  intro: string;
  benefits: { title: string; text: string }[];
  process: { title: string; text: string }[];
  insights: { title: string; text: string }[];
  questions: { question: string; answer: string }[];
  detailsTitle: string;
  details: string[];
};

export const services: Service[] = [
  {
    slug: "pc-gaming-su-misura",
    name: "Assemblaggio PC gaming su misura",
    eyebrow: "PC custom",
    title: "PC gaming su misura a Padova e in tutta Italia",
    seoTitle: "Assemblaggio PC Gaming a Padova | Prime Build",
    description: "Dalla scelta dei componenti ai test finali: un PC costruito per i tuoi giochi, il tuo monitor e il tuo budget.",
    metaDescription: "Assemblaggio PC gaming su misura a Padova e Montegrotto Terme. Consulenza, componenti, cable management, test e supporto post-vendita.",
    intro: "Una buona build non è una lista di componenti costosi. Parte da risoluzione, refresh rate, giochi, software e possibilità di upgrade. Prime Build analizza queste esigenze, confronta i prezzi reali e propone una configurazione equilibrata. Puoi affidarti a noi per l'intero progetto oppure partire da componenti che possiedi già.",
    benefits: [
      { title: "Budget usato bene", text: "Investiamo dove cambia davvero l'esperienza, evitando componenti sovradimensionati o incompatibili con il tuo obiettivo." },
      { title: "Assemblaggio curato", text: "Montaggio preciso, airflow ragionato, cable management pulito e configurazione completa prima della consegna." },
      { title: "Test documentati", text: "Controlliamo temperature, stabilità, memoria, archiviazione e prestazioni con carichi realistici." },
    ],
    process: [
      { title: "Ascolto", text: "Raccogliamo budget, titoli giocati, monitor, preferenze estetiche e programmi utilizzati." },
      { title: "Progetto", text: "Prepariamo una proposta trasparente e la adattiamo insieme prima dell'acquisto." },
      { title: "Build e test", text: "Assembliamo, aggiorniamo firmware e driver, ottimizziamo e verifichiamo il sistema." },
      { title: "Consegna", text: "Ricevi un PC pronto all'uso, con spiegazioni chiare e supporto post-vendita." },
    ],
    insights: [
      { title: "CPU e scheda video devono lavorare insieme", text: "La scelta dipende dal carico reale. In gaming competitivo ad alto refresh può contare di più la CPU; in 4K o con ray tracing il peso si sposta sulla GPU. Consideriamo anche streaming, editing e produttività, così la configurazione non è ottimizzata per un singolo benchmark ma per l'uso quotidiano previsto." },
      { title: "Temperature, rumore e alimentazione", text: "Un PC veloce deve restare stabile e piacevole da usare. Dimensioniamo dissipatore, ventole e alimentatore in base ai consumi effettivi, lasciando margine dove serve. Verifichiamo curve di ventilazione, temperature sotto carico e rumorosità, evitando potenze nominali eccessive che non portano vantaggi." },
      { title: "Estetica senza sacrificare la manutenzione", text: "Case, illuminazione e colori vengono concordati, ma airflow e accessibilità restano prioritari. Organizziamo i cavi, manteniamo puliti i percorsi dell'aria e scegliamo soluzioni che rendano semplici pulizia e futuri upgrade. Una build curata deve rimanere ordinata anche dietro al pannello." },
      { title: "Software pronto, senza riempitivi", text: "Installiamo aggiornamenti, driver e impostazioni necessarie, poi controlliamo che il sistema si avvii e lavori correttamente. Non aggiungiamo programmi promozionali o tweak aggressivi. Alla consegna spieghiamo le impostazioni importanti e come mantenere aggiornato il computer in sicurezza." },
    ],
    questions: [
      { question: "Posso acquistare personalmente i componenti?", answer: "Sì. Possiamo preparare insieme la lista e lasciare a te l'acquisto, oppure gestire la fornitura secondo quanto concordato. Prima dell'ordine controlliamo compatibilità, dimensioni e disponibilità per ridurre resi e sorprese durante l'assemblaggio." },
      { question: "Posso riutilizzare parti del mio vecchio PC?", answer: "Sì, dopo averne verificato condizioni, compatibilità e convenienza. Case, alimentatore, archiviazione o scheda video possono spesso essere riutilizzati, ma la decisione dipende da età, garanzia, prestazioni e requisiti della nuova piattaforma." },
      { question: "Il prezzo indicato nelle build è definitivo?", answer: "No. È un riferimento utile per capire la fascia, mentre il preventivo finale considera prezzi e disponibilità del momento. Se il mercato cambia, proponiamo alternative equivalenti senza sostituire componenti in modo automatico o poco trasparente." },
    ],
    detailsTitle: "Un servizio locale, disponibile in tutta Italia",
    details: [
      "La sede è a Montegrotto Terme, vicino Padova. È possibile concordare ritiro e consegna in zona oppure una spedizione assicurata per il resto d'Italia.",
      "Le configurazioni pubblicate sul sito sono esempi, non pacchetti rigidi. Disponibilità e prezzi cambiano: ogni preventivo viene verificato al momento della richiesta.",
    ],
  },
  {
    slug: "assistenza-riparazione-pc",
    name: "Assistenza e riparazione PC",
    eyebrow: "Assistenza tecnica",
    title: "Riparazione e assistenza PC a Padova",
    seoTitle: "Riparazione e Assistenza PC Padova | Prime Build",
    description: "Diagnosi chiara e interventi mirati per PC gaming, workstation e computer desktop, anche se non assemblati da noi.",
    metaDescription: "Assistenza e riparazione PC a Padova e Montegrotto Terme: diagnosi hardware, upgrade, pulizia, problemi software e supporto da remoto.",
    intro: "Crash, temperature elevate, cali di prestazioni e problemi di avvio possono avere cause molto diverse. Prima di sostituire componenti eseguiamo una diagnosi per isolare il problema. L'obiettivo è risolvere il guasto con l'intervento più sensato, spiegando cosa è stato verificato e quali alternative esistono.",
    benefits: [
      { title: "Diagnosi prima della spesa", text: "Verifichiamo sintomi, log, temperature e componenti per evitare sostituzioni casuali." },
      { title: "Hardware e software", text: "Gestiamo guasti, upgrade, pulizia, reinstallazioni, driver, BIOS e instabilità del sistema." },
      { title: "Supporto flessibile", text: "Interventi in sede, a domicilio nelle zone limitrofe o da remoto quando il problema lo consente." },
    ],
    process: [
      { title: "Raccolta sintomi", text: "Ricostruiamo quando si presenta il problema e cosa è già stato tentato." },
      { title: "Diagnosi", text: "Eseguiamo controlli progressivi senza cambiare più variabili contemporaneamente." },
      { title: "Preventivo", text: "Condividiamo causa probabile, intervento consigliato e costo prima di procedere." },
      { title: "Verifica finale", text: "Testiamo il PC dopo l'intervento e indichiamo eventuali limiti o manutenzioni future." },
    ],
    insights: [
      { title: "Problemi di avvio e instabilità", text: "Un PC che non parte, si riavvia o mostra schermate blu richiede un percorso ordinato: alimentazione, memoria, archiviazione, temperature, firmware e sistema operativo vengono controllati senza cambiare più elementi contemporaneamente. Questo permette di distinguere il componente guasto da una configurazione errata o da un problema software." },
      { title: "Temperature elevate e manutenzione", text: "Polvere, pasta termica, ventole usurate e airflow scorretto possono ridurre prestazioni e durata dei componenti. La pulizia viene eseguita con strumenti adatti e accompagnata da una verifica delle temperature. Non sostituiamo automaticamente dissipatori o ventole se manutenzione e configurazione risolvono già il problema." },
      { title: "Upgrade compatibili e convenienti", text: "Prima di consigliare CPU, GPU, RAM o SSD verifichiamo scheda madre, BIOS, alimentatore, spazio nel case e obiettivo prestazionale. Confrontiamo il costo dell'upgrade con quello di una piattaforma nuova: mantenere il PC esistente è una buona scelta solo quando produce un miglioramento proporzionato alla spesa." },
      { title: "Dati personali e sicurezza", text: "Quando possibile suggeriamo un backup prima dell'intervento. Non accediamo a file personali senza necessità e concordiamo qualsiasi reinstallazione che possa cancellare dati. Per i supporti con possibili guasti spieghiamo prima i limiti della diagnosi e quando è opportuno rivolgersi a un laboratorio specializzato nel recupero dati." },
    ],
    questions: [
      { question: "Riparate anche PC non assemblati da Prime Build?", answer: "Sì. Il servizio è disponibile per computer assemblati da altri negozi, acquistati già pronti o costruiti autonomamente. La disponibilità dei ricambi e la possibilità di intervento vengono valutate dopo aver identificato modello e configurazione." },
      { question: "Potete diagnosticare il problema da remoto?", answer: "Molti problemi software, driver, prestazioni e configurazione possono essere analizzati da remoto. Guasti di alimentazione, componenti non rilevati o problemi fisici richiedono invece controlli in sede. Dopo una prima descrizione indichiamo quale modalità ha più senso." },
      { question: "Quanto dura una riparazione?", answer: "Dipende dal guasto e dalla disponibilità dei ricambi. Una diagnosi comune può richiedere uno o più giorni lavorativi; interventi con componenti da ordinare richiedono più tempo. Comunichiamo la stima dopo i primi controlli, senza promettere tempi impossibili prima di conoscere la causa." },
    ],
    detailsTitle: "Quando richiedere assistenza",
    details: [
      "Puoi contattarci per PC che non si avviano, schermate blu, riavvii, temperature anomale, rumori, prestazioni incoerenti, rete instabile o upgrade da pianificare.",
      "Per l'assistenza da remoto non chiediamo mai password permanenti. Ogni accesso deve essere autorizzato e visibile durante la sessione.",
    ],
  },
  {
    slug: "ottimizzazione-pc-gaming",
    name: "Ottimizzazione PC gaming",
    eyebrow: "Performance",
    title: "Ottimizzazione PC gaming e latenza",
    seoTitle: "Ottimizzazione PC Gaming | Prime Build",
    description: "Prestazioni più stabili attraverso misurazioni, configurazioni conservative e interventi reversibili.",
    metaDescription: "Ottimizzazione PC gaming a Padova e da remoto: frametime, temperature, driver, rete e Windows configurati con test prima e dopo.",
    intro: "Ottimizzare non significa applicare decine di tweak trovati online. Misuriamo il comportamento del sistema, individuiamo il limite reale e interveniamo solo dove esiste un beneficio verificabile. La priorità è ottenere frametime coerente, temperature corrette e un sistema affidabile, senza disabilitare funzioni di sicurezza a caso.",
    benefits: [
      { title: "Prima si misura", text: "Registriamo prestazioni, temperature e latenze per distinguere un problema reale da una semplice percezione." },
      { title: "Interventi reversibili", text: "Documentiamo le modifiche e manteniamo una strada chiara per tornare alla configurazione precedente." },
      { title: "Stabilità prima del picco", text: "Preferiamo prestazioni ripetibili a benchmark elevati che causano crash o temperature inutili." },
    ],
    process: [
      { title: "Baseline", text: "Creiamo una misurazione iniziale coerente con l'uso del PC." },
      { title: "Analisi", text: "Controlliamo carichi, temperature, clock, frametime, driver e processi attivi." },
      { title: "Ottimizzazione", text: "Applichiamo solo le modifiche pertinenti a hardware e scenario d'uso." },
      { title: "Confronto", text: "Ripetiamo gli stessi test e consegniamo una sintesi delle differenze osservate." },
    ],
    insights: [
      { title: "Frametime prima degli FPS medi", text: "La media degli FPS non descrive scatti e irregolarità. Per questo osserviamo frametime, percentili bassi, utilizzo di CPU e GPU e comportamento durante una sessione ripetibile. Un sistema che mantiene tempi di frame coerenti spesso risulta più fluido di uno con un picco medio superiore ma instabile." },
      { title: "Driver, firmware e Windows", text: "Aggiornare tutto indiscriminatamente non è sempre la soluzione. Controlliamo versione del BIOS, driver chipset e grafici, piano energetico, processi in background e funzioni di Windows pertinenti al sistema. Le modifiche vengono applicate una alla volta, evitando script opachi e disattivazioni estese dei servizi di sicurezza." },
      { title: "Temperature, clock e limiti energetici", text: "Thermal throttling, curve di ventilazione aggressive o limiti energetici non corretti possono alterare prestazioni e rumore. Analizziamo il comportamento sotto carico e, quando utile, impostiamo curve o parametri conservativi. Overclock e undervolt vengono considerati solo se il sistema resta stabile nei test ripetuti." },
      { title: "Rete e latenza percepita", text: "La latenza online dipende anche da router, connessione, congestione e server di gioco. Possiamo verificare bufferbloat, collegamento Ethernet o Wi-Fi e configurazioni QoS, distinguendo i problemi locali da quelli esterni. Nessun tweak di Windows può correggere una linea congestionata o un percorso di rete sfavorevole." },
    ],
    questions: [
      { question: "Quanti FPS guadagnerò?", answer: "Non esiste una percentuale seria valida per ogni PC. Se il limite è una configurazione errata il miglioramento può essere evidente; se hardware e software sono già corretti, il vantaggio può riguardare soprattutto stabilità, temperature o frametime. Confrontiamo gli stessi test prima e dopo per mostrarlo." },
      { question: "Disattivate antivirus e funzioni di sicurezza?", answer: "No come procedura standard. Una funzione viene modificata solo se pertinente, reversibile e compatibile con il livello di rischio accettato. Evitiamo pacchetti di tweak che disabilitano protezioni, aggiornamenti e servizi senza dimostrare un beneficio concreto nello scenario del cliente." },
      { question: "L'ottimizzazione può essere svolta da remoto?", answer: "Sì, per molti controlli software e di configurazione. Serve una connessione stabile e la presenza del proprietario durante l'accesso. Interventi su raffreddamento, montaggio, firmware con rischi specifici o instabilità hardware possono richiedere il PC in sede." },
    ],
    detailsTitle: "Gaming competitivo, rete e uso quotidiano",
    details: [
      "Il servizio può includere configurazione di Windows, driver, profili energetici, curve di ventilazione, memoria, rete domestica e impostazioni in-game. La disponibilità dipende dal sistema e dal tipo di accesso possibile.",
      "Non promettiamo aumenti di FPS prestabiliti: il risultato dipende dal collo di bottiglia. Quando una modifica non produce un vantaggio misurabile, non viene presentata come ottimizzazione.",
    ],
  },
];

export const getService = (slug: string) => services.find((service) => service.slug === slug);
