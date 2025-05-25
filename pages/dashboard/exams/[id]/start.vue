<template>
  <div class="bg-gray-50 min-h-screen py-8">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="loading" class="text-center py-12">
        <div class="spinner"></div>
        <p class="mt-4 text-gray-600">Loading exam details...</p>
      </div>
      
      <div v-else-if="error" class="text-center py-12">
        <div class="bg-red-50 p-4 rounded-md">
          <p class="text-red-700">{{ error }}</p>
          <button @click="fetchExamDetails" class="mt-4 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-md">
            Try Again
          </button>
          <div class="mt-4">
            <NuxtLink to="/dashboard/exams" class="text-indigo-600 hover:text-indigo-500">
              Back to exams
            </NuxtLink>
          </div>
        </div>
      </div>
      
      <div v-else class="bg-white shadow-lg rounded-lg overflow-hidden">
        <div class="p-6">
          <div class="text-center mb-8">
            <h1 class="text-2xl font-bold text-gray-900">{{ exam.title }}</h1>
            <p v-if="exam.description" class="mt-2 text-gray-600">{{ exam.description }}</p>
          </div>
          
          <div class="border-t border-b border-gray-200 py-6">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Exam Details</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex items-center">
                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-gray-700">Duration: <strong>{{ exam.duration }} minutes</strong></span>
              </div>
              
              <div class="flex items-center">
                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-gray-700">Questions: <strong>{{ exam.questions?.length || 0 }}</strong></span>
              </div>
              
              <div class="flex items-center">
                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-gray-700">Passing score: <strong>70%</strong></span>
              </div>
              
              <div class="flex items-center">
                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-gray-700">Instructions: <strong>Read each question carefully</strong></span>
              </div>
            </div>
          </div>
          
          <div class="mt-8">
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm text-yellow-700">
                    Once you start the exam, the timer will begin and cannot be paused. Make sure you have enough time to complete the exam.
                  </p>
                </div>
              </div>
            </div>
            
            <div class="text-center">
              <button 
                @click="beginExam" 
                :disabled="startingExam"
                class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {{ startingExam ? 'Starting...' : 'Begin Exam' }}
              </button>
              <div class="mt-4">
                <NuxtLink to="/dashboard/exams" class="text-indigo-600 hover:text-indigo-500">
                  Back to exams
                </NuxtLink>
              </div>
            </div>
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

const route = useRoute()
const router = useRouter()
const api = useApi()
const examId = route.params.id

const loading = ref(true)
const error = ref(null)
const startingExam = ref(false)
const exam = ref({
  title: '',
  description: '',
  duration: 0,
  questions: []
})

onMounted(() => {
  fetchExamDetails()
})

async function fetchExamDetails() {
  loading.value = true
  error.value = null
  
  try {
    const response = await api.get(`/exams/${examId}`)
    exam.value = response.data
  } catch (err) {
    console.error('Error fetching exam details:', err)
    error.value = 'Failed to load exam details. Please try again.'
  } finally {
    loading.value = false
  }
}

async function beginExam() {
  startingExam.value = true
  
  try {
    // Step 1: Create an attempt using the API
    const response = await api.post('/attempts', {
      examId: examId
    })
    
    const attemptId = response.data.id
    
    // Step 2: Navigate to the exam take page with the attempt ID
    router.push(`/dashboard/exams/${examId}/take?attempt=${attemptId}`)
  } catch (error) {
    console.error('Error starting exam:', error)
    alert('Failed to start the exam. Please try again.')
    startingExam.value = false
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