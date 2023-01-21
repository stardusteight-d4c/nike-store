import { useEffect, useState } from 'react'
import logo from '@/assets/logo.png'
import { NavItems } from './integrate/NavItems'

interface Props {}

export const Navbar = (props: Props) => {
  const [scrollingPage, setScrollingPage] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', onNavPageScroll)
    return () => {
      window.removeEventListener('scroll', onNavPageScroll)
    }
  }, [])

  const onNavPageScroll = () => {
    if (window.scrollY > 30) {
      setScrollingPage(true)
    } else {
      setScrollingPage(false)
    }
  }

  return (
    <header className={style.handleWrapper(scrollingPage)}>
      <nav className={style.navContainer}>
        <div className={style.logoContainer}>
          <img
            src={logo}
            alt="nike/logo"
            className={style.handleLogo(scrollingPage)}
          />
        </div>
        <NavItems scrollingPage={scrollingPage} />
      </nav>
    </header>
  )
}

const style = {
  handleWrapper: (scrolling: boolean) => {
    return scrolling
      ? 'bg-[#f7f7f7] pt-[18px] fixed inset-x-0 h-[60px] opacity-100 z-[500]'
      : 'absolute top-7 inset-x-0 opacity-100 z-50'
  },
  navContainer: `max-w-7xl px-4 mx-auto flex items-center justify-between`,
  logoContainer: `flex items-center`,
  handleLogo: (scrolling: boolean) => {
    return scrolling === true
      ? 'filter brightness-0 w-16 h-auto'
      : ' w-16 h-auto'
  },
}
