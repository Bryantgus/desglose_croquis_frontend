import { useState, useMemo } from "react";
import SetupDesglose from "../components/Desglose/SetupDesglose";
import { useItemOrdenes } from "../hooks/useItemOrden";
import { useIdStore } from "../globalState/ordenId";
import type { TIPO_PERFIL } from "../types/ItemOrden";
import NoOrdenSelected from "../components/NoOrdenSelected";
import SpinLoading from "../components/SpinLoading";
import DesgloseContent from "../components/Desglose/DesgloseContent";

export default function Desglose() {
  const ordenId = useIdStore((s) => s.ordenId);
  const { data, isLoading } = useItemOrdenes(Number(ordenId));
  const [perfilSelected, setPerfilSelected] = useState<TIPO_PERFIL | "">("");
  const [showSetupManual, setShowSetupManual] = useState(false);
  const [perfilesConfigurados, setPerfilesConfigurados] = useState<TIPO_PERFIL[] | null>(null);

  const itemsPerPerfil = useMemo(() => {
    if (!data) return null;
    return {
      p65: data.filter((i) => i.tipoPerfil === "p65"),
      tradicional: data.filter((i) => i.tipoPerfil === "tradicional"),
      p92: data.filter((i) => i.tipoPerfil === "p92"),
      p40: data.filter((i) => i.tipoPerfil === "p40"),
    };
  }, [data]);

  const perfilesConDataEnDB = useMemo(() => {
    if (!itemsPerPerfil) return [];
    return Object.keys(itemsPerPerfil).filter(
      (perfil) => itemsPerPerfil[perfil as keyof typeof itemsPerPerfil].length > 0
    ) as TIPO_PERFIL[];
  }, [itemsPerPerfil]);

  const perfilesAMostrar = perfilesConfigurados !== null
    ? perfilesConfigurados
    : perfilesConDataEnDB;

  if (ordenId === 0) return <NoOrdenSelected />;
  if (isLoading || itemsPerPerfil === null) return <SpinLoading />;

  const isSetupVisible = (perfilesAMostrar.length === 0) || showSetupManual;

  const handleSave = (perfilesSeleccionados: TIPO_PERFIL[]) => {
    setPerfilesConfigurados(perfilesSeleccionados);

    if (perfilSelected && !perfilesSeleccionados.includes(perfilSelected as TIPO_PERFIL)) {
      setPerfilSelected("");
    }
    setShowSetupManual(false);
  };

  return (
    <div style={{ animation: "slideIn 0.7s cubic-bezier(0.4, 0, 0.2, 1)" }}>
      {isSetupVisible ? (
        <SetupDesglose
          perfilesSelected={perfilesAMostrar}
          onSave={handleSave}
        />
      ) : (
        <DesgloseContent
          perfilSelected={perfilSelected || perfilesAMostrar[0]}
          perfilesUsados={perfilesAMostrar}
          handlePerfilSelected={(p) => setPerfilSelected(p)}
          itemsPerPerfil={itemsPerPerfil}
          setShowSetup={setShowSetupManual}
        />
      )}
    </div>
  );
}