# Verifica link guide — 23 ottobre 2026

49 collegamenti interni guida/frammento verificati, senza bersagli mancanti. 13 allegati presenti con SHA-256 corrispondente al file collegato dalla sorgente. Cinque PDF non inclusi per diritti delle immagini pendenti: `02-latencymon-e-driver`, `03-audio-competitivo`, `04-frame-cap-e-presentazione`, `05-displayport-hdmi`, `06-input-mouse-usb` nella directory storica `discord-revisione-v5/pdf`.

`npm run check:guide-links` termina con exit 1 per questi cinque allegati: requisito dei link interamente funzionanti **bloccato**. I link nei Markdown non sono stati modificati né sostituiti con destinazioni diverse.

Link esterni: 250 URL unici controllati con HEAD (GET limitato se 405); 233 risposte 2xx/3xx. 17 riscontri da verificare, inclusi quattro HTTP 404. I 403 non dimostrano che la pagina sia assente. Due URL GitHub 404 confermati anche dal browser web di ricerca.

| URL originale | Esito |
|---|---|
| <https://apps.microsoft.com/detail/9p8ltpgcbzxd> | 403 |
| <https://bandaultralarga.italia.it/indirizzo/> | TypeError |
| <https://blurbusters.com/gsync/gsync101-input-lag-tests-and-settings/> | 403 |
| <https://forums.blurbusters.com/viewtopic.php?t=12484> | 403 |
| <https://forums.blurbusters.com/viewtopic.php?t=9286> | 403 |
| <https://github.com/TestMem5-Config> | 404 |
| <https://github.com/TestMem5/.github/releases> | 404 |
| <https://support.discord.com/hc/en-us/articles/360045138471-Discord-Voice-and-Video-Troubleshooting-Guide> | 403 |
| <https://techcommunity.microsoft.com/blog/windows-itpro-blog/advancing-windows-driver-security-removing-trust-for-the-cross-signed-driver-pro/4504818> | 400 |
| <https://www.hwinfo.com/> | 403 |
| <https://www.intel.com/content/www/us/en/gaming/extreme-memory-profile-xmp.html> | 403 |
| <https://www.intel.com/content/www/us/en/gaming/resources/how-to-overclock.html> | 403 |
| <https://www.intel.com/content/www/us/en/support/articles/000057787/memory-and-storage/intel-optane-memory.html> | 403 |
| <https://www.jedec.org/standards-documents/docs/jesd79-5d> | 403 |
| <https://www.usb.org/document-library/hid-1-11> | 404 |
| <https://www.vesa.org/vesa-certified-products/> | 404 |
| <https://www.waveform.com/tools/bufferbloat> | 403 |

I link esterni fanno parte del testo definitivo: per correggerli serve una nuova sorgente approvata o una deroga esplicita alla fedeltà dei collegamenti. Non sono stati reinterpretati autonomamente.
