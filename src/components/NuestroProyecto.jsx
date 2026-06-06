import React, { useState, useEffect, useRef } from "react";
import { User, GraduationCap, Calendar, Download, Trophy, Sparkles, CheckCircle2, Cpu, Wrench } from "lucide-react";
import { projects } from "../data/projects";
import PdfViewer from './PdfViewer';

export default function NuestroProyecto() {
  const [animateCharts, setAnimateCharts] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  // Seleccionar el proyecto principal 
  const project = projects.find((p) => p.id === "proj-1") || projects[0];

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
        
        {/* Columna Izquierda: Información de Autores y Especificaciones de Hardware */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Tarjeta de Equipo de Investigación */}
          <div className="glass-panel border border-white/[0.04] rounded-2xl p-5 space-y-5">
            <h3 className="text-[#DFBA6B] text-xs font-bold font-heading uppercase tracking-widest pb-2.5 border-b border-white/[0.04]">
              Cuerpo Científico
            </h3>
            
            <div className="flex gap-3.5">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 rose-gold-frame text-black">
                <User className="h-4 w-4 drop-shadow-[0_0.5px_0.5px_rgba(255,255,255,0.4)]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] uppercase tracking-wider text-white/30 font-bold">Investigadores</span>
                {project.authors.map((auth, i) => (
                  <span key={i} className="text-xs font-semibold text-white/90 mt-0.5 font-serif">{auth}</span>
                ))}
              </div>
            </div>

            <div className="flex gap-3.5">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 rose-gold-frame text-black">
                <GraduationCap className="h-4 w-4 drop-shadow-[0_0.5px_0.5px_rgba(255,255,255,0.4)]" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[8px] uppercase tracking-wider text-white/30 font-bold">Tutor Académico</span>
                <span className="text-xs font-semibold text-white/90 mt-1 font-serif">{project.tutor}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Columna Derecha: Render 3D, Textos Académicos e Indicadores SVG */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Panel Principal Showcase */}
          <div className="glass-cube-showcase border border-white/[0.06] rounded-3xl overflow-hidden p-6 relative flex flex-col md:flex-row gap-6">
            <div className="glass-cube-bevel rounded-3xl" />
            <div className="glass-cube-reflection rounded-3xl" />

            {/* Render de imagen */}
            <div className="w-full md:w-56 h-48 rounded-2xl overflow-hidden bg-black/45 shrink-0 border border-[#C29A38]/30 flex items-center justify-center relative shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(41,3,18,0.7)] to-transparent z-10" />
              <img 
                src={project.image} 
                alt="Grupo de Investigación" 
                className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute top-2.5 left-2.5 z-20">
                <span className="badge-tech font-heading text-[8px] bg-gradient-to-r from-[#5B0E2D] to-[#290312] border border-[#DFBA6B]/30 text-[#DFBA6B] px-2 py-0.5">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Texto de Resumen Académico */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[8px] uppercase tracking-[0.25em] text-[#DFBA6B] font-bold block mb-1">
                  Investigación Destacada
                </span>
                <h3 className="text-white font-bold text-base md:text-xl font-heading tracking-wide leading-snug">
                  {project.title}
                </h3>
                <p className="text-white/60 text-xs font-light leading-relaxed mt-2.5 text-justify">
                  {project.description}
                </p>
              </div>
              
              <div className="mt-4 pt-3.5 border-t border-white/[0.04] flex items-center gap-1.5 text-xs font-light text-white/50">
                <Calendar className="h-4 w-4 text-[#DFBA6B]" />
                <span>Registrado en: {project.volume} / Bachillerato en Ciencias</span>
              </div>
            </div>
          </div>

          {/* Gráficos de Evaluación SVG Circulares Dinámicos */}
          <div className="glass-panel border border-white/[0.04] rounded-3xl p-6 space-y-6">
            <h4 className="text-[#DFBA6B] text-xs font-bold font-heading uppercase tracking-widest pb-2.5 border-b border-white/[0.04] flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" />
              Rúbrica de Evaluación Académica
            </h4>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.stats.map((stat, i) => {
                const radius = 42;
                const strokeWidth = 5;
                const circumference = 2 * Math.PI * radius; // 263.89
                const strokeDashoffset = circumference - (stat.value / 100) * circumference;

                return (
                  <div key={i} className="bg-black/30 border border-white/[0.02] rounded-xl p-4 flex flex-col items-center justify-center text-center">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r={radius}
                          className="text-white/5"
                          strokeWidth={strokeWidth}
                          stroke="currentColor"
                          fill="transparent"
                        />
                        <circle
                          cx="48"
                          cy="48"
                          r={radius}
                          stroke="url(#greenhouseGold)"
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
                          <linearGradient id="greenhouseGold" x1="0%" y1="0%" x2="100%" y2="100%">
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

          {/* Bloques de Metodología y Resultados Expandidos */}
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

          {/* Barra de Descarga Institucional */}
          <div className="glass-panel border border-[#C29A38]/20 rounded-2xl p-4 flex flex-col sm:flex-row items-center sm:justify-between gap-4 bg-[rgba(194,154,56,0.02)]">
            <span className="text-[9.5px] text-white/35 font-light text-center sm:text-left leading-relaxed">
              * Documento completo visado bajo normas de propiedad intelectual del Colegio Parroquial.
            </span>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#5B0E2D] to-[#290312] border border-[#C29A38]/30 hover:border-[#DFBA6B] text-[#DFBA6B] hover:text-[#FFE79A] text-[10px] font-bold tracking-wider uppercase transition-all duration-300 shadow-md active:scale-98"
              >
                <Download className="h-4 w-4" />
                <span>Ver Tesis Completa en PDF</span>
              </button>
              {project.videoURL && project.videoURL !== '#' && (
                <a
                  href={project.videoURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-sm font-bold tracking-wider uppercase hover:bg-white/5"
                >
                  Recurso Audiovisual
                </a>
              )}
            </div>
          </div>

        </div>

      </div>

      {showModal && (
        <NuestroProyectoPdfModal
          show={showModal}
          project={project}
          modalRef={modalRef}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

// PDF Modal for NuestroProyecto (appended to component file so state/refs available above)
export function NuestroProyectoPdfModal({ show, project, modalRef, onClose }) {
  if (!show || !project || !project.documentUrl) return null;
  return (
    <div data-modal-open="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onContextMenu={(e) => e.preventDefault()} onCopy={(e) => e.preventDefault()} onCut={(e) => e.preventDefault()} onPaste={(e) => e.preventDefault()}>
      <div ref={modalRef} className="relative w-full max-w-5xl h-[85vh] bg-[#290312] border border-[#DFBA6B]/20 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(194,154,56,0.12)]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(223,186,107,0.06)_0%,_transparent_55%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(194,154,56,0.04)_0%,_transparent_60%)] pointer-events-none" />
            <div className="flex items-center justify-between px-5 py-4 gap-4 border-b border-[#DFBA6B]/10 bg-[#2b0710]/90">
          <div>
                <p className="text-white text-sm uppercase tracking-[0.2em] font-bold">Documento</p>
                <p className="text-[#DFBA6B]/80 text-xs mt-1">Visor integrado</p>
          </div>
          <button type="button" onClick={onClose} className="text-gray-300 hover:text-white p-2 rounded-full transition-colors" aria-label="Cerrar">
            Cerrar
          </button>
        </div>
        <div className="relative h-full bg-black select-none" onContextMenu={(e) => e.preventDefault()}>
          <div className="absolute inset-0 overflow-auto pt-4 p-6" style={{ userSelect: 'none' }}>
              <div className="max-w-full mx-auto h-full">
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
