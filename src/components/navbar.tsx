"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Search, Menu, Moon, Sun, Play, X, Command } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"

export function Navbar() {
  const { setTheme, resolvedTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [scrolled, setScrolled] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const executeSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchQuery("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeSearch()
    }
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Trending", href: "/trending" },
    { name: "Genres", href: "/genres" },
    { name: "Movies", href: "/movies" },
    { name: "Ongoing", href: "/ongoing" },
    { name: "Completed", href: "/completed" },
    { name: "Schedule", href: "/schedule" },
  ]

  return (
    <nav 
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300 border-b bg-background/80 backdrop-blur-xl border-border py-2 shadow-sm"
      )}
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#ac4bff] to-[#6d28d9] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-500" />
            <div className="relative bg-background p-1.5 rounded-lg border border-border">
              <Play className="h-5 w-5 text-[#ac4bff] fill-[#ac4bff]" />
            </div>
          </div>
          <span className="text-xl font-black tracking-tighter hidden sm:inline-block">
            KANATA<span className="text-[#ac4bff]">NIME</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={cn(
                "px-3 py-2 text-xs font-bold uppercase tracking-widest transition-all relative group",
                pathname === link.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.name}
              {pathname === link.href && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#ac4bff] rounded-full" />
              )}
              <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#ac4bff] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </Link>
          ))}
        </div>

        {/* Search & Controls */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:flex relative items-center group/search">
            <div className="absolute left-3 text-muted-foreground group-focus-within/search:text-[#ac4bff] transition-colors">
              <Search className="h-4 w-4" />
            </div>
            <Input
              type="search"
              placeholder="Search anime..."
              className="bg-accent/50 border-border pl-10 pr-10 h-9 w-[180px] lg:w-[240px] focus:w-[240px] lg:focus:w-[320px] transition-all rounded-full focus:ring-[#ac4bff]/40 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full h-9 w-9"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-9 w-9"
                onClick={toggleTheme}
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            )}

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden rounded-full h-9 w-9">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[350px] bg-background border-border p-0">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-border flex items-center justify-between">
                     <span className="text-xl font-black tracking-tight">
                        KANATA<span className="text-[#ac4bff]">NIME</span>
                     </span>
                     <SheetClose className="rounded-full p-2 hover:bg-accent transition-colors">
                        <X className="h-5 w-5" />
                     </SheetClose>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto py-6 px-6 space-y-1">
                    {navLinks.map((link) => (
                      <Link 
                        key={link.name} 
                        href={link.href} 
                        className={cn(
                          "flex items-center justify-between p-4 rounded-xl text-lg font-bold uppercase tracking-widest transition-all",
                          pathname === link.href ? "bg-primary/10 text-primary" : "hover:bg-accent"
                        )}
                      >
                        {link.name}
                        {pathname === link.href && <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(172,75,255,1)]" />}
                      </Link>
                    ))}
                  </div>

                  <div className="p-8 border-t border-border">
                     <div className="flex items-center gap-4 text-muted-foreground">
                        <Play className="h-5 w-5" />
                        <p className="text-xs font-bold uppercase tracking-widest italic">Streaming your favorite anime</p>
                     </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-background z-[100] animate-in fade-in duration-200">
          <div className="container mx-auto px-4 h-16 flex items-center gap-4">
            <Search className="h-5 w-5 text-[#ac4bff]" />
            <Input
              type="search"
              placeholder="Search anime..."
              className="flex-1 bg-transparent border-none text-lg h-full focus-visible:ring-0 px-0 font-bold"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsSearchOpen(false)}>
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}