import React, { useEffect, useRef, useState } from 'react';

export default function PdfViewer({ src }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  // Load pdf.js
  useEffect(() => {
    let cancelled = false;
    setError(null);
    setLoading(true);
    const loadPdfJs = async () => {
      if (window.pdfjsLib) {
        try {
          window.pdfjsLib.disableWorker = true;
        } catch (e) {
          // ignore
        }
        try {
          const loadingTask = window.pdfjsLib.getDocument(src);
          const doc = await loadingTask.promise;
          if (cancelled) return;
          setPdfDoc(doc);
          setPageNum(1);
          if (!cancelled) setLoading(false);
          return;
        } catch (error) {
          console.warn('Existing pdfjsLib instance failed, reloading library:', error);
          window.pdfjsLib = undefined;
        }
      }

      const cdnCandidates = [
        {
          js: 'https://unpkg.com/pdfjs-dist/build/pdf.min.js',
          worker: 'https://unpkg.com/pdfjs-dist/build/pdf.worker.min.js'
        },
        {
          js: 'https://cdn.jsdelivr.net/npm/pdfjs-dist/build/pdf.min.js',
          worker: 'https://cdn.jsdelivr.net/npm/pdfjs-dist/build/pdf.worker.min.js'
        }
      ];

      let loaded = false;
      let lastErr = null;
      for (const cdn of cdnCandidates) {
        try {
          if (!window.pdfjsLib) {
            await new Promise((resolve, reject) => {
              const s = document.createElement('script');
              s.src = cdn.js;
              s.async = true;
              s.onload = resolve;
              s.onerror = () => reject(new Error(`No se pudo cargar pdf.js desde ${cdn.js}`));
              document.head.appendChild(s);
            });
          }

          if (window.pdfjsLib) {
            try { window.pdfjsLib.GlobalWorkerOptions.workerSrc = cdn.worker; } catch (e) {}
          }

          let doc;
          try {
            const loadingTask = window.pdfjsLib.getDocument(src);
            doc = await loadingTask.promise;
          } catch (workerErr) {
            try {
              window.pdfjsLib.disableWorker = true;
              const loadingTask2 = window.pdfjsLib.getDocument(src);
              doc = await loadingTask2.promise;
            } catch (err2) {
              throw err2;
            }
          }
          if (cancelled) return;
          setPdfDoc(doc);
          setPageNum(1);
          loaded = true;
          break;
        } catch (err) {
          lastErr = err;
          try {
            const existing = document.querySelectorAll(`script[src="${cdn.js}"]`);
            existing.forEach((n) => n.parentNode && n.parentNode.removeChild(n));
          } catch (e) {}
        }
      }

      if (!loaded) {
        const message = lastErr?.message || 'Error al cargar la librería';
        setError(message);
      }
      if (!cancelled) setLoading(false);
    };

    loadPdfJs();
    return () => { cancelled = true; };
  }, [src, reloadKey]);

  // Render page
  useEffect(() => {
    let active = true;
    if (!pdfDoc) return;
    const renderPage = async (num) => {
      try {
        const page = await pdfDoc.getPage(num);
        if (!active) return;
        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;
        const renderContext = { canvasContext: context, viewport };
        await page.render(renderContext).promise;
      } catch (e) {
        console.error(e);
        setError('Error renderizando la página');
      }
    };
    renderPage(pageNum).catch((e) => console.error(e));
    return () => { active = false; };
  }, [pdfDoc, pageNum, scale]);

  if (!src) return null;
  const totalPages = pdfDoc ? pdfDoc.numPages : 0;

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full flex flex-col bg-[#140209]/95 text-slate-200 select-none overflow-hidden relative font-sans antialiased"
      onContextMenu={(e) => e.preventDefault()} 
      onCopy={(e) => e.preventDefault()} 
      onCut={(e) => e.preventDefault()} 
      onPaste={(e) => e.preventDefault()}
    >
      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 backdrop-blur-md">
          <div className="w-10 h-10 rounded-full border-2 border-white/5 border-t-[#DFBA6B] animate-spin" />
          <div className="text-xs font-medium text-slate-400 tracking-widest uppercase">Cargando visor…</div>
        </div>
      ) : error ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center max-w-md mx-auto">
          <div className="text-sm font-semibold text-red-400">Error de carga</div>
          <div className="text-xs text-slate-400 bg-black/40 p-3 rounded-lg border border-white/5 font-mono w-full break-all">{error}</div>
          <button onClick={() => { setReloadKey((k) => k + 1); setLoading(true); }} className="mt-2 px-4 py-2 bg-[#DFBA6B] text-black text-xs font-bold rounded-md hover:bg-[#cdaf60] transition-colors">Reintentar</button>
        </div>
      ) : (
        <>
          {/* barra superior minimalista integrada en el vidrio */}
          <div className="w-full h-14 bg-black/20 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 z-10 shrink-0">
            {/* Paginación */}
            <div className="flex items-center gap-1">
              <button 
                className="p-1.5 hover:bg-white/5 disabled:opacity-20 rounded-md text-slate-400 hover:text-white transition-all disabled:cursor-not-allowed"
                onClick={() => setPageNum((p) => Math.max(1, p - 1))} 
                disabled={pageNum <= 1}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
              </button>
              
              <span className="text-xs text-slate-400 px-3 tracking-wider font-medium">
                PÁGINA <span className="text-white font-semibold">{pageNum}</span> <span className="opacity-30">/</span> {totalPages}
              </span>

              <button 
                className="p-1.5 hover:bg-white/5 disabled:opacity-20 rounded-md text-slate-400 hover:text-white transition-all disabled:cursor-not-allowed"
                onClick={() => setPageNum((p) => Math.min(totalPages, p + 1))} 
                disabled={pageNum >= totalPages}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>

            {/* Zoom */}
            <div className="flex items-center gap-1">
              <button 
                className="p-1.5 hover:bg-white/5 disabled:opacity-20 rounded-md text-slate-400 hover:text-white transition-all disabled:cursor-not-allowed"
                onClick={() => setScale((s) => Math.max(0.5, +(s - 0.25).toFixed(2)))}
                disabled={scale <= 0.5}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" /></svg>
              </button>
              
              <span className="text-xs font-semibold text-slate-300 px-2 min-w-[50px] text-center tracking-wide">
                {Math.round(scale * 100)}%
              </span>
              
              <button 
                className="p-1.5 hover:bg-white/5 disabled:opacity-20 rounded-md text-slate-400 hover:text-white transition-all disabled:cursor-not-allowed"
                onClick={() => setScale((s) => +(s + 0.25).toFixed(2))}
                disabled={scale >= 2.0}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
              </button>
            </div>
          </div>

          {/* Área de Lectura Limpia */}
          <div className="flex-1 w-full overflow-auto p-8 flex justify-center items-start bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#240511] via-[#140209] to-[#0c0005]">
            
            {/* Contenedor del Canvas con Borde de 1px Gradiente de Alta Gama */}
            <div className="relative p-[1px] rounded-lg bg-gradient-to-b from-[#DFBA6B]/40 via-[#DFBA6B]/10 to-transparent shadow-[0_0_50px_-12px_rgba(223,186,107,0.15)] transition-all duration-300">
              
              {/* Filtro de Atenuación para la vista sobre el Canvas */}
              <div className="relative overflow-hidden rounded-[7px] bg-white">
                <canvas 
                  ref={canvasRef} 
                  className="block transition-transform duration-150" 
                />
                {/* Capa sutil Sepia/Cálida para evitar fatiga visual del blanco puro */}
                <div className="absolute inset-0 bg-[#DFBA6B]/4 pointer-events-none mix-blend-multiply" />
              </div>

            </div>

          </div>

          {/* Banner inferior informativo más integrado */}
          <div className="w-full bg-black/40 border-t border-white/5 py-2 px-4 text-center z-10 shrink-0">
            <span className="text-[10px] text-slate-500 tracking-widest uppercase font-medium">
              Selección de texto, copiado y descarga deshabilitados para proteger el documento
            </span>
          </div>
        </>
      )}
    </div>
  );
}