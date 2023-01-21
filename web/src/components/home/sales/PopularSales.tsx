import { SalesItem } from './integrate/SalesItem'

interface Props {
  popularSales: Product[]
}

export const PopularSales = ({ popularSales }: Props) => {
  return (
    <div className={style.wrapper}>
      <h2 className={style.sectionTitle}>Popular sales</h2>
      <div className={style.gridContainer}>
        {popularSales.map((product) => (
          <SalesItem key={product.id} product={product} isFeaturedItem={true} />
        ))}
      </div>
    </div>
  )
}

const style = {
  wrapper: `md:mt-40 xl:px-2 `,
  sectionTitle: `text-3xl text-zinc-900 font-medium md:mb-8 mb-16 pl-2 border-l-4 border-l-zinc-900`,
  gridContainer: `grid md:grid-cols-1 grid-cols-3 md:gap-y-4 gap-x-4`,
}
