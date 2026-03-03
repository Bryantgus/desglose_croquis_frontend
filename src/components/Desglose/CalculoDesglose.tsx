import type { TIPO_PERFIL } from "../../types/ItemOrden"
import { calcularDesgloseVentanas } from "../../utils/calculoVentana"

type Props = {
  ancho: string
  alto: string
  vias: number
  perfil: TIPO_PERFIL
}
export default function CalculoDesglose({ ancho, alto, vias, perfil }: Props) {
  const { rc, lateral, jamba, ruleta, can, cal } =
    calcularDesgloseVentanas(ancho, alto, vias, perfil as "p65" | "tradicional" | "p92")

  const items = [
    { label: 'RC', value: rc },
    { label: 'Lateral', value: lateral },
    { label: 'Jamba', value: jamba },
    { label: 'Ruleta', value: ruleta },
    { label: 'Can', value: can },
    { label: 'Cal', value: cal }
  ];

  return (
    <div className="w-full flex flex-col gap-1 p-2 bg-slate-900/30 rounded-lg border border-slate-700/50">

      {items.map((item) => (
        <div
          key={item.label}
          className="flex justify-between items-center py-0.5 px-1 border-b gap-3 border-slate-700/30 last:border-0"
        >
          <div className="w-16 h-6 flex items-center justify-center bg-slate-800 rounded border border-slate-600">
            <span className="text-[13px] font-bold text-slate-300 uppercase tracking-wide">
              {item.label}
            </span>
          </div>

          <div className="w-20 h-6 flex items-center justify-center bg-blue-500/10 rounded border border-blue-500/30">
            <span className="text-[18px] text-blue-400">
              {item.value}
            </span>
          </div>

        </div>
      ))}

    </div>
  );
}