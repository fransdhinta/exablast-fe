<template>
  <div>
    <h1 class="text-2xl font-semibold text-gray-900 mb-6">Generate Questions with AI</h1>
    
    <div class="bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <form @submit.prevent="generateQuestions">
          <!-- Topic -->
          <div class="mb-6">
            <label for="topic" class="block text-sm font-medium text-gray-700">Topic</label>
            <input
              type="text"
              id="topic"
              v-model="generationForm.topic"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="e.g. JavaScript Basics, React Fundamentals, etc."
              required
            />
          </div>
          
          <!-- Difficulty -->
          <div class="mb-6">
            <label for="difficulty" class="block text-sm font-medium text-gray-700">Difficulty</label>
            <select
              id="difficulty"
              v-model="generationForm.difficulty"
              class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              required
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          
          <!-- Number of questions -->
          <div class="mb-6">
            <label for="count" class="block text-sm font-medium text-gray-700">Number of Questions</label>
            <input
              type="number"
              id="count"
              v-model="generationForm.count"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              min="1"
              max="10"
              required
            />
            <p class="mt-1 text-sm text-gray-500">Maximum 10 questions per generation</p>
          </div>
          
          <!-- Associated Exam -->
          <div class="mb-6">
            <label for="examId" class="block text-sm font-medium text-gray-700">Associated Exam (optional)</label>
            <select
              id="examId"
              v-model="generationForm.examId"
              class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">None - Generate standalone questions</option>
              <option v-for="exam in exams" :key="exam.id" :value="exam.id">{{ exam.title }}</option>
            </select>
          </div>
          
          <!-- Special instructions -->
          <div class="mb-6">
            <label for="instructions" class="block text-sm font-medium text-gray-700">Special Instructions (optional)</label>
            <textarea
              id="instructions"
              v-model="generationForm.instructions"
              rows="3"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Any specific instructions for the AI"
            ></textarea>
          </div>
          
          <div class="flex justify-end">
            <button
              type="submit"
              :disabled="isGenerating"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {{ isGenerating ? 'Generating Questions...' : 'Generate Questions' }}
            </button>
          </div>
        </form>
      </div>
    </div>
    
    <!-- Generated Questions -->
    <div v-if="generatedQuestions.length" class="mt-8">
      <h2 class="text-xl font-medium text-gray-900 mb-4">Generated Questions</h2>
      
      <div class="bg-white shadow sm:rounded-lg mb-6">
        <ul class="divide-y divide-gray-200">
          <li v-for="(question, index) in generatedQuestions" :key="index" class="px-4 py-5">
            <div class="mb-3">
              <h3 class="text-lg font-medium text-gray-900">{{ question.questionText }}</h3>
            </div>
            
            <ul class="space-y-2 mb-4">
              <li v-for="(option, optIndex) in question.answerOptions" :key="optIndex" 
                  class="flex items-start"
                  :class="{ 'text-green-600 font-medium': option.isCorrect }">
                <div class="flex-shrink-0 mr-2">
                  {{ ['A', 'B', 'C', 'D'][optIndex] }}.
                </div>
                <div>{{ option.text }}</div>
                <div v-if="option.isCorrect" class="ml-2 text-green-600">
                  (Correct Answer)
                </div>
              </li>
            </ul>
            
            <div v-if="!question.saved" class="flex justify-end">
              <button 
                @click="saveQuestion(question, index)" 
                class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save this question
              </button>
            </div>
            <div v-else class="text-right text-green-600 text-sm">
              Question saved!
            </div>
          </li>
        </ul>
      </div>
      
      <div class="flex justify-between">
        <button
          @click="generatedQuestions = []"
          class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Clear Results
        </button>
        
        <button
          @click="saveAllQuestions"
          :disabled="allSaved"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          Save All Questions
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth'],
  layout: 'admin'
})

const api = useApi()
const exams = ref([])
const isGenerating = ref(false)
const generatedQuestions = ref([])

const generationForm = ref({
  topic: '',
  difficulty: 'intermediate',
  count: 5,
  examId: '',
  instructions: '',
})

onMounted(async () => {
  try {
    const response = await api.get('/exams')
    exams.value = response.data || []
  } catch (error) {
    console.error('Error fetching exams:', error)
  }
})

async function generateQuestions() {
  isGenerating.value = true
  
  try {
    const response = await api.post('/questions/generate', generationForm.value)
    generatedQuestions.value = response.data.map(q => ({ ...q, saved: false }))
  } catch (error) {
    console.error('Error generating questions:', error)
    alert('Failed to generate questions. Please try again.')
  } finally {
    isGenerating.value = false
  }
}

async function saveQuestion(question, index) {
  try {
    // Remove the saved flag before sending to API
    const { saved, ...questionToSave } = question
    
    // Add the exam ID if specified
    if (generationForm.value.examId) {
      questionToSave.examId = generationForm.value.examId
    }
    
    await api.post('/questions', questionToSave)
    generatedQuestions.value[index].saved = true
  } catch (error) {
    console.error('Error saving question:', error)
    alert('Failed to save question. Please try again.')
  }
}

async function saveAllQuestions() {
  for (let i = 0; i < generatedQuestions.value.length; i++) {
    if (!generatedQuestions.value[i].saved) {
      await saveQuestion(generatedQuestions.value[i], i)
    }
  }
}

const allSaved = computed(() => {
  return generatedQuestions.value.length > 0 && 
    generatedQuestions.value.every(q => q.saved)
})
</script>