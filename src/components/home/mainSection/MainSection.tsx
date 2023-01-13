import React from 'react'

interface Props {
  data: MainSection
  reverse?: boolean
}

export const MainSection = ({
  reverse,
  data: { title, heading, text, img, btn, url },
}: Props) => {
  return (
    <div
      className={`${
        reverse ? 'flex-row-reverse' : 'flex-row'
      } nikeContainer flex items-center justify-between lg:flex-col lg:justify-center`}
    >
      <div className="max-w-lg lg:max-w-none w-full md:text-center grid items-center lg:justify-items-center">
        <h1 className="textGradient text-4xl sm:text-3xl font-bold">
          {heading}
        </h1>
        <h2 className="text-5xl lg:text-4xl md:text-3xl sm:text-2xl font-bold text-slate-900 filter drop-shadow-lg">
          {title}
        </h2>
        <p className="xl:text-sm my-4 text-slate-900">{text}</p>
        <a
          href={url}
          className="flex items-center"
          target="_blank"
          role="button"
        >
          <button
            type="button"
            className="buttonTheme bg-slate-900 shadow-slate-900 text-slate-100 py-1.5"
          >
            {btn}
          </button>
        </a>
      </div>
      <div className="flex items-center justify-center max-w-xl relative lg:max-w-none w-full">
        <img
          src={img}
          alt={`${title}/img`}
          className={`${
            reverse
              ? 'h-60 lg:h-56 md:h-52 sm:h-44 xsm:h-36 rotate-6 hover:-rotate-12'
              : 'h-72 lg:h-64 md:h-60 sm:h-48 xsm:h-40 rotate-[19deg] hover:rotate-12'
          } transitionTheme w-auto object-fill`}
        />
      </div>
    </div>
  )
}
