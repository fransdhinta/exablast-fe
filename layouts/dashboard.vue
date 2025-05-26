<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Dashboard Navigation -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <NuxtLink to="/dashboard" class="text-2xl font-bold text-indigo-600">Exablast</NuxtLink>
            </div>
            <!-- Desktop Navigation -->
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NuxtLink to="/dashboard" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" :class="{'border-indigo-500 text-indigo-600': route.path === '/dashboard'}">
                Dashboard
              </NuxtLink>
              <NuxtLink to="/dashboard/exams" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" :class="{'border-indigo-500 text-indigo-600': route.path.startsWith('/dashboard/exams')}">
                My Exams
              </NuxtLink>
              <NuxtLink to="/profile" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" :class="{'border-indigo-500 text-indigo-600': route.path === '/profile'}">
                Profile
              </NuxtLink>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <!-- User name (desktop only) -->
            <div class="hidden sm:flex items-center text-sm text-gray-700">
              <span>{{ auth.user?.name || 'User' }}</span>
            </div>
            <!-- Logout button (desktop only) -->
            <button @click="logout" class="hidden sm:block text-gray-500 hover:text-gray-700">
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
        <!-- User info section -->
        <div class="pt-2 pb-1 border-b border-gray-200">
          <div class="flex items-center px-4">
            <div class="flex-shrink-0">
              <div class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <span class="text-indigo-800 font-medium">{{ getUserInitials() }}</span>
              </div>
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-gray-800">{{ auth.user?.name || 'User' }}</div>
              <div class="text-sm font-medium text-gray-500">{{ auth.user?.email || '' }}</div>
            </div>
          </div>
        </div>
        
        <!-- Navigation links -->
        <div class="pt-2 pb-3 space-y-1">
          <NuxtLink to="/dashboard" class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium" 
                   :class="route.path === '/dashboard' ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'">
            Dashboard
          </NuxtLink>
          <NuxtLink to="/dashboard/exams" class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                   :class="route.path.startsWith('/dashboard/exams') ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'">
            My Exams
          </NuxtLink>
          <NuxtLink to="/profile" class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                   :class="route.path === '/profile' ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'">
            Profile
          </NuxtLink>
          <button @click="logout" class="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
            Logout
          </button>
        </div>
      </div>
    </nav>
    
    <!-- Page content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-grow">
      <slot />
    </div>
    
    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="text-center text-sm text-gray-500">
          © {{ new Date().getFullYear() }} Exablast. All rights reserved.
        </div>
      </div>
    </footer>
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

// Get user initials for avatar
function getUserInitials() {
  const name = auth.user?.name || 'User'
  return name
    .split(' ')
    .map(part => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

const logout = async () => {
  await auth.logout()
  router.push('/login')
}
</script>