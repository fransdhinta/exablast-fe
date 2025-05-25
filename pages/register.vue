<template>
  <div class="min-h-screen flex bg-gray-50">
    <!-- Left side - Image/Branding (hidden on small screens) -->
    <div class="hidden lg:flex lg:w-1/2 bg-indigo-600 flex-col justify-between">
      <div class="p-12">
        <h2 class="text-3xl font-bold text-white">Exablast</h2>
      </div>
      <div class="p-12 flex flex-col items-center justify-center flex-grow">
        <img src="/assets/images/login-illustration.png" alt="Register illustration" class="max-w-md mx-auto" 
             onerror="this.onerror=null; this.src='https://placehold.co/600x400/indigo/white?text=Exablast'">
        <h1 class="text-3xl md:text-4xl font-bold text-white mt-8 text-center">
          Join our productivity revolution
        </h1>
        <p class="text-indigo-200 mt-4 text-center max-w-md">
          Create your account and start achieving more with less effort. Streamline your workflow today.
        </p>
      </div>
      <div class="p-8 text-center text-indigo-200 text-sm">
        © {{ new Date().getFullYear() }} Exablast. All rights reserved.
      </div>
    </div>

    <!-- Right side - Registration form -->
    <div class="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-24">
      <div class="mb-8 lg:hidden">
        <h2 class="text-3xl font-bold text-indigo-600">Exablast</h2>
      </div>
      
      <div class="max-w-md w-full mx-auto">
        <h2 class="text-3xl font-bold text-gray-800 mb-2">Create an account</h2>
        <p class="text-gray-600 mb-8">Start your productivity journey with Exablast.</p>
        
        <form @submit.prevent="register" class="space-y-5">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input 
                v-model="name" 
                id="name"
                type="text" 
                required
                placeholder="John Doe" 
                class="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-150"
              />
            </div>
          </div>
          
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
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
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
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
              <p class="mt-1 text-xs text-gray-500">Password must be at least 8 characters</p>
            </div>
          </div>
          
          <div class="flex items-center">
            <input id="terms" name="terms" type="checkbox" required class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
            <label for="terms" class="ml-2 block text-sm text-gray-700">
              I agree to the <a href="#" class="text-indigo-600 hover:text-indigo-500">Terms of Service</a> and <a href="#" class="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
            </label>
          </div>
          
          <div>
            <button 
              type="submit" 
              class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
            >
              Create Account
            </button>
          </div>
        </form>
        
        <div class="mt-10 text-center">
          <p class="text-sm text-gray-600">
            Already have an account?
            <NuxtLink to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const name = ref('')
const email = ref('')
const password = ref('')
const auth = useAuthStore()
const router = useRouter()

const register = async () => {
  try {
    await auth.register(name.value, email.value, password.value, "USER")
    router.push('/login')
  } catch (e) {
    alert('Registration failed')
  }
}
</script>
