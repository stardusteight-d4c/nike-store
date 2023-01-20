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
import backgroud from '../assets/background.jpeg'
import { PopularSales } from '../components/home/sales/PopularSales'
import { Highlight } from '../components/home/mainSection/Highlight'

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
      if (currentConsumer !== null) {
        ;(async () => {
          const products = await fetchLineItems(sessionId, currentConsumer.id)
          if (products && currentConsumer) {
            console.log('products', products)

            // Mandar para o banco de dados nome - email - endereço - diminuir estoque dos produtos de
            // acordo com o produto e quantidade do produto comprado

            // limpar storage de products items

            localStorage.removeItem('cart')

            // Cheio de falha de segurança sapoura, não salve as informaçoes de preço no localStorage

            toast.success('successful purchase')
          }
          console.log('products', products)
        })()
      }
    }
  }, [sessionId, currentConsumer])

  return (
    <div className="w-screen">
      <img
        src={backgroud}
        className="bgTheme w-full clipPath inset-0 max-h-[637px] absolute z-10"
      />
      <Navbar />
      <Cart />
      <main className="flex flex-col max-w-7xl mx-auto gap-16 relative">
        <Hero />
        {/* <Sales
          sales={popularSalesCMS.items ? popularSalesCMS : popularSales}
          isFeaturedItem
        /> */}
        <PopularSales popularSales={popularSales} />
        <Highlight />
        {/* <MainSection data={highlight} reverse /> */}
        <Sales sales={topRateSalesCMS.items ? topRateSalesCMS : topRateSales} />
        <MainSection data={sneaker} />
        <Stories story={story} />
      </main>
      {/* <Footer footerData={footerData} /> */}
    </div>
  )
}
