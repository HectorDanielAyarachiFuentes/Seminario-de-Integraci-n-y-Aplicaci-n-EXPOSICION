import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const KIT = join(dirname(fileURLToPath(import.meta.url)), "..", "kit");
const strip = (file) => readFileSync(join(KIT, file), "utf8").replace(/^export /gm, "");

export function kitScript() {
  return strip("iso-kit.mjs")
    .replace(/function pageHtml[\s\S]*?\n}\n/m, "")
    .replace(/function plateHtml[\s\S]*?\n}\n/m, "")
    .replace(/function figureSvg[\s\S]*?\n}\n/m, "")
    .replace(/const PAGE_CSS = `[\s\S]*?`;\n/m, "")
    .replace(/const ISO_CSS = `[\s\S]*?`;\n/m, "");
}

export function glScript() {
  return strip("gl.mjs");
}

export function turnScript() {
  return strip("turn.mjs");
}

export function fixedScript() {
  return strip("turn-fixed.mjs") + "\n" + strip("canvas-painter.mjs");
}

export function glSharedScript() {
  return strip("gl-shared.mjs");
}
