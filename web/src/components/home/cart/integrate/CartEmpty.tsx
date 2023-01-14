import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import React from 'react'
import emptyBag from '../../../../assets/emptybag.png'

interface Props {
  onCartToggle: () => void
}

export const CartEmpty = ({ onCartToggle }: Props) => {
  return (
    <div className="flex items-center justify-center flex-col h-screen px-11 text-center gap-7">
      <img
        src={emptyBag}
        alt="emptyBag/img"
        className="w-40 lg:w-36 sm:w-28 h-auto object-fill"
      />
      <button
        type="button"
        className="buttonTheme bg-gradient-to-b from-amber-500 to-orange-500 shadow-lg shadow-orange-500 flex items-center justify-center text-slate-900 py-2 gap-3 text-sm px-5 font-semibold active:scale-110"
        onClick={onCartToggle}
      >
        <ArrowLeftIcon className="w-5 h-5 text-slate-900" />
        <span className="">Back To Nike Store</span>
      </button>
    </div>
  )
}
