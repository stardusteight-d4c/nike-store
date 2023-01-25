import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Hero, Stories, Footer, Navbar, Cart } from '../components'
import { useGetProductsByCategoryQuery } from '../graphql/generated'
import {
  popularSales as popularSalesMOCKED,
  trendsSales as trendsSalesMOCKED,
  stories,
  footerData,
} from '../mock-data/data'
import { useAppSelector } from '../store/hooks'
import { selectCurrentConsumer } from '../store/slices/ConsumerSlice'
import { makePurchase } from '../utils/makePurchase'
import backgroud from '../assets/background.jpeg'
import { PopularSales } from '../components/home/sales/PopularSales'
import { Highlight } from '../components/home/mainSection/Highlight'
import { TrendsSales } from '../components/home/sales/TrendsSales'
import { Featured } from '../components/home/mainSection/Featured'
import { toAppMapper } from '@/utils/cmsToAppMapper'

interface Props {}

export const Home = (props: Props) => {
  const urlParams = new URLSearchParams(window.location.search)
  const sessionId = urlParams.get('session_id')
  const currentConsumer = useAppSelector(selectCurrentConsumer)
  const { data: popularSales } = useGetProductsByCategoryQuery({
    variables: { category: 'popularSales' },
  })
  const { data: trendsSales } = useGetProductsByCategoryQuery({
    variables: { category: 'trendsSales' },
  })

  const popularSalesCMS: Product[] =
    (popularSales &&
      popularSales!.products.map((product) => toAppMapper(product))) ||
    []

  const trendsSalesCMS: Product[] =
    (trendsSales &&
      trendsSales!.products.map((product) => toAppMapper(product))) ||
    []

  useEffect(() => {
    if (sessionId) {
      if (currentConsumer !== null) {
        ;(async () => {
          const products = await makePurchase(sessionId, currentConsumer.id)
          if (products && currentConsumer) {
            localStorage.removeItem('cart')
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
        <PopularSales popularSales={popularSalesCMS || popularSalesMOCKED} />
        <Highlight />
        <TrendsSales trendsSales={trendsSalesCMS || trendsSalesMOCKED} />
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
