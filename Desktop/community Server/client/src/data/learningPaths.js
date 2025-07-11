// Shared learning paths data - single source of truth
export const learningPathsData = {
  1: {
    id: 1,
    title: "AI Fundamentals for Beginners",
    creator: "Dr. Sarah Chen",
    category: "Machine Learning",
    difficulty: "Beginner",
    rating: 4.8,
    students: 1240,
    duration: "8 weeks",
    steps: 8,
    progress: 20,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center",
    description: "Start your AI journey with this beginner-friendly path covering the basics of machine learning, data, and algorithms.",
    modules: [
      { 
        title: "Introduction to AI", 
        completed: true,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          duration: "15:30",
          thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center"
        },
        content: "Learn what artificial intelligence is and how it's transforming our world."
      },
      { 
        title: "What is Machine Learning?", 
        completed: true,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          duration: "22:15",
          thumbnail: "https://images.unsplash.com/photo-1676299251996-879af8c5d6f3?w=400&h=250&fit=crop&crop=center"
        },
        content: "Understand the fundamentals of machine learning and its applications."
      },
      { 
        title: "Types of Machine Learning", 
        completed: false,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          duration: "18:45",
          thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center"
        },
        content: "Explore supervised, unsupervised, and reinforcement learning."
      },
      { 
        title: "Data Preparation", 
        completed: false,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
          duration: "25:10",
          thumbnail: "https://images.unsplash.com/photo-1676299251996-879af8c5d6f3?w=400&h=250&fit=crop&crop=center"
        },
        content: "Learn how to clean and prepare data for machine learning models."
      },
      { 
        title: "Supervised vs Unsupervised", 
        completed: false,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
          duration: "20:30",
          thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center"
        },
        content: "Compare different approaches to machine learning."
      },
      { 
        title: "Model Evaluation", 
        completed: false,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
          duration: "28:20",
          thumbnail: "https://images.unsplash.com/photo-1676299251996-879af8c5d6f3?w=400&h=250&fit=crop&crop=center"
        },
        content: "Understand how to evaluate and improve your models."
      },
      { 
        title: "Ethics in AI", 
        completed: false,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
          duration: "16:45",
          thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center"
        },
        content: "Explore the ethical considerations in AI development."
      },
      { 
        title: "Next Steps", 
        completed: false,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
          duration: "12:30",
          thumbnail: "https://images.unsplash.com/photo-1676299251996-879af8c5d6f3?w=400&h=250&fit=crop&crop=center"
        },
        content: "Plan your next steps in the AI learning journey."
      },
    ]
  },
  2: {
    id: 2,
    title: "Deep Learning Mastery",
    creator: "Prof. Michael Rodriguez",
    category: "Deep Learning",
    difficulty: "Advanced",
    rating: 4.9,
    students: 856,
    duration: "12 weeks",
    steps: 12,
    progress: 0,
    image: "https://images.unsplash.com/photo-1676299251996-879af8c5d6f3?w=400&h=250&fit=crop&crop=center",
    description: "Master neural networks, CNNs, RNNs, and transformers with hands-on projects and real-world applications.",
    modules: [
      { 
        title: "Neural Network Basics", 
        completed: false,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          duration: "35:20",
          thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center"
        },
        content: "Build your first neural network from scratch."
      },
      { 
        title: "Backpropagation", 
        completed: false,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          duration: "42:15",
          thumbnail: "https://images.unsplash.com/photo-1676299251996-879af8c5d6f3?w=400&h=250&fit=crop&crop=center"
        },
        content: "Understand how neural networks learn through backpropagation."
      },
      { 
        title: "Convolutional Neural Networks", 
        completed: false,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          duration: "38:45",
          thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center"
        },
        content: "Learn CNNs for image recognition and computer vision."
      },
      { 
        title: "Recurrent Neural Networks", 
        completed: false,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
          duration: "45:30",
          thumbnail: "https://images.unsplash.com/photo-1676299251996-879af8c5d6f3?w=400&h=250&fit=crop&crop=center"
        },
        content: "Explore RNNs for sequential data processing."
      },
      { 
        title: "Transformers", 
        completed: false,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
          duration: "52:10",
          thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center"
        },
        content: "Master the transformer architecture used in modern AI."
      },
      { 
        title: "Transfer Learning", 
        completed: false,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
          duration: "28:25",
          thumbnail: "https://images.unsplash.com/photo-1676299251996-879af8c5d6f3?w=400&h=250&fit=crop&crop=center"
        },
        content: "Learn to leverage pre-trained models for your projects."
      },
      { 
        title: "Model Deployment", 
        completed: false,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
          duration: "33:40",
          thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center"
        },
        content: "Deploy your models to production environments."
      },
      { 
        title: "Advanced Architectures", 
        completed: false,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
          duration: "48:15",
          thumbnail: "https://images.unsplash.com/photo-1676299251996-879af8c5d6f3?w=400&h=250&fit=crop&crop=center"
        },
        content: "Explore cutting-edge neural network architectures."
      },
      { 
        title: "Optimization Techniques", 
        completed: false,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          duration: "36:20",
          thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center"
        },
        content: "Optimize your models for better performance."
      },
      { 
        title: "Real-world Projects", 
        completed: false,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          duration: "55:30",
          thumbnail: "https://images.unsplash.com/photo-1676299251996-879af8c5d6f3?w=400&h=250&fit=crop&crop=center"
        },
        content: "Build complete deep learning projects from start to finish."
      },
      { 
        title: "Performance Tuning", 
        completed: false,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          duration: "41:45",
          thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center"
        },
        content: "Fine-tune your models for optimal performance."
      },
      { 
        title: "Future of Deep Learning", 
        completed: false,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
          duration: "25:10",
          thumbnail: "https://images.unsplash.com/photo-1676299251996-879af8c5d6f3?w=400&h=250&fit=crop&crop=center"
        },
        content: "Explore emerging trends and future directions in deep learning."
      },
    ]
  },
  3: {
    id: 3,
    title: "Natural Language Processing",
    creator: "Dr. Emily Watson",
    category: "NLP",
    difficulty: "Intermediate",
    rating: 4.7,
    students: 1123,
    duration: "10 weeks",
    steps: 10,
    progress: 60,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center",
    description: "Learn text processing, sentiment analysis, and build chatbots with modern NLP techniques.",
    modules: [
      { 
        title: "Text Preprocessing", 
        completed: true,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
          duration: "18:30",
          thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center"
        },
        content: "Clean and prepare text data for NLP tasks."
      },
      { 
        title: "Tokenization", 
        completed: true,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
          duration: "22:15",
          thumbnail: "https://images.unsplash.com/photo-1676299251996-879af8c5d6f3?w=400&h=250&fit=crop&crop=center"
        },
        content: "Break down text into meaningful units for processing."
      },
      { 
        title: "Word Embeddings", 
        completed: true,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
          duration: "28:45",
          thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center"
        },
        content: "Represent words as vectors in high-dimensional space."
      },
      { 
        title: "Sentiment Analysis", 
        completed: true,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
          duration: "32:20",
          thumbnail: "https://images.unsplash.com/photo-1676299251996-879af8c5d6f3?w=400&h=250&fit=crop&crop=center"
        },
        content: "Analyze the emotional tone of text data."
      },
      { 
        title: "Named Entity Recognition", 
        completed: true,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          duration: "25:10",
          thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center"
        },
        content: "Identify and classify named entities in text."
      },
      { 
        title: "Text Classification", 
        completed: true,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          duration: "35:30",
          thumbnail: "https://images.unsplash.com/photo-1676299251996-879af8c5d6f3?w=400&h=250&fit=crop&crop=center"
        },
        content: "Categorize text into predefined classes."
      },
      { 
        title: "Sequence Models", 
        completed: false,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          duration: "42:15",
          thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center"
        },
        content: "Process sequential data with RNNs and LSTMs."
      },
      { 
        title: "Transformer Models", 
        completed: false,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
          duration: "48:30",
          thumbnail: "https://images.unsplash.com/photo-1676299251996-879af8c5d6f3?w=400&h=250&fit=crop&crop=center"
        },
        content: "Work with BERT, GPT, and other transformer models."
      },
      { 
        title: "Building Chatbots", 
        completed: false,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
          duration: "38:45",
          thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center"
        },
        content: "Create intelligent conversational agents."
      },
      { 
        title: "NLP Applications", 
        completed: false,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
          duration: "45:20",
          thumbnail: "https://images.unsplash.com/photo-1676299251996-879af8c5d6f3?w=400&h=250&fit=crop&crop=center"
        },
        content: "Apply NLP techniques to real-world problems."
      },
    ]
  },
  4: {
    id: 4,
    title: "Computer Vision Mastery",
    creator: "Michael Chang",
    category: "Computer Vision",
    difficulty: "Intermediate",
    rating: 4.6,
    students: 432,
    duration: "15 weeks",
    steps: 15,
    progress: 80,
    image: "https://images.unsplash.com/photo-1676299251996-879af8c5d6f3?w=400&h=250&fit=crop&crop=center",
    description: "Master image processing, object detection, and computer vision applications with hands-on projects.",
    modules: [
      { 
        title: "Image Fundamentals", 
        completed: true,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
          duration: "20:15",
          thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center"
        },
        content: "Understand the basics of digital image representation."
      },
      { 
        title: "Image Processing Basics", 
        completed: true,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
          duration: "25:30",
          thumbnail: "https://images.unsplash.com/photo-1676299251996-879af8c5d6f3?w=400&h=250&fit=crop&crop=center"
        },
        content: "Learn fundamental image processing techniques."
      },
      { 
        title: "Feature Detection", 
        completed: true,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          duration: "28:45",
          thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center"
        },
        content: "Detect and extract meaningful features from images."
      },
      { 
        title: "Edge Detection", 
        completed: true,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          duration: "22:10",
          thumbnail: "https://images.unsplash.com/photo-1676299251996-879af8c5d6f3?w=400&h=250&fit=crop&crop=center"
        },
        content: "Identify boundaries and edges in images."
      },
      { 
        title: "Object Detection", 
        completed: true,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          duration: "35:20",
          thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center"
        },
        content: "Locate and classify objects within images."
      },
      { 
        title: "Image Segmentation", 
        completed: true,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
          duration: "32:15",
          thumbnail: "https://images.unsplash.com/photo-1676299251996-879af8c5d6f3?w=400&h=250&fit=crop&crop=center"
        },
        content: "Divide images into meaningful segments."
      },
      { 
        title: "Face Recognition", 
        completed: true,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
          duration: "38:30",
          thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center"
        },
        content: "Build face recognition and identification systems."
      },
      { 
        title: "Deep Learning for CV", 
        completed: true,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
          duration: "45:15",
          thumbnail: "https://images.unsplash.com/photo-1676299251996-879af8c5d6f3?w=400&h=250&fit=crop&crop=center"
        },
        content: "Apply deep learning techniques to computer vision."
      },
      { 
        title: "CNN Architectures", 
        completed: false,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
          duration: "42:20",
          thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center"
        },
        content: "Explore advanced CNN architectures for vision tasks."
      },
      { 
        title: "Transfer Learning", 
        completed: false,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
          duration: "28:45",
          thumbnail: "https://images.unsplash.com/photo-1676299251996-879af8c5d6f3?w=400&h=250&fit=crop&crop=center"
        },
        content: "Leverage pre-trained models for computer vision."
      },
      { 
        title: "Real-time Processing", 
        completed: false,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          duration: "35:10",
          thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center"
        },
        content: "Process video streams in real-time."
      },
      { 
        title: "Video Analysis", 
        completed: false,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          duration: "48:30",
          thumbnail: "https://images.unsplash.com/photo-1676299251996-879af8c5d6f3?w=400&h=250&fit=crop&crop=center"
        },
        content: "Analyze and understand video content."
      },
      { 
        title: "3D Computer Vision", 
        completed: false,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          duration: "52:15",
          thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center"
        },
        content: "Work with 3D data and point clouds."
      },
      { 
        title: "Medical Imaging", 
        completed: false,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
          duration: "38:20",
          thumbnail: "https://images.unsplash.com/photo-1676299251996-879af8c5d6f3?w=400&h=250&fit=crop&crop=center"
        },
        content: "Apply computer vision to medical imaging."
      },
      { 
        title: "Autonomous Vehicles", 
        completed: false,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
          duration: "45:40",
          thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center"
        },
        content: "Computer vision for self-driving cars."
      },
    ]
  },
  5: {
    id: 5,
    title: "Reinforcement Learning Basics",
    creator: "Prof. David Kim",
    category: "RL",
    difficulty: "Advanced",
    rating: 4.5,
    students: 234,
    duration: "6 weeks",
    steps: 6,
    progress: 100,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center",
    description: "Learn the fundamentals of reinforcement learning, Q-learning, and policy optimization for AI agents.",
    modules: [
      { 
        title: "RL Fundamentals", 
        completed: true,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
          duration: "32:15",
          thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center"
        },
        content: "Understand the basics of reinforcement learning."
      },
      { 
        title: "Markov Decision Processes", 
        completed: true,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
          duration: "28:30",
          thumbnail: "https://images.unsplash.com/photo-1676299251996-879af8c5d6f3?w=400&h=250&fit=crop&crop=center"
        },
        content: "Model decision-making problems with MDPs."
      },
      { 
        title: "Q-Learning", 
        completed: true,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
          duration: "35:45",
          thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center"
        },
        content: "Learn Q-learning for value-based RL."
      },
      { 
        title: "Policy Gradient Methods", 
        completed: true,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          duration: "42:20",
          thumbnail: "https://images.unsplash.com/photo-1676299251996-879af8c5d6f3?w=400&h=250&fit=crop&crop=center"
        },
        content: "Explore policy-based reinforcement learning."
      },
      { 
        title: "Deep Q-Networks", 
        completed: true,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          duration: "48:15",
          thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center"
        },
        content: "Combine deep learning with Q-learning."
      },
      { 
        title: "Multi-Agent Systems", 
        completed: true,
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          duration: "38:30",
          thumbnail: "https://images.unsplash.com/photo-1676299251996-879af8c5d6f3?w=400&h=250&fit=crop&crop=center"
        },
        content: "Build systems with multiple learning agents."
      },
    ]
  }
};

// Helper function to get all paths for listing
export const getAllLearningPaths = () => {
  return Object.values(learningPathsData);
};

// Helper function to get a specific path by ID
export const getLearningPathById = (id) => {
  return learningPathsData[id] || null;
};

// Mock API function for async simulation
export const fetchLearningPath = async (id) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return getLearningPathById(id);
}; 