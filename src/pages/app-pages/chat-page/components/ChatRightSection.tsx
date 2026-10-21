import { memo } from 'react'
import { ArrowBackOutlined, MoreVertOutlined, SearchOutlined } from '@mui/icons-material'
import type { ChatConversation } from '../chat.types'
import ChatAvatar from './ChatAvatar'
import ChatMessageHistory from './ChatMessageHistory'
import ChatMessageInput from './ChatMessageInput'

interface ChatRightSectionProps {
  conversation: ChatConversation | null
  onSendMessage: (message: string) => void
  onBack: () => void
}

const ChatRightSection = memo(({
  conversation,
  onSendMessage,
  onBack,
}: ChatRightSectionProps) => (
  <section
    className={`${
      conversation ? 'flex' : 'hidden tablet:flex'
    } min-w-0 flex-1 flex-col bg-app-surface`}
    aria-label="Chat conversation"
  >
    {conversation ? (
      <>
        <header className="flex h-[4.5rem] shrink-0 items-center justify-between gap-3 border-b border-app-border px-3 tablet:px-5">
          <div className="flex min-w-0 items-center gap-2.5">
            <button
              type="button"
              onClick={onBack}
              aria-label="Back to conversations"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-app-text-muted hover:bg-app-bg tablet:hidden"
            >
              <ArrowBackOutlined fontSize="small" />
            </button>
            <ChatAvatar
              initials={conversation.initials}
              color={conversation.avatarColor}
              isGroup={conversation.isGroup}
            />
            <div className="min-w-0">
              <h2 className="truncate text-sm font-semibold text-app-text">{conversation.name}</h2>
              <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-app-text-muted">
                {!conversation.isGroup && (
                  <span
                    className={`h-2 w-2 rounded-full ${
                      conversation.online ? 'bg-emerald-500' : 'bg-app-border-strong'
                    }`}
                  />
                )}
                {conversation.isGroup ? 'Group conversation' : conversation.online ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              aria-label="Search in conversation (demo only)"
              className="flex h-9 w-9 items-center justify-center rounded-full text-app-text-muted transition-colors hover:bg-app-bg hover:text-app-text"
            >
              <SearchOutlined fontSize="small" />
            </button>
            <button
              type="button"
              aria-label="Conversation options (demo only)"
              className="flex h-9 w-9 items-center justify-center rounded-full text-app-text-muted transition-colors hover:bg-app-bg hover:text-app-text"
            >
              <MoreVertOutlined fontSize="small" />
            </button>
          </div>
        </header>

        <ChatMessageHistory conversation={conversation} />
        <ChatMessageInput onSendMessage={onSendMessage} />
      </>
    ) : (
      <div className="hidden flex-1 flex-col items-center justify-center px-6 text-center tablet:flex">
        <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-app-primary-50 text-app-primary-500">
          <SearchOutlined sx={{ fontSize: 28 }} />
        </span>
        <h2 className="text-base font-semibold text-app-text">Your messages</h2>
        <p className="mt-1 max-w-xs text-sm text-app-text-muted">
          Choose a conversation to view messages and continue chatting.
        </p>
      </div>
    )}
  </section>
))

ChatRightSection.displayName = 'ChatRightSection'

export default ChatRightSection
