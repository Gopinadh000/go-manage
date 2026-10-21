import { memo } from 'react'
import ChatAvatar from './ChatAvatar'
import type { ChatConversation } from '../chat.types'

interface ChatUserCardProps {
  conversation: ChatConversation
  selected: boolean
  onClick: () => void
}

const ChatUserCard = memo(({ conversation, selected, onClick }: ChatUserCardProps) => (
  <div
    role="button"
    tabIndex={0}
    onClick={onClick}
    onKeyDown={(event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onClick()
      }
    }}
    aria-current={selected ? 'true' : undefined}
    className={`flex w-full items-center gap-3 border-l-2 px-3 py-3 text-left transition-colors ${
      selected
        ? 'border-app-primary-500 bg-app-primary-50'
        : 'border-transparent hover:bg-app-bg'
    } cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-app-primary-500`}
  >
    <ChatAvatar
      initials={conversation.initials}
      color={conversation.avatarColor}
      isGroup={conversation.isGroup}
    />
    <span className="min-w-0 flex-1">
      <span className="flex items-center justify-between gap-2">
        <span className="truncate text-sm font-semibold text-app-text">{conversation.name}</span>
        <time className="shrink-0 text-[10px] text-app-text-muted">{conversation.lastMessageTime}</time>
      </span>
      <span className="mt-1 flex items-center gap-1.5">
        {!conversation.isGroup && (
          <span
            className={`h-2 w-2 shrink-0 rounded-full ${
              conversation.online ? 'bg-emerald-500' : 'bg-app-border-strong'
            }`}
          />
        )}
        <span className="truncate text-xs text-app-text-muted">{conversation.lastMessage}</span>
        {conversation.unreadCount > 0 && (
          <span className="ml-auto inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-app-primary-500 px-1 text-[10px] font-semibold text-white">
            {conversation.unreadCount}
          </span>
        )}
      </span>
      {!conversation.isGroup && (
        <span className="sr-only">{conversation.online ? 'Online' : 'Offline'}</span>
      )}
    </span>
  </div>
))

ChatUserCard.displayName = 'ChatUserCard'

export default ChatUserCard
