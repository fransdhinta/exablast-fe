import { useApi } from '~/composables/useApi'

export interface AnswerOption {
  id?: string
  text: string
  isCorrect: boolean
}

export interface Question {
  id?: string
  examId?: string
  questionText: string
  type: 'mcq'
  isGenerated: boolean
  answerOptions: AnswerOption[]
}

export interface QuestionGenerationParams {
  topic: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  count: number
  examId?: string
  instructions?: string
}

export function useQuestionsApi() {
  const api = useApi()

  return {
    /**
     * Get all questions
     */
    getQuestions: async (params?: { examId?: string }) => {
      try {
        const response = await api.get('/questions', params || {})
        return response.data
      } catch (error) {
        console.error('Failed to fetch questions:', error)
        throw error
      }
    },

    /**
     * Get question by id
     */
    getQuestionById: async (id: string) => {
      try {
        const response = await api.get(`/questions/${id}`)
        return response.data
      } catch (error) {
        console.error(`Failed to fetch question ${id}:`, error)
        throw error
      }
    },

    /**
     * Create new question
     */
    createQuestion: async (question: Question) => {
      try {
        const response = await api.post('/questions', question)
        return response.data
      } catch (error) {
        console.error('Failed to create question:', error)
        throw error
      }
    },

    /**
     * Update question
     */
    updateQuestion: async (id: string, question: Question) => {
      try {
        const response = await api.put(`/questions/${id}`, question)
        return response.data
      } catch (error) {
        console.error(`Failed to update question ${id}:`, error)
        throw error
      }
    },

    /**
     * Delete question
     */
    deleteQuestion: async (id: string) => {
      try {
        const response = await api.delete(`/questions/${id}`)
        return response.data
      } catch (error) {
        console.error(`Failed to delete question ${id}:`, error)
        throw error
      }
    },

    /**
     * Generate questions with AI
     */
    generateQuestions: async (params: QuestionGenerationParams) => {
      try {
        const response = await api.post('/questions/generate', params)
        return response.data
      } catch (error) {
        console.error('Failed to generate questions:', error)
        throw error
      }
    },

    /**
     * Get questions count
     */
    getQuestionsCount: async () => {
      try {
        const response = await api.get('/questions/count')
        return response.data
      } catch (error) {
        console.error('Failed to fetch questions count:', error)
        throw error
      }
    }
  }
}