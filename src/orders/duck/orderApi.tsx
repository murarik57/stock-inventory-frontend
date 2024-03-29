import AppUrl, { baseQuery } from "Config/appUrl";
import { createApi } from "@reduxjs/toolkit/query/react";
import { ResponseTypeOnlyId } from "Interfaces/global.interface";
import {
  GetOneOrderResponse,
  OrderListRespnse,
  UploadInvoicePayload,
} from "Interfaces/order.interface";

const tagName = "Order";

export const orderApi = createApi({
  baseQuery,
  reducerPath: "order",
  tagTypes: [tagName],
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    orderList: builder.query<OrderListRespnse, void>({
      query: () => AppUrl.ORDER,
      providesTags: (result, error) => {
        if (error) return [];
        const tags: any = result?.data.map((order) => ({
          type: tagName,
          id: order?._id,
        }));

        return tags;
      },
    }),
    getOneOrder: builder.query<GetOneOrderResponse, string>({
      query: (id) => `${AppUrl.ORDER}/${id}`,
    }),

    createOrder: builder.mutation<ResponseTypeOnlyId, FormData>({
      query: (formData) => ({
        url: AppUrl.ORDER,
        method: "POST",
        body: formData,
      }),
    }),

    uploadInvoice: builder.mutation<ResponseTypeOnlyId, UploadInvoicePayload>({
      query: (payload) => ({
        url: `${AppUrl.ORDER}/${payload.id}`,
        method: "PUT",
        body: payload.data,
      }),
      invalidatesTags: (result, error, payload) =>
        error ? [] : [{ type: tagName, id: payload.id }],
    }),
  }),
});

export const {
  useLazyOrderListQuery,
  useLazyGetOneOrderQuery,
  useCreateOrderMutation,
  useUploadInvoiceMutation,
} = orderApi;
