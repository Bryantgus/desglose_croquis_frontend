import { useIdStore } from "../globalState/ordenId"
import NoOrdenSelected from "../components/NoOrdenSelected"

export default function Croquis() {
  const ordenId = useIdStore(s => s.ordenId)
  return (
    <div
      style={{
        animation: 'slideIn 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>

      <h1 className="text-3xl font-bold text-white mb-1 pb-5">Croquis de Cristales</h1>
      {ordenId === 0 &&
        <NoOrdenSelected />
      }
    </div>
  )
}
