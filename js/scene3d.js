/**
 * =============================================================================
 * MOTOR GRÁFICO 3D PRINCIPAL (ORQUESTADOR MODULAR THREE.JS)
 * Presentación de Tesina • CURZAS - UNCo
 * Autor: Tec. Sup. en RRHH Héctor Daniel Ayarachi Fuentes
 * =============================================================================
 * Administra el canvas WebGL, iluminación de galería clásica, partículas atmosféricas,
 * transiciones cinematográficas GSAP entre filminas, y el sistema de interacción
 * 360° (rotación, traslación y zoom progresivo con ratón o gestos táctiles).
 *
 * Las esculturas y sus físicas están modularizadas en js/objetos/:
 * - materials.js     -> Paleta PBR de materiales académicos (mármol, latón, cristal, granito)
 * - helpers.js       -> Generadores de pedestales de museo, aros armilares y cartelas 3D
 * - camera_config.js -> Posiciones y ángulos óptimos de cámara por filmina
 * - bloque1.js       -> Esculturas 1 a 5 (Esfera Armilar, Valor Público, Templo, Territorio, Nodos)
 * - bloque2.js       -> Esculturas 6 a 10 (Péndulos, Balanza, Astrolabio, Objetivos, Longo)
 * - bloque3.js       -> Esculturas 11 a 15 (Atril, 4 Escalones, Giroscopio 360°, Cúpula, PES)
 * - bloque4.js       -> Esculturas 16 a 20 (Tensegridad, Teodolito, Pentagrama, Faro, Medallón)
 */

class Presentation3D {
  constructor(canvas) {
    this.canvas = canvas;
    this.scenes = {};
    this.currentSceneId = "anim_01";

    // ── Variables de Interacción 3D (Rotación 360°, Pan y Zoom) ──
    this.userRotation = { x: 0, y: 0 };
    this.targetUserRotation = { x: 0, y: 0 };
    this.userZoom = 0;
    this.targetUserZoom = 0;
    this.userPan = { x: 0, y: 0 };
    this.targetUserPan = { x: 0, y: 0 };
    this.isDragging = false;
    this.previousPointerPos = { x: 0, y: 0 };
    this.dragButton = 0; // 0 = rotar en 3D, 2 = pan/desplazar

    // Estado de transición cinemática entre pedestales de galería
    this.transitionState = {
      exitingGroup: null,
      exitOffset: { x: 0, y: 0, z: 0, scale: 1 },
      enterOffset: { x: 0, y: 0, z: 0, scale: 1, rotY: 0 }
    };

    // Coordenadas de cámara importadas desde js/objetos/camera_config.js
    this.cameraTargets = window.Scene3DCameraConfig || {};

    const initialCam = this.cameraTargets.anim_01 || { pos: [2.3, 1.4, 6.8], lookAt: [1.4, 0.2, 0] };
    this.currentCamPos  = new THREE.Vector3(...initialCam.pos);
    this.targetCamPos   = new THREE.Vector3(...initialCam.pos);
    this.currentLookAt  = new THREE.Vector3(...initialCam.lookAt);
    this.targetLookAt   = new THREE.Vector3(...initialCam.lookAt);

    // Buffers vectoriales reutilizables para el bucle de render (Zero Garbage Collection)
    this._tmpCamDir = new THREE.Vector3();
    this._tmpDesiredCamPos = new THREE.Vector3();
    this._tmpDesiredLookAt = new THREE.Vector3();

    this.init();
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     INICIALIZACIÓN DEL RENDERER Y ESCENA ACADÉMICA (GALERÍA BLANCA CLÁSICA)
     ═══════════════════════════════════════════════════════════════════════════ */
  init() {
    this.scene = new THREE.Scene();
    // Atmósfera de galería clásica en blanco marfil con contraste suave
    this.scene.fog = new THREE.FogExp2(0xf4f6f9, 0.022);

    this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
    this.camera.position.copy(this.currentCamPos);
    this.updateCameraViewOffset();

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    this.renderer.setClearColor(0xf4f6f9, 1);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Iluminación de museo / galería de esculturas clásicas con luz natural
    this.setupMuseumLighting();

    // Motes sutiles de polvo dorado de biblioteca bajo la luz del sol
    this.createAtmosphericMotes();

    // Construcción de las 25 esculturas académicas desde los módulos en js/objetos/
    this.buildAllScenes();

    // Pre-calentamiento y compilación GPU anticipada de shaders (elimina stutter en primera transición)
    this.precompileAllScenes();

    // Controles interactivos de rotación 360°, pan y zoom con ratón o táctil
    this.setupInteractiveControls();

    window.addEventListener("resize", () => this.onWindowResize());
    this.onWindowResize();
    this.clock = new THREE.Clock();
    this.animate();
  }

  setupMuseumLighting() {
    // 1. Luz Ambiental suave para contraste PBR profundo
    const amb = new THREE.AmbientLight(0xffffff, 0.42);
    this.scene.add(amb);

    // 1b. Luz de Hemisferio para gradiente natural entre cielo cálido y suelo pizarra
    const hemi = new THREE.HemisphereLight(0xfffbf2, 0x334155, 0.45);
    this.scene.add(hemi);

    // 2. Lucarna Cenital Principal con sombras suaves
    const skylight = new THREE.DirectionalLight(0xfff8ee, 1.35);
    skylight.position.set(4.5, 9.0, 5.5);
    skylight.castShadow = true;
    skylight.shadow.mapSize.width = 1024;
    skylight.shadow.mapSize.height = 1024;
    skylight.shadow.bias = -0.0002;
    skylight.shadow.radius = 2.0;
    this.scene.add(skylight);

    // 3. Luz de Relleno Lateral Suave (Elimina sombras duras en el lado sombrío)
    const fillLight = new THREE.DirectionalLight(0xe0f2fe, 0.55);
    fillLight.position.set(-5, 4, 3);
    this.scene.add(fillLight);

    // 4. Luz de Recorte (Rim Light) posterior para destacar siluetas
    const rimLight = new THREE.DirectionalLight(0xffedd5, 0.75);
    rimLight.position.set(-2, 3, -4);
    this.scene.add(rimLight);

    // 5. Foco cálido inferior para realzar relieves dorados y basamentos
    const bottomLight = new THREE.PointLight(0xffd700, 0.5, 12);
    bottomLight.position.set(1.6, -1.5, 3.8);
    this.scene.add(bottomLight);
  }

  createAtmosphericMotes() {
    const count = 75;
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = 1.6 + (Math.random() - 0.5) * 4.2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 3.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3.0;
    }
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.022,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });

    this.dustParticles = new THREE.Points(geom, mat);
    this.scene.add(this.dustParticles);
  }

  onWindowResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    this.updateCameraViewOffset();

    // Adaptación responsiva inteligente: evita recortes en pantallas de notebook, proyectores o ventanas estrechas
    const baseFov = 40;
    if (w < 1200 || h < 820) {
      const factorW = w < 1200 ? (1200 / w) : 1.0;
      const factorH = h < 820 ? (820 / h) : 1.0;
      this.camera.fov = Math.min(52, baseFov * Math.max(factorW * 0.92, factorH));
    } else {
      this.camera.fov = baseFov;
    }

    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  }

  updateCameraViewOffset() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (w > 1024) {
      const offsetX = -w * 0.16;
      this.camera.setViewOffset(w, h, offsetX, 0, w, h);
    } else if (w > 768) {
      const offsetX = -w * 0.08;
      this.camera.setViewOffset(w, h, offsetX, 0, w, h);
    } else {
      this.camera.clearViewOffset();
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     CONSTRUCCIÓN MODULAR DE LAS 20 ESCULTURAS ACADÉMICAS
     ═══════════════════════════════════════════════════════════════════════════ */
  buildAllScenes() {
    for (let i = 1; i <= 25; i++) {
      const id = `anim_${String(i).padStart(2, "0")}`;
      const group = new THREE.Group();
      group.position.set(1.6, 0, 0);
      group.visible = i === 1;
      this.scenes[id] = group;
      this.scene.add(group);

      const objDef = window.Presentation3D_Objects?.[id];
      if (objDef && typeof objDef.build === "function") {
        objDef.build(this, group);
      }
    }
  }

  /**
   * Precompila exhaustivamente los shaders, texturas y geometrías en la GPU
   * de forma individual por escena, garantizando 0ms de stutter en primera transición.
   */
  precompileAllScenes() {
    try {
      // 1. Ocultar todas las escenas inicialmente
      Object.keys(this.scenes).forEach((k) => {
        this.scenes[k].visible = false;
      });

      // 2. Calentar y compilar cada una de las 25 escenas individualmente
      // Esto fuerza a Three.js y al driver GPU a:
      // a) Compilar el shader exacto correspondiente a las luces propias de cada escena
      // b) Subir las geometrías complejas (Extrude/Tube) y CanvasTextures a la VRAM
      for (let i = 1; i <= 25; i++) {
        const id = `anim_${String(i).padStart(2, "0")}`;
        const grp = this.scenes[id];
        if (!grp) continue;

        grp.visible = true;

        const camCfg = this.cameraTargets[id] || { pos: [2.3, 1.4, 6.8], lookAt: [1.4, 0.2, 0] };
        this.camera.position.set(camCfg.pos[0], camCfg.pos[1], camCfg.pos[2]);
        this.camera.lookAt(camCfg.lookAt[0], camCfg.lookAt[1], camCfg.lookAt[2]);
        this.camera.updateMatrixWorld();

        this.renderer.compile(this.scene, this.camera);
        this.renderer.render(this.scene, this.camera);

        grp.visible = false;
      }

      // 3. Restaurar escena canónica inicial (anim_01)
      const firstId = "anim_01";
      this.currentSceneId = firstId;
      if (this.scenes[firstId]) {
        this.scenes[firstId].visible = true;
      }
      const firstCam = this.cameraTargets[firstId] || { pos: [2.3, 1.4, 6.8], lookAt: [1.4, 0.2, 0] };
      this.targetCamPos.set(...firstCam.pos);
      this.targetLookAt.set(...firstCam.lookAt);
      this.currentCamPos.copy(this.targetCamPos);
      this.currentLookAt.copy(this.targetLookAt);
      this.camera.position.copy(this.currentCamPos);
      this.camera.lookAt(this.currentLookAt);
      this.camera.updateMatrixWorld();
      this.renderer.render(this.scene, this.camera);
    } catch (err) {
      console.warn("Warmup WebGL individual:", err);
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     SISTEMA DE INTERACCIÓN 3D: ROTACIÓN 360°, PAN Y ZOOM CON RATÓN / TÁCTIL
     ═══════════════════════════════════════════════════════════════════════════ */
  setupInteractiveControls() {
    this.canvas.style.cursor = "grab";

    this.canvas.addEventListener("pointerdown", (e) => {
      this.isDragging = true;
      this.dragButton = e.button;
      this.previousPointerPos = { x: e.clientX, y: e.clientY };
      this.canvas.style.cursor = "grabbing";
      try { this.canvas.setPointerCapture(e.pointerId); } catch (_) {}
    });

    window.addEventListener("pointermove", (e) => {
      if (!this.isDragging) return;
      const deltaX = e.clientX - this.previousPointerPos.x;
      const deltaY = e.clientY - this.previousPointerPos.y;
      this.previousPointerPos = { x: e.clientX, y: e.clientY };

      if (this.dragButton === 0 && !e.shiftKey) {
        this.targetUserRotation.y += deltaX * 0.0075;
        this.targetUserRotation.x += deltaY * 0.0055;
        this.targetUserRotation.x = Math.max(-0.65, Math.min(0.65, this.targetUserRotation.x));
      } else {
        this.targetUserPan.x += deltaX * 0.0035;
        this.targetUserPan.y -= deltaY * 0.0035;
        this.targetUserPan.x = Math.max(-1.8, Math.min(1.8, this.targetUserPan.x));
        this.targetUserPan.y = Math.max(-1.2, Math.min(1.2, this.targetUserPan.y));
      }
    });

    const stopDrag = (e) => {
      if (this.isDragging) {
        this.isDragging = false;
        this.canvas.style.cursor = "grab";
        try { if (e && e.pointerId) this.canvas.releasePointerCapture(e.pointerId); } catch (_) {}
      }
    };
    window.addEventListener("pointerup", stopDrag);
    window.addEventListener("pointercancel", stopDrag);

    // Zoom Progresivo con Rueda del Ratón
    this.canvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * 0.0022;
      this.targetUserZoom = Math.max(-3.5, Math.min(4.5, this.targetUserZoom + zoomDelta));
    }, { passive: false });

    // Doble clic para centrar la escultura
    this.canvas.addEventListener("dblclick", () => {
      this.resetUserControls();
    });

    // Gestos multitáctiles (Pinch-to-zoom en celulares y tablets)
    let initialTouchDist = 0;
    this.canvas.addEventListener("touchstart", (e) => {
      if (e.touches.length === 2) {
        initialTouchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    }, { passive: true });

    this.canvas.addEventListener("touchmove", (e) => {
      if (e.touches.length === 2 && initialTouchDist > 0) {
        const currentDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const diff = (initialTouchDist - currentDist) * 0.006;
        this.targetUserZoom = Math.max(-3.5, Math.min(4.5, this.targetUserZoom + diff));
        initialTouchDist = currentDist;
      }
    }, { passive: true });
  }

  /** Restablece la rotación, desplazamiento y zoom a su pose canónica */
  resetUserControls() {
    if (window.gsap) {
      gsap.to(this.targetUserRotation, { x: 0, y: 0, duration: 0.6, ease: "power2.out" });
      gsap.to(this.targetUserPan, { x: 0, y: 0, duration: 0.6, ease: "power2.out" });
      gsap.to(this, { targetUserZoom: 0, duration: 0.6, ease: "power2.out" });
    } else {
      this.targetUserRotation = { x: 0, y: 0 };
      this.targetUserPan = { x: 0, y: 0 };
      this.targetUserZoom = 0;
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     TRANSICIÓN CINEMATOGRÁFICA ENTRE FILMINAS (GSAP)
     ═══════════════════════════════════════════════════════════════════════════ */
  switchScene(targetId, direction = 1) {
    if (targetId === this.currentSceneId && this.scenes[targetId]?.visible) return;

    const oldId = this.currentSceneId;
    const oldGroup = this.scenes[oldId];
    const newGroup = this.scenes[targetId];

    this.currentSceneId = targetId;

    // Detectar si el usuario está realizando una transición rápida (< 280ms)
    const now = performance.now();
    const isRapid = (now - (this.lastSwitchTime || 0)) < 280;
    this.lastSwitchTime = now;

    // 1. CANCELAR TRANSICIONES PREVIAS Y GARANTIZAR ESTADO LIMPIO
    if (window.gsap) {
      gsap.killTweensOf(this.transitionState.exitOffset);
      gsap.killTweensOf(this.transitionState.enterOffset);
      gsap.killTweensOf(this.targetCamPos);
      gsap.killTweensOf(this.targetLookAt);
    }

    // Ocultar cualquier grupo saliente previo interrumpido
    if (this.transitionState.exitingGroup && this.transitionState.exitingGroup !== newGroup) {
      this.transitionState.exitingGroup.visible = false;
      this.transitionState.exitingGroup = null;
    }

    // REGLA CRÍTICA DE RECURSOS: Forzar que NINGUNA escena ajena quede visible en GPU
    Object.keys(this.scenes).forEach((k) => {
      if (k !== targetId && k !== oldId) {
        this.scenes[k].visible = false;
      }
    });

    // Restablecer amortiguadamente las modificaciones de usuario
    this.resetUserControls();

    // Duraciones reactivas según velocidad de navegación
    const exitDuration  = isRapid ? 0.16 : 0.40;
    const enterDuration = isRapid ? 0.22 : 0.55;
    const camDuration   = isRapid ? 0.30 : 0.65;

    // 2. Interpolación de Cámara Cinemática al nuevo ángulo canónico
    const camTarget = this.cameraTargets[targetId] || { pos: [2.3, 1.4, 6.8], lookAt: [1.4, 0.2, 0] };
    if (window.gsap) {
      gsap.to(this.targetCamPos, {
        x: camTarget.pos[0],
        y: camTarget.pos[1],
        z: camTarget.pos[2],
        duration: camDuration,
        ease: "power2.out"
      });
      gsap.to(this.targetLookAt, {
        x: camTarget.lookAt[0],
        y: camTarget.lookAt[1],
        z: camTarget.lookAt[2],
        duration: camDuration,
        ease: "power2.out"
      });
    } else {
      this.targetCamPos.set(...camTarget.pos);
      this.targetLookAt.set(...camTarget.lookAt);
      this.currentCamPos.copy(this.targetCamPos);
      this.currentLookAt.copy(this.targetLookAt);
    }

    if (!newGroup) return;

    if (!window.gsap || !oldGroup || isRapid) {
      // En navegación rápida, ocultar de inmediato el anterior para no duplicar carga en GPU
      if (oldGroup) {
        oldGroup.visible = false;
      }
      this.transitionState.exitingGroup = null;
    }

    // 3. Transición cinemática de retroceso y avance sin solapamientos
    newGroup.visible = true;

    const lateralDir = direction >= 0 ? 1 : -1;

    if (oldGroup && !isRapid && window.gsap) {
      this.transitionState.exitingGroup = oldGroup;
      this.transitionState.exitOffset = { x: 0, y: 0, z: 0, scale: 1 };
      gsap.to(this.transitionState.exitOffset, {
        x: -1.0 * lateralDir,
        y: -0.10,
        z: -1.0,
        scale: 0.88,
        duration: exitDuration,
        ease: "power2.in",
        onComplete: () => {
          if (oldGroup) oldGroup.visible = false;
          if (this.transitionState.exitingGroup === oldGroup) {
            this.transitionState.exitingGroup = null;
          }
        }
      });
    } else {
      this.transitionState.exitingGroup = null;
      if (oldGroup) oldGroup.visible = false;
    }

    this.transitionState.enterOffset = {
      x: (isRapid ? 0.5 : 1.1) * lateralDir,
      y: 0.08,
      z: isRapid ? -0.4 : -0.9,
      scale: isRapid ? 0.94 : 0.88,
      rotY: (isRapid ? 0.15 : 0.35) * lateralDir
    };

    if (window.gsap) {
      gsap.to(this.transitionState.enterOffset, {
        x: 0,
        y: 0,
        z: 0,
        scale: 1,
        rotY: 0,
        duration: enterDuration,
        ease: "power2.out"
      });
    } else {
      this.transitionState.enterOffset = { x: 0, y: 0, z: 0, scale: 1, rotY: 0 };
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     LOOP DE RENDERIZADO Y FÍSICA CINEMÁTICA (RAF)
     ═══════════════════════════════════════════════════════════════════════════ */
  animate() {
    requestAnimationFrame(() => this.animate());

    // Suspender renderizado GPU si la pestaña está oculta o minimizada
    if (document.hidden) return;

    const dt = Math.min(this.clock.getDelta(), 0.05);
    const t  = this.clock.getElapsedTime();

    // Lerp adaptativo e independiente de la tasa de refresco (60Hz, 120Hz, 144Hz)
    const smoothFactor = 1 - Math.exp(-14 * dt);
    const userFactor   = 1 - Math.exp(-12 * dt);

    // 1. Amortiguación e interpolación suave (Lerp) de las órdenes del usuario
    this.userRotation.x += (this.targetUserRotation.x - this.userRotation.x) * userFactor;
    this.userRotation.y += (this.targetUserRotation.y - this.userRotation.y) * userFactor;
    this.userZoom += (this.targetUserZoom - this.userZoom) * userFactor;
    this.userPan.x += (this.targetUserPan.x - this.userPan.x) * userFactor;
    this.userPan.y += (this.targetUserPan.y - this.userPan.y) * userFactor;

    // 2. Zoom Progresivo con Rueda: Dolly de la cámara respecto al objeto (Zero GC)
    this._tmpCamDir.subVectors(this.targetCamPos, this.targetLookAt).normalize();
    const baseDist = this.targetCamPos.distanceTo(this.targetLookAt);
    const effectiveDist = Math.max(2.2, Math.min(12.5, baseDist + this.userZoom));

    this._tmpDesiredCamPos
      .copy(this.targetLookAt)
      .addScaledVector(this._tmpCamDir, effectiveDist);

    this._tmpDesiredCamPos.x += this.userPan.x;
    this._tmpDesiredCamPos.y += this.userPan.y;

    this._tmpDesiredLookAt
      .copy(this.targetLookAt);
    this._tmpDesiredLookAt.x += this.userPan.x;
    this._tmpDesiredLookAt.y += this.userPan.y;

    this.currentCamPos.lerp(this._tmpDesiredCamPos, smoothFactor);
    this.currentLookAt.lerp(this._tmpDesiredLookAt, smoothFactor);
    this.camera.position.copy(this.currentCamPos);
    this.camera.lookAt(this.currentLookAt);

    // 3. Motes dorados de polvo en lenta deriva atmosférica
    if (this.dustParticles) {
      this.dustParticles.rotation.y = t * 0.006;
    }

    // 4. Aplicar rotación orbital y desplazamiento interactivo a la escultura 3D activa
    const activeGroup = this.scenes[this.currentSceneId];
    if (activeGroup) {
      const enter = this.transitionState?.enterOffset || { x: 0, y: 0, z: 0, scale: 1, rotY: 0 };
      activeGroup.position.x = 1.6 + this.userPan.x + enter.x;
      activeGroup.position.y = this.userPan.y + enter.y;
      activeGroup.position.z = enter.z;
      activeGroup.rotation.y = this.userRotation.y + enter.rotY;
      activeGroup.rotation.x = this.userRotation.x;
      activeGroup.scale.setScalar(enter.scale !== undefined ? enter.scale : 1);
    }

    // 4b. Escultura saliente en suave retroceso de galería
    const exitingGroup = this.transitionState?.exitingGroup;
    if (exitingGroup && exitingGroup !== activeGroup) {
      const exit = this.transitionState.exitOffset;
      exitingGroup.position.x = 1.6 + exit.x;
      exitingGroup.position.y = exit.y;
      exitingGroup.position.z = exit.z;
      exitingGroup.scale.setScalar(exit.scale !== undefined ? exit.scale : 1);
    }

    // 5. Animación modular delegada a la escultura activa
    const activeObj = window.Presentation3D_Objects?.[this.currentSceneId];
    if (activeObj && typeof activeObj.animate === "function") {
      activeObj.animate(this, t);
    }

    this.renderer.render(this.scene, this.camera);
  }
}

// ── Inyección de Materiales y Helpers en el Prototipo del Motor 3D ──
if (window.Scene3DMaterials) {
  Object.assign(Presentation3D.prototype, window.Scene3DMaterials);
}
if (window.Scene3DHelpers) {
  Object.assign(Presentation3D.prototype, window.Scene3DHelpers);
}

// Exportación global para app.js
window.Presentation3D = Presentation3D;
