import { useMemo, useState } from "react";
import CrearEditarOrden from "../components/Ordenes/CrearEditarOrden";
import StatusItem from "../components/Ordenes/StatusItem";
import Plussvg from "../assets/Plussvg";
import OrdenTable from "../components/Ordenes/OrdenTable";
import type { Orden } from '../types/Orden'
import { useOrdenes } from "../hooks/useOrdenes";
import SpinLoading from "../components/SpinLoading";

export default function Ordenes() {

  const { data, isLoading, isError, error } = useOrdenes()
  const [mode, setMode] = useState('crear');

  const [showModal, setShowModal] = useState(false)
  
  const stats = useMemo(() => {
    if (!data) return { pendientes: 0, enProceso: 0, completadas: 0, total: 0 };

    return {
      pendientes: data.filter((item: Orden) => item.estado === 'Pendiente').length,
      enProceso: data.filter((item: Orden) => item.estado === 'En Proceso').length,
      completadas: data.filter((item: Orden) => item.estado === 'Completado').length,
      total: data.length
    };
  }, [data]);

    const toggleMode = (mode: string) => {
    setMode(mode)
    setShowModal(true)
  }

  return (
    <div id="module-ordenes" className="module-content space-y-6"
      style={{
        animation: 'slideIn 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>

      {showModal &&
        <CrearEditarOrden
          mode={mode as 'crear' | 'editar'}
          onCancel={() => setShowModal(false)}
        />
      }
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatusItem status="wait" cantidad={stats.pendientes} />
        <StatusItem status="process" cantidad={stats.enProceso} />
        <StatusItem status="complete" cantidad={stats.completadas} />
        {/* <StatusItem status="all" cantidad={stats.total} /> */}
      </div>

      <div className="glass-panel rounded-xl border border-slate-700/50 overflow-hidden bg-[#192436] text-white">
        <div className="p-6 border-b border-slate-700/50 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">Órdenes Recientes</h3>

          <button onClick={() => toggleMode('crear')} className="bg-[#1a284d] hover:bg-[#0f172b] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer">
            <Plussvg />
            Nueva Orden
          </button>
        </div>

        <div className="overflow-x-auto flex items-center justify-center p-5">

          {isError ? <p className="text-red-500 text-2xl">Error: {(error as Error).message}</p> :
            isLoading ?
              <SpinLoading /> :
              <OrdenTable toggleMode={toggleMode} />
          }
        </div>
      </div>
    </div>

  )
}
