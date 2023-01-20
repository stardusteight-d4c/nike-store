import { ShoppingBagIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { useAppDispatch } from '../../../../store/hooks'
import { addItemToCart, openCart } from '../../../../store/slices/CartSlice'

interface Props {
  product: Product
}

export const PopularSalesItem = ({
  product: { id, title, subtitle, img, price, stock, offer, oldPrice },
}: Props) => {
  const dispatch = useAppDispatch()

  const onAddToCart = () => {
    const item = { id, title, subtitle, img, stock, offer, price, oldPrice }
    dispatch(addItemToCart(item))
  }

  return (
    <div className="flex flex-col">
      <div className="relative w-fit h-fit">
        <img
          src={img}
          alt=""
          className="w-full max-w-[330px] h-full max-h-[330px]"
        />
        <button
          type="button"
          className="blurEffectTheme buttonTheme absolute right-24 bottom-2 bg-white/90 p-0.5 shadow shadow-slate-200"
          onClick={() => onAddToCart()}
        >
          <ShoppingBagIcon className="iconStyle text-zinc-900" />
        </button>
        <button
          type="button"
          className="blurEffectTheme absolute right-2 bottom-2 buttonTheme bg-white/90 py-1 px-2 shadow shadow-slate-200 text-sm text-zinc-900"
          onClick={() => {
            onAddToCart()
            document.getElementById('body')!.style.overflow = 'hidden'
            dispatch(openCart())
          }}
        >
          Buy Now
        </button>
      </div>
      <div title={subtitle}>
        <h2 className="font-medium text-zinc-900 text-lg mt-2 line-clamp-1">{title}</h2>
        <span className="text-[#505050] w-[330px] inline-block line-clamp-2 mb-2">
          {subtitle}
        </span>
        <div className="flex items-center gap-x-2">
          <span className="inline-block">R$ {price}</span>
          {oldPrice && (
            <>
              <span className="inline-block line-through">R$ {oldPrice}</span>
              <span className="inline-block text-[#10b12b]">{offer}</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
