<template>
  <div>
    <div class="md:flex md:items-center md:justify-between mb-6">
      <div class="min-w-0 flex-1">
        <h1 class="text-2xl font-semibold text-gray-900">Edit Exam</h1>
      </div>
      <div class="mt-4 flex md:mt-0 md:ml-4">
        <NuxtLink to="/admin/exams" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          Back to Exams
        </NuxtLink>
      </div>
    </div>
    
    <div v-if="loading" class="text-center py-6">Loading exam...</div>
    <div v-else-if="error" class="text-center py-6 text-red-600">{{ error }}</div>
    <div v-else class="bg-white shadow sm:rounded-lg mb-6">
      <div class="px-4 py-5 sm:p-6">
        <form @submit.prevent="updateExam">
          <!-- Exam Title -->
          <div class="mb-6">
            <label for="title" class="block text-sm font-medium text-gray-700">Exam Title</label>
            <input
              type="text"
              id="title"
              v-model="exam.title"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter exam title"
              required
            />
          </div>
          
          <!-- Duration -->
          <div class="mb-6">
            <label for="duration" class="block text-sm font-medium text-gray-700">Duration (minutes)</label>
            <input
              type="number"
              id="duration"
              v-model="exam.duration"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              min="1"
              required
            />
          </div>
          
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Description (optional)</label>
            <textarea
              v-model="exam.description"
              rows="3"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter a description for this exam"
            ></textarea>
          </div>
          
          <div class="flex justify-end">
            <button
              type="submit"
              :disabled="saving"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {{ saving ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </form>
      </div>
    </div>
    
    <!-- Associated Questions -->
    <div v-if="!loading && !error" class="mt-8">
      <h2 class="text-lg font-medium text-gray-900 mb-4">Exam Questions</h2>
      
      <div class="bg-white shadow sm:rounded-lg">
        <div v-if="loadingQuestions" class="p-4 text-center">Loading questions...</div>
        <div v-else-if="!questions.length" class="p-4 text-center text-gray-500">
          No questions associated with this exam.
          <div class="mt-2">
            <NuxtLink to="/admin/questions/create" class="text-indigo-600 hover:text-indigo-500">
              Create a question
            </NuxtLink> or 
            <NuxtLink to="/admin/questions/generate" class="text-indigo-600 hover:text-indigo-500">
              generate questions with AI
            </NuxtLink>
          </div>
        </div>
        <ul v-else class="divide-y divide-gray-200">
          <li v-for="question in questions" :key="question.id" class="px-4 py-3 hover:bg-gray-50">
            <div class="flex items-center justify-between">
              <div class="truncate">
                <p class="text-sm font-medium text-gray-900">{{ question.text }}</p>
                <p class="text-xs text-gray-500 mt-1">
                  {{ question.options?.length || 0 }} options • 
                  {{ question.isGenerated ? 'AI Generated' : 'Manually Created' }}
                </p>
              </div>
              <div class="ml-4 flex-shrink-0">
                <NuxtLink :to="`/admin/questions/edit/${question.id}`" class="font-medium text-indigo-600 hover:text-indigo-500">
                  Edit
                </NuxtLink>
              </div>
            </div>
          </li>
        </ul>
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
const route = useRoute()
const api = useApi()

const examId = route.params.id
const exam = ref({
  title: '',
  duration: 60,
  description: ''
})
const questions = ref([])
const loading = ref(true)
const loadingQuestions = ref(true)
const saving = ref(false)
const error = ref(null)

onMounted(async () => {
  try {
    const examResponse = await api.get(`/exams/${examId}`)
    exam.value = examResponse.data
    loading.value = false
    
    fetchQuestions()
  } catch (err) {
    error.value = 'Failed to load exam. Please try again.'
    console.error('Error loading exam:', err)
    loading.value = false
  }
})

async function fetchQuestions() {
  try {
    const response = await api.get(`/questions?examId=${examId}`)
    questions.value = response.data || []
  } catch (err) {
    console.error('Error fetching questions:', err)
  } finally {
    loadingQuestions.value = false
  }
}

async function updateExam() {
  saving.value = true
  try {
    await api.patch(`/exams/${examId}`, {
      title: exam.value.title,
      duration: exam.value.duration,
      description: exam.value.description
    })
    alert('Exam updated successfully!')
  } catch (err) {
    console.error('Error updating exam:', err)
    alert('Failed to update exam. Please try again.')
  } finally {
    saving.value = false
  }
}
</script>