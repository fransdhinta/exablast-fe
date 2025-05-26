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
      
      // If we still don't have user data after fetch attempt
      if (!auth.user) {
        console.warn('Auth token present but unable to fetch user data')
        // Only logout if we're not on login page already (prevents loops)
        if (!to.path.startsWith('/login')) {
          auth.logout()
          return navigateTo({
            path: '/login',
            query: { redirect: to.fullPath }
          })
        }
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error)
      // Only logout if we're not on login page already
      if (!to.path.startsWith('/login')) {
        auth.logout()
        return navigateTo({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      }
    }
  }
  
  // If this is an admin route, check for admin role
  if (to.path.startsWith('/admin') && !auth.isAdmin) {
    return navigateTo('/dashboard')
  }
})