import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Calendar, FlaskConical, BookOpen, ExternalLink, X } from 'lucide-react';
import { Document, Page } from 'react-pdf';
import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf.mjs';
import Navbar from './Navbar';
import projectsData from '../data/projectsData';

GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();
GlobalWorkerOptions.disableFontFace = true;

const menciones = {
    Ciencias: {
        bg: 'bg-cyan-500/15',
        border: 'border-cyan-500/40',
        text: 'text-cyan-300',
        icon: <FlaskConical size={14} className="text-cyan-400" />,
        glow: 'shadow-[0_0_40px_rgba(0,229,255,0.15)]',
        bar: 'from-cyan-600 to-magazine-cyan',
    },
    Humanidades: {
        bg: 'bg-purple-500/15',
        border: 'border-purple-500/40',
        text: 'text-purple-300',
        icon: <BookOpen size={14} className="text-purple-400" />,
        glow: 'shadow-[0_0_40px_rgba(168,85,247,0.15)]',
        bar: 'from-purple-600 to-purple-400',
    },
};

export default function ProjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [numPages, setNumPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageWidth, setPageWidth] = useState(0);
    const modalRef = useRef(null);
    const project = projectsData.find((p) => p.id === parseInt(id));

    const documentoViewURL = project?.documentoURL && project.documentoURL !== '#'
        ? project.documentoURL
        : null;

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setCurrentPage(1);
    };

    const openDocumentModal = () => setShowModal(true);
    const closeDocumentModal = () => setShowModal(false);
    const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, numPages || prev));

    useEffect(() => {
        if (!showModal || !modalRef.current) return;

        const updateWidth = () => {
            const width = modalRef.current.clientWidth - 48;
            setPageWidth(Math.max(400, Math.min(width, 980)));
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, [showModal]);

    // Proyecto no encontrado
    if (!project) {
        return (
            <div className="relative min-h-screen bg-[#040814] font-sans flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center text-center px-6 z-10">
                    <div className="text-6xl mb-6">🔭</div>
                    <h2 className="text-white text-2xl font-bold tracking-widest uppercase mb-3">
                        Proyecto no encontrado
                    </h2>
                    <p className="text-gray-400 text-sm mb-8 max-w-sm">
                        El proyecto que buscas no existe o ha sido removido del sistema.
                    </p>
                    <Link
                        to="/proyectos"
                        className="flex items-center gap-2 text-magazine-cyan border border-magazine-cyan/40 px-6 py-3 text-sm font-bold tracking-widest uppercase hover:bg-magazine-cyan/10 transition-all"
                    >
                        <ArrowLeft size={16} />
                        Volver a Proyectos
                    </Link>
                </div>
            </div>
        );
    }

    const style = menciones[project.mencion] || menciones['Ciencias'];

    return (
        <div className="relative min-h-screen bg-[#040814] font-sans">
            {/* Fondo de partículas suave */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(0,229,255,0.06)_0%,_transparent_55%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(0,229,255,0.04)_0%,_transparent_60%)] pointer-events-none" />

            <Navbar />

            <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 pb-24 pt-2">

                {/* ─── Botón Volver ─── */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-400 hover:text-magazine-cyan transition-colors text-sm tracking-wider uppercase font-medium mb-8 group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Volver
                </motion.button>

                {/* ─── Hero ─── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={`relative w-full rounded-sm overflow-hidden border border-white/10 mb-10 ${style.glow}`}
                >
                    {/* Imagen de fondo */}
                    <div className="relative h-64 sm:h-80 md:h-[26rem] w-full overflow-hidden bg-[#000a12] flex items-center justify-center">
                        {/* Fondo desenfocado para llenar el espacio */}
                        <img
                            src={project.portadaURL}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover opacity-30 blur-xl saturate-150"
                        />
                        {/* Imagen real sin recortar */}
                        <img
                            src={project.portadaURL}
                            alt={project.titulo}
                            className="relative z-10 w-full h-full object-contain p-4"
                        />
                        {/* Gradiente */}
                        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#040814] via-[#040814]/60 to-transparent pointer-events-none" />

                        {/* Badge flotante */}
                        <div className={`absolute z-30 top-4 right-4 flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold tracking-widest uppercase ${style.bg} ${style.border} ${style.text}`}>
                            {style.icon}
                            {project.mencion}
                        </div>
                    </div>

                    {/* Cabecera de texto dentro del hero */}
                    <div className="px-6 sm:px-10 pb-8 -mt-4 relative">
                        <div className={`w-12 h-[3px] bg-gradient-to-r ${style.bar} mb-4 shadow-[0_0_10px_rgba(0,229,255,0.5)]`} />
                        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-black leading-tight tracking-wide mb-5">
                            {project.titulo}
                        </h1>

                        {/* Meta: autores + año */}
                        <div className="flex flex-wrap gap-x-6 gap-y-2">
                            <div className="flex items-center gap-2 text-magazine-cyan/80 text-sm">
                                <Users size={14} />
                                <span className="tracking-wide">{project.autores.join(', ')}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                <Calendar size={14} />
                                <span>{project.año}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ─── Ficha técnica ─── */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-10"
                >
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-1 h-7 bg-magazine-cyan shadow-[0_0_8px_#00e5ff]" />
                        <h2 className="text-white text-lg font-bold tracking-[0.15em] uppercase">Ficha Técnica</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Mención */}
                        <div className={`border rounded-sm p-5 flex items-start gap-4 ${style.bg} ${style.border}`}>
                            <div className="mt-0.5">{style.icon}</div>
                            <div>
                                <p className="text-[10px] text-gray-500 tracking-[0.2em] uppercase font-medium mb-1">Mención</p>
                                <p className={`font-bold tracking-wide ${style.text}`}>{project.mencion}</p>
                            </div>
                        </div>
                        {/* Año */}
                        <div className="border border-white/10 bg-white/3 rounded-sm p-5 flex items-start gap-4">
                            <Calendar size={14} className="text-gray-400 mt-0.5" />
                            <div>
                                <p className="text-[10px] text-gray-500 tracking-[0.2em] uppercase font-medium mb-1">Año</p>
                                <p className="text-white font-bold">{project.año}</p>
                            </div>
                        </div>
                        {/* Autores — ocupa todo el ancho */}
                        <div className="sm:col-span-2 border border-white/10 bg-white/3 rounded-sm p-5 flex items-start gap-4">
                            <Users size={14} className="text-magazine-cyan/60 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-[10px] text-gray-500 tracking-[0.2em] uppercase font-medium mb-2">Integrantes</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.autores.map((autor, i) => (
                                        <span key={i} className="text-magazine-cyan/80 text-sm bg-magazine-cyan/8 border border-magazine-cyan/20 px-3 py-1 rounded-full tracking-wide">
                                            {autor}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* ─── Sección Resumen ─── */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mb-10"
                >
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-1 h-7 bg-magazine-cyan shadow-[0_0_8px_#00e5ff]" />
                        <h2 className="text-white text-lg font-bold tracking-[0.15em] uppercase">Resumen</h2>
                    </div>
                    <div className="bg-gradient-to-b from-[#0b1b36]/60 to-[#040d1a]/60 border border-white/8 p-6 sm:p-8">
                        <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                            {project.resumen}
                        </p>
                    </div>
                </motion.section>

                {/* ─── Material Audiovisual (Video) ─── */}
                {project.videoURL && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mb-10"
                    >
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-1 h-7 bg-magazine-cyan shadow-[0_0_8px_#00e5ff]" />
                            <h2 className="text-white text-lg font-bold tracking-[0.15em] uppercase">Material Audiovisual</h2>
                        </div>
                        <div className="relative w-full aspect-video rounded-sm overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(0,229,255,0.05)]">
                            <iframe
                                src={project.videoURL}
                                title={`Video de ${project.titulo}`}
                                className="w-full h-full"
                                allowFullScreen
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            ></iframe>
                        </div>
                    </motion.section>
                )}


                {/* ─── Documentos y Anexos ─── */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mb-10"
                >
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-1 h-7 bg-magazine-cyan shadow-[0_0_8px_#00e5ff]" />
                        <h2 className="text-white text-lg font-bold tracking-[0.15em] uppercase">Documentos y Anexos</h2>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {project.documentoURL && project.documentoURL !== '#' && (
                            <button
                                type="button"
                                onClick={openDocumentModal}
                                className="flex items-center gap-3 text-magazine-cyan border border-magazine-cyan/50 px-6 py-3.5 text-sm font-bold tracking-[0.1em] uppercase hover:bg-magazine-cyan/10 hover:border-magazine-cyan transition-all group"
                            >
                                <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                                Ver Documento
                            </button>
                        )}
                        {project.anexos && project.anexos.map((anexo, idx) => (
                            anexo.url && anexo.url !== '#' && (
                                <a
                                    key={idx}
                                    href={anexo.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-gray-300 border border-gray-600 px-6 py-3.5 text-sm font-bold tracking-[0.1em] uppercase hover:bg-white/5 hover:text-white transition-all group"
                                >
                                    <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                                    {anexo.titulo}
                                </a>
                            )
                        ))}

                        {(!project.documentoURL || project.documentoURL === '#') && (!project.anexos || project.anexos.length === 0 || project.anexos.every(a => !a.url || a.url === '#')) && (
                            <div className="w-full border border-white/5 bg-white/3 rounded-sm p-5 text-center">
                                <p className="text-gray-500 text-sm tracking-wider uppercase">Documentos en proceso de digitalización</p>
                            </div>
                        )}
                    </div>
                </motion.section>

                {/* ─── Modal de documento protegido ─── */}
                {showModal && documentoViewURL && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                        onContextMenu={(e) => e.preventDefault()}
                        onCopy={(e) => e.preventDefault()}
                        onCut={(e) => e.preventDefault()}
                        onPaste={(e) => e.preventDefault()}
                    >
                        <div ref={modalRef} className="relative w-full max-w-5xl h-[85vh] bg-[#071019] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,229,255,0.25)]">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-5 py-4 gap-4 border-b border-white/10 bg-[#08111e]/90">
                                <div>
                                    <p className="text-white text-sm uppercase tracking-[0.2em] font-bold">Documento protegido</p>
                                    <p className="text-gray-400 text-xs mt-1">Copiar, pegar, descargar y capturas de pantalla no están permitidas.</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={closeDocumentModal}
                                    className="text-gray-300 hover:text-white p-2 rounded-full transition-colors"
                                    aria-label="Cerrar visor de documento"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="relative h-full bg-black select-none" onContextMenu={(e) => e.preventDefault()}>
                                <div className="absolute inset-x-0 top-0 z-20 flex flex-wrap items-center justify-between gap-3 bg-black/90 px-6 py-3">
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={goToPreviousPage}
                                            disabled={currentPage <= 1}
                                            className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.2em] text-white/80 disabled:opacity-40"
                                        >Anterior</button>
                                        <button
                                            type="button"
                                            onClick={goToNextPage}
                                            disabled={numPages ? currentPage >= numPages : true}
                                            className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.2em] text-white/80 disabled:opacity-40"
                                        >Siguiente</button>
                                    </div>
                                    <span className="text-white/70 text-xs uppercase tracking-[0.2em]">
                                        Página {currentPage} / {numPages || '-'}
                                    </span>
                                </div>
                                <div className="absolute inset-0 overflow-auto pt-16 p-6" style={{ userSelect: 'none' }}>
                                    <div className="max-w-full mx-auto" style={{ width: pageWidth || '100%' }}>
                                        <Document
                                            file={documentoViewURL}
                                            onLoadSuccess={onDocumentLoadSuccess}
                                            className="w-full h-full"
                                        >
                                            <Page
                                                pageNumber={currentPage}
                                                renderTextLayer={false}
                                                renderAnnotationLayer={false}
                                                className="mx-auto"
                                                width={pageWidth || 800}
                                            />
                                        </Document>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute bottom-4 left-4 right-4 text-center text-[11px] text-gray-500 uppercase tracking-[0.2em]">
                               La selección de texto y los enlaces están desactivados para proteger el contenido del documento.
                            </div>
                        </div>
                    </div>
                )}
                {/* ─── Link de regreso a la lista ─── */}
                <div className="mt-14 pt-8 border-t border-white/8 flex justify-center">
                    <Link
                        to="/proyectos"
                        className="flex items-center gap-2 text-gray-500 hover:text-magazine-cyan text-sm tracking-widest uppercase font-medium transition-colors"
                    >
                        <ArrowLeft size={14} />
                        Ver todos los proyectos
                    </Link>
                </div>
            </main>
        </div>
    );
}
