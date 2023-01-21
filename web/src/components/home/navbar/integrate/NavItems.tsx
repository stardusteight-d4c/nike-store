import {
  MagnifyingGlassCircleIcon,
  HeartIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import { UserCircleIcon as LoggedUser } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { openCart, selectCartTotalQuantity } from '@/store/slices/CartSlice'
import { selectCurrentConsumer } from '@/store/slices/ConsumerSlice'
import { ListItem } from './ListItem'

interface Props {
  scrollingPage: boolean
}

export const NavItems = ({ scrollingPage }: Props) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const totalQuantity = useAppSelector(selectCartTotalQuantity)
  const currentConsumer = useAppSelector(selectCurrentConsumer)

  const onCartToggle = () => {
    document.getElementById('body')!.style.overflow = 'hidden'
    dispatch(openCart())
  }

  return (
    <ul className={style.wrapper}>
      <ListItem
        Icon={MagnifyingGlassCircleIcon}
        scrollingPage={scrollingPage}
      />
      <ListItem Icon={HeartIcon} scrollingPage={scrollingPage} />
      {currentConsumer ? (
        <ListItem
          Icon={LoggedUser}
          scrollingPage={scrollingPage}
          onClick={() => navigate('/')}
        />
      ) : (
        <ListItem
          Icon={UserCircleIcon}
          scrollingPage={scrollingPage}
          onClick={() => navigate('/login')}
        />
      )}

      <ListItem
        Icon={ShoppingBagIcon}
        scrollingPage={scrollingPage}
        onClick={() => onCartToggle()}
        style={{ position: 'relative' }}
      >
        <div className={style.handleTotalQuantity(scrollingPage)}>
          {totalQuantity}
        </div>
      </ListItem>
    </ul>
  )
}

const style = {
  wrapper: `flex items-center justify-center gap-2`,
  defaultStyleQTY: `absolute top-4 right-0 w-4 h-4 text-[0.65rem] leading-tight font-medium rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300`,
  handleTotalQuantity: (scrolling: boolean) => {
    return `${
      scrolling
        ? `bg-zinc-900 text-white ${style.defaultStyleQTY}`
        : `bg-white text-zinc-900 ${style.defaultStyleQTY}`
    }`
  },
}
