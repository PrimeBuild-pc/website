import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

// Original qualitative diagrams; no measured performance or vendor UI is implied.
const diagrams = {
  memory: ['RAM, commit e working set', 'compare', ['RAM fisica|Memoria installata', 'Working set|Pagine residenti', 'Commit|Memoria promessa', 'Pagefile|Sostegno al commit'], 'Grandezza e ruolo sono distinti; nessuna quantità è misurata.'],
  recovery: ['Preparare il ritorno', 'flow', ['Stato iniziale', 'Backup verificato', 'Una modifica', 'Verifica', 'Ripristino'], 'Il backup deve esistere prima della modifica.'],
  driver: ['Identità del driver', 'compare', ['Dispositivo|Hardware ID', 'Pacchetto|File INF', 'Componente|File SYS', 'Versione attiva|Gestione dispositivi'], 'Pacchetto disponibile e driver caricato non sono la stessa cosa.'],
  power: ['Tre controlli energetici', 'compare', ['Piano Windows|Politiche energetiche', 'Modalità Windows|Preferenze disponibili', 'Profilo OEM|Potenza e ventole'], 'Annotare anche rete o batteria; confrontare una sola scelta.'],
  limits: ['Le variabili di un overclock', 'radial', ['Frequenza', 'Tensione', 'Corrente / potenza', 'Temperatura'], 'I limiti dipendono da piattaforma, raffreddamento e sample.'],
  'memory-clocks': ['AM5: tre domini di clock', 'compare', ['MCLK|Clock DRAM', 'UCLK|Controller memoria', 'FCLK|Infinity Fabric'], 'UCLK = MCLK identifica 1:1; il guadagno resta da misurare.'],
  validation: ['Una modifica, più prove', 'flow', ['A: riferimento', 'B: una modifica', 'A: ritorno', 'Ripetizioni', 'Decisione'], 'Stesse condizioni; conservare anche esiti inconclusivi e regressioni.'],
  isr: ['Interrupt e lavoro differito', 'flow', ['Dispositivo', 'Interrupt', 'ISR', 'Eventuale DPC'], 'Routine driver: non è una misura del percorso clic → display.'],
  latencymon: ['Cinque viste, cinque domande', 'compare', ['Main|Riepilogo', 'Stats|Durata e statistiche', 'Drivers|Routine e conteggi', 'CPUs|Processori logici', 'Processes|Hard pagefault'], 'Massimi, conteggi e tempo totale restano grandezze distinte.'],
  boundaries: ['Dichiarare gli estremi della misura', 'compare', ['Frame time|Eventi di frame successivi', 'ISR / DPC|Esecuzione delle routine', 'RTT|Andata e ritorno', 'Input → fotone|Trigger e risposta fisica'], 'La stessa unità di tempo non rende equivalenti le misure.'],
  fg: ['Frame renderizzati e immagini generate', 'frames', ['Render N', 'Generato', 'Render N+1', 'Generato'], 'Schema concettuale: immagini aggiunte ≠ nuovi campionamenti input.'],
  cadence: ['Intervalli nominali a cadenza costante', 'bars', ['100 FPS|10', '200 FPS|5', '240 FPS|4.1667'], '1000 / FPS = ms per intervallo; non è la latenza input → fotone.'],
  vrr: ['Il range del Variable Refresh Rate', 'zones', ['Sotto il minimo|LFC se supportata', 'Entro il range|Refresh variabile', 'Sopra il massimo|Dipende da sync e percorso'], 'LFC ripete immagini: non crea nuove simulazioni.'],
  display: ['Verificare tutto il collegamento', 'flow', ['Uscita GPU', 'Dock / adattatore', 'Cavo', 'Ingresso display', 'Modalità attiva'], 'Ogni elemento deve sostenere la modalità richiesta.'],
  scanout: ['Invio progressivo dell’immagine', 'scan', ['Inizio scansione', 'Scansione in corso', 'Fine scansione'], 'Schema spaziale, senza scala temporale: i pixel non cambiano tutti insieme.'],
  bandwidth: ['Che cosa richiede banda al collegamento', 'radial', ['Risoluzione', 'Refresh', 'Profondità colore', 'Formato / compressione'], 'Il requisito riguarda il segnale attivo e le capacità della catena.'],
  input: ['Dal gesto all’immagine', 'flow', ['Gesto / sensore', 'Firmware', 'Collegamento', 'Gioco / rendering', 'Display'], 'Polling, CPI e sensibilità non descrivono la stessa proprietà.'],
  polling: ['Intervallo nominale dei report', 'bars', ['125 Hz|8', '500 Hz|2', '1000 Hz|1', '4000 Hz|0.25', '8000 Hz|0.125'], '1000 / Hz in ms; non è un guadagno di latenza garantito.'],
  hidfilter: ['Rimuovere il filtro nell’ordine previsto', 'flow', ['Periferica identificata', 'Scollegare il filtro', 'Verificare input', 'Rimuovere servizio', 'Verificare nativo'], 'Preparare prima un input alternativo; non cancellare per primo il SYS.'],
  fit: ['Prima della curva EQ', 'radial', ['Posizione', 'Tenuta', 'Comfort', 'Ambiente'], 'Fit ripetibile prima di confrontare il timbro.'],
  dac: ['Dal digitale al trasduttore', 'flow', ['Campioni digitali', 'DAC', 'Amplificazione', 'Cuffie / IEM'], 'Le funzioni possono essere integrate nello stesso dispositivo.'],
  transport: ['Tre collegamenti audio distinti', 'compare', ['Cavo|Percorso fisico', 'Radio proprietaria|Trasporto del dispositivo', 'Bluetooth|Codec e modalità'], 'Il nome del collegamento non certifica la latenza della catena.'],
  buffers: ['Durata di un blocco a 48 kHz', 'bars', ['128 frame|2.6667', '256 frame|5.3333', '512 frame|10.6667'], 'N / 48000 × 1000 ms; non è il tempo totale input → suono.'],
  endpoint: ['Seguire l’uscita realmente ascoltata', 'flow', ['Applicazione', 'Routing', 'Endpoint scelto', 'Driver / dispositivo', 'Cuffie'], 'La selezione esplicita dell’app può ignorare il predefinito Windows.'],
  noapo: ['Due riferimenti audio separati', 'compare', ['No APO|Equalizer APO fuori dal percorso', 'EQ consapevole|APO attivo sull’endpoint scelto'], 'Profilo piatto, EQ OFF e associazione rimossa non sono equivalenti.'],
  timers: ['Quattro proprietà temporali', 'compare', ['Risoluzione|Intervallo distinguibile', 'Accuratezza|Vicinanza al riferimento', 'Costo di lettura|Acquisire il timestamp', 'Risveglio|Riprendere l’esecuzione'], 'Timer resolution e QPC non sono la latenza del gioco.'],
  mmcss: ['MMCSS: serve la partecipazione dell’app', 'flow', ['Applicazione', 'Registrazione del thread', 'Task MMCSS', 'Scheduling'], 'La presenza della chiave Games non registra automaticamente un gioco.'],
  distribution: ['Dieci intervalli: un esempio didattico', 'samples', ['5', '5', '5', '5', '5', '5', '5', '5', '5', '20'], 'Dati inventati dalla guida: media 6,5 ms; mediana 5 ms. Non un benchmark.'],
  upscale: ['Ricostruzione dell’immagine', 'flow', ['Risoluzione interna', 'Dati del motore', 'Ricostruzione', 'Immagine d’uscita'], 'Upscaling e Frame Generation svolgono funzioni differenti.'],
  quality: ['Confrontare qualità e comportamento', 'radial', ['Dettaglio in movimento', 'Artefatti', 'Cadenza di base', 'Latenza'], 'Stessa scena e impostazioni annotate; nessun preset universale.'],
};
const esc = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const text = (x,y,s,size=23,color='#eee',anchor='start') => `<text x="${x}" y="${y}" font-size="${size}" fill="${color}" text-anchor="${anchor}">${esc(s)}</text>`;
const box = (x,y,w,h,fill='#1e2329') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${fill}" stroke="#59616d"/>`;
const arrow = (x,y,x2,y2) => `<path d="M${x},${y} L${x2},${y2}" stroke="#ff8b3d" stroke-width="3" marker-end="url(#arrow)"/>`;
await mkdir('client/public/images/guides/diagrams', {recursive:true});
for (const [id,[title,kind,items,note]] of Object.entries(diagrams)) {
  assert.ok(items.length >= 2 && title && note);
  let graphic = '';
  if (kind === 'bars') {
    const values = items.map(s=>Number(s.split('|')[1]));
    assert.ok(values.every(n=>Number.isFinite(n) && n>0));
    const max = Math.max(...values);
    items.forEach((s,i)=>{
      const [label,value] = s.split('|'); const y=174+i*57;
      graphic += text(50,y+24,label,22)+box(225,y,Math.max(6,Number(value)/max*700),32,'#81451e')+text(945,y+24,`${Number(value).toLocaleString('it-IT',{maximumFractionDigits:3})} ms`,20);
    });
  } else if (kind === 'samples') {
    items.forEach((s,i)=>{const h=Number(s)*12; graphic+=box(65+i*104,440-h,72,h,i===9?'#81451e':'#303b47')+text(101+i*104,470,s+' ms',19,'#eee','middle');});
  } else if (kind === 'scan') {
    items.forEach((s,i)=>{const x=55+i*375; graphic+=box(x,170,335,250); for(let j=0;j<9;j++) graphic+=`<path d="M${x+20},${195+j*24}h295" stroke="${j<=i*4?'#ff8b3d':'#36404b'}" stroke-width="12"/>`; graphic+=text(x+168,462,s,22,'#eee','middle');});
  } else if (kind === 'radial') {
    items.forEach((s,i)=>{const x=i%2?800:60,y=i<2?175:375; graphic+=arrow(x+150,y+40,600,298)+box(x,y,340,72)+text(x+170,y+44,s,23,'#eee','middle');});
    graphic+=box(450,255,300,85,'#81451e')+text(600,305,'Contesto della prova',22,'#fff','middle');
  } else if (kind === 'compare' || kind === 'zones') {
    const h=Math.min(86,320/items.length);
    items.forEach((s,i)=>{const [a,b]=s.split('|');const y=155+i*h;graphic+=box(50,y,1100,h-8,i%2?'#151a20':'#1e2329')+text(75,y+35,a,23,'#ffb07a')+text(380,y+35,b,22);});
  } else {
    const w=1050/items.length;
    items.forEach((s,i)=>{const x=55+i*(w+10); if(i<items.length-1)graphic+=arrow(x+w-8,290,x+w+5,290);graphic+=box(x,235,w-15,110,kind==='frames'&&i%2?'#81451e':'#1e2329'); const words=s.split(' ');let lines=[''];for(const word of words){if((lines.at(-1)+' '+word).length>16)lines.push(word);else lines[lines.length-1]+=(lines.at(-1)?' ':'')+word;}lines.forEach((l,j)=>graphic+=text(x+(w-15)/2,275+j*29,l,21,'#eee','middle'));});
  }
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600" viewBox="0 0 1200 600"><title>${esc(title)}</title><desc>${esc(note)}</desc><defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0 0L7 3L0 6" fill="#ff8b3d"/></marker></defs><rect width="1200" height="600" rx="20" fill="#11151a"/><g font-family="Arial, sans-serif">${text(50,48,'PRIME BUILD / SCHEMA ILLUSTRATIVO ORIGINALE',17,'#ffb07a')}${text(50,102,title,32)}${graphic}${text(50,550,note,20,'#c4cad2')}</g></svg>`;
  await writeFile(`client/public/images/guides/diagrams/${id}.svg`, svg);
}
console.log(`${Object.keys(diagrams).length} original diagrams generated.`);
