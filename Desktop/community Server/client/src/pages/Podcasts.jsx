import { useState } from 'react';
import { getAllPodcasts } from '../data/podcasts';
import { useNavigate } from 'react-router-dom';

function Podcasts() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('all'); // 'all', 'audio', 'video'
  const navigate = useNavigate();

  const categories = [
    { id: 'all', name: 'All Categories', icon: '🌟' },
    { id: 'AI News', name: 'AI News', icon: '📰' },
    { id: 'Tech Ethics', name: 'Tech Ethics', icon: '⚖️' },
    { id: 'Machine Learning', name: 'Machine Learning', icon: '🤖' },
    { id: 'AI Research', name: 'AI Research', icon: '🔬' },
    { id: 'Industry Insights', name: 'Industry Insights', icon: '💼' },
    { id: 'ML Engineering', name: 'ML Engineering', icon: '⚙️' },
    { id: 'Healthcare AI', name: 'Healthcare AI', icon: '🏥' },
    { id: 'AI Ethics', name: 'AI Ethics', icon: '⚖️' }
  ];

  const formatOptions = [
    { id: 'all', name: 'All Formats', icon: '🎧🎥', description: 'Audio and video podcasts' },
    { id: 'audio', name: 'Audio Only', icon: '🎧', description: 'Traditional audio podcasts' },
    { id: 'video', name: 'Video Podcasts', icon: '🎥', description: 'Video podcasts with visual content' }
  ];

  const podcasts = getAllPodcasts();
  
  // Calculate format statistics
  const audioPodcasts = podcasts.filter(p => p.format === 'audio').length;
  const videoPodcasts = podcasts.filter(p => p.format === 'video').length;

  const filteredPodcasts = podcasts.filter(podcast => {
    const matchesCategory = selectedCategory === 'all' || podcast.category === selectedCategory;
    const matchesFormat = selectedFormat === 'all' || podcast.format === selectedFormat;
    const matchesSearch = podcast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         podcast.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         podcast.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesFormat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pb-12">
      {/* Header / Hero */}
      <div className="relative bg-gradient-to-r from-primary-50 to-blue-100 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 font-playfair tracking-tight drop-shadow-lg">
            AI Podcasts
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto font-inter mb-8">
            Listen to expert discussions on AI topics and industry insights. 
            Choose from audio-only episodes or video podcasts with visual content.
          </p>
          
          {/* Format Statistics */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-gray-700 bg-white/60 px-4 py-2 rounded-full">
              <span className="text-2xl">🎧</span>
              <span className="font-semibold">{audioPodcasts} Audio</span>
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center gap-2 text-gray-700 bg-white/60 px-4 py-2 rounded-full">
              <span className="text-2xl">🎥</span>
              <span className="font-semibold">{videoPodcasts} Video</span>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-2xl w-full mx-auto mt-2">
            <div className="relative shadow-md rounded-2xl">
              <input
                type="text"
                placeholder="Search podcasts, creators, or topics..."
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

            {/* Format Filter */}
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Format</label>
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-gray-50 text-gray-800"
              >
                {formatOptions.map((format) => (
                  <option key={format.id} value={format.id}>
                    {format.icon} {format.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedFormat('all');
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
            {filteredPodcasts.length} Podcast{filteredPodcasts.length !== 1 ? 's' : ''} Found
          </h2>
          <div className="text-sm text-gray-600">
            Showing {filteredPodcasts.length} of {podcasts.length} podcasts
            {selectedFormat !== 'all' && (
              <span className="ml-2 px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-medium">
                {selectedFormat === 'video' ? '🎥 Video Only' : '🎧 Audio Only'}
              </span>
            )}
          </div>
        </div>

        {/* Podcasts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPodcasts.map((podcast) => (
            <div 
              key={podcast.id} 
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100 group cursor-pointer"
              onClick={() => navigate(`/podcast/${podcast.id}`)}
            >
              {/* Thumbnail */}
              <div className="relative">
                <div className={`aspect-video flex items-center justify-center relative overflow-hidden ${
                  podcast.format === 'video' 
                    ? 'bg-gradient-to-br from-blue-100 to-blue-200' 
                    : 'bg-gradient-to-br from-purple-100 to-purple-200'
                }`}>
                  <div className="text-center z-10">
                    <div className="text-4xl mb-2">
                      {podcast.format === 'video' ? '🎥' : '🎧'}
                    </div>
                    <div className={`text-sm font-medium ${
                      podcast.format === 'video' ? 'text-blue-700' : 'text-purple-700'
                    }`}>
                      {podcast.category}
                    </div>
                  </div>
                  
                  {/* Format Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow ${
                      podcast.format === 'video' 
                        ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                        : 'bg-purple-100 text-purple-700 border border-purple-200'
                    }`}>
                      <span>{podcast.format === 'video' ? '🎥' : '🎧'}</span>
                      {podcast.format === 'video' ? 'Video' : 'Audio'}
                    </span>
                  </div>
                  
                  {/* Duration Badge */}
                  <div className="absolute top-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-xs font-semibold shadow">
                    {podcast.duration}
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors font-playfair">
                  {podcast.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                  {podcast.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                      {podcast.creator}
                    </span>
                    <span>{podcast.views} listeners</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500 text-base">★</span>
                    <span className="text-base font-medium text-gray-700">{podcast.rating}</span>
                  </div>
                </div>

                {/* Upload Date and Guest */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{podcast.uploadDate}</span>
                  <span className="text-primary-600 font-medium">{podcast.guest}</span>
                </div>

                {/* Action Button */}
                <button 
                  className={`w-full py-2 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center text-center ${
                    podcast.format === 'video'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white'
                      : 'bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/podcast/${podcast.id}`);
                  }}
                >
                  {podcast.format === 'video' ? 'Watch Now' : 'Listen Now'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPodcasts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">
              {selectedFormat === 'video' ? '🎥' : selectedFormat === 'audio' ? '🎧' : '🎧🎥'}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 font-playfair">
              No {selectedFormat !== 'all' ? (selectedFormat === 'video' ? 'video' : 'audio') : ''} podcasts found
            </h3>
            <p className="text-gray-600 mb-6 font-inter">
              {selectedFormat !== 'all' 
                ? `Try adjusting your search criteria or switch to a different format.`
                : 'Try adjusting your search criteria or filters to find what you\'re looking for.'
              }
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedFormat('all');
                  setSearchQuery('');
                }}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
              >
                Clear All Filters
              </button>
              {selectedFormat !== 'all' && (
                <button
                  onClick={() => setSelectedFormat('all')}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                >
                  Show All Formats
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Podcasts; 