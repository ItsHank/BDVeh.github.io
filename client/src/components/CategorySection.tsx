import { Card, CardContent } from "@/components/ui/card";
import sportsSilhouette from "@assets/generated_images/white_sports_car_silhouette.png";
import suvSilhouette from "@assets/generated_images/white_suv_truck_silhouette.png";
import motorcycleSilhouette from "@assets/generated_images/white_motorcycle_silhouette.png";
import cargoSilhouette from "@assets/generated_images/white_cargo_truck_silhouette.png";
import type { VehicleCategory } from "@shared/schema";

interface CategorySectionProps {
  onCategorySelect: (category: VehicleCategory) => void;
}

const categories = [
  { 
    name: "Autos", 
    value: "AUTOS" as VehicleCategory,
    silhouette: sportsSilhouette,
    count: 54,
    description: "Deportivos y sedanes de lujo"
  },
  { 
    name: "Camionetas", 
    value: "CAMIONETAS" as VehicleCategory,
    silhouette: suvSilhouette,
    count: 17,
    description: "SUVs y pickups potentes"
  },
  { 
    name: "Motos", 
    value: "MOTOS" as VehicleCategory,
    silhouette: motorcycleSilhouette,
    count: 9,
    description: "Motos de alta gama"
  },
  { 
    name: "Otros", 
    value: "OTROS" as VehicleCategory,
    silhouette: cargoSilhouette,
    count: 6,
    description: "Vehículos de carga, buses y más."
  },
];

export default function CategorySection({ onCategorySelect }: CategorySectionProps) {
  return (
    <div className="py-16 md:py-24 px-6 relative overflow-hidden bg-black">
      {/* Animated moving background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          background: 'linear-gradient(45deg, rgba(231, 111, 35, 0.1) 0%, transparent 50%, rgba(197, 166, 118, 0.1) 100%)',
          backgroundSize: '200% 200%',
          animation: 'gradient-move 8s ease infinite'
        }}></div>
      </div>
      
      <style>{`
        @keyframes gradient-move {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
        @keyframes float-up {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white"
              style={{ textShadow: '0 0 30px rgba(231, 111, 35, 0.5)' }}>
            Categorías Destacadas
          </h2>
          <p className="text-xl text-gaucho-orange">
            Explora nuestra colección organizada por tipo de vehículo
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card 
              key={category.value}
              className="overflow-hidden cursor-pointer transition-all duration-300 bg-gaucho-charcoal/60 border-4 border-gaucho-orange hover:border-gaucho-orange/100 hover:shadow-[0_0_40px_rgba(231,111,35,0.5)]"
              onClick={() => onCategorySelect(category.value)}
              data-testid={`card-category-${category.value.toLowerCase()}`}
              style={{ 
                animation: 'float-up 3s ease-in-out infinite',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div 
                className="h-48 bg-black flex items-center justify-center relative"
              >
                <img 
                  src={category.silhouette} 
                  alt={category.name}
                  className="h-32 object-contain drop-shadow-lg"
                />
              </div>
              <CardContent className="p-6 bg-gradient-to-b from-gaucho-charcoal/40 to-gaucho-charcoal/80">
                <h3 className="text-2xl font-bold mb-2 text-gaucho-orange"
                    style={{ textShadow: '0 0 15px rgba(231, 111, 35, 0.3)' }}>
                  {category.name}
                </h3>
                <p className="text-sm text-white/70 mb-3">
                  {category.description}
                </p>
                <p className="text-lg font-mono font-bold text-white">
                  {category.count} vehículos
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
