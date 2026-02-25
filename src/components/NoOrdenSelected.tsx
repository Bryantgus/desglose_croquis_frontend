import { useNavigate } from 'react-router-dom';

export default function NoOrdenSelected() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center text-white text-5xl gap-10">
      <p>Ninguna Orden Seleccionada</p>
      <button
        onClick={() => navigate("/ordenes")}
        className="text-2xl cursor-pointer relative rounded-xl border-2 transition-all duration-200 flex items-center justify-center gap-2 hover:bg-slate-800 border-slate-500 px-7 py-3 bg-slate-900"
      >
        Ir a Ordenes
      </button>
    </div>
  )
}
