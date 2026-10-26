# ARCHIVO Y RESERVA DE MODELOS SVG ISOMÉTRICOS 3D (ANATOMY-KIT)
**Seminario de Integración y Aplicación (SIA) • CURZAS - UNCo**
*Tesista: Tec. Sup. en RRHH Héctor Daniel Ayarachi Fuentes*

---

## 📌 Propósito de esta Carpeta
En este directorio se conservan y respaldan todos los desarrollos realizados con la tecnología de **SVG Isométrico 3D (Anatomy-Kit)** para su consulta, reutilización o exhibición futura.

La presentación interactiva principal oficial (`index.html`) utiliza el motor gráfico de **Three.js WebGL** con sus 25 esculturas hiperrealistas en segundo plano, sombras, iluminación de museo y transiciones cinemáticas.

---

## 📂 Contenido Guardado

1. **`visor_general.html`**:
   - Visor maestro interactivo que permite rotar 360°, hacer zoom, pan y cambiar dinámicamente entre las 25 filminas (`?slide=1` a `?slide=25`).

2. **`slides_1_a_25/`**:
   - 25 archivos HTML independientes (`slide-1.html` a `slide-25.html`) listos para ser abiertos en cualquier navegador sin dependencias ni servidor.
   - Cada filmina cuenta con su escultura isométrica renderizada con la base circular oficial del CURZAS-UNCo.

3. **`anatomy-kit/` (en la raíz del proyecto)**:
   - Contiene la **Fábrica Modular (`anatomy-kit/factory/`)**:
     - `builder.mjs`: Ensamblador de escenas isométricas y generador de runtime SVG.
     - `pieces.mjs`: Catálogo de piezas reutilizables (podio circular, columnas, gimbals, atriles).
     - `slide-artifacts.mjs`: Catálogo de los 25 artefactos conceptuales para cada filmina.
     - `build-all.mjs`: Script compilador para regenerar las 25 láminas con un solo comando (`node anatomy-kit/factory/build-all.mjs`).
