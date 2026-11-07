/* ═══════════════════════════════════════════════════════════════
   PLATSER — Körkort Gatuvy
   ───────────────────────────────────────────────────────────────
   Här bor kopplingen mellan en fråga i frågebanken och en verklig
   plats i Söderort.

   Fyll den så här:
     1. Öppna appen och anslut med din Mapillary-token
     2. Byt till BYGG-läge
     3. Kör till en plats som passar en fråga
     4. Vrid vyn åt det håll föraren skulle titta
     5. Välj frågan i listan och tryck "Placera fråga här"
     6. Tryck "Exportera" och klistra in resultatet nedan

   OMRADE styr var fri körning är tillåten. Sätt mitten och radien
   när du vet vilken del av Söderort som har bäst bildtäckning.
   ═══════════════════════════════════════════════════════════════ */

window.OMRADE = {
  namn: "Söderort — ej vald ännu",
  lat: 59.2790,
  lng: 18.0500,
  radie: 1200          // meter. Utanför denna cirkel varnar appen.
};

window.PLATSER = [

  /* Exempel på hur en post ser ut — ta bort när du lagt in egna:

  {
    fragaId: "vajning-001",
    lat: 59.28801,
    lng: 18.07004,
    radius: 18,               // hur nära du måste vara för att frågan ska öppnas
    heading: 145,             // vilket håll föraren tittar åt
    headingTolerance: 55,     // hur mycket du får avvika från det hållet
    imageId: "123456789012345",
    notering: "Okskyltad korsning, bil kan komma från höger"
  }

  */

];
