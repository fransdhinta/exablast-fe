<template>
  <div class="bg-gray-50 min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-3xl font-extrabold text-gray-900">Available Exams</h1>
        <p class="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Select an exam to begin testing your knowledge
        </p>
      </div>

      <div class="mt-12">
        <div v-if="loading" class="text-center py-12">
          <div class="spinner"></div>
          <p class="mt-4 text-gray-600">Loading available exams...</p>
        </div>
        
        <div v-else-if="error" class="text-center py-12">
          <div class="bg-red-50 p-4 rounded-md">
            <p class="text-red-700">{{ error }}</p>
            <button @click="fetchExams" class="mt-4 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-md">
              Try Again
            </button>
          </div>
        </div>
        
        <div v-else-if="exams.length === 0" class="text-center py-12">
          <p class="text-gray-600">No exams available at this time. Please check back later.</p>
        </div>
        
        <div v-else class="grid gap-6 lg:grid-cols-2">
          <div v-for="exam in exams" :key="exam.id" class="bg-white shadow-md rounded-lg overflow-hidden">
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900">{{ exam.title }}</h3>
              <p class="mt-2 text-gray-600">{{ exam.description || 'No description available.' }}</p>
              
              <div class="mt-4 flex items-center text-sm text-gray-500">
                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ exam.duration }} minutes</span>
                
                <svg class="flex-shrink-0 ml-4 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ exam.questions.length || 0 }} questions</span>
              </div>
              
              <div class="mt-6">
                <button 
                  @click="startExam(exam.id)" 
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Start Exam
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAttemptsApi } from '~/services/attemptsApi'

definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard'
})

const router = useRouter()
const api = useApi()
const loading = ref(true)
const error = ref(null)
const exams = ref([])

onMounted(() => {
  fetchExams()
})

async function fetchExams() {
  loading.value = true
  error.value = null
  
  try {
    const response = await api.get('/exams')
    exams.value = response.data || []
  } catch (err) {
    console.error('Error fetching exams:', err)
    error.value = 'Failed to load exams. Please try again.'
  } finally {
    loading.value = false
  }
}

function startExam(examId) {
  router.push(`/dashboard/exams/${examId}/start`)
}

async function fetchExamAttempts() {
  try {
    const attemptsApi = useAttemptsApi()
    const attempts = await attemptsApi.getUserAttempts()
    examAttempts.value = attempts || []
  } catch (err) {
    console.error('Error fetching exam attempts:', err)
  } finally {
    loading.value = false
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