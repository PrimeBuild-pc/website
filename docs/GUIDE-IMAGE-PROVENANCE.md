# Provenienza immagini delle guide — revisione 24 ottobre 2026

83 figure nel corpo delle guide e 13 copertine. 30 immagini raster distinte: sette screenshot open source già verificati, cinque screenshot ufficiali OCCT e 18 immagini riutilizzate dai materiali forniti. Originali Markdown immutabili; modifiche editoriali richieste applicate separatamente.

## Copertine e schemi

13 nuove copertine SVG: nero, griglia, diagonali, tipografia bianca/arancione e pittogrammi originali, nello stile delle cinque copertine precedenti. Gli originali precedenti non sono stati sovrascritti. `scripts/generate-guide-diagrams.mjs` rigenera 30 tavole ridisegnate, 13 copertine e tre mappe OCCT.

Le tre mappe OCCT della prima revisione non sono più usate nelle guide: sono state sostituite con schermate ufficiali. Gli altri SVG originali Prime Build restano disponibili; l'inventario sotto elenca solo gli asset effettivamente renderizzati.

## Screenshot: base di riuso verificata

- Intel PresentMon 2.6.0: catture locali originali, senza annotazioni aggiunte, da `bozza-v3/assets/ui-presentmon-main.png` e `ui-presentmon-metriche.png`. UI del progetto MIT: https://github.com/GameTechDev/PresentMon/blob/main/LICENSE.txt. Avviso completo distribuito in `/images/guides/screenshots/PresentMon-LICENSE.txt`. Nessuna acquisizione o overlay di un gioco in esecuzione; nessun benchmark locale dichiarato.
- CapFrameX: screenshot della documentazione del repository ufficiale MIT, `images/1.9.0/capture.png` e `analysis.png`; versione visibile 1.9.0.7, non presentata come ultima release. Fonte https://github.com/CXWorld/CapFrameX; licenza https://github.com/CXWorld/CapFrameX/blob/master/LICENSE, copia distribuita in `/images/guides/screenshots/CapFrameX-LICENSE.txt`. Immagini complete, byte identici; dati illustrativi del progetto, non test Prime Build.
- Peace 1.6.9.11 / Peter Verbeek: due catture locali originali, `ui-peace-main.png` e `ui-peace-graph-preamp.png`, senza ritagli o annotazioni nuove. Progetto GPLv2 verificato su https://sourceforge.net/projects/peace-equalizer-apo-extension/. Catture distribuite sotto GPL-2.0 con sorgente di modifica PNG disponibile allo stesso URL; sorgente applicazione: https://sourceforge.net/projects/peace-equalizer-apo-extension/files/. Il profilo visibile è una configurazione esistente, non un preset consigliato; EQ non attivato per la guida.
- Equalizer APO 1.4.2 / Jonas Thedering: cattura locale originale `ui-apo-editor.png`; progetto GPLv2 verificato su https://sourceforge.net/projects/equalizerapo/. Cattura distribuita sotto GPL-2.0 con PNG originale disponibile; sorgente applicazione: https://sourceforge.net/p/equalizerapo/code/HEAD/tree/. L'editor e il grafico non dimostrano che APO sia applicato all'endpoint.
- Testo GPL-2.0 incluso in `/images/guides/screenshots/GPL-2.0-only.txt`. Le licenze delle immagini non cambiano quella del testo editoriale o del sito. La precedente annotazione di blocco nel registro è superata SOLO per queste catture la cui base di riuso è stata ora identificata, non per l'intera directory.

## Integrazione autorizzata il 24 ottobre

Il proprietario dei materiali ha richiesto esplicitamente il riuso delle immagini dei PDF indicando la fonte originale e ha indicato https://www.ocbase.com/personal-features per OCCT. La richiesta è registrata come base operativa di riuso, non come licenza aperta né attestazione indipendente dei diritti di terzi.

- OCBASE / OCCT: cinque PNG ufficiali CPU, CPU+RAM, Memory, 3D Adaptive e VRAM, versione visibile 17.0.14 Supporter. File originali, senza ricostruzioni di interfaccia.
- Resplendence / LatencyMon: cattura fornita, pagina originale del programma; condizioni della cattura non note, nessun benchmark dedotto.
- NVIDIA: pipeline/latency e Frame Warp dai materiali, attribuiti agli articoli originali NVIDIA.
- CS2 Kitchen: grafici audio, Reflex, scaling, limiter e presentazione dai materiali dei PDF, attribuiti ai video originali indicati dal registro. Mantenuti hardware, campioni e limiti della singola prova nelle guide; non sono nuovi risultati Prime Build.
- Dettagli, URL, hash e dichiarazione di autorizzazione per ciascuno dei 23 nuovi file in `GUIDE-IMAGE-IMPORTS-2026-10-24.json`.
- Escluse immagini con fonte originaria non identificabile, tra cui il grafico blu e illustrazioni generiche cuffie/DAC. Non inserite per raggiungere il conteggio.
- Nessun richiamo ai sette PDF storici resta nel rendering.

## Backup precedente

Snapshot locale completo del commit `936d2f76ae2c2d7464222f455c4484e24f46664a`: `backups/guide-pre-aggiornamento-2026-10-24/website-main-936d2f7.zip` (26.003.915 byte). SHA-256 `5446a7756345e3fbeb86f968754a4b9d847fb0db3f1f75ba597feb419d345130`. Archivio ZIP verificato integralmente con CRC; non distribuito dal sito, escluso da Git. Comprende tutte le guide precedenti, immagini, copertine e allegati tracciati. Il backup non è una nuova sorgente editoriale.

## Inventario delle figure effettivamente usate

| Asset | Provenienza | SHA-256 |
|---|---|---|
| `/images/guides/diagrams/audio-percorsi.svg` | Prime Build, schema originale | `9f99a44750c6526b4df2ba4ebe71ec77a5a7139f6138a5c70b4d6d1681ee7666` |
| `/images/guides/diagrams/bandwidth.svg` | Prime Build, schema originale | `d7054932134fa3ae0b873ba379ff755e2ba916170a5dc2fefab0b7ae18ccb82d` |
| `/images/guides/diagrams/boundaries.svg` | Prime Build, schema originale | `755abec093bd3183ce68c1252704844fdfc823c25151687a0c5c17b936b0dab2` |
| `/images/guides/diagrams/buffers.svg` | Prime Build, schema originale | `ffe466313ce27edef61253fdc474f51dded5f3158e32cd982aeb913be877f9c3` |
| `/images/guides/diagrams/display.svg` | Prime Build, schema originale | `acb6346d407fa07b73b8adcfb1dd1f405992edccd4a7b9b80aae681fda4c05fe` |
| `/images/guides/diagrams/distribution.svg` | Prime Build, schema originale | `2ce915707f81105d1b99b7d4024100a3b8c97fa24846c5b004784b9ed681c153` |
| `/images/guides/diagrams/driver.svg` | Prime Build, schema originale | `a58ca8ce6cc5e9aa3982803a7c02e87ff9563821191aefbf2c48b1165ae5ab5b` |
| `/images/guides/diagrams/endpoint.svg` | Prime Build, schema originale | `6664e3bd532bbe88fed4c191f5b07aafdd10ebde4d320e0848afc00abe4deb1f` |
| `/images/guides/diagrams/ethernet-canale.svg` | Prime Build, schema originale | `05843325af175dcd584a54d9849ff12ebbe5f07e80dfb42d362c9738319224b6` |
| `/images/guides/diagrams/ethernet-t568.svg` | Prime Build, schema originale | `5353d07d4230b63445e74372bb53943b9552b49164a5aee9249e62205661483c` |
| `/images/guides/diagrams/fg.svg` | Prime Build, schema originale | `e3272eed22610f56a4ee0df01fdac43760c80d3c3570e86ca14788ddd2366d1a` |
| `/images/guides/diagrams/fit.svg` | Prime Build, schema originale | `c01f71067d41512a1dcb7317428bf16c289628d72765123a555adba4d124b309` |
| `/images/guides/diagrams/frequenza-clock.svg` | Prime Build, schema originale | `becc2e8974f00fec69a9dce965b941b6ab37b36a57ee0642088fd44597721b50` |
| `/images/guides/diagrams/hidfilter.svg` | Prime Build, schema originale | `d597fdd9328d124d23fac8f6b8a27e40e9a7784da160e89173dce50524167f3e` |
| `/images/guides/diagrams/input.svg` | Prime Build, schema originale | `c60556846ff5c8b9e9148ac8382d6c70e4948f28926b165eef6cc10c7a0b9a22` |
| `/images/guides/diagrams/isr.svg` | Prime Build, schema originale | `1afc8af2f4fe2b12d38bd5a08e18876feb6fcb97e907870dee08b425d16e4c0c` |
| `/images/guides/diagrams/kernel-scheduler.svg` | Prime Build, schema originale | `8754d1faba5858d3892ceb566ca2c34772b1fbffc6c4f6d2452e4251c3b5edae` |
| `/images/guides/diagrams/latencymon.svg` | Prime Build, schema originale | `9a31458def0d551049bb0bb6f16c286c9e85d1515d711db87d242bffde33bd5d` |
| `/images/guides/diagrams/memory-clocks.svg` | Prime Build, schema originale | `a1d19931f795bd68aa81088d6c03c7e1ae07c11fd9251a4a4aa4e52b60eb061d` |
| `/images/guides/diagrams/memory.svg` | Prime Build, schema originale | `a1b6fc14b1a2790226f4b55bcd73685ed5cffbfc27c4ffec1e4301ad9508b773` |
| `/images/guides/diagrams/mmcss.svg` | Prime Build, schema originale | `fc58e2956551a9b6384553959e0540166591210c75ef356b3b1ec241940bfce3` |
| `/images/guides/diagrams/pipeline-limiter.svg` | Prime Build, schema originale | `45ea2a9d5bb768bbbfc5df5502ae2e6eb12b51c33d4a955a0b1ff7189583d9c9` |
| `/images/guides/diagrams/pipeline-rendering.svg` | Prime Build, schema originale | `19bb34ad33dc6db1c38e65d2f0163c76bc87aa55df443a0b9c98afd74b434c2a` |
| `/images/guides/diagrams/polling.svg` | Prime Build, schema originale | `2240cabf90f656395582c79fe8799c8701c8a3375c590387f2c437c22afa6e59` |
| `/images/guides/diagrams/power.svg` | Prime Build, schema originale | `8db2933f84c034cd0090e398295a51d1e6a6c5f96327109edd6cb75c0a19127e` |
| `/images/guides/diagrams/presentazione-percorsi.svg` | Prime Build, schema originale | `39294ac7c603a8a26b6996cdd41002c151b4a78ccda363fb06fd002674fc258f` |
| `/images/guides/diagrams/quality.svg` | Prime Build, schema originale | `9add051f86b5ce0e7b4591b3d85acb4358cfcb2dc0adfa500f3555764a4c1a54` |
| `/images/guides/diagrams/recovery.svg` | Prime Build, schema originale | `771397b12e3ea66171b656e0a8a32e5c2b21f20c67af759850f5353267899e04` |
| `/images/guides/diagrams/rete-aba.svg` | Prime Build, schema originale | `492317db73cdc41ca20b28f321207dc15c1bc4f7fed5dc61687eafb354401399` |
| `/images/guides/diagrams/rete-diagnosi.svg` | Prime Build, schema originale | `ccfba3935dd19ca10b68185f8119954c74cc096782e5020c0a0f27ce10027e25` |
| `/images/guides/diagrams/rete-hop.svg` | Prime Build, schema originale | `e2d01c78756cd659c09d47b313b3ca767fda7f16f6c2430f33981caa9ee0a1c7` |
| `/images/guides/diagrams/rete-metriche.svg` | Prime Build, schema originale | `dadb41046fd7aa78af37ea46f40590b1d83ee1dd9755d5b37e663ea2407de6f1` |
| `/images/guides/diagrams/rete-percorsi.svg` | Prime Build, schema originale | `a1e751b00b4bf6f68fd4c713525cc3848a73ab7f0a2eeccebb59cdf0f7ec095c` |
| `/images/guides/diagrams/rete-sqm.svg` | Prime Build, schema originale | `861ac87a1297df18fa8e8b14ef697c6ac4e301f239635972d93860d5b0417e87` |
| `/images/guides/diagrams/scanout.svg` | Prime Build, schema originale | `d729746bad4d5b74947a91d222cfbba12189fb6f8a242f12da983e468ba9dabe` |
| `/images/guides/diagrams/timers.svg` | Prime Build, schema originale | `346c374c4433743af61a3507da27131d02ea120a04f7cfedd4359091d92269b2` |
| `/images/guides/diagrams/upscale.svg` | Prime Build, schema originale | `4945da587e685ab7a1020d834dbb84371f4d2e07306b4855559246f88fb2d160` |
| `/images/guides/diagrams/usb-percorsi.svg` | Prime Build, schema originale | `1edc5acdfb5c9a052cdd1fa5ebbc00652e310fac9f5d68654187a9880246c34d` |
| `/images/guides/diagrams/validation.svg` | Prime Build, schema originale | `760c191a1251b8670bd266ba81419b11dacaf1de08b36bd0338d79543f5acf2e` |
| `/images/guides/diagrams/vrr.svg` | Prime Build, schema originale | `0ad678a4ae9231cbd9df26768229b30fe9122048e2cabb78bdfaacb57a01de88` |
| `/images/guides/diagrams/wifi-mesh.svg` | Prime Build, schema originale | `ea40d10979873b6d2f8c4a050ec7489859deae7abab88ae69711e5253c734f55` |
| `/images/guides/screenshots/capframex-190-analysis.png` | DevTechProfile / CapFrameX · MIT | `f80c4110ca60f6942ba0749520112d74c5d020db91b99026b9c3478550e20efb` |
| `/images/guides/screenshots/capframex-190-capture.png` | DevTechProfile / CapFrameX · MIT | `c314d4cb7e426927859db82c977578ee814b6268d337f43c56e1c63d0380d05e` |
| `/images/guides/screenshots/fullscreen-borderless.png` | CS2 Kitchen | `6bd6414295785cb154e5b48791fdb74f8def5f694317cfa69f957f5aef7ec980` |
| `/images/guides/screenshots/limiter-200.png` | CS2 Kitchen | `258859ca36487285e3b96852588669c40ecbd9a37006178108a9fe8b8c44ed37` |
| `/images/guides/screenshots/materiale-215519.png` | CS2 Kitchen | `81abccd70262b7ac2a6a67876779b05f9926a5370577cf51266733dcfc31ce42` |
| `/images/guides/screenshots/materiale-215609.png` | CS2 Kitchen | `502a99c90a148ddba628f4b25e60eddefe495b9b37b46806c88a5122fedb09bd` |
| `/images/guides/screenshots/materiale-215622.png` | CS2 Kitchen | `5b46d5aa4b73f63f0a29fde80a885efa539cd64d27c0828a78b131716a168a9a` |
| `/images/guides/screenshots/materiale-215729.png` | CS2 Kitchen | `14f30ffa285002efd8559d7eed6aae28c71ba928004dafd576dbe1df746ad04f` |
| `/images/guides/screenshots/materiale-215745.png` | CS2 Kitchen | `3cbb0eb5c93bce50f8a5d8611424c515ce1b7c344d1729543805b385eaf8eb5e` |
| `/images/guides/screenshots/materiale-215758.png` | CS2 Kitchen | `c3704454fad61c0a2be3661497daf19d41342c36135b8f22926ddb2cb11a0d9e` |
| `/images/guides/screenshots/materiale-215822.png` | CS2 Kitchen | `b1b27cfc6786e80f7d488813e5b47772ca72043bd0ab78ecde302cbf01c107d0` |
| `/images/guides/screenshots/materiale-215832.png` | CS2 Kitchen | `8707948f52d949f98419176d545d81f972298c18d5236ae173ea2d35880f6383` |
| `/images/guides/screenshots/materiale-222152.png` | CS2 Kitchen | `dd6def7c7f00e8cd4174153063a77e2047133e3a21cfc6efa6ca229af23de254` |
| `/images/guides/screenshots/materiale-222322.png` | CS2 Kitchen | `f7d99ef806beabcbfb00d3029550e0eb85bf851f9c7875c35bef85ec8050e4d3` |
| `/images/guides/screenshots/nvidia-cpu-bound-latency-pipline.png` | NVIDIA | `5137ad6d7a93fd37c98fb2de80f6a854a778e411ecf6b5c60160128b57618a32` |
| `/images/guides/screenshots/nvidia-frame-warp.jpg` | NVIDIA | `ea07d731369809f8866985441dc6149c59963b6d326128814334f6171d3c4e68` |
| `/images/guides/screenshots/nvidia-gpu-bound-latency-pipline.png` | NVIDIA | `12f8dd6f5cb3792d3d3d588a1f10a16d6dd3d2d7a430c11f76c80849dc06c32d` |
| `/images/guides/screenshots/nvidia-latency-pipeline-with-overlap.png` | NVIDIA | `b37ed6480a03284c6468b39a040aca52928ebeec2ab7b30443161c0a9c367b10` |
| `/images/guides/screenshots/nvidia-system-latency.png` | NVIDIA | `f094db984f0b76f77e9b8cc5fb458f5cfd38d2ba8964eb001a3452b361a734e3` |
| `/images/guides/screenshots/occt-3d-adaptive.png` | OCBASE / OCCT | `77dde0b3950b3a2b633888b22462814c463c22562693fabf88bdf15855b9d2e3` |
| `/images/guides/screenshots/occt-cpu-ram.png` | OCBASE / OCCT | `8a3d8f8b874ecaf78fa5c72c8ae37999c6eaf6ec072c832bb898520bbdc1e389` |
| `/images/guides/screenshots/occt-cpu.png` | OCBASE / OCCT | `18772b272d6aba26ad8499436b8e04fe6a5ea460929ff5f4cc347a9eaafba852` |
| `/images/guides/screenshots/occt-memory.png` | OCBASE / OCCT | `13e4054e6085d48758c7108e2ca80784abe7fe6096eef2c997356a38b647cedd` |
| `/images/guides/screenshots/occt-vram.png` | OCBASE / OCCT | `e8ef99df6226f0a73d816fdcca67d262985469523689697f2d81be427689af8c` |
| `/images/guides/screenshots/ui-apo-editor.png` | Jonas Thedering / Equalizer APO · GPL-2.0 | `7089a95774b13ba5c0bf03a935f03922da51070e2840c4c2e673ef10e9e17d73` |
| `/images/guides/screenshots/ui-latencymon-main.png` | Resplendence | `0370327de131accb98894c195b2d06d807fab95004a0801b1b9c7ab8d38ffc16` |
| `/images/guides/screenshots/ui-peace-graph-preamp.png` | Peter Verbeek / Peace · GPL-2.0 | `a8d935288539834556f248e7f7bf15a348ed47846be3ffd57d7254b3cda56fcd` |
| `/images/guides/screenshots/ui-peace-main.png` | Peter Verbeek / Peace · GPL-2.0 | `0e3059058ad018fc526d66075d193c43f7d2d3c6d5cd23aa25e0978b1027a7d2` |
| `/images/guides/screenshots/ui-presentmon-main.png` | Intel · MIT | `5ddb0bd835caee784976d9edd40ccb4ec88d82a3101fd137eb3e939d756a5d9c` |
| `/images/guides/screenshots/ui-presentmon-metriche.png` | Intel · MIT | `a93c1ea710ad73b24d0f7965bfc316d12f116176737a052f21fce0c79f37ce1e` |
