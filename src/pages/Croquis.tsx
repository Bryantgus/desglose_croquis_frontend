import { useIdStore } from "../globalState/ordenId"
import NoOrdenSelected from "../components/NoOrdenSelected"
import { useMemo } from "react";
import { useItemOrdenes } from "../hooks/useItemOrden";
import SpinLoading from "../components/SpinLoading";
import type { ItemOrden } from "../types/ItemOrden";
import { calcularDesgloseVentanas } from "../utils/calculoVentana";

type MedidasDesglose = {
  rc: string,
  lateral: string,
  jamba: string,
  ruleta: string,
  can: string,
  cal: string
}

type DesgloseWithMedida = {
  data: ItemOrden
  medidas: MedidasDesglose
}

export default function Croquis() {
  const ordenId = useIdStore(s => s.ordenId);
  const { data: itemsOrden, isLoading } = useItemOrdenes(Number(ordenId));

  const sortedData = useMemo(() => {
    if (!itemsOrden) return null;
    return [...itemsOrden].sort((a, b) => a.id - b.id);
  }, [itemsOrden]);

  const itemsWithMedidas: DesgloseWithMedida[] | null = useMemo(() => {
    if (!sortedData) return null;
    
    return sortedData.map(item => {
      if (item.tipoPerfil === 'p40') {
        return {
          data: item,
          medidas: {
            rc: '0',
            lateral: '0',
            jamba: '0',
            ruleta: '0',
            can: '0',
            cal: '0'
          }
        };
      }

      const medidas = calcularDesgloseVentanas(
        item.ancho,
        item.alto,
        item.vias,
        item.tipoPerfil as "p65" | "tradicional" | "p92"
      );

      return {
        data: item,
        medidas
      };
    });
  }, [sortedData]);

  const itemsPerPerfilAndColor = useMemo(() => {
    if (!itemsWithMedidas) return null;
    
    const filterBy = (perfil: string, color: string) => 
      itemsWithMedidas.filter(i => 
        i.data.tipoPerfil === perfil && i.data.colorPerfil === color
      );

    return {
      p65: {
        blanco: filterBy("p65", 'blanco'),
        negro: filterBy("p65", 'negro'),
        caoba: filterBy("p65", 'caoba'),
        roble: filterBy("p65", 'roble'),
      },
      tradicional: {
        blanco: filterBy("tradicional", 'blanco'),
        negro: filterBy("tradicional", 'negro'),
        caoba: filterBy("tradicional", 'caoba'),
        roble: filterBy("tradicional", 'roble'),
      },
      p92: {
        blanco: filterBy("p92", 'blanco'),
        negro: filterBy("p92", 'negro'),
        caoba: filterBy("p92", 'caoba'),
        roble: filterBy("p92", 'roble'),
      },
      p40: itemsWithMedidas.filter(i => i.data.tipoPerfil === "p40"),
    };
  }, [itemsWithMedidas]);

  const itemsPerCristalesColor = useMemo(() => {
    if (!itemsWithMedidas) return null;
    
    const filterByCristal = (cristal: string) => 
      itemsWithMedidas.filter(i => i.data.tipoCristal === cristal);

    return {
      'nl': filterByCristal('natural liso'),
      'nm': filterByCristal('natural martillado'),
      'bl': filterByCristal('bronze liso'),
      'bm': filterByCristal('bronze martillado'),
      'al': filterByCristal('azul liso'),
      'am': filterByCristal('azul martillado')
    };
  }, [itemsWithMedidas]);

  console.log(JSON.stringify(itemsPerPerfilAndColor, null, 2));
  console.log(JSON.stringify(itemsPerCristalesColor, null, 2));

  if (ordenId === 0) return <NoOrdenSelected />;
  if (isLoading || !itemsWithMedidas) return <SpinLoading />;

  return (
    <div style={{ animation: 'slideIn 0.7s cubic-bezier(0.4, 0, 0.2, 1)' }}>
      <h1 className="text-3xl font-bold text-white mb-1 pb-5">Croquis de Cristales</h1>
      <h2 className="text-xl font-bold text-white mb-1 pb-5">Resumen de Materiales</h2>

      <div className="flex justify-evenly">
        {itemsPerPerfilAndColor && Object.entries(itemsPerPerfilAndColor).map(([perfil, colores]) => (
          <div key={perfil} className="mb-4">
            <h3 className="text-lg font-semibold text-white capitalize">{perfil}</h3>
            {Object.entries(colores).map(([color, items]) => (
              items.length > 0 && (
                <div key={`${perfil}-${color}`} className="ml-4">
                  <p className="text-slate-300">{color}: {items.length} items</p>
                </div>
              )
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}