import { useEffect, useState } from "react";
import SetupDesglose from "../components/Desglose/SetupDesglose";
import ItemDesglose from "../components/Desglose/ItemDesglose";
import BtnDesglose from "../components/Desglose/BtnDesglose";
import type { PerfilType } from "../types/Desglose";

export default function Desglose() {

  const [showSetup, setShowSetup] = useState(true);
  const [perfiles, setPerfiles] = useState<PerfilType[]>([]);
  const [perfilSelected, setPerfilSelected] = useState<string>(perfiles[0])

  const handleSave = (perfiles: PerfilType[]) => {
    setPerfiles(perfiles);
    setShowSetup(false);
  };

  const handlePerfilSelected = (perfil: PerfilType) => {
    setPerfilSelected(perfil)
  }

  useEffect(() => {
    setPerfilSelected(perfiles[0])
  }, [perfiles])

  return (
    <div>
      {showSetup && (
        <SetupDesglose
        perfilesSelected={perfiles}
          onSave={handleSave}
        />
      )}
      <div className="flex items-center gap-3 mb-3 justify-between">
        <div className="flex items-center gap-3">
          <p className="font-semibold text-white text-center">Cambiar Perfil:</p>
          <div className="text-white flex gap-3 items-center ">
            {perfiles.map((p: PerfilType) => {
              return (
                <BtnDesglose
                  key={p}
                  perfil={p}
                  label={p.slice(0, 1).toUpperCase() + p.slice(1,)}
                  togglePerfil={handlePerfilSelected}
                  isSelected={p === perfilSelected}
                  width="w-50"
                  height="h-10"
                  cantidad={5} />
              )
            })}

          </div>
        </div>
        <button className="text-white p-2  font-semibold border-2 rounded-xl border-slate-600 hover:border-slate-500 text-[12px] cursor-pointer"
        onClick={() => {setShowSetup(true)}}>Modificar. Perfiles</button>
      </div>

      <div className="grid grid-cols-4 sl:grid-cols-6 sl:h-185 h-115 p-3 border-2 border-slate-700 rounded-xl  gap-x-10 items-start justify-center gap-y-5 mt-5 overflow-y-auto"
        style={{
          animation: 'slideIn 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
        <ItemDesglose />
      </div>
    </div>

  )
}
