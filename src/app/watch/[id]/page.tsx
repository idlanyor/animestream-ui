import { Navbar } from "@/components/navbar";
import { CustomPlayer } from "@/components/custom-player";
import { getEpisodeDetail } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  SkipForward, 
  SkipBack, 
  List,
  MessageSquare,
  Heart,
  Share2,
  Download,
  Monitor
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  let episode;
  try {
    episode = await getEpisodeDetail(id);
  } catch (error) {
    notFound();
  }

  // Determine if default URL is an iframe (heuristic: contains 'blogger' or 'video.g')
  const isIframe = episode.defaultStreamingUrl.includes("blogger.com") || 
                   episode.defaultStreamingUrl.includes("video.g") ||
                   !episode.defaultStreamingUrl.match(/\.(mp4|m3u8|webm)$/i);

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <div className="flex-1 flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-64px)] pt-16">
        {/* Main Content: Player + Info */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <CustomPlayer 
            src={episode.defaultStreamingUrl} 
            poster={episode.poster}
            isIframe={isIframe}
          />

          {/* Server Selection UI (Replaced VideoPlayer bar) */}
          <div className="bg-muted/30 p-4 border-b flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-[#ac4bff]/20 p-2 rounded-lg">
                <Monitor className="h-4 w-4 text-[#ac4bff]" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Default Source</p>
                <p className="text-sm font-bold">Blogger Mirror</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {episode.server.qualities.map((q) => (
                <div key={q.title} className="flex items-center gap-1 bg-background/50 p-1 rounded-md border border-border/50">
                  <span className="text-[10px] font-black px-2 text-muted-foreground">{q.title}</span>
                  <div className="flex gap-1">
                    {q.serverList.map((s) => (
                      <Button
                        key={s.serverId}
                        variant="ghost"
                        size="sm"
                        className="h-7 px-3 text-[10px] font-bold hover:bg-[#ac4bff]/10 hover:text-[#ac4bff] transition-all"
                      >
                        {s.title.replace(q.title, "").trim() || "SV 1"}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-black">{episode.title}</h1>
                <div className="flex items-center gap-4 mt-2">
                  <p className="text-muted-foreground">Released {episode.releasedOn}</p>
                  <div className="flex items-center gap-2">
                    {episode.hasPrevEpisode && episode.prevEpisode && (
                      <Button variant="outline" size="sm" asChild className="gap-2">
                        <Link href={`/watch/${episode.prevEpisode.episodeId}`}>
                          <SkipBack className="h-4 w-4" /> Previous
                        </Link>
                      </Button>
                    )}
                    {episode.hasNextEpisode && episode.nextEpisode && (
                      <Button variant="outline" size="sm" asChild className="gap-2">
                        <Link href={`/watch/${episode.nextEpisode.episodeId}`}>
                          Next <SkipForward className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="icon" className="rounded-full">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Synopsis and Genres */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {episode.genreList.map((genre) => (
                  <Link key={genre.genreId} href={`/genres/${genre.genreId}`}>
                    <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                      {genre.title}
                    </Badge>
                  </Link>
                ))}
              </div>
              <div className="text-muted-foreground leading-relaxed">
                {episode.synopsis.paragraphs.map((p, i) => (
                  <p key={i} className="mb-4">{p}</p>
                ))}
              </div>
            </div>

            <Separator />

            {/* Download Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Download className="h-5 w-5" /> Download Links
              </h3>
              <div className="grid gap-4">
                {episode.downloadUrl.formats.map((format, idx) => (
                  <div key={idx} className="bg-muted/30 p-4 rounded-xl">
                    <h4 className="font-bold text-[#ac4bff] mb-3">{format.title}</h4>
                    <div className="grid gap-3">
                      {format.qualities.map((quality, qIdx) => (
                        <div key={qIdx} className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                          <span className="font-bold min-w-[60px]">{quality.title}:</span>
                          <div className="flex flex-wrap gap-2">
                            {quality.urls.map((url, uIdx) => (
                              <Button key={uIdx} variant="outline" size="sm" className="h-7 text-[10px]" asChild>
                                <a href={url.url} target="_blank" rel="noopener noreferrer">
                                  {url.title}
                                </a>
                              </Button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comments Placeholder */}
            <div className="space-y-4">
               <h3 className="text-xl font-bold flex items-center gap-2">
                 <MessageSquare className="h-5 w-5" /> Comments
               </h3>
               <div className="p-4 border rounded-xl flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted" />
                  <div className="flex-1 space-y-2">
                     <div className="w-full h-10 bg-muted rounded-lg" />
                     <div className="flex justify-end">
                        <Button size="sm">POST COMMENT</Button>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Sidebar: Recommended Episodes */}
        <div className="w-full lg:w-[400px] border-l bg-muted/10 flex flex-col h-auto lg:h-[calc(100vh-64px)] overflow-hidden">
          <div className="p-4 border-b bg-background flex items-center justify-between shrink-0">
            <h3 className="font-bold flex items-center gap-2">
              <List className="h-4 w-4 text-primary" /> Recommended
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
            {episode.recommendedEpisodeList.map((rec) => (
              <Link 
                key={rec.href} 
                href={`/watch/${rec.episodeId}`}
                className="flex items-center gap-3 p-2 rounded-lg transition-colors hover:bg-muted group"
              >
                <div className="relative w-24 shrink-0 aspect-video rounded-md overflow-hidden">
                  <Image src={rec.poster} alt={rec.title} fill className="object-cover" />
                </div>
                <div className="flex flex-col justify-center overflow-hidden">
                  <span className="text-[10px] font-black uppercase text-primary">{rec.releaseDate}</span>
                  <h4 className="text-sm font-bold line-clamp-2 group-hover:text-[#ac4bff] transition-colors">{rec.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}