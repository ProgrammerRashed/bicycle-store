import { baseApi } from "@/redux/api/baseApi";
import { Product } from "@/utils/Interfaces";


const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (category) => ({
        url: category ? `/products?category=${category}` : `/products`,
        method: "GET",
      }),
    }),
    addProduct: builder.mutation<Product, Partial<Product>>({
      query: (newProduct) => ({
        url: `/product`,
        method: "POST",
        body: newProduct,
      }),
    }),
    updateProduct: builder.mutation<
      Product,
      { productId: string; updatedProduct: Partial<Product> }
    >({
      query: ({ productId, updatedProduct }) => ({
        url: `/product/${productId}`,
        method: "PUT",
        body: updatedProduct,
      }),
    }),
    getSingleProduct: builder.query({
      query: (productId) => ({
        url: `/product/${productId}`,
        method: "GET",
      }),
    }),
    getProductBrands: builder.query({
      query: () => ({
        url: `/products/brands`,
        method: "GET",
      }),
    }),
    deleteProduct: builder.mutation<{ message: string }, string>({
      query: (productId) => ({
        url: `/product/${productId}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductBrandsQuery,
  useGetSingleProductQuery
} = productApi;
