import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { Hero, Stories, Footer, Navbar, Cart } from '../components'
import { useGetProductsByCategoryQuery } from '../graphql/generated'
import {
  popularSales,
  trendsSales,
  stories,
  footerData,
} from '../mock-data/data'
import { useAppSelector } from '../store/hooks'
import { selectCurrentConsumer } from '../store/slices/ConsumerSlice'
import { fetchLineItems } from '../utils/fetchLineItems'
import backgroud from '../assets/background.jpeg'
import { PopularSales } from '../components/home/sales/PopularSales'
import { Highlight } from '../components/home/mainSection/Highlight'
import { TrendsSales } from '../components/home/sales/TrendsSales'
import { Featured } from '../components/home/mainSection/Featured'

interface Props {}

export const Home = (props: Props) => {
  const urlParams = new URLSearchParams(window.location.search)
  const sessionId = urlParams.get('session_id')
  const currentConsumer = useAppSelector(selectCurrentConsumer)
  // const { data: firstQuery } = useGetProductsByCategoryQuery({
  //   variables: { category: 'popularSales' },
  // })
  // const { data: secondQuery } = useGetProductsByCategoryQuery({
  //   variables: { category: 'topRateSales' },
  // })

  // const popularSalesCMS: any = {
  //   title: 'Popular Sales',
  //   items: firstQuery?.products,
  // }

  // const topRateSalesCMS: any = {
  //   title: 'Top Rated Sales',
  //   items: secondQuery?.products,
  // }

  useEffect(() => {
    if (sessionId) {
      if (currentConsumer !== null) {
        ;(async () => {
          const products = await fetchLineItems(sessionId, currentConsumer.id)
          if (products && currentConsumer) {

            // Mandar para o banco de dados nome - email - endereço - diminuir estoque dos produtos de
            // acordo com o produto e quantidade do produto comprado

            // limpar storage de products items

            localStorage.removeItem('cart')

            // Cheio de falha de segurança sapoura, não salve as informaçoes de preço no localStorage

            toast.success('successful purchase')
          }
        })()
      }
    }
  }, [sessionId, currentConsumer])

  return (
    <div className={style.wrapper}>
      <img src={backgroud} className={style.bannerImage} />
      <Navbar />
      <Cart />
      <main className={style.mainContentWrapper}>
        <Hero />
        <PopularSales popularSales={popularSales} />
        <Highlight />
        <TrendsSales trendsSales={trendsSales} />
        <Featured />
        <Stories stories={stories} />
      </main>
      <Footer footerData={footerData} />
    </div>
  )
}

const style = {
  wrapper: `max-w-[100vw] overflow-x-hidden`,
  bannerImage: `bgTheme w-full clipPath inset-0 max-h-[637px] lg:h-[75vh] md:h-[65vh] sm:h-[55vh] absolute z-10`,
  mainContentWrapper: `flex flex-col max-w-7xl mx-auto gap-16 relative`,
}
