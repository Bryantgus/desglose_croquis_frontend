import { useState } from "react";
import SetupDesglose from "../components/Desglose/SetupDesglose";
import ItemDesglose from "../components/Desglose/ItemDesglose";
import BtnDesglose from "../components/Desglose/BtnDesglose";
import InputAdd from "../components/Desglose/InputAdd";
import { useCreateItemOrden, useItemOrdenes } from "../hooks/useItemOrden";
import { useIdStore } from "../globalState/ordenId";
import type { TIPO_PERFIL } from "../types/ItemOrden";
import NoOrdenSelected from "../components/NoOrdenSelected";
import SpinLoading from "../components/SpinLoading";

export default function Desglose() {
  const ordenId = useIdStore((s) => s.ordenId);
  const { data, isLoading } = useItemOrdenes(Number(ordenId));
  const addDesglose = useCreateItemOrden();

  const itemsOrden = {
    p65: data?.filter((i) => i.tipoPerfil === "p65") || [],
    tradicional: data?.filter((i) => i.tipoPerfil === "tradicional") || [],
    p92: data?.filter((i) => i.tipoPerfil === "p92") || [],
    p40: data?.filter((i) => i.tipoPerfil === "p40") || [],
  };

  const tieneItems = Object.values(itemsOrden).some((arr) => arr.length > 0);
  const perfilesUsados = Object.keys(itemsOrden).filter(
    (perfil) => itemsOrden[perfil as keyof typeof itemsOrden].length > 0
  ) as TIPO_PERFIL[];

  const [manualShowSetup, setManualShowSetup] = useState(false);

  const [manualPerfil, setManualPerfil] = useState<TIPO_PERFIL | null>(null);

  const showSetup = manualShowSetup || (data !== undefined && !tieneItems);

  const perfilSelected = manualPerfil || perfilesUsados[0];

  const handleSave = (perfilesSeleccionados: TIPO_PERFIL[]) => {
    perfilesSeleccionados.forEach((perfil) => {
      const listaActual = itemsOrden[perfil as keyof typeof itemsOrden];
      if (listaActual.length === 0) {
        addDesglose.mutate({
          ordenId: Number(ordenId),
          itemOrden: {
            ancho: "0",
            alto: "0",
            etiqueta: "1",
            vias: 2,
            tipoCristal: "natural liso",
            tipoPerfil: perfil,
            colorPerfil: "blanco",
          },
        });
      }
    });
    setManualShowSetup(false);
  };

  const handlePerfilSelected = (perfil: TIPO_PERFIL) => {
    setManualPerfil(perfil);
  };

  if (isLoading) return <SpinLoading />;

  return (
    <div style={{ animation: "slideIn 0.7s cubic-bezier(0.4, 0, 0.2, 1)" }}>
      {ordenId === 0 ? (
        <div className="flex items-center justify-center">
          <NoOrdenSelected />
        </div>
      ) : (
        <div>
          {showSetup && (
            <SetupDesglose
              perfilesSelected={perfilesUsados}
              onSave={handleSave}
            />
          )}

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
                    cantidad={itemsOrden[p].length}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <InputAdd onAdd={() => console.log("Agregar...")} />
              <button
                className="text-white p-2 font-semibold border-2 rounded-xl border-slate-600 hover:border-slate-500 text-[12px] cursor-pointer"
                onClick={() => setManualShowSetup(true)}
              >
                Modificar Perfiles
              </button>
            </div>
          </div>

          <div
            className="grid grid-cols-4 sl:grid-cols-6 sl:h-185 h-115 p-3 border-2 border-slate-700 rounded-xl gap-x-10 items-start justify-center gap-y-5 mt-5 overflow-y-auto"
            style={{ animation: "slideIn 0.7s cubic-bezier(0.4, 0, 0.2, 1)" }}
          >
            {/* Mapeo dinámico de los items del perfil seleccionado */}

            <ItemDesglose />

          </div>
        </div>
      )}
    </div>
  );
}