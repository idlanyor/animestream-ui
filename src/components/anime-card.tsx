import Link from "next/link"
import Image from "next/image"
import { Star, Play } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Anime } from "@/lib/data"

interface AnimeCardProps {
  anime: Anime
}

export function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <Link href={`/anime/${anime.id}`} className="block h-full">
      <Card className="kanata-card group h-full flex flex-col hover:shadow-[0_0_20px_rgba(172,75,255,0.15)] transition-all duration-500 overflow-hidden">
        <CardContent className="p-0 flex flex-col h-full">
          {/* Image Container */}
          <div className="relative aspect-[2/3] overflow-hidden rounded-t-xl bg-muted">
            <Image
              src={anime.thumbnail}
              alt={anime.title}
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
            />
            
            {/* Elegant Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
              <div className="bg-[#ac4bff] p-4 rounded-full shadow-[0_0_25px_rgba(172,75,255,0.5)] transform scale-75 group-hover:scale-100 transition-transform duration-500">
                <Play className="h-6 w-6 text-white fill-current" />
              </div>
            </div>

            {/* Top Badges */}
            <div className="absolute top-2 left-2 flex flex-wrap gap-1">
               <Badge className="bg-[#ac4bff] hover:bg-[#ac4bff] border-none text-white text-[9px] font-black px-1.5 h-5 rounded-md shadow-lg">
                {anime.type}
              </Badge>
            </div>

            <div className="absolute top-2 right-2">
              <Badge className="bg-black/70 backdrop-blur-md border border-white/10 text-yellow-400 gap-1 text-[10px] font-bold px-1.5 h-5 rounded-md">
                <Star className="h-3 w-3 fill-current" />
                {anime.rating}
              </Badge>
            </div>
          </div>

          {/* Info Section */}
          <div className="p-3.5 flex flex-col flex-1 gap-2 bg-card">
            <div className="min-h-[2.5rem]">
              <h3 className="font-bold text-[13px] md:text-sm leading-[1.3] line-clamp-2 group-hover:text-[#ac4bff] transition-colors duration-300">
                {anime.title}
              </h3>
            </div>
            
            <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#ac4bff] animate-pulse" />
                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">
                  {anime.status}
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground font-medium">
                {anime.year}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
