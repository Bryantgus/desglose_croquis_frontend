import { useEffect, useState } from "react";
import type { ItemOrden, TIPO_PERFIL } from "../../types/ItemOrden";
import BtnDesglose from "./BtnDesglose";
import InputAdd from "./InputAdd";
import ItemDesglose from "./ItemDesglose";

type Props = {
  itemsPerPerfil: Record<string, ItemOrden[]>
  perfilesUsados: TIPO_PERFIL[]
  perfilSelected: TIPO_PERFIL | null
  handlePerfilSelected: (perfil: TIPO_PERFIL) => void
  setShowSetup: (v: boolean) => void
}

type Mode = "edit" | "ver"

export default function DesgloseContent({ perfilesUsados, handlePerfilSelected, perfilSelected, itemsPerPerfil, setShowSetup }: Props) {
  const [mode, setMode] = useState<Mode>('edit')

  const toggleMode = () => {
    setMode(prev => prev === 'edit' ? 'ver' : 'edit');
  };

  useEffect(() => {
    setMode(mode);
  }, [mode]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white mb-1 pb-5">Desglose de Perfiles y Cristales</h1>
        <button
          className="text-white p-2 font-semibold border-2 rounded-xl border-slate-600 hover:border-slate-500 text-[16px]  px-20 cursor-pointer"
          onClick={toggleMode}
        >
          {mode === 'edit' ? "Ver Desglose" : "Modificar Desglose"}
        </button>
      </div>
      <div className="flex items-center gap-3 mb-3 justify-between">
        <div className="flex items-center gap-3">
          <p className="font-semibold text-white text-center">Perfil actual:</p>
          <div className="text-white flex gap-3 items-center">
            {perfilesUsados.map((p) => (
              <BtnDesglose
                key={p}
                perfil={p}
                label={p.charAt(0).toUpperCase() + p.slice(1)}
                togglePerfil={handlePerfilSelected}
                isSelected={p === perfilSelected}
                width="w-40"
                height="h-10"
                cantidad={itemsPerPerfil[p].length}
              />
            ))}
          </div>
        </div>

        {mode === 'edit' &&
          <div className="flex items-center gap-4">
            <InputAdd perfilSelected={perfilSelected} data={itemsPerPerfil[perfilSelected!]} />
            <button
              className="text-white p-2 font-semibold border-2 rounded-xl border-slate-600 hover:border-slate-500 text-[12px] cursor-pointer"
              onClick={() => setShowSetup(true)}
            >
              Modificar Perfiles
            </button>
          </div>
        }
      </div>

      <div
        className="grid grid-cols-4 sl:grid-cols-6 sl:h-185 h-120 p-3 border-2 border-slate-700 rounded-xl gap-x-10 items-start justify-center gap-y-5 mt-5 overflow-y-auto"
        style={{ animation: "slideIn 0.7s cubic-bezier(0.4, 0, 0.2, 1)" }}
      >

        {perfilSelected && itemsPerPerfil[perfilSelected].map((item: ItemOrden) => (
          <ItemDesglose
            key={item.id}
            itemData={item}
            mode={mode} />
        ))}

      </div>
    </div>
  )
}
