/**
 * COMPILADOR MAESTRO DE LA FÁBRICA ANATOMY-KIT
 * Genera el reproductor interactivo universal de las 25 filminas
 * y los archivos independientes para cada filmina del TFG.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  baseCircularPodio,
  columnaElevacion,
  atrilTablero
} from "./pieces.mjs";
import { SLIDE_ARTIFACTS } from "./slide-artifacts.mjs";
import { ensamblarEscena } from "./builder.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "../..");
const EXAMPLES_TFG = join(HERE, "../examples/tfg-lectern");
const SLIDES_DIR = join(HERE, "../examples/slides");

try {
  mkdirSync(SLIDES_DIR, { recursive: true });
} catch (e) {}

console.log("Compilando lámina maestra interactiva de las 25 filminas...");

const { html } = ensamblarEscena({
  fig: "Fig 1",
  title: "Atril de Tesina · CURZAS UNCo",
  hint: "Giro 360° · Arrastra · Rueda Zoom",
  readout: "Giro: 42° · Inclinación: 32.0° · Zoom: 100% · Pág: 1 / 248 · Defensa iniciada",
  caption:
    "Dispositivo Isométrico 3D de la Defensa de Tesina (Licenciatura en Gestión de Recursos Humanos, CURZAS — Universidad Nacional del Comahue). Ensamblado con la Fábrica Modular sobre el podio circular de mármol y base azul UNCo.",
  renderBaseFn: (P) => baseCircularPodio(P),
  renderSupportFn: (P, tilt) => columnaElevacion(P, tilt),
  renderDeskFn: (tilt, P, view, light) => atrilTablero(tilt, P, view, light),
  renderSubjectFn: (tilt, pageFlip, P, view, light) => SLIDE_ARTIFACTS[1](tilt, pageFlip, P, view, light)
});

// Guardar embed maestro
writeFileSync(join(EXAMPLES_TFG, "embed.html"), html);
writeFileSync(join(EXAMPLES_TFG, "tfg-lectern-light.html"), html);
writeFileSync(join(HERE, "viewer.html"), html);

// Compilar versiones fijas individuales para cada una de las 25 filminas
for (let s = 1; s <= 25; s++) {
  const slideHtml = html.replace(
    /let currentSlide = 1;/,
    `let currentSlide = ${s};`
  ).replace(
    /<span class="iso-plate-corner" data-corner="fig">Fig 1<\/span>/,
    `<span class="iso-plate-corner" data-corner="fig">Fig ${s}</span>`
  );
  writeFileSync(join(SLIDES_DIR, `slide-${s}.html`), slideHtml);
}

console.log("✅ ¡Compilación completada con éxito!");
console.log("   - Lámina universal en: anatomy-kit/examples/tfg-lectern/embed.html");
console.log("   - Visor maestro en:    anatomy-kit/factory/viewer.html");
console.log("   - 25 filminas listas:  anatomy-kit/examples/slides/slide-[1-25].html");
