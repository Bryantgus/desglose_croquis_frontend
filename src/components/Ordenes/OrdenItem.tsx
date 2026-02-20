interface OrdenItemProps {
  id: number;
  cliente: string;
  fecha: string;
  estado: string;
  action: (action: string) => void;
}

export default function OrdenItem({ id, cliente, fecha, estado, action }: OrdenItemProps) {
  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'Completado': return 'bg-emerald-500/20 text-emerald-400';
      case 'En Proceso': return 'bg-yellow-500/20 text-yellow-400';
      case 'Cancelado': return 'bg-red-500/20 text-red-400';
      default: return 'bg-blue-500/20 text-blue-400';
    }
  };

  return (
    <div className="grid grid-cols-5 gap-4 px-6 py-4 items-center hover:bg-slate-800/30 transition-colors">
      <div className="font-mono text-blue-400">#ORD-{id.toString().padStart(3, '0')}</div>
      <div className="text-white font-medium">{cliente}</div>
      <div className="text-slate-400">{fecha}</div>
      <div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(estado)}`}>
          {estado}
        </span>
      </div>
      <div>
        <button 
          onClick={() => action(`edit-${id}`)}
          className="text-slate-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>
    </div>
  );
}