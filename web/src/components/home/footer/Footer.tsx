interface Props {
  footerData: Footer
}

export const Footer = ({ footerData: { titles, links } }: Props) => {
  return (
    <footer className={style.wrapper}>
      <div className={style.gridContainer}>
        {titles.map((item, index) => (
          <div key={`${item.title}-${index}`} className={style.titleContainer}>
            <h1 className={style.title}>{item.title}</h1>
          </div>
        ))}
        {links.map((linksList, index) => (
          <ul key={index} className={style.unorderedList}>
            {linksList.map((link, index) => (
              <li key={`${link.link}-${index}`} className={style.listItem}>
                {link.link}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </footer>
  )
}

const style = {
  wrapper: `bg-zinc-900 w-screen py-16 mt-16 flex items-center justify-center`,
  gridContainer: `grid max-w-3xl text-white grid-cols-3 md:max-w-none md:gap-x-2 xl:gap-x-10 gap-x-20 mx-auto w-fit`,
  titleContainer: `col-span-1 flex flex-col mb-2 md:items-center items-start`,
  title: `text-lg border-b-2 border-white mb-4 lg:text-base md:text-sm uppercase font-semibold`,
  unorderedList: `col-span-1 flex flex-col md:items-center items-start gap-1`,
  listItem: `cursor-pointer font-medium hover:underline transition-all duration-200 sm:text-xs`,
}
