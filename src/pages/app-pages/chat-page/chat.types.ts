export interface ChatMessage {
  id: string
  sender: 'me' | 'them'
  text: string
  time: string
}

export interface ChatMessageDay {
  date: string
  messages: ChatMessage[]
}

export interface ChatConversation {
  id: string
  name: string
  initials: string
  avatarColor: string
  isGroup: boolean
  online: boolean
  unreadCount: number
  lastMessage: string
  lastMessageTime: string
  messages: ChatMessageDay[]
}
