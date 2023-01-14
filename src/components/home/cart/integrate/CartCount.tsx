import React from 'react'
import { ChevronDoubleLeftIcon, XMarkIcon } from '@heroicons/react/24/solid'

interface Props {
  onCartToggle: () => void
  onRemoveCartItem: () => void
  totalQuantity: any
}

export const CartCount = ({
  onCartToggle,
  onRemoveCartItem,
  totalQuantity,
}: Props) => {
  return (
    <div className="bg-white h-11 flex items-center justify-between px-3 sticky top-0 inset-x-0 w-full">
      <div className="flex items-center gap-3">
        <div
          className="grid items-center cursor-pointer"
          onClick={onCartToggle}
        >
          <ChevronDoubleLeftIcon className="w-5 h-5 text-slate-900 hover:text-orange-500 stroke-[2]" />
        </div>
        <div className="grid items-center">
          <h1 className="text-base font-medium text-slate-900">
            Your Cart{' '}
            <span className="bgThemeCart rounded px-1 py-0.5 text-slate-100 font-normal text-xs">
              ({totalQuantity} Items)
            </span>
          </h1>
        </div>
      </div>
      <div className="flex items-center">
        <button
          type="button"
          className="bgThemeCart rounded active:scale-90 p-0.5"
          onClick={onRemoveCartItem}
        >
          <XMarkIcon className="w-5 h-5 text-white stoke-[2]" />
        </button>
      </div>
    </div>
  )
}
