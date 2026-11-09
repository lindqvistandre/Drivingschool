# Åtgärdslista — Körkort Söderort

Allt som är trasigt eller saknas, i prioritetsordning. Status uppdateras
när punkten är klar och pushad.

Legend: **[ ]** ej påbörjad · **[~]** påbörjad · **[x]** klar och pushad

---

## A. Blockerande — appen är ofullständig utan dessa

- [x] **A1. Kollision.** Du kör rakt igenom trafiken och igenom husen.
      Utan detta finns ingen konsekvens av att göra fel.
- [x] **A2. Trafiken följer inte reglerna.** Bilarna kör genom varandra och
      struntar i väjningsplikt. Korsningar blir kaos i stället för övning.
- [x] **A3. Frågorna finns inte i körvärlden.** Frågebanken är inkopplad i
      Mapillary-appen men inte i 3D. Det är där de hör hemma.
- [x] **A4. Blinkers saknas.** Går inte att öva tecken, och därmed inte att
      bedöma det. Tecken är en egen paragraf (3 kap. 65 §).
- [x] **A5. Ingen sammanfattning efter körning.** Anmärkningarna räknas men
      sammanställs aldrig. Man får inte veta vad man ska öva på.

## B. Viktigt — gör projektet användbart över tid

- [x] **B1. Världen hämtas om vid varje start.** Belastar Overpass i onödan
      och tar tid. Ska cachas lokalt.
- [x] **B2. Framsteg sparas inte.** Besvarade frågor och anmärkningar
      försvinner när man laddar om.
- [x] **B3. Trafiksignaler växlar inte.** De står som dekoration.
- [ ] **B4. Områdena är nio separata rutor.** Söderort bör hänga ihop så att
      man kan köra från Farsta till Hökarängen.
- [ ] **B5. Ingen backspegel.** Går inte att kontrollera bakåt, vilket är en
      del av både omkörning och sväng.

## C. Innehåll och korrekthet

- [ ] **C1. Ingen fråga är granskad av människa.** 29 frågor, 28 med
      paragraf kontrollerad mot lagtext, noll granskade pedagogiskt.
      Kräver en trafiklärare — kan inte lösas i kod.
- [ ] **C2. En fråga saknar källkontroll** (vajning-004, trasig
      trafiksignal). Det finns ingen paragraf om saken; svaret följer av
      två andra regler. Behöver bekräftas av någon sakkunnig.
- [ ] **C3. Frågebanken täcker sex kategorier.** Saknar bland annat
      vinterväglag, omkörning i praktiken, motorväg, och alkohol/trötthet.
- [ ] **C4. platser.js är tom.** Ingen fråga är placerad på en Mapillary-
      position. Mindre viktigt nu när frågorna bor i 3D-världen.

## D. Upplevelse

- [ ] **D1. Inget ljud.** Motor, blinkers, varningar.
- [ ] **D2. Ingen dag/natt eller väder.** Mörkerkörning och halka är egna
      moment i utbildningen.
- [ ] **D3. Kameran kan hamna inne i hus.**
- [ ] **D4. Inga gående.** Övergångsställen saknar någon att väja för.
- [ ] **D5. Ingen minikarta** under körning.

## E. Teknik

- [x] **E1. Automatisk kontroll och regressionsskydd.** `sh kolla.sh` kör
      allt: strukturkontroll av varje app plus 131 regressionsprov mot den
      riktiga koden. Se avsnittet nedan.
- [ ] **E2. Allt ligger i en fil.** kora.html är över 40 kB med HTML, CSS
      och JS i samma dokument.
- [ ] **E3. Ingen felrapportering.** Krascher i webbläsaren syns inte.

---

## Gjort i denna omgång

A1–A5, B1–B3 och E1.

### Två fel som nästan gick ut i produktion

**Hela variabelblocket saknades.** En textersättning hakade på en rad som
bara finns i Mapillary-appen, matchade aldrig, och misslyckades tyst.
Elva variabler användes utan att deklareras. Appen kraschade direkt med
`husrutnat is not defined`.

**`riktningsskillnad` fanns inte i kora.html.** Funktionen är definierad i
Mapillary-appen, men jag anropade den tre gånger härifrån — i trafikens
vägval och i bedömningen av tecken. Båda hade kraschat vid körning.

Mina kontroller letade bara efter syntaxfel och element-id. Ingen av dem
kan hitta en variabel som aldrig deklarerats, eftersom det är ett
körningsfel och inte ett syntaxfel. Därför finns `kontrollera.js` nu, och
den är provad mot båda felen genom att återinföra dem.


---

## Regressionsskydd

Kör **`sh kolla.sh`** före varje push. Ett kommando, tre delar:

**`kontrollera.js`** per app — varje element som koden hämtar måste finnas,
inga namn får användas utan att deklareras, och hela skriptet körs i strikt
läge mot en låtsas-webbläsare.

**`tester.js`** — 131 prov mot den riktiga koden i `kora.html`. Funktionerna
plockas ut ur källfilen och anropas på riktigt. Prov mot kopior är värdelösa
som skydd, eftersom de fortsätter vara godkända när källan går sönder.

**`miljo.js`** — den låtsas-webbläsare båda delar, så de inte kan glida isär.

### Vad proven skyddar

| Område | Exempel på vad som fångas |
|---|---|
| Element | Ett id försvinner ur HUD men koden hämtar det fortfarande |
| Variabler | Ett namn används men deklareras aldrig |
| Anmärkningar | `anmark("x")` utan motsvarande text i `REGLER` |
| Geometri | Skarvplattorna slutar täcka hörnen |
| Rendering | `DoubleSide` tappas och vägnätet blir osynligt |
| Vägsida | Höger och vänster kastas om vid omvänd färdriktning |
| Grafen | Noder slutar kopplas ihop och trafiken fastnar |
| Övningsområdet | En skylttyp eller cirkulationsplatsen försvinner |
| Frågorna | Dubbletter, trasiga svarsindex, för få utplacerade |
| Fysiken | Acceleration eller bromssträcka glider från verkliga värden |
| Nätet | Färre reservservrar, tappad tidsgräns, borttagen cache |

### Provade mot riktiga fel

Varje regel här har provats genom att återinföra felet den ska fånga:

- `DoubleSide` borttagen → faller på renderingsprovet
- topphastighet ändrad → faller på fysikprovet
- elementet `blink-h` omdöpt → faller på elementprovet
- regeltexten `krockBil` borttagen → faller på anmärkningsprovet
- variabeln `husrutnat` borttagen → faller på den statiska genomsökningen
- funktionen `riktningsskillnad` borttagen → faller på samma genomsökning

Ett prov som inte faller när felet återinförs skyddar ingenting.