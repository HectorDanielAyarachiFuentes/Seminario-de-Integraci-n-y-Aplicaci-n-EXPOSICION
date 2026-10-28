/**
 * =============================================================================
 * CONTROLADOR PRINCIPAL — APLICACIÓN DE PRESENTACIÓN DE TESINA (20 FILMINAS)
 * Universidad Nacional del Comahue — CURZAS
 * Autor: Tec. Sup. en RRHH Héctor Daniel Ayarachi Fuentes
 * =============================================================================
 * Administra la navegación a través de las 20 filminas, el visor de diagramas
 * vectoriales SVG, el cronómetro de 30 minutos, el modo enfoque de texto
 * y el panel de respaldo metodológico de 7 pestañas para el jurado.
 */

class PresentationApp {
  constructor(data) {
    this.data = data;
    this.currentSlideIndex = 0;
    this.totalSlides = data.slides.length;

    // Cronómetro de 30 minutos
    this.totalSeconds = data.timing.totalMinutos * 60;
    this.elapsedSeconds = 0;
    this.timerRunning = false;
    this.timerInterval = null;

    // Estado del modo enfoque de texto (atenuación del fondo 3D)
    this.is3dDimmed = false;

    // Catálogo de Diagramas Vectoriales SVG Oficiales del TFG
    this.catalogoSVGs = [
      {
        id: "longo_oficial",
        titulo: "Subsistemas de la Gestión de Recursos Humanos",
        autor: "Francisco Longo (2006)",
        archivo: "assets/Sistemas-longo.svg",
        descripcion: "Diagrama arquitectónico central que modela la alineación estratégica, la planificación y la retroalimentación continua entre el Rendimiento y el Desarrollo Docente."
      },
      {
        id: "modelo_360_curzas",
        titulo: "Arquitectura Circular del Modelo de Retroalimentación 360°",
        autor: "Héctor Daniel Ayarachi Fuentes (2026)",
        archivo: "assets/modelo_360.svg",
        descripcion: "Triangulación formativa de 4 cuadrantes (Autoevaluación, Pares, Estudiantes, Dirección) con blindaje de anonimato y desacoplamiento estatutario del Art. 75."
      },
      {
        id: "red_nodos_territorio",
        titulo: "Mapeo Territorial y Red de Nodos de Docencia Híbrida",
        autor: "CURZAS-UNCo (Res. CD-CURZA N° 196/2022)",
        archivo: "assets/red_territorial.svg",
        descripcion: "Distribución geográfica de la Sede Cabecera Viedma y los Nodos Territoriales de Sierra Grande, Valcheta, Los Menucos y Ramos Mexía con mediaciones tecnológicas."
      },
      {
        id: "subsistemas_operativos",
        titulo: "Estrategia y Subsistemas de RRHH (Detalle Operativo)",
        autor: "Francisco Longo (2006)",
        archivo: "assets/subsistemas_longo.svg",
        descripcion: "Desglose técnico ampliado de las relaciones laborales, condiciones de compensación y organización del trabajo en el sector público."
      }
    ];

    // Elementos del DOM
    this.initDOMElements();

    // Inicializar Motor 3D
    const canvas = document.getElementById("webgl-canvas");
    this.engine3D = new window.Presentation3D(canvas);

    // Configurar Eventos e Inicializar
    this.bindEvents();
    this.renderStationsIndicator();
    this.renderSlide(0);
    this.populateDrawerContent();
    this.renderSlidesIndex();
  }

  initDOMElements() {
    this.cardElement = document.getElementById("slide-card");
    this.badgeElement = document.getElementById("slide-badge");
    this.bloqueBadgeElement = document.getElementById("slide-bloque-badge");
    this.titleElement = document.getElementById("slide-title");
    this.subtitleElement = document.getElementById("slide-subtitle");
    this.bulletsElement = document.getElementById("slide-bullets");
    this.footerMetaElement = document.getElementById("slide-footer-meta");

    this.slideCounter = document.getElementById("slide-counter");
    this.slideCounterBadge = document.getElementById("slide-counter-badge");
    this.slidesIndexPanel = document.getElementById("slides-index-panel");
    this.slidesIndexBackdrop = document.getElementById("slides-index-backdrop");
    this.slidesIndexBody = document.getElementById("slides-index-body");
    this.btnCloseSlidesIndex = document.getElementById("btn-close-slides-index");

    this.timerDisplay = document.getElementById("timer-display");
    this.btnTimerToggle = document.getElementById("btn-timer-toggle");
    this.btnTimerReset = document.getElementById("btn-timer-reset");

    this.btnPrev = document.getElementById("btn-prev");
    this.btnNext = document.getElementById("btn-next");
    this.stationsContainer = document.getElementById("stations-indicator");

    this.notesModal = document.getElementById("notes-modal");
    this.notesBody = document.getElementById("notes-body");
    this.btnToggleNotes = document.getElementById("btn-toggle-notes");
    this.btnCloseNotes = document.getElementById("btn-close-notes");

    this.drawerBackdrop = document.getElementById("drawer-backdrop");
    this.drawerPanel = document.getElementById("drawer-panel");
    this.btnToggleDrawer = document.getElementById("btn-toggle-drawer");
    this.btnCloseDrawer = document.getElementById("btn-close-drawer");
    this.drawerContent = document.getElementById("drawer-content");

    this.btnDim3d = document.getElementById("btn-dim-3d");
    this.btnReset3d = document.getElementById("btn-reset-3d");
    this.canvas = document.getElementById("webgl-canvas");

    // Barra de Progreso Superior
    this.progressBar = document.getElementById("presentation-progress-bar");

    // Nuevos Controles: Pantalla Completa y Atajos de Teclado
    this.btnFullscreen = document.getElementById("btn-toggle-fullscreen");
    this.btnShortcuts = document.getElementById("btn-toggle-shortcuts");
    this.shortcutsModal = document.getElementById("shortcuts-modal");
    this.shortcutsBackdrop = document.getElementById("shortcuts-backdrop");
    this.btnCloseShortcuts = document.getElementById("btn-close-shortcuts");

    // Controles táctiles y móviles: Toggle de Filmina / 3D Full-screen
    this.btnToggle3dView = document.getElementById("btn-toggle-3d-view");
    this.btnFloatingCardToggle = document.getElementById("btn-floating-card-toggle");
    this.mainStage = document.getElementById("main-stage");
    this.isCardMinimized = false;

    // Modal Visor SVG Interactivo con Zoom y Pan
    this.svgModal = document.getElementById("svg-modal");
    this.svgModalBackdrop = document.getElementById("svg-modal-backdrop");
    this.svgModalTitle = document.getElementById("svg-modal-title");
    this.svgModalImg = document.getElementById("svg-modal-img");
    this.btnCloseSvg = document.getElementById("btn-close-svg");
    this.svgViewport = document.getElementById("svg-viewport");
    this.svgZoomLevel = document.getElementById("svg-zoom-level");
    this.btnSvgZoomIn = document.getElementById("btn-svg-zoom-in");
    this.btnSvgZoomOut = document.getElementById("btn-svg-zoom-out");
    this.btnSvgReset = document.getElementById("btn-svg-reset");
    this.btnSvgFit = document.getElementById("btn-svg-fit");
    this.btnSvgMaximize = document.getElementById("btn-svg-maximize");
    this.btnSvgNewTab = document.getElementById("btn-svg-newtab");

    // Estado de Zoom y Desplazamiento (Pan) del SVG
    this.isSvgDragging = false;
    this.svgDragStartX = 0;
    this.svgDragStartY = 0;
    this.isSvgMaximized = false;

    // Catálogo y Visor de Material de Cátedra (95 Documentos)
    this.catedraData = (typeof window !== 'undefined' && window.CATEDRA_MATERIAL_DATA) || (typeof CATEDRA_MATERIAL_DATA !== 'undefined' ? CATEDRA_MATERIAL_DATA : []);
    this.docModal = document.getElementById("doc-modal");
    this.docModalBackdrop = document.getElementById("doc-modal-backdrop");
    this.docModalFrame = document.getElementById("doc-modal-frame");
    this.docModalFallback = document.getElementById("doc-modal-fallback");
    this.docFallbackTitle = document.getElementById("doc-fallback-title");
    this.docFallbackDesc = document.getElementById("doc-fallback-desc");
    this.btnDocFallbackDownload = document.getElementById("btn-doc-fallback-download");
    this.btnDocFallbackOpen = document.getElementById("btn-doc-fallback-open");
    this.docModalTitle = document.getElementById("doc-modal-title");
    this.docModalBadge = document.getElementById("doc-modal-badge");
    this.docModalBreadcrumb = document.getElementById("doc-modal-breadcrumb");
    this.btnDocMaximize = document.getElementById("btn-doc-maximize");
    this.btnDocNewtab = document.getElementById("btn-doc-newtab");
    this.btnDocDownload = document.getElementById("btn-doc-download");
    this.btnCloseDoc = document.getElementById("btn-close-doc");
    this.btnToggleCatedra = document.getElementById("btn-toggle-catedra");
    this.isDocMaximized = false;
    this.currentCatedraFilter = "all";
    this.currentCatedraSearch = "";

  }

  bindEvents() {
    // Botones de Navegación
    this.btnPrev.addEventListener("click", () => this.prevSlide());
    this.btnNext.addEventListener("click", () => this.nextSlide());

    // Cronómetro
    this.btnTimerToggle.addEventListener("click", () => this.toggleTimer());
    this.btnTimerReset.addEventListener("click", () => this.resetTimer());

    // Modal de Notas de Orador
    this.btnToggleNotes.addEventListener("click", () => this.toggleNotes());
    this.btnCloseNotes.addEventListener("click", () => this.toggleNotes(false));

    // Drawer de Respaldo Metodológico
    this.btnToggleDrawer.addEventListener("click", () => this.toggleDrawer());
    this.btnCloseDrawer.addEventListener("click", () => this.toggleDrawer(false));
    this.drawerBackdrop.addEventListener("click", () => this.toggleDrawer(false));

    // Pantalla Completa
    if (this.btnFullscreen) {
      this.btnFullscreen.addEventListener("click", () => this.toggleFullscreen());
    }
    document.addEventListener("fullscreenchange", () => {
      const isFull = !!document.fullscreenElement;
      if (this.btnFullscreen) {
        this.btnFullscreen.classList.toggle("active", isFull);
        const text = this.btnFullscreen.querySelector(".tool-text");
        if (text) text.textContent = isFull ? "Restaurar" : "Pantalla Completa";
      }
    });

    // Modal de Atajos de Teclado
    if (this.btnShortcuts) {
      this.btnShortcuts.addEventListener("click", () => this.toggleShortcuts());
    }
    if (this.btnCloseShortcuts) {
      this.btnCloseShortcuts.addEventListener("click", () => this.toggleShortcuts(false));
    }
    if (this.shortcutsBackdrop) {
      this.shortcutsBackdrop.addEventListener("click", () => this.toggleShortcuts(false));
    }

    // Modal Índice Canónico de los 3 Grandes Ejes
    if (this.slideCounterBadge) {
      this.slideCounterBadge.addEventListener("click", () => this.toggleSlidesIndex());
    }
    if (this.btnCloseSlidesIndex) {
      this.btnCloseSlidesIndex.addEventListener("click", () => this.toggleSlidesIndex(false));
    }
    if (this.slidesIndexBackdrop) {
      this.slidesIndexBackdrop.addEventListener("click", () => this.toggleSlidesIndex(false));
    }

    // Toggle de filmina / escultura 3D en dispositivos móviles y tablets
    if (this.btnToggle3dView) {
      this.btnToggle3dView.addEventListener("click", () => this.toggleMobile3dView());
    }
    if (this.btnFloatingCardToggle) {
      this.btnFloatingCardToggle.addEventListener("click", () => this.toggleMobile3dView(false));
    }

    // Gestos Táctiles (Swipe Izquierda / Derecha) para Celulares y Tablets
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    if (this.mainStage) {
      this.mainStage.addEventListener("touchstart", (e) => {
        if (e.touches.length === 1) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
          touchStartTime = Date.now();
        }
      }, { passive: true });

      this.mainStage.addEventListener("touchend", (e) => {
        if (e.changedTouches.length === 1) {
          const touchEndX = e.changedTouches[0].clientX;
          const touchEndY = e.changedTouches[0].clientY;
          const diffX = touchEndX - touchStartX;
          const diffY = touchEndY - touchStartY;
          const elapsed = Date.now() - touchStartTime;

          // Desplazamiento horizontal claro: más de 45px y al menos 1.3 veces mayor que el vertical
          if (Math.abs(diffX) > 45 && Math.abs(diffX) > 1.3 * Math.abs(diffY) && elapsed < 650) {
            if (diffX < 0) {
              this.nextSlide();
            } else {
              this.prevSlide();
            }
          }
        }
      }, { passive: true });
    }

    // Modal Visor SVG y Controles de Zoom / Desplazamiento
    if (this.btnCloseSvg) {
      this.btnCloseSvg.addEventListener("click", () => this.closeSvgModal());
    }
    if (this.svgModalBackdrop) {
      this.svgModalBackdrop.addEventListener("click", () => this.closeSvgModal());
    }
    if (this.btnSvgZoomIn) {
      this.btnSvgZoomIn.addEventListener("click", () => this.zoomSvg(0.25));
    }
    if (this.btnSvgZoomOut) {
      this.btnSvgZoomOut.addEventListener("click", () => this.zoomSvg(-0.25));
    }
    if (this.btnSvgReset) {
      this.btnSvgReset.addEventListener("click", () => this.resetSvgTransform());
    }
    if (this.btnSvgFit) {
      this.btnSvgFit.addEventListener("click", () => this.fitSvgTransform());
    }
    if (this.btnSvgMaximize) {
      this.btnSvgMaximize.addEventListener("click", () => this.toggleSvgMaximize());
    }

    // Interacciones gestuales y de ratón en el viewport del SVG
    if (this.svgViewport) {
      // Zoom progresivo mediante rueda del mouse
      this.svgViewport.addEventListener("wheel", (e) => {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 0.2 : -0.2;
        this.zoomSvg(delta);
      }, { passive: false });

      // Doble clic para alternar entre tamaño normal (100%) y ampliado (200%)
      this.svgViewport.addEventListener("dblclick", (e) => {
        e.preventDefault();
        if (this.svgZoom > 1.25) {
          this.resetSvgTransform();
        } else {
          this.setSvgZoom(2.0);
        }
      });

      // Arrastre libre (Pan) con clic sostenido
      this.svgViewport.addEventListener("pointerdown", (e) => {
        if (e.button !== 0) return; // Solo clic izquierdo
        this.isSvgDragging = true;
        this.svgDragStartX = e.clientX - this.svgPanX;
        this.svgDragStartY = e.clientY - this.svgPanY;
        this.svgViewport.classList.add("dragging");
        this.svgViewport.setPointerCapture(e.pointerId);
      });

      this.svgViewport.addEventListener("pointermove", (e) => {
        if (!this.isSvgDragging) return;
        this.svgPanX = e.clientX - this.svgDragStartX;
        this.svgPanY = e.clientY - this.svgDragStartY;
        this.updateSvgTransform();
      });

      const finalizarArrastre = (e) => {
        if (this.isSvgDragging) {
          this.isSvgDragging = false;
          this.svgViewport.classList.remove("dragging");
          try {
            this.svgViewport.releasePointerCapture(e.pointerId);
          } catch (_) {}
        }
      };

      this.svgViewport.addEventListener("pointerup", finalizarArrastre);
      this.svgViewport.addEventListener("pointercancel", finalizarArrastre);
    }

    // Modo Enfoque de Texto (Atenuar 3D)
    if (this.btnDim3d) {
      this.btnDim3d.addEventListener("click", () => this.toggle3dDim());
    }

    // Restablecer y Centrar Vista 3D
    if (this.btnReset3d) {
      this.btnReset3d.addEventListener("click", () => this.engine3D?.resetUserControls());
    }

    // Pestañas del Drawer (7 categorías)
    document.querySelectorAll(".drawer-tab").forEach((tab) => {
      tab.addEventListener("click", (e) => {
        document.querySelectorAll(".drawer-tab").forEach((t) => t.classList.remove("active"));
        e.currentTarget.classList.add("active");
        this.renderDrawerTab(e.currentTarget.dataset.tab);
      });
    });

    // Atajos de Teclado Profesionales
    window.addEventListener("keydown", (e) => {
      // Si el modal SVG está abierto, priorizar atajos de lupa y escape
      if (this.svgModal && this.svgModal.classList.contains("open")) {
        if (e.key === "+" || e.key === "=") {
          this.zoomSvg(0.25);
          return;
        } else if (e.key === "-" || e.key === "_") {
          this.zoomSvg(-0.25);
          return;
        } else if (e.key === "0") {
          this.resetSvgTransform();
          return;
        } else if (e.key.toLowerCase() === "m") {
          this.toggleSvgMaximize();
          return;
        } else if (e.key === "Escape") {
          this.closeSvgModal();
          return;
        }
      }

      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        if (e.repeat) {
          const now = performance.now();
          if (now - (this.lastRepeatKeyTime || 0) < 180) {
            e.preventDefault();
            return;
          }
          this.lastRepeatKeyTime = now;
        }
        e.preventDefault();
        this.nextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        if (e.repeat) {
          const now = performance.now();
          if (now - (this.lastRepeatKeyTime || 0) < 180) {
            e.preventDefault();
            return;
          }
          this.lastRepeatKeyTime = now;
        }
        e.preventDefault();
        this.prevSlide();
      } else if (e.key.toLowerCase() === "n") {
        this.toggleNotes();
      } else if (e.key.toLowerCase() === "m") {
        this.toggleDrawer();
      } else if (e.key.toLowerCase() === "r") {
        this.engine3D?.resetUserControls();
      } else if (e.key.toLowerCase() === "v") {
        // Atajo V: Ver diagrama SVG de la filmina actual si existe
        const slide = this.data.slides[this.currentSlideIndex];
        if (slide.diagramaSVG) {
          this.openSvgModal(slide.diagramaSVG, slide.titulo);
        } else {
          this.toggleDrawer(true);
          document.querySelector('[data-tab="svgs"]')?.click();
        }
      } else if (e.key.toLowerCase() === "d") {
        this.toggle3dDim();
      } else if (e.key.toLowerCase() === "t") {
        this.toggleTimer();
      } else if (e.key.toLowerCase() === "f") {
        this.toggleFullscreen();
      } else if (e.key.toLowerCase() === "i") {
        this.toggleSlidesIndex();
      } else if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        this.toggleShortcuts();
      } else if (e.key === "Escape") {
        this.closeSvgModal();
        this.toggleNotes(false);
        this.toggleDrawer(false);
        this.toggleShortcuts(false);
        this.toggleSlidesIndex(false);
      }
    });

  }


  getDefenseSections() {
    return [
      {
        id: "apertura",
        code: "APERTURA",
        shortLabel: "Apertura",
        title: "Apertura Institucional y Hoja de Ruta",
        range: [0, 4], // filminas 1 a 5
        isEje: false
      },
      {
        id: "eje1",
        code: "EJE I",
        shortLabel: "Eje I: Objeto Problema",
        title: "EJE I (Tiempo 1): El Objeto Problema, Territorio y Objetivos",
        range: [5, 10], // filminas 6 a 11
        isEje: true,
        ejeNumber: 1
      },
      {
        id: "eje2",
        code: "EJE II",
        shortLabel: "Eje II: Marco Teórico",
        title: "EJE II (Tiempo 2): Marco Teórico Sustantivo y Modelo 360°",
        range: [11, 16], // filminas 12 a 17
        isEje: true,
        ejeNumber: 2
      },
      {
        id: "eje3",
        code: "EJE III",
        shortLabel: "Eje III: Metodología",
        title: "EJE III (Tiempo 3): Metodología Mixta y Factibilidad",
        range: [17, 22], // filminas 18 a 23
        isEje: true,
        ejeNumber: 3
      },
      {
        id: "cierre",
        code: "CIERRE",
        shortLabel: "Cierre y Defensa",
        title: "Cierre: Síntesis de Factibilidad y Tribunal Evaluador",
        range: [23, 24], // filminas 24 y 25
        isEje: false
      }
    ];
  }

  renderStationsIndicator() {
    if (!this.stationsContainer) return;
    this.stationsContainer.innerHTML = "";
    const sections = this.getDefenseSections();

    sections.forEach((sec, sIdx) => {
      if (sIdx > 0) {
        const divider = document.createElement("div");
        divider.className = "station-group-divider";
        divider.setAttribute("aria-hidden", "true");
        this.stationsContainer.appendChild(divider);
      }

      const groupEl = document.createElement("div");
      groupEl.className = `station-group ${sec.isEje ? "station-group-eje" : ""}`;
      groupEl.setAttribute("data-section", sec.id);
      groupEl.setAttribute("title", sec.title);

      for (let i = sec.range[0]; i <= sec.range[1]; i++) {
        const slide = this.data.slides[i];
        const dot = document.createElement("button");
        dot.className = `station-dot ${i === this.currentSlideIndex ? "active" : ""}`;
        dot.setAttribute("data-slide-index", i + 1);
        const tooltipText = `[${sec.code} • F${i + 1}] ${slide.esquema}`;
        dot.setAttribute("data-tooltip", tooltipText);
        dot.setAttribute("aria-label", `Ir a ${tooltipText}`);

        dot.innerHTML = `
          <span class="station-dot-hitbox" aria-hidden="true"></span>
          <span class="station-dot-core" aria-hidden="true"></span>
        `;

        dot.addEventListener("click", () => this.goToSlide(i));
        groupEl.appendChild(dot);
      }

      this.stationsContainer.appendChild(groupEl);
    });
  }

  renderSlidesIndex() {
    if (!this.slidesIndexBody) return;
    this.slidesIndexBody.innerHTML = "";
    const sections = this.getDefenseSections();

    sections.forEach((sec) => {
      const card = document.createElement("div");
      const isEjeActive = this.currentSlideIndex >= sec.range[0] && this.currentSlideIndex <= sec.range[1];
      card.className = `index-section-card ${sec.isEje ? "section-eje" : ""} ${isEjeActive ? "active-eje" : ""}`;

      const count = sec.range[1] - sec.range[0] + 1;
      card.innerHTML = `
        <div class="index-section-header">
          <span class="index-section-badge ${sec.isEje ? "badge-eje" : ""}">${sec.code}</span>
          <h4 class="index-section-title">${sec.title}</h4>
          <span class="index-section-count">${count} filmina${count > 1 ? "s" : ""}</span>
        </div>
      `;

      const grid = document.createElement("div");
      grid.className = "index-slide-grid";

      for (let i = sec.range[0]; i <= sec.range[1]; i++) {
        const slide = this.data.slides[i];
        const isCurrent = i === this.currentSlideIndex;
        const btn = document.createElement("button");
        btn.className = `index-slide-btn ${isCurrent ? "active" : ""}`;
        btn.setAttribute("data-slide-idx", i);
        btn.innerHTML = `
          <span class="index-slide-num">${i + 1 < 10 ? "0" + (i + 1) : i + 1}</span>
          <span class="index-slide-content">
            <strong class="index-slide-esquema">${slide.esquema}</strong>
            <span class="index-slide-titulo">${slide.titulo}</span>
          </span>
          ${isCurrent ? '<span class="index-slide-current-pill">Actual</span>' : ""}
        `;
        btn.addEventListener("click", () => {
          this.goToSlide(i);
          this.toggleSlidesIndex(false);
        });
        grid.appendChild(btn);
      }

      card.appendChild(grid);
      this.slidesIndexBody.appendChild(card);
    });
  }

  toggleSlidesIndex(force) {
    if (!this.slidesIndexPanel) return;
    const isCurrentlyOpen = this.slidesIndexPanel.classList.contains("open");
    const willOpen = force !== undefined ? force : !isCurrentlyOpen;

    if (willOpen) {
      this.slidesIndexPanel.classList.add("open");
      this.slidesIndexBackdrop?.classList.add("open");
      this.slideCounterBadge?.classList.add("active");
      this.renderSlidesIndex();
      setTimeout(() => {
        const activeBtn = this.slidesIndexBody?.querySelector(".index-slide-btn.active");
        if (activeBtn) activeBtn.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }, 80);
    } else {
      this.slidesIndexPanel.classList.remove("open");
      this.slidesIndexBackdrop?.classList.remove("open");
      this.slideCounterBadge?.classList.remove("active");
    }
  }

  applySlideDOM(slide, index) {
    this.badgeElement.textContent = `FILMINA ${index + 1} / ${this.totalSlides} • ${slide.badge}`;
    if (this.bloqueBadgeElement) {
      this.bloqueBadgeElement.textContent = slide.bloque || "SIA 2026";
    }
    this.titleElement.textContent = slide.titulo;
    this.subtitleElement.textContent = slide.subtitulo;

    // Actualizar barra de progreso superior de la presentación
    if (this.progressBar) {
      const pct = Math.round(((index + 1) / this.totalSlides) * 100);
      this.progressBar.style.width = `${pct}%`;
      this.progressBar.setAttribute("aria-valuenow", index + 1);
    }

    this.bulletsElement.innerHTML = "";
    slide.puntosClave.forEach((punto) => {
      const li = document.createElement("li");
      li.textContent = punto;
      this.bulletsElement.appendChild(li);
    });

    if (slide.diagramaSVG) {
      const svgActionBox = document.createElement("div");
      svgActionBox.className = "slide-svg-action";
      svgActionBox.innerHTML = `
        <button class="btn-open-svg" title="Agrandar y Explorar Mapa SVG en Alta Definición (Atajo: V)">
          <span>🔍 Agrandar y Explorar Mapa Conceptual (SVG)</span>
          <span class="shortcut-pill">V</span>
        </button>
      `;
      svgActionBox.querySelector("button").addEventListener("click", () => {
        this.openSvgModal(slide.diagramaSVG, slide.titulo);
      });
      this.bulletsElement.appendChild(svgActionBox);
    }

    this.footerMetaElement.innerHTML = `
      <span>📌 ${slide.metadatosFooter}</span>
      <span>⏱️ Ritmo sugerido: ~1.5 min</span>
    `;

    if (this.slideCounter) {
      this.slideCounter.textContent = `${index + 1} / ${this.totalSlides}`;
    }

    this.notesBody.innerHTML = `
      <p><strong>🎯 Objetivo de la Filmina ${index + 1}:</strong> ${slide.esquema}</p>
      <p style="margin-top: 0.6rem;">${slide.guionOrador}</p>
    `;
  }

  renderSlide(index, direction = 1) {
    const slide = this.data.slides[index];
    if (!slide) return;

    this.currentSlideIndex = index;

    // Actualizar visibilidad de HUD de red territorial (visible en mapa de territorio y red híbrida anim_06 / anim_07)
    const nodePill = document.getElementById("node-radar-pill");
    if (nodePill && slide.escena3D !== "anim_06" && slide.escena3D !== "anim_07") {
      nodePill.style.display = "none";
    }

    // Actualizar botones de navegación
    this.btnPrev.disabled = index === 0;
    this.btnNext.disabled = index === this.totalSlides - 1;

    // Sincronizar indicador de estaciones y grupos de Ejes
    const dots = this.stationsContainer.querySelectorAll(".station-dot");
    dots.forEach((dot) => {
      const dotIdx = parseInt(dot.getAttribute("data-slide-index"), 10) - 1;
      const isActive = dotIdx === index;
      dot.classList.toggle("active", isActive);
      if (isActive && window.gsap) {
        const core = dot.querySelector(".station-dot-core");
        if (core) {
          gsap.fromTo(core, { scale: 0.9 }, { scale: 1.5, duration: 0.35, ease: "back.out(2)" });
        }
      }
    });

    const sections = this.getDefenseSections();
    const groups = this.stationsContainer.querySelectorAll(".station-group");
    groups.forEach((group, sIdx) => {
      const sec = sections[sIdx];
      const isGroupActive = sec && index >= sec.range[0] && index <= sec.range[1];
      group.classList.toggle("active-group", isGroupActive);
    });

    // Actualizar botones del modal índice si está en el DOM
    if (this.slidesIndexBody) {
      this.slidesIndexBody.querySelectorAll(".index-slide-btn").forEach((btn) => {
        const bIdx = parseInt(btn.getAttribute("data-slide-idx"), 10);
        btn.classList.toggle("active", bIdx === index);
      });
      this.slidesIndexBody.querySelectorAll(".index-section-card").forEach((card, sIdx) => {
        const sec = sections[sIdx];
        card.classList.toggle("active-eje", sec && index >= sec.range[0] && index <= sec.range[1]);
      });
    }

    // Notificar al motor 3D con la dirección exacta (1 = adelante, -1 = atrás)
    this.engine3D.switchScene(slide.escena3D, direction);

    if (!window.gsap) {
      this.applySlideDOM(slide, index);
      return;
    }

    // Si es la primera carga inicial
    if (!this.hasRenderedFirst) {
      this.hasRenderedFirst = true;
      this.applySlideDOM(slide, index);
      gsap.set(this.bulletsElement, { x: 0, opacity: 1, clearProps: "transform,opacity" });
      gsap.fromTo(this.cardElement, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" });
      const bullets = this.bulletsElement.querySelectorAll("li");
      gsap.fromTo(bullets, { x: -16, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, stagger: 0.05, ease: "power2.out" });
      return;
    }

    // Detectar si el usuario está realizando una transición rápida (< 280ms)
    const now = performance.now();
    const isRapidNav = (now - (this.lastSlideRenderTime || 0)) < 280;
    this.lastSlideRenderTime = now;

    // Cancelar cualquier línea temporal o animación de filmina previa para evitar colisiones
    if (this.currentSlideTimeline) {
      this.currentSlideTimeline.kill();
      this.currentSlideTimeline = null;
    }

    const bulletsBefore = this.bulletsElement.querySelectorAll("li, .slide-svg-action");
    const exitTargets = [
      this.badgeElement,
      this.bloqueBadgeElement,
      this.titleElement,
      this.subtitleElement,
      ...bulletsBefore,
      this.footerMetaElement
    ];
    gsap.killTweensOf(exitTargets);

    const outX = direction >= 0 ? -22 : 22;
    const inX  = direction >= 0 ? 26 : -26;

    if (isRapidNav) {
      // MODO NAVEGACIÓN RÁPIDA: Inyección inmediata sin esperar la fase de salida
      this.applySlideDOM(slide, index);
      gsap.set(this.bulletsElement, { x: 0, opacity: 1, clearProps: "transform,opacity" });

      const headerTargets = [
        this.badgeElement,
        this.bloqueBadgeElement,
        this.titleElement,
        this.subtitleElement,
        this.footerMetaElement
      ];
      gsap.set(headerTargets, { x: inX * 0.5, opacity: 0 });

      const rapidTl = gsap.timeline({ defaults: { ease: "power2.out" } });
      this.currentSlideTimeline = rapidTl;

      rapidTl.to(headerTargets, {
        x: 0,
        opacity: 1,
        duration: 0.16,
        stagger: 0.015
      });

      const bullets = this.bulletsElement.querySelectorAll("li");
      if (bullets.length > 0) {
        gsap.set(bullets, { x: inX * 0.4, opacity: 0 });
        rapidTl.to(bullets, {
          x: 0,
          opacity: 1,
          duration: 0.16,
          stagger: 0.015
        }, "-=0.08");
      }

      if (this.slideCounter) {
        gsap.fromTo(this.slideCounter, { y: direction >= 0 ? -4 : 4, opacity: 0 }, { y: 0, opacity: 1, duration: 0.16 });
      }
      return;
    }

    // MODO NAVEGACIÓN ESTÁNDAR: Transición cinematográfica elegante
    gsap.to(exitTargets, {
      x: outX,
      opacity: 0,
      duration: 0.08,
      ease: "power2.in",
      onComplete: () => {
        this.applySlideDOM(slide, index);
        gsap.set(this.bulletsElement, { x: 0, opacity: 1, clearProps: "transform,opacity" });

        const headerTargets = [
          this.badgeElement,
          this.bloqueBadgeElement,
          this.titleElement,
          this.subtitleElement,
          this.footerMetaElement
        ];
        gsap.set(headerTargets, { x: inX, opacity: 0 });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        this.currentSlideTimeline = tl;

        tl.to([this.badgeElement, this.bloqueBadgeElement], {
          x: 0,
          opacity: 1,
          duration: 0.25,
          stagger: 0.03
        })
        .to(this.titleElement, {
          x: 0,
          opacity: 1,
          duration: 0.28
        }, "-=0.18")
        .to(this.subtitleElement, {
          x: 0,
          opacity: 0.85,
          duration: 0.25
        }, "-=0.20");

        const bullets = this.bulletsElement.querySelectorAll("li");
        if (bullets.length > 0) {
          gsap.set(bullets, { x: inX * 0.85, opacity: 0 });
          tl.to(bullets, {
            x: 0,
            opacity: 1,
            duration: 0.26,
            stagger: 0.035,
            ease: "power2.out"
          }, "-=0.15");
        }

        const svgBtn = this.bulletsElement.querySelector(".slide-svg-action");
        if (svgBtn) {
          gsap.set(svgBtn, { scale: 0.95, opacity: 0 });
          tl.to(svgBtn, {
            scale: 1,
            opacity: 1,
            duration: 0.22,
            ease: "power2.out"
          }, "-=0.08");
        }

        tl.to(this.footerMetaElement, {
          x: 0,
          opacity: 1,
          duration: 0.20
        }, "-=0.12");

        if (this.slideCounter) {
          gsap.fromTo(this.slideCounter, { y: direction >= 0 ? -6 : 6, opacity: 0 }, { y: 0, opacity: 1, duration: 0.22 });
        }
      }
    });
  }

  nextSlide() {
    if (this.currentSlideIndex < this.totalSlides - 1) {
      this.goToSlide(this.currentSlideIndex + 1);
    }
  }

  prevSlide() {
    if (this.currentSlideIndex > 0) {
      this.goToSlide(this.currentSlideIndex - 1);
    }
  }

  goToSlide(index) {
    if (index === this.currentSlideIndex || index < 0 || index >= this.totalSlides) return;
    const direction = index >= this.currentSlideIndex ? 1 : -1;
    this.currentSlideIndex = index;
    this.renderSlide(index, direction);
  }

  // ─── VISOR MODAL DE DIAGRAMAS SVG EN ALTA DEFINICIÓN ─────────────────────
  openSvgModal(src, title) {
    if (!this.svgModal) return;
    this.svgModalImg.src = src;
    this.svgModalTitle.textContent = `📐 ${title || "Diagrama Conceptual SVG"}`;
    this.svgModal.classList.add("open");
    this.svgModalBackdrop.classList.add("open");
    if (window.gsap) {
      gsap.fromTo(this.svgModal,
        { scale: 0.92, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.38, ease: "back.out(1.3)" }
      );
    }
  }

  closeSvgModal() {
    if (!this.svgModal) return;
    this.svgModal.classList.remove("open");
    this.svgModalBackdrop.classList.remove("open");
    setTimeout(() => {
      this.svgModalImg.src = "";
    }, 300);
  }

  // ─── CRONÓMETRO REGRESIVO DE 30 MINUTOS ──────────────────────────────────
  toggleTimer() {
    if (this.timerRunning) {
      this.pauseTimer();
    } else {
      this.startTimer();
    }
  }

  startTimer() {
    if (!this.timerRunning) {
      this.timerRunning = true;
      this.btnTimerToggle.textContent = "⏸";
      this.btnTimerToggle.title = "Pausar cronómetro (T)";

      this.timerInterval = setInterval(() => {
        this.elapsedSeconds++;
        this.updateTimerDisplay();

        if (this.elapsedSeconds >= this.totalSeconds) {
          this.pauseTimer();
          alert("⏱️ Los 30 minutos estipulados para la exposición han concluido.");
        }
      }, 1000);
    }
  }

  pauseTimer() {
    this.timerRunning = false;
    this.btnTimerToggle.textContent = "▶";
    this.btnTimerToggle.title = "Iniciar cronómetro (T)";
    clearInterval(this.timerInterval);
  }

  resetTimer() {
    this.pauseTimer();
    this.elapsedSeconds = 0;
    this.updateTimerDisplay();
  }

  updateTimerDisplay() {
    const remainingSeconds = Math.max(0, this.totalSeconds - this.elapsedSeconds);
    const m = Math.floor(remainingSeconds / 60);
    const s = remainingSeconds % 60;
    this.timerDisplay.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

    const minutosTranscurridos = Math.floor(this.elapsedSeconds / 60);

    this.timerDisplay.classList.remove("warning", "critical");
    if (minutosTranscurridos >= this.data.timing.alertaRojaMinutos) {
      this.timerDisplay.classList.add("critical");
    } else if (minutosTranscurridos >= this.data.timing.alertaAmarillaMinutos) {
      this.timerDisplay.classList.add("warning");
    }
  }

  // ─── HERRAMIENTAS LATERALES Y DRAWERS ───────────────────────────────────
  toggleNotes(forceState) {
    const isOpen = this.notesModal.classList.contains("open");
    const newState = forceState !== undefined ? forceState : !isOpen;
    this.notesModal.classList.toggle("open", newState);
    this.btnToggleNotes.classList.toggle("active", newState);
  }

  toggleDrawer(forceState) {
    const isOpen = this.drawerPanel.classList.contains("open");
    const newState = forceState !== undefined ? forceState : !isOpen;
    this.drawerPanel.classList.toggle("open", newState);
    this.drawerBackdrop.classList.toggle("open", newState);
    this.btnToggleDrawer.classList.toggle("active", newState);
  }

  toggle3dDim() {
    this.is3dDimmed = !this.is3dDimmed;
    this.canvas.classList.toggle("dimmed", this.is3dDimmed);
    if (this.btnDim3d) {
      this.btnDim3d.classList.toggle("active", this.is3dDimmed);
      this.btnDim3d.title = this.is3dDimmed
        ? "Modo Enfoque Texto Activo (D)"
        : "Atenuar Fondo 3D / Enfoque Texto (D)";
    }
  }

  toggleShortcuts(forceState) {
    if (!this.shortcutsModal) return;
    const isOpen = this.shortcutsModal.classList.contains("open");
    const newState = forceState !== undefined ? forceState : !isOpen;
    this.shortcutsModal.classList.toggle("open", newState);
    if (this.shortcutsBackdrop) {
      this.shortcutsBackdrop.classList.toggle("open", newState);
    }
    if (this.btnShortcuts) {
      this.btnShortcuts.classList.toggle("active", newState);
    }
  }

  toggleMobile3dView(forceState) {
    if (!this.cardElement) return;
    const isMin = this.cardElement.classList.contains("minimized");
    const newState = forceState !== undefined ? forceState : !isMin;
    this.isCardMinimized = newState;
    this.cardElement.classList.toggle("minimized", newState);

    if (this.btnFloatingCardToggle) {
      this.btnFloatingCardToggle.classList.toggle("visible", newState);
    }
    if (this.btnToggle3dView) {
      this.btnToggle3dView.classList.toggle("active", newState);
      const text = this.btnToggle3dView.querySelector(".tool-text");
      if (text) text.textContent = newState ? "Ver Texto" : "Ver 3D";
    }
  }

  populateDrawerContent() {
    this.renderDrawerTab("autores");
  }

  renderDrawerTab(tabType) {
    this.drawerContent.innerHTML = "";
    const f = this.data.fichasRespaldo;

    if (tabType === "autores" && f.autores) {
      f.autores.forEach((item) => {
        const card = document.createElement("div");
        card.className = "ref-card";
        card.innerHTML = `
          <h4>🧠 ${item.autor}</h4>
          <p>${item.concepto}</p>
        `;
        this.drawerContent.appendChild(card);
      });
    } else if (tabType === "normativa" && f.normativa) {
      f.normativa.forEach((item) => {
        const card = document.createElement("div");
        card.className = "ref-card";
        card.innerHTML = `
          <h4>📜 ${item.norma}</h4>
          <p>${item.descripcion}</p>
        `;
        this.drawerContent.appendChild(card);
      });
    } else if (tabType === "objetivos" && (f.objetivos || f.matrizObjetivos)) {
      const lista = f.objetivos || f.matrizObjetivos;
      lista.forEach((item) => {
        const card = document.createElement("div");
        card.className = "ref-card";
        card.innerHTML = `
          <h4>🎯 ${item.nivel}</h4>
          <p>${item.texto}</p>
        `;
        this.drawerContent.appendChild(card);
      });
    } else if (tabType === "dimensiones" && f.dimensiones) {
      f.dimensiones.forEach((item) => {
        const card = document.createElement("div");
        card.className = "ref-card";
        card.innerHTML = `
          <h4>⚙️ ${item.dim}</h4>
          <p>${item.detalle}</p>
        `;
        this.drawerContent.appendChild(card);
      });
    } else if (tabType === "territorio" && f.territorio) {
      f.territorio.forEach((item) => {
        const card = document.createElement("div");
        card.className = "ref-card";
        card.innerHTML = `
          <h4>📍 ${item.sede}</h4>
          <p>${item.detalle}</p>
        `;
        this.drawerContent.appendChild(card);
      });
    } else if (tabType === "faq" && f.faq) {
      f.faq.forEach((item) => {
        const card = document.createElement("div");
        card.className = "ref-card faq-card";
        card.innerHTML = `
          <h4>❓ ${item.pregunta}</h4>
          <p><strong>R:</strong> ${item.respuesta}</p>
        `;
        this.drawerContent.appendChild(card);
      });
    } else if (tabType === "svgs") {
      this.catalogoSVGs.forEach((item) => {
        const card = document.createElement("div");
        card.className = "ref-card svg-ref-card";
        card.innerHTML = `
          <h4>📐 ${item.titulo}</h4>
          <p><strong>Fuente:</strong> ${item.autor}</p>
          <p style="margin-top: 0.4rem;">${item.descripcion}</p>
          <button class="btn-inspect-svg" style="margin-top: 0.8rem; width: 100%; padding: 0.55rem; background: var(--gold-dim); border: 1px solid var(--gold-main); color: var(--gold-light); border-radius: 4px; cursor: pointer; font-family: var(--font-serif); font-size: 0.76rem; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 700;">
            🔍 Abrir Diagrama en Pantalla Completa
          </button>
        `;
        card.querySelector(".btn-inspect-svg").addEventListener("click", () => {
          this.openSvgModal(item.archivo, item.titulo);
        });
        this.drawerContent.appendChild(card);
      });
    }
  }

  // ─── VISOR Y MODAL SVG INTERACTIVO (ZOOM, PAN Y MAXIMIZAR) ─────────────
  openSvgModal(url, title) {
    if (!this.svgModal) return;
    if (this.svgModalTitle) {
      this.svgModalTitle.textContent = title ? `📐 ${title}` : "📐 Diagrama Conceptual SVG";
    }
    if (this.svgModalImg) {
      this.svgModalImg.src = url;
    }
    if (this.btnSvgNewTab) {
      this.btnSvgNewTab.href = url;
    }
    this.resetSvgTransform();
    this.svgModal.classList.add("open");
    if (this.svgModalBackdrop) {
      this.svgModalBackdrop.classList.add("open");
    }
  }

  closeSvgModal() {
    if (!this.svgModal) return;
    this.svgModal.classList.remove("open", "maximized");
    if (this.svgModalBackdrop) {
      this.svgModalBackdrop.classList.remove("open");
    }
    this.isSvgMaximized = false;
    if (this.btnSvgMaximize) {
      this.btnSvgMaximize.textContent = "⛶ Maximizar";
    }
    this.resetSvgTransform();
  }

  setSvgZoom(newZoom) {
    this.svgZoom = Math.min(Math.max(newZoom, 0.4), 6.0);
    this.updateSvgTransform();
  }

  zoomSvg(delta) {
    this.setSvgZoom(this.svgZoom + delta);
  }

  resetSvgTransform() {
    this.svgZoom = 1.0;
    this.svgPanX = 0;
    this.svgPanY = 0;
    this.updateSvgTransform();
  }

  fitSvgTransform() {
    this.svgZoom = 1.0;
    this.svgPanX = 0;
    this.svgPanY = 0;
    this.updateSvgTransform();
  }

  toggleSvgMaximize() {
    this.isSvgMaximized = !this.isSvgMaximized;
    if (this.svgModal) {
      this.svgModal.classList.toggle("maximized", this.isSvgMaximized);
    }
    if (this.btnSvgMaximize) {
      this.btnSvgMaximize.textContent = this.isSvgMaximized ? "🗗 Restaurar" : "⛶ Maximizar";
    }
    this.resetSvgTransform();
  }

  updateSvgTransform() {
    if (this.svgModalImg) {
      this.svgModalImg.style.transform = `translate(${this.svgPanX}px, ${this.svgPanY}px) scale(${this.svgZoom})`;
    }
    if (this.svgZoomLevel) {
      this.svgZoomLevel.textContent = `${Math.round(this.svgZoom * 100)}%`;
    }
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }

  // ─── VISOR Y EXPLORADOR DE MATERIAL DE CÁTEDRA ──────────────────────────
  openCatedraDrawer() {
    this.toggleDrawer(true);
    const catedraTabBtn = document.querySelector('.drawer-tab[data-tab="catedra"]');
    if (catedraTabBtn) {
      document.querySelectorAll(".drawer-tab").forEach((t) => t.classList.remove("active"));
      catedraTabBtn.classList.add("active");
      this.renderDrawerTab("catedra");
    }
  }

  renderCatedraMaterialTab() {
    this.drawerContent.innerHTML = "";

    if (!this.catedraData || this.catedraData.length === 0) {
      this.catedraData = (typeof window !== 'undefined' && window.CATEDRA_MATERIAL_DATA) || (typeof CATEDRA_MATERIAL_DATA !== 'undefined' ? CATEDRA_MATERIAL_DATA : []);
    }

    // 1. Encabezado con métricas
    const headerBox = document.createElement("div");
    headerBox.className = "catedra-header-box";
    headerBox.innerHTML = `
      <div class="catedra-header-title">
        <span>📚 Repositorio Bibliográfico Oficial</span>
        <span class="catedra-total-badge">${this.catedraData.length} Docs</span>
      </div>
      <p class="catedra-header-desc">
        Compendio completo de textos metodológicos, resoluciones del TFG, ordenanzas del CURZA, reglamentos y guías APA para consulta inmediata del tribunal y tesistas.
      </p>
    `;
    this.drawerContent.appendChild(headerBox);

    // 2. Buscador en tiempo real
    const searchWrapper = document.createElement("div");
    searchWrapper.className = "catedra-search-wrapper";
    searchWrapper.innerHTML = `
      <svg class="catedra-search-icon" viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <circle cx="8.5" cy="8.5" r="5"/>
        <path d="M17.5 17.5l-3.8-3.8"/>
      </svg>
      <input type="search" class="catedra-search-input" id="catedra-search-input" placeholder="Buscar por autor, tema, resolución (ej: Sampieri, Sautu, 266-23)..." value="${this.currentCatedraSearch}">
      <button class="catedra-search-clear" id="catedra-search-clear" title="Borrar búsqueda">✕</button>
    `;
    this.drawerContent.appendChild(searchWrapper);

    const searchInput = searchWrapper.querySelector("#catedra-search-input");
    const searchClear = searchWrapper.querySelector("#catedra-search-clear");
    if (this.currentCatedraSearch) {
      searchClear.style.display = "block";
    }

    searchInput.addEventListener("input", (e) => {
      this.currentCatedraSearch = e.target.value.trim().toLowerCase();
      searchClear.style.display = this.currentCatedraSearch ? "block" : "none";
      this.updateCatedraList();
    });

    searchClear.addEventListener("click", () => {
      searchInput.value = "";
      this.currentCatedraSearch = "";
      searchClear.style.display = "none";
      this.updateCatedraList();
      searchInput.focus();
    });

    // 3. Pastillas de filtrado por Unidad y Área
    const categories = [
      { id: "all", label: "Todos", count: this.catedraData.length },
      { id: "u1", label: "Unidad I", count: this.catedraData.filter(d => d.categoriaSlug === 'u1').length },
      { id: "u2", label: "Unidad II", count: this.catedraData.filter(d => d.categoriaSlug === 'u2').length },
      { id: "u3", label: "Unidad III", count: this.catedraData.filter(d => d.categoriaSlug === 'u3').length },
      { id: "u4", label: "Unidad IV", count: this.catedraData.filter(d => d.categoriaSlug === 'u4').length },
      { id: "tfg", label: "Recursos TFG & Normas", count: this.catedraData.filter(d => d.categoriaSlug === 'tfg').length },
      { id: "redaccion", label: "Redacción & Defensa", count: this.catedraData.filter(d => d.categoriaSlug === 'redaccion').length },
      { id: "actividades", label: "Actividades", count: this.catedraData.filter(d => d.categoriaSlug === 'actividades').length },
      { id: "general", label: "Programa", count: this.catedraData.filter(d => d.categoriaSlug === 'general').length }
    ];

    const pillsWrapper = document.createElement("div");
    pillsWrapper.className = "catedra-filter-pills";
    categories.forEach(cat => {
      const btn = document.createElement("button");
      btn.className = `catedra-pill ${this.currentCatedraFilter === cat.id ? "active" : ""}`;
      btn.dataset.category = cat.id;
      btn.innerHTML = `${cat.label} <span class="catedra-pill-count">(${cat.count})</span>`;
      btn.addEventListener("click", () => {
        pillsWrapper.querySelectorAll(".catedra-pill").forEach(p => p.classList.remove("active"));
        btn.classList.add("active");
        this.currentCatedraFilter = cat.id;
        this.updateCatedraList();
      });
      pillsWrapper.appendChild(btn);
    });
    this.drawerContent.appendChild(pillsWrapper);

    // 4. Barra informativa de resultados
    const resultsInfo = document.createElement("div");
    resultsInfo.className = "catedra-results-info";
    resultsInfo.id = "catedra-results-info";
    this.drawerContent.appendChild(resultsInfo);

    // 5. Contenedor de lista de tarjetas
    const listContainer = document.createElement("div");
    listContainer.className = "catedra-docs-list";
    listContainer.id = "catedra-docs-list";
    this.drawerContent.appendChild(listContainer);

    this.updateCatedraList();
  }

  updateCatedraList() {
    const listContainer = document.getElementById("catedra-docs-list");
    const resultsInfo = document.getElementById("catedra-results-info");
    if (!listContainer || !resultsInfo) return;

    listContainer.innerHTML = "";

    const filtered = this.catedraData.filter(doc => {
      if (this.currentCatedraFilter !== "all" && doc.categoriaSlug !== this.currentCatedraFilter) {
        return false;
      }
      if (this.currentCatedraSearch) {
        const text = `${doc.titulo} ${doc.nombre} ${doc.seccion} ${doc.subseccion} ${doc.categoriaLabel}`.toLowerCase();
        if (!text.includes(this.currentCatedraSearch)) {
          return false;
        }
      }
      return true;
    });

    resultsInfo.innerHTML = `
      <span>Mostrando <strong>${filtered.length}</strong> de ${this.catedraData.length} documentos</span>
      <span>${this.currentCatedraFilter !== "all" ? "Filtro activo" : "Catálogo general"}</span>
    `;

    if (filtered.length === 0) {
      listContainer.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1rem; color: #64748b; background: #f8fafc; border-radius: 6px; border: 1px dashed #cbd5e1;">
          <div style="font-size: 2.2rem; margin-bottom: 0.5rem;">🔍</div>
          <p style="font-size: 0.9rem; font-weight: 600; color: var(--oxford-blue); margin-bottom: 0.25rem;">No se encontraron documentos</p>
          <p style="font-size: 0.78rem;">Probá buscando con otros términos o seleccionando otra categoría.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(doc => {
      const ext = doc.ext.replace('.', '').toLowerCase();
      let icon = "📄";
      if (ext === "pdf") icon = "📕";
      else if (ext === "docx" || ext === "doc") icon = "📘";
      else if (ext === "htm" || ext === "html") icon = "🌐";

      const card = document.createElement("div");
      card.className = `catedra-doc-card ${ext}`;
      card.innerHTML = `
        <div class="catedra-doc-header">
          <div class="catedra-card-icon">${icon}</div>
          <div class="catedra-card-main">
            <h4 class="catedra-doc-title" title="${doc.nombre}">${doc.titulo}</h4>
            <div class="catedra-doc-meta">
              <span class="catedra-meta-tag cat">${doc.categoriaLabel}</span>
              ${doc.subseccion ? `<span class="catedra-meta-tag sub" title="${doc.subseccion}">${doc.subseccion}</span>` : ''}
              <span class="catedra-meta-tag size">${doc.tamano}</span>
            </div>
          </div>
        </div>
        <div class="catedra-doc-actions">
          <button class="btn-catedra-read" title="Abrir en el visor interactivo de la defensa">
            👁️ Ver Documento
          </button>
          <a class="btn-catedra-ext" href="${encodeURI(doc.ruta)}" target="_blank" title="Abrir en pestaña nueva">
            ↗ Pestaña
          </a>
        </div>
      `;

      card.querySelector(".btn-catedra-read").addEventListener("click", () => {
        this.openDocModal(doc);
      });

      listContainer.appendChild(card);
    });
  }

  // ─── MODAL VISOR DE DOCUMENTO (PDF & OFFICE) ───────────────────────────
  openDocModal(doc) {
    if (!this.docModal) return;

    const ext = doc.ext.replace('.', '').toLowerCase();
    const safeUrl = encodeURI(doc.ruta);

    // Titulo y badges
    if (this.docModalTitle) {
      this.docModalTitle.textContent = doc.titulo;
      this.docModalTitle.title = doc.nombre;
    }
    if (this.docModalBadge) {
      this.docModalBadge.textContent = ext.toUpperCase();
      this.docModalBadge.className = `doc-modal-badge ${ext}`;
    }
    if (this.docModalBreadcrumb) {
      const parts = doc.ruta.split('/');
      this.docModalBreadcrumb.textContent = parts.join(' › ');
    }

    // Botones de acción directa
    if (this.btnDocNewtab) {
      this.btnDocNewtab.href = safeUrl;
    }
    if (this.btnDocDownload) {
      this.btnDocDownload.href = safeUrl;
      this.btnDocDownload.setAttribute('download', doc.nombre);
    }

    // Comportamiento según tipo de archivo
    if (ext === "pdf" || ext === "htm" || ext === "html") {
      if (this.docModalFrame) {
        this.docModalFrame.style.display = "block";
        this.docModalFrame.src = safeUrl;
      }
      if (this.docModalFallback) {
        this.docModalFallback.style.display = "none";
      }
    } else {
      // Documentos Word (.docx, .doc) u otros
      if (this.docModalFrame) {
        this.docModalFrame.style.display = "none";
        this.docModalFrame.src = "";
      }
      if (this.docModalFallback) {
        this.docModalFallback.style.display = "flex";
      }
      if (this.docFallbackTitle) {
        this.docFallbackTitle.textContent = doc.titulo;
      }
      if (this.docFallbackDesc) {
        this.docFallbackDesc.textContent = `Este archivo es un documento oficial de Microsoft Word (${doc.ext.toUpperCase()}, ${doc.tamano}). Podés descargarlo directamente para editarlo o revisarlo en tu aplicación de oficina.`;
      }
      if (this.btnDocFallbackDownload) {
        this.btnDocFallbackDownload.href = safeUrl;
        this.btnDocFallbackDownload.setAttribute('download', doc.nombre);
      }
      if (this.btnDocFallbackOpen) {
        this.btnDocFallbackOpen.href = safeUrl;
      }
    }

    this.docModal.classList.add("open");
    if (this.docModalBackdrop) {
      this.docModalBackdrop.classList.add("open");
    }
  }

  closeDocModal() {
    if (!this.docModal) return;
    this.docModal.classList.remove("open", "maximized");
    if (this.docModalBackdrop) {
      this.docModalBackdrop.classList.remove("open");
    }
    this.isDocMaximized = false;
    if (this.btnDocMaximize) {
      this.btnDocMaximize.textContent = "⛶ Maximizar";
    }
    if (this.docModalFrame) {
      this.docModalFrame.src = "";
    }
  }

  toggleDocMaximize() {
    this.isDocMaximized = !this.isDocMaximized;
    if (this.docModal) {
      this.docModal.classList.toggle("maximized", this.isDocMaximized);
    }
    if (this.btnDocMaximize) {
      this.btnDocMaximize.textContent = this.isDocMaximized ? "🗗 Restaurar" : "⛶ Maximizar";
    }
  }

}


// Inicializar la aplicación al cargar el DOM
window.addEventListener("DOMContentLoaded", () => {
  if (window.PRESENTACION_DATA) {
    window.app = new PresentationApp(window.PRESENTACION_DATA);
  } else {
    console.error("No se encontraron los metadatos de PRESENTACION_DATA.");
  }
});

// Actualizador de HUD sobrio para el radar de la Red Territorial (escenas anim_06 y anim_07)
window.updateNodeHUD = function(node) {
  const pill = document.getElementById("node-radar-pill");
  const title = document.getElementById("node-radar-title");
  const desc = document.getElementById("node-radar-desc");
  if (!pill) return;

  const currentSlide = window.app?.data.slides[window.app.currentSlideIndex];
  if (currentSlide && (currentSlide.escena3D === "anim_06" || currentSlide.escena3D === "anim_07")) {
    pill.style.display = "inline-flex";
    if (title) title.textContent = node.nombre;
    if (desc) desc.textContent = `${node.tipo} • ${node.subtitulo}`;
  } else {
    pill.style.display = "none";
  }
};
