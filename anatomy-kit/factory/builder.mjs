/**
 * ENSAMBLADOR MODULAR DE LA FÁBRICA ANATOMY-KIT
 * Recibe una receta de componentes y genera la lámina interactiva SVG 3D
 * con soporte para giro 360°, inclinación, pan, zoom y auto-turntable.
 */
import * as k from "../kit/iso-kit.mjs";
import { kitScript } from "../scripts/inline-kit.mjs";
import { FACTORY_CSS, PIECES_CLIENT_CODE } from "./pieces.mjs";

export function ensamblarEscena({
  title = "Pieza Isométrica 3D",
  fig = "Fig 1",
  hint = "Giro 360° · Arrastra · Rueda Zoom",
  readout = "Giro: 42° · Inclinación: 32.0° · Zoom: 100% · Defensa iniciada",
  keys = [],
  caption = "",
  width = 640,
  height = 500,
  nominalTilt = 32 * (Math.PI / 180),
  pivotZ = 106,
  renderBaseFn,      // (P) => string
  renderSupportFn,   // (P, tilt) => string
  renderDeskFn,      // (theta, P, view, light) => string
  renderSubjectFn,   // (theta, pageFlip, P, view, light) => string
  extraClientCode = ""
}) {
  // Proyección inicial equilibrada para base circular
  const P = k.fitProjection(
    [
      [-75, -75, -10],
      [75, 75, -10],
      [-65, -55, pivotZ + 55],
      [65, 55, pivotZ + 55],
      [0, 0, pivotZ + 70]
    ],
    width,
    height,
    { pad: 28, azimuth: 42, elevation: 30 }
  );

  const radA = (42 * Math.PI) / 180;
  const radE = (30 * Math.PI) / 180;
  const view = [Math.cos(radA) * Math.cos(radE), Math.sin(radA) * Math.cos(radE), Math.sin(radE)];
  const lNorm = Math.hypot(-Math.sin(radA), Math.cos(radA), 1.2);
  const light = [-Math.sin(radA) / lNorm, Math.cos(radA) / lNorm, 1.2 / lNorm];

  // SVG inicial pre-renderizado
  const initialBase = renderBaseFn ? renderBaseFn(P) : "";
  const initialSupport = renderSupportFn ? renderSupportFn(P, nominalTilt) : "";
  const initialDesk = renderDeskFn ? renderDeskFn(nominalTilt, P, view, light) : "";
  const initialSubject = renderSubjectFn ? renderSubjectFn(nominalTilt, 0, P, view, light) : "";

  const svgContent = k.figureSvg({
    width,
    height,
    label: caption || title,
    body: [
      `<g class="tfg-base-group">${initialBase}</g>`,
      `<g class="tfg-pedestal-group">${initialSupport}</g>`,
      `<g class="tfg-desk-group">${initialDesk}${initialSubject}</g>`,
    ]
  });

  const bodyHtml = k.plateHtml({
    fig,
    title,
    hint,
    readout,
    keys,
    caption,
    body: `<div class="iso-stage" tabindex="0" role="region" aria-label="${title}">${svgContent}</div>`
  });

  // Client Motion & Physics Runtime
  const clientScript = `
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
const NOMINAL_TILT = ${nominalTilt};
const PIVOT_Z = ${pivotZ};

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
  topTicks,
  circleRing
};

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

function toWorldDesk(x, yL, zL, theta, pZ = PIVOT_Z) {
  const cosT = Math.cos(theta);
  const sinT = Math.sin(theta);
  const y = yL * cosT + zL * sinT;
  const z = pZ - yL * sinT + zL * cosT;
  return [x, y, z];
}

function renderFace(points3D, P, view, light, { tone = "hi", lit = false, isTop = false, customClass = "" } = {}) {
  const v1 = sub3(points3D[1], points3D[0]);
  const v2 = sub3(points3D[2], points3D[0]);
  const n = unit3(cross3(v1, v2));
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
  const toneAttr = ' data-tone="' + fillTone + '"';
  const classAttr = customClass ? ' class="iso-solid ' + customClass + '"' : ' class="iso-solid"';
  let inner = "";
  if (isTop) {
    inner = '<path class="iso-top" d="' + pathD + '"/><path class="iso-line iso-edge" data-tone="' + fillTone + '" d="' + pathD + '"/>';
  } else {
    inner = '<path class="iso-shade" data-shade="' + shadeIndex + '" d="' + pathD + '"/><path class="iso-line iso-edge" data-tone="' + fillTone + '" d="' + pathD + '"/>';
  }
  return '<g' + classAttr + toneAttr + litAttr + '><path class="iso-fill" d="' + pathD + '"/>' + inner + '</g>';
}

function renderLocalBox(x0, x1, y0, y1, z0, z1, toWorldFn, P, view, light, options = {}) {
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
    .map(f => {
      const center = mul3(add3(add3(f.pts[0], f.pts[1]), add3(f.pts[2], f.pts[3])), 0.25);
      return { ...f, depth: k.depthOf(center, P) };
    })
    .sort((a, b) => a.depth - b.depth);

  return sorted.map(f => renderFace(f.pts, P, view, light, { ...options, isTop: f.isTop })).join("");
}

${PIECES_CLIENT_CODE}

const renderBase = ${renderBaseFn ? `(${renderBaseFn.toString()})` : "() => ''"};
const renderSupport = ${renderSupportFn ? `(${renderSupportFn.toString()})` : "() => ''"};
const renderDesk = ${renderDeskFn ? `(${renderDeskFn.toString()})` : "() => ''"};
const renderSubject = ${renderSubjectFn ? `(${renderSubjectFn.toString()})` : "() => ''"};

// Dynamic 3D State
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
let dragMode = "orbit";
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
  const text = 'Giro: ' + azNorm + '° · Inclinación: ' + deg + '° · Zoom: ' + zPct + '% · Pág: ' + pNum + ' · ' + state;
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

  if (baseGroup) {
    baseGroup.innerHTML = renderBase(P);
  }
  if (pedestalGroup) {
    pedestalGroup.innerHTML = renderSupport(P, currentTilt);
  }
  if (deskGroup) {
    const deskHtml = renderDesk(currentTilt, P, view, light) || "";
    const subjectHtml = renderSubject(currentTilt, pageFlip, P, view, light) || "";
    deskGroup.innerHTML = deskHtml + subjectHtml;
  }
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

  // Smooth physics
  const kAzimuth = 260;
  const dAzimuth = 24;
  azimuthVelocity += ((targetAzimuth - currentAzimuth) * kAzimuth - azimuthVelocity * dAzimuth) * dt;
  currentAzimuth += azimuthVelocity * dt;

  const kTilt = 320;
  const dTilt = 24;
  tiltVelocity += ((targetTilt - currentTilt) * kTilt - tiltVelocity * dTilt) * dt;
  currentTilt += tiltVelocity * dt;

  panX += (targetPanX - panX) * Math.min(1, dt * 20);
  panY += (targetPanY - panY) * Math.min(1, dt * 20);
  zoomScale += (targetZoomScale - zoomScale) * Math.min(1, dt * 20);

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
    targetAzimuth = startAzimuth - dx * 0.55;
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

stage.addEventListener("wheel", (e) => {
  e.preventDefault();
  wake();
  const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
  targetZoomScale = Math.max(0.65, Math.min(2.2, targetZoomScale * zoomFactor));
  run();
}, { passive: false });

stage.addEventListener("contextmenu", (e) => e.preventDefault());

stage.addEventListener("click", (e) => {
  const dx = Math.abs(e.clientX - startPointerX);
  const dy = Math.abs(e.clientY - startPointerY);
  if (dx < 5 && dy < 5) {
    wake();
    targetPageFlip = targetPageFlip > 0.4 ? 0 : 1;
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

  const embedCSS = `
${FACTORY_CSS}
html { color-scheme: light; }
body[data-theme="dark"], html[data-theme="dark"] { color-scheme: dark; }
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
.iso-figure { margin: 0 !important; }
.iso-plate {
  padding: 38px 18px 46px !important;
  border-radius: 10px !important;
  box-shadow: 0 8px 28px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(180, 131, 36, 0.25) !important;
  background: var(--anatomy-card) !important;
}
.iso-plate-corner[data-corner="hint"] { display: none !important; }
.iso-plate-corner[data-corner="readout"] {
  right: 18px !important;
  bottom: 14px !important;
  font-size: 11px !important;
  white-space: nowrap !important;
}
.iso-legend { display: none !important; }
`;

  const embedScript = `
${kitScript()}
${clientScript}
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

  const html = k.pageHtml({
    title,
    theme: "light",
    body: `<style>${embedCSS}</style>${bodyHtml}`,
    script: embedScript
  });

  return { html, bodyHtml, P };
}
