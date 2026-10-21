import { useState, type FormEvent } from 'react'
import { AttachFileOutlined, SendOutlined } from '@mui/icons-material'
import Button from '../../../../components/ui/button/Button'

interface ChatMessageInputProps {
  onSendMessage: (message: string) => void
}

const ChatMessageInput = ({ onSendMessage }: ChatMessageInputProps) => {
  const [message, setMessage] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const text = message.trim()
    if (!text) return
    onSendMessage(text)
    setMessage('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex shrink-0 items-center gap-2 border-t border-app-border bg-app-surface p-3 tablet:gap-3 tablet:px-5 tablet:py-4"
    >
      <button
        type="button"
        aria-label="Attach a file (demo only)"
        title="File attachments are not connected yet"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-app-border text-app-text-muted transition-colors hover:bg-app-bg hover:text-app-text"
      >
        <AttachFileOutlined fontSize="small" />
      </button>
      <label className="sr-only" htmlFor="chat-message">Write a message</label>
      <input
        id="chat-message"
        name="message"
        type="text"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Write a message..."
        autoComplete="off"
        className="h-10 min-w-0 flex-1 rounded-lg border border-app-border bg-app-surface px-3 text-sm text-app-text outline-none transition-colors placeholder:text-app-text-muted focus:border-app-primary-500 focus:ring-2 focus:ring-app-primary-100"
      />
      <Button
        label="Send"
        startIcon={<SendOutlined sx={{ fontSize: 17 }} />}
        type="submit"
        size="sm"
        disabled={!message.trim()}
        className="h-10 shrink-0 rounded-lg px-3 text-sm tablet:px-4"
      />
    </form>
  )
}

export default ChatMessageInput
