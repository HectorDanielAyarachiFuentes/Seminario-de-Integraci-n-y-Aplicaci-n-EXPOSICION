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
   * Cartela de Museo de Alta Distinción en 3D (Ultra-HD Retina con Filete de Oro y Remaches)
   * Autoajuste milimétrico, tipografía institucional Cinzel/Inter y protección contra clipping
   */
  createLabelSprite(title, subtitle = "", color = "#0f2d59", isMain = false, customScale = null, opts = {}) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Factor de super-muestreo Retina para nitidez cristalina en proyectores y pantallas 4K
    const retina = 2;

    // Medición base de textos
    ctx.font = isMain ? "bold 38px 'Cinzel', Georgia, serif" : "bold 30px 'Inter', Arial, sans-serif";
    const titleWidth = ctx.measureText(title).width;
    ctx.font = "600 22px 'Inter', Arial, sans-serif";
    const subWidth = subtitle ? ctx.measureText(subtitle).width : 0;

    const maxTextWidth = Math.max(titleWidth, subWidth);
    const logicalWidth = Math.min(1300, Math.max(680, Math.round(maxTextWidth + 140)));
    const logicalHeight = subtitle ? 210 : 150;

    canvas.width = logicalWidth * retina;
    canvas.height = logicalHeight * retina;
    ctx.scale(retina, retina);

    const paddingX = 14, paddingY = 14;
    const w = logicalWidth - paddingX * 2;
    const h = logicalHeight - paddingY * 2;
    const r = 18;

    // 1. Sombra volumétrica de placa de galería
    ctx.shadowColor = "rgba(15, 23, 42, 0.28)";
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 8;

    // 2. Fondo de Mármol Marfil Cálido y Traslúcido con degradado sutil
    const gradBg = ctx.createLinearGradient(0, paddingY, 0, paddingY + h);
    gradBg.addColorStop(0, "rgba(255, 255, 255, 0.99)");
    gradBg.addColorStop(0.5, "rgba(253, 251, 247, 0.98)");
    gradBg.addColorStop(1, "rgba(247, 243, 235, 0.97)");
    ctx.fillStyle = gradBg;

    // Borde exterior de oro envejecido labrado
    ctx.strokeStyle = "#c5a059";
    ctx.lineWidth = 4;

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

    // 3. Filete interior refinado de latón
    ctx.shadowColor = "transparent";
    ctx.strokeStyle = "rgba(180, 131, 36, 0.45)";
    ctx.lineWidth = 1.5;
    const innerOffset = 6;
    ctx.strokeRect(paddingX + innerOffset, paddingY + innerOffset, w - innerOffset * 2, h - innerOffset * 2);

    // 4. Remaches ornamentales de orfebrería en las 4 esquinas de la placa
    const rivetDist = 16;
    const corners = [
      { x: paddingX + rivetDist, y: paddingY + rivetDist },
      { x: paddingX + w - rivetDist, y: paddingY + rivetDist },
      { x: paddingX + rivetDist, y: paddingY + h - rivetDist },
      { x: paddingX + w - rivetDist, y: paddingY + h - rivetDist }
    ];
    corners.forEach(c => {
      // Borde del remache
      ctx.fillStyle = "#b48324";
      ctx.beginPath();
      ctx.arc(c.x, c.y, 4, 0, Math.PI * 2);
      ctx.fill();
      // Reflejo central brillante
      ctx.fillStyle = "#fff8db";
      ctx.beginPath();
      ctx.arc(c.x - 1, c.y - 1, 1.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // 5. Título Institucional Grabado
    const fontTitleSize = isMain ? (logicalWidth > 900 ? 34 : 38) : (logicalWidth > 900 ? 28 : 31);
    ctx.font = isMain ? `bold ${fontTitleSize}px 'Cinzel', Georgia, serif` : `bold ${fontTitleSize}px 'Inter', Arial, sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const titleY = subtitle ? (paddingY + h * 0.35) : (logicalHeight / 2);
    ctx.fillText(title, logicalWidth / 2, titleY);

    // 6. Línea divisoria de filigrana con rombo central y subtítulo
    if (subtitle) {
      const lineY = paddingY + h * 0.56;
      ctx.strokeStyle = "rgba(180, 131, 36, 0.35)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(logicalWidth / 2 - 85, lineY);
      ctx.lineTo(logicalWidth / 2 - 12, lineY);
      ctx.moveTo(logicalWidth / 2 + 12, lineY);
      ctx.lineTo(logicalWidth / 2 + 85, lineY);
      ctx.stroke();

      // Rombo de latón central
      ctx.fillStyle = "#d4af37";
      ctx.beginPath();
      ctx.moveTo(logicalWidth / 2, lineY - 3.5);
      ctx.lineTo(logicalWidth / 2 + 4, lineY);
      ctx.lineTo(logicalWidth / 2, lineY + 3.5);
      ctx.lineTo(logicalWidth / 2 - 4, lineY);
      ctx.closePath();
      ctx.fill();

      // Subtítulo
      const fontSubSize = isMain ? 21 : 19;
      ctx.font = `600 ${fontSubSize}px 'Inter', Arial, sans-serif`;
      ctx.fillStyle = isMain ? "#996515" : "#475569";
      ctx.fillText(subtitle, logicalWidth / 2, paddingY + h * 0.76);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;

    // Desactivar depthTest por defecto en rótulos flotantes para erradicar el clipping con geometrías
    const depthTestVal = opts?.depthTest !== undefined ? opts.depthTest : false;

    const spriteMat = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthTest: depthTestVal,
      depthWrite: false
    });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.renderOrder = opts?.renderOrder || (isMain ? 150 : 120);

    const aspect = logicalWidth / logicalHeight;
    if (customScale) {
      const scaleMultiplier = 1.35;
      sprite.scale.set(customScale.x * scaleMultiplier, (customScale.x * scaleMultiplier) / aspect, 1);
    } else {
      const targetWidth = isMain ? 1.55 : 1.15;
      sprite.scale.set(targetWidth, targetWidth / aspect, 1);
    }

    return sprite;
  },

  /**
   * Generador de Atril / Peana de Museo Físico 3D para Cartelas
   * Ancla la cartela al suelo o a un peldaño con una elegante varilla de latón torneado y base biselada
   */
  createMuseumPlaqueStand(title, subtitle = "", color = "#0f2d59", standHeight = 0.35, customScale = null) {
    const standGroup = new THREE.Group();

    // 1. Zócalo circular inferior de latón dorado
    const baseGeo = new THREE.CylinderGeometry(0.08, 0.10, 0.03, 24);
    const baseMesh = new THREE.Mesh(baseGeo, this.brassMat(0xd4af37));
    baseMesh.position.y = 0.015;
    standGroup.add(baseMesh);

    // 2. Varilla / Pie de apoyo torneado
    const rodGeo = new THREE.CylinderGeometry(0.014, 0.014, standHeight, 16);
    const rodMesh = new THREE.Mesh(rodGeo, this.brassMat(0xd4af37));
    rodMesh.position.y = standHeight / 2;
    standGroup.add(rodMesh);

    // 3. Cabezal articulado con rótula
    const jointGeo = new THREE.SphereGeometry(0.024, 16, 16);
    const jointMesh = new THREE.Mesh(jointGeo, this.brassMat(0xffd700));
    jointMesh.position.y = standHeight;
    standGroup.add(jointMesh);

    // 4. Cartela Sprite montada sobre la rótula
    const plaqueSprite = this.createLabelSprite(title, subtitle, color, false, customScale, { depthTest: false, renderOrder: 130 });
    plaqueSprite.position.y = standHeight + 0.16;
    standGroup.add(plaqueSprite);

    return standGroup;
  }
};
