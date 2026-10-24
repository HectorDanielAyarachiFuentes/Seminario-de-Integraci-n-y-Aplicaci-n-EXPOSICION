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
  }
};
