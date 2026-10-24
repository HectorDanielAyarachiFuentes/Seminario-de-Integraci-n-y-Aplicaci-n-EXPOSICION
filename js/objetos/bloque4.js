/**
 * =============================================================================
 * OBJETOS 3D — BLOQUE IV: ESCULTURAS 16 A 20
 * Presentación de Tesina • CURZAS - UNCo
 * =============================================================================
 * Esculturas académicas para el Bloque de Gobernanza, Factibilidad y Cierre:
 * 16. Poligobernanza (Cao & Blutman): Estructura Arquitectónica de Tensegridad
 * 17. Metodología: Teodolito y Prisma Óptico Geodésico
 * 18. Factibilidad: Pentagrama Armónico de Vitral y Latón
 * 19. Vacancia Disciplinar: Torre Linterna de la Sabiduría Académica
 * 20. Cierre Institucional: Gran Medallón de Honor CURZAS - UNCo
 */

window.Presentation3D_Objects = window.Presentation3D_Objects || {};

// ──────────────────────────────────────────────────────────────────────────
// 16. POLIGOBERNANZA (Cao & Blutman): Estructura Arquitectónica de Tensegridad
//     Barras de latón flotando en perfecto equilibrio tensado sin tocarse
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_16"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.4);

    engine.tensegrity16 = new THREE.Group();
    for (let i = 0; i < 3; i++) {
      const bar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.035, 0.035, 1.8, 16),
        engine.brassMat()
      );
      bar.rotation.x = Math.PI / 3;
      bar.rotation.y = (i * 2 * Math.PI) / 3;
      bar.position.y = 0;
      engine.tensegrity16.add(bar);
    }
    g.add(engine.tensegrity16);

    // Aro unificador de mármol
    const ring = engine.createBrassArmillaryRing(1.2, 0.012);
    ring.rotation.x = Math.PI / 2;
    g.add(ring);
  },

  animate(engine, t) {
    if (engine.tensegrity16) engine.tensegrity16.rotation.y = t * 0.08;
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 17. METODOLOGÍA: Teodolito y Prisma Óptico Geodésico
//     Prisma de cristal puro tallado sobre montura clásica de latón
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_17"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.4);

    // Trípode clásico
    const tripod = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.16, 1.2, 3),
      engine.marbleMat()
    );
    tripod.position.y = -0.55;
    g.add(tripod);

    // Prisma triangular de cristal óptico puro
    engine.prism17 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.45, 0.45, 0.9, 3),
      engine.glassMat(0xffffff)
    );
    engine.prism17.position.y = 0.4;
    g.add(engine.prism17);

    // Aro graduado de latón
    const ring = engine.createBrassArmillaryRing(0.85, 0.015);
    ring.position.y = 0.4;
    ring.rotation.x = Math.PI / 2;
    g.add(ring);
  },

  animate(engine, t) {
    if (engine.prism17) engine.prism17.rotation.y = t * 0.1;
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 18. FACTIBILIDAD: Pentagrama Armónico de Vitral y Latón
//     Escultura pentagonal con cinco ejes de bronce sosteniendo placas de cristal
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_18"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.4);

    const R = 1.2;
    engine.pentGroup18 = new THREE.Group();

    // 5 radios de latón
    for (let i = 0; i < 5; i++) {
      const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
      const x = Math.cos(a) * R;
      const y = Math.sin(a) * R;

      const bar = new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, y, 0)), 8, 0.015, 8, false),
        engine.brassMat()
      );
      engine.pentGroup18.add(bar);

      // Nodo de mármol
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.09, 16, 16),
        engine.marbleMat()
      );
      dot.position.set(x, y, 0);
      engine.pentGroup18.add(dot);
    }

    engine.pentGroup18.position.y = 0.2;
    g.add(engine.pentGroup18);
  },

  animate(engine, t) {
    if (engine.pentGroup18) engine.pentGroup18.rotation.z = t * 0.05;
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 19. VACANCIA DISCIPLINAR: Torre Linterna de la Sabiduría Académica
//     Faro clásico de mampostería y cúpula de bronce de biblioteca renacentista
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_19"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.4);

    // Torre cilíndrica de mármol
    engine.tower19 = new THREE.Group();
    const shaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.45, 1.8, 24),
      engine.marbleMat()
    );
    shaft.position.y = -0.05;
    engine.tower19.add(shaft);

    // Linterna de latón y cristal
    const lantern = new THREE.Mesh(
      new THREE.CylinderGeometry(0.25, 0.25, 0.45, 8),
      engine.glassMat()
    );
    lantern.position.y = 1.0;
    engine.tower19.add(lantern);

    // Cúpula superior de latón
    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(0.28, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2),
      engine.brassMat()
    );
    dome.position.y = 1.22;
    engine.tower19.add(dome);

    g.add(engine.tower19);
  },

  animate(engine, t) {
    if (engine.tower19) engine.tower19.rotation.y = t * 0.08;
  }
};

// ──────────────────────────────────────────────────────────────────────────
// 20. CIERRE INSTITUCIONAL: Gran Medallón de Honor CURZAS - UNCo
//     Medalla conmemorativa de bronce y oro sustentada sobre plinto clásico
// ──────────────────────────────────────────────────────────────────────────
window.Presentation3D_Objects["anim_20"] = {
  build(engine, g) {
    engine.createMuseumPlinth(g, 1.5);

    engine.medal20 = new THREE.Group();

    // Disco de medalla de bronce pulido
    const disc = new THREE.Mesh(
      new THREE.CylinderGeometry(1.05, 1.05, 0.12, 48),
      engine.brassMat(0xd4af37)
    );
    disc.rotation.x = Math.PI / 2;
    engine.medal20.add(disc);

    // Corona de laureles labrada
    const laurel = new THREE.Mesh(
      new THREE.TorusGeometry(1.15, 0.03, 16, 64),
      engine.brassMat(0xe8cf8d)
    );
    engine.medal20.add(laurel);

    // Blasón central en bajorrelieve
    const innerEmblem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.7, 0.7, 0.16, 32),
      engine.marbleMat(0xfdfbf7)
    );
    innerEmblem.rotation.x = Math.PI / 2;
    engine.medal20.add(innerEmblem);

    engine.medal20.position.y = 0.2;
    g.add(engine.medal20);
  },

  animate(engine, t) {
    if (engine.medal20) engine.medal20.rotation.y = t * 0.12;
  }
};
