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
            >
              Sign in
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
const auth = useAuthStore()
const router = useRouter()

onMounted(() => {
  if (auth.token) {
    router.push('/admin') // Redirect to admin if already authenticated
  }
})

const login = async () => {
  try {
    const success = await auth.login(email.value, password.value)
    if (success) {
      console.log('Login successful');
      
      router.push('/admin') // Redirect to admin dashboard
    }
  } catch (e) {
    console.error('Login failed:', e)
  }
}
</script>
