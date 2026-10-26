import * as k from "../../kit/iso-kit.mjs";
import * as G from "../../kit/lathe.mjs";

const P = k.fitProjection([[-110,-90,-18],[110,90,0],[-70,-60,165],[70,60,165]], 640, 500, {azimuth:42, elevation:30});
const at = (point) => k.iso(point, P);
const view = G.viewOf(P);
const light = G.lightOf(P);

function toWorld(x, yL, zL, theta) {
  const cosT = Math.cos(theta), sinT = Math.sin(theta);
  return [x, yL * cosT + zL * sinT, 106 - yL * sinT + zL * cosT];
}

function renderFace(points3D, { tone = "hi", lit = false, isTop = false, customClass = "" } = {}) {
  const v1 = G.sub3(points3D[1], points3D[0]);
  const v2 = G.sub3(points3D[2], points3D[0]);
  const n = G.unit3(G.cross3(v1, v2));

  const facing = G.dot3(n, view);
  if (facing <= 0.0001) return "";

  const pts = points3D.map(at);
  const pathD = k.pathOf(pts, true);

  let fillTone = tone;
  let shadeIndex = 1;
  if (!isTop) {
    const score = G.dot3(n, light);
    shadeIndex = G.bandOf(score);
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

function renderLocalBox(x0, x1, y0, y1, z0, z1, theta, options = {}) {
  const c = [
    toWorld(x0, y0, z0, theta),
    toWorld(x1, y0, z0, theta),
    toWorld(x1, y1, z0, theta),
    toWorld(x0, y1, z0, theta),
    toWorld(x0, y0, z1, theta),
    toWorld(x1, y0, z1, theta),
    toWorld(x1, y1, z1, theta),
    toWorld(x0, y1, z1, theta),
  ];

  const faces = [
    { pts: [c[4], c[5], c[6], c[7]], isTop: true, name: 'top' },
    { pts: [c[3], c[2], c[1], c[0]], isTop: false, name: 'bot' },
    { pts: [c[0], c[1], c[5], c[4]], isTop: false, name: 'back' },
    { pts: [c[2], c[3], c[7], c[6]], isTop: false, name: 'front' },
    { pts: [c[0], c[4], c[7], c[3]], isTop: false, name: 'left' },
    { pts: [c[1], c[2], c[6], c[5]], isTop: false, name: 'right' },
  ];

  const sorted = faces
    .map((f) => {
      const center = G.mul3(G.add3(G.add3(f.pts[0], f.pts[1]), G.add3(f.pts[2], f.pts[3])), 0.25);
      return { ...f, depth: k.depthOf(center, P) };
    })
    .sort((a, b) => a.depth - b.depth);

  return sorted.map((f) => renderFace(f.pts, { ...options, isTop: f.isTop })).join("\n");
}

console.log("=== DESK BOX ===");
console.log(renderLocalBox(-66, 66, -46, 46, 0, 4, 32*Math.PI/180, { customClass: "tfg-wood" }));
console.log("=== PAGE BOX ===");
console.log(renderLocalBox(-55, -2, -37, 37, 12, 12.6, 32*Math.PI/180, { customClass: "tfg-page" }));
