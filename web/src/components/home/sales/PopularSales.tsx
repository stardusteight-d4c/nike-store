import { SalesItem } from './integrate/SalesItem'

interface Props {
  popularSales: Product[]
}

export const PopularSales = ({ popularSales }: Props) => {
  return (
    <div>
      <h2 className="text-3xl text-zinc-900 font-medium mb-16 pl-2 border-l-4 border-l-zinc-900">
        Popular sales
      </h2>
      <div className="grid grid-cols-3 gap-x-4">
        {popularSales.map((product) => (
          <div className="col-span-1">
            <SalesItem product={product} isFeaturedItem={true} />
          </div>
        ))}
      </div>
    </div>
  )
}
