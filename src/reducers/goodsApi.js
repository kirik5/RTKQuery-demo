import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GOODS_PATH } from '../api/apiConsts'

export const goodsApi = createApi({
    reducerPath: 'goods',
    baseQuery: fetchBaseQuery({
        baseUrl: GOODS_PATH,
    }),
    tagTypes: ['Goods'],
    endpoints: builder => ({
        getGoods: builder.query({
            query: (query = '') => ({
                url: query,
            }),
            transformResponse: response => ({
                partialGoods: response.content,
                totalPages: response.totalPages,
                pageSize: response.size,
                pageNumber: response.number,
                totalGoods: response.totalElements,
                returnedGoods: response.numberOfElements,
            }),
            providesTags: result =>
                result?.partialGoods
                    ? [
                          ...result.partialGoods.map(good => ({ type: 'Goods', id: good.id })),
                          { type: 'Goods', id: 'LIST' },
                          { type: 'Goods', id: 'PARTIAL-GOODS' },
                      ]
                    : [
                          { type: 'Goods', id: 'LIST' },
                          { type: 'Goods', id: 'PARTIAL-GOODS' },
                      ],
        }),
        getGood: builder.query({
            query: id => ({
                url: `/${id}`,
            }),
            providesTags: (result, error, id) => [{ type: 'Goods', id }],
        }),
        addGood: builder.mutation({
            query: body => ({
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Goods', id: 'LIST' }],
        }),
        updateGood: builder.mutation({
            query: body => ({
                url: `/${body.id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: (result, error, body) => [{ type: 'Goods', id: body.id }],
        }),
        deleteGood: builder.mutation({
            query: id => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Goods', id: 'PARTIAL-GOODS' }],
        }),
    }),
})

export const { useGetGoodsQuery, useGetGoodQuery, useAddGoodMutation, useUpdateGoodMutation, useDeleteGoodMutation } = goodsApi

// 'https://123.123.123.123/goods/121'
