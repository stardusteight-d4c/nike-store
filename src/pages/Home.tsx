import {
  MainSection,
  Hero,
  Sales,
  Stories,
  Footer,
  Navbar,
  Cart,
} from '../components'
import {
  heroApi,
  popularSales,
  topRateSales,
  highlight,
  sneaker,
  story,
  footerData,
} from '../mockData/data'

interface Props {}

export const Home = (props: Props) => {
  return (
    <div>
      <Navbar />
      <Cart />
      <main className="flex flex-col gap-16 relative">
        <Hero heroApi={heroApi} />
        <Sales sales={popularSales} isFeaturedItem />
        <MainSection data={highlight} reverse />
        <Sales sales={topRateSales} />
        <MainSection data={sneaker} />
        <Stories story={story} />
      </main>
      <Footer footerData={footerData} />
    </div>
  )
}
