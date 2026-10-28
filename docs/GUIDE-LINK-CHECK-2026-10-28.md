# Verifica link — 28 ottobre 2026

Sostituisce il riepilogo operativo del 24 ottobre; i report precedenti restano evidenze storiche.

## Correzioni

I quattro URL che rispondevano 404 sono stati sostituiti negli emendamenti editoriali, lasciando immutabili i 13 Markdown originali:

| Riferimento precedente | Destinazione verificata con GET (200) |
|---|---|
| `github.com/TestMem5/.github/releases` | <https://github.com/CoolCmd/TestMem5/releases> |
| `github.com/TestMem5-Config` | <https://github.com/integralfx/MemTestHelper/tree/oc-guide/TM5-Configs> |
| `usb.org/document-library/hid-1-11` | <https://www.usb.org/document-library/device-class-definition-hid-111> |
| `vesa.org/vesa-certified-products/` | <https://www.displayport.org/product-category/cables-adaptors/> |

Il README di CoolCmd identifica esplicitamente la propria versione come derivata dal TestMem5 originale di Serj. La didascalia della fonte distingue quindi versione mantenuta e configurazioni di comunità, richiede verifica di compatibilità/integrità e non suggerisce di disattivare l'antivirus. La raccolta integralfx contiene configurazioni anta777.

## Esito

- `npm run check:guide-links -- --external`: 277 URL esterni, 259 risposte 2xx/3xx, 18 da approfondire; nessun 404 rilevato.
- Secondo controllo GET con User-Agent browser sui 18 casi: altre nove risposte 200, comprese le fonti Intel, Microsoft Store, Microsoft Tech Community e il PDF Nexperia. Totale 268 URL raggiungibili via HTTP, nove ancora non verificabili dal controllo.
- Microsoft Tech Community verificata anche in Chromium: titolo dell'articolo atteso, pagina raggiungibile.
- Route interne, ancore, immagini e hash degli 11 allegati inclusi: superati.
- Nessun riferimento ai sette PDF storici nel rendering.

Il controllo di raggiungibilità non certifica ogni affermazione contenuta nelle pagine esterne. Un 403 di protezione anti-bot non dimostra che il documento sia assente.

## Limiti esterni rimasti

| URL | GET / verifica browser |
|---|---|
| <https://www.jedec.org/standards-documents/docs/jesd79-5d> | 403, pagina di verifica anti-bot |
| <https://www.hwinfo.com/> | 403, pagina di verifica anti-bot |
| <https://forums.blurbusters.com/viewtopic.php?t=12484> | 403, pagina di verifica anti-bot |
| <https://forums.blurbusters.com/viewtopic.php?t=9286> | 403, pagina di verifica anti-bot |
| <https://blurbusters.com/gsync/gsync101-input-lag-tests-and-settings/> | 403, pagina di verifica anti-bot |
| <https://support.discord.com/hc/en-us/articles/360045138471-Discord-Voice-and-Video-Troubleshooting-Guide> | 403, pagina di verifica anti-bot |
| <https://www.waveform.com/tools/bufferbloat> | 403, pagina di verifica anti-bot |
| <https://maps.agcom.it/> | `ECONNRESET`; Chromium conferma `ERR_CONNECTION_RESET` |
| <https://bandaultralarga.italia.it/indirizzo/> | catena TLS non verificabile da Node; Chromium riceve HTTP 503 |

Non sono stati aggirati CAPTCHA, disabilitati controlli TLS o sostituite fonti tecniche con pagine non equivalenti. Questi nove casi dipendono dai siti esterni e restano un limite esplicito, non una correzione dichiarata riuscita.

Evidenze locali (non versionate): `tmp/browser-qa/external-links.json`, `tmp/completion-2026-10-28/external-get-review.json`.
