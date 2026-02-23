import OrdenItem from "./OrdenItem";
// import { mockOrdenes } from "../../utils/mockData";
import type { Orden } from "../../types/Orden";
import { useOrdenes } from "../../hooks/useOrdenes";
import { useNavigate } from "react-router-dom";

type Props = {
  toggleMode: (mode: 'editar') => void
}
export default function OrdenTable({ toggleMode }: Props) {

  const navigate = useNavigate()
  const { data: ordenes } = useOrdenes()
  const doAction = (action: string) => {
    if (action === 'editar') {
      toggleMode(action)
    } else {
      navigate('/' + action)
    }
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-slate-800/50 text-slate-400 text-xs uppercase rounded-t-xl">
        <div className="grid grid-cols-5 gap-4 px-6 py-4 font-medium">
          <div>ID Orden</div>
          <div>Cliente</div>
          <div>Fecha</div>
          <div>Estado</div>
          <div>Acciones</div>
        </div>
      </div>

      {/* Body scrollable - SIN tbody, solo div */}
      <div className="overflow-y-auto sl:h-135 h-68 rounded-b-xl divide-y divide-slate-700/50 bg-[#192436]">
        {ordenes?.map((it: Orden) => (
          <OrdenItem
            key={it.id}
            id={it.id}
            cliente={it.cliente}
            fecha={it.fecha}
            estado={it.estado}
            action={doAction}
          />
        ))}
      </div>
    </div>
  )
}