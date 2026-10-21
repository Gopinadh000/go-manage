import { GroupsOutlined } from '@mui/icons-material'

interface ChatAvatarProps {
  initials: string
  color: string
  isGroup?: boolean
  size?: 'sm' | 'lg'
}

const ChatAvatar = ({
  initials,
  color,
  isGroup = false,
  size = 'lg',
}: ChatAvatarProps) => (
  <span
    aria-hidden="true"
    className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-app-primary-800 ${
      size === 'lg' ? 'h-11 w-11 text-base' : 'h-10 w-10 text-sm'
    }`}
    style={{ backgroundColor: color }}
  >
    {isGroup ? <GroupsOutlined fontSize="small" /> : initials}
  </span>
)

export default ChatAvatar
