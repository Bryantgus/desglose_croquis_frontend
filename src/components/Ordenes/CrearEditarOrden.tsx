import { useState } from 'react';

// Tipos
type OrderStatus = 'pendiente' | 'proceso' | 'completada';

interface OrderData {
  id?: string;
  cliente: string;
  descripcion: string;
  estado: OrderStatus;
  asignadoA: string;
}

interface CrearEditarOrdenProps {
  mode: 'crear' | 'editar';
  initialData?: OrderData;
  onSave: (data: OrderData) => void;
  onCancel: () => void;
}

const STATUS_COLORS: Record<OrderStatus, string> = {
  pendiente: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  proceso: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  completada: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
};

const STATUS_LABELS: Record<OrderStatus, string> = {
  pendiente: 'Pendiente',
  proceso: 'En Proceso',
  completada: 'Completada',
};

export default function CrearEditarOrden({
  mode,
  initialData,
  onSave,
  onCancel
}: CrearEditarOrdenProps) {

  const [formData, setFormData] = useState<OrderData>({
    cliente: '',
    descripcion: '',
    estado: 'pendiente',
    asignadoA: '',
    ...initialData
  });

  const [errors, setErrors] = useState<Partial<Record<keyof OrderData, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof OrderData, string>> = {};

    if (!formData.cliente.trim()) newErrors.cliente = 'Cliente requerido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  const updateField = <K extends keyof OrderData>(field: K, value: OrderData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
      style={{
        animation: 'slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>

      <div className="w-full max-w-2xl glass-panel rounded-2xl bg-slate-800/70 
        border border-slate-700/50 shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-700/50 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white">
              {mode === 'crear' ? 'Nueva Orden' : 'Editar Orden'}
            </h2>
            <p className="text-sm text-slate-400">
              {mode === 'crear' ? 'Crea una nueva orden de trabajo' : `Orden #${initialData?.id}`}
            </p>
          </div>

          {mode === 'editar' && (
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${STATUS_COLORS[formData.estado]}`}>
              {STATUS_LABELS[formData.estado]}
            </span>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          {/* Cliente */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">
              Cliente *
            </label>
            <input
              type="text"
              value={formData.cliente}
              onChange={(e) => updateField('cliente', e.target.value)}
              className={`w-full h-10 bg-slate-900/50 rounded-lg px-3 text-white text-sm
                border ${errors.cliente ? 'border-red-500' : 'border-slate-600'}
                focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 focus:outline-none
                transition-all placeholder:text-slate-500`}
              placeholder="Nombre del cliente"
            />
            {errors.cliente && (
              <p className="text-red-400 text-xs">{errors.cliente}</p>
            )}
          </div>

          {/* Descripción */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">
              Descripción
            </label>
            <textarea
              value={formData.descripcion}
              onChange={(e) => updateField('descripcion', e.target.value)}
              rows={3}
              className="w-full bg-slate-900/50 rounded-lg px-3 py-2 text-white text-sm
                border border-slate-600 resize-none
                focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 focus:outline-none
                transition-all placeholder:text-slate-500"
              placeholder="Describe los detalles del trabajo..."
            />
          </div>

          {/* Estado y Asignado en grid de 2 columnas */}
          <div className="grid grid-cols-2 gap-4">

            {/* Estado */}
            {mode === 'editar' &&
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                  Estado
                </label>
                <select
                  value={formData.estado}
                  onChange={(e) => updateField('estado', e.target.value as OrderStatus)}
                  className="w-full h-10 bg-slate-900/50 rounded-lg px-3 text-white text-sm
                border border-slate-600
                focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 focus:outline-none
                transition-all appearance-none cursor-pointer"
                >
                  {Object.entries(STATUS_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
            }

            {/* Asignado a */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                Asignado a
              </label>
              <input
                type="text"
                value={formData.asignadoA}
                onChange={(e) => updateField('asignadoA', e.target.value)}
                className="w-full h-10 bg-slate-900/50 rounded-lg px-3 text-white text-sm
                  border border-slate-600
                  focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 focus:outline-none
                  transition-all placeholder:text-slate-500"
                placeholder="Nombre del responsable"
              />
            </div>

          </div>

          {/* Actions */}
          <div className={`flex ${mode === 'crear' ? 'justify-end' : "justify-between"} gap-3 pt-4 border-t border-slate-700/50`}>
            {mode === 'editar' &&
              <div>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg text-sm font-medium text-white
              bg-[#1a284d] hover:bg-[#0f172b] 
              shadow-lg shadow-[#0f172b]
              transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  Eliminar Orden
                </button>
              </div>
            }

            <div>
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300
              hover:bg-slate-700/50 transition-colors cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="px-6 py-2 rounded-lg text-sm font-medium text-white
              bg-[#1a284d] hover:bg-[#0f172b] 
              shadow-lg shadow-[#0f172b]
              transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                {mode === 'crear' ? 'Crear Orden' : 'Guardar Cambios'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}