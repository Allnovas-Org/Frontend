// src/pages/applicants/messages/data/conversations.ts

export interface Message {
  id: number;
  senderId: string;
  text?: string;
  timestamp: string;
  type: 'text' | 'voice' | 'file';
  voiceDuration?: string;
  fileName?: string;
  fileSize?: string;
  fileType?: string;
}

export interface Conversation {
  id: number;
  userId: string;
  userName: string;
  userTitle: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isPinned: boolean;
  isArchived: boolean;
  messages: Message[];
  sharedImages: string[];
  sharedFiles: Array<{
    name: string;
    size: string;
    date: string;
    type: string;
  }>;
  sharedLinks: Array<{
    platform: string;
    url: string;
    icon: string;
  }>;
}

export const sampleConversations: Conversation[] = [
  {
    id: 1,
    userId: 'user1',
    userName: 'Mark Brun',
    userTitle: 'Spotify C.O',
    avatar: 'https://i.pravatar.cc/150?img=12',
    lastMessage: 'This it to say that the conjunction...',
    timestamp: '9:30 AM',
    unreadCount: 2,
    isPinned: true,
    isArchived: false,
    messages: [
      {
        id: 1,
        senderId: 'me',
        text: 'How are you doing Mark?🤝 What do you think about us makin use of the conversional method to bring this project to life?',
        timestamp: '8:00 AM',
        type: 'text',
      },
      {
        id: 2,
        senderId: 'user1',
        text: 'Doing quite well',
        timestamp: '10:30 AM',
        type: 'text',
      },
      {
        id: 3,
        senderId: 'user1',
        text: 'How are you doing too?',
        timestamp: '10:30 AM',
        type: 'text',
      },
      {
        id: 4,
        senderId: 'me',
        text: 'Hello there',
        timestamp: '8:00 AM',
        type: 'text',
      },
      {
        id: 5,
        senderId: 'user1',
        type: 'voice',
        timestamp: '10:30 AM',
        voiceDuration: '01:16',
      },
      {
        id: 6,
        senderId: 'me',
        type: 'file',
        timestamp: '8:00 AM',
        fileName: 'ZM_ignment_of_...',
        fileSize: '231.66 KB',
        fileType: 'pdf',
      },
    ],
    sharedImages: [
      'https://picsum.photos/200/200?random=1',
      'https://picsum.photos/200/200?random=2',
      'https://picsum.photos/200/200?random=3',
      'https://picsum.photos/200/200?random=4',
      'https://picsum.photos/200/200?random=5',
      'https://picsum.photos/200/200?random=6',
      'https://picsum.photos/200/200?random=7',
      'https://picsum.photos/200/200?random=8',
    ],
    sharedFiles: [
      { name: 'Forex trading format.docx', size: '452.2 KB', date: '28 May 2024', type: 'docx' },
      { name: 'Forex trading format.docx', size: '452.2 KB', date: '28 May 2024', type: 'docx' },
      { name: 'Forex trading format.docx', size: '452.2 KB', date: '28 May 2024', type: 'docx' },
    ],
    sharedLinks: [
      {
        platform: 'Figma',
        url: 'https://www.figma.com/proto/afsevsefor/App',
        icon: 'Figma',
      },
      {
        platform: 'Behance',
        url: 'https://www.behance.net/gallery/187',
        icon: 'Behance',
      },
      {
        platform: 'Behance',
        url: 'https://www.behance.net/gallery/187',
        icon: 'Behance',
      },
    ],
  },
  {
    id: 2,
    userId: 'user2',
    userName: 'Mark Brun',
    userTitle: 'Designer',
    avatar: 'https://i.pravatar.cc/150?img=13',
    lastMessage: 'This it to say that the conjunction...',
    timestamp: '9:30 AM',
    unreadCount: 1,
    isPinned: true,
    isArchived: false,
    messages: [],
    sharedImages: [],
    sharedFiles: [],
    sharedLinks: [],
  },
  {
    id: 3,
    userId: 'user3',
    userName: 'Mark Brun',
    userTitle: 'Developer',
    avatar: 'https://i.pravatar.cc/150?img=14',
    lastMessage: 'This it to say that the conjunction...',
    timestamp: '2 days ago',
    unreadCount: 3,
    isPinned: true,
    isArchived: false,
    messages: [],
    sharedImages: [],
    sharedFiles: [],
    sharedLinks: [],
  },
  {
    id: 4,
    userId: 'user4',
    userName: 'Mark Brun',
    userTitle: 'Product Manager',
    avatar: 'https://i.pravatar.cc/150?img=15',
    lastMessage: 'This it to say that the conjunction...',
    timestamp: 'Yesterday',
    unreadCount: 1,
    isPinned: false,
    isArchived: false,
    messages: [],
    sharedImages: [],
    sharedFiles: [],
    sharedLinks: [],
  },
  {
    id: 5,
    userId: 'user5',
    userName: 'Mark Brun',
    userTitle: 'CTO',
    avatar: 'https://i.pravatar.cc/150?img=16',
    lastMessage: 'This it to say that the conjunction...',
    timestamp: '9:30 AM',
    unreadCount: 1,
    isPinned: false,
    isArchived: false,
    messages: [],
    sharedImages: [],
    sharedFiles: [],
    sharedLinks: [],
  },
];

export type ConversationType = typeof sampleConversations[number];