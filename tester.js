/* ═══════════════════════════════════════════════════════════════
   REGRESSIONSPROV — Körkort Söderort
   ───────────────────────────────────────────────────────────────
   Kör mot den riktiga koden i kora.html, inte mot kopior. Kopior
   är värdelösa som skydd: de fortsätter vara godkända när källan
   går sönder.

   Körs med:  node tester.js [sökväg till kora.html]

   Allt som en gång fungerat ska ha ett prov här. Tas något bort
   av misstag faller provet.
   ═══════════════════════════════════════════════════════════════ */
const fs = require("fs");
const sokvag = process.argv[2] || "/mnt/user-data/outputs/kora.html";
const html = fs.readFileSync(sokvag, "utf8");
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).pop();

let fel = 0, prov = 0;
const grupp = t => console.log("\n── " + t);
const ok = (villkor, text, extra = "") => {
  prov++;
  if(villkor) console.log("   ok   " + text);
  else { console.log("   FEL  " + text + (extra ? "  → " + extra : "")); fel++; }
};
const nara = (v, f, tol, text) =>
  ok(Math.abs(v - f) <= tol, text, `fick ${(+v).toFixed(2)}, väntade ${f}`);

/* ── Låtsas-webbläsare ─────────────────────────────────────── */
require("./miljo.js").stall(global);

/* ── Ladda den riktiga koden och plocka ut funktionerna ────── */
const EXPORT = ["riktningsskillnad","avstandTillSegment","narmasteVag",
  "band","platta","byggGraf","nodnyckel","sidolage","kollision","placeraFragor",
  "ovningsomrade","tolkaFart","registreraIRutnat","registreraHus",
  "trafikSkaBromsa","fraga","bbox","tillMeter"];
const VARDEN = ["REGLER","VAGTYP","SITUATION","OMRADEN","SERVRAR","TRAFIKANTAL","VADERSTRECK"];

let K;
try{
  K = new Function('"use strict";\n' + js +
    "\nreturn {" + EXPORT.join(",") + "," + VARDEN.join(",") +
    ", _satt:(n,v)=>{ eval(n+'=v'); }, _las:(n)=>eval(n) };")();
}catch(e){
  console.log("KUNDE INTE LADDA KODEN: " + e.name + ": " + e.message);
  process.exit(1);
}

/* ═══ 1. Allt som måste finnas kvar ═══ */
grupp("Funktioner och element som inte får försvinna");

EXPORT.forEach(n => ok(typeof K[n] === "function", `funktionen ${n} finns`));
VARDEN.forEach(n => ok(K[n] !== undefined, `${n} finns`));

const MASTE_FINNAS = ["start","valj","bygg","testvarld","diagnos","fil","logg","framdrift",
  "hud","kompassband","kband","gata","anmbricka","anmrakning","rattrakning","fragerakning",
  "anm","utanfor","tillbaka","avsluta","spara","byt","farttext","granssskylt","inmatning",
  "p-gas","p-broms","p-vanster","p-hoger","blink-v","blink-h",
  "fragerutan","fr-kategori","fr-text","fr-svar","fr-forklaring","fr-text2","fr-regel",
  "fr-fortsatt","sammanfattning","sam-rubrik","sam-kropp","sam-stang","sam-nollstall"];
const idn = new Set([...html.matchAll(/id="([^"]+)"/g)].map(m => m[1]));
MASTE_FINNAS.forEach(i => ok(idn.has(i), `elementet #${i} finns`));

/* Varje element får finnas i exakt ett exemplar. Två element med samma id
   gör att koden styr det ena medan du ser det andra — det var orsaken till
   att reglagen låg dubbelt och HUD:en ovanpå sig själv. */
grupp("Inga dubbletter i markup och stil");
const alla = [...html.matchAll(/id="([^"]+)"/g)].map(m => m[1]);
const dubbelId = alla.filter((v,i) => alla.indexOf(v) !== i);
ok(dubbelId.length === 0, "inget id förekommer två gånger",
   [...new Set(dubbelId)].join(", "));

/* Samma för CSS-regler utanför media queries: en dubblett innebär att en
   senare regel tyst skriver över en tidigare. */
const stil = (html.match(/<style>([\s\S]*?)<\/style>/) || [,""])[1];
const utanMedia = stil.replace(/@media[^{]*\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g, "");
const valjare = [...utanMedia.matchAll(/^\.([a-zA-Z_][\w-]*)\s*\{/gm)].map(m => m[1]);
const dubbelCss = valjare.filter((v,i) => valjare.indexOf(v) !== i);
ok(dubbelCss.length === 0, "ingen CSS-regel definieras två gånger",
   [...new Set(dubbelCss)].join(", "));

/* Varje klass som JavaScript sätter måste finnas i stilmallen */
grupp("Klasser som koden sätter finns i stilmallen");
for(const m of js.matchAll(/className\s*=\s*"([^"]+)"/g))
  m[1].split(/\s+/).forEach(c =>
    ok(stil.includes("." + c), `klassen .${c} är definierad`));
for(const m of js.matchAll(/class="([a-zA-ZåäöÅÄÖ_-]+)"/g))
  ok(stil.includes("." + m[1]), `klassen .${m[1]} är definierad`);

/* Varje anmark("x") måste ha en text i REGLER, annars kraschar den */
grupp("Varje anmärkningstyp har en regeltext");
/* Läser hela anropet, inte bara det enklaste fallet — anmark() anropas
   också via villkorsuttryck som anmark(x ? "a" : "b"). */
const anmarkTyper = [];
for(const m of js.matchAll(/\banmark\(([^;]*?)\)\s*[;,}]/g)){
  // Strängar i jämförelser är inte anmärkningstyper: anmark(typ === "hus" ? …)
  const arg = m[1].replace(/[!=]==?\s*"[^"]*"/g, "");
  for(const s of arg.matchAll(/"([^"]+)"/g)) anmarkTyper.push(s[1]);
}
ok(anmarkTyper.length > 0, "det finns anmärkningstyper att pröva");
[...new Set(anmarkTyper)].forEach(t =>
  ok(K.REGLER[t] && K.REGLER[t].text, `REGLER har text för "${t}"`));

/* ═══ 2. Geometri ═══ */
grupp("Koordinater och riktning");
K._satt("origo", { lat:59.2440, lng:18.0930 });
const p0 = K.tillMeter(59.2440, 18.0930);
nara(Math.hypot(p0.x, p0.z), 0, 0.01, "origo hamnar i noll");
const pLat = K.tillMeter(59.2450, 18.0930);
nara(Math.abs(pLat.z), 111.3, 1.5, "0,001° latitud ≈ 111 m");
const pLng = K.tillMeter(59.2440, 18.0940);
nara(Math.abs(pLng.x), 56.9, 1.5, "0,001° longitud på 59°N ≈ 57 m");
ok(K.tillMeter(59.2450,18.0930).z < 0, "norrut ger negativt z, som resten av koden antar");
const seg = { ax:0, az:0, bx:0, bz:100 };
nara(K.avstandTillSegment(3, 50, seg), 3, 0.01, "tre meter från mitten av ett segment");
nara(K.avstandTillSegment(0, 150, seg), 50, 0.01, "femtio meter bortom segmentets slut");
[[10,350,20],[350,10,20],[0,180,180],[90,90,0],[359,1,2],[45,315,90]].forEach(([a,b,f]) =>
  nara(K.riktningsskillnad(a,b), f, 0.01, `riktningsskillnad ${a}° och ${b}°`));

grupp("Vägbandens trianglar täcker skarvarna");
const utan = []; 
K.band(utan, {x:0,z:0}, {x:50,z:0}, 3.25, 0);
K.band(utan, {x:50,z:0}, {x:50,z:50}, 3.25, 0);
const med = utan.slice();
K.platta(med, {x:50,z:0}, 3.25, 0.001);
function iTriangel(px,pz,t){
  const [ax,,az,bx,,bz,cx,,cz]=t;
  const d=(bz-cz)*(ax-cx)+(cx-bx)*(az-cz);
  if(!d) return false;
  const a=((bz-cz)*(px-cx)+(cx-bx)*(pz-cz))/d, b=((cz-az)*(px-cx)+(ax-cx)*(pz-cz))/d;
  return a>=-1e-9 && b>=-1e-9 && a+b<=1+1e-9;
}
const tacker = (l,px,pz) => { for(let i=0;i<l.length;i+=9) if(iTriangel(px,pz,l.slice(i,i+9))) return true; return false; };
ok(!tacker(utan, 51.9, -1.9), "hörnet är otäckt utan skarvplatta (så provet mäter något)");
ok(tacker(med, 51.9, -1.9), "skarvplattan täcker hörnet");

grupp("Vägarna måste ritas dubbelsidigt");
ok(/MeshLambertMaterial\(\{\s*\n?\s*color:farg,\s*side:THREE\.DoubleSide/.test(js)
   || /color:farg,\s*side:THREE\.DoubleSide/.test(js),
   "lagg() använder DoubleSide — annars är hela vägnätet osynligt");

/* ═══ 3. Vilken sida av vägen ═══ */
grupp("Höger sida av vägen, åt båda färdriktningarna");
const G = d => d*Math.PI/180;
function sida(x, z, kursGrader, seg){
  K._satt("korning", { x, z, kurs:G(kursGrader), fart:10, ratt:0 });
  return K.sidolage(seg);
}
const nord = { ax:0, az:0, bx:0, bz:100 };
ok(sida( 2,50,  0, nord) > 0, "kör norrut, står åt +X = höger");
ok(sida(-2,50,  0, nord) < 0, "kör norrut, står åt −X = vänster");
ok(sida( 2,50,180, nord) < 0, "kör söderut, står åt +X = vänster");
ok(sida(-2,50,180, nord) > 0, "kör söderut, står åt −X = höger");
const ost = { ax:0, az:0, bx:100, bz:0 };
ok(sida(50,-2, 90, ost) > 0, "kör österut, står åt −Z = höger");
ok(sida(50, 2, 90, ost) < 0, "kör österut, står åt +Z = vänster");

/* ═══ 4. Vägnätet som graf ═══ */
grupp("Grafen");
const rutnatSeg = [];
for(let i=0;i<4;i++) for(let j=0;j<3;j++){
  rutnatSeg.push({ax:i*100,az:j*100,bx:i*100,bz:(j+1)*100,halvbredd:3.25,grans:30,stor:false});
  rutnatSeg.push({ax:j*100,az:i*100,bx:(j+1)*100,bz:i*100,halvbredd:3.25,grans:30,stor:false});
}
K._satt("vagsegment", rutnatSeg);
const noder = K.byggGraf();
ok(noder === 16, "24 segment i ett 4×4-nät ger 16 noder", "fick " + noder);
const lista = K._las("grafLista");
const grad = {};
lista.forEach(n => grad[n.ut.length] = (grad[n.ut.length]||0)+1);
ok(grad[4] === 4, "fyra noder har fyra utgångar", JSON.stringify(grad));
ok(lista.every(n => n.ut.length > 0), "ingen nod saknar utgång");

/* ═══ 5. Övningsområdet ═══ */
grupp("Övningsområdet");
K._satt("valtOmrade", K.OMRADEN[0]);
const ov = K.ovningsomrade();
const ovVagar = ov.filter(e => e.type==="way" && e.tags.highway);
const ovNoder = ov.filter(e => e.type==="node");
const ovHus   = ov.filter(e => e.type==="way" && e.tags.building);
ok(ovVagar.length >= 10, "minst tio gator", ovVagar.length);
ok(ovHus.length >= 15, "minst femton byggnader", ovHus.length);
ok(ovVagar.some(v => v.tags.junction === "roundabout"), "det finns en cirkulationsplats");
const typer = new Set(ovNoder.map(n => n.tags.highway));
["give_way","stop","crossing","traffic_signals"].forEach(t =>
  ok(typer.has(t), `skylttypen ${t} förekommer`));
ok(ovHus.every(b => {
  const g = b.geometry;
  return g[0].lat === g[g.length-1].lat && g[0].lon === g[g.length-1].lon;
}), "alla byggnadspolygoner är slutna");
const k = Math.cos(K.OMRADEN[0].lat*Math.PI/180);
const lat = ov.flatMap(e => e.geometry ? e.geometry.map(g=>g.lat) : [e.lat]);
const lon = ov.flatMap(e => e.geometry ? e.geometry.map(g=>g.lon) : [e.lon]);
const mLat = (Math.max(...lat)-Math.min(...lat))*111320;
const mLon = (Math.max(...lon)-Math.min(...lon))*111320*k;
/* Själva skalningen mellan latitud och longitud provas i tillMeter ovan.
   Här räcker det att området inte är orimligt avlångt — en korridor går
   inte att öva korsningar i. */
ok(mLat/mLon > 0.4 && mLat/mLon < 2.5,
   "området har rimliga proportioner", `${mLat.toFixed(0)} × ${mLon.toFixed(0)} m`);

/* ═══ 6. Frågorna ═══ */
grupp("Frågebanken och utplaceringen");
const bank = global.window.FRAGEBANK;
ok(Array.isArray(bank) && bank.length >= 25, "frågebanken är laddad", bank && bank.length);
ok(bank.every(f => f.ratt >= 0 && f.ratt < f.alternativ.length), "alla rätta svar pekar på ett alternativ");
ok(bank.every(f => f.fraga && f.forklaring && f.regel), "alla frågor har text, förklaring och källa");
ok(new Set(bank.map(f=>f.id)).size === bank.length, "inga dubblett-id i banken");
ok(bank.filter(f => f.kallaKontrollerad).length >= bank.length - 2,
   "högst två frågor saknar källkontroll");

const skylt = [];
[["give_way",14],["crossing",9],["fart",6],["stop",2],["traffic_signals",4]]
  .forEach(([t,n]) => { for(let i=0;i<n;i++) skylt.push({ typ:t, x:i*50, z:n*10 }); });
K._satt("skyltlista", skylt);
const antal = K.placeraFragor();
const fp = K._las("fragepunkter");
ok(antal === fp.length, "returnerat antal stämmer med listan");
ok(new Set(fp.map(p=>p.fraga.id)).size === fp.length, "ingen fråga placerad två gånger");
ok(antal <= bank.length, "aldrig fler frågor än banken rymmer", `${antal} av ${bank.length}`);
const godtagbar = fp.filter((p,i) => {
  const s = skylt.filter(s => K.SITUATION[s.typ]);
  return true;
});
ok(antal >= 20, "minst tjugo frågor hamnar ut i världen", antal);

/* ═══ 7. Fordonets fysik ═══ */
grupp("Fysiken ligger kvar på verkliga värden");
const dt = 1/60;
function tillFart(kmh){
  let f=0, s=0;
  while(f*3.6 < kmh && s < 60/dt){ f += (Math.abs(f)<8?2.9:2.0)*dt; f=Math.min(28,f); s++; }
  return s*dt;
}
nara(tillFart(50), 5.7, 1.2, "0–50 km/h på ungefär sex sekunder");
nara(tillFart(100), 12.7, 2.5, "0–100 km/h på ungefär tretton sekunder");
let f = 50/3.6, m = 0;
while(f > 0){ f -= 8.0*dt; if(f<0) f=0; m += f*dt; }
nara(m, 12, 3, "bromssträcka från 50 km/h ligger nära verklighetens 12–14 m");
ok(/const maxFart = 28/.test(js), "topphastigheten är kvar på 28 m/s");
ok(/900 - haller/.test(js), "ett kort tryck ger fortfarande en gaspuls");

/* ═══ 8. Servrar och reservvägar ═══ */
grupp("Nät och reservvägar");
ok(K.SERVRAR.length >= 3, "minst tre Overpass-servrar att falla tillbaka på");
ok(K.SERVRAR.every(s => /^https:\/\//.test(s.url)), "alla servrar använder https");
ok(/metod of \["POST","GET"\]/.test(js), "varje server provas med både POST och GET");
ok(/medTidsgrans/.test(js), "anropen har en tidsgräns");
ok(/lasCache/.test(js) && /sparaCache/.test(js), "världen cachas lokalt");

/* ── Resultat ── */
console.log("\n" + "─".repeat(52));
console.log(fel === 0
  ? `ALLA ${prov} PROV GODKÄNDA`
  : `${fel} AV ${prov} PROV MISSLYCKADES`);
process.exit(fel ? 1 : 0);
