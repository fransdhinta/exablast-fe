<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold text-gray-900">Question Bank</h1>
      <NuxtLink to="/admin/questions/create" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
        Add Question
      </NuxtLink>
    </div>
    
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <div v-if="loading" class="p-4 text-center">Loading questions...</div>
      <div v-else-if="!questions.length" class="p-4 text-center text-gray-500">
        No questions found. Create your first question!
      </div>
      <ul v-else role="list" class="divide-y divide-gray-200">
        <li v-for="question in questions" :key="question.id" class="px-4 py-4 sm:px-6 hover:bg-gray-50">
          <div class="flex items-center justify-between">
            <div class="truncate">
              <div class="flex text-sm">
                <p class="font-medium text-indigo-600 truncate">{{ question.text }}</p>
                <p class="ml-1 flex-shrink-0 font-normal text-gray-500">
                  {{ question.isGenerated ? '(AI Generated)' : '' }}
                </p>
              </div>
              <div class="mt-2 flex">
                <div class="text-sm text-gray-500">
                  {{ question.options?.length || 0 }} options
                </div>
              </div>
            </div>
            <div class="ml-2 flex-shrink-0 flex">
              <NuxtLink :to="`/admin/questions/edit/${question.id}`" class="font-medium text-indigo-600 hover:text-indigo-500 mr-3">
                Edit
              </NuxtLink>
              <button @click="deleteQuestion(question.id)" class="font-medium text-red-600 hover:text-red-500">
                Delete
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth'],
  layout: 'admin'
})

const api = useApi()
const questions = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await api.get('/questions')
    questions.value = response.data || []
  } catch (error) {
    console.error('Error fetching questions:', error)
  } finally {
    loading.value = false
  }
})

async function deleteQuestion(id) {
  if (!confirm('Are you sure you want to delete this question?')) return
  
  try {
    await api.delete(`/questions/${id}`)
    questions.value = questions.value.filter(q => q.id !== id)
  } catch (error) {
    console.error('Error deleting question:', error)
  }
}
</script>