import { Navbar } from "@/components/navbar";
import { AnimeCard } from "@/components/anime-card";
import { getHomeData, transformAPIAnime, getMovies } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Play, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const homeData = await getHomeData();
  
  const featuredAPI = homeData.data.top10.animeList[0];
  const featured = transformAPIAnime(featuredAPI, "TV");
  
  const recentAnime = homeData.data.recent.animeList.map(a => transformAPIAnime(a, "TV"));
  const { animeList: movies } = await getMovies(1);
  const top10 = homeData.data.top10.animeList.map(a => transformAPIAnime(a, "TV"));

  return (
    <main className="flex min-h-screen flex-col pb-20">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={featured.banner}
            alt={featured.title}
            fill
            priority
            className="object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/20 to-transparent" />
        </div>

        <div className="container relative z-10 px-4 md:px-8 lg:px-12 pb-20 md:pb-32 max-w-none">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="bg-[#ac4bff] text-primary-foreground px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-[#ac4bff]/20">
               FEATURED
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight leading-tight uppercase max-w-5xl text-foreground drop-shadow-lg">
            {featured.title}
          </h1>
          <p className="text-muted-foreground text-sm md:text-lg mb-10 line-clamp-3 max-w-2xl leading-relaxed drop-shadow-md">
            {featured.description || "Watch the latest episodes of " + featured.title + " on KanataAnime."}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="h-12 px-8 text-sm font-bold rounded-lg bg-[#ac4bff] text-primary-foreground hover:bg-[#9810fa] transition-all shadow-lg shadow-[#ac4bff]/20 border-none" asChild>
              <Link href={`/anime/${featured.id}`}>
                <Play className="mr-2 h-5 w-5 fill-current" /> WATCH NOW
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-sm font-bold rounded-lg bg-background/50 border-border hover:bg-background/70 transition-all backdrop-blur-sm" asChild>
              <Link href={`/anime/${featured.id}`}>
                INFO DETAILS
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Anime Grid */}
      <section className="container px-4 md:px-8 lg:px-12 mt-12 max-w-none">
        <div className="flex items-center justify-between mb-8 border-l-4 border-[#ac4bff] pl-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tight">Recent <span className="text-[#ac4bff]">Updates</span></h2>
          </div>
          <Button variant="ghost" className="hidden sm:flex items-center gap-1 font-bold text-[10px] tracking-widest text-gray-500 hover:text-[#ac4bff] transition-colors" asChild>
            <Link href="/ongoing">
               VIEW ALL <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 md:gap-6">
          {recentAnime.slice(0, 12).map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      </section>

      {/* Top 10 Anime */}
      <section className="container px-4 md:px-8 lg:px-12 mt-16 max-w-none">
        <div className="flex items-center justify-between mb-8 border-l-4 border-[#ac4bff] pl-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tight">Top <span className="text-[#ac4bff]">Anime</span></h2>
          </div>
          <Button variant="ghost" className="hidden sm:flex items-center gap-1 font-bold text-[10px] tracking-widest text-gray-500 hover:text-[#ac4bff] transition-colors" asChild>
            <Link href="/trending">
               VIEW ALL <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 md:gap-6">
          {top10.slice(0, 6).map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      </section>

      {/* Movies */}
      <section className="container px-4 md:px-8 lg:px-12 mt-16 max-w-none">
        <div className="flex items-center justify-between mb-8 border-l-4 border-[#ac4bff] pl-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tight">Anime <span className="text-[#ac4bff]">Movies</span></h2>
          </div>
          <Button variant="ghost" className="hidden sm:flex items-center gap-1 font-bold text-[10px] tracking-widest text-gray-500 hover:text-[#ac4bff] transition-colors" asChild>
             <Link href="/movies">
               VIEW ALL <ChevronRight className="h-4 w-4" />
             </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 md:gap-6">
          {movies.slice(0, 6).map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      </section>
    </main>
  );
}
