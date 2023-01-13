import React from 'react'
import { SectionTitle } from '../utils/SectionTitle'
import { Item } from './integrate/Item'

interface Props {
  sales: Sale
}

export const Sales = ({ sales: { title, items } }: Props) => {
  return (
    <div className="nikeContainer">
      <SectionTitle title={title} />
      <div className="grid items-center justify-items-center grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-7 lg:gap-5 mt-7">
        {items?.map((item, index) => (
          <Item key={index} {...item} />
        ))}
      </div>
    </div>
  )
}
