/**
 * =============================================================================
 * OBJETOS 3D — BLOQUE III: ESCULTURAS 11 A 15 (EDICIÓN MINIMALISTA)
 * Presentación de Tesina • CURZAS - UNCo
 * =============================================================================
 * 11. anim_11: Diana de Coherencia de Objetivos (Núcleo General + 4 Ejes Cardinales)
 * 12. anim_12: Prisma Heptagonal de los 7 Subsistemas de Empleo Público (Longo, 2006)
 * 13. anim_13: Mecanismo de Engranajes Sistémicos de RRHH (Rendimiento, Desarrollo, Relaciones)
 * 14. anim_14: Escáner Radar Circular 360° (Mitigación de sesgos con 4 focos convergentes)
 * 15. anim_15: Cúpula Geodésica de los 4 Cuadrantes del CURZAS (Blindaje Ético Art. 76)
 */

window.Presentation3D_Objects = window.Presentation3D_Objects || {};

// ──────────────────────────────────────────────────────────────────────────
// 11. MATRIZ DE OBJETIVOS: Diana de Coherencia de Objetivos del TFG
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_11"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.45, 0.22, -1.22);

    const targetGroup = new THREE.Group();
    targetGroup.position.set(0, -0.05, 0);

    // Chasis inferior de caoba noble y cantoneras
    const baseChassis = engine.createMachinedChassis(1.40, 0.10, 1.40, { color: 0x2e1204 });
    baseChassis.position.y = -0.92;
    g.add(baseChassis);

    // Núcleo Central: Dial de Precisión del Objetivo General
    const coreDial = engine.createGraduatedDial(0.24, {
      divisions: 40,
      title: "OBJETIVO",
      sub: "GENERAL",
      theme: "dark"
    });
    coreDial.rotation.x = Math.PI / 2;
    coreDial.position.set(0, 0.05, 0);
    targetGroup.add(coreDial);

    // Escudo Académico UNCo en el centro del dial
    const seal = engine.createAcademicSeal(0.08);
    seal.position.set(0, 0.08, 0);
    seal.rotation.x = Math.PI / 2;
    targetGroup.add(seal);

    const coreLight = new THREE.PointLight(0xffd700, 1.4, 1.8);
    coreLight.position.set(0, 0.14, 0);
    targetGroup.add(coreLight);

    const labelGeneral = engine.createLabelSprite("OBJETIVO GENERAL", "Factibilidad Integral del Modelo 360°", "#0f2d59", true);
    labelGeneral.position.set(0, 0.82, 0);
    targetGroup.add(labelGeneral);

    // Anillos concéntricos esbeltos de precisión graduados en latón (sin colisiones)
    engine.anim11_rings = [];
    for (let i = 1; i <= 3; i++) {
      const ring = engine.createBrassArmillaryRing(0.32 + i * 0.16, 0.008);
      ring.rotation.x = Math.PI / 2;
      targetGroup.add(ring);
      engine.anim11_rings.push(ring);
    }

    // 4 Ejes cardinales minimalistas con marcadores prismáticos
    const axes = [
      { name: "OBJ. 1 (NORMATIVO)", sub: "Estatuto y CCT", angle: 0, col: 0x38bdf8 },
      { name: "OBJ. 2 (PERCEPCIONES)", sub: "Docentes y Alumnos", angle: Math.PI / 2, col: 0x10b981 },
      { name: "OBJ. 3 (CONDICIONANTES)", sub: "Gobernanza y TIC", angle: Math.PI, col: 0xf59e0b },
      { name: "OBJ. 4 (LINEAMIENTOS)", sub: "Propuesta Situada", angle: (3 * Math.PI) / 2, col: 0x8b5cf6 }
    ];

    axes.forEach((ax) => {
      const x = Math.cos(ax.angle) * 0.96;
      const z = Math.sin(ax.angle) * 0.96;

      // Marcador prismático cardinal de cristal facetado
      const pin = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.10, 0),
        engine.glassMat(ax.col, { opacity: 0.90, roughness: 0.08 })
      );
      pin.position.set(x, 0.06, z);
      targetGroup.add(pin);

      const labelAx = engine.createLabelSprite(ax.name, ax.sub, "#0f2d59", false);
      labelAx.position.set(x, 0.38, z);
      targetGroup.add(labelAx);
    });

    // Chapa maestra de consistencia metodológica
    const plaqueMaster = engine.createEngravedPlaque(
      0.84,
      0.24,
      "DIANA DE COHERENCIA DE OBJETIVOS",
      "Objetivo General + 4 Ejes Cardinales del TFG",
      ["CONSISTENCIA METODOLÓGICA"],
      { theme: "dark" }
    );
    plaqueMaster.position.set(0, -0.84, 0.72);
    g.add(plaqueMaster);

    g.add(targetGroup);
    engine.anim11_group = targetGroup;
  },

  animate(engine, t) {
    if (engine.anim11_group) {
      engine.anim11_group.rotation.y = Math.sin(t * 0.5) * 0.12;
    }
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 12. LOS 7 SUBSISTEMAS DE RRHH: Estructura Arquitectónica Minimalista (Francisco Longo)
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_12"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.45, 0.18, -0.60);

    const chassis = engine.createMachinedChassis(2.40, 0.08, 0.65, { color: 0x1e293b });
    chassis.position.y = -0.74;
    g.add(chassis);

    const plaqueMaster = engine.createEngravedPlaque(
      1.10,
      0.22,
      "7 SUBSISTEMAS DE RECURSOS HUMANOS",
      "Francisco Longo (2006) • Marco Teórico de Empleo Público",
      ["RENDIMIENTO 360°", "DESARROLLO ART. 76", "RELACIONES LABORALES"],
      { theme: "dark" }
    );
    plaqueMaster.position.set(0, -0.74, 0.38);
    g.add(plaqueMaster);

    const longoGroup = new THREE.Group();
    longoGroup.position.set(0, 0.38, 0);

    const fullW = 2.34;
    const colY = 0.0;
    const colH = 0.82;
    const panelDepth = 0.024;

    const frostedGlass = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.12,
      metalness: 0.05,
      transparent: true,
      opacity: 0.88
    });

    const edgeLineMat = new THREE.LineBasicMaterial({
      color: 0xc5a059,
      transparent: true,
      opacity: 0.45
    });

    const createArchPanel = (w, h, d, x, y, z = 0, mat = frostedGlass) => {
      const panelGroup = new THREE.Group();
      panelGroup.position.set(x, y, z);

      const geo = new THREE.BoxGeometry(w, h, d);
      const mesh = new THREE.Mesh(geo, mat);
      panelGroup.add(mesh);

      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), edgeLineMat);
      panelGroup.add(edges);

      return panelGroup;
    };

    [-0.85, -0.28, 0.28, 0.85].forEach(sx => {
      const pinRod = new THREE.Mesh(
        new THREE.CylinderGeometry(0.012, 0.012, 0.33, 16),
        engine.brassMat(0xd4af37)
      );
      pinRod.position.set(sx, -0.715, 0);
      longoGroup.add(pinRod);

      const pinCollar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.038, 0.048, 0.025, 16),
        engine.brassMat(0xffd700)
      );
      pinCollar.position.set(sx, -0.87, 0);
      longoGroup.add(pinCollar);
    });

    const baseY = -0.48;
    const basePanel = createArchPanel(fullW, 0.14, panelDepth * 2, 0, baseY, 0);
    longoGroup.add(basePanel);

    const labelBase = engine.createLabelSprite(
      "7. RELACIONES HUMANAS Y SOCIALES",
      "Clima Laboral • Diálogo Gremial (CCT) • Políticas Sociales",
      "#0a2540",
      false,
      { x: 1.05, y: 0.19 }
    );
    labelBase.position.set(0, baseY, panelDepth + 0.03);
    longoGroup.add(labelBase);

    const colW = 0.48;
    const colX = [-0.85, -0.28, 0.28, 0.85];

    // Columna 1: Organización del Trabajo
    const pOrg = createArchPanel(colW, colH, panelDepth, colX[0], colY);
    longoGroup.add(pOrg);

    const labelOrg = engine.createLabelSprite(
      "ORGANIZACIÓN DEL TRABAJO",
      "Diseño de Puestos • Perfiles de Competencia",
      "#0369a1",
      false,
      { x: 0.54, y: 0.18 }
    );
    labelOrg.position.set(colX[0], colY, panelDepth + 0.03);
    longoGroup.add(labelOrg);

    // Columna 2: Gestión del Empleo
    const pEmp = createArchPanel(colW, colH, panelDepth, colX[1], colY);
    longoGroup.add(pEmp);

    const labelEmp = engine.createLabelSprite(
      "GESTIÓN DEL EMPLEO",
      "Incorporación • Movilidad • Desvinculación",
      "#1d4ed8",
      false,
      { x: 0.54, y: 0.18 }
    );
    labelEmp.position.set(colX[1], colY, panelDepth + 0.03);
    longoGroup.add(labelEmp);

    // Columna 3: Gestión del Rendimiento (EJE 360° MINIMALISTA: ANILLO Y GEMA LIMPIOS SIN COLISIONES)
    const pRend = createArchPanel(colW, colH, panelDepth, colX[2], colY);
    longoGroup.add(pRend);

    const ring360 = engine.createBrassArmillaryRing(0.18, 0.006);
    ring360.position.set(colX[2], colY + 0.16, panelDepth + 0.05);
    longoGroup.add(ring360);
    engine.anim12_ring = ring360;

    const gemCore = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.08, 0),
      new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.4,
        roughness: 0.1,
        metalness: 0.2,
        transparent: true,
        opacity: 0.95
      })
    );
    gemCore.position.set(colX[2], colY + 0.16, panelDepth + 0.05);
    longoGroup.add(gemCore);
    engine.anim12_gem = gemCore;

    const labelRend = engine.createLabelSprite(
      "GESTIÓN DEL RENDIMIENTO",
      "Planificación y Evaluación Formativa 360°",
      "#b45309",
      false,
      { x: 0.56, y: 0.20 }
    );
    labelRend.position.set(colX[2], colY - 0.18, panelDepth + 0.03);
    longoGroup.add(labelRend);

    // Columna 4: Compensación y Desarrollo
    const pComp = createArchPanel(colW, colH * 0.46, panelDepth, colX[3], colY + colH * 0.27);
    longoGroup.add(pComp);

    const labelComp = engine.createLabelSprite(
      "COMPENSACIÓN",
      "Retribución Monetaria y No Monetaria",
      "#059669",
      false,
      { x: 0.52, y: 0.16 }
    );
    labelComp.position.set(colX[3], colY + colH * 0.27, panelDepth + 0.03);
    longoGroup.add(labelComp);

    const pDes = createArchPanel(colW, colH * 0.46, panelDepth, colX[3], colY - colH * 0.27);
    longoGroup.add(pDes);

    const labelDes = engine.createLabelSprite(
      "DESARROLLO (ART. 76)",
      "Carrera • Capacitación y Aprendizaje",
      "#7c3aed",
      false,
      { x: 0.52, y: 0.16 }
    );
    labelDes.position.set(colX[3], colY - colH * 0.27, panelDepth + 0.03);
    longoGroup.add(labelDes);

    // Dintel Superior: Planificación
    const dintelY = 0.52;
    const dintelPanel = createArchPanel(fullW, 0.14, panelDepth * 2, 0, dintelY, 0);
    longoGroup.add(dintelPanel);

    const labelPlan = engine.createLabelSprite(
      "PLANIFICACIÓN DE RECURSOS HUMANOS",
      "Estimación de Necesidades y Escenarios Cuanti/Cualitativos",
      "#0a2540",
      false,
      { x: 1.05, y: 0.19 }
    );
    labelPlan.position.set(0, dintelY, panelDepth + 0.03);
    longoGroup.add(labelPlan);

    // Cúspide: Estrategia Institucional
    const stratY = 0.88;
    const labelStrat = engine.createLabelSprite(
      "ESTRATEGIA INSTITUCIONAL",
      "Misión • Visión • Mandato Universitario",
      "#b91c1c",
      false,
      { x: 0.76, y: 0.19 }
    );
    labelStrat.position.set(0, stratY, panelDepth + 0.03);
    longoGroup.add(labelStrat);

    const arrowLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, stratY - 0.09, panelDepth),
        new THREE.Vector3(0, dintelY + 0.08, panelDepth)
      ]),
      new THREE.LineBasicMaterial({ color: 0x003399, linewidth: 2 })
    );
    longoGroup.add(arrowLine);

    const chevron = new THREE.Mesh(
      new THREE.ConeGeometry(0.024, 0.05, 12),
      new THREE.MeshBasicMaterial({ color: 0x003399 })
    );
    chevron.rotation.x = Math.PI;
    chevron.position.set(0, dintelY + 0.09, panelDepth);
    longoGroup.add(chevron);

    // Flujos sistémicos sutiles
    const flows = [
      { from: new THREE.Vector3(colX[0], dintelY - 0.07, panelDepth), to: new THREE.Vector3(colX[0], colY + colH / 2, panelDepth) },
      { from: new THREE.Vector3(colX[1], dintelY - 0.07, panelDepth), to: new THREE.Vector3(colX[1], colY + colH / 2, panelDepth) },
      { from: new THREE.Vector3(colX[2], dintelY - 0.07, panelDepth), to: new THREE.Vector3(colX[2], colY + colH / 2, panelDepth) },
      { from: new THREE.Vector3(colX[3], dintelY - 0.07, panelDepth), to: new THREE.Vector3(colX[3], colY + colH / 2, panelDepth) },
      { from: new THREE.Vector3(colX[0] + colW / 2, colY, panelDepth), to: new THREE.Vector3(colX[1] - colW / 2, colY, panelDepth) },
      { from: new THREE.Vector3(colX[1] + colW / 2, colY, panelDepth), to: new THREE.Vector3(colX[2] - colW / 2, colY, panelDepth) },
      { from: new THREE.Vector3(colX[2] + colW / 2, colY + colH * 0.27, panelDepth), to: new THREE.Vector3(colX[3] - colW / 2, colY + colH * 0.27, panelDepth) },
      { from: new THREE.Vector3(colX[2] + colW / 2, colY - colH * 0.27, panelDepth), to: new THREE.Vector3(colX[3] - colW / 2, colY - colH * 0.27, panelDepth) },
      { from: new THREE.Vector3(colX[0], baseY + 0.07, panelDepth), to: new THREE.Vector3(colX[0], colY - colH / 2, panelDepth) },
      { from: new THREE.Vector3(colX[1], baseY + 0.07, panelDepth), to: new THREE.Vector3(colX[1], colY - colH / 2, panelDepth) },
      { from: new THREE.Vector3(colX[2], baseY + 0.07, panelDepth), to: new THREE.Vector3(colX[2], colY - colH / 2, panelDepth) },
      { from: new THREE.Vector3(colX[3], baseY + 0.07, panelDepth), to: new THREE.Vector3(colX[3], colY - colH / 2, panelDepth) }
    ];

    engine.anim12_flowPulses = [];
    flows.forEach(fl => {
      const lineGeo = new THREE.BufferGeometry().setFromPoints([fl.from, fl.to]);
      const lineMat = new THREE.LineBasicMaterial({ color: 0xc5a059, transparent: true, opacity: 0.35 });
      const line = new THREE.Line(lineGeo, lineMat);
      longoGroup.add(line);

      const pulse = new THREE.Mesh(
        new THREE.SphereGeometry(0.009, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
      );
      longoGroup.add(pulse);
      engine.anim12_flowPulses.push({ pulse, from: fl.from, to: fl.to });
    });

    const mainTitle = engine.createLabelSprite(
      "7 SUBSISTEMAS DE RECURSOS HUMANOS",
      "Francisco Longo (2006) • Marco Teórico Canónico de Empleo Público",
      "#0a2540",
      true,
      { x: 1.80, y: 0.26 }
    );
    mainTitle.position.set(0, 1.20, 0.08);
    longoGroup.add(mainTitle);

    g.add(longoGroup);
    engine.anim12_group = longoGroup;
  },

  animate(engine, t) {
    if (engine.anim12_gem) {
      engine.anim12_gem.rotation.y = t * 0.7;
      engine.anim12_gem.rotation.x = Math.sin(t * 0.5) * 0.2;
    }
    if (engine.anim12_ring) {
      engine.anim12_ring.rotation.x = t * 0.5;
      engine.anim12_ring.rotation.y = t * 0.35;
    }
    if (engine.anim12_flowPulses) {
      engine.anim12_flowPulses.forEach((item, idx) => {
        const prog = (t * 0.6 + idx * 0.08) % 1.0;
        item.pulse.position.lerpVectors(item.from, item.to, prog);
      });
    }
    if (engine.anim12_group) {
      engine.anim12_group.position.y = -0.05 + Math.sin(t * 0.8) * 0.008;
    }
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 13. SUBSISTEMAS CLAVE: Mecanismo de Engranajes Sistémicos de RRHH
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_13"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.45, 0.22, -1.22);

    const chassis = engine.createMachinedChassis(1.50, 0.10, 1.30, { color: 0x2e1204 });
    chassis.position.y = -0.92;
    g.add(chassis);

    const gearGroup = new THREE.Group();
    gearGroup.position.set(0, -0.1, 0);

    const createGearMesh = (teeth, outerR, innerR, thickness, mat) => {
      const shape = new THREE.Shape();
      for (let i = 0; i < teeth; i++) {
        const a1 = (i / teeth) * Math.PI * 2;
        const a2 = ((i + 0.35) / teeth) * Math.PI * 2;
        const a3 = ((i + 0.65) / teeth) * Math.PI * 2;
        const a4 = ((i + 1) / teeth) * Math.PI * 2;

        const x1 = Math.cos(a1) * innerR, y1 = Math.sin(a1) * innerR;
        const x2 = Math.cos(a2) * outerR, y2 = Math.sin(a2) * outerR;
        const x3 = Math.cos(a3) * outerR, y3 = Math.sin(a3) * outerR;
        const x4 = Math.cos(a4) * innerR, y4 = Math.sin(a4) * innerR;

        if (i === 0) shape.moveTo(x1, y1);
        else shape.lineTo(x1, y1);
        shape.lineTo(x2, y2);
        shape.lineTo(x3, y3);
        shape.lineTo(x4, y4);
      }
      shape.closePath();

      const hole = new THREE.Path();
      hole.absarc(0, 0, innerR * 0.38, 0, Math.PI * 2, true);
      shape.holes.push(hole);

      const gearMesh = new THREE.Mesh(
        new THREE.ExtrudeGeometry(shape, { depth: thickness, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.010 }),
        mat
      );

      // Buje central cilíndrico torneado en latón acoplado al engranaje (rotación unificada sin colisiones)
      const hub = new THREE.Mesh(
        new THREE.CylinderGeometry(innerR * 0.36, innerR * 0.36, thickness * 1.3, 20),
        engine.brassMat(0xffd700)
      );
      hub.rotation.x = Math.PI / 2;
      hub.position.z = thickness * 0.5;
      gearMesh.add(hub);

      return gearMesh;
    };

    // Engranaje 1: GESTIÓN DEL RENDIMIENTO
    const gear1 = createGearMesh(16, 0.45, 0.38, 0.06, engine.brassMat(0xffd700));
    gear1.position.set(-0.38, 0.35, 0);
    gearGroup.add(gear1);
    engine.anim13_g1 = gear1;

    const labelG1 = engine.createLabelSprite("1. RENDIMIENTO", "Evaluación Formativa", "#0f2d59", false);
    labelG1.position.set(-0.38, 0.88, 0);
    gearGroup.add(labelG1);

    // Engranaje 2: GESTIÓN DEL DESARROLLO
    const gear2 = createGearMesh(20, 0.55, 0.46, 0.06, engine.brassMat(0xd4af37));
    gear2.position.set(0.42, -0.05, 0);
    gearGroup.add(gear2);
    engine.anim13_g2 = gear2;

    const labelG2 = engine.createLabelSprite("2. DESARROLLO", "Capacitación Docente (Art. 76)", "#0f2d59", false);
    labelG2.position.set(0.42, 0.58, 0);
    gearGroup.add(labelG2);

    // Engranaje 3: RELACIONES LABORALES
    const gear3 = createGearMesh(14, 0.40, 0.33, 0.06, engine.graniteMat(0x334155));
    gear3.position.set(-0.38, -0.45, 0);
    gearGroup.add(gear3);
    engine.anim13_g3 = gear3;

    const labelG3 = engine.createLabelSprite("3. RELACIONES LABORALES", "Diálogo Gremial (CCT Dec. 1246/15)", "#0f2d59", false);
    labelG3.position.set(-0.38, -0.92, 0);
    gearGroup.add(labelG3);

    const plaqueMaster = engine.createEngravedPlaque(
      1.05,
      0.22,
      "MECANISMO DE ENGRANAJES SISTÉMICOS",
      "Interdependencia Operativa del Empleo Público",
      ["RENDIMIENTO ↔ CAPACITACIÓN ↔ DIÁLOGO GREMIAL"],
      { theme: "dark" }
    );
    plaqueMaster.position.set(0, -0.84, 0.68);
    g.add(plaqueMaster);

    g.add(gearGroup);
  },

  animate(engine, t) {
    if (engine.anim13_g1) engine.anim13_g1.rotation.z = t * 0.8;
    if (engine.anim13_g2) engine.anim13_g2.rotation.z = -t * 0.64;
    if (engine.anim13_g3) engine.anim13_g3.rotation.z = -t * 0.91;
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 14. DISPOSITIVO 360°: Escáner Radar Circular (Mitigación de Sesgos)
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_14"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.45, 0.22, -1.22);

    const chassis = engine.createMachinedChassis(1.45, 0.10, 1.45, { color: 0x1e293b });
    chassis.position.y = -0.92;
    g.add(chassis);

    const radarGroup = new THREE.Group();
    radarGroup.position.set(0, -0.1, 0);

    // Plato azimutal graduado minimalista contenido dentro del radio central (R = 0.80)
    const azimuthDial = engine.createGraduatedDial(0.80, {
      divisions: 48,
      title: "AZIMUT",
      sub: "360°",
      theme: "dark"
    });
    azimuthDial.rotation.x = Math.PI / 2;
    azimuthDial.position.y = -0.42;
    radarGroup.add(azimuthDial);

    // Pedestal central esbelto
    const centerCore = new THREE.Mesh(
      new THREE.CylinderGeometry(0.20, 0.24, 0.38, 32),
      engine.marbleMat(0xfdfbf7)
    );
    centerCore.position.y = -0.23;
    radarGroup.add(centerCore);

    // Gema luminosa central elevada nítidamente sobre el pedestal (sin choques)
    const coreGem = new THREE.Mesh(
      new THREE.SphereGeometry(0.14, 24, 24),
      engine.glassMat(0xffd700, { transmission: 0.9 })
    );
    coreGem.position.y = 0.14;
    radarGroup.add(coreGem);

    const labelCenter = engine.createLabelSprite("ACTO EDUCATIVO", "Triangulación Objetiva", "#0f2d59", false);
    labelCenter.position.set(0, 0.48, 0);
    radarGroup.add(labelCenter);

    // 4 Proyectores dispuestos a radio 1.15 (con holgura y separación del dial)
    const actors = [
      { name: "AUTOEVALUACIÓN", sub: "Reflexión Docente", angle: 0 },
      { name: "COEVALUACIÓN", sub: "Pares de Cátedra", angle: Math.PI / 2 },
      { name: "HETEROEVALUACIÓN", sub: "Estudiantes", angle: Math.PI },
      { name: "DIRECCIÓN", sub: "Gestión Departamental", angle: (3 * Math.PI) / 2 }
    ];

    engine.anim14_lights = [];
    actors.forEach((act) => {
      const x = Math.cos(act.angle) * 1.15;
      const z = Math.sin(act.angle) * 1.15;

      const spotGroup = new THREE.Group();
      spotGroup.position.set(x, 0.12, z);
      spotGroup.lookAt(0, 0.14, 0);

      const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.065, 0.045, 0.20, 16),
        engine.brassMat(0xd4af37)
      );
      barrel.rotation.x = Math.PI / 2;
      spotGroup.add(barrel);

      const spotLight = new THREE.PointLight(0x38bdf8, 0.8, 1.4);
      spotLight.position.set(0, 0, 0.12);
      spotGroup.add(spotLight);
      engine.anim14_lights.push(spotLight);

      radarGroup.add(spotGroup);

      const coneCurve = new THREE.LineCurve3(new THREE.Vector3(x, 0.12, z), new THREE.Vector3(0, 0.14, 0));
      const ray = new THREE.Mesh(
        new THREE.TubeGeometry(coneCurve, 12, 0.006, 6, false),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.60 })
      );
      radarGroup.add(ray);

      const labelAct = engine.createLabelSprite(act.name, act.sub, "#0f2d59", false);
      labelAct.position.set(x * 1.05, 0.42, z * 1.05);
      radarGroup.add(labelAct);
    });

    const plaqueMaster = engine.createEngravedPlaque(
      1.05,
      0.22,
      "ESCÁNER RADAR CIRCULAR 360°",
      "Mitigación de Sesgos por Triangulación de Perspectivas",
      ["AUTOEVALUACIÓN • PARES • ESTUDIANTES • GESTIÓN"],
      { theme: "dark" }
    );
    plaqueMaster.position.set(0, -0.84, 0.74);
    g.add(plaqueMaster);

    g.add(radarGroup);
    engine.anim14_group = radarGroup;
  },

  animate(engine, t) {
    if (engine.anim14_group) {
      engine.anim14_group.rotation.y = t * 0.18;
    }
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 15. ARQUITECTURA 360° CURZAS: Cúpula Geodésica de los 4 Cuadrantes
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_15"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.45, 0.22, -1.22);

    const chassis = engine.createMachinedChassis(1.45, 0.10, 1.45, { color: 0x1e293b });
    chassis.position.y = -0.92;
    g.add(chassis);

    const domeGroup = new THREE.Group();
    domeGroup.position.set(0, -0.05, 0);

    // Plataforma circular dividida en 4 cuadrantes
    const baseCircle = new THREE.Mesh(
      new THREE.CylinderGeometry(1.05, 1.08, 0.06, 48),
      engine.marbleMat(0xf8fafc)
    );
    baseCircle.position.y = -0.55;
    domeGroup.add(baseCircle);

    // Líneas divisoras en cruz de latón
    const crossX = new THREE.Mesh(new THREE.BoxGeometry(2.05, 0.016, 0.02), engine.brassMat());
    crossX.position.y = -0.51;
    domeGroup.add(crossX);

    const crossZ = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.016, 2.05), engine.brassMat());
    crossZ.position.y = -0.51;
    domeGroup.add(crossZ);

    // Escudo académico UNCo grabado en el centro del suelo de la cúpula
    const seal = engine.createAcademicSeal(0.12);
    seal.rotation.x = Math.PI / 2;
    seal.position.y = -0.49;
    domeGroup.add(seal);

    // Cúpula geodésica protectora de cristal esmerilado translúcida y minimalista (sin colisiones)
    const domeMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.78, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2),
      engine.glassMat(0xf8fafc, { transmission: 0.88, opacity: 0.75, roughness: 0.10 })
    );
    domeMesh.position.y = -0.50;
    domeGroup.add(domeMesh);
    engine.anim15_dome = domeMesh;

    // Núcleo iluminado del Art. 76 (Capacitación Continua)
    const coreLight = new THREE.PointLight(0xffd700, 1.5, 1.6);
    coreLight.position.y = -0.22;
    domeGroup.add(coreLight);

    const trainingOrb = new THREE.Mesh(
      new THREE.SphereGeometry(0.16, 24, 24),
      engine.marbleMat(0xfdfbf7)
    );
    trainingOrb.position.y = -0.22;
    domeGroup.add(trainingOrb);

    const labelCore = engine.createLabelSprite("NÚCLEO FORMATIVO (ART. 76)", "Desacoplado de Sanciones", "#0f2d59", true);
    labelCore.position.set(0, 0.72, 0);
    domeGroup.add(labelCore);

    const plaqueMaster = engine.createEngravedPlaque(
      1.05,
      0.22,
      "CÚPULA INSTITUCIONAL DE 4 CUADRANTES",
      "Blindaje Ético y Anonimato del Acto Evaluativo CURZAS",
      ["ART. 76 CAPACITACIÓN", "DESACOPLE PUNITIVO TOTAL"],
      { theme: "dark" }
    );
    plaqueMaster.position.set(0, -0.84, 0.74);
    g.add(plaqueMaster);

    g.add(domeGroup);
  },

  animate(engine, t) {
    if (engine.anim15_dome) {
      engine.anim15_dome.rotation.y = t * 0.25;
    }
  }
};
