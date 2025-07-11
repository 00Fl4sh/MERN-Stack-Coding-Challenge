import { useParams, useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import { getAllVideos, getVideoById } from '../data/videos';

function VideoPlayerPage() {
  const { id } = useParams();
  const location = useLocation();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showComments, setShowComments] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [commentText, setCommentText] = useState('');

  // Get all videos from shared data
  const allVideos = getAllVideos();

  useEffect(() => {
    // Get video from location state or find by ID
    const videoData = location.state?.video || getVideoById(parseInt(id));
    if (videoData) {
      // Ensure all required properties exist with defaults
      const enrichedVideo = {
        ...videoData,
        likes: videoData.likes || 0,
        dislikes: videoData.dislikes || 0,
        views: videoData.views || '0',
        rating: videoData.rating || 0,
        subscribers: videoData.subscribers || '0',
        uploadDate: videoData.uploadDate || 'Recently',
        comments: videoData.comments || [],
        tags: videoData.tags || [],
        category: videoData.category || 'AI',
        difficulty: videoData.difficulty || 'Beginner',
        language: videoData.language || 'English',
        description: videoData.description || 'No description available.',
        relatedVideos: videoData.relatedVideos || []
      };
      setVideo(enrichedVideo);
      
      // Get related videos
      const related = allVideos.filter(v => 
        v.id !== enrichedVideo.id && enrichedVideo.relatedVideos.includes(v.id)
      );
      setRelatedVideos(related);
    }
  }, [id, location.state]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (isDisliked) setIsDisliked(false);
  };

  const handleDislike = () => {
    setIsDisliked(!isDisliked);
    if (isLiked) setIsLiked(false);
  };

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  const formatNumber = (num) => {
    if (num === undefined || num === null) return '0';
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  if (!video) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg font-medium font-inter">Loading your learning experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Video Section */}
      <div className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 shadow-2xl">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="aspect-video">
            <VideoPlayer
              video={{
                url: video.videoUrl,
                title: video.title,
                thumbnail: video.thumbnail,
                duration: video.duration
              }}
              onProgress={(progress) => console.log(`Progress: ${progress}%`)}
              onComplete={() => console.log('Video completed!')}
            />
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-blue-900/40 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Video Header */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold rounded-full shadow-lg">
                      {video.category}
                    </span>
                    <span className="px-4 py-2 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-full border border-emerald-200">
                      {video.difficulty}
                    </span>
                    <span className="px-4 py-2 bg-amber-100 text-amber-700 text-sm font-semibold rounded-full border border-amber-200">
                      ⭐ {video.rating}
                    </span>
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight font-playfair">{video.title}</h1>
                  <div className="flex items-center gap-6 text-gray-600 text-sm">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      {video.views} views
                    </span>
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/>
                      </svg>
                      {video.uploadDate}
                    </span>
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      {video.rating}/5
                    </span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                      isLiked 
                        ? 'bg-primary-50 text-primary-600 border-2 border-primary-200' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-200'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    <span className="font-semibold">{formatNumber(video.likes)}</span>
                  </button>
                  
                  <button
                    onClick={handleDislike}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                      isDisliked 
                        ? 'bg-red-50 text-red-600 border-2 border-red-200' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-200'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"/>
                    </svg>
                    <span className="font-semibold">{formatNumber(video.dislikes)}</span>
                  </button>
                  
                  <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 border-2 border-gray-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
                    </svg>
                    <span className="font-semibold">Share</span>
                  </button>
                  
                  <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 border-2 border-gray-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                    </svg>
                    <span className="font-semibold">Save</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Creator Profile */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    {video.creator.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 font-playfair mb-2">{video.creator}</h3>
                    <p className="text-gray-600 text-lg mb-2">{video.subscribers} subscribers</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        {video.language}
                      </span>
                      <span>•</span>
                      <span>{video.difficulty} Level</span>
                      <span>•</span>
                      <span>{video.category} Expert</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleSubscribe}
                  className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                    isSubscribed
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-200'
                      : 'bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:from-primary-700 hover:to-primary-600'
                  }`}
                >
                  {isSubscribed ? '✓ Subscribed' : '+ Subscribe'}
                </button>
              </div>
            </div>

            {/* Content Tabs */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Tab Navigation */}
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`flex-1 px-8 py-6 text-sm font-semibold transition-all duration-300 ${
                    activeTab === 'overview'
                      ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('transcript')}
                  className={`flex-1 px-8 py-6 text-sm font-semibold transition-all duration-300 ${
                    activeTab === 'transcript'
                      ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Transcript
                </button>
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`flex-1 px-8 py-6 text-sm font-semibold transition-all duration-300 ${
                    activeTab === 'notes'
                      ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Notes
                </button>
                <button
                  onClick={() => setActiveTab('comments')}
                  className={`flex-1 px-8 py-6 text-sm font-semibold transition-all duration-300 ${
                    activeTab === 'comments'
                      ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Discussion ({video.comments?.length || 0})
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {activeTab === 'overview' && (
                  <div>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-700 leading-relaxed text-lg mb-8 font-inter">
                        {video.description}
                      </p>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-3 mb-8">
                      {video.tags.map((tag, index) => (
                        <span key={index} className="px-4 py-2 bg-gradient-to-r from-gray-100 to-primary-50 text-gray-700 rounded-xl text-sm font-medium border border-gray-200 hover:bg-primary-100 transition-colors">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Learning Objectives */}
                    <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8 border border-primary-100">
                      <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3 font-playfair">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                        </div>
                        What You'll Learn
                      </h4>
                      <ul className="space-y-4 text-gray-700">
                        <li className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                          <span className="text-lg">Understanding core concepts and fundamentals</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                          <span className="text-lg">Practical implementation techniques</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                          <span className="text-lg">Real-world applications and use cases</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'transcript' && (
                  <div className="bg-gray-50 rounded-2xl p-8">
                    <p className="text-gray-700 leading-relaxed font-inter text-lg">
                      {video.transcript || "Transcript will be available soon..."}
                    </p>
                  </div>
                )}

                {activeTab === 'notes' && (
                  <div>
                    <textarea
                      placeholder="Take notes while watching the video..."
                      className="w-full h-40 p-6 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-lg font-inter shadow-sm"
                    />
                    <div className="mt-6 flex justify-end">
                      <button className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl hover:from-primary-700 hover:to-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold">
                        Save Notes
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'comments' && (
                  <div className="space-y-8">
                    {/* Add Comment */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-lg">
                        U
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="Join the discussion..."
                          className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg font-inter shadow-sm"
                        />
                        <div className="mt-3 flex justify-end">
                          <button className="px-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-semibold">
                            Post Comment
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Comments List */}
                    {video.comments && video.comments.length > 0 ? (
                      <div className="space-y-6">
                        {video.comments.map((comment) => (
                          <div key={comment.id} className="flex gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-lg">
                              {comment.author.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex-1">
                              <div className="bg-gray-50 rounded-2xl p-6">
                                <div className="flex items-center gap-3 mb-3">
                                  <span className="font-semibold text-gray-900 text-lg">{comment.author}</span>
                                  <span className="text-gray-500 text-sm">{comment.time}</span>
                                </div>
                                <p className="text-gray-700 text-lg">{comment.text}</p>
                                <div className="flex items-center gap-6 mt-4 text-sm">
                                  <button className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                    </svg>
                                    {comment.likes}
                                  </button>
                                  <button className="text-gray-600 hover:text-primary-600 transition-colors">Reply</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <svg className="w-16 h-16 mx-auto mb-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                        </svg>
                        <p className="text-xl">No comments yet. Be the first to start the discussion!</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Related Videos */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 font-playfair">Continue Learning</h3>
              <div className="space-y-4">
                {relatedVideos.map((relatedVideo) => (
                  <Link
                    key={relatedVideo.id}
                    to={`/video/${relatedVideo.id}`}
                    state={{ video: relatedVideo }}
                    className="block group"
                  >
                    <div className="flex gap-4">
                      <div className="relative w-28 h-20 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0 shadow-lg">
                        <img
                          src={relatedVideo.thumbnail}
                          alt={relatedVideo.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded-lg">
                          {relatedVideo.duration}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-primary-600 transition-colors">
                          {relatedVideo.title}
                        </h4>
                        <p className="text-gray-600 text-xs mt-2">{relatedVideo.creator}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                          <span>{relatedVideo.views}</span>
                          <span>•</span>
                          <span>{relatedVideo.uploadDate}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Course Progress */}
            <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl p-6 border border-primary-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 font-playfair">Your Progress</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-gray-700 font-semibold">Course Completion</span>
                    <span className="text-primary-600 font-bold text-lg">25%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                    <div className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full shadow-lg transition-all duration-500" style={{ width: '25%' }}></div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 space-y-2">
                  <p className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    2 of 8 modules completed
                  </p>
                  <p className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    45 minutes watched
                  </p>
                  <p className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    3 achievements unlocked
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayerPage; 