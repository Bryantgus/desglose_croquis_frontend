import { useState, useMemo, useEffect } from "react";
import SetupDesglose from "../components/Desglose/SetupDesglose";
import { useCreateItemOrden, useItemOrdenes } from "../hooks/useItemOrden";
import { useIdStore } from "../globalState/ordenId";
import type { TIPO_PERFIL } from "../types/ItemOrden";
import NoOrdenSelected from "../components/NoOrdenSelected";
import SpinLoading from "../components/SpinLoading";
import DesgloseContent from "../components/Desglose/DesgloseContent";

export default function Desglose() {

  const ordenId = useIdStore((s) => s.ordenId);
  const { data, isLoading } = useItemOrdenes(Number(ordenId));
  const addDesglose = useCreateItemOrden();

  const [showSetup, setShowSetup] = useState(false);
  const [perfiles, setPerfiles] = useState<TIPO_PERFIL[]>([]);
  const [perfilSelected, setPerfilSelected] = useState<TIPO_PERFIL>('' as TIPO_PERFIL);

  const itemsPerPerfil = useMemo(() => ({
    p65: data?.filter((i) => i.tipoPerfil === "p65") || [],
    tradicional: data?.filter((i) => i.tipoPerfil === "tradicional") || [],
    p92: data?.filter((i) => i.tipoPerfil === "p92") || [],
    p40: data?.filter((i) => i.tipoPerfil === "p40") || [],
  }), [data]);

  const perfilesUsados = useMemo(() =>
    Object.keys(itemsPerPerfil).filter(
      (perfil) => itemsPerPerfil[perfil as keyof typeof itemsPerPerfil].length > 0
    ) as TIPO_PERFIL[],
    [itemsPerPerfil]
  );

  const tieneItems = useMemo(() =>
    Object.values(itemsPerPerfil).some((arr) => arr.length > 0),
    [itemsPerPerfil]
  );

  useEffect(() => {
    if (data && perfiles.length === 0) {
      setPerfiles(perfilesUsados);
      setPerfilSelected(perfilesUsados[0] || 'p65');
      setShowSetup(!tieneItems);
    }
  }, [data, tieneItems, perfilesUsados, perfiles.length]);

  if (isLoading) return (
    <div className="flex items-center justify-center">
      <SpinLoading />
    </div>
  );

  if (ordenId === 0) return (
    <div className="flex items-center justify-center">
      <NoOrdenSelected />
    </div>
  );

  const handleSave = (perfilesSeleccionados: TIPO_PERFIL[]) => {
    perfilesSeleccionados.forEach((perfil) => {
      const listaActual = itemsPerPerfil[perfil as keyof typeof itemsPerPerfil];
      if (listaActual.length === 0) {
        addDesglose.mutate({
          ordenId: Number(ordenId),
          itemOrden: {
            ancho: "0",
            alto: "0",
            etiqueta: `${listaActual.length + 1}`,
            vias: 2,
            tipoCristal: "natural liso",
            tipoPerfil: perfil,
            colorPerfil: "blanco",
          },
        });
      }
    });
    setPerfiles(perfilesSeleccionados);
    setShowSetup(false);
  };

  const handlePerfilSelected = (perfil: TIPO_PERFIL) => {
    setPerfilSelected(perfil);
  };
  const shouldShowSetup = showSetup || perfiles.length === 0;

  return (
    <div style={{ animation: "slideIn 0.7s cubic-bezier(0.4, 0, 0.2, 1)" }}>
      {shouldShowSetup && (
        <SetupDesglose
          perfilesSelected={perfiles}
          onSave={handleSave}
        />
      )}

      <DesgloseContent
        perfilSelected={perfilSelected || perfiles[0] || 'p65'}
        perfilesUsados={perfiles.length > 0 ? perfiles : perfilesUsados}
        handlePerfilSelected={handlePerfilSelected}
        itemsPerPerfil={itemsPerPerfil}
        setShowSetup={setShowSetup}
      />
    </div>
  );
}