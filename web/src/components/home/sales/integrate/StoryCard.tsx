import React from 'react'

interface Props {
  story: Story
}

export const StoryCard = ({ story: { img, text, title, url } }: Props) => {
  return (
    <div className={style.wrapper}>
      <img src={img} alt={`img/${title}`} className={style.img} />
      <div className={style.gridContentText}>
        <h1 className={style.title}>{title}</h1>
        <p className={style.text}>{text}</p>
      </div>
      <div className={style.linkContainer}>
        <a href={url} target="_blank" role="button" className={style.link}>
          Read More
        </a>
      </div>
    </div>
  )
}

const style = {
  wrapper: `relative grid items-center gap-4 pb-2 border`,
  img: `w-full h-full object-cover`,
  gridContentText: `grid items-center justify-items-start px-4 py-2`,
  title: `text-base line-clamp-1 text-zinc-900 font-medium mb-2 lg:text-sm`,
  text: `text-[#505050] lg:text-xs line-clamp-6`,
  linkContainer: `flex items-center justify-center px-4 pb-4 w-full`,
  link: `buttonTheme w-full text-center rounded-full border border-zinc-900 text-zinc-900 py-1.5`,
}
