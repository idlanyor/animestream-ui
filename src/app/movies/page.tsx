import { Navbar } from "@/components/navbar";
import { AnimeCard } from "@/components/anime-card";
import { getMovies } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MoviesPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1");
  
  const { animeList, pagination } = await getMovies(currentPage);

  return (
    <main className="flex min-h-screen flex-col pb-20">
      <Navbar />
      <div className="container px-4 md:px-8 lg:px-12 pt-24 max-w-none">
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight uppercase mb-2 border-l-4 border-[#ac4bff] pl-4">
            Anime <span className="text-[#ac4bff]">Movies</span>
          </h1>
          <p className="text-muted-foreground font-medium uppercase tracking-wider text-xs mt-3">
            Epic cinematic experiences
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 md:gap-6">
          {animeList.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <Button
              variant="outline"
              disabled={!pagination.hasPrevPage}
              asChild={pagination.hasPrevPage}
            >
              {pagination.hasPrevPage ? (
                <Link href={`/movies?page=${pagination.prevPage}`}>
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
                <Link href={`/movies?page=${pagination.nextPage}`}>
                  Next <ChevronRight className="h-4 w-4 ml-2" />
                </Link>
              ) : (
                <span>Next <ChevronRight className="h-4 w-4 ml-2 inline" /></span>
              )}
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
