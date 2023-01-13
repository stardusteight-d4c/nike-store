import React from 'react'
import { PlayIcon } from '@heroicons/react/24/solid'

interface Props {
  imgsrc: string
  clip: string
}

export const Clips = ({ imgsrc, clip }: Props) => {
  return (
    <div className="relative h-28 lg:h-24 md:h-20 sm:h-14  w-32 lg:w-28 md:w-24 sm:w-16 rounded-xl overflow-hidden group cursor-pointer transition-all from-neutral-300">
      <img
        src={imgsrc}
        alt="clips/img"
        className="inset-0 flex h-full w-full object-cover absolute rounded-xl opacity-100 z-10 transition-opacity duration-500"
      />
      <div className="blurEffectTheme bg-white absolute inset-x-0 top-11 left-11 lg:top-8 lg:left-9 sm:top-4 sm:left-5 opacity-100 z-[100] w-8 h-8 md:w-5 md:h-5 flex items-center justify-center rounded-full">
        <PlayIcon className="iconStyle text-slate-900 md:w-3 md:h-3" />
      </div>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-x-0 top-0 flex h-full w-full object-cover opacity-0 z-0 group-hover:opacity-100 group-hover:z-50 rounded-xl"
      >
        <source type="video/mp4" src={clip} />
      </video>
    </div>
  )
}
