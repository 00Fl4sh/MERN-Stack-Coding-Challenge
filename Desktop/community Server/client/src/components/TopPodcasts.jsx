import { getTopPodcasts } from '../data/podcasts';
import { useNavigate } from 'react-router-dom';

function TopPodcasts() {
  const podcasts = getTopPodcasts(3);
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-accent-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        {/*   <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-secondary-900 mb-4 font-playfair">
            Top AI Podcasts
          </h2>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto font-inter">
            Listen to insightful conversations with AI experts and industry leaders
          </p>
        </div> */}

        {/* Podcasts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {podcasts.map((podcast) => (
            <div key={podcast.id} className="group bg-white rounded-2xl shadow-soft hover:shadow-large transition-all duration-300 transform hover:-translate-y-2 border border-secondary-100 overflow-hidden">
              {/* Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {podcast.title}
                    </h3>
                    <p className="text-secondary-600 mb-1">Guest: {podcast.guest}</p>
                    <p className="text-secondary-500 text-sm">{podcast.duration}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-medium text-secondary-700">{podcast.rating}</span>
                  </div>
                </div>

                {/* Category and Listeners */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-xs font-medium">
                    {podcast.category}
                  </span>
                  <span className="text-sm text-secondary-500">{podcast.listeners} listeners</span>
                </div>

                {/* Description */}
                <p className="text-secondary-600 text-sm mb-6 leading-relaxed">
                  {podcast.description}
                </p>

                {/* Audio Player */}
                <div className="bg-secondary-50 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <button className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-all duration-300 shadow-soft">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </button>
                      <div>
                        <div className="text-sm font-medium text-secondary-900">Now Playing</div>
                        <div className="text-xs text-secondary-500">{podcast.title}</div>
                      </div>
                    </div>
                    <button className="text-secondary-400 hover:text-secondary-600 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-secondary-200 rounded-full h-1 mb-2">
                    <div className="bg-primary-500 h-1 rounded-full" style={{width: '35%'}}></div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-secondary-500">
                    <span>12:34</span>
                    <span>{podcast.duration}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    className="flex-1 bg-primary-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 shadow-soft"
                    onClick={() => navigate(`/podcast/${podcast.id}`)}
                  >
                    Play Episode
                  </button>
                  <button className="px-4 py-3 bg-secondary-100 text-secondary-700 rounded-xl hover:bg-secondary-200 transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center px-8 py-4 bg-white border-2 border-accent-200 text-accent-700 rounded-xl font-semibold hover:bg-accent-50 hover:border-accent-300 transition-all duration-300 transform hover:scale-105 shadow-soft">
            Discover More Podcasts
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default TopPodcasts; 