import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: useCookie('token'),
    user: null as any,
  }),
  actions: {
    async login(email: string, password: string) {
      const data = await useApi().post('/auth/login', { email, password })
      if (!data.access_token) {
        throw new Error('Login failed')
      }
      this.token = data.access_token
    },
    async register(email: string, name: string, password: string, role: string) {
      await useApi().post('/auth/register', { email, name, password, role })
    },
    logout() {
      this.token = null
    },
  },
})