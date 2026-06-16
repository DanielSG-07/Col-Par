import React, { useState, useMemo, useEffect } from "react";
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import ProjectDetails from "./components/ProjectDetails";
import ProjectList from "./components/ProjectList";
import NuestroProyecto from "./components/NuestroProyecto";
import VisitorCounter from "./components/VisitorCounter";
import { projects } from "./data/projects";
import { Sparkles } from "lucide-react";

export default function App() {
  const [activeSection, setActiveSection] = useState("inicio"); // inicio | proyectos | nuestro-proyecto | detalle
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerms, setSearchTerms] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [particles, setParticles] = useState([]);
  const [visits, setVisits] = useState(null);
  const [loadingVisits, setLoadingVisits] = useState(true);

  useEffect(() => {
    const isDev = import.meta.env.DEV;

    async function fetchGlobalCount() {
      try {
        const endpoint = isDev
          ? "https://api.counterapi.dev/v2/daniel-garcias-team-4475/first-counter-4475"
          : "https://api.counterapi.dev/v2/daniel-garcias-team-4475/first-counter-4475/up";

        const resp = await fetch(endpoint);
        if (!resp.ok) throw new Error("Error en el contador global");
        const json = await resp.json();
        
        let count = json?.data?.up_count ?? null;
        if (count !== null && !isDev) {
          // Sumamos 1 porque la API V2 /up devuelve el valor previo al incremento
          count = count + 1;
        }
        setVisits(count);
      } catch (error) {
        console.error("Error al obtener el contador:", error);
      } finally {
        setLoadingVisits(false);
      }
    }

    fetchGlobalCount();
  }, []);

  const sectionToHash = (section) => {
    switch (section) {
      case "inicio":
        return "#/inicio";
      case "proyectos":
        return "#/proyectos";
      case "nuestro-proyecto":
        return "#/nuestro-proyecto";
      default:
        return "#/inicio";
    }
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setSelectedProject(null);
    window.history.pushState(null, "", sectionToHash(section));
  };

  const handleSelectProject = (project) => {
    if (!project) return;
    if (project.id === "proj-1") {
      handleSectionChange("nuestro-proyecto");
      return;
    }
    setSelectedProject(project);
    setActiveSection("detalle");
    window.history.pushState(null, "", `#/detalle/${project.id}`);
    window.scrollTo(0, 0);
  };

  const handleCloseDetail = () => {
    setSelectedProject(null);
    setActiveSection("proyectos");
    window.history.pushState(null, "", sectionToHash("proyectos"));
  };

  const visibleProjects = useMemo(
    () => projects.filter((project) => project.id !== "proj-1"),
    []
  );

  const handleRouteChange = () => {
    const hash = window.location.hash.replace(/^#\/?/, "");
    const [section, projectId] = hash.split("/");

    if (!hash || section === "inicio") {
      setActiveSection("inicio");
      setSelectedProject(null);
      return;
    }

    if (section === "proyectos") {
      setActiveSection("proyectos");
      setSelectedProject(null);
      return;
    }

    if (section === "nuestro-proyecto") {
      setActiveSection("nuestro-proyecto");
      setSelectedProject(null);
      return;
    }

    if (section === "detalle" && projectId) {
      const project = projects.find((p) => p.id === projectId);
      if (project && project.id !== "proj-1") {
        setSelectedProject(project);
        setActiveSection("detalle");
        return;
      }
      setSelectedProject(null);
      setActiveSection("proyectos");
      return;
    }

    setActiveSection("inicio");
    setSelectedProject(null);
  };

  useEffect(() => {
    handleRouteChange();
    window.addEventListener("hashchange", handleRouteChange);
    return () => window.removeEventListener("hashchange", handleRouteChange);
  }, []);

  // Generador de partículas incrementado para mayor densidad en el viaje estelar
  useEffect(() => {
    const totalParticles = 80; // Aumentado a 40 para un efecto más inmersivo
    const generatedParticles = Array.from({ length: totalParticles }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      // Multiplicador de empuje aleatorio para dispersar el destino en los bordes
      const distance = 65 + Math.random() * 40; 
      const endX = 50 + Math.cos(angle) * distance;
      const endY = 55 + Math.sin(angle) * distance;

      return {
        id: i,
        size: `${Math.random() * 3.5 + 1.5}px`, // Tamaños variados para profundidad
        delay: `${Math.random() * 6}s`, // Delay completamente aleatorio para flujo constante
        duration: `${Math.random() * 2.5 + 3.5}s`, // Velocidad cinética óptima
        endX: `${endX}%`,
        endY: `${endY}%`,
        travelX: Math.cos(angle) > 0 ? "50%" : "-150%",
        travelY: Math.sin(angle) > 0 ? "50%" : "-150%"
      };
    });
    setParticles(generatedParticles);
  }, [activeSection]);

  const filteredProjects = useMemo(() => {
    return visibleProjects.filter((project) => {
      if (selectedCategory) {
        if (project.category !== selectedCategory) return false;
      }

      if (searchTerms.trim() !== "") {
        const query = searchTerms.toLowerCase();
        return (
          project.title.toLowerCase().includes(query) ||
          project.authors.some(a => a.toLowerCase().includes(query)) ||
          (project.summary && project.summary.toLowerCase().includes(query)) ||
          (project.description && project.description.toLowerCase().includes(query)) ||
          (project.tutor && project.tutor.toLowerCase().includes(query)) ||
          (project.category && project.category.toLowerCase().includes(query))
        );
      }
      return true;
    });
  }, [selectedCategory, searchTerms, visibleProjects]);

  return (
    <div className="bg-neoclassic-tech min-h-screen w-full relative overflow-hidden">
      {/* CAPAS DE FONDO VIAJE ESTELAR */}
      <div className="ui-organic-overlay" />
      <div className="tech-network" />
      
      {/* Máscara de atenuación detrás del carrusel */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0b0004]/30 to-[#0b0004]/10 pointer-events-none z-2" />

      {/* PARTÍCULAS ESTELARES (Z-INDEX 3 para pasar por detrás del carrusel si este tiene z-10) */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="gold-particle"
          style={{
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            "--tw-end-x": p.endX,
            "--tw-end-y": p.endY,
            "--tw-travel-x": p.travelX,
            "--tw-travel-y": p.travelY
          }}
        />
      ))}

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative z-10 w-full">
        <Header 
          searchTerms={searchTerms} 
          setSearchTerms={setSearchTerms} 
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          totalProjects={filteredProjects.length}
          visits={visits}
          loadingVisits={loadingVisits}
        />

        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 min-h-[calc(100vh-140px)] flex flex-col">
          
          {/* SECCIÓN INICIO */}
          {activeSection === "inicio" && (
            <section className="w-full flex-1 flex flex-col justify-between animate-fade-in">
              {/* <div className="text-center mt-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest text-[#DFBA6B] bg-white/5 border border-[#C29A38]/30 mb-3 backdrop-blur-sm">
                  <Sparkles size={11} className="text-[#DFBA6B]" /> Portal de Innovación e Investigación Científica
                </span>
                <h2 className="text-xl md:text-3xl font-black text-center engraved-gold-text">
                
                </h2>
                <p className="text-white/40 text-[9px] md:text-xs font-light mt-1.5 max-w-sm mx-auto hidden sm:block">
                  Navega en la vitrina tecnológica e histórica de investigaciones escolares. Haz clic en una tarjeta para ver detalles completos y métricas.
                </p>
              </div> */}

              {/* Contenedor del Carrusel central */}
              <div className="w-full flex-1 flex items-center justify-center min-h-[500px]">
                <Carousel 
                  projects={filteredProjects} 
                  onSelectProject={handleSelectProject} 
                />
              </div>
            </section>
          )}

          {/* SECCIÓN PROYECTOS */}
          {activeSection === "proyectos" && (
            <ProjectList 
              projects={visibleProjects} 
              onSelectProject={handleSelectProject} 
              searchTerms={searchTerms}
            />
          )}

          {/* SECCIÓN NUESTRO PROYECTO */}
          {activeSection === "nuestro-proyecto" && (
            <NuestroProyecto />
          )}

          {/* SECCIÓN DETALLE */}
          {activeSection === "detalle" && selectedProject && (
            <ProjectDetails 
              project={selectedProject} 
              onClose={handleCloseDetail}
            />
          )}

          <div className="mt-10 flex justify-center">
            <VisitorCounter visits={visits} loading={loadingVisits} />
          </div>

        </main>
      </div>
    </div>
  );
}