import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'

interface Props {}

// Posteriormente colocar os dados em mockData ou em um CMS como o Sanity.io ou Hygraph, ou fazer um sistema
// próprio de gerenciamento de contéudo/produtos, com uma backend próprio ou até mesmo integrado à um BaaS

export const hostServer = import.meta.env.VITE_SERVER

export const App = (props: Props) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}
