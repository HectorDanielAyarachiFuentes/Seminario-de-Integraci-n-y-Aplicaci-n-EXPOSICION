/**
 * =============================================================================
 * METADATOS Y CONTENIDO DE LA PRESENTACIÓN FINAL — TFG / TESINA (25 FILMINAS)
 * Universidad Nacional del Comahue — CURZAS
 * Seminario de Integración y Aplicación (SIA 2026)
 * Autor: Tec. Sup. en RRHH Héctor Daniel Ayarachi Fuentes
 * =============================================================================
 * ESTRUCTURA CANÓNICA SEGÚN CONSIGNAS OFICIALES DE LA CÁTEDRA:
 * 1. Apertura Protocolar y Carátula Oficial (Filmina 1)
 * 2. Presentación Personal del Tesista (Filmina 2)
 * 3. Hojas de Ruta de la Cátedra SIA: TP N° 2, Segunda Parte y TP N° 4 Integral (Filminas 3 a 5)
 * 4. TIEMPO 1: El Objeto Problema, Territorio, Tensión y Objetivos (Filminas 6 a 11)
 * 5. TIEMPO 2: Marco Teórico Sustantivo, Modelo 360°, Poligobernanza y Vacancia (Filminas 12 a 17)
 * 6. TIEMPO 3: Metodología Mixta, Operacionalización, Fases, Viabilidad y Ética (Filminas 18 a 23)
 * 7. Síntesis de Factibilidad y Conclusiones del TFG (Filmina 24)
 * 8. Despedida Formal, Agradecimiento al Tribunal y Espacio de Preguntas (Filmina 25)
 */

const PRESENTACION_DATA = {
  meta: {
    institucion: "Universidad Nacional del Comahue",
    sede: "Complejo Universitario Regional Zona Atlántica y Sur (CURZAS)",
    departamento: "Departamento de Administración Pública",
    carrera: "Ciclo de Complementación Curricular de la Licenciatura en Gestión de Recursos Humanos",
    materia: "Seminario de Integración y Aplicación (SIA)",
    titulo: "Evaluación del Desempeño Docente y Factibilidad de Implementación de un Modelo de Retroalimentación 360°",
    subtitulo: "Enfoque formativo situado en el Departamento de Administración Pública del CURZAS-UNCo (2027)",
    autor: "Tec. Sup. en RRHH Héctor Daniel Ayarachi Fuentes",
    legajo: "Legajo N° 8252 — DNI N° 35.492.138",
    email: "hectordanielayarachifuentes@gmail.com",
    director: "A designar antes de finalizar el cursado del SIA",
    codirector: "A designar antes de finalizar el cursado del SIA",
    docentes: [
      { nombre: "Dra. Deborah Noguera", rol: "Docente Responsable de Cátedra" },
      { nombre: "Esp. Federico Abeiro", rol: "Docente de Cátedra" },
      { nombre: "Esp. María Cecilia Aguirre", rol: "Docente de Cátedra" }
    ],
    normativaMarco: "Resolución CD-CURZAS N° 266/23 (Reglamento de TFG) • Estatuto UNCo (Ord. CS N° 0988/2025)",
    ano: "2026",
    lugar: "Viedma, Río Negro — República Argentina"
  },

  timing: {
    totalMinutos: 30,
    alertaAmarillaMinutos: 20, // Advertencia visual
    alertaRojaMinutos: 27,     // Cierre inminente
    promedioPorSlideMin: 1.2   // ~1.2 minutos por filmina para completar los 30 minutos
  },

  // 6 Pestañas de Respaldo Metodológico para el Tribunal Evaluador (Atajo: Tecla 'M')
  fichasRespaldo: {
    autores: [
      {
        autor: "Francisco Longo (2006)",
        concepto: "Modelo analítico de 7 subsistemas para el empleo público: rendimiento, desarrollo, organización del trabajo, relaciones humanas y sociales. Fundamento para superar la auditoría punitiva y orientar la gestión pública a la generación de valor social."
      },
      {
        autor: "Enrique de la Garza Toledo (2001)",
        concepto: "Epistemología crítica: la teoría como 'configuración abierta'. Red conceptual flexible para reconstruir el campo de lo institucionalmente viable en organizaciones complejas."
      },
      {
        autor: "Carlos Matus (1993)",
        concepto: "Planificación Estratégica Situacional (PES): las universidades públicas operan en 'arenas de poder compartido'. La viabilidad de una innovación no se decreta; se construye concertando sobre variables de control compartido en cogobierno."
      },
      {
        autor: "Oscar Oszlak (2020)",
        concepto: "El Estado en la era exponencial: incorporación inteligente de plataformas digitales (Moodle/SIU) para expandir capacidades institucionales, garantizando anonimato técnico y evitando el tecno-autoritarismo."
      },
      {
        autor: "Horacio Cao & Gustavo Blutman (2023)",
        concepto: "Poligobernanza y Estado plataforma: redes horizontales y gestión de la complejidad situada que articulan a Rectorado, Centros Regionales y Nodos en el territorio patagónico."
      },
      {
        autor: "Catalina Wainerman & Ruth Sautu (2005, 2011)",
        concepto: "Desnaturalización de las rutinas cotidianas para formular un problema científico genuino, estructurando la investigación en pirámide invertida y matriz de consistencia."
      },
      {
        autor: "Obando Freire (2014) & Sifuentes (2016)",
        concepto: "Estudios empíricos sobre evaluación 360° en universidades: demuestran que la triangulación multiactoral supera el 85% de aceptación docente siempre que exista 100% de confidencialidad y destino formativo exclusivo."
      }
    ],

    normativa: [
      {
        norma: "Resolución CD-CURZAS N° 266/23",
        descripcion: "Reglamento formal de Trabajos Finales de Graduación del CURZAS-UNCo. Define la estructura canónica en 3 tiempos/partes y los criterios de viabilidad del TFG."
      },
      {
        norma: "Ordenanza CS N° 0988/2025 (Estatuto UNCo)",
        descripcion: "Nuevo Estatuto: Art. 17 define al CURZAS como Complejo Universitario Regional; Título X regula la Carrera Docente (Art. 75: permanencia sumativa cuatrienal; Art. 76: Programa Anual de Capacitación Departamental)."
      },
      {
        norma: "Decreto PEN N° 1246/2015 (CCT Docente Universitario)",
        descripcion: "Convenio Colectivo de Trabajo Docente. Protege la estabilidad laboral, libertad de cátedra y establece garantías de debido proceso y tutela gremial paritaria (ADUNC)."
      },
      {
        norma: "Resolución CD-CURZA N° 196/2022 (Docencia Híbrida)",
        descripcion: "Reglamenta las mediaciones tecnológicas, la presencialidad remota sincrónica y las tutorías virtuales en la Red de Nodos Territoriales del CURZAS, exigiendo evaluar nuevas competencias docentes."
      },
      {
        norma: "Ordenanza CS N° 0910/1997 y modif.",
        descripcion: "Reglamento General de Carrera Docente de la UNCo: pautas históricas de informes anuales de cátedra y encuestas estudiantiles sumativas."
      },
      {
        norma: "Ley Nacional N° 25.326",
        descripcion: "Protección de los Datos Personales. Marco legal para la disociación estricta de identidades, inhabilitación de metadatos/IP y resguardo del anonimato en sondeos."
      }
    ],

    objetivos: [
      {
        nivel: "Objetivo General",
        texto: "Determinar las condiciones de factibilidad organizacional, técnica, normativa y de gobernanza multinivel para la implementación de un modelo de retroalimentación multiactoral (360°) en la evaluación del desempeño docente en el Departamento de Administración Pública del CURZAS-UNCo (2027)."
      },
      {
        nivel: "Objetivo Específico 1 (Dimensión Normativa-Institucional)",
        texto: "Relevar y caracterizar los instrumentos normativos, procedimientos y prácticas vigentes aplicadas a la evaluación del desempeño docente en el Departamento, distinguiendo prescripciones estatutarias de su aplicación empírica real."
      },
      {
        nivel: "Objetivo Específico 2 (Dimensión Intersubjetiva-Cultural)",
        texto: "Explorar las percepciones, disposiciones y representaciones de los actores institucionales involucrados (docentes y estudiantes) y de las autoridades respecto a la retroalimentación 360° y la confianza institucional requerida."
      },
      {
        nivel: "Objetivo Específico 3 (Dimensión Gobernanza Multinivel)",
        texto: "Identificar los condicionantes técnico-organizacionales, normativos y de gobernanza multinivel (acuerdos paritarios, confidencialidad, carrera docente y cogobierno) que inciden en la factibilidad del modelo."
      },
      {
        nivel: "Objetivo Específico 4 (Dimensión Propositiva-Orientativa)",
        texto: "Proponer lineamientos orientativos para una eventual implementación formativa del modelo 360°, en función de las condiciones y límites de factibilidad identificados en la investigación empírica."
      }
    ],

    dimensiones: [
      {
        dim: "1. Factibilidad Normativa y Estatutaria",
        detalle: "Adecuación al Estatuto UNCo (Ord. 0988/2025) y al CCT Docente (Dec. 1246/2015). Desacoplamiento absoluto de la permanencia punitiva del Art. 75 y anclaje exclusivo en el Art. 76 (capacitación)."
      },
      {
        dim: "2. Factibilidad Técnica e Instrumental",
        detalle: "Disponibilidad de plataformas institucionales (Moodle/SIU), usabilidad en menos de 15 minutos, inhabilitación de logs/IP y blindaje de anonimato para mitigar la fatiga evaluativa."
      },
      {
        dim: "3. Factibilidad Organizacional y Procedimental",
        detalle: "Capacidad departamental para procesar la retroalimentación multiactoral y transferir diagnósticos al Programa Anual de Capacitación Docente sin sobrecargar los circuitos administrativos."
      },
      {
        dim: "4. Factibilidad Cultural y Actitudinal",
        detalle: "Clima de confianza institucional, disposición a la autoevaluación reflexiva, receptividad ante la mirada de pares y seriedad del juicio pedagógico estudiantil."
      },
      {
        dim: "5. Factibilidad de Gobernanza Multinivel",
        detalle: "Viabilidad política de deliberación y búsqueda de consensos en los órganos de cogobierno (Consejo Departamental y Directivo) y concertación paritaria con ADUNC (variables de control compartido)."
      }
    ],

    territorio: [
      {
        sede: "Sede Cabecera: Viedma (Valle Inferior)",
        detalle: "Sede central académica y administrativa del CURZAS. Concentra los claustros docentes, la dirección departamental y los órganos colegiados de cogobierno."
      },
      {
        sede: "Nodo Territorial: Sierra Grande (Costa Atlántica)",
        detalle: "Población vinculada a la costa y minería. Cursadas sincrónicas mediadas por tecnología con fuerte demanda de tutoría virtual continua."
      },
      {
        sede: "Nodo Territorial: Valcheta (Portal de la Línea Sur)",
        detalle: "Aulas híbridas equipadas bajo Res. CD-CURZA N° 196/2022 que integran a estudiantes de la estepa rionegrina."
      },
      {
        sede: "Nodos Territoriales: Los Menucos y Ramos Mexía",
        detalle: "Estepa profunda patagónica a más de 400 km de Viedma. Exige competencias docentes de acompañamiento pedagógico digital que hoy no se evalúan formativamente."
      }
    ],

    faq: [
      {
        pregunta: "¿Por qué un modelo 360° y no la tradicional encuesta estudiantil?",
        respuesta: "La encuesta estudiantil aislada genera sesgos de complacencia o castigo a la exigencia académica. El modelo 360° triangula 4 miradas: autoevaluación del docente, coevaluación de pares de cátedra, apreciación estudiantil y visión de la dirección departamental."
      },
      {
        pregunta: "¿Cómo se previene el riesgo de que el modelo sea percibido como persecutorio?",
        respuesta: "Mediante dos blindajes: 1) Blindaje Normativo: desacoplamiento absoluto del Art. 75 del Estatuto (permanencia) y vinculación exclusiva con el Art. 76 (capacitación continua); 2) Blindaje Técnico: anonimato estadístico auditado por comisiones paritarias."
      },
      {
        pregunta: "¿Qué rol juega el Convenio Colectivo de Trabajo (Dec. 1246/15)?",
        respuesta: "Es el marco protector rector. El CCT prohíbe modificaciones unilaterales en las condiciones de trabajo docente. Por tanto, el modelo 360° no puede imponerse burocráticamente; debe construirse como acuerdo paritario negociado (Matus: poder compartido)."
      },
      {
        pregunta: "¿Cómo incide la Red de Nodos Territoriales en la evaluación?",
        respuesta: "Bajo la Res. 196/2022, la labor del docente del CURZAS abarca diseñar entornos Moodle, coordinar videoconferencias y tutorizar a distancia en parajes alejados. Los cuestionarios tradicionales en papel no contemplan estas competencias pedagógicas híbridas."
      },
      {
        pregunta: "¿Cuál es el valor público concreto que este TFG aporta al CURZAS?",
        respuesta: "Brinda por primera vez evidencia empírica rigurosa y un diagnóstico de factibilidad situado en la Patagonia, permitiendo a las autoridades universitarias tomar decisiones informadas sobre políticas de desarrollo docente sin importar recetas enlatadas."
      }
    ]
  },

  // Las 25 Filminas Oficiales
  slides: [
    // ═════════════════════════════════════════════════════════════════════════
    // SECCIÓN 1: APERTURA, AUTOR Y ESTRUCTURA DE LA CÁTEDRA (Filminas 1 a 5)
    // ═════════════════════════════════════════════════════════════════════════
    {
      id: "slide_1",
      numero: 1,
      bloque: "APERTURA INSTITUCIONAL",
      esquema: "Carátula Oficial del TFG",
      badge: "SIA • CURZAS-UNCo",
      titulo: "Evaluación del Desempeño Docente y Factibilidad de un Modelo 360°",
      subtitulo: "Enfoque Formativo Situado en el Departamento de Administración Pública del CURZAS-UNCo (2027)",
      puntosClave: [
        "Tipo de Trabajo: Proyecto Integral de Trabajo Final de Graduación (TFG) — Conforme Res. CD-CURZAS N° 266/23.",
        "Institución y Carrera: Universidad Nacional del Comahue • CURZAS • Licenciatura en Gestión de Recursos Humanos (CCC).",
        "Estudiante y Contacto: Tec. Sup. en RRHH Héctor Daniel Ayarachi Fuentes (DNI 35.492.138 — Legajo 8252 — hectordanielayarachifuentes@gmail.com).",
        "Equipo de Cátedra y Dirección: Dra. Deborah Noguera, Esp. Federico Abeiro, Esp. María Cecilia Aguirre • Dirección: A designar antes de finalizar el SIA."
      ],
      metadatosFooter: "Carátula Canónica Oficial • Cátedra SIA 2026 • Viedma, Río Negro",
      escena3D: "anim_01",
      guionOrador: "Estimados miembros del tribunal evaluador, Dra. Deborah Noguera, Esp. Federico Abeiro y Esp. María Cecilia Aguirre. Inicio formalmente la presentación de mi Proyecto Integral de Trabajo Final de Graduación titulado 'Evaluación del Desempeño Docente y Factibilidad de Implementación de un Modelo de Retroalimentación 360° en el Departamento de Administración Pública del CURZAS-UNCo'. Esta propuesta cumple con todos los requerimientos formales de la carátula institucional reglamentada por la Resolución CD-CURZAS 266/23."
    },

    {
      id: "slide_2",
      numero: 2,
      bloque: "APERTURA INSTITUCIONAL",
      esquema: "Presentación Personal del Tesista",
      badge: "Perfil del Autor",
      titulo: "Héctor Daniel Ayarachi Fuentes: Trayectoria y Motivación",
      subtitulo: "De la Formación Técnica Superior al Campo Profesional de la Licenciatura en Gestión de Recursos Humanos",
      puntosClave: [
        "Perfil Profesional de Base: Técnico Superior en Recursos Humanos, con experiencia y vocación orientada a la gestión de personas en el sector público.",
        "Trayectoria Universitaria: Estudiante avanzado del Ciclo de Complementación Curricular de la Licenciatura en Gestión de RRHH en el CURZAS-UNCo.",
        "Línea de Interés Académico: Modernización de capacidades estatales, evaluación formativa del rendimiento y calidad de la educación superior patagónica.",
        "Compromiso con el CURZAS: Integrar el rigor metodológico universitario con un diagnóstico situado que aporte valor público a nuestra propia comunidad."
      ],
      metadatosFooter: "Presentación del Estudiante • Vocación por el Empleo Público • CURZAS-UNCo",
      escena3D: "anim_02",
      guionOrador: "Permítanme presentarme brevemente. Mi nombre es Héctor Daniel Ayarachi Fuentes. Cuento con formación de base como Técnico Superior en Recursos Humanos y a lo largo de este Ciclo de Complementación Curricular he buscado profundizar en el análisis estratégico del empleo público. Este Trabajo Final de Graduación representa para mí no solo la meta académica de alcanzar el título de Licenciado, sino un compromiso ético con la universidad pública patagónica en la que me formé, orientando mis esfuerzos a mejorar las herramientas de desarrollo docente."
    },

    {
      id: "slide_3",
      numero: 3,
      bloque: "HOJA DE RUTA DE LA CÁTEDRA",
      esquema: "Esquema SIA: Trabajo Práctico N° 2",
      badge: "Estructura TP Nº 2 • Primera Parte",
      titulo: "Primera Parte: El Objeto Problema y el Proyecto de TFG",
      subtitulo: "Los Cuatro Apartados Canónicos del Trabajo Práctico N° 2 Establecidos por la Cátedra",
      puntosClave: [
        "1. Carátula Formal: Identificación institucional completa, carrera de grado, autor, directores a designar y correo oficial.",
        "2. Tema de Investigación: Área disciplinar de RRHH en la gestión pública, contexto situado (Viedma y Nodos) y período temporal 2027.",
        "3. Delimitación del Objeto Problema: Desnaturalización de rutinas, justificación y relevancia empírica del caso (Objeto de estudio).",
        "4. Definición de Objetivos del TFG: Formulación rigurosa del Objetivo General y cuatro Objetivos Específicos articulados en consistencia."
      ],
      metadatosFooter: "Consigna Oficial Cátedra SIA • TP N° 2 • Primera Parte Estructural",
      escena3D: "anim_03",
      guionOrador: "En esta tercera filmina presentamos la primera hoja de ruta académica fijada por la cátedra en el Trabajo Práctico N° 2: la Primera Parte de la estructura del Proyecto de TFG. Esta etapa canónica comprende cuatro apartados obligatorios: la Carátula con todos los datos institucionales; la definición precisa del Tema de Investigación y su contexto; la Delimitación del Objeto Problema y su justificación; y finalmente la Formulación de los Objetivos Generales y Específicos."
    },

    {
      id: "slide_4",
      numero: 4,
      bloque: "HOJA DE RUTA DE LA CÁTEDRA",
      esquema: "Esquema SIA: Segunda Parte",
      badge: "Estructura TP Nº 3 • Segunda Parte",
      titulo: "Segunda Parte: Marco Teórico Sustantivo y Antecedentes",
      subtitulo: "Incorporación de los Apartados 5 y 6: Sustento Teórico y Estado del Arte",
      puntosClave: [
        "5. Marco Teórico: Posicionamiento teórico como configuración abierta (De la Garza) y Modelo sistémico de Francisco Longo (2006).",
        "Desarrollo Conceptual Central: Modelo de retroalimentación 360° en educación superior y distinción entre lógica formativa y sumativa.",
        "Poligobernanza y Poder Compartido: Carlos Matus (PES en cogobierno), Cao & Blutman (Poligobernanza) y Oscar Oszlak (Tecnología y anonimato).",
        "6. Antecedentes (Estado del Arte): Relevamiento en tres escalas (Internacional, Nacional y Regional/UNCo) y delimitación de la Vacancia de investigación."
      ],
      metadatosFooter: "Consigna Oficial Cátedra SIA • Segunda Parte Estructural • Teoría y Antecedentes",
      escena3D: "anim_10",
      guionOrador: "Siguiendo el esquema de la cátedra, la Segunda Parte expande la investigación incorporando dos componentes cardinales: el Marco Teórico en el apartado 5, donde fundamentamos el posicionamiento epistemológico, los subsistemas de Francisco Longo, el dispositivo 360° y la poligobernanza universitaria; y en el apartado 6, el relevamiento de Antecedentes y Estado del Arte en tres escalas espaciales para demostrar la vacancia de conocimiento."
    },

    {
      id: "slide_5",
      numero: 5,
      bloque: "HOJA DE RUTA DE LA CÁTEDRA",
      esquema: "Esquema SIA: Trabajo Práctico N° 4",
      badge: "Estructura TP Nº 4 • Tercera Parte",
      titulo: "Tercera Parte: Metodología, Cronograma y Viabilidad",
      subtitulo: "Integración de los Apartados 7, 8 y 9 para el Proyecto Integral de TFG",
      puntosClave: [
        "7. Metodología / Técnicas y Métodos: Estrategia mixta (CUAL->cuan), estudio de caso situado, 8 entrevistas y sondeo a 45 respondientes.",
        "Matriz de Operacionalización: Cinco dimensiones analíticas de factibilidad (Normativa, Técnica, Organizacional, Cultural y Gobernanza).",
        "8. Cronograma de Actividades: Planificación secuencial en 6 fases a lo largo de 7 meses continuos de ejecución durante 2027.",
        "9. Viabilidad del Proyecto: Especificación pormenorizada de recursos económicos, humanos y técnicos, avales institucionales y ética (Ley 25.326)."
      ],
      metadatosFooter: "Consigna Oficial Cátedra SIA • TP N° 4 • Proyecto Integral Completo",
      escena3D: "anim_17",
      guionOrador: "Llegamos al Trabajo Práctico N° 4, que consolida la Tercera Parte y conforma el Proyecto Integral de Tesina. Aquí se incorporan los tres apartados metodológicos finales: el Apartado 7, con la definición de la estrategia metodológica mixta y la matriz de operacionalización; el Apartado 8, con el cronograma de 7 meses para 2027; y el Apartado 9, que exige especificar la viabilidad de recursos humanos, técnicos y económicos, junto con las autorizaciones institucionales."
    },

    // ═════════════════════════════════════════════════════════════════════════
    // SECCIÓN 2: TIEMPO 1 — OBJETO PROBLEMA, TERRITORIO Y OBJETIVOS (6 a 11)
    // ═════════════════════════════════════════════════════════════════════════
    {
      id: "slide_6",
      numero: 6,
      bloque: "TIEMPO 1: EL OBJETO PROBLEMA",
      esquema: "Territorio Situado y Descentralización",
      badge: "Primera Parte • Contexto",
      titulo: "El CURZAS en el Territorio: Sede Viedma y Nodos",
      subtitulo: "Inserción Regional en la Comarca Viedma-Patagones, Costa Atlántica y Línea Sur",
      puntosClave: [
        "Sede Central Viedma: Cabecera administrativa y académica donde convergen las carreras de Administración Pública y RRHH.",
        "Despliegue Territorial Patagónico: Red de Nodos que democratiza el acceso a la educación superior en localidades dispersas.",
        "Población Estudiantil Situada: Jóvenes comarcales, empleados públicos provinciales/municipales y estudiantes de la estepa.",
        "Desafío de Recursos Humanos: Gestionar el desempeño de un cuerpo docente con diversas realidades de conectividad y presencialidad."
      ],
      metadatosFooter: "Territorialidad • Patagonia Norte • Democratización del Acceso",
      escena3D: "anim_04",
      diagramaSVG: "assets/red_territorial.svg",
      guionOrador: "Pasando al desarrollo de la Primera Parte, nuestro objeto de estudio no se sitúa en un campus universitario tradicional ni en una metrópoli. El CURZAS tiene un despliegue territorial extenso y singular en la Patagonia Norte. Desde su sede central en Viedma articula trayectos formativos hacia localidades costeras y de la estepa rionegrina. Gestionar los recursos humanos en este escenario exige comprender que la labor docente no puede medirse con los criterios homogéneos de las universidades tradicionales."
    },

    {
      id: "slide_7",
      numero: 7,
      bloque: "TIEMPO 1: EL OBJETO PROBLEMA",
      esquema: "Docencia Híbrida y Mediaciones",
      badge: "Res. CD-CURZA N° 196/2022",
      titulo: "Mapeo Territorial y Mediaciones Tecnológicas",
      subtitulo: "La Transformación del Trabajo Docente en la Red de Nodos Territoriales",
      puntosClave: [
        "Red de Nodos Territoriales: Sierra Grande, Valcheta, Los Menucos y Ramos Mexía a más de 400 km de la sede central.",
        "Institucionalización Normativa: La Res. CD-CURZA N° 196/2022 formalizó las aulas híbridas con presencialidad remota sincrónica y asincrónica.",
        "Mutación del Rol Docente: La enseñanza trasciende el aula física para incorporar diseño en Moodle, videoconferencias y tutoría virtual.",
        "Obsolescencia Instrumental: Las encuestas tradicionales en papel son totalmente ciegas ante las competencias didáctico-digitales que demanda el territorio."
      ],
      metadatosFooter: "Mapa Vectorial Territorial • Aulas Híbridas • Competencias Digitales",
      escena3D: "anim_05",
      diagramaSVG: "assets/red_territorial.svg",
      guionOrador: "En el diagrama vectorial de la Red Territorial observamos cómo la Resolución 196/2022 formalizó la cursada híbrida en los nodos de Sierra Grande, Valcheta, Los Menucos y Ramos Mexía. Esto transformó radicalmente la jornada de trabajo del docente: preparar materiales digitales, coordinar clases remotas y sostener tutorías a la distancia. Los instrumentos evaluativos tradicionales en papel quedan obsoletos porque no ponderan el esfuerzo pedagógico que exige este despliegue territorial."
    },

    {
      id: "slide_8",
      numero: 8,
      bloque: "TIEMPO 1: EL OBJETO PROBLEMA",
      esquema: "Desnaturalización del Problema",
      badge: "Vigilancia Epistemológica",
      titulo: "Desnaturalización del Objeto de Investigación",
      subtitulo: "De la Rutina Burocrática al Objeto Científico (Wainerman & Sautu, 2011)",
      puntosClave: [
        "Desnaturalizar lo Cotidiano: Cuestionar la creencia de que 'evaluar' consiste únicamente en aplicar una planilla de preguntas al cierre del cuatrimestre.",
        "Distinción Metodológica: El problema de gestión (falta de información pedagógica) se convierte en objeto científico al indagar las condiciones de factibilidad de una innovación.",
        "Superación del Ritualismo: Evitar que la evaluación docente sea una pantomima burocrática archivada en legajos sin impacto formativo.",
        "Vigilancia Epistemológica: Articular la sociología del trabajo público, la teoría de las capacidades estatales y el derecho universitario."
      ],
      metadatosFooter: "Wainerman & Sautu (2011) • Ruptura Epistemológica • Ciencias Sociales",
      escena3D: "anim_06",
      guionOrador: "Construir este problema exigió aplicar lo que Catalina Wainerman y Ruth Sautu denominan la desnaturalización de lo cotidiano. En la rutina universitaria se asume que evaluar al docente es repartir una encuesta rápida al final de la cursada. Desnaturalizar esa práctica significó preguntarnos: ¿esa encuesta mejora la enseñanza o es solo un trámite administrativo? Así transformamos un déficit de gestión en un genuino problema de investigación científica sobre la factibilidad institucional de un cambio."
    },

    {
      id: "slide_9",
      numero: 9,
      bloque: "TIEMPO 1: EL OBJETO PROBLEMA",
      esquema: "Tensión Normativa Estructural",
      badge: "Estatuto UNCo (Ord. 0988/2025)",
      titulo: "La Tensión Estructural: Carrera Sumativa vs. Capacitación",
      subtitulo: "El Conflicto Estatutario entre el Artículo 75 (Vacancia) y el Artículo 76 (Formación)",
      puntosClave: [
        "Art. 75 Estatuto UNCo (Control Sumativo): Dispone que dos evaluaciones cuatrienales negativas consecutivas causan la vacancia del cargo docente.",
        "Efecto de Prevención Gremial: Genera fundado temor, sospecha de arbitrariedad y resistencia corporativa ante cualquier intento evaluativo.",
        "Art. 76 Estatuto UNCo (Capacitación Docente): Mandato estatutario para el perfeccionamiento continuo mediante programas anuales departamentales.",
        "La Solución Propuesta: Desacoplar el modelo 360° del Art. 75 y anclarlo de forma 100% confidencial y formativa en el Art. 76."
      ],
      metadatosFooter: "Art. 75 (Control de Permanencia) vs. Art. 76 (Capacitación Formativa)",
      escena3D: "anim_07",
      guionOrador: "Aquí llegamos al nudo crítico del problema. El Estatuto de la UNCo establece en su Artículo 75 que dos evaluaciones cuatrienales desfavorables provocan la pérdida del cargo. En consecuencia, cualquier evaluación despierta prevención gremial si se presume sancionatoria. La clave de nuestra propuesta es desacoplar de raíz la retroalimentación 360° del Artículo 75 y anclarla exclusivamente en el Artículo 76, que regula los programas de formación docente continua."
    },

    {
      id: "slide_10",
      numero: 10,
      bloque: "TIEMPO 1: EL OBJETO PROBLEMA",
      esquema: "Pregunta General y 5 Dimensiones",
      badge: "Interrogante Central de TFG",
      titulo: "Pregunta General y las Cinco Dimensiones de Factibilidad",
      subtitulo: "Delimitación del Problema de Factibilidad en el Ciclo Lectivo 2027",
      puntosClave: [
        "Pregunta General: ¿Cuáles son las condiciones de factibilidad organizacional, técnica, normativa y de gobernanza multinivel para implementar un modelo 360° en el Dpto. de Administración Pública (CURZAS-UNCo, 2027)?",
        "1. Dimensión Normativa: Compatibilidad con el Estatuto UNCo y el CCT Docente (Decreto N° 1246/2015).",
        "2. Dimensión Técnica: Plataformas SIU/Moodle, protección del anonimato y prevención de fatiga.",
        "3. Dimensiones Organizacional, Cultural y Gobernanza: Capacidad administrativa, clima de confianza y acuerdos paritarios."
      ],
      metadatosFooter: "Pregunta Central • 5 Dimensiones Analíticas • Res. CD-CURZAS N° 266/23",
      escena3D: "anim_08",
      guionOrador: "De esta tensión surge la pregunta rectora: ¿Cuáles son las condiciones de factibilidad organizacional, técnica, normativa y de gobernanza multinivel para implementar un modelo de retroalimentación multiactoral 360° en el Departamento de Administración Pública del CURZAS durante 2027? Esta pregunta desglosa la viabilidad en cinco dimensiones analíticas concretas: legalidad normativa, soporte técnico, capacidad organizativa, confianza cultural y legitimidad política en cogobierno."
    },

    {
      id: "slide_11",
      numero: 11,
      bloque: "TIEMPO 1: EL OBJETO PROBLEMA",
      esquema: "Matriz de Objetivos del TFG",
      badge: "Coherencia Metodológica",
      titulo: "Matriz de Objetivos del Proyecto de Investigación",
      subtitulo: "Articulación Canónica entre el Objetivo General y los Cuatro Objetivos Específicos",
      puntosClave: [
        "Objetivo General: Determinar las condiciones de factibilidad integral para la implementación del modelo 360° formativo en el CURZAS (2027).",
        "Obj. Específico 1 (Normativo): Relevar instrumentos normativos y prácticas vigentes distinguiendo prescripciones estatutarias de su aplicación real.",
        "Obj. Específico 2 (Percepciones): Explorar percepciones, disposiciones y representaciones de docentes, estudiantes y autoridades.",
        "Obj. Específico 3 (Condicionantes): Identificar condicionantes técnicos (anonimato), normativos (CCT) y de cogobierno paritario.",
        "Obj. Específico 4 (Propositivo): Proponer lineamientos orientativos para una eventual aplicación formativa adaptada al caso."
      ],
      metadatosFooter: "Objetivo General • 4 Objetivos Específicos • Res. CD-CURZAS N° 266/23",
      escena3D: "anim_09",
      guionOrador: "Para cerrar la Primera Parte, presentamos la matriz de objetivos. Nuestro Objetivo General determina la factibilidad integral. Los cuatro objetivos específicos ordenan el plan de trabajo: primero, caracterizar la normativa vigente; segundo, explorar las percepciones y temores de los actores; tercero, identificar los cuellos de botella técnicos y gremiales; y cuarto, diseñar lineamientos orientativos viables para la conducción del Departamento."
    },

    // ═════════════════════════════════════════════════════════════════════════
    // SECCIÓN 3: TIEMPO 2 — MARCO TEÓRICO Y ANTECEDENTES (12 a 17)
    // ═════════════════════════════════════════════════════════════════════════
    {
      id: "slide_12",
      numero: 12,
      bloque: "TIEMPO 2: MARCO TEÓRICO",
      esquema: "Epistemología y Modelo Sistémico",
      badge: "Segunda Parte • Teoría",
      titulo: "Posicionamiento Teórico y el Modelo de Francisco Longo",
      subtitulo: "La Teoría como Configuración Abierta (De la Garza) y la Gestión Estratégica del Empleo Público",
      puntosClave: [
        "Posicionamiento Epistemológico: Enrique de la Garza Toledo concibe a la teoría como 'configuración abierta' para reconstruir el campo de lo viable.",
        "El Modelo de Francisco Longo (2006): Marco analítico de gestión de personas en el sector público estructurado en subsistemas interdependientes.",
        "Superación del Modelo Burocrático: Reemplaza el apego formalista a la norma por una administración orientada al mérito, el aprendizaje y el valor social.",
        "Postulado Central de Longo: 'Evaluar el rendimiento sin conectarlo con el desarrollo y la capacitación constituye un ejercicio burocrático estéril'."
      ],
      metadatosFooter: "De la Garza (2001) • Francisco Longo (2006) • Gestión de Personas en el Estado",
      escena3D: "anim_10",
      guionOrador: "Iniciamos el desarrollo del Marco Teórico. Epistemológicamente asumimos la teoría como una configuración abierta, según Enrique de la Garza: la universidad no es una máquina rígida, sino una trama de sujetos en constante deliberación. Sobre esta base, adoptamos el modelo de gestión estratégica de recursos humanos en el sector público de Francisco Longo (2006). Longo advierte con contundencia que evaluar el rendimiento sin conectarlo con la capacitación despoja al proceso de sentido formativo y lo reduce a un trámite estéril."
    },

    {
      id: "slide_13",
      numero: 13,
      bloque: "TIEMPO 2: MARCO TEÓRICO",
      esquema: "Arquitectura de Subsistemas (Longo)",
      badge: "Diagrama Oficial SVG",
      titulo: "Arquitectura de Subsistemas de Recursos Humanos",
      subtitulo: "Articulación entre Rendimiento, Desarrollo, Organización del Trabajo y Relaciones Humanas",
      puntosClave: [
        "Gestión del Rendimiento (Eje Central): Evaluar formativamente la contribución docente trascendiendo la mera fiscalización burocrática.",
        "Organización del Trabajo: Ajustar los perfiles docentes a las demandas contemporáneas del aula híbrida y las tutorías en territorio (Res. 196/2022).",
        "Gestión del Desarrollo: Vincular los resultados evaluativos con trayectorias de capacitación continua y el Art. 76 del Estatuto UNCo.",
        "Gestión de las Relaciones Humanas y Sociales: Resguardo del clima institucional, diálogo paritario (CCT Dec. 1246/2015) y confianza ética."
      ],
      metadatosFooter: "Diagrama SVG Oficial • 4 Subsistemas Clave • Longo (2006)",
      escena3D: "anim_11",
      diagramaSVG: "assets/Sistemas-longo.svg",
      guionOrador: "En pantalla proyectamos el diagrama SVG oficial del modelo de Longo. La investigación focaliza en cuatro subsistemas interconectados: Rendimiento, que aporta la información evaluativa; Organización del Trabajo, que reconoce las exigencias de la docencia híbrida en los Nodos; Desarrollo, que canaliza los diagnósticos hacia talleres pedagógicos; y Relaciones Humanas, que convoca a la representación paritaria para garantizar que el proceso no vulnere derechos laborales."
    },

    {
      id: "slide_14",
      numero: 14,
      bloque: "TIEMPO 2: MARCO TEÓRICO",
      esquema: "Dispositivo 360° en la Universidad",
      badge: "Triangulación Multiactoral",
      titulo: "El Dispositivo de Retroalimentación 360 Grados",
      subtitulo: "Lógica Formativa vs. Lógica Sumativa y Mitigación de Sesgos Unilaterales",
      puntosClave: [
        "Lógica Sumativa vs. Formativa: La sumativa acredita cargos o sanciones; la formativa promueve la autorreflexión didáctica y la mejora pedagógica.",
        "Triangulación Multiactoral: Cruce de 4 miradas que neutraliza el sesgo de complacencia o castigo propio de las encuestas estudiantiles aisladas.",
        "Evidencia Empírica en Educación Superior: Obando Freire et al. (2014) y Sifuentes (2016) demuestran su alta validez para identificar brechas de desempeño.",
        "Condición Indispensable: Anonimato técnico estricto, reportes individuales de uso exclusivo del docente y ausencia de consecuencias punitivas."
      ],
      metadatosFooter: "Evaluación 360° • Lógica Formativa • Obando Freire & Sifuentes",
      escena3D: "anim_13",
      guionOrador: "En la literatura sobre rendimiento distinguimos dos orientaciones: la lógica sumativa, orientada al control procesal, y la lógica formativa, orientada al aprendizaje reflexivo. Para operativizar esta última en la universidad, adoptamos el modelo de retroalimentación 360 grados. Investigaciones de Obando Freire y Sifuentes evidencian que triangular múltiples miradas neutraliza la subjetividad de las encuestas tradicionales, generando reportes cualitativos de gran valor pedagógico."
    },

    {
      id: "slide_15",
      numero: 15,
      bloque: "TIEMPO 2: MARCO TEÓRICO",
      esquema: "Arquitectura Circular 360° CURZAS",
      badge: "Diagrama Vectorial SVG",
      titulo: "Arquitectura Circular del Modelo 360° en CURZAS",
      subtitulo: "Los Cuatro Cuadrantes de Evaluación Formativa y Blindaje de Anonimato",
      puntosClave: [
        "Cuadrante 1 (Norte): Autoevaluación docente reflexiva sobre la planificación académica y los desafíos del aula presencial e híbrida.",
        "Cuadrante 2 (Este): Coevaluación de pares de cátedra y área disciplinar sobre pertinencia conceptual y trabajo colaborativo.",
        "Cuadrante 3 (Sur): Apreciación estudiantil situada sobre claridad didáctica, puntualidad y acompañamiento tutorial.",
        "Cuadrante 4 (Oeste): Dirección Departamental: articulación con el plan de estudios y prioridades de carrera.",
        "Núcleo y Blindajes: Canalización exclusiva al Art. 76 (Capacitación) con anonimato auditado por comisiones paritarias."
      ],
      metadatosFooter: "Diagrama SVG Modelo 360° • 4 Cuadrantes • Núcleo Formativo Art. 76",
      escena3D: "anim_14",
      diagramaSVG: "assets/modelo_360.svg",
      guionOrador: "En el diagrama vectorial del modelo 360° vemos la convergencia de los cuatro cuadrantes: el docente que reflexiona sobre su práctica; los pares de cátedra que evalúan la coherencia disciplinar; los estudiantes que valoran el acompañamiento; y la Dirección Departamental que aporta la visión institucional. Todo el flujo confluye hacia el núcleo: el Programa de Capacitación del Artículo 76, blindado por el anonimato técnico y la desvinculación de los jurados de permanencia."
    },

    {
      id: "slide_16",
      numero: 16,
      bloque: "TIEMPO 2: MARCO TEÓRICO",
      esquema: "Poligobernanza y Poder Compartido",
      badge: "Matus • Cao/Blutman • Oszlak",
      titulo: "Poligobernanza, Poder Compartido y Capacidades Estatales",
      subtitulo: "La Universidad Pública como Arena Decisional y el Anonimato Digital",
      puntosClave: [
        "Carlos Matus (1993) - Planificación Estratégica Situacional: La universidad es una arena de poder compartido; la viabilidad se construye concertando con claustros y gremios.",
        "Horacio Cao & Gustavo Blutman (2023) - Poligobernanza: Redes horizontales que gestionan la complejidad entre Rectorado (Neuquén), Sede Central (Viedma) y Nodos.",
        "Oscar Oszlak (2020) - El Estado Exponencial: Utilizar plataformas digitales (Moodle/SIU) para construir capacidades institucionales sin derivar en tecno-vigilancia.",
        "Distinción Categorial Clave: 'Claustro' como estamento jurídico de cogobierno frente a 'Actores situados' como sujetos concretos de la práctica educativa."
      ],
      metadatosFooter: "Matus (1993) • Cao & Blutman (2023) • Oszlak (2020) • Poligobernanza",
      escena3D: "anim_15",
      guionOrador: "Para evitar la ingenuidad de creer que un formulario se aprueba de forma automática, recurrimos a tres autores fundamentales. Carlos Matus nos enseña que en organizaciones complejas nadie monopoliza el poder; la viabilidad exige negociar con el sindicato docente ADUNC y los claustros. Horacio Cao y Gustavo Blutman conceptualizan la poligobernanza patagónica entre la sede central y los nodos. Y Oscar Oszlak fundamenta cómo usar el software institucional con estricto resguardo del anonimato."
    },

    {
      id: "slide_17",
      numero: 17,
      bloque: "TIEMPO 2: MARCO TEÓRICO",
      esquema: "Estado del Arte y Vacancia",
      badge: "Aporte al Conocimiento",
      titulo: "Estado del Arte y Vacancia Disciplinar Comprobada",
      subtitulo: "Antecedentes Internacionales, Nacionales y la Originalidad del Estudio en la Patagonia",
      puntosClave: [
        "Escala Internacional: Investigaciones en México y Cuba (Sifuentes, 2016; Obando, 2014) prueban la alta efectividad del 360° formativo en educación superior.",
        "Escala Nacional: Estudios sobre carrera académica (Marquina, 2012; Pérez, 2021) alertan sobre la primacía del posgrado y el descuido de la didáctica y la tutoría virtual.",
        "Escala Regional/UNCo: El Estatuto 2025 y la Res. 196/2022 proveen el marco formal pero evidencian la ausencia de circuitos sistemáticos de retroalimentación reflexiva.",
        "Vacancia Científica: Inexistencia de estudios empíricos de factibilidad integral 360° en universidades públicas cogobernadas con redes territoriales híbridas en la Patagonia."
      ],
      metadatosFooter: "Estado del Arte • Vacancia de Investigación • Aporte Original al CURZAS",
      escena3D: "anim_19",
      guionOrador: "La revisión del estado del arte en tres escalas —internacional, nacional y regional— nos confirmó una clara vacancia de conocimiento: no se registran en la literatura científica estudios sobre la factibilidad integral (normativa, técnica, organizativa y de gobernanza) de un circuito formativo 360° en una universidad pública descentralizada, con cogobierno colegiado y docencia híbrida en territorio patagónico. En esa vacancia radica la originalidad y el valor público de este proyecto."
    },

    // ═════════════════════════════════════════════════════════════════════════
    // SECCIÓN 4: TIEMPO 3 — METODOLOGÍA, OPERACIONALIZACIÓN Y ÉTICA (18 a 23)
    // ═════════════════════════════════════════════════════════════════════════
    {
      id: "slide_18",
      numero: 18,
      bloque: "TIEMPO 3: METODOLOGÍA",
      esquema: "Diseño Metodológico Mixto",
      badge: "Tercera Parte • Metodología",
      titulo: "Estrategia Metodológica y Diseño de la Investigación",
      subtitulo: "Enfoque Mixto con Predominio Cualitativo ($CUAL \\rightarrow cuan$) y Estudio de Caso Situado",
      puntosClave: [
        "Enfoque Metodológico Mixto ($CUAL \\rightarrow cuan$): Prioridad cualitativa para profundizar en sentidos y acuerdos, complementada con sondeo cuantitativo descriptivo.",
        "Alcance de la Investigación: Descriptivo (prácticas vigentes), exploratorio (factibilidad del 360°) y propositivo (lineamientos orientativos).",
        "Diseño de Caso Situado: Estudio de caso institucional en el Dpto. de Administración Pública (CURZAS-UNCo), no experimental y transversal (ciclo lectivo 2027).",
        "Unidad de Análisis: El Departamento de Administración Pública en su doble dimensión: Sede Central Viedma y Nodos Territoriales."
      ],
      metadatosFooter: "Diseño Mixto (Sampieri) • Estudio de Caso (Flyvbjerg) • Ciclo Lectivo 2027",
      escena3D: "anim_17",
      guionOrador: "Ingresamos al desarrollo metodológico de la Tercera Parte. Adoptamos un enfoque mixto con predominio cualitativo ($CUAL \\rightarrow cuan$). La prioridad cualitativa permite comprender las percepciones, temores y condiciones de acuerdo de la comunidad universitaria, mientras que el componente cuantitativo aporta frecuencias descriptivas sobre la factibilidad. El diseño corresponde a un estudio de caso situado, no experimental y transversal, delimitado al ciclo lectivo 2027."
    },

    {
      id: "slide_19",
      numero: 19,
      bloque: "TIEMPO 3: METODOLOGÍA",
      esquema: "Población, Muestra y Técnicas",
      badge: "Muestreo Riguroso y Factible",
      titulo: "Población, Muestra y Técnicas de Recolección",
      subtitulo: "Diseño Muestral Intencional y Triangulación de Tres Técnicas Complementarias",
      puntosClave: [
        "Muestra Cualitativa (8 Entrevistas en Profundidad): 4 docentes de cátedra (presenciales y tutores de nodos), 2 autoridades, 1 representante de ADUNC y 1 estudiante avanzado.",
        "Sondeo Cuantitativo Exploratorio (45 Participantes): Cuestionario digital autoadministrado a 15 docentes y 30 estudiantes con 15 reactivos Likert.",
        "Técnica 1: Análisis documental normativo (Estatuto Ord. 0988/2025, Ord. 0910/1997, CCT Dec. 1246/2015 y Res. 196/2022).",
        "Técnicas 2 y 3: Entrevistas semiestructuradas con guía temática y cuestionario digital estructurado en escala Likert."
      ],
      metadatosFooter: "Muestra Intencional • 8 Entrevistas • 45 Cuestionarios • Triangulación",
      escena3D: "anim_03",
      guionOrador: "Dado que el proyecto es ejecutado por un único investigador, el muestreo se diseñó bajo criterios de viabilidad operativa y rigor científico. La muestra cualitativa abarca 8 entrevistas a informantes clave: docentes de distintas categorías, autoridades departamentales, dirigentes gremiales de ADUNC y estudiantes avanzados. Esto se triangula con un sondeo exploratorio a 45 respondientes y el análisis exhaustivo de la normativa universitaria y paritaria."
    },

    {
      id: "slide_20",
      numero: 20,
      bloque: "TIEMPO 3: METODOLOGÍA",
      esquema: "Matriz de Operacionalización",
      badge: "Las 5 Dimensiones",
      titulo: "Matriz de Operacionalización en Cinco Dimensiones",
      subtitulo: "Variables, Indicadores Empíricos y Fuentes para Medir la Factibilidad Integral",
      puntosClave: [
        "1. Normativa y Estatutaria: Compatibilidad estatutaria, cláusula de no sumatividad y desvinculación de los jurados de permanencia.",
        "2. Técnica e Instrumental: Accesibilidad en Moodle/SIU, inhabilitación de logs/IP, tiempo de respuesta menor a 15 min y mitigación de fatiga.",
        "3. Organizacional y Procedimental: Capacidad departamental de procesamiento y transferencia de demandas al Programa Anual (Art. 76).",
        "4. Cultural y Actitudinal: Confianza en el fin formativo, disposición a la autorreflexión docente y legitimidad del juicio estudiantil.",
        "5. Gobernanza Multinivel: Tratamiento colegiado en Consejo Departamental y Directivo, y concertación paritaria con ADUNC."
      ],
      metadatosFooter: "Matriz de Operacionalización • 5 Dimensiones de Factibilidad • Longo & Matus",
      escena3D: "anim_18",
      guionOrador: "La factibilidad se operacionaliza a través de una matriz rigurosa dividida en cinco dimensiones: la normativa, que garantiza el apego al Estatuto y al CCT; la técnica, que asegura el software y el anonimato; la organizacional, que mide la capacidad de gestión del Departamento; la cultural, que evalúa el clima de confianza; y la gobernanza, que asegura el tratamiento en cogobierno y la concertación paritaria."
    },

    {
      id: "slide_21",
      numero: 21,
      bloque: "TIEMPO 3: METODOLOGÍA",
      esquema: "Fases de Campo y Cronograma",
      badge: "Plan de Trabajo 2027",
      titulo: "Procedimiento, Fases del Trabajo de Campo y Cronograma",
      subtitulo: "Seis Fases Secuenciales a lo Largo de Siete Meses Intensivos de Ejecución (Mayo a Noviembre 2027)",
      puntosClave: [
        "Fase 1 (Mes 1 / Mayo): Gestión de avales departamentales, contacto con ADUNC y prueba piloto de instrumentos con docentes y alumnos.",
        "Fase 2 (Mes 2 / Junio): Relevamiento normativo formal y concreción de las 8 entrevistas semiestructuradas a informantes clave.",
        "Fase 3 (Mes 3 / Julio): Aplicación y depuración del cuestionario digital autoadministrado a docentes y estudiantes en Viedma y Nodos.",
        "Fases 4 a 6 (Meses 4 a 7 / Ago-Nov): Procesamiento analítico y triangulación, redacción de lineamientos de TFG, supervisión final y defensa oral."
      ],
      metadatosFooter: "Cronograma 7 Meses • Mayo a Noviembre 2027 • 6 Fases Secuenciales",
      escena3D: "anim_12",
      guionOrador: "El trabajo de campo se organiza en un cronograma intensivo y viable de 7 meses durante 2027. Comienza en mayo con los avales y la prueba piloto; continúa en junio con las entrevistas y el análisis normativo; en julio se aplica el sondeo digital; en agosto se realiza la triangulación analítica; en septiembre y octubre se redactan los lineamientos y el borrador de tesina; y en noviembre se proyecta la entrega final y defensa oral."
    },

    {
      id: "slide_22",
      numero: 22,
      bloque: "TIEMPO 3: METODOLOGÍA",
      esquema: "Apartado 9: Viabilidad Integral de Recursos",
      badge: "Viabilidad de Recursos (TP4)",
      titulo: "Viabilidad Integral del Proyecto: Recursos y Avales",
      subtitulo: "Especificación de Recursos Humanos, Técnicos y Económicos Disponibles (Apartado 9 del TFG)",
      puntosClave: [
        "Recursos Humanos: Investigador individual con formación previa de Técnico Superior en RRHH, dirección académica y colaboración de cátedras.",
        "Recursos Técnicos y Tecnológicos: Infraestructura Moodle del CURZAS, SIU-Guaraní, paquetes de software de código abierto (R / PSPP) y Quarto.",
        "Recursos Económicos y Financieros: Proyecto de costo marginal cero; no compromete partidas presupuestarias institucionales adicionales.",
        "Autorizaciones y Avales Institucionales: Solicitud formal de aval académico ante la Dirección del Departamento y el Decanato del CURZAS."
      ],
      metadatosFooter: "Apartado 9 Oficial • Recursos Humanos, Técnicos y Financieros • Costo Marginal Cero",
      escena3D: "anim_15",
      guionOrador: "En estricto cumplimiento del Apartado 9 de la consigna del TP N° 4, especificamos la viabilidad integral de recursos. En lo humano, el tesista cuenta con base técnica previa y acompañamiento docente; en lo técnico, se aprovecha la infraestructura tecnológica ya instalada en el CURZAS sin necesidad de licencias comerciales; y en lo económico, el proyecto es de costo marginal cero para la universidad pública, garantizando su plena viabilidad operativa."
    },

    {
      id: "slide_23",
      numero: 23,
      bloque: "TIEMPO 3: METODOLOGÍA",
      esquema: "Consideraciones Éticas y Resguardo",
      badge: "Garantías y Ley 25.326",
      titulo: "Garantías Éticas, Protección de Datos y No Afectación Laboral",
      subtitulo: "Blindaje Institucional para Asegurar la Participación Libre y Segura",
      puntosClave: [
        "Protección de Datos (Ley N° 25.326): Disociación estricta entre respuestas e identidad, sin registro de correos ni direcciones IP.",
        "Mitigación de Deducción Identitaria: Agrupamiento de variables demográficas en cátedras con pocos integrantes para impedir inferencias.",
        "Consentimiento Informado: Validación previa y voluntaria de participación en entrevistas y sondeos mediante formulario digital.",
        "Garantía de No Afectación Laboral: En sintonía con el CCT Docente, los datos se reservan a fines académicos del TFG, sin acceso para jurados de permanencia."
      ],
      metadatosFooter: "Ley 25.326 • Consentimiento Informado • Blindaje Ético de No Afectación",
      escena3D: "anim_16",
      guionOrador: "El proyecto asume un compromiso ético irrestricto. Conforme a la Ley Nacional 25.326, se garantiza la total disociación de datos: los formularios no registran correos ni IPs. En cátedras unipersonales o con pocos docentes se agrupan variables para impedir la deducción de identidades. Y fundamentalmente, se suscribe el compromiso de no afectación laboral: la información nunca integrará expedientes de permanencia o sumarios."
    },

    // ═════════════════════════════════════════════════════════════════════════
    // SECCIÓN 5: SÍNTESIS, CONCLUSIONES Y DESPEDIDA FORMAL (24 y 25)
    // ═════════════════════════════════════════════════════════════════════════
    {
      id: "slide_24",
      numero: 24,
      bloque: "CIERRE Y CONCLUSIONES",
      esquema: "Síntesis de Factibilidad y Conclusiones",
      badge: "Conclusiones del TFG",
      titulo: "Síntesis de Factibilidad, Conclusiones y Valor Público",
      subtitulo: "Hacia una Evaluación Docente Formativa, Situada y Democrática en el CURZAS-UNCo",
      puntosClave: [
        "Síntesis de Factibilidad: La viabilidad es plenamente alcanzable si se asegura el desacoplamiento del Art. 75 y el anonimato técnico.",
        "Aporte Teórico-Disciplinar: Enriquecer el campo de la Gestión de Recursos Humanos públicos con evidencia empírica situada en la Patagonia.",
        "Aporte a la Universidad Pública: Fortalecer las capacidades pedagógicas de las cátedras que sostienen la educación en parajes patagónicos.",
        "Autonomía y Desarrollo: Brindar herramientas diagnósticas propias a las autoridades universitarias para una toma de decisiones informada."
      ],
      metadatosFooter: "Factibilidad Integral • Valor Público Universitario • CURZAS-UNCo",
      escena3D: "anim_20",
      guionOrador: "A modo de síntesis, las conclusiones preliminares demuestran que la factibilidad de un modelo 360° en el CURZAS es plenamente alcanzable si se respetan las dos condiciones de borde: el desacoplamiento del Artículo 75 punitivo y el blindaje de anonimato técnico. Este TFG aporta evidencia empírica situada para que nuestra universidad fortalezca su docencia híbrida con herramientas propias, generando valor público real en toda la región."
    },

    {
      id: "slide_25",
      numero: 25,
      bloque: "AGRADECIMIENTOS Y DESPEDIDA",
      esquema: "Despedida Formal y Apertura al Tribunal",
      badge: "Defensa Oral • Cierre",
      titulo: "Agradecimiento Institucional y Cierre de la Exposición",
      subtitulo: "Culminación del Seminario de Integración y Aplicación • Espacio para el Tribunal Evaluador",
      puntosClave: [
        "Agradecimiento al Equipo Docente del SIA: Reconocimiento a la Dra. Deborah Noguera, Esp. Federico Abeiro y Esp. María Cecilia Aguirre por sus orientaciones y rigor metodológico.",
        "Gratitud a la Universidad Pública: Al Departamento de Administración Pública y al CURZAS-UNCo por brindar educación superior gratuita, inclusiva y de excelencia.",
        "Hito de Graduación: Cierre formal del proceso de formulación de tesina rumbo a la obtención del título de Licenciado en Gestión de Recursos Humanos.",
        "Apertura al Intercambio: Quedo a entera disposición de los profesores para sus preguntas, observaciones y sugerencias orientadoras."
      ],
      metadatosFooter: "Fin de Exposición • 30 Minutos • Espacio de Intercambio con el Tribunal",
      escena3D: "anim_01",
      guionOrador: "Concluyo esta defensa oral agradeciendo profundamente a los docentes del Seminario de Integración y Aplicación, Dra. Deborah Noguera, Esp. Federico Abeiro y Esp. María Cecilia Aguirre, cuyas devoluciones en cada entrega guiaron con rigor este proyecto. También agradezco al CURZAS y a la Universidad Nacional del Comahue por permitirme transitar este camino de formación. Quedo a entera disposición del tribunal para responder a sus preguntas y recibir sus valiosas devoluciones. Muchas gracias."
    }
  ]
};

// Exportación global para el navegador
if (typeof window !== "undefined") {
  window.PRESENTACION_DATA = PRESENTACION_DATA;
}
