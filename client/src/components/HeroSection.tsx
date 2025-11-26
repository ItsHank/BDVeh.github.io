import { Search, Zap } from "lucide-react";
import heroBg from "@assets/generated_images/dark_road_motion_blur_background.png";
import carSilhouette from "@assets/generated_images/car_front_silhouette_outline.png";
import { dealershipConfig } from "@shared/config";

interface HeroSectionProps {
  onExploreClick: () => void;
}

export default function HeroSection({ onExploreClick }: HeroSectionProps) {
  return (
    <div className="relative h-[600px] md:h-[700px] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-gaucho-charcoal via-gaucho-charcoal/85 to-gaucho-charcoal/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gaucho-orange/5" />
      
      {/* Silueta del coche con animación */}
      <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none overflow-hidden">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${carSilhouette})`, 
            backgroundSize: 'contain', 
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            animation: 'float-car 6s ease-in-out infinite'
          }}
        />
      </div>

      <style>{`
        @keyframes subtle-shift {
          0%, 100% { background-position: 0 0; }
          50% { background-position: 20px 20px; }
        }
        @keyframes float-car {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
      
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gaucho-orange via-gaucho-metallic to-gaucho-orange animate-glow-pulse" />
      
      <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-center text-center">
        <div className="max-w-4xl">
          <div className="mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gaucho-orange tracking-wider uppercase animate-fade-in" 
                style={{ textShadow: '0 0 20px rgba(231, 111, 35, 0.6)' }}>
              {dealershipConfig.name}
            </h2>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-gaucho-text leading-tight animate-slide-in-left"
              style={{ 
                textShadow: '0 0 30px rgba(231, 111, 35, 0.3), 0 0 60px rgba(231, 111, 35, 0.2)',
                fontFamily: 'var(--font-mono)'
              }}>
            {dealershipConfig.tagline}
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 text-gaucho-text/90 animate-slide-in-left max-w-2xl"
             style={{ animationDelay: '0.2s', opacity: 0, animation: 'slide-in-left 0.5s ease-out 0.2s forwards' }}>
            Explora nuestro catálogo de más de <span className="text-gaucho-orange font-bold">86 vehículos premium</span> en {dealershipConfig.name}, con beneficios exclusivos para clientes VIP
          </p>
          
          <div className="flex flex-wrap gap-4 animate-fade-in"
               style={{ animationDelay: '0.4s', opacity: 0, animation: 'fade-in 0.6s ease-out 0.4s forwards' }}>
            <button 
              onClick={onExploreClick}
              data-testid="button-explore-catalog"
              className="text-lg px-10 py-7 bg-gaucho-orange hover:bg-gaucho-orange/90 text-white font-bold transition-all duration-300 rounded-lg flex items-center gap-2"
              style={{ 
                boxShadow: '0 0 30px rgba(231, 111, 35, 0.6)',
                textShadow: '0 0 10px rgba(0, 0, 0, 0.3)'
              }}
            >
              <Search className="h-5 w-5" />
              Explorar Catálogo
            </button>
            <button 
              onClick={() => window.location.href = "https://discord.gg/ZajTsc3P"}
              data-testid="button-contact"
              className="text-lg px-10 py-7 bg-gaucho-metallic hover:bg-gaucho-metallic/90 text-gaucho-charcoal font-bold transition-all duration-300 rounded-lg flex items-center gap-2"
              style={{ 
                boxShadow: '0 0 30px rgba(197, 166, 118, 0.5)',
                textShadow: '0 0 10px rgba(0, 0, 0, 0.3)'
              }}
              title="Ir a Discord para Ofertas Exclusivas"
            >
              <Zap className="h-5 w-5" />
              Ofertas Exclusivas (Discord)
            </button>
          </div>
          
          <div className="mt-12 flex gap-12 animate-fade-in"
               style={{ animationDelay: '0.6s', opacity: 0, animation: 'fade-in 0.6s ease-out 0.6s forwards' }}>
            <div className="relative group">
              <div className="absolute -inset-2 bg-gaucho-orange/20 blur-xl group-hover:bg-gaucho-orange/30 transition-all duration-300" />
              <div className="relative">
                <p className="text-4xl md:text-5xl font-bold text-gaucho-orange font-mono" 
                   style={{ textShadow: '0 0 20px rgba(231, 111, 35, 0.5)' }}>86+</p>
                <p className="text-sm text-gaucho-text/70 uppercase tracking-wide">Vehículos Disponibles</p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-2 bg-gaucho-metallic/20 blur-xl group-hover:bg-gaucho-metallic/30 transition-all duration-300" />
              <div className="relative">
                <p className="text-4xl md:text-5xl font-bold text-gaucho-metallic font-mono">4</p>
                <p className="text-sm text-gaucho-text/70 uppercase tracking-wide">Categorías</p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-2 bg-gaucho-orange/20 blur-xl group-hover:bg-gaucho-orange/30 transition-all duration-300" />
              <div className="relative">
                <p className="text-4xl md:text-5xl font-bold text-gaucho-orange font-mono"
                   style={{ textShadow: '0 0 20px rgba(231, 111, 35, 0.5)' }}>3</p>
                <p className="text-sm text-gaucho-text/70 uppercase tracking-wide">Rangos de Precio</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gaucho-orange to-transparent" />
    </div>
  );
}
