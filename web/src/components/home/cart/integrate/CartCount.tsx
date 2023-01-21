import React from 'react'
import { ChevronDoubleLeftIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { TrashIcon } from '@heroicons/react/24/outline'

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
          <ChevronDoubleLeftIcon className="w-5 h-5 text-zinc-900 hover:text-blue-500 stroke-[2]" />
        </div>
        <div className="grid items-center">
          <h1 className="text-base font-medium text-zinc-900">
            Your Cart{' '}
            <span className="bg-zinc-900 rounded-full px-2 py-0.5 text-slate-100 font-medium text-xs">
              ({totalQuantity} Items)
            </span>
          </h1>
        </div>
      </div>
      <div className="flex items-center">
        <button
          type="button"
          className="text-zinc-900 shadow ring-inset hover:scale-105 transition-all font-thin active:scale-90 p-0.5"
          onClick={onRemoveCartItem}
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
