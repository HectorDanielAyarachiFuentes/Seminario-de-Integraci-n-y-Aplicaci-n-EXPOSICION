/**
 * FILMINA 1: Atril Ceremonial y Gran Tomo de Tesina (CURZAS - UNCo)
 * Ensamblado con la Fábrica Modular de Anatomy-Kit y la Base Circular Escalonada.
 */
import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  baseCircularPodio,
  columnaElevacion,
  atrilTablero,
  tomoTesina
} from "../../factory/pieces.mjs";
import { ensamblarEscena } from "../../factory/builder.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));

const { html } = ensamblarEscena({
  fig: "Fig 1",
  title: "Atril de Tesina · CURZAS UNCo",
  hint: "Giro 360° · Arrastra · Rueda Zoom",
  readout: "Giro: 42° · Inclinación: 32.0° · Zoom: 100% · Pág: 1 / 248 · Defensa iniciada",
  caption:
    "El Gran Tomo Encuadernado de Tesina sobre Atril Ceremonial de Lectura (Licenciatura en Gestión de Recursos Humanos, CURZAS — Universidad Nacional del Comahue). Ensamblado sobre el podio circular escalonado de mármol y base azul UNCo.",
  renderBaseFn: (P) => baseCircularPodio(P),
  renderSupportFn: (P, tilt) => columnaElevacion(P, tilt),
  renderDeskFn: (tilt, P, view, light) => atrilTablero(tilt, P, view, light),
  renderSubjectFn: (tilt, pageFlip, P, view, light) => tomoTesina(tilt, pageFlip, P, view, light)
});

writeFileSync(join(HERE, "embed.html"), html);
writeFileSync(join(HERE, "tfg-lectern-light.html"), html);
console.log("Filmina 1 ensamblada con la Fábrica y Base Circular exitosamente!");
