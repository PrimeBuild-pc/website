# Monitor gaming: pannelli, tempi di risposta e impostazioni che contano

Il monitor è l'ultimo pezzo della catena che porta un'azione sullo schermo. Può essere il componente più veloce del PC e, nello stesso momento, il più lento a mostrare il risultato. Per questo non basta leggere «240 Hz», «0,03 ms» o «HDR 1000» sulla scatola: bisogna capire che cosa misura quel numero, in quali condizioni è stato ottenuto e che cosa succede quando il gioco, la GPU, il cavo e il pannello lavorano insieme.

Questa guida parte dalle famiglie di pannelli e arriva alle impostazioni del menu, passando per response time, persistence, overdrive, Mini LED, OLED, TV e criteri di acquisto. L'obiettivo non è eleggere il monitor universale, ma aiutarti a scegliere quello giusto per il tuo modo di giocare e a verificarlo quando arriva.

**Ambito e stato delle prove.** La guida è una sintesi tecnica basata su documentazione pubblica e recensioni aggiornate a ottobre 2026. Non contiene misure originali Prime Build su un pannello specifico e non certifica modelli futuri. Le prestazioni reali dipendono da esemplare, firmware, impostazioni, ambiente, GPU, gioco e contenuto. I nomi commerciali sono citati per descrivere le funzioni, non come raccomandazioni di acquisto.

## 1. Che cosa determina davvero l'esperienza

La sensazione di «fluidità» nasce da più elementi che spesso vengono confusi:

- il **frame time** del gioco, cioè quanto dura ogni frame e quanto è regolare;
- il **refresh rate** del monitor, cioè quante volte al secondo il pannello può mostrare un'immagine;
- il **tempo di risposta dei pixel**, cioè quanto impiegano a cambiare luminosità;
- la **persistence**, cioè per quanto tempo un frame resta visibile prima del successivo;
- la **latenza del sistema**, dal clic al fotone, che comprende gioco, GPU, compositore, cavo e display;
- la **qualità dell'immagine**, che comprende contrasto, luminosità, gamma, colore e uniformità.

Un monitor da 500 Hz collegato a un PC che produce 180 FPS non crea 500 frame nuovi: mostra gli stessi frame più volte. Un pannello con pixel velocissimi ma con un'immagine che resta a schermo per 16,7 ms può sembrare più mosso di un pannello più lento ma pilotato a 240 Hz. E un monitor con input lag bassissimo può sembrare poco reattivo se il gioco ha frame time irregolari.

La catena completa è quella descritta nella guida [Display e cavi](06-display-cavi.md): uscita GPU, dock o adattatore, cavo, ingresso del monitor e modalità attiva. La sincronizzazione e il frame limiter sono trattati in [Sincronizzazione, presentazione e limiter](05-sincronizzazione-limiter.md). Qui ci concentriamo sul display e sulle sue impostazioni.

## 2. Le famiglie di pannelli: TN, IPS, VA, OLED e Mini LED

«LCD» e «OLED» dicono come viene prodotta la luce. «TN», «IPS» e «VA» dicono come è organizzato il cristallo liquido in un LCD. «Mini LED» non è un tipo di cristallo liquido: è un tipo di retroilluminazione applicata a un LCD. «QD-OLED» e «WOLED» sono due famiglie di OLED. Queste distinzioni spiegano perché due monitor con gli stessi Hertz possono comportarsi in modo molto diverso.

### TN, IPS e VA: tre modi di fare LCD

**TN, Twisted Nematic.** È la tecnologia storicamente più veloce e più economica. Ha angoli di visione stretti, colori meno ricchi e contrasto nativo modesto, ma resta una scelta concreta per il competitive estremo: nel 2026 esistono monitor TN da 24-25 pollici a 1080p con refresh rate nell'ordine di 600 Hz, pensati per eSports e motion clarity. Non è il pannello giusto per chi guarda film o lavora con colori importanti.

**IPS, In-Plane Switching.** Offre angoli di visione ampi e colori generalmente più equilibrati, con un contrasto nativo intorno a 1000:1 nella maggior parte dei modelli. Le varianti «Fast IPS», «Nano IPS» e «IPS Black» cambiano tempi, filtro colore e contrasto, ma non trasformano un IPS in un OLED. L'IPS è la scelta più versatile per gaming misto, produttività e testi; il suo limite tipico è il nero grigiastro e il fenomeno dell'IPS glow, visibile soprattutto al buio e da angolazioni laterali.

**VA, Vertical Alignment.** Ha un contrasto nativo più alto, spesso nell'ordine di 3000:1 o più, e quindi neri più profondi. È adatto a contenuti cinematografici, giochi immersivi e HDR, soprattutto se abbinato a una retroilluminazione Mini LED. Il prezzo è una transizione dei cristalli più lenta, che può produrre scie scure, black smearing e ghosting nelle scene scure; gli angoli di visione sono inferiori all'IPS e l'uniformità può variare.

| Famiglia | Contrasto tipico | Punti forti | Limiti tipici | Uso consigliato |
|---|---|---|---|---|
| TN | Basso | Risposta molto rapida, costo, refresh elevati | Angoli stretti, colori e nero modesti | eSports 1080p, massima priorità alla velocità |
| IPS | Medio | Colori, angoli, versatilità | Glow, nero non profondo | Gaming misto, lavoro, testo, competitive non estremo |
| VA | Alto | Nero profondo, contrasto, HDR | Scie scure, angoli, transizioni lente | Immersione, single player, cinema, Mini LED |
| OLED | Altissimo, per pixel | Nero vero, risposta quasi istantanea, angoli | Luminosità, burn-in, testo, VRR flicker | Gaming, HDR, motion clarity, uso misto consapevole |
| Mini LED | Alto con local dimming | Picco luminoso, HDR, nessun burn-in | Blooming, aloni, spessore, consumo | HDR in stanze luminose, uso misto, console |

### OLED: WOLED, QD-OLED e le generazioni recenti

Nell'OLED ogni pixel emette luce e può spegnersi. Il nero è quindi vero, il contrasto è praticamente infinito e la risposta del pixel è nell'ordine dei decimi o centesimi di millisecondo. Questo non elimina ogni scia: un OLED a 60 Hz mostra comunque un frame per 16,7 ms, e la persistence può rendere mosso un oggetto in movimento anche con pixel istantanei. Serve anche un refresh alto o una modalità di black frame insertion.

Le due famiglie principali sono **WOLED**, con emettitore bianco e filtri RGB più un subpixel bianco per la luminosità, e **QD-OLED**, con emettitore blu e quantum dot per ottenere rosso e verde. Nel 2026 convivono pannelli «Tandem» a più strati, con miglioramenti di luminosità e durata: WOLED a quattro strati e QD-OLED «Penta Tandem» a cinque strati. I pannelli RGB-stripe, introdotti nel 2026, migliorano la nitidezza del testo rispetto ai layout tradizionali non standard.

L'OLED è la tecnologia più adatta a chi vuole il miglior contrasto e la migliore motion clarity, ma richiede qualche attenzione in più: luminosità non paragonabile a un LCD molto brillante, rischio di ritenzione e burn-in con contenuti statici, possibile flicker VRR e, sui modelli meno recenti, testo meno nitido. I pannelli più recenti e le risoluzioni più alte riducono molti di questi limiti, non li cancellano.

### Mini LED: un LCD con una retroilluminazione più fine

Un Mini LED è un LCD con molti LED piccoli dietro il pannello, raggruppati in zone controllabili. Aumentando le zone si migliorano il contrasto percepito e l'HDR, perché le aree scure possono abbassare la luce. Restano però i limiti dell'LCD: la luce proviene da una retroilluminazione, quindi attorno a un oggetto luminoso su fondo nero può comparire un alone, il **blooming**. La qualità dipende dal numero di zone, dall'algoritmo di local dimming e dal contenuto, non solo dalla scritta «Mini LED».

I Mini LED hanno un vantaggio importante: possono essere molto luminosi, non soffrono di burn-in e sono adatti a stanze illuminate. Nel 2026 si vedono monitor con 1152 o 2304 zone, anche abbinati a pannelli VA o IPS; stanno arrivando anche retroilluminazioni RGB Mini LED, che migliorano il colore ma restano LCD. Per un uso desktop prolungato con elementi statici, un Mini LED è spesso più sereno di un OLED.

## 3. Anatomia di un pannello gaming

Un monitor LCD è una pila di strati: retroilluminazione, polarizzatori, cristallo liquido, filtri colore e pannello frontale. La retroilluminazione può essere edge-lit, direct-lit, full-array con local dimming o Mini LED. Il cristallo liquido non emette luce: ruota la polarizzazione e lascia passare più o meno luce attraverso i filtri. L'OLED elimina la retroilluminazione e usa materiali organici che emettono luce quando ricevono corrente.

Questa differenza spiega gran parte delle prestazioni:

- **Nero e contrasto.** Un LCD ha sempre una retroilluminazione accesa; il nero è il risultato di quanto bene il cristallo blocca la luce. Un OLED può spegnere il pixel.
- **Risposta.** Il cristallo liquido deve fisicamente ruotare; l'OLED cambia emissione. Per questo l'OLED ha tempi di risposta molto più bassi, ma resta soggetto alla persistence.
- **Luminosità.** Un LCD può spingere molta luce da una retroilluminazione grande; un OLED deve dosare la corrente per pixel e gestire calore, durata e consumo.
- **Uniformità.** La retroilluminazione può creare chiazze, bleeding o aloni; l'OLED può mostrare uniformità e banding nelle basse luci.

Altri elementi contano quanto il pannello:

- **Risoluzione e densità.** 1080p su 24-25", 1440p su 27", 4K su 27-32" e 5K2K su ultrawide sono combinazioni diverse per nitidezza, carico GPU e distanza di visione. La densità in pixel per pollice (PPI) spiega perché un 27" 4K appare più definito di un 27" 1440p.
- **Subpixel e testo.** I layout non standard di molti OLED possono creare frange colorate sul testo; densità più alte e pannelli RGB-stripe riducono il problema.
- **Rivestimento.** Opaco, semilucido o lucido cambiano riflessi, nitidezza percepita e profondità del nero. Un lucido è più nitido ma riflette di più; un opaco gestisce meglio le stanze luminose ma può apparire più granuloso.
- **Scanout e persistence.** L'immagine non cambia tutta insieme: il pannello viene scandito dall'alto verso il basso. Un frame resta visibile fino al successivo; da qui nasce la motion blur da sample-and-hold.
- **Local dimming.** Su LCD, le zone si accendono e spengono; su OLED è per pixel. La dimensione delle zone e la velocità dell'algoritmo decidono blooming e artefatti.

## 4. Response time: GtG, MPRT, overdrive e persistence

Il «tempo di risposta» non è una grandezza unica. I produttori usano almeno tre famiglie di numeri, e spesso non dicono abbastanza su come sono stati ottenuti.

### GtG, gray-to-gray

Il **GtG** misura quanto tempo impiega un pixel a passare da un livello di grigio a un altro. Non è un valore unico: cambia con la transizione (nero-bianco, grigio-grigio, scuro-scuro), con la temperatura, con il refresh e con l'overdrive. Un «1 ms GtG» può essere il miglior caso di una transizione favorevole, non la media di tutte. I produttori usano soglie e metodi diversi, per esempio 10-90% o 20-80%; due numeri non sono confrontabili senza il metodo.

Sul VA le transizioni scure sono spesso più lente e producono **black smearing**: una scia nera dietro gli oggetti in movimento su sfondi scuri. Sul TN e sui migliori IPS il GtG può essere molto basso; sull'OLED è nell'ordine dei decimi o centesimi di millisecondo, ma questo non basta a eliminare la persistence.

### Overdrive

L'**overdrive** è una sovratensione applicata al cristallo per accelerare la transizione. Ha livelli come Off, Normal, Fast, Extreme. Aumentandolo il pixel arriva prima, ma può superare il valore target e poi tornare indietro: nascono **overshoot**, **undershoot**, aloni chiari e **inverse ghosting**. Il livello giusto dipende dal pannello, dal refresh e dalla transizione; un overdrive estremo che sembra veloce nel test può peggiorare l'immagine in gioco.

Con il VRR il refresh cambia continuamente. Un overdrive fisso può essere troppo aggressivo a bassi refresh e troppo debole a refresh alti; i monitor migliori offrono **variable overdrive** o una curva calibrata. Se il menu non lo dichiara, prova il livello intermedio e cerca aloni, non solo «scia sì/no».

### MPRT e persistence

Il **MPRT**, Moving Picture Response Time, prova a descrivere la nitidezza percepita di un oggetto in movimento. Non dipende solo dal GtG: include il tempo per cui il frame resta visibile e il movimento dell'occhio che lo segue. Su un display a sample-and-hold, senza riduzione della persistence, il MPRT è circa 1000 diviso il refresh rate: 16,7 ms a 60 Hz, 8,3 ms a 120 Hz, 4,2 ms a 240 Hz, 2 ms a 500 Hz, 1 ms a 1000 Hz.

Per ottenere «1 ms MPRT» su un LCD serve una retroilluminazione stroboscopica o una black frame insertion: il pannello viene spento mentre i pixel cambiano e illuminato solo quando l'immagine è pronta. Questo riduce la scia percepita, ma abbassa la luminosità, può introdurre flicker, crosstalk e doppie immagini, e spesso non è compatibile con il VRR. Un monitor che dichiara «1 ms MPRT» senza una modalità di strobe va trattato con sospetto.

L'OLED non ha retroilluminazione da strozzare, ma può inserire frame neri. Anche qui si guadagna nitidezza al costo di luminosità e, in alcuni modelli, di flicker. Il punto pratico è semplice: **GtG descrive il pixel, MPRT descrive l'immagine in movimento**. Servono entrambi, più la persistence e il refresh.

## 5. Hertz, frame rate e latenza: tre cose diverse

Il **refresh rate** è quante volte al secondo il monitor aggiorna l'immagine. Il **frame rate** è quante immagini al secondo produce il gioco. La **latenza** è il tempo che intercorre tra un'azione e il suo effetto visibile. Sono grandezze collegate ma non equivalenti.

| Refresh | Tempo per frame | Nota pratica |
|---:|---:|---|
| 60 Hz | 16,67 ms | Base office/console; motion clarity limitata |
| 120 Hz | 8,33 ms | Salto percepibile; buona base console |
| 144 Hz | 6,94 ms | Gaming generico, compromesso storico |
| 165 Hz | 6,06 ms | Comune su 1440p/4K |
| 240 Hz | 4,17 ms | Competitive e single player ad alta fluidità |
| 360 Hz | 2,78 ms | eSports, richiede frame rate adeguato |
| 500 Hz | 2,00 ms | Elite competitive; vantaggi piccoli ma reali |
| 600 Hz | 1,67 ms | TN eSports; il gioco deve seguirli |

Un refresh più alto riduce l'intervallo tra le immagini e il tempo di persistenza, ma non crea frame che la GPU non ha prodotto. Con VRR il monitor adatta il refresh al frame rate; sotto il minimo del range entra in gioco la **LFC**, che ripete frame. La sincronizzazione non è una bacchetta magica: riduce tearing e stutter, ma non migliora il frame time del gioco. Per questo la guida dedicata insiste su frame limiter, 1% low e comportamento del gioco.

La **latenza del display** è solo una parte della latenza totale. Il monitor può avere un processing interno, uno scaler, un DSP per l'audio, un modulo G-Sync o un percorso DSC. I numeri «0,5 ms» o «0,03 ms» spesso si riferiscono al pixel o a una modalità specifica, non al clic-to-photon. Per confrontare due monitor servono misure end-to-end o almeno input lag misurato con metodo dichiarato.

Il **DSC**, Display Stream Compression, comprime il flusso video per far passare risoluzioni e refresh elevati su DisplayPort o HDMI. È normalmente trasparente, ma può introdurre limiti con alcuni adattatori, dock o modalità alt-tab. Per 4K 240 Hz 10 bit e per 500 Hz a 1440p servono banda e certificazioni adeguate: controlla DisplayPort 1.4/2.1, HDMI 2.1, DSC e cavo prima di incolpare il pannello.

## 6. OLED, WOLED, QD-OLED e Mini LED: il confronto vero

Non esiste «il pannello migliore» in assoluto. Esiste il pannello che meglio risponde a una combinazione di contenuto, ambiente, budget e durata d'uso.

| Criterio | OLED (WOLED/QD-OLED) | Mini LED LCD | VA LCD | IPS LCD | TN LCD |
|---|---|---|---|---|---|
| Nero | Per pixel, praticamente infinito | Buono con local dimming, dipende dalle zone | Alto nativo | Medio | Basso |
| Contrasto percepito | Altissimo | Alto, con blooming | Alto | Medio | Basso |
| Picco HDR | Buono, ma con ABL | Molto alto | Alto con Mini LED | Medio | Basso |
| Risposta | Quasi istantanea | Buona, dipende dal LCD | Lenta sulle basse luci | Buona | Molto buona |
| Angoli | Ottimi | Buoni | Medi | Ottimi | Stretti |
| Testo | Variabile, meglio ad alta PPI/RGB-stripe | Buono | Buono | Ottimo | Buono |
| Burn-in | Rischio | Nessuno | Nessuno | Nessuno | Nessuno |
| Stanza luminosa | Buono, ma riflessi/ABL | Ottimo | Buono | Buono | Buono |
| Uso ideale | Gaming/HDR, motion clarity | HDR luminoso, uso misto | Cinema, immersione | Versatilità | eSports |

**OLED** vince su contrasto, angoli e motion clarity; perde su luminosità massima, rischio burn-in e, in alcuni modelli, testo e flicker VRR. **Mini LED** vince su luminosità e assenza di burn-in; perde su blooming e uniformità delle zone. **VA** è il compromesso LCD con il miglior nero nativo; **IPS** è il compromesso più versatile; **TN** resta la scelta di nicchia per chi vuole il massimo refresh a basso costo.

Nel 2026 il mercato offre 27" 1440p OLED da 240 a 540 Hz, 27" 4K OLED a 240 Hz, 32" 4K OLED a 240 Hz, ultrawide OLED e Mini LED con oltre 1000 zone. Non inseguire il numero più alto: un 240 Hz OLED ben calibrato può essere più nitido in movimento di un 360 Hz LCD con overdrive sbagliato, e un 500 Hz TN può essere inutile se il gioco non supera i 200 FPS.

### ABL, ASBL e luminosità OLED

L'OLED non può illuminare tutta la schermata al massimo senza compromettere durata e consumo. L'**ABL**, Automatic Brightness Limiter, riduce la luminosità quando l'immagine è globalmente chiara; l'**ASBL** e funzioni simili riducono la luminosità su contenuti statici. In SDR molti monitor offrono una modalità «uniform brightness» per il desktop; in HDR l'ABL è più visibile e fa parte del comportamento del pannello. Non è un difetto isolato: è il modo in cui il pannello gestisce potenza e calore. Per questo un OLED può sembrare meno brillante di un Mini LED proprio quando l'immagine è tutta chiara.

Le certificazioni **VESA DisplayHDR True Black 400, 500 e 600** indicano soglie crescenti di luminosità e requisiti di nero per gli OLED; **DisplayHDR 1000 e 1400** sono riferimenti tipici per LCD Mini LED. Sono utili come punto di partenza, non come garanzia di qualità: numero di zone, algoritmo di local dimming, calibrazione e comportamento reale contano più dell'etichetta.

## 7. Monitor o TV: quando ha senso scegliere l'uno o l'altro

Una TV moderna non è un monitor grande e basta. È un dispositivo progettato per video, con tuner, app, elaborazione dell'immagine, overscan, modalità di risparmio e una gestione del segnale diversa. Un monitor è progettato per un PC: DisplayPort, wake/sleep, refresh elevati, OSD, ergonomia e tempi di attivazione ridotti.

### Quando la TV è la scelta giusta

- **Console su divano.** Una TV OLED o Mini LED da 42-65" con HDMI 2.1, VRR, ALLM e 4K 120 Hz offre un'esperienza più immersiva di un monitor da 27".
- **Single player e HDR.** Il contrasto OLED o il picco Mini LED, insieme alla dimensione, battono spesso un monitor nella percezione cinematografica.
- **Budget per pollice.** A parità di diagonale, una TV costa meno di un monitor gaming equivalente.
- **42-48" come desktop.** È una soluzione di compromesso per chi vuole un grande schermo 4K 120-165 Hz, accettando distanza, riflessi e impostazioni PC.

### Quando il monitor è la scelta giusta

- **Competitive.** 24-27", refresh alti, input lag basso, DisplayPort, motion clarity e dimensioni gestibili.
- **Scrivania e testo.** Densità, ergonomia, sleep/wake, assenza di overscan e modalità PC rendono il monitor più prevedibile.
- **Lavoro e gaming nello stesso posto.** Un 27" 1440p o 4K con buon trattamento antiriflesso è più facile da integrare.
- **VRR e frame rate alti.** Il monitor offre in genere range VRR più ampi, overdrive regolabile e minore elaborazione.

### Cosa controllare su una TV usata come monitor

1. **Modalità Game o PC.** Senza, l'input lag può essere alto e l'elaborazione può aggiungere ritardo.
2. **4:4:4 e 4:2:0.** A 4K 120 Hz su HDMI 2.0 o con banda limitata puoi ritrovarti in sottocampionamento chroma; verifica la modalità e il cavo.
3. **Overscan e scala.** Il desktop deve essere 1:1, senza bordi tagliati.
4. **ABL e ASBL.** Su OLED, luminosità e dimming automatico possono cambiare durante il desktop.
5. **Burn-in.** Elementi fissi di Windows, barre delle app e HUD possono lasciare tracce; usa OLED Care e non lasciare contenuti statici per ore.
6. **Riflessi e distanza.** Un pannello lucido da 55" in una stanza con finestre può essere meno pratico di un monitor opaco.
7. **Sleep/wake e HDMI-CEC.** Il comportamento non è quello di un monitor; a volte serve un telecomando o una configurazione dedicata.

In sintesi: per competitive e produttività il monitor è più prevedibile; per immersione, console e HDR da divano la TV è spesso superiore. Un 42" OLED TV può essere un ottimo compromesso desktop, ma non è un monitor da eSports.

## 8. Le impostazioni del monitor, una per una

Il menu di un monitor gaming può avere decine di voci. Alcune cambiano davvero l'immagine o la latenza; altre sono marketing. La regola è sempre la stessa: una modifica alla volta, con un contenuto di riferimento e la possibilità di tornare indietro.

### Luminosità, contrasto e gamma

**Luminosità.** In SDR, per una stanza buia, 100-150 nit sono spesso sufficienti; in una stanza luminosa servono 200-300 nit o più. Non massimizzare per abitudine: peggiora l'affaticamento, riduce la durata dell'OLED e può rendere più visibili i difetti. In HDR la luminosità è gestita dal tone mapping e dal contenuto.

**Contrasto.** Su molti LCD è il livello del bianco o il rapporto tra bianco e nero; su alcuni OLED è un controllo di gamma. Non usare «contrasto dinamico» per giocare: cambia l'immagine in base al contenuto e rende impossibile confrontare due scene.

**Gamma.** Per SDR il riferimento è 2.2; in una stanza molto buia si può preferire 2.4, in una stanza luminosa 2.0-2.2. Un gamma troppo alto schiaccia le ombre, troppo basso lava il nero. Per HDR segui la curva del monitor e, se disponibile, HGIG per i giochi che lo supportano.

### Colore, temperatura e spazio colore

**Temperatura colore.** Il riferimento è D65, circa 6500 K. Le modalità «Cool» o «Vivid» sono più blu e più sature, non più accurate. Se non hai una sonda, parti da «Standard» o «sRGB» e lascia perdere regolazioni RGB casuali.

**Spazio colore.** Lo spazio colore, o gamut, è lo «spettro» di colori che il pannello può riprodurre: sRGB per SDR, DCI-P3 per HDR/cinema, Adobe RGB per lavori specifici. Un monitor wide-gamut senza clamp sRGB può mostrare colori troppo saturi nei giochi SDR. Cerca la modalità sRGB o un profilo ICC del produttore, ma verifica con un contenuto noto.

**10 bit e dithering.** Il pannello può essere nativo 8 bit, 8 bit + FRC o 10 bit. Per HDR e sfumature fini il 10 bit aiuta, ma non rende automaticamente migliore un pannello mediocre. Il dithering può ridurre il banding; non è un difetto da disattivare senza motivo.

### Overdrive, MPRT e motion blur reduction

**Overdrive.** Parti da Normal o dal livello intermedio consigliato dalla recensione del tuo modello. Se vedi aloni chiari dietro gli oggetti, abbassa; se vedi scie, alza di un passo. Non usare Extreme per default.

**MPRT / BFI / strobing.** Nomi come DyAc, DyAc 2, DyAc+, ELMB, ULMB, ULMB 2, PureXP, VRB, Aim Stabilizer, SLMB indicano tutti, in modi diversi, una riduzione della persistence: retroilluminazione strobo su LCD o frame neri su OLED. Migliorano la nitidezza in movimento, ma riducono la luminosità, possono introdurre flicker e crosstalk e spesso richiedono frame rate stabile e vicino al refresh. Non sono compatibili con il VRR su molti modelli: attivali solo se giochi a un titolo competitivo con FPS alti e stabili.

**Black eQualizer / Black Boost / Shadow Boost.** Alzano la luminosità delle ombre per vedere meglio gli avversari. Utile in alcuni FPS, ma riduce il contrasto, schiaccia il nero e può nascondere dettagli. Non è un controllo di response time e non serve in tutti i giochi.

**Sharpness.** Di solito 50 o «neutral» è il valore corretto. Oltre, compaiono aloni e artefatti; sotto, l'immagine diventa morbida. Se usi una risoluzione non nativa, meglio lasciare lo scaling alla GPU o usare l'integer scaling.

### HDR, local dimming e VRR

**HDR.** Attivalo solo per contenuti HDR. Su Windows, calibra con l'app HDR Calibration e verifica che il gioco supporti HDR nativo; un HDR forzato su contenuti SDR lava i colori e alza il nero. Su OLED, HDR è il contesto in cui l'ABL si nota di più; su Mini LED, è il contesto in cui il local dimming lavora meglio.

**Local dimming.** Su LCD Mini LED, attivalo per HDR e valuta l'effetto su SDR: può creare blooming attorno al mouse, alle finestre e ai sottotitoli. Su OLED non c'è local dimming a zone: è per pixel.

**VRR.** Attiva G-Sync/FreeSync/Adaptive-Sync, imposta il refresh massimo e usa un frame limiter qualche frame sotto il massimo per evitare di uscire dal range. La guida [Sincronizzazione, presentazione e limiter](05-sincronizzazione-limiter.md) spiega il perché. Su OLED, verifica il flicker VRR con contenuti scuri e frame rate variabili.

**DSC.** Lascia Auto se il monitor e la GPU lo supportano. Se hai problemi di banda, nero intermittente o risoluzione limitata, controlla cavo, porta e modalità; non disattivare DSC se ti serve per 4K 240 Hz.

### Altre voci che trovi nel menu

| Voce | A cosa serve | Quando usarla |
|---|---|---|
| **Response Time / Overdrive** | Accelerare le transizioni | Sempre, al livello calibrato |
| **MPRT / BFI / DyAc / ELMB** | Ridurre la persistence | Competitive con FPS stabili; non con VRR |
| **Black eQualizer / Shadow Boost** | Schiarire le ombre | FPS con avversari in zone scure; con moderazione |
| **Sharpness** | Nitidezza artificiale | 50/neutro; non oltre |
| **Aspect / Scaling** | Gestire formati e risoluzioni | 1:1 o integer scaling per il competitive |
| **HDR / HGIG** | Tone mapping HDR | Solo contenuti HDR |
| **Local Dimming** | Zone della retroilluminazione | HDR su Mini LED; valuta in SDR |
| **VRR / Adaptive-Sync** | Refresh variabile | Quasi sempre, con frame limiter |
| **DSC** | Compressione del segnale | Auto, se serve banda |
| **KVM / USB Hub** | Condivisione periferiche | Setup multi-PC |
| **Crosshair / Timer / FPS counter** | Overlay di gioco | Utilità soggettiva; non migliora il pannello |
| **RGB / Logo / Ambient Light** | Estetica | Nessun effetto sulle prestazioni |

## 9. La luminosità influisce sul response time?

La risposta breve è: **non è la manopola principale del response time, ma può influenzare ciò che percepisci e, in alcuni casi, il comportamento del pannello.** La risposta lunga dipende dalla tecnologia.

Su un **LCD**, la luminosità del menu agisce soprattutto sulla retroilluminazione. Il tempo di commutazione del cristallo liquido dipende dalla transizione, dalla temperatura, dall'overdrive e dal refresh, non direttamente dal livello del bianco. Abbassare la luminosità non rende automaticamente il pixel più lento, ma può ridurre il segnale utile e rendere più difficile misurare le transizioni scure; inoltre, se la regolazione usa PWM a bassa frequenza, può introdurre flicker e peggiorare la percezione del movimento.

Su un **OLED**, la luminosità è legata alla corrente che attraversa i pixel. La commutazione è quasi istantanea, ma l'ABL e le funzioni di risparmio possono cambiare la luminosità in modo dinamico. Questo non aggiunge un ritardo di risposta paragonabile a quello di un LCD lento, ma può rendere meno stabile l'immagine in scene chiare e influenzare la percezione del contrasto e del motion blur.

Il legame più diretto è con le modalità di riduzione della persistence: **BFI, strobing e MPRT riducono la luminosità per accorciare il tempo in cui il frame è visibile.** Più il duty cycle è corto, più l'immagine è nitida in movimento e più il pannello appare scuro. Ecco perché un monitor molto luminoso può permettersi una modalità strobe più efficace, mentre un pannello meno luminoso deve scegliere tra nitidezza e brightness.

In pratica: non abbassare la luminosità sperando di migliorare il GtG; usa la luminosità per comfort, ambiente e HDR. Se vuoi meno scia, lavora su refresh, overdrive e persistence, non sul dimmer. Misura sempre GtG e MPRT con metodo dichiarato, e diffida dei numeri ottenuti in modalità diverse.

## 10. Competitivo, immersione e generi: come scegliere

Non esiste un monitor per «gaming» in generale. Un FPS competitivo, un single player cinematografico e un simulatore di guida hanno priorità diverse.

Anche il **formato** conta. Il 16:9 è lo standard universale; il 21:9 (3440x1440 o 5120x2160) allarga il campo visivo ed è adatto a immersione e sim; il 32:9 (5120x1440) è una vera alternativa a due monitor, ma richiede spazio e supporto del gioco; il 24:10 è un formato produttivo con buona altezza verticale; il 5K2K è un ultrawide ad alta densità, più impegnativo per la GPU. Prima di scegliere un formato anomalo verifica che i tuoi giochi lo supportino e che la GPU regga la risoluzione.

| Profilo | Formato e dimensione | Refresh e pannello | Priorità |
|---|---|---|---|
| **FPS competitivo** | 24-27", 1080p/1440p | 240-600 Hz, TN/Fast IPS/OLED | Motion clarity, input lag, frame rate stabile |
| **Battle royale / competitivo moderno** | 27", 1440p | 240-360 Hz, OLED/IPS | Equilibrio tra dettaglio, campo visivo e velocità |
| **Single player cinematografico** | 32" 4K o 42-48" TV | 120-240 Hz, OLED/Mini LED | Contrasto, HDR, dimensione, angoli |
| **Sim racing / flight** | 34-49" ultrawide o triplo | 144-240 Hz, VA/OLED | Immersione, campo visivo, curvatura, stabilità |
| **MMO / MOBA / RTS** | 27-34", 1440p | 165-240 Hz, IPS/OLED | Testo, colori, area di lavoro, burn-in |
| **Console** | 27-32" monitor o 42-65" TV | 4K 120-165 Hz, HDMI 2.1, VRR | HDR, dimensione, modalità game, 4:4:4 |
| **Uso misto lavoro/gaming** | 27" 1440p/4K | 120-240 Hz, IPS/OLED RGB-stripe | Testo, ergonomia, uniformità, burn-in |

**Competitivo.** La priorità è la nitidezza in movimento e la reattività, non il nero profondo. Un 24-25" 1080p TN o Fast IPS a 240-600 Hz, con frame rate alto e stabile, è ancora il riferimento per molti eSports. Un 27" 1440p OLED a 240-500 Hz è più versatile e offre un'immagine migliore, ma costa di più e richiede una GPU adeguata. Il salto da 240 a 360/500 Hz è piccolo e diventa evidente solo con frame rate e gioco coerenti.

**Immersione.** La dimensione e il contrasto contano più del refresh estremo. Un 32" 4K OLED a 240 Hz o un 42-48" OLED TV a 120-165 Hz offrono un'esperienza più coinvolgente di un 24" 500 Hz. Per HDR in una stanza luminosa, un Mini LED con molte zone può essere più adatto di un OLED meno brillante.

**Sim racing e flight.** L'ultrawide 21:9 o 32:9 aumenta il campo visivo; la curvatura aiuta a mantenere la distanza costante. La risoluzione 3440x1440 o 5120x1440 riduce il carico rispetto al 4K, ma richiede una GPU solida. Il VA offre neri profondi a costo contenuto, l'OLED offre motion clarity e contrasto, il Mini LED offre luminosità.

**Console.** Cerca HDMI 2.1, 4K 120 Hz, VRR, ALLM e modalità game a basso input lag. Un monitor da 27-32" è più adatto a una scrivania; una TV da 42-65" è più adatta al divano. Verifica il supporto 1440p se giochi su Xbox o PC, e il comportamento HDR.

## 11. Comprare un monitor: checklist, feature utili e trappole

### Prima di scegliere

1. **Misura la distanza e la scrivania.** 24-25" a 60-80 cm, 27" a 70-90 cm, 32" a 80-100 cm, ultrawide a 80-120 cm. La distanza conta più della diagonale.
2. **Scegli la risoluzione in base alla GPU.** 1080p per competitive ad alto refresh, 1440p per il compromesso più diffuso, 4K per dettaglio e console. 4K 240 Hz richiede DisplayPort 2.1/DSC e una GPU adeguata.
3. **Parti dal pannello, non dal nome del modello.** TN, IPS, VA, OLED e Mini LED hanno limiti diversi; un modello economico con lo stesso pannello di uno costoso può avere firmware, overdrive e porta diversi.
4. **Leggi recensioni con misure.** Cerca GtG, overshoot, MPRT, uniformità, input lag, VRR, HDR e comportamento con local dimming. Le schede tecniche da sole non bastano.
5. **Controlla la garanzia.** Per OLED, verifica se il burn-in è coperto e per quanto; per LCD, la politica sui pixel difettosi e la possibilità di reso.

### Feature utili

- **VRR ben implementato** e overdrive regolabile, meglio se variable.
- **DisplayPort 1.4/2.1 e HDMI 2.1** in base a PC e console.
- **DSC** per risoluzioni e refresh elevati.
- **Stand regolabile** in altezza, inclinazione, rotazione e pivot; attacco VESA.
- **Modalità sRGB** e buona calibrazione di fabbrica.
- **Local dimming** con un numero di zone adeguato, se HDR è una priorità.
- **BFI/MPRT** se giochi competitive con FPS stabili.
- **USB hub/KVM** per setup multi-dispositivo.
- **Firmware aggiornabile** e OSD con joystick.
- **Rivestimento adatto alla stanza**: opaco per ambienti luminosi, lucido per massima nitidezza.

### Feature sopravvalutate o da verificare

- **«1 ms» o «0,03 ms» senza metodo.** Possono riferirsi a GtG, MPRT o a una modalità specifica.
- **«HDR» senza local dimming o senza wide gamut.** Spesso è solo un ingresso HDR, non un vero HDR.
- **Contrasto dinamico.** Cambia l'immagine e non è utile per gaming o calibrazione.
- **Modalità «gaming» o «FPS».** Spesso alzano saturazione e sharpness; meglio partire da Standard/sRGB.
- **Crosshair e timer.** Utili a qualcuno, irrilevanti per la qualità del pannello.
- **RGB e luci ambientali.** Non migliorano né latenza né immagine.
- **Curvatura senza motivo.** Su 27" piatti è spesso inutile; su ultrawide può aiutare.
- **Refresh estremo senza GPU.** Un 500 Hz con 150 FPS non offre i vantaggi del refresh.

### Domande da fare al venditore

- Il pannello è lo stesso della recensione o è una revisione diversa?
- Il firmware è aggiornato? Ci sono note di versione?
- Qual è la politica su pixel difettosi e reso?
- La garanzia copre il burn-in OLED?
- Il cavo incluso supporta la modalità massima?
- Il monitor ha DSC, DisplayPort 2.1, HDMI 2.1 e quale larghezza di banda?

## 12. Verifica pratica: cosa fare appena arriva

1. **Controlla imballaggio, seriale, firmware e versione del pannello.** Annota tutto prima di modificare.
2. **Cerca pixel difettosi e subpixel.** Usa sfondi pieni rosso, verde, blu, bianco e nero.
3. **Controlla uniformità e bleeding.** Al buio, su grigio e nero; non giudicare da una foto del telefono.
4. **Verifica il testo.** Apri un documento, un browser e un editor; guarda frange e nitidezza.
5. **Imposta luminosità, gamma e temperatura.** Parti da Standard/sRGB, poi adatta all'ambiente.
6. **Prova il motion clarity.** Usa TestUFO o un test di inseguimento; confronta overdrive Off/Normal/Fast.
7. **Prova il VRR.** Attiva G-Sync/FreeSync, guarda il range, cerca flicker e stutter.
8. **Prova HDR e local dimming.** Con un contenuto HDR noto; controlla blooming, ABL e dettaglio nelle ombre.
9. **Prova BFI/MPRT se ti interessa.** Verifica luminosità, flicker, crosstalk e compatibilità con il frame rate.
10. **Fai un A-B-A.** Una modifica, stessa scena, stesso gioco, stessa luce; conserva anche i risultati deludenti.
11. **Se qualcosa non torna, documenta e valuta il reso.** Non aspettare oltre la finestra di reso per difetti evidenti.

## Fonti e limiti documentali

Le fonti sostengono i meccanismi e le pratiche descritte, non un benchmark del tuo monitor. Le recensioni citate possono riferirsi a modelli o firmware diversi; verifica sempre la revisione esatta del prodotto che acquisti. I nomi commerciali (DyAc, ELMB, ULMB, Black eQualizer, True Black, QuantumBlack, DarkArmor, BlackShield) appartengono ai rispettivi produttori e non sono certificazioni universali.

1. TFTCentral, [The Best Recommended Gaming Monitors 2026](https://tftcentral.co.uk/recommendations/the-best-recommended-gaming-monitors-2026), aggiornato 19 giugno 2026.
2. TFTCentral, [The Best OLED Gaming Monitors to Buy in 2026](https://tftcentral.co.uk/recommendations/the-best-oled-gaming-monitors-to-buy-in-2026), aggiornato 23 ottobre 2026.
3. TFTCentral, [The Definitive OLED Frequently Asked Questions (FAQ)](https://tftcentral.co.uk/articles/the-definitive-oled-frequently-asked-questions-faq), 5 agosto 2026.
4. TFTCentral, [QD-OLED Generations Infographic and FAQ](https://tftcentral.co.uk/articles/qd-oled-generations-infographic-and-faq), aggiornato 30 luglio 2026.
5. TFTCentral, [OLED RGB-stripe Panels Explained – Should You Wait?](https://tftcentral.co.uk/articles/oled-rgb-stripe-panels-explained-should-you-wait), 7 agosto 2026.
6. TFTCentral, [Response Time Testing – Pitfalls, Improvements and Updating Our Methodology](https://tftcentral.co.uk/articles/response_time_testing), 25 febbraio 2021.
7. TFTCentral, [Why Moving Picture Response Time (MPRT) Specs Can Be Misleading](https://tftcentral.co.uk/articles/why-moving-picture-response-time-mprt-specs-can-be-misleading-and-where-1ms-mprt-is-sometimes-abused), 28 aprile 2019.
8. Blur Busters, [Motion Blur Reduction (ULMB, LightBoost, etc)](https://blurbusters.com/faq/motion-blur-reduction/), 29 aprile 2018.
9. Blur Busters, [Why Do Some OLEDs Have Motion Blur?](https://blurbusters.com/faq/oled-motion-blur/), 28 dicembre 2018.
10. TFTCentral, [How to Choose a Gaming Monitor](https://tftcentral.co.uk/articles/how-to-choose-a-gaming-monitor-including-asus-rog-and-tuf-gaming-range-round-up-and-buyers-guide), aggiornato 3 novembre 2025.
11. TFTCentral, [The Console Gaming Monitor Guide](https://tftcentral.co.uk/guides/how-to-choose-and-set-up-a-monitor-for-console-gaming), 9 dicembre 2025.
12. TFTCentral, [Exploring OLED Brightness – Improvements, WOLED vs QD-OLED and the Need for New Metrics and Specs](https://tftcentral.co.uk/articles/exploring-oled-brightness-improvements-woled-vs-qd-oled-and-the-need-for-new-metrics-and-specs), 15 febbraio 2024.
13. TFTCentral, [OLED Dimming Confusion – APL, ABL, ASBL, TPC and GSR Explained](https://tftcentral.co.uk/articles/oled-dimming-confusion-apl-abl-asbl-tpc-and-gsr-explained).
14. TFTCentral, [Exploring and Testing OLED VRR Flicker](https://tftcentral.co.uk/articles/exploring-and-testing-oled-vrr-flicker).
15. TFTCentral, [Exploring the “Grey Banding” Issue Affecting Some Tandem WOLED Panels](https://tftcentral.co.uk/articles/exploring-the-grey-banding-issue-affecting-some-tandem-woled-panels), 13 febbraio 2026.
16. VESA, [DisplayHDR](https://displayhdr.org/) e [DisplayHDR True Black](https://displayhdr.org/performance-criteria/), criteri di certificazione HDR.
17. VESA, [Adaptive-Sync](https://vesa.org/vesa-standards/), riferimento per il refresh variabile.
18. HDMI Forum, [HDMI 2.1 Specification](https://hdmiforum.org/hdmi-forum-releases-version-2-1-final-specification/), larghezza di banda e funzioni per console e TV.
