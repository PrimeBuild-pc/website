import{L as e,N as t,S as n}from"./index-Y-z0Loq7.js";import{n as r,r as i}from"./guideHeadingCase-szb5EvLR.js";var a=e(t(),1),o=`<div class="card">
    <p>Panoramica tecnica su <strong>DLSS 4.5</strong> - Driver 591.74. Questa guida raccoglie un'analisi dettagliata dei preset DLSS 4.5, configurabili tramite NVIDIA Inspector o NVIDIA App.</p><p>Il contenuto integra le conoscenze consolidate sull'upscaling NVIDIA con dati aggiornati alle ultime release driver. E importante precisare che non esiste un preset universalmente ottimale: la configurazione ideale dipende dalla modalita DLSS attiva, dalla risoluzione di output, dalla GPU installata e dal titolo in uso.</p><p>La corretta combinazione di questi parametri e determinante per bilanciare qualita visiva e prestazioni. Di seguito l'analisi completa.</p>
    </div>

<section>
        <h2>Basi su DLSS 4.5 e Preset</h2>
        <div class="card">
        <ul>
            <li><strong>Nuovi NVIDIA Driver 591.74 | DLSS 4.5</strong>: Con l’arrivo di DLSS 4.5, la gestione dei preset è diventata più chiara, ma anche più facile da sbagliare se non si sa cosa si sta facendo. Non esiste un preset migliore in assoluto, ogni preset ha un ruolo preciso e va usato nel contesto giusto. Sulle RTX 4000 e 5000, può offrire un salto reale in termini di qualità e prestazioni, ma solo se viene configurato con criterio. Forzare preset a caso o affidarsi a consigli generici spesso porta a risultati peggiori, non migliori.</li>
            <li><span class="accent-text">Preset K [4.0]</span>: Si utilizza con <em>DLSS Quality, DLSS Balanced, DLAA</em>. Offre il miglior equilibrio tra qualità dell’immagine, stabilità temporale e carico sulla GPU. Gestisce correttamente l’esposizione ed è quello che, nella maggior parte dei casi, garantisce il risultato più pulito.</li>
            <li><span class="accent-text">Preset M [4.5]</span>: Pensato per la modalità <em>Performance</em>, lavora partendo da una risoluzione interna più bassa e deve ricostruire più informazioni. Questo comporta un carico maggiore sulla GPU ed è una scelta sensata solo quando Quality o Balanced non sono sufficienti.</li>
            <li><span class="accent-text">Preset L [4.5]</span>: Utilizzato con <em>Ultra Performance</em> in 4K. È pensato per scenari con risoluzioni molto elevate o carichi grafici particolarmente pesanti. La qualità viene sacrificata, ma consente di mantenere una buona stabilità quando le altre modalità non bastano.</li>
        </ul>
        </div>
        <div class="card card-note">
            <strong style="color: var(--accent-orange);">Nota Generale:</strong> DLSS funziona davvero bene solo quando preset, driver, risoluzione e obiettivo sono allineati tra loro. Un’impostazione corretta fa molta più differenza di qualunque tweak improvvisato.
        </div>
    </section>

<section>        <h2>Analisi Dettagliata DLSS 4.5</h2>
        <div class="card">
            <p>Basandoci sulla review approfondita del canale <strong>Prodig</strong>, ecco cosa bisogna sapere su DLSS 4.5:</p>
        </div>

        <h3>Cosa Viene Testato</h3>
        <div class="card">
            <p>In questa fase, DLSS 4.5 include <strong>solo Super Resolution (upscaling)</strong>. Non sono ancora disponibili:</p>
            <ul>
                <li>❌ <strong>Reconstruction</strong></li>
                <li>❌ <strong>Multiframe Generator</strong></li>
                <li>❌ <strong>Dynamic Multiframe Generator</strong></li>
                <li>❌ <strong>Frame Generation 6X</strong></li>
            </ul>
            <p><em>Questi componenti arriveranno in <span class="accent-text">primavera 2026</span>.</em></p>
        </div>

        <h3>Obiettivo dell'Aggiornamento</h3>
        <div class="card">
            <p>DLSS 4.5 <strong>non è una rivoluzione</strong> come il passaggio al Transformer, ma un <span class="accent-text">affinamento del DLSS 4.0</span>:</p>
            <ul>
                <li>✅ Migliora la qualità della ricostruzione</li>
                <li>✅ Riduce difetti residui</li>
                <li>✅ Mantiene più dettagli</li>
                <li>✅ Meno ghosting e micro-artefatti</li>
                <li>✅ Maggiore stabilità dell'immagine</li>
                <li>✅ Particellari migliori</li>
                <li>✅ Illuminazione più coerente</li>
            </ul>
            <p>L'obiettivo principale: <strong>non ricostruire meglio, ma perdere meno dettagli</strong>.</p>
        </div>

        <h3>Transformer Aggiornato e Costi Computazionali</h3>
        <div class="card">
            <p>NVIDIA ha aggiornato il modello Transformer utilizzando:</p>
            <ul>
                <li>Dataset <strong>molto più grandi</strong></li>
                <li>Richiede <span class="accent-text">5x la potenza computazionale</span> rispetto al primo Transformer</li>
                <li>Primo DLSS con veri <strong>drawback tecnici</strong>:
                    <ul style="margin-top: 10px; padding-left: 20px;">
                        <li>RTX <strong>2000/3000</strong>: perdita prestazioni, più VRAM, no supporto FP8</li>
                        <li>RTX <strong>4000/5000</strong>: accelerazione nativa del modello</li>
                    </ul>
                </li>
            </ul>
        </div>

        <h3>Dati Ufficiali NVIDIA: Overhead Computazionale (ms)</h3>
        <div class="card">
            <p>📄 <strong>DLSS Programming Guide</strong> - Pagine 16-18 mostrano le <span class="accent-text">tabelle comparative ufficiali</span> dei tempi di calcolo (ms) aggiunti dal DLSS 4.5 in base a preset e GPU:</p>
            <div style="background: #0a0a0a; border-radius: 8px; overflow: hidden; margin-top: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.6);">
                <iframe src="DLSS_Programming_Guide_Release.pdf#page=16" width="100%" height="800px" style="border: none; display: block;"></iframe>
            </div>
            <p style="margin-top: 15px; font-size: 0.9rem;"><em>Scorri il PDF per vedere le tabelle complete su preset K/M/L e impact su diverse architetture RTX.</em></p>
        </div>

        <h3>Focus sui Preset Performance</h3>
        <div class="card">
            <p>Il miglioramento maggiore si vede nei preset <span class="accent-text">Performance</span> e <span class="accent-text">Ultra Performance</span>, soprattutto su <strong>QHD e risoluzioni più basse</strong>, dove l'upscaling è più aggressivo.</p>
            <p><strong>NVIDIA conferma che il 4.5 non è pensato per Quality/Balanced</strong> - per queste modalità, il modello <strong>K (DLSS 4.0)</strong> rimane la scelta ottimale.</p>
        </div>

        <h3>Modelli Specifici DLSS 4.5</h3>
        <div class="card">
            <ul>
                <li>🟩 <span class="accent-text">Modello L</span>: Ottimizzato per <strong>Ultra Performance</strong></li>
                <li>🟨 <span class="accent-text">Modello M</span>: Ottimizzato per <strong>Performance</strong></li>
                <li>🟦 <span class="accent-text">Modello K</span>: DLSS 4.0 - per tornare alla versione precedente o per <strong>Quality/Balanced</strong></li>
            </ul>
        </div>

        <h3>Attivazione e Supporto</h3>
        <div class="card card-note">
            <p>⚠️ <strong>Importante:</strong> Al momento <span class="accent-text">non esistono giochi con supporto nativo</span> per DLSS 4.5.</p>
            <p>Per usarlo oggi serve:</p>
            <ul>
                <li>✅ <strong>NVIDIA App</strong></li>
                <li>✅ Attivare funzioni <strong>Beta</strong></li>
                <li>✅ Fare <strong>override per gioco</strong></li>
            </ul>
        </div>

        <h3>Conclusione della Review</h3>
        <div class="card">
            <p>DLSS 4.5 è essenzialmente un <strong>"DLSS 4.0 migliorato per casi difficili"</strong>:</p>
            <ul>
                <li>✅ Migliora dove serviva (preset aggressivi, risoluzioni basse)</li>
                <li>❌ Non è rivoluzionario</li>
                <li>❌ È più pesante computazionalmente</li>
                <li>➡️ Le differenze migliori si vedono in side-by-side diretti su Quad HD / Performance</li>
            </ul>
        </div>
    </section>

<section>        <h2>Info Aggiuntive e Panoramica Completa</h2>
        <p>DLSS 4.5 usa un <strong>Transformer model di 2a generazione</strong> (FP8 precision accelerata su RTX 40/50), che riduce ghosting, shimmering e aliasing del 20-50% rispetto a DLSS 4, ma <strong>aumenta il carico computazionale</strong> (fino a 2x VRAM su vecchie GPU). Preset pre-4.5 (A-I) sono obsoleti.</p>

        <h3>Preset Disponibili e Evoluzione</h3>
        <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>Preset</th>
                    <th>Versione DLSS</th>
                    <th>Caratteristiche Principali</th>
                    <th>Raccomandato Per</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><span class="accent-text">K</span> (0x0000000B hex)</td>
                    <td>4.0 (Transformer Gen1)</td>
                    <td>Equilibrio qualità/stabilità/FPS. Gestisce esposizione bene.</td>
                    <td><strong>Quality/Balanced/DLAA</strong>. Tutte RTX 20+.</td>
                </tr>
                <tr>
                    <td><span class="accent-text">M</span> ("Latest")</td>
                    <td>4.5 (Transformer Gen2)</td>
                    <td>Sharper details, -ghosting. Più pesante (15-30% hit su 20/30).</td>
                    <td><strong>Performance</strong>. RTX 40/50 a 1440p/4K.</td>
                </tr>
                <tr>
                    <td><span class="accent-text">L</span></td>
                    <td>4.5 (Transformer Gen2)</td>
                    <td>Massima upscaling, stabilità su low-res input. Oversharp possibile.</td>
                    <td><strong>Ultra Performance</strong> 4K+. Solo RTX 40/50.</td>
                </tr>
                <tr>
                    <td><span class="accent-text">J</span></td>
                    <td>4.0</td>
                    <td>Simile K, ma +flickering/-ghosting.</td>
                    <td>Fallback per 20/30 se K artefatta.</td>
                </tr>
                <tr>
                    <td><strong>Pre-J (A-I)</strong></td>
                    <td>&lt;4.0</td>
                    <td>Obsoleti: ghosting pesante.</td>
                    <td>Mai, forza K+.</td>
                </tr>
            </tbody>
        </table>
        </div>
        <p><em><strong>Nota:</strong> "Latest" = M su Super Resolution, ma <span class="accent-text">non forzarlo globalmente</span>: applica M ovunque, causando oversharp/FPS loss su Quality (es. -10FPS in BF6 su 4080).</em></p>
    </section>

<section>
        <h2>Come Gestire i Preset: NVIDIA App vs Profile Inspector</h2>
        
        <div class="card card-note">
            <p>I preset DLSS possono essere configurati in <strong>due modi</strong>: tramite <span class="accent-text">NVIDIA App</span> (approccio semplificato e automatico) oppure tramite <span class="accent-text">NVIDIA Profile Inspector</span> (controllo avanzato per-gioco). Entrambi i metodi sono validi e possono essere usati insieme per scenari diversi.</p>
        </div>
        
        <div class="card">
            <h3>1. NVIDIA App (Consigliato - Facile/Automatico)</h3>
            <p><strong>Ideale per:</strong> Utenti che vogliono configurazioni rapide e affidabili senza complessità.</p>
            
            <h4 style="color: var(--accent-orange); margin-top: 25px;">Procedura Completa:</h4>
            <ol style="padding-left: 20px; color: var(--text-secondary);">
                <li style="margin-bottom: 15px;">📥 <strong>Aggiorna i driver</strong> alla versione <strong>591.74 o successiva</strong></li>
                <li style="margin-bottom: 15px;">🖥️ <strong>Apri NVIDIA App</strong> (non GeForce Experience) dal menu Start o dalla system tray</li>
                <li style="margin-bottom: 15px;">⚙️ Vai su <strong>Graphics</strong> dalla barra laterale sinistra</li>
                <li style="margin-bottom: 15px;">📊 Scorri fino alla sezione <strong>"DLSS Overrides"</strong></li>
                <li style="margin-bottom: 15px;">🎮 Seleziona il <strong>gioco specifico</strong> dal menu dropdown in alto (o applica globalmente)</li>
                <li style="margin-bottom: 15px;">🎯 Configura le opzioni:
                    <ul style="margin-top: 10px; padding-left: 20px;">
                        <li><strong>Super Resolution Mode</strong>: Scegli tra Quality/Balanced/Performance/Ultra Performance/DLAA<br>
                        <em style="font-size: 0.85rem;">→ L'App seleziona automaticamente il preset ottimale (K per Quality, M per Performance, L per Ultra)</em></li>
                        <li><strong>Model Presets</strong>: 
                            <ul style="margin-top: 5px;">
                                <li><strong>Default</strong>: Lascia decidere all'App (consigliato)</li>
                                <li><strong>Custom</strong>: Forza manualmente K/M/L</li>
                                <li><strong>Latest</strong>: Forza preset M su tutto (⚠️ non sempre ideale)</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li style="margin-bottom: 15px;">💾 Clicca <strong>"Apply"</strong> per salvare</li>
                <li>🔄 <strong>Riavvia il gioco</strong> per applicare le modifiche</li>
            </ol>

            <div style="background: #0a0a0a; border-radius: 8px; overflow: hidden; margin-top: 25px; padding: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.6);">
                <p style="margin: 0 0 10px 0; color: var(--accent-orange); font-weight: bold;">📸 Esempio Configurazione:</p>
                <img src="/images/guides/nvidia-app-dlss-overrides.png" alt="NVIDIA App - DLSS Overrides" style="width: 100%; border-radius: 5px; border: 1px solid var(--border-dark);">
                <p style="margin: 10px 0 0 0; font-size: 0.85rem; color: var(--text-secondary);"><em>Nell'immagine: menu DLSS Overrides con opzioni Super Resolution Mode e Model Presets. Nota i dropdown per selezionare gioco specifico e modalità DLSS.</em></p>
            </div>
        </div>

        <div class="card">
            <h3>2. NVIDIA Profile Inspector (Avanzato - Controllo Totale)</h3>
            <p><strong>Ideale per:</strong> Tweaking preciso, giochi senza supporto nativo, override di preset bloccati.</p>
            
            <div style="background: #1a1a1a; padding: 15px; border-radius: 5px; margin: 15px 0;">
                <p style="margin: 0 0 10px 0;"><strong>📥 Download:</strong> <a href="https://github.com/Orbmu2k/nvidiaProfileInspector/releases" style="color: var(--accent-orange); text-decoration: none; font-weight: bold;">NVIDIA Profile Inspector v2.4.0.30</a> (Ultima Release - Gennaio 2026)</p>
                <p style="margin: 0; font-size: 0.85rem; color: var(--text-secondary);"><em>Include supporto completo per preset L/M DLSS 4.5 e visualizzazione versione DLL override</em></p>
            </div>

            <h4 style="color: var(--accent-orange); margin-top: 25px;">Configurazione Step-by-Step:</h4>
            <ol style="padding-left: 20px; color: var(--text-secondary);">
                <li style="margin-bottom: 15px;">📥 <strong>Scarica e apri</strong> NVIDIA Profile Inspector (nvidiaProfileInspector.exe)</li>
                <li style="margin-bottom: 15px;">🔍 <strong>Cerca il tuo gioco</strong>:
                    <ul style="margin-top: 10px; padding-left: 20px;">
                        <li>Usa il campo <strong>"Profiles"</strong> in alto per cercare (es. digita "Cyberpunk")</li>
                        <li>Oppure scorri la lista dropdown per trovare il profilo del gioco</li>
                        <li>Se il gioco non ha profilo, seleziona <strong>"Base Profile"</strong> per applicare globalmente</li>
                    </ul>
                </li>
                <li style="margin-bottom: 15px;">📂 <strong>Naviga a Section 5 - Common</strong>:
                    <ul style="margin-top: 10px; padding-left: 20px;">
                        <li>Guarda la lista delle sezioni sulla sinistra</li>
                        <li>Clicca su <strong>"5 - Common"</strong> per espandere le impostazioni DLSS</li>
                        <li>Se non vedi le opzioni DLSS, usa <kbd>Ctrl+F</kbd> per cercare "DLSS"</li>
                    </ul>
                </li>
                <li style="margin-bottom: 20px;"><strong>⚙️ Configura le Impostazioni DLSS</strong> (vedi screenshot sotto):
                    <ul style="margin-top: 10px; padding-left: 20px;">
                        <li><span class="accent-text">DLSS - Enable DLL Override</span>: Imposta su <strong>0x00000001</strong> per attivare<br>
                        <em style="font-size: 0.85rem;">→ Mostra la versione DLL (es. "v310.5.0") se disponibile</em></li>
                        <li><span class="accent-text">DLSS - Forced Preset Letter</span>: Inserisci la lettera del preset:<br>
                        • <strong>K</strong> = Quality/Balanced/DLAA (RTX 20+)<br>
                        • <strong>M</strong> = Performance (RTX 40/50)<br>
                        • <strong>L</strong> = Ultra Performance 4K (RTX 40/50)</li>
                        <li><span class="accent-text">DLSS - Model Preset</span>: Alternativa, usa valori <strong>hex</strong>:<br>
                        • K = <strong>0x0000000B</strong><br>
                        • J = <strong>0x0000000A</strong></li>
                        <li><span class="accent-text">DLSS - Always Use Latest</span>: <strong>0x00000001</strong> per auto-selezione (come "Latest" in App)<br>
                        <em style="font-size: 0.85rem;">⚠️ Attenzione: forza preset M su tutto, può penalizzare Quality mode</em></li>
                    </ul>
                </li>
                <li style="margin-bottom: 15px;">💾 Clicca <strong>"Apply changes"</strong> (icona dischetto) in alto a destra</li>
                <li style="margin-bottom: 15px;">🔄 <strong>Riavvia il driver grafico</strong> (opzionale ma consigliato): <kbd>Ctrl+Shift+Win+B</kbd><br>
                <em style="font-size: 0.85rem;">→ Lo schermo lampeggia per 1-2 secondi, è normale</em></li>
                <li>🎮 <strong>Lancia il gioco</strong> e verifica il preset attivo (vedi sezione "Verifica" sotto)</li>
            </ol>

            <div style="background: #0a0a0a; border-radius: 8px; overflow: hidden; margin-top: 25px; padding: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.6);">
                <p style="margin: 0 0 10px 0; color: var(--accent-orange); font-weight: bold;">📸 Esempio Configurazione in Profile Inspector:</p>
                <img src="/images/guides/nvidia-profile-inspector-dlss.png" alt="NVIDIA Profile Inspector - DLSS Settings" style="width: 100%; border-radius: 5px; border: 1px solid var(--border-dark);">
                <p style="margin: 10px 0 0 0; font-size: 0.85rem; color: var(--text-secondary);"><em>Nell'immagine: Section 5 - Common con le impostazioni DLSS evidenziate. Nota i campi "DLSS - Enable DLL Override", "DLSS - Forced Preset Letter" e gli altri parametri configurabili.</em></p>
            </div>

            <div class="card card-note" style="margin-top: 20px;">
                <strong style="color: var(--accent-orange);">💡 Novità v2.4.0.30:</strong>
                <ul style="margin-top: 10px;">
                    <li>✅ Supporto nativo per <strong>Preset L e M</strong> di DLSS 4.5</li>
                    <li>✅ Visualizzazione <strong>versione DLL override</strong> nel dropdown (es. "v310.5.0")</li>
                    <li>✅ Supporto <strong>PhysX 32-bit GPU Acceleration</strong> per RTX 50-series</li>
                    <li>✅ Compatibilità .NET 4.8 (incluso in Windows 10+)</li>
                </ul>
            </div>
        </div>

        <h3>Verifica del Preset Attivo</h3>
        <div class="card">
            <p>Per confermare quale preset sta usando il gioco:</p>
            <ol style="padding-left: 20px; color: var(--text-secondary);">
                <li>Premi <kbd>Alt+Z</kbd> per aprire GeForce Experience overlay</li>
                <li>Vai su <strong>Statistics</strong> (o Performance > Statistics)</li>
                <li>Abilita <strong>DLSS Overlay</strong></li>
                <li>Verifica la riga <span class="accent-text">"Preset: M"</span> (o K/L)</li>
            </ol>
        </div>
    </section>

<section>
        <h2>Coordinamento Preset/DLSS: Consigli Reali</h2>
        <p>Allinea <strong>preset al mode + risoluzione + GPU</strong> per massimizzare IQ/FPS. Testa sempre (es. Cyberpunk PT, AC Shadows per ghosting).</p>
        
        <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>DLSS Mode</th>
                    <th>Risoluzione</th>
                    <th>Preset Ideale</th>
                    <th>RTX 20/30 (FPS Hit)</th>
                    <th>RTX 40/50 (Guadagno IQ)</th>
                    <th>Esempi Giochi/Consigli</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Quality/Balanced</strong></td>
                    <td>1440p/4K</td>
                    <td><span class="accent-text">K</span></td>
                    <td>✅ +0-5% FPS</td>
                    <td>✅ Stabile, no hit</td>
                    <td>Cyberpunk, F1 25: K fix esposizione.</td>
                </tr>
                <tr>
                    <td><strong>Performance</strong></td>
                    <td>1440p</td>
                    <td><span class="accent-text">M</span></td>
                    <td>❌ -20-30%</td>
                    <td>✅ +20% clarity</td>
                    <td>BF6, GTA5: M riduce ghosting hair/fog.</td>
                </tr>
                <tr>
                    <td><strong>Performance</strong></td>
                    <td>4K</td>
                    <td><span class="accent-text">M</span></td>
                    <td>❌ Molto basso</td>
                    <td>✅ Equilibrio</td>
                    <td>Tekken8: M sharper hair.</td>
                </tr>
                <tr>
                    <td><strong>Ultra Perf</strong></td>
                    <td>4K+</td>
                    <td><span class="accent-text">L</span></td>
                    <td>❌ Impossibile</td>
                    <td>✅ +35FPS</td>
                    <td>MSFS2024 VR, DOOM. Solo 40/50.</td>
                </tr>
            </tbody>
        </table>
        </div>

        <h3>Benchmark Rapidi (Media CP77/BF6)</h3>
        <div class="benchmark-data">
            > RTX 3080: K=120FPS → M=90FPS (-25%).<br>
            > RTX 4080: K=140FPS → M=130FPS (-7%), L=125FPS (-11%).<br>
            > RTX 5070 Ti: Quasi pari a K, +IQ netto.
        </div>
    </section>

<section>
        <h2>Consigli Reali e Best Practices</h2>
        <div class="card">
        <ol style="padding-left: 20px; color: var(--text-secondary);">
            <li style="margin-bottom: 15px;"><strong>RTX 4000/5000</strong>: Usa <strong>auto (Super Resolution Mode in App)</strong> o Latest → Guadagni IQ enormi (meno ghosting in 80% giochi) con costi minimi. Forza M in Performance per +sharpeness.</li>
            <li style="margin-bottom: 15px;"><strong>RTX 2000/3000</strong>: <strong>Solo K</strong>! M/L penalizzano (no FP8, +VRAM). Se ghosting, abbassa a Balanced + K.</li>
            <li style="margin-bottom: 15px;"><strong>Applicazioni Specifiche</strong>:
                <ul style="margin-top: 10px;">
                    <li><strong>Ghosting/Shimmering</strong>: M/L (es. AC Shadows, Hunt Showdown).</li>
                    <li><strong>4K 240FPS</strong>: L Ultra Perf + FG 6x (primavera 2026).</li>
                    <li><strong>VR/Volumetrics</strong>: M riduce blockiness (MSFS2024 +30% clarity).</li>
                    <li><strong>Oversharp?</strong> Custom scaling in App (es. 60% per Balanced-like).</li>
                </ul>
            </li>
            <li style="margin-bottom: 15px;"><strong>Errori Comuni da Evitare</strong>: No "Latest" globale: Forza M su DLAA → Fuzziness (-10FPS). Disabilita Ray Reconstruction se conflicta con 4.5 (Cyberpunk). Testa per-gioco: Usa DLSS Swapper per DLL + Inspector per preset.</li>
            <li><strong>Extra</strong>: Abilita ReBAR (+12% FPS su 20-series). Futuro: DLSS 4.5 in 400+ giochi, full release prossima settimana.</li>
        </ol>
        </div>
    </section>
`,s=n(),c=`/images/guides/dlss_programming_guide_release.pdf`,l=e=>i.sanitize(e,{USE_PROFILES:{html:!0},ADD_ATTR:[`class`]}),u=e=>{let t=e.createTreeWalker(e.body,NodeFilter.SHOW_TEXT),n=t.nextNode();for(;n;)n.textContent=(n.textContent??``).replace(/(?:[\u2600-\u27BF]|[\uD83C-\uDBFF][\uDC00-\uDFFF]|\uFE0F)/g,``).replace(/\s{2,}/g,` `),n=t.nextNode()},d=e=>{if(!e.startsWith(`images/`))return e;let t=e.split(`/`).pop();return t?`/images/guides/${t}`:e},f=(e,t,n)=>{let r=e.cloneNode(!0),i=r.querySelector(`iframe`);if(i){i.remove(),(r.textContent??``).trim()&&n.push({key:`${t}-html`,type:`html`,html:l(r.outerHTML)}),n.push({key:`${t}-pdf`,type:`pdf`,pdfSrc:c});return}n.push({key:t,type:`html`,html:l(r.outerHTML)})},p=()=>{if(typeof window>`u`)return[{key:`fallback`,type:`html`,html:l(o)}];let e=new DOMParser().parseFromString(o,`text/html`);u(e),r(e.body),e.querySelectorAll(`[style]`).forEach(e=>e.removeAttribute(`style`)),e.querySelectorAll(`img`).forEach(e=>{e.setAttribute(`src`,d(e.getAttribute(`src`)??``)),e.setAttribute(`class`,`w-full rounded-lg mb-6 border border-zinc-800`),e.setAttribute(`loading`,`lazy`),e.setAttribute(`width`,`1280`),e.setAttribute(`height`,`720`)}),e.querySelectorAll(`a`).forEach(e=>{(e.getAttribute(`href`)??``).startsWith(`http`)&&(e.setAttribute(`target`,`_blank`),e.setAttribute(`rel`,`noopener noreferrer`))});let t=[];return Array.from(e.body.children).forEach((e,n)=>{e.tagName.toLowerCase()===`section`?Array.from(e.children).forEach((e,r)=>f(e,`section-${n}-${r}`,t)):f(e,`block-${n}`,t)}),t},m=({src:e})=>(0,s.jsxs)(`div`,{className:`my-6 rounded-xl border border-primary/30 bg-primary/10 p-5`,children:[(0,s.jsx)(`p`,{className:`font-semibold text-white`,children:`DLSS Programming Guide ufficiale (PDF, 6 MB)`}),(0,s.jsx)(`p`,{className:`mt-2 text-sm text-zinc-300`,children:`Il documento viene caricato solo quando scegli di aprirlo.`}),(0,s.jsx)(`a`,{href:e,target:`_blank`,rel:`noopener noreferrer`,className:`mt-4 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-semibold text-black`,children:`Apri il PDF in una nuova scheda`})]}),h=()=>{let e=(0,a.useMemo)(()=>p(),[]);return(0,s.jsx)(`div`,{className:`space-y-4`,children:e.map(e=>(0,s.jsx)(`div`,{className:`[&_p]:text-zinc-300 [&_p]:leading-relaxed [&_p]:mb-6 [&_h1]:text-white [&_h1]:font-bold [&_h1]:text-2xl [&_h1]:mt-12 [&_h1]:mb-6 [&_h1]:border-b [&_h1]:border-zinc-800 [&_h1]:pb-2 [&_h2]:text-white [&_h2]:font-bold [&_h2]:text-2xl [&_h2]:mt-12 [&_h2]:mb-6 [&_h2]:border-b [&_h2]:border-zinc-800 [&_h2]:pb-2 [&_h3]:text-xl [&_h3]:text-zinc-100 [&_h3]:mt-8 [&_h3]:mb-4 [&_h4]:text-lg [&_h4]:text-primary [&_h4]:mt-6 [&_h4]:mb-3 [&_strong]:text-primary [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:list-inside [&_ul]:mb-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:mb-6 [&_ol]:space-y-2 [&_li]:text-zinc-300 [&_li]:leading-relaxed [&_li]:marker:text-primary [&_.card]:rounded-xl [&_.card]:border [&_.card]:border-white/10 [&_.card]:bg-zinc-900/60 [&_.card]:p-5 [&_.card]:mb-4 [&_.card-note]:border-primary/40 [&_.table-container]:overflow-x-auto [&_.table-container]:rounded-lg [&_.table-container]:border [&_.table-container]:border-white/10 [&_.table-container]:bg-zinc-900/60 [&_table]:w-full [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:text-primary [&_th]:font-semibold [&_th]:text-xs [&_th]:uppercase [&_th]:tracking-wider [&_th]:border-b [&_th]:border-primary/30 [&_td]:px-4 [&_td]:py-3 [&_td]:text-zinc-300 [&_td]:text-sm [&_td]:border-b [&_td]:border-white/10 [&_tr:nth-child(even)]:bg-zinc-800/30 [&_.benchmark-data]:rounded-lg [&_.benchmark-data]:border [&_.benchmark-data]:border-primary/30 [&_.benchmark-data]:bg-black [&_.benchmark-data]:p-4 [&_.benchmark-data]:text-zinc-300 [&_.benchmark-data]:font-mono [&_kbd]:rounded [&_kbd]:border [&_kbd]:border-white/20 [&_kbd]:bg-zinc-800 [&_kbd]:px-2 [&_kbd]:py-0.5 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2`,children:e.type===`pdf`?(0,s.jsx)(m,{src:e.pdfSrc??c}):(0,s.jsx)(`div`,{dangerouslySetInnerHTML:{__html:e.html??``}})},e.key))})};export{h as default};