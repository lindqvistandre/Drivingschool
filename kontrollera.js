/* Kontrollerar kora.html utan webbläsare.
   Syntaxkontroll hittar inte odeklarerade variabler — det gör "use strict"
   vid körning. Därför körs hela skriptet mot en låtsas-DOM. */
const fs = require("fs");
const path = process.argv[2] || "/mnt/user-data/outputs/kora.html";
const html = fs.readFileSync(path, "utf8");
const skript = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const js = skript[skript.length - 1];

let fel = 0;
const anm = t => { console.log("  FEL: " + t); fel++; };

/* 1. Varje element som skriptet hämtar måste finnas */
const idn = new Set([...html.matchAll(/id="([^"]+)"/g)].map(m => m[1]));
for(const m of js.matchAll(/\$\("([^"]+)"\)/g))
  if(!idn.has(m[1])) anm(`$("${m[1]}") men inget element har det id:t`);

/* 2. Kör skriptet i strikt läge mot en låtsas-DOM. Odeklarerade
      variabler kastar ReferenceError direkt. */
function falsktElement(){
  const e = {
    style:{}, dataset:{}, classList:{ add(){}, remove(){} },
    children:[], textContent:"", innerHTML:"", value:"", hidden:false,
    clientWidth:800, clientHeight:600, files:[],
    addEventListener(){}, removeEventListener(){}, appendChild(){},
    setAttribute(){}, getAttribute(){ return null; },
    querySelectorAll(){ return []; }, focus(){}, click(){},
    setPointerCapture(){}, releasePointerCapture(){},
    getContext(){ return falsktRitstift(); }
  };
  return e;
}
function falsktRitstift(){
  const g = {};
  ["clearRect","fillRect","beginPath","moveTo","lineTo","closePath","fill",
   "arc","fillText","createLinearGradient","addColorStop"].forEach(n =>
     g[n] = () => ({ addColorStop(){} }));
  g.createLinearGradient = () => ({ addColorStop(){} });
  return g;
}

global.window = { addEventListener(){}, focus(){}, top:{}, self:{} };
global.window.self = global.window; global.window.top = global.window;
global.document = {
  getElementById: () => falsktElement(),
  createElement: () => falsktElement(),
  body: Object.assign(falsktElement(), { appendChild(){} }),
  addEventListener(){}
};
global.navigator = { onLine:true, clipboard:{ writeText(){ return Promise.resolve(); } } };
global.location = { protocol:"https:", origin:"https://test", hostname:"test" };
global.localStorage = {
  _d:{}, getItem(k){ return this._d[k] || null; },
  setItem(k,v){ this._d[k]=v; }, removeItem(k){ delete this._d[k]; }
};
global.addEventListener = () => {};
global.performance = { now: () => Date.now() };
global.requestAnimationFrame = () => 0;
global.fetch = () => Promise.reject(new TypeError("ingen nät i testet"));
global.AbortController = function(){ this.signal = {}; this.abort = () => {}; };
global.Blob = function(){}; global.URL = { createObjectURL(){}, revokeObjectURL(){} };
global.innerWidth = 800; global.innerHeight = 600; global.devicePixelRatio = 1;

/* Minimal THREE så att scenbyggandet går att köra */
function Vek(){ return { set(){}, lerp(){}, copy(){} }; }
const grupp = () => ({ add(){}, position:{ set(){}, y:0, x:0, z:0, lerp(){} },
  rotation:{ x:0, y:0 }, children:[{},{},{ material:{ color:{ setHex(){} } } }],
  lookAt(){}, bindTooltip(){ return this; } });
global.THREE = new Proxy({
  Scene: function(){ return { add(){}, fog:null, background:null }; },
  Group: grupp, Mesh: grupp, Object3D: grupp,
  Color: function(){ return { setHex(){} }; },
  Vector3: Vek, Clock: function(){ return { getDelta: () => 0.016 }; },
  BufferGeometry: function(){ return { setAttribute(){}, computeVertexNormals(){},
    rotateX(){}, rotateZ(){} }; },
  Float32BufferAttribute: function(){},
  CanvasTexture: function(){ return { needsUpdate:false }; },
  Shape: function(){ return { moveTo(){}, lineTo(){} }; },
  WebGLRenderer: function(){ return { setPixelRatio(){}, setSize(){},
    render(){}, resize(){}, domElement: falsktElement() }; },
  PerspectiveCamera: function(){ return { position: Vek(), lookAt(){},
    updateProjectionMatrix(){}, aspect:1 }; },
  DoubleSide:2, BackSide:1, Fog: function(){}
}, { get(t,p){
  if(p in t) return t[p];
  return function(){ return Object.assign(grupp(), { rotateX(){}, rotateZ(){},
    material:{ color:{ setHex(){} } } }); };
}});

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

/* Leaflet och Mapillary laddas från CDN i webbläsaren */
const lagerMock = () => ({ addTo(){ return lagerMock(); }, clearLayers(){},
  setLatLng(){}, bindTooltip(){ return lagerMock(); }, remove(){} });
global.L = {
  map: () => ({ setView(){ return global.L.map(); }, on(){}, panTo(){},
    getBounds: () => ({ getNorth:()=>59.3, getSouth:()=>59.2,
      getEast:()=>18.1, getWest:()=>18.0, getCenter:()=>({lat:59.25}) }),
    invalidateSize(){}, getCenter:()=>({lat:59.25,lng:18.05}) }),
  tileLayer: lagerMock, layerGroup: lagerMock, circleMarker: lagerMock,
  circle: lagerMock, marker: lagerMock,
  control: { zoom: () => ({ addTo(){} }) }
};
global.mapillary = { Viewer: function(){ return { on(){}, moveTo(){ return Promise.resolve(); },
  getBearing(){ return Promise.resolve(0); }, resize(){} }; } };

console.log("Kör skriptet i strikt läge…");
try{
  new Function('"use strict";\n' + js)();
  console.log("  inga odeklarerade variabler vid start");
}catch(e){
  anm(e.name + ": " + e.message);
}

console.log(fel === 0 ? "\nKONTROLL GODKÄND" : `\n${fel} FEL HITTADE`);
process.exit(fel ? 1 : 0);
