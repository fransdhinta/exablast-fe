<template>
  <div class="bg-gray-50 min-h-screen py-8">
    <div class="max-w-7xl mx-auto mx-5 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p class="mt-2 text-lg text-gray-600">Welcome back, {{ auth.user?.name || 'User' }}!</p>

      <!-- Recent Exam Attempts -->
      <div class="mt-8">
        <h2 class="text-xl font-semibold text-gray-900">Recent Exam Attempts</h2>
        
        <div v-if="loading" class="mt-4 text-center py-12">
          <div class="spinner"></div>
          <p class="mt-4 text-gray-600">Loading your exam history...</p>
        </div>
        
        <div v-else-if="error" class="mt-4 bg-red-50 p-4 rounded-md">
          <p class="text-red-700">{{ error }}</p>
          <button @click="fetchExamAttempts" class="mt-2 text-red-700 underline">Try again</button>
        </div>
        
        <div v-else-if="examAttempts.length === 0" class="mt-4 bg-white rounded-lg shadow-sm p-6 text-center">
          <p class="text-gray-500">You haven't taken any exams yet.</p>
          <NuxtLink to="/dashboard/exams" class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
            View Available Exams
          </NuxtLink>
        </div>
        
        <div v-else class="mt-4 bg-white rounded-lg shadow-sm">
          <ul class="divide-y divide-gray-200">
            <li v-for="attempt in examAttempts" :key="attempt.id" class="px-6 py-5 hover:bg-gray-50">
              <div class="flex justify-between items-center">
                <div>
                  <h3 class="text-lg font-medium text-gray-900">{{ attempt.exam?.title || 'Untitled Exam' }}</h3>
                  <div class="mt-1 flex items-center text-sm text-gray-500">
                    <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                    </svg>
                    {{ formatDate(attempt.endedAt || attempt.startedAt) }}
                  </div>
                </div>
                
                <div class="flex items-center">
                  <div v-if="attempt.score !== null" class="mr-6 text-center">
                    <div class="text-xl font-bold" :class="attempt.score >= 70 ? 'text-green-600' : 'text-red-600'">
                      {{ attempt.score }}%
                    </div>
                    <div class="text-xs text-gray-500">Score</div>
                  </div>
                  
                  <div v-if="attempt.endedAt" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" 
                       :class="attempt.score >= 70 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                    {{ attempt.score >= 70 ? 'Passed' : 'Failed' }}
                  </div>
                  
                  <div v-else class="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium">
                    In Progress
                  </div>
                  
                  <NuxtLink 
                    :to="attempt.endedAt ? `/dashboard/exams/results/${attempt.id}` : `/dashboard/exams/${attempt.examId}/take?attempt=${attempt.id}`" 
                    class="ml-6 text-indigo-600 hover:text-indigo-900"
                  >
                    {{ attempt.endedAt ? 'View Results' : 'Continue Exam' }}
                  </NuxtLink>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Available Exams -->
      <div class="mt-12">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-900">Available Exams</h2>
          <NuxtLink to="/dashboard/exams" class="text-indigo-600 hover:text-indigo-900">
            View All
          </NuxtLink>
        </div>
        
        <div v-if="loadingExams" class="mt-4 text-center py-12">
          <div class="spinner"></div>
          <p class="mt-4 text-gray-600">Loading available exams...</p>
        </div>
        
        <div v-else-if="examsError" class="mt-4 bg-red-50 p-4 rounded-md">
          <p class="text-red-700">{{ examsError }}</p>
          <button @click="fetchAvailableExams" class="mt-2 text-red-700 underline">Try again</button>
        </div>
        
        <div v-else-if="availableExams.length === 0" class="mt-4 bg-white rounded-lg shadow-sm p-6 text-center">
          <p class="text-gray-500">No exams available at this time.</p>
        </div>
        
        <div v-else class="mt-4 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="exam in availableExams.slice(0, 3)" :key="exam.id" class="bg-white shadow rounded-lg overflow-hidden">
            <div class="p-6">
              <h3 class="text-lg font-medium text-gray-900 mb-2">{{ exam.title }}</h3>
              <p class="text-gray-500 mb-4 line-clamp-2">{{ exam.description || 'No description available.' }}</p>
              
              <div class="flex items-center text-sm text-gray-500 mb-4">
                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ exam.duration }} minutes</span>
                
                <svg class="flex-shrink-0 ml-4 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ exam.questions?.length || 0 }} questions</span>
              </div>
              
              <NuxtLink :to="`/dashboard/exams/${exam.id}/start`" class="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                Start Exam
              </NuxtLink>
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

const auth = useAuthStore()
const api = useApi()

const loading = ref(true)
const error = ref(null)
const loadingExams = ref(true)
const examsError = ref(null)
const examAttempts = ref([])
const availableExams = ref([])

onMounted(async () => {
  fetchExamAttempts()
  fetchAvailableExams()
})

async function fetchExamAttempts() {
  loading.value = true
  error.value = null
  
  try {
    const response = await api.get('/attempts')
    examAttempts.value = response.data || []
    
    // Sort attempts by date (newest first)
    examAttempts.value.sort((a, b) => {
      const dateA = new Date(a.endedAt || a.startedAt)
      const dateB = new Date(b.endedAt || b.startedAt)
      return dateB - dateA
    })
  } catch (err) {
    console.error('Error fetching exam attempts:', err)
    error.value = 'Failed to load your exam history. Please try again.'
  } finally {
    loading.value = false
  }
}

async function fetchAvailableExams() {
  loadingExams.value = true
  examsError.value = null
  
  try {
    const response = await api.get('/exams')
    availableExams.value = response.data || []
  } catch (err) {
    console.error('Error fetching available exams:', err)
    examsError.value = 'Failed to load available exams. Please try again.'
  } finally {
    loadingExams.value = false
  }
}

function formatDate(dateString) {
  if (!dateString) return 'N/A'
  
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
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

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>