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

    this.init();
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     INICIALIZACIÓN DEL RENDERER Y ESCENA ACADÉMICA (GALERÍA BLANCA CLÁSICA)
     ═══════════════════════════════════════════════════════════════════════════ */
  init() {
    this.scene = new THREE.Scene();
    // Atmósfera de galería clásica en blanco marfil / luz de día
    this.scene.fog = new THREE.FogExp2(0xf4f6f9, 0.038);

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
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0xf4f6f9, 1);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Iluminación de museo / galería de esculturas clásicas con luz natural
    this.setupMuseumLighting();

    // Motes sutiles de polvo dorado de biblioteca bajo la luz del sol
    this.createAtmosphericMotes();

    // Construcción de las 20 esculturas académicas desde los módulos en js/objetos/
    this.buildAllScenes();

    // Controles interactivos de rotación 360°, pan y zoom con ratón o táctil
    this.setupInteractiveControls();

    window.addEventListener("resize", () => this.onWindowResize());
    this.clock = new THREE.Clock();
    this.animate();
  }

  setupMuseumLighting() {
    // 1. Luz Ambiental clara y envolvente de galería
    const amb = new THREE.AmbientLight(0xffffff, 0.95);
    this.scene.add(amb);

    // 2. Lucarna Cenital Superior (Simula el tragaluz de una rotonda clásica de museo)
    const skylight = new THREE.DirectionalLight(0xfffaed, 1.45);
    skylight.position.set(4, 8, 5);
    skylight.castShadow = true;
    skylight.shadow.mapSize.width = 2048;
    skylight.shadow.mapSize.height = 2048;
    skylight.shadow.bias = -0.0001;
    this.scene.add(skylight);

    // 3. Luz de Relleno Lateral Suave (Elimina sombras duras en el lado sombrío)
    const fillLight = new THREE.DirectionalLight(0xe8f0fe, 0.75);
    fillLight.position.set(-5, 3, 2);
    this.scene.add(fillLight);

    // 4. Luz de Recorte Inferior Cálida (Realza los contornos de bronce y mármol)
    const rimLight = new THREE.PointLight(0xffeedd, 1.1, 14);
    rimLight.position.set(1.6, -1.8, 3.5);
    this.scene.add(rimLight);
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
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.updateCameraViewOffset();
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  updateCameraViewOffset() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (w > 960) {
      const offsetX = -w * 0.16;
      this.camera.setViewOffset(w, h, offsetX, 0, w, h);
    } else {
      this.camera.clearViewOffset();
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     CONSTRUCCIÓN MODULAR DE LAS 20 ESCULTURAS ACADÉMICAS
     ═══════════════════════════════════════════════════════════════════════════ */
  buildAllScenes() {
    for (let i = 1; i <= 20; i++) {
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

    // Restablecer amortiguadamente las modificaciones de usuario
    this.resetUserControls();

    // 1. Interpolación de Cámara Cinemática al nuevo ángulo canónico
    const camTarget = this.cameraTargets[targetId] || { pos: [2.3, 1.4, 6.8], lookAt: [1.4, 0.2, 0] };
    if (window.gsap) {
      gsap.to(this.targetCamPos, {
        x: camTarget.pos[0],
        y: camTarget.pos[1],
        z: camTarget.pos[2],
        duration: 0.95,
        ease: "power2.inOut"
      });
      gsap.to(this.targetLookAt, {
        x: camTarget.lookAt[0],
        y: camTarget.lookAt[1],
        z: camTarget.lookAt[2],
        duration: 0.95,
        ease: "power2.inOut"
      });
    } else {
      this.targetCamPos.set(...camTarget.pos);
      this.targetLookAt.set(...camTarget.lookAt);
      this.currentCamPos.copy(this.targetCamPos);
      this.currentLookAt.copy(this.targetLookAt);
    }

    if (!newGroup) return;

    if (!window.gsap || !oldGroup) {
      Object.keys(this.scenes).forEach((k) => {
        this.scenes[k].visible = k === targetId;
      });
      return;
    }

    // 2. Transición cinemática de retroceso y avance sin solapamientos
    newGroup.visible = true;
    this.transitionState.exitingGroup = oldGroup;

    const lateralDir = direction >= 0 ? 1 : -1;

    this.transitionState.exitOffset = { x: 0, y: 0, z: 0, scale: 1 };
    gsap.to(this.transitionState.exitOffset, {
      x: -1.2 * lateralDir,
      y: -0.15,
      z: -1.4,
      scale: 0.82,
      duration: 0.55,
      ease: "power2.in",
      onComplete: () => {
        if (oldGroup) oldGroup.visible = false;
        this.transitionState.exitingGroup = null;
      }
    });

    this.transitionState.enterOffset = {
      x: 1.4 * lateralDir,
      y: 0.15,
      z: -1.2,
      scale: 0.85,
      rotY: 0.45 * lateralDir
    };

    gsap.to(this.transitionState.enterOffset, {
      x: 0,
      y: 0,
      z: 0,
      scale: 1,
      rotY: 0,
      duration: 0.85,
      delay: 0.12,
      ease: "power2.out"
    });
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     LOOP DE RENDERIZADO Y FÍSICA CINEMÁTICA (RAF)
     ═══════════════════════════════════════════════════════════════════════════ */
  animate() {
    requestAnimationFrame(() => this.animate());

    const t = this.clock.getElapsedTime();

    // 1. Amortiguación e interpolación suave (Lerp) de las órdenes del usuario
    this.userRotation.x += (this.targetUserRotation.x - this.userRotation.x) * 0.08;
    this.userRotation.y += (this.targetUserRotation.y - this.userRotation.y) * 0.08;
    this.userZoom += (this.targetUserZoom - this.userZoom) * 0.08;
    this.userPan.x += (this.targetUserPan.x - this.userPan.x) * 0.08;
    this.userPan.y += (this.targetUserPan.y - this.userPan.y) * 0.08;

    // 2. Zoom Progresivo con Rueda: Dolly de la cámara respecto al objeto
    const camDir = new THREE.Vector3().subVectors(this.targetCamPos, this.targetLookAt).normalize();
    const baseDist = this.targetCamPos.distanceTo(this.targetLookAt);
    const effectiveDist = Math.max(2.2, Math.min(12.5, baseDist + this.userZoom));

    const desiredCamPos = new THREE.Vector3()
      .copy(this.targetLookAt)
      .addScaledVector(camDir, effectiveDist);

    desiredCamPos.x += this.userPan.x;
    desiredCamPos.y += this.userPan.y;

    const desiredLookAt = new THREE.Vector3()
      .copy(this.targetLookAt)
      .add(new THREE.Vector3(this.userPan.x, this.userPan.y, 0));

    this.currentCamPos.lerp(desiredCamPos, 0.045);
    this.currentLookAt.lerp(desiredLookAt, 0.045);
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
    if (exitingGroup) {
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
