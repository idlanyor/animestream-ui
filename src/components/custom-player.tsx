"use client"

import * as React from "react"
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  Settings, 
  RotateCcw,
  RotateCw,
  SkipForward,
  SkipBack
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface CustomPlayerProps {
  src: string
  poster?: string
  isIframe?: boolean
}

export function CustomPlayer({ src, poster, isIframe = true }: CustomPlayerProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [volume, setVolume] = React.useState(1)
  const [isMuted, setIsMuted] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [duration, setDuration] = React.useState(0)
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const [showControls, setShowControls] = React.useState(true)
  
  // Timer for hiding controls
  const controlsTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current)
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false)
    }, 3000)
  }

  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    const newMuted = !isMuted
    setIsMuted(newMuted)
    videoRef.current.muted = newMuted
  }

  const handleProgressChange = (value: number[]) => {
    const newTime = value[0]
    setProgress(newTime)
    if (videoRef.current) {
      videoRef.current.currentTime = newTime
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const toggleFullscreen = () => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Effect to handle time updates
  React.useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => setProgress(video.currentTime)
    const handleLoadedMetadata = () => setDuration(video.duration)
    
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
    }
  }, [])

  if (isIframe) {
    return (
      <div className="w-full aspect-video bg-black relative shadow-2xl overflow-hidden group">
        <iframe
          src={src}
          className="absolute inset-0 w-full h-full"
          allowFullScreen
          scrolling="no"
        />
        {/* Note for User: Iframe content cannot be controlled with custom UI due to CORS. 
            This is a simulated shell. */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
           <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold text-center">
             External Source (Native Controls Only)
           </p>
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={containerRef}
      className="w-full aspect-video bg-black relative shadow-2xl overflow-hidden group cursor-none"
      onMouseMove={handleMouseMove}
      style={{ cursor: showControls ? 'default' : 'none' }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full"
        onClick={togglePlay}
      />

      {/* Overlays */}
      <div 
        className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
          isPlaying && !showControls ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {!isPlaying && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-20 h-20 rounded-full bg-[#ac4bff] hover:bg-[#9810fa] text-white shadow-2xl transform scale-100 hover:scale-110 transition-transform"
            onClick={togglePlay}
          >
            <Play className="h-10 w-10 fill-current" />
          </Button>
        )}
      </div>

      {/* Custom Controls Bar */}
      <div 
        className={`absolute inset-x-0 bottom-0 p-4 md:p-6 bg-gradient-to-t from-black via-black/80 to-transparent transition-transform duration-300 ${
          showControls ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex flex-col gap-4">
          {/* Progress Slider */}
          <div className="flex items-center gap-3 group/progress">
            <span className="text-[10px] font-mono text-white/70 w-10">{formatTime(progress)}</span>
            <Slider
              value={[progress]}
              max={duration || 100}
              step={0.1}
              onValueChange={handleProgressChange}
              className="flex-1 cursor-pointer"
            />
            <span className="text-[10px] font-mono text-white/70 w-10">{formatTime(duration)}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 h-8 w-8" onClick={() => {
                if (videoRef.current) videoRef.current.currentTime -= 10
              }}>
                <RotateCcw className="h-4 w-4" />
              </Button>
              
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 h-10 w-10" onClick={togglePlay}>
                {isPlaying ? <Pause className="h-6 w-6 fill-current" /> : <Play className="h-6 w-6 fill-current" />}
              </Button>

              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 h-8 w-8" onClick={() => {
                if (videoRef.current) videoRef.current.currentTime += 10
              }}>
                <RotateCw className="h-4 w-4" />
              </Button>

              <div className="flex items-center gap-2 ml-2 group/volume">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 h-8 w-8" onClick={toggleMute}>
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <div className="w-0 overflow-hidden group-hover/volume:w-20 transition-all duration-300">
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    max={1}
                    step={0.01}
                    onValueChange={handleVolumeChange}
                    className="w-20"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 h-8 w-8">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 h-8 w-8" onClick={toggleFullscreen}>
                {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
