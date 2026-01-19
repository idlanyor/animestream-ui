"use client"

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Episode } from "@/lib/data";

interface EpisodeListProps {
  episodes: Episode[];
}

const EPISODES_PER_PAGE = 24;

export function EpisodeList({ episodes }: EpisodeListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Reverse episodes so latest is on top
  const reversedEpisodes = useMemo(() => [...episodes].reverse(), [episodes]);
  
  // Filter episodes based on search
  const filteredEpisodes = useMemo(() => {
    if (!searchQuery) return reversedEpisodes;
    
    const query = searchQuery.toLowerCase();
    return reversedEpisodes.filter(ep => {
      const episodeNumber = ep.number.toString();
      const episodeTitle = ep.title.toLowerCase();
      return episodeNumber.includes(query) || episodeTitle.includes(query);
    });
  }, [reversedEpisodes, searchQuery]);
  
  // Reset to page 1 when search changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };
  
  // Pagination
  const totalPages = Math.ceil(filteredEpisodes.length / EPISODES_PER_PAGE);
  const startIndex = (currentPage - 1) * EPISODES_PER_PAGE;
  const endIndex = startIndex + EPISODES_PER_PAGE;
  const paginatedEpisodes = filteredEpisodes.slice(startIndex, endIndex);

  return (
    <>
      <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Total: <span className="font-bold text-foreground">{episodes.length}</span> episodes
          {searchQuery && (
            <span className="ml-2">
              (Showing {filteredEpisodes.length})
            </span>
          )}
        </p>
        
        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search episode..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 bg-accent/50 border-border focus:ring-[#ac4bff]/40"
          />
        </div>
      </div>
      
      {/* Episodes Grid */}
      <div className="rounded-xl border-2 border-border bg-card/50 p-4 min-h-[400px] custom-scrollbar">
        {paginatedEpisodes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedEpisodes.map((ep) => (
              <Link key={ep.id} href={`/watch/${ep.id}`}>
                <div className="group flex gap-4 p-3 rounded-xl hover:bg-muted transition-colors border border-transparent hover:border-border">
                  <div className="relative w-32 shrink-0 aspect-video rounded-lg overflow-hidden">
                    <Image src={ep.thumbnail} alt={ep.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="h-6 w-6 text-white fill-current" />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center overflow-hidden">
                    <span className="text-xs font-bold text-primary mb-1">EP {ep.number}</span>
                    <h4 className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors">
                      {ep.title}
                    </h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No episodes found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="h-9"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(pageNum)}
                  className={`h-9 w-9 ${currentPage === pageNum ? 'bg-[#ac4bff] hover:bg-[#9810fa]' : ''}`}
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="h-9"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  );
}
