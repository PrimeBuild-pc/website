# Flusso email professionale Prime Build

## Architettura scelta

```text
Modulo sito + Turnstile
        |
        v
Cloudflare Pages Function /contact
        |-- Resend --> [PRIMO CONTATTO] alla casella interna
        `-- Resend --> conferma al cliente + link Google Form
                                      |
                                      v
                         Google Form di qualificazione
                                      |
                                      v
                         notifica/risposta qualificata
```

- **Indirizzo pubblico e Reply-To:** `preventivi@primebuild.website`.
- **Destinazione reale:** la casella Gmail esistente, nascosta dietro Cloudflare Email Routing.
- **Mittente automatico:** `Prime Build Preventivi <preventivi@primebuild.website>`.
- Non usare `no-reply@`: impedisce una risposta naturale e comunica distanza proprio quando il cliente deve fidarsi.
- `info@` è generico e riceve più spam; `supporto@` va riservato in futuro ai clienti con un servizio già attivo.

Il primo messaggio resta disponibile, ma arriva con oggetto `[PRIMO CONTATTO]`: in Gmail può essere archiviato automaticamente sotto l'etichetta `Da qualificare`. La posta prioritaria sarà quindi la notifica di una risposta completa al Google Form.

## Perché il Google Form va nella prima risposta automatica

Il link inviato per email aggiunge un piccolo impegno e verifica che l'indirizzo sia raggiungibile. Chi compila il secondo passaggio ha già letto differenze e prezzo dei due preventivi. Non mostrare subito il link sul sito: annullerebbe questo filtro.

Il form dovrebbe richiedere almeno:

1. email usata nel primo contatto;
2. servizio scelto: Base gratuito oppure Completo €25;
3. budget massimo e indicazione se include monitor/periferiche;
4. giochi, software e utilizzo principale;
5. risoluzione e refresh rate desiderati;
6. componenti già posseduti;
7. preferenze o vincoli (dimensioni, rumore, Wi-Fi, estetica);
8. tempistiche;
9. acquisto/assemblaggio autonomo oppure servizio Prime Build;
10. conferma di aver compreso cosa include il livello scelto.

Evita upload di file e domande non necessarie. Non richiedere l'accesso Google: l'apertura del link dalla casella email è già un filtro sufficiente e il login farebbe perdere lead validi.

## Setup manuale Cloudflare Email Routing

Email Routing risulta già attivo sul dominio: sono presenti gli MX Cloudflare e l'SPF `include:_spf.mx.cloudflare.net`. Non eliminarli.

1. Apri **Cloudflare → Email → Email Routing → Destination addresses**.
2. Verifica la casella Gmail di destinazione, se non è già verificata.
3. In **Routing rules → Custom addresses**, crea:
   - `preventivi@primebuild.website` → Gmail esistente;
   - facoltativo: `dmarc@primebuild.website` → Gmail esistente, per ricevere i report DMARC.
4. Invia un messaggio esterno a `preventivi@primebuild.website` e verifica ricezione e risposta.
5. Non attivare un catch-all: aumenta lo spam senza migliorare il servizio.

### Regola legacy `no-reply@`

`no-reply@primebuild.website` (con trattino) non compare nel codice né negli altri repository Prime Build. La versione precedente del sito usava soltanto `noreply@primebuild.website` (senza trattino) come mittente in uscita, e questa PR la sostituisce con `preventivi@primebuild.website`. Una regola Email Routing non è necessaria per spedire: serve solo a ricevere risposte. Si può quindi disattivare la regola `no-reply@`, attendere 7–14 giorni e poi eliminarla se non emergono messaggi inattesi.

Non eliminare invece i record DNS MX/TXT di `noreply.primebuild.website`: sono il Return-Path tecnico verificato di Resend e non rappresentano una casella o una regola di inoltro.

## Setup manuale Resend e DNS

Sono già presenti il DKIM `resend._domainkey.primebuild.website` e il Return-Path tecnico `noreply.primebuild.website` con SPF/MX Amazon SES. Devono restare invariati e il dominio deve risultare **Verified** nella dashboard Resend. La creazione dell'indirizzo inoltrato `dmarc@primebuild.website` non crea il record DNS DMARC: sono due configurazioni distinte.

1. Apri **Resend → Domains** e aggiungi o seleziona `primebuild.website`.
2. Copia in **Cloudflare → DNS** esattamente i record DKIM, SPF e MX mostrati da Resend.
3. Non sostituire gli MX Cloudflare all'apice e non creare un secondo SPF all'apice. In questa configurazione Resend usa `noreply.primebuild.website` come Return-Path, separato dall'indirizzo `no-reply@primebuild.website` e dall'SPF di Email Routing.
4. Lascia i record email in modalità **DNS only** quando applicabile.
5. Premi **Verify DNS Records** in Resend e attendi lo stato `Verified`.
6. Aggiungi il record iniziale:

   ```text
   Type: TXT
   Name: _dmarc
   Value: v=DMARC1; p=none; rua=mailto:dmarc@primebuild.website; adkim=r; aspf=r; pct=100
   ```

   Dopo almeno 2–4 settimane di report senza mittenti legittimi non allineati, valuta `p=quarantine`. Non partire direttamente con `reject`.
7. In **Resend → API Keys**, crea una chiave con sola autorizzazione di invio. Copiala una volta e non inserirla nel repository.
8. Lascia disattivato il tracking di aperture/click salvo reale necessità: riduce trattamento dati e complessità privacy.

## Variabili Cloudflare Pages

Apri **Cloudflare → Workers & Pages → website → Settings → Variables and Secrets** e configura Production (e Preview solo per i test):

| Nome | Tipo | Valore |
|---|---|---|
| `RESEND_API_KEY` | Secret | `re_...` |
| `QUALIFICATION_FORM_URL` | Variable | URL HTTPS completo del Google Form |
| `TURNSTILE_SECRET_KEY` | Secret | chiave Turnstile già in uso |
| `MAIL_TO` | Variable/Secret | casella Gmail interna |
| `MAIL_FROM` | Variable | `preventivi@primebuild.website` |
| `MAIL_REPLY_TO` | Variable | `preventivi@primebuild.website` |
| `EMAIL_STRICT` | Variable | `1` |
| `ALLOWED_ORIGINS` | Variable | `https://primebuild.website` |

La chiave Resend deve esistere soltanto lato Cloudflare. Non usare mai un nome `VITE_RESEND_API_KEY`: le variabili `VITE_*` finiscono nel JavaScript pubblico.

Alternativa CLI per i secret:

```bash
npx wrangler pages secret put RESEND_API_KEY --project-name website
npx wrangler pages secret put TURNSTILE_SECRET_KEY --project-name website
```

Per sviluppo locale crea `.dev.vars` (ignorato da Git):

```dotenv
RESEND_API_KEY=re_xxx
TURNSTILE_SECRET_KEY=xxx
QUALIFICATION_FORM_URL=https://docs.google.com/forms/d/e/xxx/viewform
MAIL_TO=casella-interna@example.com
MAIL_FROM=preventivi@primebuild.website
MAIL_REPLY_TO=preventivi@primebuild.website
```

Dopo ogni variazione alle impostazioni, avvia un nuovo deploy Cloudflare.

## Configurazione Google Form e Gmail

1. Collega il Google Form a un Google Sheet.
2. Attiva **Ricevi notifiche email per le nuove risposte** dal menu delle risposte/Sheet.
3. Nel testo finale del Form usa:

   > Grazie, la richiesta è completa. Il team Prime Build potrà ora valutarla. L'invio del questionario non comporta acquisti automatici; eventuali passaggi successivi saranno comunicati via email.

4. In Gmail crea un filtro per gli oggetti che contengono `[PRIMO CONTATTO]`: applica l'etichetta `Da qualificare` e, se desiderato, ignora la Posta in arrivo.
5. Lascia in Posta in arrivo le notifiche del Google Form: saranno i lead che hanno completato il percorso.

## Copy della conferma automatica

**Oggetto:** `Abbiamo ricevuto la tua richiesta | Prime Build`

> Ciao {{nome}},
>
> abbiamo ricevuto il tuo primo contatto.
>
> Per preparare una proposta adatta alle tue esigenze, completa il questionario: ci aiuterà a valutare budget, utilizzo, giochi o software, risoluzione, componenti già disponibili, preferenze e tempistiche.
>
> **Preventivo Base — gratuito**  
> Include l'analisi delle tue esigenze, una stima del costo complessivo e l'indicazione della fascia di configurazione più adatta. È sufficiente per capire che tipo di PC e quale livello di prestazioni potresti ricevere affidando a Prime Build la realizzazione e l'assemblaggio.
>
> **Preventivo Completo — €25**  
> Include la stessa analisi, con in più il modello esatto di ogni componente, i link di acquisto, i prezzi consigliati rilevati al momento della ricerca e una checklist completa di compatibilità. È pensato per chi vuole poter acquistare e assemblare la build in autonomia.
>
> Se dopo aver acquistato il Preventivo Completo decidi di affidare comunque a Prime Build l'assemblaggio, i €25 già pagati verranno sottratti dal costo della manodopera.
>
> I preventivi riflettono prezzi e disponibilità presenti nel momento in cui vengono preparati. Il mercato dei componenti può cambiare rapidamente e Prime Build non vende direttamente i singoli componenti. Se rileviamo un prezzo particolarmente alto, te lo comunichiamo con trasparenza e, quando ci sono indicazioni concrete di un possibile calo a breve, possiamo consigliarti di attendere.
>
> Se ci hai contattato per assistenza relativa a un servizio già in corso, puoi rispondere direttamente a questa email senza compilare il questionario.
>
> Team Prime Build

Il codice in `functions/contact.js` genera sia HTML sia testo semplice e inserisce il pulsante verso `QUALIFICATION_FORM_URL`.

## Test prima del merge

1. Configura routing, DNS, API key e URL del Form.
2. Invia il modulo con una casella diversa da quella interna.
3. Verifica:
   - Turnstile blocca invii privi di token;
   - arriva la notifica interna con Reply-To del cliente;
   - il cliente riceve HTML e testo semplice;
   - il pulsante apre il Form corretto;
   - rispondendo alla conferma si raggiunge `preventivi@primebuild.website`;
   - SPF, DKIM e DMARC risultano `PASS` nelle intestazioni del messaggio.
4. In Cloudflare crea facoltativamente una regola di rate limiting su `POST /contact` (per esempio 5 richieste ogni 10 minuti per IP), senza sostituire Turnstile.
