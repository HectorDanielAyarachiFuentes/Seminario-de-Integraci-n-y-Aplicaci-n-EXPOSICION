# 🎓 Sistema de Presentación Interactiva 3D — Defensa de Tesina (20 Filminas)

**Seminario de Integración y Aplicación (SIA 2025/2026)**  
**Centro Universitario Regional Zona Atlántica y Sur (CURZAS)**  
**Universidad Nacional del Comahue (UNCo)**  

* **Autor:** Tec. Sup. en RRHH Héctor Daniel Ayarachi Fuentes (Legajo N° 8252 — DNI N° 35.492.138)  
* **Cátedra:** Dra. Deborah Noguera, Esp. Federico Abeiro, Esp. María Cecilia Aguirre  
* **Marco Normativo:** Res. CD-CURZAS N° 266/23 | Normas APA 7ma Edición  
* **Duración estipulada:** 30 minutos cronometrados (~1.5 min por filmina)  

---

## 🌟 Arquitectura y Desacoplamiento de Metadatos

La presentación fue desarrollada con arquitectura **100% desacoplada**: todo el contenido textual, los cronometrajes, los guiones del orador, los diagramas vectoriales SVG y las respuestas al jurado residen en un archivo de datos externo:

```text
Presentacion/
├── index.html                   # Interfaz semántica con visor modal SVG y puntos WebGL
├── README.md                    # Manual de uso, atajos y catálogo de diagramas
├── assets/
│   ├── CURZAS.png               # Emblema oficial en alta resolución
│   ├── Sistemas-longo.svg       # Diagrama oficial de subsistemas (Francisco Longo, 2006)
│   ├── subsistemas_longo.svg    # Desglose operativo de estrategia y subsistemas de RRHH
│   ├── modelo_360.svg           # Arquitectura circular del modelo 360° en CURZAS
│   └── red_territorial.svg      # Mapeo territorial de Viedma y Nodos (Res. 196/2022)
├── css/
│   └── styles.css               # Estilos Glassmorphism de alto contraste, visor modal y HUD
├── data/
│   └── presentacion_data.js     # 📌 20 FILMINAS EDITABLES, GUIONES Y METADATOS
└── js/
    ├── scene3d.js               # Motor Three.js con 6 objetos conceptuales de segundo plano
    └── app.js                   # Controlador de 20 filminas, visor SVG y cronómetro 30 min
```

---

## 📐 Catálogo de Diagramas Vectoriales SVG Oficiales

Los diagramas pueden observarse de forma interactiva en pantalla completa mediante el botón que aparece en la tarjeta o con la tecla **`V`**:

1. **`assets/red_territorial.svg` (Filmina 4):** *Mapeo Territorial y Red de Nodos de Docencia Híbrida*. Distribución de la Sede Cabecera Viedma y los Nodos Territoriales de Sierra Grande, Valcheta, Los Menucos y Ramos Mexía bajo Res. CD-CURZA N° 196/2022.
2. **`assets/Sistemas-longo.svg` (Filmina 10):** *Subsistemas de la Gestión de Recursos Humanos (Francisco Longo, 2006)*. Modela la alineación estratégica, la planificación y la retroalimentación continua entre el Rendimiento y el Desarrollo Docente.
3. **`assets/modelo_360.svg` (Filmina 12):** *Arquitectura Circular del Modelo 360° en CURZAS*. Triangulación formativa de 4 cuadrantes (Autoevaluación, Pares, Estudiantes, Dirección) con blindaje de anonimato criptográfico y anclaje exclusivo en el Art. 76 (Capacitación Continua).
4. **`assets/subsistemas_longo.svg`:** *Estrategia y Subsistemas de RRHH (Detalle Operativo)*. Diagrama analítico ampliado con flujos de compensación, empleo y relaciones laborales.

---

## 📋 Estructura Canónica de las 25 Filminas Oficiales (30 Minutos)

* **Sección 1: Apertura, Autor y Esquemas de la Cátedra SIA (Filminas 1 a 5):**
  1. Carátula Oficial y Encuadre Académico (UNCo - CURZAS - SIA 2026).
  2. Presentación Personal del Tesista: Héctor Daniel Ayarachi Fuentes (Trayectoria, perfil y vocación pública).
  3. **Esquema SIA — TP N° 2 (Primera Parte):** Carátula, Tema de Investigación, Delimitación del Problema y Objetivos.
  4. **Esquema SIA — Segunda Parte:** Marco Teórico Sustantivo (Apartado 5) y Antecedentes/Estado del Arte (Apartado 6).
  5. **Esquema SIA — TP N° 4 (Tercera Parte Integral):** Metodología (7), Cronograma (8) y Viabilidad de Recursos (9).
* **Sección 2: Tiempo 1 — Objeto Problema, Territorio y Objetivos (Filminas 6 a 11):**
  6. El CURZAS en el Territorio: Sede Viedma y Despliegue en la Línea Sur y Costa Atlántica.
  7. **[SVG]** Mapeo Territorial y Mediaciones Tecnológicas: Docencia Híbrida (Res. 196/2022).
  8. Desnaturalización del Objeto de Investigación: De la Rutina al Objeto Científico (Wainerman & Sautu).
  9. La Tensión Estructural: Carrera Docente Sumativa (Art. 75) vs. Capacitación Continua (Art. 76).
  10. Pregunta General de Investigación y las Cinco Dimensiones Analíticas de Factibilidad.
  11. Matriz de Objetivos del TFG: Objetivo General y los 4 Objetivos Específicos.
* **Sección 3: Tiempo 2 — Marco Teórico Sustantivo y Estado del Arte (Filminas 12 a 17):**
  12. Posicionamiento Epistemológico (De la Garza) y Modelo Sistémico de Francisco Longo (2006).
  13. **[SVG]** Arquitectura de Subsistemas de Recursos Humanos (Diagrama Oficial de Longo).
  14. El Dispositivo 360° en Educación Superior: Lógica Formativa vs. Sumativa y Mitigación de Sesgos.
  15. **[SVG]** Arquitectura Circular del Modelo 360° en CURZAS y Blindaje Ético de Anonimato.
  16. Poligobernanza, Poder Compartido y Capacidades Estatales (Matus, Cao/Blutman y Oszlak).
  17. Estado del Arte (Internacional, Nacional, Regional) y Vacancia Disciplinar Comprobada.
* **Sección 4: Tiempo 3 — Metodología, Operacionalización y Recursos (Filminas 18 a 23):**
  18. Estrategia Metodológica y Diseño Mixto ($CUAL \rightarrow cuan$) en Estudio de Caso Situado (2027).
  19. Población, Muestra (8 Entrevistas en Profundidad + 45 Cuestionarios) y Técnicas.
  20. Matriz de Operacionalización en Cinco Dimensiones (Normativa, Técnica, Org., Cult., Gob.).
  21. Procedimiento, Fases del Trabajo de Campo (6 Fases / 7 Meses en 2027) y Cronograma.
  22. Viabilidad Integral del Proyecto: Recursos Humanos, Técnicos, Económicos y Avales (Apartado 9 del TP4).
  23. Garantías Éticas, Protección de Datos (Ley N° 25.326) y Cláusula de No Afectación Laboral.
* **Sección 5: Síntesis, Conclusiones y Despedida Formal (Filminas 24 y 25):**
  24. Síntesis de Factibilidad, Conclusiones y Valor Público Universitario.
  25. Despedida Formal, Reconocimiento al Equipo Docente del SIA y Apertura al Tribunal Evaluador.

---

## 🏛️ Catálogo de las 20 Esculturas Académicas 3D (Galería Institucional)

Cada filmina posee una pieza escultórica tridimensional inspirada en la tradición universitaria y las artes plásticas clásicas (mármol de Carrara, latón dorado cepillado, bronce escultórico, cristal esmerilado y plintos de granito pulido bajo iluminación de museo):
1. **Filmina 1:** *Esfera Armilar Renacentista*: base clásica con tres aros meridiano y eclíptica graduados de latón girando en torno al orbe universitario de marfil.
2. **Filmina 2:** *Monumento al Valor Social*: pedestal de mármol con tres anillos horizontales concéntricos de bronce ascendiendo armónicamente y gema de cristal.
3. **Filmina 3:** *Frontispicio Normativo (Res. 266/23)*: estilóbato de granito con 3 columnas jónicas de mármol, arquitrabe y frontón clásico de latón.
4. **Filmina 4:** *Maqueta Geodésica de Río Negro*: plinto de bronce patinado con 5 obeliscos geodésicos monumentales en mármol y piramidones dorados (Viedma y Nodos).
5. **Filmina 5:** *Red Tensada de Nodos Territoriales*: esferas perladas de alabastro unidas por finos filamentos tensores de latón (Res. CD-CURZA N° 196/2022).
6. **Filmina 6:** *Escultura Cinética de Péndulos Armónicos*: 7 esferas de mármol y bronce suspendidas que transitan del desorden a la alineación epistemológica (Wainerman & Sautu).
7. **Filmina 7:** *Balanza de la Justicia Universitaria*: fuste de mármol con balancín de latón y dos platillos en solemne equilibrio (Art. 75 vs. Art. 76 Estatuto UNCo).
8. **Filmina 8:** *Astrolabio Geodésico de Precisión*: limbo graduado de bronce con disco de cristal y alidada rotatoria para la delimitación del problema.
9. **Filmina 9:** *Tétrada Monumental de Placas*: cuatro placas de bronce con pátina y biseles dorados que se abren en compás ordenado (Objetivo General + 3 Específicos).
10. **Filmina 10:** *Heptágono Escultórico de los 7 Subsistemas*: prisma regular de 7 caras de mármol blanco de Carrara coronado por estrella heptagonal y anillo orbital (Francisco Longo).
11. **Filmina 11:** *Atril de Honor Académico*: marco ceremonial de bronce y columna de mármol que enmarca el diagrama oficial SVG de Longo.
12. **Filmina 12:** *Escalera Monumental de la Carrera Docente*: cuatro pedestales de mármol ascendentes con molduras de latón (Planificación, Organización, Rendimiento, Desarrollo).
13. **Filmina 13:** *Giroscopio Cuádruple de Bronce y Alabastro*: cuatro aros cardinales girando en rotación solemne con las 4 esferas de los claustros evaluativos (Modelo 360°).
14. **Filmina 14:** *Cúpula Geodésica de Cristal y Tracería de Bronce*: cúpula protectora arquitectónica de cristal esmerilado cobijando la libertad de cátedra y confidencialidad.
15. **Filmina 15:** *Triángulo de Matus en Granito y Latón*: tríada monumental conectada por barras de tensión (Proyecto, Capacidad y Gobernabilidad).
16. **Filmina 16:** *Estructura Tensada de Tensegridad*: barras de latón suspendidas en equilibrio flotante sin tocarse, metáfora de la poligobernanza (Cao & Blutman).
17. **Filmina 17:** *Teodolito y Prisma Óptico de Triangulación*: prisma de cristal puro tallado sobre montura clásica de latón y trípode geodésico.
18. **Filmina 18:** *Pentagrama Armónico de Vitral y Latón*: escultura pentagonal con 5 radios de latón sosteniendo cristales biselados para las 5 dimensiones de factibilidad.
19. **Filmina 19:** *Linterna de la Biblioteca del Saber*: faro cilíndrico de mampostería clásica y cúpula de bronce con celosía renacentista.
20. **Filmina 20:** *Gran Medallón de Honor CURZAS - UNCo*: medalla conmemorativa de bronce patinado y oro con corona de laureles sobre plinto de mármol blanco.

---

## ⌨️ Atajos de Teclado Profesionales

| Tecla | Acción |
| :---: | :--- |
| `→` o `Espacio` o `AvPág` | Avanzar a la siguiente filmina |
| `←` o `RePág` | Retroceder a la filmina anterior |
| `V` | **Observar Diagrama Vectorial SVG** de la filmina actual en pantalla completa |
| `D` | **Modo Enfoque Texto**: Atenuar el fondo 3D al 18% para lectura prioritaria |
| `T` | Iniciar / Pausar el cronómetro de 30 minutos |
| `N` | Abrir / Cerrar el **Guion del Orador** (*teleprompter* con notas de apoyo) |
| `M` | Abrir / Cerrar el panel de **7 Pestañas de Respaldo Metodológico** |
| `F` | Activar / Desactivar pantalla completa |
| `Escape` | Cerrar cualquier visor o panel activo |

---

## 🚀 ¿Cómo Ejecutar la Presentación?

* **Opción Directa:** Haz doble clic sobre [index.html](file:///c:/Users/Ramoncito/.antigravity-ide/Seminario%20de%20Integraci%C3%B3n%20y%20Aplicaci%C3%B3n/Presentacion/index.html) para abrirlo en Edge, Chrome, Brave o Firefox.
* **Opción Servidor Local:** Ejecuta `python -m http.server 8000` en PowerShell y accede a `http://localhost:8000`.
