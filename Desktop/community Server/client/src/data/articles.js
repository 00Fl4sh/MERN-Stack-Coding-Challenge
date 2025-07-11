// Shared articles data - single source of truth
export const articlesData = [
  {
    id: 1,
    title: "The Future of AI in Healthcare",
    creator: "Dr. Emily Watson",
    readTime: "8 min",
    views: "1.8K",
    thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=225&fit=crop",
    category: "AI News",
    description: "Exploring how artificial intelligence is revolutionizing healthcare delivery and patient outcomes.",
    rating: 4.9,
    uploadDate: "2 days ago",
    tags: ["Healthcare", "AI", "Medical"]
  },
  {
    id: 2,
    title: "Understanding Transformer Architecture",
    creator: "Dr. Sarah Chen",
    readTime: "12 min",
    views: "2.4K",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop",
    category: "Deep Learning",
    description: "A comprehensive guide to understanding the transformer architecture that powers modern NLP models.",
    rating: 4.8,
    uploadDate: "1 week ago",
    tags: ["Transformers", "NLP", "Deep Learning"]
  },
  {
    id: 3,
    title: "AI Ethics: Balancing Innovation and Responsibility",
    creator: "Prof. Michael Chang",
    readTime: "15 min",
    views: "3.2K",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop",
    category: "AI Ethics",
    description: "Examining the ethical considerations in AI development and deployment.",
    rating: 4.7,
    uploadDate: "3 weeks ago",
    tags: ["Ethics", "Responsible AI", "Governance"]
  },
  {
    id: 4,
    title: "Machine Learning in Financial Services",
    creator: "Alex Rodriguez",
    readTime: "6 min",
    views: "1.5K",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop",
    category: "Industry Analysis",
    description: "How machine learning is transforming the financial services industry.",
    rating: 4.6,
    uploadDate: "1 month ago",
    tags: ["Finance", "ML", "Industry"]
  },
  {
    id: 5,
    title: "Neural Networks: From Theory to Practice",
    creator: "Dr. Sarah Chen",
    readTime: "18 min",
    views: "2.8K",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop",
    category: "Machine Learning",
    description: "A practical guide to implementing neural networks in real-world applications.",
    rating: 4.9,
    uploadDate: "1 week ago",
    tags: ["Neural Networks", "Implementation", "Practice"]
  },
  {
    id: 6,
    title: "Computer Vision Applications in Autonomous Vehicles",
    creator: "Michael Chang",
    readTime: "10 min",
    views: "2.1K",
    thumbnail: "https://images.unsplash.com/photo-1676299251950-8d7593b8c2e1?w=400&h=225&fit=crop",
    category: "Computer Vision",
    description: "Exploring how computer vision is enabling autonomous vehicle technology.",
    rating: 4.5,
    uploadDate: "2 weeks ago",
    tags: ["Computer Vision", "Autonomous Vehicles", "Technology"]
  }
];

export const getAllArticles = () => articlesData;

export const getArticleById = (id) => {
  return articlesData.find(article => article.id === parseInt(id));
};

export const getArticlesByCategory = (category) => {
  return articlesData.filter(article => article.category === category);
};

export const getRecentArticles = (limit = 3) => {
  return articlesData.slice(0, limit);
}; 