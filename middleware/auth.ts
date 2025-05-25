export default defineNuxtRouteMiddleware(async (to) => {
  // Skip middleware on server-side to avoid redirects during SSR
  if (process.server) return
  
  // Safely access the auth store
  let auth
  try {
    auth = useAuthStore()
  } catch (error) {
    // If we can't access the store, redirect to login
    console.error('Failed to access auth store:', error)
    return navigateTo('/login')
  }
  
  // Force auth initialization (in case plugin hasn't run yet)
  if (!auth.token && process.client) {
    auth.initAuth()
  }

  // Check if authenticated
  if (!auth.token) {
    return navigateTo({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }
  
  // If we have a token but no user, try to fetch user data
  if (auth.token && !auth.user) {
    try {
      await auth.fetchUser()
      
      // If we can't get user data, token is likely invalid
      if (!auth.user) {
        auth.logout()
        return navigateTo({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error)
      auth.logout()
      return navigateTo({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  }
  
  // If this is an admin route, check for admin role
  if (to.path.startsWith('/admin') && !auth.isAdmin) {
    return navigateTo('/dashboard')
  }
})