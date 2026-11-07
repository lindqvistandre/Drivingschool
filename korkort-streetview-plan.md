# Körkort Street View — Project Plan

**Goal:** A web app where students practice Swedish driving theory (*körkortsteori*) inside real street imagery of Stockholm. The user drives through streets, and quizzes appear based on where they are — signs, right of way, turns, lane choice.

**Target user:** Students preparing for the Transportstyrelsen theory test
**Language:** Swedish (UI and questions)
**First build:** One small area of Stockholm
**Hosting:** Local first, then GitHub Pages

---

## 1. The two big decisions

These two things shape everything else, so they should be settled first.

### Decision A: Which street imagery?

You said you'd rather not pay. That rules out Google in practice:

| | Google Street View | Mapillary |
|---|---|---|
| Cost | Free tier exists, but **a credit card and active billing account are required to get a key at all** | Free, no billing account |
| Free limit | Dynamic Street View is a "Pro" SKU: ~5,000 loads/month. Street View *tiles* get ~100,000/month | No hard cost limit for normal use |
| Risk | If you pass the limit, you are charged automatically unless you set a manual cap | No surprise bills |
| Coverage in Stockholm | Excellent, everywhere | Good in cities, but **uneven — must be checked street by street** |
| Image quality | Consistent, professional cameras | Varies — some phone photos, some 360° cameras |
| Viewer library | Google Maps JavaScript API | MapillaryJS (open source, same idea) |
| License | Google terms of service | CC BY-SA — free to use, **but you must show attribution** |

**Recommendation: build on Mapillary.**

Extra reason it fits: Mapillary was founded in Malmö, Sweden, and Stockholm's city administration has been one of its users, so Swedish coverage is better than average. It is now owned by Meta.

**Important:** the app should be built so the imagery source can be swapped later. If you ever want Google, we change one module — not the whole app.

**First task before anything else:** open mapillary.com, look at 3–4 candidate areas in Stockholm, and confirm the imagery is actually good and recent there. Coverage is crowdsourced, so this must be checked with your own eyes.

### Decision B: GitHub Pages cannot run AI live

GitHub Pages only serves static files. It cannot keep an API key secret and cannot run server code. So **live AI-generated questions are not possible on GitHub Pages.**

Two ways forward:

**Option 1 — Static only (recommended to start)**
Questions are generated in advance (by me, with AI help) and saved as a JSON file inside the project. The app just reads the file. Works perfectly on GitHub Pages, costs nothing, and is fast.

**Option 2 — Add a small backend later**
A free service like Cloudflare Workers or Vercel runs the AI calls and holds the key. This enables truly dynamic questions but adds complexity and a signup.

**Recommendation:** Option 1 for the prototype, Option 2 later if you still want it. "Mix of both" is still achievable — the *mix* just happens during content creation instead of at runtime.

---

## 2. Suggested prototype area

**Chosen: Söderort** (the southern districts of Stockholm — Årsta, Enskede, Farsta, Högdalen, Hägersten, Skärholmen, Skarpnäck, Älvsjö).

**Why this is a good choice for learning:** suburban roads are actually *better* teaching material than the inner city. They contain the situations the theory test focuses on:

- **Högerregeln** at unmarked residential intersections — rare in the inner city, common here
- **Roundabouts** (*cirkulationsplats*) — many in Söderort, almost none in central Stockholm
- **Speed limit changes** — 30 near schools, 40 on local roads, 50–70 on bigger roads
- **Väjningsplikt and stopplikt** signs at real junctions
- **Larger junctions with lane choice** and turn arrows painted on the road

**The one risk:** Mapillary is crowdsourced, so suburbs usually have *less* coverage than the inner city. Some Söderort streets may have no imagery at all, and some may only have old or low-quality images. This must be measured, not assumed — that's what the coverage scan in the prototype tool is for.

**If coverage turns out too thin:** pick the best-covered corner of Söderort rather than abandoning the area. Main roads (Nynäsvägen, Huddingevägen, Örbyleden, Magelungsvägen) and centre areas near tunnelbana stations are most likely to be covered.

**Target size:** roughly 10–20 intersections, 30–50 quiz points. Enough to feel real, small enough to finish.

---

## 3. Legal note on the theory test

The official Transportstyrelsen exam questions are not published and are copyrighted. We cannot copy them.

What we *can* use freely:
- **Trafikförordningen (1998:1276)** — the traffic rules themselves
- **Vägmärkesförordningen (2007:90)** — official road sign definitions and images
- Transportstyrelsen's public guidance material

We write **original questions** based on these sources. This is the same approach commercial apps use. We should also avoid claiming the app is official or approved by Transportstyrelsen.

---

## 4. How the app works

### Movement modes
1. **Fritt körande (free driving)** — user moves along streets freely inside a defined area boundary
2. **Rutt (route)** — a fixed path with quiz points in order
   - Routes made by you (drawn in an editor)
   - Routes generated automatically from the quiz points
3. **Områdesgräns (area boundary)** — a polygon; if the user tries to leave, the app stops them or warns

### Quiz triggering
Each quiz point has a coordinate and a trigger radius (for example 15 metres). When the user's position enters that radius, the quiz opens.

Some questions should also depend on **which direction the user is facing** — a "who has right of way?" question is only correct from one approach direction.

### Question types to support
- **Flervalsfråga** — multiple choice ("What does this sign mean?")
- **Riktningsval** — pick a direction ("Where should you turn?")
- **Sant/falskt** — true or false
- **Peka på bilden** — click the sign or hazard in the image
- **Fel sväng** — feedback when the user drives the wrong way

### Progress
- Score per session
- Which questions were wrong, so they can be repeated
- Saved in the browser (no login needed for the prototype)

### Tone: relaxed learning (decided)
No timers, no countdown, no streak pressure. Concretely this means:

- A wrong answer is never punished — it opens an explanation instead
- Every question shows **why** the answer is right, and which rule it comes from
- You can re-answer a question as many times as you want
- No "you failed" screens. The app tracks what needs more practice, quietly

This fits the user well: **you are studying for the test yourself and do not have a licence yet.** So the app has to *teach* the rule, not just check whether you already know it. Every explanation should be written as if the reader is meeting the rule for the first time.

### Mobile support (decided)
The app must work on phones as well as desktop. This affects design from the start:

- Street imagery takes the full screen on a phone; panels slide over it
- Questions appear as a bottom sheet, thumb-reachable
- Touch controls for looking around and moving forward
- Must work in portrait — most students will use it standing up, on a bus

---

## 5. Technical structure

```
Frontend (browser only — works on GitHub Pages)
├── Imagery module      → MapillaryJS viewer (swappable)
├── Map module          → Leaflet + OpenStreetMap (small overview map, free)
├── Position tracker    → current coordinate + heading
├── Quiz engine         → checks triggers, shows questions, scores
├── Content             → questions.json, areas.json, routes.json
└── UI                  → Swedish interface
```

**Suggested stack:** plain HTML/CSS/JavaScript, or React if you prefer. No build step needed for the simplest version, which makes GitHub Pages easy.

### Data format for a question (draft)

```json
{
  "id": "sod-001",
  "lat": 59.3162,
  "lng": 18.0722,
  "radius": 15,
  "heading": 90,
  "headingTolerance": 45,
  "type": "flerval",
  "question": "Vad betyder detta vägmärke?",
  "options": ["Väjningsplikt", "Stopplikt", "Huvudled", "Förbud mot infart"],
  "correct": 1,
  "explanation": "Stoppmärket betyder att du måste stanna helt...",
  "rule": "Trafikförordningen 3 kap. 21 §",
  "difficulty": 2
}
```

---

## 6. Build phases

**Phase 1 — Proof of concept (smallest possible test)**
Show one Mapillary image in a web page. Move to the next image. Nothing else.
*Purpose: confirm the imagery works before building anything on top of it.*

**Phase 2 — Movement**
Free driving inside a boundary. Small map showing current position. Direction tracking.

**Phase 3 — Quiz engine**
Trigger zones, question display, answers, feedback, score. Start with 5 hand-written questions.

**Phase 4 — Content**
Expand to 30–50 questions covering the prototype area. Mix of hand-written and AI-drafted, all reviewed against the official rules.

**Phase 5 — Routes**
Route mode, route editor, automatic route generation.

**Phase 6 — Polish and publish**
Swedish UI text, progress saving, Mapillary attribution, deploy to GitHub Pages.

---

## 7. Main risks

| Risk | How we handle it |
|---|---|
| Mapillary coverage too thin in chosen area | Check coverage **before** Phase 2; pick the area based on imagery, not preference |
| Imagery is old — signs may have changed | Check image dates; note them; avoid questions about temporary signs |
| Questions are wrong or misleading | Every question cites the rule it comes from; review before publishing |
| Project grows too big | Keep the prototype area small. Resist adding cities until Phase 6 is done |
| Image quality poor for reading signs | Prefer 360° sequences over phone photos; test readability early |

---

## 8. Decisions made

| Question | Answer |
|---|---|
| Imagery source | Mapillary (free, no billing account) |
| Question source | Written in advance to a JSON file (static, works on GitHub Pages) |
| Area | Söderort |
| User's own knowledge | Studying for the test, no licence yet — **app must explain, not just test** |
| Devices | Mobile and desktop both |
| Tone | Relaxed, no time pressure |

### One honest note about the questions

Because you are learning the rules yourself, you cannot easily check whether a question I write is correct. That puts more responsibility on the sourcing. So the rule is:

**Every question in the app must name the paragraph it comes from** (for example *Trafikförordningen 3 kap. 18 §*), and that reference stays visible in the explanation. If a rule cannot be traced to a source, the question does not go in the app.

I will also be honest when I am uncertain about a specific Swedish rule rather than guessing. Some things — like exactly how an examiner would judge a borderline situation — are genuinely not something I can settle from the regulation text alone. For those, a driving instructor or your *trafikskola* is the right check.

---

## 8b. ARKITEKTURBYTE — körlagret blir en byggd 3D-värld

**Problemet med foton.** Mapillary ger stillbilder tagna från en bil som kört förbi.
Du hoppar mellan bilder i stället för att köra, och du kan bara färdas där någon
råkat fotografera. I Söderorts villagator är täckningen med stor sannolikhet full
av hål. "Köra runt fritt" går helt enkelt inte att bygga på foton.

**Beslutet.** Körlagret byggs i stället av **OpenStreetMap-data renderad i 3D**
med Three.js. Filen heter `kora.html`.

| | Mapillary-foton | Byggd OSM-värld |
|---|---|---|
| Rörelse | hoppar mellan bilder | mjuk, fri körning |
| Täckning | ojämn, hål överallt | varenda gata finns |
| Hastighetsgränser | måste anges för hand | finns som `maxspeed` i data |
| Skyltar | måste letas upp i bilden | finns som noder i data |
| Utseende | fotorealistiskt | stiliserat |
| Kostnad | gratis | gratis |

**Vad som behålls:** hela frågebanken, lagkontrollen, granskningsläget och
frågemotorns utlösarlogik. Inget av det arbetet går förlorat.

**Vad som ändras:** positionen kommer från bilens fysik i stället för från
en Mapillary-bild. Utlösarna fungerar likadant — avstånd plus riktning.

**Vad som tappas:** fotorealismen. Du ser inte den verkliga skylten, utan en
ritad. Mapillary-appen (`index.html`) finns kvar som referensverktyg för att
titta på hur en plats faktiskt ser ut.

---

## 9. Next step

**Run the coverage scan on Söderort.** Open the prototype tool, search for areas in Söderort, and press *Skanna täckning*. It samples a grid of points and shows you in green and red where Mapillary actually has imagery.

We are looking for a patch of roughly 800 × 800 metres where:
- most of the grid comes back green
- images are from roughly the last 4–5 years
- quality scores are mostly above 0.5
- there is at least one roundabout and several small unmarked intersections

Save 5–10 good spots with *Spara denna plats*, copy the JSON, and send it to me. Then Phase 2 begins.
