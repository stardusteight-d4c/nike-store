import nikeGif from '../../../assets/highlight.gif'

interface Props {}

export const Highlight = (props: Props) => {
  return (
    <div className={style.wrapper}>
      <div className={style.imgContainer}>
        <img src={nikeGif} className={style.img} />
      </div>
      <div className={style.textContentContainer}>
        <h2 className={style.headerTitle}>
          Build the Future with Non Fungible Tokens
        </h2>
        <h1 className={style.title}>RTFKT x Nike Dunk Genesis CRYPTOKICKS</h1>
        <p className={style.text}>
          The collection was launched on NFT marketplace OpenSea, with the
          digital sneakers generating approximately 3,100 Ethereum ($8,720,000)
          in trade volume in just a few days.
        </p>
        <a
          href="https://opensea.io/collection/rtfkt-nike-cryptokicks"
          className={style.link}
          target="_blank"
          role="button"
        >
          <button type="button" className={style.callToActionButton}>
            See Collection
          </button>
        </a>
      </div>
    </div>
  )
}

const style = {
  wrapper: `flex-row lg:space-y-16 my-24 flex items-center justify-between lg:flex-col lg:justify-center`,
  imgContainer: `flex items-center justify-center max-w-xl relative lg:max-w-none w-full`,
  img: `h-72 lg:h-64 md:h-60 sm:h-48 xsm:h-40 rotate-[-5deg] w-auto object-fill`,
  textContentContainer: `max-w-lg lg:px-8 md:px-2 lg:max-w-2xl md:max-w-md w-full lg:text-center grid items-center lg:justify-items-center`,
  headerTitle: `textGradient mb-2 tracking-wide text-lg md:text-2xl sm:text-2xl`,
  title: `text-5xl leading-[55px] lg:text-4xl md:text-4xl sm:text-4xl font-bold text-zinc-900`,
  text: `xl:text-sm text-lg font-light my-4 text-zinc-900`,
  link: `flex items-center`,
  callToActionButton: `buttonTheme !py-1.5 !rounded-full bg-zinc-900 text-slate-100`,
}
