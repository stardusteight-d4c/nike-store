import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../../store/hooks'
import {
  selectCartItems,
  selectCartTotalAmount,
} from '../../../../store/slices/CartSlice'
import { selectCurrentConsumer } from '../../../../store/slices/ConsumerSlice'

interface Props {
  openShippingAddress: boolean
  setOpenShippingAddress: React.Dispatch<React.SetStateAction<boolean>>
}

export const Footer = ({openShippingAddress, setOpenShippingAddress}: Props) => {
  const totalAmount = useAppSelector(selectCartTotalAmount)
  const cartItems = useAppSelector(selectCartItems)
  const currentConsumer: CurrentConsumer = useAppSelector(selectCurrentConsumer)

  const emptyBag = cartItems.length === 0

  const rendersButtonTitle = () => {
    if (emptyBag) {
      return 'Bag is empty'
    } else {
      return 'Proceed to checkout'
    }
  }

  console.log('openShippingAddress', openShippingAddress)

  return (
    <footer className={style.wrapper}>
      <div className={style.totalContainer}>
        <h2 className={style.total}>Total</h2>
        <h3 className={style.totalValue}>${totalAmount}</h3>
      </div>
      <div className={style.gridContainer}>
        <span className={style.span}>
          Taxes and shipping will calculate at shipping
        </span>
        {currentConsumer ? (
          <>
            {!openShippingAddress ? (
              <div
                className={style.button}
                onClick={() => !emptyBag && setOpenShippingAddress(true)}
              >
                {rendersButtonTitle()}
              </div>
            ) : (
              <button
                type="submit"
                className={style.button}
                disabled={cartItems.length === 0}
              >
                Checkout
              </button>
            )}
          </>
        ) : (
          <Link to="/login" className={style.linkButton}>
            Create an account
          </Link>
        )}
      </div>
    </footer>
  )
}

const style = {
  wrapper: `fixed bottom-0 border-t bg-white w-full px-5 py-2 grid items-center`,
  totalContainer: `flex items-center justify-between`,
  total: `text-base font-semibold uppercase`,
  totalValue: `bg-zinc-900 text-sm rounded-sm text-white px-1 py-0.5`,
  gridContainer: `grid items-center gap-2 mt-4`,
  span: `text-sm text-[#464646] font-light text-center`,
  button: `rounded-full active:scale-95 cursor-pointer px-4 py-1.5 bg-zinc-900 text-white text-center disabled:cursor-not-allowed`,
  linkButton: `rounded-full px-4 py-1.5 bg-zinc-900 text-white text-center`,
}
