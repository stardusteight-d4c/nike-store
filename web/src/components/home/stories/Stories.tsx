import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'
import { StoryCard } from '../sales/integrate/StoryCard'
import { splideOptions } from '../utils/splideOptions'

interface Props {
  stories: Story[]
}

export const Stories = ({ stories }: Props) => {
  return (
    <div className={style.wrapper}>
      <h2 className={style.sectionTitle}>Stories</h2>
      <Splide options={splideOptions}>
        {stories.map((story, index) => (
          <SplideSlide key={`${story.title}-${index}`}>
            <StoryCard story={story} />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  )
}

const style = {
  wrapper: `mb-11`,
  sectionTitle: `text-3xl md:mx-2 px-2 text-zinc-900 font-medium md:mb-8 mb-16 border-l-4 border-l-zinc-900`,
}
