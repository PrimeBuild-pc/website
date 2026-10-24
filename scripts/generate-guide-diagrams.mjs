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

// Technical plates use measured geometry only for the explicitly numeric examples.
const esc = s => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const ink='#f4f2ed', muted='#a9a8a5', accent='#ff6900';
const text=(x,y,s,size=24,color=ink,anchor='start')=>`<text x="${x}" y="${y}" font-size="${size}" fill="${color}" text-anchor="${anchor}">${esc(s)}</text>`;
const line=(x,y,x2,y2,color='#41403e',width=2)=>`<path d="M${x} ${y}L${x2} ${y2}" fill="none" stroke="${color}" stroke-width="${width}"/>`;
const rect=(x,y,w,h,fill='none',stroke='#45423e',r=4)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}"/>`;
function wrap(x,y,s,max=25,size=25,color=ink,anchor='start') {
  let lines=['']; for(const word of s.split(' ')){if((lines.at(-1)+' '+word).trim().length>max)lines.push(word);else lines[lines.length-1]+=(lines.at(-1)?' ':'')+word;}
  return lines.map((v,i)=>text(x,y+i*(size+7),v,size,color,anchor)).join('');
}
function icon(type,x,y,scale=1){
  const paths={
    chip:'<rect x="-32" y="-32" width="64" height="64" rx="5"/><rect x="-18" y="-18" width="36" height="36"/><path d="M-46-20h14m-14 20h14m-14 20h14M32-20h14M32 0h14M32 20h14M-20-46v14M0-46v14M20-46v14M-20 32v14M0 32v14M20 32v14"/>',
    memory:'<rect x="-51" y="-23" width="102" height="46" rx="3"/><path d="M-43 23v9m13-9v9m13-9v9m13-9v9m13-9v9m13-9v9m13-9v9"/><rect x="-40" y="-12" width="18" height="24"/><rect x="-9" y="-12" width="18" height="24"/><rect x="22" y="-12" width="18" height="24"/>',
    monitor:'<rect x="-46" y="-33" width="92" height="58" rx="4"/><path d="M0 25v18m-26 0h52M-32-18h44m-44 10h63"/>',
    mouse:'<rect x="-28" y="-43" width="56" height="86" rx="27"/><path d="M-27-10h54M0-43v25"/><rect x="-3" y="-28" width="6" height="15" rx="3"/>',
    audio:'<path d="M-40 8V-3a40 40 0 0180 0v11"/><rect x="-45" y="5" width="17" height="35" rx="6"/><rect x="28" y="5" width="17" height="35" rx="6"/><path d="M-14-5v20M0-18v46M14-5v20"/>',
    network:'<rect x="-43" y="8" width="86" height="30" rx="5"/><path d="M-27 8v-34M27 8v-34M-31-38q31-25 62 0M-20-27q20-17 40 0M-28 23h8m9 0h8m9 0h8"/>',
    file:'<path d="M-29-41H9l22 22v60h-60zM9-41v23h22M-16 0h34m-34 13h34m-34 13h21"/>',
    shield:'<path d="M0-43l37 15v28Q37 27 0 45Q-37 27-37 0v-28zM-17 1l12 13 24-29"/>',
    clock:'<circle r="41"/><path d="M0-27v27l20 13M0-41v8M41 0h-8M0 41v-8M-41 0h8"/>',
    wave:'<path d="M-53 0h13l10-25 14 51L0-42l17 65L29 0h24"/>',
    sliders:'<path d="M-29-43v86M0-43v86M29-43v86"/><rect x="-37" y="-22" width="16" height="17" fill="#10100f"/><rect x="-8" y="13" width="16" height="17" fill="#10100f"/><rect x="21" y="-33" width="16" height="17" fill="#10100f"/>',
  };
  return `<g transform="translate(${x} ${y}) scale(${scale})" fill="none" stroke="${accent}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round">${paths[type]||paths.chip}</g>`;
}
const themes={memory:'memory',recovery:'shield',driver:'file',power:'chip',limits:'sliders','memory-clocks':'memory',validation:'wave',isr:'chip',latencymon:'clock',boundaries:'clock',fg:'monitor',cadence:'clock',vrr:'monitor',display:'monitor',scanout:'monitor',bandwidth:'network',input:'mouse',polling:'mouse',hidfilter:'mouse',fit:'audio',dac:'audio',transport:'audio',buffers:'audio',endpoint:'audio',noapo:'sliders',timers:'clock',mmcss:'chip',distribution:'wave',upscale:'monitor',quality:'monitor'};
const flowIcons={recovery:['file','shield','sliders','wave','file'],validation:['file','sliders','file','wave','shield'],isr:['mouse','wave','chip','clock'],display:['chip','network','network','monitor','sliders'],input:['mouse','chip','network','monitor','monitor'],hidfilter:['mouse','sliders','mouse','file','shield'],dac:['wave','chip','sliders','audio'],endpoint:['file','network','audio','chip','audio'],mmcss:['file','file','clock','chip'],upscale:['monitor','chip','sliders','monitor']};
const backdrop=(w,h)=>`<defs><pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0H0V60" fill="none" stroke="#b16b30" stroke-opacity=".085"/></pattern><radialGradient id="glow"><stop stop-color="#742a05" stop-opacity=".28"/><stop offset="1" stop-color="#090909" stop-opacity="0"/></radialGradient></defs><rect width="${w}" height="${h}" fill="#090909"/><rect width="${w}" height="${h}" fill="url(#grid)"/><ellipse cx="220" cy="160" rx="520" ry="350" fill="url(#glow)"/>`;
await mkdir('client/public/images/guides/diagrams',{recursive:true});
for(const [id,[title,kind,items,note]] of Object.entries(diagrams)){
  assert.ok(items.length>=2 && title && note);
  let graphic='';
  if(kind==='bars'){
    const values=items.map(s=>Number(s.split('|')[1]));assert.ok(values.every(v=>Number.isFinite(v)&&v>0));
    const max=Math.max(...values),step=280/items.length;
    graphic+=text(1120,175,'ms per intervallo',19,muted,'end');
    for(let i=0;i<=4;i++){const x=310+i*175;graphic+=line(x,190,x,485,'#292725',1);}
    items.forEach((s,i)=>{const [label,value]=s.split('|'),y=200+i*step,w=Number(value)/max*650;graphic+=text(60,y+25,label,26)+rect(310,y,w,30,accent,'none',0)+text(1000,y+25,Number(value).toLocaleString('it-IT',{maximumFractionDigits:3}),27,ink);});
  }else if(kind==='samples'){
    graphic+=text(60,175,'Durata del singolo frame · ms',22,muted);
    for(const v of [5,10,15,20])graphic+=line(100,460-v*12,1120,460-v*12,'#292725',1)+text(78,467-v*12,String(v),19,muted,'end');
    items.forEach((s,i)=>{const h=Number(s)*12;graphic+=rect(120+i*100,460-h,64,h,i===9?accent:'#bdb8b1','none',0)+text(152+i*100,492,String(i+1),18,muted,'middle');});
    graphic+=line(100,382,1120,382,accent,2)+text(1120,175,'media 6,5 ms',22,accent,'end');
  }else if(kind==='scan'){
    items.forEach((s,i)=>{const x=60+i*375;graphic+=rect(x,208,330,208,'#141312');for(let j=0;j<12;j++)graphic+=line(x+12,222+j*15,x+318,222+j*15,j<=i*5?accent:'#302a25',7);graphic+=line(x+140,416,x+140,436)+line(x+190,416,x+190,436)+line(x+100,436,x+230,436);graphic+=text(x+165,485,s,23,ink,'middle');});
  }else if(kind==='radial'){
    const central=themes[id];graphic+=icon(central,600,320,1.65)+`<circle cx="600" cy="320" r="105" fill="none" stroke="#673517" stroke-width="1"/>`;
    items.forEach((s,i)=>{const left=i%2===0,x=left?60:820,y=i<2?230:405;graphic+=text(x,y,String(i+1).padStart(2,'0'),18,accent)+wrap(x,y+36,s,22,27)+line(left?390:805,y+16,left?493:707,i<2?275:365,'#87502a');});
  }else if(kind==='zones'){
    const colors=['#383431',accent,'#383431'];graphic+=text(60,200,'Frequenza dei frame',23,muted)+line(60,275,1140,275,ink,2);
    items.forEach((s,i)=>{const [a,b]=s.split('|'),x=60+i*360;graphic+=rect(x,247,350,56,colors[i],'none',0)+text(x+175,350,a,25,ink,'middle')+wrap(x+175,390,b,23,22,muted,'middle');});
    graphic+=text(420,230,'minimo',20,muted,'middle')+text(770,230,'massimo',20,muted,'middle');
  }else if(kind==='compare'){
    const n=items.length,w=1080/n;
    items.forEach((s,i)=>{const [a,b]=s.split('|'),x=60+i*w;const types=id==='memory'?['memory','memory','file','file']:id==='transport'?['audio','network','network']:id==='latencymon'?['wave','file','sliders','chip','memory']:null;
      if(i)graphic+=line(x-12,195,x-12,465,'#38312b',1);
      graphic+=text(x+15,205,String(i+1).padStart(2,'0'),18,accent)+icon(types?.[i]||themes[id],x+w/2-8,278,.85)+wrap(x+w/2-8,365,a,Math.floor(w/14),27,ink,'middle')+wrap(x+w/2-8,424,b,Math.floor(w/12),23,muted,'middle');
    });
  }else if(kind==='frames'){
    graphic+=line(60,450,1140,450,'#736a63',2)+text(1140,490,'tempo →',22,muted,'end');
    items.forEach((s,i)=>{const x=75+i*280;graphic+=rect(x,210,220,170,i%2?'#24170d':'#191918',i%2?accent:'#9f9a94');graphic+=`<path d="M${x+24} 350l44-62 43 33 45-79 42 108z" fill="none" stroke="${i%2?accent:'#aaa59e'}" stroke-width="2"${i%2?' stroke-dasharray="7 5"':''}/>`+text(x+110,410,s,24,ink,'middle')+line(x+110,440,x+110,460,accent,3);});
  }else{
    const w=1080/items.length;graphic+=line(60+w/2,280,1140-w/2,280,'#6c4227',2);
    items.forEach((s,i)=>{const x=60+i*w+w/2;graphic+=`<circle cx="${x}" cy="280" r="62" fill="#10100f" stroke="#4b3424"/>`+icon(flowIcons[id]?.[i]||themes[id],x,280,.7)+text(x,187,String(i+1).padStart(2,'0'),18,accent,'middle')+wrap(x,385,s,Math.floor(w/14),26,ink,'middle');});
  }
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600" viewBox="0 0 1200 600"><title>${esc(title)}</title><desc>${esc(note)}</desc>${backdrop(1200,600)}<g font-family="Arial, sans-serif">${text(60,47,'PRIME BUILD / LAB NOTES',17,accent)}${text(60,106,title,36)}${line(60,137,1140,137,'#58331d',1)}${graphic}${line(60,518,1140,518,'#58331d',1)}${wrap(60,552,note,105,20,muted)}</g><path d="M0 599H1200" stroke="${accent}" stroke-width="2"/></svg>`;
  await writeFile(`client/public/images/guides/diagrams/${id}.svg`,svg);
}

// New artwork, matching the typography/grid/orange accents of the archived covers.
const covers=[
  ['WINDOWS 11','BASE MISURABILE','SETUP · DRIVER · RECUPERO','chip'],
  ['STABILITÀ','CPU · GPU · RAM','OCCT · SENSORI · VALIDAZIONE','chip'],
  ['DRIVER &','LATENCYMON','ISR · DPC · DIAGNOSI','wave'],
  ['FRAME TIME','PRESENTMON','CPU · GPU · PRESENTAZIONE','monitor'],
  ['SYNC &','FRAME LIMITER','VRR · V-SYNC · CADENZA','clock'],
  ['DISPLAY','& COLLEGAMENTI','DISPLAYPORT · HDMI · REFRESH','monitor'],
  ['INPUT','MOUSE & USB','POLLING · CONTROLLER · PERCORSI','mouse'],
  ['AUDIO','CUFFIE & DAC','FIT · TRASDUTTORI · CONNESSIONI','audio'],
  ['SETUP AUDIO','COMPETITIVO','ENDPOINT · APO · PEACE · EQ','sliders'],
  ['RETE','ANTI-BUFFERBLOAT','ETHERNET · WI-FI · SQM','network'],
  ['WINDOWS','PARAMETRI','SCHEDULER · TIMER · VERIFICA','chip'],
  ['MISURE','& VERIFICA','FRAME TIME · LATENZA · METODO','wave'],
  ['UPSCALING','& FRAME GEN','DLSS · FSR · XeSS','monitor'],
];
const {default:manifest}=await import('../client/src/content/guides/manifest.json',{with:{type:'json'}});
await mkdir('client/public/images/guides/covers',{recursive:true});
for(const [i,[a,b,sub,type]] of covers.entries()){
  const guide=manifest[i];assert.equal(guide.id,i+1);
  const size=s=>Math.min(103,Math.floor(830/(s.length*.62)));
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000"><title>${esc(guide.title)}</title>${backdrop(1000,1000)}<path d="M600 0L870 1000M620 0L890 1000" stroke="#a44808" stroke-opacity=".3" stroke-width="2"/><path d="M30 60V30H75" fill="none" stroke="#a44808"/><g font-family="Arial, sans-serif">${text(80,180,'PRIME BUILD · TECHNICAL GUIDE',19,accent)}${text(80,310,a,size(a))}${text(80,430,b,size(b),accent)}${text(80,495,sub,23,muted)}${line(80,550,180,550,accent,3)}${line(180,550,920,550,'#402818',1)}${text(80,605,'GUIDA',17,muted)}${text(80,700,String(i+1).padStart(2,'0'),96,ink)}${text(80,742,'/ 13',21,accent)}${icon(type,710,735,2.15)}${text(80,925,'PRIMEBUILD.WEBSITE',17,muted)}</g><path d="M0 998H1000" stroke="${accent}" stroke-width="4"/></svg>`;
  await writeFile(`client/public/images/guides/covers/${guide.slug}.svg`,svg);
}
console.log(`${Object.keys(diagrams).length} technical plates and 13 covers generated.`);

// Maps of the controls named in the definitive text, explicitly not reconstructed screenshots.
const occtMaps={
  'occt-memory-controls':['OCCT / Memory',[
    ['Test type','Legacy · Presets · Custom','Annotare sequenza e versione.'],
    ['Memory','% della memoria libera · MiB','Lasciare margine al sistema.'],
    ['Instruction set','SSE · AVX · Auto','Auto non significa carico leggero.'],
    ['Threads','Auto · numero fisso','Registrare il numero effettivo.'],
  ],'La quantità allocata non coincide con la RAM totale; nessun valore è un preset universale.'],
  'occt-cpu-ram-controls':['OCCT / CPU + RAM',[
    ['Data set','Large · Medium','Carichi e insiemi di dati differenti.'],
    ['Mode','Normal · Extreme','Controllo errori e carico termico.'],
    ['Load type','Variable · Steady','Operandi variabili o carico costante.'],
    ['Instruction set','Auto · SSE · AVX2 · AVX512','Disponibilità dipendente dalla CPU.'],
    ['Start at cycle','Ciclo iniziale','Non indica la durata del test.'],
    ['Thread settings','Auto · Fixed · Core cycling','Registrare scelta, numero e affinità.'],
  ],'Una sola variabile per prova. CPU + RAM e Memory non condividono tutte le opzioni.'],
  'occt-security-controls':['OCCT / Prima di Start',[
    ['Durata','Una finestra finita e sorvegliata','Annotare durata prevista ed effettiva.'],
    ['Stop on error','Controllare che sia abilitato','Interrompere e conservare il risultato.'],
    ['Stop on WHEA error','Verificare la condizione di arresto','Un WHEA non identifica da solo il guasto.'],
    ['Critical temperature','Soglia e sensori abilitati','La soglia riguarda i sensori inclusi.'],
  ],'Gli arresti software non proteggono da ogni blocco o riavvio; un test interrotto non è un pass.'],
};
for(const [id,[title,rows,note]] of Object.entries(occtMaps)){
  const h=240+rows.length*122;
  let content=text(55,40,'PRIME BUILD / MAPPA DEI CONTROLLI',17,accent)+text(55,103,title,42)+text(55,143,'Schema di lettura della guida · non è una schermata del programma',22,muted);
  rows.forEach(([label,values,meaning],i)=>{const y=188+i*122;
    content+=line(55,y,1145,y,'#4c3120',1)+text(55,y+42,String(i+1).padStart(2,'0'),20,accent)+text(105,y+44,label,27)+text(480,y+43,values,27,ink)+text(480,y+81,meaning,22,muted);
  });
  content+=wrap(55,h-34,note,100,20,muted);
  await writeFile(`client/public/images/guides/diagrams/${id}.svg`,`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="${h}" viewBox="0 0 1200 ${h}"><title>${esc(title)}</title><desc>${esc(note)}</desc>${backdrop(1200,h)}<g font-family="Arial,sans-serif">${content}</g></svg>`);
}
