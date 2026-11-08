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

- [ ] **E1. Ingen automatisk testkörning.** Logiken testas för hand i
      sandlådan vid varje ändring.
- [ ] **E2. Allt ligger i en fil.** kora.html är över 40 kB med HTML, CSS
      och JS i samma dokument.
- [ ] **E3. Ingen felrapportering.** Krascher i webbläsaren syns inte.

---

## Gjort i denna omgång

A1–A5 och B1–B3. Se README för hur de fungerar.
