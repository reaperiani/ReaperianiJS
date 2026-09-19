# ReaperianiJS

Tre JSFX per REAPER, scritti in EEL2 con amore, incoscienza e qualche parolaccia.
50 euro. Oppure zero, visto che sono sotto GPL. Fate voi, non vi voglio mettere pressione.

> Questi file hanno estensione `.js` per ragioni storiche, ma **non sono JavaScript**.
> Sono effetti [JSFX](https://www.reaper.fm/sdk/js/js.php) scritti in EEL2 e vengono
> compilati al volo da REAPER.

## Plugin

| File | Nome in REAPER | Che cazzo fa |
| --- | --- | --- |
| `Fuorilavoce.js` | FUORILAVOCE Mid/Side EQ | Aumenta il Mid e scava il Side, o viceversa, sulla stessa frequenza. Utile per fare spazio al centro senza prendere a martellate tutto lo stereo. |
| `tinderata.js` | Tinder EQ | Sincronizza una banda di EQ tra due istanze: stessa frequenza e larghezza, gain opposto. Una spinge, l'altra leva. Una coppia felice, finalmente. |
| `megatinder.js` | MEGATinder EQ | Fa la stessa porcata del Tinder EQ, ma con due bande indipendenti per ogni coppia. Mega, appunto. |

Tutti gli effetti lavorano in stereo.

## Requisiti

- [REAPER](https://www.reaper.fm/) con supporto JSFX, quindi praticamente qualsiasi versione non archeologica.
- Nessuna dipendenza, nessun installer e nessun account obbligatorio. Solo file di testo che fanno DSP.

## Installazione

1. Scarica il repository come ZIP oppure clonalo:

   ```bash
   git clone https://github.com/reaperiani/ReaperianiJS.git
   ```

2. In REAPER apri **Options > Show REAPER resource path in explorer/finder**.
3. Copia i tre file `.js` dentro la cartella `Effects`, preferibilmente in una sottocartella `ReaperianiJS` per non trasformare tutto in un porcile.
4. Riavvia REAPER oppure aggiorna la lista degli effetti.
5. Apri il browser FX e cerca `FUORILAVOCE`, `Tinder` o `MEGATinder` nella categoria JS.

## Uso

### FUORILAVOCE

`Fuorilavoce.js` converte il segnale stereo in Mid/Side, applica due curve opposte alla frequenza scelta e torna in Left/Right.

| Controllo | Funzione |
| --- | --- |
| `Frequenza` | Seleziona la frequenza di intervento, da circa 20 Hz a 20 kHz. Il cursore interno usa una scala 0-100 e la frequenza reale viene mostrata nell'interfaccia. |
| `Forza` | Quantità dell'intervento: il Mid viene aumentato e il Side attenuato dello stesso valore. |
| `gain` | Gain finale da -150 dB a +12 dB. È nascosto nell'interfaccia standard, ma resta disponibile come parametro. |

Con `Forza` a zero l'EQ non interviene. Se esageri, non è colpa del plugin: sei tu che hai girato la manopola.

### Tinder EQ

Il Tinder EQ va usato in coppia:

1. Inserisci `tinderata.js` sui due segnali che vuoi incastrare.
2. Seleziona lo stesso `Gruppo` su entrambe le istanze, da 1 a 6.
3. Imposta un'istanza come `maschio` e l'altra come `femmina`. Sono etichette storiche un po' del cazzo: tecnicamente significano solo **gain normale** e **gain invertito**.
4. Regola frequenza, gain e larghezza su una delle due istanze.

Le due istanze condividono frequenza e larghezza; il gain viene applicato con segno opposto. Se una fa `+4 dB`, l'altra fa `-4 dB` sulla stessa zona.

### MEGATinder EQ

La configurazione è identica al Tinder EQ, ma hai due bande:

- `Banda 1`: frequenza, gain e larghezza della prima curva.
- `Banda 2`: frequenza, gain e larghezza della seconda curva.
- `Gruppo`: collega le istanze appartenenti alla stessa coppia.
- `Ruolo`: decide quale lato riceve il gain opposto.

## Attenzione alle globali

Tinder e MEGATinder comunicano attraverso variabili `_global.tinderata` condivise da tutte le istanze nella stessa sessione di REAPER.

- I gruppi disponibili sono solo sei.
- Due coppie con lo stesso gruppo si controlleranno a vicenda. Non è telepatia, è una collisione.
- Tinder e MEGATinder usano lo stesso spazio globale: evita di assegnare lo stesso gruppo a configurazioni diverse.
- Anche progetti aperti contemporaneamente nella stessa istanza di REAPER possono condividere quei valori.

Se le manopole iniziano a muoversi da sole, prima di chiamare un esorcista controlla i gruppi.

## Risoluzione problemi

**Gli effetti non compaiono nel browser FX**

Controlla che i file siano davvero dentro `REAPER resource path/Effects`, poi riavvia REAPER o aggiorna la lista degli effetti JS.

**Le due istanze non si sincronizzano**

Devono usare lo stesso gruppo e ruoli opposti. Due `maschio` o due `femmina` non formano la coppia prevista dal plugin.

**Una coppia modifica un'altra coppia**

Hai riutilizzato lo stesso gruppo, probabilmente anche tra Tinder e MEGATinder. Cambiane uno e torna a fare musica.

## Sviluppo e contributi

Il codice è EEL2/JSFX, non JavaScript nonostante l'estensione. Prima di proporre una modifica:

- prova tutti e tre gli effetti in REAPER;
- verifica input stereo, automazioni e richiamo dei progetti salvati;
- per Tinder e MEGATinder prova almeno una coppia con ruoli opposti;
- non rinominare i file o cambiare l'ordine degli slider senza considerare la compatibilità con i progetti esistenti.

Bug report e pull request sono benvenuti. Indica versione di REAPER, sistema operativo, plugin coinvolto e passaggi per riprodurre il casino.

## Licenza

ReaperianiJS è distribuito secondo i termini della [GNU General Public License v3.0 o successiva](LICENSE).

Copyright (C) 2022-2026 reaperiani. Parti del codice mantengono il copyright originale di Cockos Inc.; le relative attribuzioni sono conservate nei sorgenti.

Il software viene fornito senza garanzia. Se apre un buco nero nel mix, legalmente e artisticamente sono cazzi tuoi.
