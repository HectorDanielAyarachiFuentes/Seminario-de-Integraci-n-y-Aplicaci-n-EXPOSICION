/**
 * =============================================================================
 * OBJETOS 3D — BLOQUE II: ESCULTURAS 6 A 10
 * Presentación de Tesina • CURZAS - UNCo
 * =============================================================================
 * Esculturas académicas para el Bloque Epistemológico y Metodológico:
 * 6. Desnaturalización: Escultura Cinética de Péndulos Armónicos
 * 7. Tensión Normativa: Balanza de la Justicia Universitaria (Art. 75 vs 76)
 * 8. Preguntas de Investigación: Astrolabio Geodésico de Navegación (Corregido con pedestal y despeje)
 * 9. Matriz de Objetivos: Tétrada Monumental de Placas de Bronce
 * 10. Francisco Longo: Heptágono Escultórico de los 7 Subsistemas
 */

window.Presentation3D_Objects = window.Presentation3D_Objects || {};

// ──────────────────────────────────────────────────────────────────────────
// 6. DESNATURALIZACIÓN: Escultura Cinética de Péndulos Armónicos
//    Esferas de mármol suspendidas en alineación epistemológica (Wainerman & Sautu)
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_06"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.4);

    // Marco superior de bronce
    const topBar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.03, 2.2, 16),
      engine.brassMat()
    );
    topBar.rotation.z = Math.PI / 2;
    topBar.position.y = 1.3;
    g.add(topBar);

    engine.spheres06 = [];
    const count = 7;
    for (let i = 0; i < count; i++) {
      const posX = -0.8 + (i * 1.6) / (count - 1);
      const isOdd = i % 2 === 0;

      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.11, 24, 24),
        isOdd ? engine.marbleMat() : engine.brassMat()
      );
      sphere.position.set(posX, 0.1, 0);
      g.add(sphere);

      // Hilo
      const stringGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(posX, 1.3, 0),
        new THREE.Vector3(posX, 0.1, 0)
      ]);
      const stringLine = new THREE.Line(
        stringGeo,
        new THREE.LineBasicMaterial({ color: 0x94a3b8 })
      );
      g.add(stringLine);

      engine.spheres06.push({ mesh: sphere, line: stringLine, x: posX, freq: 1.2 + i * 0.1 });
    }
  },

  animate(engine, t) {
    if (engine.spheres06) {
      engine.spheres06.forEach(s => {
        const swing = Math.sin(t * s.freq) * 0.12;
        s.mesh.position.z = swing;
      });
    }
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 7. TENSIÓN NORMATIVA: Balanza de la Justicia Universitaria (Art. 75 vs 76)
//    Fuste de mármol con balancín de latón y platillos solemnes
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_07"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.4);

    // Pilar central de mármol
    const post = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.12, 2.1, 24),
      engine.marbleMat()
    );
    post.position.y = 0.05;
    g.add(post);

    // Balancín transversal de latón
    engine.beam07 = new THREE.Group();
    const beamBar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.025, 2.2, 16),
      engine.brassMat()
    );
    beamBar.rotation.z = Math.PI / 2;
    engine.beam07.add(beamBar);

    // Dos platillos de bronce
    [-1.0, 1.0].forEach((posX, idx) => {
      const panGroup = new THREE.Group();
      const panMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.35, 0.05, 0.08, 32),
        engine.brassMat(idx === 0 ? 0xc5a059 : 0xd4af37)
      );
      panMesh.position.y = -0.65;
      panGroup.add(panMesh);

      // Cadenas
      const cord = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(0, -0.65, 0)
        ]),
        new THREE.LineBasicMaterial({ color: 0xc5a059 })
      );
      panGroup.add(cord);

      panGroup.position.set(posX, 0, 0);
      engine.beam07.add(panGroup);
      if (idx === 0) engine.panLeft07 = panGroup;
      else engine.panRight07 = panGroup;
    });

    engine.beam07.position.y = 1.05;
    g.add(engine.beam07);
  },

  animate(engine, t) {
    if (engine.beam07) {
      engine.beam07.rotation.z = Math.sin(t * 0.8) * 0.08;
    }
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 8. PREGUNTAS DE INVESTIGACIÓN: Astrolabio Geodésico de Navegación
//    Instrumento científico clásico con limbo graduado de bronce sobre atril
//    (Corregido: pie y horquilla de latón de museo con elevación completa)
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_08"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.35);

    // 1. Pedestal / Pie de exhibición museístico de latón sobre el granito (-1.11)
    const standBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.32, 0.38, 0.06, 32),
      engine.brassMat()
    );
    standBase.position.y = -1.08;
    g.add(standBase);

    // Fuste esbelto torneado de latón
    const standPillar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.045, 0.075, 0.46, 24),
      engine.brassMat()
    );
    standPillar.position.y = -0.83;
    g.add(standPillar);

    // Horquilla / Cuna curva de soporte que recibe el limbo inferior
    const forkCurve = new THREE.TorusGeometry(0.96, 0.02, 16, 32, Math.PI * 0.4);
    const forkMesh = new THREE.Mesh(forkCurve, engine.brassMat());
    forkMesh.rotation.z = Math.PI * 1.3;
    forkMesh.position.set(0, 0.22, 0);
    g.add(forkMesh);

    // 2. Limbo graduado exterior de bronce noble
    //    Centro en y = 0.22; Radio = 0.95.
    //    Punto inferior = 0.22 - 0.95 = -0.73 (despeje de 38 cm sobre el plinto en -1.11)
    engine.astrolabeRing08 = engine.createBrassArmillaryRing(0.95, 0.026);
    engine.astrolabeRing08.position.y = 0.22;
    g.add(engine.astrolabeRing08);

    // Trono ornamental clásico y argolla de suspensión en la cúspide
    const throneGroup = new THREE.Group();
    throneGroup.position.set(0, 0.22 + 0.95, 0);

    const throneBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.14, 0.07, 16),
      engine.brassMat(0xd4af37)
    );
    throneBody.position.y = 0.035;
    throneGroup.add(throneBody);

    const shackle = new THREE.Mesh(
      new THREE.TorusGeometry(0.11, 0.016, 16, 32),
      engine.brassMat()
    );
    shackle.position.y = 0.12;
    throneGroup.add(shackle);
    g.add(throneGroup);

    // 3. Red interior en cruz de latón graduada
    [-1, 1].forEach(d => {
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(d === -1 ? 1.86 : 0.02, 0.02, d === 1 ? 1.86 : 0.02),
        engine.brassMat()
      );
      bar.position.y = 0.22;
      g.add(bar);
    });

    // 4. Disco de cristal con grabados geodésicos (Tímpano)
    const disc = new THREE.Mesh(
      new THREE.CylinderGeometry(0.88, 0.88, 0.018, 32),
      engine.glassMat()
    );
    disc.rotation.x = Math.PI / 2;
    disc.position.y = 0.22;
    g.add(disc);

    // 5. Alidada / Regla giratoria con pínulas de latón
    engine.alidada08 = new THREE.Mesh(
      new THREE.BoxGeometry(0.07, 1.62, 0.035),
      engine.brassMat(0xe8cf8d)
    );
    engine.alidada08.position.y = 0.22;
    g.add(engine.alidada08);

    // Remache central de la alidada
    const centerPin = new THREE.Mesh(
      new THREE.SphereGeometry(0.045, 16, 16),
      engine.brassMat(0xffd700)
    );
    centerPin.position.set(0, 0.22, 0.025);
    g.add(centerPin);
  },

  animate(engine, t) {
    if (engine.alidada08) {
      engine.alidada08.rotation.z = t * 0.15;
    }
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 9. MATRIZ DE OBJETIVOS: Tétrada Monumental de Placas de Bronce
//    4 placas de bronce noble dispuestas en compás ordenado
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_09"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.4);

    engine.tablets09 = [];
    for (let i = 0; i < 4; i++) {
      const tablet = new THREE.Group();

      // Placa de bronce
      const plate = new THREE.Mesh(
        new THREE.BoxGeometry(0.55, 0.95, 0.03),
        engine.brassMat()
      );
      tablet.add(plate);

      // Marco fino de mármol
      const frame = new THREE.Mesh(
        new THREE.BoxGeometry(0.59, 0.99, 0.02),
        engine.marbleMat()
      );
      frame.position.z = -0.01;
      tablet.add(frame);

      tablet.userData = { angle: (i * Math.PI) / 2 };
      g.add(tablet);
      engine.tablets09.push(tablet);
    }
  },

  animate(engine, t) {
    if (engine.tablets09) {
      engine.tablets09.forEach((tb, idx) => {
        const a = tb.userData.angle + t * 0.06;
        tb.position.set(Math.cos(a) * 0.9, 0, Math.sin(a) * 0.9);
        tb.rotation.y = -a + Math.PI / 2;
      });
    }
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 10. FRANCISCO LONGO: Heptágono Escultórico de los 7 Subsistemas
//     Prisma regular de 7 caras en mármol blanco y corona de latón
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_10"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.4);

    // Prisma heptagonal de mármol
    engine.heptagon10 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.7, 0.8, 1.4, 7),
      engine.marbleMat(0xfaf8f5)
    );
    g.add(engine.heptagon10);

    // Anillo exterior de latón (ajustado para que libre el pedestal)
    engine.ring10 = engine.createBrassArmillaryRing(1.20, 0.02);
    engine.ring10.position.y = 0.10;
    engine.ring10.rotation.x = Math.PI / 3;
    g.add(engine.ring10);

    // Corona superior
    const crown = new THREE.Mesh(
      new THREE.ConeGeometry(0.5, 0.4, 7),
      engine.brassMat()
    );
    crown.position.y = 0.9;
    g.add(crown);
  },

  animate(engine, t) {
    if (engine.heptagon10) engine.heptagon10.rotation.y = t * 0.08;
    if (engine.ring10) engine.ring10.rotation.z = t * 0.1;
  }
};
