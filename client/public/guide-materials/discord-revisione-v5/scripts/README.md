# Script Prime Build — distribuzione v4 per guida

**Windows 11 25H2 e successive, edizioni client.** I sorgenti sono non firmati e richiedono ancora validazione funzionale su PC di prova prima della distribuzione stabile. Nessun guadagno di latenza è promesso.

## Per gli utenti

Usa lo ZIP allegato alla guida che stai seguendo. **Estrai tutto in una cartella nuova e apri `Avvia-PrimeBuild.bat` con doppio clic**. Non devi aprire i PS1 o scrivere comandi; sono componenti interni da lasciare insieme al BAT. Non mescolare file/cartelle/versioni.

| ZIP | Menu e componenti |
|---|---|
| PrimeBuild-FirstSetup-v4.zip | Pack completo: First Setup, diagnostica, input mouse/USB e avvio audio |
| PrimeBuild-Diagnostica-v4.zip | Solo letture MMCSS, BCD, rete/QoS e USB |
| PrimeBuild-Audio-v4.zip | Solo stato/creazione/rimozione dell'avvio LowAudioLatency |
| PrimeBuild-Input-v4.zip | Solo stato/accelerazione/ripristino mouse e inventario USB |

Grafica e Display non richiedono uno script Prime Build. Gli ZIP tematici sono **autonomi**: non serve scaricare anche First Setup. Nel pack completo trovi le stesse funzioni, non varianti con effetti diversi. Non è necessario installare o applicare tutto.

I BAT usano `-ExecutionPolicy Bypass` solo nel processo PowerShell avviato, senza cambiare policy persistenti. Le GPO hanno precedenza; antivirus, SmartScreen e regole aziendali non vengono disabilitati. Verifica la provenienza dell'intero ZIP; se una protezione o policy gestita blocca l'avvio, fermati e chiedi supporto.

## First Setup: perché il pack è completo

Scegli **First Setup** dal menu principale, oppure apri direttamente `PrimeBuild-FirstSetup.bat`. Richiede elevazione per le operazioni amministrative. Preserva la coda app e le conferme, non applica automaticamente le funzioni degli altri menu.

- Verifica Windows 11 client, build >= 26200, e presenza dei componenti.
- Richiede cartelle script/TEMP utilizzabili senza `!`; rifiuta il caso non supportato.
- Winget: ID e sorgenti espliciti, selezione delle sole app necessarie e verifica della coda.
- WinUtil/WinHance e altre voci URL aprono le pagine ufficiali: nessun `irm | iex` o esecuzione remota elevata.
- App update: inventario esportabile e conferma; Epic, Battle.net e HWiNFO esclusi senza modificare pin. Altre sorgenti/updater richiedono gestione manuale.
- Xbox e DLSS Swapper usano le fonti ufficiali al posto degli ID precedenti non riscontrati.
- Policy driver WU opzionale: backup/ripristino della singola impostazione; non spegne Windows Update né blocca ogni driver.
- Audio/virtualizzazione: indicazioni e pannelli, non Realtek o VBS OFF come baseline.
- DISM/SFC solo dopo conferma; apertura pagina e codice riavvio non certificano un'installazione o una riparazione.

## Diagnostica

Nel pack dedicato il BAT apre direttamente MMCSS, BCD, Rete e USB; in First Setup scegli Diagnostica. **Sola lettura**, nessun benchmark o ripristino di presunti default. BCD legge `bcdedit /enum {current}` e richiede tasto destro sul BAT → Esegui come amministratore. USB è un inventario PnP delle classi USB/HIDClass/Mouse, non la topologia completa di USBTreeView.

Se una lettura fallisce, il report può essere parziale. Rimuovi nomi e identificativi personali prima di condividerlo. Non conclude da solo chi abbia causato stutter, né come router/ISP trattino DSCP.

## Input

Nel pack dedicato il BAT apre direttamente stato mouse, disattivazione accelerazione, ripristino e inventario USB; nel completo scegli Input. Mouse usa **il proprio utente**, senza necessità di admin: non usare credenziali di un altro account.

Modifica soltanto i tre parametri di soglia/accelerazione del puntatore tramite SystemParametersInfo, con backup non sovrascrivibile e conferme. Non cambia velocità cursore, DPI, curve MarkC, login, FSO o interrupt; non abilita Raw Input e non annulla MouseCurveFlat. USB non cambia alcuna impostazione. **Nessun HIDUSBF incluso, installato o rimosso**: prova e recupero del filtro rimangono nel PDF e nelle istruzioni del suo autore.

Backup mouse: `%LOCALAPPDATA%\PrimeBuild\Backups\mouse-parameters.json`. Non cancellarlo se vuoi ripristinare. Se una scrittura fallisce, conserva backup ed errore invece di forzare valori nel registro.

## Audio

Nel pack dedicato il BAT apre direttamente stato/creazione/rimozione dell'avvio; in First Setup scegli LowAudioLatency. Scarica e **prova manualmente** il tool da https://github.com/spddl/LowAudioLatency. L'EXE non è incluso, scaricato o certificato dallo script.

Scegli l'EXE nella finestra di selezione, poi conferma INSTALLA soltanto dopo un test stabile. Annullare la selezione non crea la task. La task usa il proprio utente interattivo, `Limited`, argomenti default, nessun SYSTEM/password o elevazione forzata. Non usarla tramite un altro account e non aspettarti argomenti personalizzati o privilegi che non fornisce.

Non avvia subito il programma: verifica al prossimo accesso processo, endpoint e stabilità. Rimuovere l'avvio non termina un processo già aperto. Se trova una task che avvia direttamente lo stesso EXE rifiuta il duplicato, senza cancellare quella precedente. Controlla anche wrapper, cartella Esecuzione automatica e processi aperti: non tutti gli avvii indiretti sono riconoscibili.

## Backup, identità e vecchi pack

Policy WU: `%LOCALAPPDATA%\PrimeBuild\Backups\WU-driver-policy.json` nel profilo che esegue l'operazione elevata. Credenziali di un altro admin possono usare un altro profilo. Restore controlla identità/stato e archivia il backup con nome unico; non ricostruisce driver, GPO o l'intera macchina.

**v4 identifica questa organizzazione dei materiali e dei pack.** Schema dei backup e descrizione della task audio v3 rimangono invariati per riconoscere i salvataggi della precedente revisione. Questo non conferisce compatibilità con i vecchi preset v2 o EXE compilati.

Nessuno script annulla automaticamente MMCSS, timer, profili servizi, scaling, FSO, QoS o filtri dei vecchi pack. Non importa un BCD esterno né reinstalla componenti OEM. Per PC già modificati servono inventario e verifica individuale, non un “ripristina tutto”.

## Per manutenzione del progetto

Questa cartella è la fonte unica. `genera-pacchetto.py` copia soltanto i componenti richiesti e ricava i BAT tematici dalle sezioni del launcher completo. Non modificare manualmente i file dentro gli ZIP: rigenerali e ripeti i test. `PrimeBuild-USB.ps1` è condiviso fra diagnostica e input, senza una seconda implementazione.

Tool terzi: autori/licenze originali, nessun binario incluso. Supporto: https://discord.gg/ERUwSxE79q. Guide: https://primebuild.website/guides/.
