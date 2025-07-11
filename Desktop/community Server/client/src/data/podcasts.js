// Shared podcasts data - single source of truth
export const podcastsData = [
  {
    id: 1,
    title: "AI Ethics and Responsible Development",
    creator: "Tech Ethics Podcast",
    duration: "45:22",
    views: "3.1K",
    thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=225&fit=crop",
    category: "Tech Ethics",
    description: "Exploring the ethical implications of AI development and deployment.",
    rating: 4.7,
    uploadDate: "3 days ago",
    guest: "Dr. Sarah Johnson",
    listeners: "12.5K",
    format: "audio", // "audio" or "video"
    audioUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // For audio podcasts
    videoUrl: null, // For video podcasts
    notes: "In this episode, Dr. Sarah Johnson discusses the critical importance of ethical considerations in AI development. We explore topics including bias in machine learning algorithms, transparency in AI decision-making, and the responsibility of developers in creating fair and accountable AI systems.",
    transcript: "Welcome to Tech Ethics Podcast. I'm your host, and today we're joined by Dr. Sarah Johnson, a leading expert in AI ethics and responsible development. Dr. Johnson, thank you for joining us today.\n\nDr. Johnson: Thank you for having me. It's a pleasure to be here.\n\nHost: Let's start with the basics. What are the most pressing ethical concerns in AI development today?\n\nDr. Johnson: There are several critical areas we need to address..."
  },
  {
    id: 2,
    title: "Latest in Machine Learning Research",
    creator: "ML Research Weekly",
    duration: "38:15",
    views: "2.8K",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop",
    category: "AI Research",
    description: "Weekly roundup of the most important machine learning research papers.",
    rating: 4.9,
    uploadDate: "1 week ago",
    guest: "Alex Chen",
    listeners: "8.9K",
    format: "video", // This is now a video podcast
    audioUrl: null,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    notes: "This week's episode features Alex Chen, a research scientist at DeepMind, discussing breakthrough papers in transformer architectures, multimodal learning, and the latest developments in large language models.",
    transcript: "Welcome to ML Research Weekly. I'm your host, and today we're diving deep into the latest machine learning research with Alex Chen from DeepMind. Alex, thanks for joining us.\n\nAlex Chen: Thanks for having me. It's been an exciting week in ML research.\n\nHost: Let's start with the transformer paper that's been making waves..."
  },
  {
    id: 3,
    title: "AI Industry Trends 2024",
    creator: "AI Business Insights",
    duration: "52:30",
    views: "4.2K",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop",
    category: "Industry Insights",
    description: "Analysis of current trends and future predictions in the AI industry.",
    rating: 4.8,
    uploadDate: "2 weeks ago",
    guest: "Dr. Maria Rodriguez",
    listeners: "15.2K",
    format: "video", // This is now a video podcast
    audioUrl: null,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    notes: "Dr. Maria Rodriguez, Chief AI Officer at TechCorp, shares insights on the current state of AI adoption across industries, investment trends, and predictions for the next 12 months.",
    transcript: "Welcome to AI Business Insights. Today we're joined by Dr. Maria Rodriguez, a leading voice in AI strategy and implementation. Dr. Rodriguez, thank you for your time.\n\nDr. Rodriguez: Thank you for having me. The AI landscape is evolving rapidly, and I'm excited to share some insights..."
  },
  {
    id: 4,
    title: "Building Scalable ML Systems",
    creator: "ML Engineering Podcast",
    duration: "42:18",
    views: "2.1K",
    thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=225&fit=crop",
    category: "ML Engineering",
    description: "Best practices for designing and deploying machine learning systems at scale.",
    rating: 4.6,
    uploadDate: "1 week ago",
    guest: "Michael Chang",
    listeners: "6.8K",
    format: "audio",
    audioUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    videoUrl: null,
    notes: "Michael Chang, Senior ML Engineer at ScaleAI, discusses the challenges and solutions for building production-ready machine learning systems that can handle millions of requests per day.",
    transcript: "Welcome to ML Engineering Podcast. Today we're talking about scaling machine learning systems with Michael Chang. Michael, thanks for joining us.\n\nMichael Chang: Thanks for having me. Scaling ML systems is one of the most challenging aspects of production ML..."
  },
  {
    id: 5,
    title: "The Future of AI in Healthcare",
    creator: "Healthcare AI Today",
    duration: "35:45",
    views: "3.8K",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop",
    category: "Healthcare AI",
    description: "Exploring how artificial intelligence is revolutionizing healthcare delivery and patient care.",
    rating: 4.9,
    uploadDate: "4 days ago",
    guest: "Dr. Emily Watson",
    listeners: "18.3K",
    format: "video", // This is now a video podcast
    audioUrl: null,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    notes: "Dr. Emily Watson, Director of AI at Mayo Clinic, discusses breakthrough applications of AI in medical diagnosis, treatment planning, and patient care management.",
    transcript: "Welcome to Healthcare AI Today. I'm joined by Dr. Emily Watson from Mayo Clinic, who's leading the charge in AI-powered healthcare. Dr. Watson, thank you for being here.\n\nDr. Watson: Thank you for having me. The intersection of AI and healthcare is incredibly exciting..."
  },
  {
    id: 6,
    title: "Ethics in Artificial Intelligence",
    creator: "AI Ethics Forum",
    duration: "48:12",
    views: "2.9K",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop",
    category: "AI Ethics",
    description: "Discussing the ethical implications and responsible development of AI technologies.",
    rating: 4.7,
    uploadDate: "1 week ago",
    guest: "Prof. David Kim",
    listeners: "11.7K",
    format: "audio",
    audioUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    videoUrl: null,
    notes: "Professor David Kim from Stanford's AI Ethics Lab explores the philosophical foundations of AI ethics and practical frameworks for implementing responsible AI development.",
    transcript: "Welcome to AI Ethics Forum. Today we're joined by Professor David Kim from Stanford University. Professor Kim, thank you for sharing your expertise with us.\n\nProf. Kim: Thank you for having me. Ethics in AI is not just a technical challenge, but a fundamental human challenge..."
  }
];

export const getAllPodcasts = () => podcastsData;

export const getPodcastById = (id) => {
  return podcastsData.find(podcast => podcast.id === parseInt(id));
};

export const getPodcastsByCategory = (category) => {
  return podcastsData.filter(podcast => podcast.category === category);
};

export const getTopPodcasts = (limit = 3) => {
  return podcastsData.slice(0, limit);
}; 