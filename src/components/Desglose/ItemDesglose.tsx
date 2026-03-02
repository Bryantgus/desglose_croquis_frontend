import { useState } from "react";
import CalculoDesglose from "./CalculoDesglose";
import Caracteristicas from "./Caracteristicas";
import ItemMedida from "./ItemMedida";
import Warningsvg from "../../assets/Warningsvg";
import Configsvg from "../../assets/Configsvg";
import type { ItemOrden } from "../../types/ItemOrden";
import Deletesvg from "../../assets/Deletesvg";
import { useDeleteItemOrden } from "../../hooks/useItemOrden";
import { useIdStore } from "../../globalState/ordenId";

type Props = {
  itemData: ItemOrden;
  mode: 'edit' | 'ver';
}

export default function ItemDesglose({ itemData, mode: modeGlobal }: Props) {
  const [itemDataNow, setItemDataNow] = useState<ItemOrden>(itemData);

  const [modeLocal, setModeLocal] = useState<'edit' | 'ver' | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const { mutate, isPending } = useDeleteItemOrden();
  const ordenId = useIdStore(s => s.ordenId);

  const modeActual = modeLocal ?? modeGlobal;


  const setDataFnc = (label: string, value: string) => {
    setItemDataNow(prev => ({ ...prev, [label]: value }));
  };

  const toggleMode = () => {
    setModeLocal(prev => {
      const actual = prev ?? modeGlobal;
      return actual === 'edit' ? 'ver' : 'edit';
    });
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
            type="text"
            className="text-center w-20 bg-slate-800 text-white text-sm font-medium rounded  
              border border-slate-600 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1 items-center justify-center w-30">

          <button
            className="w-8 h-8 rounded-lg bg-slate-700/50 hover:bg-slate-600 cursor-pointer
              flex items-center justify-center transition-colors"
            onClick={toggleMode}
          >
            <Configsvg />
          </button>
        </div>
      </div>

      <div className="flex justify-between gap-1">
        <ItemMedida label="Ancho" value={itemDataNow.ancho} changeValue={setDataFnc} />
        <ItemMedida label="Alto" value={itemDataNow.alto} changeValue={setDataFnc} />
      </div>

      {modeActual === 'ver' ? (
        <CalculoDesglose
          label={itemDataNow.etiqueta}
          ancho={itemDataNow.ancho}
          alto={itemDataNow.alto}
        />
      ) : (
        <Caracteristicas />
      )}

      <div className="flex justify-between items-center">
        {modeActual === 'ver' && (
          <p className="text-center text-xs font-semibold text-blue-400">
            Perfil:<span className="text-slate-200"> B </span> Cristal:<span className="text-slate-200"> BM </span> Via:<span className="text-slate-200"> 3 </span>
          </p>
        )}
        <div className="cursor-pointer hover:text-red-400 transition-colors" onClick={handleDeleteClick}>
          <Deletesvg />
        </div>
      </div>
    </div>
  );
}