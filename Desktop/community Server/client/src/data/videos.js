// Shared videos data - single source of truth
export const videosData = [
  {
    id: 1,
    title: "Introduction to Neural Networks",
    creator: "Dr. Sarah Chen",
    duration: "12:34",
    views: "2.4K",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop",
    tags: ["Neural Networks", "Deep Learning"],
    rating: 4.8,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    description: "Learn the fundamentals of neural networks and how they form the backbone of modern AI systems. This comprehensive tutorial covers everything from basic concepts to practical implementation.",
    category: "Neural Networks",
    difficulty: "Beginner",
    language: "English",
    subtitles: true,
    transcript: "Welcome to our comprehensive guide on neural networks...",
    relatedVideos: [2, 3, 4],
    uploadDate: "2 weeks ago",
    likes: 1247,
    dislikes: 23,
    subscribers: "45.2K",
    comments: [
      {
        id: 1,
        author: "AI Enthusiast",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        text: "Excellent explanation! This really helped me understand the basics. Looking forward to more content.",
        likes: 45,
        time: "3 days ago",
        replies: [
          {
            id: 11,
            author: "Dr. Sarah Chen",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
            text: "Thank you! I'm glad it was helpful. The next video will cover backpropagation in detail.",
            likes: 12,
            time: "2 days ago"
          }
        ]
      },
      {
        id: 2,
        author: "Machine Learning Student",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        text: "Could you explain more about the activation functions? I'm a bit confused about when to use each one.",
        likes: 23,
        time: "1 week ago"
      }
    ]
  },
  {
    id: 2,
    title: "Building Your First AI Model",
    creator: "Alex Rodriguez",
    duration: "18:45",
    views: "1.8K",
    thumbnail: "https://images.unsplash.com/photo-1676299251950-8d7593b8c2e1?w=400&h=225&fit=crop",
    tags: ["Machine Learning", "Python"],
    rating: 4.9,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    description: "Step-by-step guide to building your first AI model using Python. Perfect for beginners who want to get hands-on experience with machine learning.",
    category: "Machine Learning",
    difficulty: "Beginner",
    language: "English",
    subtitles: true,
    transcript: "In this tutorial, we'll build our first AI model from scratch...",
    relatedVideos: [1, 3, 4],
    uploadDate: "1 month ago",
    likes: 892,
    dislikes: 15,
    subscribers: "32.1K",
    comments: []
  },
  {
    id: 3,
    title: "Natural Language Processing Basics",
    creator: "Dr. Emily Watson",
    duration: "15:22",
    views: "3.1K",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop",
    tags: ["NLP", "Text Processing"],
    rating: 4.7,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    description: "Explore the fascinating world of Natural Language Processing. Learn how computers understand and process human language.",
    category: "NLP",
    difficulty: "Intermediate",
    language: "English",
    subtitles: true,
    transcript: "Natural Language Processing is one of the most exciting fields in AI...",
    relatedVideos: [1, 2, 4],
    uploadDate: "3 weeks ago",
    likes: 1567,
    dislikes: 34,
    subscribers: "28.9K",
    comments: []
  },
  {
    id: 4,
    title: "Computer Vision with OpenCV",
    creator: "Michael Chang",
    duration: "22:18",
    views: "1.2K",
    thumbnail: "https://images.unsplash.com/photo-1676299251950-8d7593b8c2e1?w=400&h=225&fit=crop",
    tags: ["Computer Vision", "OpenCV"],
    rating: 4.6,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    description: "Master computer vision techniques using OpenCV. Learn to process images and videos for AI applications.",
    category: "Computer Vision",
    difficulty: "Intermediate",
    language: "English",
    subtitles: true,
    transcript: "Computer vision is the field of AI that enables machines to see...",
    relatedVideos: [1, 2, 3],
    uploadDate: "1 week ago",
    likes: 734,
    dislikes: 18,
    subscribers: "19.7K",
    comments: []
  },
  {
    id: 5,
    title: "Deep Learning Fundamentals",
    creator: "Dr. Sarah Chen",
    duration: "35:42",
    views: "4.2K",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop",
    tags: ["Deep Learning", "Neural Networks"],
    rating: 4.9,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    description: "Comprehensive introduction to deep learning concepts and applications.",
    category: "Deep Learning",
    difficulty: "Advanced",
    language: "English",
    subtitles: true,
    transcript: "Deep learning is a subset of machine learning...",
    relatedVideos: [1, 2, 3],
    uploadDate: "1 week ago",
    likes: 2103,
    dislikes: 42,
    subscribers: "45.2K",
    comments: []
  },
  {
    id: 6,
    title: "AI Ethics and Responsible Development",
    creator: "Dr. Emily Watson",
    duration: "28:15",
    views: "2.8K",
    thumbnail: "https://images.unsplash.com/photo-1676299251950-8d7593b8c2e1?w=400&h=225&fit=crop",
    tags: ["AI Ethics", "Responsible AI"],
    rating: 4.8,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    description: "Understanding the ethical implications of AI development.",
    category: "AI Ethics",
    difficulty: "Intermediate",
    language: "English",
    subtitles: true,
    transcript: "As AI becomes more prevalent in our lives...",
    relatedVideos: [1, 2, 3],
    uploadDate: "2 weeks ago",
    likes: 1892,
    dislikes: 28,
    subscribers: "28.9K",
    comments: []
  }
];

export const getAllVideos = () => videosData;

export const getVideoById = (id) => {
  return videosData.find(video => video.id === parseInt(id));
};

export const getVideosByCategory = (category) => {
  return videosData.filter(video => video.category === category);
};

export const getLatestVideos = (limit = 4) => {
  return videosData.slice(0, limit);
}; 