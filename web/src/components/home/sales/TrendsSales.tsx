import { ChevronDoubleDownIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { SalesItem } from './integrate/SalesItem'

interface Props {
  trendsSales: Product[]
}

export const TrendsSales = ({ trendsSales }: Props) => {
  return (
    <div className="mb-16">
      <h2 className="text-3xl text-zinc-900 font-medium mb-16 pl-2 border-l-4 border-l-zinc-900">
        Trends
      </h2>
      <div className="grid grid-cols-4 gap-x-8 gap-y-12">
        {trendsSales.map((product) => (
          <div className="col-span-1">
            <SalesItem product={product} />
          </div>
        ))}
      </div>
      <span className="mx-auto w-fit flex flex-col items-center justify-center gap-y-2 mt-14 cursor-pointer">
        See More
        <ChevronDoubleDownIcon className="w-5 animate-bounce" />
      </span>
    </div>
  )
}
