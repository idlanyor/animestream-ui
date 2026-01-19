"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Settings, Maximize, Play, Volume2, Monitor } from "lucide-react"

interface Server {
  title: string
  serverId: string
  href: string
}

interface Quality {
  title: string
  serverList: Server[]
}

interface VideoPlayerProps {
  defaultUrl: string
  servers: Quality[]
}

export function VideoPlayer({ defaultUrl, servers }: VideoPlayerProps) {
  const [currentUrl, setCurrentUrl] = React.useState(defaultUrl)
  const [activeServer, setActiveServer] = React.useState("")

  return (
    <div className="flex flex-col w-full">
      {/* Player Frame */}
      <div className="w-full aspect-video bg-black relative group shadow-2xl">
        <iframe
          src={currentUrl}
          className="absolute inset-0 w-full h-full"
          allowFullScreen
          scrolling="no"
        />
        
        {/* Decorative Overlay to make it feel more integrated */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none p-6">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-white text-xs font-bold tracking-widest uppercase">Streaming Live</span>
           </div>
        </div>
      </div>

      {/* Server & Quality Selection Bar */}
      <div className="bg-muted/30 p-4 border-b flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#ac4bff]/20 p-2 rounded-lg">
            <Monitor className="h-4 w-4 text-[#ac4bff]" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Current Server</p>
            <p className="text-sm font-bold">{activeServer || "Default Blogger"}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {servers.map((q) => (
            <div key={q.title} className="flex items-center gap-1 bg-background/50 p-1 rounded-md border border-border/50">
              <span className="text-[10px] font-black px-2 text-muted-foreground">{q.title}</span>
              <div className="flex gap-1">
                {q.serverList.map((s) => (
                  <Button
                    key={s.serverId}
                    variant={activeServer === s.title ? "default" : "ghost"}
                    size="sm"
                    className={`h-7 px-3 text-[10px] font-bold transition-all ${
                      activeServer === s.title 
                        ? "bg-[#ac4bff] hover:bg-[#ac4bff] text-white shadow-lg shadow-[#ac4bff]/20" 
                        : "hover:bg-[#ac4bff]/10 hover:text-[#ac4bff]"
                    }`}
                    onClick={() => {
                      // In a real app, you would fetch the actual stream URL using the serverId
                      // For now we'll just show the interaction
                      setActiveServer(s.title)
                      // console.log("Switching to server:", s.serverId)
                    }}
                  >
                    {s.title.replace(q.title, "").trim() || "SV 1"}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
