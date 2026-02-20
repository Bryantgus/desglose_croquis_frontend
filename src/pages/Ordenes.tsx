import { useMemo, useState } from "react";
import CrearEditarOrden from "../components/Ordenes/CrearEditarOrden";
import StatusItem from "../components/Ordenes/StatusItem";
import Plussvg from "../assets/Plussvg";
import OrdenTable from "../components/Ordenes/OrdenTable";
import { mockOrdenes } from "../utils/mockData";

export default function Ordenes() {
  const [showModal, setShowModal] = useState(false)

  const stats = useMemo(() => {
    return {
      pendientes: mockOrdenes.filter(item => item.estado === 'Pendiente').length,
      enProceso: mockOrdenes.filter(item => item.estado === 'En Proceso').length,
      completadas: mockOrdenes.filter(item => item.estado === 'Completado').length,
      total: mockOrdenes.length
    };
  }, [])


  const setTrueModal = () => {
    setShowModal(true)
  }
  return (
    <div id="module-ordenes" className="module-content space-y-6"
      style={{
        animation: 'slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>

      {showModal &&
        <CrearEditarOrden
          mode="crear"
          onSave={(data) => {
            console.log('Crear:', data);
          }}
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

          <button onClick={setTrueModal} className="bg-[#1a284d] hover:bg-[#0f172b] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer">
            <Plussvg />
            Nueva Orden
          </button>
        </div>

        <div className="overflow-x-auto">
          <OrdenTable />
        </div>
      </div>
    </div>

  )
}
