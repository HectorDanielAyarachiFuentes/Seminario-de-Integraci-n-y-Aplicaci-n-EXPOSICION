/**
 * =============================================================================
 * OBJETOS 3D — BLOQUE II: ESCULTURAS 6 A 10
 * Presentación de Tesina • CURZAS - UNCo
 * =============================================================================
 * Representación visual concreta y pertinente de la Sección 2 (Tiempo 1):
 * 6. anim_06: Maqueta Geodésica de la República Argentina y Río Negro (Conservada Oficial)
 * 7. anim_07: Red de Aulas Híbridas y Terminales Conectadas (Res. CD-CURZA N° 196/2022)
 * 8. anim_08: Prisma de Ruptura y Refracción Epistemológica (Wainerman & Sautu, 2011)
 * 9. anim_09: Balanza Dual de Tensión Normativa (Art. 75 Cesantía vs. Art. 76 Capacitación)
 * 10. anim_10: Pentágono Orbital de Factibilidad (Núcleo Pregunta y 5 Sellos de Viabilidad)
 */

window.Presentation3D_Objects = window.Presentation3D_Objects || {};

// ──────────────────────────────────────────────────────────────────────────
// 6. EL CURZAS EN EL TERRITORIO: Maqueta Geodésica de Argentina y Río Negro
//    (Mapas continentales, Malvinas, Antártida y alto relieve de Río Negro)
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_06"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.95);

    // 1. Mar Argentino / Océano Atlántico Sur (Bandeja elíptica de granito negro y cristal)
    const oceanPlate = new THREE.Mesh(
      new THREE.CylinderGeometry(1.90, 1.92, 0.05, 64),
      engine.graniteMat(0x060c18, 0.25, 0.4)
    );
    oceanPlate.position.y = -1.11;
    g.add(oceanPlate);

    const seaWater = new THREE.Mesh(
      new THREE.CylinderGeometry(1.88, 1.88, 0.02, 64),
      engine.glassMat(0x0369a1, { roughness: 0.15, transmission: 0.85, opacity: 0.8 })
    );
    seaWater.position.y = -1.08;
    g.add(seaWater);

    // 1.B. Territorio Continental Argentino en Relieve Escultórico
    const argShape = new THREE.Shape();
    argShape.moveTo(-0.45, 1.35);  // Norte: La Quiaca (Jujuy)
    argShape.lineTo(0.20, 1.42);   // Iguazú (Misiones)
    argShape.lineTo(0.35, 1.25);   // Meseta misionera
    argShape.lineTo(0.25, 0.90);   // Corrientes y Entre Ríos
    argShape.lineTo(0.42, 0.55);   // Río de la Plata y Delta
    argShape.lineTo(0.55, 0.22);   // Bahía Samborombón y Cabo San Antonio
    argShape.lineTo(0.40, -0.05);  // Costa bonaerense / Mar del Plata
    argShape.lineTo(0.18, -0.32);  // Bahía Blanca
    argShape.lineTo(0.36, -0.45);  // Golfo San Matías y Punta Bermeja (Río Negro)
    argShape.lineTo(0.28, -0.72);  // Península Valdés (Chubut)
    argShape.lineTo(0.15, -1.02);  // Golfo San Jorge (Comodoro Rivadavia)
    argShape.lineTo(0.08, -1.35);  // Ría de Puerto Deseado y San Julián
    argShape.lineTo(-0.02, -1.65); // Cabo Vírgenes y Estrecho de Magallanes
    argShape.lineTo(0.12, -1.78);  // Tierra del Fuego (Costa Atlántica)
    argShape.lineTo(-0.05, -1.90); // Canal Beagle / Ushuaia
    argShape.lineTo(-0.16, -1.78); // Límite internacional fueguino
    argShape.lineTo(-0.25, -1.45); // Cordillera patagónica austral (Santa Cruz)
    argShape.lineTo(-0.35, -0.95); // Cordillera de Chubut (Esquel / Los Alerces)
    argShape.lineTo(-0.42, -0.50); // Cordillera rionegrina (Bariloche / El Bolsón)
    argShape.lineTo(-0.40, -0.15); // Cordillera neuquina (San Martín / Chos Malal)
    argShape.lineTo(-0.48, 0.35);  // Cordillera de Cuyo (Mendoza / Aconcagua)
    argShape.lineTo(-0.52, 0.85);  // Cordillera sanjuanina y riojana
    argShape.lineTo(-0.58, 1.20);  // Puna catamarqueña y salteña
    argShape.closePath();

    const argExtrudeOpts = {
      depth: 0.05,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.010,
      bevelSegments: 2
    };
    const argGeo = new THREE.ExtrudeGeometry(argShape, argExtrudeOpts);
    const argMesh = new THREE.Mesh(argGeo, engine.marbleMat(0x2d3748));
    argMesh.rotation.x = -Math.PI / 2;
    argMesh.position.set(0.12, -1.06, 0.15);
    g.add(argMesh);

    // 1.C. Islas Malvinas
    const malvinasGroup = new THREE.Group();
    malvinasGroup.position.set(0.55, -1.05, 1.15);

    const soledadShape = new THREE.Shape();
    soledadShape.moveTo(0.02, 0.04);
    soledadShape.lineTo(0.06, 0.08);
    soledadShape.lineTo(0.09, 0.05);
    soledadShape.lineTo(0.08, -0.04);
    soledadShape.lineTo(0.03, -0.06);
    soledadShape.closePath();

    const soledadMesh = new THREE.Mesh(
      new THREE.ExtrudeGeometry(soledadShape, { depth: 0.03, bevelEnabled: true, bevelThickness: 0.006, bevelSize: 0.005, bevelSegments: 2 }),
      engine.marbleMat(0xfdfbf7)
    );
    soledadMesh.rotation.x = -Math.PI / 2;
    malvinasGroup.add(soledadMesh);

    const granMalvinaShape = new THREE.Shape();
    granMalvinaShape.moveTo(-0.08, 0.03);
    granMalvinaShape.lineTo(-0.04, 0.07);
    granMalvinaShape.lineTo(-0.02, 0.02);
    granMalvinaShape.lineTo(-0.04, -0.05);
    granMalvinaShape.lineTo(-0.07, -0.04);
    granMalvinaShape.closePath();

    const granMalvinaMesh = new THREE.Mesh(
      new THREE.ExtrudeGeometry(granMalvinaShape, { depth: 0.03, bevelEnabled: true, bevelThickness: 0.006, bevelSize: 0.005, bevelSegments: 2 }),
      engine.marbleMat(0xfdfbf7)
    );
    granMalvinaMesh.rotation.x = -Math.PI / 2;
    malvinasGroup.add(granMalvinaMesh);

    g.add(malvinasGroup);

    // 2. PROVINCIA DE RÍO NEGRO EN ALTO RELIEVE DE LATÓN DORADO
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

    const rnGeo = new THREE.ExtrudeGeometry(rnShape, { depth: 0.12, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.015, bevelSegments: 3 });
    const rnMesh = new THREE.Mesh(rnGeo, engine.brassMat(0xd4af37));
    rnMesh.rotation.x = -Math.PI / 2;
    rnMesh.position.set(0, -1.00, 0);
    g.add(rnMesh);

    // 3. SEDES DEL CURZAS: Viedma y los 10 Nodos Territoriales (Res. CD N° 135/2022)
    engine.sedes06 = [
      { id: "viedma", nombre: "VIEDMA", subtitulo: "Sede Central Académica", tipo: "Sede Cabecera", x: 0.36, z: 0.25, isCentral: true, colorGem: 0xffd700 },
      { id: "san_antonio", nombre: "SAN ANTONIO OESTE", subtitulo: "Costa Atlántica / Golfo San Matías", tipo: "Nodo Territorial", x: 0.23, z: 0.28, isCentral: false, colorGem: 0x38bdf8 },
      { id: "sierra_grande", nombre: "SIERRA GRANDE", subtitulo: "Costa Atlántica Sur", tipo: "Nodo Territorial", x: 0.24, z: 0.40, isCentral: false, colorGem: 0x38bdf8 },
      { id: "conesa", nombre: "GENERAL CONESA", subtitulo: "Valle Conesa / Nexo Vial", tipo: "Nodo Territorial", x: 0.25, z: 0.20, isCentral: false, colorGem: 0x38bdf8 },
      { id: "lamarque", nombre: "LAMARQUE", subtitulo: "Valle Medio / Isla Choele", tipo: "Nodo Territorial", x: 0.10, z: 0.16, isCentral: false, colorGem: 0x38bdf8 },
      { id: "valcheta", nombre: "VALCHETA", subtitulo: "Portal Línea Sur", tipo: "Nodo Territorial", x: 0.08, z: 0.32, isCentral: false, colorGem: 0x38bdf8 },
      { id: "ramos_mexia", nombre: "RAMOS MEXÍA", subtitulo: "Meseta Central / RN 23", tipo: "Nodo Territorial", x: -0.02, z: 0.30, isCentral: false, colorGem: 0x38bdf8 },
      { id: "sierra_colorada", nombre: "SIERRA COLORADA", subtitulo: "Centro Geográfico Provincial", tipo: "Nodo Territorial", x: -0.10, z: 0.30, isCentral: false, colorGem: 0x38bdf8 },
      { id: "los_menucos", nombre: "LOS MENUCOS", subtitulo: "Región Sur Central / RP 8", tipo: "Nodo Territorial", x: -0.18, z: 0.30, isCentral: false, colorGem: 0x38bdf8 },
      { id: "maquinchao", nombre: "MAQUINCHAO", subtitulo: "Línea Sur Centro-Oeste", tipo: "Nodo Territorial", x: -0.26, z: 0.31, isCentral: false, colorGem: 0x38bdf8 },
      { id: "comallo", nombre: "COMALLO", subtitulo: "Línea Sur Pre-cordillera", tipo: "Nodo Territorial", x: -0.33, z: 0.30, isCentral: false, colorGem: 0x38bdf8 }
    ];

    engine.nodeGems06 = [];
    engine.nodeArcs06 = [];
    const viedmaPos = new THREE.Vector3(0.36, -0.56, 0.25);

    // Luz cálida de Sede Viedma
    const viedmaLight = new THREE.PointLight(0xffd700, 1.3, 1.8);
    viedmaLight.position.set(0.36, -0.48, 0.25);
    g.add(viedmaLight);

    // Luz dinámica de escaneo radar (1 sola luz que viaja entre nodos, evitando recompilar shaders)
    const radarPingLight = new THREE.PointLight(0x38bdf8, 0.9, 1.2);
    radarPingLight.position.set(0.36, -0.68, 0.25);
    g.add(radarPingLight);
    engine.anim06_radarLight = radarPingLight;

    engine.sedes06.forEach((sede) => {
      const pinGroup = new THREE.Group();
      if (sede.isCentral) {
        // Obelisco Viedma
        const col = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.065, 0.42, 24), engine.marbleMat(0xffffff));
        col.position.y = -0.72;
        pinGroup.add(col);

        const orb = new THREE.Mesh(new THREE.SphereGeometry(0.06, 24, 24), engine.glassMat(0xffd700, { roughness: 0.05, transmission: 0.9 }));
        orb.position.y = -0.48;
        pinGroup.add(orb);
        engine.nodeGems06.push({ mesh: orb, sede });
      } else {
        // Balizas Nodos
        const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.16, 12), engine.brassMat());
        mast.position.y = -0.80;
        pinGroup.add(mast);

        const gem = new THREE.Mesh(
          new THREE.SphereGeometry(0.026, 16, 16),
          new THREE.MeshStandardMaterial({
            color: 0x38bdf8,
            emissive: 0x0284c7,
            emissiveIntensity: 0.5,
            roughness: 0.2,
            metalness: 0.1
          })
        );
        gem.position.y = -0.70;
        pinGroup.add(gem);
        engine.nodeGems06.push({ mesh: gem, sede });

        // Arco de transmisión
        const nodeTarget = new THREE.Vector3(sede.x, -0.70, sede.z);
        const dist = viedmaPos.distanceTo(nodeTarget);
        const mid = new THREE.Vector3().addVectors(viedmaPos, nodeTarget).multiplyScalar(0.5);
        mid.y = -0.52 + dist * 0.55;

        const curve = new THREE.QuadraticBezierCurve3(viedmaPos, mid, nodeTarget);
        const tube = new THREE.Mesh(
          new THREE.TubeGeometry(curve, 24, 0.0032, 6, false),
          new THREE.MeshStandardMaterial({ color: 0xe6b800, roughness: 0.2, metalness: 0.8, emissive: 0x996515, emissiveIntensity: 0.15, transparent: true, opacity: 0.75 })
        );
        g.add(tube);

        const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.012, 12, 12), new THREE.MeshBasicMaterial({ color: 0xfffad0 }));
        pulse.position.copy(nodeTarget);
        g.add(pulse);

        engine.nodeArcs06.push({ mesh: tube, curve, pulse, target: nodeTarget });
      }

      pinGroup.position.set(sede.x, 0, sede.z);
      g.add(pinGroup);
    });

    const activeHalo = new THREE.Mesh(
      new THREE.RingGeometry(0.025, 0.048, 32),
      new THREE.MeshBasicMaterial({ color: 0xffd700, transparent: true, opacity: 0.85, side: THREE.DoubleSide })
    );
    activeHalo.rotation.x = -Math.PI / 2;
    activeHalo.position.set(0.36, -0.865, 0.25);
    g.add(activeHalo);
    engine.nodeActiveHalo06 = activeHalo;
  },

  animate(engine, t) {
    if (engine.sedes06 && engine.sedes06.length > 0) {
      const cycleDuration = 3.0;
      const activeIdx = Math.floor(t / cycleDuration) % engine.sedes06.length;

      if (activeIdx !== engine.activeNodeIndex06) {
        engine.activeNodeIndex06 = activeIdx;
        const activeNode = engine.sedes06[activeIdx];
        if (window.updateNodeHUD) {
          window.updateNodeHUD(activeNode);
        }
      }

      const activeNode = engine.sedes06[activeIdx];
      if (engine.nodeActiveHalo06) {
        engine.nodeActiveHalo06.position.set(activeNode.x, -0.865, activeNode.z);
        const s = 1.0 + Math.sin(t * 5) * 0.22;
        engine.nodeActiveHalo06.scale.set(s, s, s);
      }

      if (engine.anim06_radarLight) {
        engine.anim06_radarLight.position.set(activeNode.x, -0.68, activeNode.z);
        engine.anim06_radarLight.color.setHex(activeNode.isCentral ? 0xffd700 : 0x38bdf8);
        engine.anim06_radarLight.intensity = 0.85 + Math.sin(t * 5) * 0.3;
      }

      if (engine.nodeGems06) {
        engine.nodeGems06.forEach((item, idx) => {
          if (idx === activeIdx) {
            item.mesh.scale.set(1.35, 1.35, 1.35);
          } else {
            item.mesh.scale.set(1.0, 1.0, 1.0);
          }
        });
      }

      if (engine.nodeArcs06) {
        engine.nodeArcs06.forEach((item, arcIdx) => {
          const prog = (t * 0.45 + arcIdx * 0.10) % 1.0;
          if (item.curve && item.pulse) {
            item.pulse.position.copy(item.curve.getPoint(prog));
          }
        });
      }
    }
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 7. DOCENCIA HÍBRIDA: Red Territorial de los 10 Nodos Regionales
//    (Res. CD N° 135/2022 y Res. CD-CURZA N° 196/2022 • Cogestión Municipal)
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_07"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.40);

    const netGroup = new THREE.Group();
    netGroup.position.set(0, -0.15, 0);

    // Servidor / Terminal Central Sede Viedma (Esbelta columna clásica y esfera Moodle)
    // Parámetros correctos: height = 0.88, radius = 0.085
    const centralCol = engine.createClassicalColumn(0.88, 0.085, 0xd4af37, true);
    centralCol.position.set(0, -0.44, 0);
    netGroup.add(centralCol);

    // Fino aro armilar orbital en el remate
    const centralRing = engine.createBrassArmillaryRing(0.24, 0.008);
    centralRing.position.set(0, 0.18, 0);
    netGroup.add(centralRing);
    engine.anim07_centralRing = centralRing;

    // Núcleo holográfico luminoso del servidor Moodle / Videoconferencias
    const serverGlobe = new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 24, 24),
      engine.glassMat(0xffd700, { roughness: 0.08, transmission: 0.92 })
    );
    serverGlobe.position.set(0, 0.18, 0);
    netGroup.add(serverGlobe);

    const centralLight = new THREE.PointLight(0xffd700, 1.4, 2.0);
    centralLight.position.set(0, 0.18, 0);
    netGroup.add(centralLight);

    // 1 sola luz dinámica de barrido de radar (elimina el overhead de 10 luces fijas)
    const radarSweepLight = new THREE.PointLight(0x38bdf8, 1.1, 1.5);
    radarSweepLight.position.set(1.15, -0.27, 0);
    netGroup.add(radarSweepLight);
    engine.anim07_sweepLight = radarSweepLight;

    // ÚNICA Cartela Maestra Superior (despejada, limpia y sin sobrecarga)
    const labelMaster = engine.createLabelSprite(
      "RED TERRITORIAL DE NODOS REGIONALES",
      "Sede Central Viedma • 10 Nodos Conectados (Res. CD 135/22 y 196/22)",
      "#0f2d59",
      true
    );
    labelMaster.position.set(0, 1.15, 0);
    g.add(labelMaster);

    // Los 10 Nodos Territoriales oficiales (Res. CD N° 135/2022)
    engine.nodos07 = [
      { id: "los_menucos", nombre: "LOS MENUCOS", subtitulo: "Región Sur Central", tipo: "Nodo Territorial", col: 0x38bdf8 },
      { id: "sierra_colorada", nombre: "SIERRA COLORADA", subtitulo: "Centro Geográfico", tipo: "Nodo Territorial", col: 0x38bdf8 },
      { id: "valcheta", nombre: "VALCHETA", subtitulo: "Portal Línea Sur", tipo: "Nodo Territorial", col: 0x38bdf8 },
      { id: "ramos_mexia", nombre: "RAMOS MEXÍA", subtitulo: "Meseta de Somuncura", tipo: "Nodo Territorial", col: 0x38bdf8 },
      { id: "san_antonio", nombre: "SAN ANTONIO OESTE", subtitulo: "Costa Atlántica", tipo: "Nodo Territorial", col: 0x38bdf8 },
      { id: "conesa", nombre: "GENERAL CONESA", subtitulo: "Valle Conesa / Nexo Vial", tipo: "Nodo Territorial", col: 0x38bdf8 },
      { id: "lamarque", nombre: "LAMARQUE", subtitulo: "Valle Medio", tipo: "Nodo Territorial", col: 0x38bdf8 },
      { id: "maquinchao", nombre: "MAQUINCHAO", subtitulo: "Línea Sur Centro-Oeste", tipo: "Nodo Territorial", col: 0x38bdf8 },
      { id: "comallo", nombre: "COMALLO", subtitulo: "Línea Sur Pre-cordillera", tipo: "Nodo Territorial", col: 0x38bdf8 },
      { id: "sierra_grande", nombre: "SIERRA GRANDE", subtitulo: "Costa Atlántica Sur", tipo: "Nodo Territorial", col: 0x38bdf8 }
    ];

    engine.anim07_lasers = [];
    engine.anim07_termBeacons = [];
    const rRing = 1.15;

    engine.nodos07.forEach((nodo, idx) => {
      const angle = (idx / engine.nodos07.length) * Math.PI * 2;
      const x = Math.cos(angle) * rRing;
      const z = Math.sin(angle) * rRing;

      // Baliza esbelta de aula híbrida: mástil de latón pulido con gema de cristal
      const nodeGroup = new THREE.Group();
      nodeGroup.position.set(x, -0.65, z);

      // Micro-base de latón
      const pinBase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.035, 0.045, 0.08, 16),
        engine.brassMat(0xd4af37)
      );
      pinBase.position.y = 0.04;
      nodeGroup.add(pinBase);

      // Mástil delgado
      const pinMast = new THREE.Mesh(
        new THREE.CylinderGeometry(0.007, 0.007, 0.28, 12),
        engine.brassMat(0xffd700)
      );
      pinMast.position.y = 0.22;
      nodeGroup.add(pinMast);

      // Gema cristalina luminosa de la terminal con emisión intrínseca
      const beaconOrb = new THREE.Mesh(
        new THREE.SphereGeometry(0.032, 16, 16),
        new THREE.MeshStandardMaterial({
          color: 0x38bdf8,
          emissive: 0x0284c7,
          emissiveIntensity: 0.5,
          roughness: 0.15,
          metalness: 0.1
        })
      );
      beaconOrb.position.set(0, 0.38, 0);
      nodeGroup.add(beaconOrb);

      const targetWorldY = -0.65 + 0.38; // -0.27
      engine.anim07_termBeacons.push({ mesh: beaconOrb, node: nodo, x, z });

      netGroup.add(nodeGroup);

      // Fino rayo de fibra óptica de transmisión sincrónica
      const lineCurve = new THREE.LineCurve3(
        new THREE.Vector3(0, 0.18, 0),
        new THREE.Vector3(x, targetWorldY, z)
      );
      const tube = new THREE.Mesh(
        new THREE.TubeGeometry(lineCurve, 20, 0.0028, 6, false),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.65 })
      );
      netGroup.add(tube);

      const pulseBall = new THREE.Mesh(
        new THREE.SphereGeometry(0.010, 10, 10),
        new THREE.MeshBasicMaterial({ color: 0xe0f2fe })
      );
      pulseBall.position.copy(lineCurve.v1);
      netGroup.add(pulseBall);

      engine.anim07_lasers.push({ tube, curve: lineCurve, pulse: pulseBall });
    });

    // Halo fino de radar de escaneo activo
    const radarRing = new THREE.Mesh(
      new THREE.RingGeometry(0.035, 0.055, 24),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.85, side: THREE.DoubleSide })
    );
    radarRing.rotation.x = -Math.PI / 2;
    radarRing.position.set(rRing, -0.27, 0);
    netGroup.add(radarRing);
    engine.anim07_radarRing = radarRing;

    g.add(netGroup);
  },

  animate(engine, t) {
    if (engine.anim07_centralRing) {
      engine.anim07_centralRing.rotation.y = t * 0.6;
      engine.anim07_centralRing.rotation.x = Math.sin(t * 0.3) * 0.25;
    }

    if (engine.anim07_lasers) {
      engine.anim07_lasers.forEach((item, i) => {
        const prog = (t * 0.7 + i * 0.1) % 1.0;
        if (item.curve && item.pulse) {
          item.pulse.position.copy(item.curve.getPoint(prog));
        }
        if (item.tube) {
          item.tube.material.opacity = 0.35 + Math.sin(t * 3 + i) * 0.25;
        }
      });
    }

    if (engine.nodos07 && engine.nodos07.length > 0) {
      const cycleDuration = 2.6;
      const activeIdx = Math.floor(t / cycleDuration) % engine.nodos07.length;

      if (activeIdx !== engine.activeNodeIndex07) {
        engine.activeNodeIndex07 = activeIdx;
        const activeNode = engine.nodos07[activeIdx];
        if (window.updateNodeHUD) {
          window.updateNodeHUD(activeNode);
        }
      }

      if (engine.anim07_sweepLight && engine.anim07_radarRing) {
        const beacon = engine.anim07_termBeacons[activeIdx];
        if (beacon) {
          engine.anim07_radarRing.position.set(beacon.x, -0.27, beacon.z);
          const s = 1.0 + Math.sin(t * 6) * 0.20;
          engine.anim07_radarRing.scale.set(s, s, s);

          engine.anim07_sweepLight.position.set(beacon.x, -0.27, beacon.z);
          engine.anim07_sweepLight.intensity = 1.0 + Math.sin(t * 6) * 0.35;

          engine.anim07_termBeacons.forEach((b, idx) => {
            if (idx === activeIdx) {
              b.mesh.scale.set(1.4, 1.4, 1.4);
              if (b.mesh.material.emissiveIntensity !== undefined) {
                b.mesh.material.emissiveIntensity = 1.0;
              }
            } else {
              b.mesh.scale.set(1.0, 1.0, 1.0);
              if (b.mesh.material.emissiveIntensity !== undefined) {
                b.mesh.material.emissiveIntensity = 0.40;
              }
            }
          });
        }
      }
    }
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 8. DESNATURALIZACIÓN: Bloque de Carbón Burocrático y Prisma de Ruptura
//    (De la rutina cotidiana al objeto científico • Wainerman & Sautu)
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_08"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.35);

    const ruptureGroup = new THREE.Group();
    ruptureGroup.position.set(0, -0.1, 0);

    // 1. Bloque de carbón / roca opaca izquierda (La rutina administrativa cotidiana)
    const routineRock = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.38, 1),
      engine.graniteMat(0x1e293b, 0.85, 0.1) // Áspero y oscuro
    );
    routineRock.position.set(-0.65, 0.05, 0);
    ruptureGroup.add(routineRock);

    const labelLeft = engine.createLabelSprite("RUTINA COTIDIANA", "Encuesta de Papel Sumativa", "#475569", false);
    labelLeft.position.set(-0.65, 0.65, 0);
    ruptureGroup.add(labelLeft);

    // 2. Haz de investigación que penetra hacia el centro
    const beamIn = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.015, 0.45, 12),
      engine.brassMat(0xffd700)
    );
    beamIn.rotation.z = Math.PI / 2;
    beamIn.position.set(-0.25, 0.05, 0);
    ruptureGroup.add(beamIn);

    // 3. Prisma de cristal óptico puro (Vigilancia Epistemológica)
    const prismMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.28, 0.75, 3),
      engine.glassMat(0xf8fafc, { transmission: 0.95, roughness: 0.05, ior: 1.65 })
    );
    prismMesh.position.set(0.08, 0.05, 0);
    ruptureGroup.add(prismMesh);
    engine.anim08_prism = prismMesh;

    const labelCenter = engine.createLabelSprite("VIGILANCIA EPISTEMOLÓGICA", "Ruptura Científica (Wainerman & Sautu)", "#0f2d59", false);
    labelCenter.position.set(0.08, 0.75, 0);
    ruptureGroup.add(labelCenter);

    // 4. Objeto científico puro facetado emergiendo a la derecha
    const scienceGem = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.34, 0),
      engine.glassMat(0x38bdf8, { roughness: 0.08, transmission: 0.92 })
    );
    scienceGem.position.set(0.72, 0.05, 0);
    ruptureGroup.add(scienceGem);
    engine.anim08_gem = scienceGem;

    const lightGem = new THREE.PointLight(0x38bdf8, 1.2, 1.5);
    lightGem.position.set(0.72, 0.05, 0);
    ruptureGroup.add(lightGem);

    const labelRight = engine.createLabelSprite("OBJETO CIENTÍFICO", "Factibilidad Situada del 360°", "#0369a1", false);
    labelRight.position.set(0.72, 0.65, 0);
    ruptureGroup.add(labelRight);

    g.add(ruptureGroup);
  },

  animate(engine, t) {
    if (engine.anim08_gem) {
      engine.anim08_gem.rotation.y = t * 1.2;
      engine.anim08_gem.rotation.x = t * 0.6;
    }
    if (engine.anim08_prism) {
      engine.anim08_prism.rotation.y = t * 0.4;
    }
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 9. TENSIÓN NORMATIVA: Balanza Dual de Tensión Estatutaria (Art. 75 vs. Art. 76)
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_09"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.4);

    const scaleGroup = new THREE.Group();
    scaleGroup.position.set(0, -0.15, 0);

    // Fuste y pedestal central de mármol y latón
    const shaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.12, 1.35, 32),
      engine.marbleMat(0xf8fafc)
    );
    shaft.position.y = -0.32;
    scaleGroup.add(shaft);

    // Barra oscilante de latón
    const beam = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 1.55, 16),
      engine.brassMat(0xd4af37)
    );
    beam.rotation.z = Math.PI / 2;
    beam.position.y = 0.38;
    scaleGroup.add(beam);
    engine.anim09_beam = beam;

    // Platillo Izquierdo: Art. 75 (Candado / Mazo punitivo de vacancia)
    const leftPanGroup = new THREE.Group();
    leftPanGroup.position.set(-0.68, 0.15, 0);

    const leftPan = new THREE.Mesh(
      new THREE.CylinderGeometry(0.25, 0.22, 0.03, 32),
      engine.brassMat()
    );
    leftPanGroup.add(leftPan);

    const lockBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.16, 0.08),
      engine.graniteMat(0x475569) // Metálico oscuro punitivo
    );
    lockBody.position.y = 0.10;
    leftPanGroup.add(lockBody);

    const lockShackle = new THREE.Mesh(
      new THREE.TorusGeometry(0.07, 0.015, 12, 24, Math.PI),
      engine.brassMat(0xd4af37)
    );
    lockShackle.position.y = 0.18;
    leftPanGroup.add(lockShackle);

    const labelLeft = engine.createLabelSprite("ART. 75 ESTATUTO", "Control Sumativo • Vacancia", "#b91c1c", false);
    labelLeft.position.set(0, 0.42, 0);
    leftPanGroup.add(labelLeft);
    scaleGroup.add(leftPanGroup);
    engine.anim09_left = leftPanGroup;

    // Platillo Derecho: Art. 76 (Antorcha de Capacitación Continua)
    const rightPanGroup = new THREE.Group();
    rightPanGroup.position.set(0.68, 0.25, 0);

    const rightPan = new THREE.Mesh(
      new THREE.CylinderGeometry(0.25, 0.22, 0.03, 32),
      engine.brassMat()
    );
    rightPanGroup.add(rightPan);

    const torch = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.05, 0.22, 16),
      engine.brassMat(0xffd700)
    );
    torch.position.y = 0.12;
    rightPanGroup.add(torch);

    const flame = new THREE.Mesh(
      new THREE.ConeGeometry(0.06, 0.16, 16),
      engine.glassMat(0xf59e0b, { roughness: 0.1, transmission: 0.9 })
    );
    flame.position.y = 0.28;
    rightPanGroup.add(flame);

    const flameLight = new THREE.PointLight(0xf59e0b, 1.2, 1.2);
    flameLight.position.y = 0.30;
    rightPanGroup.add(flameLight);

    const labelRight = engine.createLabelSprite("ART. 76 ESTATUTO", "Capacitación y Desarrollo Formativo", "#059669", false);
    labelRight.position.set(0, 0.52, 0);
    rightPanGroup.add(labelRight);
    scaleGroup.add(rightPanGroup);
    engine.anim09_right = rightPanGroup;

    g.add(scaleGroup);
  },

  animate(engine, t) {
    const swing = Math.sin(t * 1.4) * 0.05;
    if (engine.anim09_beam) {
      engine.anim09_beam.rotation.z = Math.PI / 2 + swing;
    }
    if (engine.anim09_left) {
      engine.anim09_left.position.y = 0.15 - swing * 1.5;
    }
    if (engine.anim09_right) {
      engine.anim09_right.position.y = 0.25 + swing * 1.5;
    }
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 10. PREGUNTA CENTRAL: Pentágono Orbital de Factibilidad (5 Dimensiones)
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_10"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.4);

    const pentGroup = new THREE.Group();
    pentGroup.position.set(0, -0.05, 0);

    // Núcleo central pulsante: La Pregunta General de TFG
    const coreMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.28, 32, 32),
      engine.marbleMat(0xfdfbf7)
    );
    pentGroup.add(coreMesh);

    const coreRing = engine.createBrassArmillaryRing(0.38, 0.014);
    coreRing.rotation.x = Math.PI / 2;
    pentGroup.add(coreRing);

    const coreLight = new THREE.PointLight(0xffd700, 1.5, 1.8);
    pentGroup.add(coreLight);

    const labelCore = engine.createLabelSprite("PREGUNTA CENTRAL", "¿Condiciones de Factibilidad 2027?", "#0f2d59", true);
    labelCore.position.set(0, 0.65, 0);
    pentGroup.add(labelCore);

    // 5 Nodos Orbitales de las Cinco Dimensiones de Factibilidad
    const dims = [
      { name: "1. NORMATIVA", sub: "CCT y Estatuto UNCo", angle: 0, col: 0x38bdf8 },
      { name: "2. TÉCNICA", sub: "Moodle y Anonimato", angle: (2 * Math.PI) / 5, col: 0x10b981 },
      { name: "3. ORGANIZACIONAL", sub: "Circuitos y Art. 76", angle: (4 * Math.PI) / 5, col: 0xf59e0b },
      { name: "4. CULTURAL", sub: "Confianza Docente", angle: (6 * Math.PI) / 5, col: 0x8b5cf6 },
      { name: "5. GOBERNANZA", sub: "Cogobierno y ADUNC", angle: (8 * Math.PI) / 5, col: 0xec4899 }
    ];

    engine.anim10_arms = [];
    dims.forEach((d) => {
      const armGroup = new THREE.Group();
      const r = 0.88;
      const x = Math.cos(d.angle) * r;
      const z = Math.sin(d.angle) * r;

      // Brazo tensor de latón
      const armGeo = new THREE.CylinderGeometry(0.008, 0.008, r, 12);
      const armMesh = new THREE.Mesh(armGeo, engine.brassMat());
      armMesh.position.set(x / 2, 0, z / 2);
      armMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(x, 0, z).normalize());
      armGroup.add(armMesh);

      // Sello esférico de dimensión
      const sealMesh = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.12, 0),
        engine.glassMat(d.col, { transmission: 0.85, roughness: 0.1 })
      );
      sealMesh.position.set(x, 0, z);
      armGroup.add(sealMesh);

      const labelDim = engine.createLabelSprite(d.name, d.sub, "#0f2d59", false);
      labelDim.position.set(x, 0.28, z);
      armGroup.add(labelDim);

      pentGroup.add(armGroup);
      engine.anim10_arms.push(sealMesh);
    });

    g.add(pentGroup);
    engine.anim10_group = pentGroup;
  },

  animate(engine, t) {
    if (engine.anim10_group) {
      engine.anim10_group.rotation.y = t * 0.25;
    }
    if (engine.anim10_arms) {
      engine.anim10_arms.forEach((seal, idx) => {
        seal.rotation.y = t * 1.5 + idx;
      });
    }
  }
};
