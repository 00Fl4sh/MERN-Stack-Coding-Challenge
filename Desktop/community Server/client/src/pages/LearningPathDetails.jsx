import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchLearningPath } from '../data/learningPaths';
import VideoPlayer from '../components/VideoPlayer';

function LearningPathDetails() {
  const { id } = useParams();
  const [path, setPath] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [moduleProgress, setModuleProgress] = useState({});
  const [showShareModal, setShowShareModal] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const loadPath = async () => {
      try {
        setLoading(true);
        const pathData = await fetchLearningPath(Number(id));
        if (pathData) {
          setPath(pathData);
          // Set first module as selected by default
          if (pathData.modules.length > 0) {
            setSelectedModule(pathData.modules[0]);
          }
        } else {
          setError('Learning path not found');
        }
      } catch (err) {
        setError('Failed to load learning path');
      } finally {
        setLoading(false);
      }
    };

    loadPath();
  }, [id]);

  const handleModuleComplete = (moduleTitle) => {
    setPath(prev => ({
      ...prev,
      modules: prev.modules.map(mod => 
        mod.title === moduleTitle 
          ? { ...mod, completed: true }
          : mod
      ),
      progress: Math.min(100, prev.progress + (100 / prev.modules.length))
    }));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: path.title,
        text: path.description,
        url: window.location.href
      });
    } else {
      setShowShareModal(true);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareModal(false);
    // You could add a toast notification here
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            {/* Header Skeleton */}
            <div className="mb-8">
              <div className="h-8 bg-gray-200 rounded mb-4 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
              <div className="flex gap-4">
                <div className="h-10 bg-gray-200 rounded w-24"></div>
                <div className="h-10 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
            
            {/* Progress Skeleton */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
              <div className="h-3 bg-gray-200 rounded-full"></div>
            </div>

            {/* Content Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-96 bg-gray-200 rounded-2xl mb-6"></div>
                <div className="space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="h-6 bg-gray-200 rounded w-20 mb-4"></div>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="h-16 bg-gray-200 rounded-xl"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !path) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 font-playfair">Learning Path Not Found</h2>
          <p className="text-gray-600 mb-6">The learning path you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/learning-paths" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-600 transition-all duration-300 shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            Back to Learning Paths
          </Link>
        </div>
      </div>
    );
  }

  const completedModules = path.modules.filter(mod => mod.completed).length;
  const totalModules = path.modules.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/learning-paths" 
                className="text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900 truncate font-playfair">{path.title}</h1>
                <p className="text-sm text-gray-500">{completedModules} of {totalModules} modules completed</p>
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
              </svg>
            </button>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              <button
                onClick={toggleBookmark}
                className={`p-2 rounded-lg transition-colors ${
                  isBookmarked 
                    ? 'text-yellow-500 hover:text-yellow-600 bg-yellow-50' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                title={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
              >
                <svg className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
              <button
                onClick={handleShare}
                className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                title="Share"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Info */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  {path.creator}
                </span>
                <span>•</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                  {path.category}
                </span>
                <span>•</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  path.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                  path.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {path.difficulty}
                </span>
                <span>•</span>
                <span className="flex items-center text-yellow-500">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                  {path.rating}
                </span>
              </div>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-4 font-inter">{path.description}</p>
              
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  {path.students} students enrolled
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                    <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                  </svg>
                  {path.steps} steps
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button className="bg-gradient-to-r from-primary-600 to-primary-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Continue Learning
              </button>
              <button 
                onClick={handleShare}
                className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 font-playfair">Your Progress</h2>
            <span className="text-sm font-medium text-primary-600">{path.progress}% complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-500 ease-out"
              style={{width: `${path.progress}%`}}
            ></div>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{completedModules} of {totalModules} modules completed</span>
            <span>{Math.round((completedModules / totalModules) * 100)}%</span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player Section */}
          <div className="lg:col-span-2">
            {selectedModule && (
              <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl border border-blue-100 overflow-hidden mb-8 transition-all duration-500 animate-fade-in">
                {/* Faint AI Pattern/Watermark */}
                <svg className="absolute right-4 bottom-4 w-32 h-32 opacity-10 pointer-events-none select-none" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="48" stroke="url(#aiGradient)" strokeWidth="4" />
                  <defs>
                    <linearGradient id="aiGradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#6366F1" />
                      <stop offset="1" stopColor="#A21CAF" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* AI Minute Logo/Icon */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                  <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">AI</span>
                  </div>
                  <span className="text-xs font-bold text-blue-700 tracking-wide">AI Minute</span>
                </div>
                {/* Contextual Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-blue-100 bg-white/70 backdrop-blur-sm">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold rounded-full uppercase tracking-wide">Learning Path</span>
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">Module {path.modules.findIndex(m => m.title === selectedModule.title) + 1} of {path.modules.length}</span>
                      {selectedModule.completed ? (
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Completed</span>
                      ) : moduleProgress[selectedModule.title] > 0 ? (
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">In Progress</span>
                      ) : null}
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 leading-tight mb-1 font-playfair">{selectedModule.title}</h2>
                    {selectedModule.subtitle && (
                      <p className="text-sm text-slate-500 mb-1">{selectedModule.subtitle}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      disabled={path.modules.findIndex(m => m.title === selectedModule.title) === 0}
                      onClick={() => {
                        const idx = path.modules.findIndex(m => m.title === selectedModule.title);
                        if (idx > 0) setSelectedModule(path.modules[idx - 1]);
                      }}
                      className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Previous Module"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
                    </button>
                    <button
                      disabled={path.modules.findIndex(m => m.title === selectedModule.title) === path.modules.length - 1}
                      onClick={() => {
                        const idx = path.modules.findIndex(m => m.title === selectedModule.title);
                        if (idx < path.modules.length - 1) setSelectedModule(path.modules[idx + 1]);
                      }}
                      className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Next Module"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>
                    </button>
                  </div>
                </div>
                {/* Video Player */}
                <div className="aspect-video bg-white/80 rounded-2xl shadow-lg relative flex items-center justify-center overflow-hidden transition-all duration-300 p-2 sm:p-4 backdrop-blur-md">
                  <VideoPlayer
                    video={selectedModule.video}
                    onProgress={(progress) => {
                      setModuleProgress(prev => ({
                        ...prev,
                        [selectedModule.title]: progress
                      }));
                    }}
                    onComplete={() => {
                      handleModuleComplete(selectedModule.title);
                    }}
                    customClassName="!bg-transparent !rounded-2xl !shadow-none"
                    controlsClassName="backdrop-blur-md bg-white/60 rounded-b-2xl"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Modules List */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 font-playfair">Course Modules</h2>
                <span className="text-sm text-gray-500">{completedModules}/{totalModules}</span>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {path.modules.map((mod, idx) => (
                  <div 
                    key={idx} 
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                      selectedModule?.title === mod.title 
                        ? 'border-primary-500 bg-primary-50 shadow-md' 
                        : mod.completed
                          ? 'border-green-200 bg-green-50'
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                    }`}
                    onClick={() => setSelectedModule(mod)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold text-sm ${
                          mod.completed 
                            ? 'bg-gradient-to-r from-green-500 to-green-600' 
                            : selectedModule?.title === mod.title
                              ? 'bg-gradient-to-r from-primary-500 to-primary-600'
                              : 'bg-gray-300'
                        }`}>
                          {mod.completed ? (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                          ) : (
                            idx + 1
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-medium text-sm ${
                          selectedModule?.title === mod.title 
                            ? 'text-primary-700' 
                            : mod.completed 
                              ? 'text-green-700' 
                              : 'text-gray-900'
                        }`}>
                          {mod.title}
                        </h3>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-gray-500">{mod.video.duration}</p>
                          {moduleProgress[mod.title] > 0 && (
                            <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                                style={{ width: `${moduleProgress[mod.title]}%` }}
                              ></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold font-playfair">Course Modules</h3>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="p-2 text-gray-600 hover:text-gray-900"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
              </div>
              
              <div className="space-y-3">
                {path.modules.map((mod, idx) => (
                  <div 
                    key={idx} 
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                      selectedModule?.title === mod.title 
                        ? 'border-primary-500 bg-primary-50' 
                        : mod.completed
                          ? 'border-green-200 bg-green-50'
                          : 'border-gray-200 bg-white'
                    }`}
                    onClick={() => {
                      setSelectedModule(mod);
                      setShowMobileMenu(false);
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold text-sm ${
                        mod.completed 
                          ? 'bg-gradient-to-r from-green-500 to-green-600' 
                          : selectedModule?.title === mod.title
                            ? 'bg-gradient-to-r from-primary-500 to-primary-600'
                            : 'bg-gray-300'
                      }`}>
                        {mod.completed ? (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </svg>
                        ) : (
                          idx + 1
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-medium text-sm ${
                          selectedModule?.title === mod.title 
                            ? 'text-primary-700' 
                            : mod.completed 
                              ? 'text-green-700' 
                              : 'text-gray-900'
                        }`}>
                          {mod.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">{mod.video.duration}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold font-playfair">Share this course</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex space-x-3">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition-colors duration-300">
                  Facebook
                </button>
                <button className="flex-1 bg-blue-400 text-white py-2 px-4 rounded-xl hover:bg-blue-500 transition-colors duration-300">
                  Twitter
                </button>
                <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-xl hover:bg-green-700 transition-colors duration-300">
                  WhatsApp
                </button>
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={window.location.href}
                  readOnly
                  className="flex-1 p-2 border border-gray-300 rounded-xl bg-gray-50"
                />
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl hover:from-primary-700 hover:to-primary-600 transition-all duration-300"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LearningPathDetails; 