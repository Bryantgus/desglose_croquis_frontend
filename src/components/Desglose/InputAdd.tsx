import { useState } from 'react';
import { useCreateItemOrden } from '../../hooks/useItemOrden';
import { useIdStore } from '../../globalState/ordenId';
import type { ItemOrden, TIPO_PERFIL } from '../../types/ItemOrden';

interface InputAddProps {
  placeholder?: string;
  label?: string;
  max?: number;
  min?: number;
  perfilSelected: TIPO_PERFIL | null
  data: ItemOrden[]
}

export default function InputAdd({
  label,
  min = 1,
  max = 50,
  perfilSelected,
  data
}: InputAddProps) {
  const addDesglose = useCreateItemOrden();
  const ordenId = useIdStore((s) => s.ordenId);
  const [value, setValue] = useState<string>('1');

const handleAdd = () => {
  const numValue = parseInt(value, 10);
  if (isNaN(numValue) || numValue < min || numValue > max || perfilSelected === null) {
    return;
  }

    const itemOrdenMock: Omit<ItemOrden, 'id'> = {
      ancho: "0",
      alto: "0",
      etiqueta: String(data.length + 1),
      vias: 2,
      tipoCristal: "natural liso",
      tipoPerfil: perfilSelected,
      colorPerfil: "blanco",
    };

    addDesglose.mutate({
      ordenId: Number(ordenId), 
      itemOrden: itemOrdenMock
    });
  setValue('1');
};

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">
          {label}
        </label>
      )}

      <div className="flex items-center gap-2">
        <input
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 h-10 bg-slate-900/50 rounded-lg px-3 text-white text-2xl font-bold text-center
            border border-slate-600
            focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 focus:outline-none
            transition-all placeholder:text-slate-500
            [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        <button
          onClick={handleAdd}
          disabled={!value || parseInt(value, 10) < min || parseInt(value, 10) > max}
          className="w-10 h-10 rounded-lg bg-blue-600 hover:bg-blue-700 cursor-pointer
            disabled:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50
            flex items-center justify-center transition-all
            shadow-lg shadow-blue-500/20 hover:-translate-y-0.5"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}