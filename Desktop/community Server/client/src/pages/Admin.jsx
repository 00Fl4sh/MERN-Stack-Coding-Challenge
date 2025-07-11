import { useState } from 'react';
import { getAllArticles } from '../data/articles';
import { getAllVideos } from '../data/videos';
import { getAllPodcasts } from '../data/podcasts';
import { getAllLearningPaths } from '../data/learningPaths';
// Assume you have a getAllUsers function or mock user data
import { getAllUsers } from '../data/users';
import { Link } from 'react-router-dom';

function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState('video');
  const [podcastFormat, setPodcastFormat] = useState('audio'); // 'audio' or 'video'
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadCategory, setUploadCategory] = useState('');
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const articles = getAllArticles();
  const videos = getAllVideos();
  const podcasts = getAllPodcasts();
  const learningPaths = getAllLearningPaths ? getAllLearningPaths() : [];
  const users = getAllUsers ? getAllUsers() : [];

  // Enhanced stats with format breakdown
  const audioPodcasts = podcasts.filter(p => p.format === 'audio').length;
  const videoPodcasts = podcasts.filter(p => p.format === 'video').length;
  
  const stats = [
    { label: 'Total Users', value: users.length, icon: '👥', color: 'blue', gradient: 'from-blue-500 to-blue-600' },
    { label: 'Articles', value: articles.length, icon: '📄', color: 'green', gradient: 'from-green-500 to-green-600' },
    { label: 'Videos', value: videos.length, icon: '🎥', color: 'purple', gradient: 'from-purple-500 to-purple-600' },
    { label: 'Podcasts', value: podcasts.length, icon: '🎧', color: 'indigo', gradient: 'from-indigo-500 to-indigo-600', subtext: `${audioPodcasts} audio, ${videoPodcasts} video` },
    { label: 'Learning Paths', value: learningPaths.length, icon: '🛤️', color: 'orange', gradient: 'from-orange-500 to-orange-600' }
  ];

  function handleUploadSubmit(e) {
    e.preventDefault();
    // Placeholder: handle upload logic here
    setUploadSuccess(true);
    setTimeout(() => {
      setShowUploadModal(false);
      setUploadSuccess(false);
      setUploadType('video');
      setPodcastFormat('audio');
      setUploadTitle('');
      setUploadDescription('');
      setUploadCategory('');
      setUploadFile(null);
    }, 1500);
  }

  function handleTabUploadSubmit(e) {
    e.preventDefault();
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setUploadType('video');
      setPodcastFormat('audio');
      setUploadTitle('');
      setUploadDescription('');
      setUploadCategory('');
      setUploadFile(null);
    }, 1500);
  }

  const getFileAcceptTypes = () => {
    if (uploadType === 'video') return 'video/*';
    if (uploadType === 'article') return '.pdf,.doc,.docx,.txt';
    if (uploadType === 'podcast') {
      return podcastFormat === 'video' ? 'video/*' : 'audio/*';
    }
    return '';
  };

  const getFileDescription = () => {
    if (uploadType === 'video') return 'MP4, MOV, AVI up to 500MB';
    if (uploadType === 'article') return 'PDF, DOC, DOCX, TXT up to 10MB';
    if (uploadType === 'podcast') {
      return podcastFormat === 'video' ? 'MP4, MOV, AVI up to 500MB' : 'MP3, WAV, M4A up to 100MB';
    }
    return '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pb-12">
      {/* Header / Hero */}
      <div className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 border-b border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-white font-playfair tracking-tight drop-shadow-lg">
                Admin Dashboard
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mt-3 font-inter">
                Manage your AI learning platform
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold shadow">
                Admin
              </span>
              <button
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => setShowUploadModal(true)}
              >
                + Upload Content
              </button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-blue-900/40 to-transparent" />
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fade-in border border-gray-100">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl transition-colors"
              onClick={() => setShowUploadModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 font-playfair">Upload Content</h2>
            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                <select
                  value={uploadType}
                  onChange={e => setUploadType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent font-inter shadow-sm"
                  required
                >
                  <option value="video">Video</option>
                  <option value="article">Article</option>
                  <option value="podcast">Podcast</option>
                  <option value="learningPath">Learning Path</option>
                </select>
              </div>

              {/* Podcast Format Selection */}
              {uploadType === 'podcast' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Podcast Format</label>
                  <select
                    value={podcastFormat}
                    onChange={e => setPodcastFormat(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent font-inter shadow-sm"
                    required
                  >
                    <option value="audio">Audio Podcast</option>
                    <option value="video">Video Podcast</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={uploadTitle}
                  onChange={e => setUploadTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent font-inter shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={uploadDescription}
                  onChange={e => setUploadDescription(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent font-inter shadow-sm"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <input
                  type="text"
                  value={uploadCategory}
                  onChange={e => setUploadCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent font-inter shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {uploadType === 'video' && 'Video File'}
                  {uploadType === 'article' && 'Article File'}
                  {uploadType === 'podcast' && `${podcastFormat === 'video' ? 'Video' : 'Audio'} File`}
                </label>
                <input
                  type="file"
                  accept={getFileAcceptTypes()}
                  onChange={e => setUploadFile(e.target.files[0])}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent font-inter shadow-sm"
                  required
                />
                <p className="text-xs text-gray-500 mt-2">{getFileDescription()}</p>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mt-4"
                disabled={uploadSuccess}
              >
                {uploadSuccess ? 'Uploaded!' : `Upload ${uploadType === 'podcast' ? (podcastFormat === 'video' ? 'Video Podcast' : 'Audio Podcast') : uploadType}`}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-8 border border-gray-100">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6 overflow-x-auto">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: '📊' },
                { id: 'users', label: 'Users', icon: '👥' },
                { id: 'articles', label: 'Articles', icon: '📄' },
                { id: 'videos', label: 'Videos', icon: '🎥' },
                { id: 'podcasts', label: 'Podcasts', icon: '🎧' },
                { id: 'learningPaths', label: 'Learning Paths', icon: '🛤️' },
                { id: 'upload', label: 'Upload', icon: '⬆️' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-semibold text-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg mx-auto border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 font-playfair">Upload Content</h3>
            <form onSubmit={handleTabUploadSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                <select
                  value={uploadType}
                  onChange={e => setUploadType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent font-inter shadow-sm"
                  required
                >
                  <option value="video">Video</option>
                  <option value="article">Article</option>
                  <option value="podcast">Podcast</option>
                  <option value="learningPath">Learning Path</option>
                </select>
              </div>

              {/* Podcast Format Selection */}
              {uploadType === 'podcast' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Podcast Format</label>
                  <select
                    value={podcastFormat}
                    onChange={e => setPodcastFormat(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent font-inter shadow-sm"
                    required
                  >
                    <option value="audio">Audio Podcast</option>
                    <option value="video">Video Podcast</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={uploadTitle}
                  onChange={e => setUploadTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent font-inter shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={uploadDescription}
                  onChange={e => setUploadDescription(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent font-inter shadow-sm"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <input
                  type="text"
                  value={uploadCategory}
                  onChange={e => setUploadCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent font-inter shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {uploadType === 'video' && 'Video File'}
                  {uploadType === 'article' && 'Article File'}
                  {uploadType === 'podcast' && `${podcastFormat === 'video' ? 'Video' : 'Audio'} File`}
                </label>
                <input
                  type="file"
                  accept={getFileAcceptTypes()}
                  onChange={e => setUploadFile(e.target.files[0])}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent font-inter shadow-sm"
                  required
                />
                <p className="text-xs text-gray-500 mt-2">{getFileDescription()}</p>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mt-4"
                disabled={uploadSuccess}
              >
                {uploadSuccess ? 'Uploaded!' : `Upload ${uploadType === 'podcast' ? (podcastFormat === 'video' ? 'Video Podcast' : 'Audio Podcast') : uploadType}`}
              </button>
            </form>
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      {stat.subtext && (
                        <p className="text-xs text-gray-500 mt-2">{stat.subtext}</p>
                      )}
                    </div>
                    <div className={`text-4xl p-3 rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg`}>
                      {stat.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Podcast Format Breakdown */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 font-playfair">Podcast Format Distribution</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-purple-700 mb-1">Audio Podcasts</p>
                      <p className="text-3xl font-bold text-purple-900">{audioPodcasts}</p>
                      <p className="text-xs text-purple-600 mt-1">Traditional audio format</p>
                    </div>
                    <div className="text-4xl p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
                      🎧
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-blue-700 mb-1">Video Podcasts</p>
                      <p className="text-3xl font-bold text-blue-900">{videoPodcasts}</p>
                      <p className="text-xs text-blue-600 mt-1">Visual podcast content</p>
                    </div>
                    <div className="text-4xl p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
                      🎥
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 overflow-x-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 font-playfair">User Management</h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-lg">
                          {user.name ? user.name[0] : '?'}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">{user.role}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>{user.status}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joined}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="px-3 py-1 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 transition-colors mr-2 shadow">Edit</button>
                      <button className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors shadow">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Articles Tab */}
        {activeTab === 'articles' && (
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 overflow-x-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 font-playfair">Articles Management</h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {articles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">{article.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{article.creator}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">{article.category}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{article.uploadDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/article/${article.id}`} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-lg text-sm hover:bg-primary-200 transition-colors mr-2 shadow">View</Link>
                      <button className="px-3 py-1 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 transition-colors mr-2 shadow">Edit</button>
                      <button className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors shadow">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Videos Tab */}
        {activeTab === 'videos' && (
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 overflow-x-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 font-playfair">Videos Management</h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Creator</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {videos.map((video) => (
                  <tr key={video.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">{video.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{video.creator}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">{video.category}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{video.uploadDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/video/${video.id}`} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-lg text-sm hover:bg-primary-200 transition-colors mr-2 shadow">View</Link>
                      <button className="px-3 py-1 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 transition-colors mr-2 shadow">Edit</button>
                      <button className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors shadow">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Podcasts Tab */}
        {activeTab === 'podcasts' && (
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 overflow-x-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 font-playfair">Podcasts Management</h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Host</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Format</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {podcasts.map((podcast) => (
                  <tr key={podcast.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">{podcast.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{podcast.guest || podcast.creator}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit ${
                        podcast.format === 'video' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        <span>{podcast.format === 'video' ? '🎥' : '🎧'}</span>
                        {podcast.format === 'video' ? 'Video' : 'Audio'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">{podcast.category}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{podcast.uploadDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/podcast/${podcast.id}`} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-lg text-sm hover:bg-primary-200 transition-colors mr-2 shadow">View</Link>
                      <button className="px-3 py-1 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 transition-colors mr-2 shadow">Edit</button>
                      <button className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors shadow">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Learning Paths Tab */}
        {activeTab === 'learningPaths' && (
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 overflow-x-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 font-playfair">Learning Paths Management</h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Creator</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Difficulty</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {learningPaths.map((lp) => (
                  <tr key={lp.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">{lp.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{lp.creator}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">{lp.category}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        lp.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        lp.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {lp.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/paths/${lp.id}`} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-lg text-sm hover:bg-primary-200 transition-colors mr-2 shadow">View</Link>
                      <button className="px-3 py-1 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 transition-colors mr-2 shadow">Edit</button>
                      <button className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors shadow">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin; 