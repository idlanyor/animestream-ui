import { Navbar } from "@/components/navbar";
import { AnimeCard } from "@/components/anime-card";
import { getSearchAnime } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Search as SearchIcon } from "lucide-react";

interface SearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: query, page } = await searchParams;
  const currentPage = parseInt(page || "1");
  
  if (!query) {
    return (
      <main className="flex min-h-screen flex-col pb-20">
        <Navbar />
        <section className="container px-4 md:px-8 lg:px-12 mt-32 text-center">
          <SearchIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-20" />
          <h2 className="text-2xl font-bold">Search for Anime</h2>
          <p className="text-muted-foreground">Enter a keyword in the search bar to find your favorite anime.</p>
        </section>
      </main>
    );
  }

  const { animeList, pagination } = await getSearchAnime(query, currentPage);

  return (
    <main className="flex min-h-screen flex-col pb-20">
      <Navbar />
      
      <section className="container px-4 md:px-8 lg:px-12 mt-24 max-w-none">
        <div className="flex items-center justify-between mb-8 border-l-4 border-[#ac4bff] pl-4">
          <div>
            <h2 className="text-xl md:text-3xl font-bold uppercase tracking-tight">
              Search Results: <span className="text-[#ac4bff]">"{query}"</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Found {animeList.length} titles</p>
          </div>
        </div>
        
        {animeList.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 md:gap-6">
            {animeList.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-xl font-medium text-muted-foreground">No anime found matching your search.</p>
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <Button
              variant="outline"
              className="border-gray-800"
              disabled={!pagination.hasPrevPage}
              asChild={pagination.hasPrevPage}
            >
              {pagination.hasPrevPage ? (
                <Link href={`/search?q=${query}&page=${pagination.prevPage}`}>
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
                <Link href={`/search?q=${query}&page=${pagination.nextPage}`}>
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
