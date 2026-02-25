import { useState } from 'react';
import type { PerfilType } from '../../types/ItemOrden';
import BtnDesglose from './BtnDesglose';



interface PerfilOption {
  id: PerfilType;
  label: string;

}

const PERFILES: PerfilOption[] = [
  { id: 'p65', label: 'P65' },
  { id: 'tradicional', label: 'Tradicional', },
  { id: 'p92', label: 'P92' },
  { id: 'p40', label: 'P40' },
];

interface SetupProps {
  perfilesSelected: PerfilType[]
  onSave: (selectedPerfiles: PerfilType[]) => void;
}

export default function SetupDesglose({ onSave, perfilesSelected }: SetupProps) {
  const [selectedPerfiles, setSelectedPerfiles] = useState<PerfilType[]>(perfilesSelected);

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
        <div className="px-6 py-5 border-b border-slate-700/50 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Configuración Inicial
          </h2>
          <p className="text-sm text-slate-400">
            Seleccione los perfiles que se utilizarán en el desglose
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            {PERFILES.map((perfil) => (
              <BtnDesglose key={perfil.id} perfil={perfil.id} label={perfil.label} togglePerfil={togglePerfil} isSelected={isSelected(perfil.id) } />
            ))}
          </div>

          <div className="mt-4 text-center">
            <span className="text-sm text-slate-400">
              Seleccionados: <span className="text-blue-400 font-semibold">{selectedPerfiles.length}</span> / {PERFILES.length}
            </span>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-700/50 flex justify-center items-center">

          <div className="flex gap-3">

            <button
              onClick={handleSave}
              disabled={selectedPerfiles.length === 0}
              className={`
                px-6 py-2 rounded-lg text-sm font-medium text-white  cursor-pointer
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