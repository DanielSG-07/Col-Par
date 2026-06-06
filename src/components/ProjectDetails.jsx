import React from "react";
import { ArrowLeft, Users, Calendar, GraduationCap, Download, ExternalLink, Award, BookOpen, BarChart3 } from "lucide-react";

export default function ProjectDetailPage({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="w-full flex-1 flex flex-col animate-fade-in text-white/80 select-none overflow-y-auto">
      
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 pb-24 pt-4">

        {/* ─── Botón Volver ─── */}
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-white/40 hover:text-[#DFBA6B] transition-colors text-xs tracking-[0.15em] uppercase font-semibold mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Volver
        </button>

        {/* ─── Hero con Imagen de Portada ─── */}
        <div className="relative w-full rounded-2xl overflow-hidden border border-white/[0.06] mb-10 shadow-[0_0_40px_rgba(194,154,56,0.1)]">
          
          {/* Imagen de fondo (portada del proyecto) */}
            <div className="relative h-64 sm:h-80 md:h-[26rem] w-full overflow-hidden bg-black/60 flex items-center justify-center">
            {/* Fondo desenfocado */}
            <img
              src={project.portada || project.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-40 blur-lg saturate-125"
            />
            {/* Gradiente suave (debajo de la imagen principal) */}
            <div className="absolute inset-0 z-5 bg-gradient-to-t from-[#290312]/20 via-[#290312]/12 to-transparent pointer-events-none" />
            {/* Imagen real */}
            <img
              src={project.portada || project.image}
              alt={project.title}
              className="relative z-30 w-full h-full object-contain p-4"
            />

            {/* Badge flotante de categoría */}
            <div className="absolute z-30 top-4 right-4 flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold tracking-widest uppercase bg-[#DFBA6B]/18 border-[#DFBA6B]/40 text-[#DFBA6B] backdrop-blur-sm">
              <BookOpen size={14} />
              {project.category}
            </div>
          </div>

          {/* Cabecera de texto dentro del hero */}
          <div className="px-6 sm:px-10 pb-8 -mt-4 relative z-30">
            <div className="w-12 h-[3px] bg-gradient-to-r from-[#DFBA6B] to-[#C29A38] mb-4 shadow-[0_0_10px_rgba(194,154,56,0.5)]" />
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-black leading-tight tracking-wide mb-5 font-serif">
              {project.title}
            </h1>

            {/* Meta: autores + año */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <div className="flex items-center gap-2 text-[#DFBA6B]/80 text-sm">
                <Users size={14} />
                <span className="tracking-wide font-light">{project.authors.join(', ')}</span>
              </div>
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <Calendar size={14} />
                <span>{project.year}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Ficha Técnica ─── */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-7 bg-gradient-to-b from-[#DFBA6B] to-[#C29A38] shadow-[0_0_8px_rgba(194,154,56,0.4)]" />
            <h2 className="text-white text-lg font-bold tracking-[0.15em] uppercase font-serif">Ficha Técnica</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Categoría */}
            <div className="border border-[#DFBA6B]/20 bg-black/[0.45] rounded-xl p-5 flex items-start gap-4 backdrop-blur-sm">
              <BookOpen size={14} className="text-[#DFBA6B] mt-0.5" />
              <div>
                <p className="text-[10px] text-white/30 tracking-[0.2em] uppercase font-bold mb-1">Disciplina</p>
                <p className="text-[#DFBA6B] font-bold tracking-wide">{project.category}</p>
              </div>
            </div>
            {/* Año / Volumen */}
            <div className="border border-white/[0.06] bg-black/[0.45] rounded-xl p-5 flex items-start gap-4 backdrop-blur-sm">
              <Calendar size={14} className="text-white/40 mt-0.5" />
              <div>
                <p className="text-[10px] text-white/30 tracking-[0.2em] uppercase font-bold mb-1">Año / Volumen</p>
                <p className="text-white font-bold">{project.year} — {project.volume}</p>
              </div>
            </div>
            {/* Tutor */}
            <div className="border border-white/[0.06] bg-black/[0.45] rounded-xl p-5 flex items-start gap-4 backdrop-blur-sm">
              <GraduationCap size={14} className="text-[#DFBA6B]/60 mt-0.5" />
              <div>
                <p className="text-[10px] text-white/30 tracking-[0.2em] uppercase font-bold mb-1">Tutor Académico</p>
                <p className="text-white font-bold">{project.tutor}</p>
              </div>
            </div>
            {/* Reconocimiento */}
            <div className="border border-[#DFBA6B]/20 bg-black/[0.45] rounded-xl p-5 flex items-start gap-4 backdrop-blur-sm">
              <Award size={14} className="text-[#DFBA6B] mt-0.5" />
              <div>
                <p className="text-[10px] text-white/30 tracking-[0.2em] uppercase font-bold mb-1">Reconocimiento</p>
                <p className="text-[#DFBA6B] font-bold tracking-wide">Sello de Excelencia Académica</p>
              </div>
            </div>
            {/* Autores — ancho completo */}
                <div className="sm:col-span-2 border border-white/[0.06] bg-black/[0.45] rounded-xl p-5 flex items-start gap-4 backdrop-blur-sm">
              <Users size={14} className="text-[#DFBA6B]/60 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[10px] text-white/30 tracking-[0.2em] uppercase font-bold mb-2">Integrantes</p>
                <div className="flex flex-wrap gap-2">
                      {project.authors.map((autor, i) => (
                    <span key={i} className="text-white text-sm bg-[#DFBA6B]/12 border border-[#DFBA6B]/20 px-3 py-1 rounded-full tracking-wide font-medium">
                      {autor}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Resumen ─── */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-7 bg-gradient-to-b from-[#DFBA6B] to-[#C29A38] shadow-[0_0_8px_rgba(194,154,56,0.4)]" />
            <h2 className="text-white text-lg font-bold tracking-[0.15em] uppercase font-serif">Resumen</h2>
          </div>
          <div className="bg-gradient-to-b from-[rgba(0,0,0,0.45)] to-transparent border border-white/[0.05] rounded-xl p-6 sm:p-8">
            <p className="text-white text-base sm:text-lg leading-relaxed font-light text-justify">
              {project.description}
            </p>
          </div>
        </section>

        {/* ─── Metodología ─── */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-7 bg-gradient-to-b from-[#DFBA6B] to-[#C29A38] shadow-[0_0_8px_rgba(194,154,56,0.4)]" />
            <h2 className="text-white text-lg font-bold tracking-[0.15em] uppercase font-serif">Metodología</h2>
          </div>
          <div className="bg-gradient-to-b from-[rgba(0,0,0,0.45)] to-transparent border border-white/[0.05] rounded-xl p-6 sm:p-8">
            <p className="text-white text-base leading-relaxed font-light text-justify">
              {project.methodology}
            </p>
          </div>
        </section>

        {/* ─── Resultados ─── */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-7 bg-gradient-to-b from-[#DFBA6B] to-[#C29A38] shadow-[0_0_8px_rgba(194,154,56,0.4)]" />
            <h2 className="text-white text-lg font-bold tracking-[0.15em] uppercase font-serif">Resultados</h2>
          </div>
          <div className="bg-gradient-to-b from-[rgba(0,0,0,0.45)] to-transparent border border-white/[0.05] rounded-xl p-6 sm:p-8">
            <p className="text-white text-base leading-relaxed font-light text-justify">
              {project.results}
            </p>
          </div>
        </section>

        {/* ─── Métricas Académicas (Barras SVG) ─── */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-7 bg-gradient-to-b from-[#DFBA6B] to-[#C29A38] shadow-[0_0_8px_rgba(194,154,56,0.4)]" />
            <h2 className="text-white text-lg font-bold tracking-[0.15em] uppercase font-serif flex items-center gap-2">
              <BarChart3 size={18} />
              Rúbrica de Evaluación
            </h2>
          </div>
          <div className="border border-white/[0.05] bg-black/[0.45] rounded-xl p-6 sm:p-8 space-y-5 backdrop-blur-sm">
            {project.stats.map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-white/60 font-semibold tracking-wide">{stat.name}</span>
                  <span className="text-[#DFBA6B] font-bold">{stat.value}%</span>
                </div>
                <div className="h-2 w-full bg-white/[0.06] rounded-full overflow-hidden border border-white/[0.02] relative">
                  <div 
                    className="h-full bg-gradient-to-r from-[#5B0E2D] via-[#C29A38] to-[#FFE79A] rounded-full transition-all duration-[1.2s] ease-out shadow-[0_0_8px_rgba(194,154,56,0.3)]"
                    style={{ width: `${stat.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Ficha del Proyecto ─── */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-7 bg-gradient-to-b from-[#DFBA6B] to-[#C29A38] shadow-[0_0_8px_rgba(194,154,56,0.4)]" />
            <h2 className="text-white text-lg font-bold tracking-[0.15em] uppercase font-serif">Especificaciones</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.gallery.map((item, i) => (
              <div 
                key={i} 
                className="border border-white/[0.05] bg-black/[0.45] rounded-xl p-5 hover:bg-black/[0.55] transition-colors backdrop-blur-sm"
              >
                <span className="text-[10px] text-[#DFBA6B] uppercase tracking-widest font-bold font-heading">
                  {item.label}
                </span>
                <p className="text-white/80 text-sm font-medium mt-1">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Documentos y Anexos ─── */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-7 bg-gradient-to-b from-[#DFBA6B] to-[#C29A38] shadow-[0_0_8px_rgba(194,154,56,0.4)]" />
            <h2 className="text-white text-lg font-bold tracking-[0.15em] uppercase font-serif">Documentos y Anexos</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {project.documentUrl && project.documentUrl !== '#' ? (
              <a
                href={project.documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#DFBA6B] border border-[#DFBA6B]/40 px-6 py-3.5 rounded-xl text-sm font-bold tracking-[0.1em] uppercase hover:bg-[#DFBA6B]/10 hover:border-[#DFBA6B] transition-all group"
              >
                <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                Documento Principal
              </a>
            ) : (
              <div className="w-full border border-white/[0.04] bg-black/[0.45] rounded-xl p-5 text-center backdrop-blur-sm">
                <p className="text-white/30 text-sm tracking-wider uppercase font-light">Documentos en proceso de digitalización</p>
              </div>
            )}
          </div>
        </section>

        {/* ─── Link de regreso ─── */}
        <div className="mt-14 pt-8 border-t border-white/[0.05] flex justify-center">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-white/30 hover:text-[#DFBA6B] text-sm tracking-widest uppercase font-medium transition-colors"
          >
            <ArrowLeft size={14} />
            Ver todos los proyectos
          </button>
        </div>
      </main>

    </div>
  );
}
