import { ArrowLeftIcon } from '@heroicons/react/24/solid'

interface Props {
  onCartToggle: () => void
}

export const CartEmpty = ({ onCartToggle }: Props) => {
  return (
    <div className={style.wrapper}>
      <span className={style.span}>Your shopping cart is empty</span>
      <button type="button" className={style.button} onClick={onCartToggle}>
        <ArrowLeftIcon className={style.icon} />
        <span>Back To Nike Store</span>
      </button>
    </div>
  )
}

const style = {
  wrapper: `flex items-center justify-center flex-col h-[81vh] px-11 text-center gap-7`,
  span: `text-lg`,
  button: `rounded-full text-zinc-900 flex items-center justify-center px-4 py-1.5 bg-transparent border border-zinc-500 gap-3 text-sm font-semibold active:scale-110`,
  icon: `w-5 h-5`,
}
