import { useState } from 'react';
import { Link } from 'react-router-dom';

function Explore() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All', icon: '🌟' },
    { id: 'machine-learning', name: 'Machine Learning', icon: '🤖' },
    { id: 'deep-learning', name: 'Deep Learning', icon: '🧠' },
    { id: 'nlp', name: 'NLP', icon: '💬' },
    { id: 'computer-vision', name: 'Computer Vision', icon: '👁️' },
    { id: 'data-science', name: 'Data Science', icon: '📊' },
    { id: 'ai-ethics', name: 'AI Ethics', icon: '⚖️' },
    { id: 'robotics', name: 'Robotics', icon: '🤖' }
  ];

  const trendingContent = [
    {
      id: 1,
      type: 'video',
      title: 'Introduction to Neural Networks',
      creator: 'Dr. Sarah Chen',
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop',
      duration: '12:34',
      views: '2.4K',
      category: 'deep-learning',
      rating: 4.8
    },
    {
      id: 2,
      type: 'article',
      title: 'The Future of AI in Healthcare',
      creator: 'Dr. Emily Watson',
      thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=225&fit=crop',
      readTime: '5 min',
      views: '1.8K',
      category: 'ai-ethics',
      rating: 4.9
    },
    {
      id: 3,
      type: 'podcast',
      title: 'AI Ethics and Responsible Development',
      creator: 'Tech Ethics Podcast',
      thumbnail: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=225&fit=crop',
      duration: '45:22',
      views: '3.1K',
      category: 'ai-ethics',
      rating: 4.7
    },
    {
      id: 4,
      type: 'learning-path',
      title: 'Complete Machine Learning Journey',
      creator: 'AI Academy',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop',
      modules: 12,
      students: '2.1K',
      category: 'machine-learning',
      rating: 4.9
    }
  ];

  const filteredContent = trendingContent.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.creator.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return '🎥';
      case 'article': return '📄';
      case 'podcast': return '🎧';
      case 'learning-path': return '📚';
      default: return '📄';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pb-12">
      {/* Header / Hero */}
      <div className="relative bg-gradient-to-r from-primary-50 to-blue-100 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 font-playfair tracking-tight drop-shadow-lg">
            Explore AI Content
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto font-inter mb-8">
            Discover the latest videos, articles, podcasts, and learning paths in artificial intelligence
          </p>
          {/* Search Bar */}
          <div className="max-w-2xl w-full mx-auto mt-2">
            <div className="relative shadow-md rounded-2xl">
              <input
                type="text"
                placeholder="Search for AI content, creators, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3 pl-14 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white text-gray-900 text-base shadow-sm"
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-blue-100/40 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filters */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 font-playfair">Categories</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-2 rounded-full text-base font-semibold transition-all duration-200 shadow-sm flex items-center gap-2
                  ${selectedCategory === category.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}
                `}
              >
                <span className="text-lg">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 font-playfair">
              {selectedCategory === 'all' ? 'Trending Content' : `${categories.find(c => c.id === selectedCategory)?.name} Content`}
            </h2>
            <span className="text-gray-600">{filteredContent.length} items found</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredContent.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100 group">
                {/* Thumbnail */}
                <div className="relative cursor-pointer group">
                  {item.thumbnail ? (
                    <img src={item.thumbnail} alt={item.title} className="aspect-video w-full object-cover bg-primary-100 group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="aspect-video w-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                      <span className="text-4xl">{getTypeIcon(item.type)}</span>
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-black/80 text-white text-xs rounded-full font-semibold shadow">
                      {getTypeIcon(item.type)} {item.type}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-xs font-semibold shadow">
                    {item.duration || item.readTime || (item.modules && `${item.modules} modules`)}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors text-lg font-playfair cursor-pointer">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-gray-600 font-medium">{item.creator}</p>
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500 text-base">★</span>
                      <span className="text-base font-medium text-gray-700">{item.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{item.views} views</span>
                    {item.students && <span>{item.students} students</span>}
                  </div>
                  {/* Action Button */}
                  <Link
                    to={`/${item.type === 'learning-path' ? 'paths' : item.type}s`}
                    className="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white py-2 px-4 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center text-center"
                  >
                    {item.type === 'video' && 'Watch Now'}
                    {item.type === 'article' && 'Read Article'}
                    {item.type === 'podcast' && 'Listen Now'}
                    {item.type === 'learning-path' && 'Start Learning'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredContent.length === 0 && (
          <div className="text-center py-16">
            <div className="text-7xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 font-playfair">No content found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or category filters</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Explore; 