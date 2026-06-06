import React from "react";
import { Atom, Cpu, Milestone, Leaf, LayoutGrid } from "lucide-react";

export default function Sidebar({ selectedCategory, setSelectedCategory }) {
  const categories = [
    {
      id: "all",
      name: "Todos los Proyectos",
      label: "Todos",
      icon: LayoutGrid,
      desc: "Todas las áreas de investigación"
    },
    {
      id: "cientifico",
      name: "Fronteras Científicas",
      label: "Ciencias",
      icon: Atom,
      desc: "Física cuántica y modelos teóricos"
    },
    {
      id: "inteligente",
      name: "Sistemas Inteligentes",
      label: "Tecnología",
      icon: Cpu,
      desc: "Dispositivos IoT y automatización"
    },
    {
      id: "diseno",
      name: "Diseño & Humanidades",
      label: "Humanidades",
      icon: Milestone,
      desc: "Patrimonio virtual e historia"
    },
    {
      id: "sostenible",
      name: "Ecosistemas Sostenibles",
      label: "Sostenibilidad",
      icon: Leaf,
      desc: "Energía solar y biorreciclaje"
    }
  ];

  const handleSelect = (category) => {
    if (category.id === "all") {
      setSelectedCategory("");
    } else {
      setSelectedCategory(category.name);
    }
  };

  const isActive = (category) => {
    if (category.id === "all") return selectedCategory === "";
    return selectedCategory === category.name;
  };

  return (
    <aside className="w-full lg:w-80 bg-gradient-to-b from-[#290312]/90 to-[#120108]/95 border-r border-[#C29A38]/12 p-4 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible lg:overflow-y-auto shrink-0 z-30 scrollbar-none curved-sidebar-perspective">
      
      {/* Título de Sección Lateral en pantallas grandes */}
      <div className="hidden lg:block mb-8 px-2 select-none">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#DFBA6B] font-bold font-heading">Disciplinas del Futuro</span>
        <h2 className="text-white/40 text-[10px] font-light mt-1">Gabinete de Curaduría Científica</h2>
      </div>

      {/* Grid / Lista de Botones con Marco de Oro Rosa en 3D */}
      <nav className="flex flex-row lg:flex-col gap-3 w-full min-w-max lg:min-w-0">
        {categories.map((cat, index) => {
          const Icon = cat.icon;
          const active = isActive(cat);
          
          // Efecto de inclinación e interpolación de curva 3D vertical (solo en desktop)
          const rotateYValue = active ? "-10deg" : "-2deg";
          const translateZValue = active ? "30px" : "0px";
          const curveStyle = {
            transform: `rotateY(${rotateYValue}) translateZ(${translateZValue})`
          };

          return (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat)}
              style={curveStyle}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-500 w-full text-left relative overflow-hidden group curved-sidebar-item ${
                active 
                  ? "bg-gradient-to-r from-[rgba(194,154,56,0.12)] to-[rgba(255,255,255,0.01)] border border-[#C29A38] text-white shadow-[0_10px_25px_rgba(0,0,0,0.4)]" 
                  : "bg-white/[0.01] border border-white/[0.03] text-white/50 hover:text-white hover:bg-white/[0.03] hover:border-white/[0.07]"
              }`}
            >
              {/* Indicador de Línea Activa en Dorado */}
              {active && (
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#DFBA6B] to-[#C29A38]" />
              )}
              
              {/* Marco Redondo de Oro Rosa Texturizado e Icono */}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-lg rose-gold-frame transition-transform duration-500 ${
                active ? "scale-105" : "group-hover:scale-105"
              }`}>
                {/* Fondo metálico interno del marco */}
                <div className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center text-[#DFBA6B]">
                  <Icon className={`h-5 w-5 embossed-icon-3d transition-transform duration-700 ${
                    active ? "scale-110 rotate-6" : "group-hover:rotate-12 group-hover:scale-110"
                  }`} />
                </div>
              </div>
              
              {/* Información de la Categoría */}
              <div className="flex flex-col">
                <span className="text-xs font-bold tracking-wide font-heading group-hover:text-[#DFBA6B] transition-colors">{cat.label}</span>
                <span className="text-[9px] text-white/30 group-hover:text-white/50 transition-colors mt-0.5 max-w-[170px] truncate hidden lg:block font-light">
                  {cat.desc}
                </span>
              </div>
            </button>
          );
        })}
      </nav>
      
      {/* Separador inferior solo en desktop */}
      <div className="hidden lg:block mt-auto pt-6 border-t border-white/[0.04] text-[8px] text-white/30 text-center px-4 font-light leading-relaxed select-none">
        Colegio Parroquial Sagrado Corazón de Jesús &copy; 2026. Todos los derechos reservados.
      </div>
    </aside>
  );
}
