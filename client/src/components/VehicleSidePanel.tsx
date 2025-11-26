import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { vehicles, type Vehicle, type VehicleCategory } from "@shared/schema";

interface VehicleSidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  onVehicleSelect: (vehicleId: string) => void;
}

const categoryConfig = {
  AUTOS: {
    label: "Autos",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    hoverColor: "hover:bg-blue-500/20",
  },
  CAMIONETAS: {
    label: "Camionetas",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    hoverColor: "hover:bg-orange-500/20",
  },
  MOTOS: {
    label: "Motos",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    hoverColor: "hover:bg-purple-500/20",
  },
  OTROS: {
    label: "Otros",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    hoverColor: "hover:bg-green-500/20",
  },
};

export default function VehicleSidePanel({
  isOpen,
  onClose,
  onVehicleSelect,
}: VehicleSidePanelProps) {
  const groupedVehicles = useMemo(() => {
    const groups: Record<VehicleCategory, Vehicle[]> = {
      AUTOS: [],
      CAMIONETAS: [],
      MOTOS: [],
      OTROS: [],
    };

    vehicles.forEach((vehicle) => {
      groups[vehicle.category].push(vehicle);
    });

    Object.keys(groups).forEach((category) => {
      groups[category as VehicleCategory].sort((a, b) =>
        a.model.localeCompare(b.model)
      );
    });

    return groups;
  }, []);

  const handleVehicleClick = (vehicleId: string) => {
    onVehicleSelect(vehicleId);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-full sm:w-96 bg-card border-r border-border shadow-2xl z-50"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-border bg-background/95 backdrop-blur">
                <h2 className="text-xl font-bold">Todos los Vehículos</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-8 w-8"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-6">
                  {(Object.keys(groupedVehicles) as VehicleCategory[]).map(
                    (category) => {
                      const config = categoryConfig[category];
                      const vehicleList = groupedVehicles[category];

                      if (vehicleList.length === 0) return null;

                      return (
                        <div key={category} className="space-y-2">
                          <div
                            className={`sticky top-0 ${config.bgColor} backdrop-blur-sm px-3 py-2 rounded-lg border border-border/50 z-10`}
                          >
                            <h3
                              className={`text-sm font-bold uppercase tracking-wider ${config.color}`}
                            >
                              {config.label}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {vehicleList.length} vehículo
                              {vehicleList.length !== 1 ? "s" : ""}
                            </p>
                          </div>

                          <div className="space-y-1">
                            {vehicleList.map((vehicle) => (
                              <motion.button
                                key={vehicle.id}
                                onClick={() => handleVehicleClick(vehicle.id)}
                                className={`w-full text-left px-4 py-3 rounded-lg border border-border/50 transition-all duration-200 ${config.hoverColor} hover:border-border group`}
                                whileHover={{ scale: 1.02, x: 4 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium group-hover:font-semibold transition-all">
                                    {vehicle.model}
                                  </span>
                                  <ChevronRight
                                    className={`h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity ${config.color}`}
                                  />
                                </div>
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </ScrollArea>

              <div className="p-4 border-t border-border bg-background/95 backdrop-blur">
                <p className="text-xs text-muted-foreground text-center">
                  {vehicles.length} vehículos en total
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
