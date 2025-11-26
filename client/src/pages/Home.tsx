import { useState, useMemo, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import FilterBar from "@/components/FilterBar";
import VehicleCard from "@/components/VehicleCard";
import VIPSelector from "@/components/VIPSelector";
import VehicleSidePanel from "@/components/VehicleSidePanel";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { vehicles, type VehicleCategory, type PriceRange } from "@shared/schema";
import { dealershipConfig } from "@shared/config";
import type { VIPLevel } from "@/lib/vipDiscounts";
import { useDebounce } from "@/hooks/use-debounce";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<VehicleCategory | "ALL">("ALL");
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange | "ALL">("ALL");
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "name">("price-desc");
  const [vipLevel, setVipLevel] = useState<VIPLevel>("NONE");
  const [loading, setLoading] = useState(true);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const VEHICLES_PER_PAGE = 6;
  
  const catalogRef = useRef<HTMLDivElement>(null);
  const filterBarRef = useRef<HTMLDivElement>(null);
  const vehicleRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const isSearching = searchQuery !== debouncedSearchQuery;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleExploreClick = () => {
    catalogRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCategorySelect = (category: VehicleCategory) => {
    setSelectedCategory(category);
    catalogRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const hasActiveFilters = debouncedSearchQuery || selectedCategory !== "ALL" || selectedPriceRange !== "ALL" || selectedVehicleId !== null;

  const filteredVehicles = useMemo(() => {
    let filtered = vehicles;

    if (debouncedSearchQuery) {
      filtered = filtered.filter(v => 
        v.model.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "ALL") {
      filtered = filtered.filter(v => v.category === selectedCategory);
    }

    if (selectedPriceRange !== "ALL") {
      filtered = filtered.filter(v => v.priceRange === selectedPriceRange);
    }

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return a.model.localeCompare(b.model);
    });

    return sorted;
  }, [debouncedSearchQuery, selectedCategory, selectedPriceRange, sortBy]);

  const totalPages = Math.ceil(filteredVehicles.length / VEHICLES_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery, selectedCategory, selectedPriceRange, sortBy]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const displayedVehicles = useMemo(() => {
    if (selectedVehicleId) {
      return filteredVehicles.filter(v => v.id === selectedVehicleId);
    }
    
    const startIndex = (currentPage - 1) * VEHICLES_PER_PAGE;
    const endIndex = startIndex + VEHICLES_PER_PAGE;
    return filteredVehicles.slice(startIndex, endIndex);
  }, [filteredVehicles, selectedVehicleId, currentPage]);

  // Paleta dinámica según VIP
  const vipPalette = {
    NONE: {
      primary: "gaucho-orange",
      secondary: "gaucho-metallic",
      accentColor: "rgba(231, 111, 35, 1)",
      shadowColor: "rgba(231, 111, 35, 0.5)",
      glowColor: "0 0 30px rgba(231, 111, 35, 0.6)",
    },
    PLATINO: {
      primary: "gaucho-metallic",
      secondary: "white",
      accentColor: "rgba(197, 166, 118, 1)",
      shadowColor: "rgba(197, 166, 118, 0.5)",
      glowColor: "0 0 30px rgba(197, 166, 118, 0.6)",
    },
    ORO: {
      primary: "yellow-400",
      secondary: "gaucho-orange",
      accentColor: "rgba(250, 204, 21, 1)",
      shadowColor: "rgba(250, 204, 21, 0.5)",
      glowColor: "0 0 30px rgba(250, 204, 21, 0.6)",
    },
    DIAMANTE: {
      primary: "cyan-400",
      secondary: "blue-500",
      accentColor: "rgba(34, 211, 238, 1)",
      shadowColor: "rgba(34, 211, 238, 0.5)",
      glowColor: "0 0 30px rgba(34, 211, 238, 0.6)",
    },
  };

  const currentPalette = vipPalette[vipLevel];

  const vipCardStyles = {
    NONE: {
      text: "text-gaucho-orange",
      bg: "bg-gradient-to-br from-gaucho-orange/5 to-gaucho-orange/10 border-gaucho-orange/20",
    },
    PLATINO: {
      text: "text-gaucho-metallic",
      bg: "bg-gradient-to-br from-gaucho-metallic/5 to-gaucho-metallic/10 border-gaucho-metallic/20",
    },
    ORO: {
      text: "text-yellow-400",
      bg: "bg-gradient-to-br from-yellow-500/8 to-yellow-400/15 border-yellow-400/30",
    },
    DIAMANTE: {
      text: "text-cyan-400",
      bg: "bg-gradient-to-br from-cyan-500/8 to-cyan-400/15 border-cyan-400/30",
    },
  };

  const scrollToFilters = () => {
    filterBarRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handlePageChange = (newPage: number) => {
    setIsPageTransitioning(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsPageTransitioning(false);
    }, 300);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("ALL");
    setSelectedPriceRange("ALL");
    setSelectedVehicleId(null);
    setCurrentPage(1);
  };

  const handleVehicleSelect = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId);
    setSearchQuery("");
    setSelectedCategory("ALL");
    setSelectedPriceRange("ALL");
    catalogRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection onExploreClick={handleExploreClick} />
      <CategorySection onCategorySelect={handleCategorySelect} />
      
      <VehicleSidePanel
        isOpen={isSidePanelOpen}
        onClose={() => setIsSidePanelOpen(false)}
        onVehicleSelect={handleVehicleSelect}
      />
      
      <div className={`py-16 px-6 relative overflow-hidden`} ref={catalogRef}
           style={{ 
             background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.98) 0%, rgba(43, 43, 43, 0.98) 50%, rgba(26, 26, 26, 0.98) 100%)',
             backgroundSize: '400% 400%',
             animation: 'gradient-shift 15s ease infinite'
           }}>
        <style>{`
          @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes float-orb-1 {
            0%, 100% { transform: translate(0, 0); }
            25% { transform: translate(100px, -100px); }
            50% { transform: translate(50px, 100px); }
            75% { transform: translate(-80px, -50px); }
          }
          @keyframes float-orb-2 {
            0%, 100% { transform: translate(0, 0); }
            25% { transform: translate(-80px, 100px); }
            50% { transform: translate(100px, -80px); }
            75% { transform: translate(-60px, 60px); }
          }
          @keyframes float-orb-3 {
            0%, 100% { transform: translate(0, 0); }
            25% { transform: translate(60px, 80px); }
            50% { transform: translate(-100px, 40px); }
            75% { transform: translate(90px, -100px); }
          }
        `}</style>
        
        {/* Orbes flotantes de fondo - VISIBLES */}
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full opacity-20 blur-2xl pointer-events-none" 
             style={{ background: 'radial-gradient(circle, rgba(231, 111, 35, 0.6) 0%, transparent 70%)', animation: 'float-orb-1 20s ease-in-out infinite' }} />
        <div className="absolute top-1/2 right-20 w-96 h-96 rounded-full opacity-20 blur-2xl pointer-events-none" 
             style={{ background: 'radial-gradient(circle, rgba(197, 166, 118, 0.6) 0%, transparent 70%)', animation: 'float-orb-2 25s ease-in-out infinite' }} />
        <div className="absolute bottom-10 left-1/3 w-96 h-96 rounded-full opacity-20 blur-2xl pointer-events-none" 
             style={{ background: 'radial-gradient(circle, rgba(34, 211, 238, 0.6) 0%, transparent 70%)', animation: 'float-orb-3 22s ease-in-out infinite' }} />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gaucho-orange to-transparent" />
        <div className="max-w-7xl mx-auto relative">
          <div className="mb-12">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-gaucho-text font-mono tracking-wide"
                style={{ textShadow: `0 0 30px ${currentPalette.shadowColor}` }}>
              Catálogo Completo
            </h2>
            <p className="text-xl text-gaucho-text/70 mb-8 flex items-center gap-3">
              {isSearching ? (
                <span className="animate-pulse" style={{ color: currentPalette.accentColor }}>Buscando...</span>
              ) : (
                <>
                  <span className="font-bold font-mono text-2xl" style={{ color: currentPalette.accentColor }}>{filteredVehicles.length}</span>
                  <span>vehículo{filteredVehicles.length !== 1 ? 's' : ''} disponible{filteredVehicles.length !== 1 ? 's' : ''}</span>
                  {totalPages > 1 && (
                    <>
                      <span style={{ color: currentPalette.accentColor }}>•</span>
                      <span className="font-mono" style={{ color: currentPalette.accentColor }}>Página {currentPage} de {totalPages}</span>
                    </>
                  )}
                </>
              )}
            </p>

            <div className="mb-8">
              <VIPSelector selectedLevel={vipLevel} onLevelChange={setVipLevel} />
            </div>

            <div ref={filterBarRef}>
              <FilterBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedPriceRange={selectedPriceRange}
                onPriceRangeChange={setSelectedPriceRange}
                sortBy={sortBy}
                onSortChange={setSortBy}
                onClearFilters={handleClearFilters}
                onOpenVehicleList={() => setIsSidePanelOpen(true)}
              />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-32">
              <p className="text-gray-500 text-lg animate-pulse">Cargando vehículos...</p>
            </div>
          ) : filteredVehicles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-2xl text-muted-foreground">
                No se encontraron vehículos con los filtros seleccionados
              </p>
            </div>
          ) : (
            <>
              {/* Loading overlay during page transition */}
              {isPageTransitioning && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                  <div className="text-center">
                    <div className="inline-block">
                      <div className="w-12 h-12 border-4 border-gaucho-orange border-t-transparent rounded-full animate-spin mb-4"></div>
                      <p className="text-gaucho-orange font-mono text-lg animate-pulse">Cargando vehículos...</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300 ${isPageTransitioning ? 'opacity-50' : 'opacity-100'}`} style={{ rowGap: '4rem' }}>
                {displayedVehicles.map((vehicle, index) => (
                  <div 
                    key={vehicle.id} 
                    ref={(el) => { vehicleRefs.current[vehicle.id] = el; }}
                    className="animate-fade-in"
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      opacity: 0,
                      animation: `fade-in 0.6s ease-out ${index * 100}ms forwards`
                    }}
                  >
                    <VehicleCard 
                      vehicle={vehicle} 
                      vipLevel={vipLevel}
                      vipCardBg={vipCardStyles[vipLevel].bg}
                      vipTextColor={vipCardStyles[vipLevel].text}
                      primaryColor={currentPalette.accentColor}
                      shadowColor={currentPalette.shadowColor}
                    />
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{
                      borderColor: `${currentPalette.accentColor}60`,
                      boxShadow: `0 0 15px ${currentPalette.shadowColor}`
                    }}
                    className="border-2 hover:border-white bg-gaucho-warmGray/50 text-gaucho-text
                               disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <Button
                            key={page}
                            variant={page === currentPage ? "default" : "outline"}
                            size="lg"
                            onClick={() => handlePageChange(page)}
                            style={page === currentPage ? {
                              backgroundColor: currentPalette.accentColor,
                              color: 'white',
                              borderColor: currentPalette.accentColor,
                              boxShadow: currentPalette.glowColor
                            } : {
                              borderColor: `${currentPalette.accentColor}60`,
                              boxShadow: `0 0 10px ${currentPalette.shadowColor}`
                            }}
                            className={`border-2 font-mono font-bold min-w-12 transition-all duration-300 ${page === currentPage ? '' : 'hover:border-white bg-gaucho-warmGray/50 text-gaucho-text'}`}
                          >
                            {page}
                          </Button>
                        );
                      } else if (page === currentPage - 2 || page === currentPage + 2) {
                        return <span key={page} className="flex items-center text-gaucho-orange font-bold text-2xl px-2">...</span>;
                      }
                      return null;
                    })}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={{
                      borderColor: `${currentPalette.accentColor}60`,
                      boxShadow: `0 0 15px ${currentPalette.shadowColor}`
                    }}
                    className="border-2 hover:border-white bg-gaucho-warmGray/50 text-gaucho-text
                               disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <footer className="relative bg-gradient-to-b from-gaucho-charcoal to-black border-t-2 border-gaucho-orange/30 py-16 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gaucho-orange to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(231,111,35,0.03)_0%,_transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-6">
            <h3 className="text-4xl md:text-5xl font-bold mb-3 text-gaucho-orange font-mono tracking-wider uppercase"
                style={{ textShadow: '0 0 30px rgba(231, 111, 35, 0.6)' }}>
              {dealershipConfig.name}
            </h3>
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-gaucho-orange to-transparent mx-auto mb-4" />
            <p className="text-2xl md:text-3xl text-gaucho-text/90 font-mono font-bold tracking-wide"
               style={{ textShadow: '0 0 20px rgba(231, 111, 35, 0.3)' }}>
              {dealershipConfig.tagline}
            </p>
          </div>
          
          <div className="mt-8 flex justify-center gap-8 text-sm text-gaucho-text/60">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gaucho-orange animate-glow-pulse" />
              <span>86+ Vehículos Premium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gaucho-metallic animate-glow-pulse" style={{ animationDelay: '0.5s' }} />
              <span>Descuentos VIP Exclusivos</span>
            </div>
          </div>
          
          <div className="mt-8 text-xs text-gaucho-text/40">
            © 2025 {dealershipConfig.name}. Todos los derechos reservados.
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gaucho-orange to-transparent" />
      </footer>
    </div>
  );
}
