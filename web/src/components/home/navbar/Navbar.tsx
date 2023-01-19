import {
  MagnifyingGlassCircleIcon,
  HeartIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import { UserCircleIcon as LoggedUser } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../assets/logo.png'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
  openCart,
  selectCartTotalQuantity,
} from '../../../store/slices/CartSlice'
import { selectCurrentConsumer } from '../../../store/slices/ConsumerSlice'

interface Props {}

export const Navbar = (props: Props) => {
  const [scrollingPage, setScrollingPage] = useState(false)
  const dispatch = useAppDispatch()
  const totalQuantity = useAppSelector(selectCartTotalQuantity)
  const currentConsumer = useAppSelector(selectCurrentConsumer)

  const onCartToggle = () => {
    document.getElementById('body')!.style.overflow = 'hidden'
    dispatch(openCart())
  }

  const onNavPageScroll = () => {
    if (window.scrollY > 30) {
      setScrollingPage(true)
    } else {
      setScrollingPage(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', onNavPageScroll)

    return () => {
      window.removeEventListener('scroll', onNavPageScroll)
    }
  }, [])

  return (
    <header
      className={
        !scrollingPage
          ? 'absolute top-7 inset-x-0 opacity-100 z-50'
          : 'blurEffectTheme pt-[18px] fixed inset-x-0 h-[60px] opacity-100 z-[500]'
      }
    >
      <nav className="max-w-7xl px-4 mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={logo}
            alt="nike/img"
            className={`${scrollingPage && 'filter brightness-0'} w-16 h-auto`}
          />
        </div>
        <ul className="flex items-center justify-center gap-2">
          <li className="grid items-center">
            <MagnifyingGlassCircleIcon
              className={`${
                scrollingPage && 'text-black transition-all duration-300'
              } iconStyle`}
            />
          </li>
          <li className="grid items-center">
            <HeartIcon
              className={`${
                scrollingPage && 'text-black transition-all duration-300'
              } iconStyle`}
            />
          </li>
          {currentConsumer ? (
            <Link to="/" className="grid items-center">
              <LoggedUser
                className={`${
                  scrollingPage && 'text-black transition-all duration-300'
                } iconStyle`}
              />
            </Link>
          ) : (
            <Link to="/login" className="grid items-center">
              <UserCircleIcon
                className={`${
                  scrollingPage && 'text-black transition-all duration-300'
                } iconStyle`}
              />
            </Link>
          )}
          <li className="grid items-center">
            <button
              onClick={onCartToggle}
              type="button"
              className="border-none outline-none active:scale-110 transition-all duration-300 relative"
            >
              <ShoppingBagIcon
                className={`${
                  scrollingPage && 'text-black transition-all duration-300'
                } iconStyle`}
              />
              <div
                className={`${
                  scrollingPage
                    ? 'bg-black text-white'
                    : 'bg-white text-black'
                } absolute top-4 right-0 w-4 h-4 text-[0.65rem] leading-tight font-medium rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300`}
              >
                {totalQuantity}
              </div>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}
