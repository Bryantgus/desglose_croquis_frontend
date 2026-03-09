import { useState, useMemo, useEffect } from "react";
import SetupDesglose from "../components/Desglose/SetupDesglose";
import { useItemOrdenes } from "../hooks/useItemOrden";
import { useIdStore } from "../globalState/ordenId";
import type { TIPO_PERFIL } from "../types/ItemOrden";
import NoOrdenSelected from "../components/NoOrdenSelected";
import SpinLoading from "../components/SpinLoading";
import DesgloseContent from "../components/Desglose/DesgloseContent";

export default function Desglose() {
  const ordenId = useIdStore((s) => s.ordenId);
  const [showSetupManual, setShowSetupManual] = useState(false);
  const { data: itemsPerPerfil, isLoading } = useItemOrdenes(Number(ordenId));
  const perfilesDisponibles: TIPO_PERFIL[] = useMemo(() => {
    if (!itemsPerPerfil) return [];
    return Object.keys(itemsPerPerfil).filter(
      (perfil) => itemsPerPerfil[perfil as keyof typeof itemsPerPerfil].length > 0
    ) as TIPO_PERFIL[];
  }, [itemsPerPerfil]);

  const [perfilSelected, setPerfilSelected] = useState<TIPO_PERFIL | null>(null);


  const [perfilesConfigurados, setPerfilesConfigurados] = useState<TIPO_PERFIL[]>([]);
  const mostrarSetup = (perfilesConfigurados.length === 0) || showSetupManual;

  useEffect(() => {
    if (perfilesDisponibles.length > 0 && perfilesConfigurados.length === 0) {
      setPerfilSelected(perfilesDisponibles[0]);
      setPerfilesConfigurados(perfilesDisponibles);
    }
  }, [perfilesDisponibles]);

  const handleSave = (perfilesSeleccionados: TIPO_PERFIL[]) => {
    setPerfilesConfigurados(perfilesSeleccionados);

    if (perfilSelected && !perfilesSeleccionados.includes(perfilSelected as TIPO_PERFIL)) {
      setPerfilSelected(null);
    }
    setShowSetupManual(false);
  };

  if (ordenId === 0) return <NoOrdenSelected />;
  if (isLoading) return <SpinLoading />;

  return (
    <div style={{ animation: "slideIn 0.7s cubic-bezier(0.4, 0, 0.2, 1)" }}>
      {mostrarSetup ? (
        <SetupDesglose
          perfilesSelected={perfilesConfigurados}
          onSave={handleSave}
        />
      ) : (
        <DesgloseContent
          perfilSelected={perfilSelected}
          perfilesConfigurados={perfilesConfigurados}
          handlePerfilSelected={(p) => setPerfilSelected(p)}
          setShowSetup={setShowSetupManual}
        />
      )}
    </div>
  );
}