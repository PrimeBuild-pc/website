### Cosa aggiungono MemTestHelper e la community (e dove approfondire)

Il repository [integralfx/MemTestHelper](https://github.com/integralfx/MemTestHelper) è una buona lettura di approfondimento, ma va chiarito che cosa contiene. Il programma che dà il nome al repo era un'utilità C# che lanciava più istanze di **HCI MemTest** e ne gestiva le finestre: il suo autore lo ha dichiarato **EOL** perché non funziona con le versioni recenti di HCI, quindi qui non è proposto come strumento da usare. Il valore pratico del repo è la **guida all'overclock DDR4** che ospita nel ramo `oc-guide`, insieme alle config di TestMem5 raccolte dalla community.

- **HCI MemTest e i limiti di memoria per istanza.** HCI è un test storico a istanze multiple: ogni istanza lavora su una quota limitata di RAM (circa 2 GB affidabili), per cui per coprire tutta la memoria libera si avviano più istanze, una per thread. Per questo esistono i launcher descritti sotto. HCI, Karhu e TestMem5 non sono open source: i launcher si limitano ad avviarli.
- **Coverage per strumento.** La guida DDR4 indica soglie diverse per ogni tool (nell'ordine di almeno il 20% di coverage per thread con HCI, valori molto più alti con Karhu, tre cicli con la config Extreme di TM5, circa 30 minuti ciascuno per OCCT Memory con SSE e AVX). Sono punti di partenza dell'autore su DDR4, non soglie di certificazione: i criteri di questa guida restano quelli delle sezioni 5.4 e 7.2.
- **Lascia margine a Windows.** Come per OCCT (sezione 8.2), non assegnare al test tutta la memoria libera: il sistema ha bisogno di circa 2 GB, e il paging durante la prova falsa il risultato.
- **Più strumenti, non uno solo.** La guida riporta casi in cui TM5 passa e Karhu trova errori in pochi minuti, ed è scettica su test più leggeri come l'AIDA64 memory test. È la stessa logica della tabella 5.4.
- **Scalda il sistema.** Il calore di CPU e GPU sale fino alle RAM: il consiglio è provare anche con un carico GPU in parallelo, e dopo ogni cambio di FCLK su AMD con un carico misto (Prime95 Large FFT più OCCT VRAM). Coerente con il «test a caldo» della stessa tabella.
- **Un passo alla volta, con le tensioni sotto controllo.** Non lasciare in Auto le tensioni di controller/IO (VCCSA, VCCIO, SOC), sali a gradini piccoli (25–50 mV nella guida) perché alcuni IC scalano male con la tensione, e se il sistema va in errore scendi di frequenza di un gradino prima di toccare i timing.
- **Timing rischiosi.** Un tRFC troppo stretto può bloccare il sistema, un tREFI troppo alto può corrompere file: dopo un errore conviene eseguire `sfc /scannow` e controllare l'integrità dei dati, non solo ripetere il test.

#### Altri progetti open source utili

Sono tutti strumenti di terzi, **non verificati su un PC di prova per questa guida**: valgono come indice di ricerca. Controlla licenza, data dell'ultima modifica e provenienza prima di eseguirli, e ricorda che l'aggiornamento recente non equivale a un test di affidabilità.

| Progetto | A cosa serve | Note |
|---|---|---|
| [EasyHCI](https://github.com/Manbocoon/EasyHCI) | Launcher di HCI MemTest con log, avvisi e spegnimento a fine test | Licenza MIT, interfaccia in coreano, fermo da marzo 2023. È l'alternativa più vicina a MemTestHelper |
| [HCI-Launcher](https://github.com/Duckleeng/HCI-Launcher) | Script PowerShell che avvia più istanze di HCI e assegna a ciascuna i suoi core | La quantità di memoria resta da impostare a mano |
| [KGuiX](https://github.com/jjgraphix/KGuiX) | Stessa idea per **Karhu RAM Test** | Karhu è a pagamento; il progetto automatizza soltanto l'avvio |
| [MOCT](https://github.com/memoryoctool/MOCT) | Dopo ogni riavvio controlla che le impostazioni RAM siano ancora attive, lancia TestMem5 e legge gli errori di Windows | Utile per sessioni lunghe di tuning; gli avvisi passano da Telegram |
| [TMR (Test-Memory-R)](https://github.com/jlpetz/Test-Memory-R) | Rifacimento open source di TestMem5 in Rust che legge le sue config | Molto giovane e sperimentale: non sostituisce TM5 |
| [Memtest86+](https://github.com/memtest86plus/memtest86plus) | Test che parte al boot, fuori da Windows | Progetto distinto da MemTest86 di PassMark (sezione 9.1) |
| [stressapptest](https://github.com/stressapptest/stressapptest) | Stress test di memoria per Linux | Solo se usi (o avvii da USB) un ambiente Linux |
| [ZenTimings](https://github.com/irusanov/ZenTimings) | Legge i timing effettivi sui Ryzen, senza modificarli | Per verificare che EXPO e le modifiche al BIOS siano quelle attese |
| [ZeyhDramTweaker](https://github.com/zeyhcrazy/ZeyhDramTweaker) | Calcolatore di timing per Ryzen DDR4/DDR5, ispirato al DRAM Calculator | Molto recente: tratta i valori proposti come ipotesi da testare |
| [AutoMemOC](https://github.com/FarisR99/AutoMemOC) | Provava a stringere i timing in automatico su Intel | Abbandonato dall'autore: citato solo per completezza |

Un lettore di timing come ZenTimings è utile anche per la sezione 5.5: dopo un errore o un aggiornamento del BIOS confronta i valori effettivi con quelli che pensavi di avere impostato.
