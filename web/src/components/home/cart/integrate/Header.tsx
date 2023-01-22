import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid'
import { TrashIcon } from '@heroicons/react/24/outline'

interface Props {
  onCartToggle: () => void
  onRemoveCartItem: () => void
  totalQuantity: any
}

export const Header = ({
  onCartToggle,
  onRemoveCartItem,
  totalQuantity,
}: Props) => {
  return (
    <header className={style.wrapper}>
      <div className={style.flexContainer}>
        <ChevronDoubleLeftIcon
          onClick={onCartToggle}
          className={style.backToStoreIcon}
        />
        <div className={style.gridContainer}>
          <h1 className={style.title}>
            Your Cart{' '}
            <span className={style.spanQuantity}>({totalQuantity} Items)</span>
          </h1>
        </div>
      </div>
      <div className={style.flexContainer}>
        <button
          type="button"
          className={style.clearItemsButton}
          onClick={onRemoveCartItem}
        >
          <TrashIcon className={style.trashIcon} />
        </button>
      </div>
    </header>
  )
}

const style = {
  wrapper: `bg-white border-b shadow-sm h-11 flex items-center justify-between px-3 sticky top-0 inset-x-0 w-full`,
  flexContainer: `flex items-center`,
  backToStoreIcon: `w-5 h-5 mr-3 cursor-pointer text-zinc-900 hover:text-blue-500 stroke-[2]`,
  gridContainer: `grid items-center`,
  title: `text-base font-medium text-zinc-900`,
  spanQuantity: `bg-zinc-900 rounded-full px-2 py-0.5 text-slate-100 font-medium text-xs`,
  clearItemsButton: `text-zinc-900 shadow ring-inset hover:scale-105 transition-all font-thin active:scale-90 p-0.5`,
  trashIcon: `w-5 h-5`,
}
