import Croquissvg from "../../assets/Croquissvg";
import Desglosesvg from "../../assets/Desglosesvg";
import Editsvg from "../../assets/Editsvg";
import type { OrdenAction } from "../../types/Orden";
import { useIdStore } from "../../globalState/ordenId";
import { formatearFecha } from "../../utils/formated";

export default function OrdenItem({ id, cliente, fecha, estado, action }: OrdenAction) {

  const setId = useIdStore((state) => state.setId);
  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'Completado': return 'bg-emerald-500/20 text-emerald-400';
      case 'En Proceso': return 'bg-yellow-500/20 text-yellow-400';
      case 'Cancelado': return 'bg-red-500/20 text-red-400';
      default: return 'bg-blue-500/20 text-blue-400';
    }
  };

  const selectedOption = (actionString: string) => {
    setId(Number(id))
    action(actionString)
  }

  return (
    <div className="grid grid-cols-5 gap-4 px-6 py-4 items-center hover:bg-slate-800/30 transition-colors">
      {id && <div className="font-mono text-blue-400">#ORD-{id.toString().padStart(3, '0')}</div>}
      <div className="text-white font-medium">{cliente}</div>
      {fecha && <div className="text-slate-400">{formatearFecha(fecha)}</div>}
      <div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(estado)}`}>
          {estado}
        </span>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer" title='Editar' onClick={() => {
            selectedOption('editar')
          }
          }>
            <Editsvg />
          </button>
          <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer" onClick={() => selectedOption('desglose')} title="Desglose">
            <Desglosesvg />
          </button>
          <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer" onClick={() => selectedOption('croquis')} title="Croquis">
            <Croquissvg />
          </button>
        </div>
      </div>
    </div >
  );
}