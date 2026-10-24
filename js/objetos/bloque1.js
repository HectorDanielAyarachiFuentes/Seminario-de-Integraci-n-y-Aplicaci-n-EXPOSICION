/**
 * =============================================================================
 * OBJETOS 3D — BLOQUE I: ESCULTURAS 1 A 5
 * Presentación de Tesina • CURZAS - UNCo
 * =============================================================================
 * Esculturas académicas para el Bloque Institucional y Contextual:
 * 1. Apertura Institucional: Esfera Armilar Renacentista (CURZAS - UNCo)
 * 2. Valor Público: Monumento de Anillos Armónicos (Oszlak / Moore)
 * 3. Marco Normativo: Frontispicio de Templo Clásico (Res. 266/23)
 * 4. Territorio: Maqueta Geodésica de la República Argentina y Río Negro
 * 5. Docencia Híbrida: Red Tensada de Nodos Territoriales
 */

window.Presentation3D_Objects = window.Presentation3D_Objects || {};

// ──────────────────────────────────────────────────────────────────────────
// 1. APERTURA INSTITUCIONAL: Esfera Armilar Renacentista (CURZAS - UNCo)
//    Soporte clásico de mármol y latón con cuna meridiana y aros elevados
//    (Corregido: aros concéntricos con despeje total sobre el pedestal)
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_01"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.4);

    // 1. Baluarte / Pedestal clásico sobre la base de granito (y = -1.11)
    const baseCollar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.22, 0.08, 32),
      engine.brassMat()
    );
    baseCollar.position.y = -1.07;
    g.add(baseCollar);

    // Columna central estriada de mármol de Carrara
    const column = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.12, 0.95, 32),
      engine.marbleMat(0xf5f3ee)
    );
    column.position.y = -0.55;
    g.add(column);

    // Capitel de latón noble
    const capital = new THREE.Mesh(
      new THREE.CylinderGeometry(0.14, 0.08, 0.08, 32),
      engine.brassMat()
    );
    capital.position.y = -0.04;
    g.add(capital);

    // 2. Horquilla / Cuna meridiana semicircular de latón que abraza la esfera
    const cradleGeo = new THREE.TorusGeometry(1.04, 0.022, 16, 48, Math.PI);
    const cradleMesh = new THREE.Mesh(cradleGeo, engine.brassMat());
    cradleMesh.rotation.z = Math.PI; // Concavidad hacia arriba
    cradleMesh.position.set(0, 0.22, 0);
    g.add(cradleMesh);

    // 3. Esfera central de alabastro marfil (núcleo institucional)
    engine.core01 = new THREE.Mesh(
      new THREE.SphereGeometry(0.42, 48, 48),
      engine.marbleMat(0xfdfbf7)
    );
    engine.core01.position.y = 0.22;
    g.add(engine.core01);

    // 4. Tres aros armilares astronómicos concéntricos de latón
    //    Centro en y = 0.22; Radio máximo = 0.98.
    //    Punto inferior más bajo = 0.22 - 0.98 = -0.76 (despeje de 35 cm sobre el plinto en -1.11)
    engine.rings01 = [
      engine.createBrassArmillaryRing(0.68, 0.015), // Anillo coluro interior
      engine.createBrassArmillaryRing(0.84, 0.016), // Anillo ecuatorial medio
      engine.createBrassArmillaryRing(0.98, 0.018)  // Anillo meridiano exterior
    ];

    engine.rings01.forEach((ring) => {
      ring.position.y = 0.22;
      g.add(ring);
    });

    // 5. Eje polar oblicuo (inclinación astronómica de 23.5°)
    const axisGroup = new THREE.Group();
    axisGroup.position.y = 0.22;

    const axisRod = new THREE.Mesh(
      new THREE.CylinderGeometry(0.018, 0.018, 2.2, 16),
      engine.brassMat()
    );
    axisGroup.add(axisRod);

    // Remates esféricos polares
    [-1.1, 1.1].forEach((yPos) => {
      const finial = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 16, 16),
        engine.brassMat(0xd4af37)
      );
      finial.position.y = yPos;
      axisGroup.add(finial);
    });

    axisGroup.rotation.z = (23.5 * Math.PI) / 180;
    g.add(axisGroup);
    engine.axis01 = axisGroup;
  },

  animate(engine, t) {
    if (engine.core01) {
      engine.core01.rotation.y = t * 0.08;
    }
    if (engine.rings01) {
      engine.rings01[0].rotation.x = t * 0.12;
      engine.rings01[1].rotation.y = t * 0.10;
      engine.rings01[2].rotation.z = t * 0.08;
    }
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 2. VALOR PÚBLICO: Monumento de Anillos Armónicos (Oszlak / Moore)
//    Tres aros de bronce esculpido en levitación escalonada sobre mármol
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_02"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.35);

    // Gema central de cristal
    engine.core02 = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.48, 2),
      engine.glassMat(0xf8fafc)
    );
    g.add(engine.core02);

    // Tres anillos de bronce en expansión vertical armónica
    engine.rings02 = [];
    const radii = [0.85, 1.25, 1.65];
    radii.forEach((r, idx) => {
      const ring = engine.createBrassArmillaryRing(r, 0.015);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = -0.3 + idx * 0.35;
      g.add(ring);
      engine.rings02.push(ring);
    });
  },

  animate(engine, t) {
    if (engine.core02) engine.core02.rotation.y = t * 0.1;
    if (engine.rings02) {
      engine.rings02.forEach((r, idx) => {
        r.rotation.z = t * (0.05 + idx * 0.03);
      });
    }
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 3. MARCO NORMATIVO: Frontispicio de Templo Clásico (Res. 266/23)
//    Tres columnas jónicas de mármol con arquitrabe y frontón de latón
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_03"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.5);

    engine.pillars03 = [];
    const colPositions = [-0.9, 0, 0.9];

    colPositions.forEach((posX) => {
      const col = new THREE.Group();

      // Base
      col.add(new THREE.Mesh(
        new THREE.CylinderGeometry(0.16, 0.18, 0.12, 24),
        engine.brassMat()
      ));

      // Fuste estriado de mármol
      const fuste = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.12, 1.8, 24),
        engine.marbleMat()
      );
      fuste.position.y = 0.96;
      col.add(fuste);

      // Capitel de latón
      const cap = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18, 0.1, 0.15, 24),
        engine.brassMat()
      );
      cap.position.y = 1.92;
      col.add(cap);

      col.position.set(posX, -1.0, 0);
      g.add(col);
      engine.pillars03.push(col);
    });

    // Arquitrabe horizontal de mármol
    const architrave = new THREE.Mesh(
      new THREE.BoxGeometry(2.3, 0.16, 0.35),
      engine.marbleMat()
    );
    architrave.position.set(0, 1.05, 0);
    g.add(architrave);

    // Frontón superior con perfil triangular de latón
    const pediment = new THREE.Mesh(
      new THREE.ConeGeometry(1.2, 0.5, 4),
      engine.brassMat()
    );
    pediment.rotation.y = Math.PI / 4;
    pediment.position.set(0, 1.38, 0);
    g.add(pediment);
    engine.pediment03 = pediment;
  },

  animate(engine, t) {
    if (engine.pediment03) {
      engine.pediment03.rotation.y = Math.PI / 4 + Math.sin(t * 0.4) * 0.03;
    }
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 4. TERRITORIO: Maqueta Geodésica de la República Argentina y Río Negro
//    Relieve escultórico nacional en mármol con Río Negro en alto relieve
//    de latón dorado, las 5 sedes georreferenciadas y arcos de docencia híbrida
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_04"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.95, 0.16);

    // Placa oceánica base (Mar Argentino / Cuenca Atlántica)
    const oceanBase = new THREE.Mesh(
      new THREE.CylinderGeometry(1.88, 1.92, 0.04, 64),
      engine.graniteMat(0x1e293b)
    );
    oceanBase.position.y = -1.10;
    g.add(oceanBase);

    // ── 1. SILUETA GEOGRÁFICA DE LA REPÚBLICA ARGENTINA (Base Escultórica) ──
    const argShape = new THREE.Shape();
    argShape.moveTo(-0.25, 1.35);
    argShape.lineTo(0.12, 1.15);   // Formosa / Chaco
    argShape.lineTo(0.58, 1.05);   // Misiones (Cataratas del Iguazú)
    argShape.lineTo(0.42, 0.75);   // Corrientes
    argShape.lineTo(0.36, 0.50);   // Entre Ríos
    argShape.lineTo(0.38, 0.35);   // Buenos Aires (Río de la Plata)
    argShape.lineTo(0.60, 0.20);   // Cabo San Antonio
    argShape.lineTo(0.50, 0.05);   // Mar del Plata
    argShape.lineTo(0.30, -0.10);  // Bahía Blanca
    argShape.lineTo(0.36, -0.25);  // Viedma (Desembocadura Río Negro)
    argShape.lineTo(0.24, -0.38);  // Golfo San Matías (Sierra Grande)
    argShape.lineTo(0.34, -0.52);  // Península Valdés (Chubut)
    argShape.lineTo(0.18, -0.78);  // Golfo San Jorge (Comodoro Rivadavia)
    argShape.lineTo(0.14, -1.05);  // Costa de Santa Cruz (Puerto Deseado)
    argShape.lineTo(0.08, -1.30);  // Cabo Vírgenes / Estrecho de Magallanes
    argShape.lineTo(0.05, -1.52);  // Tierra del Fuego (Ushuaia)
    argShape.lineTo(-0.02, -1.62); // Cabo de Hornos
    argShape.lineTo(-0.08, -1.48); // Cordillera Fueguina
    argShape.lineTo(-0.14, -1.15); // Hielos Continentales (Santa Cruz)
    argShape.lineTo(-0.28, -0.68); // Andes de Chubut (Esquel)
    argShape.lineTo(-0.38, -0.36); // Andes de Río Negro (Bariloche / El Bolsón)
    argShape.lineTo(-0.40, -0.12); // Andes de Neuquén
    argShape.lineTo(-0.42, 0.32);  // Andes de Mendoza (Aconcagua)
    argShape.lineTo(-0.38, 0.65);  // Andes de San Juan y La Rioja
    argShape.lineTo(-0.34, 1.00);  // Puna de Catamarca y Salta
    argShape.lineTo(-0.30, 1.28);  // Puna de Jujuy (Paso de Jama)
    argShape.closePath();

    const argExtrudeOpts = {
      depth: 0.08,
      bevelEnabled: true,
      bevelThickness: 0.018,
      bevelSize: 0.016,
      bevelSegments: 3
    };
    const argGeo = new THREE.ExtrudeGeometry(argShape, argExtrudeOpts);
    const argMesh = new THREE.Mesh(argGeo, engine.marbleMat(0xf1efe8));
    argMesh.rotation.x = -Math.PI / 2;
    argMesh.position.set(0, -1.08, 0);
    g.add(argMesh);

    // Contorno sutil de latón en la costa argentina
    const argEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(argGeo, 28),
      new THREE.LineBasicMaterial({ color: 0xb8860b, transparent: true, opacity: 0.45 })
    );
    argMesh.add(argEdges);

    // ── 1.B. PLATAFORMA CONTINENTAL ARGENTINA (Soberanía Submarina y Talud del Mar Argentino) ──
    const shelfShape = new THREE.Shape();
    shelfShape.moveTo(0.38, 0.35);  // Frente al Río de la Plata
    shelfShape.lineTo(0.72, 0.18);  // Talud frente a Provincia de Buenos Aires
    shelfShape.lineTo(0.68, -0.15); // Talud exterior del Mar Argentino
    shelfShape.lineTo(0.62, -0.45); // Frente al Golfo San Matías y Península Valdés
    shelfShape.lineTo(0.66, -0.85); // Cuenca Marina Austral
    shelfShape.lineTo(0.70, -1.12); // Meseta submarina de Malvinas (Este)
    shelfShape.lineTo(0.64, -1.34); // Banco Burdwood / Namuncurá (Sur)
    shelfShape.lineTo(0.25, -1.45); // Litoral del Pasaje de Drake
    shelfShape.lineTo(0.05, -1.52); // Tierra del Fuego
    shelfShape.lineTo(0.08, -1.30); // Costa de Santa Cruz
    shelfShape.lineTo(0.14, -1.05);
    shelfShape.lineTo(0.18, -0.78); // Golfo San Jorge
    shelfShape.lineTo(0.34, -0.52); // Península Valdés
    shelfShape.lineTo(0.24, -0.38); // Golfo San Matías
    shelfShape.lineTo(0.36, -0.25); // Desembocadura del Río Negro
    shelfShape.lineTo(0.30, -0.10);
    shelfShape.lineTo(0.50, 0.05);  // Mar del Plata
    shelfShape.lineTo(0.60, 0.20);
    shelfShape.closePath();

    const shelfGeo = new THREE.ExtrudeGeometry(shelfShape, {
      depth: 0.025,
      bevelEnabled: true,
      bevelThickness: 0.008,
      bevelSize: 0.008,
      bevelSegments: 2
    });
    const shelfMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.32,
      metalness: 0.15,
      transparent: true,
      opacity: 0.35
    });
    const shelfMesh = new THREE.Mesh(shelfGeo, shelfMat);
    shelfMesh.rotation.x = -Math.PI / 2;
    shelfMesh.position.set(0, -1.096, 0);
    g.add(shelfMesh);

    const shelfEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(shelfGeo, 24),
      new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.65 })
    );
    shelfMesh.add(shelfEdges);

    // ── 1.C. ISLAS MALVINAS (Soberanía Argentina) ──
    const gmShape = new THREE.Shape();
    gmShape.moveTo(0.39, -1.15);
    gmShape.lineTo(0.43, -1.13);
    gmShape.lineTo(0.46, -1.16);
    gmShape.lineTo(0.47, -1.21);
    gmShape.lineTo(0.44, -1.26);
    gmShape.lineTo(0.40, -1.25);
    gmShape.lineTo(0.38, -1.20);
    gmShape.closePath();

    const isShape = new THREE.Shape();
    isShape.moveTo(0.49, -1.13);
    isShape.lineTo(0.56, -1.12);
    isShape.lineTo(0.59, -1.16);
    isShape.lineTo(0.54, -1.20);
    isShape.lineTo(0.57, -1.25);
    isShape.lineTo(0.53, -1.28);
    isShape.lineTo(0.49, -1.24);
    isShape.lineTo(0.51, -1.18);
    isShape.closePath();

    const ieShape = new THREE.Shape();
    ieShape.moveTo(0.12, -1.53);
    ieShape.lineTo(0.19, -1.51);
    ieShape.lineTo(0.22, -1.54);
    ieShape.lineTo(0.14, -1.56);
    ieShape.closePath();

    const malvinasExtrudeOpts = {
      depth: 0.075,
      bevelEnabled: true,
      bevelThickness: 0.016,
      bevelSize: 0.014,
      bevelSegments: 3
    };

    const gmGeo = new THREE.ExtrudeGeometry(gmShape, malvinasExtrudeOpts);
    const isGeo = new THREE.ExtrudeGeometry(isShape, malvinasExtrudeOpts);
    const ieGeo = new THREE.ExtrudeGeometry(ieShape, { depth: 0.06, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.01 });

    const gmMesh = new THREE.Mesh(gmGeo, engine.marbleMat(0xfdfbf7));
    const isMesh = new THREE.Mesh(isGeo, engine.marbleMat(0xfdfbf7));
    const ieMesh = new THREE.Mesh(ieGeo, engine.marbleMat(0xfdfbf7));

    gmMesh.rotation.x = -Math.PI / 2;
    gmMesh.position.set(0, -1.08, 0);
    isMesh.rotation.x = -Math.PI / 2;
    isMesh.position.set(0, -1.08, 0);
    ieMesh.rotation.x = -Math.PI / 2;
    ieMesh.position.set(0, -1.08, 0);

    const gmEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(gmGeo, 20),
      new THREE.LineBasicMaterial({ color: 0xd4af37, linewidth: 2 })
    );
    gmMesh.add(gmEdges);

    const isEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(isGeo, 20),
      new THREE.LineBasicMaterial({ color: 0xd4af37, linewidth: 2 })
    );
    isMesh.add(isEdges);

    g.add(gmMesh);
    g.add(isMesh);
    g.add(ieMesh);

    // Faro de Soberanía en Puerto Argentino
    const paBeacon = new THREE.Group();
    const paPin = new THREE.Mesh(
      new THREE.CylinderGeometry(0.007, 0.010, 0.05, 12),
      engine.brassMat(0xd4af37)
    );
    paPin.position.set(0.575, -0.98, 1.15);
    paBeacon.add(paPin);

    const paGem = new THREE.Mesh(
      new THREE.SphereGeometry(0.018, 16, 16),
      engine.glassMat(0x38bdf8, { roughness: 0.1, transmission: 0.9 })
    );
    paGem.position.set(0.575, -0.945, 1.15);
    paBeacon.add(paGem);

    const paHalo = new THREE.Mesh(
      new THREE.TorusGeometry(0.024, 0.0025, 8, 16),
      engine.brassMat()
    );
    paHalo.rotation.x = Math.PI / 2;
    paHalo.position.set(0.575, -0.945, 1.15);
    paBeacon.add(paHalo);

    const paLight = new THREE.PointLight(0x38bdf8, 0.8, 0.9);
    paLight.position.set(0.575, -0.94, 1.15);
    paBeacon.add(paLight);
    g.add(paBeacon);

    // Etiqueta Cartográfica de las Islas Malvinas
    const malvinasLabel = engine.createLabelSprite(
      "ISLAS MALVINAS",
      "Soberanía Argentina • Atlántico Sur",
      "#0f2d59",
      true,
      { x: 0.65, y: 0.18 }
    );
    malvinasLabel.position.set(0.68, -0.72, 1.22);
    g.add(malvinasLabel);

    const malvinasLeaderGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0.575, -0.94, 1.15),
      new THREE.Vector3(0.68, -0.78, 1.22)
    ]);
    const malvinasLeaderLine = new THREE.Line(
      malvinasLeaderGeo,
      new THREE.LineBasicMaterial({ color: 0xb8860b, transparent: true, opacity: 0.65 })
    );
    g.add(malvinasLeaderLine);

    // Rótulo Mar Argentino
    const marArgLabel = engine.createLabelSprite(
      "MAR ARGENTINO",
      "Océano Atlántico Sur • Plataforma Continental",
      "#0284c7",
      false,
      { x: 0.70, y: 0.17 }
    );
    marArgLabel.position.set(0.72, -0.90, 0.68);
    g.add(marArgLabel);

    // Aro exterior náutico de latón
    const oceanRim = new THREE.Mesh(
      new THREE.TorusGeometry(1.90, 0.012, 16, 64),
      engine.brassMat(0xd4af37)
    );
    oceanRim.rotation.x = Math.PI / 2;
    oceanRim.position.y = -1.09;
    g.add(oceanRim);

    // ── 2. PROVINCIA DE RÍO NEGRO (En Alto Relieve de Latón Dorado) ──
    const rnShape = new THREE.Shape();
    rnShape.moveTo(-0.26, -0.12);
    rnShape.lineTo(0.08, -0.14);
    rnShape.lineTo(0.28, -0.18);
    rnShape.lineTo(0.36, -0.25);
    rnShape.lineTo(0.25, -0.33);
    rnShape.lineTo(0.23, -0.42);
    rnShape.lineTo(-0.36, -0.42);
    rnShape.lineTo(-0.38, -0.38);
    rnShape.lineTo(-0.34, -0.28);
    rnShape.lineTo(-0.24, -0.19);
    rnShape.closePath();

    const rnExtrudeOpts = {
      depth: 0.12,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.015,
      bevelSegments: 3
    };
    const rnGeo = new THREE.ExtrudeGeometry(rnShape, rnExtrudeOpts);
    const rnMesh = new THREE.Mesh(rnGeo, engine.brassMat(0xd4af37));
    rnMesh.rotation.x = -Math.PI / 2;
    rnMesh.position.set(0, -1.00, 0);
    g.add(rnMesh);

    const rnEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(rnGeo, 20),
      new THREE.LineBasicMaterial({ color: 0xffe082, linewidth: 2 })
    );
    rnMesh.add(rnEdges);

    // Río Negro estilizado
    const riverCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.24, -0.87, 0.19),
      new THREE.Vector3(-0.06, -0.87, 0.20),
      new THREE.Vector3(0.12, -0.87, 0.22),
      new THREE.Vector3(0.26, -0.87, 0.24),
      new THREE.Vector3(0.36, -0.87, 0.25)
    ]);
    const riverGeo = new THREE.TubeGeometry(riverCurve, 24, 0.01, 6, false);
    const riverMesh = new THREE.Mesh(riverGeo, engine.glassMat(0x0284c7));
    g.add(riverMesh);

    // Ruta Nacional 23
    const routeCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.36, -0.872, 0.25),
      new THREE.Vector3(0.14, -0.872, 0.31),
      new THREE.Vector3(0.00, -0.872, 0.32),
      new THREE.Vector3(-0.14, -0.872, 0.33),
      new THREE.Vector3(-0.34, -0.872, 0.28)
    ]);
    const routeGeo = new THREE.TubeGeometry(routeCurve, 32, 0.007, 6, false);
    const routeMesh = new THREE.Mesh(routeGeo, engine.brassMat(0xb8860b));
    g.add(routeMesh);

    // ── 3. LAS SEDES Y NODOS DEL CURZAS ──
    const sedesData = [
      {
        nombre: "VIEDMA",
        tipo: "★ SEDE CENTRAL",
        subtitulo: "CURZAS-UNCo • Rectorado",
        x: 0.36, z: 0.25,
        isCabecera: true,
        colorGem: 0xffd700,
        labelPos: { x: 0.44, y: -0.36, z: 0.14 }
      },
      {
        nombre: "Nodo Valcheta",
        tipo: "Portal Línea Sur",
        subtitulo: "Aula Híbrida",
        x: 0.14, z: 0.31,
        isCabecera: false,
        colorGem: 0x0284c7,
        labelPos: { x: 0.14, y: -0.46, z: 0.15 }
      },
      {
        nombre: "Nodo Ramos Mexía",
        tipo: "Línea Sur Alta",
        subtitulo: "Sincronía Digital",
        x: 0.00, z: 0.32,
        isCabecera: false,
        colorGem: 0x38bdf8,
        labelPos: { x: -0.02, y: -0.62, z: 0.48 }
      },
      {
        nombre: "Nodo Los Menucos",
        tipo: "Sur Central",
        subtitulo: "Entornos Moodle",
        x: -0.14, z: 0.33,
        isCabecera: false,
        colorGem: 0x10b981,
        labelPos: { x: -0.28, y: -0.44, z: 0.20 }
      },
      {
        nombre: "Nodo Sierra Grande",
        tipo: "Costa Atlántica",
        subtitulo: "Tutorías Remotas",
        x: 0.23, z: 0.41,
        isCabecera: false,
        colorGem: 0xf59e0b,
        labelPos: { x: 0.35, y: -0.58, z: 0.52 }
      }
    ];

    const viedmaBeaconPos = new THREE.Vector3(0.36, -0.58, 0.25);
    engine.nodeCurves04 = [];
    engine.nodePulses04 = [];

    sedesData.forEach((sede) => {
      const pinGroup = new THREE.Group();

      if (sede.isCabecera) {
        const step1 = new THREE.Mesh(
          new THREE.CylinderGeometry(0.07, 0.09, 0.022, 24),
          engine.brassMat()
        );
        step1.position.y = -0.865;
        pinGroup.add(step1);

        const step2 = new THREE.Mesh(
          new THREE.CylinderGeometry(0.05, 0.055, 0.016, 24),
          engine.marbleMat()
        );
        step2.position.y = -0.846;
        pinGroup.add(step2);

        const stela = new THREE.Mesh(
          new THREE.CylinderGeometry(0.022, 0.026, 0.24, 20),
          engine.marbleMat(0xfdfbf7)
        );
        stela.position.y = -0.72;
        pinGroup.add(stela);

        const collar = new THREE.Mesh(
          new THREE.TorusGeometry(0.029, 0.0035, 12, 24),
          engine.brassMat()
        );
        collar.rotation.x = Math.PI / 2;
        collar.position.y = -0.61;
        pinGroup.add(collar);

        const orb = new THREE.Mesh(
          new THREE.SphereGeometry(0.042, 24, 24),
          engine.brassMat(0xffd700)
        );
        orb.position.y = -0.58;
        pinGroup.add(orb);

        const armRing = new THREE.Group();
        const r1 = new THREE.Mesh(
          new THREE.TorusGeometry(0.075, 0.005, 16, 36),
          engine.brassMat()
        );
        const r2 = new THREE.Mesh(
          new THREE.TorusGeometry(0.075, 0.005, 16, 36),
          engine.brassMat()
        );
        r2.rotation.x = Math.PI / 2;
        armRing.add(r1);
        armRing.add(r2);
        armRing.position.y = -0.58;
        pinGroup.add(armRing);
        engine.viedmaRing04 = armRing;

        const beaconLight = new THREE.PointLight(0xffd700, 1.4, 2.2);
        beaconLight.position.y = -0.56;
        pinGroup.add(beaconLight);

      } else {
        const base = new THREE.Mesh(
          new THREE.CylinderGeometry(0.038, 0.046, 0.016, 20),
          engine.brassMat(0xd4af37)
        );
        base.position.y = -0.87;
        pinGroup.add(base);

        const mast = new THREE.Mesh(
          new THREE.CylinderGeometry(0.006, 0.006, 0.14, 12),
          engine.brassMat()
        );
        mast.position.y = -0.79;
        pinGroup.add(mast);

        const gem = new THREE.Mesh(
          new THREE.SphereGeometry(0.026, 20, 20),
          engine.glassMat(sede.colorGem, { roughness: 0.08, transmission: 0.85 })
        );
        gem.position.y = -0.71;
        pinGroup.add(gem);

        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(0.036, 0.0035, 12, 24),
          engine.brassMat()
        );
        ring.rotation.x = Math.PI / 2;
        ring.position.y = -0.71;
        pinGroup.add(ring);

        const nodeLight = new THREE.PointLight(sede.colorGem, 0.7, 1.2);
        nodeLight.position.y = -0.70;
        pinGroup.add(nodeLight);

        // Arcos parabólicos de transmisión
        const nodeTarget = new THREE.Vector3(sede.x, -0.71, sede.z);
        const dist = viedmaBeaconPos.distanceTo(nodeTarget);
        const midPoint = new THREE.Vector3().addVectors(viedmaBeaconPos, nodeTarget).multiplyScalar(0.5);
        midPoint.y = -0.58 + dist * 0.72;

        const arcCurve = new THREE.QuadraticBezierCurve3(
          viedmaBeaconPos,
          midPoint,
          nodeTarget
        );
        const arcGeo = new THREE.TubeGeometry(arcCurve, 36, 0.0042, 8, false);
        const arcMesh = new THREE.Mesh(
          arcGeo,
          new THREE.MeshStandardMaterial({
            color: 0xe6b800,
            roughness: 0.15,
            metalness: 0.85,
            emissive: 0x996515,
            emissiveIntensity: 0.25
          })
        );
        g.add(arcMesh);

        const pulse = new THREE.Mesh(
          new THREE.SphereGeometry(0.014, 16, 16),
          new THREE.MeshBasicMaterial({ color: 0xfffad0 })
        );
        pulse.position.copy(nodeTarget);
        g.add(pulse);

        engine.nodeCurves04.push(arcCurve);
        engine.nodePulses04.push(pulse);
      }

      pinGroup.position.set(sede.x, 0, sede.z);
      g.add(pinGroup);

      const label = engine.createLabelSprite(
        sede.nombre,
        sede.tipo,
        sede.isCabecera ? "#996515" : "#0f2d59",
        sede.isCabecera,
        sede.isCabecera ? { x: 0.65, y: 0.20 } : { x: 0.48, y: 0.15 }
      );
      label.position.set(sede.labelPos.x, sede.labelPos.y, sede.labelPos.z);
      g.add(label);

      const pinTop = new THREE.Vector3(sede.x, sede.isCabecera ? -0.54 : -0.68, sede.z);
      const labelAnchor = new THREE.Vector3(sede.labelPos.x, sede.labelPos.y - 0.06, sede.labelPos.z);
      const leaderGeo = new THREE.BufferGeometry().setFromPoints([pinTop, labelAnchor]);
      const leaderLine = new THREE.Line(
        leaderGeo,
        new THREE.LineBasicMaterial({ color: 0xb8860b, transparent: true, opacity: 0.55 })
      );
      g.add(leaderLine);
    });

    // Rosa de los vientos
    const compassGroup = new THREE.Group();
    compassGroup.position.set(0.78, -1.07, 0.28);

    const compRing = new THREE.Mesh(
      new THREE.RingGeometry(0.16, 0.19, 32),
      engine.brassMat()
    );
    compRing.rotation.x = -Math.PI / 2;
    compassGroup.add(compRing);

    const starGeom = new THREE.ConeGeometry(0.05, 0.22, 4);
    const needleN = new THREE.Mesh(starGeom, engine.brassMat(0xd4af37));
    needleN.rotation.x = Math.PI / 2;
    compassGroup.add(needleN);
    engine.compassNeedle04 = needleN;

    const needleS = new THREE.Mesh(starGeom, engine.graniteMat());
    needleS.rotation.x = -Math.PI / 2;
    compassGroup.add(needleS);

    g.add(compassGroup);

    // Cartela institucional
    const cartela = engine.createLabelSprite(
      "RED DE NODOS CURZAS",
      "Res. CD-CURZA N° 196/2022 • Docencia Híbrida",
      "#0f2d59",
      false,
      { x: 0.62, y: 0.18 }
    );
    cartela.position.set(0.10, -1.02, 1.68);
    g.add(cartela);
  },

  animate(engine, t) {
    if (engine.viedmaRing04) {
      engine.viedmaRing04.rotation.y = t * 0.45;
      engine.viedmaRing04.rotation.x = Math.sin(t * 0.3) * 0.2;
    }
    if (engine.nodePulses04 && engine.nodeCurves04) {
      engine.nodePulses04.forEach((pulse, idx) => {
        const curve = engine.nodeCurves04[idx];
        if (curve) {
          const prog = (t * 0.35 + idx * 0.25) % 1.0;
          pulse.position.copy(curve.getPoint(prog));
        }
      });
    }
    if (engine.compassNeedle04) {
      engine.compassNeedle04.rotation.z = Math.sin(t * 0.5) * 0.04;
    }
    const g4 = engine.scenes["anim_04"];
    if (g4) {
      g4.rotation.y = engine.userRotation.y + Math.sin(t * 0.12) * 0.04;
      g4.rotation.x = engine.userRotation.x;
    }
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 5. DOCENCIA HÍBRIDA: Red Tensada de Nodos Territoriales
//    Filamentos de latón conectando esferas perladas en equilibrio estático
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_05"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.5);

    const viedmaPos = new THREE.Vector3(1.0, 0.3, 0.2);
    const nodes = [
      new THREE.Vector3(0.3, 0.1, 0.8),
      new THREE.Vector3(-0.2, 0.2, -0.1),
      new THREE.Vector3(-0.9, -0.1, 0.4),
      new THREE.Vector3(-0.4, -0.2, -0.6)
    ];

    // Nodo central Viedma
    const vNode = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 32, 32),
      engine.marbleMat(0xfdfbf7)
    );
    vNode.position.copy(viedmaPos);
    g.add(vNode);

    const vRing = engine.createBrassArmillaryRing(0.32, 0.01);
    vRing.position.copy(viedmaPos);
    vRing.rotation.x = Math.PI / 3;
    g.add(vRing);

    // Nodos periféricos y filamentos
    engine.filaments05 = [];
    nodes.forEach(pos => {
      const pNode = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 24, 24),
        engine.brassMat()
      );
      pNode.position.copy(pos);
      g.add(pNode);

      const lineCurve = new THREE.LineCurve3(viedmaPos, pos);
      const tubeGeo = new THREE.TubeGeometry(lineCurve, 20, 0.008, 8, false);
      const tube = new THREE.Mesh(tubeGeo, engine.brassMat());
      g.add(tube);
      engine.filaments05.push(tube);
    });
  },

  animate(engine, t) {
    const g5 = engine.scenes["anim_05"];
    if (g5) {
      g5.rotation.y = engine.userRotation.y + Math.sin(t * 0.2) * 0.08;
      g5.rotation.x = engine.userRotation.x;
    }
  }
};
