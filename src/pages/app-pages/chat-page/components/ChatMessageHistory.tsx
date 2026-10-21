import { memo, useEffect, useRef } from 'react'
import type { ChatConversation } from '../chat.types'
import ChatAvatar from './ChatAvatar'

function formatDayLabel(date: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
  }).format(new Date(`${date}T00:00:00`))
}

const ChatMessageHistory = memo(({ conversation }: { conversation: ChatConversation }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) container.scrollTop = container.scrollHeight
  }, [conversation.messages])

  return (
    <div
      ref={scrollContainerRef}
      className="custom-scrollbar min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-5 tablet:px-6"
      aria-live="polite"
      aria-label={`Message history with ${conversation.name}`}
    >
      {conversation.messages.map((day) => (
        <section key={day.date} aria-label={formatDayLabel(day.date)}>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px flex-1 bg-app-border" />
            <time
              dateTime={day.date}
              className="shrink-0 rounded-full bg-app-bg px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-app-text-muted"
            >
              {formatDayLabel(day.date)}
            </time>
            <span className="h-px flex-1 bg-app-border" />
          </div>

          <ul className="space-y-4">
            {day.messages.map((message) => {
              const isMine = message.sender === 'me'
              return (
                <li
                  key={message.id}
                  className={`flex items-end gap-2 ${isMine ? 'justify-end' : 'justify-start'}`}
                >
                  {!isMine && (
                    <ChatAvatar
                      initials={conversation.initials}
                      color={conversation.avatarColor}
                      isGroup={conversation.isGroup}
                      size="sm"
                    />
                  )}
                  <div className={`flex   max-w-[82%] flex-col ${isMine ? 'items-end' : 'items-start'}`}>
                    <span className="mb-1 px-1 text-[10px] font-medium text-app-text-muted">
                      {isMine ? 'You' : conversation.name}
                    </span>
                    <p
                      className={`whitespace-pre-wrap break-words rounded-2xl px-3.5 py-1.5 text-sm leading-5 ${
                        isMine
                          ? 'rounded-br-md bg-app-primary-500 text-app-text-inverse'
                          : 'rounded-bl-md border border-app-border bg-app-bg text-app-text'
                      }`}
                    >
                      {message.text}
                    </p>
                    <time className="mt-1 px-1 text-[10px] text-app-text-muted">{message.time}</time>
                  </div>
                  {isMine && (
                    <span
                      aria-hidden="true"
                      className="mb-6 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-app-primary-100 text-[9px] font-semibold text-app-primary-800"
                    >
                      ME
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </div>
  )
})

ChatMessageHistory.displayName = 'ChatMessageHistory'

export default ChatMessageHistory
