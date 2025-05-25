import { ofetch } from 'ofetch'

export const useApi = () => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()

  // Create a custom fetch instance with base configuration
  const apiFetch = ofetch.create({
    baseURL: config.public.apiBaseUrl || '/api',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    // Add global error handling
    onResponseError({ response }) {
      if (response.status === 401) {
        // Handle unauthorized access
        authStore.logout()
        navigateTo('/login')
      }
    },
  })

  // Request interceptor to add auth token
  const fetchWithAuth = (url: string, options: any = {}) => {
    const token = useCookie('token').value
    
    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      }
    }
    
    return apiFetch(url, options)
  }

  return {
    get: (url: string, params = {}) => fetchWithAuth(url, { method: 'GET', params }),
    post: (url: string, data = {}) => fetchWithAuth(url, { method: 'POST', body: data }),
    put: (url: string, data = {}) => fetchWithAuth(url, { method: 'PUT', body: data }),
    delete: (url: string) => fetchWithAuth(url, { method: 'DELETE' }),
  }
}