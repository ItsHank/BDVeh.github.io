import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gauge, Fuel, Package, Sparkles, Zap, Clock } from "lucide-react";
import type { Vehicle } from "@shared/schema";
import type { VIPLevel } from "@/lib/vipDiscounts";
import { calculateVIPDiscount } from "@/lib/vipDiscounts";
import { getVehicleImage } from "@/lib/vehicleImages";
import { Button } from "@/components/ui/button";

interface VehicleCardProps {
  vehicle: Vehicle;
  vipLevel?: VIPLevel;
  vipCardBg?: string;
  vipTextColor?: string;
  primaryColor?: string;
  shadowColor?: string;
}

const priceRangeColors = {
  Alto: "bg-gaucho-orange/30 text-gaucho-orange border-gaucho-orange/50",
  Medio: "bg-gaucho-metallic/30 text-gaucho-metallic border-gaucho-metallic/50",
  Bajo: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};

const categoryGradients = {
  AUTOS: "from-gaucho-orange/10 to-gaucho-orange/5",
  CAMIONETAS: "from-gaucho-metallic/10 to-gaucho-metallic/5",
  MOTOS: "from-gaucho-orange/15 to-gaucho-orange/10",
  OTROS: "from-gaucho-warmGray/20 to-gaucho-warmGray/10",
};

export default function VehicleCard({ vehicle, vipLevel = "NONE", vipCardBg = "", vipTextColor = "", primaryColor = "rgba(231, 111, 35, 1)", shadowColor = "rgba(231, 111, 35, 0.5)" }: VehicleCardProps) {
  const { discountedPrice, discountPercentage } = calculateVIPDiscount(
    vehicle.price,
    vehicle.priceRange,
    vipLevel
  );
  
  const hasDiscount = discountPercentage > 0;
  const vehicleImage = getVehicleImage(vehicle.model);
  
  // VIP Color mapping
  const vipColors = {
    NONE: "border-gaucho-orange/80",
    PLATINO: "border-gaucho-metallic/80",
    ORO: "border-yellow-500/80",
    DIAMANTE: "border-cyan-500/80",
  };
  
  const vipBgColor = {
    NONE: "bg-gaucho-charcoal/70",
    PLATINO: "bg-gaucho-charcoal/70",
    ORO: "bg-gaucho-charcoal/70",
    DIAMANTE: "bg-gaucho-charcoal/70",
  };

  // Neon border color por VIP
  const neonBorderByVip = {
    NONE: "rgba(231, 111, 35, 1)",
    PLATINO: "rgba(197, 166, 118, 1)",
    ORO: "rgba(250, 204, 21, 1)",
    DIAMANTE: "rgba(34, 211, 238, 1)",
  };
  
  return (
    <div 
      className={`relative w-full pb-24`}
      data-testid={`card-vehicle-${vehicle.id}`}
      style={{ willChange: 'transform' }}
    >
      {/* Contenedor externo para no cortar la imagen y nombre */}
      <div className="relative pt-20 pb-0 flex flex-col items-center">
        {/* Imagen sobresalida - PEGADA DIRECTO a la tarjeta */}
        <div 
          className="relative -top-12 w-80 h-56 z-20 pointer-events-none flex justify-center items-center"
        >
          {vehicleImage ? (
            <img 
              src={vehicleImage} 
              alt={vehicle.model}
              className="w-full h-full object-contain"
              loading="lazy"
              decoding="async"
              style={{ 
                filter: `drop-shadow(0 0 4px ${neonBorderByVip[vipLevel]})`
              }}
            />
          ) : (
            <p className="text-muted-foreground text-sm flex items-center justify-center h-full">Sin imagen</p>
          )}
        </div>
        
        {/* Nombre del coche SUPERPUESTO sobre la imagen - centrado y grande */}
        <h3 className="text-4xl font-black font-mono text-center leading-tight z-30 -mt-16 px-4" 
            data-testid={`text-model-${vehicle.id}`}
            style={{ 
              color: primaryColor, 
              textShadow: `0 0 25px ${shadowColor}, 0 0 40px ${shadowColor}`,
              letterSpacing: '0.05em'
            }}>
          {vehicle.model}
        </h3>
      </div>
      
      {/* Fondo diagonal - parte superior */}
      <div className={`relative ${vipBgColor[vipLevel]} border-4 ${vipColors[vipLevel]} py-6 px-5`}
           style={{ 
             clipPath: 'polygon(0 15%, 100% 0%, 100% 100%, 0 100%)',
             boxShadow: vipLevel === 'NONE' ? '0 0 20px rgba(231, 111, 35, 0.2)' : 
                        vipLevel === 'PLATINO' ? '0 0 20px rgba(197, 166, 118, 0.2)' :
                        vipLevel === 'ORO' ? '0 0 20px rgba(234, 179, 8, 0.2)' :
                        '0 0 20px rgba(6, 182, 212, 0.2)'
           }}>
        
        {/* Precio */}
        <div className="mt-3">
          {hasDiscount ? (
            <div className="space-y-1">
              <p className="text-sm line-through font-mono text-white/50 text-center" 
                 data-testid={`text-price-original-${vehicle.id}`}>
                P$ {vehicle.price.toLocaleString('es-ES')}
              </p>
              <p className="text-2xl font-bold font-mono text-center" 
                 data-testid={`text-price-${vehicle.id}`}
                 style={{ color: primaryColor }}>
                P$ {discountedPrice.toLocaleString('es-ES')}
              </p>
              <p className="text-xs font-medium text-center" style={{ color: primaryColor }}>
                Ahorras P$ {(vehicle.price - discountedPrice).toLocaleString('es-ES')}
              </p>
            </div>
          ) : (
            <p className="text-2xl font-bold font-mono text-center" 
               data-testid={`text-price-${vehicle.id}`}
               style={{ color: primaryColor }}>
              P$ {vehicle.price.toLocaleString('es-ES')}
            </p>
          )}
        </div>
        
        {/* Badges */}
        <div className="flex justify-center gap-2 mt-3">
          <Badge 
            className={`${priceRangeColors[vehicle.priceRange]} font-mono text-xs`}
            data-testid={`badge-price-${vehicle.id}`}
          >
            {vehicle.priceRange}
          </Badge>
          {hasDiscount && (
            <Badge 
              className="bg-gaucho-orange/80 text-white border-gaucho-orange/60 font-mono text-xs"
              data-testid={`badge-discount-${vehicle.id}`}
            >
              <Sparkles className="h-3 w-3 mr-1" />
              {vipLevel === "NONE" ? "Bienvenida" : `-${discountPercentage}%`}
            </Badge>
          )}
        </div>
        
        {/* Especificaciones */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="text-center p-2 bg-gaucho-orange/10 rounded border border-gaucho-orange/30">
            <Zap className="w-4 h-4 text-gaucho-orange mx-auto mb-1" />
            <p className="text-xs text-white/70">{vehicle.maxSpeed}KM/H</p>
          </div>
          
          <div className="text-center p-2 bg-gaucho-metallic/10 rounded border border-gaucho-metallic/30">
            <Fuel className="w-4 h-4 text-gaucho-metallic mx-auto mb-1" />
            <p className="text-xs text-white/70">{vehicle.tankCapacity}L</p>
          </div>
          
          <div className="text-center p-2 bg-gaucho-orange/10 rounded border border-gaucho-orange/30">
            <Package className="w-4 h-4 text-gaucho-orange mx-auto mb-1" />
            <p className="text-xs text-white/70">{vehicle.trunkCapacity !== null ? vehicle.trunkCapacity + 'kg' : 'N/D'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
