/**
 * =============================================================================
 * OBJETOS 3D — BLOQUE III: ESCULTURAS 11 A 15
 * Presentación de Tesina • CURZAS - UNCo
 * =============================================================================
 * Representación visual concreta y pertinente de la Sección 3 (Marco Teórico y 360°):
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
    engine.createMuseumPlinth(g, 1.4);

    const targetGroup = new THREE.Group();
    targetGroup.position.set(0, -0.05, 0);

    // Núcleo Central: Objetivo General (Disco dorado en relieve)
    const coreDisc = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.24, 0.05, 32),
      engine.brassMat(0xffd700)
    );
    coreDisc.rotation.x = Math.PI / 2;
    targetGroup.add(coreDisc);

    const coreLight = new THREE.PointLight(0xffd700, 1.2, 1.5);
    targetGroup.add(coreLight);

    const labelGeneral = engine.createLabelSprite("OBJETIVO GENERAL", "Factibilidad Integral del Modelo 360°", "#0f2d59", true);
    labelGeneral.position.set(0, 0.72, 0);
    targetGroup.add(labelGeneral);

    // 4 Anillos concéntricos de precisión graduados
    engine.anim11_rings = [];
    for (let i = 1; i <= 3; i++) {
      const ring = engine.createBrassArmillaryRing(0.32 + i * 0.18, 0.010);
      ring.rotation.x = Math.PI / 2;
      targetGroup.add(ring);
      engine.anim11_rings.push(ring);
    }

    // 4 Ejes cardinales que sostienen los 4 Objetivos Específicos
    const axes = [
      { name: "OBJ. 1 (NORMATIVO)", sub: "Estatuto y CCT", angle: 0, col: 0x38bdf8 },
      { name: "OBJ. 2 (PERCEPCIONES)", sub: "Docentes y Alumnos", angle: Math.PI / 2, col: 0x10b981 },
      { name: "OBJ. 3 (CONDICIONANTES)", sub: "Gobernanza y TIC", angle: Math.PI, col: 0xf59e0b },
      { name: "OBJ. 4 (LINEAMIENTOS)", sub: "Propuesta Situada", angle: (3 * Math.PI) / 2, col: 0x8b5cf6 }
    ];

    axes.forEach((ax) => {
      const x = Math.cos(ax.angle) * 0.92;
      const z = Math.sin(ax.angle) * 0.92;

      // Marcador prismático cardinal
      const pin = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.10, 0),
        engine.glassMat(ax.col, { transmission: 0.85 })
      );
      pin.position.set(x, 0, z);
      targetGroup.add(pin);

      const labelAx = engine.createLabelSprite(ax.name, ax.sub, "#0f2d59", false);
      labelAx.position.set(x, 0.28, z);
      targetGroup.add(labelAx);
    });

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
    const longoGroup = new THREE.Group();
    longoGroup.position.set(0, -0.05, 0);

    const fullW = 2.34;
    const colY = 0.0;
    const colH = 0.82;
    const panelDepth = 0.024; // Espesor ultra-delgado minimalista

    // Material de vidrio arquitectónico esmerilado translúcido
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

    // Helper para crear paneles arquitectónicos limpios con aristas biseladas de latón
    const createArchPanel = (w, h, d, x, y, z = 0, mat = frostedGlass) => {
      const panelGroup = new THREE.Group();
      panelGroup.position.set(x, y, z);

      const geo = new THREE.BoxGeometry(w, h, d);
      const mesh = new THREE.Mesh(geo, mat);
      panelGroup.add(mesh);

      // Filete perimetral fino de latón
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), edgeLineMat);
      panelGroup.add(edges);

      return panelGroup;
    };

    // ── 0. SOMBRA SUAVE DE CONTACTO BAJO LA ESTRUCTURA FLOTANTE (SIN PEANA TOSCA) ──
    const shadowMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(fullW * 1.15, 0.55),
      new THREE.MeshBasicMaterial({ color: 0x0f172a, transparent: true, opacity: 0.07, depthWrite: false })
    );
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(0, -0.74, 0);
    longoGroup.add(shadowMesh);


    // ── 1. BASAMENTO INFERIOR: SUBSISTEMA 7 (RELACIONES HUMANAS Y SOCIALES) ──
    const baseY = -0.58;
    const basePanel = createArchPanel(fullW, 0.14, panelDepth * 2, 0, baseY, 0);
    longoGroup.add(basePanel);

    const labelBase = engine.createLabelSprite(
      "7. RELACIONES HUMANAS Y SOCIALES",
      "Clima Laboral • Diálogo Gremial (CCT) • Políticas Sociales",
      "#0a2540",
      false,
      { x: 0.86, y: 0.16 }
    );
    labelBase.position.set(0, baseY, panelDepth + 0.03);
    longoGroup.add(labelBase);


    // ── 2. CUERPO CENTRAL: 4 ZONAS DEL MODELO SISTÉMICO ──
    const colW = 0.48;
    const colX = [-0.85, -0.28, 0.28, 0.85];

    // Columna 1: Organización del Trabajo (x = -0.85)
    const pOrg = createArchPanel(colW, colH, panelDepth, colX[0], colY);
    longoGroup.add(pOrg);

    const labelOrg = engine.createLabelSprite(
      "ORGANIZACIÓN DEL TRABAJO",
      "Diseño de Puestos • Perfiles de Competencia",
      "#0369a1",
      false,
      { x: 0.44, y: 0.15 }
    );
    labelOrg.position.set(colX[0], colY, panelDepth + 0.03);
    longoGroup.add(labelOrg);

    // Columna 2: Gestión del Empleo (x = -0.28)
    const pEmp = createArchPanel(colW, colH, panelDepth, colX[1], colY);
    longoGroup.add(pEmp);

    const labelEmp = engine.createLabelSprite(
      "GESTIÓN DEL EMPLEO",
      "Incorporación • Movilidad • Desvinculación",
      "#1d4ed8",
      false,
      { x: 0.44, y: 0.15 }
    );
    labelEmp.position.set(colX[1], colY, panelDepth + 0.03);
    longoGroup.add(labelEmp);

    // Columna 3: Gestión del Rendimiento (x = +0.28) — EJE CENTRAL EVALUACIÓN 360°
    const pRend = createArchPanel(colW, colH, panelDepth, colX[2], colY);
    longoGroup.add(pRend);

    // Núcleo orbital 360° minimalista flotando en el corazón del panel
    const ring360 = engine.createBrassArmillaryRing(0.18, 0.005);
    ring360.position.set(colX[2], colY + 0.16, panelDepth + 0.06);
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
    gemCore.position.set(colX[2], colY + 0.16, panelDepth + 0.06);
    longoGroup.add(gemCore);
    engine.anim12_gem = gemCore;

    const labelRend = engine.createLabelSprite(
      "GESTIÓN DEL RENDIMIENTO",
      "Planificación y Evaluación Formativa 360°",
      "#b45309",
      false,
      { x: 0.45, y: 0.15 }
    );
    labelRend.position.set(colX[2], colY - 0.18, panelDepth + 0.03);
    longoGroup.add(labelRend);

    // Columna 4: Doble Nivel (Compensación y Desarrollo) (x = +0.85)
    // 4a. Compensación (Arriba)
    const pComp = createArchPanel(colW, colH * 0.46, panelDepth, colX[3], colY + colH * 0.27);
    longoGroup.add(pComp);

    const labelComp = engine.createLabelSprite(
      "COMPENSACIÓN",
      "Retribución Monetaria y No Monetaria",
      "#059669",
      false,
      { x: 0.44, y: 0.13 }
    );
    labelComp.position.set(colX[3], colY + colH * 0.27, panelDepth + 0.03);
    longoGroup.add(labelComp);

    // 4b. Desarrollo (Abajo)
    const pDes = createArchPanel(colW, colH * 0.46, panelDepth, colX[3], colY - colH * 0.27);
    longoGroup.add(pDes);

    const labelDes = engine.createLabelSprite(
      "DESARROLLO (ART. 76)",
      "Carrera • Capacitación y Aprendizaje",
      "#7c3aed",
      false,
      { x: 0.44, y: 0.13 }
    );
    labelDes.position.set(colX[3], colY - colH * 0.27, panelDepth + 0.03);
    longoGroup.add(labelDes);


    // ── 3. DINTEL SUPERIOR: PLANIFICACIÓN DE RECURSOS HUMANOS ──
    const dintelY = 0.58;
    const dintelPanel = createArchPanel(fullW, 0.14, panelDepth * 2, 0, dintelY, 0);
    longoGroup.add(dintelPanel);

    const labelPlan = engine.createLabelSprite(
      "PLANIFICACIÓN DE RECURSOS HUMANOS",
      "Estimación de Necesidades y Escenarios Cuanti/Cualitativos",
      "#0a2540",
      false,
      { x: 0.86, y: 0.16 }
    );
    labelPlan.position.set(0, dintelY, panelDepth + 0.03);
    longoGroup.add(labelPlan);


    // ── 4. CÚSPIDE: ESTRATEGIA INSTITUCIONAL Y CONECTOR MINIMALISTA ──
    const stratY = 0.95;
    const labelStrat = engine.createLabelSprite(
      "ESTRATEGIA INSTITUCIONAL",
      "Misión • Visión • Mandato Universitario",
      "#b91c1c",
      false,
      { x: 0.62, y: 0.15 }
    );
    labelStrat.position.set(0, stratY, panelDepth + 0.03);
    longoGroup.add(labelStrat);

    // Conector minimalista: varilla delgada y discreta con flecha chevron
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


    // ── 5. VECTORES DE FLUJO SISTÉMICO MINIMALISTAS (HILOS DE FIBRA ÓPTICA Y PULSOS) ──
    const flows = [
      // Planificación -> Columnas (Hacia abajo)
      { from: new THREE.Vector3(colX[0], dintelY - 0.07, panelDepth), to: new THREE.Vector3(colX[0], colY + colH / 2, panelDepth) },
      { from: new THREE.Vector3(colX[1], dintelY - 0.07, panelDepth), to: new THREE.Vector3(colX[1], colY + colH / 2, panelDepth) },
      { from: new THREE.Vector3(colX[2], dintelY - 0.07, panelDepth), to: new THREE.Vector3(colX[2], colY + colH / 2, panelDepth) },
      { from: new THREE.Vector3(colX[3], dintelY - 0.07, panelDepth), to: new THREE.Vector3(colX[3], colY + colH / 2, panelDepth) },

      // Flujo horizontal: Org -> Empleo -> Rendimiento
      { from: new THREE.Vector3(colX[0] + colW / 2, colY, panelDepth), to: new THREE.Vector3(colX[1] - colW / 2, colY, panelDepth) },
      { from: new THREE.Vector3(colX[1] + colW / 2, colY, panelDepth), to: new THREE.Vector3(colX[2] - colW / 2, colY, panelDepth) },

      // Flujo horizontal bidireccional: Rendimiento <-> Compensación / Desarrollo
      { from: new THREE.Vector3(colX[2] + colW / 2, colY + colH * 0.27, panelDepth), to: new THREE.Vector3(colX[3] - colW / 2, colY + colH * 0.27, panelDepth) },
      { from: new THREE.Vector3(colX[2] + colW / 2, colY - colH * 0.27, panelDepth), to: new THREE.Vector3(colX[3] - colW / 2, colY - colH * 0.27, panelDepth) },

      // Relaciones Sociales (Base) -> Columnas (Hacia arriba)
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

      // Micro-pulso luminoso viajero
      const pulse = new THREE.Mesh(
        new THREE.SphereGeometry(0.009, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
      );
      longoGroup.add(pulse);
      engine.anim12_flowPulses.push({ pulse, from: fl.from, to: fl.to });
    });


    // ── 6. RÓTULO MAESTRO SUPERIOR MINIMALISTA ──
    const mainTitle = engine.createLabelSprite(
      "7 SUBSISTEMAS DE RECURSOS HUMANOS",
      "Francisco Longo (2006) • Marco Teórico Canónico de Empleo Público",
      "#0a2540",
      true
    );
    mainTitle.position.set(0, 1.28, 0.08);
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
    engine.createMuseumPlinth(g, 1.4);

    const gearGroup = new THREE.Group();
    gearGroup.position.set(0, -0.1, 0);

    // Función auxiliar para modelar un engranaje dentado nítido
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

      // Orificio central
      const hole = new THREE.Path();
      hole.absarc(0, 0, innerR * 0.42, 0, Math.PI * 2, true);
      shape.holes.push(hole);

      return new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: thickness, bevelEnabled: true, bevelThickness: 0.015, bevelSize: 0.012 }), mat);
    };

    // Engranaje 1: GESTIÓN DEL RENDIMIENTO (Evaluación 360°)
    const gear1 = createGearMesh(16, 0.45, 0.38, 0.06, engine.brassMat(0xffd700));
    gear1.position.set(-0.38, 0.35, 0);
    gearGroup.add(gear1);
    engine.anim13_g1 = gear1;

    const labelG1 = engine.createLabelSprite("1. RENDIMIENTO", "Evaluación Formativa", "#0f2d59", false);
    labelG1.position.set(-0.38, 0.88, 0);
    gearGroup.add(labelG1);

    // Engranaje 2: GESTIÓN DEL DESARROLLO (Capacitación Art. 76)
    const gear2 = createGearMesh(20, 0.55, 0.46, 0.06, engine.brassMat(0xd4af37));
    gear2.position.set(0.42, -0.05, 0);
    gearGroup.add(gear2);
    engine.anim13_g2 = gear2;

    const labelG2 = engine.createLabelSprite("2. DESARROLLO", "Capacitación Docente (Art. 76)", "#0f2d59", false);
    labelG2.position.set(0.42, 0.58, 0);
    gearGroup.add(labelG2);

    // Engranaje 3: RELACIONES LABORALES Y HUMANAS (Sindicato y CCT)
    const gear3 = createGearMesh(14, 0.40, 0.33, 0.06, engine.graniteMat(0x334155));
    gear3.position.set(-0.38, -0.45, 0);
    gearGroup.add(gear3);
    engine.anim13_g3 = gear3;

    const labelG3 = engine.createLabelSprite("3. RELACIONES LABORALES", "Diálogo Gremial (CCT Dec. 1246/15)", "#0f2d59", false);
    labelG3.position.set(-0.38, -0.92, 0);
    gearGroup.add(labelG3);

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
    engine.createMuseumPlinth(g, 1.45);

    const radarGroup = new THREE.Group();
    radarGroup.position.set(0, -0.1, 0);

    // Pedestal central: El Acto Pedagógico en el Aula Universitaria
    const centerCore = new THREE.Mesh(
      new THREE.CylinderGeometry(0.22, 0.28, 0.45, 32),
      engine.marbleMat(0xfdfbf7)
    );
    centerCore.position.y = -0.22;
    radarGroup.add(centerCore);

    const coreGem = new THREE.Mesh(
      new THREE.SphereGeometry(0.16, 24, 24),
      engine.glassMat(0xffd700, { transmission: 0.9 })
    );
    coreGem.position.y = 0.12;
    radarGroup.add(coreGem);

    const labelCenter = engine.createLabelSprite("ACTO EDUCATIVO", "Triangulación Objetiva", "#0f2d59", false);
    labelCenter.position.set(0, 0.45, 0);
    radarGroup.add(labelCenter);

    // Cuatro Focos Proyectores a 90° que eliminan ángulos muertos
    const actors = [
      { name: "AUTOEVALUACIÓN", sub: "Reflexión Docente", angle: 0 },
      { name: "COEVALUACIÓN", sub: "Pares de Cátedra", angle: Math.PI / 2 },
      { name: "HETEROEVALUACIÓN", sub: "Estudiantes", angle: Math.PI },
      { name: "DIRECCIÓN", sub: "Gestión Departamental", angle: (3 * Math.PI) / 2 }
    ];

    engine.anim14_lights = [];
    actors.forEach((act) => {
      const x = Math.cos(act.angle) * 0.92;
      const z = Math.sin(act.angle) * 0.92;

      // Cañón proyector de latón
      const spotGroup = new THREE.Group();
      spotGroup.position.set(x, 0.12, z);
      spotGroup.lookAt(0, 0.12, 0);

      const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.05, 0.22, 16),
        engine.brassMat(0xd4af37)
      );
      barrel.rotation.x = Math.PI / 2;
      spotGroup.add(barrel);

      const spotLight = new THREE.PointLight(0x38bdf8, 0.8, 1.4);
      spotLight.position.set(0, 0, 0.12);
      spotGroup.add(spotLight);
      engine.anim14_lights.push(spotLight);

      radarGroup.add(spotGroup);

      // Cono de luz hacia el centro
      const coneCurve = new THREE.LineCurve3(new THREE.Vector3(x, 0.12, z), new THREE.Vector3(0, 0.12, 0));
      const ray = new THREE.Mesh(
        new THREE.TubeGeometry(coneCurve, 12, 0.008, 6, false),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.65 })
      );
      radarGroup.add(ray);

      const labelAct = engine.createLabelSprite(act.name, act.sub, "#0f2d59", false);
      labelAct.position.set(x, 0.42, z);
      radarGroup.add(labelAct);
    });

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
    engine.createMuseumPlinth(g, 1.45);

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
    const crossX = new THREE.Mesh(new THREE.BoxGeometry(2.05, 0.02, 0.025), engine.brassMat());
    crossX.position.y = -0.51;
    domeGroup.add(crossX);

    const crossZ = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.02, 2.05), engine.brassMat());
    crossZ.position.y = -0.51;
    domeGroup.add(crossZ);

    // Cúpula geodésica protectora de cristal esmerilado (Blindaje de anonimato)
    const domeMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.75, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2),
      engine.glassMat(0xf8fafc, { transmission: 0.88, opacity: 0.82, roughness: 0.12 })
    );
    domeMesh.position.y = -0.50;
    domeGroup.add(domeMesh);
    engine.anim15_dome = domeMesh;

    // Núcleo iluminado del Art. 76 (Capacitación Continua)
    const coreLight = new THREE.PointLight(0xffd700, 1.5, 1.6);
    coreLight.position.y = -0.22;
    domeGroup.add(coreLight);

    const trainingOrb = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 24, 24),
      engine.marbleMat(0xfdfbf7)
    );
    trainingOrb.position.y = -0.22;
    domeGroup.add(trainingOrb);

    const labelCore = engine.createLabelSprite("NÚCLEO FORMATIVO (ART. 76)", "Desacoplado de Sanciones", "#0f2d59", true);
    labelCore.position.set(0, 0.72, 0);
    domeGroup.add(labelCore);

    g.add(domeGroup);
  },

  animate(engine, t) {
    if (engine.anim15_dome) {
      engine.anim15_dome.rotation.y = t * 0.25;
    }
  }
};
