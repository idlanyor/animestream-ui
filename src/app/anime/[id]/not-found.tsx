import { Navbar } from "@/components/navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

export default function AnimeNotFound() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <div className="container flex-1 flex items-center justify-center px-4 md:px-8 lg:px-12">
        <div className="text-center space-y-6 max-w-md">
          <div className="relative">
            <h1 className="text-9xl font-black text-[#ac4bff]/20">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-2xl font-bold">Anime Not Found</p>
            </div>
          </div>
          
          <p className="text-muted-foreground">
            Sorry, we couldn't find the anime you're looking for. It might have been removed or the link is incorrect.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button asChild className="bg-[#ac4bff] hover:bg-[#9810fa]">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/search">
                <Search className="h-4 w-4 mr-2" />
                Search Anime
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
