import{f as e,l as t,t as n,u as r}from"./proxy-CTr6jZYx.js";import{r as i,t as a}from"./guideHeadingCase-S2gc4f28.js";var o=e(r(),1),s=`Ecco un report tecnico dettagliato e aggiornato al 2026 sulla gestione dei modelli di presentazione (Presentation Models) in Windows 11 e su come configurare al meglio il tuo sistema per ottenere la latenza minima su hardware moderno.

Negli ultimi anni, Microsoft ha completamente rivoluzionato il modo in cui i giochi comunicano con lo schermo tramite il WDDM (Windows Display Driver Model). I vecchi concetti legati al "Fullscreen Esclusivo" sono ormai considerati legacy, e l'architettura moderna si basa su modelli "Flip" molto più efficienti.

---

### 1. FSE (Fullscreen Exclusive) vs. FSO (Fullscreen Optimizations)

**Cosa sono e cosa fanno:**
* **FSE (Fullscreen Exclusive):** Era lo standard d'oro fino a Windows 7/8. Il gioco prendeva il controllo esclusivo del monitor, bypassando il Desktop Window Manager (DWM) di Windows. Offriva la latenza minima, ma rendeva lentissimo il passaggio ad altre app (Alt-Tab) e impediva la visualizzazione di overlay (come la barra del volume o le notifiche).
* **FSO (Fullscreen Optimizations):** Introdotte in Windows 10 e perfezionate in Windows 11, le "Ottimizzazioni a schermo intero" sono una sorta di "wrapper". Quando avvii un gioco legacy in FSE, Windows lo converte in modo invisibile in una finestra senza bordi (Borderless) che utilizza un modello di presentazione moderno chiamato **Independent Flip**. 

**Perché FSO è superiore su hardware moderno:**
Con l'Independent Flip, il gioco invia i fotogrammi direttamente allo schermo, aggirando il compositore di Windows esattamente come faceva l'FSE, ottenendo **la stessa identica latenza**. In più, permette un Alt-Tab istantaneo e l'uso di overlay. 

**Quando attivarlo/disattivarlo:**
* **Setup consigliato:** Lasciare FSO **sempre attivo** (comportamento di default). 
* **Quando disattivarlo:** Solo in rari casi di troubleshooting con giochi molto vecchi (DirectX 9 o precedenti) o engine grafici non aggiornati che mostrano stuttering anomalo. Per disattivarlo: clic destro sull'eseguibile del gioco -> *Proprietà* -> *Compatibilità* -> *Disabilita ottimizzazioni a schermo intero*.

### 2. MPO (Multi-Plane Overlay)

**Cosa fa:**
MPO è una funzione dell'architettura WDDM supportata dalle moderne GPU (NVIDIA, AMD, Intel). Permette alla scheda video di combinare (compositare) diversi "piani" (ad esempio: il piano del gioco, il piano dell'overlay di Discord, il piano del cursore del mouse) direttamente via hardware nel controller del display, **senza utilizzare i core grafici (shader) della GPU**.

**L'impatto sulle prestazioni:**
MPO riduce drasticamente il consumo energetico, allevia il carico sulla GPU e abbassa la latenza quando si gioca in modalità finestra o si usano overlay. Senza MPO, il DWM di Windows deve fare il rendering di tutti questi elementi insieme prima di inviarli al monitor, aggiungendo latenza.

**Quando attivarlo/disattivarlo:**
* **Setup consigliato:** **Sempre attivo.** È abilitato di default da Windows e dai driver.
* **Contesto storico (e perché se ne parla):** Tra il 2022 e il 2023, c'erano bug noti nei driver NVIDIA e AMD che causavano sfarfallii (flickering), stuttering o schermate nere quando MPO era attivo. Molte guide suggerivano di disabilitarlo tramite Registro di Sistema (Registry). **Nel 2026, questi bug sono stati risolti** sulle architetture moderne. Disabilitare MPO oggi significa solo aumentare artificialmente la latenza e il carico sulla GPU.

### 3. Ottimizzazioni per i giochi in modalità finestra (Windowed Optimizations)

**Cosa fanno:**
Questa opzione (introdotta in Windows 11) forza i vecchi giochi DirectX 10 e DirectX 11 che girano in modalità "Finestra" o "Finestra senza bordi" ad abbandonare il vecchio e lento modello di presentazione (BitBlt) per passare al moderno **Flip Model** (Flip Sequential o Flip Discard). 

**L'impatto sulle prestazioni:**
È una funzione "game-changer". Prima di questa opzione, giocare in Borderless Windowed aggiungeva 1 o 2 frame di latenza a causa dell'intervento forzato del DWM e del V-Sync di Windows. Con questa opzione attiva, **giocare in Borderless Windowed offre la stessa latenza del Fullscreen Esclusivo**. Inoltre, sblocca l'uso dell'Auto HDR e del VRR in modalità finestra per i vecchi titoli. (I giochi DirectX 12 usano già nativamente il Flip Model).

**Come settarlo:**
* **Setup consigliato:** **Attivo**.
* **Percorso:** *Impostazioni di Windows > Sistema > Schermo > Grafica > Modifica impostazioni grafiche predefinite > Ottimizzazioni per i giochi in modalità finestra* (su "Attivato").

### 4. Supporto alla Frequenza di Aggiornamento Variabile (VRR)

**Cosa fa:**
Questa opzione a livello di sistema operativo dice a Windows di supportare nativamente tecnologie come G-Sync (NVIDIA), FreeSync (AMD) e VESA Adaptive-Sync. Sincronizza dinamicamente gli Hz del monitor con gli FPS generati dal gioco, eliminando il *tearing* (spezzettamento dell'immagine) e riducendo lo stuttering.

**Come settarlo:**
* **Setup consigliato:** **Attivo**.
* **Percorso:** *Impostazioni di Windows > Sistema > Schermo > Grafica > Modifica impostazioni grafiche predefinite > Frequenza di aggiornamento variabile*. 
* *Nota:* Devi anche assicurarti che il G-Sync/FreeSync sia abilitato nel pannello di controllo della tua scheda video e nel menu OSD del tuo monitor.

---

### Il "Best Setup" assoluto per la Low Latency (2026)

Se hai un PC moderno (es. CPU Intel Core Ultra / AMD Ryzen 7000-9000, GPU RTX 4000-5000 / Radeon RX 7000-8000) e un monitor ad alto refresh rate, ecco la configurazione definitiva per abbattere la latenza di sistema (System Latency):

1.  **Impostazioni di Windows 11:**
    * *Ottimizzazioni per i giochi in modalità finestra:* **ON**
    * *VRR (Frequenza aggiornamento variabile):* **ON**
    * *MPO:* Lasciato **ON** (non toccare il registro di sistema).
    * *Game Mode (Modalità Gioco):* **ON** (prioritizza i thread del gioco ed evita aggiornamenti in background).
    * *Hardware-Accelerated GPU Scheduling (HAGS):* **ON** (fondamentale per tecnologie come il Frame Generation).

2.  **Impostazioni sui file dei giochi (.exe):**
    * Non spuntare "Disabilita ottimizzazioni a schermo intero". Lascia che Windows usi FSO.

3.  **Impostazioni In-Game:**
    * **Modalità Display:** Scegli **Schermo Intero Senza Bordi (Borderless Windowed)** o **Schermo Intero (Fullscreen)**. Grazie a FSO e alle ottimizzazioni per la modalità finestra, la latenza è identica, ma il Borderless offre un'esperienza desktop molto più fluida.
    * **NVIDIA Reflex / AMD Anti-Lag 2:** **ON** (o ON + Boost se non sei limitato dalla temperatura/power target).
    * **V-Sync In-Game:** **OFF** (Il V-Sync dei motori di gioco aggiunge molta latenza).

4.  **Impostazioni Pannello di Controllo GPU (es. NVIDIA Control Panel):**
    * *Tecnologia Monitor:* G-Sync / G-Sync Compatible.
    * *V-Sync (Sincronizzazione Verticale):* **ON** (Attivare il V-Sync *solo* a livello di driver insieme al G-Sync compensa le variazioni di frametime senza aggiungere latenza, a patto di seguire il punto successivo).
    * *Max Frame Rate:* **Cap a 3 FPS sotto il refresh rate massimo del monitor** (es. su un monitor a 240Hz, cappalo a 237 FPS). Questo mantiene sempre attivo il G-Sync ed evita che si attivi il comportamento restrittivo del V-Sync classico quando si raggiunge il limite degli Hz. *(Nota: se usi NVIDIA Reflex, spesso il cap degli FPS viene gestito automaticamente dal gioco).*

**Perché questo è il best setup?**
Questa configurazione sfrutta i moderni "Flip Models" del WDDM e l'MPO hardware, assicurando che la pipeline che porta il fotogramma dal motore di gioco al monitor sia il più corta possibile. Sfruttando G-Sync + V-Sync (nel driver) + FPS Limit + Reflex, mantieni la coda di rendering della GPU costantemente vuota e sincronizzata, ottenendo un'immagine fluida, senza tearing e con la minima latenza end-to-end misurabile.

---

Hai sollevato un punto eccellente e assolutamente corretto. Il setup con VRR (G-Sync/FreeSync) attivo e FPS cappati è considerato il "golden standard" per il giocatore medio o per chi cerca la massima fluidità visiva senza artefatti (tearing). Tuttavia, **nel panorama eSportivo competitivo e per la ricerca della latenza pura (absolute minimum input lag), disabilitare il VRR è spesso la scelta preferita.**

Ecco la spiegazione teorica del perché le tue osservazioni empiriche sono corrette, analizzando sia il problema del VRR (specialmente in casa AMD) sia i vantaggi del setup "Unlocked".

---

### 1. Perché disabilitare il VRR (teoria e problemi hardware)

Dal punto di vista teorico e hardware, mantenere una frequenza di aggiornamento fissa (Fixed Refresh Rate) al massimo consentito dal monitor e disabilitare il VRR ha senso per questi motivi:

* **Il ritardo intrinseco del "Capping" (Limitazione degli FPS):**
    Per far funzionare bene il VRR senza tearing, *devi* limitare gli FPS leggermente sotto la frequenza massima del monitor (es. 237 FPS su 240Hz). Limitare gli FPS significa letteralmente dire al motore di gioco di "aspettare" prima di iniziare a calcolare il frame successivo. Questa attesa artificiale, seppur di millisecondi, **è latenza aggiunta**. Disattivando il VRR, puoi lasciare il framerate sbloccato.
* **Processing Delay del Monitor e Overdrive:**
    I moduli G-Sync hardware di NVIDIA hanno storicamente gestito il pixel overdrive in modo dinamico e quasi perfetto. Il FreeSync (AMD) o il G-Sync Compatible, invece, si affidano agli scaler standard dei monitor (Adaptive-Sync VESA). Quando il framerate fluttua, il monitor deve continuamente riadattare la sua finestra di *scanout*. Molti monitor, specialmente se non di fascia altissima, introducono un lievissimo ritardo di elaborazione (processing delay) per gestire questi cambi di frequenza, o falliscono nel calibrare l'overdrive dei pixel, causando un'immagine leggermente più impastata o *ghosting* rispetto a quando lavorano a una frequenza fissa.
* **LFC (Low Framerate Compensation) e Flickering:**
    Se il framerate subisce un calo brusco (es. esplosioni a schermo), il FreeSync attiva l'LFC, duplicando i frame inviati al monitor per mantenerlo nel range di sincronia. Questo passaggio da "frequenza reale" a "frequenza moltiplicata" può causare micro-stutter percepibili o sfarfallii (flickering) della luminosità, alterando la percezione visiva del giocatore e la reattività.

### 2. Il Setup Competitivo Estremo: Unlocked + V-Sync OFF + Reflex/Anti-Lag ON

Questo è attualmente il setup di riferimento per i giocatori professionisti (Valorant, CS2, Apex Legends, ecc.), valido sia su architetture AMD che NVIDIA. 

**Come funziona e perché è teoricamente superiore per l'input lag:**

* **Frequenza sbloccata (Tearing = Dati più freschi):**
    Con V-Sync e VRR spenti, la GPU pompa frame nel *framebuffer* il più velocemente possibile, senza preoccuparsi del ciclo di aggiornamento del monitor. Questo genera il *tearing* (l'immagine spezzata), perché il monitor "pesca" l'immagine mentre la GPU la sta sovrascrivendo. 
    *Dal punto di vista della latenza, questo è un vantaggio enorme:* la parte "strappata" (inferiore) dell'immagine contiene informazioni temporali *più recenti* rispetto alla parte superiore. Se un nemico spunta da un angolo, lo vedrai letteralmente una frazione di millisecondo prima nella porzione aggiornata del tearing.
* **Engine Polling più veloce:**
    Molti motori grafici legano l'elaborazione degli input del mouse/tastiera al framerate. Fare 600 FPS invece di 240 FPS significa che il gioco campiona i tuoi movimenti del mouse 600 volte al secondo, garantendo una precisione mostruosa, indipendentemente dai refresh del monitor.
* **Il ruolo cruciale di NVIDIA Reflex e AMD Anti-Lag 2:**
    Lasciare il framerate sbloccato di solito porta la GPU al 99% di utilizzo. In passato (prima del 2020), avere la GPU al massimo creava una lunga coda di rendering (Render Queue), aumentando drammaticamente l'input lag (fenomeno del *Backpressure*). 
    È qui che entrano in gioco **Reflex e Anti-Lag 2**. Queste tecnologie (integrate a livello di engine del gioco) eliminano la coda di rendering: dicono alla CPU di inviare il lavoro alla GPU *solo ed esattamente* nell'istante in cui la GPU è pronta per elaborarlo. 
    Risultato? Hai i vantaggi degli FPS altissimi (input più reattivo, dati freschissimi a schermo) **senza** la penalità della coda di rendering della GPU.

### Il fattore 2026: L'evoluzione dei monitor

C'è un motivo pratico per cui questo setup "sbloccato" è diventato non solo accettabile, ma preferibile oggi: i monitor.
Giocare con V-Sync OFF a 60Hz o 144Hz rendeva il tearing insopportabile e distraente. Ma oggi, su monitor a **360Hz, 480Hz o 540Hz**, il tempo in cui un frame rimane a schermo (la persistenza) è compreso tra 1.8 e 2.7 millisecondi. A queste velocità stratosferiche, il *tearing* diventa praticamente invisibile all'occhio umano. L'immagine sembra integra, ma i dati che ricevi sono slegati da qualsiasi vincolo di sincronizzazione.

**In sintesi:**
* Se cerchi la **fluidità assoluta** senza difetti visivi (giochi single-player, o hardware che fatica a raggiungere gli Hz del monitor): *VRR ON + V-Sync ON (driver) + FPS Cap.*
* Se cerchi la **reattività assoluta e il minor input lag possibile** (competitivo, monitor ad altissimi Hz, hardware potente): *VRR OFF (sia monitor che Windows) + V-Sync OFF + FPS Unlocked + Reflex / Anti-Lag 2 ON.*

La tua osservazione è perfetta e rappresenta lo stadio più avanzato dell'ottimizzazione del sistema per il gaming competitivo.

`,c=t(),l=e=>i.sanitize(e,{USE_PROFILES:{html:!0}}),u=`w-full rounded-xl border border-zinc-800 my-8 shadow-lg object-contain`,d=[{src:`/images/guides/MPO.webp`,alt:`Schema Multi-Plane Overlay`},{src:`/images/guides/HAGS.webp`,alt:`Schema Hardware Accelerated GPU Scheduling`},{src:`/images/guides/VRR.webp`,alt:`Schema Variable Refresh Rate`}],f=e=>e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/\"/g,`&quot;`).replace(/'/g,`&#39;`),p=e=>{let t=f(e);return t=t.replace(/(https?:\/\/[^\s<]+)/g,`<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>`),t=t.replace(/\*\*([^*]+)\*\*/g,`<strong>$1</strong>`),t=t.replace(/(^|[^*])\*([^*]+)\*/g,`$1<em>$2</em>`),t},m=e=>e.length>0&&e.every(e=>/^\*\s+/.test(e.trim())),h=e=>e.length>0&&e.every(e=>/^\d+\.\s+/.test(e.trim())),g=()=>s.replace(/\r\n/g,`
`).trim().split(/\n{2,}/).map(e=>e.trim()).filter(Boolean).map(e=>{if(/^-{3,}$/.test(e))return{type:`hr`};if(e.startsWith(`### `))return{type:`h2`,content:a(e.slice(4).trim())};let t=e.split(`
`).map(e=>e.trimEnd());return m(t)?{type:`ul`,items:t.map(e=>e.replace(/^\*\s+/,``).trim())}:h(t)?{type:`ol`,items:t.map(e=>e.replace(/^\d+\.\s+/,``).trim())}:{type:`p`,content:e}}),_=()=>{let e=(0,o.useMemo)(()=>g(),[]),t=(0,o.useMemo)(()=>e.length<6?[1]:Array.from(new Set([Math.max(1,Math.floor(e.length*.25)),Math.max(2,Math.floor(e.length*.55)),Math.max(3,Math.floor(e.length*.8))])).filter(t=>t>0&&t<e.length),[e]);return(0,c.jsxs)(`div`,{className:`space-y-4`,children:[(0,c.jsx)(n.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.3,delay:.28},children:(0,c.jsx)(`img`,{src:`/images/guides/presentation-models-1.jpg`,alt:`Modelli di presentazione tecnologici`,className:u})}),e.map((e,r)=>(0,c.jsxs)(`div`,{children:[(0,c.jsx)(n.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.3,delay:.35+r*.03},className:`[&_p]:text-zinc-300 [&_p]:leading-relaxed [&_p]:mb-6 [&_h2]:text-white [&_h2]:font-bold [&_h2]:text-2xl [&_h2]:mt-12 [&_h2]:mb-6 [&_h2]:border-b [&_h2]:border-zinc-800 [&_h2]:pb-2 [&_h3]:text-xl [&_h3]:text-zinc-100 [&_h3]:mt-8 [&_h3]:mb-4 [&_h4]:text-lg [&_h4]:text-primary [&_h4]:mt-6 [&_h4]:mb-3 [&_strong]:text-primary [&_strong]:font-semibold [&_em]:text-zinc-100 [&_ul]:list-disc [&_ul]:list-inside [&_ul]:mb-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:mb-6 [&_ol]:space-y-2 [&_li]:text-zinc-300 [&_li]:leading-relaxed [&_li]:marker:text-primary [&_a]:text-primary [&_a]:underline-offset-2 [&_a:hover]:text-primary`,children:e.type===`h2`?(0,c.jsx)(`h2`,{dangerouslySetInnerHTML:{__html:l(p(e.content))}}):e.type===`ul`?(0,c.jsx)(`ul`,{children:e.items.map((e,t)=>(0,c.jsx)(`li`,{dangerouslySetInnerHTML:{__html:l(p(e))}},`presentation-ul-${r}-${t}`))}):e.type===`ol`?(0,c.jsx)(`ol`,{children:e.items.map((e,t)=>(0,c.jsx)(`li`,{dangerouslySetInnerHTML:{__html:l(p(e))}},`presentation-ol-${r}-${t}`))}):e.type===`hr`?(0,c.jsx)(`hr`,{className:`border-white/10 my-6`}):(0,c.jsx)(`p`,{className:`whitespace-pre-line`,dangerouslySetInnerHTML:{__html:l(p(e.content))}})},`presentation-block-${r}`),t.includes(r+1)?(0,c.jsx)(n.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.3,delay:.38+r*.03},className:`w-full`,children:(0,c.jsx)(`img`,{src:d[Math.min(t.indexOf(r+1),d.length-1)]?.src,alt:d[Math.min(t.indexOf(r+1),d.length-1)]?.alt??`Schema tecnico`,className:u})}):null]},`presentation-block-wrapper-${r}`))]})};export{_ as default};