import {
    MoreVertical,
    Pencil,
    Trash2,
  } from "lucide-react";
  
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Badge } from "@/components/ui/badge";
  import { Loader } from "lucide-react";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { DashboardProductTableProps, Product } from "@/utils/Interfaces";
import { Button } from "../ui/button";


const DashboardProductTable = ({setIsEditDialogOpen, setIsDeleteDialogOpen, setCurrentProduct}: DashboardProductTableProps) => {
  const {
    data: productsResponse,
    isLoading,
  } = useGetAllProductsQuery("");
  const products: Product[] = productsResponse?.data || [];
console.log("products", products)


  return (
    <>
  
     <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product: any) => (
              <TableRow key={product?._id}>
                <TableCell>
                  <img
                    src={product.image_gallery?.[0] || "/placeholder.svg"}
                    className="h-10 w-10 object-cover rounded"
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  {product?.special_category?.map((tag: string) => (
                    <Badge key={tag} variant="outline" className="mr-1">
                      {tag}
                    </Badge>
                  ))}
                </TableCell>
                <TableCell className="text-right">${product.price}</TableCell>
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
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => {
                          setCurrentProduct(product);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => {
                          setCurrentProduct(product);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {isLoading && (
          <div className="min-h-80 h-full flex items-center justify-center">
            <Loader className="animate-spin w-10 h-10 text-green-600" />
          </div>
        )}
        {!isLoading && products.length === 0 && (
          <div className="min-h-80 h-full flex items-center justify-center">
            No products found
          </div>
        )}
      </div>
      </>
  )
}

export default DashboardProductTable