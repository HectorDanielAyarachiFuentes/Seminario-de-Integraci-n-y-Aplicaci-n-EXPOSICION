/**
 * =============================================================================
 * OBJETOS 3D — BLOQUE I: ESCULTURAS 1 A 5
 * Presentación de Tesina • CURZAS - UNCo
 * =============================================================================
 * Representación visual concreta y pertinente de la Sección 1:
 * 1. anim_01: El Gran Tomo Encuadernado de Tesina (CURZAS-UNCo)
 * 2. anim_02: Credencial Profesional & Monolito de Carrera (Héctor Ayarachi)
 * 3. anim_03: Podio Cúbico de los 4 Cimientos del TFG (Esquema TP N° 2)
 * 4. anim_04: Díptico Epistemológico de 2 Columnas (Segunda Parte: Teoría y Antecedentes)
 * 5. anim_05: Tríptico de Ingeniería Metodológica Integral (Esquema TP N° 4)
 */

window.Presentation3D_Objects = window.Presentation3D_Objects || {};

// ──────────────────────────────────────────────────────────────────────────
// 1. CARÁTULA OFICIAL: El Gran Tomo Encuadernado de Tesina en Atril
// ──────────────────────────────────────────────────────────────────────────
// Procedural textures cache for Thesis Tome in Slide 1
let _tfgCoverTex = null;
let _tfgLeftPageTex = null;
let _tfgRightPageTex = null;

function getTFGCoverTexture() {
  if (_tfgCoverTex) return _tfgCoverTex;
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 768;
  const ctx = canvas.getContext("2d");

  // Cuero azul institucional profundo UNCo
  ctx.fillStyle = "#091a32";
  ctx.fillRect(0, 0, 512, 768);

  // Grano sutil de encuadernación en piel
  for (let i = 0; i < 14000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 768;
    const alpha = Math.random() * 0.07;
    ctx.fillStyle = Math.random() > 0.5 ? `rgba(255,255,255,${alpha})` : `rgba(0,0,0,${alpha})`;
    ctx.fillRect(x, y, 1.5, 1.5);
  }

  // Marco perimetral con filetes dorados estampados al calor
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 4;
  ctx.strokeRect(24, 24, 512 - 48, 768 - 48);
  ctx.lineWidth = 1.5;
  ctx.strokeRect(34, 34, 512 - 68, 768 - 68);

  // Florones dorados en las esquinas
  const corners = [[34, 34], [512 - 34, 34], [34, 768 - 34], [512 - 34, 768 - 34]];
  ctx.fillStyle = "#d4af37";
  corners.forEach(([cx, cy]) => {
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.fill();
  });

  _tfgCoverTex = new THREE.CanvasTexture(canvas);
  return _tfgCoverTex;
}

function getTFGLeftPageTexture() {
  if (_tfgLeftPageTex) return _tfgLeftPageTex;
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 768;
  const ctx = canvas.getContext("2d");

  // Pergamino marfil cálido
  ctx.fillStyle = "#faf7ee";
  ctx.fillRect(0, 0, 512, 768);

  // Regla guía sutil de margen
  ctx.strokeStyle = "rgba(180, 131, 36, 0.22)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(42, 38);
  ctx.lineTo(42, 730);
  ctx.stroke();

  // Encabezado institucional
  ctx.fillStyle = "#0f2d59";
  ctx.font = "bold 17px 'Cinzel', serif, Georgia";
  ctx.textAlign = "left";
  ctx.fillText("PREFACIO & ESTRUCTURA METODOLÓGICA", 48, 64);

  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(48, 74);
  ctx.lineTo(470, 74);
  ctx.stroke();

  // Bloques de texto justificado de tesina
  let y = 104;
  const sections = [
    { title: "SECCIÓN 1.1 — INTRODUCCIÓN GENERAL", lines: [400, 385, 395, 340, 260] },
    { title: "SECCIÓN 1.2 — MARCO EPISTEMOLÓGICO", lines: [410, 395, 370, 310] },
    { title: "SECCIÓN 1.3 — ANÁLISIS DE ANTECEDENTES", lines: [390, 405, 360, 380, 290] },
    { title: "SECCIÓN 1.4 — OBJETIVOS & ALCANCES", lines: [415, 385, 390, 350, 320, 230] }
  ];

  sections.forEach(sec => {
    ctx.fillStyle = "#b45309";
    ctx.font = "bold 13px 'Cinzel', serif, Georgia";
    ctx.fillText(sec.title, 50, y);
    y += 18;

    ctx.fillStyle = "#64748b";
    sec.lines.forEach(w => {
      ctx.fillRect(50, y, w, 3.5);
      y += 12;
    });
    y += 16;
  });

  // Pie de página
  ctx.fillStyle = "#94a3b8";
  ctx.font = "italic 11px sans-serif";
  ctx.fillText("CURZAS • UNCo — Seminario de Integración y Aplicación", 50, 735);
  ctx.textAlign = "right";
  ctx.fillText("Pág. 1", 470, 735);

  _tfgLeftPageTex = new THREE.CanvasTexture(canvas);
  return _tfgLeftPageTex;
}

function getTFGRightPageTexture() {
  if (_tfgRightPageTex) return _tfgRightPageTex;
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 768;
  const ctx = canvas.getContext("2d");

  // Pergamino marfil cálido
  ctx.fillStyle = "#faf7ee";
  ctx.fillRect(0, 0, 512, 768);

  // Doble marco dorado con esquinas ornamentales
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 3;
  ctx.strokeRect(26, 26, 512 - 52, 768 - 52);
  ctx.lineWidth = 1;
  ctx.strokeRect(32, 32, 512 - 64, 768 - 64);

  // Encabezado universitario oficial
  ctx.textAlign = "center";
  ctx.fillStyle = "#0a1d37";
  ctx.font = "bold 15px 'Cinzel', serif, Georgia";
  ctx.fillText("UNIVERSIDAD NACIONAL DEL COMAHUE", 256, 75);

  ctx.fillStyle = "#475569";
  ctx.font = "12px 'Cinzel', serif, Georgia";
  ctx.fillText("CENTRO UNIVERSITARIO REGIONAL ZONA ATLÁNTICA", 256, 95);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "10px sans-serif";
  ctx.fillText("DEPARTAMENTO DE INFORMÁTICA Y CIENCIAS EXACTAS", 256, 112);

  // Filete divisorio dorado
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(110, 125);
  ctx.lineTo(402, 125);
  ctx.stroke();

  // Escudo / Sol central académico
  ctx.fillStyle = "#d4af37";
  ctx.beginPath();
  ctx.arc(256, 180, 28, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#faf7ee";
  ctx.beginPath();
  ctx.arc(256, 180, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#0f2d59";
  ctx.font = "bold 17px serif";
  ctx.fillText("UNCo", 256, 186);

  // Título oficial de tesina
  ctx.fillStyle = "#0f2d59";
  ctx.font = "bold 20px 'Cinzel', serif, Georgia";
  ctx.fillText("TRABAJO FINAL DE GRADO", 256, 260);

  ctx.fillStyle = "#b45309";
  ctx.font = "bold 13px 'Cinzel', serif, Georgia";
  ctx.fillText("SEMINARIO DE INTEGRACIÓN Y APLICACIÓN", 256, 285);

  ctx.strokeStyle = "#b45309";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(140, 305);
  ctx.lineTo(372, 305);
  ctx.stroke();

  ctx.fillStyle = "#334155";
  ctx.font = "italic 12px serif";
  ctx.fillText("«Desarrollo, Gobernanza y Arquitectura", 256, 345);
  ctx.fillText("de Sistemas para el Ámbito Académico Regional»", 256, 365);

  // Recuadro institucional del postulante
  ctx.fillStyle = "#f1f5f9";
  ctx.fillRect(75, 415, 362, 115);
  ctx.strokeStyle = "#cbd5e1";
  ctx.lineWidth = 1;
  ctx.strokeRect(75, 415, 362, 115);

  ctx.fillStyle = "#0a1d37";
  ctx.font = "bold 11px sans-serif";
  ctx.fillText("AUTOR / POSTULANTE:", 256, 440);

  ctx.fillStyle = "#0f2d59";
  ctx.font = "bold 14px 'Cinzel', serif, Georgia";
  ctx.fillText("HÉCTOR DANIEL AYARACHI FUENTES", 256, 465);

  ctx.fillStyle = "#64748b";
  ctx.font = "11px sans-serif";
  ctx.fillText("Licenciatura en Sistemas de Información", 256, 488);
  ctx.fillText("Defensa Pública Oral ante Tribunal Académico", 256, 508);

  // Pie y radicación geográfica
  ctx.fillStyle = "#475569";
  ctx.font = "bold 11px 'Cinzel', serif, Georgia";
  ctx.fillText("VIEDMA • RÍO NEGRO • REPÚBLICA ARGENTINA", 256, 685);
  ctx.fillStyle = "#94a3b8";
  ctx.font = "10px sans-serif";
  ctx.fillText("Sede Central CURZAS • 2026", 256, 705);

  _tfgRightPageTex = new THREE.CanvasTexture(canvas);
  return _tfgRightPageTex;
}

window.Presentation3D_Objects["anim_01"] = {
  build(engine, g) {
    // 1. Basamento monumental de museo
    engine.createMuseumPlinth(g, 1.45, 0.22, -1.22);

    // 2. Pedestal secundario octogonal de granito negro y molduras de latón
    const pedestalBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.38, 0.44, 0.10, 16),
      engine.graniteMat(0x0f172a, 0.35, 0.25)
    );
    pedestalBase.position.y = -1.06;
    pedestalBase.receiveShadow = true;
    g.add(pedestalBase);

    const footRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.37, 0.022, 16, 48),
      engine.brassMat()
    );
    footRing.rotation.x = Math.PI / 2;
    footRing.position.y = -1.01;
    g.add(footRing);

    const footCap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.28, 0.04, 32),
      engine.brassMat()
    );
    footCap.position.y = -0.98;
    g.add(footCap);

    // 3. Columna clásica acanalada en mármol de Carrara marfil
    const columnShaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.105, 0.135, 0.90, 32),
      engine.marbleMat(0xf8fafc, 0.25)
    );
    columnShaft.position.y = -0.52;
    columnShaft.castShadow = true;
    columnShaft.receiveShadow = true;
    g.add(columnShaft);

    // Anillos / collares decorativos de latón en el fuste
    const collarY = [-0.88, -0.52, -0.16];
    collarY.forEach((cy, idx) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.128 - idx * 0.007, 0.012, 16, 32),
        engine.brassMat()
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.y = cy;
      g.add(ring);
    });

    // 4. Capitel clásico y ábaco de montaje
    const capitalFlared = new THREE.Mesh(
      new THREE.CylinderGeometry(0.21, 0.11, 0.08, 32),
      engine.brassMat(0xd4af37)
    );
    capitalFlared.position.y = -0.03;
    g.add(capitalFlared);

    const capitalAbacus = new THREE.Mesh(
      new THREE.BoxGeometry(0.28, 0.04, 0.28),
      engine.graniteMat(0x0f172a)
    );
    capitalAbacus.position.y = 0.03;
    g.add(capitalAbacus);

    // 5. Cuna mecánica de latón maquinado y horquilla de muñones (Yoke)
    const yokeGroup = new THREE.Group();
    yokeGroup.position.y = 0.05;

    const yokeBeam = new THREE.Mesh(
      new THREE.BoxGeometry(0.66, 0.05, 0.14),
      engine.brassMat()
    );
    yokeBeam.position.y = 0.025;
    yokeGroup.add(yokeBeam);

    const yokeLeft = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.30, 0.12),
      engine.brassMat()
    );
    yokeLeft.position.set(-0.30, 0.15, 0);
    yokeGroup.add(yokeLeft);

    const yokeRight = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.30, 0.12),
      engine.brassMat()
    );
    yokeRight.position.set(0.30, 0.15, 0);
    yokeGroup.add(yokeRight);

    // Muñones de pivote y volantes estriados de bloqueo a cada lado
    [-0.34, 0.34].forEach(px => {
      const pin = new THREE.Mesh(
        new THREE.CylinderGeometry(0.045, 0.045, 0.05, 24),
        engine.goldMat()
      );
      pin.rotation.z = Math.PI / 2;
      pin.position.set(px, 0.24, 0);
      yokeGroup.add(pin);

      const knob = new THREE.Mesh(
        new THREE.CylinderGeometry(0.065, 0.065, 0.025, 24),
        engine.brassMat()
      );
      knob.rotation.z = Math.PI / 2;
      knob.position.set(px + (px > 0 ? 0.025 : -0.025), 0.24, 0);
      yokeGroup.add(knob);
    });

    // Cuadrante graduado de inclinación (sector angular a 32°)
    const sectorArc = new THREE.Mesh(
      new THREE.TorusGeometry(0.18, 0.012, 12, 32, Math.PI / 2),
      engine.brassMat()
    );
    sectorArc.position.set(-0.31, 0.24, 0);
    sectorArc.rotation.y = Math.PI / 2;
    sectorArc.rotation.z = Math.PI * 0.15;
    yokeGroup.add(sectorArc);

    g.add(yokeGroup);

    // 6. Atril basculante de caoba noble pulida con ángulo de lectura a 32°
    const deskGroup = new THREE.Group();
    deskGroup.position.set(0, 0.29, 0);
    deskGroup.rotation.x = (32 * Math.PI) / 180;

    const mahoganyMat = new THREE.MeshStandardMaterial({
      color: 0x361605, // Caoba profunda oscura pulida
      roughness: 0.26,
      metalness: 0.06
    });

    // Tablero principal de caoba biselado
    const deskPlate = new THREE.Mesh(
      new THREE.BoxGeometry(1.38, 0.045, 1.04),
      mahoganyMat
    );
    deskPlate.castShadow = true;
    deskPlate.receiveShadow = true;
    deskGroup.add(deskPlate);

    // Moldura perimetral dorada
    const deskTrim = new THREE.Mesh(
      new THREE.BoxGeometry(1.40, 0.048, 0.02),
      engine.brassMat(0xd4af37)
    );
    deskTrim.position.set(0, 0, -0.52);
    deskGroup.add(deskTrim);

    // 4 Cantoneras de latón labrado en las esquinas del atril
    const cornerOffsets = [
      [-0.67, -0.50], [0.67, -0.50],
      [-0.67, 0.50], [0.67, 0.50]
    ];
    cornerOffsets.forEach(([cx, cz]) => {
      const corner = new THREE.Mesh(
        new THREE.BoxGeometry(0.10, 0.05, 0.10),
        engine.brassMat(0xd4af37)
      );
      corner.position.set(cx, 0.005, cz);
      deskGroup.add(corner);
    });

    // Reborde de retención inferior de caoba con chapa frontal de latón
    const ledgeMahogany = new THREE.Mesh(
      new THREE.BoxGeometry(1.38, 0.09, 0.06),
      mahoganyMat
    );
    ledgeMahogany.position.set(0, 0.05, 0.49);
    deskGroup.add(ledgeMahogany);

    const ledgeBrass = new THREE.Mesh(
      new THREE.BoxGeometry(1.38, 0.065, 0.015),
      engine.brassMat(0xd4af37)
    );
    ledgeBrass.position.set(0, 0.05, 0.525);
    deskGroup.add(ledgeBrass);

    // Medallón central de latón en el reborde inferior
    const ledgeSeal = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.02, 24),
      engine.goldMat()
    );
    ledgeSeal.rotation.x = Math.PI / 2;
    ledgeSeal.position.set(0, 0.05, 0.535);
    deskGroup.add(ledgeSeal);

    // Pinzas sujetapáginas articuladas de latón (page-clamps) a izquierda y derecha
    [-0.44, 0.44].forEach(px => {
      const clampFinger = new THREE.Mesh(
        new THREE.BoxGeometry(0.035, 0.075, 0.14),
        engine.brassMat()
      );
      clampFinger.position.set(px, 0.08, 0.46);
      clampFinger.rotation.x = -0.25;
      deskGroup.add(clampFinger);
    });

    // 7. El Gran Tomo Abierto de Tesina (UNCo - CURZAS)
    const bookGroup = new THREE.Group();
    bookGroup.position.set(0, 0.055, 0.02);

    // Tapas duras en cuero azul marino UNCo con filetes dorados
    const coverTex = getTFGCoverTexture();
    const coverMat = new THREE.MeshStandardMaterial({
      color: 0x091a32,
      map: coverTex,
      roughness: 0.35,
      metalness: 0.15
    });

    const leftCover = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.028, 0.84), coverMat);
    leftCover.position.set(-0.295, 0.018, 0);
    leftCover.rotation.z = -0.06;
    leftCover.castShadow = true;
    bookGroup.add(leftCover);

    const rightCover = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.028, 0.84), coverMat);
    rightCover.position.set(0.295, 0.018, 0);
    rightCover.rotation.z = 0.06;
    rightCover.castShadow = true;
    bookGroup.add(rightCover);

    // Lomo curvado inferior de cuero azul
    const spineGeom = new THREE.CylinderGeometry(0.055, 0.055, 0.84, 16, 1, false, Math.PI, Math.PI);
    const spineMesh = new THREE.Mesh(spineGeom, coverMat);
    spineMesh.rotation.x = Math.PI / 2;
    spineMesh.rotation.y = Math.PI / 2;
    spineMesh.position.set(0, -0.01, 0);
    bookGroup.add(spineMesh);

    // 5 Nervaduras de lomo doradas (embossed gold ribs)
    const ribZ = [-0.32, -0.16, 0, 0.16, 0.32];
    ribZ.forEach(rz => {
      const rib = new THREE.Mesh(
        new THREE.TorusGeometry(0.058, 0.009, 12, 16, Math.PI),
        engine.goldMat()
      );
      rib.rotation.x = Math.PI / 2;
      rib.rotation.y = Math.PI / 2;
      rib.position.set(0, -0.01, rz);
      bookGroup.add(rib);
    });

    // 8. Bloque de hojas con corte dorado brillante (Gilded edges)
    const goldEdgeMat = engine.goldMat();
    const leftBlockBase = new THREE.Mesh(new THREE.BoxGeometry(0.50, 0.04, 0.78), goldEdgeMat);
    leftBlockBase.position.set(-0.28, 0.042, 0);
    leftBlockBase.rotation.z = -0.05;
    bookGroup.add(leftBlockBase);

    const rightBlockBase = new THREE.Mesh(new THREE.BoxGeometry(0.50, 0.04, 0.78), goldEdgeMat);
    rightBlockBase.position.set(0.28, 0.042, 0);
    rightBlockBase.rotation.z = 0.05;
    bookGroup.add(rightBlockBase);

    // 9. Hojas superiores abiertas con textura pergamino de alta definición
    const leftPageTex = getTFGLeftPageTexture();
    const leftPageMat = new THREE.MeshStandardMaterial({
      map: leftPageTex,
      roughness: 0.55,
      metalness: 0.02
    });
    const leftPage = new THREE.Mesh(new THREE.BoxGeometry(0.49, 0.015, 0.76), leftPageMat);
    leftPage.position.set(-0.275, 0.068, 0);
    leftPage.rotation.z = -0.045;
    bookGroup.add(leftPage);

    const rightPageTex = getTFGRightPageTexture();
    const rightPageMat = new THREE.MeshStandardMaterial({
      map: rightPageTex,
      roughness: 0.55,
      metalness: 0.02
    });
    const rightPage = new THREE.Mesh(new THREE.BoxGeometry(0.49, 0.015, 0.76), rightPageMat);
    rightPage.position.set(0.275, 0.068, 0);
    rightPage.rotation.z = 0.045;
    bookGroup.add(rightPage);

    // 10. Medallón central en alto relieve con el escudo de la UNCo
    const sealGroup = new THREE.Group();
    sealGroup.position.set(0, 0.10, -0.22);
    sealGroup.rotation.x = Math.PI / 2;

    const sealBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 0.022, 32),
      engine.brassMat(0xffd700)
    );
    sealGroup.add(sealBase);

    const sealRim = new THREE.Mesh(
      new THREE.TorusGeometry(0.12, 0.015, 16, 32),
      engine.goldMat()
    );
    sealRim.position.y = 0.012;
    sealGroup.add(sealRim);

    const sealSun = new THREE.Mesh(
      new THREE.CylinderGeometry(0.045, 0.045, 0.025, 8),
      engine.goldMat()
    );
    sealSun.position.y = 0.014;
    sealGroup.add(sealSun);

    bookGroup.add(sealGroup);

    // 11. Cinta ceremonial de seda dorada y azul señaladora (Bookmark Ribbon)
    const ribbonMat = new THREE.MeshStandardMaterial({
      color: 0xd97706, // Seda azafrán dorada
      roughness: 0.32,
      metalness: 0.22
    });

    // Tramo superior sobre la página derecha
    const ribbonTop = new THREE.Mesh(
      new THREE.BoxGeometry(0.045, 0.008, 0.82),
      ribbonMat
    );
    ribbonTop.position.set(0.035, 0.082, 0.12);
    ribbonTop.rotation.y = -0.05;
    bookGroup.add(ribbonTop);

    // Cola colgante de la cinta que cae por delante del reborde
    const ribbonTail = new THREE.Mesh(
      new THREE.BoxGeometry(0.045, 0.28, 0.008),
      ribbonMat
    );
    ribbonTail.position.set(0.055, -0.06, 0.54);
    ribbonTail.rotation.x = 0.18;
    deskGroup.add(ribbonTail);

    deskGroup.add(bookGroup);
    g.add(deskGroup);

    // 12. Cartela flotante del título oficial en 3D
    const label = engine.createLabelSprite(
      "PROYECTO INTEGRAL DE TFG",
      "CURZAS — Universidad Nacional del Comahue",
      "#0f2d59",
      true
    );
    label.position.set(0, 1.08, 0);
    g.add(label);

    engine.anim01_desk = deskGroup;
    engine.anim01_ribbonTail = ribbonTail;
  },

  animate(engine, t) {
    // Oscilación suave de suspensión (breathing effect)
    if (engine.anim01_desk) {
      engine.anim01_desk.position.y = 0.29 + Math.sin(t * 1.4) * 0.006;
    }
    // Ondulación de la cinta de seda ceremonial
    if (engine.anim01_ribbonTail) {
      engine.anim01_ribbonTail.rotation.z = Math.sin(t * 1.8) * 0.06;
      engine.anim01_ribbonTail.rotation.x = 0.18 + Math.cos(t * 1.5) * 0.04;
    }
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 2. PRESENTACIÓN DEL TESISTA: Credencial Profesional & Monolito de Carrera
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_02"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.35, 0.22, -1.22);

    // 1. Basamento monumental de granito negro y caoba noble
    const pedestalBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.36, 0.42, 0.10, 16),
      engine.graniteMat(0x0f172a, 0.35, 0.25)
    );
    pedestalBase.position.y = -1.06;
    pedestalBase.receiveShadow = true;
    g.add(pedestalBase);

    const footRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.35, 0.02, 16, 48),
      engine.brassMat()
    );
    footRing.rotation.x = Math.PI / 2;
    footRing.position.y = -1.01;
    g.add(footRing);

    // Fuste de caoba oscura con cantoneras de latón
    const shaftChassis = engine.createMachinedChassis(0.44, 0.78, 0.28, { color: 0x2e1204 });
    shaftChassis.position.y = -0.58;
    g.add(shaftChassis);

    // Capitel de latón maquinado
    const capitalMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 0.05, 0.32),
      engine.brassMat(0xd4af37)
    );
    capitalMesh.position.y = -0.16;
    g.add(capitalMesh);

    // 2. Credencial académica flotante en marco de latón pulido y cristal esmerilado
    const cardGroup = new THREE.Group();
    cardGroup.position.set(0, 0.30, 0);

    // Marco exterior con cantoneras doradas
    const frameMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.92, 1.32, 0.045),
      engine.brassMat(0xd4af37)
    );
    frameMesh.castShadow = true;
    cardGroup.add(frameMesh);

    // 4 Cantoneras angulares en las esquinas de la credencial
    const cx = 0.43;
    const cy = 0.63;
    [[-cx, -cy], [cx, -cy], [-cx, cy], [cx, cy]].forEach(([x, y]) => {
      const corner = new THREE.Mesh(
        new THREE.BoxGeometry(0.10, 0.10, 0.055),
        engine.goldMat(0xffd700)
      );
      corner.position.set(x, y, 0);
      cardGroup.add(corner);
    });

    // Cuerpo de vidrio templado translúcido esmerilado
    const cardGlass = new THREE.Mesh(
      new THREE.BoxGeometry(0.86, 1.26, 0.035),
      engine.glassMat(0xf8fafc, { opacity: 0.85, roughness: 0.08 })
    );
    cardGroup.add(cardGlass);

    // 3. Escudo oficial UNCo en alto relieve superior
    const seal = engine.createAcademicSeal(0.10);
    seal.position.set(0, 0.44, 0.028);
    cardGroup.add(seal);

    // 4. Placa técnica grabada con datos de identidad del tesista
    const infoPlaque = engine.createEngravedPlaque(
      0.80,
      0.44,
      "HÉCTOR DANIEL AYARACHI FUENTES",
      "Tec. Sup. en RRHH • Legajo 8252 • DNI 35.492.138",
      ["CURZAS", "UNIVERSIDAD NACIONAL DEL COMAHUE", "TFG 2026/2027"],
      { theme: "dark" }
    );
    infoPlaque.position.set(0, 0.08, 0.024);
    cardGroup.add(infoPlaque);

    // 5. Dial graduado de progreso académico hacia la Licenciatura (100% completado / En Defensa)
    const progDial = engine.createGraduatedDial(0.14, {
      divisions: 40,
      isPercentage: true,
      title: "100%",
      sub: "DEFENSA",
      theme: "dark"
    });
    progDial.rotation.x = Math.PI / 2;
    progDial.position.set(0, -0.38, 0.035);
    if (progDial.needle) {
      progDial.needle.rotation.y = -Math.PI * 0.75;
    }
    cardGroup.add(progDial);

    g.add(cardGroup);

    // Cartela flotante superior
    const label = engine.createLabelSprite(
      "HÉCTOR DANIEL AYARACHI FUENTES",
      "Tec. Sup. en RRHH • Legajo 8252 • CURZAS-UNCo",
      "#0f2d59",
      true
    );
    label.position.set(0, 1.20, 0);
    g.add(label);

    engine.anim02_card = cardGroup;
    engine.anim02_dial = progDial;
  },

  animate(engine, t) {
    if (engine.anim02_card) {
      engine.anim02_card.position.y = 0.30 + Math.sin(t * 1.5) * 0.015;
      engine.anim02_card.rotation.y = Math.sin(t * 0.7) * 0.04;
    }
    if (engine.anim02_dial && engine.anim02_dial.needle) {
      engine.anim02_dial.needle.rotation.y = -Math.PI * 0.75 + Math.sin(t * 2.0) * 0.05;
    }
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 3. ESQUEMA SIA TP N° 2: Podio Cúbico de los 4 Cimientos del TFG
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_03"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.45, 0.22, -1.22);

    const foundationGroup = new THREE.Group();
    foundationGroup.position.set(0, -0.15, 0);

    const items = [
      { x: -0.42, z: -0.42, h: 0.58, title: "I. CARÁTULA", sub: "Marco Institucional" },
      { x: 0.42, z: -0.42, h: 0.78, title: "II. TEMA", sub: "Área y Contexto" },
      { x: -0.42, z: 0.42, h: 0.98, title: "III. PROBLEMA", sub: "Desnaturalización" },
      { x: 0.42, z: 0.42, h: 1.18, title: "IV. OBJETIVOS", sub: "General y Específicos" }
    ];

    engine.anim03_blocks = [];

    items.forEach((item, idx) => {
      const blockGroup = new THREE.Group();
      blockGroup.position.set(item.x, -0.85 + item.h / 2, item.z);

      // Zócalo inferior de caoba noble
      const baseChassis = engine.createMachinedChassis(0.66, 0.08, 0.66, { color: 0x2e1204 });
      baseChassis.position.y = -item.h / 2 + 0.04;
      blockGroup.add(baseChassis);

      // Fuste cúbico de mármol Carrara veteado
      const blockMesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.60, item.h - 0.12, 0.60),
        engine.marbleMat(0xfdfbf7, 0.28)
      );
      blockMesh.position.y = 0.02;
      blockMesh.castShadow = true;
      blockMesh.receiveShadow = true;
      blockGroup.add(blockMesh);

      // Chapa técnica grabada en la cara frontal del cimiento
      const plaque = engine.createEngravedPlaque(
        0.52,
        0.20,
        item.title,
        item.sub,
        [`CIMIENTO ${idx + 1}/4`],
        { theme: "dark" }
      );
      plaque.position.set(0, 0.02, 0.31);
      blockGroup.add(plaque);

      // Tapa superior de latón moldurado
      const topCap = new THREE.Mesh(
        new THREE.BoxGeometry(0.62, 0.035, 0.62),
        engine.brassMat(0xd4af37)
      );
      topCap.position.y = item.h / 2 - 0.02;
      blockGroup.add(topCap);

      // Artefacto distintivo de ingeniería sobre la cima
      if (idx === 0) {
        // I: Brújula náutica / compás y pergamino
        const compass = new THREE.Mesh(
          new THREE.CylinderGeometry(0.12, 0.12, 0.03, 24),
          engine.goldMat(0xffd700)
        );
        compass.position.y = item.h / 2 + 0.03;
        blockGroup.add(compass);
      } else if (idx === 1) {
        // II: Aro armilar astronómico
        const ring = engine.createBrassArmillaryRing(0.14, 0.012);
        ring.position.y = item.h / 2 + 0.15;
        ring.rotation.x = Math.PI / 4;
        blockGroup.add(ring);
      } else if (idx === 2) {
        // III: Dial de precisión de diagnóstico
        const dial = engine.createGraduatedDial(0.11, {
          title: "SIA",
          sub: "360°",
          divisions: 30,
          theme: "light"
        });
        dial.position.y = item.h / 2 + 0.03;
        blockGroup.add(dial);
      } else if (idx === 3) {
        // IV: Obelisco prismático de cristal óptico con luz cenital
        const prism = new THREE.Mesh(
          new THREE.ConeGeometry(0.12, 0.32, 4),
          engine.glassMat(0x38bdf8, { roughness: 0.05, opacity: 0.85 })
        );
        prism.position.y = item.h / 2 + 0.18;
        blockGroup.add(prism);

        const beaconLight = new THREE.PointLight(0x38bdf8, 0.8, 1.2);
        beaconLight.position.y = item.h / 2 + 0.18;
        blockGroup.add(beaconLight);
      }

      // Etiqueta flotante
      const label = engine.createLabelSprite(item.title, item.sub, "#0f2d59", false);
      label.position.set(0, item.h / 2 + 0.28, 0);
      blockGroup.add(label);

      foundationGroup.add(blockGroup);
      engine.anim03_blocks.push(blockGroup);
    });

    g.add(foundationGroup);
  },

  animate(engine, t) {
    if (engine.anim03_blocks) {
      engine.anim03_blocks.forEach((b, i) => {
        b.position.y = -0.85 + (0.58 + i * 0.20) / 2 + Math.sin(t * 1.6 + i * 0.9) * 0.008;
      });
    }
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 4. ESQUEMA SIA SEGUNDA PARTE: Díptico Epistemológico (Teoría y Antecedentes)
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_04"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.50, 0.22, -1.22);

    const diptychGroup = new THREE.Group();
    diptychGroup.position.set(0, -0.15, 0);

    // Chasis de caoba noble monumental con cantoneras
    const pedChassis = engine.createMachinedChassis(1.72, 0.12, 0.72, { color: 0x2e1204 });
    pedChassis.position.y = -0.95;
    diptychGroup.add(pedChassis);

    // COLUMNA IZQUIERDA: 5. Marco Teórico (Columna clásica acanalada)
    const colLeft = engine.createClassicalColumn(1.30, 0.14, 0xd4af37, true);
    colLeft.position.set(-0.58, -0.28, 0);
    diptychGroup.add(colLeft);

    // Esfera armilar de latón orbitando la teoría
    const ringGroup = new THREE.Group();
    ringGroup.position.set(-0.58, 0.52, 0);
    for (let i = 0; i < 3; i++) {
      const ring = engine.createBrassArmillaryRing(0.25 + i * 0.05, 0.012);
      ring.rotation.x = Math.PI / 3 + i * 0.35;
      ringGroup.add(ring);
    }
    const coreSphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 24, 24),
      engine.goldMat(0xffd700)
    );
    ringGroup.add(coreSphere);
    diptychGroup.add(ringGroup);
    engine.anim04_rings = ringGroup;

    // Placa técnica izquierda
    const plaqueLeft = engine.createEngravedPlaque(
      0.54,
      0.22,
      "5. MARCO TEÓRICO",
      "Longo • 360° • Poligobernanza",
      ["MODELO SITUADO"],
      { theme: "dark" }
    );
    plaqueLeft.position.set(-0.58, -0.85, 0.38);
    diptychGroup.add(plaqueLeft);

    const labelLeft = engine.createLabelSprite("5. MARCO TEÓRICO", "Longo • 360° • Poligobernanza", "#0f2d59", false);
    labelLeft.position.set(-0.58, 0.96, 0);
    diptychGroup.add(labelLeft);

    // COLUMNA DERECHA: 6. Antecedentes y Estado del Arte
    const colRight = engine.createClassicalColumn(1.30, 0.14, 0xd4af37, true);
    colRight.position.set(0.58, -0.28, 0);
    diptychGroup.add(colRight);

    // Linterna / Baliza de antecedentes en la cima
    const beaconGroup = new THREE.Group();
    beaconGroup.position.set(0.58, 0.52, 0);

    const beaconBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.18, 0.04, 24),
      engine.brassMat(0xd4af37)
    );
    beaconGroup.add(beaconBase);

    const beaconGeo = new THREE.OctahedronGeometry(0.16, 1);
    const beaconMesh = new THREE.Mesh(
      beaconGeo,
      engine.glassMat(0x38bdf8, { roughness: 0.06, opacity: 0.88 })
    );
    beaconMesh.position.y = 0.16;
    beaconGroup.add(beaconMesh);

    const beaconLight = new THREE.PointLight(0x38bdf8, 1.4, 1.8);
    beaconLight.position.y = 0.16;
    beaconGroup.add(beaconLight);

    const astrolabeRing = engine.createBrassArmillaryRing(0.24, 0.012);
    astrolabeRing.rotation.x = Math.PI / 2;
    astrolabeRing.position.y = 0.16;
    beaconGroup.add(astrolabeRing);

    diptychGroup.add(beaconGroup);
    engine.anim04_beacon = beaconMesh;
    engine.anim04_light = beaconLight;

    // Placa técnica derecha
    const plaqueRight = engine.createEngravedPlaque(
      0.54,
      0.22,
      "6. ANTECEDENTES",
      "Estado del Arte • Vacancia",
      ["DIAGNÓSTICO SITUADO"],
      { theme: "dark" }
    );
    plaqueRight.position.set(0.58, -0.85, 0.38);
    diptychGroup.add(plaqueRight);

    const labelRight = engine.createLabelSprite("6. ANTECEDENTES", "Estado del Arte • Vacancia", "#0f2d59", false);
    labelRight.position.set(0.58, 0.96, 0);
    diptychGroup.add(labelRight);

    // Arco superior monumental de latón con Escudo Académico UNCo
    const archGeo = new THREE.TorusGeometry(0.58, 0.025, 16, 48, Math.PI);
    const archMesh = new THREE.Mesh(archGeo, engine.brassMat(0xd4af37));
    archMesh.position.set(0, 0.38, 0);
    diptychGroup.add(archMesh);

    const archSeal = engine.createAcademicSeal(0.11);
    archSeal.position.set(0, 0.96, 0.02);
    diptychGroup.add(archSeal);

    g.add(diptychGroup);
  },

  animate(engine, t) {
    if (engine.anim04_rings) {
      engine.anim04_rings.rotation.y = t * 0.7;
      engine.anim04_rings.rotation.z = Math.sin(t * 0.5) * 0.18;
    }
    if (engine.anim04_beacon) {
      engine.anim04_beacon.rotation.y = t * 1.2;
    }
    if (engine.anim04_light) {
      engine.anim04_light.intensity = 1.2 + Math.sin(t * 2.2) * 0.35;
    }
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 5. ESQUEMA SIA TP N° 4: Tríptico de Ingeniería Metodológica Integral
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_05"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.50, 0.22, -1.22);

    const triptychGroup = new THREE.Group();
    triptychGroup.position.set(0, -0.1, 0);

    // Cartela Maestra Superior del Tríptico Metodológico
    const masterHeader = engine.createLabelSprite(
      "TERCERA PARTE: PROYECTO INTEGRAL DE TFG",
      "Metodología Mixta • Cronograma 2027 • Factibilidad (TP N° 4)",
      "#0f2d59",
      true
    );
    masterHeader.position.set(0, 1.25, 0);
    g.add(masterHeader);

    // 1. PANEL CENTRAL: 8. Cronograma 2027 (Régimen temporal de 7 meses continuos)
    const centerGroup = new THREE.Group();
    centerGroup.position.set(0, 0.05, 0);

    const centerChassis = engine.createMachinedChassis(0.62, 1.32, 0.06, { color: 0x2e1204 });
    centerGroup.add(centerChassis);

    // Dial calendario 2027 superior
    const calDial = engine.createGraduatedDial(0.13, {
      title: "2027",
      sub: "GANTT",
      divisions: 12,
      theme: "dark"
    });
    calDial.position.set(0, 0.45, 0.04);
    calDial.rotation.x = Math.PI / 2;
    centerGroup.add(calDial);

    // 7 correderas de latón graduadas (Marzo a Septiembre 2027)
    for (let i = 0; i < 7; i++) {
      const rail = new THREE.Mesh(
        new THREE.BoxGeometry(0.44, 0.018, 0.03),
        engine.brassMat(0xd4af37)
      );
      rail.position.set(0, -0.36 + i * 0.11, 0.035);
      centerGroup.add(rail);

      const cursor = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.032, 0.04),
        engine.goldMat(0xffd700)
      );
      cursor.position.set(-0.14 + (i % 3) * 0.14, -0.36 + i * 0.11, 0.04);
      centerGroup.add(cursor);
    }

    // Placa inferior del panel central
    const plaqueCenter = engine.createEngravedPlaque(
      0.54,
      0.20,
      "8. CRONOGRAMA",
      "7 Meses Continuos (2027)",
      ["RÉGIMEN TEMPORAL TFG"],
      { theme: "dark" }
    );
    plaqueCenter.position.set(0, -0.56, 0.04);
    centerGroup.add(plaqueCenter);

    const labelCenter = engine.createLabelSprite("8. CRONOGRAMA", "7 Meses Continuos (2027)", "#0f2d59", false);
    labelCenter.position.set(0, 0.88, 0);
    centerGroup.add(labelCenter);

    triptychGroup.add(centerGroup);

    // 2. PANEL IZQUIERDO: 7. Metodología y Métodos (Lupa óptica de precisión y engranajes)
    const leftPanel = new THREE.Group();
    leftPanel.position.set(-0.68, 0.05, 0.14);
    leftPanel.rotation.y = 0.30;

    const leftFrame = engine.createMachinedChassis(0.54, 1.20, 0.05, { color: 0x1e293b });
    leftPanel.add(leftFrame);

    const leftGlass = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 1.12, 0.03),
      engine.glassMat(0xf8fafc, { opacity: 0.82, roughness: 0.08 })
    );
    leftPanel.add(leftGlass);

    // Lupa metodológica de latón
    const lensRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.14, 0.018, 16, 36),
      engine.brassMat(0xd4af37)
    );
    lensRing.position.set(0, 0.12, 0.045);
    leftPanel.add(lensRing);

    const lensGlass = new THREE.Mesh(
      new THREE.CylinderGeometry(0.13, 0.13, 0.015, 32),
      engine.glassMat(0x38bdf8, { opacity: 0.75, roughness: 0.04 })
    );
    lensGlass.rotation.x = Math.PI / 2;
    lensGlass.position.set(0, 0.12, 0.045);
    leftPanel.add(lensGlass);

    // Placa inferior izquierda
    const plaqueLeft = engine.createEngravedPlaque(
      0.48,
      0.18,
      "7. METODOLOGÍA",
      "Diseño Mixto • Operacionalización",
      ["TRIANGULACIÓN CUALI-CUANTI"],
      { theme: "dark" }
    );
    plaqueLeft.position.set(0, -0.42, 0.035);
    leftPanel.add(plaqueLeft);

    const labelLeft = engine.createLabelSprite("7. METODOLOGÍA", "Diseño Mixto • Operacionalización", "#0f2d59", false);
    labelLeft.position.set(0, -0.68, 0.08);
    leftPanel.add(labelLeft);

    triptychGroup.add(leftPanel);

    // 3. PANEL DERECHO: 9. Viabilidad de Recursos (Tres gemas prismáticas talladas)
    const rightPanel = new THREE.Group();
    rightPanel.position.set(0.68, 0.05, 0.14);
    rightPanel.rotation.y = -0.30;

    const rightFrame = engine.createMachinedChassis(0.54, 1.20, 0.05, { color: 0x1e293b });
    rightPanel.add(rightFrame);

    const rightGlass = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 1.12, 0.03),
      engine.glassMat(0xf8fafc, { opacity: 0.82, roughness: 0.08 })
    );
    rightPanel.add(rightGlass);

    // 3 Gemas prismáticas sobre pinzas de latón
    const gemData = [
      { color: 0x0284c7, title: "HUMANO" },
      { color: 0xf59e0b, title: "TÉCNICO" },
      { color: 0x10b981, title: "ECONÓMICO" }
    ];
    engine.anim05_gems = [];

    gemData.forEach((gemInfo, idx) => {
      const collet = new THREE.Mesh(
        new THREE.CylinderGeometry(0.065, 0.065, 0.02, 16),
        engine.brassMat(0xd4af37)
      );
      collet.position.set(0, -0.15 + idx * 0.22, 0.035);
      rightPanel.add(collet);

      const gem = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.08, 0),
        engine.glassMat(gemInfo.color, { roughness: 0.06, opacity: 0.88 })
      );
      gem.position.set(0, -0.15 + idx * 0.22, 0.065);
      rightPanel.add(gem);
      engine.anim05_gems.push(gem);
    });

    // Placa inferior derecha
    const plaqueRight = engine.createEngravedPlaque(
      0.48,
      0.18,
      "9. VIABILIDAD",
      "Humanos • Técnicos • Costo Cero",
      ["FACTIBILIDAD COMPLETA"],
      { theme: "dark" }
    );
    plaqueRight.position.set(0, -0.42, 0.035);
    rightPanel.add(plaqueRight);

    const labelRight = engine.createLabelSprite("9. VIABILIDAD", "Humanos • Técnicos • Costo Cero", "#0f2d59", false);
    labelRight.position.set(0, -0.68, 0.08);
    rightPanel.add(labelRight);

    triptychGroup.add(rightPanel);

    g.add(triptychGroup);
  },

  animate(engine, t) {
    if (engine.anim05_gems) {
      engine.anim05_gems.forEach((gem, idx) => {
        gem.rotation.y = t * 1.6 + idx * 1.2;
        gem.rotation.x = t * 0.9;
      });
    }
  }
};
