export default defineNuxtPlugin({
  name: 'auth-plugin',
  // Setting enforce to pre will cause this plugin to run before others
  enforce: 'default',
  async setup() {
    const auth = useAuthStore()
    
    // Load tokens from localStorage
    auth.initAuth()
    
    // If we have a token but no user, fetch the user data
    if (auth.token && !auth.user) {
      try {
        await auth.fetchUser()
      } catch (error) {
        console.error('Failed to fetch user data:', error)
        // If we can't fetch user data, token might be invalid
        auth.logout()
      }
    }
  }
})