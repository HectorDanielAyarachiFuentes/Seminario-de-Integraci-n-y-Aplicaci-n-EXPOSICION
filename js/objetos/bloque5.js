/**
 * =============================================================================
 * OBJETOS 3D — BLOQUE V: ESCULTURAS 21 A 25
 * Presentación de Tesina • CURZAS - UNCo
 * =============================================================================
 * Representación visual concreta y pertinente de Cronograma, Recursos, Ética y Cierre:
 * 21. anim_21: Espiral Temporal Helicoidal de 7 Meses y 6 Hitos de Campo (Cronograma 2027)
 * 22. anim_22: Trípode Dórico de Viabilidad de Recursos (Apartado 9: Humanos, Técnicos, Costo Cero)
 * 23. anim_23: Cofre Blindado Ley 25.326, Balanza Ética y Pergamino de Inmunidad Laboral
 * 24. anim_24: Faro Monumental de Valor Público y Modernización Docente en la Patagonia
 * 25. anim_25: Gran Medallón de Graduación Laureado UNCo y Atril Abierto al Tribunal Evaluador
 */

window.Presentation3D_Objects = window.Presentation3D_Objects || {};

// ──────────────────────────────────────────────────────────────────────────
// 21. CRONOGRAMA 2027: Espiral Temporal Helicoidal y 6 Balizas de Campo
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_21"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.45, 0.22, -1.22);

    // Chasis mecanizado con cantoneras de latón
    const chassis = engine.createMachinedChassis(1.50, 0.10, 1.50, { color: 0x1e293b });
    chassis.position.y = -0.92;
    g.add(chassis);

    // Placa técnica de cronograma
    const plaqueMaster = engine.createEngravedPlaque(
      1.10,
      0.22,
      "CRONOGRAMA DE ACTIVIDADES 2027",
      "Plan de Trabajo de 7 Meses Intensivos (Mayo - Noviembre)",
      ["6 FASES SECUENCIALES", "DEFENSA ORAL 2027"],
      { theme: "dark" }
    );
    plaqueMaster.position.set(0, -0.84, 0.74);
    g.add(plaqueMaster);

    const group = new THREE.Group();
    group.position.set(0, -0.05, 0);

    // Reloj de sol astronómico graduado en la base (Plato de 12 meses / divisiones)
    const dialBase = engine.createGraduatedDial(1.05, {
      divisions: 12,
      title: "AÑO 2027",
      sub: "7 MESES",
      theme: "dark"
    });
    dialBase.rotation.x = Math.PI / 2;
    dialBase.position.y = -0.78;
    group.add(dialBase);

    // Eje central de latón
    const gnomon = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.06, 1.6, 16),
      engine.brassMat(0xd4af37)
    );
    gnomon.position.y = 0.0;
    group.add(gnomon);

    // Espiral helicoidal ascendente (7 vueltas / meses: Mayo a Noviembre 2027)
    const spiralPoints = [];
    const totalPoints = 120;
    for (let i = 0; i <= totalPoints; i++) {
      const u = i / totalPoints;
      const angle = u * Math.PI * 4.5;
      const radius = 0.85 - u * 0.35;
      const y = -0.75 + u * 1.35;
      spiralPoints.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius));
    }
    const spiralCurve = new THREE.CatmullRomCurve3(spiralPoints);
    const spiralTube = new THREE.Mesh(
      new THREE.TubeGeometry(spiralCurve, 80, 0.025, 12, false),
      engine.brassMat(0xffd700)
    );
    group.add(spiralTube);

    // 6 Balizas / Monolitos luminosos que marcan las 6 Fases de Campo
    const phases = [
      { name: "F1 (MAYO)", sub: "Avales y Prueba Piloto", u: 0.1, col: "#38bdf8", hex: 0x38bdf8 },
      { name: "F2 (JUNIO)", sub: "8 Entrevistas y Leyes", u: 0.28, col: "#2563eb", hex: 0x2563eb },
      { name: "F3 (JULIO)", sub: "Sondeo 45 Casos", u: 0.46, col: "#059669", hex: 0x059669 },
      { name: "F4 (AGOSTO)", sub: "Triangulación Analítica", u: 0.64, col: "#d97706", hex: 0xd97706 },
      { name: "F5 (SEP-OCT)", sub: "Redacción Lineamientos", u: 0.82, col: "#7c3aed", hex: 0x7c3aed },
      { name: "F6 (NOVIEMBRE)", sub: "Entrega y Defensa Oral", u: 0.98, col: "#dc2626", hex: 0xdc2626 }
    ];

    engine.anim21_beacons = [];
    phases.forEach((ph) => {
      const pt = spiralCurve.getPoint(ph.u);

      const beacon = new THREE.Mesh(
        new THREE.SphereGeometry(0.065, 16, 16),
        new THREE.MeshStandardMaterial({
          color: ph.hex,
          emissive: ph.hex,
          emissiveIntensity: 0.6,
          roughness: 0.2
        })
      );
      beacon.position.copy(pt);
      group.add(beacon);
      engine.anim21_beacons.push(beacon);

      const label = engine.createLabelSprite(ph.name, ph.sub, ph.col, false, { x: 0.52, y: 0.16 });
      label.position.set(pt.x * 1.35, pt.y + 0.12, pt.z * 1.35);
      group.add(label);
    });

    // Puntero cronológico orbital superior
    engine.anim21_pointer = new THREE.Mesh(
      new THREE.ConeGeometry(0.08, 0.22, 16),
      engine.brassMat(0xffd700)
    );
    engine.anim21_pointer.position.set(0, 0.85, 0);
    group.add(engine.anim21_pointer);

    const mainTitle = engine.createLabelSprite("CRONOGRAMA DE ACTIVIDADES 2027", "7 Meses Intensivos • 6 Fases Secuenciales", "#0f2d59", true);
    mainTitle.position.set(0, 1.15, 0);
    group.add(mainTitle);

    g.add(group);
  },

  animate(engine, t) {
    if (engine.anim21_pointer) {
      engine.anim21_pointer.rotation.y = t * 0.5;
    }
    if (engine.anim21_beacons) {
      engine.anim21_beacons.forEach((b, i) => {
        b.scale.setScalar(1 + Math.sin(t * 2 + i * 0.8) * 0.15);
      });
    }
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 22. VIABILIDAD INTEGRAL: Trípode Monumental de Recursos (Apartado 9 TFG)
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_22"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.6, 0.22, -1.22);

    // Chasis triangular maquinado con cantoneras
    const chassis = engine.createMachinedChassis(1.60, 0.10, 1.60, { color: 0x1e293b });
    chassis.position.y = -0.92;
    g.add(chassis);

    // Placa técnica de viabilidad institucional
    const plaqueMaster = engine.createEngravedPlaque(
      1.10,
      0.22,
      "VIABILIDAD INTEGRAL DEL PROYECTO",
      "Apartado 9 del TFG • Factibilidad Comprobada",
      ["RECURSOS HUMANOS", "RECURSOS TÉCNICOS", "COSTO MARGINAL CERO"],
      { theme: "dark" }
    );
    plaqueMaster.position.set(0, -0.84, 0.78);
    g.add(plaqueMaster);

    const group = new THREE.Group();
    group.position.set(0, -0.05, 0);

    // 1. Pedestal triangular escalonado de granito pulido con moldura de latón
    const triBaseLow = new THREE.Mesh(
      new THREE.CylinderGeometry(1.35, 1.45, 0.12, 3),
      engine.graniteMat(0x0f172a, 0.3, 0.3)
    );
    triBaseLow.position.y = -0.84;
    triBaseLow.receiveShadow = true;
    group.add(triBaseLow);

    const triBaseTop = new THREE.Mesh(
      new THREE.CylinderGeometry(1.22, 1.28, 0.1, 3),
      engine.marbleMat(0xf8fafc, 0.25)
    );
    triBaseTop.position.y = -0.73;
    triBaseTop.receiveShadow = true;
    group.add(triBaseTop);

    const triRim = new THREE.Mesh(
      new THREE.CylinderGeometry(1.24, 1.24, 0.02, 3),
      engine.brassMat(0xd4af37)
    );
    triRim.position.y = -0.67;
    group.add(triRim);

    // 2. Las 3 Columnas Monumentales Acanaladas (Apartado 9 Oficial)
    const pillars = [
      { name: "RECURSOS HUMANOS", sub: "Tesista Tec. Sup. + Cátedra", angle: -Math.PI / 6, col: "#1d4ed8", hex: 0x1d4ed8 },
      { name: "RECURSOS TÉCNICOS", sub: "Moodle • SIU • R / PSPP", angle: Math.PI / 2, col: "#0284c7", hex: 0x0284c7 },
      { name: "RECURSOS ECONÓMICOS", sub: "Costo Marginal Cero", angle: (7 * Math.PI) / 6, col: "#15803d", hex: 0x16a34a }
    ];

    pillars.forEach((pil) => {
      const px = Math.cos(pil.angle) * 0.88;
      const pz = Math.sin(pil.angle) * 0.88;

      const colMesh = engine.createClassicalColumn(1.08, 0.105, pil.hex, true);
      colMesh.position.set(px, -0.15, pz);
      group.add(colMesh);

      // Placa técnica de orfebrería al pie de cada columna
      const pPlaque = engine.createEngravedPlaque(0.68, 0.15, pil.name, pil.sub, [], { theme: "dark" });
      pPlaque.position.set(px * 1.35, -0.72, pz * 1.35);
      pPlaque.rotation.y = -pil.angle + Math.PI / 2;
      group.add(pPlaque);

      const label = engine.createLabelSprite(pil.name, pil.sub, pil.col, false);
      label.position.set(px * 1.55, -0.12, pz * 1.55);
      group.add(label);
    });

    // 3. Tablero triangular de cristal óptico puro con bisel pulido
    const glassRoof = new THREE.Mesh(
      new THREE.CylinderGeometry(1.05, 1.05, 0.065, 3),
      engine.glassMat(0x38bdf8, { roughness: 0.05, transmission: 0.94, opacity: 0.88, thickness: 1.2 })
    );
    glassRoof.position.y = 0.44;
    group.add(glassRoof);

    for (let i = 0; i < 3; i++) {
      const a = (i * 2 * Math.PI) / 3 - Math.PI / 6;
      const cx = Math.cos(a) * 0.98;
      const cz = Math.sin(a) * 0.98;
      const clamp = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.1, 0.14),
        engine.brassMat(0xd4af37)
      );
      clamp.position.set(cx, 0.44, cz);
      clamp.rotation.y = -a;
      group.add(clamp);
    }

    // 4. Medallón oficial central en oro puro con Escudo Académico UNCo
    engine.anim22_seal = new THREE.Group();
    engine.anim22_seal.position.set(0, 0.52, 0);

    const sealDisc = new THREE.Mesh(
      new THREE.CylinderGeometry(0.32, 0.32, 0.045, 32),
      engine.goldMat(0xffd700)
    );
    engine.anim22_seal.add(sealDisc);

    // Escudo institucional UNCo en el corazón del medallón
    const sealUNCo = engine.createAcademicSeal(0.24);
    sealUNCo.rotation.x = Math.PI / 2;
    sealUNCo.position.y = 0.03;
    engine.anim22_seal.add(sealUNCo);

    const sealWreath = new THREE.Mesh(
      new THREE.TorusGeometry(0.28, 0.02, 16, 48),
      engine.brassMat(0xd4af37)
    );
    sealWreath.rotation.x = Math.PI / 2;
    engine.anim22_seal.add(sealWreath);

    group.add(engine.anim22_seal);

    const sealLight = new THREE.PointLight(0xffd700, 1.5, 2.2);
    sealLight.position.set(0, 0.65, 0);
    group.add(sealLight);

    const mainTitle = engine.createLabelSprite(
      "VIABILIDAD INTEGRAL DEL PROYECTO",
      "Apartado 9 del TFG • Costo Marginal Cero • Avales",
      "#0f2d59",
      true
    );
    mainTitle.position.set(0, 1.25, 0);
    group.add(mainTitle);

    g.add(group);
  },

  animate(engine, t) {
    if (engine.anim22_seal) {
      engine.anim22_seal.rotation.y = t * 0.45;
    }
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 23. ÉTICA Y DATOS: Cofre Blindado Ley 25.326 y Pergamino de Inmunidad
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_23"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.5, 0.22, -1.22);

    // Chasis de caoba noble acorazado con cantoneras de latón
    const chassis = engine.createMachinedChassis(1.50, 0.10, 1.20, { color: 0x2e1204 });
    chassis.position.y = -0.92;
    g.add(chassis);

    // Placa técnica de blindaje legal
    const plaqueMaster = engine.createEngravedPlaque(
      1.10,
      0.22,
      "BLINDAJE ÉTICO Y LEGAL INSTITUCIONAL",
      "Ley 25.326 de Protección de Datos • CCT Dec. 1246/2015",
      ["DISOCIACIÓN ESTRICTA", "INMUNIDAD LABORAL ART. 75"],
      { theme: "dark" }
    );
    plaqueMaster.position.set(0, -0.84, 0.68);
    g.add(plaqueMaster);

    const group = new THREE.Group();
    group.position.set(0, -0.05, 0);

    // 1. Cofre acorazado de acero y bronce (Protección de Datos Personales)
    const chestGroup = new THREE.Group();
    chestGroup.position.set(-0.45, -0.2, 0);

    const chestBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.65, 0.45, 0.48),
      engine.graniteMat(0x0f172a, 0.2, 0.8)
    );
    chestGroup.add(chestBody);

    const chestBands = new THREE.Mesh(
      new THREE.BoxGeometry(0.67, 0.47, 0.12),
      engine.brassMat(0xd4af37)
    );
    chestGroup.add(chestBands);

    // Dial de combinación numérica de precisión en el cofre
    const lockDial = engine.createGraduatedDial(0.12, {
      divisions: 40,
      title: "LEY 25326",
      sub: "ANÓNIMO",
      theme: "gold"
    });
    lockDial.position.set(0, 0.05, 0.25);
    chestGroup.add(lockDial);

    const lockRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.08, 0.025, 16, 24, Math.PI),
      engine.brassMat(0xffd700)
    );
    lockRing.position.set(0, 0.28, 0.24);
    chestGroup.add(lockRing);

    const lockCore = new THREE.Mesh(
      new THREE.SphereGeometry(0.055, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x38bdf8, emissiveIntensity: 0.8 })
    );
    lockCore.position.set(0, 0.18, 0.25);
    chestGroup.add(lockCore);

    group.add(chestGroup);

    const labelCofre = engine.createLabelSprite("PROTECCIÓN LEY 25.326", "Disociación Estricta • Sin IPs ni Correos", "#0369a1", false, { x: 0.68, y: 0.19 });
    labelCofre.position.set(-0.45, 0.32, 0);
    group.add(labelCofre);

    // 2. Pergamino oficial de Inmunidad Laboral (CCT Docente Dec. 1246/2015)
    const scrollGroup = new THREE.Group();
    scrollGroup.position.set(0.48, -0.2, 0);

    const scrollPaper = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.24, 0.62, 32, 1, false, -0.5, Math.PI + 1.0),
      engine.marbleMat(0xfdfbf7)
    );
    scrollPaper.rotation.x = Math.PI / 2;
    scrollPaper.rotation.z = -0.3;
    scrollGroup.add(scrollPaper);

    const waxSeal = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 0.03, 24),
      new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.4 })
    );
    waxSeal.position.set(0, 0, 0.22);
    waxSeal.rotation.x = Math.PI / 2;
    scrollGroup.add(waxSeal);

    // Placa técnica de inmunidad gremial
    const scrollPlaque = engine.createEngravedPlaque(0.44, 0.13, "CCT DEC. 1246/15", "Garantía de No Afectación", [], { theme: "dark" });
    scrollPlaque.position.set(0, -0.22, 0.25);
    scrollGroup.add(scrollPlaque);

    group.add(scrollGroup);

    const labelPergamino = engine.createLabelSprite("GARANTÍA DE NO AFECTACIÓN", "Sin Injerencia en Permanencia (Art. 75)", "#dc2626", false, { x: 0.68, y: 0.19 });
    labelPergamino.position.set(0.48, 0.32, 0);
    group.add(labelPergamino);

    // Balanza ética suspendida en el centro superior con dial de pivote
    engine.anim23_scale = new THREE.Group();
    engine.anim23_scale.position.set(0, 0.45, 0);

    const scaleBeam = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.015, 0.72, 16),
      engine.brassMat(0xffd700)
    );
    scaleBeam.rotation.z = Math.PI / 2;
    engine.anim23_scale.add(scaleBeam);

    const balanceDial = engine.createGraduatedDial(0.12, {
      divisions: 20,
      title: "EQUIDAD",
      sub: "ÉTICA",
      theme: "gold"
    });
    balanceDial.position.set(0, 0, 0.04);
    engine.anim23_scale.add(balanceDial);

    group.add(engine.anim23_scale);

    const mainTitle = engine.createLabelSprite("BLINDAJE ÉTICO INSTITUCIONAL", "Protección de Datos y Consentimiento Informado", "#0f2d59", true);
    mainTitle.position.set(0, 1.05, 0);
    group.add(mainTitle);

    g.add(group);
  },

  animate(engine, t) {
    if (engine.anim23_scale) {
      engine.anim23_scale.rotation.z = Math.sin(t * 1.2) * 0.08;
    }
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 24. VALOR PÚBLICO: Faro Monumental de Modernización y Capacidades UNCo
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_24"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.5, 0.22, -1.22);

    // Chasis octogonal maquinado con cantoneras de latón
    const chassis = engine.createMachinedChassis(1.50, 0.10, 1.50, { color: 0x1e293b });
    chassis.position.y = -0.92;
    g.add(chassis);

    // Placa técnica de valor público
    const plaqueMaster = engine.createEngravedPlaque(
      1.10,
      0.22,
      "VALOR PÚBLICO Y MODERNIZACIÓN",
      "Hacia una Universidad Formativa, Situada y Democrática",
      ["CURZAS • UNIVERSIDAD NACIONAL DEL COMAHUE"],
      { theme: "dark" }
    );
    plaqueMaster.position.set(0, -0.84, 0.74);
    g.add(plaqueMaster);

    const group = new THREE.Group();
    group.position.set(0, -0.05, 0);

    // Dial azimutal circular graduado en la base del faro
    const baseDial = engine.createGraduatedDial(0.68, {
      divisions: 36,
      title: "RUMBO",
      sub: "PATAGONIA",
      theme: "dark"
    });
    baseDial.rotation.x = Math.PI / 2;
    baseDial.position.y = -0.72;
    group.add(baseDial);

    // Torre del faro de mármol blanco de base hexagonal y fuste cónico
    const towerShaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.48, 1.45, 24),
      engine.marbleMat(0xf8fafc)
    );
    towerShaft.position.y = -0.15;
    group.add(towerShaft);

    // Escudo institucional UNCo sobre la puerta del faro
    const seal = engine.createAcademicSeal(0.10);
    seal.position.set(0, -0.38, 0.40);
    group.add(seal);

    const balcony = new THREE.Mesh(
      new THREE.CylinderGeometry(0.38, 0.38, 0.06, 24),
      engine.brassMat(0xd4af37)
    );
    balcony.position.y = 0.58;
    group.add(balcony);

    const lantern = new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.28, 0.38, 16),
      engine.glassMat(0xffffff, { roughness: 0.1, transmission: 0.92, opacity: 0.5 })
    );
    lantern.position.y = 0.78;
    group.add(lantern);

    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2),
      engine.brassMat(0xffd700)
    );
    dome.position.y = 0.97;
    group.add(dome);

    engine.anim24_beaconGroup = new THREE.Group();
    engine.anim24_beaconGroup.position.set(0, 0.78, 0);

    const bulb = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xffd700 })
    );
    engine.anim24_beaconGroup.add(bulb);

    const beamLight = new THREE.PointLight(0xffd700, 2.5, 4.0);
    engine.anim24_beaconGroup.add(beamLight);

    const beamCone1 = new THREE.Mesh(
      new THREE.ConeGeometry(0.55, 1.8, 24, 1, true),
      engine.glassMat(0xffd700, { roughness: 0.4, transmission: 0.85, opacity: 0.25 })
    );
    beamCone1.rotation.x = Math.PI / 2;
    beamCone1.position.z = 0.95;
    engine.anim24_beaconGroup.add(beamCone1);

    const beamCone2 = new THREE.Mesh(
      new THREE.ConeGeometry(0.55, 1.8, 24, 1, true),
      engine.glassMat(0x38bdf8, { roughness: 0.4, transmission: 0.85, opacity: 0.25 })
    );
    beamCone2.rotation.x = -Math.PI / 2;
    beamCone2.position.z = -0.95;
    engine.anim24_beaconGroup.add(beamCone2);

    group.add(engine.anim24_beaconGroup);

    // 4 Pilares de conclusiones alrededor del faro
    const conclusions = [
      { name: "DESACOPLAMIENTO ART. 75", angle: 0, col: "#2563eb" },
      { name: "CAPACITACIÓN ART. 76", angle: Math.PI / 2, col: "#0284c7" },
      { name: "DOCENCIA HÍBRIDA", angle: Math.PI, col: "#059669" },
      { name: "CAPACIDADES ESTATALES", angle: (3 * Math.PI) / 2, col: "#7c3aed" }
    ];

    conclusions.forEach((c) => {
      const cx = Math.cos(c.angle) * 0.95;
      const cz = Math.sin(c.angle) * 0.95;
      const label = engine.createLabelSprite(c.name, "Conclusión de Factibilidad", c.col, false, { x: 0.58, y: 0.17 });
      label.position.set(cx, -0.5, cz);
      group.add(label);
    });

    const mainTitle = engine.createLabelSprite("VALOR PÚBLICO Y MODERNIZACIÓN", "Hacia una Universidad Formativa, Situada y Democrática", "#0f2d59", true);
    mainTitle.position.set(0, 1.25, 0);
    group.add(mainTitle);

    g.add(group);
  },

  animate(engine, t) {
    if (engine.anim24_beaconGroup) {
      engine.anim24_beaconGroup.rotation.y = t * 0.75;
    }
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 25. DESPEDIDA FORMAL: Medallón de Graduación UNCo y Atril de Defensa Oral
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_25"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.6, 0.22, -1.22);

    // Chasis ceremonial de caoba noble con cantoneras de oro
    const chassis = engine.createMachinedChassis(1.60, 0.10, 1.60, { color: 0x2e1204 });
    chassis.position.y = -0.92;
    g.add(chassis);

    // Placa de oro maestro conmemorativa
    const plaqueMaster = engine.createEngravedPlaque(
      1.20,
      0.24,
      "UNIVERSIDAD NACIONAL DEL COMAHUE",
      "Centro Universitario Regional Zona Atlántica (CURZAS)",
      ["DECRETO 1246/2015", "TESINA DE LICENCIATURA 2026-2027"],
      { theme: "gold" }
    );
    plaqueMaster.position.set(0, -0.84, 0.82);
    g.add(plaqueMaster);

    const group = new THREE.Group();
    group.position.set(0, -0.05, 0);

    const podBase = new THREE.Mesh(
      new THREE.CylinderGeometry(1.35, 1.45, 0.18, 48),
      engine.graniteMat(0x0f172a)
    );
    podBase.position.y = -0.85;
    group.add(podBase);

    // 1. Gran Medallón Laureado Central de la Universidad Nacional del Comahue
    engine.anim25_medal = new THREE.Group();
    engine.anim25_medal.position.set(0, 0.25, -0.2);

    const medalDisc = new THREE.Mesh(
      new THREE.CylinderGeometry(0.72, 0.72, 0.08, 48),
      engine.brassMat(0xffd700)
    );
    medalDisc.rotation.x = Math.PI / 2;
    engine.anim25_medal.add(medalDisc);

    // Gran Escudo Académico Institucional de la Universidad Nacional del Comahue en el centro
    const seal = engine.createAcademicSeal(0.36);
    seal.rotation.x = Math.PI / 2;
    seal.position.set(0, 0.06, 0);
    engine.anim25_medal.add(seal);

    const wreath = new THREE.Mesh(
      new THREE.TorusGeometry(0.78, 0.035, 16, 64),
      engine.brassMat(0xd4af37)
    );
    engine.anim25_medal.add(wreath);

    group.add(engine.anim25_medal);

    // 2. Dos Columnas / Pebeteros ceremoniales flanqueando el medallón
    [-0.95, 0.95].forEach((posX) => {
      const urnShaft = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.12, 0.85, 24),
        engine.marbleMat(0xf8fafc)
      );
      urnShaft.position.set(posX, -0.4, -0.1);
      group.add(urnShaft);

      const urnBowl = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18, 0.08, 0.15, 24),
        engine.brassMat(0xffd700)
      );
      urnBowl.position.set(posX, 0.08, -0.1);
      group.add(urnBowl);

      const flame = new THREE.Mesh(
        new THREE.ConeGeometry(0.09, 0.24, 16),
        new THREE.MeshStandardMaterial({
          color: 0xffb703,
          emissive: 0xffb703,
          emissiveIntensity: 0.8,
          roughness: 0.2
        })
      );
      flame.position.set(posX, 0.22, -0.1);
      group.add(flame);
    });

    // 3. Atril ceremonial al frente para el intercambio con el Tribunal Evaluador
    const lecternGroup = new THREE.Group();
    lecternGroup.position.set(0, -0.3, 0.55);

    const lecternBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.22, 0.65, 24),
      engine.graniteMat(0x1e293b)
    );
    lecternGroup.add(lecternBody);

    const lecternShelf = new THREE.Mesh(
      new THREE.BoxGeometry(0.65, 0.04, 0.42),
      engine.brassMat(0xd4af37)
    );
    lecternShelf.position.set(0, 0.35, 0);
    lecternShelf.rotation.x = 0.35;
    lecternGroup.add(lecternShelf);

    // Tomo de tesina ceremonial abierto sobre el atril (Compañero de la slide 1)
    const bookDesk = new THREE.Group();
    bookDesk.position.set(0, 0.38, 0.05);
    bookDesk.rotation.x = 0.35;

    const bookCover = new THREE.Mesh(
      new THREE.BoxGeometry(0.50, 0.02, 0.36),
      engine.graniteMat(0x4a0e17)
    );
    bookDesk.add(bookCover);

    const bookPages = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 0.035, 0.34),
      engine.marbleMat(0xfdfbf7)
    );
    bookPages.position.y = 0.025;
    bookDesk.add(bookPages);

    const lecternPlaque = engine.createEngravedPlaque(0.42, 0.12, "DEFENSA DE TESINA", "Héctor Daniel Ayarachi Fuentes", [], { theme: "dark" });
    lecternPlaque.position.set(0, 0.05, 0.12);
    bookDesk.add(lecternPlaque);

    lecternGroup.add(bookDesk);
    group.add(lecternGroup);

    // Cartelas de honor al Tribunal Evaluador y Despedida
    const tribunalSprite = engine.createLabelSprite(
      "ESPACIO DE INTERCAMBIO CON EL TRIBUNAL",
      "Dra. Deborah Noguera • Esp. Federico Abeiro • Esp. María Cecilia Aguirre",
      "#0f2d59",
      true
    );
    tribunalSprite.position.set(0, 0.95, 0);
    group.add(tribunalSprite);

    const thankYouSprite = engine.createLabelSprite(
      "¡MUCHAS GRACIAS!",
      "CURZAS - Universidad Nacional del Comahue",
      "#b8860b",
      false,
      { x: 0.72, y: 0.2 }
    );
    thankYouSprite.position.set(0, -0.1, 0.85);
    group.add(thankYouSprite);

    g.add(group);
  },

  animate(engine, t) {
    if (engine.anim25_medal) {
      engine.anim25_medal.rotation.y = Math.sin(t * 0.5) * 0.15;
    }
  }
};

