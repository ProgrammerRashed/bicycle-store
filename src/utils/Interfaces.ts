// LOGIN INTERFACES 

export type TLoginForm = {
    email: string;
    password: string;
};

export interface TUser {
  userId: string;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: "deactivate" | "active";
  password: string;
  role: "admin" | "customer";
  createdAt: string;
}

export interface Product {
  _id?: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  category: string;
  stock: number;
  model: string;
  special_category: string[];
  image_gallery: string[];
  in_stock: boolean;
  specifications: { name: string; value: string }[];
  reviews: number;
  key_features: string[];
}

export interface DashboardProductTableProps {
  setIsEditDialogOpen: (value: boolean) => void;
  setIsDeleteDialogOpen: (value: boolean) => void;
  setCurrentProduct: (product: Product | null) => void;
}