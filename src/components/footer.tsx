import Link from "next/link";
import { Play, Github, Twitter, Mail, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    browse: [
      { name: "Trending", href: "/trending" },
      { name: "Genres", href: "/genres" },
      { name: "Movies", href: "/movies" },
      { name: "Schedule", href: "/schedule" },
    ],
    collections: [
      { name: "Ongoing", href: "/ongoing" },
      { name: "Completed", href: "/completed" },
    ],
  };

  return (
    <footer className="relative border-t border-border bg-background">
      {/* Gradient Accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ac4bff] to-transparent opacity-50" />
      
      <div className="container px-4 md:px-8 lg:px-12 py-12 max-w-none">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#ac4bff] to-[#6d28d9] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-500" />
                <div className="relative bg-background p-1.5 rounded-lg border border-border">
                  <Play className="h-5 w-5 text-[#ac4bff] fill-[#ac4bff]" />
                </div>
              </div>
              <span className="text-xl font-black tracking-tighter">
                KANATA<span className="text-[#ac4bff]">NIME</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Your ultimate destination for streaming the latest and greatest anime series. Watch, discover, and enjoy.
            </p>
            <div className="flex gap-3 pt-2">
              <a 
                href="#" 
                className="p-2 rounded-lg border border-border hover:border-[#ac4bff] hover:bg-[#ac4bff]/10 transition-all"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-lg border border-border hover:border-[#ac4bff] hover:bg-[#ac4bff]/10 transition-all"
                aria-label="Github"
              >
                <Github className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-lg border border-border hover:border-[#ac4bff] hover:bg-[#ac4bff]/10 transition-all"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Browse Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Browse
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.browse.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-[#ac4bff] transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Collections
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.collections.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-[#ac4bff] transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter/Info Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Stay Updated
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Get notified about new anime releases and updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 text-sm rounded-lg bg-accent/50 border border-border focus:border-[#ac4bff] focus:ring-1 focus:ring-[#ac4bff] outline-none transition-all"
              />
              <button className="px-4 py-2 text-sm font-bold rounded-lg bg-[#ac4bff] text-primary-foreground hover:bg-[#9810fa] transition-all whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} KanataNime. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Made with <Heart className="h-3.5 w-3.5 text-[#ac4bff] fill-[#ac4bff] animate-pulse" /> by Kanata Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
