import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import './index.css'
import { store } from './store'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
