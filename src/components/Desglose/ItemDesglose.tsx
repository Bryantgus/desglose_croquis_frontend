import { useState } from "react";
import CalculoDesglose from "./CalculoDesglose";
import Caracteristicas from "./Caracteristicas";
import ItemMedida from "./ItemMedida";
import Warningsvg from "../../assets/Warningsvg";
import Configsvg from "../../assets/Configsvg";
import type { ItemOrden } from "../../types/ItemOrden";

type Props = {
  itemData: ItemOrden
  mode: 'edit' | 'ver'
}

export default function ItemDesglose({ itemData, mode }: Props) {

  const [itemDataNow, setItemDataNow] = useState<ItemOrden>(itemData)
  console.log(itemDataNow);
  
  const [modeStatus, setMode] = useState(mode)

  const setDataFnc = (label: string, value: string) => {
    setItemDataNow((prev) => ({
      ...prev,
      [label]: value
    })
  )}
  const toggleMode = () => {
    if (modeStatus === 'edit') {
      setMode('ver')
    } else {
      setMode('edit')
    }
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
          <label id='etiqueta' className="text-xs text-slate-400 block mb-1">Etiqueta</label>
          <input
            value={itemDataNow.etiqueta}
            onChange={(e) => setDataFnc('etiqueta', e.target.value)}
            name='etiqueta'
            type="text"
            className="text-center w-20 bg-slate-800 text-white text-sm font-medium rounded  
                border border-slate-600 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1 items-center justify-center w-30">
          {mode === 'ver' &&
            <p className="text-center text-xs font-semibold text-blue-400">
              P:[<span className="text-slate-200"> B </span>] C:[<span className="text-slate-200"> BM </span>]
            </p>
          }
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
        <ItemMedida label="Alto" value={itemDataNow.alto} changeValue={setDataFnc}/>
      </div>

      {mode === 'edit' ?
        <Caracteristicas /> :
        <CalculoDesglose label={itemDataNow.etiqueta} ancho={itemDataNow.ancho} alto={itemDataNow.alto} />
      }

      <p className="text-red-400 text-xs flex items-center gap-1" onClick={toggleMode}>
        <Warningsvg />
        Formato de ancho inválido
      </p>

    </div>
  );
}