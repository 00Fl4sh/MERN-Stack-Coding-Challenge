import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPodcastById, getTopPodcasts } from '../data/podcasts';
import AudioPlayer from '../components/AudioPlayer';
import VideoPlayer from '../components/VideoPlayer';

function PodcastDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [podcast, setPodcast] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    setLoading(true);
    const p = getPodcastById(Number(id));
    setPodcast(p);
    setRelated(getTopPodcasts(3).filter(ep => ep.id !== Number(id)));
    setLoading(false);
  }, [id]);

  if (loading || !podcast) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg font-medium font-inter">Loading podcast...</p>
        </div>
      </div>
    );
  }

  const isVideoPodcast = podcast.format === 'video';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="mb-6 flex items-center text-gray-600 hover:text-primary-600 font-medium transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Podcasts
        </button>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 rounded-2xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Cover Art */}
              <div className="flex-shrink-0 w-48 h-48 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <div className="text-center">
                  <div className="text-6xl mb-4">
                    {isVideoPodcast ? '🎥' : '🎧'}
                  </div>
                  <div className="text-white/80 text-sm font-medium">
                    {isVideoPodcast ? 'Video Podcast' : 'Audio Podcast'}
                  </div>
                </div>
              </div>
              
              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium backdrop-blur-sm">
                    {podcast.category}
                  </span>
                  <span className="text-white/80 text-sm">Guest: {podcast.guest}</span>
                  <span className="text-yellow-400 text-sm flex items-center gap-1">
                    ★ {podcast.rating}
                  </span>
                </div>
                
                <h1 className="text-4xl font-bold text-white mb-4 font-playfair">
                  {podcast.title}
                </h1>
                
                <p className="text-white/90 text-lg mb-6 font-inter">
                  {podcast.description}
                </p>
                
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setIsLiked(l => !l)} 
                    className={`p-3 rounded-full transition-all duration-200 ${
                      isLiked 
                        ? 'bg-red-500 text-white shadow-lg' 
                        : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                    }`} 
                    title="Like"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </button>
                  
                  <button 
                    onClick={() => setIsBookmarked(b => !b)} 
                    className={`p-3 rounded-full transition-all duration-200 ${
                      isBookmarked 
                        ? 'bg-yellow-500 text-white shadow-lg' 
                        : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                    }`} 
                    title="Bookmark"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                    </svg>
                  </button>
                  
                  <button className="p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-200 backdrop-blur-sm" title="Share">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Player Section */}
        <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">
                {isVideoPodcast ? '🎥' : '🎧'}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 font-playfair">
              {isVideoPodcast ? 'Video Player' : 'Audio Player'}
            </h2>
          </div>

          {isVideoPodcast ? (
            <div className="aspect-video bg-black rounded-xl overflow-hidden">
              <VideoPlayer
                video={{
                  url: podcast.videoUrl,
                  title: podcast.title,
                  thumbnail: podcast.thumbnail,
                  duration: podcast.duration
                }}
                onProgress={(progress) => console.log(`Progress: ${progress}%`)}
                onComplete={() => console.log('Video podcast completed!')}
              />
            </div>
          ) : (
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
              <AudioPlayer
                src={podcast.audioUrl}
                title={podcast.title}
                artist={podcast.guest}
                coverArt={podcast.thumbnail}
              />
            </div>
          )}
        </div>

        {/* Show Notes & Transcript */}
        <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 font-playfair">Show Notes</h2>
          <p className="text-gray-700 mb-6 leading-relaxed font-inter">
            {podcast.notes || 'No show notes available for this episode.'}
          </p>
          
          <button 
            onClick={() => setShowNotes(n => !n)} 
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mb-4 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            {showNotes ? 'Hide Transcript' : 'Show Transcript'}
          </button>
          
          {showNotes && (
            <div className="bg-gray-50 rounded-xl p-6 text-gray-700 text-sm leading-relaxed font-inter whitespace-pre-line border border-gray-200">
              {podcast.transcript || 'Transcript will be available soon.'}
            </div>
          )}
        </div>

        {/* Related Episodes */}
        <div className="bg-white rounded-2xl shadow-soft p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 font-playfair">Related Episodes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map(ep => (
              <Link 
                key={ep.id} 
                to={`/podcast/${ep.id}`} 
                className="block group bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-primary-200"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">
                      {ep.format === 'video' ? '🎥' : '🎧'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {ep.title}
                    </div>
                    <div className="text-sm text-gray-500">{ep.guest}</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm text-gray-500">{ep.duration}</div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500 text-sm">★</span>
                    <span className="text-sm font-medium text-gray-700">{ep.rating}</span>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 line-clamp-2 font-inter">
                  {ep.description}
                </div>
                
                <div className="mt-3 flex items-center gap-2">
                  <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-medium">
                    {ep.format === 'video' ? 'Video' : 'Audio'}
                  </span>
                  <span className="text-xs text-gray-500">{ep.uploadDate}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PodcastDetails; 