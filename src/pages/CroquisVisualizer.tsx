import { useEffect, useRef, useState } from 'react';

type Rectangle = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

type Bin = {
  width: number;
  height: number;
  efficiency_percent: number;
  rectangles: Rectangle[];
};

type PackingResult = {
  bins: Bin[];
};

type CroquisVisualizerProps = {
  data: PackingResult | null;
  tipoCristal: string;
  onClose: () => void;
};

// Escala calculada para ocupar todo el ancho disponible
const BASE_SCALE = 15;

function gcd(a: number, b: number): number {
  return b ? gcd(b, a % b) : a;
}

function decimalToMixedFraction(decimal: number): string {
  if (decimal === 0) return "0";
  const rounded = parseFloat(decimal.toFixed(4));
  const whole = Math.floor(rounded);
  const fraction = rounded - whole;

  if (fraction === 0) return whole.toString();

  const MAX_DEN = 64;
  let num = Math.round(fraction * MAX_DEN);
  let den = MAX_DEN;

  const d = gcd(num, den);
  num /= d;
  den /= d;

  return whole === 0 ? `${num}/${den}` : `${whole} ${num}/${den}`;
}

export default function CroquisVisualizer({ data, tipoCristal, onClose }: CroquisVisualizerProps) {
  console.log(data);
  
  const [selectedBin, setSelectedBin] = useState<number | null>(null);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const [scales, setScales] = useState<number[]>([]);

  useEffect(() => {
    if (!data?.bins) return;

    // Calcular escalas óptimas para cada bin basado en el ancho del contenedor
    const newScales = data.bins.map((bin, index) => {
      const container = containerRefs.current[index];
      if (!container) return BASE_SCALE;
      
      const containerWidth = container.clientWidth - 32; // Pequeño margen
      return Math.max(BASE_SCALE, containerWidth / bin.width);
    });
    
    setScales(newScales);
  }, [data]);

  useEffect(() => {
    if (!data?.bins || scales.length === 0) return;

    data.bins.forEach((bin, index) => {
      const canvas = canvasRefs.current[index];
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const scale = scales[index] || BASE_SCALE;

      // Set canvas size - ocupa todo el ancho disponible
      canvas.width = bin.width * scale;
      canvas.height = bin.height * scale;
      canvas.style.width = '100%';
      canvas.style.height = 'auto';
      canvas.style.display = 'block';
      
      ctx.scale(scale, scale);

      // Fondo blanco limpio
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, bin.width, bin.height);

      // Borde sutil del molde
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 0.2;
      ctx.strokeRect(0, 0, bin.width, bin.height);

      // Draw rectangles
      bin.rectangles.forEach((rect, rectIndex) => {
        const x = rect.x;
        const y = rect.y;
        const w = rect.width;
        const h = rect.height;

        // Colores alternados intensos
        const colors = [
          'rgba(59, 130, 246, 0.95)',   // blue-500
          'rgba(139, 92, 246, 0.95)',   // violet-500
          'rgba(14, 165, 233, 0.95)',   // sky-500
          'rgba(99, 102, 241, 0.95)',   // indigo-500
          'rgba(6, 182, 212, 0.95)',    // cyan-500
          'rgba(168, 85, 247, 0.95)',   // purple-500
        ];
        
        ctx.fillStyle = colors[rectIndex % colors.length];
        ctx.fillRect(x, y, w, h);

        // Borde definido
        ctx.strokeStyle = "#0f172a";
        ctx.lineWidth = 0.2;
        ctx.strokeRect(x, y, w, h);

        // Texto siempre visible, tamaño proporcional a la escala
        const minDimension = Math.min(w, h);
        // Fuente más grande proporcional al scale
        let fontSize = Math.max(2, scale / 6);
        if (minDimension < 20) fontSize = Math.max(1.5, scale / 8);
        if (minDimension < 10) fontSize = Math.max(1.2, scale / 10);

        // ID del rectángulo
        ctx.fillStyle = "#ffffff";
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        // Sombra para legibilidad
        ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
        ctx.shadowBlur = 4;
        ctx.fillText(rect.id, x + w / 2, y + h / 2 - fontSize * 0.2);
        ctx.shadowBlur = 0;

        // Dimensiones
        ctx.fillStyle = "#ffffff";
        ctx.font = `${fontSize * 0.9}px Arial`;
        ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
        ctx.shadowBlur = 3;
        ctx.fillText(
          `${decimalToMixedFraction(rect.width)}×${decimalToMixedFraction(rect.height)}"`,
          x + w / 2,
          y + h / 2 + fontSize * 0.9
        );
        ctx.shadowBlur = 0;
      });
    });
  }, [data, scales]);

  const handlePrint = () => {
    window.print();
  };

  if (!data || !data.bins || data.bins.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-slate-400">No hay datos para visualizar</div>
      </div>
    );
  }

  return (
    <div className="animate-[fadeIn_0.5s_ease-out] w-full px-0">
      {/* Header */}
      <div className="no-print flex flex-col lg:flex-row lg:items-center justify-between mb-4 gap-4 px-4">
        <div>
          <h2 className="text-2xl font-bold text-white capitalize mb-1 flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
            {tipoCristal}
          </h2>
          <p className="text-slate-400 text-sm">
            {data.bins.length} molde{data.bins.length !== 1 ? 's' : ''} • 
            {data.bins.reduce((acc, bin) => acc + bin.rectangles.length, 0)} piezas
          </p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg text-white text-sm transition-all duration-200 hover:scale-105"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Imprimir
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600/80 to-red-500/80 hover:from-red-500 hover:to-red-400 backdrop-blur-sm border border-red-400/30 rounded-lg text-white text-sm transition-all duration-200 hover:scale-105"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cerrar
          </button>
        </div>
      </div>

      {/* Bins */}
      <div className="space-y-4 w-full">
        {data.bins.map((bin, index) => (
          <div 
            key={index}
            ref={(el) => { containerRefs.current[index] = el; }}
            className={`bin-wrapper group relative bg-white transition-all duration-300 w-full ${selectedBin === index ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => setSelectedBin(index)}
          >
            {/* Info del bin - arriba del canvas */}
            <div className="bin-header flex items-center justify-between px-4 py-2 bg-slate-100 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-bold shadow">
                  {index + 1}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-800">Molde {index + 1}</span>
                  <span className="text-xs text-slate-500 font-mono">
                    {decimalToMixedFraction(bin.width)}" × {decimalToMixedFraction(bin.height)}"
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-600">
                  <span className="font-semibold">{bin.rectangles.length}</span> piezas
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  bin.efficiency_percent >= 90 ? 'bg-green-100 text-green-700' : 
                  bin.efficiency_percent >= 70 ? 'bg-yellow-100 text-yellow-700' : 
                  'bg-red-100 text-red-700'
                }`}>
                  {bin.efficiency_percent.toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Canvas */}
            <div className="w-full overflow-hidden">
              <canvas
                ref={(el) => { canvasRefs.current[index] = el; }}
                className="w-full h-auto block"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Summary footer - solo pantalla */}
      <div className="no-print mt-6 p-4 bg-gradient-to-r from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl mx-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-white">{data.bins.length}</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">Moldes</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-400">
              {(data.bins.reduce((acc, bin) => acc + bin.efficiency_percent, 0) / data.bins.length).toFixed(1)}%
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">Eficiencia</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-400">
              {data.bins.reduce((acc, bin) => acc + bin.rectangles.length, 0)}
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">Piezas</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">
              {decimalToMixedFraction(data.bins.reduce((acc, bin) => acc + (bin.width * bin.height), 0))}"
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">Área total</div>
          </div>
        </div>
      </div>

      <style>{`
        /* Pantalla */
        @media screen {
          .bin-wrapper {
            border-radius: 0.5rem;
            overflow: hidden;
          }
        }

        /* Impresión: solo el bin, centrado, sin página completa vacía */
        @media print {
          @page {
            size: auto;
            margin: 1cm;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          body {
            background: white !important;
          }

          /* Ocultar todo excepto los bins */
          .no-print,
          aside,
          nav,
          .sidebar,
          [class*="sidebar"],
          [class*="Sidebar"],
          header,
          footer {
            display: none !important;
          }

          /* Cada bin como unidad de impresión */
          .bin-wrapper {
            page-break-after: always;
            page-break-inside: avoid;
            width: 100% !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            background: white !important;
            border: none !important;
            border-radius: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          /* Eliminar page-break del último bin */
          .bin-wrapper:last-child {
            page-break-after: auto;
          }

          /* Header del bin en impresión */
          .bin-header {
            width: 100% !important;
            background: #f1f5f9 !important;
            border-bottom: 1px solid #cbd5e1 !important;
            margin-bottom: 10px !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Canvas a tamaño natural, centrado */
          canvas {
            width: auto !important;
            height: auto !important;
            max-width: 100% !important;
            max-height: calc(100vh - 100px) !important;
            border: 2px solid black !important;
            display: block !important;
            margin: 0 auto !important;
          }
        }
      `}</style>
    </div>
  );
}