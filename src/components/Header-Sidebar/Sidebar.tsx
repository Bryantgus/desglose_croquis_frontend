import { useEffect, useState } from "react";
import Ventanasvg from "../../assets/Ventanasvg";
import { useLocation, useNavigate } from 'react-router-dom';
import Item from "./Item";
import { checkServerActive } from "../../services/checkServerActiveService";
import SpinLoading from "../SpinLoading";
import { useQuery } from '@tanstack/react-query';

interface ItemInfo {
  title: string;
  description: string;
}

const ITEM_INFO: ItemInfo[] = [
  { title: 'Ordenes', description: "Gestión de trabajos" },
  { title: 'Desglose', description: "Calculos de Perfiles y Cristales" },
  { title: 'Croquis', description: "Empaquetado eficiente de cristales" },
]

export default function Sidebar() {
  const { isLoading, isError, error } = useQuery({
    queryKey: ['serverStatus'],
    queryFn: checkServerActive.serverActive
  });

  const location = useLocation();
  const route = location.pathname.split('/')[1]
  const [moduleSelected, setModuleSelected] = useState(route)
  const navigate = useNavigate()

  useEffect(() => {
    setModuleSelected(route)
  }, [route])

  const setActive = (module: string) => {
    setModuleSelected(module)
    navigate('/' + module.toLocaleLowerCase())
  }

  return (
    <aside className="w-[15%] min-w-60 h-screen fixed left-0 top-0 z-50 flex flex-col border-r border-slate-700/50 bg-[#192436] text-white">
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Ventanasvg />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Brymer S.R.L</h1>
            <p className="text-xs text-slate-400">Sistema de Gestión</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Módulos</p>

        {ITEM_INFO.map((it: ItemInfo, index: number) => {
          return (
            <Item
              key={index}
              title={it.title}
              description={it.description}
              icon={it.title.toLowerCase() as "ordenes" | "desglose" | "croquis"}
              isActive={moduleSelected === it.title.toLowerCase()}
              setActive={setActive} />
          )
        })}
      </nav>

      <div className="p-4 border-t border-slate-700/50">
        <div className="glass-panel rounded-xl p-4 bg-linear-to-br from-slate-800/50 to-slate-900/50">
          <div className="flex items-center gap-3 mb-3 justify-center">
            {isLoading ?
              <SpinLoading />
              :
              isError ?
                <p className="text-red-500 text-sm">Error: {(error as Error).message}</p> :
                <>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 status-pulse"></div>
                  <span className="text-xs font-medium text-emerald-400">Servidor en linea</span>
                </>
            }
          </div>
        </div>
      </div>
    </aside>
  )
}

