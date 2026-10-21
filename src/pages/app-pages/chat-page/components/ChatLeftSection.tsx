import { memo, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { SearchOutlined } from '@mui/icons-material'
import Tabs from '../../../../components/ui/tabs/Tabs'
import type { TabItem } from '../../../../components/ui/tabs/tabs.types'
import type { ChatConversation } from '../chat.types'
import ChatUserCard from './ChatUserCard'

const conversationTabs: TabItem[] = [
  { id: 'recent', key: 'recent', label: 'Recent' },
  { id: 'all', key: 'all', label: 'All chats' },
]

interface ChatLeftSectionProps {
  conversations: ChatConversation[]
  selectedConversationId: string
  onSelectConversation: (conversationId: string) => void
  mobileHidden: boolean
}

const ChatLeftSection = memo(({
  conversations,
  selectedConversationId,
  onSelectConversation,
  mobileHidden,
}: ChatLeftSectionProps) => {
  const [searchParams] = useSearchParams()
  const filter = searchParams.get('chatView') === 'all' ? 'all' : 'recent'
  const [search, setSearch] = useState('')
  const visibleConversations = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()
    return conversations.filter((conversation) => {
      const matchesSearch = conversation.name.toLowerCase().includes(normalizedSearch)
      const matchesFilter = filter === 'all' || !conversation.isGroup
      return matchesSearch && matchesFilter
    })
  }, [conversations, filter, search])

  return (
    <aside
      className={`${
        mobileHidden ? 'hidden tablet:flex' : 'flex'
      } w-full shrink-0 flex-col border-r border-app-border bg-app-surface tablet:w-72 desktop:w-80`}
      aria-label="Conversations"
    >
      <div className="border-b border-app-border p-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h1 className="text-lg font-semibold text-app-text">Messages</h1>
            <p className="mt-0.5 text-xs text-app-text-muted">Your conversations</p>
          </div>
          <span className="rounded-full bg-app-primary-50 px-2.5 py-1 text-[10px] font-medium text-app-primary-800">
            {conversations.length} chats
          </span>
        </div>
        <label className="mt-4 flex h-10 items-center gap-2 rounded-md border border-app-border px-3 text-app-text-muted focus-within:border-app-primary-500">
          <SearchOutlined sx={{ fontSize: 18 }} />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search people..."
            aria-label="Search conversations"
            className="min-w-0 flex-1 bg-transparent text-sm text-app-text outline-none placeholder:text-app-text-muted"
          />
        </label>
      </div>

      <div className="border-b border-app-border p-3">
        <Tabs
          tabs={conversationTabs}
          variant="underline"
          fullWidth
          urlParam="chatView"
          defaultTab="recent"
        />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {visibleConversations.length > 0 ? (
          visibleConversations.map((conversation) => (
            <ChatUserCard
              key={conversation.id}
              conversation={conversation}
              selected={selectedConversationId === conversation.id}
              onClick={() => onSelectConversation(conversation.id)}
            />
          ))
        ) : (
          <p className="px-4 py-8 text-center text-sm text-app-text-muted">No conversations found.</p>
        )}
      </div>
    </aside>
  )
})

ChatLeftSection.displayName = 'ChatLeftSection'

export default ChatLeftSection
