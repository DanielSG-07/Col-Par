import React, { useState, useMemo } from "react";
import { User, Calendar, BookOpen, Compass, ChevronRight, Award } from "lucide-react";

export default function ProjectList({ projects, onSelectProject, searchTerms }) {
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const categories = useMemo(() => {
    const uniqueCategories = projects.reduce((acc, project) => {
      if (!acc.includes(project.category)) acc.push(project.category);
      return acc;
    }, []);
    return ["Todos", ...uniqueCategories];
  }, [projects]);

  // Filtrado de proyectos para la grilla
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // 1. Filtrar por categoría seleccionada en el panel de etiquetas
      if (selectedCategory !== "Todos" && project.category !== selectedCategory) {
        return false;
      }
      // 2. Filtrar por término de búsqueda activo en el Header
      if (searchTerms.trim() !== "") {
        const query = searchTerms.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(query);
        const matchesSummary = project.summary.toLowerCase().includes(query);
        const matchesAuthors = project.authors.some(auth => auth.toLowerCase().includes(query));
        const matchesTutor = project.tutor.toLowerCase().includes(query);
        
        if (!matchesTitle && !matchesSummary && !matchesAuthors && !matchesTutor) return false;
      }
      return true;
    });
  }, [projects, selectedCategory, searchTerms]);

  return (
    <div className="w-full flex-1 flex flex-col p-4 md:p-8 animate-fade-in select-none">
      
      {/* Cabecera del Listado de Proyectos */}
      <div className="mb-8 border-b border-[#DFBA6B]/15 pb-6">
        <div className="flex items-center gap-3.5 mb-2">
          <div className="w-[3px] h-7 bg-gradient-to-b from-[#DFBA6B] to-[#C29A38] shadow-[0_0_10px_rgba(194,154,56,0.35)]" />
          <h2 className="text-white text-xl md:text-3xl font-bold font-serif tracking-wider drop-shadow-[0_0.5px_0.5px_rgba(255,255,255,0.4)]">
            CATÁLOGO DE INVESTIGACIONES
          </h2>
        </div>
        <p className="text-white/40 text-xs font-light max-w-2xl leading-relaxed">
          Explora la colección completa de proyectos de investigación científica, tecnológica e histórica indexados en los volúmenes oficiales del Colegio Parroquial.
        </p>
      </div>

      {/* Filtros de Categorías Minimalistas en Fila Horizontal */}
      <div className="flex flex-wrap items-center gap-2.5 pb-4 mb-8 shrink-0 scrollbar-none">
        {categories.map((cat) => {
          const active = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 min-w-max border ${
                active 
                  ? "gold-polished-button text-black font-extrabold border-[#FFE79A] shadow-md" 
                  : "bg-black/35 text-white/50 border-white/[0.04] hover:text-white hover:bg-white/[0.02]"
              }`}
            >
              {cat === "Todos" ? "Todos los Proyectos" : cat}
            </button>
          );
        })}
      </div>

      {/* Grid de Proyectos */}
      {filteredProjects.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-[rgba(255,255,255,0.01)] border border-dashed border-[#DFBA6B]/10 rounded-2xl max-w-md mx-auto my-12 animate-fade-in">
          <div className="p-3 bg-[#DFBA6B]/5 rounded-full text-[#DFBA6B] mb-4">
            <Compass className="h-8 w-8 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
          <h3 className="text-white font-bold text-sm font-serif">Sin resultados en la categoría</h3>
          <p className="text-white/40 text-xs mt-1.5 max-w-xs font-light leading-relaxed">
            No se encontraron proyectos que coincidan con la categoría seleccionada o los términos de búsqueda actuales.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
          {filteredProjects.map((project, index) => (
            <article
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="glass-panel-dark border border-white/[0.05] hover:border-[#C29A38]/50 rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)] transition-all duration-500 ease-out cursor-pointer relative group"
              style={{
                animationDelay: `${index * 50}ms`
              }}
            >
              {/* Iluminación de Acento Superior */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#DFBA6B] to-transparent opacity-30 group-hover:opacity-100 transition-opacity" />

              {/* Portada */}
              <div className="h-44 w-full relative overflow-hidden bg-black/45 shrink-0 flex items-center justify-center">
                <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[rgba(41,3,18,0.95)] to-transparent z-10" />
                {project.caratula ? (
                  <img
                    src={project.caratula}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/60 bg-black/20">
                    <span className="text-sm">Carátula pendiente</span>
                  </div>
                )}
                
                {/* Badge de Categoría */}
                <div className="absolute top-3 left-3 z-20">
                  <span className="badge-tech font-heading text-[8px] bg-gradient-to-r from-[#5B0E2D]/80 to-[#290312]/95 border border-[#DFBA6B]/30 text-[#DFBA6B] shadow px-2.5 py-1">
                    {project.category}
                  </span>
                </div>

                {/* Año */}
                <div className="absolute bottom-2 right-3 z-20 flex items-center gap-1 text-[8.5px] text-[#DFBA6B] font-semibold bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded">
                  <BookOpen className="h-3 w-3" />
                  <span>{project.year}</span>
                </div>
              </div>

              {/* Contenido de la Tarjeta */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[7.5px] uppercase tracking-[0.25em] text-[#DFBA6B] font-bold block leading-none">
                    {project.category}
                  </span>
                  <h3 className="text-white font-bold text-sm sm:text-base font-heading line-clamp-2 tracking-wide leading-snug group-hover:text-[#DFBA6B] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/60 text-xs line-clamp-3 font-light leading-relaxed text-justify">
                    {project.summary}
                  </p>
                </div>

                {/* Footer de Tarjeta */}
                <div className="pt-3.5 border-t border-white/[0.04] flex items-center justify-between shrink-0">
                  {/* Autores */}
                  <div className="flex items-center gap-2">
                    {/* Medallón de Autor */}
                    <div className="w-8 h-8 rounded-full flex items-center justify-center rose-gold-frame text-black">
                      <User className="h-3.5 w-3.5 drop-shadow-[0_0.5px_0.5px_rgba(255,255,255,0.4)]" />
                    </div>
                    <div className="flex flex-col leading-none">
                      <span className="text-[7.5px] text-white/30 uppercase tracking-widest font-bold">Investigadores</span>
                      <span className="text-[10px] text-[#DFBA6B] font-semibold mt-1 line-clamp-1 max-w-[125px] sm:max-w-[155px] font-serif">
                        {project.authors.join(", ")}
                      </span>
                    </div>
                  </div>

                  {/* Icono de Acción */}
                  <div className="w-7 h-7 rounded-full flex items-center justify-center bg-black/50 border border-[#C29A38]/30 text-[#DFBA6B] group-hover:bg-[#DFBA6B] group-hover:text-black transition-all duration-300">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

    </div>
  );
}
