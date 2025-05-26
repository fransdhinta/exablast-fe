import { useApi } from '~/composables/useApi'

export interface User {
  id: string
  name: string
  email: string
  role: string
  active: boolean
  createdAt: string
  attemptCount?: number
}

export interface UserStats {
  totalUsers: number
  activeUsers: number
  admins: number
}

export function useAdminUsersApi() {
  const api = useApi()

  return {
    /**
     * Get all users
     */
    getUsers: async () => {
      try {
        const response = await api.get('/admin/users')
        return response.data as User[]
      } catch (error) {
        console.error('Failed to fetch users:', error)
        throw error
      }
    },

    /**
     * Update user role
     */
    updateUserRole: async (userId: string, role: string) => {
      try {
        const response = await api.put(`/admin/users/${userId}/role`, { role })
        return response.data
      } catch (error) {
        console.error(`Failed to update user ${userId} role:`, error)
        throw error
      }
    },

    /**
     * Toggle user active status
     */
    toggleUserStatus: async (userId: string, active: boolean) => {
      try {
        const response = await api.put(`/admin/users/${userId}/status`, { active })
        return response.data
      } catch (error) {
        console.error(`Failed to update user ${userId} status:`, error)
        throw error
      }
    },

    /**
     * Reset user password
     */
    resetPassword: async (userId: string) => {
      try {
        const response = await api.post(`/admin/users/${userId}/reset-password`)
        return response.data
      } catch (error) {
        console.error(`Failed to reset password for user ${userId}:`, error)
        throw error
      }
    },

    /**
     * Get user statistics
     */
    getUserStats: async () => {
      try {
        const response = await api.get('/admin/users/stats')
        return response.data as UserStats
      } catch (error) {
        console.error('Failed to fetch user stats:', error)
        throw error
      }
    }
  }
}