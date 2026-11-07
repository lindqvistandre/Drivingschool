# Körkort · Gatuvy

Övningsapp för svensk körkortsteori i verklig gatubild från Söderort, Stockholm.
Du kör längs riktiga gator och får frågor på de platser där de hör hemma.

Bilderna kommer från **Mapillary** (gratis, CC BY-SA). Kartan kommer från **OpenStreetMap**.
Ingen Google-tjänst används och inget betalkonto behövs.

---

## Filer

| Fil | Vad den gör |
|---|---|
| `kora.html` | **Körvärlden** — kör fritt i en 3D-värld byggd av riktiga vägdata. |
| `index.html` | Mapillary-verktyget — foton, täckningsskanning, frågegranskning. |
| `fragebank.js` | Frågorna. Platsoberoende — en fråga om högerregeln gäller överallt. |
| `platser.js` | Kopplingen fråga ↔ plats, samt övningsområdets gränser. Fylls av dig. |
| `korkort-streetview-plan.md` | Projektplanen. Beslut, faser och risker. |

Alla fyra måste ligga i **samma mapp**. Appen laddar `fragebank.js` och `platser.js`
med `<script>`-taggar, inte med `fetch` — därför fungerar den även om du bara
dubbelklickar på `index.html` utan webbserver.

---

## Körvärlden (`kora.html`)

Öppna filen, välj område och tryck **Bygg världen**. Ingen token behövs.

Appen frågar OpenStreetMap via Overpass API efter alla vägar, byggnader och
trafikskyltnoder inom cirka två kilometer, och bygger en körbar 3D-värld av dem.
Det tar några sekunder.

**Reglage:** `W`/`↑` gas, `S`/`↓` broms och back, `A` `D`/`←` `→` styr,
mellanslag handbroms, `R` återställ. På mobil finns pedaler nere till höger.

**Vad som kommer från verklig data:**
- gatunätet och gatunamnen
- hastighetsgränser (`maxspeed`), med vägklassens standardvärde som reserv
- väjningsplikt, stopplikt, trafiksignaler och övergångsställen som skyltar
- byggnadernas fotavtryck och höjd

HUD:en visar farten, gällande hastighetsgräns, gatunamn och ett kompassband.
Kör du utanför vägbanan eller för fort syns en varning.

**Fysiken** är inställd mot verkliga värden: 0–50 km/h på 5,7 sekunder,
0–100 på 12,7, och bromssträcka 11,9 meter från 50 km/h. Styrutslaget minskar
med farten, precis som i en riktig bil.

**Overpass API** är gratis men drivs av frivilliga och har en användningspolicy.
Bygg inte om världen i onödan. Tryck **Spara världen** när den byggts — då får du
en `.json` som kan läsas in igen utan nätanrop. OSM:s egen wiki varnar för att
huvudinstansen `overpass-api.de` är överbelastad, så appen frågar tre andra
servrar först och tar den som svarar.

### "Failed to fetch" — vad det betyder

Det är inte ett svar från servern. Det är webbläsaren som stoppar anropet innan
det går iväg. Tre orsaker, i fallande sannolikhet:

1. **Du öppnade filen direkt från hårddisken** (`file://`). Webbläsare tillåter
   inte externa anrop från sådana sidor. Starta en liten server i stället:
   ```bash
   python3 -m http.server 8000
   # öppna http://localhost:8000/kora.html
   ```
2. **Sidan körs i en sandlåda** — till exempel en förhandsvisning i en chatt —
   som spärrar anrop till andra domäner. Ladda ner filen och kör den lokalt.
3. **Alla fyra servrarna är nere samtidigt.** Ovanligt. Appen säger då vilken
   server som gav vilket fel.

**Knappen Övningsområde** bygger ett påhittat men genomtänkt bostadsområde helt
utan nätanrop: en cirkulationsplats, en huvudgata på 50, bostadsgator på 30,
väjningsplikt mot huvudgatan, en stopplikt i en skymd korsning, övergångsställen
vid skolan, och oskyltade korsningar där högerregeln gäller. Den fungerar alltid,
även där Overpass är blockerat.

### På telefon

Du kan inte starta en lokal webbserver på en telefon. Två vägar fungerar:

**Övningsområdet** fungerar överallt, även i en chattförhandsvisning, eftersom
det inte behöver nätet alls.

**Riktiga Farsta kräver en riktig webbadress.** Lägg filerna på GitHub Pages —
det går att göra helt från telefonens webbläsare:

1. Gå till github.com och skapa ett nytt repo, till exempel `korvarlden`
2. **Add file → Upload files**, ladda upp `kora.html`
3. **Settings → Pages**, välj branch `main` och mapp `/ (root)`
4. Efter en minut: `https://<användarnamn>.github.io/korvarlden/kora.html`

Öppna den adressen i telefonens webbläsare. Då fungerar Overpass, och Farsta
byggs på riktigt.

---

## Mapillary-verktyget (`index.html`)

### 1. Hämta en Mapillary-token

1. Gå till <https://www.mapillary.com/dashboard/developers>
2. Skapa ett konto om du inte har ett
3. Välj **Register Application**
4. Kopiera **client token**

Ingen betalning, inget kreditkort.

### 2. Öppna appen

Dubbelklicka på `index.html`, eller starta en lokal server:

```bash
python3 -m http.server 8000
# öppna http://localhost:8000
```

Klistra in token högst upp och tryck **Anslut**.

Kör du bara lokalt kan du slippa klistra in den varje gång: sätt `INBAKAD_TOKEN`
högst upp i skriptet i `index.html`. **Gör inte det om appen ska ligga publikt** —
då kan vem som helst läsa din token i källkoden.

---

## De tre lägena

### Öva
Kör fritt längs gatorna. När du kommer nära en placerad fråga, och tittar åt rätt
håll, öppnas den. Inga tidsgränser. Förklaringen visas alltid, även när du svarat
rätt, och du kan svara om hur många gånger du vill.

Är inga frågor placerade ännu är detta läge tomt — börja i Bygg.

### Bygg
Här skapar du innehållet.

1. **Skanna hela Söderort** — provar alla nio områden automatiskt och rangordnar
   dem efter täckning, bildernas ålder, kvalitet och andel 360°. Tar ungefär en
   minut. Klicka på en rad i tabellen för att åka dit. Stjärnan markerar bästa
   området. Detta är det snabbaste sättet att bestämma var appen ska byggas.
2. **Skanna kartans område** — zooma till ungefär en kvadratkilometer och tryck.
   Appen provar ett rutnät av punkter och markerar grönt där Mapillary har bilder,
   rött där det saknas. Använd denna för att finjustera inom det vinnande området.
3. Hittar du ett bra område: skriv in dess mitt och radie i `OMRADE` i `platser.js`.
4. Kör till en plats som passar en fråga. **Vrid vyn åt det håll en förare skulle
   titta** — riktningen sparas och styr när frågan utlöses.
5. Välj fråga i listan, tryck **Placera fråga här**.
6. Tryck **Exportera till platser.js** och klistra in i filen.

### Granska
Går igenom frågorna en och en. Kräver ingen token.

Varje fråga har en flagga:
- **KÄLLA OK** — paragrafhänvisningen är läst i lagtexten och stämmer
- **EJ KÄLLA** — hänvisningen bygger på slutledning och behöver kontrolleras

Markera **Godkänn** eller **Behöver ändras**, skriv en anteckning, exportera.

---

## Vad "granskad" betyder

Frågorna har två separata statusfält, och de betyder olika saker:

**`kallaKontrollerad`** — paragrafnumret är kontrollerat mot källtexten
(Trafikförordningen 1998:1276 i lydelse SFS 2024:1265, förordningen 2001:651 om
vägtrafikdefinitioner, och vägmärkesförordningen 2007:90).

**`granskad`** — en människa har läst frågan och godkänt både formulering och
pedagogik. **Ingen fråga är ännu granskad.**

Att en paragraf stämmer betyder inte att tolkningen är den en förarprövare skulle
godta. Låt en trafiklärare läsa igenom innan appen används av någon annan än dig.

---

## Publicera på GitHub Pages

1. Skapa ett repo och lägg in alla filerna i roten
2. Settings → Pages → Source: `main`, mapp `/ (root)`
3. Sidan hamnar på `https://<användarnamn>.github.io/<repo>/`

Lämna `INBAKAD_TOKEN` tom. Besökare får ange sin egen token.

---

## Krav och begränsningar

- Mapillarys bildtäckning är gemenskapsbyggd och ojämn. Vissa gator i Söderort
  saknar bilder helt. Skanningsfunktionen finns för att mäta detta.
- Bildkvaliteten varierar. Föredra 360°-bilder med kvalitetspoäng över 0,5 —
  skyltar går annars inte att läsa.
- Bilderna kan vara flera år gamla. Skyltar kan ha ändrats sedan dess.
- Framsteg sparas inte mellan sessioner ännu.
- Platssökningen använder Nominatim (OpenStreetMap). Den är gratis men har
  användningsvillkor — den passar personligt bruk, inte massanrop.

---

## Licenser och erkännanden

- Gatubilder: © Mapillary-bidragsgivare, **CC BY-SA**. Måste anges i appen.
- Karta: © OpenStreetMap-bidragsgivare, **ODbL**.
- Kartvisning: Leaflet. Bildvisning: MapillaryJS.

Appen är **inte** officiell och **inte** godkänd av Transportstyrelsen. Frågorna
är egna, skrivna utifrån de offentliga författningarna. Inga frågor från det
riktiga teoriprovet förekommer — de är inte publicerade och är upphovsrättsskyddade.
