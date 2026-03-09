import { api } from '../api/axios'
import type { ItemOrden } from '../types/ItemOrden'

export const itemOrdenService = {

  create: async ({ ordenId, itemOrden }: { ordenId: number, itemOrden: Omit<ItemOrden, 'id'> }): Promise<ItemOrden> => {
    const { data } = await api.post(`/item_orden/${ordenId}`, itemOrden);
    return data;
  },

  getAll: async (ordenId: number): Promise<Record<string, ItemOrden[]>> => {
    const { data } = await api.get(`/item_orden/${ordenId}`);
    return data
  },

  modify: async ({ itemOrdenId, ordenId, itemOrden }: { itemOrdenId: number, ordenId: number, itemOrden: Partial<ItemOrden> }): Promise<ItemOrden> => {
    const { data } = await api.patch(`/item_orden/${itemOrdenId}/orden/${ordenId}`, itemOrden)
    return data
  },

  delete: async ({ itemOrdenId, ordenId }: { itemOrdenId: number; ordenId: number }): Promise<void> => {
    await api.delete(`/item_orden/${itemOrdenId}/orden/${ordenId}`);
  }
}