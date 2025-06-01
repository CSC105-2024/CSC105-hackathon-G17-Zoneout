export const user = {
  name: 'Alex Adventure',
  memberSince: 'March 2024',
  location: 'San Francisco Bay Area',
  posts: 15,
  events: 32,
  rating: 4.8,
};

export const userHistory = [
  {
    id: 1,
    title: 'Beach Volleyball Game',
    type: 'activity',
    date: '2 days ago',
    status: 'completed',
    participants: 8,
    location: 'Santa Monica Beach',
  },
  // ... (other activities)
];

export const safetyCards = [
  {
    icon: '🔒',
    title: 'Location Privacy',
    description:
      'Your exact location is never shared. We use smart location fuzzing to protect your privacy while still enabling meaningful connections.',
    features: [
      'Location blur radius (50-500m)',
      'Home/work privacy zones',
      'Temporary location sharing',
      'Anonymous posting options',
    ],
  },
  {
    icon: '👤',
    title: 'User Verification',
    description:
      'Multi-layer verification system ensures authentic and trustworthy community members.',
    features: [
      'Email & phone verification',
      'Photo verification optional',
      'Community reputation system',
      'Trusted user badges',
    ],
  },
  {
    icon: '🚨',
    title: 'Report & Block',
    description:
      'Powerful tools to maintain a safe and respectful community environment.',
    features: [
      'One-tap reporting system',
      'Instant blocking capabilities',
      'AI-powered content moderation',
      '24/7 safety team response',
    ],
  },
  {
    icon: '💬',
    title: 'Secure Communication',
    description: 'All your conversations are encrypted and private by design.',
    features: [
      'End-to-end encryption',
      'No message storage',
      'Screenshot notifications',
      'Auto-delete messages',
    ],
  },
  {
    icon: '🤝',
    title: 'Safe Meetups',
    description:
      'Smart features designed to make in-person meetings safe and comfortable.',
    features: [
      'Public venue recommendations',
      'Buddy system integration',
      'Check-in reminders',
      'Emergency contact alerts',
    ],
  },
  {
    icon: '🔐',
    title: 'Data Protection',
    description:
      'Your personal data is protected with industry-leading security standards.',
    features: [
      'GDPR compliant',
      'Data minimization',
      'Regular security audits',
      'Right to be forgotten',
    ],
  },
];

export const guidelines = [
  {
    title: '🌟 First Meetings',
    content:
      'Always meet in public places during daylight hours. Coffee shops, parks, and busy restaurants are ideal first meeting spots.',
  },
  {
    title: '👥 Tell Someone',
    content:
      "Always let a friend or family member know where you're going, who you're meeting, and when you expect to return.",
  },
  {
    title: '🚗 Transportation',
    content:
      "Arrange your own transportation to and from meetups. Don't rely on someone you just met for rides.",
  },
  {
    title: '💰 Money Matters',
    content:
      "Never send money or share financial information with people you meet through ConnectMap, even for 'emergencies.'",
  },
  {
    title: '🏠 Personal Info',
    content:
      'Keep personal details like your home address, workplace, and daily routines private until you build genuine trust.',
  },
  {
    title: '🚫 Trust Your Instincts',
    content:
      'If something feels off or uncomfortable, trust your gut feeling and remove yourself from the situation immediately.',
  },
];

export const mockUsers = [
  {
    id: 1,
    email: 'alice@example.com',
    name: 'alice123',
    password: 'securePassword1',
    phone: '0912345678',
    createdAt: new Date('2024-06-01T10:00:00Z'),
    updatedAt: new Date('2024-06-10T10:00:00Z'),
    posts: [
      {
        id: 1,
        content: 'Alice’s first post!',
        latitude: 16.8409,
        longitude: 96.1735,
        category: 'announcement',
        isEvent: true,
        createdAt: new Date('2024-06-01T12:00:00Z'),
        updatedAt: new Date('2024-06-01T12:00:00Z'),
        expiresAt: new Date('2024-06-02T12:00:00Z'),
        userId: 1,
      },
      {
        id: 2,
        content: 'Alice’s second post.',
        latitude: 16.841,
        longitude: 96.174,
        category: 'general',
        isEvent: false,
        createdAt: new Date('2024-06-03T08:00:00Z'),
        updatedAt: new Date('2024-06-03T08:00:00Z'),
        expiresAt: new Date('2024-06-10T08:00:00Z'),
        userId: 1,
      },
    ],
  },
  {
    id: 2,
    email: 'bob@example.com',
    name: 'bob456',
    password: 'securePassword2',
    phone: '0998765432',
    createdAt: new Date('2024-06-05T14:00:00Z'),
    updatedAt: new Date('2024-06-10T14:00:00Z'),
    posts: [
      {
        id: 3,
        content: 'Bob’s meetup announcement.',
        latitude: 21.9162,
        longitude: 95.956,
        category: 'event',
        isEvent: true,
        createdAt: new Date('2024-06-05T15:00:00Z'),
        updatedAt: new Date('2024-06-05T15:00:00Z'),
        expiresAt: new Date('2024-06-07T15:00:00Z'),
        userId: 2,
      },
    ],
  },
];

export const mockPosts = [
  {
    id: 1,
    content: 'Alice’s first post!',
    latitude: 16.8409,
    longitude: 96.1735,
    category: 'announcement',
    isEvent: true,
    createdAt: new Date('2024-06-01T12:00:00Z'),
    updatedAt: new Date('2024-06-01T12:00:00Z'),
    expiresAt: new Date('2024-06-02T12:00:00Z'),
    userId: 1,
  },
  {
    id: 2,
    content: 'Alice’s second post.',
    latitude: 16.841,
    longitude: 96.174,
    category: 'general',
    isEvent: false,
    createdAt: new Date('2024-06-03T08:00:00Z'),
    updatedAt: new Date('2024-06-03T08:00:00Z'),
    expiresAt: new Date('2024-06-10T08:00:00Z'),
    userId: 1,
  },
  {
    id: 3,
    content: 'Bob’s meetup announcement.',
    latitude: 21.9162,
    longitude: 95.956,
    category: 'event',
    isEvent: true,
    createdAt: new Date('2024-06-05T15:00:00Z'),
    updatedAt: new Date('2024-06-05T15:00:00Z'),
    expiresAt: new Date('2024-06-07T15:00:00Z'),
    userId: 2,
  },
  {
    id: 4,
    content: 'Bob’s random thoughts...',
    latitude: 21.917,
    longitude: 95.957,
    category: 'random',
    isEvent: false,
    createdAt: new Date('2024-06-06T10:30:00Z'),
    updatedAt: new Date('2024-06-06T10:30:00Z'),
    expiresAt: new Date('2024-06-13T10:30:00Z'),
    userId: 2,
  },
];