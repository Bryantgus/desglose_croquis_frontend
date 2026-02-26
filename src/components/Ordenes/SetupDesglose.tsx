import { useState } from 'react';

type PerfilType = 'p65' | 'tradicional' | 'p92' | 'p40';

const PERFILES: { id: PerfilType; label: string; description: string }[] = [
  { id: 'p65', label: 'P65', description: 'Perfil Básico' },
  { id: 'tradicional', label: 'Tradicional', description: 'Perfil Básico Mediano' },
  { id: 'p92', label: 'P92', description: 'Perfil Corredizo' },
  { id: 'p40', label: 'P40', description: 'Perfil Corredizo Mediano' },
];

interface SetupProps {
  onSave: (selectedPerfiles: PerfilType[]) => void;
}

export default function Setup({ onSave }: SetupProps) {
  const [selectedPerfiles, setSelectedPerfiles] = useState<PerfilType[]>([]);

  const togglePerfil = (perfil: PerfilType) => {
    setSelectedPerfiles(prev =>
      prev.includes(perfil)
        ? prev.filter(p => p !== perfil)
        : [...prev, perfil]
    );
  };

  const handleSave = () => {
    if (selectedPerfiles.length > 0) {
      onSave(selectedPerfiles);
    }
  };

  const isSelected = (perfil: PerfilType) => selectedPerfiles.includes(perfil);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">

      <div
        className="w-full max-w-lg glass-panel rounded-2xl bg-slate-800/70 
          border border-slate-700/50 shadow-2xl overflow-hidden"
        style={{ animation: 'slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-700/50 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Configuración Inicial
          </h2>
          <p className="text-sm text-slate-400">
            Seleccione los perfiles que se utilizarán en el desglose
          </p>
        </div>

        {/* Perfiles Grid */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            {PERFILES.map((perfil) => (
              <button
                key={perfil.id}
                onClick={() => togglePerfil(perfil.id)}
                className={`
                  relative p-4 rounded-xl border-2 transition-all duration-200
                  flex flex-col items-center gap-2
                  ${isSelected(perfil.id)
                    ? 'bg-blue-500/20 border-blue-500 text-blue-400 shadow-lg shadow-blue-500/20'
                    : 'bg-slate-900/50 border-slate-600 text-slate-400 hover:border-slate-500 hover:bg-slate-800/50'
                  }
                `}
              >
                {/* Indicador de selección */}
                {isSelected(perfil.id) && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                )}

                <span className="text-2xl font-bold">{perfil.label}</span>
                <span className="text-xs text-center opacity-80">{perfil.description}</span>
              </button>
            ))}
          </div>

          {/* Contador seleccionados */}
          <div className="mt-4 text-center">
            <span className="text-sm text-slate-400">
              Seleccionados: <span className="text-blue-400 font-semibold">{selectedPerfiles.length}</span> / {PERFILES.length}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-slate-700/50 flex justify-between items-center">


          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={selectedPerfiles.length === 0}
              className={`
                px-6 py-2 rounded-lg text-sm font-medium text-white
                transition-all hover:-translate-y-0.5
                ${selectedPerfiles.length > 0
                  ? 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20'
                  : 'bg-slate-700 cursor-not-allowed opacity-50'
                }
              `}
            >
              Guardar Configuración
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}