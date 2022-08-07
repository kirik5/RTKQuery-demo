import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GOODS_PATH } from '../api/apiConsts'

export const goodsApi = createApi({
    reducerPath: 'goods',
    baseQuery: fetchBaseQuery({
        baseUrl: GOODS_PATH,
    }),
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
        }),
    }),
})

export const { useGetGoodsQuery } = goodsApi

// 'https://123.123.123.123/goods?pageSize=10&pageNo=0'
