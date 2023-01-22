import React from 'react'

interface Props {
  id: string
  type: string
  placeholder: string
  styles?: string
}

export const Input = ({ id, type, placeholder, styles }: Props) => {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {id}
      </label>
      <input
        id={id}
        type={type}
        required
        className={`${style.input} ${styles}`}
        placeholder={placeholder}
      />
    </div>
  )
}

const style = {
  input: `relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`,
}
