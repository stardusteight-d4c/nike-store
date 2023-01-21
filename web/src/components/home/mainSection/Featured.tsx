import React from 'react'
import featuredImg from '../../../assets/featured-img.png'


interface Props {}

export const Featured = (props: Props) => {
  return (
    <div className="flex-row mb-24 flex items-center justify-between lg:flex-col lg:justify-center">
      <div className="max-w-lg lg:max-w-none w-full md:text-center grid items-center lg:justify-items-center">
        <h1 className="textGradient mb-2 tracking-wide text-lg sm:text-3xl">
          Get right into the game with this release
        </h1>
        <h2 className="text-5xl leading-[55px] lg:text-4xl md:text-3xl sm:text-2xl font-bold text-zinc-900">
          Nike PG 5 PlayStation 5 Colorway
        </h2>
        <p className="xl:text-sm text-lg font-light my-4 text-zinc-900">
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
          className="flex items-center"
          target="_blank"
          role="button"
        >
          <button
            type="button"
            className="buttonTheme !py-1.5 !rounded-full bg-zinc-900 text-slate-100"
          >
            Buy Now
          </button>
        </a>
      </div>
      <div className="flex items-center justify-center max-w-xl relative lg:max-w-none w-full">
        <img
          src={featuredImg}
          alt=""
          className="h-80 lg:h-64 md:h-60 sm:h-48 xsm:h-40 border object-fill"
        />
      </div>
    </div>
  )
}
