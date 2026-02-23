import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ordenService } from '../services/ordenService';

export const useOrdenes = () => {
  return useQuery({
    queryKey: ['ordenes'],
    queryFn: ordenService.getAll
  });
};

export const useCreateOrden = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ordenService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ordenes'] })
    }
  })
};

export const useModifyOrden = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ordenService.modify,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ordenes'] })
    }
  })
};

export const useDeleteOrden = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => ordenService.delete(id),
     onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ordenes'] })
    }
  })
};
