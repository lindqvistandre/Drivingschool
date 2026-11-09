/* Låtsas-webbläsare som både kontrollera.js och tester.js använder.
   Ligger i en egen fil så att de två verktygen inte kan glida isär. */
module.exports.stall = function(G){
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

G.window = { addEventListener(){}, focus(){}, top:{}, self:{} };
G.window.self = G.window; G.window.top = G.window;
G.document = {
  getElementById: () => falsktElement(),
  createElement: () => falsktElement(),
  body: Object.assign(falsktElement(), { appendChild(){} }),
  addEventListener(){}
};
G.navigator = { onLine:true, clipboard:{ writeText(){ return Promise.resolve(); } } };
G.location = { protocol:"https:", origin:"https://test", hostname:"test" };
G.localStorage = {
  _d:{}, getItem(k){ return this._d[k] || null; },
  setItem(k,v){ this._d[k]=v; }, removeItem(k){ delete this._d[k]; }
};
G.addEventListener = () => {};
G.performance = { now: () => Date.now() };
G.requestAnimationFrame = () => 0;
G.fetch = () => Promise.reject(new TypeError("ingen nät i testet"));
G.AbortController = function(){ this.signal = {}; this.abort = () => {}; };
G.Blob = function(){}; G.URL = { createObjectURL(){}, revokeObjectURL(){} };
G.innerWidth = 800; G.innerHeight = 600; G.devicePixelRatio = 1;

/* Minimal THREE så att scenbyggandet går att köra */
function Vek(){ return { set(){}, lerp(){}, copy(){} }; }
const grupp = () => ({ add(){}, position:{ set(){}, y:0, x:0, z:0, lerp(){} },
  rotation:{ x:0, y:0 }, children:[{},{},{ material:{ color:{ setHex(){} } } }],
  lookAt(){}, bindTooltip(){ return this; } });
G.THREE = new Proxy({
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


/* Leaflet och Mapillary laddas från CDN i webbläsaren */
const lagerMock = () => ({ addTo(){ return lagerMock(); }, clearLayers(){},
  setLatLng(){}, bindTooltip(){ return lagerMock(); }, remove(){} });
G.L = {
  map: () => ({ setView(){ return G.L.map(); }, on(){}, panTo(){},
    getBounds: () => ({ getNorth:()=>59.3, getSouth:()=>59.2,
      getEast:()=>18.1, getWest:()=>18.0, getCenter:()=>({lat:59.25}) }),
    invalidateSize(){}, getCenter:()=>({lat:59.25,lng:18.05}) }),
  tileLayer: lagerMock, layerGroup: lagerMock, circleMarker: lagerMock,
  circle: lagerMock, marker: lagerMock,
  control: { zoom: () => ({ addTo(){} }) }
};
G.mapillary = { Viewer: function(){ return { on(){}, moveTo(){ return Promise.resolve(); },
  getBearing(){ return Promise.resolve(0); }, resize(){} }; } };


  try{ require("/mnt/user-data/outputs/fragebank.js"); }catch(e){}
};
