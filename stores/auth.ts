import { defineStore } from 'pinia'
import { useAuthApi } from '~/services/authApi'

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refresh_token: string | null;
  loading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    refresh_token: null,
    loading: false,
    error: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin',
    getUser: (state) => state.user
  },

  actions: {
    async login(email: string, password: string) {
      this.loading = true
      this.error = null

      try {
        const authApi = useAuthApi()
        const data = await authApi.login({ email, password })
        console.log('Login response:', data);
        
        this.token = data.access_token
        this.refresh_token = data.refresh_token
        this.user = data.user
        
        // Store tokens in localStorage safely (only client-side)
        this.saveTokens(data.access_token, data.refresh_token)
        
        return true
      } catch (error: any) {
        console.log('Login error:', error);
        
        this.error = error?.message || 'Login failed'
        return false
      } finally {
        this.loading = false
      }
    },

    async register(name: string, email: string, password: string) {
      this.loading = true
      this.error = null

      try {
        const authApi = useAuthApi()
        const data = await authApi.register({ name, email, password })
        
        this.token = data.access_token
        this.refresh_token = data.refresh_token
        this.user = data.user
        
        // Store tokens in localStorage safely (only client-side)
        this.saveTokens(data.access_token, data.refresh_token)
        
        return true
      } catch (error: any) {
        this.error = error?.message || 'Registration failed'
        return false
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        const authApi = useAuthApi()
        await authApi.logout()
      } catch (error) {
        console.error('Error during logout:', error)
      } finally {
        // Clear state and storage regardless of API result
        this.user = null
        this.token = null
        this.refresh_token = null
        this.clearTokens()
      }
    },

    async fetchUser() {
      if (!this.token) return null

      try {
        const authApi = useAuthApi()
        const userData = await authApi.getProfile()
        this.user = userData
        return userData
      } catch (error) {
        console.error('Error fetching user data:', error)
        return null
      }
    },

    // Try to restore session from localStorage
    initAuth() {
      if (process.client) {
        const token = localStorage.getItem('token')
        const refresh_token = localStorage.getItem('refresh_token')
        
        if (token) {
          this.token = token
          this.refresh_token = refresh_token
          this.fetchUser()
        }
      }
    },

    async refreshAuthToken() {
      if (!this.refresh_token) return false
      
      try {
        const authApi = useAuthApi()
        const { access_token, refresh_token } = await authApi.refreshToken(this.refresh_token)
        
        this.token = access_token
        this.refresh_token = refresh_token
        
        this.saveTokens(access_token, refresh_token)
        
        return true
      } catch (error) {
        console.error('Token refresh failed:', error)
        this.logout()
        return false
      }
    },

    // Safe access to localStorage
    saveTokens(token: string, refresh_token: string) {
      if (process.client) {
        localStorage.setItem('token', token)
        localStorage.setItem('refresh_token', refresh_token)
      }
    },

    clearTokens() {
      if (process.client) {
        localStorage.removeItem('token')
        localStorage.removeItem('refresh_token')
      }
    }
  }
})