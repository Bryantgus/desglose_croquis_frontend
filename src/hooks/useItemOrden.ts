import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { itemOrdenService } from '../services/itemOrdenService';
import type { ItemOrden } from '../types/ItemOrden';

export const useItemOrdenes = (ordenId: number) => {
  return useQuery({
    queryKey: ['items_orden', ordenId],
    queryFn: () => itemOrdenService.getAll(ordenId),
    enabled: !!ordenId && ordenId !== 0 && !isNaN(ordenId),
  });
};

export const useCreateItemOrden = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: itemOrdenService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items_orden'] });
    }
  });
};

export const useModifyItemOrden = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (v: { itemOrdenId: number; ordenId: number; itemOrden: Partial<ItemOrden> }) =>
      itemOrdenService.modify(v),

    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['items_orden', variables.ordenId]
      });

      console.log("Ítem modificado con éxito:", data);
    },
    onError: (error) => {
      console.error("Error al modificar el ítem:", error);
    }
  });
};

export const useDeleteItemOrden = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemOrdenId, ordenId }: { itemOrdenId: number; ordenId: number }) =>
      itemOrdenService.delete({ itemOrdenId, ordenId }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['items_orden', variables.ordenId]
      });
      console.log("Ítem eliminado correctamente");
    },
    onError: (error) => {
      console.error("Error al eliminar el ítem:", error);
    }
  });
};