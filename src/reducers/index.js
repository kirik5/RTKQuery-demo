import { configureStore } from '@reduxjs/toolkit'
import { goodsApi } from './goodsApi'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer: {
        [goodsApi.reducerPath]: goodsApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(goodsApi.middleware),
})

setupListeners(store.dispatch)
