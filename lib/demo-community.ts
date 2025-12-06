// Time utilities for Bengali timestamps
export function getRelativeTime(date: string): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'এইমাত্র';
  if (diffMins < 60) return `${diffMins} মিনিট আগে`;
  if (diffHours < 24) return `${diffHours} ঘন্টা আগে`;
  if (diffDays < 7) return `${diffDays} দিন আগে`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} সপ্তাহ আগে`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} মাস আগে`;
  return `${Math.floor(diffDays / 365)} বছর আগে`;
}

export interface User {
  id: string;
  name: string;
  nameBn: string;
  avatar?: string;
  role: 'farmer' | 'expert' | 'seller';
  roleBn: string;
  location: string;
  locationBn: string;
}

export interface Post {
  id: string;
  userId: string;
  user: User;
  type: 'success_story' | 'tip' | 'general';
  typeBn: string;
  content: string;
  contentBn: string;
  images?: string[];
  cropTags?: string[];
  cropTagsBn?: string[];
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
  createdAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  user: User;
  content: string;
  contentBn: string;
  createdAt: string;
}

export interface Question {
  id: string;
  userId: string;
  user: User;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  category: string;
  categoryBn: string;
  crop?: string;
  cropBn?: string;
  images?: string[];
  isSolved: boolean;
  answers: number;
  views: number;
  createdAt: string;
}

export interface Answer {
  id: string;
  questionId: string;
  userId: string;
  user: User;
  content: string;
  contentBn: string;
  upvotes: number;
  downvotes: number;
  isAccepted: boolean;
  isUpvoted?: boolean;
  isDownvoted?: boolean;
  createdAt: string;
}

export const POST_TYPES = [
  { id: 'all', label: 'All', labelBn: 'সব' },
  { id: 'success_story', label: 'Success Story', labelBn: 'সাফল্যের গল্প' },
  { id: 'tip', label: 'Tips', labelBn: 'টিপস' },
  { id: 'general', label: 'General', labelBn: 'সাধারণ' },
];

export const QUESTION_CATEGORIES = [
  { id: 'disease', label: 'Disease', labelBn: 'রোগ ও পোকা' },
  { id: 'cultivation', label: 'Cultivation', labelBn: 'চাষাবাদ' },
  { id: 'fertilizer', label: 'Fertilizer', labelBn: 'সার' },
  { id: 'irrigation', label: 'Irrigation', labelBn: 'সেচ' },
  { id: 'harvest', label: 'Harvest', labelBn: 'ফসল তোলা' },
  { id: 'market', label: 'Market', labelBn: 'বাজার' },
  { id: 'other', label: 'Other', labelBn: 'অন্যান্য' },
];

export const QUESTION_FILTERS = [
  { id: 'all', label: 'All', labelBn: 'সব' },
  { id: 'unsolved', label: 'Unsolved', labelBn: 'অমীমাংসিত' },
  { id: 'solved', label: 'Solved', labelBn: 'সমাধান হয়েছে' },
];

const DEMO_USERS: User[] = [
  {
    id: 'u1',
    name: 'Karim Molla',
    nameBn: 'করিম মোল্লা',
    role: 'farmer',
    roleBn: 'কৃষক',
    location: 'Rajshahi',
    locationBn: 'রাজশাহী',
  },
  {
    id: 'u2',
    name: 'Dr. Rahman',
    nameBn: 'ড. রহমান',
    role: 'expert',
    roleBn: 'কৃষি বিশেষজ্ঞ',
    location: 'Dhaka',
    locationBn: 'ঢাকা',
  },
  {
    id: 'u3',
    name: 'Fatema Begum',
    nameBn: 'ফাতেমা বেগম',
    role: 'farmer',
    roleBn: 'কৃষক',
    location: 'Dinajpur',
    locationBn: 'দিনাজপুর',
  },
];

export const DEMO_POSTS: Post[] = [
  {
    id: 'p1',
    userId: 'u1',
    user: DEMO_USERS[0],
    type: 'success_story',
    typeBn: 'সাফল্যের গল্প',
    content: 'This year I achieved 7 tons of rice per hectare',
    contentBn:
      'এবছর আমি হেক্টর প্রতি ৭ টন ধান পেয়েছি। কৃষিমিত্র অ্যাপ থেকে সঠিক সময়ে সার প্রয়োগ ও রোগ শনাক্তকরণ করে এই সাফল্য পেয়েছি। আমার জমি ছিল মাত্র ২ বিঘা কিন্তু ফলন অসাধারণ হয়েছে।',
    images: ['/placeholder-post.jpg'],
    cropTags: ['Rice', 'BR-28'],
    cropTagsBn: ['ধান', 'বিআর-২৮'],
    likes: 45,
    comments: 12,
    shares: 5,
    isLiked: false,
    createdAt: '2024-12-05T10:30:00Z',
  },
  {
    id: 'p2',
    userId: 'u2',
    user: DEMO_USERS[1],
    type: 'tip',
    typeBn: 'টিপস',
    content: 'Organic pest control tips',
    contentBn:
      'জৈব পদ্ধতিতে পোকামাকড় দমনের সহজ উপায়:\n১. নিম তেল স্প্রে করুন\n২. রসুন-মরিচ পানি ব্যবহার করুন\n৩. পার্চিং করুন\n৪. আলোর ফাঁদ ব্যবহার করুন',
    cropTags: ['Vegetables'],
    cropTagsBn: ['সবজি'],
    likes: 89,
    comments: 23,
    shares: 15,
    isLiked: true,
    createdAt: '2024-12-04T15:20:00Z',
  },
  {
    id: 'p3',
    userId: 'u3',
    user: DEMO_USERS[2],
    type: 'general',
    typeBn: 'সাধারণ',
    content: 'Season preparation tips',
    contentBn:
      'রবি মৌসুমের জন্য প্রস্তুতি নিচ্ছি। কেউ কি বলতে পারবেন এবার টমেটো চাষ কেমন হবে? আমার ৫০ শতক জমি আছে।',
    likes: 15,
    comments: 8,
    shares: 2,
    isLiked: false,
    createdAt: '2024-12-03T08:15:00Z',
  },
];

export const DEMO_COMMENTS: Record<string, Comment[]> = {
  p1: [
    {
      id: 'c1',
      userId: 'u2',
      user: DEMO_USERS[1],
      content: 'Great achievement! Which variety did you use?',
      contentBn: 'অসাধারণ! আপনি কোন জাত ব্যবহার করেছেন?',
      createdAt: '2024-12-05T11:00:00Z',
    },
    {
      id: 'c2',
      userId: 'u1',
      user: DEMO_USERS[0],
      content: 'BR-28 variety',
      contentBn: 'বিআর-২৮ জাত ব্যবহার করেছি',
      createdAt: '2024-12-05T11:30:00Z',
    },
  ],
};

export const DEMO_QUESTIONS: Question[] = [
  {
    id: 'q1',
    userId: 'u3',
    user: DEMO_USERS[2],
    title: 'Tomato leaves turning yellow',
    titleBn: 'টমেটো গাছের পাতা হলুদ হয়ে যাচ্ছে',
    description: 'My tomato plants leaves are turning yellow. What should I do?',
    descriptionBn:
      'আমার টমেটো গাছের পাতা হলুদ হয়ে যাচ্ছে। নিচের পাতা থেকে শুরু হয়ে ধীরে ধীরে উপরে উঠছে। কি করব?',
    category: 'disease',
    categoryBn: 'রোগ ও পোকা',
    crop: 'Tomato',
    cropBn: 'টমেটো',
    images: ['/placeholder-question.jpg'],
    isSolved: true,
    answers: 3,
    views: 156,
    createdAt: '2024-12-02T14:20:00Z',
  },
  {
    id: 'q2',
    userId: 'u1',
    user: DEMO_USERS[0],
    title: 'Best time for potato planting',
    titleBn: 'আলু রোপণের উপযুক্ত সময়',
    description: 'When is the best time to plant potatoes in Bangladesh?',
    descriptionBn: 'বাংলাদেশে আলু রোপণের সবচেয়ে ভালো সময় কখন?',
    category: 'cultivation',
    categoryBn: 'চাষাবাদ',
    crop: 'Potato',
    cropBn: 'আলু',
    isSolved: false,
    answers: 1,
    views: 89,
    createdAt: '2024-12-01T09:45:00Z',
  },
];

export const DEMO_ANSWERS: Record<string, Answer[]> = {
  q1: [
    {
      id: 'a1',
      questionId: 'q1',
      userId: 'u2',
      user: DEMO_USERS[1],
      content: 'This is nitrogen deficiency. Apply urea fertilizer.',
      contentBn:
        'এটি নাইট্রোজেনের অভাব। ইউরিয়া সার প্রয়োগ করুন। প্রতি গাছে ১০ গ্রাম করে দিন এবং ভালো করে পানি দিন।',
      upvotes: 15,
      downvotes: 1,
      isAccepted: true,
      isUpvoted: false,
      isDownvoted: false,
      createdAt: '2024-12-02T15:00:00Z',
    },
    {
      id: 'a2',
      questionId: 'q1',
      userId: 'u1',
      user: DEMO_USERS[0],
      content: 'Also check for proper watering',
      contentBn: 'পানি দেওয়ার পরিমাণও দেখুন। বেশি পানি দিলেও এমন হতে পারে।',
      upvotes: 5,
      downvotes: 0,
      isAccepted: false,
      isUpvoted: false,
      isDownvoted: false,
      createdAt: '2024-12-02T16:30:00Z',
    },
  ],
  q2: [
    {
      id: 'a3',
      questionId: 'q2',
      userId: 'u2',
      user: DEMO_USERS[1],
      content: 'Mid-November is the best time',
      contentBn: 'নভেম্বরের মাঝামাঝি সময় সবচেয়ে ভালো। ১৫-২৫ নভেম্বর আদর্শ সময়।',
      upvotes: 3,
      downvotes: 0,
      isAccepted: false,
      isUpvoted: true,
      isDownvoted: false,
      createdAt: '2024-12-01T10:20:00Z',
    },
  ],
};
