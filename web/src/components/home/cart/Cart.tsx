import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { hostServer } from '../../../App'
import { useGetProductByIdQuery } from '../../../graphql/generated'
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
import { cartItemsToCheckout } from '../../../utils/cartItemsToCheckout'
import { CartCount } from './integrate/CartCount'
import { CartEmpty } from './integrate/CartEmpty'
import { CartItem } from './integrate/CartItem'
import { ShippingAddress } from './integrate/ShippingAddress'

interface Props {}

export const Cart = (props: Props) => {
  const dispatch = useAppDispatch()
  const cartOpen = useAppSelector(selectCartState)
  const cartItems = useAppSelector(selectCartItems)
  const totalAmount = useAppSelector(selectCartTotalAmount)
  const totalQuantity = useAppSelector(selectCartTotalQuantity)
  const currentConsumer: CurrentConsumer = useAppSelector(selectCurrentConsumer)
  const [openShippingAddress, setOpenShippingAddress] = useState(false)

  console.log('cartItems', cartItems);
  

  useEffect(() => {
    dispatch(getTotals())
  }, [cartItems, dispatch])

  const onCartToggle = () => {
    if (openShippingAddress) {
      setOpenShippingAddress(false)
    } else {
      document.getElementById('body')!.style.overflow = 'auto'
      dispatch(closeCart())
    }
  }

  const onRemoveCartItem = () => {
    dispatch(removeCartItem())
  }

  // ! o checkout não atualiza quando você adiciona mais items dentro do carrinho

  // create Checkout Session
  const proceedToCheckout = async () => {
    fetch(`${hostServer}/api/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        items: cartItemsToCheckout(cartItems),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        window.open(data.url)
      })
      .catch((error) => console.log(error))
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    fetch(`${hostServer}/api/consumer/newAddress`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ address: data, consumerId: currentConsumer.id }),
    })
      .then((res) => res.json())
      .then(() => proceedToCheckout())
      .catch((error) => console.log(error))
  }

  const rendersButtonTitle = () => {
    if (cartItems.length === 0) {
      return 'Bag is empty'
    } else if (!openShippingAddress) {
      return 'Checkout'
    } else {
      return 'Proceed to checkout'
    }
  }

  // Salvar apenas o id e a qauntidade em localStorage, puxar as informações do cms

  return (
    <div
      onClick={() => onCartToggle()}
      className={`${
        cartOpen
          ? 'opacity-100 visible translate-x-0'
          : 'opacity-0 invisible translate-x-8'
      } overlayBlur duration-500 fixed inset-0 w-full h-screen z-[500]`}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => onSubmit(e)}
        className={`cartBlur h-screen max-w-xl w-full absolute right-0`}
      >
        <CartCount
          onCartToggle={onCartToggle}
          onRemoveCartItem={onRemoveCartItem}
          totalQuantity={totalQuantity}
        />
        {openShippingAddress ? (
          <div className="scrollHiddenCSO scrollHideenIEF overflow-y-scroll h-[81vh] scroll-smooth">
            <ShippingAddress />
          </div>
        ) : (
          <>
            {cartItems.length === 0 ? (
              <CartEmpty onCartToggle={onCartToggle} />
            ) : (
              <div>
                <div className="scrollHiddenCSO scrollHideenIEF pt-3 pb-10 flex flex-col items-start justify-start md:gap-y-4 overflow-y-scroll h-[81vh] scroll-smooth">
                  {cartItems.map((item: any, index: any) => (
                    <CartItem key={index} item={item} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        <div className="fixed bottom-0 border-t bg-white w-full px-5 py-2 grid items-center">
          <div className="flex items-center justify-between">
            <h1 className="text-base font-semibold uppercase">SubTotal</h1>
            <h1 className="bg-zinc-900 text-sm rounded-sm text-white px-1 py-0.5">
              ${totalAmount}
            </h1>
          </div>
          <div className="grid items-center gap-2">
            <p className="text-sm font-medium text-center">
              Taxes and Shipping Will Calculate At Shipping
            </p>
            {currentConsumer ? (
              <button
                type="submit"
                className="rounded-full px-4 py-1.5 bg-zinc-900 text-white text-center disabled:cursor-not-allowed"
                onClick={(e) => {
                  !openShippingAddress
                    ? setOpenShippingAddress(true)
                    : e.stopPropagation()
                }}
                disabled={cartItems.length === 0}
              >
                {rendersButtonTitle()}
              </button>
            ) : (
              <Link
                to="/login"
                className="rounded-full px-4 py-1.5 bg-zinc-900 text-white text-center"
              >
                Create an account
              </Link>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
