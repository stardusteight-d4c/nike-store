import React from 'react'

interface Props {
  icon: string
}

export const SocialLink = ({ icon }: Props) => {
  return (
    <div>
      <img src={icon} alt="social/icon" className={style.icon} />
    </div>
  )
}

const style = {
  icon: `w-8 h-8 md:w-6 md:h-6 sm:w-5 sm:h-5 flex items-center cursor-pointer transition-all duration-200 hover:scale-110`,
}
