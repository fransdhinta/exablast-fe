<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">User Dashboard</h1>
    <p>Welcome, {{ auth.user?.name || 'User' }}!</p>
    
    <!-- Your dashboard content -->
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth']
})

const auth = useAuthStore()
</script>