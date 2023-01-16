import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { hostServer } from '../../../App'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
  removeCartItem,
  closeCart,
  selectCartItems,
  selectCartState,
  getTotals,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from '../../../store/slices/CartSlice'
import { selectCurrentConsumer } from '../../../store/slices/ConsumerSlice'
import { CartCount } from './integrate/CartCount'
import { CartEmpty } from './integrate/CartEmpty'
import { CartItem } from './integrate/CartItem'

interface Props {}

export const Cart = (props: Props) => {
  const dispatch = useAppDispatch()
  const cartOpen = useAppSelector(selectCartState)
  const cartItems = useAppSelector(selectCartItems)
  const totalAmount = useAppSelector(selectCartTotalAmount)
  const totalQuantity = useAppSelector(selectCartTotalQuantity)
  const currentConsumer = useAppSelector(selectCurrentConsumer)

  useEffect(() => {
    dispatch(getTotals())
  }, [cartItems, dispatch])

  const onCartToggle = () => {
    dispatch(closeCart())
  }

  const onRemoveCartItem = () => {
    dispatch(removeCartItem())
  }

  // ! o checkout não atualiza quando você adiciona mais items dentro do carrinho

  // create Checkout Session
  const onCheckout = async () => {
    fetch(`${hostServer}/api/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ items: cartItems }),
    })
      .then((res) => res.json())
      .then((data) => {
        window.open(data.url, '_blank')
      })
      .catch((error) => console.log(error))
  }

  return (
    <div
      className={`${
        cartOpen
          ? 'opacity-100 visible translate-x-0'
          : 'opacity-0 invisible translate-x-8'
      } blurEffectTheme  duration-500 fixed inset-0 w-full h-screen z-[600]`}
    >
      <div
        className={`blurEffectTheme h-screen max-w-xl w-full absolute right-0`}
      >
        <CartCount
          onCartToggle={onCartToggle}
          onRemoveCartItem={onRemoveCartItem}
          totalQuantity={totalQuantity}
        />
        {cartItems.length === 0 ? (
          <CartEmpty onCartToggle={onCartToggle} />
        ) : (
          <div>
            <div className="scrollHiddenCSO scrollHideenIEF pt-3 pb-10 flex flex-col items-start justify-start gap-y-7 lg:gap-y-5 overflow-y-scroll h-[81vh] scroll-smooth">
              {cartItems.map((item: any, index: any) => (
                <CartItem key={index} item={item} />
              ))}
            </div>
          </div>
        )}

        <div className="fixed bottom-0 bg-white w-full px-5 py-2 grid items-center">
          <div className="flex items-center justify-between">
            <h1 className="text-base font-semibold uppercase">SubTotal</h1>
            <h1 className="bgThemeCart text-sm rounded text-slate-100 px-1 py-0.5">
              ${totalAmount}
            </h1>
          </div>
          <div className="grid items-center gap-2">
            <p className="text-sm font-medium text-center">
              Taxes and Shipping Will Calculate At Shipping
            </p>
            {currentConsumer ? (
              <button
                type="button"
                className="buttonTheme bgThemeCart text-white"
                onClick={onCheckout}
              >
                Checkout
              </button>
            ) : (
              <Link to="/login" className="buttonTheme bgThemeCart text-white text-center">
                Create an account
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
