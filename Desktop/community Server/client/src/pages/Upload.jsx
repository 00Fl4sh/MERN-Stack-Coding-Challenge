import { useState } from 'react';

function Upload() {
  const [uploadType, setUploadType] = useState('video');
  const [podcastFormat, setPodcastFormat] = useState('audio'); // 'audio' or 'video'
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const categories = [
    'Machine Learning',
    'Deep Learning',
    'NLP',
    'Computer Vision',
    'AI Ethics',
    'Data Science',
    'AI News',
    'Industry Analysis'
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      alert('Content uploaded successfully!');
      // Reset form
      setTitle('');
      setDescription('');
      setCategory('');
      setTags('');
      setFile(null);
      if (uploadType === 'podcast') {
        setPodcastFormat('audio');
      }
    }, 2000);
  };

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

  const getFileIcon = () => {
    if (uploadType === 'video') return '🎥';
    if (uploadType === 'article') return '📄';
    if (uploadType === 'podcast') {
      return podcastFormat === 'video' ? '🎥' : '🎧';
    }
    return '📁';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pb-12">
      {/* Header / Hero */}
      <div className="relative bg-gradient-to-r from-primary-50 to-blue-100 border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 font-playfair tracking-tight drop-shadow-lg">
            Upload Content
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto font-inter mb-8">
            Share your AI knowledge with the community
          </p>
          
          {/* Upload Stats */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-gray-700 bg-white/60 px-4 py-2 rounded-full">
              <span className="text-lg">🎥</span>
              <span className="font-semibold">Videos</span>
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center gap-2 text-gray-700 bg-white/60 px-4 py-2 rounded-full">
              <span className="text-lg">📄</span>
              <span className="font-semibold">Articles</span>
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center gap-2 text-gray-700 bg-white/60 px-4 py-2 rounded-full">
              <span className="text-lg">🎧</span>
              <span className="font-semibold">Podcasts</span>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-blue-100/40 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          {/* Upload Type Selector */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-playfair">What are you uploading?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { id: 'video', label: 'Video', icon: '🎥', color: 'blue', description: 'Educational videos and tutorials', gradient: 'from-blue-500 to-blue-600' },
                { id: 'article', label: 'Article', icon: '📄', color: 'green', description: 'Written content and guides', gradient: 'from-green-500 to-green-600' },
                { id: 'podcast', label: 'Podcast', icon: '🎧', color: 'purple', description: 'Audio or video discussions', gradient: 'from-purple-500 to-purple-600' }
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => setUploadType(type.id)}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left group hover:shadow-lg ${
                    uploadType === type.id
                      ? `border-${type.color}-500 bg-gradient-to-br from-${type.color}-50 to-${type.color}-100 shadow-lg`
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className={`text-4xl mb-3 transition-transform group-hover:scale-110 ${uploadType === type.id ? 'animate-bounce' : ''}`}>
                    {type.icon}
                  </div>
                  <div className="font-bold text-gray-900 mb-2 text-lg">{type.label}</div>
                  <div className="text-sm text-gray-600">{type.description}</div>
                  {uploadType === type.id && (
                    <div className="mt-3 w-full bg-gray-200 rounded-full h-1">
                      <div className={`bg-gradient-to-r ${type.gradient} h-1 rounded-full transition-all duration-500`}></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Podcast Format Selector */}
          {uploadType === 'podcast' && (
            <div className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 font-playfair">Podcast Format</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'audio', label: 'Audio Podcast', icon: '🎧', description: 'Traditional audio-only podcast', color: 'purple' },
                  { id: 'video', label: 'Video Podcast', icon: '🎥', description: 'Video podcast with visual content', color: 'blue' }
                ].map((format) => (
                  <button
                    key={format.id}
                    onClick={() => setPodcastFormat(format.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-left group hover:shadow-md ${
                      podcastFormat === format.id
                        ? `border-${format.color}-500 bg-${format.color}-50 shadow-md`
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`text-2xl transition-transform group-hover:scale-110 ${podcastFormat === format.id ? 'animate-pulse' : ''}`}>
                        {format.icon}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{format.label}</div>
                        <div className="text-sm text-gray-600">{format.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={`Enter your ${uploadType} title...`}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent font-inter shadow-sm"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={`Describe your ${uploadType}...`}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent font-inter shadow-sm"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent font-inter shadow-sm"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Tags
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Enter tags separated by commas..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent font-inter shadow-sm"
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                {uploadType === 'video' && 'Video File *'}
                {uploadType === 'article' && 'Article File *'}
                {uploadType === 'podcast' && `${podcastFormat === 'video' ? 'Video' : 'Audio'} File *`}
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-primary-400 transition-all duration-300 bg-gray-50 hover:bg-gray-100">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept={getFileAcceptTypes()}
                  className="hidden"
                  id="file-upload"
                  required
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="text-5xl mb-4 transition-transform hover:scale-110">{getFileIcon()}</div>
                  <div className="text-lg font-semibold text-gray-900 mb-2">
                    {file ? file.name : `Click to upload your ${uploadType}`}
                  </div>
                  <div className="text-gray-500">
                    {getFileDescription()}
                  </div>
                </label>
              </div>
              {file && (
                <div className="mt-3 text-sm text-green-600 flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  {file.name} selected
                </div>
              )}
            </div>

            {/* Thumbnail Upload (for videos and video podcasts) */}
            {(uploadType === 'video' || (uploadType === 'podcast' && podcastFormat === 'video')) && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Thumbnail (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-primary-400 transition-all duration-300 bg-gray-50 hover:bg-gray-100">
                  <div className="text-3xl mb-2">🖼️</div>
                  <div className="text-gray-500">
                    Upload a custom thumbnail or we'll generate one from your {uploadType === 'podcast' ? 'video podcast' : 'video'}
                  </div>
                </div>
              </div>
            )}

            {/* Additional Fields for Videos and Video Podcasts */}
            {(uploadType === 'video' || (uploadType === 'podcast' && podcastFormat === 'video')) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Duration (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 15:30"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent font-inter shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Language
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent font-inter shadow-sm">
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="zh">Chinese</option>
                  </select>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-8">
              <button
                type="submit"
                disabled={isUploading}
                className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                    </svg>
                    Upload {uploadType === 'podcast' ? (podcastFormat === 'video' ? 'Video Podcast' : 'Audio Podcast') : uploadType}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Upload; 