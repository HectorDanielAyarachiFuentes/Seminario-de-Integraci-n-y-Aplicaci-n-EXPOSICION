/**
 * =============================================================================
 * OBJETOS 3D — PALETA DE MATERIALES ACADÉMICOS
 * Presentación de Tesina • CURZAS - UNCo
 * =============================================================================
 * Fábrica de materiales físicos PBR inspirados en museos y galerías clásicas:
 * Granito pulido, latón dorado envejecido, mármol de Carrara y cristal óptico.
 */

window.Scene3DMaterials = {
  /** Granito de basamento escultórico */
  graniteMat(color = 0x64748b, roughness = 0.55, metalness = 0.15) {
    return new THREE.MeshStandardMaterial({
      color,
      roughness,
      metalness
    });
  },

  /** Latón dorado noble de instrumentos renacentistas y astronómicos */
  brassMat(color = 0xd4af37, roughness = 0.28, metalness = 0.88) {
    return new THREE.MeshStandardMaterial({
      color,
      roughness,
      metalness
    });
  },

  /** Mármol de Carrara blanco marfil y alabastro */
  marbleMat(color = 0xfcfbf9, roughness = 0.35) {
    return new THREE.MeshStandardMaterial({
      color,
      roughness,
      metalness: 0.05
    });
  },

  /** Cristal óptico puro y vidrio esmerilado de vitrina */
  glassMat(color = 0xf8fafc, opts = {}) {
    return new THREE.MeshPhysicalMaterial({
      color,
      roughness: 0.12,
      transmission: 0.88,
      thickness: 0.9,
      ior: 1.5,
      transparent: true,
      opacity: 0.78,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      ...opts
    });
  }
};
