import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import React from 'react'
import emptyBag from '../../../../assets/emptybag.png'

interface Props {
  onCartToggle: () => void
}

export const CartEmpty = ({ onCartToggle }: Props) => {
  return (
    <div className="flex items-center justify-center flex-col h-[81vh] px-11 text-center gap-7">
      <span className='text-lg'>Your shopping cart is empty</span>
      <button
        type="button"
        className="rounded-full text-zinc-900 flex items-center justify-center px-4 py-1.5 bg-transparent border border-zinc-500 gap-3 text-sm font-semibold active:scale-110"
        onClick={onCartToggle}
      >
        <ArrowLeftIcon className="w-5 h-5" />
        <span className="">Back To Nike Store</span>
      </button>
    </div>
  )
}
