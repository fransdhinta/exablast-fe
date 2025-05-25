<template>
  <div>
    <div class="md:flex md:items-center md:justify-between mb-6">
      <div class="min-w-0 flex-1">
        <h1 class="text-2xl font-semibold text-gray-900">Create New Question</h1>
      </div>
      <div class="mt-4 flex md:mt-0 md:ml-4">
        <NuxtLink to="/admin/questions" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          Back to Questions
        </NuxtLink>
      </div>
    </div>
    
    <div class="bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <form @submit.prevent="saveQuestion">
          <!-- Question Text -->
          <div class="mb-6">
            <label for="text" class="block text-sm font-medium text-gray-700">Question Text</label>
            <textarea
              id="text"
              v-model="question.text"
              rows="3"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your question here"
              required
            ></textarea>
          </div>
          
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Answer Options</label>
            <div v-for="(option, index) in question.options" :key="index" class="flex items-start mb-3">
              <div class="mr-3 pt-1">
                <input 
                  type="radio" 
                  :name="'correct-answer'" 
                  :value="index"
                  :checked="option.isCorrect" 
                  @change="setCorrectAnswer(index)"
                  class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                >
              </div>
              <div class="flex-grow">
                <input 
                  type="text" 
                  v-model="option.text" 
                  class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Answer option"
                  required
                >
              </div>
              <button 
                type="button" 
                @click="removeOption(index)" 
                class="ml-3 text-red-600 hover:text-red-800 pt-2"
                v-if="question.options.length > 2"
              >
                Remove
              </button>
            </div>
            
            <button 
              type="button" 
              @click="addOption" 
              class="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Answer Option
            </button>
          </div>
          
          <!-- Exam Selection -->
          <div class="mb-6">
            <label for="exam" class="block text-sm font-medium text-gray-700">Associated Exam</label>
            <select 
              id="exam"
              v-model="question.examId"
              class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">None</option>
              <option v-for="exam in exams" :key="exam.id" :value="exam.id">{{ exam.title }}</option>
            </select>
          </div>
          
          <div class="flex justify-end">
            <button
              type="submit"
              class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Question
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth'],
  layout: 'admin'
})

const router = useRouter()
const api = useApi()

const exams = ref([])
const question = ref({
  text: '',
  isGenerated: false,
  examId: '',
  options: [
    { text: '', isCorrect: true },
    { text: '', isCorrect: false }
  ]
})

onMounted(async () => {
  try {
    const response = await api.get('/exams')
    exams.value = response.data || []
  } catch (error) {
    console.error('Error fetching exams:', error)
  }
})

function addOption() {
  question.value.options.push({
    text: '',
    isCorrect: false
  })
}

function removeOption(index) {
  const wasCorrect = question.value.options[index].isCorrect
  question.value.options.splice(index, 1)
  
  // If we removed the correct answer, set the first one as correct
  if (wasCorrect && question.value.options.length > 0) {
    question.value.options[0].isCorrect = true
  }
}

function setCorrectAnswer(index) {
  question.value.options.forEach((option, i) => {
    option.isCorrect = (i === index)
  })
}

async function saveQuestion() {
  try {
    await api.post('/questions', question.value)
    router.push('/admin/questions')
  } catch (error) {
    console.error('Error creating question:', error)
    alert('Failed to create question. Please try again.')
  }
}
</script>