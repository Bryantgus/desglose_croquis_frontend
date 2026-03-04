import { api } from '../api/axios'

interface Rectangle {
  id: string
  width: number
  height: number
}

interface PackingRequest {
  bin_width: number
  bin_height: number
  rectangles_data: Rectangle[]
}

export const croquisService = {
  calculateCroquis: async (payload: PackingRequest): Promise<unknown> => {
    const { data } = await api.post('/croquis', payload)
    return data
  }
}