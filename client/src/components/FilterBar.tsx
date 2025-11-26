import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X, List } from "lucide-react";
import type { VehicleCategory, PriceRange } from "@shared/schema";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: VehicleCategory | "ALL";
  onCategoryChange: (category: VehicleCategory | "ALL") => void;
  selectedPriceRange: PriceRange | "ALL";
  onPriceRangeChange: (range: PriceRange | "ALL") => void;
  sortBy: "price-asc" | "price-desc" | "name";
  onSortChange: (sort: "price-asc" | "price-desc" | "name") => void;
  onClearFilters: () => void;
  onOpenVehicleList: () => void;
}

const categories = [
  { label: "Busca tu tipo", value: "ALL" },
  { label: "Autos", value: "AUTOS" },
  { label: "Camionetas", value: "CAMIONETAS" },
  { label: "Motos", value: "MOTOS" },
  { label: "Otros", value: "OTROS" },
];

const priceRanges = [
  { label: "Todos los Precios", value: "ALL" },
  { label: "Alto", value: "Alto" },
  { label: "Medio", value: "Medio" },
  { label: "Bajo", value: "Bajo" },
];

export default function FilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedPriceRange,
  onPriceRangeChange,
  sortBy,
  onSortChange,
  onClearFilters,
  onOpenVehicleList,
}: FilterBarProps) {
  const hasActiveFilters = selectedCategory !== "ALL" || selectedPriceRange !== "ALL" || searchQuery !== "";

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-4">
        <Button
          onClick={onOpenVehicleList}
          variant="outline"
          className="gap-2 border-gaucho-orange/50 hover:bg-gaucho-orange/10 text-gaucho-text hover:text-gaucho-orange transition-all duration-300"
          style={{ boxShadow: '0 0 15px rgba(231, 111, 35, 0.2)' }}
        >
          <List className="h-4 w-4" />
          Ver Lista Completa
        </Button>
        <p className="text-sm text-muted-foreground">
          Explora todos los vehículos organizados por categoría
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Search with dynamic border */}
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gaucho-orange/60 group-hover:text-gaucho-orange transition-colors" />
          <Input
            placeholder="Buscar modelo..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 border-gaucho-orange/30 focus:border-gaucho-orange focus:ring-gaucho-orange/50 hover:border-gaucho-orange/60 transition-all duration-300"
            style={{ boxShadow: searchQuery ? '0 0 10px rgba(231, 111, 35, 0.3)' : 'none' }}
            data-testid="input-search"
          />
        </div>

        {/* Category filter with dynamic styling */}
        <Select value={selectedCategory} onValueChange={(value) => onCategoryChange(value as VehicleCategory | "ALL")}>
          <SelectTrigger 
            data-testid="select-category"
            className="border-gaucho-orange/30 hover:border-gaucho-orange/60 focus:border-gaucho-orange transition-all duration-300 hover:bg-gaucho-orange/5"
            style={{ boxShadow: selectedCategory !== "ALL" ? '0 0 10px rgba(231, 111, 35, 0.2)' : 'none' }}
          >
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Price range filter with dynamic styling */}
        <Select value={selectedPriceRange} onValueChange={(value) => onPriceRangeChange(value as PriceRange | "ALL")}>
          <SelectTrigger 
            data-testid="select-price-range"
            className="border-gaucho-orange/30 hover:border-gaucho-orange/60 focus:border-gaucho-orange transition-all duration-300 hover:bg-gaucho-orange/5"
            style={{ boxShadow: selectedPriceRange !== "ALL" ? '0 0 10px rgba(231, 111, 35, 0.2)' : 'none' }}
          >
            <SelectValue placeholder="Rango de Precio" />
          </SelectTrigger>
          <SelectContent>
            {priceRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort filter with dynamic styling */}
        <Select value={sortBy} onValueChange={(value) => onSortChange(value as "price-asc" | "price-desc" | "name")}>
          <SelectTrigger 
            data-testid="select-sort"
            className="border-gaucho-orange/30 hover:border-gaucho-orange/60 focus:border-gaucho-orange transition-all duration-300 hover:bg-gaucho-orange/5"
          >
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
            <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
            <SelectItem value="name">Nombre A-Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm text-muted-foreground">Filtros activos:</p>
          {searchQuery && (
            <Badge variant="secondary" className="gap-1 bg-gaucho-orange/20 text-gaucho-orange border-gaucho-orange/50">
              Búsqueda: {searchQuery}
              <X className="h-3 w-3 cursor-pointer" onClick={() => onSearchChange("")} />
            </Badge>
          )}
          {selectedCategory !== "ALL" && (
            <Badge variant="secondary" className="gap-1 bg-gaucho-orange/20 text-gaucho-orange border-gaucho-orange/50">
              {categories.find(c => c.value === selectedCategory)?.label}
              <X className="h-3 w-3 cursor-pointer" onClick={() => onCategoryChange("ALL")} />
            </Badge>
          )}
          {selectedPriceRange !== "ALL" && (
            <Badge variant="secondary" className="gap-1 bg-gaucho-orange/20 text-gaucho-orange border-gaucho-orange/50">
              Precio: {selectedPriceRange}
              <X className="h-3 w-3 cursor-pointer" onClick={() => onPriceRangeChange("ALL")} />
            </Badge>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearFilters}
            data-testid="button-clear-filters"
            className="text-gaucho-orange hover:text-gaucho-orange hover:bg-gaucho-orange/10"
          >
            Limpiar todo
          </Button>
        </div>
      )}
    </div>
  );
}
