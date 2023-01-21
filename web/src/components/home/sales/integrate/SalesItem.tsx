import { ShoppingBagIcon } from '@heroicons/react/24/solid'
import { useAppDispatch } from '../../../../store/hooks'
import { addItemToCart, openCart } from '../../../../store/slices/CartSlice'

interface Props {
  isFeaturedItem?: boolean
  product: Product
}

export const SalesItem = ({
  isFeaturedItem = false,
  product: { id, title, subtitle, img, price, stock, offer, oldPrice },
}: Props) => {
  const dispatch = useAppDispatch()

  const onAddToCart = () => {
    const item = { id, title, subtitle, img, stock, offer, price, oldPrice }
    dispatch(addItemToCart(item))
  }

  return (
    <div className={style.handleWrapper(isFeaturedItem)}>
      <div className={style.handleImgContainer(isFeaturedItem)}>
        <img
          src={img}
          alt={title}
          className={style.handleImg(isFeaturedItem)}
        />
        <button
          type="button"
          className={style.addToCartButton}
          onClick={() => onAddToCart()}
        >
          <ShoppingBagIcon className={style.buyIcon} />
        </button>
        <button
          type="button"
          className={style.buyNowButton}
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
        <h2 className={style.title}>{title}</h2>
        <span className={style.subtitle}>{subtitle}</span>
        <div className={style.handlePriceContainer(isFeaturedItem)}>
          <span className={style.price}>R$ {price}</span>
          {oldPrice && (
            <>
              <span className={style.oldPrice}>R$ {oldPrice}</span>
              <span className={style.offer}>{offer}</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

const style = {
  handleWrapper: (isFeaturedItem: boolean) => {
    return `flex col-span-1 ${
      isFeaturedItem
        ? 'flex-row gap-x-2 relative items-start border'
        : 'flex-col'
    }`
  },
  handleImgContainer: (isFeaturedItem: boolean) => {
    return isFeaturedItem ? 'h-48' : 'relative w-fit h-fit'
  },
  handleImg: (isFeaturedItem: boolean) => {
    return isFeaturedItem
      ? 'md:min-w-[160px] md:max-w-[160px] min-w-[180px] max-w-[180px] h-full'
      : 'w-auto h-auto'
  },
  addToCartButton: `blurEffectTheme buttonTheme absolute right-24 bottom-2 bg-white/90 p-0.5 shadow shadow-slate-200`,
  buyIcon: `iconStyle text-zinc-900`,
  buyNowButton: `blurEffectTheme absolute right-2 bottom-2 buttonTheme bg-white/90 py-1 px-2 shadow shadow-slate-200 text-sm text-zinc-900`,
  title: `font-medium text-zinc-900 text-lg mt-2 line-clamp-1`,
  subtitle: `text-[#505050] md:pr-1 w-auto inline-block line-clamp-2 mb-2`,
  handlePriceContainer: (isFeaturedItem: boolean) => {
    return `flex gap-x-2 ${
      isFeaturedItem ? 'items-start flex-col-reverse' : 'flex-row items-center'
    }`
  },
  price: `inline-block`,
  oldPrice: `inline-block line-through`,
  offer: `inline-block text-[#10b12b]`,
}
