import type { PerfilType } from "../../types/Desglose"

type Props = {
  perfil: PerfilType
  label: string
  togglePerfil: (perfil: PerfilType) => void
  isSelected: boolean
  width?: string
  height?: string
  text?: string
  cantidad?: number
}
export default function BtnDesglose({ perfil, label, togglePerfil, isSelected, height, width, cantidad }: Props) {
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
      {isSelected && (
        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
      )}

      <span className="text-xl font-bold ">{label} ({cantidad})</span>
    </button>
  )
}
