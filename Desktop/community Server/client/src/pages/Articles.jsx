import { useState } from 'react';
import { getAllArticles } from '../data/articles';
import { useNavigate } from 'react-router-dom';

function Articles() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedReadTime, setSelectedReadTime] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const categories = [
    { id: 'all', name: 'All Categories', icon: '🌟' },
    { id: 'AI News', name: 'AI News', icon: '📰' },
    { id: 'Machine Learning', name: 'Machine Learning', icon: '🤖' },
    { id: 'Deep Learning', name: 'Deep Learning', icon: '🧠' },
    { id: 'AI Ethics', name: 'AI Ethics', icon: '⚖️' },
    { id: 'Industry Analysis', name: 'Industry Analysis', icon: '💼' },
    { id: 'Computer Vision', name: 'Computer Vision', icon: '👁️' }
  ];

  const readTimes = [
    { id: 'all', name: 'Any Read Time', icon: '⏱️' },
    { id: 'short', name: 'Under 5 min', icon: '⚡' },
    { id: 'medium', name: '5-15 min', icon: '📖' },
    { id: 'long', name: 'Over 15 min', icon: '📚' }
  ];

  const articles = getAllArticles();

  const getReadTimeCategory = (readTime) => {
    const minutes = parseInt(readTime.split(' ')[0]);
    if (minutes < 5) return 'short';
    if (minutes <= 15) return 'medium';
    return 'long';
  };

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesReadTime = selectedReadTime === 'all' || getReadTimeCategory(article.readTime) === selectedReadTime;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesReadTime && matchesSearch;
  });

  // Calculate read time statistics
  const shortArticles = articles.filter(a => getReadTimeCategory(a.readTime) === 'short').length;
  const mediumArticles = articles.filter(a => getReadTimeCategory(a.readTime) === 'medium').length;
  const longArticles = articles.filter(a => getReadTimeCategory(a.readTime) === 'long').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pb-12">
      {/* Header / Hero */}
      <div className="relative bg-gradient-to-r from-primary-50 to-blue-100 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 font-playfair tracking-tight drop-shadow-lg">
            AI Articles
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto font-inter mb-8">
            Read in-depth articles on AI topics, research, and industry insights
          </p>
          
          {/* Read Time Statistics */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-gray-700 bg-white/60 px-4 py-2 rounded-full">
              <span className="text-lg">⚡</span>
              <span className="font-semibold">{shortArticles} Quick</span>
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center gap-2 text-gray-700 bg-white/60 px-4 py-2 rounded-full">
              <span className="text-lg">📖</span>
              <span className="font-semibold">{mediumArticles} Medium</span>
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center gap-2 text-gray-700 bg-white/60 px-4 py-2 rounded-full">
              <span className="text-lg">📚</span>
              <span className="font-semibold">{longArticles} Deep</span>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-2xl w-full mx-auto mt-2">
            <div className="relative shadow-md rounded-2xl">
              <input
                type="text"
                placeholder="Search articles, authors, or topics..."
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
        {/* Filters */}
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row gap-6 bg-white/70 rounded-2xl p-6 shadow-sm">
            {/* Category Filter */}
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-gray-50 text-gray-800"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Read Time Filter */}
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Read Time</label>
              <select
                value={selectedReadTime}
                onChange={(e) => setSelectedReadTime(e.target.value)}
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-gray-50 text-gray-800"
              >
                {readTimes.map((readTime) => (
                  <option key={readTime.id} value={readTime.id}>
                    {readTime.icon} {readTime.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedReadTime('all');
                  setSearchQuery('');
                }}
                className="px-6 py-2 bg-primary-50 text-primary-700 rounded-full font-semibold hover:bg-primary-100 transition-colors shadow"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 font-playfair">
            {filteredArticles.length} Article{filteredArticles.length !== 1 ? 's' : ''} Found
          </h2>
          <div className="text-sm text-gray-600">
            Showing {filteredArticles.length} of {articles.length} articles
            {selectedReadTime !== 'all' && (
              <span className="ml-2 px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-medium">
                {readTimes.find(rt => rt.id === selectedReadTime)?.name}
              </span>
            )}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <div 
              key={article.id} 
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100 group cursor-pointer"
              onClick={() => navigate(`/article/${article.id}`)}
            >
              {/* Thumbnail */}
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center relative overflow-hidden">
                  <div className="text-center z-10">
                    <div className="text-4xl mb-2">📄</div>
                    <div className="text-sm text-green-700 font-medium">{article.category}</div>
                  </div>
                  
                  {/* Read Time Badge */}
                  <div className="absolute top-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-xs font-semibold shadow">
                    {article.readTime}
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors font-playfair">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                  {article.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {article.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-green-50 text-green-700 rounded-md text-xs font-medium border border-green-200">
                      {tag}
                    </span>
                  ))}
                  {article.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded-md text-xs font-medium">
                      +{article.tags.length - 3} more
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                      {article.creator}
                    </span>
                    <span>{article.views} reads</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500 text-base">★</span>
                    <span className="text-base font-medium text-gray-700">{article.rating}</span>
                  </div>
                </div>

                {/* Upload Date */}
                <div className="text-sm text-gray-500 mb-4">
                  {article.uploadDate}
                </div>

                {/* Read Button */}
                <button
                  className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white py-2 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center text-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/article/${article.id}`);
                  }}
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                  </svg>
                  Read Article
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 font-playfair">No articles found</h3>
            <p className="text-gray-600 mb-6 font-inter">
              Try adjusting your search criteria or filters to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedReadTime('all');
                setSearchQuery('');
              }}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Articles; 