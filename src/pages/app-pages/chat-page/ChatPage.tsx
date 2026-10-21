import { useMemo, useState } from 'react'
import ChatLeftSection from './components/ChatLeftSection'
import ChatRightSection from './components/ChatRightSection'
import { sampleConversations } from './chat-data'
import type { ChatMessage } from './chat.types'

const ChatPage = () => {
  const [conversations, setConversations] = useState(sampleConversations)
  const [selectedConversationId, setSelectedConversationId] = useState(
    sampleConversations[0]?.id ?? '',
  )
  const selectedConversation = useMemo(
    () => conversations.find((conversation) => conversation.id === selectedConversationId) ?? null,
    [conversations, selectedConversationId],
  )

  const handleSendMessage = (text: string) => {
    if (!selectedConversation) return

    const sentAt = new Date()
    const dateKey = [
      sentAt.getFullYear(),
      String(sentAt.getMonth() + 1).padStart(2, '0'),
      String(sentAt.getDate()).padStart(2, '0'),
    ].join('-')
    const message: ChatMessage = {
      id: `message-${Date.now()}`,
      sender: 'me',
      text,
      time: new Intl.DateTimeFormat('en', {
        hour: 'numeric',
        minute: '2-digit',
      }).format(sentAt),
    }

    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === selectedConversation.id
          ? {
              ...conversation,
              messages: conversation.messages.some((day) => day.date === dateKey)
                ? conversation.messages.map((day) =>
                    day.date === dateKey
                      ? { ...day, messages: [...day.messages, message] }
                      : day,
                  )
                : [...conversation.messages, { date: dateKey, messages: [message] }],
              lastMessage: text,
              lastMessageTime: message.time,
            }
          : conversation,
      ),
    )
  }

  return (
    <main className="flex h-[calc(100dvh-8rem)] min-h-[28rem] min-w-0 overflow-hidden rounded-lg border border-app-border bg-app-surface shadow-sm">
      <ChatLeftSection
        conversations={conversations}
        selectedConversationId={selectedConversationId}
        onSelectConversation={setSelectedConversationId}
        mobileHidden={Boolean(selectedConversation)}
      />
      <ChatRightSection
        conversation={selectedConversation}
        onSendMessage={handleSendMessage}
        onBack={() => setSelectedConversationId('')}
      />
    </main>
  )
}

export default ChatPage;
