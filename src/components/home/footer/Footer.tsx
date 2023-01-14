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
      <footer className="bgTheme pt-7 pb-5">
        <div className="nikeContainer text-slate-200">
          <div className="grid items-start grid-cols-3 max-w-2xl w-full m-auto md:max-w-none md:gap-5">
            {titles.map((item, index) => (
              <div key={index} className="grid items-center">
                <h1 className="text-lg lg:text-base md:text-sm uppercase font-semibold">
                  {item.title}
                </h1>
              </div>
            ))}
            {links.map((linksList, index) => (
              <ul key={index} className="grid items-center gap-1">
                {linksList.map((link, index) => (
                  <li key={index} className="text-sm sm:text-xs">
                    {link.link}
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <div className="mt-5 text-center">
            <p className="text-sm md:text-center">
              Copyright<sup className="text-base font-bold">&copy;</sup> All
              Reserved Rights{' '}
              <span className="font-semibold">JSSTACK DEVELOPERS {year}</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
