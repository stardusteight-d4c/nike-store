import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux'
import {
  decreaseItemQTY,
  increaseItemQTY,
} from '../../../../store/slices/CartSlice'

interface Props {
  item: CartItem
}

export const ManageItemQuantity = ({ item }: Props) => {
  const dispatch = useDispatch()

  const onIncreaseItemQTY = () => {
    dispatch(increaseItemQTY({ ...item }))
  }
  const onDecreaseItemQTY = () => {
    dispatch(decreaseItemQTY({ ...item }))
  }

  return (
    <div className={style.wrapper}>
      <button
        type="button"
        className={style.button}
        onClick={onDecreaseItemQTY}
      >
        <MinusIcon className={style.icon} />
      </button>
      <div className={style.quantity}>{item.cartQuantity}</div>
      <button
        type="button"
        className={style.button}
        onClick={onIncreaseItemQTY}
      >
        <PlusIcon className={style.icon} />
      </button>
    </div>
  )
}

const style = {
  wrapper: `flex items-center justify-between md:w-[100px] w-[150px]`,
  button: `bg-zinc-900 rounded-sm w-6 h-6 lg:w-5 lg:h-5 flex items-center justify-center active:scale-110`,
  icon: `w-5 h-5 lg:w-4 lg:h-4 text-white stroke-[2]`,
  quantity: `bg-zinc-900 rounded-sm text-white font-medium lg:text-xs w-7 h-6 lg:w-6 lg:h-5 flex items-center justify-center`,
}
