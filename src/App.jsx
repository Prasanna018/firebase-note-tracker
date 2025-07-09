import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { UserAuthProvider } from './context/useUserContext'

const App = () => {
  return (
    <UserAuthProvider>
      <RouterProvider router={router} > </RouterProvider>
    </UserAuthProvider>
  )
}

export default App
