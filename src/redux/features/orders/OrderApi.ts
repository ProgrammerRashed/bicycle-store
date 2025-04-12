import { baseApi } from "@/redux/api/baseApi";
export interface TOrderData {
  _id?: string;
  productId: string;
  productName: string;
  productImage: string;
  productPrice: number;
  quantity: number;
  totalPrice: number;
  user: {
    name: string;
    email: string;
  };
  paymentStatus: string;
  paymentId: string;
  createdAt: Date;
  data?: TOrderData;
}

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrder: builder.query({
      query: () => ({
        url: `/orders`,
        method: "GET",
      }),
    }),
    getSingleOrder: builder.query({
      query: (email) => ({
        url: `/orders/${email}`,
        method: "GET",
      }),
    }),
    updateorder: builder.mutation<
      TOrderData,
      { productId: string; updatedProduct: Partial<TOrderData> }
    >({
      query: ({ productId, updatedProduct }) => ({
        url: `/order/${productId}`,
        method: "PUT",
        body: updatedProduct,
      }),
    }),
    deleteOrder: builder.mutation<{ message: string }, string>({
      query: (orderId) => ({
        url: `/order/${orderId}`,
        method: "DELETE",
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetSingleOrderQuery,
  useDeleteOrderMutation,
  useGetAllOrderQuery,
  useUpdateorderMutation,
} = orderApi;
