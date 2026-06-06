import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, User, BookOpen, Compass, ChevronRight, Sparkles, Leaf } from "lucide-react";

export default function Carousel({ projects, onSelectProject }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (activeIndex >= projects.length) {
      setActiveIndex(0);
    }
  }, [projects, activeIndex]);

  // Navegación por teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, projects.length]);

  const handleNext = () => {
    if (projects.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    if (projects.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 bg-[rgba(255,255,255,0.01)] border border-dashed border-[#DFBA6B]/20 rounded-3xl max-w-lg mx-auto my-12 animate-fade-in select-none">
        <div className="p-4 bg-[#DFBA6B]/5 rounded-full text-[#DFBA6B] mb-4">
          <Compass className="h-10 w-10 animate-spin" style={{ animationDuration: '8s' }} />
        </div>
        <h3 className="text-white font-bold text-base font-serif">No se encontraron proyectos indexados</h3>
        <p className="text-white/40 text-xs mt-2 max-w-xs font-light leading-relaxed">
          Modifica el filtro de la barra lateral, limpia la barra de búsqueda o cambia la pestaña de volumen de navegación.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center py-4 px-2 relative animate-fade-in">
      
      {/* Contenedor Principal del Cubo 3D y Controles */}
      <div className="w-full max-w-6xl flex items-center justify-between gap-2 md:gap-10 relative min-h-[540px]">
        
        {/* Botón de Dirección Izquierdo */}
        <button
          onClick={handlePrev}
          className="p-3.5 rounded-full bg-black/60 border border-[#C29A38]/30 hover:border-[#DFBA6B] text-[#DFBA6B] hover:text-[#FFE79A] transition-all duration-300 shadow-xl hover:shadow-[0_0_15px_rgba(194,154,56,0.3)] shrink-0 z-20 group"
          aria-label="Proyecto Anterior"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Ventana de Exhibición del Cubo Central */}
        <div className="flex-1 flex justify-center items-center h-[540px] relative select-none">
          {projects.map((project, index) => {
            const isCenter = index === activeIndex;
            const diff = index - activeIndex;
            const isLeft = diff === -1 || (activeIndex === 0 && index === projects.length - 1 && diff !== 0);
            const isRight = diff === 1 || (activeIndex === projects.length - 1 && index === 0 && diff !== 0);
            const isVisible = isCenter || isLeft || isRight;

            if (!isVisible && projects.length > 3) return null;

            // Coordenadas de visualización cinemática 3D de tres cuartos
            let transformStyle = "scale(0.7) translateX(0) translateZ(-250px) rotateY(0)";
            let opacity = 0;
            let zIndex = 0;
            let dofClass = "blur-dof-soft opacity-40"; // Profundidad de campo pronunciada para desenfoque de fondo

            if (isCenter) {
              // Foco central perfecto en 3D
              transformStyle = "scale(1) translateX(0) translateZ(50px) rotateY(0deg) rotateX(1deg)";
              opacity = 1;
              zIndex = 10;
              dofClass = "focus-dof-sharp animate-fade-in active-carousel-card";
            } else if (isLeft) {
              transformStyle = "scale(0.75) translateX(-85%) translateZ(-150px) rotateY(25deg) rotateX(2deg)";
              opacity = 0.55;
              zIndex = 5;
            } else if (isRight) {
              transformStyle = "scale(0.75) translateX(85%) translateZ(-150px) rotateY(-25deg) rotateX(2deg)";
              opacity = 0.55;
              zIndex = 5;
            }

            return (
              <div
                key={project.id}
                onClick={() => {
                  if (isCenter) {
                    onSelectProject(project);
                  } else {
                    setActiveIndex(index);
                  }
                }}
                className={`absolute w-[320px] sm:w-[400px] h-[520px] transition-all duration-700 ease-out cursor-pointer ${dofClass}`}
                style={{
                  transform: transformStyle,
                  opacity: opacity,
                  zIndex: zIndex,
                  transformStyle: "preserve-3d",
                  perspective: "1200px"
                }}
              >
                {/* 1. Plataforma de Oro Pulido Base */}
                <div className="absolute bottom-0 left-0 right-0 h-5 rounded-b-xl gold-platform-base z-0" />

                {/* 2. Vitrina de Cubo de Cristal Facetado y Biselado */}
                <div className="w-full h-[505px] glass-cube-showcase rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 relative group/card">
                  <div className="glass-cube-bevel rounded-2xl" />
                  <div className="glass-cube-reflection rounded-2xl" />
                  
                  {/* Luz interna en el cristal / Iluminación de Acento Superior */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#FFE79A] to-transparent opacity-80 group-hover/card:opacity-100 transition-opacity" />

                  {/* 3. Render 3D del Proyecto dentro del cubo de cristal */}
                  <div className="h-64 w-full relative overflow-hidden bg-black/45 shrink-0 flex items-center justify-center">
                    {/* Sombra proyectada en la base del cristal */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[rgba(41,3,18,0.95)] to-transparent z-10" />
                    
                    {project.caratula ? (
                      <img
                        src={project.caratula}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-80 group-hover/card:scale-108 transition-transform duration-1000 group-hover/card:opacity-100"
                      />
                    ) : (
                      <div className="w-full h-full relative overflow-hidden flex items-center justify-center bg-black/20">
                        <div className="text-sm text-white/90 bg-black/30 px-3 py-1 rounded">Carátula pendiente</div>
                      </div>
                    )}

                    {/* Sello de Categoría Flotante */}
                    <div className="absolute top-3 left-3 z-20">
                      <span className="badge-tech font-heading text-[8px] bg-gradient-to-r from-[#5B0E2D]/80 to-[#290312]/95 border border-[#DFBA6B]/40 text-[#DFBA6B] shadow-md px-2.5 py-1">
                        {project.category}
                      </span>
                    </div>

                    {/* Medidor LED Interno del Cristal */}
                    <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-black/60 border border-green-500/30 px-2 py-0.5 rounded text-[8px] text-green-400 font-semibold shadow-inner">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      <span>Cubo Activo</span>
                    </div>
                  </div>

                  {/* 4. Información del Proyecto - Letras Grabadas Flotando */}
                  <div className="p-3 flex-1 flex flex-col justify-between relative z-20">
                    <div>
                      {/* Texto de Categoría Grabado central */}
                      <span className="text-[8px] uppercase tracking-[0.25em] text-[#DFBA6B] font-bold block mb-1">
                        {project.category}
                      </span>

                      {/* Título en Letras Doradas Grabadas */}
                      <h3 className="text-white font-bold text-sm sm:text-base font-heading line-clamp-2 tracking-wide leading-snug group-hover/card:text-[#DFBA6B] transition-colors">
                        {project.title}
                      </h3>
                      
                      {/* Resumen e información del proyecto */}
                      <p className="text-white/60 text-[11px] sm:text-xs line-clamp-2 mt-1 font-light leading-relaxed">
                        {project.summary}
                      </p>
                    </div>

                    {/* Investigadores y Footer */}
                    <div className="mt-3 pt-3 border-t border-white/[0.04] flex items-center justify-between">
                      {/* Autores */}
                      <div className="flex items-center gap-2">
                        {/* Pequeño Medallón de Oro Rosa */}
                        <div className="w-8 h-8 rounded-full flex items-center justify-center rose-gold-frame text-black">
                          <User className="h-3.5 w-3.5 drop-shadow-[0_0.5px_0.5px_rgba(255,255,255,0.4)]" />
                        </div>
                        <div className="flex flex-col leading-none">
                          <span className="text-[7.5px] text-white/30 uppercase tracking-widest font-bold">Investigadores</span>
                          <span className="text-[10px] text-[#DFBA6B] font-semibold mt-1 line-clamp-1 max-w-[140px] sm:max-w-[170px] font-serif">
                            {project.authors.join(", ")}
                          </span>
                        </div>
                      </div>

                      {/* Botón de Inspección */}
                      <div className="w-7 h-7 rounded-full flex items-center justify-center bg-black/60 border border-[#C29A38]/30 text-[#DFBA6B] group-hover/card:bg-[#DFBA6B] group-hover/card:text-black transition-all duration-300 group-hover/card:scale-105">
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Botón de Dirección Derecho */}
        <button
          onClick={handleNext}
          className="p-3.5 rounded-full bg-black/60 border border-[#C29A38]/30 hover:border-[#DFBA6B] text-[#DFBA6B] hover:text-[#FFE79A] transition-all duration-300 shadow-xl hover:shadow-[0_0_15px_rgba(194,154,56,0.3)] shrink-0 z-20 group"
          aria-label="Siguiente Proyecto"
        >
          <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
        </button>

      </div>

      {/* Indicadores de Puntos de Selección en la Base */}
      <div className="flex items-center gap-3.5 mt-3 select-none">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`transition-all duration-300 rounded-full h-1.5 ${
              index === activeIndex 
                ? "bg-gradient-to-r from-[#DFBA6B] to-[#C29A38] w-7 shadow-[0_0_10px_rgba(194,154,56,0.5)]" 
                : "bg-white/10 w-1.5 hover:bg-white/30"
            }`}
            aria-label={`Ir al volumen indexado ${index + 1}`}
          />
        ))}
      </div>

    </div>
  );
}
