# Verifica setup principiante e strumenti — V3

**Verifica documentale: 11 ottobre 2026.** Destinazione: futura riscrittura del setup, non applicazione di un preset. Riferimento editoriale del progetto: Windows 11 25H2 e successive; questo non certifica preventivamente le build future.

## 1. Perimetro, metodo e risultato

Letti il setup originale in `GUIDE LATENZA DISCORD.md`, il capitolo piattaforma di `bozza-v2/index.html`, gli appunti di revisione e le fonti sotto indicate. Scritti soltanto questo documento e le copie/provenienze `setup-*` in `fonti-v3/`. **Nessuna modifica a HTML, script Prime Build o sito; nessun installer, script remoto, BIOS, registro, servizio, driver o ISO applicato.** Le acquisizioni remote sono GET HTTPS con verifica TLS; non sono stati scaricati gli eseguibili/archivi degli strumenti. I PS1/C#/XML acquisiti sono testo per lettura statica, non programmi avviati.

Registro delle richieste: [`fonti-v3/setup-accessi.json`](fonti-v3/setup-accessi.json), con URL originale/finale, UTC, HTTP, dimensione e SHA-256 delle risposte. Le copie `.html`/sorgenti sono originali; i `.txt` sono estrazioni locali del testo visibile, non trascrizioni degli screenshot né verifiche delle GUI. I commit GitHub sono fissati; i siti web restano istantanee datate. Il pin del sorgente **non** autentica automaticamente asset di release, dipendenze scaricate successivamente o comportamento del binario.

Controlli locali: [esito copie](fonti-v3/setup-verifica-copie.json), 93 acquisizioni GET HTTPS (89 HTTP 200, tre 403, un 404), dimensioni/hash e link locali riscontrati; tre template XML ben formati. È controllo dell'archivio documentale, non validazione dello schema Windows Setup né collaudo funzionale.

### Decisioni principali

- Conservare il percorso concreto proposto: preparazione delle chiavette → firmware ragionato → installazione Windows → driver controllati → runtime/app → debloat selettivo → verifica. Non ridurlo a «lascia tutti i default» e nemmeno trasformarlo in un pacchetto di tweak indistinti.
- Distinguere **ISO Microsoft originale**, **supporto con risposte/opzioni personalizzate** e **ISO ricostruita da uno strumento**. Partire da una ISO ufficiale non rende ufficiale l'output modificato.
- Account locale e fase offline sono scelte pratiche, non ottimizzazioni di latenza dimostrate. La riuscita in OOBE dipende da build, edizione, modalità S, media e versione del tool.
- CTT/WinUtil e Winhance sono **alternative opzionali da spiegare**, non nuovi installer automatici nella bozza e non comandi da inserire nel First Setup. «Aprire un tool», «selezionare», «importare», «applicare» e «generare una ISO» sono azioni diverse.
- Debloat configurabile sul sistema già installato: nessuna selezione globale come default Prime Build. **Win11 Creator ha invece un insieme di modifiche predefinite nel codice esaminato; Winhance XML contiene anche comportamento fisso oltre alle scelte utente.** Non promettere che ogni modifica sia una casella indipendente.
- L'ordine **video → chipset** resta un percorso opzionale richiesto dall'utente, quando gli installer e la piattaforma lo permettono. Non è una legge di latenza; non sostituisce prerequisiti OEM/storage/piattaforma.
- «AHCI» riguarda SATA; non è la modalità universale di un SSD NVMe. VMD/RST/RAID richiedono un ragionamento distinto prima di installare.
- Valutare una release BIOS stabile aggiornata e pertinente, non «sempre beta più recente» né «aggiorna solo se il PC è già rotto». Prerequisiti, alimentazione, BitLocker e recupero sono parte del setup.

### Come pesare le evidenze

1. **Meccanismo riscontrato:** cosa fanno una funzione, un XML o una procedura documentata.
2. **Evidenza del beneficio:** un'affermazione dell'autore, un risultato riproducibile su hardware/build definiti o una misura propria. Qui sono disponibili soprattutto i primi, **non nuovi benchmark**.
3. **Rischio:** compatibilità, perdita di funzioni/dati, sicurezza, manutenzione e fallimenti parziali.
4. **Ripristino:** ritorno allo stato registrato, non necessariamente al default Windows; precisare quando serve backup/immagine/reinstallazione.

Una modifica documentata non è per questo inutile; una promessa «gaming/safe/reversible» non è per questo dimostrata. Rimozione di processi realmente attivi può liberare risorse; meno app presenti sul disco, meno servizi elencati o un valore DPC massimo più basso non provano da soli meno latenza input→fotone.

## 2. Fonti primarie e pin

| Fonte | Riferimento acquisito | Cosa consente di verificare |
|---|---|---|
| Profilo FR33THY | [URL ricevuto](https://github.com/FR33THYFR33THY/FR33THYFR33THY#), [README fissato](https://github.com/FR33THYFR33THY/FR33THYFR33THY/blob/01771dfb920975efd277f6ca1ea43a8765124de9/README.md) | È un indice verso WinSux, Ultimate e configurazioni giochi, non una procedura di installazione completa. |
| FR33THY Ultimate | [README](https://github.com/FR33THYFR33THY/Ultimate/blob/a0a33a57078434201f582b0db5107dcbb502292a/README.md), commit `a0a33a57078434201f582b0db5107dcbb502292a` | Guide/script per power user, parti BIOS, reinstallazione, unattended, blocco driver, debloat e runtime. |
| FR33THY WinSux | [README](https://github.com/FR33THYFR33THY/WinSux/blob/91adbfd63b7ed2eb5fcf0821fd53405a3cf63573/README.md), commit `91adbfd63b7ed2eb5fcf0821fd53405a3cf63573` | Percorso one-click con download e modifiche estese, non solo scelta di app. |
| Rufus ufficiale | [rufus.ie](https://rufus.ie/en/), [release v4.15](https://github.com/pbatard/rufus/releases/tag/v4.15), [sorgente release](https://github.com/pbatard/rufus/blob/6d8fbf98305ff37eb531c45cbd6ff44563c53917/src/wue.c) | Creazione USB e opzioni Windows User Experience. Pin release `6d8fbf98305ff37eb531c45cbd6ff44563c53917`; HEAD separato `875f221d5b4fa2c43cad1b85ae975d106964949f`, non scambiato per release. |
| FAQ Rufus | [revisione fissata](https://github.com/pbatard/rufus/wiki/FAQ/1b7c603c439a04d007d72d36063fc378a8930685) | GPT/UEFI, cancellazione USB, account offline, modalità S, limiti bypass e compatibilità. |
| CTT articolo | [Windows Tool / Win11 Creator](https://christitus.com/windows-tool/#win11-creator) | Panoramica live tool e creazione media; alcune affermazioni divergono dal sorgente attuale, vedi §5. |
| WinUtil | [README](https://github.com/ChrisTitusTech/winutil/blob/07ccd8e2e755a706f31569808b31f5b77acad6a9/README.md), [documentazione Creator fissata](https://github.com/ChrisTitusTech/winutil/blob/07ccd8e2e755a706f31569808b31f5b77acad6a9/docs/src/content/docs/guides/win11creator.mdx), [release 26.10.07](https://github.com/ChrisTitusTech/winutil/releases/tag/26.10.07) | Snapshot `07ccd8e2e755a706f31569808b31f5b77acad6a9`; letti anche ISO script, USB script, preset/tweaks JSON e XML. |
| Winhance/WIMUtil | [sito](https://winhance.net/), [WIMUtil](https://winhance.net/docs/guides/wimutil.html), [Autounattend](https://winhance.net/docs/guides/autounattend.html), [configurazioni](https://winhance.net/docs/guides/configuration-files.html) | Input ISO ufficiale, XML, driver, oscdimg, import/export e limiti offline. Le guide riportano aggiornamento 29 gennaio 2026: non equivalgono da sole alla GUI della release attuale. |
| Winhance sorgente | [README HEAD fissato](https://github.com/memstechtips/Winhance/blob/db80ecfcf6762a7b856860930d9f4ee17bf1e67c/README.md), [release v26.06.12](https://github.com/memstechtips/Winhance/releases/tag/v26.06.12), [template XML della release](https://github.com/memstechtips/Winhance/blob/f23d554eb2d6400b1827bcc46b91294ffa53fbc9/src/Winhance.UI/Features/Common/Resources/AdvancedTools/autounattend-template.xml) | HEAD `db80ecfcf6762a7b856860930d9f4ee17bf1e67c` e release `f23d554eb2d6400b1827bcc46b91294ffa53fbc9` distinti. Acquisite copie delle parti WIM/XML di entrambi; nessuna compilazione o equivalenza binario provata. |
| Wintoys | [Microsoft Store](https://apps.microsoft.com/detail/9p8ltpgcbzxd?hl=en-US&gl=US), [autore Bogdan Pătrăucean](https://bogdan-patraucean.github.io/about/wintoys/), [FAQ](https://bogdan-patraucean.github.io/about/wintoys/faq), [changelog](https://bogdan-patraucean.github.io/about/wintoys/changelog.html), [offline](https://bogdan-patraucean.github.io/about/wintoys/offline) | Identità e funzioni dichiarate. **Codice chiuso**, come conferma la FAQ: non è stato ispezionato un sorgente dell'app. |
| WinGet Microsoft | [overview](https://learn.microsoft.com/en-us/windows/package-manager/winget/), [install](https://learn.microsoft.com/en-us/windows/package-manager/winget/install), [source](https://learn.microsoft.com/en-us/windows/package-manager/winget/source), [download](https://learn.microsoft.com/en-us/windows/package-manager/winget/download) | Gestore applicazioni/App Installer, ID/source, elevazione, hash e limiti offline. |
| TechPowerUp VC++ | [pacchetto All-in-One](https://www.techpowerup.com/download/visual-c-redistributable-runtime-package-all-in-one/) | Raccolta TPU di runtime Microsoft, batch incluso e hash dichiarato. |
| TechPowerUp DirectX | [runtime offline](https://www.techpowerup.com/download/directx-redistributable-runtime/) | Raccolta redistributable legacy Microsoft con batch TPU, non aggiornamento di DirectX 12. |
| Microsoft runtime | [VC++ supportati](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-170), [DirectX June 2010](https://www.microsoft.com/en-us/download/details.aspx?id=8109) | Architetture, compatibilità e componenti legacy; confronto con descrizioni TPU. |

Le API dei repository, le tree e gli SHA sono nel registro locale. Il repository profilo FR33THY non ha una `releases/latest` accessibile: **404** dell'endpoint non significa che i progetti collegati non esistano.

## 3. ISO Microsoft, chiavette e account locale

### 3.1 Tre oggetti da non confondere

**A. ISO Microsoft originale.** Scaricarla dalla [pagina Microsoft Windows 11](https://www.microsoft.com/en-us/software-download/windows11), scegliendo lingua, architettura ed edizione/licenza adeguate. La pagina acquisita spiega il confronto SHA-256 con il valore pubblicato per la lingua selezionata. Un hash calcolato senza riferimento attendibile serve a riconoscere il file, non a dimostrarne l'origine.

**B. USB creata da ISO ufficiale con Rufus.** Rufus partiziona/formatta e copia/prepara il media; le caselle Windows User Experience possono aggiungere `autounattend.xml` e altre personalizzazioni. La ISO sorgente conservata rimane originale, ma la **procedura d'installazione sul supporto è personalizzata**. Se non si cambia l'immagine interna, non per questo tutte le impostazioni del sistema finale sono Microsoft default.

**C. ISO esportata da Win11 Creator/WIMUtil.** È una ISO derivata/personalizzata: può incorporare answer file, script, driver o immagini servite. Il formato WIM/ESD/SWM e il programma `oscdimg` sono tecnologie Microsoft; non rendono Microsoft-autorizzati i tweak scelti. Output modificato ≠ ISO ufficiale scaricata. Conservare sempre originale, versione del tool, XML/config e hash dell'output; evitare ISO premodificate da terzi come scorciatoia per questa guida.

### 3.2 Procedura da spiegare al principiante, senza eseguirla qui

1. **Prima di cancellare qualcosa:** backup esterno dei dati, credenziali, licenza, chiave di recupero BitLocker; identificare modello OEM/scheda madre e dischi per modello/capacità. Non lasciare il solo backup sulla USB da formattare. Preparare anche un modo di consultare la guida senza Internet sul PC destinazione.
2. **Chiavetta Windows dedicata:** usare Rufus ufficiale, selezionare la ISO, controllare il dispositivo fisico per capacità e nome, scegliere **Installazione Windows standard**, GPT e UEFI senza CSM per il percorso Windows 11 supportato. Non scegliere Windows To Go. Lasciare il filesystem proposto per quella ISO: **non imporre FAT32** quando file/strumento richiedono NTFS o splitting. Una USB di almeno 16 GB è un margine pratico per media attuali; un'immagine personalizzata con molti driver può richiedere più spazio.
3. **Altra chiavetta o cartella esterna già salvata:** pacchetti completi GPU/chipset/rete/audio del modello, driver storage pre-installazione estratti con `.inf/.sys/.cat`, eventuali installer runtime offline e documento delle versioni. Un web installer non diventa offline perché è copiato su USB. Copiare questa cartella sulla USB Windows **dopo** la creazione è possibile se c'è spazio, ma una seconda USB riduce il rischio di perderla quando si ricrea il supporto.
4. **Chiavetta BIOS, quando serve:** distinta e preparata secondo manuale del modello (filesystem, nome del file, porta FlashBack ecc.). GPT/NTFS della USB Windows non è una regola per il flash del firmware; spesso quel percorso richiede FAT32 e preparazione diversa.
5. In Rufus, al dialogo delle personalizzazioni, **leggere ogni casella, incluse quelle già spuntate**. Su PC supportato non aggiungere bypass TPM/Secure Boot/RAM/CPU. Non spuntare disabilitazione cifratura, installazione silenziosa o rimozioni app per inerzia. Account locale/preferenze regionali sono scelte separate. Controllare nome dell'account e protezione della password.
6. Confermare solo dopo aver ricontrollato la USB: **sono cancellate tutte le sue partizioni**, non solo una cartella. Attendere fine scrittura e controllare il supporto. Nel boot menu selezionare la voce UEFI della USB.
7. Scegliere installazione pulita soltanto se richiesta; identificare il disco prima di eliminare partizioni. Se possibile scollegare i dischi non destinazione, secondo le precauzioni hardware del modello; altrimenti non eliminarli. Licenza Home non diventa Pro perché un tool preseleziona Pro.
8. Se Setup non vede il disco, seguire il ramo storage §7: **Carica driver** dal pacchetto corretto, non formattazioni alla cieca o cambi RAID/VMD improvvisati.
9. Dopo la prima fase/riavvio, non ricominciare il boot di installazione: seguire Windows Boot Manager e il setup sul disco. Completare OOBE secondo il ramo realmente disponibile.
10. Al desktop, installare i pacchetti offline preparati e riavviare come richiesto; poi collegarsi per patch, Store/App Installer e applicazioni online. Completare gli aggiornamenti prima di una misura di baseline. Offline iniziale è controllo della sequenza, **non isolamento permanente senza patch**.

**Ripristino del media:** ricrearlo dalla ISO originale con opzioni annotate. Non recupera dati già cancellati sulla USB o partizioni del PC. Se una personalizzazione rende il sistema non avviabile, avere il media originale/recupero e un backup; disinstallare Rufus non annulla ciò che ha scritto sul supporto.

### 3.3 Account locale/OOBE: formulazione corretta

La [FAQ Rufus fissata](https://github.com/pbatard/rufus/wiki/FAQ/1b7c603c439a04d007d72d36063fc378a8930685) descrive la casella per rimuovere il requisito account online e, per il relativo percorso, richiede rete scollegata **alla creazione account**, non solamente al boot iniziale. Il sorgente v4.15 genera impostazioni unattended, `BypassNRO` e, se scelto, account locale. Questi sono **meccanismi riscontrati**, non prova di riuscita su ogni 25H2/26H2 o build successiva.

Distinguere:

- **Normale OOBE ufficiale:** può richiedere Internet e account Microsoft. La [pagina requisiti Learn acquisita](https://learn.microsoft.com/en-us/windows/whats-new/windows-11-requirements) specifica Home; non usare quel solo testo per garantire OOBE offline su Pro. La pagina commerciale completa e il post Insider tentato sono bloccati (§10): nessuna generalizzazione sul comportamento di tutte le build attuali.
- **Rufus/unattended:** possibilità dipendente da build/versione/edizione; modalità S può essere incompatibile con rimozione del requisito online. I bypass di controllo hardware non sono necessari per chiedere un account locale su PC supportato. Le richieste del setup possono cambiare anche con aggiornamenti del percorso online.
- **Fallback documentato:** se quel media non offre il ramo locale, non ripetere comandi storici `OOBE\BYPASSNRO`, falsi indirizzi email o URI come ricetta universale. Usare il percorso disponibile oppure ricreare un supporto verificato. Microsoft documenta il passaggio successivo **Impostazioni → Account → Le tue info → Accedi con un account locale** nella [guida account](https://support.microsoft.com/en-us/windows/change-from-a-local-account-to-a-microsoft-account-395203bf-9f1b-eb24-b042-5b8dae6c1d20).

Account locale non implica password vuota, auto-login, disattivazione Windows Hello o cifratura. Registrare la modalità account e dove viene conservata la chiave BitLocker; non affidarsi automaticamente al backup cloud quando si sceglie il locale. Non promettere che un semplice cavo staccato renda possibile completare qualunque OOBE.

## 4. FR33THY: cosa prendere e cosa non trasferire automaticamente

Non attribuire al solo profilo GitHub una certificazione del metodo. Il suo README rinvia a **Ultimate**, per power user con script e opzioni di revert, e **WinSux**, one-click per power user e con accesso online richiesto. Sono strumenti/script, non ISO Microsoft ufficiali.

Parti rilevanti fissate, anche conservate localmente:

- [BIOS Check](https://github.com/FR33THYFR33THY/Ultimate/blob/a0a33a57078434201f582b0db5107dcbb502292a/1%20Check/1%20Bios%20Check.ps1): mostra consigli XMP/DOCP/EXPO, C-state off per Intel K, PBO AMD, ReBAR, periferiche inutilizzate, utility OEM, ventole/pompa e TPM/Secure Boot. Identifica la motherboard tramite WMI e apre una ricerca Google; **non determina da solo la release BIOS corretta**. Esegue anche una modifica alla possibilità di accesso con password e richiede il riavvio nel firmware: non è un innocuo file informativo da avviare.
- [Reinstall](https://github.com/FR33THYFR33THY/Ultimate/blob/a0a33a57078434201f582b0db5107dcbb502292a/2%20Refresh/3%20Reinstall.ps1): scarica Media Creation Tool da asset del repository FR33THY, non direttamente dall'URL Microsoft. Non sono stati verificati quegli EXE; il setup principiante deve usare il download Microsoft diretto.
- [Autounattend](https://github.com/FR33THYFR33THY/Ultimate/blob/a0a33a57078434201f582b0db5107dcbb502292a/2%20Refresh/4%20Autounattend.ps1): costruisce un XML con account amministratore senza password, lingua en-US/fuso Central Standard Time, bypass requisiti e Dynamic Update disabilitato; poi lo sposta sulla USB. Non descriverlo come «solo account locale» o configurazione italiana neutra. Il file “Account Local” esaminato apre semplicemente `netplwiz`.
- [Bloatware](https://github.com/FR33THYFR33THY/Ultimate/blob/a0a33a57078434201f582b0db5107dcbb502292a/6%20Windows/13%20Bloatware.ps1): propone “Remove All Bloatware (Recommended)” con filtri a esclusione, rimozione app/capabilities/features e componenti come GameInput/OneDrive. Le eccezioni commentate attestano dipendenze note, **non** copertura di tutte le app del lettore; le voci reinstallazione non sono un backup fedele dello stato precedente.
- [WinSux launcher](https://github.com/FR33THYFR33THY/WinSux/blob/91adbfd63b7ed2eb5fcf0821fd53405a3cf63573/WinSux/winsux.ps1): scarica script da `main` e binari da asset `Files`, installa runtime e altre app, preconfigura DDU, rimuove app con liste di eccezione, aggiunge RunOnce, cambia `safeboot` e riavvia. Nei passaggi acquisiti [stepone](https://github.com/FR33THYFR33THY/WinSux/blob/91adbfd63b7ed2eb5fcf0821fd53405a3cf63573/WinSux/stepone.ps1) / [steptwo](https://github.com/FR33THYFR33THY/WinSux/blob/91adbfd63b7ed2eb5fcf0821fd53405a3cf63573/WinSux/steptwo.ps1) compaiono modifiche a protezioni/notifiche, rimozione WebView/Edge, app e funzioni. Il pin del launcher non fissa ciò che esso scaricherebbe da `main` in futuro.

**Da conservare come obiettivi:** conoscere hardware/versioni, firmware aggiornato quando pertinente, memoria configurata e stabile, driver preparati, avvio/background controllati, rimozione di app non usate, possibilità di confronto e ritorno. **Da non importare come baseline:** one-click integrale, account senza password, rimozioni all-users indistinte, disabilitazioni sicurezza o set di flag non spiegati.

Esempio utile della differenza tra meccanismo e promessa: [NVME Faster Driver](https://github.com/FR33THYFR33THY/Ultimate/blob/a0a33a57078434201f582b0db5107dcbb502292a/8%20Advanced/19%20NVME%20Faster%20Driver.ps1) scrive override FeatureManagement e chiavi SafeBoot; **avvisa “BREAKS MICROSOFT DIRECT STORAGE”**. Non è AHCI né un driver OEM selezionato per Hardware ID. Il ramo “Default” cancella l'intera chiave `HKLM\SYSTEM\CurrentControlSet\Policies\Microsoft`, non soltanto i valori aggiunti: ripristino più ampio del tweak, rischio concreto riscontrato staticamente. Escluderlo dal setup principiante senza negare in astratto che uno stack NVMe diverso possa cambiare le prestazioni; richiedere invece evidenza build/dispositivo/workload, compatibilità DirectStorage e rollback circoscritto.

Non è stata completata una security review di tutti i file di Ultimate/WinSux, né una prova degli asset. I rilievi sopra sono circoscritti alle parti pertinenti lette, non un verdetto su ogni contenuto dell'autore.

## 5. CTT/WinUtil e Win11 Creator

### 5.1 Tool sul Windows già installato

Il README e l'articolo distinguono Install, Tweaks, Config, Updates e Creator. Il tool può installare app via WinGet, applicare/rimuovere tweak, attivare funzioni e gestire policy update. Il comando `irm … | iex` scarica ed esegue contenuto remoto elevato: **non va inserito come requisito o avvio automatico nella bozza**. Un download/release locale ispezionato è più tracciabile, ma non prova che ogni successiva dipendenza sia offline o fissata.

[Preset JSON fissato](https://github.com/ChrisTitusTech/winutil/blob/07ccd8e2e755a706f31569808b31f5b77acad6a9/config/preset.json) e [tweaks JSON](https://github.com/ChrisTitusTech/winutil/blob/07ccd8e2e755a706f31569808b31f5b77acad6a9/config/tweaks.json): perfino `Minimal` include Services/Telemetry/WPBT/ConsumerFeatures; `Standard` include altre modifiche e RestorePoint. **“Minimal” non significa nessun intervento sistemico.** In guida: scegliere singole voci pertinenti, registrarle e non applicare un preset per il suo nome. Restore point e Undo Selected non sono un'immagine completa, non garantiscono recupero dei dati/app cancellati né identico stato preesistente.

L'articolo descrive Default/Security/Disable ALL Updates, e una versione EXE offline a pagamento. È la presentazione del progetto, non prova che il nostro futuro setup debba differire tutte le feature update di 365 giorni o le patch di quattro giorni. Non equiparare la policy di esclusione driver al blocco di tutte le patch. Un frontend avviabile offline non può installare qualunque app senza i relativi pacchetti/dipendenze.

### 5.2 Creator: percorso documentato e limiti reali

Percorso opzionale **da descrivere senza applicarlo**:

1. Prima della reinstallazione, su Windows funzionante/PC di preparazione, conservare ISO Microsoft e almeno il margine temporaneo indicato (~10–15 GB; driver possono aumentarlo).
2. Aprire il tab Win11 Creator di una versione nota; **Browse → Mount & Verify ISO**. Questo controlla struttura/immagine ed edizioni, non sostituisce SHA-256/provenienza Microsoft.
3. Scegliere edizione compatibile con la licenza (Pro preselezionata se disponibile non significa Pro attivabile). Decidere separatamente l'esportazione dei driver dell'attuale PC; non usarli indiscriminatamente su altro hardware.
4. Prima di **Run Modification**, conoscere le modifiche fisse: answer file/account locale, bypass hardware, prevenzione/disattivazione cifratura, rimozioni app e policy/task. Nel sorgente esaminato non sono tutte checkbox del wizard.
5. Esportare ISO oppure scrivere USB. La [funzione USB fissata](https://github.com/ChrisTitusTech/winutil/blob/07ccd8e2e755a706f31569808b31f5b77acad6a9/functions/private/Invoke-WinUtilISOUSB.ps1) e la documentazione prevedono cancellazione disco, GPT/FAT32, splitting del WIM grande; un ESD ≥4 GB non è splittabile da quel ramo. Per l'export ISO `oscdimg` può richiedere un download/installazione aggiuntiva: non completamente offline senza preparazione.
6. Conservare log/XML/output e il media originale; testare l'immagine fuori dal PC principale prima di proporla a un principiante. Non sommare un secondo unattended generato da Rufus.

**Discrepanza importante tra articolo e snapshot:** l'articolo CTT parla di 40+ app, edizioni rimosse, pulizia component store e ISO tipicamente 2,5–3,5 GB. La documentazione fissata riporta **19 app**, mantiene le edizioni nel WIM e dimensione vicina alla sorgente. Il [codice ISO esaminato](https://github.com/ChrisTitusTech/winutil/blob/07ccd8e2e755a706f31569808b31f5b77acad6a9/functions/private/Invoke-WinUtilISOScript.ps1) conferma un elenco di 19 package e personalizzazioni **staged per primo accesso**, `ei.cfg`/indice edizione e driver opzionali. L'elenco include anche Paint, Sticky Notes, Quick Assist e registratore vocale: “bloat” è giudizio dell'autore, non inutilità universale. **Non promettere una mini-ISO né rimozione offline di tutto il payload** sulla base dell'articolo.

Nel medesimo codice, `Add-WinUtilISOSetupCustomizations` genera `WinUtil-PostInstall.ps1`, con policy Windows Update, disabilitazione di servizi e cancellazione di definizioni task anche in aree UpdateOrchestrator/InstallService/WindowsUpdate; lo prepone a `FirstLogon.ps1`. L'[XML fissato](https://github.com/ChrisTitusTech/winutil/blob/07ccd8e2e755a706f31569808b31f5b77acad6a9/tools/autounattend.xml) contiene poi rimozioni delle policy e riabilitazione di BITS/wuauserv/UsoSvc/WaaSMedic. **L'intento di riattivare gli update è verificato; il completo ripristino non è dimostrato**: la sola riabilitazione servizi non ricrea i task cancellati. Controllare concretamente update/Store dopo installazione; non dichiarare qui un fallimento certo su ogni build, ma nemmeno “nessun impatto, tutto torna normale”.

L'XML include inoltre download di ViVeTool al primo accesso e disattivazione BitLocker se attivo. La creazione del media su PC connesso **non garantisce quindi un completamento integralmente offline**. La frase del progetto sulla “piena compatibilità” o sull'eliminazione di “startup overhead” non è un benchmark e non giustifica disabilitare cifratura nella baseline.

**Decisione V3:** mantenere il link e spiegare l'alternativa; non eleggerla a percorso base finché le modifiche fisse divergono dagli obiettivi della guida. Debloat live selettivo con WinUtil e Creator sono due flussi diversi. Per recuperare da modifiche estese già applicate, serve inventario/log e talvolta riparazione o reinstallazione da media originale; un pulsante Default del frontend non va presentato come rollback integrale dell'immagine.

## 6. Winhance, WIMUtil e Wintoys

### 6.1 Winhance sul sistema installato

Winhance è un progetto indipendente da Microsoft. Il README del snapshot descrive C#, Windows 10/11, prove dichiarate su Windows 11 23H2/24H2/25H2, versione installabile/portable nell'installer e app esterne via WinGet. Non installato qui. Il comando remoto rapido è un bootstrap elevato, non un passaggio automatico da aggiungere.

Le [configurazioni documentate](https://winhance.net/docs/guides/configuration-files.html) permettono import/export `.winhance`, config personale, Recommended, backup iniziale e default Windows. **Import Recommended non è neutro**: può selezionare rimozioni e app esterne. Import e controllo voci non devono essere confusi con “niente è ancora cambiato”: Optimize/Customize possono applicare impostazioni, e gli import hanno scelte “process now”/“select checkboxes only”, oltre a review/apply. La review va mantenuta e la semantica della release verificata sulla GUI prima di istruzioni con click esatti.

Per la futura guida: selezionare una piccola lista personale, leggere descrizioni e dipendenze, esportare lo stato prima di cambiare, distinguere app da funzioni, lasciare fuori quanto non compreso. Backup config ripristina **impostazioni gestite dal tool**, non tutti i file/dati/driver/app del PC. Default Windows è uno stato di riferimento, non necessariamente il precedente OEM/utente.

### 6.2 WIMUtil: input ufficiale, output personalizzato

La [guida WIMUtil](https://winhance.net/docs/guides/wimutil.html) richiede ISO Microsoft ufficiali Windows 10/11: ISO terze modificate non supportate. Percorso documentato:

1. **Select ISO**, working directory con almeno ~15–20 GB liberi, **Start Extraction**. Monta/copia/smonta; questa fase non installa Windows sul PC di preparazione.
2. Conversione WIM ↔ ESD **opzionale**, principalmente dimensioni/compressione; non è un tweak di latenza. Non promettere un tempo/installazione più veloce universale.
3. Scegliere **un solo** XML: generato dalle proprie scelte Winhance, file locale già revisionato oppure UnattendedWinstall remoto preconfigurato. Quest'ultimo è un preset variabile, non identico alle proprie scelte e non selezionato nella baseline.
4. Prima di generare, controllare app da rimuovere e stati Optimize/Customize. La generazione può catturare lo stato del PC di preparazione: non usarla per “pianificare” sul PC principale senza capire quali impostazioni sono state applicate o esportate. Un PC/ambiente di preparazione separato evita di ottimizzare accidentalmente quello che si sta usando.
5. Driver: esportazione dei terzi dall'attuale Windows utile per reinstallare **lo stesso hardware**; in alternativa cartella `.inf` appropriata al PC destinazione. Non è l'installer completo OEM e non garantisce utility, firmware, pannelli DCH o dipendenze Store. Evitare di esportare tutto da un PC diverso o già affetto da regressioni.
6. **Create ISO** tramite oscdimg/ADK. La guida prevede il download/installazione dei Deployment Tools se assenti: preparazione online necessaria in quel caso. Scrivere poi il supporto con Rufus, lasciando fuori personalizzazioni Rufus che genererebbero un answer file concorrente.

**Attenzione: non sono tutte opzioni lasciate in bianco.** Il [template release fissato](https://github.com/memstechtips/Winhance/blob/f23d554eb2d6400b1827bcc46b91294ffa53fbc9/src/Winhance.UI/Features/Common/Resources/AdvancedTools/autounattend-template.xml) contiene già bypass TPM/Secure Boot/CPU/RAM/storage, `BypassNRO`, disabilitazione temporanea adattatori, schermate OOBE nascoste, riabilitazione rete al primo accesso e abilitazione .NET 3.5 da media. Il [generatore della release](https://github.com/memstechtips/Winhance/blob/f23d554eb2d6400b1827bcc46b91294ffa53fbc9/src/Winhance.UI/Features/AdvancedTools/Services/AutounattendXmlGeneratorService.cs) carica il template e vi inserisce lo script derivato dalla config. **Svuotare le caselle di rimozione app non produce automaticamente un XML “solo le mie opzioni”.** I bypass dei controlli non equivalgono necessariamente a spegnere TPM/Secure Boot nel firmware, ma restano interventi non necessari sul PC supportato. Per un ramo conforme agli obiettivi, esaminare/modificare e validare l'XML su macchina di prova; non consegnare qui un XML alternativo non collaudato.

Il [servizio WIM della release](https://github.com/memstechtips/Winhance/blob/f23d554eb2d6400b1827bcc46b91294ffa53fbc9/src/Winhance.Infrastructure/Features/AdvancedTools/Services/WimCustomizationService.cs), confrontato con HEAD acquisito, distingue driver storage in `sources/$WinpeDriver$` e altri sotto `$OEM$/$$/Drivers`, poi crea `SetupComplete.cmd` con `pnputil`. È preparazione/staging dei pacchetti, da non equiparare sempre a injection DISM dentro tutti gli indici di boot/install.

La [documentazione Microsoft SetupComplete](https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/add-a-custom-script-to-windows-setup?view=windows-11) conferma restrizioni con chiavi OEM, salvo edizioni indicate (Enterprise/Server): **non garantire installazione automatica di tutti i driver su Home/Pro OEM**. Il percorso manuale documentato è Gestione dispositivi → Aggiorna driver → Cerca nel computer → `C:\Windows\Drivers`; verificare la presenza effettiva della cartella e poi usare gli installer completi mancanti. Le specifiche affermazioni Winhance su IoT LTSC non sono state collaudate né generalizzate; la licenza del lettore non va cambiata per aggirare questa limitazione.

La [guida Autounattend](https://winhance.net/docs/guides/autounattend.html) chiarisce che **le app esterne non sono incluse nell'XML**. La scorciatoia “Install Winhance” sul desktop scarica/installa la versione corrente soltanto quando la si esegue e richiede Internet. Non è prova che Winhance o un browser siano già disponibili offline. Se si rimuove Edge senza un altro browser completo preparato, si può perdere il percorso pratico di download.

Alternativa documentata alla ISO ricostruita: USB Windows con Rufus e **un XML personale già revisionato nella radice**, senza le opzioni unattended di Rufus. Meno passaggi di ricostruzione, ma gli script/policy nel file vengono comunque eseguiti da Setup: **XML non significa “solo configurazione innocua”**. Non sovrapporre XML Winhance, FR33THY e Rufus; non sommarli tramite copia alla cieca.

### 6.3 Wintoys: alternativa live, non builder Windows

Identificato autore **Bogdan Pătrăucean** e prodotto Store `9P8LTPGCBZXD`; non confonderlo con utility dal nome simile. Sito/Store dichiarano gestione app, servizi, impostazioni/prestazioni, pulizia/riparazione e informazioni hardware. È un frontend di intervento sul Windows installato, **non la funzione WIMUtil né Win11 Creator**.

La FAQ dichiara il codice chiuso: qui verificati descrizioni, provenienza e limiti documentati, non implementazione interna. Esempi utili: HAGS non disponibile su GPU non supportata; piano Ultimate Performance limitato su Modern Standby; opzioni grafica “best performance” possono peggiorare la leggibilità dei caratteri. Una descrizione che dice “safely disable” non sostituisce la verifica delle dipendenze di un servizio.

La [guida offline dell'autore](https://bogdan-patraucean.github.io/about/wintoys/offline) esiste, è esplicitamente non per utente medio e richiede MSIX/App Installer/Windows App Runtime/VC framework e corretta architettura. Propone anche un servizio terzo di ricerca dei link Store: **non lo abbiamo interrogato, non abbiamo scaricato quei package né controllato le firme**. Non presentare Wintoys come un singolo EXE universale copiabile e avviabile senza dipendenze. Per il setup principiante è più chiaro installarlo dal suo Store quando il ramo online è disponibile; offline resta un approfondimento separato da validare.

**Regola comune ai tool live:** usarne preferibilmente uno come interfaccia delle modifiche scelte, per non perdere tracciabilità; non è un vincolo tecnico che impedisca agli altri di coesistere. Nessun “Select all”, nessun preset Recommended applicato in automatico, nessun launcher remoto nuovo nella bozza. Disinstallare il frontend non annulla necessariamente i tweak.

## 7. Storage: SATA AHCI, NVMe, RST/VMD e RAID

Fonti: [Intel VMD/RST](https://www.intel.com/content/www/us/en/support/articles/000057787/memory-and-storage/intel-optane-memory.html), [ASUS disco non rilevato/IRST](https://www.asus.com/support/faq/1044458/), [Microsoft StorNVMe](https://learn.microsoft.com/en-us/windows-hardware/drivers/storage/nvme-features-supported-by-stornvme).

| Situazione | Meccanismo e decisione | Rischio e recupero |
|---|---|---|
| Disco SATA, nessun array/Optane e installazione nuova | AHCI è un'interfaccia del controller SATA; può essere scelta se il modello la supporta e non richiede RST/RAID. Fare la scelta **prima** dell'installazione. | Cambiare da RAID/RST/IDE a AHCI su Windows esistente può impedire l'avvio. Registrare la modalità precedente; nessun toggle automatico. |
| SSD NVMe PCIe gestito nativamente | NVMe è un protocollo distinto, normalmente gestito da driver NVMe Windows o compatibile. M.2 è il formato e può ospitare SATA oppure NVMe: identificarlo. | Non cercare “AHCI per l'NVMe”. Nessuna prova qui che un driver alternativo riduca la latenza gaming. |
| NVMe dietro Intel VMD/RST | L'SSD resta NVMe ma Setup può aver bisogno del driver controller VMD/RST compatibile per vederlo. Preparare i driver estratti, usare Carica driver e completare poi il pacchetto OS. | Non rimuovere il driver di boot: Intel avverte di INACCESSIBLE_BOOT_DEVICE e possibile perdita dati. Non usare driver generico per superare un problema di controller. |
| RAID/Optane, Intel o altra piattaforma/OEM | Preservare configurazione e driver previsti, compresi eventuali pacchetti RAID AMD: non chiamarli “bloat” per il loro nome. | Disattivare il controller/array può rendere volumi non accessibili e compromettere il recupero. Backup completo e manuale OEM prima di ogni variazione. |
| Installazione nuova, VMD non necessario e OEM permette disattivarlo | ASUS documenta anche questo ramo alternativo per modelli pertinenti, avvertendo che non si potranno usare array RAID. È un'opzione motivata, non proibita in assoluto. | Solo dopo aver escluso array/Optane e dipendenze, prima dell'installazione. Non trapiantare il percorso del BIOS ASUS su qualunque notebook. |

**Formulazione editoriale:** «Imposta AHCI se usi un controller SATA senza necessità di RAID/RST e il modello lo prevede. Per NVMe identifica gestione nativa o VMD/RST/RAID; prepara il driver storage corretto quando serve. Non cambiare la modalità su un Windows funzionante come tweak di latenza». Se un cambio impedisce il boot, ripristinare anzitutto la configurazione registrata; evitare tentativi di riparazione distruttivi. Un reset BIOS può ripristinare VMD/RAID senza che l'utente abbia toccato quella voce: controllarla dopo il flash.

## 8. BIOS e driver: sequenza ragionata, non universale

### 8.1 Aggiornamento firmware

Fonte generale acquisita: [ASUS aggiornamento BIOS](https://www.asus.com/support/faq/1044348/), con dipendenze da modello, rischi, supporto nuove CPU, versioni intermedie possibili e downgrade non sempre ammesso. Fonte BitLocker: [Microsoft sospensione per aggiornamenti non Microsoft](https://learn.microsoft.com/en-us/troubleshoot/windows-client/windows-security/suspend-bitlocker-protection-non-microsoft-updates).

**Meccanismo:** il firmware inizializza piattaforma/memoria/storage e incorpora correzioni compatibilità, sicurezza, microcodice e talvolta scheduler/power behavior. La baseline può beneficiare di una release aggiornata pertinente anche prima di notare un problema. Non è però una misura diretta di input lag.

**Procedura futura da spiegare:**

1. Identificare **modello e revisione** motherboard oppure modello OEM completo; confrontare BIOS attuale, CPU supportata e release notes. Preferire l'ultima **stabile adatta al modello e alle dipendenze**, non il primo risultato Google e non una beta solo perché ha il numero più alto. Beta solo per una correzione/prerequisito identificato, con rischio e recupero espliciti.
2. Leggere prerequisiti: bridge/intermediate BIOS, aggiornamenti ME/EC/firmware, utility e rinomina file richieste. «Latest» non permette di saltare un passaggio obbligatorio. Su OEM seguire il pacchetto specifico; aggiornare prima di installare se il metodo lo consente, ma un flasher Windows può richiedere prima un OS funzionante.
3. Salvare dati e chiave BitLocker fuori dal PC; registrare impostazioni con foto: boot UEFI/ordine, storage/VMD/RAID, Secure Boot/TPM, ventole/pompa, ReBAR, XMP/EXPO, OC/undervolt e virtualizzazione. Seguire le indicazioni del modello per riportare parametri instabili a valori sicuri prima del flash.
4. Verificare cifratura e **sospendere la protezione BitLocker quando previsto dal processo firmware**, non decriptare automaticamente tutto il disco. Sospensione, disattivazione/decrittazione e cancellazione TPM sono azioni differenti. Se il tool OEM gestisce la sospensione, verificarne esito e riattivazione; non assumere che qualsiasi flasher la gestisca. Non salvare la recovery key solo sul disco protetto.
5. Alimentazione stabile; su notebook alimentatore e batteria come richiesto. Non interrompere il flash o il memory training perché il primo avvio sembra lungo. Sapere prima se esistono FlashBack, dual BIOS o procedura di recovery: non sono presenti su ogni modello.
6. Dopo il flash verificare versione e impostazioni: possono tornare a default, cambiare o invalidare profili salvati. **Non importare automaticamente un vecchio profilo OC tra versioni BIOS**; ricostruire solo le scelte motivate. Il manuale decide eventuale Load Optimized Defaults; questo può cambiare anche storage/boot e richiede controllo prima di avviare il Windows precedente.
7. Prima verificare avvio, dispositivi, temperature e stabilità a configurazione sicura. Riapplicare/testare XMP/EXPO e altre scelte una per volta. Riprendere BitLocker e verificare protezione/chiave, TPM/Secure Boot e funzioni richieste. Per regressioni leggere le limitazioni di rollback: downgrade firmware non garantito e punto di ripristino Windows non recupera un flash fallito.

**XMP/EXPO/PBO/C-state/ReBAR:** conservarli come scelte da motivare, non cancellare tutta la proposta né copiarla alla cieca. Profilo RAM può migliorare workload sensibili alla memoria ma richiede test; PBO è gestione boost/potenza/OC e può aumentare temperatura; C-state off può cambiare transizioni energetiche ma anche consumo e boost, senza evidenza universale “Intel K = sempre meglio”; ReBAR dipende da CPU/board/GPU/driver/gioco. Ripristino: singoli valori annotati o configurazione sicura prevista dal modello, poi confronto dello stesso workload. Non trasformare i consigli FR33THY in prerequisiti per avere Windows funzionante.

**Periferiche “non usate”:** disattivare iGPU/Wi-Fi/BT/audio onboard può essere una scelta pulita su desktop con percorso alternativo certo, non un divieto generale. iGPU può servire MUX/display/Quick Sync/diagnosi; BT a controller e cuffie; audio alla voce; software OEM a ventole, alimentazione e tasti notebook. Identificare uso/dipendenze prima, annotare e testare; spegnere un dispositivo inattivo non prova un guadagno. Se compaiono regressioni, riattivare la stessa voce e recuperare l'installer OEM. Evitare app OEM automatiche non necessarie è diverso da eliminare ogni componente della piattaforma.

### 8.2 Ordine driver, incluso video → chipset

**Non esiste una sequenza universale che dia meno latenza.** Serve soddisfare prerequisiti, ottenere un sistema controllabile e impedire sostituzioni inattese. Distinguere driver di boot caricati da Setup, installer di piattaforma, driver GPU, reti e applicazioni/pannelli.

- **Percorso opzionale dell'utente:** se Windows ha già i driver di base sufficienti, gli installer GPU/chipset scelti supportano quella build e non ci sono dipendenze che impongono altro, è possibile **GPU → chipset/piattaforma → rete/audio/periferiche**, con riavvii indicati. Non è da bocciare soltanto perché differisce da una lista generica; annotare versioni/esiti e verificare Gestione dispositivi e workload reale. Non è dimostrato che invertire chipset/GPU riduca DPC o input lag.
- **Percorso OEM/dipendenze:** storage per vedere il disco viene necessariamente prima del desktop. Su notebook/ibridi/SoC/OEM possono servire chipset/system interface/MEI/Serial IO/SST, iGPU o componenti DCH prima di dispositivi o pannelli che ne dipendono. Su piattaforme AMD/Intel installare il pacchetto pertinente, non un “chipset generico” di un altro modello; verificare release notes e prerequisiti. Rete può dover precedere un installer online. Questa è la ragione tecnica per cambiare sequenza, non una preferenza rituale.
- **Ramo offline controllato:** preparare pacchetti completi prima, installare con riavvii, riconnettere e fare gli update; utile a evitare che WU fornisca un altro driver GPU mentre si sta scegliendo la propria versione. Non è un benchmark dell'ordine e non obbliga a bloccare per sempre WU.
- **Verifica:** fornitore/versione/componenti installati, nessun errore PnP irrisolto, display/refresh, sospensione, rete, audio/microfono, periferiche e pannelli necessari. “Nessun triangolo giallo” è necessario ma non dimostra che tutto sia ottimale. Conservare pacchetto precedente e modalità di rollback; DDU è un ramo di troubleshooting, non obbligatorio dopo l'installazione pulita.

La [pagina Dell ordine driver](https://www.dell.com/support/kbdoc/en-us/000132394/how-to-install-dell-drivers-in-the-correct-order) ha restituito **403**: non si attribuisce qui alla sua versione corrente una sequenza specifica non letta. Le dipendenze devono essere riscontrate sui supporti del **modello effettivo**, che in questo incarico non è stato fornito.

Esclusione driver WU: la [documentazione Microsoft](https://learn.microsoft.com/en-us/windows/deployment/update/waas-wu-settings) distingue policy driver e altri update. Utile se si gestiscono manualmente versioni note; efficacia va verificata per edizione/build/policy. Non blocca necessariamente ogni percorso di provisioning/OEM né impedisce tutti gli installer. Ripristino: rimuovere la policy scelta o tornare al valore annotato e verificare offerta update. Se resta esclusa, il manutentore deve aggiornare anche rete/storage/chipset, non soltanto GPU.

## 9. WinGet, Visual C++ e DirectX: ruolo nel setup

### 9.1 WinGet Microsoft

WinGet è un **gestore di applicazioni**, non un ottimizzatore né un driver manager generale. Microsoft documenta che viene distribuito con App Installer e può non essere pronto al primissimo login perché registrazione/aggiornamento sono asincroni. Non chiamare un errore iniziale «Windows rotto» e non risolverlo con repository casuali o disattivando Store/sicurezza.

Nella futura guida: identificare pacchetto con search/show, controllare publisher/URL, **ID esatto e source** (`winget` community repository vs `msstore`), poi installazione richiesta dal lettore. `--silent` e accettazione automatica degli accordi sono azioni deliberate, non garanzia di assenza di componenti opzionali. Non elevare tutto per abitudine: alcuni installer chiedono UAC quando necessario; il wrapper amministratore aumenta la fiducia concessa. Non usare `--ignore-security-hash` né soppressioni scansione come rimedio ordinario.

Offline: `winget install` non prepara magicamente tutti i pacchetti offline. Il [comando download](https://learn.microsoft.com/en-us/windows/package-manager/winget/download) può predisporre installer/dipendenze/licenze quando supportato; pacchetti Store hanno condizioni di autenticazione/licenza e `--skip-license` non equivale a un diritto universale di redistribuzione. Per il principiante mantenere pacchetti vendor completi sulla USB e posticipare app via WinGet al ramo online. Se si aggiungerà un workflow offline WinGet, validare specifici pacchetti/architetture, non prometterlo in blocco.

### 9.2 Visual C++ All-in-One TechPowerUp

La [pagina TPU](https://www.techpowerup.com/download/visual-c-redistributable-runtime-package-all-in-one/) era accessibile **HTTP 200**, non 403. Snapshot: All-in-One **June 2026**, archive `Visual-C-Runtimes-All-in-One-Jun-2026.zip`, SHA-256 dichiarato `2339520E8E6CCB2DFFD137F5D692F018209D28DCAD500CD6D3FCD7D7BCCCBC6A`. È una raccolta confezionata da TPU di installer runtime Microsoft e `install_all.bat`; TPU dichiara firme Microsoft sui file. **Non abbiamo scaricato lo ZIP, letto il batch incluso o verificato quelle firme/hash sul binario.** L'hash della pagina salvata nel registro è un altro oggetto.

**Meccanismo/evidenza:** le librerie VC++ sono dipendenze dei programmi, non “tweak FPS”. Microsoft conferma corrispondenza all'architettura dell'app, v14 condiviso per toolchain compatibili e runtime 2013/precedenti affiancati. Su Windows x64 possono servire **x86 e x64** per app diverse; «Windows è 64 bit» non rende inutile x86. Il nome “All-in-One” non significa che installi ogni dipendenza .NET, DirectX, Windows App Runtime o VC framework MSIX.

**Scelta utente legittima:** per un PC appena installato con molti launcher/giochi anche vecchi, mantenere il pack come **opzione di comodità offline** anziché cancellarlo dalla guida perché non è il minimo per una singola app. Indicare che installa più generazioni delle sole necessarie e che gli installer dei giochi spesso provvedono da sé; alternativa più mirata dalla [pagina Microsoft](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-170). Non promettere riduzione della latenza.

**Procedura futura:** scaricare dalla pagina TPU esatta sul PC di preparazione, confrontare SHA-256 dello ZIP con quello della **stessa release**, estrarre tutto, ispezionare il BAT prima di eseguirlo come amministratore e controllare le firme dei redistributable Microsoft. Registrare eventuali errori/riavvio; non scaricare singole DLL da siti terzi. Non descrivere questi controlli come già eseguiti.

**Ripristino:** non rimuovere tutti i VC++ come pulizia o per tornare indietro: app diverse li condividono. Usare repair/reinstall della generazione richiesta; per regressione identificata valutare la versione precedente compatibile e supportata. Runtime legacy fuori supporto sono un compromesso di compatibilità da dichiarare, non una nuova garanzia di sicurezza.

### 9.3 DirectX offline TechPowerUp

La [pagina TPU](https://www.techpowerup.com/download/directx-redistributable-runtime/) era **HTTP 200**. Snapshot: `DirectX-Redist-Jun-2010.zip`, SHA-256 dichiarato `DAE4769D68E0D6C7DC21CED07E96040CB32FB74B5A1A7E7759BD08DE6CE48E91`; la pagina riporta anche un batch TPU `# install.bat`. Non scaricati/verificati archivio, batch o firme. Alternativa diretta: [Microsoft DirectX End-User Runtimes June 2010](https://www.microsoft.com/en-us/download/details.aspx?id=8109), file `directx_Jun2010_redist.exe` versione dichiarata `9.29.1974.1`.

Microsoft spiega che sono componenti **legacy side-by-side** (D3DX9/10/11, XAudio 2.7, XInput 1.3, XACT, Managed DirectX), non sostituzione o downgrade del DirectX presente nel sistema. Windows 11 può avere DirectX 12 e un gioco richiedere comunque una DLL legacy. La data “June 2010” non significa che si debba installare Windows/driver del 2010.

**Scelta:** utile offline per giochi che richiedono quelle librerie, anche come componente di un setup multigioco preparato; non obbligatorio per ogni titolo moderno e non “aggiorna DirectX per più FPS”. Scaricare pacchetto completo, estrarre e seguire installer Microsoft `DXSETUP.exe` o un batch prima ispezionato; non copiare DLL casuali in System32/SysWOW64 e non fare doppia installazione TPU+Microsoft senza motivo.

**Ripristino:** Microsoft specifica che il runtime non può essere disinstallato ordinariamente. Sono librerie affiancate; non promettere Undo del tool. In caso di stato gravemente compromesso usare backup/immagine o riparazione appropriata, non cancellare manualmente le DLL. Per la versione futura della guida ricordare anche questo limite prima di presentarlo come “reversibile”.

## 10. Limiti di accesso e verifiche ancora necessarie

**Accessi negati HTTP 403 registrati, non aggirati:**

- [Microsoft Windows 11 specifications](https://www.microsoft.com/en-us/windows/windows-11-specifications): copia `setup-ms-win11-spec.html`. Non usata come contenuto letto; alternativa parziale Learn requisiti, con il limite Home/Pro spiegato sopra.
- [Dell ordine driver](https://www.dell.com/support/kbdoc/en-us/000132394/how-to-install-dell-drivers-in-the-correct-order): copia `setup-dell-driver-order.html`. Non dichiarata letta né citata per una sequenza precisa.
- [Windows Insider build 26220.6772, URL tentato](https://blogs.windows.com/windows-insider/2025/10/06/announcing-windows-11-insider-preview-build-26220-6772-dev-channel/): copia `setup-ms-oobe-blog.html`. Il corpo dell'annuncio non è stato verificato; nessuna deduzione che una modifica Insider valga su tutte le stable.

Le due pagine TechPowerUp richieste hanno invece risposto 200. Un HTTP 200 di Store significa che sono stati letti pagina/metadati, **non** che l'app sia stata installata o testata. Le intestazioni Learn con avvisi standard di autorizzazione non hanno impedito di leggere i corpi degli articoli qui citati; non sono equiparate a un 403.

**Prima delle istruzioni definitive con schermate/click:** scegliere build Windows, versione tool e hardware di prova; verificare OOBE offline/account, cifratura finale, supporto UEFI/Secure Boot, task/update/Store dopo Creator, import/generazione Winhance senza modifiche indesiderate, driver storage e SetupComplete su OEM, runtime firmati e app reali. Annotare prove e recupero prima di presentare un percorso come collaudato.

Non verificati: asset/binari e firme runtime, corrispondenza binario-sorgente, driver del modello utente, prerequisiti/downgrade di una motherboard specifica, build/OOBE future, funzionamento dei tool, benefici di latenza, ripristini reali o script Prime Build durante questo incarico. Nessuna prova sul PC dell'utente.

## 11. Indicazioni pronte per la riscrittura

Il capitolo dovrà rendere visibili **percorso base e varianti**, senza aprire tool automaticamente:

1. **Preparazione verificabile:** backup/BitLocker, identificazione hardware, ISO Microsoft + Rufus, USB driver/runtime offline, firmware separato quando necessario.
2. **Firmware:** ultima stabile pertinente e prerequisiti; salvataggio/reset controllato delle impostazioni e nuovo test RAM, non beta/OC incondizionato.
3. **Installazione:** UEFI/GPT e disco identificato; ramo storage nativo/VMD/RAID; account locale/offline se disponibile con quel media/build, fallback spiegato.
4. **Driver:** ordine utente video→chipset come variante quando praticabile, precedenza alle vere dipendenze, poi verifica e riconnessione/update. Nessuna legge universale chipset-prima o GPU-prima.
5. **Runtime/app:** pack VC++ e DirectX legacy opzionali con scopo/offline/controlli, oppure dipendenze per titolo; WinGet nel ramo online con ID/source verificati.
6. **Debloat/configurazione:** lista personale e un'interfaccia scelta tra strumenti pertinenti; nessun default “tutto”, nessuna nuova automazione CTT/Winhance. Impostazioni a rischio tenute distinte dalle rimozioni app.
7. **Media personalizzato, ramo avanzato:** CTT Creator/WIMUtil descritti come alternative, con modifiche fisse, XML, prerequisiti e dipendenze online espliciti. Non chiamarli ISO ufficiali né procedure integralmente offline garantite.
8. **Esito e recupero:** versioni, funzionamento voce/rete/display/sospensione/gioco, update/Store/cifratura, confronto coerente e ritorno alla singola modifica. Non chiamare un sistema “low latency certificato” perché si sono concluse le installazioni.

**Sintesi:** la proposta utente conserva valore come workflow pratico e personalizzabile. Le correzioni riguardano promesse assolute, dipendenze, sicurezza e ripristino, non un obbligo ideologico di lasciare ogni default vendor.

**Saltato volutamente:** installazioni, esecuzioni e collaudi hardware; esaminati documenti e parti sorgente pertinenti, non ogni script dei progetti.
**Rischio residuo:** media/OOBE e preset possono cambiare tra build e release; modifiche a storage, firmware, cifratura e rimozioni estese non vanno distribuite come baseline senza una prova di recupero.
