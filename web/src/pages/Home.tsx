import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import {
  MainSection,
  Hero,
  Sales,
  Stories,
  Footer,
  Navbar,
  Cart,
} from '../components'
import { useGetProductsByCategoryQuery } from '../graphql/generated'
import {
  heroApi,
  highlight,
  sneaker,
  popularSales,
  topRateSales,
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
  const { data: firstQuery } = useGetProductsByCategoryQuery({
    variables: { category: 'popularSales' },
  })
  const { data: secondQuery } = useGetProductsByCategoryQuery({
    variables: { category: 'topRateSales' },
  })

  // 


  const popularSalesCMS: any = {
    title: 'Popular Sales',
    items: firstQuery?.products,
  }

  const topRateSalesCMS: any = {
    title: 'Top Rated Sales',
    items: secondQuery?.products,
  }


  useEffect(() => {
    if (sessionId) {
      ;(async () => {
        const products = await fetchLineItems(sessionId)
        if (products) {
          // Mandar para o banco de dados nome - email - endereço - diminuir estoque dos produtos de
          // acordo com o produto e quantidade do produto comprado

          // limpar storage de products items

          // fazer perfil com as compras realizadas

          toast.success('successful purchase')
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
        <Sales sales={popularSalesCMS || popularSales} isFeaturedItem />
        <MainSection data={highlight} reverse />
        <Sales sales={topRateSalesCMS || topRateSales} />
        <MainSection data={sneaker} />
        <Stories story={story} />
      </main>
      <Footer footerData={footerData} />
    </div>
  )
}
