/**
 * FACTORY DE COMPONENTES MODULARES (Sprite Sheet 3D Isométrico)
 * Piezas reutilizables con base circular escalonada UNCo, columnas,
 * mecanismos de inclinación, atriles y artefactos para cada filmina.
 */
import * as k from "../kit/iso-kit.mjs";

export const PIVOT_Z = 106;
export const NOMINAL_TILT = 32 * (Math.PI / 180);

// ─────────────────────────────────────────────────────────────────────────────
// 1. UTILIDADES VECTORIALES 3D
// ─────────────────────────────────────────────────────────────────────────────
export const sub3 = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
export const add3 = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
export const mul3 = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
export const dot3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
export const cross3 = (a, b) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0]
];
export const len3 = (a) => Math.hypot(a[0], a[1], a[2]);
export const unit3 = (a) => {
  const l = len3(a) || 1;
  return [a[0] / l, a[1] / l, a[2] / l];
};
export const bandOf = (score) => {
  const BANDS = [0, 0.2, 0.42, 0.62];
  let t = 0;
  while (t < BANDS.length && score >= BANDS[t]) t++;
  return t;
};

// Transforma coordenadas locales [x, yL, zL] a coordenadas mundo con inclinación theta
export function toWorldDesk(x, yL, zL, theta, pivotZ = PIVOT_Z) {
  const cosT = Math.cos(theta);
  const sinT = Math.sin(theta);
  const y = yL * cosT + zL * sinT;
  const z = pivotZ - yL * sinT + zL * cosT;
  return [x, y, z];
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. RENDERIZADORES 3D GENÉRICOS (Con Culling de Caras Ocultas y Sombrado)
// ─────────────────────────────────────────────────────────────────────────────
export function renderFace(points3D, P, view, light, { tone = "hi", lit = false, isTop = false, customClass = "" } = {}) {
  const v1 = sub3(points3D[1], points3D[0]);
  const v2 = sub3(points3D[2], points3D[0]);
  const n = unit3(cross3(v1, v2));

  // Backface culling: ¿mira hacia el observador?
  const facing = dot3(n, view);
  if (facing <= 0.0001) return "";

  const pts = points3D.map(p => k.iso(p, P));
  const pathD = k.pathOf(pts, true);

  let fillTone = tone;
  let shadeIndex = 1;
  if (!isTop) {
    const score = dot3(n, light);
    shadeIndex = bandOf(score);
  }

  const litAttr = lit ? ' data-lit=""' : "";
  const toneAttr = ` data-tone="${fillTone}"`;
  const classAttr = customClass ? ` class="iso-solid ${customClass}"` : ' class="iso-solid"';

  let inner = "";
  if (isTop) {
    inner = `<path class="iso-top" d="${pathD}"/><path class="iso-line iso-edge" data-tone="${fillTone}" d="${pathD}"/>`;
  } else {
    inner = `<path class="iso-shade" data-shade="${shadeIndex}" d="${pathD}"/><path class="iso-line iso-edge" data-tone="${fillTone}" d="${pathD}"/>`;
  }

  return `<g${classAttr}${toneAttr}${litAttr}><path class="iso-fill" d="${pathD}"/>${inner}</g>`;
}

export function renderLocalBox(x0, x1, y0, y1, z0, z1, toWorldFn, P, view, light, options = {}) {
  const c = [
    toWorldFn(x0, y0, z0),
    toWorldFn(x1, y0, z0),
    toWorldFn(x1, y1, z0),
    toWorldFn(x0, y1, z0),
    toWorldFn(x0, y0, z1),
    toWorldFn(x1, y0, z1),
    toWorldFn(x1, y1, z1),
    toWorldFn(x0, y1, z1),
  ];

  const faces = [
    { pts: [c[4], c[5], c[6], c[7]], isTop: true },
    { pts: [c[3], c[2], c[1], c[0]], isTop: false },
    { pts: [c[0], c[1], c[5], c[4]], isTop: false },
    { pts: [c[2], c[3], c[7], c[6]], isTop: false },
    { pts: [c[0], c[4], c[7], c[3]], isTop: false },
    { pts: [c[1], c[2], c[6], c[5]], isTop: false },
  ];

  const sorted = faces
    .map((f) => {
      const center = mul3(add3(add3(f.pts[0], f.pts[1]), add3(f.pts[2], f.pts[3])), 0.25);
      return { ...f, depth: k.depthOf(center, P) };
    })
    .sort((a, b) => a.depth - b.depth);

  return sorted.map((f) => renderFace(f.pts, P, view, light, { ...options, isTop: f.isTop })).join("");
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. PIEZAS MODULARES DEL CATÁLOGO ("SPRITE SHEET")
// ─────────────────────────────────────────────────────────────────────────────

/**
 * PIEZA 1: Base Circular Escalonada (Podio UNCo como en la foto del usuario)
 * - Disco inferior azul oscuro UNCo
 * - Escalón superior blanco mármol con bisel suave
 * - Collarín central de bronce dorado
 * - Puntos de fijación circular
 */
export function baseCircularPodio(P, {
  radioPlinto = 68,
  altoPlinto = 8,
  radioPodio = 60,
  altoPodio = 8,
  biselPodio = 2.0,
  radioCollar = 15,
  altoCollar = 2.5
} = {}) {
  const out = [];

  // Sombra halo bajo la base circular
  const shadowRadius = radioPlinto + 6;
  const shadowPts = k.circleRing(0, 0, shadowRadius, 48).map(pt => k.iso([pt[0], pt[1], -altoPlinto], P));
  out.push(`<path class="iso-halo" d="${k.pathOf(shadowPts, true)}"/>`);

  // 1. Plinto inferior: Disco de base Azul Marino UNCo
  out.push(k.solidSvg(k.cylinder(0, 0, radioPlinto, -altoPlinto, altoPlinto, P, 48, 0.6), {
    className: "tfg-base-plinth",
    tone: "mid"
  }));
  out.push(k.lineSvg(k.ring(0, 0, radioPlinto - 1.2, 0, P, 36), { tone: "faint" }));

  // 2. Podio superior: Escalón de mármol marfil biselado
  out.push(k.solidSvg(k.cylinder(0, 0, radioPodio, 0, altoPodio, P, 48, biselPodio), {
    className: "tfg-base-podium",
    tone: "hi"
  }));
  out.push(k.lineSvg(k.ring(0, 0, radioPodio - biselPodio - 2, altoPodio, P, 36), { tone: "faint" }));

  // 3. Anillo collarín central: Bronce dorado
  out.push(k.solidSvg(k.cylinder(0, 0, radioCollar, altoPodio, altoCollar, P, 36, 0.4), {
    className: "tfg-brass",
    tone: "lit"
  }));
  out.push(k.lineSvg(k.ring(0, 0, radioCollar, altoPodio + altoCollar, P, 24), { tone: "lit" }));

  // 4. Ocho pernos micrométricos en el escalón de mármol
  const bolts = [];
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4;
    bolts.push(k.iso([(radioPodio - 7) * Math.cos(a), (radioPodio - 7) * Math.sin(a), altoPodio], P));
  }
  out.push(k.dotsSvg(bolts, { size: 0.45, tone: "mid" }));

  return out.join("");
}

/**
 * PIEZA 2: Columna Central & Trunnion Yoke (Horquilla de elevación)
 */
export function columnaElevacion(P, currentTilt = NOMINAL_TILT, { zBase = 10.5 } = {}) {
  const out = [];

  // Brida de fijación inferior
  out.push(k.solidSvg(k.cylinder(0, 0, 26, zBase, 4, P, 40, 0.6), { className: "tfg-brass", tone: "mid" }));
  out.push(k.lineSvg(k.ring(0, 0, 22, zBase + 4, P, 32), { tone: "lo" }));

  // Columna inferior estriada
  out.push(k.solidSvg(k.cylinder(0, 0, 18, zBase + 4, 26, P, 36), { tone: "mid" }));
  out.push(k.lineSvg(k.sideArc(0, 0, 18, zBase + 12, P, 24), { tone: "faint" }));
  out.push(k.lineSvg(k.sideArc(0, 0, 18, zBase + 24, P, 24), { tone: "faint" }));

  // Estrías orientadas a la cámara dinámica
  const radA = (P.azimuth * Math.PI) / 180;
  for (let i = -3; i <= 3; i++) {
    const a = radA + (i * Math.PI) / 9;
    const x = 18 * Math.sin(a);
    const y = -18 * Math.cos(a);
    out.push(k.lineSvg(k.rise([x, y], zBase + 6, zBase + 28, P), { tone: "faint" }));
  }

  // Collarín telescópico con perilla moleteada
  out.push(k.solidSvg(k.cylinder(0, 0, 22, zBase + 30, 6, P, 40), { tone: "mid" }));
  out.push(k.lineSvg(k.knurl(0, 0, 22, zBase + 30, zBase + 36, 40, P), { tone: "lo" }));

  // Columna superior extensible con escalas vernier
  out.push(k.solidSvg(k.cylinder(0, 0, 15, zBase + 36, 36, P, 32), { tone: "mid" }));
  for (let z = zBase + 40; z <= zBase + 68; z += 4) {
    const isMajor = ((z - zBase - 40) % 12 === 0);
    out.push(k.lineSvg(k.sideArc(0, 0, 15, z, P, isMajor ? 16 : 8), { tone: isMajor ? "mid" : "lo" }));
  }

  // Cabezal y viga de horquilla horizontal
  const zHead = zBase + 72;
  out.push(k.solidSvg(k.cylinder(0, 0, 20, zHead, 5, P, 36, 0.6), { tone: "mid" }));
  out.push(k.solidSvg(k.slabOf({ x: -32, y: -11, w: 64, d: 22, r: 3 }, zHead + 5, 8, P, 4, 0.8), { tone: "mid" }));

  // Brazos verticales izquierdo y derecho
  out.push(k.solidSvg(k.slabOf({ x: -34, y: -6.5, w: 6, d: 13, r: 2.5 }, zHead + 13, 22, P, 4, 0.6), { tone: "mid" }));
  out.push(k.solidSvg(k.slabOf({ x: 28, y: -6.5, w: 6, d: 13, r: 2.5 }, zHead + 13, 22, P, 4, 0.6), { tone: "mid" }));

  // Bujes de eje y volante de regulación angular
  out.push(k.solidSvg(k.cylinder(-34, 0, 4.5, PIVOT_Z - 4.5, 9, P, 20), { tone: "lo" }));
  out.push(k.solidSvg(k.cylinder(31, 0, 8, PIVOT_Z - 3, 6, P, 28), { tone: "mid" }));
  out.push(k.lineSvg(k.knurl(31, 0, 8, PIVOT_Z - 3, PIVOT_Z + 3, 32, P), { tone: "lo" }));

  // Cuadrante graduado angular (15° a 50°) y aguja indicadora
  const quadCenter = [-31, 0, PIVOT_Z];
  const quadRadius = 24;
  let quadPath = "";
  for (let deg = 15; deg <= 50; deg += 2) {
    const rad = deg * (Math.PI / 180);
    const r0 = (deg % 10 === 0) ? quadRadius - 5 : quadRadius - 2.5;
    const r1 = quadRadius;
    const y0 = r0 * Math.sin(rad);
    const z0 = -r0 * Math.cos(rad);
    const y1 = r1 * Math.sin(rad);
    const z1 = -r1 * Math.cos(rad);
    const p0 = k.iso([quadCenter[0], quadCenter[1] + y0, quadCenter[2] + z0], P);
    const p1 = k.iso([quadCenter[0], quadCenter[1] + y1, quadCenter[2] + z1], P);
    quadPath += `M${p0[0]} ${p0[1]} L${p1[0]} ${p1[1]} `;
  }
  out.push(`<path class="iso-line" data-tone="lo" d="${quadPath}"/>`);

  const ptrY = (quadRadius - 1) * Math.sin(currentTilt);
  const ptrZ = -(quadRadius - 1) * Math.cos(currentTilt);
  const pA = k.iso([quadCenter[0] - 2, 0, PIVOT_Z], P);
  const pB = k.iso([quadCenter[0] - 2, ptrY, PIVOT_Z + ptrZ], P);
  out.push(`<path class="iso-line" data-tone="lit" style="stroke-width:1.4px" d="M${pA[0]} ${pA[1]} L${pB[0]} ${pB[1]}"/>`);

  return out.join("");
}

/**
 * PIEZA 3: Tablero de Atril de Madera Noble con Reborde de Bronce
 */
export function atrilTablero(theta, P, view, light) {
  const out = [];
  const toWorld = (x, yL, zL) => toWorldDesk(x, yL, zL, theta);

  // Tablero de caoba noble
  out.push(renderLocalBox(-66, 66, -46, 46, 0, 4, toWorld, P, view, light, { tone: "mid", customClass: "tfg-wood" }));

  // Cantoneras de bronce en las 4 esquinas
  for (const sx of [-1, 1]) {
    for (const sy of [-1, 1]) {
      const cx = sx * 63;
      const cy = sy * 43;
      const p = k.iso(toWorld(cx - sx * 3, cy - sy * 3, 4.2), P);
      out.push(k.dotsSvg([p], { size: 0.45, tone: "lit" }));
    }
  }

  // Repisa frontal de retención en bronce dorado con reborde
  out.push(renderLocalBox(-66, -10, 41, 46, 4, 11, toWorld, P, view, light, { tone: "hi", lit: true, customClass: "tfg-brass" }));
  out.push(renderLocalBox(10, 66, 41, 46, 4, 11, toWorld, P, view, light, { tone: "hi", lit: true, customClass: "tfg-brass" }));
  out.push(renderLocalBox(-10, 10, 44, 46, 4, 7, toWorld, P, view, light, { tone: "mid", customClass: "tfg-brass" }));

  return out.join("");
}

/**
 * ARTEFACTO FILMINA 1: El Gran Tomo Encuadernado de Tesina (TFG CURZAS UNCo)
 */
export function tomoTesina(theta, pageFlip, P, view, light) {
  const out = [];
  const toWorld = (x, yL, zL) => toWorldDesk(x, yL, zL, theta);
  const at = (pt) => k.iso(pt, P);

  // Tapas duras en cuero Azul UNCo
  out.push(renderLocalBox(-59, -3, -40, 40, 4, 6.5, toWorld, P, view, light, { tone: "lo", customClass: "tfg-leather" }));
  out.push(renderLocalBox(3, 59, -40, 40, 4, 6.5, toWorld, P, view, light, { tone: "lo", customClass: "tfg-leather" }));

  // Lomo con 4 nervios dorados en relieve
  out.push(renderLocalBox(-3.5, 3.5, -40.5, 40.5, 4, 7.5, toWorld, P, view, light, { tone: "lo", customClass: "tfg-leather" }));
  for (let y = -28; y <= 28; y += 18) {
    out.push(renderLocalBox(-3.8, 3.8, y - 1.2, y + 1.2, 7.2, 8.4, toWorld, P, view, light, { tone: "mid", customClass: "tfg-gold" }));
  }

  // Cantos dorados de hojas densas
  out.push(renderLocalBox(-57, -3, -39, 39, 6.5, 12, toWorld, P, view, light, { tone: "mid", customClass: "tfg-gilt" }));
  out.push(renderLocalBox(3, 57, -39, 39, 6.5, 12, toWorld, P, view, light, { tone: "mid", customClass: "tfg-gilt" }));

  // Folios abiertos de pergamino marfil
  const leftPageZ = 12.2;
  out.push(renderLocalBox(-55, -2, -37, 37, 12, 12.6, toWorld, P, view, light, { tone: "hi", customClass: "tfg-page" }));

  // Medallón dorado sello UNCo
  const sealCenter = toWorld(-28, -24, leftPageZ + 0.3);
  out.push(k.dotsSvg([at(sealCenter)], { size: 1.6, tone: "lit" }));
  const sealP0 = at(toWorld(-32, -24, leftPageZ + 0.3));
  const sealP1 = at(toWorld(-24, -24, leftPageZ + 0.3));
  out.push(`<path class="iso-line tfg-gold-line" data-tone="lit" d="M${sealP0[0]} ${sealP0[1]} A 4 4 0 1 0 ${sealP1[0]} ${sealP1[1]} A 4 4 0 1 0 ${sealP0[0]} ${sealP0[1]}"/>`);

  // Líneas académicas de manuscrito
  const line1A = at(toWorld(-48, -14, leftPageZ + 0.3));
  const line1B = at(toWorld(-8, -14, leftPageZ + 0.3));
  out.push(`<path class="iso-line" data-tone="hi" data-free="" style="stroke-width:1.3px" d="M${line1A[0]} ${line1A[1]} L${line1B[0]} ${line1B[1]}"/>`);

  for (let y = -2; y <= 30; y += 3.8) {
    const wLen = (y === 30) ? 22 : 38;
    const pa = at(toWorld(-48, y, leftPageZ + 0.3));
    const pb = at(toWorld(-48 + wLen, y, leftPageZ + 0.3));
    out.push(`<path class="iso-line" data-tone="lo" data-free="" d="M${pa[0]} ${pa[1]} L${pb[0]} ${pb[1]}"/>`);
  }

  // Página derecha con elevación dinámica al hojear
  const rightPageLift = pageFlip * 8;
  const rightPageZ = 12.2 + rightPageLift;
  out.push(renderLocalBox(2, 55, -37, 37, 12, 12.6 + pageFlip * 2.5, toWorld, P, view, light, { tone: "hi", customClass: "tfg-page" }));

  for (let y = -20; y <= 26; y += 4.0) {
    const wLen = (y === 26) ? 26 : 38;
    const pa = at(toWorld(8, y, rightPageZ + 0.3));
    const pb = at(toWorld(8 + wLen, y, rightPageZ + 0.3));
    out.push(`<path class="iso-line" data-tone="lo" data-free="" d="M${pa[0]} ${pa[1]} L${pb[0]} ${pb[1]}"/>`);
  }

  // Cinta ceremonial de raso dorado
  const ribbonPts = [
    toWorld(0, -42, 10),
    toWorld(1, -30, 13.2),
    toWorld(2, -12, 13.5),
    toWorld(3, 10, 13.5),
    toWorld(2, 36, 13.5),
    toWorld(0, 48, 9),
    toWorld(0, 56, 1),
    toWorld(-1, 64, -8),
  ];
  const ribbonScreen = ribbonPts.map(at);
  let ribbonPath = `M${ribbonScreen[0][0]} ${ribbonScreen[0][1]} `;
  for (let i = 1; i < ribbonScreen.length; i++) {
    ribbonPath += `L${ribbonScreen[i][0]} ${ribbonScreen[i][1]} `;
  }
  out.push(`<path class="iso-line tfg-ribbon" d="${ribbonPath}"/>`);
  out.push(k.dotsSvg([ribbonScreen[ribbonScreen.length - 1]], { size: 0.65, tone: "lit" }));

  return out.join("");
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. CSS COMPARTIDO DE PALETA ACADÉMICA UNCo
// ─────────────────────────────────────────────────────────────────────────────
export const FACTORY_CSS = `
/* Cuero Encuadernado Azul UNCo */
.tfg-leather > .iso-fill { fill: #0a192f; }
.tfg-leather > .iso-top { fill: #132a4e; }
.tfg-leather > .iso-shade[data-shade="0"] { fill: #061120; }
.tfg-leather > .iso-shade[data-shade="1"] { fill: #0b1c36; }
.tfg-leather > .iso-shade[data-shade="2"] { fill: #102444; }
.tfg-leather > .iso-shade[data-shade="3"] { fill: #17325c; }

body[data-theme="light"] .tfg-leather > .iso-fill,
.iso[data-theme="light"] .tfg-leather > .iso-fill { fill: #12305a; }
body[data-theme="light"] .tfg-leather > .iso-top,
.iso[data-theme="light"] .tfg-leather > .iso-top { fill: #1f4782; }
body[data-theme="light"] .tfg-leather > .iso-shade[data-shade="0"],
.iso[data-theme="light"] .tfg-leather > .iso-shade[data-shade="0"] { fill: #0a1e3b; }
body[data-theme="light"] .tfg-leather > .iso-shade[data-shade="1"],
.iso[data-theme="light"] .tfg-leather > .iso-shade[data-shade="1"] { fill: #102b52; }
body[data-theme="light"] .tfg-leather > .iso-shade[data-shade="2"],
.iso[data-theme="light"] .tfg-leather > .iso-shade[data-shade="2"] { fill: #163768; }
body[data-theme="light"] .tfg-leather > .iso-shade[data-shade="3"],
.iso[data-theme="light"] .tfg-leather > .iso-shade[data-shade="3"] { fill: #1c447f; }

/* Base Plinto Circular Azul UNCo */
.tfg-base-plinth > .iso-fill { fill: #0f2d59; }
.tfg-base-plinth > .iso-top { fill: #1b4582; }
.tfg-base-plinth > .iso-shade[data-shade="0"] { fill: #071730; }
.tfg-base-plinth > .iso-shade[data-shade="1"] { fill: #0a2144; }
.tfg-base-plinth > .iso-shade[data-shade="2"] { fill: #0f2d59; }
.tfg-base-plinth > .iso-shade[data-shade="3"] { fill: #153c75; }

/* Base Podio Superior de Mármol Blanco Biselado */
.tfg-base-podium > .iso-fill { fill: #ffffff; }
.tfg-base-podium > .iso-top { fill: #fafafa; }
.tfg-base-podium > .iso-shade[data-shade="0"] { fill: #e2e8f0; }
.tfg-base-podium > .iso-shade[data-shade="1"] { fill: #edf2f7; }
.tfg-base-podium > .iso-shade[data-shade="2"] { fill: #f8fafc; }
.tfg-base-podium > .iso-shade[data-shade="3"] { fill: #ffffff; }

/* Hojas de Pergamino Marfil */
.tfg-page > .iso-fill { fill: #202025; }
.tfg-page > .iso-top { fill: #2a2a30; }
.tfg-page > .iso-shade[data-shade="0"] { fill: #17171a; }
.tfg-page > .iso-shade[data-shade="1"] { fill: #1d1d22; }
.tfg-page > .iso-shade[data-shade="2"] { fill: #232328; }
.tfg-page > .iso-shade[data-shade="3"] { fill: #28282e; }

body[data-theme="light"] .tfg-page > .iso-fill,
.iso[data-theme="light"] .tfg-page > .iso-fill { fill: #faf8f5 !important; }
body[data-theme="light"] .tfg-page > .iso-top,
.iso[data-theme="light"] .tfg-page > .iso-top { fill: #ffffff !important; }
body[data-theme="light"] .tfg-page > .iso-shade[data-shade="0"],
.iso[data-theme="light"] .tfg-page > .iso-shade[data-shade="0"] { fill: #ede7dc !important; }
body[data-theme="light"] .tfg-page > .iso-shade[data-shade="1"],
.iso[data-theme="light"] .tfg-page > .iso-shade[data-shade="1"] { fill: #f2eee5 !important; }
body[data-theme="light"] .tfg-page > .iso-shade[data-shade="2"],
.iso[data-theme="light"] .tfg-page > .iso-shade[data-shade="2"] { fill: #f6f3ed !important; }
body[data-theme="light"] .tfg-page > .iso-shade[data-shade="3"],
.iso[data-theme="light"] .tfg-page > .iso-shade[data-shade="3"] { fill: #faf8f5 !important; }

/* Madera Noble */
.tfg-wood > .iso-fill { fill: #4a3328; }
.tfg-wood > .iso-top { fill: #654637; }
.tfg-wood > .iso-shade[data-shade="0"] { fill: #36241b; }
.tfg-wood > .iso-shade[data-shade="1"] { fill: #422d22; }
.tfg-wood > .iso-shade[data-shade="2"] { fill: #54392b; }
.tfg-wood > .iso-shade[data-shade="3"] { fill: #5e4131; }

/* Bronce / Oro Pulido */
.tfg-brass > .iso-fill { fill: #c89632; }
.tfg-brass > .iso-top { fill: #ecc468; }
.tfg-brass > .iso-shade[data-shade="0"] { fill: #8a651a; }
.tfg-brass > .iso-shade[data-shade="1"] { fill: #a57c24; }
.tfg-brass > .iso-shade[data-shade="2"] { fill: #be902d; }
.tfg-brass > .iso-shade[data-shade="3"] { fill: #d8a63c; }

/* Cantos Dorados */
.tfg-gilt > .iso-fill { fill: #d4af37; }
.tfg-gilt > .iso-top { fill: #f3e5ab; }
.tfg-gilt > .iso-shade[data-shade="0"] { fill: #8c7322; }
.tfg-gilt > .iso-shade[data-shade="1"] { fill: #b2932f; }
.tfg-gilt > .iso-shade[data-shade="2"] { fill: #c5a435; }
.tfg-gilt > .iso-shade[data-shade="3"] { fill: #e0be42; }

/* Cinta Dorada */
.tfg-ribbon {
  fill: none;
  stroke: #e6b422;
  stroke-width: 2.4px;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.tfg-gold-line {
  fill: none;
  stroke: #ecc468;
  stroke-width: 1.4px;
}
`;

// Serialización de piezas para el runtime del cliente (rotación 360°, inclinación interactiva)
export const PIECES_CLIENT_CODE = `
${baseCircularPodio.toString()}
${columnaElevacion.toString()}
${atrilTablero.toString()}
${tomoTesina.toString()}
`;

