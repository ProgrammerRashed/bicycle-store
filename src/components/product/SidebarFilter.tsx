// @ts-nocheck
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { brands, categories, models } from "@/utils/constants"
import { Loader, Search } from "lucide-react"
import { useGetProductBrandsQuery } from "@/redux/features/product/productApi"

const SidebarFilter = ({
  searchTerm,
  setSearchTerm,
  priceRange,
  setPriceRange,
  setShowInStock,
  selectedModels,
  showInStock,
  setSelectedModels,
  selectedBrands,
  setSelectedBrands,
  setSelectedCategories,
  selectedCategories,
}) => {
  const {
    data: brandResponse,
    isLoading,
  } = useGetProductBrandsQuery("");

  const brands: Product[] = brandResponse?.data || [];


  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category.toLowerCase())
        ? prev.filter((c) => c !== category.toLowerCase())
        : [...prev, category.toLowerCase()]
    );
  };

  const handleModelChange = (model: string) => {
    setSelectedModels((prev) =>
      prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setPriceRange([0, 3000]);
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedModels([]);
    setShowInStock(false);
  };

  return (
    <div className="w-full md:w-64 bg-gray-50 p-4 rounded-lg h-fit">

      {isLoading &&
        <div className="flex justify-center items-center h-screen">
          <Loader className="animate-spin w-10 h-10 text-green-600" />
        </div>
      }

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Search</h3>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search bicycles..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Price Range</h3>
        <div className="px-2">
          <Slider
            defaultValue={[0, 3000]}
            max={3000}
            step={100}
            value={priceRange}
            onValueChange={setPriceRange}
            className="my-4"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Brand</h3>
        <div className="space-y-2">
          {[...new Set(brands.map((brand) => brand.brand))].map((uniqueBrand) => (
            <div key={uniqueBrand} className="flex items-center">
              <Checkbox
                id={`brand-${uniqueBrand}`}
                checked={selectedBrands.includes(uniqueBrand)}
                onCheckedChange={() => handleBrandChange(uniqueBrand)}
              />
              <Label htmlFor={`brand-${uniqueBrand}`} className="ml-2 text-sm">
                {uniqueBrand}
              </Label>
            </div>
          ))}

        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category.toLowerCase())}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <Label htmlFor={`category-${category}`} className="ml-2 text-sm">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>


      <div className="mb-6">
        <div className="flex items-center">
          <Checkbox
            id="in-stock"
            checked={showInStock}
            onCheckedChange={(checked) => setShowInStock(checked as boolean)}
          />
          <Label htmlFor="in-stock" className="ml-2 text-sm">
            In Stock Only
          </Label>
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={clearFilters}>
        Clear Filters
      </Button>
    </div>
  );
};

export default SidebarFilter