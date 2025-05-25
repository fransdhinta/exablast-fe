<template>
  <div>
    <div class="md:flex md:items-center md:justify-between mb-6">
      <div class="min-w-0 flex-1">
        <h1 class="text-2xl font-semibold text-gray-900">Create New Exam</h1>
      </div>
      <div class="mt-4 flex md:mt-0 md:ml-4">
        <NuxtLink to="/admin/exams" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          Back to Exams
        </NuxtLink>
      </div>
    </div>
    
    <div class="bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <form @submit.prevent="saveExam">
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
              :disabled="loading"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {{ loading ? 'Creating...' : 'Create Exam' }}
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
const loading = ref(false)

const exam = ref({
  title: '',
  duration: 60,
  description: ''
})

async function saveExam() {
  loading.value = true
  try {
    await api.post('/exams', exam.value)
    router.push('/admin/exams')
  } catch (error) {
    console.error('Error creating exam:', error)
    alert('Failed to create exam. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>