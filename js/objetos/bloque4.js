/**
 * =============================================================================
 * OBJETOS 3D — BLOQUE IV: ESCULTURAS 16 A 20
 * Presentación de Tesina • CURZAS - UNCo
 * =============================================================================
 * Representación visual concreta y pertinente de Gobernanza y Metodología:
 * 16. anim_16: Mesa Redonda de Cogobierno Paritario y Servidor Criptográfico (Carlos Matus + Oscar Oszlak)
 * 17. anim_17: Muro Escalonado de Antecedentes y Gema de Vacancia Patagónica (Estado del Arte)
 * 18. anim_18: Probeta Doble de Triangulación Mixta (CUAL -> cuan) y Bitácora de Caso
 * 19. anim_19: Muestrario de Informantes Clave (8 Entrevistas) y Matriz de 45 Cuestionarios
 * 20. anim_20: Ábaco Matricial de las 5 Dimensiones e Indicadores Empíricos de Factibilidad
 */

window.Presentation3D_Objects = window.Presentation3D_Objects || {};

// ──────────────────────────────────────────────────────────────────────────
// ──────────────────────────────────────────────────────────────────────────
// 16. POLIGOBERNANZA Y CAPACIDADES: Mesa de Cogobierno y Servidor Criptográfico
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_16"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.45, 0.22, -1.22);

    // Chasis mecanizado con cantoneras de latón
    const chassis = engine.createMachinedChassis(1.50, 0.10, 1.50, { color: 0x1e293b });
    chassis.position.y = -0.92;
    g.add(chassis);

    // Placa maestra grabada en latón
    const plaqueMaster = engine.createEngravedPlaque(
      1.10,
      0.22,
      "PODER COMPARTIDO Y POLIGOBERNANZA",
      "Matus • Cao & Blutman • Oszlak (Estado Exponencial)",
      ["ADUNC GREMIO", "DOCENTES", "ESTUDIANTES", "GESTIÓN"],
      { theme: "dark" }
    );
    plaqueMaster.position.set(0, -0.84, 0.74);
    g.add(plaqueMaster);

    const group = new THREE.Group();
    group.position.set(0, -0.05, 0);

    // 1. Mesa circular de cogobierno paritario de nogal y bisel de latón
    const tableTop = new THREE.Mesh(
      new THREE.CylinderGeometry(1.05, 1.05, 0.08, 48),
      engine.graniteMat(0x1e293b, 0.3, 0.4)
    );
    tableTop.position.y = -0.3;
    group.add(tableTop);

    const tableRim = new THREE.Mesh(
      new THREE.TorusGeometry(1.05, 0.018, 16, 64),
      engine.brassMat(0xd4af37)
    );
    tableRim.position.y = -0.3;
    tableRim.rotation.x = Math.PI / 2;
    group.add(tableRim);

    // Escudo institucional UNCo sobre el tablero de cogobierno
    const seal = engine.createAcademicSeal(0.18);
    seal.rotation.x = Math.PI / 2;
    seal.position.set(0, -0.25, 0.42);
    group.add(seal);

    // Columna central de soporte de la mesa
    const tablePedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(0.22, 0.32, 0.8, 32),
      engine.marbleMat(0xf8fafc)
    );
    tablePedestal.position.y = -0.74;
    group.add(tablePedestal);

    // 2. 4 Escaños / Asientos de representación colegiada en la mesa
    const seats = [
      { name: "ADUNC (GREMIO)", sub: "Representación Paritaria", angle: 0, col: "#dc2626", hex: 0xdc2626 },
      { name: "CLAUSTRO DOCENTE", sub: "Profesores y Asistentes", angle: Math.PI / 2, col: "#2563eb", hex: 0x2563eb },
      { name: "CLAUSTRO ESTUDIANTIL", sub: "Comunidad de Alumnos", angle: Math.PI, col: "#16a34a", hex: 0x16a34a },
      { name: "AUTORIDADES", sub: "Gestión Departamental", angle: (3 * Math.PI) / 2, col: "#d97706", hex: 0xd97706 }
    ];

    seats.forEach((seat) => {
      const sx = Math.cos(seat.angle) * 1.02;
      const sz = Math.sin(seat.angle) * 1.02;

      const chair = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.14, 0.18, 24),
        engine.brassMat(seat.hex)
      );
      chair.position.set(sx, -0.22, sz);
      group.add(chair);

      const back = new THREE.Mesh(
        new THREE.BoxGeometry(0.18, 0.24, 0.04),
        engine.marbleMat(0xffffff)
      );
      back.position.set(sx * 1.08, -0.06, sz * 1.08);
      back.rotation.y = -seat.angle + Math.PI / 2;
      group.add(back);

      const label = engine.createLabelSprite(seat.name, seat.sub, seat.col, false, { x: 0.58, y: 0.17 });
      label.position.set(sx * 1.25, 0.22, sz * 1.25);
      group.add(label);
    });

    // 3. Servidor central criptográfico (Oszlak: Estado Exponencial y anonimato digital)
    const serverTower = new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.32, 0.72, 6),
      engine.graniteMat(0x0f172a, 0.2, 0.6)
    );
    serverTower.position.y = 0.12;
    group.add(serverTower);

    // Dial de encriptación tokenizada SHA-256 en el servidor
    const serverDial = engine.createGraduatedDial(0.18, {
      divisions: 32,
      title: "TOKEN",
      sub: "SHA-256",
      theme: "dark"
    });
    serverDial.position.set(0, 0.12, 0.32);
    group.add(serverDial);

    for (let k = 0; k < 4; k++) {
      const slot = new THREE.Mesh(
        new THREE.BoxGeometry(0.38, 0.025, 0.38),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
      );
      slot.position.y = -0.12 + k * 0.14;
      group.add(slot);
    }

    const cryptoPadlock = new THREE.Mesh(
      new THREE.TorusGeometry(0.12, 0.03, 16, 32, Math.PI),
      engine.brassMat(0xffd700)
    );
    cryptoPadlock.position.set(0, 0.62, 0);
    group.add(cryptoPadlock);

    const cryptoBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.22, 0.16, 0.1),
      engine.brassMat(0xffd700)
    );
    cryptoBody.position.set(0, 0.48, 0);
    group.add(cryptoBody);

    engine.anim16_polyRing = engine.createBrassArmillaryRing(0.75, 0.012);
    engine.anim16_polyRing.position.y = 0.12;
    engine.anim16_polyRing.rotation.x = Math.PI / 2;
    group.add(engine.anim16_polyRing);

    const titleSprite = engine.createLabelSprite("PODER COMPARTIDO Y POLIGOBERNANZA", "Matus • Cao & Blutman • Oszlak", "#0f2d59", true);
    titleSprite.position.set(0, 0.95, 0);
    group.add(titleSprite);

    g.add(group);
  },

  animate(engine, t) {
    if (engine.anim16_polyRing) {
      engine.anim16_polyRing.rotation.z = t * 0.25;
      engine.anim16_polyRing.rotation.x = Math.PI / 2 + Math.sin(t * 0.8) * 0.1;
    }
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 17. ESTADO DEL ARTE Y VACANCIA: Muro de 3 Escalas y Gema Patagónica
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_17"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.55, 0.22, -1.22);

    // Chasis mecanizado con cantoneras
    const chassis = engine.createMachinedChassis(1.55, 0.10, 1.55, { color: 0x1e293b });
    chassis.position.y = -0.92;
    g.add(chassis);

    // Placa técnica maestra
    const plaqueMaster = engine.createEngravedPlaque(
      1.10,
      0.22,
      "ESTADO DEL ARTE Y VACANCIA REGIONAL",
      "Inexistencia de Modelos 360° en Universidades Descentralizadas",
      ["BRECHA METODOLÓGICA IDENTIFICADA"],
      { theme: "dark" }
    );
    plaqueMaster.position.set(0, -0.84, 0.78);
    g.add(plaqueMaster);

    const group = new THREE.Group();
    group.position.set(0, -0.05, 0);

    // 1. Podio escalonado de 3 niveles concéntricos (Las 3 escalas de antecedentes)
    // Nivel 1: Escala Internacional
    const base1 = new THREE.Mesh(
      new THREE.CylinderGeometry(1.28, 1.36, 0.22, 48),
      engine.graniteMat(0x1e293b)
    );
    base1.position.y = -0.95;
    group.add(base1);

    const rim1 = new THREE.Mesh(
      new THREE.TorusGeometry(1.30, 0.016, 16, 64),
      engine.brassMat(0xd4af37)
    );
    rim1.rotation.x = Math.PI / 2;
    rim1.position.y = -0.84;
    group.add(rim1);

    const plaque1 = engine.createEngravedPlaque(0.82, 0.15, "1. ESCALA INTERNACIONAL", "México y Cuba (Sifuentes • Obando)", [], { theme: "dark" });
    plaque1.position.set(0, -0.95, 1.40);
    group.add(plaque1);

    // Nivel 2: Escala Nacional
    const base2 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.96, 1.04, 0.22, 48),
      engine.marbleMat(0xf1f5f9)
    );
    base2.position.y = -0.73;
    group.add(base2);

    const rim2 = new THREE.Mesh(
      new THREE.TorusGeometry(0.98, 0.015, 16, 64),
      engine.brassMat(0xd4af37)
    );
    rim2.rotation.x = Math.PI / 2;
    rim2.position.y = -0.62;
    group.add(rim2);

    const plaque2 = engine.createEngravedPlaque(0.74, 0.15, "2. ESCALA NACIONAL", "Carrera Docente (Marquina • Pérez)", [], { theme: "dark" });
    plaque2.position.set(0, -0.73, 1.10);
    group.add(plaque2);

    // Nivel 3: Escala Regional UNCo
    const base3 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.68, 0.76, 0.22, 48),
      engine.brassMat(0xd4af37)
    );
    base3.position.y = -0.51;
    group.add(base3);

    const plaque3 = engine.createEngravedPlaque(0.66, 0.15, "3. ESCALA REGIONAL UNCo", "Estatuto 2025 • Res. 196/2022", [], { theme: "dark" });
    plaque3.position.set(0, -0.51, 0.82);
    group.add(plaque3);

    // Dial cronológico de antecedentes en la meseta
    const timeDial = engine.createGraduatedDial(0.22, {
      divisions: 36,
      title: "CRONOLOGÍA",
      sub: "1995-2026",
      theme: "gold"
    });
    timeDial.position.set(0, -0.38, 0.48);
    timeDial.rotation.x = -Math.PI * 0.15;
    group.add(timeDial);

    // 2. Pórtico de latón dorado en forma de arco triunfal con basas molduradas
    const archLeft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.045, 0.045, 1.2, 24),
      engine.brassMat(0xffd700)
    );
    archLeft.position.set(-0.48, 0.1, 0);
    group.add(archLeft);

    const archRight = new THREE.Mesh(
      new THREE.CylinderGeometry(0.045, 0.045, 1.2, 24),
      engine.brassMat(0xffd700)
    );
    archRight.position.set(0.48, 0.1, 0);
    group.add(archRight);

    [-0.48, 0.48].forEach(x => {
      const colBase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.07, 0.08, 0.06, 24),
        engine.brassMat(0xd4af37)
      );
      colBase.position.set(x, -0.47, 0);
      group.add(colBase);

      const colCap = new THREE.Mesh(
        new THREE.CylinderGeometry(0.075, 0.05, 0.05, 24),
        engine.brassMat(0xd4af37)
      );
      colCap.position.set(x, 0.7, 0);
      group.add(colCap);
    });

    const archTop = new THREE.Mesh(
      new THREE.TorusGeometry(0.48, 0.045, 16, 48, Math.PI),
      engine.brassMat(0xffd700)
    );
    archTop.position.set(0, 0.7, 0);
    group.add(archTop);

    // 3. Gema / Diamante central flotante: Vacancia de Conocimiento Patagónico
    engine.anim17_diamond = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.32, 0),
      engine.glassMat(0x38bdf8, { roughness: 0.05, transmission: 0.96, opacity: 0.92 })
    );
    engine.anim17_diamond.position.set(0, 0.35, 0);
    group.add(engine.anim17_diamond);

    for (let c = 0; c < 4; c++) {
      const clawAng = (c * Math.PI) / 2;
      const claw = new THREE.Mesh(
        new THREE.CylinderGeometry(0.012, 0.016, 0.22, 12),
        engine.brassMat(0xffd700)
      );
      claw.position.set(Math.cos(clawAng) * 0.18, 0.26, Math.sin(clawAng) * 0.18);
      claw.rotation.z = Math.cos(clawAng) * 0.25;
      claw.rotation.x = Math.sin(clawAng) * 0.25;
      group.add(claw);
    }

    const gemLight = new THREE.PointLight(0x38bdf8, 2.2, 2.5);
    gemLight.position.set(0, 0.35, 0);
    group.add(gemLight);

    engine.anim17_ring = engine.createBrassArmillaryRing(0.52, 0.014);
    engine.anim17_ring.position.set(0, 0.35, 0);
    group.add(engine.anim17_ring);

    engine.anim17_ring2 = engine.createBrassArmillaryRing(0.40, 0.010);
    engine.anim17_ring2.position.set(0, 0.35, 0);
    group.add(engine.anim17_ring2);

    const mainLabel = engine.createLabelSprite("VACANCIA DISCIPLINAR PATAGÓNICA", "Inexistencia de Estudios 360° en Universidades Descentralizadas", "#0f2d59", true);
    mainLabel.position.set(0, 1.40, 0.08);
    group.add(mainLabel);

    g.add(group);
  },

  animate(engine, t) {
    if (engine.anim17_diamond) {
      engine.anim17_diamond.rotation.y = t * 0.45;
      engine.anim17_diamond.rotation.x = Math.sin(t * 0.6) * 0.2;
      engine.anim17_diamond.position.y = 0.35 + Math.sin(t * 1.2) * 0.04;
    }
    if (engine.anim17_ring) {
      engine.anim17_ring.rotation.x = t * 0.35;
      engine.anim17_ring.rotation.y = t * 0.25;
    }
    if (engine.anim17_ring2) {
      engine.anim17_ring2.rotation.x = -t * 0.28;
      engine.anim17_ring2.rotation.z = t * 0.32;
    }
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 18. ESTRATEGIA METODOLÓGICA: Probeta Doble Mixta (CUAL -> cuan)
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_18"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.45, 0.22, -1.22);

    // Chasis de caoba noble de laboratorio con cantoneras de latón
    const chassis = engine.createMachinedChassis(1.50, 0.10, 1.20, { color: 0x2e1204 });
    chassis.position.y = -0.92;
    g.add(chassis);

    // Placa maestra de rigor metodológico
    const plaqueMaster = engine.createEngravedPlaque(
      1.10,
      0.22,
      "DISEÑO METODOLÓGICO MIXTO INTEGRADO",
      "Estrategia Secuencial: CUALITATIVO → cuantitativo",
      ["8 ENTREVISTAS EN PROFUNDIDAD", "45 CUESTIONARIOS LIKERT"],
      { theme: "dark" }
    );
    plaqueMaster.position.set(0, -0.84, 0.68);
    g.add(plaqueMaster);

    const group = new THREE.Group();
    group.position.set(0, -0.05, 0);

    const standBase = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 0.08, 0.6),
      engine.graniteMat(0x1e293b)
    );
    standBase.position.y = -0.7;
    group.add(standBase);

    const standRod = new THREE.Mesh(
      new THREE.CylinderGeometry(0.035, 0.035, 1.5, 16),
      engine.brassMat(0xd4af37)
    );
    standRod.position.set(0, 0.05, -0.15);
    group.add(standRod);

    // Dial de calibración en el soporte vertical
    const calibDial = engine.createGraduatedDial(0.18, {
      divisions: 30,
      title: "CALIBRACIÓN",
      sub: "TRIANGULACIÓN",
      theme: "gold"
    });
    calibDial.position.set(0, 0.28, -0.12);
    group.add(calibDial);

    // 1. Probeta CUALITATIVA (Izquierda, predominante 70%)
    const cualFlask = new THREE.Mesh(
      new THREE.CylinderGeometry(0.32, 0.38, 0.85, 32),
      engine.glassMat(0xffffff, { roughness: 0.1, transmission: 0.9, opacity: 0.6 })
    );
    cualFlask.position.set(-0.45, -0.15, 0);
    group.add(cualFlask);

    // Marcas graduadas en el tubo cualitativo
    for (let k = 1; k <= 4; k++) {
      const ringTick = new THREE.Mesh(
        new THREE.TorusGeometry(0.31 + k * 0.015, 0.004, 8, 32),
        engine.brassMat(0xd4af37)
      );
      ringTick.rotation.x = Math.PI / 2;
      ringTick.position.set(-0.45, -0.45 + k * 0.14, 0);
      group.add(ringTick);
    }

    const cualLiquid = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.36, 0.65, 32),
      engine.glassMat(0x1d4ed8, { roughness: 0.2, transmission: 0.7, opacity: 0.85 })
    );
    cualLiquid.position.set(-0.45, -0.25, 0);
    group.add(cualLiquid);

    const labelCual = engine.createLabelSprite("PREDOMINIO CUALITATIVO", "Sentidos, Acuerdos y Disposiciones", "#1d4ed8", false, { x: 0.65, y: 0.19 });
    labelCual.position.set(-0.55, 0.42, 0);
    group.add(labelCual);

    // 2. Probeta CUANTITATIVA (Derecha, complementaria 30%)
    const cuanFlask = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.22, 0.65, 32),
      engine.glassMat(0xffffff, { roughness: 0.1, transmission: 0.9, opacity: 0.6 })
    );
    cuanFlask.position.set(0.48, -0.25, 0);
    group.add(cuanFlask);

    // Marcas graduadas en el tubo cuantitativo
    for (let k = 1; k <= 3; k++) {
      const ringTick = new THREE.Mesh(
        new THREE.TorusGeometry(0.19 + k * 0.007, 0.003, 8, 32),
        engine.brassMat(0xd4af37)
      );
      ringTick.rotation.x = Math.PI / 2;
      ringTick.position.set(0.48, -0.50 + k * 0.12, 0);
      group.add(ringTick);
    }

    const cuanLiquid = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.2, 0.42, 32),
      engine.glassMat(0x10b981, { roughness: 0.2, transmission: 0.7, opacity: 0.85 })
    );
    cuanLiquid.position.set(0.48, -0.36, 0);
    group.add(cuanLiquid);

    const labelCuan = engine.createLabelSprite("SONDEO CUANTITATIVO", "45 Casos • Escala Likert", "#059669", false, { x: 0.62, y: 0.19 });
    labelCuan.position.set(0.55, 0.3, 0);
    group.add(labelCuan);

    // 3. Puente de conexión / Tubo de Triangulación Metodológica
    const bridgeCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.45, 0.28, 0),
      new THREE.Vector3(0.0, 0.58, 0),
      new THREE.Vector3(0.48, 0.12, 0)
    );
    const bridgeTube = new THREE.Mesh(
      new THREE.TubeGeometry(bridgeCurve, 32, 0.035, 16, false),
      engine.glassMat(0x38bdf8, { roughness: 0.15, transmission: 0.95 })
    );
    group.add(bridgeTube);

    engine.anim18_flowDot = new THREE.Mesh(
      new THREE.SphereGeometry(0.06, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xffd700 })
    );
    group.add(engine.anim18_flowDot);
    engine.anim18_curve = bridgeCurve;

    // Bitácora abierta de caso situado al frente con chapa de latón
    const logBook = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 0.04, 0.34),
      engine.marbleMat(0xfdfbf7)
    );
    logBook.position.set(0, -0.62, 0.22);
    logBook.rotation.x = 0.2;
    group.add(logBook);

    const plaqueLog = engine.createEngravedPlaque(0.42, 0.13, "BITÁCORA DE CASO", "CURZAS - UNCo 2027", [], { theme: "dark" });
    plaqueLog.position.set(0, -0.59, 0.24);
    plaqueLog.rotation.x = 0.2;
    group.add(plaqueLog);

    const titleSprite = engine.createLabelSprite("DISEÑO MIXTO: CUAL → cuan", "Estudio de Caso Situado • CURZAS 2027", "#0f2d59", true);
    titleSprite.position.set(0, 0.85, 0);
    group.add(titleSprite);

    g.add(group);
  },

  animate(engine, t) {
    if (engine.anim18_flowDot && engine.anim18_curve) {
      const u = (Math.sin(t * 1.5) + 1) / 2;
      const pt = engine.anim18_curve.getPoint(u);
      engine.anim18_flowDot.position.copy(pt);
    }
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 19. POBLACIÓN Y MUESTRA: 8 Informantes Clave y Matriz de 45 Cuestionarios
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_19"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.55, 0.22, -1.22);

    // Chasis maquinado con cantoneras de latón
    const chassis = engine.createMachinedChassis(1.55, 0.10, 1.55, { color: 0x1e293b });
    chassis.position.y = -0.92;
    g.add(chassis);

    // Placa técnica de representatividad empírica
    const plaqueMaster = engine.createEngravedPlaque(
      1.10,
      0.22,
      "DISEÑO MUESTRAL Y TÉCNICAS EMPÍRICAS",
      "Muestreo Intencional Riguroso y Factible",
      ["SATURACIÓN CUALITATIVA", "45 CUESTIONARIOS LIKERT"],
      { theme: "dark" }
    );
    plaqueMaster.position.set(0, -0.84, 0.78);
    g.add(plaqueMaster);

    const group = new THREE.Group();
    group.position.set(0, -0.05, 0);

    // 1. Semicírculo de los 8 Informantes Clave (Muestra Cualitativa)
    const informants = [
      { role: "Docente Presencial 1", col: 0x2563eb },
      { role: "Docente Presencial 2", col: 0x2563eb },
      { role: "Docente Tutor Nodos", col: 0x0284c7 },
      { role: "Docente Titular", col: 0x1d4ed8 },
      { role: "Autoridad Dpto.", col: 0xd97706 },
      { role: "Autoridad CURZAS", col: 0xb45309 },
      { role: "Gremio ADUNC", col: 0xdc2626 },
      { role: "Estudiante Avanzado", col: 0x16a34a }
    ];

    engine.anim19_busts = [];
    const radiusCual = 1.05;
    informants.forEach((inf, idx) => {
      const angle = -Math.PI * 0.75 + (idx / 7) * Math.PI * 0.9;
      const x = Math.cos(angle) * radiusCual;
      const z = Math.sin(angle) * radiusCual;

      const bustGroup = new THREE.Group();
      bustGroup.position.set(x, -0.3, z);

      const ped = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.09, 0.28, 16),
        engine.brassMat(inf.col)
      );
      bustGroup.add(ped);

      const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.075, 16, 16),
        engine.marbleMat(0xf8fafc)
      );
      head.position.y = 0.21;
      bustGroup.add(head);

      group.add(bustGroup);
      engine.anim19_busts.push(bustGroup);
    });

    // Micrófono central de entrevista semiestructurada
    const micPole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 0.55, 16),
      engine.brassMat(0xd4af37)
    );
    micPole.position.set(0, -0.35, 0);
    group.add(micPole);

    const micHead = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 16, 16),
      engine.graniteMat(0x0f172a)
    );
    micHead.position.set(0, -0.05, 0);
    group.add(micHead);

    const labelCual = engine.createLabelSprite("8 ENTREVISTAS EN PROFUNDIDAD", "Docentes • Autoridades • ADUNC • Estudiantes", "#1d4ed8", false, { x: 0.75, y: 0.2 });
    labelCual.position.set(-0.2, 0.25, 0);
    group.add(labelCual);

    // 2. Matriz de 45 esferas luminosas (Sondeo Cuantitativo)
    const matrixGroup = new THREE.Group();
    matrixGroup.position.set(0.65, -0.3, 0.45);
    engine.anim19_dots = [];

    let count = 0;
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 9; col++) {
        count++;
        const isDocente = count <= 15;
        const dot = new THREE.Mesh(
          new THREE.SphereGeometry(0.032, 12, 12),
          new THREE.MeshStandardMaterial({
            color: isDocente ? 0xffb703 : 0x06d6a0,
            emissive: isDocente ? 0xffb703 : 0x06d6a0,
            emissiveIntensity: 0.35,
            roughness: 0.3
          })
        );
        dot.position.set((col - 4) * 0.08, (row - 2) * 0.08, 0);
        matrixGroup.add(dot);
        engine.anim19_dots.push(dot);
      }
    }
    group.add(matrixGroup);

    // Dial de representatividad muestral junto a la matriz
    const sampleDial = engine.createGraduatedDial(0.22, {
      divisions: 45,
      title: "MUESTRA",
      sub: "N = 53",
      theme: "dark"
    });
    sampleDial.position.set(0.65, -0.05, 0.52);
    group.add(sampleDial);

    const labelCuan = engine.createLabelSprite("45 CUESTIONARIOS LIKERT", "15 Docentes (Amarillo) + 30 Estudiantes (Verde)", "#059669", false, { x: 0.75, y: 0.2 });
    labelCuan.position.set(0.65, 0.20, 0.45);
    group.add(labelCuan);

    const mainTitle = engine.createLabelSprite("DISEÑO MUESTRAL Y TÉCNICAS", "Muestreo Intencional Riguroso y Factible", "#0f2d59", true);
    mainTitle.position.set(0, 0.85, 0);
    group.add(mainTitle);

    g.add(group);
  },

  animate(engine, t) {
    if (engine.anim19_dots) {
      engine.anim19_dots.forEach((dot, i) => {
        dot.position.z = Math.sin(t * 2 + i * 0.15) * 0.02;
      });
    }
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 20. MATRIZ DE OPERACIONALIZACIÓN: Ábaco Neoclásico Monumental de 5 Columnas
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_20"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.65, 0.22, -1.22);

    // Chasis mecanizado de caoba con cantoneras de latón
    const chassis = engine.createMachinedChassis(1.95, 0.10, 0.70, { color: 0x2e1204 });
    chassis.position.y = -0.92;
    g.add(chassis);

    // Placa maestra de dimensiones empíricas
    const plaqueMaster = engine.createEngravedPlaque(
      1.20,
      0.22,
      "MATRIZ DE OPERACIONALIZACIÓN",
      "5 Dimensiones • Indicadores Empíricos • Fuentes y Técnicas",
      ["NORMATIVA • TÉCNICA • ORGANIZACIONAL • CULTURAL • GOBERNANZA"],
      { theme: "dark" }
    );
    plaqueMaster.position.set(0, -0.84, 0.40);
    g.add(plaqueMaster);

    const group = new THREE.Group();
    group.position.set(0, -0.05, 0);

    const abacusWidth = 1.95;

    const abacusBase = new THREE.Mesh(
      new THREE.BoxGeometry(abacusWidth, 0.12, 0.48),
      engine.graniteMat(0x1e293b)
    );
    abacusBase.position.y = -0.75;
    group.add(abacusBase);

    const baseMolding = new THREE.Mesh(
      new THREE.BoxGeometry(abacusWidth * 1.02, 0.024, 0.50),
      engine.brassMat(0xd4af37)
    );
    baseMolding.position.y = -0.69;
    group.add(baseMolding);

    const abacusHeader = new THREE.Mesh(
      new THREE.BoxGeometry(abacusWidth, 0.14, 0.48),
      engine.graniteMat(0x1e293b)
    );
    abacusHeader.position.y = 0.55;
    group.add(abacusHeader);

    const headerMolding = new THREE.Mesh(
      new THREE.BoxGeometry(abacusWidth * 1.02, 0.024, 0.50),
      engine.brassMat(0xd4af37)
    );
    headerMolding.position.y = 0.48;
    group.add(headerMolding);

    const dimensions = [
      { name: "1. NORMATIVA", sub: "Estatuto • CCT", col: "#1d4ed8", hex: 0x1d4ed8, x: -0.76 },
      { name: "2. TÉCNICA", sub: "Moodle • Anonimato", col: "#0284c7", hex: 0x0284c7, x: -0.38 },
      { name: "3. ORGANIZACIONAL", sub: "Capacitación Art. 76", col: "#d97706", hex: 0xd97706, x: 0.0 },
      { name: "4. CULTURAL", sub: "Confianza Docente", col: "#16a34a", hex: 0x16a34a, x: 0.38 },
      { name: "5. GOBERNANZA", sub: "Cogobierno Paritario", col: "#7c3aed", hex: 0x7c3aed, x: 0.76 }
    ];

    engine.anim20_discs = [];
    dimensions.forEach((dim, idx) => {
      const rod = new THREE.Mesh(
        new THREE.CylinderGeometry(0.020, 0.020, 1.15, 16),
        engine.brassMat(dim.hex)
      );
      rod.position.set(dim.x, -0.1, 0);
      group.add(rod);

      const finial = new THREE.Mesh(
        new THREE.SphereGeometry(0.038, 16, 16),
        engine.brassMat(0xffd700)
      );
      finial.position.set(dim.x, 0.64, 0);
      group.add(finial);

      // Micro-dial indicador en el dintel para cada dimensión
      const mDial = engine.createGraduatedDial(0.11, {
        divisions: 16,
        title: `DIM ${idx + 1}`,
        sub: "100%",
        theme: "gold"
      });
      mDial.position.set(dim.x, 0.55, 0.25);
      group.add(mDial);

      for (let k = 0; k < 3; k++) {
        const beadGroup = new THREE.Group();
        const disc = new THREE.Mesh(
          new THREE.CylinderGeometry(0.085, 0.085, 0.048, 24),
          engine.marbleMat(0xf8fafc)
        );
        beadGroup.add(disc);

        const beadRing = new THREE.Mesh(
          new THREE.TorusGeometry(0.088, 0.008, 12, 24),
          engine.brassMat(dim.hex)
        );
        beadRing.rotation.x = Math.PI / 2;
        beadGroup.add(beadRing);

        beadGroup.position.set(dim.x, -0.46 + k * 0.28, 0);
        group.add(beadGroup);
        engine.anim20_discs.push({ group: beadGroup, basePosY: -0.46 + k * 0.28, speed: 0.8 + k * 0.4 });
      }

      const isAlt = idx % 2 === 1;
      const labelY = isAlt ? 0.94 : 0.76;
      const label = engine.createLabelSprite(dim.name, dim.sub, dim.col, false, { x: 0.29, y: 0.14 });
      label.position.set(dim.x, labelY, 0.08);
      group.add(label);

      const connLine = new THREE.Mesh(
        new THREE.CylinderGeometry(0.004, 0.004, labelY - 0.64, 8),
        engine.brassMat(0xd4af37)
      );
      connLine.position.set(dim.x, 0.64 + (labelY - 0.64) / 2, 0.04);
      group.add(connLine);
    });

    const mainTitle = engine.createLabelSprite("MATRIZ DE OPERACIONALIZACIÓN", "5 Dimensiones • Indicadores Empíricos • Fuentes", "#0f2d59", true);
    mainTitle.position.set(0, 1.38, 0.08);
    group.add(mainTitle);

    g.add(group);
  },

  animate(engine, t) {
    if (engine.anim20_discs) {
      engine.anim20_discs.forEach((d, i) => {
        d.group.position.y = d.basePosY + Math.sin(t * d.speed + i) * 0.035;
        d.group.rotation.y = t * 0.25;
      });
    }
  }
};

