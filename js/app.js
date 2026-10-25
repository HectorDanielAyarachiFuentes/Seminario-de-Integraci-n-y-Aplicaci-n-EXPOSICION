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
    this.svgZoom = 1.0;
    this.svgPanX = 0;
    this.svgPanY = 0;
    this.isSvgDragging = false;
    this.svgDragStartX = 0;
    this.svgDragStartY = 0;
    this.isSvgMaximized = false;
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
      } else if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        this.toggleShortcuts();
      } else if (e.key === "Escape") {
        this.closeSvgModal();
        this.toggleNotes(false);
        this.toggleDrawer(false);
        this.toggleShortcuts(false);
      }
    });
  }

  renderStationsIndicator() {
    this.stationsContainer.innerHTML = "";
    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement("div");
      dot.className = `station-dot ${i === 0 ? "active" : ""}`;
      dot.title = `Filmina ${i + 1}: ${this.data.slides[i].esquema}`;
      dot.setAttribute("data-slide-index", i + 1);
      dot.setAttribute("aria-label", `Ir a filmina ${i + 1}: ${this.data.slides[i].esquema}`);
      dot.addEventListener("click", () => this.goToSlide(i));
      this.stationsContainer.appendChild(dot);
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

    // Actualizar visibilidad de HUD de red territorial (visible en mapa de territorio y red híbrida anim_06 / anim_07)
    const nodePill = document.getElementById("node-radar-pill");
    if (nodePill && slide.escena3D !== "anim_06" && slide.escena3D !== "anim_07") {
      nodePill.style.display = "none";
    }

    // Actualizar botones de navegación
    this.btnPrev.disabled = index === 0;
    this.btnNext.disabled = index === this.totalSlides - 1;

    // Sincronizar indicador de estaciones
    const dots = this.stationsContainer.querySelectorAll(".station-dot");
    dots.forEach((dot, idx) => {
      const isActive = idx === index;
      dot.classList.toggle("active", isActive);
      if (isActive && window.gsap) {
        gsap.fromTo(dot, { scale: 0.95 }, { scale: 1.35, duration: 0.35, ease: "back.out(2)" });
      }
    });

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
