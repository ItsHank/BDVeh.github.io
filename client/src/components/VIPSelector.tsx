import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import type { VIPLevel } from "@/lib/vipDiscounts";
import { VIP_LEVELS } from "@/lib/vipDiscounts";
import crownIcon from "@assets/generated_images/Starter.png";
import platinumIcon from "@assets/generated_images/Platino.png";
import goldIcon from "@assets/generated_images/Oro.png";
import diamondIcon from "@assets/generated_images/Diamante.png";

interface VIPSelectorProps {
  selectedLevel: VIPLevel;
  onLevelChange: (level: VIPLevel) => void;
}

const vipColors = {
  NONE: "border-gaucho-orange bg-gaucho-orange/15",
  PLATINO: "border-gaucho-metallic bg-gaucho-metallic/15",
  ORO: "border-yellow-500 bg-yellow-500/20",
  DIAMANTE: "border-cyan-500 bg-cyan-500/20",
};

const vipIcons = {
  NONE: crownIcon,
  PLATINO: platinumIcon,
  ORO: goldIcon,
  DIAMANTE: diamondIcon,
};

export default function VIPSelector({ selectedLevel, onLevelChange }: VIPSelectorProps) {
  const labels = {
    NONE: "Primera Compra / Si eres Corredor",
    PLATINO: "Platino",
    ORO: "Oro",
    DIAMANTE: "Diamante",
  };

  return (
    <div className="bg-gaucho-warmGray/10 border-4 border-gaucho-orange/40 rounded-lg p-8 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold mb-1 text-gaucho-orange">
            Descuentos VIP Exclusivos
          </h3>
          <p className="text-sm text-white/80">
            Selecciona tu nivel para ver precios especiales
          </p>
        </div>
        {selectedLevel !== "NONE" && (
          <button
            onClick={() => onLevelChange("NONE")}
            className="text-gaucho-orange hover:text-gaucho-orange/60 transition-colors duration-200"
            data-testid="button-clear-vip"
          >
            <X className="h-6 w-6" />
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {VIP_LEVELS.map((vip) => {
          const isSelected = selectedLevel === vip.level;
          
          return (
            <div
              key={vip.level}
              onClick={() => onLevelChange(vip.level)}
              className="cursor-pointer"
              data-testid={`button-vip-${vip.level.toLowerCase()}`}
              style={{ willChange: 'transform' }}
            >
              <div
                className={`relative h-56 flex flex-col items-center justify-center p-6 rounded-lg border-3 ${vipColors[vip.level]} ${
                  isSelected ? "ring-2 ring-white" : ""
                }`}
                style={{
                  transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.2s ease-out',
                  boxShadow: isSelected ? '0 0 30px rgba(231, 111, 35, 0.4)' : '0 0 15px rgba(231, 111, 35, 0.1)'
                }}
              >
                <img 
                  src={vipIcons[vip.level]} 
                  alt={vip.level}
                  className="h-20 w-20 mb-4 object-contain"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))' }}
                />
                <p className="font-bold text-center text-white text-xs mb-2">{labels[vip.level]}</p>
                <Badge className="bg-white/20 text-white border border-white/40 font-bold text-xs">
                  {vip.discountRange}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
      
      {selectedLevel === "NONE" ? (
        <div className="mt-6 p-4 bg-gradient-to-r from-gaucho-orange/30 to-gaucho-metallic/20 border-2 border-gaucho-orange/50 rounded-lg backdrop-blur-sm"
             style={{ boxShadow: '0 0 20px rgba(231, 111, 35, 0.3)' }}>
          <p className="text-sm text-white font-medium">
            📸 ¡Muestra una captura de pantalla en tu ticket y recibe descuento de primera compra! O si eres Corredor, ¡acceso exclusivo a nuestras ofertas!
          </p>
        </div>
      ) : (
        <div className="mt-6 p-4 bg-gradient-to-r from-gaucho-orange/30 to-gaucho-metallic/20 border-2 border-gaucho-orange/50 rounded-lg backdrop-blur-sm"
             style={{ boxShadow: '0 0 20px rgba(231, 111, 35, 0.3)' }}>
          <p className="text-sm text-white font-medium">
            ✨ ¡Descuentos activos! Vehículos de precio alto obtienen mayor descuento
          </p>
        </div>
      )}
    </div>
  );
}
