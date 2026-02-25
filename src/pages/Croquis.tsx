import { useIdStore } from "../globalState/ordenId"
import NoOrdenSelected from "../components/NoOrdenSelected"

export default function Croquis() {
  const ordenId = useIdStore(s => s.ordenId)
  return (
    <div
      style={{
        animation: 'slideIn 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>

      {ordenId === 0 &&
          <NoOrdenSelected />
      }
    </div>
  )
}
