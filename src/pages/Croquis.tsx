import { useIdStore } from "../globalState/ordenId"
import NoOrdenSelected from "../components/NoOrdenSelected"
import { useItemOrdenes } from "../hooks/useItemOrden";
import SpinLoading from "../components/SpinLoading";
import { calcularDesgloseVentanas } from "../utils/calculoVentana";
import { useMemo, useState } from "react";
import { useCalculateCroquis } from "../hooks/useCroquis";
import CroquisVisualizer from "./CroquisVisualizer";

// ============================================
// TIPOS
// ============================================

export type Rectangle = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Bin = {
  bin_id?: number;
  width: number;
  height: number;
  efficiency_percent: number;
  rectangles: Rectangle[];
  used_area?: number;
  total_area?: number;
};

// Tipo para un algoritmo específico (array de bins)
export type AlgorithmResult = Bin[];

// Tipo para todos los resultados de algoritmos
export type AlgorithmsResults = Record<string, AlgorithmResult>;

// Tipo para la respuesta completa de la API
export type CroquisApiResponse = {
  results: AlgorithmsResults;
  best_algorithm: string;
  summary: Record<string, {
    total_bins: number;
    avg_efficiency: number;
    total_rects_packed: number;
  }>;
};

// Tipo simplificado para el visualizador (usa el mejor algoritmo)
export type PackingResult = {
  bins: Bin[];
};

export type CroquisRequest = {
  bin_width: number;
  bin_height: number;
  rectangles_data: Array<{
    id: string;
    width: number;
    height: number;
  }>;
};

type CristalMedida = {
  etiqueta: string;
  ancho: string;
  alto: string;
};

type CristalesPorTipo = {
  'natural liso': CristalMedida[];
  'natural martillado': CristalMedida[];
  'bronze liso': CristalMedida[];
  'bronze martillado': CristalMedida[];
  'azul liso': CristalMedida[];
  'azul martillado': CristalMedida[];
};

// Tipo para el estado de resultados acumulados
type PackingResultsState = Record<string, CroquisApiResponse>;

// ============================================
// COMPONENTE
// ============================================

export default function Croquis() {
  const ordenId = useIdStore(s => s.ordenId);
  const { data: itemsOrden, isLoading } = useItemOrdenes(Number(ordenId));
  const { mutateAsync, isPending } = useCalculateCroquis();

  const [packingResults, setPackingResults] = useState<PackingResultsState>({});
  const [loadingTipo, setLoadingTipo] = useState<string | null>(null);
  const [activeVisualizer, setActiveVisualizer] = useState<string | null>(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(null);

  const cristalesPorTipo: CristalesPorTipo | null = useMemo(() => {
    if (!itemsOrden) return null;

    const itemsConMedidaCristal = itemsOrden.flatMap(item => {
      const { can, cal } = calcularDesgloseVentanas(
        item.ancho,
        item.alto,
        item.vias,
        item.tipoPerfil as "p65" | "tradicional" | "p92"
      );

      return Array.from({ length: item.vias }, () => ({
        tipoCristal: item.tipoCristal,
        etiqueta: item.etiqueta,
        anchoCristal: can,
        altoCristal: cal
      }));
    });

    const filterByCristal = (cristal: string): CristalMedida[] => {
      return itemsConMedidaCristal
        .filter(i => i.tipoCristal === cristal)
        .map(i => ({
          etiqueta: i.etiqueta,
          ancho: i.anchoCristal,
          alto: i.altoCristal
        }));
    };

    return {
      'natural liso': filterByCristal('natural liso'),
      'natural martillado': filterByCristal('natural martillado'),
      'bronze liso': filterByCristal('bronze liso'),
      'bronze martillado': filterByCristal('bronze martillado'),
      'azul liso': filterByCristal('azul liso'),
      'azul martillado': filterByCristal('azul martillado')
    };
  }, [itemsOrden]);

  const handleCalcular = async (tipo: string, cristales: CristalMedida[]) => {
    setLoadingTipo(tipo);
    try {
      const response = await mutateAsync({
        bin_width: 130,
        bin_height: 84,
        rectangles_data: cristales.map((c, idx) => ({
          id: `${c.etiqueta}-${idx}`,
          width: parseFloat(c.ancho),
          height: parseFloat(c.alto)
        }))
      });

      const result = response as CroquisApiResponse;

      setPackingResults((prev: PackingResultsState) => ({ 
        ...prev, 
        [tipo]: result 
      }));
      
      setSelectedAlgorithm(result.best_algorithm);
      setActiveVisualizer(tipo);
    } catch (error) {
      console.error('Error calculando croquis:', error);
    } finally {
      setLoadingTipo(null);
    }
  };

  const handleCloseVisualizer = () => {
    setActiveVisualizer(null);
    setSelectedAlgorithm(null);
  };

  // Obtener los datos formateados para el visualizador
  const getVisualizerData = (): PackingResult | null => {
    if (!activeVisualizer || !packingResults[activeVisualizer]) return null;
    
    const apiResponse = packingResults[activeVisualizer];
    const algorithmToUse = selectedAlgorithm || apiResponse.best_algorithm;
    const bins = apiResponse.results[algorithmToUse];
    
    if (!bins) return null;
    
    return { bins };
  };

  // Obtener lista de algoritmos disponibles
  const getAvailableAlgorithms = (): string[] => {
    if (!activeVisualizer || !packingResults[activeVisualizer]) return [];
    return Object.keys(packingResults[activeVisualizer].results);
  };

  if (isLoading) return <SpinLoading />;
  if (ordenId === 0) return <NoOrdenSelected />;

  return (
    <div className="min-h-screen p-6 animate-[slideIn_0.7s_cubic-bezier(0.4,0,0.2,1)]">
      {/* Background gradient effects for glassmorphism */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2 pb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Croquis de Cristales
        </h1>
        <h2 className="text-xl font-medium text-slate-300 mb-8 pb-4 border-b border-slate-700/50">
          Resumen de Materiales
        </h2>

        {!activeVisualizer ? (
          <div className="flex flex-wrap gap-6">
            {cristalesPorTipo && Object.entries(cristalesPorTipo).map(([tipo, cristales]) => {
              if (cristales.length === 0) return null;
              const isLoadingThis = loadingTipo === tipo;
              const hasResult = packingResults?.[tipo];

              return (
                <div 
                  key={tipo} 
                  className="group relative w-80 bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-slate-600/50 overflow-hidden"
                >
                  {/* Glassmorphism shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold text-white mb-3 capitalize border-b border-slate-600/50 pb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
                      {tipo}
                    </h3>
                    
                    <div className="mb-4 text-sm text-slate-400 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      Total: <span className="text-white font-semibold">{cristales.length}</span> cristales
                    </div>

                    <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar mb-4">
                      {cristales.map((cristal, idx) => (
                        <div 
                          key={idx} 
                          className="text-sm bg-slate-800/50 backdrop-blur-sm border border-slate-700/30 p-3 rounded-xl flex justify-between items-center hover:bg-slate-800/70 transition-colors"
                        >
                          <span className="font-semibold text-blue-300">{cristal.etiqueta}</span>
                          <span className="text-xs text-slate-400 font-mono bg-slate-900/50 px-2 py-1 rounded">
                            {cristal.ancho} × {cristal.alto}
                          </span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => handleCalcular(tipo, cristales)}
                      disabled={isLoadingThis || isPending}
                      className="w-full relative overflow-hidden group/btn bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:from-slate-700 disabled:to-slate-600 disabled:cursor-not-allowed text-white text-sm font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:shadow-none"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isLoadingThis ? (
                          <>
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Calculando...
                          </>
                        ) : hasResult ? (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Ver Croquis
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            Calcular Croquis
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="animate-[fadeIn_0.5s_ease-out]">
            {/* Selector de algoritmos */}
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <span className="text-slate-400 text-sm">Algoritmo:</span>
              <div className="flex flex-wrap gap-2">
                {getAvailableAlgorithms().map((algo) => (
                  <button
                    key={algo}
                    onClick={() => setSelectedAlgorithm(algo)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      selectedAlgorithm === algo
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                        : 'bg-slate-800/30 text-slate-400 border border-slate-700/50 hover:bg-slate-700/50 hover:text-white'
                    }`}
                  >
                    {algo}
                    {packingResults[activeVisualizer]?.best_algorithm === algo && (
                      <span className="ml-1 text-[10px] bg-green-500/20 text-green-400 px-1 rounded">★</span>
                    )}
                  </button>
                ))}
              </div>
              <button
                onClick={handleCloseVisualizer}
                className="ml-auto flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600/80 to-red-500/80 hover:from-red-500 hover:to-red-400 backdrop-blur-sm border border-red-400/30 rounded-lg text-white text-sm transition-all duration-200 hover:scale-105"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Volver
              </button>
            </div>

            {/* Info del algoritmo seleccionado */}
            {selectedAlgorithm && packingResults[activeVisualizer] && (
              <div className="mb-6 p-4 bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white capitalize flex items-center gap-2">
                      {activeVisualizer}
                      <span className="text-sm font-normal text-slate-400">→ {selectedAlgorithm}</span>
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">
                      {packingResults[activeVisualizer].summary[selectedAlgorithm]?.total_bins || 1} molde(s) • 
                      Eficiencia promedio: {packingResults[activeVisualizer].summary[selectedAlgorithm]?.avg_efficiency || 0}%
                    </p>
                  </div>
                  {packingResults[activeVisualizer].best_algorithm === selectedAlgorithm && (
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-xs font-semibold">
                      Mejor algoritmo
                    </span>
                  )}
                </div>
              </div>
            )}

            <CroquisVisualizer 
              data={getVisualizerData()}
              tipoCristal={`${activeVisualizer} (${selectedAlgorithm || 'mejor'})`}
              onClose={handleCloseVisualizer}
            />
          </div>
        )}
      </div>
    </div>
  );
}