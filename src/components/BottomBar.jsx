import React from "react";
import { Book, History, Award } from "lucide-react";

export default function BottomBar({ bottomNavTab, setBottomNavTab }) {
  const tabs = [
    {
      id: "actual",
      name: "Último Volumen",
      icon: Book,
      desc: "Volumen XIV de investigaciones activas"
    },
    {
      id: "historico",
      name: "Repaso Histórico",
      icon: History,
      desc: "Historial de tesis e investigaciones pasadas"
    },
    {
      id: "destacados",
      name: "Proyectos Destacados",
      icon: Award,
      desc: "Sello de excelencia académica institucional"
    }
  ];

  return (
    <div className="w-full flex justify-center px-4 py-4 md:py-6 bg-gradient-to-t from-[rgba(18,2,9,0.98)] to-transparent relative z-30 shrink-0 select-none">
      
      {/* Consola de Navegación con Botones de Oro Pulido */}
      <div className="bg-black/60 backdrop-blur-2xl border border-[#DFBA6B]/20 rounded-2xl md:rounded-3xl p-2 md:p-3 flex items-center justify-between gap-2.5 md:gap-5 max-w-2xl w-full shadow-2xl relative">
        
        {/* Iluminación de Acento en el Borde Superior de la Consola */}
        <div className="absolute -top-[1.5px] left-1/4 right-1/4 h-[1.5px] bg-gradient-to-r from-transparent via-[#DFBA6B] to-transparent opacity-80" />
        
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = bottomNavTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setBottomNavTab(tab.id)}
              className={`flex-1 flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-3 py-2.5 px-3 md:py-3.5 md:px-5 rounded-xl md:rounded-2xl transition-all duration-300 relative group ${
                active 
                  ? "gold-polished-button text-black font-extrabold border-[#FFE79A] shadow-[0_8px_20px_rgba(0,0,0,0.5)]" 
                  : "bg-transparent text-white/50 hover:text-white/80 hover:bg-white/[0.01]"
              }`}
            >
              {/* Icono Físico (Embosed) */}
              <Icon className={`h-4.5 w-4.5 md:h-5 md:w-5 transition-all duration-300 ${
                active 
                  ? "text-black scale-110 drop-shadow-[0_0.5px_0.5px_rgba(255,255,255,0.4)]" 
                  : "text-white/30 group-hover:scale-105"
              }`} />
              
              {/* Información y Texto Grabado */}
              <div className="flex flex-col items-center md:items-start leading-none">
                <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-center md:text-left ${
                  active ? "text-black drop-shadow-[0_0.5px_0.5px_rgba(255,255,255,0.4)]" : "text-white/60"
                }`}>
                  {tab.name}
                </span>
                <span className={`text-[7.5px] hidden lg:block font-light mt-0.5 ${
                  active ? "text-black/70" : "text-white/30"
                }`}>
                  {tab.desc}
                </span>
              </div>
              
              {/* Indicador LED dorado activo */}
              {active && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-black rounded-full md:top-2 md:right-2" />
              )}
            </button>
          );
        })}
      </div>

    </div>
  );
}
