/**
 * =============================================================================
 * OBJETOS 3D — HELPERS Y GENERADORES GEOMÉTRICOS COMUNES
 * Presentación de Tesina • CURZAS - UNCo
 * =============================================================================
 * Provee funciones para pedestales de museo de granito, aros armilares de latón
 * y cartelas vectoriales nítidas en 3D.
 */

window.Scene3DHelpers = {
  /** Pedestal clásico de museo para soportar cada escultura */
  createMuseumPlinth(parent, radius = 1.4, height = 0.18) {
    const plinth = new THREE.Group();

    // Base de granito
    const baseGeo = new THREE.CylinderGeometry(radius, radius * 1.06, height, 48);
    const baseMesh = new THREE.Mesh(baseGeo, this.graniteMat());
    baseMesh.position.y = -1.2;
    plinth.add(baseMesh);

    // Moldura o aro de latón superior
    const rimGeo = new THREE.TorusGeometry(radius * 0.98, 0.015, 16, 64);
    const rimMesh = new THREE.Mesh(rimGeo, this.brassMat());
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = -1.2 + height / 2;
    plinth.add(rimMesh);

    parent.add(plinth);
    return plinth;
  },

  /** Aro astronómico / armilar de latón */
  createBrassArmillaryRing(radius, tube = 0.018, parent) {
    const geo = new THREE.TorusGeometry(radius, tube, 24, 96);
    const mesh = new THREE.Mesh(geo, this.brassMat());
    if (parent) {
      parent.add(mesh);
    }
    return mesh;
  },

  /** Etiqueta 3D tipo Sprite vectorial nítida sobre cualquier perspectiva */
  createLabelSprite(title, subtitle = "", color = "#0f2d59", isMain = false, customScale = null) {
    const canvas = document.createElement("canvas");
    canvas.width = 440;
    canvas.height = 130;
    const ctx = canvas.getContext("2d");

    // Fondo pill académico nítido con marco fino de latón
    const x = 10, y = 10, w = 420, h = 110, r = 20;
    ctx.fillStyle = "rgba(255, 255, 255, 0.96)";
    ctx.strokeStyle = "#c5a059";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Texto principal
    ctx.font = isMain ? "bold 26px 'Cinzel', Georgia, serif" : "bold 23px 'Inter', Arial, sans-serif";
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(title, 220, subtitle ? 48 : 65);

    // Subtítulo
    if (subtitle) {
      ctx.font = "600 16px 'Inter', Arial, sans-serif";
      ctx.fillStyle = isMain ? "#b8860b" : "#475569";
      ctx.fillText(subtitle, 220, 82);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    const spriteMat = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthTest: true,
      depthWrite: false
    });
    const sprite = new THREE.Sprite(spriteMat);
    if (customScale) {
      sprite.scale.set(customScale.x, customScale.y, 1);
    } else {
      sprite.scale.set(isMain ? 0.72 : 0.22, isMain ? 0.22 : 0.16, 1);
    }
    return sprite;
  },

  /** Placa cartográfica 3D de museo biselada en latón y granito con remaches y tipografía de precisión */
  createPlaqueMesh(width, height, title, subtitle = "", opts = {}) {
    const group = new THREE.Group();

    // 1. Placa base sólida de latón dorado biselado
    const baseGeo = new THREE.BoxGeometry(width, height, 0.012);
    const baseMat = opts.baseMat || this.brassMat(opts.brassColor || 0xd4af37);
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    group.add(baseMesh);

    // Borde biselado resaltado en oro
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(baseGeo),
      new THREE.LineBasicMaterial({ color: 0xffe082, linewidth: 2 })
    );
    baseMesh.add(edges);

    // 2. Cara frontal grabada en alta resolución
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = Math.round(1024 * (height / width));
    if (canvas.height < 256) canvas.height = 256;
    const ctx = canvas.getContext("2d");
    const cw = canvas.width;
    const ch = canvas.height;

    const bg = opts.bgColor || "#0f172a";
    const border = opts.borderColor || "#d4af37";
    const textColor = opts.textColor || "#fdfbf7";
    const subColor = opts.subColor || "#c5a059";

    // Fondo noble
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, cw, ch);

    // Doble filete perimetral de latón
    ctx.strokeStyle = border;
    ctx.lineWidth = 12;
    ctx.strokeRect(8, 8, cw - 16, ch - 16);

    ctx.lineWidth = 3;
    ctx.strokeRect(22, 22, cw - 44, ch - 44);

    // Cuatro remaches esquineros dorados
    const rivetRadius = 7;
    const rivetOffset = 18;
    ctx.fillStyle = border;
    [
      [rivetOffset, rivetOffset],
      [cw - rivetOffset, rivetOffset],
      [rivetOffset, ch - rivetOffset],
      [cw - rivetOffset, ch - rivetOffset]
    ].forEach(([rx, ry]) => {
      ctx.beginPath();
      ctx.arc(rx, ry, rivetRadius, 0, Math.PI * 2);
      ctx.fill();
    });

    // Tipografía académica
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.font = "bold 44px 'Cinzel', Georgia, serif";
    ctx.fillStyle = textColor;
    ctx.fillText(title, cw / 2, subtitle ? ch * 0.40 : ch * 0.50);

    if (subtitle) {
      ctx.font = "600 24px 'Inter', Arial, sans-serif";
      ctx.fillStyle = subColor;
      ctx.fillText(subtitle, cw / 2, ch * 0.72);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    const faceMat = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.28,
      metalness: 0.35
    });

    const faceMesh = new THREE.Mesh(new THREE.PlaneGeometry(width * 0.96, height * 0.94), faceMat);
    faceMesh.position.z = 0.007; // apenas sobresaliendo de la base
    group.add(faceMesh);

    return group;
  }
};

