import React from 'react'

interface Props {
  id?: string
  labelName?: string
  defaultValue?: any
}

export const ShippingAdressInput = ({ id, labelName, defaultValue }: Props) => {
  return (
    <div className={style.wrapper}>
      <label htmlFor={id} className={style.label}>
        {labelName}
      </label>
      <input
        id={id}
        name={id}
        type="text"
        defaultValue={defaultValue}
        className={style.input}
        placeholder={labelName}
      />
    </div>
  )
}

const style = {
  wrapper: `flex flex-col items-start py-1`,
  label: `text-lg font-base`,
  input: `px-2 py-1 border-2 border-zinc-900/50 bg-white/30 filter backdrop-blur-lg text-slate-800 outline-none rounded-md w-full focus:border-blue-500`,
}
