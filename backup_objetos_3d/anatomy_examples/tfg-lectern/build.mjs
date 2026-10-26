import { existsSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "../../kit/iso-kit.mjs";
import { kitScript } from "../../scripts/inline-kit.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const theme = process.argv.includes("--light") ? "light" : "dark";

const WIDTH = 640;
const HEIGHT = 500;
const AZIMUTH = 42;
const ELEVATION = 30;

// Plinth base dimensions
const PLATE = { x: -110, y: -90, w: 220, d: 180, r: 9 };
const PLATE_H = 12;
const FOOT_H = 6;

// Pedestal and pivot
const PIVOT_Z = 106;
const NOMINAL_TILT = 32 * (Math.PI / 180);

const P = k.fitProjection(
  [
    ...k.boxCorners(PLATE, -PLATE_H - FOOT_H, 0),
    [-70, -60, PIVOT_Z + 55],
    [70, 60, PIVOT_Z + 55],
    [0, 0, PIVOT_Z + 70]
  ],
  WIDTH,
  HEIGHT,
  { pad: 26, azimuth: AZIMUTH, elevation: ELEVATION }
);

// ─────────────────────────────────────────────────────────────────────────────
// Pure Vector Math (Shared seamlessly between Node.js and Browser)
// ─────────────────────────────────────────────────────────────────────────────
const sub3 = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const add3 = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const mul3 = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
const dot3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross3 = (a, b) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0]
];
const len3 = (a) => Math.hypot(a[0], a[1], a[2]);
const unit3 = (a) => {
  const l = len3(a) || 1;
  return [a[0] / l, a[1] / l, a[2] / l];
};
const bandOf = (score) => {
  const BANDS = [0, 0.2, 0.42, 0.62];
  let t = 0;
  while (t < BANDS.length && score >= BANDS[t]) t++;
  return t;
};

// Isometric view and light vectors
const radA = (AZIMUTH * Math.PI) / 180;
const radE = (ELEVATION * Math.PI) / 180;
const view = [Math.cos(radA) * Math.cos(radE), Math.sin(radA) * Math.cos(radE), Math.sin(radE)];
const light = unit3([-Math.sin(radA), Math.cos(radA), 1.2]);

const at = (point) => k.iso(point, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (points, style) => k.dotsSvg(points, style);
const byDepth = (points) => [...points].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));

// ─────────────────────────────────────────────────────────────────────────────
// 1. BASE PLINTH & MOUNTING (Static Foundation)
// ─────────────────────────────────────────────────────────────────────────────
function basePlinth() {
  const out = [];
  out.push(`<path class="iso-halo" d="${k.haloOf(PLATE, -PLATE_H - FOOT_H, PLATE_H, P)}"/>`);

  // 4 turned anti-vibration brass feet
  for (const [x, y] of byDepth(k.corners(PLATE, 22))) {
    out.push(S(k.cylinder(x, y, 8, -PLATE_H - FOOT_H, 2, P, 28), { tone: "lo" }));
    out.push(S(k.cylinder(x, y, 6, -PLATE_H - FOOT_H + 2, FOOT_H - 2, P, 28), { tone: "mid" }));
    out.push(L(k.ring(x, y, 6, -PLATE_H, P, 20), { tone: "lo" }));
  }

  // Heavy beveled plinth slab
  out.push(S(k.slabOf(PLATE, -PLATE_H, PLATE_H, P, 8, 1.8), { tone: "lo" }));
  out.push(L(k.planOutline(k.insetPlan(PLATE, 5.5), 0, P), { tone: "faint" }));

  // 4 corner socket screws with counterbore rings
  const screws = k.corners(PLATE, 10);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.4, 0, P, 16)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.5, tone: "mid" }));

  // Front engraved dedication plate: CURZAS • UNCo — TFG-SIA-2024
  const strip = { x: -75, y: PLATE.y + PLATE.d - 18, w: 150, d: 11, r: 1.5 };
  out.push(S(k.slabOf(strip, 0, 0.8, P, 3), { tone: "mid", crease: "none" }));
  out.push(L(k.planOutline(k.insetPlan(strip, 1.2), 0.8, P), { tone: "faint" }));
  out.push(k.faceTextSvg(k.topMatrix([strip.x + 10, strip.y + 7.5], 0.8, P, "x"), "CURZAS • UNCo — TFG-SIA-2024", { size: 3.4, tone: "hi" }));
  out.push(D([at([strip.x + 3.5, strip.y + 5.5, 0.8]), at([strip.x + strip.w - 3.5, strip.y + 5.5, 0.8])], { size: 0.42, tone: "hi" }));

  // Front millimeter ruler strip with graduation ticks
  const ruler = { x: -95, y: PLATE.y + PLATE.d - 5.5, w: 190, d: 4, r: 0.8 };
  out.push(S(k.slabOf(ruler, 0, 0.6, P, 2), { tone: "lo", crease: "none" }));
  const ticks = k.topTicks(ruler.x + 4, ruler.x + ruler.w - 4, 3, 5, ruler.y + 0.6, 0.6, [1.6, 3.0], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  out.push(D([at([ruler.x + 2, ruler.y + 2, 0.6]), at([ruler.x + ruler.w - 2, ruler.y + 2, 0.6])], { size: 0.4, tone: "lo" }));

  return out.join("");
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. PEDESTAL & ELEVATION COLUMN (Turned Column & Trunnion Yoke)
// ─────────────────────────────────────────────────────────────────────────────
function pedestal(currentTilt = NOMINAL_TILT) {
  const out = [];

  // Pedestal base mounting flange
  out.push(S(k.cylinder(0, 0, 36, 0, 4.5, P, 48, 0.8), { tone: "mid" }));
  out.push(L(k.ring(0, 0, 29, 4.5, P, 36), { tone: "lo" }));
  const boltPts = [];
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4;
    boltPts.push(at([29 * Math.cos(a), 29 * Math.sin(a), 4.5]));
  }
  out.push(D(boltPts, { size: 0.46, tone: "hi" }));

  // Lower fluted pedestal column
  out.push(S(k.cylinder(0, 0, 20, 4.5, 29.5, P, 36), { tone: "mid" }));
  out.push(L(k.sideArc(0, 0, 20, 15, P, 24), { tone: "faint" }));
  out.push(L(k.sideArc(0, 0, 20, 27, P, 24), { tone: "faint" }));
  const radA = (P.azimuth * Math.PI) / 180;
  for (let i = -3; i <= 3; i++) {
    const a = radA + (i * Math.PI) / 9;
    const x = 20 * Math.sin(a);
    const y = -20 * Math.cos(a);
    out.push(L(k.rise([x, y], 6.5, 32, P), { tone: "faint" }));
  }

  // Intermediate telescopic locking collar with knurled thumbwheel
  out.push(S(k.cylinder(0, 0, 24, 34, 6, P, 40), { tone: "mid" }));
  out.push(L(k.knurl(0, 0, 24, 34, 40, 40, P), { tone: "lo" }));
  out.push(L(k.sideArc(0, 0, 24, 37, P, 32), { tone: "faint" }));

  // Upper extension column with height vernier graduation ticks
  out.push(S(k.cylinder(0, 0, 16, 40, 38, P, 32), { tone: "mid" }));
  for (let z = 44; z <= 76; z += 4) {
    const isMajor = (z - 44) % 12 === 0;
    out.push(L(k.sideArc(0, 0, 16, z, P, isMajor ? 18 : 10), { tone: isMajor ? "mid" : "lo" }));
  }

  // Top head collar
  out.push(S(k.cylinder(0, 0, 22, 78, 5, P, 36, 0.6), { tone: "mid" }));
  out.push(L(k.ring(0, 0, 20, 83, P, 32), { tone: "lo" }));

  // Horizontal yoke beam (supporting the trunnions)
  out.push(S(k.slabOf({ x: -32, y: -11, w: 64, d: 22, r: 3 }, 83, 8, P, 4, 0.8), { tone: "mid" }));
  out.push(D([at([-22, 0, 91]), at([22, 0, 91])], { size: 0.5, tone: "lo" }));

  // Left and right trunnion upright arms
  out.push(S(k.slabOf({ x: -34, y: -6.5, w: 6, d: 13, r: 2.5 }, 91, 24, P, 4, 0.6), { tone: "mid" }));
  out.push(S(k.slabOf({ x: 28, y: -6.5, w: 6, d: 13, r: 2.5 }, 91, 24, P, 4, 0.6), { tone: "mid" }));

  // Left pivot axle boss
  out.push(S(k.cylinder(-34, 0, 4.5, PIVOT_Z - 4.5, 9, P, 20), { tone: "lo" }));
  out.push(D([at([-34, 0, PIVOT_Z + 4.5])], { size: 0.52, tone: "hi" }));

  // Right pivot axle boss & knurled angle adjustment handwheel
  out.push(S(k.cylinder(31, 0, 8, PIVOT_Z - 3, 6, P, 28), { tone: "mid" }));
  out.push(L(k.knurl(31, 0, 8, PIVOT_Z - 3, PIVOT_Z + 3, 32, P), { tone: "lo" }));
  out.push(L(k.ring(31, 0, 5.5, PIVOT_Z + 3, P, 20), { tone: "lo" }));
  out.push(D([at([31, 0, PIVOT_Z + 3])], { size: 0.52, tone: "lit" }));

  // Arched quadrant angle sector under the left arm (degrees 15° to 50°)
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
    const p0 = at([quadCenter[0], quadCenter[1] + y0, quadCenter[2] + z0]);
    const p1 = at([quadCenter[0], quadCenter[1] + y1, quadCenter[2] + z1]);
    quadPath += `M${p0[0]} ${p0[1]} L${p1[0]} ${p1[1]} `;
  }
  out.push(`<path class="iso-line" data-tone="lo" d="${quadPath}"/>`);

  // Brass pointer needle showing current angle
  const ptrY = (quadRadius - 1) * Math.sin(currentTilt);
  const ptrZ = -(quadRadius - 1) * Math.cos(currentTilt);
  const pA = at([quadCenter[0] - 2, 0, PIVOT_Z]);
  const pB = at([quadCenter[0] - 2, ptrY, PIVOT_Z + ptrZ]);
  out.push(`<path class="iso-line" data-tone="lit" style="stroke-width:1.4px" d="M${pA[0]} ${pA[1]} L${pB[0]} ${pB[1]}"/>`);

  return out.join("");
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. TILTING READING DESK & MASTER THESIS TOMO
// ─────────────────────────────────────────────────────────────────────────────

// Transform local desk coords [x, yL, zL] into world 3D space [x, y, z]
function toWorld(x, yL, zL, theta) {
  const cosT = Math.cos(theta);
  const sinT = Math.sin(theta);
  const y = yL * cosT + zL * sinT;
  const z = PIVOT_Z - yL * sinT + zL * cosT;
  return [x, y, z];
}

// Render a single shaded 3D polygon face
function renderFace(points3D, { tone = "hi", lit = false, isTop = false, customClass = "" } = {}) {
  const v1 = sub3(points3D[1], points3D[0]);
  const v2 = sub3(points3D[2], points3D[0]);
  const n = unit3(cross3(v1, v2));

  // Backface culling: facing viewer?
  const facing = dot3(n, view);
  if (facing <= 0.0001) return "";

  const pts = points3D.map(at);
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

// Render a 3D box in desk local space
function renderLocalBox(x0, x1, y0, y1, z0, z1, theta, options = {}) {
  const c = [
    toWorld(x0, y0, z0, theta), // 0: bottom back left
    toWorld(x1, y0, z0, theta), // 1: bottom back right
    toWorld(x1, y1, z0, theta), // 2: bottom front right
    toWorld(x0, y1, z0, theta), // 3: bottom front left
    toWorld(x0, y0, z1, theta), // 4: top back left
    toWorld(x1, y0, z1, theta), // 5: top back right
    toWorld(x1, y1, z1, theta), // 6: top front right
    toWorld(x0, y1, z1, theta), // 7: top front left
  ];

  // Faces definitions with outward normals
  const faces = [
    { pts: [c[4], c[5], c[6], c[7]], isTop: true },  // Top face (+zL)
    { pts: [c[3], c[2], c[1], c[0]], isTop: false }, // Bottom face (-zL)
    { pts: [c[0], c[1], c[5], c[4]], isTop: false }, // Back face (-yL)
    { pts: [c[2], c[3], c[7], c[6]], isTop: false }, // Front face (+yL)
    { pts: [c[0], c[4], c[7], c[3]], isTop: false }, // Left face (-x)
    { pts: [c[1], c[2], c[6], c[5]], isTop: false }, // Right face (+x)
  ];

  // Depth sort faces
  const sorted = faces
    .map((f) => {
      const center = mul3(add3(add3(f.pts[0], f.pts[1]), add3(f.pts[2], f.pts[3])), 0.25);
      return { ...f, depth: k.depthOf(center, P) };
    })
    .sort((a, b) => a.depth - b.depth);

  return sorted.map((f) => renderFace(f.pts, { ...options, isTop: f.isTop })).join("");
}

// The complete tilting desk assembly + great volume of the TFG
function tiltingDeskAssembly(theta = NOMINAL_TILT, pageFlip = 0) {
  const out = [];

  // 1. Reading Desk Mahogany Board (w = 132, d = 92, h = 4)
  out.push(renderLocalBox(-66, 66, -46, 46, 0, 4, theta, { tone: "mid", customClass: "tfg-wood" }));

  // Desk corner brass brackets
  for (const sx of [-1, 1]) {
    for (const sy of [-1, 1]) {
      const cx = sx * 63;
      const cy = sy * 43;
      const p = at(toWorld(cx - sx * 3, cy - sy * 3, 4.2, theta));
      out.push(D([p], { size: 0.45, tone: "lit" }));
    }
  }

  // 2. Brass Lower Retaining Ledge (Repisa de retención con reborde)
  out.push(renderLocalBox(-66, -10, 41, 46, 4, 11, theta, { tone: "hi", lit: true, customClass: "tfg-brass" }));
  out.push(renderLocalBox(10, 66, 41, 46, 4, 11, theta, { tone: "hi", lit: true, customClass: "tfg-brass" }));
  out.push(renderLocalBox(-10, 10, 44, 46, 4, 7, theta, { tone: "mid", customClass: "tfg-brass" }));

  // 3. THE GREAT THESIS VOLUME (El Gran Tomo Encuadernado de Tesina)
  // Hardcover volume in deep UNCo Navy Blue
  out.push(renderLocalBox(-59, -3, -40, 40, 4, 6.5, theta, { tone: "lo", customClass: "tfg-leather" }));
  out.push(renderLocalBox(3, 59, -40, 40, 4, 6.5, theta, { tone: "lo", customClass: "tfg-leather" }));

  // Book Spine (Curved leather spine with 4 raised binding bands)
  out.push(renderLocalBox(-3.5, 3.5, -40.5, 40.5, 4, 7.5, theta, { tone: "lo", customClass: "tfg-leather" }));
  for (let y = -28; y <= 28; y += 18) {
    out.push(renderLocalBox(-3.8, 3.8, y - 1.2, y + 1.2, 7.2, 8.4, theta, { tone: "mid", customClass: "tfg-gold" }));
  }

  // Gilded Page Block Edges (Cantos dorados de hojas densas)
  out.push(renderLocalBox(-57, -3, -39, 39, 6.5, 12, theta, { tone: "mid", customClass: "tfg-gilt" }));
  out.push(renderLocalBox(3, 57, -39, 39, 6.5, 12, theta, { tone: "mid", customClass: "tfg-gilt" }));

  // 4. OPEN PARCHMENT FOLIOS (Hojas de Mármol Marfil / Pergamino)
  const leftPageZ = 12.2;
  out.push(renderLocalBox(-55, -2, -37, 37, 12, 12.6, theta, { tone: "hi", customClass: "tfg-page" }));

  // Left Page: UNCo Gold Seal Medallion at top
  const sealCenter = toWorld(-28, -24, leftPageZ + 0.3, theta);
  out.push(D([at(sealCenter)], { size: 1.6, tone: "lit" }));
  const sealP0 = at(toWorld(-32, -24, leftPageZ + 0.3, theta));
  const sealP1 = at(toWorld(-24, -24, leftPageZ + 0.3, theta));
  out.push(`<path class="iso-line tfg-gold-line" data-tone="lit" d="M${sealP0[0]} ${sealP0[1]} A 4 4 0 1 0 ${sealP1[0]} ${sealP1[1]} A 4 4 0 1 0 ${sealP0[0]} ${sealP0[1]}"/>`);

  // Left Page: Academic Title Inscription Lines (Filetes dorados y texto de tesina)
  // Title: PROYECTO INTEGRAL DE TFG
  const line1A = at(toWorld(-48, -14, leftPageZ + 0.3, theta));
  const line1B = at(toWorld(-8, -14, leftPageZ + 0.3, theta));
  out.push(`<path class="iso-line" data-tone="hi" data-free="" style="stroke-width:1.3px" d="M${line1A[0]} ${line1A[1]} L${line1B[0]} ${line1B[1]}"/>`);

  // Subtitle: CURZAS — Universidad Nacional del Comahue
  const line2A = at(toWorld(-46, -9, leftPageZ + 0.3, theta));
  const line2B = at(toWorld(-10, -9, leftPageZ + 0.3, theta));
  out.push(`<path class="iso-line" data-tone="mid" data-free="" d="M${line2A[0]} ${line2A[1]} L${line2B[0]} ${line2B[1]}"/>`);

  // Simulated academic manuscript lines
  for (let y = -2; y <= 30; y += 3.8) {
    const wLen = (y === 30) ? 22 : 38;
    const pa = at(toWorld(-48, y, leftPageZ + 0.3, theta));
    const pb = at(toWorld(-48 + wLen, y, leftPageZ + 0.3, theta));
    out.push(`<path class="iso-line" data-tone="lo" data-free="" d="M${pa[0]} ${pa[1]} L${pb[0]} ${pb[1]}"/>`);
  }

  // 5. Right Page Block & Dynamic Turning Leaf
  const rightPageLift = pageFlip * 8;
  const rightPageZ = 12.2 + rightPageLift;
  out.push(renderLocalBox(2, 55, -37, 37, 12, 12.6 + pageFlip * 2.5, theta, { tone: "hi", customClass: "tfg-page" }));

  // Right Page: Header & Defense Content
  const rHeaderA = at(toWorld(8, -26, rightPageZ + 0.3, theta));
  const rHeaderB = at(toWorld(48, -26, rightPageZ + 0.3, theta));
  out.push(`<path class="iso-line" data-tone="hi" data-free="" style="stroke-width:1.2px" d="M${rHeaderA[0]} ${rHeaderA[1]} L${rHeaderB[0]} ${rHeaderB[1]}"/>`);

  for (let y = -20; y <= 26; y += 4.0) {
    const wLen = (y === 26) ? 26 : 38;
    const pa = at(toWorld(8, y, rightPageZ + 0.3, theta));
    const pb = at(toWorld(8 + wLen, y, rightPageZ + 0.3, theta));
    out.push(`<path class="iso-line" data-tone="lo" data-free="" d="M${pa[0]} ${pa[1]} L${pb[0]} ${pb[1]}"/>`);
  }
  // Folio number: "1 / 248"
  const folioA = at(toWorld(38, 33, rightPageZ + 0.3, theta));
  const folioB = at(toWorld(48, 33, rightPageZ + 0.3, theta));
  out.push(`<path class="iso-line" data-tone="mid" data-free="" d="M${folioA[0]} ${folioA[1]} L${folioB[0]} ${folioB[1]}"/>`);

  // 6. Left & Right Spring-Loaded Page Retainer Clips (Pisapáginas articulados)
  out.push(renderLocalBox(-54, -48, 30, 44, 11, 13, theta, { tone: "hi", lit: true, customClass: "tfg-brass" }));
  out.push(D([at(toWorld(-51, 41, 13.2, theta))], { size: 0.5, tone: "lit" }));
  out.push(renderLocalBox(48, 54, 30, 44, 11, 13, theta, { tone: "hi", lit: true, customClass: "tfg-brass" }));
  out.push(D([at(toWorld(51, 41, 13.2, theta))], { size: 0.5, tone: "lit" }));

  // 7. Ceremonial Golden Silk Ribbon Bookmark (Cinta de raso áureo)
  const ribbonPts = [
    toWorld(0, -42, 10, theta),
    toWorld(1, -30, 13.2, theta),
    toWorld(2, -12, 13.5, theta),
    toWorld(3, 10, 13.5, theta),
    toWorld(2, 36, 13.5, theta),
    toWorld(0, 48, 9, theta),
    toWorld(0, 56, 1, theta),
    toWorld(-1, 64, -8, theta),
  ];
  const ribbonScreen = ribbonPts.map(at);
  let ribbonPath = `M${ribbonScreen[0][0]} ${ribbonScreen[0][1]} `;
  for (let i = 1; i < ribbonScreen.length; i++) {
    ribbonPath += `L${ribbonScreen[i][0]} ${ribbonScreen[i][1]} `;
  }
  out.push(`<path class="iso-line tfg-ribbon" d="${ribbonPath}"/>`);
  out.push(D([ribbonScreen[ribbonScreen.length - 1]], { size: 0.65, tone: "lit" }));

  return out.join("");
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. CLIENT INTERACTION & MOTION SCRIPT (Spring Physics, Drag & Idle Tour)
// ─────────────────────────────────────────────────────────────────────────────
const liveScript = `
const stage = document.querySelector(".iso-stage");
const svg = stage.querySelector("svg");
const baseGroup = svg.querySelector(".tfg-base-group");
const pedestalGroup = svg.querySelector(".tfg-pedestal-group");
const deskGroup = svg.querySelector(".tfg-desk-group");
const readout = document.querySelector("[data-readout]");
const still = matchMedia("(prefers-reduced-motion: reduce)");

const P = ${JSON.stringify(P)};
const baseScale = P.scale;
const baseOrigin = [...P.origin];
const NOMINAL_TILT = ${NOMINAL_TILT};
const PIVOT_Z = ${PIVOT_Z};
const PLATE = ${JSON.stringify(PLATE)};
const PLATE_H = ${PLATE_H};
const FOOT_H = ${FOOT_H};

const view = ${JSON.stringify(view)};
const light = ${JSON.stringify(light)};

const k = {
  iso,
  pathOf,
  solidSvg,
  lineSvg,
  dotsSvg,
  cylinder,
  ring,
  sideArc,
  rise,
  knurl,
  slabOf,
  depthOf,
  haloOf,
  corners,
  planOutline,
  insetPlan,
  faceTextSvg,
  topMatrix,
  topTicks
};

const sub3 = ${sub3.toString()};
const add3 = ${add3.toString()};
const mul3 = ${mul3.toString()};
const dot3 = ${dot3.toString()};
const cross3 = ${cross3.toString()};
const len3 = ${len3.toString()};
const unit3 = ${unit3.toString()};
const bandOf = ${bandOf.toString()};
const toWorld = ${toWorld.toString()};
${renderFace.toString()}
${renderLocalBox.toString()}
${tiltingDeskAssembly.toString()}
${pedestal.toString()}
${basePlinth.toString()}

const at = (point) => k.iso(point, P);
const D = (points, style) => k.dotsSvg(points, style);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const byDepth = (points) => [...points].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));

// Dynamic 3D Orbit, Tilt, Pan, Zoom State
let currentAzimuth = 42;
let targetAzimuth = 42;
let azimuthVelocity = 0;

let currentTilt = NOMINAL_TILT;
let targetTilt = NOMINAL_TILT;
let tiltVelocity = 0;

let panX = 0;
let panY = 0;
let targetPanX = 0;
let targetPanY = 0;

let zoomScale = 1.0;
let targetZoomScale = 1.0;

let pageFlip = 0;
let targetPageFlip = 0;
let pageVelocity = 0;

let isDragging = false;
let dragMode = "orbit"; // "orbit" | "pan"
let startPointerX = 0;
let startPointerY = 0;
let startAzimuth = 42;
let startTilt = NOMINAL_TILT;
let startPanX = 0;
let startPanY = 0;

let isTurntableActive = false;
let touring = !still.matches;
let clock = 0;
let visible = true;
let idleTimer = 0;
let frame = 0;
let lastTime = 0;

function updateReadout() {
  const deg = (currentTilt * 180 / Math.PI).toFixed(1);
  const azNorm = Math.round((((currentAzimuth % 360) + 360) % 360));
  const zPct = Math.round(zoomScale * 100);
  const pNum = pageFlip > 0.4 ? "2 / 248" : "1 / 248";
  const state = isDragging ? (dragMode === "pan" ? "Moviendo" : "Rotando en 3D") : isTurntableActive ? "Auto-Giro 360°" : touring ? "Inspección académica" : "Defensa iniciada";
  const text = \`Giro: \${azNorm}° · Inclinación: \${deg}° · Zoom: \${zPct}% · Pág: \${pNum} · \${state}\`;
  if (readout.textContent !== text) readout.textContent = text;
}

function renderFrame() {
  const radA = (currentAzimuth * Math.PI) / 180;
  const radE = (ELEVATION * Math.PI) / 180;
  view[0] = Math.cos(radA) * Math.cos(radE);
  view[1] = Math.sin(radA) * Math.cos(radE);
  view[2] = Math.sin(radE);

  const lNorm = Math.hypot(-Math.sin(radA), Math.cos(radA), 1.2);
  light[0] = -Math.sin(radA) / lNorm;
  light[1] = Math.cos(radA) / lNorm;
  light[2] = 1.2 / lNorm;

  P.azimuth = currentAzimuth;
  P.scale = baseScale * zoomScale;
  P.origin = [baseOrigin[0] + panX, baseOrigin[1] + panY];

  if (baseGroup) baseGroup.innerHTML = basePlinth();
  if (pedestalGroup) pedestalGroup.innerHTML = pedestal(currentTilt);
  if (deskGroup) deskGroup.innerHTML = tiltingDeskAssembly(currentTilt, pageFlip);
  updateReadout();
}

function tick(now) {
  const dt = lastTime ? Math.min((now - lastTime) / 1000, 1 / 30) : 1 / 60;
  lastTime = now;

  if (isTurntableActive) {
    targetAzimuth -= dt * 28;
  } else if (touring && !still.matches) {
    clock += dt;
    targetTilt = NOMINAL_TILT + Math.sin(clock * 0.9) * 0.08;
    targetAzimuth = 42 + Math.sin(clock * 0.4) * 15;
    if (clock % 7 > 4.5 && clock % 7 < 6) {
      targetPageFlip = 0.85;
    } else {
      targetPageFlip = 0;
    }
  }

  // Smooth spring physics for 3D orbit
  const kAzimuth = 260;
  const dAzimuth = 24;
  azimuthVelocity += ((targetAzimuth - currentAzimuth) * kAzimuth - azimuthVelocity * dAzimuth) * dt;
  currentAzimuth += azimuthVelocity * dt;

  // Spring physics for tilt
  const kTilt = 320;
  const dTilt = 24;
  tiltVelocity += ((targetTilt - currentTilt) * kTilt - tiltVelocity * dTilt) * dt;
  currentTilt += tiltVelocity * dt;

  // Pan interpolation
  panX += (targetPanX - panX) * Math.min(1, dt * 20);
  panY += (targetPanY - panY) * Math.min(1, dt * 20);

  // Zoom interpolation
  zoomScale += (targetZoomScale - zoomScale) * Math.min(1, dt * 20);

  // Spring physics for page flip
  const kPage = 400;
  const dPage = 28;
  pageVelocity += ((targetPageFlip - pageFlip) * kPage - pageVelocity * dPage) * dt;
  pageFlip += pageVelocity * dt;
  if (pageFlip < 0) { pageFlip = 0; pageVelocity = 0; }

  renderFrame();

  const settled = !isTurntableActive && !touring &&
    Math.abs(targetAzimuth - currentAzimuth) < 1e-3 &&
    Math.abs(azimuthVelocity) < 1e-3 &&
    Math.abs(targetTilt - currentTilt) < 1e-4 &&
    Math.abs(tiltVelocity) < 1e-4 &&
    Math.abs(targetPanX - panX) < 1e-2 &&
    Math.abs(targetPanY - panY) < 1e-2 &&
    Math.abs(targetZoomScale - zoomScale) < 1e-3 &&
    Math.abs(targetPageFlip - pageFlip) < 1e-4 &&
    Math.abs(pageVelocity) < 1e-4;

  frame = visible && !settled ? requestAnimationFrame(tick) : 0;
}

function run() {
  if (!frame && visible) {
    lastTime = 0;
    frame = requestAnimationFrame(tick);
  }
}

function wake() {
  if (!isTurntableActive) {
    touring = false;
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      if (!still.matches && !isTurntableActive) {
        touring = true;
        clock = 0;
        run();
      }
    }, 4500);
  }
  run();
}

// Pointer drag to orbit 3D and tilt
stage.addEventListener("pointerdown", (e) => {
  isDragging = true;
  dragMode = (e.button === 2 || e.shiftKey) ? "pan" : "orbit";
  startPointerX = e.clientX;
  startPointerY = e.clientY;
  startAzimuth = targetAzimuth;
  startTilt = targetTilt;
  startPanX = targetPanX;
  startPanY = targetPanY;
  stage.setPointerCapture?.(e.pointerId);
  wake();
});

stage.addEventListener("pointermove", (e) => {
  if (!isDragging) return;
  const dx = e.clientX - startPointerX;
  const dy = e.clientY - startPointerY;
  if (dragMode === "pan") {
    targetPanX = startPanX + dx;
    targetPanY = startPanY + dy;
  } else {
    // Horizontal drag: 360° orbit rotation
    targetAzimuth = startAzimuth - dx * 0.55;
    // Vertical drag: tilt between 18° and 48°
    const minAngle = 18 * Math.PI / 180;
    const maxAngle = 48 * Math.PI / 180;
    targetTilt = Math.max(minAngle, Math.min(maxAngle, startTilt - dy * 0.0035));
  }
  run();
});

stage.addEventListener("pointerup", () => {
  isDragging = false;
  wake();
});

stage.addEventListener("pointercancel", () => {
  isDragging = false;
  wake();
});

// Wheel zoom
stage.addEventListener("wheel", (e) => {
  e.preventDefault();
  wake();
  const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
  targetZoomScale = Math.max(0.65, Math.min(2.2, targetZoomScale * zoomFactor));
  run();
}, { passive: false });

stage.addEventListener("contextmenu", (e) => e.preventDefault());

// Click / Tap to flip page
stage.addEventListener("click", (e) => {
  const dx = Math.abs(e.clientX - startPointerX);
  const dy = Math.abs(e.clientY - startPointerY);
  if (dx < 5 && dy < 5) {
    wake();
    targetPageFlip = targetPageFlip > 0.4 ? 0 : 1;
    run();
  }
});

// Keyboard controls
stage.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    e.preventDefault();
    wake();
    targetAzimuth -= 15;
    run();
  } else if (e.key === "ArrowRight") {
    e.preventDefault();
    wake();
    targetAzimuth += 15;
    run();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    wake();
    targetTilt = Math.min(48 * Math.PI / 180, targetTilt + 0.04);
    run();
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    wake();
    targetTilt = Math.max(18 * Math.PI / 180, targetTilt - 0.04);
    run();
  } else if (e.key === " " || e.key === "Enter") {
    e.preventDefault();
    wake();
    targetPageFlip = targetPageFlip > 0.4 ? 0 : 1;
    run();
  } else if (e.key.toLowerCase() === "r") {
    e.preventDefault();
    wake();
    targetAzimuth = 42;
    targetTilt = NOMINAL_TILT;
    targetPanX = 0;
    targetPanY = 0;
    targetZoomScale = 1.0;
    run();
  }
});

new IntersectionObserver((entries) => {
  visible = entries[entries.length - 1].isIntersecting;
  if (visible) run();
}, { rootMargin: "120px 0px" }).observe(stage);

renderFrame();
run();
`;

// ─────────────────────────────────────────────────────────────────────────────
// 5. CSS & HTML PAGE ASSEMBLY (Rich Academic Palettes)
// ─────────────────────────────────────────────────────────────────────────────
const CSS = `
/* Leather Binding (Navy Blue UNCo) */
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

/* Ivory Parchment Pages */
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

/* Polished Gold & Gilded Page Edges */
.tfg-gilt > .iso-fill { fill: #a17c20; }
.tfg-gilt > .iso-top { fill: #d4af37; }
.tfg-gilt > .iso-shade[data-shade="0"] { fill: #785b14; }
.tfg-gilt > .iso-shade[data-shade="1"] { fill: #8f6e1a; }
.tfg-gilt > .iso-shade[data-shade="2"] { fill: #b89128; }
.tfg-gilt > .iso-shade[data-shade="3"] { fill: #cca230; }

.tfg-gold > .iso-fill { fill: #b48c28; }
.tfg-gold > .iso-top { fill: #f5d061; }
.tfg-gold > .iso-shade[data-shade="0"] { fill: #8a6a1a; }
.tfg-gold > .iso-shade[data-shade="1"] { fill: #a17c20; }
.tfg-gold > .iso-shade[data-shade="2"] { fill: #c4992c; }
.tfg-gold > .iso-shade[data-shade="3"] { fill: #e5b73d; }

/* Machined Brass */
.tfg-brass > .iso-fill { fill: #967020; }
.tfg-brass > .iso-top { fill: #d4af37; }
.tfg-brass > .iso-shade[data-shade="0"] { fill: #6b4f12; }
.tfg-brass > .iso-shade[data-shade="1"] { fill: #826017; }
.tfg-brass > .iso-shade[data-shade="2"] { fill: #a57c24; }
.tfg-brass > .iso-shade[data-shade="3"] { fill: #c79730; }

/* Mahogany Wood Desk */
.tfg-wood > .iso-fill { fill: #1c1512; }
.tfg-wood > .iso-top { fill: #2d221c; }
.tfg-wood > .iso-shade[data-shade="0"] { fill: #140e0c; }
.tfg-wood > .iso-shade[data-shade="1"] { fill: #19120f; }
.tfg-wood > .iso-shade[data-shade="2"] { fill: #221814; }
.tfg-wood > .iso-shade[data-shade="3"] { fill: #281d18; }

body[data-theme="light"] .tfg-wood > .iso-fill,
.iso[data-theme="light"] .tfg-wood > .iso-fill { fill: #4a3328; }
body[data-theme="light"] .tfg-wood > .iso-top,
.iso[data-theme="light"] .tfg-wood > .iso-top { fill: #654637; }
body[data-theme="light"] .tfg-wood > .iso-shade[data-shade="0"],
.iso[data-theme="light"] .tfg-wood > .iso-shade[data-shade="0"] { fill: #36241b; }
body[data-theme="light"] .tfg-wood > .iso-shade[data-shade="1"],
.iso[data-theme="light"] .tfg-wood > .iso-shade[data-shade="1"] { fill: #422d22; }
body[data-theme="light"] .tfg-wood > .iso-shade[data-shade="2"],
.iso[data-theme="light"] .tfg-wood > .iso-shade[data-shade="2"] { fill: #54392b; }
body[data-theme="light"] .tfg-wood > .iso-shade[data-shade="3"],
.iso[data-theme="light"] .tfg-wood > .iso-shade[data-shade="3"] { fill: #5e4131; }

/* Ceremonial Silk Ribbon */
.tfg-ribbon {
  fill: none;
  stroke: #f59e0b !important;
  stroke-width: 2.4px !important;
  stroke-linecap: round;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.35));
}
.tfg-gold-line {
  stroke: #d4af37 !important;
  stroke-width: 1.1px !important;
}

.iso-stage {
  cursor: grab;
  touch-action: none;
  user-select: none;
  display: block;
}
.iso-stage:active {
  cursor: grabbing;
}
.iso-stage:focus-visible {
  outline: 2px solid var(--anatomy-lit);
  outline-offset: 4px;
}
`;

const svgContent = k.figureSvg({
  width: WIDTH,
  height: HEIGHT,
  label:
    "Atril ceremonial y Gran Tomo Encuadernado de Tesina (TFG CURZAS - Universidad Nacional del Comahue). Cuenta con base de granito con patas de bronce, columna torneada con perilla de ajuste, horquilla basculante con cuadrante graduado de ángulo, atril de madera noble y tomo encuadernado en azul UNCo con hojas marfil, esquineras doradas y cinta de raso.",
  body: [
    `<g class="tfg-base-group">${basePlinth()}</g>`,
    `<g class="tfg-pedestal-group">${pedestal(NOMINAL_TILT)}</g>`,
    `<g class="tfg-desk-group">${tiltingDeskAssembly(NOMINAL_TILT, 0)}</g>`,
  ],
});

const bodyHtml = k.plateHtml({
  fig: "Fig 1",
  title: "Atril de Tesina · CURZAS UNCo",
  hint: "Giro 360° · Arrastra · Rueda Zoom",
  readout: "Giro: 42° · Inclinación: 32.0° · Zoom: 100% · Pág: 1 / 248 · Defensa iniciada",
  keys: [
    { mark: "lit", label: "Cinta ceremonial dorada y sello UNCo en bajorrelieve" },
    { mark: "raised", label: "Atril basculante con cuadrante graduado (18° a 48°)" },
    { mark: "dim", label: "Base de precisión con patas antivibración y placa seriada" },
  ],
  caption:
    "El Gran Tomo Encuadernado de Tesina sobre Atril Ceremonial de Lectura (Licenciatura en Gestión de Recursos Humanos, CURZAS — Universidad Nacional del Comahue). Diseñado con mecánica de precisión isométrica: columna de elevación con ajuste micrométrico, cuadrante de inclinación angular y hojas abiertas de marfil que reaccionan interactivamente al tacto.",
  body: `<div class="iso-stage" tabindex="0" role="region" aria-label="Atril ceremonial de Tesina CURZAS UNCo interactivo">${svgContent}</div>`,
});

const fileName = theme === "light" ? "tfg-lectern-light.html" : "tfg-lectern.html";
const outPath = join(HERE, fileName);

writeFileSync(
  outPath,
  k.pageHtml({
    title: "Atril de Tesina | CURZAS - UNCo",
    theme,
    body: `<style>${CSS}</style>${bodyHtml}`,
    script: kitScript() + liveScript,
  })
);

console.log(`wrote ${fileName}`);

const embedCSS = `
${CSS}
html {
  color-scheme: light;
}
body[data-theme="dark"], html[data-theme="dark"] {
  color-scheme: dark;
}
html, body {
  background: var(--anatomy-card) !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.iso-page {
  width: 100% !important;
  max-width: 640px !important;
  margin: 0 auto !important;
  padding: 0 4px !important;
}
.iso-figure {
  margin: 0 !important;
}
.iso-plate {
  padding: 38px 18px 46px !important;
  border-radius: 10px !important;
  box-shadow: 0 8px 28px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(180, 131, 36, 0.25) !important;
  background: var(--anatomy-card) !important;
}
.iso-plate-corner[data-corner="hint"] {
  display: none !important;
}
.iso-plate-corner[data-corner="readout"] {
  right: 18px !important;
  bottom: 14px !important;
  font-size: 11px !important;
  white-space: nowrap !important;
}
.iso-legend {
  display: none !important;
}
`;

const embedScript = `
${kitScript()}
${liveScript}
window.addEventListener("message", (e) => {
  if (!e.data) return;
  if (e.data.type === "set-theme") {
    document.body.setAttribute("data-theme", e.data.theme);
    document.documentElement.setAttribute("data-theme", e.data.theme);
  } else if (e.data.type === "rotate") {
    wake();
    targetAzimuth += (e.data.delta || 45);
    run();
  } else if (e.data.type === "toggle-turntable") {
    isTurntableActive = !isTurntableActive;
    if (isTurntableActive) { touring = false; clearTimeout(idleTimer); }
    run();
  } else if (e.data.type === "reset") {
    wake();
    isTurntableActive = false;
    targetAzimuth = 42;
    targetTilt = NOMINAL_TILT;
    targetPanX = 0;
    targetPanY = 0;
    targetZoomScale = 1.0;
    targetPageFlip = 0;
    run();
  } else if (e.data.type === "zoom") {
    wake();
    targetZoomScale = Math.max(0.65, Math.min(2.2, targetZoomScale * (e.data.delta > 0 ? 1.2 : 0.8)));
    run();
  }
});
`;

writeFileSync(
  join(HERE, "embed.html"),
  k.pageHtml({
    title: "Atril de Tesina (Embed) | CURZAS - UNCo",
    theme: "light",
    body: `<style>${embedCSS}</style>${bodyHtml}`,
    script: embedScript,
  })
);

console.log("wrote embed.html");

