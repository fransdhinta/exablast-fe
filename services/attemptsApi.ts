import { useApi } from '~/composables/useApi'

export interface ExamAttempt {
  id: string
  examId: string
  userId: string
  startedAt: string
  endedAt: string | null
  score: number | null
  exam?: {
    title: string
    duration: number
    description?: string
  }
}

export interface CreateAttemptResponse {
  id: string
  examId: string
  userId: string
  startedAt: string
  endedAt: null
  score: null
  exam: {
    title: string
    duration: number
    description: string
  }
}

export interface SubmitAnswerRequest {
  questionId: string
  selectedOptionId: string
}

export interface SubmitAnswerResponse {
  id: string
  attemptId: string
  selectedOptionId: string
  createdAt: string
}

export interface CompleteAttemptResponse {
  id: string
  examId: string
  userId: string
  startedAt: string
  endedAt: string
  score: number
  exam: {
    title: string
  }
}

export function useAttemptsApi() {
  const api = useApi()

  return {
    /**
     * Create a new exam attempt
     */
    createAttempt: async (examId: string) => {
      try {
        const response = await api.post('/attempts', { examId })
        return response.data as CreateAttemptResponse
      } catch (error) {
        console.error('Failed to create attempt:', error)
        throw error
      }
    },

    /**
     * Submit an answer for a question
     */
    submitAnswer: async (attemptId: string, questionId: string, selectedOptionId: string) => {
      try {
        const response = await api.post(`/attempts/${attemptId}/answers`, {
          questionId,
          selectedOptionId
        })
        return response.data as SubmitAnswerResponse
      } catch (error) {
        console.error('Failed to submit answer:', error)
        throw error
      }
    },

    /**
     * Complete an exam attempt
     */
    completeAttempt: async (attemptId: string) => {
      try {
        const response = await api.post('/attempts/complete', { attemptId })
        return response.data as CompleteAttemptResponse
      } catch (error) {
        console.error('Failed to complete attempt:', error)
        throw error
      }
    },

    /**
     * Get attempt details
     */
    getAttemptDetails: async (attemptId: string) => {
      try {
        const response = await api.get(`/attempts/${attemptId}`)
        return response.data as ExamAttempt
      } catch (error) {
        console.error('Failed to get attempt details:', error)
        throw error
      }
    },

    /**
     * Get user's attempts
     */
    getUserAttempts: async () => {
      try {
        const response = await api.get('/attempts')
        return response.data as ExamAttempt[]
      } catch (error) {
        console.error('Failed to get user attempts:', error)
        throw error
      }
    }
  }
}