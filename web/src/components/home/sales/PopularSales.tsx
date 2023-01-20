import { PopularSalesItem } from './integrate/PopularSalesItem'

interface Props {
  popularSales: Product[]
}

export const PopularSales = ({ popularSales }: Props) => {
  return (
    <div>
      <h2 className="text-3xl font-medium mb-8 pl-2 border-l-4 border-l-black">
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
