/**
 * =============================================================================
 * OBJETOS 3D — BLOQUE III: ESCULTURAS 11 A 15
 * Presentación de Tesina • CURZAS - UNCo
 * =============================================================================
 * Esculturas académicas para el Bloque Teórico-Operativo del TFG:
 * 11. Diagrama SVG Longo: Atril de Honor Académico
 * 12. Cuatro Subsistemas Operativos: Escalera Monumental de Mármol
 * 13. Modelo 360°: Giroscopio Cuádruple de Bronce y Alabastro
 * 14. Blindaje de Anonimato: Cúpula Geodésica de Cristal y Tracería de Bronce
 * 15. Carlos Matus (PES): Prisma Triangular de Triangulación Estratégica
 */

window.Presentation3D_Objects = window.Presentation3D_Objects || {};

// ──────────────────────────────────────────────────────────────────────────
// 11. DIAGRAMA SVG LONGO: Atril de Honor Académico
//     Marco sutil de latón sobre plinto para acompañar el diagrama SVG
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_11"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.5);

    // Atril de mármol
    const stand = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.16, 1.3, 24),
      engine.marbleMat()
    );
    stand.position.y = -0.45;
    g.add(stand);

    // Marco de honor
    engine.frame11 = new THREE.Mesh(
      new THREE.TorusGeometry(1.2, 0.02, 16, 64),
      engine.brassMat()
    );
    engine.frame11.position.y = 0.35;
    g.add(engine.frame11);
  },

  animate(engine, t) {
    if (engine.frame11) engine.frame11.rotation.z = t * 0.05;
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 12. CUATRO SUBSISTEMAS OPERATIVOS: Escalera Monumental de Mármol
//     Cuatro pedestales escalonados ascendentes con molduras de latón
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_12"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.5);

    engine.steps12 = [];
    for (let i = 0; i < 4; i++) {
      const step = new THREE.Group();
      const height = 0.6 + i * 0.35;

      const block = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, height, 0.3),
        engine.marbleMat()
      );
      block.position.y = -0.9 + height / 2;
      step.add(block);

      const rim = new THREE.Mesh(
        new THREE.BoxGeometry(0.32, 0.04, 0.32),
        engine.brassMat()
      );
      rim.position.y = -0.9 + height + 0.02;
      step.add(rim);

      step.position.set(-0.75 + i * 0.5, 0, 0);
      g.add(step);
      engine.steps12.push(step);
    }
  },

  animate(engine, t) {
    const g12 = engine.scenes["anim_12"];
    if (g12) {
      g12.rotation.y = engine.userRotation.y + Math.sin(t * 0.3) * 0.06;
      g12.rotation.x = engine.userRotation.x;
    }
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 13. MODELO 360°: Giroscopio Cuádruple de Bronce y Alabastro
//     4 aros cardinales girando solemnemente con 4 esferas de mármol
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_13"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.4);

    // Eje vertical
    const post = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.08, 2.2, 16),
      engine.marbleMat()
    );
    post.position.y = 0.15;
    g.add(post);

    // Anillo exterior de latón
    engine.gyroRing13 = engine.createBrassArmillaryRing(1.15, 0.02);
    engine.gyroRing13.position.y = 0.15;
    engine.gyroRing13.rotation.x = Math.PI / 2.5;
    g.add(engine.gyroRing13);

    // 4 esferas de alabastro cardinales
    engine.quadSpheres13 = [];
    for (let i = 0; i < 4; i++) {
      const sp = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 24, 24),
        i % 2 === 0 ? engine.marbleMat(0xfdfbf7) : engine.brassMat()
      );
      sp.position.y = 0.15;
      g.add(sp);
      engine.quadSpheres13.push({ mesh: sp, angle: (i * Math.PI) / 2 });
    }
  },

  animate(engine, t) {
    if (engine.gyroRing13) engine.gyroRing13.rotation.z = t * 0.12;
    if (engine.quadSpheres13) {
      engine.quadSpheres13.forEach((q, idx) => {
        const a = q.angle + t * 0.15;
        q.mesh.position.set(Math.cos(a) * 1.05, 0.15 + Math.sin(a) * 0.3, Math.sin(a) * 1.05);
      });
    }
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 14. BLINDAJE DE ANONIMATO: Cúpula Geodésica de Cristal y Tracería de Bronce
//     Cúpula protectora arquitectónica de cristal esmerilado y nervaduras
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_14"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.5);

    // Cúpula esférica de cristal protector
    engine.dome14 = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.05, 2),
      engine.glassMat(0xf8fafc, { opacity: 0.82 })
    );
    engine.dome14.position.y = 0.15;
    g.add(engine.dome14);

    // Nervaduras de bronce
    const ribs = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.06, 2),
      new THREE.MeshStandardMaterial({
        color: 0xc5a059,
        wireframe: true,
        roughness: 0.3,
        metalness: 0.85
      })
    );
    ribs.position.y = 0.15;
    g.add(ribs);
    engine.ribs14 = ribs;

    // Núcleo de custodia dorado
    const innerGem = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.28, 1),
      engine.brassMat(0xe8cf8d)
    );
    innerGem.position.y = 0.15;
    g.add(innerGem);
  },

  animate(engine, t) {
    if (engine.dome14) engine.dome14.rotation.y = t * 0.05;
    if (engine.ribs14) engine.ribs14.rotation.y = -t * 0.04;
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 15. CARLOS MATUS (PES): Prisma Triangular de Triangulación Estratégica
//     Prisma de mármol negro y barras tensoras de latón (Triángulo de Gobierno)
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_15"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.4);

    engine.nodes15 = [];
    for (let i = 0; i < 3; i++) {
      const a = (i * 2 * Math.PI) / 3 - Math.PI / 2;
      const sphere = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.2, 1),
        i === 1 ? engine.marbleMat() : engine.brassMat()
      );
      sphere.position.set(Math.cos(a) * 1.15, 0, Math.sin(a) * 1.15);
      g.add(sphere);
      engine.nodes15.push(sphere);
    }

    // Barras tensoras de latón conectando los 3 vértices
    for (let i = 0; i < 3; i++) {
      const next = (i + 1) % 3;
      const a1 = (i * 2 * Math.PI) / 3 - Math.PI / 2;
      const a2 = (next * 2 * Math.PI) / 3 - Math.PI / 2;
      const p1 = new THREE.Vector3(Math.cos(a1) * 1.15, 0, Math.sin(a1) * 1.15);
      const p2 = new THREE.Vector3(Math.cos(a2) * 1.15, 0, Math.sin(a2) * 1.15);

      const tube = new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.LineCurve3(p1, p2), 10, 0.015, 8, false),
        engine.brassMat()
      );
      g.add(tube);
    }
  },

  animate(engine, t) {
    const g15 = engine.scenes["anim_15"];
    if (g15) {
      g15.rotation.y = engine.userRotation.y + t * 0.06;
      g15.rotation.x = engine.userRotation.x;
    }
  }
};
