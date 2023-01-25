import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { useAppDispatch, useAppSelector } from './store/hooks'
import {
  selectCurrentConsumer,
  setConsumer,
} from './store/slices/ConsumerSlice'

interface Props {}

// Posteriormente colocar os dados em mockData ou em um CMS como o Sanity.io ou Hygraph, ou fazer um sistema
// próprio de gerenciamento de contéudo/produtos, com um backend próprio ou até mesmo integrado à um BaaS

export const hostServer = import.meta.env.VITE_SERVER

export const App = (props: Props) => {
  const session = localStorage.getItem('session')
  const dispatch = useAppDispatch()
  const currentConsumer = useAppSelector(selectCurrentConsumer)

  useEffect(() => {
    ;(async () => {
      if (session && !currentConsumer) {
        await fetch(`${hostServer}/api/consumer/validateSession`, {
          method: 'POST',
          headers: {
            authorization: session,
          },
          referrerPolicy: 'no-referrer',
        })
          .then((res) => res.json())
          .then((data) => {
            dispatch(setConsumer(data.consumer))
          })
          .catch((error) => console.log(error))
      }
    })()
  }, [session, currentConsumer])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}
