import { SocialLink } from './integrate/SocialLink'
import heroImg from '../../../assets/hero-img.png'
import { socialLinks } from '../../../mock-data/data'

interface Props {}

export const Hero = (props: Props) => {
  return (
    <div className="relative h-fit w-auto flex flex-col">
      <div className="nikeContainer relative opacity-100 z-20 grid items-center justify-items-center">
        <div className="grid items-center justify-items-center mt-28 md:mt-24">
          <h1 className="text-6xl mb-4 lg:text-5xl md:text-4xl sm:text-3xl xsm:text-2xl font-extrabold filter drop-shadow-sm text-white">
            Nike Air Force,
          </h1>
          <h2 className="text-6xl lg:text-5xl md:text-4xl sm:text-3xl xsm:text-2xl font-extrabold filter drop-shadow-sm text-white">
            For Hard Landings.
          </h2>
          <button
            type="button"
            className="buttonTheme bg-white !py-1.5 !rounded-full hover:brightness-90 my-5"
          >
            Explore Product
          </button>
          <div className="grid items-center gap-5 md:gap-3 absolute top-[33vh] lg:top-[27vh] left-[11%] xl:left-0 w-auto h-auto"></div>
          <div className="grid items-center absolute top-[200px] lg:top-[27vh] -right-8 space-y-4 z-50">
            {socialLinks?.map((link, index) => (
              <SocialLink key={index} icon={link.icon} />
            ))}
          </div>
        </div>
        <div>
          <img
            src={heroImg}
            alt="hero/img"
            className="transitionTheme  w-auto  max-w-[700px] max-h-[350px] h-[45vh] lg:h-[35vh] md:h-[31vh] sm:h-[21vh] xsm:h-[19vh] rotate-[15deg] hover:rotate-0 cursor-pointer object-fill"
          />
        </div>
      </div>
    </div>
  )
}
