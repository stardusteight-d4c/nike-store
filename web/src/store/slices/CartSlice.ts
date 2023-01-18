import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../'
import toast from 'react-hot-toast'

const items = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart')!)
  : []

// depois tipar
const initialState: any = {
  cartState: false,
  cartItems: items,
  cartTotalAmount: 0,
  cartTotalQuantity: 0,
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
    addItemToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item: any) => item.id === action.payload.id
      )

      console.log('action.payload.stock', action.payload.stock)

      if (itemIndex >= 0) {
        if (state.cartItems[itemIndex].cartQuantity === action.payload.stock) {
          toast.error('Reaching stock limit')
          return
        }

        state.cartItems[itemIndex].cartQuantity++
        toast.success(
          `${action.payload.title} (${state.cartItems[itemIndex].cartQuantity}) added to Cart`
        )
      } else {
        const temp = {
          ...action.payload,
          cartQuantity: 1,
        }
        state.cartItems.push(temp)
        toast.success(`${action.payload.title} added to Cart`)
      }
      localStorage.setItem('cart', JSON.stringify(state.cartItems))
    },
    removeItemFromCart: (state, action) => {
      const removeItem = state.cartItems.filter(
        (item: any) => item.id !== action.payload.id
      )
      state.cartItems = removeItem
      localStorage.setItem('cart', JSON.stringify(state.cartItems))
      toast.success(`${action.payload.title} removed from Cart!`)
    },
    increaseItemQTY: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item: any) => item.id === action.payload.id
      )
      if (itemIndex >= 0) {
        if (state.cartItems[itemIndex].cartQuantity === action.payload.stock) {
          toast.error('Reaching stock limit')
          return
        }

        state.cartItems[itemIndex].cartQuantity++
        toast.success(`${action.payload.title} added to Cart`)
      }
      localStorage.setItem('cart', JSON.stringify(state.cartItems))
    },
    decreaseItemQTY: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item: any) => item.id === action.payload.id
      )
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity--
        toast.success(`${action.payload.title} removed from Cart`)
      }
      localStorage.setItem('cart', JSON.stringify(state.cartItems))
    },
    removeCartItem: (state) => {
      state.cartItems = []
      toast.success('Cart cleared')
      localStorage.setItem('cart', JSON.stringify(state.cartItems))
    },
    getTotals: (state) => {
      let { totalAmount, totalQTY } = state.cartItems.reduce(
        (cartTotal: any, cartItem: any) => {
          const { price, cartQuantity } = cartItem
          const totalPrice = price * cartQuantity

          cartTotal.totalAmount += totalPrice
          cartTotal.totalQTY += cartQuantity

          return cartTotal
        },
        {
          totalAmount: 0,
          totalQTY: 0,
        }
      )
      state.cartTotalAmount = totalAmount
      state.cartTotalQuantity = totalQTY
    },
  },
})

export const {
  openCart,
  closeCart,
  addItemToCart,
  removeItemFromCart,
  increaseItemQTY,
  decreaseItemQTY,
  removeCartItem,
  getTotals,
} = cartSlice.actions
export const selectCartState = (state: RootState) => state.cart.cartState
export const selectCartItems = (state: RootState) => state.cart.cartItems
export const selectCartTotalAmount = (state: RootState) =>
  state.cart.cartTotalAmount
export const selectCartTotalQuantity = (state: RootState) =>
  state.cart.cartTotalQuantity

export default cartSlice.reducer
