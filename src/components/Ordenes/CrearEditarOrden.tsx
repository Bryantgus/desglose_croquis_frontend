import { useState } from 'react';
import { useIdStore } from '../../globalState/id';
import { useCreateOrden, useDeleteOrden, useModifyOrden, useOrdenes } from '../../hooks/useOrdenes';
import { useToastStore } from '../../globalState/toast';
import SpinLoading from '../SpinLoading';
import type { Orden, OrderStatus } from '../../types/Orden';
import { useNavigate } from 'react-router-dom';


interface CrearEditarOrdenProps {
  mode: 'crear' | 'editar';
  onCancel: () => void;
}

const STATUS_COLORS: Record<OrderStatus, string> = {
  'Pendiente': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'En Proceso': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Completado': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
};

const STATUS_LABELS: Record<OrderStatus, string> = {
  Pendiente: 'Pendiente',
  "En Proceso": 'En Proceso',
  'Completado': 'Completada',
};

export default function CrearEditarOrden({ mode, onCancel }: CrearEditarOrdenProps) {
  const navigate = useNavigate()
  const id = useIdStore(s => s.id);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { mutate: createOrden, isPending } = useCreateOrden();
  const { mutate: modificarOrden, isPending: isPending1 } = useModifyOrden();
  const { mutate: deleteOrden, isPending: isPending2 } = useDeleteOrden();
  const setId = useIdStore(s => s.setId)
  const openToast = useToastStore(s => s.openToast)
  const [errors, setErrors] = useState<Partial<Record<keyof Orden, string>>>({});

  const { data } = useOrdenes()

  const OrdenItemSelected = mode === 'editar'
    ? data?.find((it) => Number(it.id) === id)
    : null;

  const [formData, setFormData] = useState<Orden>(() => {
    if (mode === 'editar' && OrdenItemSelected) {
      return { ...OrdenItemSelected };
    }
    return {
      cliente: '',
      descripcion: '',
      estado: 'Pendiente',
      asignadoA: '',
    };
  });


  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof Orden, string>> = {};
    if (!formData.cliente.trim()) newErrors.cliente = 'Cliente requerido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      if (mode === 'crear') {
        createOrden(formData, {
          onSuccess: () => {
            openToast('Orden Guardada Correctamente', 'success');
            onCancel();
            setId(Number(id))
            navigate('/desglose')
          },
          onError: () => {
            onCancel()
            openToast('Error al Guardar la Orden', 'error');
          }
        });
      } else {
        modificarOrden({ id: id!, orden: formData }, {
          onSuccess: () => {
            onCancel();
            openToast('Orden Modificada Correctamente', 'success');
          },
          onError: () => {
            onCancel()
            openToast('Error al Modificar la Orden', 'error');
          }
        })
      }
    }
  };

  const updateField = <K extends keyof Orden>(field: K, value: Orden[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    console.log(id);
    
    if (!id) return;
    deleteOrden(id, {
      onSuccess: () => {
        onCancel();
        openToast('Orden eliminada', 'success');
      }
    });
  };

  if (!data) return;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
      style={{ animation: 'slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}>

      <div className="w-full max-w-2xl glass-panel rounded-2xl bg-slate-800/70 
        border border-slate-700/50 shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-700/50 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white">
              {mode === 'crear' ? 'Nueva Orden' : 'Editar Orden'}
            </h2>
            <p className="text-sm text-slate-400">
              {mode === 'crear' ? 'Crea una nueva orden de trabajo' : `Orden #${id}`}
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
          <div className={`flex ${mode === 'crear' ? 'justify-end' : "justify-between"} gap-3 pt-4 border-t border-slate-700/50 items-center`}>

            {/* Sección izquierda: Eliminar o Confirmación */}
            {mode === 'editar' && (
              <div className="flex items-center gap-3">
                {!showDeleteConfirm ? (
                  <button
                    type="button"
                    onClick={handleDeleteClick}
                    className="px-6 py-2 rounded-lg text-sm font-medium text-white
                      bg-[#1a284d] hover:bg-[#0f172b] 
                      shadow-lg shadow-[#0f172b]
                      transition-all hover:-translate-y-0.5 cursor-pointer"
                  >
                    Eliminar Orden
                  </button>
                ) : (
                  // Confirmación con efecto saltico
                  <div
                    className="flex items-center gap-3 px-4 py-2 rounded-lg
                      bg-slate-900/80 border border-red-500/30
                      animate-[slideIn_0.3s_ease-out]"
                    style={{
                      animation: 'slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    <span className="text-sm text-slate-300">
                      ¿Está seguro de eliminar la orden?
                    </span>

                    {isPending2 ?
                      <SpinLoading />
                      :
                      <button
                        type="button"
                        onClick={handleConfirmDelete}
                        className="px-3 py-1 rounded text-xs font-medium text-white
                        bg-red-600 hover:bg-red-500 
                        transition-colors cursor-pointer"
                      >
                        Sí
                      </button>}
                  </div>
                )}
              </div>
            )}

            {/* Botones derecha: Cancelar y Guardar */}
            <div className='flex gap-3'>
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300
                  hover:bg-slate-700/50 transition-colors cursor-pointer"
              >
                Cancelar
              </button>

              {isPending && isPending1 ?
                <SpinLoading /> :

                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg text-sm font-medium text-white
              bg-[#1a284d] hover:bg-[#0f172b] 
              shadow-lg shadow-[#0f172b]
              transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  {mode === 'crear' ? 'Crear Orden' : 'Guardar Cambios'}
                </button>
              }
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}

