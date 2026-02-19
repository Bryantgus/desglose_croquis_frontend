import Item from "./item";

export default function Sidebar() {
  return (
    <aside className="w-[15%] min-w-60 h-screen fixed left-0 top-0 z-50 flex flex-col border-r border-slate-700/50 bg-[#192436] text-white">
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" stroke-linejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Brymer S.R.L</h1>
            <p className="text-xs text-slate-400">Sistema de Gestión</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Módulos</p>

        <Item title={"Ordenes"} description={"Gestión de trabajos"} icon={"orden"} />
        <Item title={"Desglose"} description={"Calculos de Perfiles y Cristales"} icon={"desglose"} />
        <Item title={"Croquis"} description={"Empaquetado eficiente de cristales"} icon={"croquis"} />

      </nav>

      <div className="p-4 border-t border-slate-700/50">
        <div className="glass-panel rounded-xl p-4 bg-linear-to-br from-slate-800/50 to-slate-900/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 status-pulse"></div>
            <span className="text-xs font-medium text-emerald-400">Servidor en linea</span>
          </div>
          {/* <div className="w-full bg-slate-700 rounded-full h-1.5 mb-2">
            <div className="bg-linear-to-r from-blue-500 to-purple-500 h-1.5 rounded-full" style={{ width: "78%" }}></div>
          </div> */}
          {/* <p className="text-xs text-slate-500">Almacenamiento: 78% usado</p> */}
        </div>
      </div>
    </aside>
  )
}
