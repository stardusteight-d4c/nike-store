import { useEffect } from 'react'
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
import { useAppSelector } from '../store/hooks'
import { selectCurrentConsumer } from '../store/slices/ConsumerSlice'
import { fetchLineItems } from '../utils/fetchLineItems'

interface Props {}

export const Home = (props: Props) => {
  const urlParams = new URLSearchParams(window.location.search)
  const sessionId = urlParams.get('session_id')
  const currentConsumer = useAppSelector(selectCurrentConsumer)

  console.log('currentConsumer', currentConsumer);
  

  useEffect(() => {
    if (sessionId) {
      ;(async () => {
        const products = await fetchLineItems(sessionId)
        if (products) {
          alert('successful purchase')
          // Mandar para o banco de dados nome - email - endereço - diminuir estoque dos produtos de
          // acordo com o produto e quantidade do produto comprado
        }
        console.log('products', products)
      })()
    }
  }, [sessionId])

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
