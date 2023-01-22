import React, { useEffect, useState } from 'react'
import { hostServer } from '../../../App'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
  removeCartItem,
  closeCart,
  selectCartItems,
  selectCartState,
  getTotals,
  selectCartTotalQuantity,
} from '../../../store/slices/CartSlice'
import { selectCurrentConsumer } from '../../../store/slices/ConsumerSlice'
import { cartItemsToCheckout } from '../../../utils/cartItemsToCheckout'
import { Header } from './integrate/Header'
import { CartEmpty } from './integrate/CartEmpty'
import { CartItem } from './integrate/CartItem'
import { ShippingAddress } from './integrate/ShippingAddress'
import { Footer } from './integrate/Footer'

interface Props {}

export const Cart = (props: Props) => {
  const dispatch = useAppDispatch()
  const cartOpen = useAppSelector(selectCartState)
  const cartItems = useAppSelector(selectCartItems)
  const totalQuantity = useAppSelector(selectCartTotalQuantity)
  const currentConsumer: CurrentConsumer = useAppSelector(selectCurrentConsumer)
  const [openShippingAddress, setOpenShippingAddress] = useState(false)

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

  const componentsProps = {
    wrapper: {
      onClick: () => onCartToggle(),
      className: style.handleWrapper(cartOpen),
    },
    form: {
      onClick: (e: React.MouseEvent<HTMLFormElement, MouseEvent>) =>
        e.stopPropagation(),
      onSubmit: (e: React.FormEvent<HTMLFormElement>) => onSubmit(e),
      className: style.formWrapper,
    },
    header: {
      onCartToggle: onCartToggle,
      onRemoveCartItem: onRemoveCartItem,
      totalQuantity: totalQuantity,
    },
    footer: {
      openShippingAddress,
      setOpenShippingAddress,
    },
  }

  const rendersCartContent = () => {
    if (openShippingAddress) {
      return <ShippingAddress />
    } else if (cartItems.length === 0) {
      return <CartEmpty onCartToggle={onCartToggle} />
    } else {
      return (
        <div className={style.cartItemContainer}>
          {cartItems.map((item: any, index: any) => (
            <CartItem key={index} item={item} />
          ))}
        </div>
      )
    }
  }

  return (
    <div {...componentsProps.wrapper}>
      <form {...componentsProps.form}>
        <Header {...componentsProps.header} />
        {rendersCartContent()}
        <Footer {...componentsProps.footer} />
      </form>
    </div>
  )
}

const style = {
  handleWrapper: (cartOpen: boolean) => {
    return `${
      cartOpen
        ? 'opacity-100 visible translate-x-0'
        : 'opacity-0 invisible translate-x-8'
    } overlayBlur duration-500 fixed inset-0 w-full h-screen z-[500]`
  },
  formWrapper: `cartBlur h-screen max-w-xl w-full absolute right-0`,
  cartItemContainer: `scrollHiddenCSO scrollHideenIEF pt-3 pb-10 flex flex-col items-start justify-start md:gap-y-4 overflow-y-scroll h-[81vh] scroll-smooth`,
}
