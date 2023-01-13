import React from 'react'
import { StarIcon, ShoppingBagIcon } from '@heroicons/react/24/solid'

type Props = ItemSale

export const Item = ({
  id,
  color,
  shadow,
  title,
  text,
  img,
  btn,
  rating,
  price,
}: Props) => {
  return (
    <div
      className={`relative rounded-xl py-4 px-5 transition-all duration-700 ease-in-out w-full bg-gradient-to-b ${color} ${shadow} grid items-center justify-items-center hover:scale-105`}
    >
      <div className="grid items-center justify-items-center">
        <h1 className="text-slate-200 text-xl lg:text-lg md:text-base font-medium filter drop-shadow">
          {title}
        </h1>
        <p className="text-slate-200 filter drop-shadow text-base md:text-sm font-normal">
          {text}
        </p>

        <div className="flex items-center justify-between w-28 my-2">
          <div className="flex items-center bg-white/80 px-1 rounded">
            <h1 className="blurEffectTheme text-black text-sm font-medium">
              ${price}
            </h1>
          </div>
          <div className="flex items-center gap-1">
            <StarIcon className="iconStyle w-5 h-5 md:w-4 md:h-4" />
            <h1 className="md:text-sm font-normal text-slate-100">{rating}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="blurEffectTheme buttonTheme bg-white/90 p-0.5 shadow shadow-slate-200"
          >
            <ShoppingBagIcon className="iconStyle text-slate-900" />
          </button>
          <button
            type="button"
            className="blurEffectTheme buttonTheme bg-white/90 py-1 px-2 shadow shadow-slate-200 text-sm text-black"
          >
            {btn}
          </button>
        </div>
      </div>
      <div className="flex items-center">
        <img
          src={img}
          alt="product/img"
          className="transitionTheme w-64 h-36 hover:-rotate-12"
        />
      </div>
    </div>
  )
}
