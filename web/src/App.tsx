import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'

interface Props {}

// Posteriormente colocar os dados em mockData ou em um CMS como o Sanity.io ou Hygraph, ou fazer um sistema
// próprio de gerenciamento de contéudo/produtos, com um backend próprio ou até mesmo integrado à um BaaS

export const hostServer = import.meta.env.VITE_SERVER

export const App = (props: Props) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}
