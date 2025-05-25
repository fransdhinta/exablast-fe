<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 mb-6">My Profile</h1>

    <div class="bg-white shadow-sm rounded-lg p-6">
      <div v-if="loading" class="text-center py-12">
        <div class="spinner"></div>
        <p class="mt-4 text-gray-600">Loading profile...</p>
      </div>
      
      <div v-else>
        <div class="mb-8">
          <div class="flex items-center">
            <div class="bg-indigo-100 rounded-full p-3 mr-4">
              <svg class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-semibold">{{ user.name }}</h2>
              <p class="text-gray-600">{{ user.email }}</p>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-200 pt-6">
          <h3 class="text-lg font-medium mb-4">Account Information</h3>
          
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                v-model="user.name"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                v-model="user.email"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
                readonly
              />
            </div>
          </div>
          
          <div class="mt-6">
            <button
              @click="updateProfile"
              :disabled="saving"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {{ saving ? 'Saving...' : 'Update Profile' }}
            </button>
          </div>
        </div>
        
        <div class="border-t border-gray-200 mt-8 pt-6">
          <h3 class="text-lg font-medium mb-4">Change Password</h3>
          
          <div class="space-y-4 max-w-md">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input
                type="password"
                v-model="passwordForm.currentPassword"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                v-model="passwordForm.newPassword"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                v-model="passwordForm.confirmPassword"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          
          <div class="mt-6">
            <button
              @click="updatePassword"
              :disabled="changingPassword"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {{ changingPassword ? 'Updating...' : 'Change Password' }}
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
  layout: 'dashboard'
})

const auth = useAuthStore()
const api = useApi()

const loading = ref(true)
const saving = ref(false)
const changingPassword = ref(false)
const user = ref({
  name: '',
  email: '',
})

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

onMounted(async () => {
  try {
    // Get user profile data
    if (auth.user) {
      user.value = { ...auth.user }
    } else {
      const userData = await auth.fetchUser()
      user.value = userData || { name: '', email: '' }
    }
  } catch (error) {
    console.error('Failed to load profile:', error)
  } finally {
    loading.value = false
  }
})

async function updateProfile() {
  saving.value = true
  try {
    await api.put('/user/profile', {
      name: user.value.name
    })
    
    // Update the auth store user data
    if (auth.user) {
      auth.user.name = user.value.name
    }
    
    alert('Profile updated successfully')
  } catch (error) {
    console.error('Failed to update profile:', error)
    alert('Failed to update profile. Please try again.')
  } finally {
    saving.value = false
  }
}

async function updatePassword() {
  // Basic validation
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    alert('New passwords do not match')
    return
  }
  
  if (passwordForm.value.newPassword.length < 6) {
    alert('Password must be at least 6 characters')
    return
  }
  
  changingPassword.value = true
  try {
    await api.put('/user/password', {
      currentPassword: passwordForm.value.currentPassword,
      newPassword: passwordForm.value.newPassword
    })
    
    // Reset form
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
    
    alert('Password updated successfully')
  } catch (error) {
    console.error('Failed to update password:', error)
    alert('Failed to update password. Please check your current password and try again.')
  } finally {
    changingPassword.value = false
  }
}
</script>

<style scoped>
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #818cf8;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>