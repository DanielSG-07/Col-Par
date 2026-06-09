import React, { useState, useEffect, useRef } from "react";
import { User, GraduationCap, Calendar, Download, Sparkles, PlayCircle, Video, X } from "lucide-react";
import { projects } from "../data/projects";
import PdfViewer from './PdfViewer';

// ==========================================
// CONFIGURACIÓN DIRECTA DE LOS AUTORES
// ==========================================
const AUTHORS_DATA = [
  {
    id: 1,
    name: 'Meneses Duque Sarai',
    role: 'Estudiante / Investigadora',
    bio: 'Transformando ideas complejas en experiencias digitales simples y memorables.',
    image: '/projects/sarai.png' 
  },
  {
    id: 2,
    name: 'Roa Sanchez Yehely',
    role: 'Estudiante / Investigadora',
    bio: 'Creyente de que los grandes cambios comienzan con pequeños pasos y mucha pasión.',
    image: '/projects/yehely.png'
  },
  {
    id: 3,
    name: 'Guerrero Andrade Mariangi',
    role: 'Estudiante / Investigadora',
    bio: 'Explorando el mundo a través del diseño, las palabras y un buen café.',
    image: '/projects/mariangi.png'
  },
  {
    id: 4,
    name: 'García Gonzales Juan',
    role: 'Estudiante / Investigador',
    bio: 'Mi meta no es solo crear cosas que se vean bien, sino que de verdad importen.',
    image: '/projects/juan.png'
  },
  {
    id: 5,
    name: 'Duque Zambrano Gissel',
    role: 'Estudiante / Investigadora',
    bio: '¡Hola! Qué bueno que estás aquí. Pasa, ponte cómodo y hablemos de ideas.',
    image: '/projects/gissel.png'
  },
  {
    id: 6,
    name: 'Montilva Jose Alberto',
    role: 'Estudiante / Investigador',
    bio: 'Ayudo a marcas valientes a contar su historia y conectar con las personas correctas',
    image: '/projects/alberto.png'
  }
];

export default function NuestroProyecto() {
  const [animateCharts, setAnimateCharts] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false); // Estado para el recurso audiovisual
  const [activeAuthor, setActiveAuthor] = useState(null); 
  const [mainImagePressed, setMainImagePressed] = useState(false);
  const modalRef = useRef(null);
  const videoModalRef = useRef(null);

  // Seleccionar el proyecto principal 
  const project = projects.find((p) => p.id === "proj-1") || projects[0];
  // Determinar la ruta de imagen correcta (usa `portada` o `caratula` si `image` no existe)
  const imagePath = project?.portada || project?.caratula || project?.image || "";
  const imageSrc = imagePath ? `${import.meta.env.BASE_URL}${imagePath}` : "";
  const getPublicAsset = (assetPath) => {
    if (!assetPath) return "";
    const normalized = assetPath.replace(/^\//, "");
    return `${import.meta.env.BASE_URL}${normalized}`;
  };
  const [showInlineVideo, setShowInlineVideo] = useState(false);
  const getAutoplaySrc = (url) => {
    if (!url) return url;
    try {
      const u = new URL(url);
      const host = u.hostname.replace('www.', '');
      if (host.includes('youtube.com')) {
        // If it's a youtube watch URL, convert to embed and enable autoplay
        if (u.searchParams.get('v')) {
          return `https://www.youtube.com/embed/${u.searchParams.get('v')}?autoplay=1&rel=0&controls=0&modestbranding=1&playsinline=1&disablekb=1`;
        }
        return url;
      }
      if (host.includes('youtu.be')) {
        const id = u.pathname.replace('/', '');
        return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&controls=0&modestbranding=1&playsinline=1&disablekb=1`;
      }
      if (host.includes('vimeo.com')) {
        const id = u.pathname.split('/').pop();
        return `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&controls=0`;
      }
    } catch (e) {
      // not a valid URL — return as-is
    }
    return url;
  };
  useEffect(() => {
    const timer = setTimeout(() => setAnimateCharts(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full flex-1 flex flex-col p-4 md:p-8 animate-fade-in text-white/80 select-none">
      
      {/* Cabecera de la Sección Principal */}
      <div className="mb-8 border-b border-[#DFBA6B]/15 pb-6">
        <div className="flex items-center gap-3.5 mb-2">
          <div className="w-[3px] h-7 bg-gradient-to-b from-[#DFBA6B] to-[#C29A38] shadow-[0_0_10px_rgba(194,154,56,0.35)]" />
          <h2 className="text-white text-xl md:text-3xl font-bold font-serif tracking-wider drop-shadow-[0_0.5px_0.5px_rgba(255,255,255,0.4)] uppercase">
            PROYECTO CIENTÍFICO PRINCIPAL
          </h2>
        </div>
        <p className="text-white/40 text-xs font-light max-w-2xl leading-relaxed">
          Exhibición técnica detallada de la investigación central de este periodo académico, evaluada con la más alta calificación por el comité evaluador.
        </p>
      </div>

      {/* Grid de Exhibición de Dos Columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start flex-1">
        
        {/* Columna Izquierda: Información de Autores, Tutor y Recursos */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Tarjeta de Tutor Académico */}
          <div className="glass-panel border border-white/[0.04] rounded-2xl p-5">
            <h3 className="text-[#DFBA6B] text-xs font-bold font-heading uppercase tracking-widest pb-2.5 border-b border-white/[0.04] flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Tutor Académico
            </h3>
            <span className="text-sm font-semibold text-white/90 mt-3 block font-serif">{project.tutor}</span>
          </div>

          {/* Tarjetas de Investigadores Cargadas Directamente */}
          <div className="space-y-4">
            <h3 className="text-[#DFBA6B] text-xs font-bold font-heading uppercase tracking-widest pb-2.5 border-b border-white/[0.04] flex items-center gap-2">
              <User className="h-4 w-4" />
              Cuerpo Científico
            </h3>
            
            <div className="flex flex-col gap-3">
              {AUTHORS_DATA.map((author) => (
                <div 
                  key={author.id} 
                  className="group relative flex items-center gap-4 glass-panel border border-white/[0.04] rounded-xl p-3.5 transition-all duration-300 hover:border-[#DFBA6B]/30 hover:bg-[rgba(194,154,56,0.02)]"
                >
                  {/* Avatar con efecto de escala al hacer clic */}
                  <div
                    className="relative w-14 h-14 min-w-[56px] min-h-[56px] rounded-full overflow-hidden flex-shrink-0 border-2 border-white/5 group-hover:border-[#DFBA6B]/40 transition-all duration-300 bg-[#290312] flex items-center justify-center shadow-lg cursor-pointer"
                    style={{
                      transform: activeAuthor === author.id ? 'scale(5)' : 'scale(1)',
                      zIndex: activeAuthor === author.id ? 50 : 1,
                      boxShadow: activeAuthor === author.id ? '0 0 25px rgba(194,154,56,0.45)' : 'none',
                      transformOrigin: 'left center'
                    }}
                    onMouseDown={() => setActiveAuthor(author.id)}
                    onMouseUp={() => setActiveAuthor(null)}
                    onMouseLeave={() => setActiveAuthor(null)}
                    onTouchStart={() => setActiveAuthor(author.id)}
                    onTouchEnd={() => setActiveAuthor(null)}
                    onTouchCancel={() => setActiveAuthor(null)}
                  >
                    {author.image ? (
                      <img 
                        src={getPublicAsset(author.image)} 
                        alt={author.name} 
                        className="w-full h-full object-cover object-center transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                    ) : null}
                    <User className="text-[#DFBA6B]/40 group-hover:text-[#DFBA6B] transition-colors hidden" size={20} style={{ display: !author.image ? 'block' : 'none' }} />
                  </div>

                  {/* Contenido de Texto */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white text-sm font-bold tracking-wide truncate group-hover:text-[#FFE79A] transition-colors">
                      {author.name}
                    </h4>
                    <p className="text-[#DFBA6B] text-[9px] uppercase tracking-widest font-semibold mb-0.5">
                      {author.role}
                    </p>
                    <p className="text-white/40 text-[10px] font-light line-clamp-2 italic leading-tight">
                      "{author.bio}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>


        </div>

        {/* Columna Derecha: Render Showcase, Indicadores de Evaluación */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Panel Principal Showcase */}
          <div className="glass-cube-showcase border border-white/[0.06] rounded-3xl overflow-hidden p-0 relative shadow-xl">
            <div className="glass-cube-bevel rounded-3xl" />
            <div className="glass-cube-reflection rounded-3xl" />

            <div className="relative w-full overflow-hidden bg-black/30">
              <div className="relative h-72 md:h-[28rem] w-full overflow-hidden bg-black/60">
                <img
                  src={imageSrc}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-40 blur-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#290312]/90 via-[#290312]/45 to-transparent" />
                <img
                  src={imageSrc}
                  alt={project.title}
                  className="relative z-10 w-full h-full object-contain p-6 cursor-pointer"
                  onMouseDown={() => setMainImagePressed(true)}
                  onMouseUp={() => setMainImagePressed(false)}
                  onMouseLeave={() => setMainImagePressed(false)}
                  onTouchStart={() => setMainImagePressed(true)}
                  onTouchEnd={() => setMainImagePressed(false)}
                  onTouchCancel={() => setMainImagePressed(false)}
                  style={{
                    transform: mainImagePressed ? 'scale(5)' : 'scale(1)',
                    zIndex: mainImagePressed ? 999 : 10,
                    transition: 'transform 220ms ease',
                    boxShadow: mainImagePressed ? '0 0 40px rgba(194,154,56,0.45)' : 'none',
                    transformOrigin: 'center center'
                  }}
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="badge-tech font-heading text-[10px] bg-gradient-to-r from-[#5B0E2D] to-[#290312] border border-[#DFBA6B]/30 text-[#DFBA6B] px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="relative z-20 p-6 md:p-8 bg-gradient-to-b from-[#290312]/80 via-[#290312]/60 to-[#290312]/90">
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#DFBA6B] font-bold block mb-3">
                  Investigación Destacada
                </span>
                <h3 className="text-white font-bold text-xl md:text-3xl font-heading tracking-wide leading-tight mb-4">
                  {project.title}
                </h3>
                <p className="text-white/70 text-sm md:text-base font-light leading-relaxed text-justify">
                  {project.description}
                </p>
                <div className="mt-6 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-white/50">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#DFBA6B]" />
                    <span>Registrado en: {project.volume} / Bachillerato en Ciencias</span>
                  </div>
                  <span className="text-[#DFBA6B] font-semibold uppercase tracking-[0.2em] text-[10px]">
                    {project.year}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Rúbrica de Evaluación */}
          <div className="glass-panel border border-white/[0.04] rounded-3xl p-6 space-y-6">
            <h4 className="text-[#DFBA6B] text-xs font-bold font-heading uppercase tracking-widest pb-2.5 border-b border-white/[0.04] flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" />
              Rúbrica de Evaluación Académica
            </h4>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.stats.map((stat, i) => {
                const radius = 42;
                const strokeWidth = 5;
                const circumference = 2 * Math.PI * radius; 
                const strokeDashoffset = circumference - (stat.value / 100) * circumference;

                return (
                  <div key={i} className="bg-black/30 border border-white/[0.02] rounded-xl p-4 flex flex-col items-center justify-center text-center">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="48" cy="48" r={radius} className="text-white/5" strokeWidth={strokeWidth} stroke="currentColor" fill="transparent" />
                        <circle
                          cx="48"
                          cy="48"
                          r={radius}
                          stroke="url(#localGold)"
                          strokeWidth={strokeWidth}
                          fill="transparent"
                          className="transition-all duration-[1.5s] ease-out"
                          style={{
                            strokeDasharray: circumference,
                            strokeDashoffset: animateCharts ? strokeDashoffset : circumference,
                            filter: "drop-shadow(0 0 4px rgba(194, 154, 56, 0.35))"
                          }}
                        />
                        <defs>
                          <linearGradient id="localGold" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FFE79A" />
                            <stop offset="100%" stopColor="#C29A38" />
                          </linearGradient>
                        </defs>
                      </svg>
                      
                      <div className="absolute flex flex-col items-center justify-center leading-none">
                        <span className="text-white font-bold text-base font-heading">{stat.value}%</span>
                        <span className="text-[7px] text-[#DFBA6B] uppercase tracking-wider font-semibold mt-0.5">Rating</span>
                      </div>
                    </div>
                    
                    <span className="text-[10px] font-bold text-white/70 mt-3 font-heading leading-tight truncate w-full">
                      {stat.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Metodología y Resultados */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel border border-white/[0.04] rounded-2xl p-5 space-y-2">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider font-heading text-[#DFBA6B] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#DFBA6B] rounded-full animate-pulse" />
                Metodología Científica
              </h4>
              <p className="text-xs text-white/60 font-light leading-relaxed text-justify">
                {project.methodology}
              </p>
            </div>

            <div className="glass-panel border border-white/[0.04] rounded-2xl p-5 space-y-2">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider font-heading text-[#DFBA6B] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#DFBA6B] rounded-full animate-pulse" />
                Resultados y Aportes
              </h4>
              <p className="text-xs text-white/60 font-light leading-relaxed text-justify">
                {project.results}
              </p>
            </div>
          </div>

          <div className="glass-panel border border-white/[0.04] rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4 text-[#DFBA6B]" />
              <h4 className="text-[#DFBA6B] text-xs font-bold font-heading uppercase tracking-widest">
                Material Audiovisual
              </h4>
            </div>
            <p className="text-white/50 text-[11px] font-light leading-relaxed">
              Accede a la presentación multimedia oficial del proyecto o consulta el material grabado de la defensa académica.
            </p>
            {project.videoURL && project.videoURL !== '#' ? (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[#DFBA6B]/10 bg-black/40">
                {!showInlineVideo ? (
                  <div
                    className="w-full h-full relative cursor-pointer flex items-center justify-center bg-black/20"
                    onClick={() => setShowInlineVideo(true)}
                  >
                    <img src={imageSrc || getPublicAsset(project.portada || project.caratula)} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-85" />
                    <div className="absolute inset-0 bg-black/40" />
                    <button className="relative z-20 flex items-center justify-center w-14 h-14 rounded-full bg-[#DFBA6B]/20 border border-[#DFBA6B]/40 text-[#DFBA6B] shadow-[0_6px_18px_rgba(223,186,107,0.12)]">
                      <PlayCircle className="h-6 w-6" />
                    </button>
                  </div>
                ) : (
                  <iframe
                    src={getAutoplaySrc(project.videoURL)}
                    title={`Video de ${project.title}`}
                    className="w-full h-full"
                    allow="autoplay; encrypted-media; accelerometer; gyroscope"
                    sandbox="allow-scripts allow-same-origin"
                  />
                )}
              </div>
            ) : (
              <div className="rounded-2xl border border-white/[0.06] bg-black/30 p-4 text-sm text-white/50">
                Material audiovisual no disponible para este proyecto.
              </div>
            )}
          </div>

          {/* Barra de Descarga de Tesis Completa */}
          <div className="glass-panel border border-[#C29A38]/20 rounded-2xl p-4 flex flex-col sm:flex-row items-center sm:justify-between gap-4 bg-[rgba(194,154,56,0.02)]">
            <span className="text-[9.5px] text-white/35 font-light text-center sm:text-left leading-relaxed">
              * Documento completo visado bajo normas de propiedad intelectual del Colegio Parroquial.
            </span>
            
            <button
              type="button"
              onClick={() => setShowPdfModal(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#5B0E2D] to-[#290312] border border-[#C29A38]/30 hover:border-[#DFBA6B] text-[#DFBA6B] hover:text-[#FFE79A] text-[10px] font-bold tracking-wider uppercase transition-all duration-300 shadow-md active:scale-98"
            >
              <Download className="h-4 w-4" />
              <span>Ver Tesis Completa en PDF</span>
            </button>
          </div>

        </div>

      </div>

      {/* MODAL 1: Visor del Proyecto en PDF */}
      {showPdfModal && (
        <NuestroProyectoPdfModal
          show={showPdfModal}
          project={project}
          modalRef={modalRef}
          onClose={() => setShowPdfModal(false)}
        />
      )}

      {/* MODAL 2: Visor del Recurso Audiovisual (Añadido) */}
      {showVideoModal && (
        <NuestroProyectoVideoModal
          show={showVideoModal}
          project={project}
          modalRef={videoModalRef}
          onClose={() => setShowVideoModal(false)}
        />
      )}
    </div>
  );
}

// ============================================================================
// COMPONENTES AUXILIARES (MODALES CON ESTILO INSTITUCIONAL DE PROTECCIÓN)
// ============================================================================

// PDF Modal para NuestroProyecto
export function NuestroProyectoPdfModal({ show, project, modalRef, onClose }) {
  if (!show || !project || !project.documentUrl) return null;
  return (
    <div data-modal-open="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onContextMenu={(e) => e.preventDefault()} onCopy={(e) => e.preventDefault()} onCut={(e) => e.preventDefault()} onPaste={(e) => e.preventDefault()}>
      <div ref={modalRef} className="relative w-full max-w-5xl h-[85vh] bg-[#290312] border border-[#DFBA6B]/20 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(194,154,56,0.12)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(223,186,107,0.06)_0%,_transparent_55%)] pointer-events-none" />
        <div className="flex items-center justify-between px-5 py-4 gap-4 border-b border-[#DFBA6B]/10 bg-[#2b0710]/90">
          <div>
            <p className="text-white text-sm uppercase tracking-[0.2em] font-bold">Documento Científico</p>
            <p className="text-[#DFBA6B]/80 text-xs mt-1">Visor integrado institucional</p>
          </div>
          <button type="button" onClick={onClose} className="text-gray-300 hover:text-white p-2 rounded-full transition-colors" aria-label="Cerrar">
            <X size={20} />
          </button>
        </div>
        <div className="relative h-full bg-black select-none" onContextMenu={(e) => e.preventDefault()}>
          <div className="overflow-auto pt-4 p-6 max-h-[70vh]" style={{ userSelect: 'none' }}>
            <div className="max-w-full mx-auto">
              <PdfViewer src={`${import.meta.env.BASE_URL}${project.documentUrl}`} />
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 right-4 text-center text-[11px] text-[#DFBA6B]/70 uppercase tracking-[0.2em]">
          Selección de texto, copiado y descarga deshabilitados para proteger el contenido del documento. © Colegio Sagrado Corazón de Jesús
        </div>
      </div>
    </div>
  );
}

// Video Modal para el Recurso Audiovisual (Añadido)
export function NuestroProyectoVideoModal({ show, project, modalRef, onClose }) {
  if (!show || !project || !project.videoURL || project.videoURL === '#') return null;
  return (
    <div data-modal-open="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4" onContextMenu={(e) => e.preventDefault()}>
      <div ref={modalRef} className="relative w-full max-w-4xl bg-[#290312] border border-[#DFBA6B]/20 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(194,154,56,0.25)]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#DFBA6B]/10 bg-[#2b0710]/90">
          <div>
            <p className="text-white text-sm uppercase tracking-[0.2em] font-bold">Defensa Audiovisual</p>
            <p className="text-[#DFBA6B]/80 text-xs mt-1">{project.title}</p>
          </div>
          <button type="button" onClick={onClose} className="text-gray-300 hover:text-white p-2 rounded-full transition-colors" aria-label="Cerrar">
            <X size={20} />
          </button>
        </div>
        <div className="relative w-full aspect-video bg-black">
          <iframe
            src={getAutoplaySrc(project.videoURL)}
            title={`Video de ${project.title}`}
            className="w-full h-full"
            allow="autoplay; encrypted-media; accelerometer; gyroscope"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
        <div className="bg-[#2b0710]/90 px-5 py-3 text-center text-[10px] text-[#DFBA6B]/60 uppercase tracking-widest">
          Transmisión Oficial Multi-plataforma • Memoria Académica del Colegio Parroquial
        </div>
      </div>
    </div>
  );
}