import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    // reducer: {
    //
    // },
    // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(goodsApi.middleware),
})

setupListeners(store.dispatch)
