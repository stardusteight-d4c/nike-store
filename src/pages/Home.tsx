import { Hero, Sales } from '../components'
import { heroApi, popularSales, topRateSales } from '../mockData/data'

interface Props {}

export const Home = (props: Props) => {
  return (
    <div>
      <main className="flex flex-col gap-16 relative">
        <Hero heroApi={heroApi} />
        <Sales sales={popularSales} />
        <Sales sales={topRateSales} />
      </main>
    </div>
  )
}
