<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold text-gray-900">Exam Management</h1>
      <NuxtLink to="/admin/exams/create" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
        Create New Exam
      </NuxtLink>
    </div>
    
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <div v-if="loading" class="p-4 text-center">Loading exams...</div>
      <div v-else-if="!exams.length" class="p-4 text-center text-gray-500">
        No exams found. Create your first exam!
      </div>
      <ul v-else role="list" class="divide-y divide-gray-200">
        <li v-for="exam in exams" :key="exam.id" class="px-4 py-4 sm:px-6 hover:bg-gray-50">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-medium text-gray-900">{{ exam.title }}</h3>
              <div class="mt-1 flex items-center text-sm text-gray-500">
                <div>Duration: {{ exam.duration }} minutes</div>
                <div class="ml-6">Questions: {{ exam.questions.length }}</div>
              </div>
            </div>
            <div class="flex">
              <NuxtLink :to="`/admin/exams/edit/${exam.id}`" class="text-indigo-600 hover:text-indigo-900 mr-4">Edit</NuxtLink>
              <button @click="deleteExam(exam.id)" class="text-red-600 hover:text-red-900">Delete</button>
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
const exams = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await api.get('/exams')
    console.log('Fetched exams:', response.data);
    
    exams.value = response.data || []
  } catch (error) {
    console.error('Error fetching exams:', error)
  } finally {
    loading.value = false
  }
})

async function deleteExam(id) {
  if (!confirm('Are you sure you want to delete this exam? This will also remove all associated questions.')) 
    return
  
  try {
    await api.delete(`/exams/${id}`)
    exams.value = exams.value.filter(e => e.id !== id)
  } catch (error) {
    console.error('Error deleting exam:', error)
    alert('Failed to delete exam. Please try again.')
  }
}
</script>