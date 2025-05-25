import { useApi } from '~/composables/useApi'

export interface LoginInput {
  email: string
  password: string
}

export interface RegisterInput {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  user: {
    id: string
    name: string
    email: string
    role: string
  }
  access_token: string
  refresh_token: string
}

export function useAuthApi() {
  const api = useApi()

  return {
    /**
     * Login with email and password
     */
    login: async (credentials: LoginInput) => {
      try {
        const response = await api.post('/auth/login', credentials)
        return response.data as AuthResponse
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    },

    /**
     * Register a new user
     */
    register: async (userData: RegisterInput) => {
      console.log('Registering user with data:', userData);
      
      try {
        const response = await api.post('/auth/register', userData)
        return response.data as AuthResponse
      } catch (error) {
        console.error('Registration failed:', error)
        throw error
      }
    },

    /**
     * Refresh access token using refresh token
     */
    refreshToken: async (refreshToken: string) => {
      try {
        const response = await api.post('/auth/refresh-token', { refreshToken })
        return response.data as Pick<AuthResponse, 'access_token' | 'refresh_token'>
      } catch (error) {
        console.error('Token refresh failed:', error)
        throw error
      }
    },

    /**
     * Get current user profile
     */
    getProfile: async () => {
      try {
        const response = await api.get('/auth/profile')
        return response.data
      } catch (error) {
        console.error('Failed to fetch user profile:', error)
        throw error
      }
    },

    /**
     * Logout user (invalidate refresh token)
     */
    logout: async () => {
      try {
        await api.post('/auth/logout')
        return true
      } catch (error) {
        console.error('Logout failed:', error)
        return false
      }
    }
  }
}