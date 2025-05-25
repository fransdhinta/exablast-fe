import { useApi } from '~/composables/useApi'

export interface Exam {
  id: string
  title: string
  description?: string
  duration: number
  questionCount?: number
  createdAt?: string
  updatedAt?: string
}

export interface CreateExamInput {
  title: string
  description?: string
  duration: number
}

export function useExamsApi() {
  const api = useApi()

  return {
    /**
     * Get all exams
     */
    getExams: async () => {
      try {
        const response = await api.get('/exams')
        return response.data
      } catch (error) {
        console.error('Failed to fetch exams:', error)
        throw error
      }
    },

    /**
     * Get exam by id
     */
    getExamById: async (id: string) => {
      try {
        const response = await api.get(`/exams/${id}`)
        return response.data
      } catch (error) {
        console.error(`Failed to fetch exam ${id}:`, error)
        throw error
      }
    },

    /**
     * Create new exam
     */
    createExam: async (exam: CreateExamInput) => {
      try {
        const response = await api.post('/exams', exam)
        return response.data
      } catch (error) {
        console.error('Failed to create exam:', error)
        throw error
      }
    },

    /**
     * Update exam
     */
    updateExam: async (id: string, exam: CreateExamInput) => {
      try {
        const response = await api.put(`/exams/${id}`, exam)
        return response.data
      } catch (error) {
        console.error(`Failed to update exam ${id}:`, error)
        throw error
      }
    },

    /**
     * Delete exam
     */
    deleteExam: async (id: string) => {
      try {
        const response = await api.delete(`/exams/${id}`)
        return response.data
      } catch (error) {
        console.error(`Failed to delete exam ${id}:`, error)
        throw error
      }
    },

    /**
     * Get exam statistics
     */
    getExamStats: async (id: string) => {
      try {
        const response = await api.get(`/exams/${id}/stats`)
        return response.data
      } catch (error) {
        console.error(`Failed to fetch exam stats for ${id}:`, error)
        throw error
      }
    }
  }
}