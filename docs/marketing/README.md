# PrimeBuild — comunicazione delle app

Brief operativo del 6 novembre 2026. Bozze locali: nessun contenuto pubblicato o programmato.

## Scelte confermate da Lorenzo

- Un solo marchio, PrimeBuild, per le app presenti e future.
- YouTube: https://www.youtube.com/@PrimeBuild-pc
- Instagram: https://www.instagram.com/prime_build_/
- Sito: https://primebuild.website/ — nessun dominio separato per le app.
- Repository del sito: https://github.com/PrimeBuild-pc/website
- Voce reale di Lorenzo, leggendo un copione preparato prima delle riprese.
- Preparazione delle demo, riprese e montaggio a cura dell'assistente, dove tecnicamente possibile.
- NeuroTune entra nel lancio pubblico quando sarà pronta.
- Per SockTuner Lorenzo ha confermato una diagnosi automatica completa senza questionario sul problema: spiegazione dei risultati, azioni selezionabili fondate sulle evidenze e confronto prima/dopo. Le scritture sulle proprietà NIC sono limitate all'hardware già testato/caratterizzato. È stato avviato un lavoro di implementazione separato; il video deve mostrare solo le funzioni effettivamente disponibili nella release ripresa.

## Stato verificato

Nel browser Metricool risultano collegati Instagram professionale `prime_build_` e YouTube `Prime Build`.
Il connettore Metricool non risulta ancora installato nel catalogo di questa chat: la sessione browser è utilizzabile.
Non è stata provata una pubblicazione: pianificazione, caricamento media e limiti del piano vanno verificati con il primo contenuto finito.

Il sito ha già una sezione app con ThreadPilot, LightCrosshair, TweakHub e ZapTweaks.
Il codice dispone già dell'evento GA4 `download_click`, subordinato al consenso analytics.
Un clic di download non dimostra che l'app sia stata installata o usata.
Le route `/apps` e `/apps/<slug>` proposte sotto non esistono ancora.

FFmpeg e FFprobe sono presenti sul PC; FFmpeg dispone del dispositivo di cattura Windows `gdigrab`.
Questo verifica la disponibilità dello strumento, non una ripresa riuscita: prima della produzione va eseguita una cattura di prova della sola finestra dell'app.

## Catalogo editoriale

| App | Argomento di partenza | Condizione per il contenuto |
| --- | --- | --- |
| SockTuner | Diagnosi della connessione e verifica prima/dopo | Primo pilota: presentazione dell'alpha, senza promesse di miglioramento |
| ThreadPilot | Gestione dei processi e delle risorse CPU | Scegliere una funzione e verificarla sulla release da mostrare |
| TweakHub | Strumenti e procedure portatili per tecnici | Demo di un singolo flusso verificato |
| ZapTweaks | Diagnostica e modifiche mirate del PC | Precisare differenze rispetto a TweakHub e SockTuner prima del lancio |
| NeuroTune | Da definire sulla versione pronta | Nessuna data o funzione futura presentata come già disponibile |
| Discord theme launcher | Installazione e gestione del tema | Verificare flusso, versione, compatibilità e nome pubblico del launcher |
| LightCrosshair e altre app | Un problema concreto per video | Aggiungere una scheda prima della prima campagna |

La presenza sul sito o in Projects non certifica la maturità di una release.

## Procedura riutilizzabile

1. Scegliere una funzione disponibile, la release da mostrare e un pubblico.
2. Preparare una dimostrazione ripetibile con dati non personali.
3. Scrivere copione, elenco inquadrature e testo del post.
4. Registrare la sola finestra dell'app e verificare il filmato. Operazioni che richiedono hardware, privilegi o risultati reali vanno predisposte prima della ripresa.
5. Far leggere a Lorenzo brevi blocchi del copione; avviare il microfono solo nel momento concordato.
6. Montare sulle durate reali della voce, aggiungere sottotitoli e produrre il formato verticale; preparare un tutorial orizzontale quando serve.
7. Controllare leggibilità sul telefono, dati visibili, audio, link e correttezza delle affermazioni.
8. Presentare il video e il post completi per la decisione di pubblicazione; nessuna pubblicazione implicita in questo brief.
9. Dopo la pubblicazione autorizzata, confrontare visualizzazioni, permanenza, visite al sito, clic sui download e feedback.

## Sito: proposta da implementare

Usare `/apps` come catalogo e `/apps/socktuner`, `/apps/threadpilot` ecc. come schede condivisibili.
Ogni scheda: problema risolto, breve demo, stato della release, requisiti, download, guida e supporto.
Per le app non pronte mostrare lo stato effettivo, senza un pulsante di download ingannevole.
Usare parametri UTM nei link dei contenuti, distinguendo app e singolo video.
Il link di ogni video deve puntare a una pagina già pubblicata e verificata.

## Strumenti e accessi

- Metricool: account social già collegati; browser utilizzabile. Verificare il connettore prima di affidargli pubblicazioni automatiche.
- YouTube Studio e Instagram: mantenere disponibili le sessioni per eventuali verifiche dei rispettivi account.
- Voce: Audacity locale è una possibilità gratuita senza account. Un file WAV registrato da Lorenzo è sufficiente; non serve sincronizzarsi con la demo.
- Riprese: FFmpeg presente; OBS Studio è un'alternativa solo se il test di cattura richiede un altro metodo.
- Montaggio: strumenti locali/HyperFrames. Nessun nuovo account a pagamento richiesto per il pilota.

## Primo esperimento proposto

Lingua italiana e diffusione organica sono proposte iniziali, non nuove preferenze confermate.
Produrre prima un Reel/Short di SockTuner; usare la prova per stabilire qualità audio e stile comuni alle app.
Successivamente preparare un tutorial e un calendario sostenibile, evitando di annunciare tutte le app insieme.

Materiali del pilota: `socktuner-01/copione.txt` e `socktuner-01/produzione.md`.
