import { MainSection, Hero, Sales, Stories } from '../components'
import {
  heroApi,
  popularSales,
  topRateSales,
  highlight,
  sneaker,
  story,
} from '../mockData/data'

interface Props {}

export const Home = (props: Props) => {
  return (
    <div>
      <main className="flex flex-col gap-16 relative">
        <Hero heroApi={heroApi} />
        <Sales sales={popularSales} isFeaturedItem />
        <MainSection data={highlight} reverse />
        <Sales sales={topRateSales} />
        <MainSection data={sneaker} />
        <Stories story={story} />
      </main>
    </div>
  )
}
