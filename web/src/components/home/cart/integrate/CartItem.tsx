import React from 'react'
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux'
import {
  decreaseItemQTY,
  increaseItemQTY,
  removeItemFromCart,
} from '../../../../store/slices/CartSlice'

interface Props {
  item: CartItem
}

export const CartItem = ({
  item,
  item: { id, title, img, price, cartQuantity },
}: Props) => {
  const dispatch = useDispatch()

  const total = Number(price.replace(',', '.')) * cartQuantity

  const onRemoveItem = () => {
    dispatch(
      removeItemFromCart({
        ...item,
      })
    )
  }

  const onIncreaseItemQTY = () => {
    dispatch(increaseItemQTY({ ...item }))
  }
  const onDecreaseItemQTY = () => {
    dispatch(decreaseItemQTY({ ...item }))
  }

  return (
    <div className="flex items-center justify-between w-full md:px-2 px-5">
      <div className="flex items-center">
        <div
          className={`bg-gradient-to-b relative rounded md:p-0 p-3 transition-all duration-75 ease-in-out grid items-center`}
        >
          <img
            src={img.url || img}
            alt={`cartItem-${id}/img`}
            className="w-28 h-auto object-fill rounded-sm"
          />
          <div className="absolute shadow-md md:right-1 md:top-1 -right-1 -top-[2px] bg-white/80 text-zinc-900 text-xs px-2 py-1.5 rounded-sm">
            ${price}
          </div>
        </div>
        <div className="flex flex-col md:pl-4 items-start gap-4">
          <div className="flex items-start leading-none">
            <h1 className="font-medium text-lg line-clamp-2 md:pr-2 w-full text-zinc-900 lg:text-sm">
              {title}
            </h1>
          </div>
          <div className="flex items-center justify-between md:w-[100px] w-[150px]">
            <button
              type="button"
              className="bg-zinc-900 rounded-sm w-6 h-6 lg:w-5 lg:h-5 flex items-center justify-center active:scale-110"
              onClick={onDecreaseItemQTY}
            >
              <MinusIcon className="w-5 h-5 lg:w-4 lg:h-4 text-white stroke-[2]" />
            </button>
            <div className="bg-zinc-900 rounded-sm text-white font-medium lg:text-xs w-7 h-6 lg:w-6 lg:h-5 flex items-center justify-center">
              {cartQuantity}
            </div>
            <button
              type="button"
              className="bg-zinc-900 rounded-sm w-6 h-6 lg:w-5 lg:h-5 flex items-center justify-center active:scale-110"
              onClick={onIncreaseItemQTY}
            >
              <PlusIcon className="w-5 h-5 lg:w-4 lg:h-4 text-white stroke-[2]" />
            </button>
          </div>
        </div>
      </div>
      <div className="grid items-end gap-5">
        <div className="grid items-end justify-center">
          <h1 className="text-lg lg:text-base text-bg-zinc-900 font-medium">
            ${parseFloat(String(total)).toFixed(2).toString().replace('.', ',')}
          </h1>
        </div>
        <div className="grid items-end justify-end">
          <button
            type="button"
            className="bg-zinc-900 rounded-sm p-1 lg:p-0.5 grid items-end justify-items-end cursor-pointer"
            onClick={onRemoveItem}
          >
            <TrashIcon className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}
