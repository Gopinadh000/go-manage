import type { ChatConversation } from './chat.types'

export const sampleConversations: ChatConversation[] = [
  {
    id: 'abid-ali',
    name: 'Abid Ali',
    initials: 'A',
    avatarColor: '#dbeafe',
    isGroup: false,
    online: true,
    unreadCount: 0,
    lastMessage: 'Sure, I’ll check it now.',
    lastMessageTime: '10:24 AM',
    messages: [
      {
        date: '2026-10-01',
        messages: [
          { id: 'a-1', sender: 'them', text: 'Hi', time: '9:00 AM' },
          { id: 'a-2', sender: 'me', text: 'Hi Abid, how are you?', time: '9:10 AM' },
        ],
      },
      {
        date: '2026-10-02',
        messages: [
          { id: 'a-3', sender: 'them', text: 'Sure, I’ll check it now.', time: '10:24 AM' },
          { id: 'a-4', sender: 'me', text: 'Thanks a lot!', time: '10:27 AM' },
        ],
      },
      {
        date: '2026-10-05',
        messages: [
          { id: 'a-5', sender: 'them', text: 'Let’s catch up later today.', time: '11:15 AM' },
        ],
      },
    ],
  },
  {
    id: 'gopinadh',
    name: 'Gopinadh',
    initials: 'G',
    avatarColor: '#f3e8ff',
    isGroup: false,
    online: true,
    unreadCount: 1,
    lastMessage: 'Hi bro',
    lastMessageTime: '9:10 AM',
    messages: [
      {
        date: '2026-10-04',
        messages: [
          { id: 'g-1', sender: 'them', text: 'Are we still on for the review?', time: '9:02 AM' },
          { id: 'g-2', sender: 'me', text: 'Yes, I’ll be there.', time: '9:10 AM' },
        ],
      },
    ],
  },
  {
    id: 'ravi-kumar',
    name: 'Ravi Kumar',
    initials: 'R',
    avatarColor: '#dcfce7',
    isGroup: false,
    online: true,
    unreadCount: 1,
    lastMessage: 'Can you review the task?',
    lastMessageTime: 'Yesterday',
    messages: [
      {
        date: '2026-10-03',
        messages: [
          { id: 'r-1', sender: 'them', text: 'Can you review the task?', time: '4:35 PM' },
        ],
      },
    ],
  },
  {
    id: 'product-team',
    name: 'Product Team',
    initials: 'PT',
    avatarColor: '#fce7f3',
    isGroup: true,
    online: false,
    unreadCount: 3,
    lastMessage: 'Meeting at 3 PM',
    lastMessageTime: 'Oct 20',
    messages: [
      {
        date: '2026-10-20',
        messages: [
          { id: 'p-1', sender: 'them', text: 'Meeting at 3 PM', time: '8:45 AM' },
          { id: 'p-2', sender: 'me', text: 'Sounds good. See you there!', time: '8:52 AM' },
        ],
      },
    ],
  },
]
