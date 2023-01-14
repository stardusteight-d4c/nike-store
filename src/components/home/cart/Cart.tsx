import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { cartState, closeCart } from '../../../store/slices/CartSlice'
import { CartCount } from './integrate/CartCount'
import { CartEmpty } from './integrate/CartEmpty'
import { CartItem } from './integrate/CartItem'

interface Props {}

export const Cart = (props: Props) => {
  const dispatch = useAppDispatch()
  const cartOpen = useAppSelector(cartState)

  const onCartToggle = () => {
    dispatch(closeCart())
  }

  return (
    <div
      className={`${
        cartOpen ? 'visible translate-x-0' : 'hidden invisible translate-x-8'
      } blurEffectTheme fixed inset-0 w-full h-screen z-[600]`}
    >
      <div
        className={`blurEffectTheme h-screen max-w-xl w-full absolute right-0`}
      >
        <CartCount onCartToggle={onCartToggle} />
        <CartEmpty onCartToggle={onCartToggle} />
        <CartItem />
      </div>
    </div>
  )
}
