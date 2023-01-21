import featuredImg from '../../../assets/featured.png'

interface Props {}

export const Featured = (props: Props) => {
  return (
    <div className={style.wrapper}>
      <div className={style.textContentContainer}>
        <h2 className={style.headerTitle}>
          Get right into the game with this release
        </h2>
        <h1 className={style.title}>Nike PG 5 PlayStation 5 Colorway</h1>
        <p className={style.text}>
          The PlayStation x Nike PG 5 continues Paul George's creative
          partnership with his favorite gaming brand. The athlete's fifth
          signature shoe takes direct inspiration from the PlayStation 5,
          featuring a white textile upper with contrasting black and royal blue
          accents. A PlayStation logo lands on the shoe's right tongue, while
          tonal graphics on the forefoot and buttons reflect symbols found on
          the DualSense wireless controller.
        </p>
        <a
          href="https://opensea.io/collection/rtfkt-nike-cryptokicks"
          className={style.link}
          target="_blank"
          role="button"
        >
          <button type="button" className={style.callToActionButton}>
            Buy Now
          </button>
        </a>
      </div>
      <div className={style.imgContainer}>
        <img src={featuredImg} className={style.img} />
      </div>
    </div>
  )
}

const style = {
  wrapper: `flex-row mb-24 mx-auto w-full xl:px-2 flex items-center justify-between lg:flex-col-reverse lg:justify-center`,
  textContentContainer: `max-w-lg lg:max-w-none w-full md:text-center grid items-center lg:justify-items-center`,
  headerTitle: `textGradient mb-2 tracking-wide text-lg sm:text-3xl`,
  title: `text-5xl leading-[55px] lg:text-4xl md:text-3xl sm:text-2xl font-bold text-zinc-900`,
  text: `xl:text-sm text-lg font-light my-4 text-zinc-900`,
  link: `flex items-center`,
  callToActionButton: `buttonTheme !py-1.5 !rounded-full bg-zinc-900 text-slate-100`,
  imgContainer: `flex items-center justify-center max-w-xl relative lg:mb-8 lg:max-w-none`,
  img: `h-80 lg:h-64 md:h-60 sm:h-48 xsm:h-40 border object-fill`,
}
