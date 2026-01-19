import { Navbar } from "@/components/navbar";
import { getGenres, getAnimeByGenre } from "@/lib/data";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { AnimeCard } from "@/components/anime-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GenresPageProps {
  searchParams: Promise<{ genre?: string; page?: string }>;
}

export default async function GenresPage({ searchParams }: GenresPageProps) {
  const params = await searchParams;
  const selectedGenre = params.genre || "fantasy";
  const currentPage = parseInt(params.page || "1");
  
  const genres = await getGenres();
  
  // Only fetch anime by genre if we have genres
  let animeList: any[] = [];
  let pagination: {
    currentPage: number;
    hasPrevPage: boolean;
    prevPage: number | null;
    hasNextPage: boolean;
    nextPage: number | null;
    totalPages: number;
  } = {
    currentPage: 1,
    hasPrevPage: false,
    prevPage: null,
    hasNextPage: false,
    nextPage: null,
    totalPages: 1
  };
  
  if (genres.length > 0) {
    try {
      const result = await getAnimeByGenre(selectedGenre, currentPage);
      animeList = result.animeList;
      pagination = result.pagination;
    } catch (error) {
      console.error("Error fetching anime by genre:", error);
    }
  }
  
  // Format the genre title for display
  const genreTitle = selectedGenre.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

  return (
    <main className="flex min-h-screen flex-col pb-20">
      <Navbar />
      
      <section className="container px-4 md:px-8 lg:px-12 mt-24 max-w-none">
        <div className="flex items-center justify-between mb-8 border-l-4 border-[#ac4bff] pl-4">
          <div>
            <h2 className="text-xl md:text-3xl font-bold uppercase tracking-tight">Anime <span className="text-[#ac4bff]">Genres</span></h2>
          </div>
        </div>
        
        {/* Genre Pills */}
        {genres.length > 0 ? (
          <div className="flex flex-wrap gap-3 mb-12">
            {genres.map((genre) => (
              <Link key={genre.genreId} href={`/genres?genre=${genre.genreId}`}>
                <Badge 
                  variant="outline" 
                  className={`px-5 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                    selectedGenre === genre.genreId 
                      ? 'bg-[#ac4bff] text-primary-foreground border-[#ac4bff]' 
                      : 'hover:bg-[#ac4bff] hover:text-primary-foreground hover:border-[#ac4bff]'
                  }`}
                >
                  {genre.title}
                </Badge>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mb-12 p-8 rounded-xl border border-border bg-card text-center">
            <p className="text-muted-foreground">Unable to load genres at the moment. Please try again later.</p>
          </div>
        )}

        {/* Genre Title */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold uppercase tracking-tight">
            <span className="text-[#ac4bff]">{genreTitle}</span> Anime
          </h3>
        </div>
        
        {/* Anime Grid */}
        {animeList.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 md:gap-6">
            {animeList.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-xl border border-border bg-card text-center">
            <p className="text-muted-foreground">No anime found in this genre.</p>
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <Button
              variant="outline"
              disabled={!pagination.hasPrevPage}
              asChild={pagination.hasPrevPage}
            >
              {pagination.hasPrevPage ? (
                <Link href={`/genres?genre=${selectedGenre}&page=${pagination.prevPage}`}>
                  <ChevronLeft className="h-4 w-4 mr-2" /> Previous
                </Link>
              ) : (
                <span><ChevronLeft className="h-4 w-4 mr-2 inline" /> Previous</span>
              )}
            </Button>
            
            <span className="text-sm font-medium">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            
            <Button
              variant="outline"
              disabled={!pagination.hasNextPage}
              asChild={pagination.hasNextPage}
            >
              {pagination.hasNextPage ? (
                <Link href={`/genres?genre=${selectedGenre}&page=${pagination.nextPage}`}>
                  Next <ChevronRight className="h-4 w-4 ml-2" />
                </Link>
              ) : (
                <span>Next <ChevronRight className="h-4 w-4 ml-2 inline" /></span>
              )}
            </Button>
          </div>
        )}
      </section>
    </main>
  );
}
