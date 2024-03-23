import AppUrl, { baseQuery } from "Config/appUrl";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  AddProductPayload,
  GetOneProductResponse,
  ProductListRespnse,
  UpdateOneProductPayload,
} from "Interfaces/product.interface";
import { ResponseTypeOnlyId } from "Interfaces/global.interface";

const tagName = "Product";

export const productApi = createApi({
  baseQuery,
  reducerPath: "product",
  tagTypes: [tagName],
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    productList: builder.query<ProductListRespnse, void>({
      query: () => AppUrl.PRODUCT,
      providesTags: (result, error) => {
        if (error) return [];
        const tags: any = result?.data.map((application) => ({
          type: tagName,
          id: application?._id,
        }));
        const allTags = [...tags, tagName];

        return allTags;
      },
    }),
    getOneProduct: builder.query<GetOneProductResponse, string>({
      query: (id) => `${AppUrl.PRODUCT}/${id}`,
    }),

    createProduct: builder.mutation<ResponseTypeOnlyId, AddProductPayload>({
      query: (body) => ({
        url: AppUrl.PRODUCT,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error) => (error ? [] : [tagName]),
    }),

    updateOneProduct: builder.mutation<
      ResponseTypeOnlyId,
      UpdateOneProductPayload
    >({
      query: (data) => ({
        url: `${AppUrl.PRODUCT}/${data.id}`,
        method: "PUT",
        body: data.payload,
      }),
      invalidatesTags: (result, error, data) =>
        error ? [] : [{ type: tagName, id: data.id }],
    }),
  }),
});

export const {
  useLazyProductListQuery,
  useLazyGetOneProductQuery,
  useUpdateOneProductMutation,
  useCreateProductMutation,
} = productApi;
