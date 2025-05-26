<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold text-gray-900">User Management</h1>
    </div>
    
    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <p class="text-sm font-medium text-gray-500">Total Users</p>
        <p class="text-3xl font-bold text-gray-900">{{ userStats.totalUsers || 0 }}</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <p class="text-sm font-medium text-gray-500">Active Users</p>
        <p class="text-3xl font-bold text-gray-900">{{ userStats.activeUsers || 0 }}</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <p class="text-sm font-medium text-gray-500">Admins</p>
        <p class="text-3xl font-bold text-gray-900">{{ userStats.admins || 0 }}</p>
      </div>
    </div>
    
    <!-- Users Table -->
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <div class="flex justify-between px-4 py-5 sm:px-6 border-b border-gray-200">
        <h2 class="text-lg leading-6 font-medium text-gray-900">All Users</h2>
        <div class="relative flex items-center">
          <input
            type="text"
            placeholder="Search users"
            v-model="searchTerm"
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      
      <div v-if="loading" class="p-4 text-center">Loading users...</div>
      
      <div v-else-if="!filteredUsers.length" class="p-8 text-center text-gray-500">
        No users found. {{ searchTerm ? 'Try a different search term.' : '' }}
      </div>
      
      <div v-else>
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Exams Taken
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in filteredUsers" :key="user.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span class="text-indigo-700 font-medium text-sm">{{ getUserInitials(user.name) }}</span>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                    <div class="text-sm text-gray-500">{{ user.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <select 
                  v-model="user.role" 
                  @change="updateUserRole(user)"
                  class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  :disabled="user.id === auth.user?.id"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  :class="user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                >
                  {{ user.active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(user.createdAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ user.attemptCount || 0 }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button 
                  @click="toggleUserStatus(user)"
                  class="text-indigo-600 hover:text-indigo-900 mr-4"
                  :disabled="user.id === auth.user?.id"
                >
                  {{ user.active ? 'Deactivate' : 'Activate' }}
                </button>
                <button 
                  v-if="user.id !== auth.user?.id"
                  @click="resetPassword(user)" 
                  class="text-indigo-600 hover:text-indigo-900"
                >
                  Reset Password
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div class="text-sm text-gray-500">
            Showing {{ filteredUsers.length }} of {{ users.length }} users
          </div>
          <div class="flex-1 flex justify-end">
            <button
              @click="loadUsers"
              class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth'],
  layout: 'admin'
})

const auth = useAuthStore()
const api = useApi()

const loading = ref(true)
const users = ref([])
const searchTerm = ref('')
const userStats = ref({
  totalUsers: 0,
  activeUsers: 0,
  admins: 0
})

onMounted(() => {
  loadUsers()
})

async function loadUsers() {
  loading.value = true
  
  try {
    const response = await api.get('/admin/users')
    users.value = response.data || []
    
    // Calculate stats
    userStats.value = {
      totalUsers: users.value.length,
      activeUsers: users.value.filter(user => user.active).length,
      admins: users.value.filter(user => user.role === 'admin').length
    }
  } catch (error) {
    console.error('Error loading users:', error)
    alert('Failed to load users. Please try again.')
  } finally {
    loading.value = false
  }
}

async function updateUserRole(user) {
  try {
    await api.put(`/admin/users/${user.id}/role`, { role: user.role })
    alert(`User role updated to ${user.role}`)
  } catch (error) {
    console.error('Error updating user role:', error)
    alert('Failed to update user role. Please try again.')
    // Reset to previous value
    const originalUser = users.value.find(u => u.id === user.id)
    if (originalUser) {
      user.role = originalUser.role
    }
  }
}

async function toggleUserStatus(user) {
  if (user.id === auth.user?.id) {
    alert('You cannot deactivate your own account')
    return
  }
  
  try {
    const newStatus = !user.active
    await api.put(`/admin/users/${user.id}/status`, { active: newStatus })
    user.active = newStatus
    
    // Update stats
    userStats.value.activeUsers = users.value.filter(user => user.active).length
    
    alert(`User ${user.active ? 'activated' : 'deactivated'} successfully`)
  } catch (error) {
    console.error('Error updating user status:', error)
    alert('Failed to update user status. Please try again.')
  }
}

async function resetPassword(user) {
  if (!confirm(`Are you sure you want to reset password for ${user.name}?`)) {
    return
  }
  
  try {
    const response = await api.post(`/admin/users/${user.id}/reset-password`)
    const tempPassword = response.data.temporaryPassword
    alert(`Password reset successful. Temporary password: ${tempPassword}`)
  } catch (error) {
    console.error('Error resetting password:', error)
    alert('Failed to reset password. Please try again.')
  }
}

function getUserInitials(name) {
  if (!name) return '?'
  
  return name
    .split(' ')
    .map(part => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function formatDate(dateString) {
  if (!dateString) return 'N/A'
  
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const filteredUsers = computed(() => {
  if (!searchTerm.value) {
    return users.value
  }
  
  const term = searchTerm.value.toLowerCase()
  return users.value.filter(user => {
    return (
      user.name.toLowerCase().includes(term) || 
      user.email.toLowerCase().includes(term)
    )
  })
})
</script>