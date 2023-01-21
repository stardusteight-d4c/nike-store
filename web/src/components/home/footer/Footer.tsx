import React, { useEffect, useState } from 'react'

interface Props {
  footerData: Footer
}

export const Footer = ({ footerData: { titles, links } }: Props) => {
  const [year, setYear] = useState<number>()

  useEffect(() => {
    const getYear = () => setYear(new Date().getFullYear())
    getYear()
  }, [])

  return (
    <>
      <footer className="bg-zinc-900 py-8 mt-16 flex items-center justify-center">
        <div className="text-slate-200">
          <div className="grid items-start grid-cols-3 gap-x-24  w-full md:max-w-none md:gap-5">
            {titles.map((item, index) => (
              <div key={index} className="grid mb-2 items-center">
                <h1 className="text-lg lg:text-base md:text-sm uppercase font-semibold">
                  {item.title}
                </h1>
              </div>
            ))}
            {links.map((linksList, index) => (
              <ul key={index} className="grid items-center gap-1">
                {linksList.map((link, index) => (
                  <li key={index} className="cursor-pointer font-medium hover:underline transition-all duration-200 sm:text-xs">
                    {link.link}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}
