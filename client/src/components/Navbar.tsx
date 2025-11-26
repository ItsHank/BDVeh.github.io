import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { dealershipConfig } from "@shared/config";
import rumboLogo from "@assets/rumbo_al_gaucho_logo.png";

export default function Navbar() {
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-xl transition-all duration-300
                     ${scrolled 
                       ? 'bg-gaucho-charcoal/95 border-b-2 border-gaucho-orange/50 shadow-[0_0_30px_rgba(231,111,35,0.3)]' 
                       : 'bg-gaucho-charcoal/80 border-b-2 border-gaucho-orange/20'}`}>
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gaucho-orange to-transparent 
                      opacity-0 transition-opacity duration-300"
           style={{ opacity: scrolled ? 1 : 0 }} />
      
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Logo con efecto neon */}
            <div className="relative group hidden lg:block">
              <div className="absolute -inset-2 bg-gradient-to-r from-gaucho-orange via-gaucho-metallic to-gaucho-orange rounded-lg opacity-0 group-hover:opacity-100 blur-lg transition duration-300 animate-glow-pulse" />
              <img 
                src={rumboLogo} 
                alt={dealershipConfig.name}
                className="relative h-28 w-auto object-contain drop-shadow-lg rounded-lg"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gaucho-orange animate-glow-pulse" />
              <h1 className="text-xl md:text-2xl font-bold font-mono tracking-wider uppercase">
                <span className="text-gaucho-orange transition-all duration-300 hover:text-gaucho-metallic"
                      style={{ textShadow: '0 0 20px rgba(231, 111, 35, 0.5)' }}>
                  {dealershipConfig.name}
                </span>
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDark(!isDark)}
              data-testid="button-theme-toggle"
              className="border-2 border-gaucho-orange/30 hover:border-gaucho-orange 
                         bg-gaucho-warmGray/30 hover:bg-gaucho-orange/20
                         shadow-[0_0_10px_rgba(231,111,35,0.2)] hover:shadow-[0_0_20px_rgba(231,111,35,0.4)]
                         transition-all duration-300"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-gaucho-orange" />
              ) : (
                <Moon className="h-5 w-5 text-gaucho-orange" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
