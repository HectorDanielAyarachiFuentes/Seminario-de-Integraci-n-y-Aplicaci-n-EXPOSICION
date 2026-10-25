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

## 🏛️ Catálogo de las 25 Esculturas Académicas 3D (Organizadas en 5 Bloques)

Cada filmina posee un objeto tridimensional representativo y pertinente con el contenido temático, organizado en 5 bloques modulares (`js/objetos/bloque1.js` a `bloque5.js`) para facilitar el mantenimiento:

### Bloque I (`bloque1.js`): Apertura, Perfil y Esquema de la Cátedra (Filminas 1 a 5)
1. **`anim_01` (Filmina 1):** *El Gran Tomo Encuadernado de Tesina*: atril ceremonial de mármol y latón con el libro abierto de la carátula oficial CURZAS-UNCo.
2. **`anim_02` (Filmina 2):** *Credencial Profesional & Monolito de Carrera*: monolito de mármol con la insignia técnica de RRHH de Héctor Ayarachi.
3. **`anim_03` (Filmina 3):** *Podio Cúbico de los 4 Cimientos del TFG*: estructura cuádruple de la Primera Parte canónica (TP N° 2).
4. **`anim_04` (Filmina 4):** *Díptico Epistemológico de 2 Columnas*: pilares de sustentación de la Segunda Parte (Teoría y Antecedentes).
5. **`anim_05` (Filmina 5):** *Tríptico de Ingeniería Metodológica Integral*: tres frontispicios de la Tercera Parte (Metodología, Cronograma, Recursos).

### Bloque II (`bloque2.js`): Tiempo 1 — Territorio, Ruptura y Tensión (Filminas 6 a 10)
6. **`anim_06` (Filmina 6):** *Maqueta Geodésica de la República Argentina y Río Negro*: territorio continental en alto relieve, Océano Atlántico, Malvinas, Antártida, y relieve de Río Negro con balizas de Viedma y los Nodos Territoriales.
7. **`anim_07` (Filmina 7):** *Red de Aulas Híbridas y Terminales Conectadas*: servidor central de Viedma enlazado por arcos luminosos con terminales remotas (Res. CD-CURZA N° 196/2022).
8. **`anim_08` (Filmina 8):** *Prisma de Ruptura Epistemológica*: bloque de carbón burocrático refractado en haz de luz científico (Wainerman & Sautu, 2011).
9. **`anim_09` (Filmina 9):** *Balanza Dual de Tensión Normativa*: balancín de latón contrastando el Art. 75 (Pérdida de cargo) frente al Art. 76 (Capacitación continua).
10. **`anim_10` (Filmina 10):** *Pentágono Orbital de Factibilidad*: núcleo central de la pregunta rectora rodeado por 5 sellos de viabilidad dimensional.

### Bloque III (`bloque3.js`): Tiempo 2 — Objetivos, Modelo Sistémico y 360° (Filminas 11 a 15)
11. **`anim_11` (Filmina 11):** *Diana de Coherencia de Objetivos*: núcleo dorado del Objetivo General con 4 ejes cardinales para los 4 Objetivos Específicos.
12. **`anim_12` (Filmina 12):** *Prisma Heptagonal de los 7 Subsistemas*: prisma regular con los subsistemas de gestión pública (Francisco Longo, 2006).
13. **`anim_13` (Filmina 13):** *Mecanismo de Engranajes Sistémicos de RRHH*: engranajes acoplados entre Rendimiento, Desarrollo, Organización del Trabajo y Relaciones Sociales.
14. **`anim_14` (Filmina 14):** *Escáner Radar Circular 360°*: radar multiactoral que neutraliza sesgos unilaterales triangulando 4 cuadrantes.
15. **`anim_15` (Filmina 15):** *Cúpula Geodésica de los 4 Cuadrantes del CURZAS*: cúpula protectora con los 4 estamentos universitarios convergiendo hacia el núcleo formativo del Art. 76.

### Bloque IV (`bloque4.js`): Tiempo 2 y Tiempo 3 — Gobernanza y Metodología (Filminas 16 a 20)
16. **`anim_16` (Filmina 16):** *Mesa Redonda de Cogobierno Paritario y Servidor Criptográfico*: mesa circular con los 4 escaños de representación (ADUNC, Claustros, Autoridades) y servidor con candado de anonimato (Carlos Matus + Oscar Oszlak).
17. **`anim_17` (Filmina 17):** *Muro Escalonado de Antecedentes y Gema Patagónica*: 3 niveles concéntricos (Internacional, Nacional, Regional) coronados por el diamante de la vacancia disciplinar.
18. **`anim_18` (Filmina 18):** *Probeta Doble de Triangulación Mixta ($CUAL \rightarrow cuan$)*: probeta cualitativa prioritaria conectada por serpentín de transferencia con la probeta cuantitativa y bitácora de caso.
19. **`anim_19` (Filmina 19):** *Muestrario de Informantes Clave e Instrumentos*: semicírculo con 8 bustos de informantes clave (docentes, autoridades, ADUNC, alumnos) y panel de 45 esferas del sondeo Likert con atril de grabación.
20. **`anim_20` (Filmina 20):** *Ábaco Matricial de las 5 Dimensiones*: pórtico neoclásico de 5 columnas con discos graduados que representan variables e indicadores empíricos de factibilidad.

### Bloque V (`bloque5.js`): Tiempo 3, Conclusiones y Cierre (Filminas 21 a 25)
21. **`anim_21` (Filmina 21):** *Espiral Temporal de 7 Meses y 6 Hitos de Campo*: espiral helicoidal ascendente de latón con balizas luminosas para las 6 fases de trabajo de campo durante 2027.
22. **`anim_22` (Filmina 22):** *Trípode Dórico de Viabilidad de Recursos*: 3 pilares maestros (Humanos, Técnicos Moodle/SIU, Económicos Costo Cero) bajo el tablero con el sello de aval departamental (Apartado 9 del TP4).
23. **`anim_23` (Filmina 23):** *Cofre Blindado Ley 25.326 y Pergamino de Inmunidad*: caja fuerte acorazada con candado criptográfico (disociación de IPs) y pergamino con sello lacrado de no afectación laboral.
24. **`anim_24` (Filmina 24):** *Faro Monumental de Valor Público Universitario*: torre de mármol con doble haz giratorio sobre el horizonte patagónico y 4 estelas de síntesis de factibilidad.
25. **`anim_25` (Filmina 25):** *Gran Medallón Laureado UNCo y Atril al Tribunal*: medalla conmemorativa de graduación de la Universidad Nacional del Comahue, flanqueada por pebeteros votivos de educación pública y atril de honor abierto al tribunal evaluador (Dra. Deborah Noguera, Esp. Federico Abeiro, Esp. María Cecilia Aguirre).

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
