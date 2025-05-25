<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Exams Card -->
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <div class="flex items-center mb-4">
          <div class="bg-indigo-100 p-3 rounded-full">
            <svg class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 class="ml-3 text-lg font-medium text-gray-900">Exams</h2>
        </div>
        <p class="text-gray-600 mb-4">Create and manage your exams</p>
        <NuxtLink to="/admin/exams" class="text-indigo-600 hover:text-indigo-800 font-medium">
          Manage Exams →
        </NuxtLink>
      </div>

      <!-- Questions Card -->
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <div class="flex items-center mb-4">
          <div class="bg-indigo-100 p-3 rounded-full">
            <svg class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 class="ml-3 text-lg font-medium text-gray-900">Questions</h2>
        </div>
        <p class="text-gray-600 mb-4">Create and manage your question bank</p>
        <NuxtLink to="/admin/questions" class="text-indigo-600 hover:text-indigo-800 font-medium">
          Manage Questions →
        </NuxtLink>
      </div>

      <!-- AI Generation Card -->
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <div class="flex items-center mb-4">
          <div class="bg-indigo-100 p-3 rounded-full">
            <svg class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 class="ml-3 text-lg font-medium text-gray-900">AI Question Generator</h2>
        </div>
        <p class="text-gray-600 mb-4">Generate questions with AI</p>
        <NuxtLink to="/admin/generate-questions" class="text-indigo-600 hover:text-indigo-800 font-medium">
          Generate Questions →
        </NuxtLink>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="mt-10">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Overview</h2>
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <div class="flex flex-col md:flex-row justify-between">
          <div class="mb-4 md:mb-0">
            <p class="text-sm font-medium text-gray-500">Total Exams</p>
            <p class="text-3xl font-bold text-gray-900">{{ stats.totalExams || 0 }}</p>
          </div>
          <div class="mb-4 md:mb-0">
            <p class="text-sm font-medium text-gray-500">Total Questions</p>
            <p class="text-3xl font-bold text-gray-900">{{ stats.totalQuestions || 0 }}</p>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500">AI Generated Questions</p>
            <p class="text-3xl font-bold text-gray-900">{{ stats.aiGeneratedQuestions || 0 }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})

const api = useApi()
const stats = ref({
  totalExams: 0,
  totalQuestions: 0,
  aiGeneratedQuestions: 0
})

onMounted(async () => {
  try {
    // This is a placeholder - replace with your actual API endpoint
    const response = await api.get('/dashboard/stats')
    stats.value = response.data || stats.value
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
  }
})
</script>