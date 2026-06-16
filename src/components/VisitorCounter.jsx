import { useEffect, useState } from "react";
import { Eye, Users } from "lucide-react";

function VisitorCounter({ variant = "card", visits: propVisits, loading: propLoading }) {
  const [localVisits, setLocalVisits] = useState(null);
  const [localLoading, setLocalLoading] = useState(true);

  const visits = propVisits !== undefined ? propVisits : localVisits;
  const loading = propLoading !== undefined ? propLoading : localLoading;

  useEffect(() => {
    if (propVisits !== undefined) return;

    const isDev = import.meta.env.DEV;

    async function fetchCount() {
      try {
        // En desarrollo: solo lee el contador para evitar incrementos falsos por Hot Reloading.
        // En producción: incrementa el contador con la acción 'up'.
        const endpoint = isDev
          ? "https://api.counterapi.dev/v2/daniel-garcias-team-4475/first-counter-4475"
          : "https://api.counterapi.dev/v2/daniel-garcias-team-4475/first-counter-4475/up";

        const resp = await fetch(endpoint);
        if (!resp.ok) throw new Error("Error en la petición al contador");
        
        const json = await resp.json();
        let count = json?.data?.up_count ?? null;
        if (count !== null && !isDev) {
          // Sumamos 1 porque la API V2 /up devuelve el valor previo al incremento
          count = count + 1;
        }
        setLocalVisits(count);
      } catch (error) {
        console.error("Error al actualizar el contador:", error);
      } finally {
        setLocalLoading(false);
      }
    }

    fetchCount();
  }, [propVisits]);
  if (loading) {
    if (variant === "inline") {
      return (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-[#C29A38]/30 text-xs text-[#F9F5E8] animate-pulse">
          <Eye size={13} className="text-[#DFBA6B]" />
          <span className="font-light tracking-wide text-white/50">...</span>
        </div>
      );
    }
    return (
      <div className="max-w-xs mx-auto rounded-2xl border border-[#C29A38]/30 bg-gradient-to-b from-[#290312]/80 to-[#0b0004]/90 backdrop-blur-md p-4 shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex items-center justify-center gap-3 w-48 animate-pulse">
        <Eye size={18} className="text-[#DFBA6B] animate-bounce" />
        <span className="text-xs font-heading font-medium text-white/40 tracking-wider">CARGANDO...</span>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/55 backdrop-blur-md border border-[#C29A38]/30 hover:border-[#DFBA6B] transition-colors duration-300 text-xs text-[#F9F5E8]" title="Visitas totales">
        <Eye size={13} className="text-[#DFBA6B]" />
        <span className="font-heading font-semibold tracking-wider text-[#DFBA6B]">{visits ?? "---"}</span>
      </div>
    );
  }

  return (
    <div className="relative group overflow-hidden max-w-xs mx-auto rounded-2xl border border-[#C29A38]/30 hover:border-[#DFBA6B]/60 bg-gradient-to-br from-[#290312]/90 via-[#1e020d]/95 to-[#0b0004]/98 backdrop-blur-lg p-5 shadow-[0_20px_50px_rgba(0,0,0,0.65)] hover:shadow-[0_20px_50px_rgba(194,154,56,0.15)] transition-all duration-500 w-56">
      {/* Glow effect overlay */}
      <div className="absolute -inset-px bg-gradient-to-r from-transparent via-[#DFBA6B]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="flex flex-col items-center text-center gap-2 relative z-10">
        <div className="w-10 h-10 rounded-full bg-[#4C0925]/40 border border-[#C29A38]/30 flex items-center justify-center shadow-inner group-hover:border-[#DFBA6B] transition-colors duration-300">
          <Users size={18} className="text-[#DFBA6B] group-hover:scale-110 transition-transform duration-300" />
        </div>
        
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] uppercase font-heading font-bold tracking-widest text-white/60">
            Visitas Totales
          </span>
          <span className="text-2xl font-black font-heading tracking-wider engraved-gold-text">
            {visits ?? "---"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default VisitorCounter;
