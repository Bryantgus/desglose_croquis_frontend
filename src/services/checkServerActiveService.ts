import { api } from '../api/axios'

export const checkServerActive = {
  serverActive: async (): Promise<unknown> => { 
    const { data } = await api.get('/server_active'); 
    return data;
  }
}