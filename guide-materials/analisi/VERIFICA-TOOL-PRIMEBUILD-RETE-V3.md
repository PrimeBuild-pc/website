# Verifica V3 — ZapTweaks, Sparkle e SockTuner: setup, rete e rollback

## 1. Perimetro e revisioni verificabili

Analisi **documentale e statica**, senza autenticazione GitHub. Sono stati letti metadati pubblici, README, documentazione selezionata e soltanto sorgenti pertinenti ai percorsi di setup, rete, sicurezza e ripristino. Nessun clone o archivio completo; nessun download di binari/installer; nessuna esecuzione di codice dei repository, test, probe di rete o configurazione Windows. Le richieste HTTPS a GitHub servono esclusivamente ad acquisire le fonti.

| Sigla | Repository | Ref risolta | Commit SHA completo |
|---|---|---|---|
| **Z** | [PrimeBuild-pc/ZapTweaks](https://github.com/PrimeBuild-pc/ZapTweaks) | `main` | `f2d190387e21e8aee8a1d0f8818e7792ebfaaf6e` |
| **S** | [thedogecraft/sparkle](https://github.com/thedogecraft/sparkle) | `v2`, branch predefinito | `c4f5b88c6bfb58468ae3925b49a172e8a5eab398` |
| **K** | [PrimeBuild-pc/SockTuner](https://github.com/PrimeBuild-pc/SockTuner) | `main` | `24a8bb34f1a62c2498cbc6b9de1d33b858f5dede` |

Tutti e tre i repository erano pubblicamente accessibili: nessun limite 404/privato alle fonti utilizzate. Sono conservati `commit.json` e `tree.json` sotto `fonti-v3/<repository>/`; gli alberi API risultano **non troncati**. Verificata la corrispondenza Git blob SHA-1 di **149 copie testuali selezionate**: 40 ZapTweaks, 55 Sparkle, 54 SockTuner. Questo verifica l'identità delle fonti, non la sicurezza dei programmi.

**Come leggere le citazioni:** `Z:percorso:Lx–Ly` indica repository, percorso originale e linee del file al commit sopra. Le copie mantengono i percorsi in `analisi/fonti-v3/ZapTweaks/`, `sparkle/`, `SockTuner/`. Per un permalink usare:

- Z: `https://github.com/PrimeBuild-pc/ZapTweaks/blob/f2d190387e21e8aee8a1d0f8818e7792ebfaaf6e/<percorso>#Lx-Ly`
- S: `https://github.com/thedogecraft/sparkle/blob/c4f5b88c6bfb58468ae3925b49a172e8a5eab398/<percorso>#Lx-Ly`
- K: `https://github.com/PrimeBuild-pc/SockTuner/blob/24a8bb34f1a62c2498cbc6b9de1d33b858f5dede/<percorso>#Lx-Ly`

Nelle sezioni successive, per K i percorsi abbreviati `Services/`, `Views/`, `Persistence/`, `MainWindow.xaml.cs` e `App.xaml.cs` sono relativi a `src/SockTuner/`. Un basename o `.../nomefile` riprende il percorso completo già citato per quel file; le linee sono sempre quelle della copia originale, non di questo rapporto.

L'analisi riguarda **questi sorgenti**, non garantisce che una release scaricabile contenga lo stesso codice. Test dichiarati superati, risultati in VM e compatibilità hardware riportati dagli autori sono dichiarazioni documentali: qui non sono stati riprodotti. Un difetto di collegamento è una deduzione statica, non un esperimento su Windows.

## 2. Risultato in breve, per la guida

1. **Il setup guidato di ZapTweaks non ottimizza automaticamente la rete.** Mostra inventario/hardware, invita a controllare Windows Update e prepara app, debloat selettivo e una scelta della taskbar. Il TCP Optimizer è un'altra pagina, manuale.
2. **Sparkle “Optimize Network Settings” è un preset di otto comandi netsh TCP.** Il testo parla anche di MTU ottimale e offload hardware, ma lo script non misura/imposta MTU e non configura esplicitamente checksum offload, LSO o RSC. Abilita RSS.
3. **SockTuner propone un modello migliore: diagnosi prima, singolo adattatore, capability, preview, stato atteso e read-back.** Non è però un ottimizzatore completo al commit esaminato: diversi store esistono, ma il worker respinge i tipi non-NIC fuori dal catalogo registry; alcune Recommendations vengono scartate prima della preview.
4. **Rollback non significa necessariamente “torna come prima”.** Sparkle usa valori fissi. SockTuner conserva i valori prima/dopo, ma la compensazione e la cronologia hanno limiti. Il percorso nativo ZapTweaks salva snapshot in SQLite prima delle scritture; i suoi percorsi rete legacy non condividono automaticamente questa garanzia.
5. **Nessun sorgente prova meno ping o meno jitter sul PC del lettore.** Una modifica TCP non ottimizza direttamente i datagrammi UDP di un gioco; cambiare DNS non cambia automaticamente il percorso della partita; DSCP non crea banda e non configura il router.

### Quadro di confronto

| Aspetto | Sparkle | SockTuner | ZapTweaks |
|---|---|---|---|
| Approccio | Preset generico e toggle | Diagnostic alpha, proposte contestuali e editing NIC | Wizard di setup + editor TCP/QoS/RSS manuale; anche residui legacy |
| Rete preselezionata | Sì, nel preset Recommended | No applicazione automatica; esistono profili con valori fissi | No nel wizard |
| Target | TCP globale/template; DNS su tutti gli adapter Up | GUID dell'adapter e keyword realmente annunciate | Template/globali nativi e RSS per adapter; legacy talvolta `*` |
| MTU | Promesso ma non implementato nel tweak | Probe IPv4 e proposta condizionale; collegamento al piano incompleto | Non incluso nell'editor TCP nativo esaminato |
| DSCP | Nessuno nel tweak rete | Backend presente, creazione GUI bloccata dal worker | Policy applicative locali, prefisso posseduto e validazione |
| Stato precedente | Non catturato per preset rete/servizi/DNS | Catturato per transazione; audit successivo | Snapshot/journal nativo prima delle mutazioni; legacy separato |
| Successo | Può riflettere fine script, non successo di ogni comando | Read-back; restart del link può fallire senza fallire la transazione | Editor nativo controlla piano e item; legacy verifica solo lo stato selezionato |
| Uso prudente in guida | Non raccomandare il preset rete/servizi come baseline | Diagnostica e lettura; tuning alpha separato | Wizard selettivo; editor manuale avanzato, non preset “ottimale” |

## 3. ZapTweaks: cosa fa davvero il setup guidato

Fonte principale: [wizard](https://github.com/PrimeBuild-pc/ZapTweaks/blob/f2d190387e21e8aee8a1d0f8818e7792ebfaaf6e/lib/features/setup/presentation/guided_setup_page.dart#L120-L133).

### Dieci schermate, non dieci ottimizzazioni

`Z:lib/features/setup/presentation/guided_setup_page.dart`:

- **L53–91:** inventario parallelo di catalogo app, ID winget installati, AppX dell'utente corrente e dispositivi presenti tramite SetupAPI. Controlla il completamento dell'inventario AppX.
- **L120–133, L207–218:** dieci passi: inventario, baseline, Windows Update, driver, applicazioni, debloat, privacy/interfaccia, preview, applicazione, report.
- **L236–244:** baseline = informazioni CPU/GPU/RAM/build Windows dal controller. **Non è una baseline di latenza, throughput o stato rete.**
- **L94–101, L246–262:** apre Windows Update e richiede una checkbox “ho controllato”. Non installa/verifica gli aggiornamenti e non controlla che l'utente li abbia realmente eseguiti.
- **L264–266:** passo driver = conteggio dispositivi e dispositivi privi di INF. Non è aggiornamento dei driver NIC né verifica che il driver sia il migliore/più recente.
- **L268–307:** selezione esplicita di app winget non già rilevate; mostra fino a 100 risultati filtrati.
- **L309–330:** rimozione AppX dell'utente corrente selezionata dall'utente, soltanto per elementi dichiarati reinstallabili. Nessuna selezione iniziale di tutte le app.
- **L332–344:** “Privacy/Interface” offre qui una sola checkbox: **End Task nella taskbar**. Non è un hardening privacy completo.
- **L346–365:** le sole richieste costruite sono `ui_taskbar_end_task`, `app.winget.set` e `app.appx.remove_current_user`. **Nessuna richiesta TCP, RSS, DSCP, MTU, servizi, firewall o Defender.**
- **L367–401 e L104–114:** preview delle richieste, esecuzione via controller e report con status dei singoli item. Arrivare al report non significa che ogni item sia riuscito.

Gli ID seguono operazioni dichiarate con privilegio user: winget `Z:lib/core/operations/winget_package_operation.dart:L126`, AppX corrente `Z:lib/core/operations/appx_removal_operation.dart:L146–147`, taskbar `Z:lib/core/operations/native_operation_catalog.dart:L168–189`. Il controllo del controller rifiuta piani misti user/admin (`Z:lib/features/tweaks/application/tweak_controller.dart:L713–741`), ma queste tre scelte del wizard non creano quel conflitto. Per winget questo non garantisce installazione nello scope utente: il comando non passa `--scope user` (`Z:lib/core/operations/winget_package_operation.dart:L92–104`); conta anche il comportamento del package/installer.

**Formulazione per principianti:** “Il wizard organizza il primo setup e mostra cosa verrà installato o rimosso. La schermata hardware e il controllo driver sono inventari: non certificano prestazioni né sistemano automaticamente la rete.”

### TCP Optimizer nativo: presente e distinto dal wizard

`Z:lib/platform/windows/tcp_optimizer_service.dart:L46–115, L128–182`:

- legge `Get-NetTCPSetting` e `Get-NetOffloadGlobalSetting` in forma strutturata;
- enumera valori esposti dai cmdlet, non analizza etichette netsh localizzate;
- espone autotuning, scaling heuristics, ECN e congestion provider per template;
- marca scrivibili i template che terminano in `Custom`; gli altri restano in lettura;
- espone RSC/RSS globali; il supporto enum non certifica che il driver o una policy rendano efficace ogni valore;
- valida target e valori prima di usare i cmdlet di scrittura.

`Z:lib/features/power/presentation/tcp_optimizer_page.dart:L94–155, L197–295, L297–454, L456–479`: UI collegata alle operazioni native `network.tcp.setting.configure`, `network.rss.configure`, `network.qos.policy.configure`, con dialoghi espliciti e controllo di piano completed/item verified. Non c'è algoritmo che scelga un valore “migliore” automaticamente.

`Z:lib/core/operations/native_operation_catalog.dart:L122–124` registra quelle operazioni. `Z:lib/core/security/elevated_helper.dart:L510–574` controlla ID nativo, privilegio amministrativo e costruisce il piano nel processo elevato. Non si osserva qui il blocco generalizzato dei tipi non-registry trovato in SockTuner.

**QoS/DSCP:** `Z:lib/platform/windows/tcp_optimizer_service.dart:L227–283, L300–384` valida prefisso `ZapTweaks - `, percorso completo `.exe`, TCP/UDP/Both, porte 1–65535, DSCP 0–63 e throttle. Gestisce il policy store **localhost**, con policy non possedute in sola lettura. Update = rimozione e ricreazione della policy selezionata; se la ricreazione fallisce e la vecchia policy risulta assente tenta di ricrearla. Non cancella il ramo QoS complessivo, non forza Group Policy e non configura SQM del router. Il prefisso è una convenzione di proprietà, non una prova crittografica di chi abbia creato la policy.

**RSS per-adapter:** `Z:lib/core/operations/rss_configuration_operation.dart:L75–154` verifica capability, cattura la configurazione e la ripristina. `Z:lib/platform/windows/rss_service.dart:L147–192` usa il provider NDIS, con profili allowlisted, gruppi/processori, massimo processori e code. Quando deve riabilitare un adapter RSS disabilitato lo abilita prima di rileggere i limiti; in caso di errore tenta di ridisabilitarlo. Non è una raccomandazione di assegnare sempre la NIC a CPU fisse.

**Limite delle “misure”:** `Z:lib/platform/windows/network_diagnostics_service.dart:L24–39, L78–175` effettua normalmente sei connessioni TCP al server HTTPS scelto e un download limitato a 10 MiB. La “latency” è il tempo di connessione TCP, lo “jitter” la differenza media fra tempi successivi e la “packet loss” la percentuale di **tentativi di connessione falliti**, non una misura diretta dei pacchetti persi in gioco. DNS/handshake/server e condizioni del percorso possono influire. Il timeout di 30 s è applicato a invio e lettura HTTP separatamente, oltre ai timeout delle probe: non è un tetto unico di 30 s all'intero run. In UI baseline/comparison restano campi di stato della pagina (`Z:.../tcp_optimizer_page.dart:L482–512`), non una dimostrazione causale persistente di miglioramento.

### Attenzione: il catalogo contiene ancora rete legacy realmente eseguibile

Non tutto il codice vecchio trovato nel repository è raggiungibile, ma **non è nemmeno tutto bloccato**:

- `Z:lib/core/models/tweak_descriptor.dart:L48–60` blocca specifici tipi di launcher/script interattivi.
- `Z:lib/features/tweaks/application/tweak_controller.dart:L509–528, L667–674` blocca toggle `systemKey` senza operazione nativa: vecchi “Network Optimizations”, ECN/timestamps/RSS generici non vanno confusi con l'editor nativo.
- `Z:.../tweak_controller.dart:L745–786, L887–937` conserva invece un fallback per oggetti `SystemTweak` non appartenenti ai tipi bloccati: chiama `onApply/onRevert`, poi `checkState`.
- `Z:assets/catalog/legacy_catalog.json:L405–491` assegna a diversi oggetti rete la disposizione `native`, ma il testo dice **“migrare”**. Quell'etichetta non crea un'operazione typed: il catalogo nativo non registra quei relativi ID.

Quindi, nel normale percorso UI con i prerequisiti richiesti, questi oggetti possono ancora passare dal fallback legacy. Per tale ramo il SafetyGate richiede che l'app sia già elevata; non basta la presenza dell'helper del percorso nativo (`Z:lib/core/services/safety_gate_service.dart:L33–43`). È scorretto dire che l'app non possa mai eseguire quei comandi, oppure attribuire loro il journal delle operazioni native.

`Z:lib/models/networking_tweaks.dart` implementa:

| Percorso legacy | Modifiche richieste | Rollback e rischio |
|---|---|---|
| Low-Latency Profile, **L82–117** | RSS on/RSC off globali; TaskOffload e NetworkDirect; template InternetCustom con CUBIC, ACK, autotuning/ECN/timestamps; su alias letterali Ethernet/Wi-Fi forza DHCP, metrica, weak-host send/receive e disabilita NUD; checksum on, LSO/RSC/power management off, RDMA on, restart di `*` anche hidden | Revert = valori fissi, non snapshot. Può perdere un setup IP statico; alias localizzati/diversi non corrispondono; modifica anche virtuali/hidden. SilentlyContinue e check limitato a globali/template (**L120–160**) non verificano tutto il profilo. |
| Adapter Power Savings/Wake Off, **L184–222** | Intende salvare XML, cambiare power/wake dei fisici non Disabled e riavviarli | Il percorso interpolato del backup è non quotato: script sintatticamente errato, non presentare il backup/apply come funzionanti così scritti. Anche correggendolo, file fisso sovrascrivibile e ripristino per nome con errori ignorati; check solo di alcuni flag (**L225–228**). |
| Device Power Saving Off, **L241–278** | Intende salvare XML e modificare WMI `MSPower_DeviceEnable`, non solo NIC | Stesso errore sintattico sul percorso XML non quotato in Apply/Revert. Anche correggendolo: file fisso, costo energetico e target che possono cambiare. |
| IPv4 Only, **L297–350** | Disabilita IPv6, client/server Microsoft, QoS packet scheduler `ms_pacer`, LLDP/LLTD e altre binding su `*` | Revert riabilita elenco fisso, senza ricordare quali binding fossero già off. Può rompere condivisioni e funzionalità; non è una semplice preferenza IPv4. |
| Prefer IPv4, **L405–442** | Bit `0x20` di DisabledComponents | Revert cancella il bit, anche se già presente prima; non conserva presenza/valore originali. |
| Throttling Index, **L468–485** | `SystemProfile\NetworkThrottlingIndex=0xFFFFFFFF` | Revert elimina il valore anziché ripristinare un valore precedente. |
| MMAgent, **L511–536** | Prefetch, prelaunch, memory compression, OperationAPI e page combining | Non è un tweak del trasporto rete. Revert impone valori e mantiene MemoryCompression disabilitata. |

Nei due script con XML, la sostituzione di `_backupPath` produce l'assegnazione `$backup = $env:ProgramData\ZapTweaks\backups\...xml` senza stringa quotata (`Z:lib/models/networking_tweaks.dart:L184–193, L207–214, L241–250, L261–268`). Il fallback Dart è raggiungibile, ma questo difetto del testo PowerShell interrompe la funzionalità prevista: **raggiungibile non equivale a funzionante**. Il giudizio è statico, senza eseguire il parser o lo script.

L'ITR interattivo iniziale (`Z:.../networking_tweaks.dart:L14–67`) scriverebbe valori driver generici, ma è `PowerShellTerminalCommandTweak`: è fra i tipi legacy bloccati. **Non descriverlo come operazione attuale funzionante.**

### Servizi e sicurezza ZapTweaks, entro il perimetro

Il wizard non li cambia. Il catalogo nativo offre `service.start.configure` soltanto per dieci servizi allowlisted, inclusi DiagTrack, WerSvc, XboxNetApiSvc e RemoteRegistry (`Z:lib/core/operations/native_operation_catalog.dart:L96–110`). Configura avvio Automatic/Manual/Disabled e delayed auto-start, salva stato precedente e verifica il ripristino (`Z:lib/core/operations/service_start_operation.dart:L25–125`); non è un blanket di centinaia di servizi. Nei percorsi wizard/TCP nativi esaminati non compare una disabilitazione automatica di firewall/Defender/HVCI.

Il README parla di “Restore-point gate” (`Z:README.md:L33`), ma `Z:lib/core/services/safety_gate_service.dart:L27–30, L62–121` permette di proseguire se si rifiuta o fallisce il checkpoint. Il wizard e l'editor TCP chiamano direttamente `executeNativeRequests`, senza un checkpoint obbligatorio in quel metodo. **Restore point = offerta opzionale, non precondizione verificata universale.**

## 4. Sparkle: preset rete, DNS, servizi e sicurezza

### Otto comandi TCP, non ottimizzazione hardware end-to-end

Fonti: [Apply](https://github.com/thedogecraft/sparkle/blob/c4f5b88c6bfb58468ae3925b49a172e8a5eab398/tweaks/optimize-network-settings/apply.ps1#L3-L10), [Unapply](https://github.com/thedogecraft/sparkle/blob/c4f5b88c6bfb58468ae3925b49a172e8a5eab398/tweaks/optimize-network-settings/unapply.ps1#L3-L10).

| Apply, S: `tweaks/optimize-network-settings/apply.ps1` | Unapply, stesso percorso `unapply.ps1` |
|---|---|
| L3: heuristics disabled | heuristics enabled |
| L4: congestion provider CTCP nel template `internet` | default |
| L5: RSS globale enabled | default |
| L6: ECN enabled | default |
| L7: timestamps disabled | default |
| L8–9: Fast Open e fallback enabled | default |
| L10: `custom icw=10` | `custom icw=4` |

`S:docs/docs/tweaks/optimize-network-settings.md:L5–16` e `S:tweaks/optimize-network-settings/meta.json:L4–9` classificano **Safe** e promettono hardware offloading e MTU ottimale. I blocchi script della documentazione corrispondono ai file: il problema è la **descrizione più ampia del codice**.

Non sono implementati in quel tweak: discovery MTU/PMTU, MTU write, policy DSCP/QoS, gestione checksum/LSO/RSC per NIC, analisi code RSS, autotuning, Nagle, misure prima/dopo o selezione della NIC del gioco. `custom` per ICW e `internet` per CTCP sono template distinti; lo script non associa `custom` a tutte le connessioni. I comandi richiedono impostazioni di sistema, non temporanee alla sessione Sparkle; la compatibilità dei singoli comandi e il loro effetto sulla build Windows non sono verificati qui.

**Esito parziale possibile:** Apply/Unapply finiscono con un messaggio di successo senza controllare `$LASTEXITCODE` di ogni netsh (`L3–12`). `S:src/main/powershell.ts:L47–61` dichiara successo se powershell termina senza rigettare il wrapper: non garantisce l'esito di ogni programma nativo. Non c'è read-back dello stato TCP.

### Recommended include rete e servizi, ma non tutti i tweak di sicurezza

`S:src/renderer/src/pages/Tweaks.tsx:L432–450` include nel preset “balanced” `disable-telemetry`, `optimize-network-settings` e `set-services-to-manual`. Le checkbox sono inizialmente selezionate, ma l'utente può deselezionarle (**L328–333, L476–488**). L'esecuzione è sequenziale senza compensazione complessiva (**L346–378**).

HVCI, Defender RTP e BitLocker **non fanno parte di quell'elenco Recommended**. Non bisogna quindi attribuire tutte le loro modifiche al clic Recommended.

Lo stato booleano viene salvato prima dell'esecuzione; in errore viene ripristinato il booleano, non le eventuali modifiche Windows già riuscite (`S:Tweaks.tsx:L135–178, L198–210`). `S:src/main/tweakHandler.ts:L15–16, L129–150, L161–193` conserva `tweakStates.json`, non uno snapshot TCP.

### DNS: impostazioni persistenti, benchmark che non misura DNS

`S:src/main/dnsHandler.ts`:

- **L35–59, L62–74, L172–199:** cambia DNS su **tutti gli adapter Up**, anche potenzialmente VPN/virtuali, e svuota la cache.
- **L65–66, L218–232:** Reset torna ai DNS automatici, non ai DNS statici precedenti.
- **L201–203, L218–232:** risposta aggregata `success:true` anche con errori di singoli adapter.
- **L278–291:** “Find Fastest DNS” è **un solo ping ICMP al resolver**, non query DNS cronometrate. Parsing di `Average` inglese: output localizzati possono falsare il risultato.

La UI presenta “Fastest DNS” e applicazione riuscita (`S:src/renderer/src/pages/DNS.tsx:L150–162, L320–343`). Non sono implementati qui DoH/DoT né una prova di minore ping al server di gioco.

Il separato Network Reset esegue reset Winsock/IP (`S:src/renderer/src/pages/Utilities.tsx:L305–315`): **non è l'Undo preciso del preset TCP o del cambio DNS** e può interferire con personalizzazioni.

### “Set Services to Manual” non imposta tutto a Manual

`S:tweaks/set-services-to-manual/apply.ps1` contiene **282 voci**, con Manual, Automatic, Disabled e AutomaticDelayedStart. Applica una tabella fissa con errori convertiti in warning (**L286–293**). Non conserva i tipi di avvio iniziali; Unapply usa un'altra tabella.

- DHCP, DNS Client, WLAN, BFE, firewall MpsSvc e WinDefend vengono impostati **Automatic** (**L16, L45, L51, L89, L205, L209**): non è corretto scrivere che il preset disabiliti tutti questi servizi.
- SecurityHealthService, Sense, WdNisSvc, NlaSvc, edgeupdate e Windows Update vengono invece impostati **Manual** (**L102, L141–142, L198, L228, L282**).
- Manual non implica Stop immediato: si cambia il tipo di avvio, senza valutare ruoli, policy, trigger e dipendenze.
- Caso concreto: **SgrmBroker** è Automatic in Apply ma **Disabled in Unapply**, entrambi **L147**. L'Undo può introdurre configurazioni diverse da prima del tweak.

`meta.json:L4–9` marca il tweak **Caution/recommended**, non Safe. La compatibilità di AutomaticDelayedStart con il PowerShell effettivamente invocato non è stata provata. Errori per servizio non bloccano necessariamente il successo globale.

### Tweak di sicurezza: non usarli come baseline di latenza

| Funzione | Codice verificato | Conseguenza e rollback |
|---|---|---|
| Core Isolation | S: `tweaks/disable-core-isolation/apply.ps1:L1–4`, Unapply L1–4 | Registry HVCI Enabled=0; Undo impone 1 senza valore precedente. Non prova disabilitazione di tutto VBS. |
| Defender real-time | S: `tweaks/disable-defender-rtp/apply.ps1:L1`, Unapply L1 | Set-MpPreference; Tamper Protection/gestione possono impedirlo. Non dimostra disattivazione permanente. |
| BitLocker | S: `tweaks/disable-bitlocker/apply.ps1:L1`, `meta.json:L5–8` | Richiede disabilitazione/decifratura del volume di sistema; non verifica completamento. Etichetta Safe ma non reversibile: rischio reale per dati a riposo. |
| Telemetry | S: `tweaks/disable-telemetry/apply.ps1:L40–54` | Include consenso invio campioni Defender, servizi e soglia SvcHost, non soltanto privacy. |

Unapply telemetria elimina valori e impone altri default (`S:.../unapply.ps1:L35–49`); non ripristina il `PeriodInNanoSeconds` eliminato da Apply L54. Né nomi rassicuranti né badge “Safe” dimostrano beneficio o rollback esatto.

### Onboarding e restore point: un falso successo è possibile

`S:src/renderer/src/components/firsttime.tsx:L20–38, L51–53`: restore point facoltativo; onboarding viene chiuso e `firstTime` aggiornato prima del completamento. Attende IPC ma **non controlla il campo success**. `S:src/main/backup.ts:L53–63` può restituire `{success:false}` senza rigettare la richiesta: la UI può comunque mostrare “Restore point created!”.

La pagina Backup ripete il mancato controllo per diverse azioni (`S:src/renderer/src/pages/Backup.tsx:L91–151`). Il backend azzera `SystemRestorePointCreationFrequency` dopo il checkpoint, e anche elencare i punti richiede quella modifica (**S:backup.ts:L23–26, L56–57, L95–110**). “Delete All” usa `vssadmin delete shadows /all /quiet` (**L84–88**), non solo punti Sparkle. L'Undo individuale/globale richiama Unapply sulla base dei booleani (**S:Backup.tsx:L405–425, L464–474**), non recupera valori iniziali.

**Conclusione:** un restore point dichiarato o un bottone Undo non autorizzano a promettere recupero completo delle impostazioni, dei servizi o dei dati.

## 5. SockTuner: miglioramenti reali, proposte e collegamenti incompleti

`K:README.md:L17` dichiara correttamente **community diagnostic alpha**, lettura/diagnostica come superficie principale e tuning sperimentale. Lo stesso passaggio promette però snapshot, verifica, audit e reversibilità per ogni write: il percorso applicativo va verificato, non desunto dalla promessa.

### Cosa migliora rispetto a Sparkle

- Capability NIC realmente annunciate dal driver, target GUID, enum/range/step, distinzione standard/vendor/unknown (`K:src/SockTuner/Models/AdapterCapability.cs:L55–145`).
- Keyword pericolose escluse, incluse HwOption*, ThreadPoll, DisablePhyReset e DropHighlyFragmentedPacket (`K:src/SockTuner/Services/NicKeywordCatalog.cs:L24–27, L191–216`).
- Preview, expected state, read-back e rollback compensativo (`K:src/SockTuner/Services/SettingTransactionService.cs:L24–82, L99–128`).
- Consenso alpha e conferma digitata APPLY per high risk/experimental (`K:src/SockTuner/Views/TuningPlanView.xaml.cs:L309–382`).
- Guard per sessione remota, ma è **superabile**, non un divieto tecnico assoluto (`K:src/SockTuner/Services/Diagnosis/RemoteSessionGuard.cs:L16–20, L74–93`).
- Distinzione fra problema locale, Wi-Fi, percorso, router/SQM e server, invece di scegliere sempre un preset TCP.

Non è totalmente privo di preset: il profilo competitive gaming propone valori per interrupt moderation, RSC, EEE, flow control e MMCSS (`K:src/SockTuner/Services/Remediation/UseCaseProfiles.cs:L31–52, L88–136`). Verificare che un valore sia supportato **non prova che disabilitarlo migliori quella macchina**.

### Difetto centrale: store implementato ≠ funzione operativa dalla GUI

[Worker](https://github.com/PrimeBuild-pc/SockTuner/blob/24a8bb34f1a62c2498cbc6b9de1d33b858f5dede/src/SockTuner/Services/ElevatedWorker.cs#L157-L176): per tutte le specifiche **non** `NicSettingSpecification`, `Validate()` chiama `WindowsRegistrySettingStore.EnsureWritable()`.

Quest'ultima chiama il catalogo registry statico (`K:.../WindowsRegistrySettingStore.cs:L97–104`), e `SettingCatalog.Get()` rifiuta ID non presenti in `All` (`K:.../SettingCatalog.cs:L286–297`). Gli ID CIM globali, DNS server, QoS, device/power e IRQ vengono risolti separatamente (`K:.../NicSettingSpecification.cs:L95–148`) e instradati a store dedicati (`K:.../CompositeSettingStore.cs:L62–73`), ma sono **respinti dalla validazione prima della scrittura** nel percorso worker esaminato.

Questo è un blocco applicativo, non un semplice limite driver. Backend, modelli, test e pulsanti presenti non dimostrano che la funzione end-to-end sia funzionante.

| Funzione/proposta | Stato al commit |
|---|---|
| Keyword NIC driver-backed | Percorso preview → worker → store presente; supporto e riavvio restano dipendenti dal driver. |
| MTU, MMCSS e autotuning dalle Recommendations | Passano a `Propose()`, che riempie soltanto righe NIC visibili: ID non-NIC scartati. Il filtro Focus può escludere anche proposte NIC. Inoltre cerca soltanto SettingId, ignorando TargetId: una proposta per NIC A può essere trasferita alla NIC B selezionata se espone la stessa keyword/valore; la preview usa il GUID della riga selezionata (L311–312). K: `Views/TuningPlanView.xaml.cs:L170–198`; `MainWindow.xaml.cs:L1718–1731, L2191–2206`. |
| Creazione QoS | Accodata e può arrivare in preview, poi respinta dal worker. K: `MainWindow.xaml.cs:L2415–2467`. |
| Rimozione QoS | UI passa null; `ProposeDeviceChanges()` scarta null: non arriva alla preview. K: `MainWindow.xaml.cs:L2441–2461`; `Views/TuningPlanView.xaml.cs:L118–126`. |
| Cambio DNS server / IRQ | Handler diretti al worker, non la medesima preview/consenso della view; restano respinti. K: `MainWindow.xaml.cs:L1881–1933, L2933–2984`. |
| Test/verifier VM | Possono chiamare engine/store direttamente, saltando `ElevatedWorker.Validate()`: non verificano da soli i collegamenti GUI. K: `App.xaml.cs:L123–132, L175–184`. |

### Cosa tocca o propone per categoria

**RSS/offload.** Inventario globale e keyword NIC sono distinti. Il catalogo avverte che disabilitare RSS può creare un collo di bottiglia e disabilitare offload aumenta lavoro CPU; TaskOffload è descritto come diagnostico (`K:Services/NicKeywordCatalog.cs:L80–104`; `Services/CimGlobalPropertyCatalog.cs:L178–181`). Keyword NIC possono seguire il percorso scrivibile; i tipi globali CIM incontrano il blocco worker. Non attribuire un cambio globale funzionante a una mera voce visibile.

**TCP/policy/template.** `K:Services/CimGlobalSettingStore.cs:L60–108` distingue valore locale, effetto possibile della policy e template senza traffico; salva messaggi in `IneffectiveWrites`, ma il worker normale non li include nel risultato (`K:Services/ElevatedWorker.cs:L75–78`). Il resolver trasporta filtri con fallback Internet (`K:Services/WindowsTcpTemplateResolver.cs:L62–88`), non identifica universalmente il template di ogni flusso; Recommendations costruisce il contesto senza una risoluzione live del template (`K:MainWindow.xaml.cs:L1601–1608`).

**Autotuning.** Advisor basato su RTT, rate e bufferbloat, con possibilità di ridurre throughput (`K:Services/Remediation/TcpTuningAdvisor.cs:L54–84, L97–119`), non “gaming=disabled” universale. Il chiamante usa `_lastDownload ?? _lastUpload`: un upload può diventare base dell'advice sulla ricezione (`K:MainWindow.xaml.cs:L1591–1598`). Resta proposta non collegata al piano NIC, oltre al blocco dei tipi CIM.

**ACK/Nagle.** Catalogo experimental con TCPNoDelay/TcpDelAckTicks non verificati ma allowlisted per scrittura registry (`K:Services/SettingCatalog.cs:L18–67`; `Services/WindowsRegistrySettingStore.cs:L18–22`). Una modifica registry effettuata non dimostra che Windows corrente la usi, né riguarda automaticamente UDP.

**DSCP/QoS.** Backend valida mark 0–63, app, protocollo/porte e gestisce nomi `SockTuner - ` (`K:Services/QosPolicySetting.cs:L19–24, L38–169`). Lo store scrive direttamente policy registry HKLM sotto `SOFTWARE\Policies\Microsoft\Windows\QoS` e imposta Throttle Rate a -1, non un limite di banda (`K:Services/QosPolicySetting.cs:L42, L237–285`); è distinto dai cmdlet NetQos usati da ZapTweaks. Marcatura locale: router e policy lungo il percorso devono riconoscerla; non riserva banda pubblica. Creazione/rimozione GUI incomplete come sopra.

**MTU.** `K:Services/PathDiagnosticService.cs:L52–91` prova solo IPv4 con DF/non-DF, nell'intervallo 576–1500: non jumbo, non IPv6, non tutti i percorsi. Una probe per passo e ICMP filtrato/perdita temporanea possono rendere il risultato inconclusivo. Il planner propone una riduzione per sospetto black hole e avverte che una route diversa cambia il risultato (`K:Services/Remediation/RemediationPlanner.cs:L60–76`); non è corretto dire che trovi sempre un MTU “ottimale” né che la Recommendations lo applichi davvero.

**Router/SQM.** `K:Services/Remediation/RouterGuidance.cs:L48–54, L90–144` genera istruzioni per CAKE e shaping iniziale al 90% della capacità misurata: **non accede/configura il router**. L'affermazione dell'advisor che SQM non costi throughput (`K:.../TcpTuningAdvisor.cs:L112–119`) è troppo assoluta rispetto a quello stesso margine di shaping. È una direzione diagnostica plausibile quando il collo di bottiglia è il buffer sotto carico, non un risultato misurato qui.

**Servizi/sicurezza.** Nei percorsi esaminati non emerge un blanket di disabilitazione antivirus/firewall/servizi o un reset Winsock indiscriminato. Alcune opzioni DNS riportano “Service restart”, ma il worker automatizza solo restart degli adapter NIC interessati, non del servizio DNS o reboot (`K:Services/SettingCatalog.cs:L213–247`; `Services/ElevatedWorker.cs:L94–108`). NetBIOS è una scelta per interfaccia con rischio di compatibilità legacy (`K:Services/SettingCatalog.cs:L142–160`), non un tweak ping. Registry, proprietà driver e policy, quando realmente scrivibili, non sono semplici preferenze della sessione GUI: chiudere l'app non le annulla.

### Piano Wi-Fi: non tutto è ancora soltanto “proposta”, ma restano limiti

`K:docs/UI-UX-WIFI-IMPROVEMENT-PLAN.md:L1–4` dichiara fasi 0–4 implementate, con hardware/DPI/Narrator/High Contrast ancora da verificare manualmente. Il sorgente conferma un collector WLAN nativo, view dedicata, osservazione cancellabile e integrazione nel report Gaming: non è corretto descrivere tutto il piano come futuro.

- `K:Services/Collection/WindowsWifiInventory.cs:L7–80, L309–428`: WLAN API, senza `WlanScan`; vicini dalla cache Windows. Non è scansione monitor-mode e non aggira il diniego dei permessi/location tramite elevazione.
- `K:Services/Diagnosis/WifiStabilityObserver.cs:L8–36`; `Views/WifiDiagnosticsView.xaml.cs:L125–178`: Observe UI 60 s, campionamento 2 s.
- Il parser copre RSN/PMF, BSS Load, HT/VHT e HE 6 GHz parziale; riconosce presenza EHT ma non ne decodifica tutta la larghezza (`K:WindowsWifiInventory.cs:L311, L358–398`). Età della cache BSS sconosciuta, distinta dal timestamp della raccolta (`K:WifiDiagnosticsView.xaml.cs:L233–242`).
- Correlazioni gateway/radio sono euristiche, senza allineamento temporale puntuale degli spike (`K:Services/Diagnosis/GamingWifiDiagnosticEngine.cs:L38–90, L125–149`). Gaming raccoglie WLAN dopo le probe e sceglie la prima radio connessa, non una prova completa del percorso radio utilizzato prima/dopo (`K:MainWindow.xaml.cs:L520–552`).
- Il report Gaming viene salvato; non si osserva equivalente persistenza dei singoli refresh/Observe autonomi della view (`K:MainWindow.xaml.cs:L532–552`; `WifiDiagnosticsView.xaml.cs:L125–199`).
- SSID/BSSID/GUID possono essere presenti nei report; export ordinario ha `redact=false`, redazione da scegliere esplicitamente (`K:Persistence/DiagnosticReportExporter.cs:L21–44, L93–146`; `MainWindow.xaml.cs:L733–772`).

L'ADR è opportunamente prudente: cache, RSSI non equivalente a throughput, pressione radio non equivalente ad airtime, assenza di SNR/retry universali e di monitor mode (`K:docs/adr/0001-native-passive-wifi-diagnostics.md:L19–61`). Queste informazioni aiutano la diagnosi, **non provano da sole la causa del lag**.

## 6. Qualità del rollback: confronto senza promesse assolute

### Sparkle — script inverso, non snapshot originale

Rete: valori fissi; servizi: seconda tabella; DNS: ritorno automatico; molti registry Unapply eliminano o impongono valori. Nessuna transazione complessiva né conferma del successo di ogni comando. Il restore point è facoltativo e può essere annunciato erroneamente. **Qualità insufficiente per chiamarlo “ripristino esatto”.**

### SockTuner — migliore compensazione, ma non atomicità o recupero totale

`K:Services/SettingTransactionService.cs:L24–82, L91–128, L252–292` controlla expected state, legge dopo, ripristina in ordine inverso soltanto se il valore corrente coincide con quello scritto. Evita di sovrascrivere un cambiamento esterno, ma una scrittura parziale multi-valore può non essere compensabile.

Limiti verificati:

1. Snapshot iniziale **in memoria**; audit persistito dopo il risultato (`K:Services/ElevatedWorker.cs:L202–226`). Crash/spegnimento nel mezzo possono lasciare modifiche senza journal preventivo completo.
2. Lock `SemaphoreSlim static` locale al processo (`K:SettingTransactionService.cs:L15`): non serializza worker distinti o altri tool.
3. Audit prima del restart NIC; link che non torna produce warning ma può lasciare Success=true, senza compensazione automatica (`K:ElevatedWorker.cs:L70–79, L96–108`).
4. Rollback interno autentica snapshot/sessione; rollback GUI ricostruisce una richiesta inversa dalla cronologia, che non conserva la stessa firma/provenienza (`K:SettingTransactionService.cs:L134–145`; `Persistence/TransactionAuditStore.cs:L28–35`; `Views/TuningPlanView.xaml.cs:L433–443`).
5. Cronologia limitata, default 100 audit; caricamento elimina record invalidi/schema precedente; pulsante rollback disponibile solo per ApplySucceeded, non per fallimenti con compensazione incompleta (`K:TransactionAuditStore.cs:L58–70, L142–169`; `TuningPlanView.xaml.cs:L385–399`).
6. “Esatto” riguarda lo stato rappresentato: QoS non conserva l'intero ramo con ACL/campi arbitrari e lascia il contenitore condiviso (`K:QosPolicySetting.cs:L237–263, L272–297`). Inoltre, quel percorso GUI è bloccato a questo SHA.
7. La verifica prestazionale separata può segnalare regressione e suggerire rollback, **non effettuarlo automaticamente** (`K:MainWindow.xaml.cs:L2310–2363`).

### ZapTweaks — journal preventivo nativo, distinto dal legacy

`Z:lib/core/plans/plan_engine.dart:L121–170` cattura snapshot e salva il piano **prima** delle scritture. `Z:lib/core/persistence/operation_store.dart:L78–149` salva richieste/stati/snapshot in transazione SQLite. Dopo apply controlla il valore letto, arresta ulteriori mutazioni di sistema dopo un errore e marca rollbackRequired; **non esegue subito un rollback automatico** (`Z:plan_engine.dart:L176–234`).

Rollback in ordine inverso e read-back del valore iniziale; conflitto se lo stato corrente differisce dal valore scritto e non si richiede overwrite (`Z:plan_engine.dart:L287–335`). Attenzione: il confronto di conflitto dipende da `item.written != null`; se apply fallisce prima di registrare read-back, quella protezione non si applica allo stesso modo. Operazioni manual/nonreversible vengono saltate: status globale non certifica la reversibilità di ogni voce del catalogo.

TCP salva il valore per target; QoS salva presenza/assenza e i campi rappresentati; RSS salva la tupla configurata (`Z:lib/core/operations/tcp_optimizer_operations.dart:L66–101, L221–265`; `rss_configuration_operation.dart:L113–154`). “Exact” è una capacità dichiarata nell'ambito di quei campi, non backup dell'intero sottosistema rete, delle policy di dominio, ACL o del driver. Un update driver/topologia può rendere impossibile il vecchio stato.

I percorsi `SystemTweak` legacy descritti sopra usano invece revert fissi e check parziali, o tentano backup XML con il difetto sintattico già indicato. **Non estendere loro le garanzie del Plan Engine.**

## 7. Raccomandazioni applicabili al setup della guida

### Percorso normale per principianti

1. **Conservare il setup già funzionante.** Annotare in anticipo IP statici/DHCP, DNS, VPN, adattatore e driver, eventuali policy aziendali. Un rollback a default non recupera queste scelte.
2. **Usare il wizard ZapTweaks come organizzatore, non come ottimizzatore rete.** Selezionare solo app necessarie e AppX riconosciute; controllare realmente Windows Update. Il conteggio INF non sostituisce la verifica del driver dal produttore.
3. **Lasciare disattivato il preset rete/servizi Recommended di Sparkle.** Se si usa Sparkle per altro, deselezionare quelle checkbox. Non inserire HVCI off, Defender off o BitLocker off fra i passaggi di latenza di base.
4. **Usare SockTuner inizialmente in lettura.** Inventario adapter, capability e diagnostica possono orientare la ricerca; segnalare che è alpha e che alcuni pulsanti/proposte non completano il percorso di scrittura al commit verificato. Non “correggere” il blocco copiando comandi registry dalla guida.
5. **Separare problema locale e problema sotto carico.** Se in una futura diagnosi emerge bufferbloat, verificare capacità del router e possibilità SQM: SockTuner offre istruzioni, non una configurazione già applicata. Non cambiare MTU per inseguire un numero genericamente più basso.
6. **DNS per esigenze concrete**, ad esempio resolver inaffidabile, non promessa di ping migliore. Prima di qualsiasi cambio selezionare l'adapter giusto; il singolo ping ai resolver di Sparkle non basta a scegliere il DNS.
7. **Niente “IPv4 Only” come passaggio standard.** Disabilitare IPv6, binding Microsoft o QoS scheduler può rompere funzionalità; preferenza IPv4 e disabilitazione IPv6 sono interventi diversi.
8. **Chiudere/uninstallare il tool non è Undo.** Le impostazioni Windows possono restare. Conservare backup/cronologia e una via locale di recupero; non cambiare la NIC che sostiene una sessione remota.

### Solo se il lettore sa cosa sta verificando

- Editor TCP/QoS/RSS nativo ZapTweaks o tuning NIC SockTuner: **una modifica per volta**, preview, valore iniziale leggibile e controllo dell'esito reale. Non sovrapporre tool che modificano lo stesso campo.
- Non disabilitare automaticamente RSS/offload/EEE/flow control/interrupt moderation in blocco. Supporto driver e compromesso CPU/throughput/energia non sono un beneficio dimostrato.
- DSCP solo con una policy di rete che lo riconosca; throttle è un limite di velocità, non priorità magica. Evitare profili numerici universali.
- Se sarà autorizzata una futura prova, usare confronto ripetibile verso il percorso rilevante e condizioni comparabili, poi ripristinare se peggiora. **In questa verifica non sono stati eseguiti quei test.**

### Testo breve pronto per la guida

> **Setup e rete non sono la stessa cosa.** Il wizard di ZapTweaks prepara inventario, app e scelte dell'interfaccia; non abbassa automaticamente il ping. Sparkle offre un preset TCP generico, ma al commit verificato non modifica l'MTU e il suo Undo non conserva i valori iniziali. SockTuner propone diagnosi e modifiche mirate per adattatore, ma è una diagnostic alpha con alcuni collegamenti di tuning ancora incompleti. Per il primo setup lascia le impostazioni rete funzionanti, evita preset di servizi/sicurezza e usa questi strumenti soprattutto per capire lo stato del sistema. Nessuno garantisce meno latenza sul tuo hardware.

## 8. Limiti finali e criteri di aggiornamento

- Non verificati runtime, firma/provenienza dei pacchetti release, hardware, policy effettive, latenza, efficacia dei tweak o recupero reale tramite System Restore.
- Non è un audit completo dei tre repository: sono escluse funzioni estranee al setup/rete e dipendenze/transitive. Nessun test dell'autore è stato eseguito.
- Prima di aggiornare la guida a una release successiva, risolvere nuovamente la ref a SHA e ricontrollare almeno: worker SockTuner e inserimento proposte nel piano; Apply/Unapply rete/servizi Sparkle; wizard, fallback legacy e journal ZapTweaks.
- Le promesse documentali di test/VM “CLEAN=true” non sostituiscono una verifica indipendente. L'etichetta Safe/native/implemented è metadato: il giudizio qui segue il percorso effettivo del codice.

**Rischio da comunicare:** modifiche persistenti e ripristino incompleto possono lasciare il PC con rete o protezioni diverse da prima; nessun guadagno di latenza è stato dimostrato da questa analisi.
