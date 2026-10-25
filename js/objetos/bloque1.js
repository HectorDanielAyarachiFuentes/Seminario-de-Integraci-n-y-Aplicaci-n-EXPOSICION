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
window.Presentation3D_Objects["anim_01"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.3);

    // Atril ceremonial de mármol y latón
    const lecternBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.36, 0.12, 32),
      engine.graniteMat(0x1e293b)
    );
    lecternBase.position.y = -1.05;
    g.add(lecternBase);

    const lecternShaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.09, 0.12, 0.95, 32),
      engine.marbleMat(0xf8fafc)
    );
    lecternShaft.position.y = -0.55;
    g.add(lecternShaft);

    // Placa soporte inclinada de latón (ángulo de lectura a 32°)
    const deskGroup = new THREE.Group();
    deskGroup.position.set(0, 0.05, 0);
    deskGroup.rotation.x = (32 * Math.PI) / 180;

    const deskPlate = new THREE.Mesh(
      new THREE.BoxGeometry(1.25, 0.04, 0.95),
      engine.brassMat(0xd4af37)
    );
    deskGroup.add(deskPlate);

    // Reborde de retención inferior
    const ledge = new THREE.Mesh(
      new THREE.BoxGeometry(1.25, 0.08, 0.06),
      engine.brassMat(0xb8860b)
    );
    ledge.position.set(0, 0.05, 0.45);
    deskGroup.add(ledge);

    // Gran libro abierto de tesina: Tapa azul marina UNCo y páginas marfil
    const bookGroup = new THREE.Group();
    bookGroup.position.set(0, 0.06, 0.02);

    // Tapas duras izquierda y derecha
    const coverMat = new THREE.MeshStandardMaterial({
      color: 0x0f2d59, // Azul institucional UNCo
      roughness: 0.42,
      metalness: 0.15
    });

    const leftCover = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.03, 0.78), coverMat);
    leftCover.position.set(-0.28, 0.02, 0);
    leftCover.rotation.z = -0.06;
    bookGroup.add(leftCover);

    const rightCover = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.03, 0.78), coverMat);
    rightCover.position.set(0.28, 0.02, 0);
    rightCover.rotation.z = 0.06;
    bookGroup.add(rightCover);

    // Hojas abiertas en mármol marfil curvado
    const pageMat = engine.marbleMat(0xfdfbf7);
    const leftPages = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.04, 0.72), pageMat);
    leftPages.position.set(-0.27, 0.05, 0);
    leftPages.rotation.z = -0.05;
    bookGroup.add(leftPages);

    const rightPages = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.04, 0.72), pageMat);
    rightPages.position.set(0.27, 0.05, 0);
    rightPages.rotation.z = 0.05;
    bookGroup.add(rightPages);

    // Medallón dorado central con el escudo de la UNCo en relieve
    const seal = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 0.02, 32),
      engine.brassMat(0xffd700)
    );
    seal.rotation.x = Math.PI / 2;
    seal.position.set(0, 0.08, -0.12);
    bookGroup.add(seal);

    // Cinta señaladora ceremonial de seda azul dorada
    const ribbon = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.008, 0.88),
      new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.3 })
    );
    ribbon.position.set(0.02, 0.08, 0.15);
    bookGroup.add(ribbon);

    deskGroup.add(bookGroup);
    g.add(deskGroup);

    // Cartela flotante del título institucional
    const label = engine.createLabelSprite("PROYECTO INTEGRAL DE TFG", "CURZAS — Universidad Nacional del Comahue", "#0f2d59", true);
    label.position.set(0, 0.85, 0);
    g.add(label);

    engine.anim01_book = bookGroup;
  },

  animate(engine, t) {
    if (engine.anim01_book) {
      engine.anim01_book.position.y = 0.06 + Math.sin(t * 1.5) * 0.012;
    }
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 2. PRESENTACIÓN DEL TESISTA: Credencial Profesional & Monolito de Carrera
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_02"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.25);

    // Monolito basamento de granito y latón
    const basePillar = new THREE.Mesh(
      new THREE.BoxGeometry(0.45, 0.85, 0.28),
      engine.graniteMat(0x0f172a)
    );
    basePillar.position.y = -0.65;
    g.add(basePillar);

    const brassCollar = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 0.05, 0.30),
      engine.brassMat(0xd4af37)
    );
    brassCollar.position.y = -0.21;
    g.add(brassCollar);

    // Credencial académica flotante en cristal esmerilado biselado y latón
    const cardGroup = new THREE.Group();
    cardGroup.position.set(0, 0.28, 0);

    // Marco perimetral dorado
    const frameMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.88, 1.25, 0.04),
      engine.brassMat(0xd4af37)
    );
    cardGroup.add(frameMesh);

    // Cuerpo de vidrio templado translúcido
    const cardGlass = new THREE.Mesh(
      new THREE.BoxGeometry(0.82, 1.18, 0.03),
      engine.glassMat(0xf8fafc, { transmission: 0.92, opacity: 0.88, roughness: 0.1 })
    );
    cardGroup.add(cardGlass);

    // Escudo superior y fotografía holográfica estilizada
    const photoFrame = new THREE.Mesh(
      new THREE.BoxGeometry(0.42, 0.48, 0.04),
      engine.marbleMat(0xf1f5f9)
    );
    photoFrame.position.set(0, 0.28, 0.015);
    cardGroup.add(photoFrame);

    const userBust = new THREE.Mesh(
      new THREE.SphereGeometry(0.13, 24, 24),
      engine.brassMat(0xd4af37)
    );
    userBust.position.set(0, 0.32, 0.045);
    cardGroup.add(userBust);

    // Flecha ascendente dorada que simboliza la trayectoria técnica -> licenciatura
    const arrowShaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.014, 0.014, 0.36, 16),
      engine.brassMat(0xffd700)
    );
    arrowShaft.position.set(0, -0.16, 0.03);
    cardGroup.add(arrowShaft);

    const arrowHead = new THREE.Mesh(
      new THREE.ConeGeometry(0.048, 0.10, 16),
      engine.brassMat(0xffd700)
    );
    arrowHead.position.set(0, 0.04, 0.03);
    cardGroup.add(arrowHead);

    // Placa inferior de esmalte azul UNCo incrustada en la credencial
    const badgePlate = new THREE.Mesh(
      new THREE.BoxGeometry(0.74, 0.22, 0.02),
      new THREE.MeshStandardMaterial({ color: 0x0f2d59, roughness: 0.3, metalness: 0.4 })
    );
    badgePlate.position.set(0, -0.42, 0.025);
    cardGroup.add(badgePlate);

    const badgeGoldTrim = new THREE.Mesh(
      new THREE.BoxGeometry(0.76, 0.012, 0.025),
      engine.brassMat(0xd4af37)
    );
    badgeGoldTrim.position.set(0, -0.31, 0.028);
    cardGroup.add(badgeGoldTrim);

    g.add(cardGroup);

    // Cartela flotante superior con datos del estudiante (libre de colisión y siempre legible)
    const label = engine.createLabelSprite("HÉCTOR DANIEL AYARACHI FUENTES", "Tec. Sup. en RRHH • Legajo 8252 • CURZAS-UNCo", "#0f2d59", true);
    label.position.set(0, 1.15, 0);
    g.add(label);

    engine.anim02_card = cardGroup;
  },

  animate(engine, t) {
    if (engine.anim02_card) {
      engine.anim02_card.position.y = 0.28 + Math.sin(t * 1.8) * 0.02;
      engine.anim02_card.rotation.y = Math.sin(t * 0.8) * 0.08;
    }
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 3. ESQUEMA SIA TP N° 2: Podio Cúbico de los 4 Cimientos del TFG
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_03"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.35);

    const foundationGroup = new THREE.Group();
    foundationGroup.position.set(0, -0.15, 0);

    // 4 Bloques cúbicos escalonados de mármol Carrara con biseles dorados
    // Representan los 4 apartados canónicos del TP N° 2
    const items = [
      { x: -0.38, z: -0.38, h: 0.55, title: "1. CARÁTULA", sub: "Marco Institucional" },
      { x: 0.38, z: -0.38, h: 0.75, title: "2. TEMA", sub: "Área y Contexto" },
      { x: -0.38, z: 0.38, h: 0.95, title: "3. PROBLEMA", sub: "Desnaturalización" },
      { x: 0.38, z: 0.38, h: 1.15, title: "4. OBJETIVOS", sub: "General y Específicos" }
    ];

    engine.anim03_blocks = [];

    items.forEach((item) => {
      const blockGroup = new THREE.Group();
      blockGroup.position.set(item.x, -0.85 + item.h / 2, item.z);

      const blockMesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.62, item.h, 0.62),
        engine.marbleMat(0xfdfbf7)
      );
      blockGroup.add(blockMesh);

      // Marco dorado en los bordes
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(0.62, item.h, 0.62)),
        new THREE.LineBasicMaterial({ color: 0xd4af37, linewidth: 2 })
      );
      blockGroup.add(edges);

      // Icono distintivo en la cara superior
      const topCap = new THREE.Mesh(
        new THREE.CylinderGeometry(0.14, 0.14, 0.03, 24),
        engine.brassMat(0xffd700)
      );
      topCap.position.y = item.h / 2 + 0.02;
      blockGroup.add(topCap);

      // Etiqueta flotante
      const label = engine.createLabelSprite(item.title, item.sub, "#0f2d59", false);
      label.position.set(0, item.h / 2 + 0.22, 0);
      blockGroup.add(label);

      foundationGroup.add(blockGroup);
      engine.anim03_blocks.push(blockGroup);
    });

    g.add(foundationGroup);
  },

  animate(engine, t) {
    if (engine.anim03_blocks) {
      engine.anim03_blocks.forEach((b, i) => {
        b.position.y += Math.sin(t * 2 + i * 0.8) * 0.0008;
      });
    }
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 4. ESQUEMA SIA SEGUNDA PARTE: Díptico Epistemológico (Teoría y Antecedentes)
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_04"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.4);

    const diptychGroup = new THREE.Group();
    diptychGroup.position.set(0, -0.15, 0);

    // Base de granito pulido que une las dos columnas
    const pedBase = new THREE.Mesh(
      new THREE.BoxGeometry(1.65, 0.12, 0.65),
      engine.graniteMat(0x1e293b)
    );
    pedBase.position.y = -0.95;
    diptychGroup.add(pedBase);

    // COLUMNA IZQUIERDA: 5. Marco Teórico (Longo + 360°)
    const colLeft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.14, 0.16, 1.25, 32),
      engine.marbleMat(0xf8fafc)
    );
    colLeft.position.set(-0.55, -0.28, 0);
    diptychGroup.add(colLeft);

    // Tres anillos de latón orbitando la columna teórica (Longo, 360°, Poligobernanza)
    const ringGroup = new THREE.Group();
    ringGroup.position.set(-0.55, 0.15, 0);
    for (let i = 0; i < 3; i++) {
      const ring = engine.createBrassArmillaryRing(0.28 + i * 0.06, 0.012);
      ring.rotation.x = Math.PI / 3 + i * 0.35;
      ringGroup.add(ring);
    }
    diptychGroup.add(ringGroup);
    engine.anim04_rings = ringGroup;

    const labelLeft = engine.createLabelSprite("5. MARCO TEÓRICO", "Longo • 360° • Poligobernanza", "#0f2d59", false);
    labelLeft.position.set(-0.55, 0.65, 0);
    diptychGroup.add(labelLeft);

    // COLUMNA DERECHA: 6. Antecedentes y Estado del Arte
    const colRight = new THREE.Mesh(
      new THREE.CylinderGeometry(0.14, 0.16, 1.25, 32),
      engine.marbleMat(0xf8fafc)
    );
    colRight.position.set(0.55, -0.28, 0);
    diptychGroup.add(colRight);

    // Linterna luminosa de antecedentes en la cima
    const beaconGeo = new THREE.SphereGeometry(0.18, 24, 24);
    const beaconMesh = new THREE.Mesh(beaconGeo, engine.glassMat(0x38bdf8, { roughness: 0.1, transmission: 0.9 }));
    beaconMesh.position.set(0.55, 0.42, 0);
    diptychGroup.add(beaconMesh);

    const beaconLight = new THREE.PointLight(0x38bdf8, 1.2, 1.5);
    beaconLight.position.set(0.55, 0.42, 0);
    diptychGroup.add(beaconLight);

    const labelRight = engine.createLabelSprite("6. ANTECEDENTES", "Estado del Arte • Vacancia", "#0f2d59", false);
    labelRight.position.set(0.55, 0.75, 0);
    diptychGroup.add(labelRight);

    // Arco superior de cristal y latón que une ambas columnas
    const archGeo = new THREE.TorusGeometry(0.55, 0.024, 16, 48, Math.PI);
    const archMesh = new THREE.Mesh(archGeo, engine.brassMat(0xd4af37));
    archMesh.position.set(0, 0.35, 0);
    diptychGroup.add(archMesh);

    g.add(diptychGroup);
  },

  animate(engine, t) {
    if (engine.anim04_rings) {
      engine.anim04_rings.rotation.y = t * 0.8;
    }
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 5. ESQUEMA SIA TP N° 4: Tríptico de Ingeniería Metodológica Integral
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_05"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.4);

    const triptychGroup = new THREE.Group();
    triptychGroup.position.set(0, -0.1, 0);

    // Cartela Maestra Superior del Tríptico Metodológico
    const masterHeader = engine.createLabelSprite("TERCERA PARTE: PROYECTO INTEGRAL DE TFG", "Metodología Mixta • Cronograma 2027 • Factibilidad (TP N° 4)", "#0f2d59", true);
    masterHeader.position.set(0, 1.22, 0);
    g.add(masterHeader);

    // Panel Central: 8. Cronograma 2027 (Régimen temporal de 7 meses)
    const centerPanel = new THREE.Mesh(
      new THREE.BoxGeometry(0.52, 1.25, 0.04),
      engine.brassMat(0xd4af37)
    );
    centerPanel.position.set(0, 0.05, 0);
    triptychGroup.add(centerPanel);

    // Línea de tiempo graduada con 7 muescas
    for (let i = 0; i < 7; i++) {
      const notch = new THREE.Mesh(
        new THREE.BoxGeometry(0.35, 0.015, 0.06),
        engine.marbleMat(0xffffff)
      );
      notch.position.set(0, -0.45 + i * 0.15, 0.01);
      centerPanel.add(notch);
    }

    const labelCenter = engine.createLabelSprite("8. CRONOGRAMA", "7 Meses Continuos (2027)", "#0f2d59", false);
    labelCenter.position.set(0, 0.80, 0);
    triptychGroup.add(labelCenter);

    // Panel Izquierdo: 7. Metodología y Métodos (Lupa y engranaje)
    const leftPanel = new THREE.Group();
    leftPanel.position.set(-0.62, 0.05, 0.12);
    leftPanel.rotation.y = 0.28;

    const leftFrame = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 1.15, 0.035),
      engine.glassMat(0xf8fafc, { transmission: 0.9 })
    );
    leftPanel.add(leftFrame);

    const lens = new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.16, 0.04, 32),
      engine.brassMat(0xffd700)
    );
    lens.rotation.x = Math.PI / 2;
    lens.position.set(0, 0.08, 0.04);
    leftPanel.add(lens);

    // Etiqueta en basamento inferior del panel izquierdo (sin colisión con el centro)
    const labelLeft = engine.createLabelSprite("7. METODOLOGÍA", "Diseño Mixto • Operacionalización", "#0f2d59", false);
    labelLeft.position.set(0, -0.65, 0.08);
    leftPanel.add(labelLeft);
    triptychGroup.add(leftPanel);

    // Panel Derecho: 9. Viabilidad de Recursos (Tres gemas: Humano, Técnico, Económico)
    const rightPanel = new THREE.Group();
    rightPanel.position.set(0.62, 0.05, 0.12);
    rightPanel.rotation.y = -0.28;

    const rightFrame = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 1.15, 0.035),
      engine.glassMat(0xf8fafc, { transmission: 0.9 })
    );
    rightPanel.add(rightFrame);

    // 3 Gemas flotantes de recursos
    const gemColors = [0x0284c7, 0xf59e0b, 0x10b981];
    engine.anim05_gems = [];
    gemColors.forEach((col, idx) => {
      const gem = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.075, 0),
        engine.glassMat(col, { roughness: 0.1, transmission: 0.85 })
      );
      gem.position.set(0, -0.25 + idx * 0.25, 0.05);
      rightPanel.add(gem);
      engine.anim05_gems.push(gem);
    });

    // Etiqueta en basamento inferior del panel derecho (sin colisión con el centro)
    const labelRight = engine.createLabelSprite("9. VIABILIDAD", "Humanos • Técnicos • Costo Cero", "#0f2d59", false);
    labelRight.position.set(0, -0.65, 0.08);
    rightPanel.add(labelRight);
    triptychGroup.add(rightPanel);

    g.add(triptychGroup);
  },

  animate(engine, t) {
    if (engine.anim05_gems) {
      engine.anim05_gems.forEach((gem, idx) => {
        gem.rotation.y = t * 1.5 + idx;
        gem.rotation.x = t * 0.8;
      });
    }
  }
};
