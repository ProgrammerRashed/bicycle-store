import { useState, useEffect } from "react"
import { Loader } from "lucide-react"
import BicycleCard from "@/components/shared/BicycleCard"
import { useLocation } from "react-router-dom"
import { useGetAllProductsQuery } from "@/redux/features/product/productApi"
import { Product } from "@/utils/Interfaces"
import { categories } from "@/utils/constants"
import SidebarFilter from "@/components/product/SidebarFilter"



const ProductsPage = () => {
  const location = useLocation();
  const {
    isLoading,
    data: productsResponse,
  } = useGetAllProductsQuery("");

  const allBicycles: Product[] = productsResponse?.data || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [showInStock, setShowInStock] = useState(false);
  const [filteredBicycles, setFilteredBicycles] = useState(allBicycles);

  const getQueryParam = (key: string) => {
    const params = new URLSearchParams(location.search);
    return params.get(key);
  };

  // Sync URL query param to category filter
  useEffect(() => {
    const categoryParam = getQueryParam("category")?.toLowerCase();
    
    if (
      categoryParam &&
      categories.map((c) => c.toLowerCase()).includes(categoryParam)
    ) {
      setSelectedCategories(prev => {
        if (prev.length === 1 && prev[0] === categoryParam) {
          return prev; // Avoid unnecessary update
        }
        return [categoryParam];
      });
    }
  }, [location.search]); // No need for selectedCategories in deps
  
  useEffect(() => {
    if (isLoading) return; // Don't update filteredBicycles if data is still loading
    let result = allBicycles;

    // Search term filter: check name, brand, and category
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (bike) =>
          bike.name.toLowerCase().includes(term) ||
          bike.brand.toLowerCase().includes(term) ||
          bike.category.toLowerCase().includes(term)
      );
    }

    // Price range filter
    result = result.filter(
      (bike) => bike.price >= priceRange[0] && bike.price <= priceRange[1]
    );

    // Brand filter
    if (selectedBrands.length > 0) {
      result = result.filter((bike) =>
        selectedBrands.includes(bike.brand)
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((bike) =>
        selectedCategories.includes(bike.category.toLowerCase())
      );
    }

    // Model filter
    if (selectedModels.length > 0) {
      result = result.filter((bike) =>
        selectedModels.includes(bike.model)
      );
    }

    // In-stock filter
    if (showInStock) {
      result = result.filter((bike) => bike.in_stock);
    }

    setFilteredBicycles(result);
  }, [
    searchTerm,
    priceRange,
    selectedBrands,
    selectedCategories,
    selectedModels,
    showInStock,
    allBicycles, 
    isLoading, 
  ]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin w-10 h-10 text-green-600" />
      </div>
    )


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">All Bicycles</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar filters */}
       <SidebarFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedModels={selectedModels}
          setSelectedModels={setSelectedModels}
          showInStock={showInStock}
          setShowInStock={setShowInStock}
        
        />

        {/* Bicycle grid */}
        <div className="flex-1">
          {filteredBicycles.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bicycles found</h3>
              <p className="text-gray-500">Try adjusting your filters or search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBicycles.map((bicycle) => (
                <BicycleCard key={bicycle._id} bicycle={bicycle} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
