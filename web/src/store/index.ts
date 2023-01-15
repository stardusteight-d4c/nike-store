import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slices/CartSlice'
import consumerSlice from './slices/ConsumerSlice'

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    consumer: consumerSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
