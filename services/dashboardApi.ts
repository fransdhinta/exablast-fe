import { useApi } from '~/composables/useApi'

export interface DashboardStats {
  totalExams: number
  totalQuestions: number
  aiGeneratedQuestions: number
  recentAttempts?: any[] // Can be typed more specifically if needed
}

export function useDashboardApi() {
  const api = useApi()

  return {
    /**
     * Get dashboard statistics
     */
    getDashboardStats: async () => {
      try {
        const response = await api.get('/dashboard/stats')
        return response.data as DashboardStats
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error)
        throw error
      }
    }
  }
}