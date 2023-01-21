import { ChevronDoubleDownIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { SalesItem } from './integrate/SalesItem'

interface Props {
  trendsSales: Product[]
}

export const TrendsSales = ({ trendsSales }: Props) => {
  return (
    <div className={style.wrapper}>
      <h2 className={style.title}>Trends</h2>
      <div className={style.gridContaienr}>
        {trendsSales.map((product) => (
          <SalesItem key={product.id} product={product} />
        ))}
      </div>
      <span className={style.span}>
        See More
        <ChevronDoubleDownIcon className={style.chevronDoubleDownIcon} />
      </span>
    </div>
  )
}

const style = {
  wrapper: `mb-16 xl:px-2`,
  title: `text-3xl text-zinc-900 font-medium md:mb-8 mb-16 pl-2 border-l-4 border-l-zinc-900`,
  gridContaienr: `grid sm:grid-cols-1 lg:grid-cols-3 grid-cols-4 xsm:gap-x-2 md:gap-x-4 gap-x-8 gap-y-12`,
  span: `mx-auto w-fit flex flex-col items-center justify-center gap-y-2 mt-14 cursor-pointer`,
  chevronDoubleDownIcon: `w-5 animate-bounce`,
}
