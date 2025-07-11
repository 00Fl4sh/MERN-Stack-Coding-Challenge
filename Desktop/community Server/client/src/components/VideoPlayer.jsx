import { useState, useRef, useEffect, useCallback } from 'react';

function VideoPlayer({ video, onProgress, onComplete }) {
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const containerRef = useRef(null);
  const volumeSliderRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [buffered, setBuffered] = useState(0);
  const [quality, setQuality] = useState('720p');
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showCaptions, setShowCaptions] = useState(false);
  const [isPictureInPicture, setIsPictureInPicture] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipTime, setTooltipTime] = useState(0);
  const [tooltipPosition, setTooltipPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showChapters, setShowChapters] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [showBigPlayButton, setShowBigPlayButton] = useState(true);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [isMobile, setIsMobile] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [error, setError] = useState(null);

  // Quality options
  const qualityOptions = [
    { label: 'Auto', value: 'auto' },
    { label: '1080p', value: '1080p' },
    { label: '720p', value: '720p' },
    { label: '480p', value: '480p' },
    { label: '360p', value: '360p' }
  ];

  // Speed options
  const speedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  // Caption options
  const captionOptions = [
    { label: 'Off', value: 'off' },
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' }
  ];

  // Mock chapters data
  const chapters = [
    { title: 'Introduction', time: 0, duration: 120 },
    { title: 'Getting Started', time: 120, duration: 180 },
    { title: 'Advanced Features', time: 300, duration: 240 },
    { title: 'Best Practices', time: 540, duration: 180 },
    { title: 'Conclusion', time: 720, duration: 60 }
  ];

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update current chapter based on time
  useEffect(() => {
    const chapter = chapters.find((ch, index) => {
      const nextChapter = chapters[index + 1];
      return currentTime >= ch.time && (!nextChapter || currentTime < nextChapter.time);
    });
    if (chapter) {
      setCurrentChapter(chapters.indexOf(chapter));
    }
  }, [currentTime]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setIsLoading(false);
      setError(null);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setBuffered(video.buffered.length > 0 ? video.buffered.end(video.buffered.length - 1) : 0);
      
      // Report progress to parent
      if (onProgress) {
        const progress = (video.currentTime / video.duration) * 100;
        onProgress(progress);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setShowBigPlayButton(true);
      if (onComplete) {
        onComplete();
      }
    };

    const handleVolumeChange = () => {
      setVolume(video.volume);
      setIsMuted(video.muted);
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const handlePictureInPictureChange = () => {
      setIsPictureInPicture(!!document.pictureInPictureElement);
    };

    const handleError = (e) => {
      setError('Video playback error. Please try again.');
      setIsLoading(false);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setShowBigPlayButton(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
      setShowBigPlayButton(true);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('volumechange', handleVolumeChange);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('enterpictureinpicture', handlePictureInPictureChange);
    document.addEventListener('leavepictureinpicture', handlePictureInPictureChange);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('volumechange', handleVolumeChange);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('enterpictureinpicture', handlePictureInPictureChange);
      document.removeEventListener('leavepictureinpicture', handlePictureInPictureChange);
    };
  }, [onProgress, onComplete]);

  // Keyboard shortcuts with improved focus handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only handle shortcuts if video player is focused or if no input element is focused
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
        return;
      }
      
      switch (e.key) {
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          seek(-10);
          break;
        case 'ArrowRight':
          e.preventDefault();
          seek(10);
          break;
        case 'ArrowUp':
          e.preventDefault();
          changeVolume(0.1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          changeVolume(-0.1);
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'm':
        case 'M':
          e.preventDefault();
          toggleMute();
          break;
        case 'c':
        case 'C':
          e.preventDefault();
          setShowCaptions(!showCaptions);
          break;
        case '?':
          e.preventDefault();
          setShowKeyboardShortcuts(!showKeyboardShortcuts);
          break;
        case 'Escape':
          if (showSettings || showChapters || showQualityMenu || showSpeedMenu) {
            e.preventDefault();
            setShowSettings(false);
            setShowChapters(false);
            setShowQualityMenu(false);
            setShowSpeedMenu(false);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showCaptions, showSettings, showChapters, showQualityMenu, showSpeedMenu]);

  // Auto-hide controls with activity tracking
  useEffect(() => {
    let timeout;
    if (isPlaying && showControls && !isMobile) {
      timeout = setTimeout(() => setShowControls(false), 3000);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying, showControls, isMobile, lastActivity]);

  // Track user activity
  const updateActivity = useCallback(() => {
    setLastActivity(Date.now());
    if (!showControls) {
      setShowControls(true);
    }
  }, [showControls]);

  const togglePlay = () => {
    updateActivity();
    if (videoRef.current.paused) {
      videoRef.current.play().catch(err => {
        setError('Failed to play video. Please try again.');
      });
    } else {
      videoRef.current.pause();
    }
  };

  const seek = (seconds) => {
    updateActivity();
    const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
    videoRef.current.currentTime = newTime;
  };

  const seekToChapter = (chapterIndex) => {
    updateActivity();
    const chapter = chapters[chapterIndex];
    if (chapter) {
      videoRef.current.currentTime = chapter.time;
      setShowChapters(false);
    }
  };

  const handleSeek = (e) => {
    updateActivity();
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const seekTime = (clickX / width) * duration;
    videoRef.current.currentTime = seekTime;
  };

  const handleProgressHover = (e) => {
    const rect = progressRef.current.getBoundingClientRect();
    const hoverX = e.clientX - rect.left;
    const width = rect.width;
    const hoverTime = (hoverX / width) * duration;
    setTooltipTime(hoverTime);
    setTooltipPosition(hoverX);
    setShowTooltip(true);
  };

  const handleProgressLeave = () => {
    setShowTooltip(false);
  };

  const changeVolume = (delta) => {
    updateActivity();
    const newVolume = Math.max(0, Math.min(1, volume + delta));
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleVolumeChange = (e) => {
    updateActivity();
    const newVolume = parseFloat(e.target.value);
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    updateActivity();
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    updateActivity();
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.log('Fullscreen request failed');
      });
    } else {
      document.exitFullscreen();
    }
  };

  const togglePictureInPicture = async () => {
    updateActivity();
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (error) {
      console.log('Picture-in-Picture not supported');
    }
  };

  const changePlaybackRate = (rate) => {
    updateActivity();
    videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
    setShowSpeedMenu(false);
  };

  const changeQuality = (newQuality) => {
    updateActivity();
    setQuality(newQuality);
    setShowQualityMenu(false);
    // In a real app, you'd switch video sources here
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  const bufferedPercentage = duration > 0 ? (buffered / duration) * 100 : 0;

  if (error) {
    return (
      <div className="relative bg-black rounded-lg overflow-hidden aspect-video flex items-center justify-center">
        <div className="text-center text-white">
          <svg className="w-16 h-16 mx-auto mb-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <p className="text-lg font-semibold mb-2">Playback Error</p>
          <p className="text-gray-300 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative bg-black rounded-lg overflow-hidden group"
      tabIndex={0}
      onMouseMove={updateActivity}
      onTouchStart={updateActivity}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full"
        poster={video.thumbnail}
        onClick={togglePlay}
        onDoubleClick={toggleFullscreen}
        playsInline
        preload="metadata"
      >
        <source src={video.url} type="video/mp4" />
        <track 
          kind="subtitles" 
          src="/captions/en.vtt" 
          srcLang="en" 
          label="English"
          default={showCaptions}
        />
        Your browser does not support the video tag.
      </video>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/20 border-t-white"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-sm font-medium">Loading...</div>
            </div>
          </div>
        </div>
      )}

      {/* Big Play Button */}
      {showBigPlayButton && !isPlaying && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={togglePlay}
            className="bg-white/20 backdrop-blur-sm rounded-full p-6 hover:bg-white/30 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/30"
            aria-label="Play video"
          >
            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      )}

      {/* Overlay Controls */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        } group-hover:opacity-100`}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => isPlaying && !isMobile && setShowControls(false)}
      >
        {/* Top Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-white text-sm font-medium truncate">{video.title}</span>
            {chapters.length > 0 && (
              <button
                onClick={() => setShowChapters(!showChapters)}
                className="text-white/80 hover:text-white transition-colors px-2 py-1 rounded text-xs bg-white/10"
                title="Chapters"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
                </svg>
              </button>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {/* Current Chapter */}
            {chapters.length > 0 && (
              <span className="text-white/80 text-xs bg-black/30 px-2 py-1 rounded">
                {chapters[currentChapter]?.title}
              </span>
            )}
            {/* Captions */}
            <button
              onClick={() => setShowCaptions(!showCaptions)}
              className={`text-white hover:text-gray-300 transition-colors px-2 py-1 rounded ${
                showCaptions ? 'bg-white/20' : ''
              }`}
              title="Toggle captions (C)"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
            </button>
            {/* Settings */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="text-white hover:text-gray-300 transition-colors px-2 py-1 rounded"
              title="Settings"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
              </svg>
            </button>
            {/* Quality Selector */}
            <div className="relative">
              <button
                onClick={() => setShowQualityMenu(!showQualityMenu)}
                className="text-white hover:text-gray-300 transition-colors px-2 py-1 rounded"
              >
                {quality}
              </button>
              {showQualityMenu && (
                <div className="absolute top-full right-0 bg-black/90 rounded-lg py-2 min-w-[100px] z-10">
                  {qualityOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => changeQuality(option.value)}
                      className={`block w-full text-left px-3 py-1 text-sm hover:bg-white/20 transition-colors ${
                        quality === option.value ? 'text-blue-400' : 'text-white'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Chapters Menu */}
        {showChapters && (
          <div className="absolute top-16 left-4 bg-black/90 rounded-lg py-2 min-w-[250px] z-10 max-h-64 overflow-y-auto">
            {chapters.map((chapter, index) => (
              <button
                key={index}
                onClick={() => seekToChapter(index)}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-white/20 transition-colors ${
                  currentChapter === index ? 'text-blue-400 bg-white/10' : 'text-white'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{chapter.title}</span>
                  <span className="text-xs text-gray-400">{formatTime(chapter.time)}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Settings Menu */}
        {showSettings && (
          <div className="absolute top-16 right-4 bg-black/90 rounded-lg py-2 min-w-[200px] z-10">
            <div className="px-4 py-2 border-b border-white/20">
              <h3 className="text-white text-sm font-medium">Settings</h3>
            </div>
            <div className="px-4 py-2">
              <div className="mb-3">
                <label className="text-white text-xs block mb-1">Playback Speed</label>
                <select 
                  value={playbackRate} 
                  onChange={(e) => changePlaybackRate(parseFloat(e.target.value))}
                  className="w-full bg-white/10 text-white text-sm rounded px-2 py-1"
                >
                  {speedOptions.map(speed => (
                    <option key={speed} value={speed}>{speed}x</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Progress Bar */}
          <div 
            ref={progressRef}
            className="relative h-2 bg-white/30 rounded-full cursor-pointer mb-4 group/progress"
            onClick={handleSeek}
            onMouseMove={handleProgressHover}
            onMouseLeave={handleProgressLeave}
          >
            {/* Buffered Progress */}
            <div 
              className="absolute top-0 left-0 h-full bg-white/50 rounded-full transition-all duration-300"
              style={{ width: `${bufferedPercentage}%` }}
            />
            {/* Played Progress */}
            <div 
              className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
            {/* Progress Handle */}
            <div 
              className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full -ml-2 transition-all duration-200 ${
                isDragging ? 'scale-125' : 'opacity-0 group-hover/progress:opacity-100'
              }`}
              style={{ left: `${progressPercentage}%` }}
            />
            {/* Time Tooltip */}
            {showTooltip && (
              <div 
                className="absolute bottom-full mb-2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded"
                style={{ left: `${tooltipPosition}px` }}
              >
                {formatTime(tooltipTime)}
              </div>
            )}
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                className="text-white hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 rounded"
                title="Play/Pause (Space)"
              >
                {isPlaying ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Rewind/Forward */}
              <button 
                onClick={() => seek(-10)}
                className="text-white hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 rounded"
                title="Rewind 10s (←)"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.99 5V1l-5 5 5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 7.99 8s8-3.58 8-8-3.58-8-8-8z" />
                </svg>
              </button>

              <button 
                onClick={() => seek(10)}
                className="text-white hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 rounded"
                title="Forward 10s (→)"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 13c0 4.4 3.6 8 8 8s8-3.6 8-8h-2c0 3.3-2.7 6-6 6s-6-2.7-6-6s2.7-6 6-6v4l5-5-5-5v4c-4.4 0-8 3.6-8 8z" />
                </svg>
              </button>

              {/* Volume */}
              <div 
                className="flex items-center space-x-2 relative"
                onMouseEnter={() => setShowVolumeSlider(true)}
                onMouseLeave={() => setShowVolumeSlider(false)}
              >
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 rounded"
                  title="Mute (M)"
                >
                  {isMuted || volume === 0 ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                    </svg>
                  ) : volume < 0.5 ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                    </svg>
                  )}
                </button>
                <div className={`transition-all duration-300 ${showVolumeSlider ? 'w-16 opacity-100' : 'w-0 opacity-0 overflow-hidden'}`}>
                  <input
                    ref={volumeSliderRef}
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, white 0%, white ${volume * 100}%, rgba(255,255,255,0.3) ${volume * 100}%, rgba(255,255,255,0.3) 100%)`
                    }}
                  />
                </div>
              </div>

              {/* Time Display */}
              <div className="text-white text-sm font-mono">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Playback Speed */}
              <div className="relative">
                <button
                  onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                  className="text-white hover:text-gray-300 transition-colors px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-white/30"
                  title="Playback speed"
                >
                  {playbackRate}x
                </button>
                {showSpeedMenu && (
                  <div className="absolute bottom-full right-0 mb-2 bg-black/90 rounded-lg py-2 min-w-[80px] z-10">
                    {speedOptions.map((speed) => (
                      <button
                        key={speed}
                        onClick={() => changePlaybackRate(speed)}
                        className={`block w-full text-left px-3 py-1 text-sm hover:bg-white/20 transition-colors ${
                          playbackRate === speed ? 'text-blue-400' : 'text-white'
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Picture in Picture */}
              <button
                onClick={togglePictureInPicture}
                className="text-white hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 rounded"
                title="Picture in Picture"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 7h-8v6h8V7zm2-4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"/>
                </svg>
              </button>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 rounded"
                title="Fullscreen (F)"
              >
                {isFullscreen ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Help */}
      {showKeyboardShortcuts && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20">
          <div className="bg-black/90 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-lg font-semibold">Keyboard Shortcuts</h3>
              <button
                onClick={() => setShowKeyboardShortcuts(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-white/80">Space</span>
                <span className="text-white">Play/Pause</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">← →</span>
                <span className="text-white">Seek 10s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">↑ ↓</span>
                <span className="text-white">Volume</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">F</span>
                <span className="text-white">Fullscreen</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">M</span>
                <span className="text-white">Mute</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">C</span>
                <span className="text-white">Captions</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">?</span>
                <span className="text-white">This help</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">Esc</span>
                <span className="text-white">Close menus</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Touch Controls */}
      {isMobile && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-0 top-0 bottom-0 w-1/3 pointer-events-auto" onClick={() => seek(-10)} />
          <div className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-auto" onClick={() => seek(10)} />
        </div>
      )}
    </div>
  );
}

export default VideoPlayer; 