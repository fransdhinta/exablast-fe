import { useAuthStore } from '~/stores/auth'
import { useRuntimeConfig } from '#app'

export function useApi() {
  const config = useRuntimeConfig()
  const auth = useAuthStore()
  const router = useRouter()

  const baseURL = config.public.apiBaseUrl

  const api = {
    async get(url: string, params = {}) {
      const queryParams = new URLSearchParams(
        Object.entries(params).filter(([_, v]) => v !== undefined) as [string, string][]
      ).toString()
      const queryString = queryParams ? `?${queryParams}` : ''
      return this.request('GET', `${url}${queryString}`)
    },

    async post(url: string, data?: any) {
      return this.request('POST', url, data)
    },

    async put(url: string, data?: any) {
      return this.request('PUT', url, data)
    },

    async patch(url: string, data?: any) {
      return this.request('PATCH', url, data)
    },

    async delete(url: string) {
      return this.request('DELETE', url)
    },

    async request(method: string, url: string, data?: any) {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      }

      // Add auth token if available
      if (auth.token) {
        headers['Authorization'] = `Bearer ${auth.token}`
      }

      try {
        const response = await fetch(`${baseURL}${url}`, {
          method,
          headers,
          body: data ? JSON.stringify(data) : undefined
        })

        // Handle 401 Unauthorized - token expired or invalid
        if (response.status === 401) {
          auth.logout()
          router.push('/login')
          throw new Error('Session expired. Please login again.')
        }

        // Handle other API errors
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.message || `API error: ${response.status}`)
        }

        // Return successful response
        const responseData = await response.json().catch(() => ({}))
        return {
          data: responseData,
          status: response.status
        }
      } catch (error) {
        console.error(`API ${method} ${url} failed:`, error)
        throw error
      }
    }
  }

  return api
}