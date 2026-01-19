import { Navbar } from "@/components/navbar";
import { AnimeCard } from "@/components/anime-card";
import { getAnimeByGenre } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GenrePageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function GenreDetailPage({ params, searchParams }: GenrePageProps) {
  const { id } = await params;
  const { page } = await searchParams;
  const currentPage = parseInt(page || "1");
  
  const { animeList, pagination } = await getAnimeByGenre(id, currentPage);
  
  // Format the ID for display
  const genreTitle = id.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

  return (
    <main className="flex min-h-screen flex-col pb-20">
      <Navbar />
      
      <section className="container px-4 md:px-8 lg:px-12 mt-24 max-w-none">
        <div className="flex items-center justify-between mb-8 border-l-4 border-[#ac4bff] pl-4">
          <div>
            <h2 className="text-xl md:text-3xl font-bold uppercase tracking-tight">Genre: <span className="text-[#ac4bff]">{genreTitle}</span></h2>
          </div>
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
              className="border-gray-800"
              disabled={!pagination.hasPrevPage}
              asChild={pagination.hasPrevPage}
            >
              {pagination.hasPrevPage ? (
                <Link href={`/genres/${id}?page=${pagination.prevPage}`}>
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
              className="border-gray-800"
              disabled={!pagination.hasNextPage}
              asChild={pagination.hasNextPage}
            >
              {pagination.hasNextPage ? (
                <Link href={`/genres/${id}?page=${pagination.nextPage}`}>
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
