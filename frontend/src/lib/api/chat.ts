import apiClient from './client'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface ChatResponse {
  response: string
  message_id: string
  timestamp: string
}

export interface ChatHistory {
  history: ChatMessage[]
  total_messages: number
}

export const chatApi = {
  async sendMessage(message: string): Promise<ChatResponse> {
    return apiClient.post<ChatResponse>('/chat/message', { message })
  },

  async getHistory(): Promise<ChatHistory> {
    return apiClient.get<ChatHistory>('/chat/history')
  },

  async clearHistory(): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>('/chat/history')
  },
}
