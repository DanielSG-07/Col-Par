import React from "react";
import { Search, Compass, BookOpen, Layers } from "lucide-react";
import VisitorCounter from "./VisitorCounter";

export default function Header({ 
  searchTerms, 
  setSearchTerms, 
  totalProjects, 
  selectedCategory, 
  activeSection,
  onSectionChange
}) {
  const sections = [
    { id: "inicio", label: "Inicio", icon: Compass },
    { id: "proyectos", label: "Proyectos", icon: Layers },
    { id: "nuestro-proyecto", label: "Nuestro Proyecto", icon: BookOpen }
  ];

  return (
    <header className="top-navbar-pod px-6 py-5 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 relative z-40 select-none">
      
      {/* 1. Medallón Institucional y Letras Doradas Grabadas (Branding Izquierdo) */}
      <div className="flex items-center gap-4 md:gap-5">
        
        {/* Medallón Físico de Oro y Plata */}
        <div className="w-16 h-16 md:w-20 md:h-20 medallion-container rounded-full shrink-0 flex items-center justify-center relative p-1.5 animate-slide-left">
          <div className="medallion-gold-ring" />
          <div className="medallion-shine" />
          <div className="w-full h-full rounded-full bg-white/20 backdrop-blur-sm border border-[#FFEAEA]/40 flex items-center justify-center overflow-hidden relative shadow-inner">
            <img 
              src={`${import.meta.env.BASE_URL}logo.png`} 
              alt="Escudo Sagrado Corazón de Jesús" 
              className="w-11 h-11 md:w-14 md:h-14 object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.55)] scale-105"
            />
          </div>
        </div>

        {/* Letras Doradas Grabadas */}
        <div className="flex flex-col animate-slide-left" style={{ animationDelay: "100ms" }}>
          <span className="text-[8.5px] md:text-[9.5px] tracking-[0.25em] font-semibold text-[#DFBA6B]/75 font-heading">Portal Web</span>
          <h1 className="text-sm md:text-xl font-bold uppercase font-serif tracking-wider engraved-gold-text leading-tight mt-0.5">
            COLEGIO PARROQUIAL SAGRADO CORAZÓN DE JESÚS
          </h1>
          <span className="text-[10px] text-white/40 font-light mt-0.5 hidden md:block">
            Portal de Innovación e Investigación Científica y Tecnológica
          </span>

          <div className="mt-3 xl:mt-4 flex items-center gap-2">
            <div className="gold-platform-base rounded-lg px-3 py-1 flex items-center gap-2 shadow-sm">
              <span className="text-sm font-extrabold font-serif text-black leading-none drop-shadow-[0_0.5px_0.5px_rgba(255,255,255,0.5)]">{totalProjects}</span>
              <span className="text-[7.5px] text-black/80 font-bold uppercase tracking-widest">Proyectos</span>
            </div>
          </div>
        </div>

      </div>

      {/* 2. Navegación Principal por Pestañas (Cápsulas de Oro Pulido) */}
      <div className="flex items-center gap-2.5 bg-black/45 border border-[#C29A38]/20 rounded-2xl p-1.5 shrink-0 self-start xl:self-auto shadow-lg animate-fade-in">
        {sections.map((sec) => {
          const Icon = sec.icon;
          const active = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => onSectionChange(sec.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-serif tracking-wider uppercase transition-all duration-300 ${
                active 
                  ? "gold-polished-button text-black font-extrabold border-[#FFE79A] shadow-md scale-102" 
                  : "bg-transparent text-white/50 hover:text-white hover:bg-white/[0.01]"
              }`}
            >
              <Icon className={`h-4 w-4 ${active ? "text-black drop-shadow-[0_0.5px_0.5px_rgba(255,255,255,0.4)]" : "text-white/40"}`} />
              <span>{sec.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Buscador Derecho + Contador de Resultados debajo */}
      <div className="flex-1 max-w-sm xl:mx-0 w-full shrink-0 flex flex-col gap-2">
        {/* Input de Búsqueda */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4.5 w-4.5 text-[#DFBA6B] embossed-icon-3d" />
          </div>
          <input
            type="text"
            value={searchTerms}
            onChange={(e) => setSearchTerms(e.target.value)}
            placeholder="Buscar proyectos..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs text-white/90 placeholder-white/30 border border-[#C29A38]/30 focus:border-[#DFBA6B] bg-black/40 focus:outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(194,154,56,0.2)] font-light"
            aria-label="Buscar proyectos académicos"
          />
          {searchTerms && (
            <button 
              onClick={() => setSearchTerms("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#DFBA6B] hover:text-[#FFE79A] transition-colors"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Mensaje de resultados de búsqueda debajo del buscador */}
        {searchTerms && (
          <div className="px-1">
            <span className="text-[9px] text-white/35 font-light">
              resultados para "<span className="text-[#DFBA6B]/70 font-medium">{searchTerms}</span>"
            </span>
          </div>
        )}
      </div>

      {/* Contador minimalista en la esquina derecha (solo en pantallas grandes) */}
      <div className="hidden xl:flex items-center ml-6">
        <VisitorCounter variant="inline" />
      </div>

    </header>
  );
}
