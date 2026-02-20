import StatusItem from "../components/Ordenes/StatusItem";

export default function Ordenes() {
  return (
    <div id="module-ordenes" className="module-content space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatusItem status="wait"/>
        <StatusItem status="process"/>
        <StatusItem status="complete"/>
      </div>
      
      <div className="glass-panel rounded-xl border border-slate-700/50 overflow-hidden bg-[#192436] text-white">
        <div className="p-6 border-b border-slate-700/50 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">Órdenes Recientes</h3>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Nueva Orden
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase">
              <tr>
                <th className="px-6 py-4 font-medium">ID Orden</th>
                <th className="px-6 py-4 font-medium">Cliente</th>
                <th className="px-6 py-4 font-medium">Proyecto</th>
                <th className="px-6 py-4 font-medium">Fecha</th>
                <th className="px-6 py-4 font-medium">Estado</th>
                <th className="px-6 py-4 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 font-mono text-blue-400">#ORD-2024-001</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">AC</div>
                    <span className="text-white font-medium">Acme Corp</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-300">Instalación Eléctrica</td>
                <td className="px-6 py-4 text-slate-400">18 Feb 2024</td>
                <td className="px-6 py-4"><span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-medium">En Proceso</span></td>
                <td className="px-6 py-4">
                  <button className="text-slate-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                    </svg>
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 font-mono text-blue-400">#ORD-2024-002</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">TC</div>
                    <span className="text-white font-medium">Tech Solutions</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-300">Mantenimiento HVAC</td>
                <td className="px-6 py-4 text-slate-400">17 Feb 2024</td>
                <td className="px-6 py-4"><span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-medium">Completada</span></td>
                <td className="px-6 py-4">
                  <button className="text-slate-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                    </svg>
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 font-mono text-blue-400">#ORD-2024-003</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">GL</div>
                    <span className="text-white font-medium">Global Industries</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-300">Renovación Oficinas</td>
                <td className="px-6 py-4 text-slate-400">16 Feb 2024</td>
                <td className="px-6 py-4"><span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-medium">Pendiente</span></td>
                <td className="px-6 py-4">
                  <button className="text-slate-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  )
}
