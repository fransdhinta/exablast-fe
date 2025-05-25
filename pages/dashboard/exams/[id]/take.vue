<template>
  <div class="bg-gray-50 min-h-screen py-4">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="loading" class="text-center py-12">
        <div class="spinner"></div>
        <p class="mt-4 text-gray-600">Loading exam questions...</p>
      </div>
      
      <div v-else-if="error" class="text-center py-12">
        <div class="bg-red-50 p-4 rounded-md">
          <p class="text-red-700">{{ error }}</p>
          <button @click="fetchExamQuestions" class="mt-4 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-md">
            Try Again
          </button>
          <div class="mt-4">
            <NuxtLink to="/dashboard/exams" class="text-indigo-600 hover:text-indigo-500">
              Back to exams
            </NuxtLink>
          </div>
        </div>
      </div>
      
      <template v-else>
        <!-- Exam Header -->
        <div class="bg-white shadow-md rounded-lg mb-6 p-4">
          <div class="flex justify-between items-center">
            <h1 class="text-xl font-bold text-gray-900">{{ exam.title }}</h1>
            <div v-if="!examSubmitted" class="flex items-center">
              <div class="bg-indigo-100 px-3 py-1 rounded-md flex items-center" :class="{ 'bg-red-100': timeRemaining < 300 }">
                <svg class="h-5 w-5 mr-1" :class="{ 'text-red-600': timeRemaining < 300, 'text-indigo-600': timeRemaining >= 300 }" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span :class="{ 'text-red-600 font-bold': timeRemaining < 300, 'text-indigo-600': timeRemaining >= 300 }">
                  {{ formatTime(timeRemaining) }}
                </span>
              </div>
            </div>
          </div>
          
          <!-- Progress bar -->
          <div v-if="!examSubmitted" class="mt-4 w-full bg-gray-200 rounded-full h-2.5">
            <div class="bg-indigo-600 h-2.5 rounded-full" :style="`width: ${progressPercentage}%`"></div>
          </div>
        </div>
        
        <!-- Results screen -->
        <div v-if="examSubmitted" class="bg-white shadow-md rounded-lg p-6">
          <div class="text-center">
            <div class="mb-4">
              <svg v-if="examResult.passed" class="mx-auto h-12 w-12 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <svg v-else class="mx-auto h-12 w-12 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h2 class="text-2xl font-bold" :class="examResult.passed ? 'text-green-700' : 'text-red-700'">
              {{ examResult.passed ? 'Congratulations!' : 'Exam Failed' }}
            </h2>
            
            <p class="mt-2 text-gray-600">
              {{ examResult.passed ? 'You have passed the exam.' : 'Unfortunately, you did not meet the passing criteria.' }}
            </p>
            
            <div class="mt-6 bg-gray-50 p-4 rounded-lg">
              <div class="text-3xl font-bold mb-2">
                {{ examResult.score }}%
              </div>
              <div class="text-sm text-gray-500">Your Score</div>
            </div>
            
            <div class="mt-6 grid grid-cols-2 gap-4 text-center">
              <div>
                <div class="text-lg font-semibold">{{ examResult.correctAnswers }}</div>
                <div class="text-sm text-gray-500">Correct Answers</div>
              </div>
              <div>
                <div class="text-lg font-semibold">{{ examResult.incorrectAnswers }}</div>
                <div class="text-sm text-gray-500">Incorrect Answers</div>
              </div>
            </div>
            
            <div class="mt-8">
              <NuxtLink to="/dashboard" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                Return to Dashboard
              </NuxtLink>
            </div>
          </div>
        </div>
        
        <!-- Questions -->
        <div v-else>
          <div v-if="isPaginated">
            <!-- Paginated Question View -->
            <div class="bg-white shadow-md rounded-lg mb-6 p-6">
              <h2 class="text-lg font-semibold mb-4">Question {{ currentQuestionIndex + 1 }} of {{ questions.length }}</h2>
              
              <div class="mb-6">
                <p class="text-gray-900">{{ currentQuestion.text }}</p>
              </div>
              
              <div class="space-y-4">
                <div 
                  v-for="(option, index) in currentQuestion.options" 
                  :key="index" 
                  class="flex items-start"
                >
                  <div class="flex items-center h-5">
                    <input 
                      :id="`option-${index}`" 
                      :name="`question-${currentQuestionIndex}`" 
                      type="radio" 
                      :value="option.id"
                      :checked="selectedAnswers[currentQuestion.id] === option.id"
                      @change="selectAnswer(currentQuestion.id, option.id)"
                      class="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      :disabled="timeExpired"
                    >
                  </div>
                  <div class="ml-3 text-sm">
                    <label :for="`option-${index}`" :class="{ 'text-gray-400': timeExpired, 'text-gray-700': !timeExpired }">
                      {{ option.text }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="flex justify-between">
              <button 
                @click="prevQuestion" 
                class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                :disabled="currentQuestionIndex === 0 || timeExpired" 
                :class="{ 'opacity-50 cursor-not-allowed': currentQuestionIndex === 0 || timeExpired }"
              >
                Previous
              </button>
              
              <button 
                v-if="currentQuestionIndex < questions.length - 1" 
                @click="nextQuestion" 
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                :disabled="timeExpired"
                :class="{ 'opacity-50 cursor-not-allowed': timeExpired }"
              >
                Next
              </button>
              
              <button 
                v-else 
                @click="submitExam" 
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                :disabled="timeExpired"
                :class="{ 'opacity-50 cursor-not-allowed': timeExpired }"
              >
                Submit Exam
              </button>
            </div>
            
            <!-- Question navigation dots -->
            <div class="mt-8 flex flex-wrap justify-center gap-2">
              <button 
                v-for="(question, index) in questions" 
                :key="index"
                @click="goToQuestion(index)"
                class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium focus:outline-none"
                :class="[
                  currentQuestionIndex === index 
                    ? 'bg-indigo-600 text-white' 
                    : selectedAnswers[question.id] 
                      ? 'bg-indigo-100 text-indigo-700' 
                      : 'bg-gray-200 text-gray-700',
                  timeExpired ? 'cursor-not-allowed' : 'hover:bg-indigo-200'
                ]"
                :disabled="timeExpired"
              >
                {{ index + 1 }}
              </button>
            </div>
          </div>
          
          <div v-else>
            <!-- Single page view -->
            <div class="bg-white shadow-md rounded-lg p-6 mb-6">
              <div v-for="(question, qIndex) in questions" :key="qIndex" class="mb-10 pb-6" :class="{ 'border-b border-gray-200': qIndex !== questions.length - 1 }">
                <h2 class="text-lg font-semibold mb-4">Question {{ qIndex + 1 }} of {{ questions.length }}</h2>
                
                <div class="mb-4">
                  <p class="text-gray-900">{{ question.text }}</p>
                </div>
                
                <div class="space-y-4">
                  <div 
                    v-for="(option, oIndex) in question.options" 
                    :key="`${qIndex}-${oIndex}`" 
                    class="flex items-start"
                  >
                    <div class="flex items-center h-5">
                      <input 
                        :id="`question-${qIndex}-option-${oIndex}`" 
                        :name="`question-${qIndex}`" 
                        type="radio" 
                        :value="option.id"
                        :checked="selectedAnswers[question.id] === option.id"
                        @change="selectAnswer(question.id, option.id)"
                        class="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        :disabled="timeExpired"
                      >
                    </div>
                    <div class="ml-3 text-sm">
                      <label :for="`question-${qIndex}-option-${oIndex}`" :class="{ 'text-gray-400': timeExpired, 'text-gray-700': !timeExpired }">
                        {{ option.text }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="mt-8 text-center">
                <button 
                  @click="submitExam" 
                  class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  :disabled="timeExpired"
                  :class="{ 'opacity-50 cursor-not-allowed': timeExpired }"
                >
                  Submit Exam
                </button>
              </div>
            </div>
          </div>
          
          <!-- Time expired message -->
          <div v-if="timeExpired && !examSubmitted" class="bg-red-50 border-l-4 border-red-400 p-4 mt-6">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-700">
                  Time has expired. Please submit your answers now.
                </p>
                <div class="mt-2">
                  <button 
                    @click="submitExam" 
                    class="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Submit Exam
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Confirmation modal for submission -->
          <div v-if="showSubmitConfirmation" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="flex items-center justify-center min-h-screen">
              <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="showSubmitConfirmation = false"></div>
              <div class="relative bg-white rounded-lg max-w-md w-full mx-4 p-6 shadow-xl">
                <div class="text-center">
                  <svg class="mx-auto h-12 w-12 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <h3 class="text-lg font-medium text-gray-900 mt-4">Submit Exam?</h3>
                  <p class="text-sm text-gray-500 mt-2">
                    Are you sure you want to submit your exam? You have {{ unansweredCount }} unanswered questions.
                    This action cannot be undone.
                  </p>
                </div>
                <div class="mt-6 flex justify-center space-x-4">
                  <button 
                    type="button" 
                    class="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    @click="showSubmitConfirmation = false"
                  >
                    Return to Exam
                  </button>
                  <button 
                    type="button" 
                    class="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    @click="confirmSubmit"
                  >
                    Submit Exam
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
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
const attemptId = route.query.attempt // Get the attempt ID from query params

const loading = ref(true)
const error = ref(null)
const exam = ref({
  id: '',
  title: '',
  description: '',
  duration: 0,
  questionCount: 0
})
const questions = ref([])
const isPaginated = ref(true) // Set to false for single-page mode
const currentQuestionIndex = ref(0)
const selectedAnswers = ref({}) // Map of questionId -> selectedOptionId
const timeRemaining = ref(0)
const timeExpired = ref(false)
const examSubmitted = ref(false)
const showSubmitConfirmation = ref(false)
const examResult = ref({
  passed: false,
  score: 0,
  correctAnswers: 0,
  incorrectAnswers: 0
})

// Timer interval
let timerInterval = null

onMounted(async () => {
  if (!attemptId) {
    error.value = 'Invalid exam attempt. Please start the exam again.'
    loading.value = false
    return
  }
  
  await fetchExamQuestions()
})

onBeforeUnmount(() => {
  // Clean up timer
  if (timerInterval) {
    clearInterval(timerInterval)
  }
})

async function fetchExamQuestions() {
  loading.value = true
  error.value = null
  
  try {
    // Get attempt details which includes exam info and questions
    const response = await api.get(`/attempts/${attemptId}`)
    const attemptData = response.data
    
    exam.value = attemptData.exam
    questions.value = attemptData.exam.questions || []
    
    // If the attempt already has answers (resuming an exam), load them
    if (attemptData.answers && attemptData.answers.length > 0) {
      // Convert array of answers to a map for easy lookup
      attemptData.answers.forEach(answer => {
        if (answer.selectedOptionId) {
          selectedAnswers.value[answer.questionId] = answer.selectedOptionId
        }
      })
    }
    
    // Calculate remaining time based on start time and duration
    const startedAt = new Date(attemptData.startedAt).getTime()
    const currentTime = Date.now()
    const elapsedSeconds = Math.floor((currentTime - startedAt) / 1000)
    const totalSeconds = exam.value.duration * 60
    
    timeRemaining.value = Math.max(0, totalSeconds - elapsedSeconds)
    
    // Check if time has already expired
    if (timeRemaining.value <= 0) {
      timeExpired.value = true
    } else {
      startTimer()
    }
    
    loading.value = false
  } catch (err) {
    console.error('Error fetching exam questions:', err)
    error.value = 'Failed to load exam questions. Please try again.'
    loading.value = false
  }
}

function startTimer() {
  timerInterval = setInterval(() => {
    if (timeRemaining.value > 0) {
      timeRemaining.value--
    } else {
      timeExpired.value = true
      clearInterval(timerInterval)
      
      // Auto-submit after 30 seconds of time expiring
      setTimeout(() => {
        if (!examSubmitted.value) {
          submitExam(true) // Force submit
        }
      }, 30000)
    }
  }, 1000)
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

function prevQuestion() {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
  }
}

function nextQuestion() {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++
  }
}

function goToQuestion(index) {
  if (!timeExpired.value) {
    currentQuestionIndex.value = index
  }
}

function selectAnswer(questionId, optionId) {
  if (timeExpired.value) return
  
  selectedAnswers.value[questionId] = optionId
  
  // Submit the answer to the backend in real-time
  submitAnswer(questionId, optionId)
}

async function submitAnswer(questionId, selectedOptionId) {
  try {
    await api.post(`/attempts/${attemptId}/answers`, {
      questionId,
      selectedOptionId
    })
    // No need to handle the response unless you want to confirm
  } catch (error) {
    console.error('Failed to submit answer:', error)
    // Optionally show a subtle notification that answer sync failed
  }
}

function submitExam(force = false) {
  // Count unanswered questions
  const unansweredCount = questions.value.length - Object.keys(selectedAnswers.value).length
  
  // If not forcing submission and there are unanswered questions, show confirmation
  if (!force && unansweredCount > 0) {
    showSubmitConfirmation.value = true
    return
  }
  
  // Submit exam
  processSubmission()
}

function confirmSubmit() {
  showSubmitConfirmation.value = false
  processSubmission()
}

async function processSubmission() {
  try {
    // Stop the timer
    if (timerInterval) {
      clearInterval(timerInterval)
    }
    
    // Complete the attempt
    const response = await api.post('/attempts/complete', {
      attemptId: attemptId
    })
    
    // Show results
    examResult.value = {
      passed: response.data.score >= 70, // Assuming 70% is passing
      score: response.data.score,
      correctAnswers: response.data.answers.filter(a => a.selectedOption.isCorrect).length || 0,
      incorrectAnswers: response.data.answers.filter(a => !a.selectedOption.isCorrect).length || 0
    }
    
    examSubmitted.value = true
  } catch (err) {
    console.error('Error completing exam:', err)
    alert('Failed to submit exam. Please try again.')
  }
}

// Computed properties
const currentQuestion = computed(() => {
  return questions.value[currentQuestionIndex.value] || {}
})

const progressPercentage = computed(() => {
  return (Object.keys(selectedAnswers.value).length / questions.value.length) * 100
})

const unansweredCount = computed(() => {
  return questions.value.length - Object.keys(selectedAnswers.value).length
})
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