import { TrashIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux'
import { removeItemFromCart } from '../../../../store/slices/CartSlice'
import { ManageItemQuantity } from './ManageItemQuantity'

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

  return (
    <div className={style.wrapper}>
      <div className={style.flexContainer}>
        <div className={style.imgContainer}>
          <img
            src={img.url || img}
            alt={`cartItem-${id}/img`}
            className={style.img}
          />
          <div className={style.price}>${price}</div>
        </div>
        <div className={style.titleAndItemQTYContainer}>
          <h1 className={style.title}>{title}</h1>
          <ManageItemQuantity item={item} />
        </div>
      </div>

      <div className={style.totalItemPriceContainer}>
        <div className={style.gridContainer}>
          <h1 className={style.totalPrice}>
            ${parseFloat(String(total)).toFixed(2).toString().replace('.', ',')}
          </h1>
        </div>
        <div className={style.trashContainer}>
          <button
            type="button"
            className={style.trashButton}
            onClick={onRemoveItem}
          >
            <TrashIcon className={style.trashIcon} />
          </button>
        </div>
      </div>
    </div>
  )
}

const style = {
  wrapper: `flex items-center justify-between w-full md:px-2 px-5`,
  flexContainer: `flex items-center`,
  imgContainer: `relative rounded-sm md:p-0 p-3 transition-all duration-75 ease-in-out grid items-center`,
  img: `w-28 h-auto object-fill rounded-sm`,
  price: `absolute shadow-md md:right-1 md:top-1 -right-1 -top-[2px] bg-white/80 text-zinc-900 text-xs px-2 py-1.5 rounded-sm`,
  titleAndItemQTYContainer: `flex flex-col md:pl-4 items-start gap-4`,
  title: `font-medium text-lg line-clamp-2 md:pr-2 w-full text-zinc-900 lg:text-sm`,
  totalItemPriceContainer: `grid items-end gap-5`,
  gridContainer: `grid items-end justify-center`,
  totalPrice: `text-lg lg:text-base text-bg-zinc-900 font-medium`,
  trashContainer: `grid items-end justify-end`,
  trashButton: `bg-zinc-900 rounded-sm p-1 lg:p-0.5 grid items-end justify-items-end cursor-pointer`,
  trashIcon: `w-5 h-5 text-white`,
}
