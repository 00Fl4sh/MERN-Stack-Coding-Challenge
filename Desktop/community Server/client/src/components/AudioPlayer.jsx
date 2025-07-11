import { useRef, useState, useEffect } from 'react';

function AudioPlayer({ src, title, artist, coverArt }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
      audioRef.current.playbackRate = playbackRate;
    }
  }, [volume, isMuted, playbackRate]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const percent = e.target.value;
    const seekTime = (percent / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e) => {
    setVolume(Number(e.target.value));
    setIsMuted(Number(e.target.value) === 0);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleSkip = (seconds) => {
    let newTime = audioRef.current.currentTime + seconds;
    if (newTime < 0) newTime = 0;
    if (newTime > duration) newTime = duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleLike = () => setIsLiked((l) => !l);
  const handleShuffle = () => setIsShuffling((s) => !s);
  const handleRepeat = () => setIsRepeating((r) => !r);

  const handleSpeedChange = (rate) => {
    setPlaybackRate(rate);
    setShowSpeedMenu(false);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/90 rounded-2xl shadow-lg p-4 flex flex-col sm:flex-row items-center gap-4">
      {/* Cover Art */}
      <div className="w-20 h-20 rounded-xl overflow-hidden bg-accent-100 flex items-center justify-center flex-shrink-0">
        {coverArt ? (
          <img src={coverArt} alt={title} className="w-full h-full object-cover" />
        ) : (
          <svg className="w-10 h-10 text-accent-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
        )}
      </div>
      {/* Info & Controls */}
      <div className="flex-1 flex flex-col gap-2 w-full">
        {/* Title & Artist */}
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="font-bold text-lg text-secondary-900 line-clamp-1">{title}</div>
            <div className="text-sm text-secondary-500 line-clamp-1">{artist}</div>
          </div>
          <button onClick={handleLike} className={`p-2 rounded-full ${isLiked ? 'bg-pink-100 text-pink-600' : 'bg-secondary-100 text-secondary-600'} hover:bg-pink-200 transition`} title="Like">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          </button>
        </div>
        {/* Progress Bar */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-secondary-500 w-10 text-right">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={duration ? (currentTime / duration) * 100 : 0}
            onChange={handleSeek}
            className="flex-1 accent-primary-600 h-1 rounded-full bg-secondary-200"
          />
          <span className="text-xs text-secondary-500 w-10">{formatTime(duration)}</span>
        </div>
        {/* Controls */}
        <div className="flex items-center justify-between gap-2 mt-2">
          <div className="flex items-center gap-2">
            <button onClick={handleShuffle} className={`p-2 rounded-full ${isShuffling ? 'bg-primary-100 text-primary-600' : 'bg-secondary-100 text-secondary-600'} hover:bg-primary-200 transition`} title="Shuffle">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M16 3h5v5"/><path d="M4 20l7-7 3-3"/><path d="M21 3l-7 7-3 3"/></svg>
            </button>
            <button onClick={() => handleSkip(-10)} className="p-2 rounded-full bg-secondary-100 text-secondary-600 hover:bg-primary-100 hover:text-primary-600 transition" title="Back 10s">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8V4l-8 8 8 8v-4.1c4.28 0 7.5 1.72 9.5 5.1-1.5-4.5-5.22-7-9.5-7z"/></svg>
            </button>
            <button onClick={handlePlayPause} className="p-3 rounded-full bg-primary-600 text-white hover:bg-primary-700 shadow-lg transition-all duration-200" title={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              )}
            </button>
            <button onClick={() => handleSkip(10)} className="p-2 rounded-full bg-secondary-100 text-secondary-600 hover:bg-primary-100 hover:text-primary-600 transition" title="Forward 10s">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 16v4l8-8-8-8v4.1c-4.28 0-7.5-1.72-9.5-5.1 1.5 4.5 5.22 7 9.5 7z"/></svg>
            </button>
            <button onClick={handleRepeat} className={`p-2 rounded-full ${isRepeating ? 'bg-primary-100 text-primary-600' : 'bg-secondary-100 text-secondary-600'} hover:bg-primary-200 transition`} title="Repeat">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>
            </button>
          </div>
          {/* Volume & Speed */}
          <div className="flex items-center gap-2">
            <button onClick={handleMute} className="p-2 rounded-full bg-secondary-100 text-secondary-600 hover:bg-primary-100 hover:text-primary-600 transition" title="Mute">
              {isMuted || volume === 0 ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
              ) : volume < 0.5 ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/></svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 accent-primary-600 h-1 rounded-full bg-secondary-200"
            />
            {/* Playback Speed */}
            <div className="relative">
              <button onClick={() => setShowSpeedMenu((s) => !s)} className="p-2 rounded-full bg-secondary-100 text-secondary-600 hover:bg-primary-100 hover:text-primary-600 transition" title="Speed">
                {playbackRate}x
              </button>
              {showSpeedMenu && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded shadow-lg z-10">
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => handleSpeedChange(rate)}
                      className={`block w-full px-4 py-2 text-left text-sm ${playbackRate === rate ? 'text-primary-600 font-bold' : 'text-secondary-700'} hover:bg-primary-50`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="hidden"
      />
    </div>
  );
}

export default AudioPlayer; 