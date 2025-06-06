<template>
  <div class="min-h-screen flex bg-gray-50">
    <!-- Left side - Image/Branding (hidden on small screens) -->
    <div class="hidden lg:flex lg:w-1/2 bg-indigo-600 flex-col justify-between">
      <div class="p-12">
        <h2 class="text-3xl font-bold text-white">Exablast</h2>
      </div>
      <div class="p-12 flex flex-col items-center justify-center flex-grow">
        <img src="/assets/images/login-illustration.png" alt="Login illustration" class="max-w-md mx-auto" 
             onerror="this.onerror=null; this.src='https://placehold.co/600x400/indigo/white?text=Exablast'">
        <h1 class="text-3xl md:text-4xl font-bold text-white mt-8 text-center">
          Welcome back to your productivity hub
        </h1>
        <p class="text-indigo-200 mt-4 text-center max-w-md">
          Access your projects, collaborate with your team, and boost your productivity.
        </p>
      </div>
      <div class="p-8 text-center text-indigo-200 text-sm">
        © {{ new Date().getFullYear() }} Exablast. All rights reserved.
      </div>
    </div>

    <!-- Right side - Login form -->
    <div class="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-24">
      <div class="mb-8 lg:hidden">
        <h2 class="text-3xl font-bold text-indigo-600">Exablast</h2>
      </div>
      
      <div class="max-w-md w-full mx-auto">
        <h2 class="text-3xl font-bold text-gray-800 mb-2">Sign in</h2>
        <p class="text-gray-600 mb-8">Welcome back! Please enter your details.</p>

        <!-- Error alert for failed login -->
        <div v-if="loginError" class="mb-4 bg-red-50 border border-red-200 text-red-800 rounded-lg p-3">
          {{ loginError }}
        </div>
        
        <form @submit.prevent="login" class="space-y-5">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input 
                v-model="email" 
                id="email"
                type="email" 
                required
                placeholder="you@example.com" 
                class="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-150"
              />
            </div>
          </div>
          
          <div>
            <div class="flex justify-between items-center mb-1">
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <NuxtLink to="/forgot-password" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </NuxtLink>
            </div>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input 
                v-model="password" 
                id="password"
                type="password" 
                required
                placeholder="••••••••" 
                class="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-150"
              />
            </div>
          </div>
          
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
            <label for="remember-me" class="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>
          
          <div>
            <button 
              type="submit" 
              class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
              :disabled="isLoggingIn"
            >
              <span v-if="isLoggingIn">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
              <span v-else>Sign in</span>
            </button>
          </div>
        </form>
        
        <div class="mt-10 text-center">
          <p class="text-sm text-gray-600">
            Don't have an account?
            <NuxtLink to="/register" class="font-medium text-indigo-600 hover:text-indigo-500">
              Register now
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const email = ref('')
const password = ref('')
const router = useRouter()
const route = useRoute()
const loginError = ref('')
const isLoggingIn = ref(false)

let auth

onMounted(() => {
  try {
    auth = useAuthStore()
    
    if (auth.token) {
      // Use the redirect query parameter if available
      const redirectPath = route.query.redirect || 
        (auth.isAdmin ? '/admin' : '/dashboard')
      router.push(redirectPath.toString())
    }
  } catch (error) {
    console.error('Failed to access auth store:', error)
  }
})

const login = async () => {
  try {
    // Clear previous errors
    loginError.value = ''
    isLoggingIn.value = true
    
    // Make sure we have access to the store
    if (!auth) {
      auth = useAuthStore()
    }
    
    console.log('Attempting login...')
    const success = await auth.login(email.value, password.value)
    
    if (success) {
      // Only redirect if we have both token AND user data
      if (auth.token && auth.user) {
        console.log('Login successful, user:', auth.user)
        
        // Redirect based on user role
        const redirectPath = route.query.redirect || 
          (auth.isAdmin ? '/admin' : '/dashboard')
        console.log('Redirecting to:', redirectPath)
        router.push(redirectPath.toString())
      } else {
        // We got success=true but no user data - this is suspicious
        console.error('Login returned success but no user data')
        loginError.value = 'Unable to retrieve your account information. Please try again.'
        auth.clearTokens() // Clear any partial auth state
      }
    } else {
      // Handle failed login
      console.log('Login failed')
      loginError.value = auth.error || 'Invalid email or password. Please try again.'
    }
  } catch (e) {
    console.error('Login failed with error:', e)
    loginError.value = 'An error occurred during login. Please try again.'
  } finally {
    isLoggingIn.value = false
  }
}
</script>
