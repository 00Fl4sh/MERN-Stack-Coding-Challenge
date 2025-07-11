import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllVideos } from '../data/videos';

function Videos() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Categories', icon: '🎥' },
    { id: 'Neural Networks', name: 'Neural Networks', icon: '🧠' },
    { id: 'Machine Learning', name: 'Machine Learning', icon: '🤖' },
    { id: 'NLP', name: 'Natural Language Processing', icon: '💬' },
    { id: 'Computer Vision', name: 'Computer Vision', icon: '👁️' },
    { id: 'Deep Learning', name: 'Deep Learning', icon: '⚡' },
    { id: 'AI Ethics', name: 'AI Ethics', icon: '⚖️' }
  ];

  const durations = [
    { id: 'all', name: 'Any Duration', icon: '⏱️' },
    { id: 'short', name: 'Under 10 min', icon: '⚡' },
    { id: 'medium', name: '10-30 min', icon: '📺' },
    { id: 'long', name: 'Over 30 min', icon: '🎬' }
  ];

  const videos = getAllVideos();

  const getDurationCategory = (duration) => {
    const minutes = parseInt(duration.split(':')[0]);
    if (minutes < 10) return 'short';
    if (minutes <= 30) return 'medium';
    return 'long';
  };

  const filteredVideos = videos.filter(video => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesDuration = selectedDuration === 'all' || getDurationCategory(video.duration) === selectedDuration;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDuration && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pb-12">
      {/* Header / Hero */}
      <div className="relative bg-gradient-to-r from-primary-50 to-blue-100 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 font-playfair tracking-tight drop-shadow-lg">
            Video Tutorials
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto font-inter mb-8">
            Learn AI concepts through expert-led video tutorials and hands-on demonstrations
          </p>
          {/* Search Bar */}
          <div className="max-w-2xl w-full mx-auto mt-2">
            <div className="relative shadow-md rounded-2xl">
              <input
                type="text"
                placeholder="Search videos, creators, or topics..."
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

            {/* Duration Filter */}
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-gray-50 text-gray-800"
              >
                {durations.map((duration) => (
                  <option key={duration.id} value={duration.id}>
                    {duration.icon} {duration.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedDuration('all');
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
            {filteredVideos.length} Video{filteredVideos.length !== 1 ? 's' : ''} Found
          </h2>
          <div className="text-sm text-gray-600">
            Showing {filteredVideos.length} of {videos.length} videos
          </div>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredVideos.map((video) => (
            <div key={video.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100 group">
              {/* Thumbnail */}
              <div className="relative overflow-hidden cursor-pointer group" onClick={() => window.location.href = `/video/${video.id}`}>
                <img 
                  src={video.thumbnail || '/placeholder-video.jpg'} 
                  alt={video.title} 
                  className="aspect-video w-full object-cover bg-primary-100 group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="absolute top-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-xs font-semibold shadow">
                  {video.duration}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Title and Rating */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 cursor-pointer font-playfair" onClick={() => window.location.href = `/video/${video.id}`}>
                    {video.title}
                  </h3>
                  <div className="flex items-center space-x-1 ml-2">
                    <span className="text-yellow-500 text-base">★</span>
                    <span className="text-base font-medium text-gray-700">{video.rating}</span>
                  </div>
                </div>

                {/* Creator and Views */}
                <div className="flex items-center justify-between mb-3">
                  <p className="text-gray-600 text-sm font-medium">{video.creator}</p>
                  <p className="text-gray-500 text-sm">{video.views} views</p>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {video.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {video.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Upload Date */}
                <div className="text-xs text-gray-400 mb-4">
                  {video.uploadDate}
                </div>

                {/* Watch Button */}
                <button
                  onClick={() => window.location.href = `/video/${video.id}`}
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white py-2 px-4 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>Watch Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-16">
            <div className="text-7xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 font-playfair">No videos found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDuration('all');
                setSearchQuery('');
              }}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Videos; 