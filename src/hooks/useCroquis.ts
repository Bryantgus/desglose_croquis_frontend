import { useMutation } from '@tanstack/react-query'
import { croquisService } from '../services/croquisService'

export const useCalculateCroquis = () => {
  return useMutation({
    mutationFn: croquisService.calculateCroquis,
    onSuccess: (data) => {
      console.log('Packing result:', data)
    },
    onError: (error) => {
      console.error('Error:', error)
    }
  })
}