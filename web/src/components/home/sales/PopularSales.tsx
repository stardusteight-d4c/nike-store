import { PopularSalesItem } from './integrate/PopularSalesItem'

interface Props {
  popularSales: Product[]
}

export const PopularSales = ({ popularSales }: Props) => {
  return (
    <div>
      <h2 className="text-3xl text-zinc-900 font-medium mb-16 pl-2 border-l-4 border-l-zinc-900">
        Popular sales
      </h2>
      <div className="flex items-center gap-x-8 mx-auto w-fit">
        {popularSales.map((product) => (
          <PopularSalesItem product={product} />
        ))}
      </div>
    </div>
  )
}
