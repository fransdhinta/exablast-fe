export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  
  // Skip middleware for login and register pages
  if (to.path === '/login' || to.path === '/register') {
    return
  }
  
  console.log("JOKOWI ", authStore.token);
  
  // Redirect to login if no token exists
  if (!authStore.token) {
    return navigateTo('/login')
  }
})