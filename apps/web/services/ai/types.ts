export type AIMessageRole =
  | "user"
  | "assistant"
  | "system"

export interface AIMessage {
  id: string
  role: AIMessageRole
  content: string
  createdAt: Date
}

export interface AIConversation {
  id: string
  messages: AIMessage[]
}