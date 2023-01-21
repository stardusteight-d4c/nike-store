import { SocialLink } from './integrate/SocialLink'
import heroImg from '../../../assets/hero-img.png'
import { socialLinks } from '../../../mock-data/data'

interface Props {}

export const Hero = (props: Props) => {
  return (
    <div className={style.wrapper}>
      <div className={style.gridWrapper}>
        <div className={style.gridContainer}>
          <h1 className={style.title}>Nike Air Force,</h1>
          <h2 className={style.subtitle}>For Hard Landings.</h2>
          <button type="button" className={style.callToActionButton}>
            Explore Product
          </button>
          <div className={style.socialContainer}>
            {socialLinks?.map((link, index) => (
              <SocialLink key={index} icon={link.icon} />
            ))}
          </div>
        </div>
        <div>
          <img src={heroImg} alt="hero/img" className={style.heroImage} />
        </div>
      </div>
    </div>
  )
}

const style = {
  wrapper: `relative h-fit w-auto flex flex-col`,
  gridWrapper: `nikeContainer relative z-20 grid items-center justify-items-center`,
  gridContainer: `grid md:mt-16 mt-28 items-center justify-items-center`,
  title: `text-6xl mb-4 lg:text-5xl md:text-4xl sm:text-3xl xsm:text-2xl font-extrabold filter drop-shadow-sm text-white`,
  subtitle: `text-6xl lg:text-5xl md:text-4xl sm:text-3xl xsm:text-2xl font-extrabold filter drop-shadow-sm text-white`,
  callToActionButton: `buttonTheme bg-white !py-1.5 !rounded-full hover:brightness-90 my-5`,
  socialContainer: `grid items-center md:hidden absolute top-[200px] lg:top-[27vh] lg:-right-4 -right-8 space-y-4 z-50`,
  heroImage: `transitionTheme w-auto max-w-[700px] max-h-[350px] h-[45vh] lg:h-[35vh] md:h-[31vh] sm:h-[21vh] xsm:h-[19vh] rotate-[15deg] hover:rotate-0 cursor-pointer object-fill`,
}
