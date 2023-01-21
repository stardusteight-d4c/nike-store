import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'
import { splideOptions } from '../utils/splideOptions'

interface Props {
  stories: Story[]
}

export const Stories = ({ stories }: Props) => {
  return (
    <div className="mb-11">
      <h2 className="text-3xl text-zinc-900 font-medium mb-16 pl-2 border-l-4 border-l-zinc-900">
        Stories
      </h2>
      <div className="mt-7">
        <Splide options={splideOptions}>
          {stories.map((story, index) => (
            <SplideSlide key={index} className="mb-0.5">
              <div className="relative grid items-center gap-4 pb-2 border">
                <div className="flex items-center justify-center">
                  <img
                    src={story.img}
                    alt={`img/story/${index}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="grid items-center justify-items-start px-4 py-2">
                  <h1 className="text-base line-clamp-1 text-zinc-900 font-medium mb-2 lg:text-sm">
                    {story.title}
                  </h1>
                  <p className="text-[#505050] lg:text-xs line-clamp-6">
                    {story.text}
                  </p>
                </div>
                <div className="flex items-center justify-center px-4 pb-4 w-full">
                  <a
                    href={story.url}
                    target="_blank"
                    role="button"
                    className="buttonTheme w-full text-center rounded-full border border-zinc-900 text-zinc-900 py-1.5"
                  >
                    Read More
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
