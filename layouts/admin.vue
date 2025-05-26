<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Admin Navigation -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <NuxtLink to="/admin" class="text-2xl font-bold text-indigo-600">Exablast</NuxtLink>
            </div>
            <!-- Desktop Navigation -->
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NuxtLink to="/admin" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Dashboard
              </NuxtLink>
              <NuxtLink to="/admin/exams" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Exams
              </NuxtLink>
              <NuxtLink to="/admin/questions" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Questions
              </NuxtLink>
              <NuxtLink to="/admin/users" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Users
              </NuxtLink>
              <NuxtLink to="/admin/questions/generate" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Generate Questions
              </NuxtLink>
              <NuxtLink to="/profile" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Profile
              </NuxtLink>
            </div>
          </div>
          
          <div class="flex items-center">
            <button @click="logout" class="hidden sm:block ml-3 text-gray-500 hover:text-gray-700">
              Logout
            </button>
            
            <!-- Mobile menu button -->
            <div class="sm:hidden flex items-center">
              <button 
                @click="isMobileMenuOpen = !isMobileMenuOpen" 
                type="button" 
                class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" 
                aria-expanded="false"
              >
                <span class="sr-only">Open main menu</span>
                <!-- Icon when menu is closed -->
                <svg 
                  v-if="!isMobileMenuOpen" 
                  class="block h-6 w-6" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  aria-hidden="true"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <!-- Icon when menu is open -->
                <svg 
                  v-else 
                  class="block h-6 w-6" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  aria-hidden="true"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Mobile menu, show/hide based on menu state -->
      <div v-if="isMobileMenuOpen" class="sm:hidden" id="mobile-menu">
        <div class="pt-2 pb-3 space-y-1">
          <NuxtLink to="/admin" class="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" :class="{ 'bg-indigo-50 border-indigo-500 text-indigo-700': route.path === '/admin', 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800': route.path !== '/admin' }">
            Dashboard
          </NuxtLink>
          <NuxtLink to="/admin/exams" class="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" :class="{ 'bg-indigo-50 border-indigo-500 text-indigo-700': route.path.startsWith('/admin/exams'), 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800': !route.path.startsWith('/admin/exams') }">
            Exams
          </NuxtLink>
          <NuxtLink to="/admin/questions" class="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" :class="{ 'bg-indigo-50 border-indigo-500 text-indigo-700': route.path.startsWith('/admin/questions') && !route.path.includes('/generate'), 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800': !route.path.startsWith('/admin/questions') || route.path.includes('/generate') }">
            Questions
          </NuxtLink>
          <NuxtLink to="/admin/users" class="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" :class="{ 'bg-indigo-50 border-indigo-500 text-indigo-700': route.path.startsWith('/admin/users'), 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800': !route.path.startsWith('/admin/users') }">
            Users
          </NuxtLink>
          <NuxtLink to="/admin/questions/generate" class="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" :class="{ 'bg-indigo-50 border-indigo-500 text-indigo-700': route.path.includes('/generate'), 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800': !route.path.includes('/generate') }">
            Generate Questions
          </NuxtLink>
          <NuxtLink to="/profile" class="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" :class="{ 'bg-indigo-50 border-indigo-500 text-indigo-700': route.path === '/profile', 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800': route.path !== '/profile' }">
            Profile
          </NuxtLink>
          <button @click="logout" class="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block w-full text-left pl-3 pr-4 py-2 border-l-4 text-base font-medium">
            Logout
          </button>
        </div>
      </div>
    </nav>
    
    <!-- Page content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <slot />
    </div>
  </div>
</template>

<script setup>
const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

// State for mobile menu
const isMobileMenuOpen = ref(false)

// Close mobile menu when route changes
watch(() => route.path, () => {
  isMobileMenuOpen.value = false
})

const logout = async () => {
  await auth.logout()
  router.push('/login')
}
</script>