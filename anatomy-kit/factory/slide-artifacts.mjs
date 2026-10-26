/**
 * CATÁLOGO COMPLETO DE ARTEFACTOS ESCULTÓRICOS 3D PARA LAS 25 FILMINAS
 * Seminario de Integración y Aplicación (SIA) — CURZAS UNCo
 * Tesista: Tec. Sup. en RRHH Héctor Daniel Ayarachi Fuentes
 *
 * Cada filmina tiene una escultura isométrica 3D monumental y única,
 * inspirada directamente en los objetos 3D originales de bloque1 a bloque5,
 * montadas sobre el podio circular de mármol y azul UNCo.
 */
import * as k from "../kit/iso-kit.mjs";
import {
  PIVOT_Z,
  NOMINAL_TILT,
  toWorldDesk,
  renderFace,
  renderLocalBox,
  sub3,
  add3,
  mul3,
  dot3,
  cross3,
  unit3,
  tomoTesina
} from "./pieces.mjs";

// Renderizador directo de cajas en coordenadas del mundo
export function renderBox(x0, x1, y0, y1, z0, z1, P, view, light, options = {}) {
  return renderLocalBox(x0, x1, y0, y1, z0, z1, (x, y, z) => [x, y, z], P, view, light, options);
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. CARÁTULA OFICIAL: El Gran Tomo Encuadernado de Tesina sobre Atril
// ─────────────────────────────────────────────────────────────────────────────
export function artSlide1(theta, flip, P, view, light) {
  return tomoTesina(theta, flip || 0, P, view, light);
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. PRESENTACIÓN DEL TESISTA: Credencial Profesional & Monolito de Carrera
// ─────────────────────────────────────────────────────────────────────────────
export function artSlide2(theta, flip, P, view, light) {
  const out = [];
  const at = (pt) => k.iso(pt, P);

  // 1. Zócalo inferior escalonado de granito negro y caoba noble
  out.push(renderBox(-24, 24, -14, 14, 10.5, 18, P, view, light, { tone: "lo", customClass: "tfg-leather" }));
  // Moldura perimetral biselada de latón pulido
  out.push(renderBox(-26, 26, -16, 16, 18, 23, P, view, light, { tone: "lit", customClass: "tfg-brass" }));

  // 2. Fuste de caoba con molduras y cantoneras
  out.push(renderBox(-18, 18, -11, 11, 23, 35, P, view, light, { tone: "mid", customClass: "tfg-wood" }));
  // Capitel de latón maquinado y repisa de sustentación
  out.push(renderBox(-28, 28, -15, 15, 35, 41, P, view, light, { tone: "lit", customClass: "tfg-brass" }));

  // 3. Credencial Académica Monumental (Monolito en marco de latón pulido)
  // Marco perimetral exterior de latón maquinado
  out.push(renderBox(-33, 33, -5.5, 5.5, 41, 121, P, view, light, { tone: "lit", customClass: "tfg-brass" }));
  // Vidrio esmerilado templado / marfil translúcido de alta definición
  out.push(renderBox(-29, 29, -4.5, 4.5, 44, 118, P, view, light, { tone: "hi", customClass: "tfg-page" }));

  // 4 Cantoneras de oro en las esquinas de la credencial
  const corners = [
    [-33, -5.8, 41], [25, -5.8, 41],
    [-33, -5.8, 113], [25, -5.8, 113]
  ];
  for (const [cx, cy, cz] of corners) {
    out.push(renderBox(cx, cx + 8, cy, cy + 11.6, cz, cz + 8, P, view, light, { tone: "lit", customClass: "tfg-gilt" }));
  }

  // 4. Sello Académico Oficial UNCo en altorrelieve superior
  const sealZ = 104;
  const sCenter = at([0, -5.0, sealZ]);
  const sL1 = at([-11, -5.0, sealZ]);
  const sR1 = at([11, -5.0, sealZ]);
  out.push(`<path class="iso-line tfg-gold-line" data-tone="lit" style="stroke-width:2.2px" d="M${sL1[0]} ${sL1[1]} A 11 11 0 1 0 ${sR1[0]} ${sR1[1]} A 11 11 0 1 0 ${sL1[0]} ${sL1[1]}"/>`);
  const sL2 = at([-7.5, -5.0, sealZ]);
  const sR2 = at([7.5, -5.0, sealZ]);
  out.push(`<path class="iso-line tfg-gold-line" data-tone="lit" style="stroke-width:1.2px" d="M${sL2[0]} ${sL2[1]} A 7.5 7.5 0 1 0 ${sR2[0]} ${sR2[1]} A 7.5 7.5 0 1 0 ${sL2[0]} ${sL2[1]}"/>`);
  out.push(k.dotsSvg([sCenter], { size: 2.6, tone: "lit" }));

  // 5. Placa técnica grabada de orfebrería oscura ("HÉCTOR DANIEL AYARACHI FUENTES")
  out.push(renderBox(-25, 25, -5.2, -4.2, 68, 92, P, view, light, { tone: "lo", customClass: "tfg-leather" }));
  // Filete dorado de la placa
  const plkTL = at([-23, -5.5, 90]);
  const plkTR = at([23, -5.5, 90]);
  const plkBR = at([23, -5.5, 70]);
  const plkBL = at([-23, -5.5, 70]);
  out.push(`<path class="iso-line" data-tone="lit" style="stroke-width:1.2px" d="M${plkTL[0]} ${plkTL[1]} L${plkTR[0]} ${plkTR[1]} L${plkBR[0]} ${plkBR[1]} L${plkBL[0]} ${plkBL[1]} Z"/>`);

  // Líneas grabadas de datos personales (Nombre en negrita, Titulación, Legajo)
  const linesSpec = [
    { z: 86, w: 14, sw: 1.0 }, // Subtítulo: AUTOR / TESISTA
    { z: 81, w: 20, sw: 2.0 }, // HÉCTOR DANIEL AYARACHI FUENTES
    { z: 76, w: 17, sw: 1.2 }, // Tec. Sup. en RRHH • Legajo 8252
    { z: 72, w: 13, sw: 0.9 }  // CURZAS • UNCo
  ];
  linesSpec.forEach(({ z, w, sw }) => {
    const p1 = at([-w, -5.5, z]);
    const p2 = at([w, -5.5, z]);
    out.push(`<path class="iso-line" data-tone="lit" style="stroke-width:${sw}px" d="M${p1[0]} ${p1[1]} L${p2[0]} ${p2[1]}"/>`);
  });

  // 6. Dial graduado de progreso hacia la Licenciatura (100% DEFENSA)
  const dialZ = 53;
  const dCenter = at([0, -5.2, dialZ]);
  const dL = at([-9, -5.2, dialZ]);
  const dR = at([9, -5.2, dialZ]);
  out.push(`<path class="iso-line" data-tone="lit" style="stroke-width:2px" d="M${dL[0]} ${dL[1]} A 9 9 0 1 0 ${dR[0]} ${dR[1]} A 9 9 0 1 0 ${dL[0]} ${dL[1]}"/>`);
  out.push(k.dotsSvg([dCenter], { size: 1.8, tone: "lit" }));

  // Marcas de división del dial (escala angular de 12 horas / 100%)
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) {
    const pMarkA = at([Math.cos(a) * 6.5, -5.2, dialZ + Math.sin(a) * 6.5]);
    const pMarkB = at([Math.cos(a) * 8.5, -5.2, dialZ + Math.sin(a) * 8.5]);
    out.push(`<path class="iso-line" data-tone="lit" style="stroke-width:1px" d="M${pMarkA[0]} ${pMarkA[1]} L${pMarkB[0]} ${pMarkB[1]}"/>`);
  }

  // Aguja del dial apuntando hacia las 2 en punto (100% completado / Defensa)
  const needleTip = at([6.8, -5.5, dialZ + 5.5]);
  out.push(`<path class="iso-line" data-tone="lit" style="stroke-width:2.4px" d="M${dCenter[0]} ${dCenter[1]} L${needleTip[0]} ${needleTip[1]}"/>`);

  return out.join("");
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. ESQUEMA SIA TP N° 2: Podio Cúbico de los 4 Cimientos del TFG
// ─────────────────────────────────────────────────────────────────────────────
export function artSlide3(theta, flip, P, view, light) {
  const out = [];
  const at = (pt) => k.iso(pt, P);

  // Cuatro pedestales cúbicos escalonados (los 4 cimientos del TP2)
  const cimientos = [
    { x: -22, y: -22, zTop: 36, label: "I. CARÁTULA", color: "tfg-leather" },
    { x: 22, y: -22, zTop: 48, label: "II. TEMA", color: "tfg-base-podium" },
    { x: -22, y: 22, zTop: 62, label: "III. PROBLEMA", color: "tfg-wood" },
    { x: 22, y: 22, zTop: 76, label: "IV. OBJETIVOS", color: "tfg-brass" }
  ];

  cimientos.forEach((c) => {
    // Zócalo
    out.push(renderBox(c.x - 14, c.x + 14, c.y - 14, c.y + 14, 10.5, 14, P, view, light, { tone: "lo", customClass: "tfg-leather" }));
    // Fuste
    out.push(renderBox(c.x - 12, c.x + 12, c.y - 12, c.y + 12, 14, c.zTop - 3, P, view, light, { tone: "mid", customClass: c.color }));
    // Capitel de latón
    out.push(renderBox(c.x - 13, c.x + 13, c.y - 13, c.y + 13, c.zTop - 3, c.zTop, P, view, light, { tone: "lit", customClass: "tfg-brass" }));
    // Placa frontal grabada
    const p1 = at([c.x - 9, c.y + 12.5, c.zTop - 12]);
    const p2 = at([c.x + 9, c.y + 12.5, c.zTop - 12]);
    out.push(`<path class="iso-line" data-tone="lit" style="stroke-width:1.5px" d="M${p1[0]} ${p1[1]} L${p2[0]} ${p2[1]}"/>`);
  });

  // Artefacto superior sobre el Cimiento IV (Compás y Pergamino)
  const apex = at([22, 22, 85]);
  const legA = at([16, 22, 77]);
  const legB = at([28, 22, 77]);
  out.push(`<path class="iso-line" data-tone="lit" style="stroke-width:2px" d="M${legA[0]} ${legA[1]} L${apex[0]} ${apex[1]} L${legB[0]} ${legB[1]}"/>`);
  out.push(k.dotsSvg([apex], { size: 1.2, tone: "lit" }));

  return out.join("");
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. ESQUEMA SIA TP N° 3: Díptico Epistemológico de 2 Columnas
// ─────────────────────────────────────────────────────────────────────────────
export function artSlide4(theta, flip, P, view, light) {
  const out = [];

  // Dos columnas jónicas monumentales de mármol
  for (const cx of [-26, 26]) {
    // Base ática
    out.push(renderBox(cx - 9, cx + 9, -9, 9, 10.5, 17, P, view, light, { tone: "hi", customClass: "tfg-base-podium" }));
    // Fuste estriado
    out.push(renderBox(cx - 7, cx + 7, -7, 7, 17, 62, P, view, light, { tone: "hi", customClass: "tfg-base-podium" }));
    // Capitel con volutas de bronce
    out.push(renderBox(cx - 10, cx + 10, -10, 10, 62, 68, P, view, light, { tone: "lit", customClass: "tfg-brass" }));
  }

  // Arquitrabe / Viga transversal de unión
  out.push(renderBox(-38, 38, -10, 10, 68, 75, P, view, light, { tone: "lit", customClass: "tfg-brass" }));

  // Frontón triangular superior
  out.push(renderBox(-32, 32, -8, 8, 75, 82, P, view, light, { tone: "mid", customClass: "tfg-brass" }));

  // Tomo I (Marco Teórico) en la columna izquierda
  out.push(renderBox(-33, -19, -8, 8, 32, 48, P, view, light, { tone: "lo", customClass: "tfg-leather" }));
  // Tomo II (Antecedentes) en la columna derecha
  out.push(renderBox(19, 33, -8, 8, 32, 48, P, view, light, { tone: "mid", customClass: "tfg-wood" }));

  return out.join("");
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. ESQUEMA SIA TP N° 4: Tríptico de Ingeniería Metodológica Integral
// ─────────────────────────────────────────────────────────────────────────────
export function artSlide5(theta, flip, P, view, light) {
  const out = [];
  const at = (pt) => k.iso(pt, P);

  // Zócalo de ingeniería de precisión
  out.push(renderBox(-38, 38, -14, 14, 10.5, 18, P, view, light, { tone: "mid", customClass: "tfg-wood" }));

  // Tres paneles verticales de latón y cristal (Tríptico: Metodología, Cronograma, Viabilidad)
  const panels = [-26, 0, 26];
  panels.forEach((px) => {
    out.push(renderBox(px - 10, px + 10, -3, 3, 18, 64, P, view, light, { tone: "hi", customClass: "tfg-page" }));
    out.push(renderBox(px - 11, px + 11, -4, 4, 64, 68, P, view, light, { tone: "lit", customClass: "tfg-brass" }));
  });

  // Gran calibre vernier / micrómetro suspendido al frente
  out.push(renderBox(-34, 34, -7, -4, 38, 44, P, view, light, { tone: "lit", customClass: "tfg-brass" }));
  // Mandíbula deslizante
  out.push(renderBox(-6, 8, -9, -3, 34, 48, P, view, light, { tone: "mid", customClass: "tfg-gilt" }));

  // Graduaciones milimétricas
  for (let x = -30; x <= 30; x += 6) {
    const pA = at([x, -7.5, 41]);
    const pB = at([x, -7.5, 43]);
    out.push(`<path class="iso-line" data-tone="lo" d="M${pA[0]} ${pA[1]} L${pB[0]} ${pB[1]}"/>`);
  }

  return out.join("");
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. EL CURZAS EN EL TERRITORIO: Maqueta Geodésica de Río Negro y los 10 Nodos
// ─────────────────────────────────────────────────────────────────────────────
export function artSlide6(theta, flip, P, view, light) {
  const out = [];
  const at = (pt) => k.iso(pt, P);

  // Bandeja oceánica del Mar Argentino / Costa Atlántica
  out.push(renderBox(-44, 44, -34, 34, 10.5, 16, P, view, light, { tone: "lo", customClass: "tfg-leather" }));

  // Relieve de la Provincia de Río Negro (meseta patagónica)
  out.push(renderBox(-38, 38, -28, 28, 16, 23, P, view, light, { tone: "mid", customClass: "tfg-wood" }));

  // Sede Central Viedma (Pabellón monumental)
  out.push(renderBox(16, 32, 6, 22, 23, 38, P, view, light, { tone: "hi", customClass: "tfg-base-podium" }));

  // Torre de Transmisión Territorial (Enlace a los 10 Nodos)
  out.push(renderBox(22, 26, 12, 16, 38, 72, P, view, light, { tone: "lit", customClass: "tfg-brass" }));
  const beacon = at([24, 14, 74]);
  out.push(k.dotsSvg([beacon], { size: 2.2, tone: "lit" }));

  // 10 Balizas / Mástiles de los 10 Nodos Patagónicos
  const nodos = [
    [-30, -18], [-22, -6], [-14, 8], [-6, -20],
    [-2, 16], [6, -10], [12, -22], [-24, 18],
    [10, 4], [-12, -8]
  ];
  nodos.forEach(([nx, ny]) => {
    out.push(renderBox(nx - 2, nx + 2, ny - 2, ny + 2, 23, 31, P, view, light, { tone: "lit", customClass: "tfg-brass" }));
    const dot = at([nx, ny, 32]);
    out.push(k.dotsSvg([dot], { size: 0.7, tone: "hi" }));
    // Línea de enlace hacia la sede central Viedma
    const sPt = at([24, 14, 48]);
    out.push(`<path class="iso-line" data-tone="lit" style="stroke-dasharray:2,2;opacity:0.6" d="M${sPt[0]} ${sPt[1]} L${dot[0]} ${dot[1]}"/>`);
  });

  return out.join("");
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. MEDIACIONES TECNOLÓGICAS: Red de Aulas Híbridas (Res. 196/2022)
// ─────────────────────────────────────────────────────────────────────────────
export function artSlide7(theta, flip, P, view, light) {
  const out = [];

  // Rack tecnológico base
  out.push(renderBox(-36, 36, -22, 22, 10.5, 20, P, view, light, { tone: "lo", customClass: "tfg-leather" }));

  // Gran pantalla curva de videoconferencia sincrónica Moodle/SIU
  out.push(renderBox(-32, 32, -14, -10, 20, 68, P, view, light, { tone: "lo", customClass: "tfg-leather" }));
  out.push(renderBox(-30, 30, -13.5, -10.5, 22, 66, P, view, light, { tone: "hi", customClass: "tfg-page" }));

  // Cuadrícula de interfaces de aulas remotas (6 pantallas sincrónicas)
  for (let col = -26; col <= 14; col += 18) {
    for (let row = 26; row <= 50; row += 16) {
      out.push(renderBox(col, col + 14, -13, -11, row, row + 12, P, view, light, { tone: "mid", customClass: "tfg-brass" }));
    }
  }

  // Consola de comando inferior con teclado y moduladores
  out.push(renderBox(-28, 28, 2, 18, 20, 26, P, view, light, { tone: "mid", customClass: "tfg-brass" }));

  return out.join("");
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. DESNATURALIZACIÓN DEL OBJETO: Prisma de Refracción Epistemológica
// ─────────────────────────────────────────────────────────────────────────────
export function artSlide8(theta, flip, P, view, light) {
  const out = [];
  const at = (pt) => k.iso(pt, P);

  // Pedestal clásico de latón pulido
  out.push(renderBox(-18, 18, -18, 18, 10.5, 30, P, view, light, { tone: "lit", customClass: "tfg-brass" }));

  // Anillo de rotación goniómetro de 360°
  const ringPt = at([0, 0, 31]);
  out.push(k.dotsSvg([ringPt], { size: 3.6, tone: "lit" }));

  // Gran Prisma Triangular de Cristal Óptico (Desnaturalización Wainerman & Sautu)
  const zBase = 32;
  const zTop = 76;
  const pA0 = [-24, 18, zBase];
  const pB0 = [24, 18, zBase];
  const pC0 = [0, -22, zBase];
  const pA1 = [-24, 18, zTop];
  const pB1 = [24, 18, zTop];
  const pC1 = [0, -22, zTop];

  out.push(renderFace([pC1, pB1, pA1], P, view, light, { tone: "hi", isTop: true, customClass: "tfg-page" }));
  out.push(renderFace([pC0, pA0, pA1, pC1], P, view, light, { tone: "hi", isTop: false, customClass: "tfg-page" }));
  out.push(renderFace([pA0, pB0, pB1, pA1], P, view, light, { tone: "mid", isTop: false, customClass: "tfg-page" }));
  out.push(renderFace([pB0, pC0, pC1, pB1], P, view, light, { tone: "lo", isTop: false, customClass: "tfg-page" }));

  // Haz de luz incidente (rutina cotidiana)
  const rIn0 = at([-52, -2, 54]);
  const rIn1 = at([-12, -2, 54]);
  out.push(`<path class="iso-line" data-tone="lit" style="stroke-width:2.8px" d="M${rIn0[0]} ${rIn0[1]} L${rIn1[0]} ${rIn1[1]}"/>`);

  // Haces descompuestos en el espectro crítico del problema científico
  const rOut0 = at([12, -2, 54]);
  const rA = at([54, -22, 64]);
  const rB = at([54, -2, 54]);
  const rC = at([54, 18, 44]);
  out.push(`<path class="iso-line" data-tone="lit" style="stroke-width:1.8px" d="M${rOut0[0]} ${rOut0[1]} L${rA[0]} ${rA[1]}"/>`);
  out.push(`<path class="iso-line" data-tone="hi" style="stroke-width:1.8px" d="M${rOut0[0]} ${rOut0[1]} L${rB[0]} ${rB[1]}"/>`);
  out.push(`<path class="iso-line" data-tone="mid" style="stroke-width:1.8px" d="M${rOut0[0]} ${rOut0[1]} L${rC[0]} ${rC[1]}"/>`);

  return out.join("");
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. LA TENSIÓN ESTRUCTURAL: Balanza Dual de Tensión Normativa (Art. 75 vs 76)
// ─────────────────────────────────────────────────────────────────────────────
export function artSlide9(theta, flip, P, view, light) {
  const out = [];
  const at = (pt) => k.iso(pt, P);

  // Columna central de la balanza de latón macizo
  out.push(renderBox(-6, 6, -6, 6, 10.5, 76, P, view, light, { tone: "lit", customClass: "tfg-brass" }));

  // Pivote de cuchilla y reloj vernier en el cabezal
  const pivot = at([0, 0, 76]);
  out.push(k.dotsSvg([pivot], { size: 1.8, tone: "lit" }));

  // Brazo transversal basculante
  const armL = [-38, 0, 72];
  const armR = [38, 0, 78];
  const sL = at(armL);
  const sR = at(armR);
  out.push(`<path class="iso-line" data-tone="lit" style="stroke-width:3px" d="M${sL[0]} ${sL[1]} L${sR[0]} ${sR[1]}"/>`);

  // Platillo Izquierdo: "Art. 75 / Permanencia Sumativa" (pesa mayor cúbica)
  out.push(renderBox(-48, -28, -10, 10, 42, 46, P, view, light, { tone: "mid", customClass: "tfg-brass" }));
  out.push(renderBox(-44, -32, -6, 6, 46, 62, P, view, light, { tone: "lo", customClass: "tfg-leather" }));
  // Tirantes de suspensión izquierdo
  const pL0 = at([-38, 0, 46]);
  out.push(`<path class="iso-line" data-tone="lo" style="stroke-width:1.2px" d="M${sL[0]} ${sL[1]} L${pL0[0]} ${pL0[1]}"/>`);

  // Platillo Derecho: "Art. 76 / Capacitación Formativa"
  out.push(renderBox(28, 48, -10, 10, 48, 52, P, view, light, { tone: "mid", customClass: "tfg-brass" }));
  out.push(renderBox(32, 44, -6, 6, 52, 68, P, view, light, { tone: "hi", customClass: "tfg-gilt" }));
  // Tirantes de suspensión derecho
  const pR0 = at([38, 0, 52]);
  out.push(`<path class="iso-line" data-tone="lo" style="stroke-width:1.2px" d="M${sR[0]} ${sR[1]} L${pR0[0]} ${pR0[1]}"/>`);

  return out.join("");
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. PREGUNTA GENERAL: Pentágono Orbital de Factibilidad (5 Sellos)
// ─────────────────────────────────────────────────────────────────────────────
export function artSlide10(theta, flip, P, view, light) {
  const out = [];
  const at = (pt) => k.iso(pt, P);

  // Núcleo cilíndrico central de la Pregunta General
  out.push(renderBox(-12, 12, -12, 12, 10.5, 48, P, view, light, { tone: "hi", customClass: "tfg-base-podium" }));
  const coreOrb = at([0, 0, 54]);
  out.push(k.dotsSvg([coreOrb], { size: 2.2, tone: "lit" }));

  // 5 Brazos radiales a 72° con los 5 Sellos de Viabilidad
  for (let i = 0; i < 5; i++) {
    const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
    const r = 36;
    const px = r * Math.cos(a);
    const py = r * Math.sin(a);
    const zH = 34 + (i % 2) * 8;

    // Brazo de latón
    const pCenter = at([0, 0, 36]);
    const pEnd = at([px, py, zH]);
    out.push(`<path class="iso-line" data-tone="lit" style="stroke-width:2.2px" d="M${pCenter[0]} ${pCenter[1]} L${pEnd[0]} ${pEnd[1]}"/>`);

    // Sello de factibilidad en la punta
    out.push(renderBox(px - 7, px + 7, py - 7, py + 7, zH - 4, zH + 8, P, view, light, { tone: "lit", customClass: "tfg-brass" }));
    out.push(k.dotsSvg([at([px, py, zH + 9])], { size: 1.1, tone: "hi" }));
  }

  return out.join("");
}

// ─────────────────────────────────────────────────────────────────────────────
// 11. MATRIZ DE OBJETIVOS: Pirámide de Consistencia Metodológica
// ─────────────────────────────────────────────────────────────────────────────
export function artSlide11(theta, flip, P, view, light) {
  const out = [];

  // Nivel 1: Base de 4 bloques (OE1 a OE4)
  const bSize = 18;
  const offsets = [
    [-bSize, -bSize], [bSize, -bSize],
    [-bSize, bSize], [bSize, bSize]
  ];
  offsets.forEach(([ox, oy]) => {
    out.push(renderBox(ox - 14, ox + 14, oy - 14, oy + 14, 10.5, 26, P, view, light, { tone: "lo", customClass: "tfg-leather" }));
  });

  // Nivel 2: Plataforma de articulación metodológica
  out.push(renderBox(-28, 28, -28, 28, 26, 42, P, view, light, { tone: "hi", customClass: "tfg-base-podium" }));

  // Nivel 3: Prisma de integración
  out.push(renderBox(-20, 20, -20, 20, 42, 58, P, view, light, { tone: "mid", customClass: "tfg-wood" }));

  // Nivel 4 (Cúspide): Piramidión de oro con el Objetivo General
  out.push(renderBox(-12, 12, -12, 12, 58, 76, P, view, light, { tone: "lit", customClass: "tfg-brass" }));

  return out.join("");
}

// ─────────────────────────────────────────────────────────────────────────────
// 12. POSICIONAMIENTO TEÓRICO: Pórtico Institucional de Francisco Longo
// ─────────────────────────────────────────────────────────────────────────────
export function artSlide12(theta, flip, P, view, light) {
  const out = [];

  // Estilóbato / Podio inferior
  out.push(renderBox(-42, 42, -18, 18, 10.5, 20, P, view, light, { tone: "hi", customClass: "tfg-base-podium" }));

  // Tres Columnas de los Pilares del Empleo Público
  for (const cx of [-26, 0, 26]) {
    out.push(renderBox(cx - 5, cx + 5, -6, 6, 20, 60, P, view, light, { tone: "hi", customClass: "tfg-base-podium" }));
    out.push(renderBox(cx - 7, cx + 7, -8, 8, 60, 65, P, view, light, { tone: "lit", customClass: "tfg-brass" }));
  }

  // Entablamento de latón pulido
  out.push(renderBox(-38, 38, -12, 12, 65, 73, P, view, light, { tone: "lit", customClass: "tfg-brass" }));

  // Frontón triangular: "Generación de Valor Social"
  out.push(renderBox(-32, 32, -9, 9, 73, 84, P, view, light, { tone: "mid", customClass: "tfg-brass" }));

  return out.join("");
}

// ─────────────────────────────────────────────────────────────────────────────
// 13. SUBSISTEMAS DE RRHH: Engranajes Interconectados
// ─────────────────────────────────────────────────────────────────────────────
export function artSlide13(theta, flip, P, view, light) {
  const out = [];
  const at = (pt) => k.iso(pt, P);

  // Bastidor de maquinaria
  out.push(renderBox(-36, 36, -8, 8, 10.5, 24, P, view, light, { tone: "mid", customClass: "tfg-wood" }));

  // Tres grandes ruedas dentadas de bronce interconectadas verticalmente
  // Engranaje 1: Rendimiento
  out.push(renderBox(-28, -2, -6, 6, 24, 52, P, view, light, { tone: "lit", customClass: "tfg-brass" }));
  // Engranaje 2: Desarrollo
  out.push(renderBox(-4, 26, -6, 6, 44, 76, P, view, light, { tone: "mid", customClass: "tfg-brass" }));
  // Engranaje 3: Organización del Trabajo
  out.push(renderBox(-18, 14, -6, 6, 16, 40, P, view, light, { tone: "lo", customClass: "tfg-gilt" }));

  // Pernos de eje
  const p1 = at([-15, -7, 38]);
  const p2 = at([11, -7, 60]);
  const p3 = at([-2, -7, 28]);
  out.push(k.dotsSvg([p1, p2, p3], { size: 1.4, tone: "lit" }));

  return out.join("");
}

// ─────────────────────────────────────────────────────────────────────────────
// 14. DISPOSITIVO 360°: Radar Orbital de 4 Miradas Trianguladas
// ─────────────────────────────────────────────────────────────────────────────
export function artSlide14(theta, flip, P, view, light) {
  const out = [];
  const at = (pt) => k.iso(pt, P);

  // Plataforma circular de radar
  out.push(renderBox(-36, 36, -36, 36, 10.5, 22, P, view, light, { tone: "lo", customClass: "tfg-leather" }));

  // 4 Cuadrantes cardinales elevados:
  // Norte: Autoevaluación
  out.push(renderBox(-7, 7, -34, -20, 22, 54, P, view, light, { tone: "lit", customClass: "tfg-brass" }));
  // Sur: Estudiantes
  out.push(renderBox(-7, 7, 20, 34, 22, 54, P, view, light, { tone: "lit", customClass: "tfg-brass" }));
  // Este: Pares de Cátedra
  out.push(renderBox(20, 34, -7, 7, 22, 54, P, view, light, { tone: "lit", customClass: "tfg-brass" }));
  // Oeste: Dirección Departamental
  out.push(renderBox(-34, -20, -7, 7, 22, 54, P, view, light, { tone: "lit", customClass: "tfg-brass" }));

  // Antena central giratoria con haz de escaneo 360°
  const center = at([0, 0, 42]);
  const sweep = at([24, -24, 42]);
  out.push(`<path class="iso-line" data-tone="lit" style="stroke-width:2.4px" d="M${center[0]} ${center[1]} L${sweep[0]} ${sweep[1]}"/>`);
  out.push(k.dotsSvg([center], { size: 1.8, tone: "lit" }));

  return out.join("");
}

// ─────────────────────────────────────────────────────────────────────────────
// 15. ARQUITECTURA CIRCULAR 360° CURZAS: Esfera Armilar / Giroscopio
// ─────────────────────────────────────────────────────────────────────────────
export function artSlide15(theta, flip, P, view, light) {
  const out = [];
  const at = (pt) => k.iso(pt, P);

  // Pedestal del giroscopio
  out.push(renderBox(-18, 18, -18, 18, 10.5, 24, P, view, light, { tone: "mid", customClass: "tfg-brass" }));

  // Tres anillos armilares ortogonales en latón dorado
  const center = at([0, 0, 52]);
  const rH0 = at([-34, 0, 52]);
  const rH1 = at([34, 0, 52]);
  out.push(`<path class="iso-line" data-tone="lit" style="stroke-width:2.4px" d="M${rH0[0]} ${rH0[1]} A 34 18 0 1 0 ${rH1[0]} ${rH1[1]} A 34 18 0 1 0 ${rH0[0]} ${rH0[1]}"/>`);

  const rV0 = at([0, -34, 52]);
  const rV1 = at([0, 34, 52]);
  out.push(`<path class="iso-line" data-tone="hi" style="stroke-width:2.4px" d="M${rV0[0]} ${rV0[1]} A 18 34 0 1 0 ${rV1[0]} ${rV1[1]} A 18 34 0 1 0 ${rV0[0]} ${rV0[1]}"/>`);

  // Núcleo central confidencial blindado
  out.push(k.dotsSvg([center], { size: 2.8, tone: "lit" }));

  return out.join("");
}

// ─────────────────────────────────────────────────────────────────────────────
// 16. POLIGOBERNANZA Y PODER COMPARTIDO: Mesa de Cogobierno (Matus)
// ─────────────────────────────────────────────────────────────────────────────
export function artSlide16(theta, flip, P, view, light) {
  const out = [];

  // Pie central de la mesa
  out.push(renderBox(-8, 8, -8, 8, 10.5, 34, P, view, light, { tone: "lit", customClass: "tfg-brass" }));

  // Gran mesa redonda de concertación universitaria
  out.push(renderBox(-36, 36, -36, 36, 34, 40, P, view, light, { tone: "mid", customClass: "tfg-wood" }));

  // 4 Escaños / Sillas de los claustros
  const chairs = [
    { x: -44, y: 0 }, { x: 44, y: 0 },
    { x: 0, y: -44 }, { x: 0, y: 44 }
  ];
  chairs.forEach((c) => {
    out.push(renderBox(c.x - 6, c.x + 6, c.y - 6, c.y + 6, 10.5, 28, P, view, light, { tone: "lo", customClass: "tfg-leather" }));
    out.push(renderBox(c.x - 6, c.x + 6, c.y - 6, c.y - 3, 28, 48, P, view, light, { tone: "mid", customClass: "tfg-wood" }));
  });

  // Documento de acuerdo paritario en el centro de la mesa
  out.push(renderBox(-12, 12, -8, 8, 40, 42.5, P, view, light, { tone: "hi", customClass: "tfg-page" }));

  return out.join("");
}

// ─────────────────────────────────────────────────────────────────────────────
// 17. ESTADO DEL ARTE: Torre Tripartita y Vacancia Disciplinar
// ─────────────────────────────────────────────────────────────────────────────
export function artSlide17(theta, flip, P, view, light) {
  const out = [];

  // Nivel 1: Escala Internacional (base amplia)
  out.push(renderBox(-38, 38, -28, 28, 10.5, 28, P, view, light, { tone: "lo", customClass: "tfg-leather" }));

  // Nivel 2: Escala Nacional (intermedio)
  out.push(renderBox(-28, 28, -20, 20, 28, 46, P, view, light, { tone: "mid", customClass: "tfg-wood" }));

  // Nivel 3: Escala Regional / UNCo (cima)
  out.push(renderBox(-18, 18, -14, 14, 46, 64, P, view, light, { tone: "hi", customClass: "tfg-base-podium" }));

  // Catalejo / Mira óptica apuntando al nicho de vacancia
  out.push(renderBox(-4, 4, -26, 6, 64, 76, P, view, light, { tone: "lit", customClass: "tfg-brass" }));

  return out.join("");
}

// ─────────────────────────────────────────────────────────────────────────────
// 18. ESTRATEGIA METODOLÓGICA: Puente de Triangulación Mixta (CUAL-cuan)
// ─────────────────────────────────────────────────────────────────────────────
export function artSlide18(theta, flip, P, view, light) {
  const out = [];
  const at = (pt) => k.iso(pt, P);

  // Torre Cualitativa (Izquierda)
  out.push(renderBox(-38, -16, -14, 14, 10.5, 62, P, view, light, { tone: "lo", customClass: "tfg-leather" }));

  // Torre Cuantitativa (Derecha)
  out.push(renderBox(16, 38, -14, 14, 10.5, 62, P, view, light, { tone: "hi", customClass: "tfg-base-podium" }));

  // Puente de Triangulación Concurrente uniendo ambas torres
  out.push(renderBox(-20, 20, -8, 8, 56, 66, P, view, light, { tone: "lit", customClass: "tfg-brass" }));

  const centerKey = at([0, 0, 70]);
  out.push(k.dotsSvg([centerKey], { size: 1.8, tone: "lit" }));

  return out.join("");
}

// ─────────────────────────────────────────────────────────────────────────────
// 19. POBLACIÓN Y MUESTRA: Muestreador Estratificado
// ─────────────────────────────────────────────────────────────────────────────
export function artSlide19(theta, flip, P, view, light) {
  const out = [];
  const at = (pt) => k.iso(pt, P);

  // Bandeja de recolección muestral
  out.push(renderBox(-38, 38, -26, 26, 10.5, 20, P, view, light, { tone: "mid", customClass: "tfg-wood" }));

  // Estrato 1: Las 8 Entrevistas Clave (cilindros dorados de alto peso cualitativo)
  for (let i = 0; i < 8; i++) {
    const x = -30 + (i % 4) * 8;
    const y = -14 + Math.floor(i / 4) * 14;
    out.push(renderBox(x, x + 6, y, y + 8, 20, 48, P, view, light, { tone: "lit", customClass: "tfg-brass" }));
  }

  // Estrato 2: La Muestra Cuantitativa (Matriz de 45 puntos)
  const dots = [];
  for (let col = 6; col <= 34; col += 6) {
    for (let row = -16; row <= 16; row += 6) {
      dots.push(at([col, row, 21]));
    }
  }
  out.push(k.dotsSvg(dots, { size: 0.6, tone: "mid" }));

  return out.join("");
}

// ─────────────────────────────────────────────────────────────────────────────
// 20. MATRIZ DE OPERACIONALIZACIÓN: Tambor Pentagonal de Dimensiones
// ─────────────────────────────────────────────────────────────────────────────
export function artSlide20(theta, flip, P, view, light) {
  const out = [];

  // Tambor selector pentagonal
  out.push(renderBox(-26, 26, -26, 26, 10.5, 52, P, view, light, { tone: "mid", customClass: "tfg-leather" }));

  // Caras con indicadores graduados de latón
  out.push(renderBox(-22, 22, -28, -25, 18, 46, P, view, light, { tone: "lit", customClass: "tfg-brass" }));
  out.push(renderBox(-22, 22, 25, 28, 18, 46, P, view, light, { tone: "lit", customClass: "tfg-brass" }));

  // Dial superior micrométrico
  out.push(renderBox(-14, 14, -14, 14, 52, 64, P, view, light, { tone: "hi", customClass: "tfg-gilt" }));

  return out.join("");
}

// ─────────────────────────────────────────────────────────────────────────────
// 21. PROCEDIMIENTO Y CRONOGRAMA: Cilindro Temporal 2027 (Gantt Mecánico)
// ─────────────────────────────────────────────────────────────────────────────
export function artSlide21(theta, flip, P, view, light) {
  const out = [];

  // Cojinetes laterales de soporte
  out.push(renderBox(-42, -34, -8, 8, 10.5, 42, P, view, light, { tone: "lit", customClass: "tfg-brass" }));
  out.push(renderBox(34, 42, -8, 8, 10.5, 42, P, view, light, { tone: "lit", customClass: "tfg-brass" }));

  // Rodillo cronológico de 7 meses
  out.push(renderBox(-34, 34, -16, 16, 20, 52, P, view, light, { tone: "hi", customClass: "tfg-page" }));

  // 6 Levas de fases escalonadas (Fase 1 a 6)
  for (let f = 0; f < 6; f++) {
    const x = -26 + f * 10;
    const y = -10 + (f % 2) * 12;
    out.push(renderBox(x, x + 7, y, y + 6, 52, 62, P, view, light, { tone: "lit", customClass: "tfg-brass" }));
  }

  return out.join("");
}

// ─────────────────────────────────────────────────────────────────────────────
// 22. VIABILIDAD INTEGRAL: Trípode de Recursos y Avales
// ─────────────────────────────────────────────────────────────────────────────
export function artSlide22(theta, flip, P, view, light) {
  const out = [];
  const at = (pt) => k.iso(pt, P);

  // 3 Patas del Trípode (Recursos Humanos, Técnicos, Económicos)
  for (let i = 0; i < 3; i++) {
    const a = (i * 2 * Math.PI) / 3 - Math.PI / 2;
    const xBase = 32 * Math.cos(a);
    const yBase = 32 * Math.sin(a);
    const p0 = at([xBase, yBase, 10.5]);
    const p1 = at([0, 0, 54]);
    out.push(`<path class="iso-line" data-tone="lit" style="stroke-width:2.8px" d="M${p0[0]} ${p0[1]} L${p1[0]} ${p1[1]}"/>`);
    out.push(k.dotsSvg([p0], { size: 1.2, tone: "mid" }));
  }

  // Plataforma central de avales institucionales
  out.push(renderBox(-16, 16, -16, 16, 54, 62, P, view, light, { tone: "lit", customClass: "tfg-brass" }));

  // Esfera superior de viabilidad garantizada
  const topOrb = at([0, 0, 68]);
  out.push(k.dotsSvg([topOrb], { size: 2.8, tone: "hi" }));

  return out.join("");
}

// ─────────────────────────────────────────────────────────────────────────────
// 23. GARANTÍAS ÉTICAS: Bóveda de Confidencialidad y Blindaje (Ley 25.326)
// ─────────────────────────────────────────────────────────────────────────────
export function artSlide23(theta, flip, P, view, light) {
  const out = [];
  const at = (pt) => k.iso(pt, P);

  // Bóveda cúbica de acero blindado
  out.push(renderBox(-28, 28, -28, 28, 10.5, 54, P, view, light, { tone: "lo", customClass: "tfg-leather" }));

  // Puerta de caja fuerte con bisagras pesadas de latón
  out.push(renderBox(-22, 22, 27, 30, 16, 48, P, view, light, { tone: "lit", customClass: "tfg-brass" }));
  const dial = at([0, 31, 32]);
  out.push(k.dotsSvg([dial], { size: 2.2, tone: "lit" }));

  // Candado ceremonial de latón en la cima
  out.push(renderBox(-8, 8, -6, 6, 54, 66, P, view, light, { tone: "lit", customClass: "tfg-brass" }));
  const sh0 = at([-5, 0, 66]);
  const sh1 = at([5, 0, 66]);
  out.push(`<path class="iso-line" data-tone="lit" style="stroke-width:2.4px" d="M${sh0[0]} ${sh0[1]} A 8 10 0 0 1 ${sh1[0]} ${sh1[1]}"/>`);

  return out.join("");
}

// ─────────────────────────────────────────────────────────────────────────────
// 24. SÍNTESIS Y CONCLUSIONES: Faro de Valor Público
// ─────────────────────────────────────────────────────────────────────────────
export function artSlide24(theta, flip, P, view, light) {
  const out = [];
  const at = (pt) => k.iso(pt, P);

  // Base octogonal de granito
  out.push(renderBox(-30, 30, -30, 30, 10.5, 22, P, view, light, { tone: "hi", customClass: "tfg-base-podium" }));

  // Torre tronco-piramidal de faro institucional
  out.push(renderBox(-20, 20, -20, 20, 22, 58, P, view, light, { tone: "mid", customClass: "tfg-brass" }));

  // Linterna superior con haz de luz proyectado
  out.push(renderBox(-12, 12, -12, 12, 58, 72, P, view, light, { tone: "lit", customClass: "tfg-gilt" }));
  const lamp = at([0, 0, 65]);
  out.push(k.dotsSvg([lamp], { size: 2.8, tone: "lit" }));

  // Haces de proyección de valor público
  const b0 = at([48, -20, 78]);
  const b1 = at([48, 20, 56]);
  out.push(`<path class="iso-line" data-tone="lit" style="stroke-width:2.2px" d="M${lamp[0]} ${lamp[1]} L${b0[0]} ${b0[1]}"/>`);
  out.push(`<path class="iso-line" data-tone="lit" style="stroke-width:2.2px" d="M${lamp[0]} ${lamp[1]} L${b1[0]} ${b1[1]}"/>`);

  return out.join("");
}

// ─────────────────────────────────────────────────────────────────────────────
// 25. AGRADECIMIENTOS Y CIERRE: Gran Medallón de Honor UNCo
// ─────────────────────────────────────────────────────────────────────────────
export function artSlide25(theta, flip, P, view, light) {
  const out = [];
  const at = (pt) => k.iso(pt, P);

  // Pedestal ceremonial de mármol Carrara
  out.push(renderBox(-36, 36, -20, 20, 10.5, 26, P, view, light, { tone: "hi", customClass: "tfg-base-podium" }));

  // Gran Medallón Circular de Oro Pulido UNCo
  const medalCenter = [0, -4, 52];
  const mScreen = at(medalCenter);
  out.push(renderBox(-24, 24, -8, 0, 26, 78, P, view, light, { tone: "lit", customClass: "tfg-gilt" }));
  out.push(k.dotsSvg([mScreen], { size: 3.8, tone: "lit" }));

  // Laureles dorados en altorrelieve alrededor del sello
  const seal0 = at([-16, -9, 52]);
  const seal1 = at([16, -9, 52]);
  out.push(`<path class="iso-line tfg-gold-line" data-tone="lit" style="stroke-width:2.4px" d="M${seal0[0]} ${seal0[1]} A 16 16 0 1 0 ${seal1[0]} ${seal1[1]} A 16 16 0 1 0 ${seal0[0]} ${seal0[1]}"/>`);

  // Placa conmemorativa de gratitud a la cátedra
  out.push(renderBox(-28, 28, 8, 18, 26, 32, P, view, light, { tone: "lit", customClass: "tfg-brass" }));

  return out.join("");
}

// ─────────────────────────────────────────────────────────────────────────────
// REGISTRO MAESTRO
// ─────────────────────────────────────────────────────────────────────────────
export const SLIDE_ARTIFACTS = {
  1: artSlide1,
  2: artSlide2,
  3: artSlide3,
  4: artSlide4,
  5: artSlide5,
  6: artSlide6,
  7: artSlide7,
  8: artSlide8,
  9: artSlide9,
  10: artSlide10,
  11: artSlide11,
  12: artSlide12,
  13: artSlide13,
  14: artSlide14,
  15: artSlide15,
  16: artSlide16,
  17: artSlide17,
  18: artSlide18,
  19: artSlide19,
  20: artSlide20,
  21: artSlide21,
  22: artSlide22,
  23: artSlide23,
  24: artSlide24,
  25: artSlide25
};

// Serialización para ejecución en cliente
export const SLIDE_ARTIFACTS_CLIENT_CODE = `
${renderBox.toString()}

${artSlide1.toString()}
${artSlide2.toString()}
${artSlide3.toString()}
${artSlide4.toString()}
${artSlide5.toString()}
${artSlide6.toString()}
${artSlide7.toString()}
${artSlide8.toString()}
${artSlide9.toString()}
${artSlide10.toString()}
${artSlide11.toString()}
${artSlide12.toString()}
${artSlide13.toString()}
${artSlide14.toString()}
${artSlide15.toString()}
${artSlide16.toString()}
${artSlide17.toString()}
${artSlide18.toString()}
${artSlide19.toString()}
${artSlide20.toString()}
${artSlide21.toString()}
${artSlide22.toString()}
${artSlide23.toString()}
${artSlide24.toString()}
${artSlide25.toString()}

const SLIDE_ARTIFACTS = {
  1: artSlide1,
  2: artSlide2,
  3: artSlide3,
  4: artSlide4,
  5: artSlide5,
  6: artSlide6,
  7: artSlide7,
  8: artSlide8,
  9: artSlide9,
  10: artSlide10,
  11: artSlide11,
  12: artSlide12,
  13: artSlide13,
  14: artSlide14,
  15: artSlide15,
  16: artSlide16,
  17: artSlide17,
  18: artSlide18,
  19: artSlide19,
  20: artSlide20,
  21: artSlide21,
  22: artSlide22,
  23: artSlide23,
  24: artSlide24,
  25: artSlide25
};
`;
