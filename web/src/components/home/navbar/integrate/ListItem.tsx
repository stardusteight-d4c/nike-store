import React, { HTMLAttributes, LiHTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLLIElement> {
  Icon: React.ElementType
  scrollingPage: boolean
  children?: React.ReactNode
}

export const ListItem = ({
  Icon,
  scrollingPage,
  children,
  ...props
}: Props) => {
  return (
    <li className={style.wrapper} {...props}>
      <Icon className={style.handleIconColors(scrollingPage)} />
      {children}
    </li>
  )
}

const style = {
  wrapper: `grid items-center`,
  handleIconColors: (scrolling: boolean) => {
    return `iconStyle ${
      scrolling && 'text-zinc-900 transition-all duration-300'
    }`
  },
}
