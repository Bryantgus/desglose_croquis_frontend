import type { TIPO_PERFIL } from "../../types/ItemOrden"

type Props = {
  perfil: TIPO_PERFIL
  label: string
  togglePerfil: (perfil: TIPO_PERFIL) => void
  isSelected: boolean
  width?: string
  height?: string
  text?: string
  cantidad?: number
}
export default function BtnDesglose({ perfil, label, togglePerfil, isSelected, height, width, cantidad }: Props) {
  const cantidadFormated = `(${cantidad})`
  return (
    <button
      onClick={() => togglePerfil(perfil)}
      className={`cursor-pointer  ${height}  ${!height && 'p-4'} ${width ? width : 'w-55.75'}
                  relative rounded-xl border-2 transition-all duration-200
                  flex items-center justify-center gap-2
                  ${isSelected
          ? 'bg-blue-500/20 border-blue-500 text-blue-400 shadow-lg shadow-blue-500/20'
          : 'bg-slate-900/50 border-slate-600 text-slate-400 hover:border-slate-500 hover:bg-slate-800/50'
        }
                `}
    >

      <span className="text-xl font-bold">
        {label} {cantidad && cantidadFormated}
      </span>
    </button>
  )
}
