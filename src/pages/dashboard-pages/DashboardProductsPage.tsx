import { useState } from "react";
import {
  useAddProductMutation,
  useGetAllProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "@/redux/features/product/productApi";
import { toast } from "sonner";
import { Cross, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Product } from "@/utils/Interfaces";
import DashboardProductTable from "@/components/product/DashboardProductTable";
import { SPECIAL_CATEGORIES } from "@/utils/constants";

const DashboardProductsPage = () => {
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    description: "",
    brand: "",
    price: 0,
    category: "",
    stock: 0,
    model: "",
    special_category: [],
    image_gallery: [],
    in_stock: true,
    specifications: [],
    reviews: 0,
    key_features: [],
  });

  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [step, setStep] = useState(1); // For multi-step form
  const { refetch } = useGetAllProductsQuery("");
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  // State for dynamic specifications and key features
  const [specName, setSpecName] = useState("");
  const [specValue, setSpecValue] = useState("");
  const [keyFeature, setKeyFeature] = useState("");

  const handleImageUpload = async (files: FileList) => {
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("image", file);
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API_imgbb_key}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.success) {
        urls.push(data.data.url);
      } else {
        toast.error("Image upload failed");
      }
    }
    return urls;
  };

  const handleAddProduct = async () => {
    if (newProduct.image_gallery.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }
    if (newProduct.special_category.length === 0) {
      toast.error("Please select at least one special category");
      return;
    }
    try {
      await addProduct(newProduct).unwrap();
      toast.success("Product added successfully");
      setIsAddDialogOpen(false);
      setStep(1);
      setNewProduct({
        name: "",
        description: "",
        brand: "",
        price: 0,
        category: "",
        stock: 0,
        model: "",
        special_category: [],
        image_gallery: [],
        in_stock: true,
        specifications: [],
        reviews: 0,
        key_features: [],
      });
      refetch();
    } catch {
      toast.error("Failed to add product");
    }
  };

  const handleEditProduct = async () => {
    try {
      await updateProduct({
        productId: currentProduct?._id,
        updatedProduct: currentProduct,
      }).unwrap();
      toast.success("Product updated successfully");
      setIsEditDialogOpen(false);
      refetch();
    } catch {
      toast.error("Failed to update product");
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(currentProduct._id).unwrap();
      toast.success("Product deleted successfully");
      setIsDeleteDialogOpen(false);
      refetch();
    } catch {
      toast.error("Failed to delete product");
    }
  };

  const handleAddSpecification = () => {
    if (specName && specValue) {
      setNewProduct({
        ...newProduct,
        specifications: [
          ...(newProduct.specifications || []),
          { name: specName, value: specValue },
        ],
      });
      setSpecName("");
      setSpecValue("");
    }
  };

  const handleAddKeyFeature = () => {
    if (keyFeature) {
      setNewProduct({
        ...newProduct,
        key_features: [...newProduct.key_features, keyFeature],
      });
      setKeyFeature("");
    }
  };

  const handleEditSpecification = (index: number, field: string, value: string) => {
    const updatedSpecs = [...(currentProduct.specifications || [])];
    updatedSpecs[index] = { ...updatedSpecs[index], [field]: value };
    setCurrentProduct({ ...currentProduct, specifications: updatedSpecs });
  };

  const handleEditKeyFeature = (index: number, value: string) => {
    const updatedFeatures = [...currentProduct.key_features];
    updatedFeatures[index] = value;
    setCurrentProduct({ ...currentProduct, key_features: updatedFeatures });
  };

  const renderStep1 = () => (
    <div className="grid gap-4">
      <Label>Product Name</Label>
      <Input
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <Label>Description</Label>
      <Textarea
        value={newProduct.description}
        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
      />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Brand</Label>
          <Input
            value={newProduct.brand}
            onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
          />
        </div>
        <div>
          <Label>Model</Label>
          <Input
            value={newProduct.model}
            onChange={(e) => setNewProduct({ ...newProduct, model: e.target.value })}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Price</Label>
          <Input
            type="number"
            min="0"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: Number(e.target.value) })
            }
          />
        </div>
        <div>
          <Label>Stock</Label>
          <Input
            type="number"
            min="0"
            value={newProduct.stock}
            onChange={(e) =>
              setNewProduct({ ...newProduct, stock: Number(e.target.value) })
            }
          />
        </div>
      </div>

    </div>
  );

  const renderStep2 = () => (
    <div className="grid gap-4">
      <Label>Category</Label>
      <Select
        value={newProduct.category}
        onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Mountain">Mountain</SelectItem>
          <SelectItem value="Road">Road</SelectItem>
          <SelectItem value="Commuter">Commuter</SelectItem>
          <SelectItem value="Kids">Kids</SelectItem>
          <SelectItem value="Electric">Electric</SelectItem>
        </SelectContent>
      </Select>
      <Label>Special Category</Label>
      <div className="flex flex-wrap gap-2">
        {SPECIAL_CATEGORIES.map((tag) => (
          <label key={tag} className="flex items-center gap-1 text-sm">
            <input
              type="checkbox"
              checked={newProduct.special_category.includes(tag)}
              onChange={() => {
                const updated = newProduct.special_category.includes(tag)
                  ? newProduct.special_category.filter((t) => t !== tag)
                  : [...newProduct.special_category, tag];
                setNewProduct({ ...newProduct, special_category: updated });
              }}
            />
            {tag}
          </label>
        ))}
      </div>
      <Label>In Stock</Label>
      <Switch
        checked={newProduct.in_stock}
        onCheckedChange={(checked) =>
          setNewProduct({ ...newProduct, in_stock: checked })
        }
      />
      <Label>Reviews (Rating)</Label>
      <Input
        type="number"
        min="0"
        max="5"
        step="0.1"
        value={newProduct.reviews}
        onChange={(e) =>
          setNewProduct({ ...newProduct, reviews: Number(e.target.value) })
        }
      />
    </div>
  );

  const renderStep3 = () => (
    <div className="grid gap-4">
      <Label>Image Gallery</Label>
      <Input
        type="file"
        multiple
        accept="image/*"
        onChange={async (e) => {
          const files = e.target.files;
          if (files && files.length > 0) {
            toast.promise(
              handleImageUpload(files).then((urls) => {
                setNewProduct((prev) => ({
                  ...prev,
                  image_gallery: [...prev.image_gallery, ...urls],
                }));
              }),
              {
                loading: "Uploading...",
                success: "Uploaded",
                error: "Upload failed",
              }
            );
          }
        }}
      />
      {newProduct.image_gallery.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {newProduct.image_gallery.map((url, i) => (
            <div key={i} className="relative">
              <img
                src={url}
                alt=""
                className="w-16 h-16 object-cover border rounded"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-0 right-0"
                onClick={() =>
                  setNewProduct({
                    ...newProduct,
                    image_gallery: newProduct.image_gallery.filter(
                      (_, index) => index !== i
                    ),
                  })
                }
              >
                X
              </Button>
            </div>
          ))}
        </div>
      )}
      <Label>Specifications</Label>
      <div className="grid grid-cols-2 gap-2">
        <Input
          placeholder="Name (e.g., Frame)"
          value={specName}
          onChange={(e) => setSpecName(e.target.value)}
        />
        <Input
          placeholder="Value (e.g., Aluminum)"
          value={specValue}
          onChange={(e) => setSpecValue(e.target.value)}
        />
      </div>
      <Button onClick={handleAddSpecification}>Add Specification</Button>
      {newProduct?.specifications?.length > 0 && (
        <ul>
          {newProduct?.specifications?.map((spec, i) => (
            <li key={i}>
              {spec.name}: {spec.value}{" "}
              <Button
                variant="destructive"
                size="sm"
                onClick={() =>
                  setNewProduct({
                    ...newProduct,
                    specifications: newProduct?.specifications?.filter(
                      (_, index) => index !== i
                    ),
                  })
                }
              >
                <Cross/>
              </Button>
            </li>
          ))}
        </ul>
      )}
      <Label>Key Features</Label>
      <Input
        placeholder="Add a key feature"
        value={keyFeature}
        onChange={(e) => setKeyFeature(e.target.value)}
      />
      <Button onClick={handleAddKeyFeature}>Add Key Feature</Button>
      {newProduct.key_features.length > 0 && (
        <ul>
          {newProduct.key_features.map((feature, i) => (
            <li key={i}>
              {feature}{" "}
              <Button
                variant="destructive"
                size="sm"
                onClick={() =>
                  setNewProduct({
                    ...newProduct,
                    key_features: newProduct.key_features.filter(
                      (_, index) => index !== i
                    ),
                  })
                }
              >
                <Cross/>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Products</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Product - Step {step}/3</DialogTitle>
              <DialogDescription>Fill out the form below</DialogDescription>
            </DialogHeader>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  if (step === 1) setIsAddDialogOpen(false);
                  else setStep(step - 1);
                }}
              >
                {step === 1 ? "Cancel" : "Back"}
              </Button>
              {step < 3 ? (
                <Button onClick={() => setStep(step + 1)}>Next</Button>
              ) : (
                <Button onClick={handleAddProduct}>Add Product</Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Product Table */}
      <DashboardProductTable
        setCurrentProduct={setCurrentProduct}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
      />

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[50%] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {currentProduct && (
            <div className="grid gap-4">
              <Label>Name</Label>
              <Input
                value={currentProduct.name}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, name: e.target.value })
                }
              />
              <Label>Description</Label>
              <Textarea
                value={currentProduct.description}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, description: e.target.value })
                }
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Brand</Label>
                  <Input
                    value={currentProduct.brand}
                    onChange={(e) =>
                      setCurrentProduct({ ...currentProduct, brand: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Model</Label>
                  <Input
                    value={currentProduct.model}
                    onChange={(e) =>
                      setCurrentProduct({ ...currentProduct, model: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Price</Label>
                  <Input
                    type="number"
                    min="0"
                    value={currentProduct.price}
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        price: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Stock</Label>
                  <Input
                    type="number"
                    min="0"
                    value={currentProduct.stock}
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        stock: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
            
              <Label>Category</Label>
              <Select
                value={currentProduct.category}
                onValueChange={(value) =>
                  setCurrentProduct({ ...currentProduct, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mountain">Mountain</SelectItem>
                  <SelectItem value="Road">Road</SelectItem>
                  <SelectItem value="Commuter">Commuter</SelectItem>
                  <SelectItem value="Kids">Kids</SelectItem>
                  <SelectItem value="Electric">Electric</SelectItem>
                </SelectContent>
              </Select>
              <Label>Special Category</Label>
              <div className="flex flex-wrap gap-2">
                {SPECIAL_CATEGORIES.map((tag) => (
                  <label key={tag} className="flex items-center gap-1 text-sm">
                    <input
                      type="checkbox"
                      checked={currentProduct.special_category.includes(tag)}
                      onChange={() => {
                        const updated = currentProduct.special_category.includes(tag)
                          ? currentProduct.special_category.filter((t: string) => t !== tag)
                          : [...currentProduct.special_category, tag];
                        setCurrentProduct({
                          ...currentProduct,
                          special_category: updated,
                        });
                      }}
                    />
                    {tag}
                  </label>
                ))}
              </div>
              <Label>In Stock</Label>
              <Switch
                checked={currentProduct.in_stock}
                onCheckedChange={(checked) =>
                  setCurrentProduct({ ...currentProduct, in_stock: checked })
                }
              />
              <Label>Reviews (Rating)</Label>
              <Input
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={currentProduct.reviews}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    reviews: Number(e.target.value),
                  })
                }
              />
              <Label>Image Gallery</Label>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={async (e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    toast.promise(
                      handleImageUpload(files).then((urls) => {
                        setCurrentProduct((prev: any) => ({
                          ...prev,
                          image_gallery: [...prev.image_gallery, ...urls],
                        }));
                      }),
                      {
                        loading: "Uploading...",
                        success: "Uploaded",
                        error: "Upload failed",
                      }
                    );
                  }
                }}
              />
              {currentProduct.image_gallery.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {currentProduct.image_gallery.map((url: string, i: number) => (
                    <div key={i} className="relative">
                      <img
                        src={url}
                        alt=""
                        className="w-16 h-16 object-cover border rounded"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-0 right-0"
                        onClick={() =>
                          setCurrentProduct({
                            ...currentProduct,
                            image_gallery: currentProduct.image_gallery.filter(
                              (_: string, index: number) => index !== i
                            ),
                          })
                        }
                      >
                        X
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              <Label>Specifications</Label>
              {currentProduct.specifications?.map((spec: any, i: number) => (
                <div key={i} className="grid grid-cols-2 gap-2">
                  <Input
                    value={spec.name}
                    onChange={(e) =>
                      handleEditSpecification(i, "name", e.target.value)
                    }
                  />
                  <Input
                    value={spec.value}
                    onChange={(e) =>
                      handleEditSpecification(i, "value", e.target.value)
                    }
                  />
                </div>
              ))}
              <Label>Key Features</Label>
              {currentProduct.key_features.map((feature: string, i: number) => (
                <Input
                  key={i}
                  value={feature}
                  onChange={(e) => handleEditKeyFeature(i, e.target.value)}
                />
              ))}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditProduct}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Are you sure you want to delete{" "}
            <strong>{currentProduct?.name}</strong>?
          </DialogDescription>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardProductsPage;