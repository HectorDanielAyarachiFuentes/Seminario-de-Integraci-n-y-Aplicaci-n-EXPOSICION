/**
 * =============================================================================
 * OBJETOS 3D — HELPERS Y GENERADORES GEOMÉTRICOS COMUNES (ALTA RESOLUCIÓN)
 * Presentación de Tesina • CURZAS - UNCo
 * =============================================================================
 * Provee funciones para pedestales de museo de granito biselado, columnas dóricas
 * acanaladas, aros armilares de latón y cartelas vectoriales nítidas en 3D (Retina 2X).
 */

window.Scene3DHelpers = {
  /** Pedestal clásico de museo de doble nivel para soportar cada escultura con máxima distinción */
  createMuseumPlinth(parent, radius = 1.45, height = 0.22) {
    const plinth = new THREE.Group();

    // 1. Zócalo inferior de granito negro pulido con chaflán
    const baseGeo = new THREE.CylinderGeometry(radius * 1.06, radius * 1.12, height * 0.65, 48);
    const baseMesh = new THREE.Mesh(baseGeo, this.graniteMat(0x0f172a, 0.35, 0.25));
    baseMesh.position.y = -1.22;
    baseMesh.receiveShadow = true;
    plinth.add(baseMesh);

    // 2. Meseta superior de mármol marfil o granito noble
    const topGeo = new THREE.CylinderGeometry(radius, radius * 1.04, height * 0.55, 48);
    const topMesh = new THREE.Mesh(topGeo, this.marbleMat(0xf8fafc, 0.25));
    topMesh.position.y = -1.22 + height * 0.55;
    topMesh.receiveShadow = true;
    plinth.add(topMesh);

    // 3. Moldura de latón dorado labrado entre ambos niveles
    const rimGeo = new THREE.TorusGeometry(radius * 1.02, 0.018, 16, 64);
    const rimMesh = new THREE.Mesh(rimGeo, this.brassMat(0xd4af37));
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = -1.22 + height * 0.28;
    plinth.add(rimMesh);

    // 4. Disco de sombra de contacto suave bajo el pedestal
    const shadowGeo = new THREE.CircleGeometry(radius * 1.25, 32);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x050811,
      transparent: true,
      opacity: 0.32,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.22 - height * 0.33;
    plinth.add(shadowMesh);

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

  /**
   * Generador de Columnas Clásicas Acanaladas con Capitel y Base Moldurada
   * Convierte cilindros planos en piezas de arquitectura monumental
   */
  createClassicalColumn(height = 1.0, radius = 0.1, hexColor = 0xd4af37, isFluted = true) {
    const colGroup = new THREE.Group();

    // 1. Base Ática (Plinto cuadrado + Toro de latón + Escocia)
    const plinthBox = new THREE.Mesh(
      new THREE.BoxGeometry(radius * 2.8, radius * 0.6, radius * 2.8),
      this.graniteMat(0x1e293b)
    );
    plinthBox.position.y = -height / 2 + radius * 0.3;
    colGroup.add(plinthBox);

    const torusBase = new THREE.Mesh(
      new THREE.TorusGeometry(radius * 1.25, radius * 0.25, 16, 32),
      this.brassMat(hexColor)
    );
    torusBase.rotation.x = Math.PI / 2;
    torusBase.position.y = -height / 2 + radius * 0.75;
    colGroup.add(torusBase);

    // 2. Fuste de la Columna (Mármol blanco veteado)
    const shaft = new THREE.Mesh(
      new THREE.CylinderGeometry(radius * 0.92, radius, height * 0.8, 32),
      this.marbleMat(0xfdfbf7)
    );
    shaft.position.y = 0;
    colGroup.add(shaft);

    // 2b. Caneluras / Acanalado clásico en relieve si corresponde
    if (isFluted) {
      const flutesCount = 12;
      for (let f = 0; f < flutesCount; f++) {
        const a = (f * 2 * Math.PI) / flutesCount;
        const fx = Math.cos(a) * (radius * 0.96);
        const fz = Math.sin(a) * (radius * 0.96);
        const fluteLine = new THREE.Mesh(
          new THREE.CylinderGeometry(0.005, 0.005, height * 0.76, 8),
          this.brassMat(0xd4af37)
        );
        fluteLine.position.set(fx, 0, fz);
        colGroup.add(fluteLine);
      }
    }

    // 3. Capitel Dórico/Jónico (Equino + Ábaco con collarino de latón)
    const collar = new THREE.Mesh(
      new THREE.TorusGeometry(radius * 1.05, radius * 0.15, 16, 32),
      this.brassMat(hexColor)
    );
    collar.rotation.x = Math.PI / 2;
    collar.position.y = height / 2 - radius * 0.6;
    colGroup.add(collar);

    const capitalEchinus = new THREE.Mesh(
      new THREE.CylinderGeometry(radius * 1.5, radius * 0.95, radius * 0.5, 32),
      this.brassMat(hexColor)
    );
    capitalEchinus.position.y = height / 2 - radius * 0.35;
    colGroup.add(capitalEchinus);

    const capitalAbacus = new THREE.Mesh(
      new THREE.BoxGeometry(radius * 3.0, radius * 0.45, radius * 3.0),
      this.marbleMat(0xffffff)
    );
    capitalAbacus.position.y = height / 2;
    colGroup.add(capitalAbacus);

    return colGroup;
  },

  /**
   * Etiqueta 3D tipo Sprite vectorial nítida en Alta Resolución (Retina 2X)
   * Auto-ajusta el ancho y el tamaño de fuente para que NINGÚN texto quede truncado
   */
  createLabelSprite(title, subtitle = "", color = "#0f2d59", isMain = false, customScale = null) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Medición previa para autoajuste de ancho y evitar cualquier desborde
    ctx.font = isMain ? "bold 38px 'Cinzel', Georgia, serif" : "bold 32px 'Inter', Arial, sans-serif";
    const titleWidth = ctx.measureText(title).width;
    ctx.font = "600 24px 'Inter', Arial, sans-serif";
    const subWidth = subtitle ? ctx.measureText(subtitle).width : 0;

    const maxTextWidth = Math.max(titleWidth, subWidth);
    // Ancho dinámico con generoso margen de seguridad (mínimo 640px, hasta 1150px)
    const canvasWidth = Math.min(1200, Math.max(680, Math.round(maxTextWidth + 140)));
    const canvasHeight = subtitle ? 210 : 160;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Redibujar con el canvas ajustado
    const paddingX = 16, paddingY = 16;
    const w = canvasWidth - paddingX * 2;
    const h = canvasHeight - paddingY * 2;
    const r = 26;

    // Sombra suave en el canvas
    ctx.shadowColor = "rgba(15, 23, 42, 0.28)";
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 8;

    // Fondo pill académico blanco marfil traslúcido
    ctx.fillStyle = "rgba(255, 255, 255, 0.98)";
    ctx.strokeStyle = "#c5a059"; // Borde dorado
    ctx.lineWidth = 5;

    ctx.beginPath();
    ctx.moveTo(paddingX + r, paddingY);
    ctx.lineTo(paddingX + w - r, paddingY);
    ctx.quadraticCurveTo(paddingX + w, paddingY, paddingX + w, paddingY + r);
    ctx.lineTo(paddingX + w, paddingY + h - r);
    ctx.quadraticCurveTo(paddingX + w, paddingY + h, paddingX + w - r, paddingY + h);
    ctx.lineTo(paddingX + r, paddingY + h);
    ctx.quadraticCurveTo(paddingX, paddingY + h, paddingX, paddingY + h - r);
    ctx.lineTo(paddingX, paddingY + r);
    ctx.quadraticCurveTo(paddingX, paddingY, paddingX + r, paddingY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Línea interior sutil dorada
    ctx.shadowColor = "transparent";
    ctx.strokeStyle = "rgba(180, 131, 36, 0.35)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Texto Principal
    const fontTitleSize = isMain ? (canvasWidth > 900 ? 34 : 38) : (canvasWidth > 900 ? 28 : 32);
    ctx.font = isMain ? `bold ${fontTitleSize}px 'Cinzel', Georgia, serif` : `bold ${fontTitleSize}px 'Inter', Arial, sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(title, canvasWidth / 2, subtitle ? (paddingY + h * 0.38) : (canvasHeight / 2));

    // Subtítulo
    if (subtitle) {
      const fontSubSize = isMain ? 23 : 21;
      ctx.font = `600 ${fontSubSize}px 'Inter', Arial, sans-serif`;
      ctx.fillStyle = isMain ? "#b8860b" : "#475569";
      ctx.fillText(subtitle, canvasWidth / 2, paddingY + h * 0.72);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    const spriteMat = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthTest: true,
      depthWrite: false
    });
    const sprite = new THREE.Sprite(spriteMat);

    // Relación de aspecto natural en 3D para evitar distorsiones
    const aspect = canvasWidth / canvasHeight;

    if (customScale) {
      // Si nos dieron escala personalizada, respetamos las proporciones ampliadas
      const scaleMultiplier = 1.35;
      sprite.scale.set(customScale.x * scaleMultiplier, (customScale.x * scaleMultiplier) / aspect, 1);
    } else {
      // Escalas nítidas y generosas para lectura cómoda en la defensa
      const targetWidth = isMain ? 1.55 : 1.15;
      sprite.scale.set(targetWidth, targetWidth / aspect, 1);
    }

    return sprite;
  }
};
