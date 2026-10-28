### Perché si consiglia spesso DP sul PC e HDMI sulla console

**PC con monitor gaming: DisplayPort è spesso un buon punto di partenza**, perché molti monitor espongono su DP il refresh massimo e il percorso Adaptive-Sync previsto per il PC. È comune anche su schede video con più uscite e nei collegamenti MST/USB-C. È una regola di compatibilità, non una proprietà del cavo che abbassa automaticamente l'input lag. Se l'HDMI del monitor offre più banda o le funzioni necessarie, scegliere HDMI può essere altrettanto corretto.

Un esempio chiarisce il limite della regola: **DP HBR3 offre 25,92 Gbit/s dopo codifica, mentre HDMI FRL48 arriva a 42,67 prima degli ulteriori overhead**. Su una GPU con DP 1.4a e HDMI 2.1, il collegamento HDMI può dunque portare un segnale non compresso più impegnativo. Con UHBR20 la situazione cambia ancora. Confronta le porte reali, non “DP contro HDMI” in astratto.

**PS5/PS5 Pro e Xbox Series X: HDMI è il percorso nativo verso TV e monitor compatibili.** Non dispongono di un'uscita DisplayPort da preferire per il gaming. Su PS5, Sony documenta la verifica del segnale HDMI, HDR, VRR e output 120 Hz; Xbox Series X espone una porta HDMI 2.1. Un adattatore HDMI→DP aggiunge una conversione e può limitare VRR, HDR o refresh: non crea una modalità che la console non produce. [Sony, impostazioni video PS5](https://www.playstation.com/en-us/support/hardware/ps5-4k-resolution-guide/), [Microsoft, specifiche Xbox Series X](https://www.xbox.com/en-US/consoles/xbox-series-x).

Per le console cerca quindi **l'ingresso HDMI del monitor che accetti la modalità della console**, non soltanto un pannello “240 Hz”. La modalità 120 Hz richiede anche un gioco e una configurazione che la supportino; il cavo non trasforma una modalità a 60 FPS in una a 120 FPS. Un monitor FreeSync su DisplayPort non garantisce automaticamente HDMI VRR per PS5. Le verifiche vanno fatte per porta e dispositivo.

HDMI è utile anche per un **PC collegato a una TV**: è il collegamento normalmente disponibile e si integra con funzioni come ALLM, CEC ed eARC nella catena TV/soundbar. eARC è il ritorno audio fra display e dispositivo audio compatibili, non una funzione che aumenta gli FPS della GPU. Anche DP trasporta audio: “DP per video, HDMI per audio” sarebbe una distinzione sbagliata. [Funzioni HDMI](https://www.hdmi.org/spec/hdmi2).

### GPU NVIDIA e AMD: esempi concreti, non rate dedotti dal nome

Specifiche ufficiali consultate il **24 ottobre 2026**. Sono esempi di modelli, non una promessa valida per ogni scheda custom o notebook della stessa famiglia.

| GPU | Uscita DisplayPort dichiarata | Uscita HDMI dichiarata | Che cosa cambia nella scelta |
|---|---|---|---|
| NVIDIA GeForce RTX 5090 / RTX 5080 | 2.1b, **UHBR20**, 80 Gbit/s lordi | 2.1b | Possibile sfruttare un ingresso monitor UHBR20 con cavo adeguato; il solo pannello ad alto refresh non prova questo rate |
| NVIDIA GeForce RTX 4090 | 1.4a, HBR3 | 2.1a | HDMI FRL può avere più banda non compressa del DP di questa scheda; DP resta valido con le modalità/DSC supportate |
| AMD Radeon RX 9070 XT / RX 9070 | 2.1a | 2.1b | Le schede prodotto AMD citate non esplicitano il livello UHBR: non assegniamo 80 Gbit/s leggendo soltanto “2.1a”; verificare il modello del partner e il rate documentato |
| AMD Radeon RX 7900 XTX / RX 7900 XT | 2.1, **UHBR13.5**, 54 Gbit/s lordi | 2.1a nel documento di lancio | Esempio documentato di DP 2.1 che non raggiunge UHBR20; un cavo DP80 non cambia il trasmettitore |

Fonti: NVIDIA [RTX 5090](https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5090/), [RTX 5080](https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5080/), [RTX 4090](https://www.nvidia.com/en-us/geforce/graphics-cards/40-series/rtx-4090/); AMD [RX 9070 XT](https://www.amd.com/en/products/graphics/desktops/radeon/9000-series/amd-radeon-rx-9070xt.html), [RX 9070](https://www.amd.com/en/products/graphics/desktops/radeon/9000-series/amd-radeon-rx-9070.html), [RX 7900 e UHBR13.5](https://www.amd.com/en/newsroom/press-releases/2022-11-3-amd-unveils-world-s-most-advanced-gaming-graphics-.html).

NVIDIA accompagna i massimi pubblicizzati, per esempio 4K480 sulle RTX 5090/5080, con condizioni che includono **DSC**. Non presentarli come “4K480 non compresso” né come FPS garantiti in gioco. La porta determina quali segnali sono trasportabili; il motore, il carico e la GPU determinano quanti frame vengono prodotti.

### Uscita GPU, cavo e ingresso monitor: tre esempi della stessa catena

Sul monitor la porta che riceve il segnale è un **ingresso**. Per la modalità desiderata devono essere compatibili **trasmettitore della GPU → cavo → ricevitore del monitor**, più gli eventuali intermediari. Non occorre che tutte le etichette riportino la stessa revisione: occorre un insieme comune di rate, formato, timing e funzioni.

1. **RTX 5090/5080 → cavo DP80 → MSI MPG 322URX QD-OLED.** Il monitor dichiara DP 2.1a UHBR20 e un pannello 3840×2160 a 240 Hz. La GPU dichiara DP 2.1b UHBR20: le revisioni diverse non impediscono un collegamento UHBR20. È una catena documentata per valutare il 4K240 senza dover dedurre la banda dal numero “2.1”; formato e DSC vanno comunque verificati nella modalità attiva. [Specifiche MSI](https://storage-asset.msi.com/datasheet/monitor/uk/MPG-322URX-QD-OLED.pdf).
2. **RX 7900 XTX → lo stesso DP80 → lo stesso monitor.** Il ricevitore arriva a UHBR20, ma la GPU si ferma a UHBR13.5. Il budget resta quello inferiore: 4K240 RGB a 10 bit supera la sua banda non compressa già con i soli pixel visibili. Occorre una modalità DSC compatibile o un compromesso di segnale; il cavo più capace non elimina il limite.
3. **GPU UHBR20 → cavo DP80 → monitor limitato a HBR3.** È il ricevitore a limitare il percorso DP. Se quel monitor offre anche HDMI FRL48, l'HDMI può essere la scelta con più banda non compressa. Questo confronto richiede le specifiche dei due ingressi del monitor, non il massimo dichiarato per il pannello nel complesso.

Lo stesso principio vale per HDMI: un cavo **Ultra96** fra una GPU HDMI 2.1b e un monitor HDMI 2.1 non trasforma le porte in HDMI 2.2. Un nuovo monitor HDMI 2.2 non aggiorna l'uscita della GPU. Sulle GPU elencate sopra non è dichiarata un'uscita HDMI 2.2: i 96 Gbit/s della specifica non sono quindi un risultato ottenibile aggiungendo soltanto quel cavo.

Per decidere, scrivi prima il bersaglio, per esempio **3840×2160, 120 Hz, RGB a 10 bit, HDR e VRR**. Controlla poi, nell'ordine, la tabella del singolo ingresso del monitor, l'uscita del modello preciso di GPU/console, la classe e lunghezza del cavo e tutti gli intermediari. Se DP e HDMI soddisfano entrambi il bersaglio con stabilità, scegli il percorso più semplice e comodo: non attribuire al connettore un vantaggio di latenza non misurato.
