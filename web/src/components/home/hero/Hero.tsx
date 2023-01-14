import React from 'react'
import { Clips } from './integrate/Clips'
import { SocialLink } from './integrate/SocialLink'

interface Props {
  heroApi: HeroApi
}

export const Hero = ({
  heroApi: { title, subtitle, btntext, img, sociallinks, videos },
}: Props) => {
  return (
    <div className="relative h-auto w-auto flex flex-col">
      <div className="bgTheme clipPath h-[85vh] lg:h-[75vh] md:h-[65vh] sm:h-[55vh] w-auto absolute top-0 inset-x-0 opacity-100 z-10"></div>
      <div className="nikeContainer relative opacity-100 z-20 grid items-center justify-items-center">
        <div className="grid items-center justify-items-center mt-28 md:mt-24">
          <h1 className="text-6xl lg:text-5xl md:text-4xl sm:text-3xl xsm:text-2xl font-extrabold filter drop-shadow-sm text-slate-200">
            {title}
          </h1>
          <h2 className="text-6xl lg:text-5xl md:text-4xl sm:text-3xl xsm:text-2xl font-extrabold filter drop-shadow-sm text-slate-200">
            {subtitle}
          </h2>
          <button
            type="button"
            className="buttonTheme bg-slate-200 shadow-slate-200 rounded-xl my-5"
          >
            {btntext}
          </button>
          <div className="grid items-center gap-5 md:gap-3 absolute top-[33vh] lg:top-[27vh] left-[11%] xl:left-0 w-auto h-auto">
            {videos?.map((video, index) => (
              <Clips key={index} imgsrc={video.imgsrc} clip={video.clip} />
            ))}
          </div>
          <div className="grid items-center absolute top-[33vh] lg:top-[27vh] right-0 gap-3 z-50">
            {sociallinks?.map((link, index) => (
              <SocialLink key={index} icon={link.icon} />
            ))}
          </div>
        </div>
        <div>
          <img
            src={img}
            alt="hero/img"
            className="transitionTheme -rotate-[25deg] hover:rotate-0 cursor-pointer object-fill w-auto h-[45vh] lg:h-[35vh] md:h-[31vh] sm:h-[21vh] xsm:h-[19vh] "
          />
        </div>
      </div>
    </div>
  )
}
