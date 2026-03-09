import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useIdStore } from "../../globalState/ordenId";
import { itemOrdenService } from "../../services/itemOrdenService";
import type { ItemOrden } from "../../types/ItemOrden";

// Función para convertir fracciones a decimal
const parseDimension = (dim: string): number => {
  if (!dim || dim === "0") return 0;
  const parts = dim.toString().split(' ');
  let total = 0;
  parts.forEach(part => {
    if (part.includes('/')) {
      const [num, den] = part.split('/');
      total += parseInt(num) / parseInt(den);
    } else {
      total += parseInt(part);
    }
  });
  return total;
};

// Agrupar items por perfil y color
const groupByPerfilAndColor = (items: ItemOrden[]) => {
  return items.reduce((acc, item) => {
    const key = `${item.tipoPerfil}-${item.colorPerfil}`;
    if (!acc[key]) {
      acc[key] = {
        profile: item.tipoPerfil,
        color: item.colorPerfil,
        items: []
      };
    }
    acc[key].items.push(item);
    return acc;
  }, {} as Record<string, { profile: string; color: string; items: ItemOrden[] }>);
};

export default function Resumen() {
  const ordenId = useIdStore((s) => s.ordenId);

  const { data: itemsPerPerfil, isLoading } = useQuery<Record<string, ItemOrden[]>>({
    queryKey: ["items_orden", ordenId],
    queryFn: () => itemOrdenService.getAll(Number(ordenId)),
  });

  const stats = useMemo(() => {
    if (!itemsPerPerfil) return null;

    // Aplanar todos los items y agrupar por perfil + color
    const allItems = Object.values(itemsPerPerfil).flat();
    const grouped = groupByPerfilAndColor(allItems);
    
    return Object.values(grouped).map((group) => {
      const items = group.items;
      
      const validItems = items.filter(item => 
        parseDimension(item.ancho) > 0 && parseDimension(item.alto) > 0
      );
      
      const totalArea = validItems.reduce((acc, item) => {
        const width = parseDimension(item.ancho);
        const height = parseDimension(item.alto);
        return acc + (width * height);
      }, 0);

      const viasCount = items.reduce((acc, item) => {
        acc[item.vias] = (acc[item.vias] || 0) + 1;
        return acc;
      }, {} as Record<number, number>);

      const cristalTypes = items.reduce((acc, item) => {
        acc[item.tipoCristal] = (acc[item.tipoCristal] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const etiquetasInfo = items.map(item => ({
        id: item.id,
        etiqueta: item.etiqueta,
        ancho: item.ancho,
        alto: item.alto,
        vias: item.vias,
        cristal: item.tipoCristal,
        hasMeasures: parseDimension(item.ancho) > 0
      }));

      return {
        profile: group.profile,
        color: group.color,
        total: items.length,
        validDimensions: validItems.length,
        totalArea: totalArea.toFixed(2),
        viasCount,
        cristalTypes,
        etiquetasInfo
      };
    }).sort((a, b) => a.profile.localeCompare(b.profile));
  }, [itemsPerPerfil]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-143">
        <div className="text-white text-2xl font-semibold">Cargando resumen...</div>
      </div>
    );
  }

  if (!stats || stats.length === 0) {
    return (
      <div className="flex items-center justify-center h-143">
        <div className="text-white font-semibold text-4xl text-center">
          No hay datos para mostrar
        </div>
      </div>
    );
  }

  return (
    <div 
      className="h-143 p-6 border-2 rounded-xl border-slate-700/50 glass-panel overflow-y-auto glass-scrollbar mt-5"
      style={{
        animation: "slideIn 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(71, 85, 105, 0.8) rgba(15, 23, 42, 0.5)'
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {stats.map((stat) => (
          <div 
            key={`${stat.profile}-${stat.color}`}
            className="bg-slate-800/40 backdrop-blur-md rounded-xl border border-slate-600/50 p-6 hover:border-slate-500/50 transition-all duration-300"
          >
            {/* Header del perfil + color */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-600/50">
              <div className="flex items-center gap-3">
                <span className="bg-slate-700 text-white px-4 py-1.5 rounded-lg font-bold text-lg uppercase tracking-wider">
                  {stat.profile}
                </span>
                <span 
                  className="px-3 py-1.5 rounded-lg text-sm font-semibold border border-slate-600/50"
                  style={{
                    backgroundColor: stat.color.toLowerCase() === 'blanco' ? 'rgba(255, 255, 255, 0.15)' : 
                                   stat.color.toLowerCase() === 'negro' ? 'rgba(0, 0, 0, 0.4)' :
                                   stat.color.toLowerCase() === 'bronze' || stat.color.toLowerCase() === 'marrón' ? 'rgba(139, 69, 19, 0.3)' :
                                   stat.color.toLowerCase() === 'gris' ? 'rgba(128, 128, 128, 0.3)' :
                                   'rgba(102, 126, 234, 0.2)',
                    color: stat.color.toLowerCase() === 'blanco' ? '#e2e8f0' : '#fff'
                  }}
                >
                  {stat.color}
                </span>
              </div>
              <span className="bg-slate-700/50 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {stat.total} unidades
              </span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-900/40 rounded-lg p-4 text-center border border-slate-700/50">
                <div className="text-2xl font-bold text-white mb-1">{stat.total}</div>
                <div className="text-xs text-slate-400 uppercase tracking-wide">Total Piezas</div>
              </div>
              <div className="bg-slate-900/40 rounded-lg p-4 text-center border border-slate-700/50">
                <div className="text-2xl font-bold text-emerald-400 mb-1">{stat.validDimensions}</div>
                <div className="text-xs text-slate-400 uppercase tracking-wide">Con Medidas</div>
              </div>
              <div className="bg-slate-900/40 rounded-lg p-4 text-center border border-slate-700/50">
                <div className="text-2xl font-bold text-blue-400 mb-1">{stat.totalArea}</div>
                <div className="text-xs text-slate-400 uppercase tracking-wide">Área (pulg²)</div>
              </div>
            </div>

            {/* Distribución por Vías */}
            <div className="mb-5">
              <h4 className="text-slate-300 text-sm font-semibold mb-3 uppercase tracking-wide">
                Distribución por Vías
              </h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(stat.viasCount).map(([vias, count]) => (
                  <span 
                    key={vias}
                    className="bg-slate-700/50 text-white px-3 py-1.5 rounded-md text-sm font-medium border border-slate-600/30"
                  >
                    {vias} vías: <span className="text-emerald-400 font-bold">{count}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Tipos de Cristal - AHORA ESPECÍFICO POR COLOR */}
            <div className="mb-5">
              <h4 className="text-slate-300 text-sm font-semibold mb-3 uppercase tracking-wide">
                Tipos de Cristal
              </h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(stat.cristalTypes).map(([type, count]) => (
                  <span 
                    key={type}
                    className="bg-slate-700/30 text-slate-200 px-3 py-1.5 rounded-md text-sm font-medium border border-slate-600/30"
                  >
                    {type}: <span className="text-blue-400 font-bold">{count}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Lista de Etiquetas con detalle de cristal */}
            <div>
              <h4 className="text-slate-300 text-sm font-semibold mb-3 uppercase tracking-wide">
                Etiquetas ({stat.etiquetasInfo.length})
              </h4>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto glass-scrollbar pr-1">
                {stat.etiquetasInfo.map((item) => (
                  <div 
                    key={item.id}
                    className={`p-2 rounded-lg border text-left ${
                      item.hasMeasures 
                        ? 'bg-slate-800/50 border-slate-700/50' 
                        : 'bg-red-900/20 border-red-700/30'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-white font-bold text-sm">#{item.etiqueta}</span>
                      <span className="text-[10px] text-slate-500 bg-slate-900/50 px-1 rounded">
                        {item.vias}v
                      </span>
                    </div>
                    <div className={`text-xs mt-1 ${item.hasMeasures ? 'text-slate-300' : 'text-red-400'}`}>
                      {item.hasMeasures ? `${item.ancho}"×${item.alto}"` : 'Sin medidas'}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5 truncate" title={item.cristal}>
                      {item.cristal}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}