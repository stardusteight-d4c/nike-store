import React from 'react'
import { SectionTitle } from '../utils/SectionTitle'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { HashtagIcon, HeartIcon } from '@heroicons/react/24/solid'
import { ClockIcon } from '@heroicons/react/24/outline'
import { truncate } from 'lodash'
import { splideOptions } from '../utils/splideOptions'

interface Props {
  story: Story
}

export const Stories = ({ story: { title, news } }: Props) => {
  return (
    <div className="nikeContainer mb-11">
      <SectionTitle title={title} />
      <div className="mt-7">
        <Splide options={splideOptions}>
          {news.map((item, index) => (
            <SplideSlide key={index} className="mb-0.5">
              <div className="relative grid items-center gap-4 pb-2 rounded-lg shadow shadow-slate-200 ring-1 ring-slate-200">
                <div className="flex items-center justify-center">
                  <img
                    src={item.img}
                    alt={`img/story/${index}`}
                    className="w-full h-auto object-cover shadow-md shadow-slate-200 rounded-tl-lg rounded-tr-lg"
                  />
                </div>
                <div className="flex items-center justify-between w-full px-4">
                  <div className="flex items-center gap-0.5">
                    <HeartIcon className="iconStyle text-red-500 w-5 h-5" />
                    <span className="text-xs font-bold">{item.like}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <ClockIcon className="iconStyle w-4 h-4 text-black" />
                    <span className="text-xs font-bold">{item.time}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <HashtagIcon className="iconStyle text-blue-600" />
                    <span className="text-xs font-bold text-blue-600">
                      {item.by}
                    </span>
                  </div>
                </div>
                <div className="grid items-center justify-items-start px-4">
                  <h1 className="text-base font-semibold lg:text-sm">
                    {item.title}
                  </h1>
                  <p className="text-sm text-justify lg:text-xs">
                    {truncate(item.text, { length: 175 })}
                  </p>
                </div>
                <div className="flex items-center justify-center px-4 w-full">
                  <a
                    href={item.url}
                    target="_blank"
                    role="button"
                    className="buttonTheme w-full bg-gradient-to-b from-slate-900 to-black shadow-md shadow-black text-center text-slate-100 py-1.5"
                  >
                    {item.btn}
                  </a>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  )
}
