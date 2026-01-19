import { Navbar } from "@/components/navbar";
import { getAnimeDetail } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Star, Calendar, Plus, ThumbsUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EpisodeList } from "@/components/episode-list";

export default async function AnimeDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  let anime;
  try {
    anime = await getAnimeDetail(id);
  } catch (error) {
    notFound();
  }

  if (!anime) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col pb-20">
      <Navbar />

      {/* Backdrop Banner */}
      <div className="relative w-full h-[40vh] md:h-[50vh]">
        <Image
          src={anime.banner}
          alt={anime.title}
          fill
          className="object-cover brightness-[0.3]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <div className="container px-4 md:px-8 -mt-32 md:-mt-48 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Poster & Details */}
          <div className="w-full max-w-[280px] mx-auto md:mx-0 shrink-0 space-y-6">
            {/* Poster */}
            <div className="aspect-[2/3] relative rounded-2xl overflow-hidden shadow-2xl border-4 border-background">
              <Image
                src={anime.thumbnail}
                alt={anime.title}
                fill
                className="object-cover"
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <Button size="lg" className="w-full font-bold h-12" asChild>
                <Link href={`/watch/${anime.id}`}>
                  <Play className="mr-2 h-5 w-5 fill-current" /> WATCH NOW
                </Link>
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="secondary" className="font-semibold">
                  <Plus className="mr-2 h-4 w-4" /> LIST
                </Button>
                <Button variant="secondary" className="font-semibold">
                  <ThumbsUp className="mr-2 h-4 w-4" /> LIKE
                </Button>
              </div>
            </div>

            {/* Details - Desktop Only */}
            <div className="hidden md:block space-y-4 p-5 rounded-xl bg-muted/30 border">
              <h3 className="text-lg font-bold uppercase tracking-tight mb-4">Details</h3>
              
              <div>
                <h4 className="text-xs font-bold text-muted-foreground uppercase mb-1">Japanese</h4>
                <p className="text-sm font-semibold">{anime.japanese || anime.title}</p>
              </div>
              
              <div>
                <h4 className="text-xs font-bold text-muted-foreground uppercase mb-1">Status</h4>
                <p className="text-sm font-semibold">{anime.status}</p>
              </div>
              
              <div>
                <h4 className="text-xs font-bold text-muted-foreground uppercase mb-1">Year</h4>
                <p className="text-sm font-semibold">{anime.year}</p>
              </div>
              
              <div>
                <h4 className="text-xs font-bold text-muted-foreground uppercase mb-1">Studios</h4>
                <p className="text-sm font-semibold text-primary">{anime.studios || "Unknown"}</p>
              </div>
              
              <div>
                <h4 className="text-xs font-bold text-muted-foreground uppercase mb-1">Producers</h4>
                <p className="text-sm font-semibold text-primary">{anime.producers || "Unknown"}</p>
              </div>
              
              <div>
                <h4 className="text-xs font-bold text-muted-foreground uppercase mb-1">Episodes</h4>
                <p className="text-sm font-semibold">{anime.episodes.length}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Info & Episodes */}
          <div className="flex-1 space-y-8 pt-0 md:pt-32">
            {/* Title & Description */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge className="bg-primary hover:bg-primary font-bold">{anime.type || "TV SERIES"}</Badge>
                <div className="flex items-center gap-1 text-yellow-500 font-bold">
                  <Star className="h-5 w-5 fill-current" />
                  {anime.rating}
                </div>
                <div className="flex items-center gap-1 text-muted-foreground text-sm font-medium">
                   <Calendar className="h-4 w-4" /> {anime.year}
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-4">
                {anime.title}
              </h1>
              <div className="flex flex-wrap gap-2 mb-6">
                {anime.genre.map(g => (
                  <Link key={g} href={`/genres/${g.toLowerCase().replace(/\s+/g, '-')}`}>
                    <Badge variant="outline" className="px-3 py-1 text-sm font-medium rounded-full hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                      {g}
                    </Badge>
                  </Link>
                ))}
              </div>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                {anime.description}
              </p>
            </div>

            {/* Details Mobile Only */}
            <div className="md:hidden grid grid-cols-2 gap-4 p-5 rounded-xl bg-muted/30 border">
              <div>
                <h4 className="text-xs font-bold text-muted-foreground uppercase mb-1">Japanese</h4>
                <p className="text-sm font-semibold">{anime.japanese || anime.title}</p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-muted-foreground uppercase mb-1">Status</h4>
                <p className="text-sm font-semibold">{anime.status}</p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-muted-foreground uppercase mb-1">Studios</h4>
                <p className="text-sm font-semibold text-primary">{anime.studios || "Unknown"}</p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-muted-foreground uppercase mb-1">Episodes</h4>
                <p className="text-sm font-semibold">{anime.episodes.length}</p>
              </div>
            </div>

            {/* Episodes List */}
            <div>
              <h2 className="text-2xl font-bold uppercase tracking-tight mb-6">
                <span className="text-[#ac4bff]">Episodes</span>
              </h2>
              <EpisodeList episodes={anime.episodes} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
