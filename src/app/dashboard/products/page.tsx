"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, MoreVertical, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"

// Mock data for products
const initialProducts = [
  {
    id: 1,
    name: "Mountain Explorer Pro",
    brand: "TrekMaster",
    price: 1299.99,
    category: "Mountain",
    stock: 15,
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Urban Glide 7",
    brand: "CityRider",
    price: 899.99,
    category: "Commuter",
    stock: 8,
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "SpeedForce Elite",
    brand: "VeloRacer",
    price: 2499.99,
    category: "Road",
    stock: 0,
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Trail Blazer X3",
    brand: "TrekMaster",
    price: 1599.99,
    category: "Mountain",
    stock: 9,
    image: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Kids Adventure 20",
    brand: "JuniorRide",
    price: 349.99,
    category: "Kids",
    stock: 12,
    image: "/placeholder.svg",
  },
  {
    id: 6,
    name: "Electric Commuter Plus",
    brand: "PowerPedal",
    price: 1899.99,
    category: "Electric",
    stock: 6,
    image: "/placeholder.svg",
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<any>(null)
  const [newProduct, setNewProduct] = useState({
    name: "",
    brand: "",
    price: "",
    category: "",
    stock: "",
    image: "/placeholder.svg",
  })

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.brand || !newProduct.price || !newProduct.category || !newProduct.stock) {
      toast.error("Please fill in all required fields")
      return
    }

    const price = Number.parseFloat(newProduct.price)
    const stock = Number.parseInt(newProduct.stock)

    if (isNaN(price) || price <= 0) {
      toast.error("Please enter a valid price")
      return
    }

    if (isNaN(stock) || stock < 0) {
      toast.error("Please enter a valid stock quantity")
      return
    }

    const newId = Math.max(...products.map((p) => p.id)) + 1

    setProducts([
      ...products,
      {
        id: newId,
        name: newProduct.name,
        brand: newProduct.brand,
        price: price,
        category: newProduct.category,
        stock: stock,
        image: newProduct.image,
      },
    ])

    setNewProduct({
      name: "",
      brand: "",
      price: "",
      category: "",
      stock: "",
      image: "/placeholder.svg",
    })

    setIsAddDialogOpen(false)

    toast.success("The product has been added successfully")
  }

  const handleEditProduct = () => {
    if (!currentProduct) return

    if (
      !currentProduct.name ||
      !currentProduct.brand ||
      currentProduct.price === "" ||
      !currentProduct.category ||
      currentProduct.stock === ""
    ) {
      toast.error("Please fill in all required fields")
      return
    }

    const price = Number.parseFloat(currentProduct.price)
    const stock = Number.parseInt(currentProduct.stock)

    if (isNaN(price) || price <= 0) {
      toast.error("Please enter a valid price")
      return
    }

    if (isNaN(stock) || stock < 0) {
      toast.error("Please enter a valid stock quantity")
      return
    }

    setProducts(
      products.map((product) => (product.id === currentProduct.id ? { ...currentProduct, price, stock } : product)),
    )

    setIsEditDialogOpen(false)

    toast.success("The product has been updated successfully")
  }

  const handleDeleteProduct = () => {
    if (!currentProduct) return

    setProducts(products.filter((product) => product.id !== currentProduct.id))
    setIsDeleteDialogOpen(false)

    toast.success("The product has been deleted successfully")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Products</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>Fill in the details to add a new product to your inventory.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  value={newProduct.brand}
                  onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newProduct.category}
                  onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                >
                  <SelectTrigger id="category">
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
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddProduct}>Add Product</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  No products found
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="relative h-10 w-10 rounded-md overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={product.stock > 0 ? "outline" : "destructive"}>
                      {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentProduct(product)
                            setIsEditDialogOpen(true)
                          }}
                        >
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentProduct(product)
                            setIsDeleteDialogOpen(true)
                          }}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Update the product details.</DialogDescription>
          </DialogHeader>
          {currentProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Product Name</Label>
                <Input
                  id="edit-name"
                  value={currentProduct.name}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-brand">Brand</Label>
                <Input
                  id="edit-brand"
                  value={currentProduct.brand}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, brand: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-price">Price ($)</Label>
                  <Input
                    id="edit-price"
                    value={currentProduct.price}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-stock">Stock</Label>
                  <Input
                    id="edit-stock"
                    value={currentProduct.stock}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, stock: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select
                  value={currentProduct.category}
                  onValueChange={(value) => setCurrentProduct({ ...currentProduct, category: value })}
                >
                  <SelectTrigger id="edit-category">
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
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditProduct}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Product Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentProduct && (
            <div className="py-4">
              <p className="font-medium">{currentProduct.name}</p>
              <p className="text-sm text-muted-foreground">
                {currentProduct.brand} - {currentProduct.category}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

