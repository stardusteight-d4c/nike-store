import React from 'react'

interface Props {}

export const RememberMeCheckbox = (props: Props) => {
  return (
    <div className={style.wrapper}>
      <div className={style.contentWrapper}>
        <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          className={style.checkboxInput}
        />
        <label htmlFor="remember-me" className={style.label}>
          Remember me
        </label>
      </div>
    </div>
  )
}

const style = {
  wrapper: `flex items-center justify-between`,
  contentWrapper: `flex items-center`,
  checkboxInput: `h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500`,
  label: `ml-2 block text-sm text-gray-900`,
}
