import React from 'react'
import { Hero } from '../components'
import { heroapi } from '../mockData/data'

interface Props {}

export const Home = (props: Props) => {
  return (
    <div>
      <main>
        <Hero heroApi={heroapi} />
      </main>
    </div>
  )
}
