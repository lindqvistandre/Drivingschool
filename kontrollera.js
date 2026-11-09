/* Kontrollerar kora.html utan webbläsare.
   Syntaxkontroll hittar inte odeklarerade variabler — det gör "use strict"
   vid körning. Därför körs hela skriptet mot en låtsas-DOM. */
const fs = require("fs");
const path = process.argv[2] || "/mnt/user-data/outputs/kora.html";
const html = fs.readFileSync(path, "utf8");
const skript = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const js = skript[skript.length - 1];

if(!js || js.trim().length < 50){
  console.log("Ingen skriptkod i " + path.split("/").pop() + " — inget att kontrollera.");
  process.exit(0);
}

let fel = 0;
const anm = t => { console.log("  FEL: " + t); fel++; };

/* 1. Varje element som skriptet hämtar måste finnas */
const idn = new Set([...html.matchAll(/id="([^"]+)"/g)].map(m => m[1]));
for(const m of js.matchAll(/\$\("([^"]+)"\)/g))
  if(!idn.has(m[1])) anm(`$("${m[1]}") men inget element har det id:t`);

/* 2. Kör skriptet i strikt läge mot en låtsas-DOM. Odeklarerade
      variabler kastar ReferenceError direkt. */
require("./miljo.js").stall(global);

/* 3. Statisk genomsökning: hittar variabler som används men aldrig
      deklareras, även inne i funktioner som inte körs vid start.
      Det var precis sådana som slank igenom tidigare. */
const deklarerade = new Set();
const taDekl = re => { for(const m of js.matchAll(re))
  m[1].split(",").forEach(d => {
    const n = d.trim().split(/[=:\s]/)[0].replace(/[{}\[\]]/g,"");
    if(n) deklarerade.add(n);
  }); };
taDekl(/\b(?:let|const|var)\s+([^;=\n]+(?:=[^;\n]*)?(?:,[^;\n]+)*)/g);
for(const m of js.matchAll(/\bfunction\s+([A-Za-zÀ-ÿ_$][\w$À-ÿ]*)/g)) deklarerade.add(m[1]);
for(const m of js.matchAll(/\bfunction[^(]*\(([^)]*)\)/g))
  m[1].split(",").forEach(p => { const n=p.trim().split(/[=\s]/)[0]; if(n) deklarerade.add(n); });
for(const m of js.matchAll(/\(([^)]*)\)\s*=>/g))
  m[1].replace(/[\[\]{}]/g," ").split(",").forEach(p => {
    const n=p.trim().split(/[=\s]/)[0]; if(n) deklarerade.add(n); });
for(const m of js.matchAll(/\(\s*\[([^\]]*)\]\s*\)\s*=>/g))
  m[1].split(",").forEach(p => { const n=p.trim(); if(n) deklarerade.add(n); });
for(const m of js.matchAll(/(?:^|[^.\w])([A-Za-zÀ-ÿ_$][\w$À-ÿ]*)\s*=>/g)) deklarerade.add(m[1]);
for(const m of js.matchAll(/\bcatch\s*\(\s*([\w$]+)/g)) deklarerade.add(m[1]);
/* ((a, b) => ...) — pilparametrar direkt inuti ett anrop */
for(const m of js.matchAll(/\(\s*\(([^()]*)\)\s*=>/g))
  m[1].replace(/[\[\]{}]/g," ").split(",").forEach(p => {
    const n=p.trim().split(/[=\s]/)[0]; if(n) deklarerade.add(n); });
for(const m of js.matchAll(/\bfor\s*\(\s*(?:let|const|var)\s+\[?([^\]\s=;]+)/g)) deklarerade.add(m[1]);

const kanda = new Set(("window document navigator location localStorage sessionStorage "
 +"console Math JSON Date Object Array String Number Boolean Set Map Promise Error "
 +"TypeError RangeError SyntaxError RegExp Infinity NaN undefined null true false "
 +"THREE L mapillary fetch setTimeout clearTimeout setInterval clearInterval "
 +"requestAnimationFrame performance addEventListener removeEventListener "
 +"innerWidth innerHeight devicePixelRatio AbortController Blob URL FileReader "
 +"encodeURIComponent decodeURIComponent parseInt parseFloat isNaN Intl "
 +"AbortSignal CanvasRenderingContext2D HTMLElement Event this arguments "
 +"of in new typeof instanceof return if else for while do switch case break "
 +"continue function class try catch finally throw delete void yield await async "
 +"let const var true false null").split(/\s+/));

/* Kommentarer och strängar måste bort först — annars läses svensk
   prosa som variabelnamn. */
const kod = js
  .replace(/\/\*[\s\S]*?\*\//g, " ")
  .replace(/(^|[^:])\/\/[^\n]*/g, "$1 ")
  .replace(/`(?:\\.|[^`\\])*`/g, '""')
  .replace(/"(?:\\.|[^"\\])*"/g, '""')
  .replace(/'(?:\\.|[^'\\])*'/g, '""');

const anvanda = new Map();
for(const m of kod.matchAll(/(?:^|[^.\w$'"`])([A-Za-zÀ-ÿ_$][\w$À-ÿ]{1,})\b(?!\s*:)/g)){
  const n = m[1];
  if(kanda.has(n) || deklarerade.has(n)) continue;
  anvanda.set(n, (anvanda.get(n)||0)+1);
}
if(anvanda.size){
  console.log("Odeklarerade namn:");
  [...anvanda.entries()].sort((a,b)=>b[1]-a[1]).forEach(([n,c]) =>
    anm(`${n} används ${c} gånger men deklareras aldrig`));
} else console.log("Statisk genomsökning: inga odeklarerade namn");

console.log("Kör skriptet i strikt läge…");
try{
  new Function('"use strict";\n' + js)();
  console.log("  inga odeklarerade variabler vid start");
}catch(e){
  anm(e.name + ": " + e.message);
}

console.log(fel === 0 ? "\nKONTROLL GODKÄND" : `\n${fel} FEL HITTADE`);
process.exit(fel ? 1 : 0);
