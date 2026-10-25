/**
 * =============================================================================
 * OBJETOS 3D — PALETA DE MATERIALES FÍSICOS DE ALTA FIDELIDAD (PBR PRO)
 * Presentación de Tesina • CURZAS - UNCo
 * =============================================================================
 * Fábrica de materiales PBR fotorrealistas con texturas procedurales en alta
 * resolución (mármol veteado, latón cepillado, granito moteado y cristal óptico).
 */

(function () {
  // Caché de texturas procedurales para optimizar memoria
  let _marbleTexture = null;
  let _brushedMetalTexture = null;
  let _graniteTexture = null;

  /** Genera textura procedural de mármol de Carrara blanco marfil con vetas grises y doradas */
  function getMarbleTexture() {
    if (_marbleTexture) return _marbleTexture;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");

    // Fondo base marfil
    ctx.fillStyle = "#faf8f5";
    ctx.fillRect(0, 0, 512, 512);

    // Vetas orgánicas superpuestas
    ctx.lineWidth = 2.5;
    for (let i = 0; i < 18; i++) {
      ctx.strokeStyle = i % 3 === 0 ? "rgba(180, 131, 36, 0.12)" : "rgba(100, 116, 139, 0.14)";
      ctx.beginPath();
      let x = Math.random() * 512;
      let y = 0;
      ctx.moveTo(x, y);
      while (y < 512) {
        x += (Math.random() - 0.5) * 35;
        y += 20 + Math.random() * 25;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    _marbleTexture = new THREE.CanvasTexture(canvas);
    _marbleTexture.wrapS = THREE.RepeatWrapping;
    _marbleTexture.wrapT = THREE.RepeatWrapping;
    return _marbleTexture;
  }

  /** Genera textura procedural de metal cepillado anisotropic con micro-ranuras */
  function getBrushedMetalTexture() {
    if (_brushedMetalTexture) return _brushedMetalTexture;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#888888";
    ctx.fillRect(0, 0, 512, 512);

    for (let y = 0; y < 512; y += 2) {
      const v = 128 + Math.floor((Math.random() - 0.5) * 45);
      ctx.fillStyle = `rgb(${v},${v},${v})`;
      ctx.fillRect(0, y, 512, 1.5);
    }

    _brushedMetalTexture = new THREE.CanvasTexture(canvas);
    _brushedMetalTexture.wrapS = THREE.RepeatWrapping;
    _brushedMetalTexture.wrapT = THREE.RepeatWrapping;
    return _brushedMetalTexture;
  }

  /** Genera textura procedural de granito oscuro con cristalización */
  function getGraniteTexture() {
    if (_graniteTexture) return _graniteTexture;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#1e293b";
    ctx.fillRect(0, 0, 512, 512);

    for (let i = 0; i < 4000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const r = Math.random() * 2.2;
      const isGold = Math.random() > 0.94;
      ctx.fillStyle = isGold
        ? "rgba(212, 175, 55, 0.45)"
        : (Math.random() > 0.5 ? "rgba(255, 255, 255, 0.18)" : "rgba(15, 23, 42, 0.6)");
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    _graniteTexture = new THREE.CanvasTexture(canvas);
    _graniteTexture.wrapS = THREE.RepeatWrapping;
    _graniteTexture.wrapT = THREE.RepeatWrapping;
    return _graniteTexture;
  }

  window.Scene3DMaterials = {
    /** Granito de basamento escultórico con motas de cristal y relieve táctil */
    graniteMat(color = 0x1e293b, roughness = 0.45, metalness = 0.2) {
      const tex = getGraniteTexture();
      return new THREE.MeshStandardMaterial({
        color,
        roughness,
        metalness,
        bumpMap: tex,
        bumpScale: 0.015
      });
    },

    /** Latón dorado noble de instrumentos renacentistas y molduras pulidas */
    brassMat(color = 0xd4af37, roughness = 0.22, metalness = 0.92) {
      const tex = getBrushedMetalTexture();
      return new THREE.MeshStandardMaterial({
        color,
        roughness,
        metalness,
        roughnessMap: tex
      });
    },

    /** Oro pulido de máxima pureza para blasones y coronas de laurel */
    goldMat(color = 0xffd700) {
      const tex = getBrushedMetalTexture();
      return new THREE.MeshStandardMaterial({
        color,
        roughness: 0.18,
        metalness: 0.95,
        roughnessMap: tex
      });
    },

    /** Mármol de Carrara blanco marfil con vetas orgánicas y brillo semimate */
    marbleMat(color = 0xfcfbf9, roughness = 0.28) {
      const tex = getMarbleTexture();
      return new THREE.MeshStandardMaterial({
        color,
        roughness,
        metalness: 0.04,
        map: tex,
        bumpMap: tex,
        bumpScale: 0.008
      });
    },

    /** Cristal óptico puro y vidrio arquitectónico de alta refracción, ultra liviano en GPU (sin render-target) */
    glassMat(color = 0xf8fafc, opts = {}) {
      const cleanOpts = { ...opts };
      delete cleanOpts.transmission;
      delete cleanOpts.thickness;
      delete cleanOpts.ior;

      return new THREE.MeshPhysicalMaterial({
        color,
        roughness: 0.08,
        metalness: 0.12,
        transparent: true,
        opacity: opts.opacity !== undefined ? opts.opacity : 0.65,
        clearcoat: 1.0,
        clearcoatRoughness: 0.04,
        reflectivity: 0.75,
        ...cleanOpts,
        transmission: 0
      });
    }
  };
})();
