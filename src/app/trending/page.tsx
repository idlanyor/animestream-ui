import { Navbar } from "@/components/navbar";
import { AnimeCard } from "@/components/anime-card";
import { getPopularAnime } from "@/lib/data";

export default async function TrendingPage() {
  const trending = await getPopularAnime();

  return (
    <main className="flex min-h-screen flex-col pb-20">
      <Navbar />
      <div className="container px-4 md:px-8 lg:px-12 pt-24 max-w-none">
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight uppercase mb-2 border-l-4 border-[#ac4bff] pl-4">
            Trending <span className="text-[#ac4bff]">Now</span>
          </h1>
          <p className="text-muted-foreground font-medium uppercase tracking-wider text-xs mt-3">
            Most popular series this week
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 md:gap-6">
          {trending.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      </div>
    </main>
  );
}
