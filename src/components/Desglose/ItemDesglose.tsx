// ItemDesglose.tsx
import { useEffect, useState } from "react";
import CalculoDesglose from "./CalculoDesglose";
import Caracteristicas from "./Caracteristicas";
import ItemMedida from "./ItemMedida";
import Configsvg from "../../assets/Configsvg";
import type { ItemOrden, Features } from "../../types/ItemOrden";
import Deletesvg from "../../assets/Deletesvg";
import { useDeleteItemOrden } from "../../hooks/useItemOrden";
import { useIdStore } from "../../globalState/ordenId";

type Props = {
  itemData: ItemOrden;
  mode: 'edit' | 'ver';
}

const siglasTipoCristal: Record<string, string> = {
  "blanco": 'B',
  "negro": "N",
  "roble": "R",
  "caoba": "C",
}

const siglasCristal: Record<string, string> = {
  "natural liso": "NL",
  "natural martillado": "NM",
  "bronze liso": "BL",
  "bronze martillado": "BM",
  "azul liso": "AL",
  "azul martillado": "AM",
}

export default function ItemDesglose({ itemData, mode }: Props) {
  const [itemDataNow, setItemDataNow] = useState<ItemOrden>(itemData);
  const [currentMode, setCurrentMode] = useState<'edit' | 'ver'>(mode);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { mutate, isPending } = useDeleteItemOrden();
  const ordenId = useIdStore(s => s.ordenId);

  useEffect(() => {
    setCurrentMode(mode);
  }, [mode]);

  const setDataFnc = (label: string, value: string) => {
    if (currentMode === 'ver') return 
    const keyMap: Record<string, keyof ItemOrden> = {
      "Ancho": "ancho",
      "Alto": "alto",
    };

    const key = keyMap[label] || label;
    setItemDataNow(prev => ({ ...prev, [key]: value }));
  };

  const handleFeaturesChange = (features: Features) => {
    setItemDataNow(prev => ({
      ...prev,
      colorPerfil: features.colorPerfil,
      tipoCristal: features.tipoCristal,
      vias: features.vias,
    }));
  };

  const toggleMode = () => {
    if (mode === 'edit') return
    setCurrentMode(prev => prev === 'edit' ? 'ver' : 'edit');
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const handleConfirmDelete = () => {
    mutate(
      { itemOrdenId: itemDataNow.id, ordenId: ordenId! },
      {
        onSuccess: () => {
          setShowDeleteConfirm(false);
        }
      }
    );
  };

  if (showDeleteConfirm) {
    return (
      <div className="glass-panel p-4 rounded-xl bg-slate-800/70 w-50
        border border-red-500/30 
        flex flex-col gap-3 items-center justify-center min-h-50">

        <p className="text-white text-center font-medium">
          ¿Seguro de borrar desglose?
        </p>

        <p className="text-slate-400 text-sm text-center">
          Etiqueta: <span className="text-blue-400">{itemDataNow.etiqueta}</span>
        </p>

        <div className="flex gap-3 w-full">
          <button
            onClick={handleCancelDelete}
            disabled={isPending}
            className="flex-1 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 
              text-white text-sm font-medium transition-colors cursor-pointer
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Volver
          </button>

          <button
            onClick={handleConfirmDelete}
            disabled={isPending}
            className="flex-1 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 
              text-white text-sm font-medium transition-colors cursor-pointer
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Borrando' : 'Sí'}
          </button>
        </div>
      </div>
    );
  }

  const currentFeatures: Features = {
    colorPerfil: itemDataNow.colorPerfil,
    tipoCristal: itemDataNow.tipoCristal,
    vias: itemDataNow.vias,
  };

  return (
    <div className="glass-panel p-2 rounded-xl bg-slate-800/70 w-50
      border border-slate-700/50 
      transition-all duration-300 ease 
      hover:-translate-y-0.5 
      hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.3)] 
      hover:border-blue-400/30 
      flex flex-col gap-1">

      <div className="flex items-center justify-between">
        <div className="bg-slate-900/50 rounded-lg p-1 border border-slate-700 w-30">
          <label htmlFor='etiqueta' className="text-xs text-slate-400 block mb-1">
            Etiqueta
          </label>
          <input
            id='etiqueta'
            value={itemDataNow.etiqueta}
            onChange={(e) => setDataFnc('etiqueta', e.target.value)}
            name='etiqueta'
            autoComplete="off"
            type="text"
            className="text-center w-20 bg-slate-800 text-white text-sm font-medium rounded  
              border border-slate-600 focus:border-blue-500 focus:outline-none"
          />
        </div>
        {mode === 'ver' &&
          <div className="flex flex-col gap-1 items-center justify-center w-30">
            <button
              className="w-8 h-8 rounded-lg bg-slate-700/50 hover:bg-slate-600 cursor-pointer
            flex items-center justify-center transition-colors"
              onClick={toggleMode}
            >
              <Configsvg />
            </button>
          </div>
        }
      </div>

      <div className="flex justify-between gap-1">
        <ItemMedida label="Ancho" value={itemDataNow.ancho} changeValue={setDataFnc} />
        <ItemMedida label="Alto" value={itemDataNow.alto} changeValue={setDataFnc} />
      </div>

      {currentMode === 'ver' ? (
        <CalculoDesglose
          ancho={itemDataNow.ancho}
          alto={itemDataNow.alto}
          vias={itemDataNow.vias}
          perfil={itemDataNow.tipoPerfil}
        />
      ) : (
        <Caracteristicas
          featuresP={currentFeatures}
          sendFeatures={handleFeaturesChange}
        />
      )}

      <div className="flex justify-between items-center ml-7">
        {currentMode === 'ver' && (
          <p className="text-center text-xs font-semibold text-blue-400">
            Perfil:<span className="text-slate-200">
              {siglasTipoCristal[itemDataNow.colorPerfil] || '?'}
            </span> Cristal:<span className="text-slate-200">
              {siglasCristal[itemDataNow.tipoCristal] || '?'}
            </span> Via:<span className="text-slate-200">
              {itemDataNow.vias}
            </span>
          </p>
        )}
        {currentMode === 'edit' &&
          <div className="flex cursor-pointer hover:text-red-400 border-2 border-slate-500 p-1 rounded-xl items-center  transition-colors gap-5 justify-center hover:bg-slate-900" onClick={handleDeleteClick}>
            <p className="font-semibold text-red-500 text-sm">Eliminar</p>
            <Deletesvg />
          </div>
        }
      </div>
    </div>
  );
}