<template>
  <div class="bg-gray-50 min-h-screen py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="loading" class="text-center py-12">
        <div class="spinner"></div>
        <p class="mt-4 text-gray-600">Loading exam results...</p>
      </div>
      
      <div v-else-if="error" class="text-center py-12">
        <div class="bg-red-50 p-4 rounded-md">
          <p class="text-red-700">{{ error }}</p>
          <button @click="fetchExamResult" class="mt-4 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-md">
            Try Again
          </button>
          <div class="mt-4">
            <NuxtLink to="/dashboard" class="text-indigo-600 hover:text-indigo-500">
              Back to Dashboard
            </NuxtLink>
          </div>
        </div>
      </div>
      
      <div v-else>
        <div class="bg-white shadow-md rounded-lg overflow-hidden mb-6">
          <div class="p-6">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 class="text-2xl font-bold text-gray-900">{{ result.examTitle }}</h1>
                <p class="text-gray-500 mt-1">Taken on {{ formatDate(result.endedAt) }}</p>
              </div>
              <div class="mt-4 md:mt-0">
                <div class="inline-flex items-center px-4 py-2 rounded-full" :class="result.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                  <svg v-if="result.passed" class="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg v-else class="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ result.passed ? 'Passed' : 'Failed' }}
                </div>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="bg-gray-50 p-4 rounded-lg text-center">
                <div class="text-3xl font-bold mb-1">{{ result.score }}%</div>
                <div class="text-sm text-gray-500">Score</div>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg text-center">
                <div class="text-3xl font-bold mb-1">{{ result.correctAnswers }}/{{ result.totalQuestions }}</div>
                <div class="text-sm text-gray-500">Correct Answers</div>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg text-center">
                <div class="text-3xl font-bold mb-1">{{ formatDuration(result.timeSpent) }}</div>
                <div class="text-sm text-gray-500">Time Spent</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Questions Review -->
        <div class="bg-white shadow-md rounded-lg overflow-hidden">
          <div class="p-6">
            <h2 class="text-lg font-medium text-gray-900 mb-6">Questions Review</h2>
            
            <div v-for="(question, index) in result.exam.questions" :key="question.id" 
                 class="mb-8 pb-6" 
                 :class="{ 'border-b border-gray-200': index !== result.exam.questions.length - 1 }">
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-8 w-8 rounded-full" 
                       :class="question.isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
                    {{ index + 1 }}
                  </div>
                </div>
                <div class="ml-4 flex-1">
                  <p class="text-gray-900 font-medium">{{ question.text }}</p>
                  
                  <div class="mt-4 space-y-2">
                    <div v-for="(option, optIndex) in question.options" :key="optIndex" 
                         class="flex items-center p-2 rounded-md"
                         :class="getOptionClass(question, optIndex)">
                      <span class="mr-2">{{ ['A', 'B', 'C', 'D'][optIndex] }}.</span>
                      <span>{{ option.text }}</span>
                      
                      <div class="ml-auto flex items-center space-x-2">
                        <span v-if="option.isCorrect" class="text-green-600 text-sm font-medium">
                          Correct Answer 
                        </span>
                        <span v-if="option.id === result.answers[index].selectedOptionId" class="text-red-600 text-sm font-medium">
                          Your Answer
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div v-if="question.explanation" class="mt-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                    <span class="font-medium">Explanation:</span> {{ question.explanation }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-6 text-center">
          <NuxtLink to="/dashboard" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
            Back to Dashboard
          </NuxtLink>
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
const api = useApi()
const resultId = route.params.id

const loading = ref(true)
const error = ref(null)
const result = ref({
  id: '',
  examId: '',
  examTitle: '',
  score: 0,
  passed: false,
  totalQuestions: 0,
  correctAnswers: 0,
  incorrectAnswers: 0,
  timeSpent: 0,
  endedAt: '',
  questions: []
})

onMounted(() => {
  fetchExamResult()
})

async function fetchExamResult() {
  loading.value = true
  error.value = null
  
  try {
    const response = await api.get(`/attempts/${resultId}`)
    console.log('Exam Result:', response.data)
    result.value = {...response.data, 
                     correctAnswers: response.data.answers.filter(a => a.selectedOption.isCorrect).length || 0, 
                     totalQuestions: response.data.answers.length || 0, 
                     timeSpent: response.data.startedAt && response.data.endedAt ? Math.floor((new Date(response.data.endedAt) - new Date(response.data.startedAt)) / 1000) : 0, 
                     endedAt: response.data.endedAt || new Date().toISOString() }
  } catch (err) {
    console.error('Error fetching exam result:', err)
    error.value = 'Failed to load exam result. Please try again.'
  } finally {
    loading.value = false
  }
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  
  if (minutes < 60) {
    return `${minutes}m ${remainingSeconds}s`
  } else {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours}h ${remainingMinutes}m ${remainingSeconds}s`
  }
}

function getOptionClass(question, optIndex) {
  if (optIndex === question.correctOptionIndex) {
    return 'bg-green-50'
  } else if (optIndex === question.selectedOptionIndex && optIndex !== question.correctOptionIndex) {
    return 'bg-red-50'
  } else {
    return ''
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