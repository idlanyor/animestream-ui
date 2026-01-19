import { Navbar } from "@/components/navbar";
import { getSchedule } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Clock, Star } from "lucide-react";

export default async function SchedulePage() {
  const scheduleData = await getSchedule();

  return (
    <main className="flex min-h-screen flex-col pb-20">
      <Navbar />
      <div className="container px-4 md:px-8 lg:px-12 pt-24 max-w-none">
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight uppercase mb-2 border-l-4 border-[#ac4bff] pl-4">
            Release <span className="text-[#ac4bff]">Schedule</span>
          </h1>
          <p className="text-muted-foreground font-medium uppercase tracking-wider text-xs mt-3">
            Weekly anime release schedule
          </p>
        </div>

        <div className="space-y-8">
          {scheduleData.days.map((dayData) => (
            <div key={dayData.day} className="space-y-4">
              {/* Day Header */}
              <div className="sticky top-16 z-10 bg-background/80 backdrop-blur-md border-b border-border py-3">
                <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tight">
                  <span className="text-[#ac4bff]">{dayData.day}</span>
                  <span className="text-muted-foreground text-sm ml-3">
                    ({dayData.animeList.length} releases)
                  </span>
                </h2>
              </div>

              {/* Anime List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dayData.animeList.map((anime) => (
                  <Link 
                    key={anime.animeId} 
                    href={`/anime/${anime.animeId}`}
                    className="group flex gap-4 p-4 rounded-xl border border-border hover:border-[#ac4bff]/50 bg-card hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:shadow-[#ac4bff]/10"
                  >
                    {/* Poster */}
                    <div className="relative w-20 h-28 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={anime.poster}
                        alt={anime.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="80px"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col gap-2 min-w-0">
                      <h3 className="font-bold text-sm line-clamp-2 group-hover:text-[#ac4bff] transition-colors">
                        {anime.title}
                      </h3>
                      
                      <div className="flex flex-wrap gap-2 text-xs">
                        <Badge variant="outline" className="bg-[#ac4bff]/10 border-[#ac4bff]/20 text-[#ac4bff]">
                          {anime.type}
                        </Badge>
                        {anime.score && (
                          <Badge variant="outline" className="gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            {anime.score}
                          </Badge>
                        )}
                      </div>

                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {anime.genres}
                      </p>

                      {anime.estimation && (
                        <div className="flex items-center gap-1 text-xs text-[#ac4bff] mt-auto">
                          <Clock className="h-3 w-3" />
                          {anime.estimation}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
