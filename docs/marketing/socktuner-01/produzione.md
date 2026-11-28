# SockTuner 01 — primo Reel/Short

Stato: copione e riprese proposte; voce registrata. Nessun video registrato, renderizzato, caricato o pubblicato.

Voce scelta il 6 novembre 2026: ultimo tentativo `socktuner-copione-take-c87225d9.wav`, durata 39,5 secondi.
Copia per montaggio: `socktuner-voce-master-c87225d9.wav`, WAV mono 48 kHz, volume uniformato (-16,2 LUFS integrati; true peak -1,5 dBFS). Originale conservato; nessun taglio o cambio di velocità.
I file audio sono nella cartella locale `Documents/PrimeBuild-Media/SockTuner/audio`, fuori dalla repo del sito.
Lorenzo ha approvato la registrazione e richiesto il taglio dei rumori iniziali e una musica di sottofondo con licenza libera.
Versione voce approvata ed editata: `socktuner-voce-edit-v1.wav`, rimossi 1,8 secondi iniziali lasciando margine prima della prima parola; durata 37,7 secondi. Originale e master precedente conservati.
Anteprima con musica: `socktuner-anteprima-musica-v1.mp3`; master del mix: `socktuner-mix-musica-v1.wav`. Mix verificato a -16,2 LUFS integrati e true peak -4,3 dBFS.
Revisione richiesta da Lorenzo: `socktuner-anteprima-musica-v2.mp3` e `socktuner-mix-musica-v2.wav`. Sottofondo +3 dB rispetto alla v1 durante il parlato; salita graduale di altri 6 dB da 35,25 a 36,05 secondi, dopo la fine della voce osservata intorno a 35,13 secondi. Sfumatura finale da 36,5 a 37,7 secondi. Durata invariata, 37,7 secondi; mix verificato a -16,2 LUFS e true peak -4,2 dBFS. Voce e v1 conservate.
Sottofondo selezionato: "Inspired" di Kevin MacLeod, ISRC USUAN1600022, CC BY 4.0. Estratto iniziale di 37,7 secondi, livello basso, sfumature e abbassamento automatico sotto la voce. Fonte e licenza sono archiviate nella cartella locale `music`; inserire il credito qui sotto nelle descrizioni di entrambe le piattaforme.
Trascrizione, verifica delle parole e sincronizzazione con le riprese restano da fare. Le riprese definitive devono mostrare la versione effettivamente verificata del nuovo percorso diagnostico, in lavorazione nella chat separata.

## Obiettivo

Presentare l'alpha e invitare a una prova consapevole. Nessuna promessa di riduzione di ping o aumento di FPS.
Destinazioni proposte: Instagram Reels e YouTube Shorts dei profili PrimeBuild.
Formato proposto: 1080 × 1920, circa 40–50 secondi, lingua italiana, voce reale di Lorenzo.
La durata effettiva segue la registrazione vocale.

## Riprese

| Voce | Immagine da acquisire |
| --- | --- |
| Connessione veloce, ping instabile | Titolo breve; grafico dell'app solo se ottenuto da una prova reale e pertinente |
| Presentazione di SockTuner | Finestra dell'app e nome PrimeBuild |
| Controllo della connessione | Avvio e risultato di una diagnosi in lettura; tagliare l'attesa nel montaggio |
| Suggerimenti | Un suggerimento realmente presente, con evidenza e limite leggibili |
| Confronto e ripristino | Interfaccia della funzione; usare dati reali se disponibili, senza inventare un miglioramento |
| Invito all'alpha | Stato alpha e schermata finale con nome progetto e destinazione del link |

Se mancano dati validi per una scena, usare una schermata descrittiva esplicitamente illustrativa oppure modificare la frase. Non simulare misurazioni.
Mostrare il contenuto con ritagli e ingrandimenti leggibili sul telefono; non comprimere tutta la finestra desktop nello schermo verticale.
Escludere indirizzi IP/MAC, nomi del PC, percorsi personali, altri account e notifiche.
La dimostrazione introduttiva può restare in lettura; non modificare la configurazione della rete per ottenere una ripresa.

## Voce

Leggere il file `copione.txt` con tono naturale, lasciando circa due secondi fra i paragrafi.
Non serve seguire un video: il montaggio viene dopo.
In caso di errore, fare una pausa e ripetere la frase intera; il taglio si fa in montaggio.
Registrare preferibilmente WAV mono a 48 kHz, senza musica o effetti applicati al file originale.
Prima della lettura completa fare una breve prova di volume e controllare che l'audio non saturi.
La prima registrazione del microfono deve partire solo quando Lorenzo è pronto.

## Testo del post — bozza

Connessione veloce, ma partite instabili? Sto sviluppando SockTuner per controllare la rete e valutare gli interventi sulla base delle misure.

È un'alpha open source: mi interessano soprattutto feedback su chiarezza, compatibilità e problemi reali.

Progetto e download: https://github.com/PrimeBuild-pc/SockTuner

Su Instagram usare il link del profilo per rendere raggiungibile la destinazione; verificare bio e link prima di pubblicare.
La futura pagina `primebuild.website/apps/socktuner` è proposta e non va usata finché non è online.

Titolo YouTube proposto: "Connessione veloce ma ping instabile? Ti presento SockTuner"

Credito musica da includere nella descrizione YouTube e nella caption Instagram:

Music: "Inspired" by Kevin MacLeod (incompetech.com). Source: https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1600022
CC BY 4.0: https://creativecommons.org/licenses/by/4.0/
Changes: excerpt, fade-in/out, reduced volume and ducking under narration.

## Prima della pubblicazione

Verificare la release mostrata, la destinazione del download, i sottotitoli e l'audio.
Confermare il montaggio con Lorenzo e verificare le capacità di caricamento/programmazione in Metricool.
Nessun miglioramento prestazionale viene dichiarato senza una prova ripetibile.

## Montaggio consegnato — 6 novembre 2026

Il Reel finale è in `C:\Users\Lorenzo\Documents\PrimeBuild-Media\SockTuner\reel\renders\SockTuner-IG-Reel-beta-1.mp4`: 1080×1920, 30 fps, 36,27 secondi. Riprese reali dell'app, sottotitoli e voce approvata. Rimossi 1,8 secondi iniziali e solo il riferimento ormai superato a «È ancora in alpha»; lo stato Beta è mostrato a schermo.

Musica alzata di altri 2 dB rispetto alla v2 (+5 dB nominali rispetto al primo sottofondo), con ducking sotto la voce e crescendo dopo la fine del parlato. Nessun clipping rilevato; audio misurato, non ascoltato dall'agente.

La caption aggiornata, con attribuzione CC BY obbligatoria, è in `reel\caption-instagram.txt`; sostituisce la bozza alpha precedente. La scaletta per un tutorial YouTube orizzontale è in `reel\youtube-riprese.md`. Le riprese possono essere effettuate dall'agente. Il Reel è riutilizzabile anche come Short.

La pagina /apps/socktuner resta soltanto proposta. Il link effettivo della beta va verificato su GitHub prima della pubblicazione social. Instagram e YouTube non sono stati pubblicati.

Aggiornamento finale: nuova frase Beta registrata e inserita nel Reel `SockTuner-IG-Reel.mp4`, durata 37,4 secondi. Sostituisce il precedente montaggio da 36,27 secondi. La release GitHub v0.9.0-beta.1 è pubblicata, con checksum verificato sullo ZIP scaricato e prova di avvio riuscita. Caption e crediti in caption-instagram.txt.

## Revisione video su feedback di Lorenzo

Il precedente montaggio è sostituito dal Reel `reel\renders\SockTuner-IG-Reel-live-v2.mp4`. Nuove riprese effettive della beta mentre viene usata: avvio diagnosi, stato in corso, scorrimento ai risultati, apertura suggerimenti e navigazione nella cronologia. Il video dell'app occupa 33,6 secondi su 37,4; solo la schermata finale è grafica. Viste complete alternate a zoom, cursore evidenziato in montaggio sui clic reali, sottotitoli sotto e margini sfumati. Voce e musica approvate sono mantenute senza modifiche. Le eventuali parti con indirizzi privati sono tagliate prima del montaggio. Nessuna modifica alla rete per girare il video e nessuna pubblicazione social.

## Chiusura GitHub approvabile

La versione `reel\renders\SockTuner-IG-Reel-github-v3.mp4` modifica soltanto gli ultimi 6,96 secondi: ripresa reale del browser dalla repository, scorrimento, pagina v0.9.0-beta.1 e zoom sul file SockTuner-0.9.0-beta.1-win-x64.zip. Voce, musica, sottotitoli e primi 30,44 secondi conservati. Nessun download avviato durante la ripresa e nessun post social pubblicato.

Versione finale con registrazione ShareX fornita da Lorenzo: `reel\renders\SockTuner-IG-Reel-lorenzo-v4.mp4`. Modificati solo 30,44–37,4 secondi. Browser a pieno formato verticale con ritaglio laterale, scorrimento reale, apertura Assets e cursore sullo ZIP. Passaggi accelerati 2x / 2,2x; nessun fermo immagine aggiunto. Primi 30,44 secondi, voce, musica e sottotitoli conservati. Esclusa la finestra ShareX che compare in fondo alla registrazione originale.
