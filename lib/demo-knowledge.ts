export interface Article {
  id: string;
  slug: string;
  title: string;
  titleBn: string;
  excerpt: string;
  excerptBn: string;
  content: string;
  contentBn: string;
  category: 'farming_guide' | 'disease_pest' | 'fertilizer_irrigation' | 'govt_scheme' | 'success_story';
  categoryBn: string;
  image: string;
  author: string;
  authorBn: string;
  readTime: number;
  publishedAt: string;
  viewCount: number;
}

export interface Crop {
  id: string;
  name: string;
  nameBn: string;
  scientificName: string;
  category: 'rice' | 'vegetables' | 'fruits' | 'pulses' | 'spices';
  categoryBn: string;
  image: string;
  images: string[];
  seasons: ('kharif' | 'rabi' | 'year_round')[];
  seasonsBn: string[];
  growingDays: number;
  temperature: string;
  temperatureBn: string;
  soil: string;
  soilBn: string;
  water: string;
  waterBn: string;
  cultivation: string;
  cultivationBn: string;
  care: string;
  careBn: string;
  harvesting: string;
  harvestingBn: string;
  diseases: string;
  diseasesBn: string;
}

export interface Video {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  youtubeId: string;
  category: string;
  categoryBn: string;
  duration: string;
  viewCount: number;
}

export const ARTICLE_CATEGORIES = [
  { id: 'all', label: 'All', labelBn: 'সব' },
  { id: 'farming_guide', label: 'Farming Guide', labelBn: 'চাষ গাইড' },
  { id: 'disease_pest', label: 'Disease & Pest', labelBn: 'রোগ ও পোকা' },
  { id: 'fertilizer_irrigation', label: 'Fertilizer & Irrigation', labelBn: 'সার ও সেচ' },
  { id: 'govt_scheme', label: 'Government Schemes', labelBn: 'সরকারি প্রকল্প' },
  { id: 'success_story', label: 'Success Story', labelBn: 'সফলতার গল্প' },
];

export const CROP_CATEGORIES = [
  { id: 'all', label: 'All', labelBn: 'সব' },
  { id: 'rice', label: 'Rice', labelBn: 'ধান' },
  { id: 'vegetables', label: 'Vegetables', labelBn: 'সবজি' },
  { id: 'fruits', label: 'Fruits', labelBn: 'ফল' },
  { id: 'pulses', label: 'Pulses', labelBn: 'ডাল' },
  { id: 'spices', label: 'Spices', labelBn: 'মসলা' },
];

export const SEASON_FILTERS = [
  { id: 'all', label: 'All Seasons', labelBn: 'সব মৌসুম' },
  { id: 'kharif', label: 'Kharif', labelBn: 'খরিফ' },
  { id: 'rabi', label: 'Rabi', labelBn: 'রবি' },
  { id: 'year_round', label: 'Year Round', labelBn: 'সারাবছর' },
];

export const DEMO_ARTICLES: Article[] = [
  {
    id: 'a1',
    slug: 'modern-rice-farming-techniques',
    title: 'Modern Rice Farming Techniques',
    titleBn: 'আধুনিক ধান চাষ পদ্ধতি',
    excerpt: 'Learn the latest techniques for high-yield rice cultivation',
    excerptBn: 'উচ্চ ফলনশীল ধান চাষের সর্বশেষ কৌশল জানুন',
    content: 'Full article content here...',
    contentBn: 'বিআর-২৮ এবং বিআর-২৯ হাইব্রিড ধানের বীজ ব্যবহার করে আপনি প্রতি হেক্টরে ৬-৭ টন ফলন পেতে পারেন। সঠিক সময়ে চারা রোপণ, সুষম সার প্রয়োগ এবং পানি ব্যবস্থাপনা অত্যন্ত গুরুত্বপূর্ণ।\n\nচাষ পদ্ধতি:\n১. জমি তৈরি: জমি ৩-৪ বার চাষ ও মই দিয়ে সমান করুন\n২. বীজ বপন: প্রতি হেক্টরে ২৫-৩০ কেজি বীজ প্রয়োজন\n৩. চারা রোপণ: ২৫-৩০ দিন বয়সের চারা ১৫×২০ সেমি দূরত্বে রোপণ করুন\n\nসার প্রয়োগ:\n- ইউরিয়া: ২৫০ কেজি/হেক্টর\n- টিএসপি: ১৫০ কেজি/হেক্টর\n- এমওপি: ১২০ কেজি/হেক্টর\n- জিপসাম: ১০০ কেজি/হেক্টর\n\nপানি ব্যবস্থাপনা:\nচারা রোপণের পর জমিতে ৫-৭ সেমি পানি রাখুন। ফুল আসার সময় পানির অভাব যেন না হয়।',
    category: 'farming_guide',
    categoryBn: 'চাষ গাইড',
    image: '/placeholder-article.jpg',
    author: 'Dr. Rahman',
    authorBn: 'ড. রহমান',
    readTime: 5,
    publishedAt: '2024-12-01',
    viewCount: 1234,
  },
  {
    id: 'a2',
    slug: 'organic-pest-control',
    title: 'Organic Pest Control Methods',
    titleBn: 'জৈব পদ্ধতিতে পোকা দমন',
    excerpt: 'Safe and effective organic solutions for pest management',
    excerptBn: 'নিরাপদ ও কার্যকর জৈব পদ্ধতিতে পোকামাকড় দমন',
    content: 'Full article content...',
    contentBn: 'রাসায়নিক কীটনাশক ছাড়াই জৈব পদ্ধতিতে পোকামাকড় দমন করা সম্ভব। এতে খরচ কম এবং স্বাস্থ্যের জন্য নিরাপদ।\n\nনিম তেল স্প্রে:\n- ১ লিটার পানিতে ৫ মিলি নিম তেল মিশিয়ে স্প্রে করুন\n- সপ্তাহে ২ বার প্রয়োগ করুন\n- জাব পোকা ও সাদা মাছি দমনে কার্যকর\n\nরসুন-মরিচ স্প্রে:\n- ১০০ গ্রাম রসুন ও ১০০ গ্রাম মরিচ পিষে ১ লিটার পানিতে মিশান\n- ২৪ ঘণ্টা ভিজিয়ে রাখুন\n- ছেঁকে নিয়ে ১০ লিটার পানিতে মিশিয়ে স্প্রে করুন\n\nপার্চিং:\n- প্রতি শতকে ৫-৬টি ডাল পুঁতে দিন\n- পাখি বসে পোকা খাবে\n\nআলোক ফাঁদ:\n- রাতে আলো জ্বালিয়ে নিচে পানির পাত্র রাখুন\n- পোকা আলোতে এসে পানিতে পড়বে',
    category: 'disease_pest',
    categoryBn: 'রোগ ও পোকা',
    image: '/placeholder-article.jpg',
    author: 'Farmer Karim',
    authorBn: 'কৃষক করিম',
    readTime: 7,
    publishedAt: '2024-11-28',
    viewCount: 892,
  },
  {
    id: 'a3',
    slug: 'government-subsidy-fertilizer',
    title: 'How to Get Government Fertilizer Subsidy',
    titleBn: 'সরকারি ভর্তুকিতে সার পাওয়ার উপায়',
    excerpt: 'Step-by-step guide to apply for fertilizer subsidy',
    excerptBn: 'সার ভর্তুকি পাওয়ার ধাপে ধাপে নির্দেশনা',
    content: 'Full article content...',
    contentBn: 'বাংলাদেশ সরকার কৃষকদের জন্য সার ভর্তুকি প্রদান করে থাকে। কিভাবে এই সুবিধা পাবেন তা জানুন।\n\nযোগ্যতা:\n- কৃষি জমির মালিক বা ইজারাদার\n- কৃষক কার্ড থাকতে হবে\n- জমির পরিমাণ কমপক্ষে ৫০ শতক\n\nআবেদন প্রক্রিয়া:\n১. ইউনিয়ন কৃষি অফিসে যোগাযোগ করুন\n২. প্রয়োজনীয় কাগজপত্র:\n   - জাতীয় পরিচয়পত্র\n   - জমির দলিল/খতিয়ান\n   - কৃষক কার্ড\n৩. আবেদন ফরম পূরণ করুন\n৪. ১৫ দিনের মধ্যে অনুমোদন পাবেন\n\nভর্তুকির হার:\n- ইউরিয়া: ৫০% ভর্তুকি\n- টিএসপি: ৪০% ভর্তুকি\n- এমওপি: ৪৫% ভর্তুকি\n\nসার সংগ্রহ:\nঅনুমোদনের পর নির্ধারিত ডিলার থেকে ভর্তুকি মূল্যে সার কিনতে পারবেন।',
    category: 'govt_scheme',
    categoryBn: 'সরকারি প্রকল্প',
    image: '/placeholder-article.jpg',
    author: 'Agriculture Officer',
    authorBn: 'কৃষি কর্মকর্তা',
    readTime: 6,
    publishedAt: '2024-11-25',
    viewCount: 2156,
  },
];

export const DEMO_CROPS: Crop[] = [
  {
    id: 'crop1',
    name: 'BR-28 Rice',
    nameBn: 'বিআর-২৮ ধান',
    scientificName: 'Oryza sativa',
    category: 'rice',
    categoryBn: 'ধান',
    image: '/placeholder-crop.jpg',
    images: ['/placeholder-crop.jpg', '/placeholder-crop.jpg', '/placeholder-crop.jpg'],
    seasons: ['rabi'],
    seasonsBn: ['রবি'],
    growingDays: 145,
    temperature: '20-30°C',
    temperatureBn: '২০-৩০°সে',
    soil: 'Clay loam, good drainage',
    soilBn: 'এঁটেল দোআঁশ, ভালো পানি নিষ্কাশন',
    water: 'Regular irrigation, 5-7cm water depth',
    waterBn: 'নিয়মিত সেচ, ৫-৭ সেমি পানির গভীরতা',
    cultivation: 'Land preparation, seedling transplantation',
    cultivationBn: 'জমি তৈরি: জমি ৩-৪ বার চাষ ও মই দিয়ে সমান করুন। বীজতলা তৈরি করে ২৫-৩০ দিন বয়সের চারা ১৫×২০ সেমি দূরত্বে রোপণ করুন। প্রতি গর্তে ২-৩টি চারা রোপণ করুন।',
    care: 'Fertilizer application, weed control, pest management',
    careBn: 'সার প্রয়োগ: ইউরিয়া ২৫০ কেজি, টিএসপি ১৫০ কেজি, এমওপি ১২০ কেজি প্রতি হেক্টরে। তিন কিস্তিতে ইউরিয়া প্রয়োগ করুন। আগাছা নিয়ন্ত্রণ: রোপণের ২০ ও ৪০ দিন পর নিড়ানি দিন।',
    harvesting: 'Harvest when 80% grains turn golden',
    harvestingBn: 'ফসল তোলা: ৮০% শিষ সোনালি রং ধারণ করলে কাটুন। সকালে কাটা ভালো। কাটার পর ভালোভাবে রোদে শুকান। মাড়াইয়ের পর বীজ আলাদা করে সংরক্ষণ করুন।',
    diseases: 'Blast, Brown spot, Sheath blight',
    diseasesBn: 'রোগ ও পোকা: ব্লাস্ট রোগ - কার্বেন্ডাজিম স্প্রে করুন। বাদামী দাগ - প্রোপিকোনাজল প্রয়োগ করুন। মাজরা পোকা - ফেরোমন ফাঁদ ব্যবহার করুন।',
  },
  {
    id: 'crop2',
    name: 'Tomato',
    nameBn: 'টমেটো',
    scientificName: 'Solanum lycopersicum',
    category: 'vegetables',
    categoryBn: 'সবজি',
    image: '/placeholder-crop.jpg',
    images: ['/placeholder-crop.jpg', '/placeholder-crop.jpg'],
    seasons: ['rabi'],
    seasonsBn: ['রবি'],
    growingDays: 75,
    temperature: '18-27°C',
    temperatureBn: '১৮-২৭°সে',
    soil: 'Well-drained loamy soil, pH 6-7',
    soilBn: 'সুনিষ্কাশিত দোআঁশ মাটি, পিএইচ ৬-৭',
    water: 'Regular watering, avoid waterlogging',
    waterBn: 'নিয়মিত পানি, জলাবদ্ধতা এড়িয়ে চলুন',
    cultivation: 'Seedbed preparation, transplanting after 25-30 days',
    cultivationBn: 'বীজতলা তৈরি করে ২৫-৩০ দিন বয়সের চারা ৬০×৪৫ সেমি দূরত্বে রোপণ করুন। সারি থেকে সারি ৬০ সেমি এবং গাছ থেকে গাছ ৪৫ সেমি দূরত্ব রাখুন।',
    care: 'Staking, pruning, balanced fertilization',
    careBn: 'খুঁটি দিয়ে গাছ বাঁধুন। অতিরিক্ত ডাল ছাঁটাই করুন। ১৫ দিন পর পর জৈব সার প্রয়োগ করুন। ফুল আসার সময় পটাশ সার বেশি দিন।',
    harvesting: 'Pick when fruits turn red, regular harvesting',
    harvestingBn: 'ফল লাল হলে তুলুন। নিয়মিত তুলতে হবে। সকালে তোলা ভালো। সাবধানে তুলুন যাতে গাছের ক্ষতি না হয়।',
    diseases: 'Leaf curl, Early blight, Late blight',
    diseasesBn: 'পাতা কোঁকড়ানো ভাইরাস - আক্রান্ত গাছ তুলে ফেলুন। আর্লি ব্লাইট - ম্যানকোজেব স্প্রে করুন। লেট ব্লাইট - কপার অক্সিক্লোরাইড ব্যবহার করুন।',
  },
  {
    id: 'crop3',
    name: 'Mango',
    nameBn: 'আম',
    scientificName: 'Mangifera indica',
    category: 'fruits',
    categoryBn: 'ফল',
    image: '/placeholder-crop.jpg',
    images: ['/placeholder-crop.jpg'],
    seasons: ['year_round'],
    seasonsBn: ['সারাবছর'],
    growingDays: 365,
    temperature: '24-30°C',
    temperatureBn: '২৪-৩০°সে',
    soil: 'Deep, well-drained sandy loam',
    soilBn: 'গভীর, সুনিষ্কাশিত বেলে দোআঁশ মাটি',
    water: 'Moderate watering, reduce during flowering',
    waterBn: 'মাঝারি পানি, ফুল আসার সময় কম দিন',
    cultivation: 'Plant during monsoon, grafted saplings preferred',
    cultivationBn: 'বর্ষাকালে রোপণ করুন। কলমের চারা ভালো। ১০×১০ মিটার দূরত্বে রোপণ করুন। গর্ত তৈরি করে জৈব সার মিশিয়ে নিন।',
    care: 'Pruning, pest control, fertilization',
    careBn: 'ছাঁটাই: শুকনো ও রোগাক্রান্ত ডাল কেটে ফেলুন। সার: বছরে ২ বার জৈব সার দিন। ফুল আসার আগে পটাশ সার প্রয়োগ করুন।',
    harvesting: 'Harvest when fruits mature, avoid damaging',
    harvestingBn: 'ফল পরিপক্ক হলে তুলুন। বৃন্ত সহ তুলুন। ক্ষতি এড়িয়ে সাবধানে সংগ্রহ করুন। ছায়ায় রেখে পাকান।',
    diseases: 'Anthracnose, Powdery mildew, Hopper',
    diseasesBn: 'অ্যানথ্রাকনোজ - কার্বেন্ডাজিম স্প্রে করুন। পাউডারি মিলডিউ - সালফার ডাস্ট করুন। হপার - ইমিডাক্লোপ্রিড প্রয়োগ করুন।',
  },
];

export const DEMO_VIDEOS: Video[] = [
  {
    id: 'v1',
    title: 'Modern Rice Farming',
    titleBn: 'আধুনিক ধান চাষ',
    description: 'Learn step by step rice cultivation',
    descriptionBn: 'ধাপে ধাপে ধান চাষ শিখুন',
    youtubeId: 'dQw4w9WgXcQ',
    category: 'Farming Guide',
    categoryBn: 'চাষ গাইড',
    duration: '12:45',
    viewCount: 5420,
  },
  {
    id: 'v2',
    title: 'Organic Pest Control',
    titleBn: 'জৈব পোকা দমন',
    description: 'Natural methods to control pests',
    descriptionBn: 'প্রাকৃতিক পদ্ধতিতে পোকা নিয়ন্ত্রণ',
    youtubeId: 'dQw4w9WgXcQ',
    category: 'Disease & Pest',
    categoryBn: 'রোগ ও পোকা',
    duration: '8:30',
    viewCount: 3210,
  },
  {
    id: 'v3',
    title: 'Drip Irrigation Setup',
    titleBn: 'ড্রিপ সেচ স্থাপন',
    description: 'How to install drip irrigation',
    descriptionBn: 'ড্রিপ সেচ কিভাবে স্থাপন করবেন',
    youtubeId: 'dQw4w9WgXcQ',
    category: 'Fertilizer & Irrigation',
    categoryBn: 'সার ও সেচ',
    duration: '15:20',
    viewCount: 2890,
  },
];
