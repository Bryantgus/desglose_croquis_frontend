import { api } from '../api/axios'
import type { Orden } from '../types/Orden'

export const ordenService = {
  create: async (orden: Partial<Orden>): Promise<Orden> => {
    const { data } = await api.post('/orden', orden)
    return data
  },

  getAll: async (): Promise<Orden[]> => {
    const { data } = await api.get('/orden');
    return data
  },

  modify: async ({ id, orden }: { id: number, orden: Partial<Orden>}): Promise<Orden> => {
    const { data } = await api.patch(`/orden/${id}`, orden)
    return data
  }

}
