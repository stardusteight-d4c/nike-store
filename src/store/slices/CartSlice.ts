import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../'

const initialState = {
  cartState: false,
}

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    openCart: (state) => {
      state.cartState = true
    },
    closeCart: (state) => {
      state.cartState = false
    },
  },
})

export const { openCart, closeCart } = cartSlice.actions
export const cartState = (state: RootState) => state.cart.cartState
export default cartSlice.reducer
