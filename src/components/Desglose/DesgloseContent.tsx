import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { ItemOrden, TIPO_PERFIL } from "../../types/ItemOrden";
import BtnDesglose from "./BtnDesglose";
import InputAdd from "./InputAdd";
import ItemDesglose from "./ItemDesglose";
import { itemOrdenService } from "../../services/itemOrdenService";
import { useIdStore } from "../../globalState/ordenId";
import Resumen from "./Resumen";

type Props = {
  perfilesConfigurados: TIPO_PERFIL[]
  perfilSelected: TIPO_PERFIL | null
  handlePerfilSelected: (perfil: TIPO_PERFIL) => void
  setShowSetup: (v: boolean) => void
}

type Mode = "edit" | "ver"

export default function DesgloseContent({ handlePerfilSelected, perfilesConfigurados, perfilSelected, setShowSetup }: Props) {
  const ordenId = useIdStore((s) => s.ordenId);
  const { data: itemsPerPerfil } = useQuery<Record<string, ItemOrden[]>>({
    queryKey: ["items_orden", ordenId],
    queryFn: () => itemOrdenService.getAll(Number(ordenId)),
    enabled: false,
  });
  const [mode, setMode] = useState<Mode>('edit');
  const [showResumen, setShowResumen] = useState<boolean>(false);

  const toggleMode = () => {
    setShowResumen(false);
    setMode(prev => prev === 'edit' ? 'ver' : 'edit');
  };

  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white mb-1 pb-5">Desglose de Perfiles y Cristales</h1>
        <div className="flex gap-3">
          <button
            className="text-white p-2 font-semibold border-2 rounded-xl border-slate-600 hover:border-slate-500 text-[16px] px-20 cursor-pointer"
            onClick={() => setShowResumen(true)}
          >
            Ver Resumen
          </button>
          <button
            className="text-white p-2 font-semibold border-2 rounded-xl border-slate-600 hover:border-slate-500 text-[16px] px-10 cursor-pointer"
            onClick={toggleMode}
          >
            {mode === 'edit' ? "Ver Desglose" : "Modificar Desglose"}
          </button>
        </div>
      </div>

      {showResumen ? (
        <Resumen />
      ) : (
        <>
          {/* Filtros y botones */}
          <div className="flex items-center gap-3 mb-3 justify-between">
            <div className="flex items-center gap-3">
              <p className="font-semibold text-white text-center">Perfil actual:</p>
              <div className="text-white flex gap-3 items-center">
                {perfilesConfigurados.map((p) => (
                  <BtnDesglose
                    key={p}
                    perfil={p}
                    label={p.charAt(0).toUpperCase() + p.slice(1)}
                    togglePerfil={handlePerfilSelected}
                    isSelected={p === perfilSelected}
                    width="w-40"
                    height="h-10"
                    cantidad={itemsPerPerfil?.[p]?.length ?? 0}
                  />
                ))}
              </div>
            </div>

            {mode === 'edit' && (
              <div className="flex items-center gap-4">
                {perfilSelected && (
                  <InputAdd perfilSelected={perfilSelected} scrollToBottom={scrollToBottom} />
                )}
                <button
                  className="text-white p-2 font-semibold border-2 rounded-xl border-slate-600 hover:border-slate-500 text-[12px] cursor-pointer"
                  onClick={() => setShowSetup(true)}
                >
                  Modificar Perfiles
                </button>
              </div>
            )}
          </div>

          {/* Items */}
          {perfilSelected ? (
            <>
              {itemsPerPerfil && itemsPerPerfil[perfilSelected] ? (
                <div
                  className="grid grid-cols-4 sl:grid-cols-6 sl:h-185 h-143 p-3 border-2 rounded-xl gap-x-10 items-start justify-center gap-y-5 mt-5 overflow-y-auto glass-panel glass-scrollbar border-slate-700/50"
                  style={{
                    animation: "slideIn 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(71, 85, 105, 0.8) rgba(15, 23, 42, 0.5)'
                  }}
                >
                  {itemsPerPerfil[perfilSelected].map((item: ItemOrden) => (
                    <ItemDesglose key={item.id} itemData={item} mode={mode} />
                  ))}
                  <div ref={bottomRef} />
                </div>
              ) : (
                <div className="text-white font-semibold text-4xl text-center mt-40">
                  Agregue un perfil para desglosar
                </div>
              )}
            </>
          ) : (
            <div className="text-white font-semibold text-4xl text-center mt-40">
              Selecciona un perfil para Ver/Crear el desglose
            </div>
          )}
        </>
      )}
    </div>
  );
}