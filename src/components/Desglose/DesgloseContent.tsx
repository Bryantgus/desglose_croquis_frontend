import type { ItemOrden, TIPO_PERFIL } from "../../types/ItemOrden";
import BtnDesglose from "./BtnDesglose";
import InputAdd from "./InputAdd";
import ItemDesglose from "./ItemDesglose";

type Props = {
  itemsPerPerfil: Record<string, ItemOrden[]>
  perfilesUsados: TIPO_PERFIL[]
  perfilSelected: TIPO_PERFIL
  handlePerfilSelected: (perfil: TIPO_PERFIL) => void
  setShowSetup: (v: boolean) => void
}

export default function DesgloseContent({ perfilesUsados, handlePerfilSelected, perfilSelected, itemsPerPerfil, setShowSetup }: Props) {
  return (
    <div>
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

        <div className="flex items-center gap-4">
          <InputAdd onAdd={() => console.log("Agregar...")} />
          <button
            className="text-white p-2 font-semibold border-2 rounded-xl border-slate-600 hover:border-slate-500 text-[12px] cursor-pointer"
            onClick={() => setShowSetup(true)}
          >
            Modificar Perfiles
          </button>
        </div>
      </div>

      <div
        className="grid grid-cols-4 sl:grid-cols-6 sl:h-185 h-140 p-3 border-2 border-slate-700 rounded-xl gap-x-10 items-start justify-center gap-y-5 mt-5 overflow-y-auto"
        style={{ animation: "slideIn 0.7s cubic-bezier(0.4, 0, 0.2, 1)" }}
      >

        {itemsPerPerfil[perfilSelected].map((item: ItemOrden, index: number) => (
          <ItemDesglose 
          key={index + 1}
          itemData={item}
           mode={"edit"} />
        ))}

      </div>
    </div>
  )
}
