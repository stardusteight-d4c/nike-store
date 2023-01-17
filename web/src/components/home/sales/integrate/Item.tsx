import { StarIcon, ShoppingBagIcon } from '@heroicons/react/24/solid'
import { useAppDispatch } from '../../../../store/hooks'
import { addItemToCart, openCart } from '../../../../store/slices/CartSlice'

interface Props extends ItemSale {
  isFeaturedItem: boolean
}

export const Item = ({
  isFeaturedItem,
  id,
  color,
  shadow,
  title,
  text,
  img,
  stock,
  rating,
  price,
}: Props) => {
  const dispatch = useAppDispatch()

  const onAddToCart = () => {
    const item = { id, title, text, stock, img, color, shadow, price }
    dispatch(addItemToCart(item))
  }

  return (
    <div
      className={`${color} ${shadow} ${
        isFeaturedItem ? 'justify-items-start' : 'justify-items-center'
      } relative rounded-xl py-4 px-5 transition-all duration-700 ease-in-out w-full bg-gradient-to-b grid items-center hover:scale-105`}
    >
      <div
        className={`${
          isFeaturedItem ? 'justify-items-start' : 'justify-items-center'
        } grid items-center`}
      >
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
        {stock && (
          <span className="text-sm font-light text-white">Stock: {stock}</span>
        )}

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="blurEffectTheme buttonTheme bg-white/90 p-0.5 shadow shadow-slate-200"
            onClick={() => onAddToCart()}
          >
            <ShoppingBagIcon className="iconStyle text-slate-900" />
          </button>
          <button
            type="button"
            className="blurEffectTheme buttonTheme bg-white/90 py-1 px-2 shadow shadow-slate-200 text-sm text-black"
            onClick={() => {
              onAddToCart()
              document.getElementById('body')!.style.overflow = 'hidden'
              dispatch(openCart())
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
      <div
        className={`${
          isFeaturedItem ? 'absolute top-5 right-1' : 'justify-center'
        } flex items-center`}
      >
        <img
          src={img.url || img}
          alt={`product-${id}/img`}
          className={`${
            isFeaturedItem
              ? 'h-auto w-64 lg:w-56 md:w-48 -rotate-[35deg]'
              : 'w-64 h-36'
          } transitionTheme hover:-rotate-12`}
        />
      </div>
    </div>
  )
}
