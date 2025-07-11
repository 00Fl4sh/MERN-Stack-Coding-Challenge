import { useNavigate } from 'react-router-dom';
import { getLatestVideos } from '../data/videos';

function LatestVideos() {
  const navigate = useNavigate();
  const videos = getLatestVideos(4);

  const handleWatchNow = (video) => {
    navigate(`/video/${video.id}`, { state: { video } });
  };

  const handleBrowseAll = () => {
    navigate('/videos');
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        {/* <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-secondary-900 mb-4 font-playfair">
            Latest Video Tutorials
          </h2>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto font-inter">
            Learn from expert-led video tutorials covering the latest AI topics
          </p>
        </div> */}

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="group bg-white rounded-2xl shadow-soft hover:shadow-large transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-secondary-100">
              {/* Thumbnail */}
              <div className="relative overflow-hidden cursor-pointer" onClick={() => handleWatchNow(video)}>
                <div className="aspect-video bg-primary-100 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center shadow-medium group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
                <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm font-medium">
                  {video.duration}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Play overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 rounded-full p-4 shadow-lg">
                    <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Title and Rating */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-secondary-900 group-hover:text-primary-600 transition-colors line-clamp-2 cursor-pointer" onClick={() => handleWatchNow(video)}>
                    {video.title}
                  </h3>
                  <div className="flex items-center space-x-1 ml-2">
                    <span className="text-yellow-500 text-sm">★</span>
                    <span className="text-sm font-medium text-secondary-700">{video.rating}</span>
                  </div>
                </div>

                {/* Creator and Views */}
                <div className="flex items-center justify-between mb-3">
                  <p className="text-secondary-600 text-sm">{video.creator}</p>
                  <p className="text-secondary-500 text-sm">{video.views} views</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {video.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-primary-50 text-primary-700 rounded-md text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Watch Button */}
                <button 
                  onClick={() => handleWatchNow(video)}
                  className="w-full bg-primary-600 text-white py-2 px-4 rounded-xl font-semibold hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 shadow-soft flex items-center justify-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  <span>Watch Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button 
            onClick={handleBrowseAll}
            className="inline-flex items-center px-8 py-4 bg-white border-2 border-primary-200 text-primary-700 rounded-xl font-semibold hover:bg-primary-50 hover:border-primary-300 transition-all duration-300 transform hover:scale-105 shadow-soft"
          >
            Browse All Videos
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default LatestVideos; 