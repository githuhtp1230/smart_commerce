"use client";

import * as React from "react";
import {
  ChevronDown,
  Filter,
  Star,
  X,
  SlidersHorizontal,
  Search,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatPrice } from "@/helper/format-price-vietnam";

const categories = [
  { id: "electronics", label: "Electronics", count: 245 },
  { id: "books", label: "technoly", count: 67 },
  { id: "toys", label: "Toys & Games", count: 45 },
];

const brands = [
  { id: "apple", label: "Apple", count: 34 },
  { id: "samsung", label: "Samsung", count: 28 },
  { id: "sony", label: "Sony", count: 15 },
  { id: "lg", label: "LG", count: 12 },
];

const colors = [
  { id: "black", label: "Black", color: "#000000" },
  { id: "white", label: "White", color: "#FFFFFF" },
  { id: "red", label: "Red", color: "#EF4444" },
  { id: "pink", label: "Pink", color: "#EC4899" },
];

export interface Filters {
  searchQuery: string;
  priceRange: number[];
  selectedCategories: string[];
  selectedBrands: string[];
  selectedColors: string[];
  selectedRating: string;
  sortBy: string;
  inStock: boolean;
  onSale: boolean;
}

interface ProductFiltersProps {
  onFiltersChange?: (filters: Filters) => void;
}

export function ProductFilters({ onFiltersChange }: ProductFiltersProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [priceRange, setPriceRange] = React.useState([0, 1000000000]);
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([]);
  const [selectedColors, setSelectedColors] = React.useState<string[]>([]);
  const [selectedRating, setSelectedRating] = React.useState("");
  const [sortBy, setSortBy] = React.useState("");
  const [inStock, setInStock] = React.useState(false);
  const [onSale, setOnSale] = React.useState(false);

  const clearAllFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 1000000000]);
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedRating("");
    setSortBy("");
    setInStock(false);
    setOnSale(false);
  };

  const handleCheckboxChange = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    value: string,
    checked: boolean | "indeterminate"
  ) => {
    if (checked === true) {
      setList([...list, value]);
    } else {
      setList(list.filter((id) => id !== value));
    }
  };

  React.useEffect(() => {
    onFiltersChange?.({
      searchQuery,
      priceRange,
      selectedCategories,
      selectedBrands,
      selectedColors,
      selectedRating,
      sortBy,
      inStock,
      onSale,
    });
  }, [
    searchQuery,
    priceRange,
    selectedCategories,
    selectedBrands,
    selectedColors,
    selectedRating,
    sortBy,
    inStock,
    onSale,
    onFiltersChange,
  ]);

  const activeFiltersCount =
    selectedCategories.length +
    selectedBrands.length +
    selectedColors.length +
    (selectedRating ? 1 : 0) +
    (inStock ? 1 : 0) +
    (onSale ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 1000000000 ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground">
          {activeFiltersCount} filter{activeFiltersCount !== 1 ? "s" : ""}{" "}
          applied
        </span>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            <X className="h-4 w-4 mr-1" /> Clear all
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center space-x-2">
            <Checkbox
              id={category.id}
              checked={selectedCategories.includes(category.id)}
              onCheckedChange={(checked) =>
                handleCheckboxChange(
                  selectedCategories,
                  setSelectedCategories,
                  category.id,
                  checked
                )
              }
            />
            <Label htmlFor={category.id}>{category.label}</Label>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Brand</h4>
        <div className="flex flex-wrap gap-2">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand.id}`}
                checked={selectedBrands.includes(brand.id)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(
                    selectedBrands,
                    setSelectedBrands,
                    brand.id,
                    checked
                  )
                }
              />
              <Label htmlFor={`brand-${brand.id}`}>{brand.label}</Label>
            </div>
          ))}
        </div>
      </div>
      <Separator />
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Color</h4>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <Button
              key={color.id}
              type="button"
              variant={
                selectedColors.includes(color.id) ? "default" : "outline"
              }
              size="sm"
              className="flex items-center gap-1"
              onClick={() => {
                const checked = !selectedColors.includes(color.id);
                handleCheckboxChange(
                  selectedColors,
                  setSelectedColors,
                  color.id,
                  checked
                );
              }}
            >
              <span
                className="w-4 h-4 rounded-full border"
                style={{ backgroundColor: color.color }}
              />
              {color.label}
            </Button>
          ))}
        </div>
      </div>
      <Separator />
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Price range</h4>
        <Slider
          min={0}
          max={1000000000}
          step={1000000}
          value={priceRange}
          onValueChange={setPriceRange}
        />
        <div className="text-sm text-muted-foreground">
          {formatPrice(priceRange[0])}₫ – {formatPrice(priceRange[1])}₫
        </div>
      </div>
      <Separator />
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Minimum rating</h4>
        <RadioGroup
          value={selectedRating}
          onValueChange={setSelectedRating}
          className="flex flex-col space-y-1"
        >
          {["", "1", "2", "3", "4", "5"].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <RadioGroupItem value={rating} id={`rating-${rating}`} />
              <Label htmlFor={`rating-${rating}`}>
                {rating ? (
                  <span className="flex items-center gap-1">
                    {Array.from({ length: parseInt(rating) }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-500 text-yellow-500"
                      />
                    ))}
                    & up
                  </span>
                ) : (
                  "Any"
                )}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <Separator />
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Availability</h4>
        <div className="flex flex-col gap-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={inStock}
              onCheckedChange={(checked) => setInStock(checked === true)}
            />
            <Label htmlFor="in-stock">In stock</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="on-sale"
              checked={onSale}
              onCheckedChange={(checked) => setOnSale(checked === true)}
            />
            <Label htmlFor="on-sale">On sale</Label>
          </div>
        </div>
      </div>
      <Separator />
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Sort by</h4>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select sort option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="rating-desc">Rating: High to Low</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
