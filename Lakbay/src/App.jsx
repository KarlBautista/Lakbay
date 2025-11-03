import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import useAuthStore from './components/LakbayAuthZustand'
function App() {
  const  { getUser, authListener, authenticatedUser} = useAuthStore();
  console.log(authenticatedUser)
  
  useEffect(() => {
    getUser();
    const unsubscribe = authListener();
    return () => {
      if (unsubscribe && typeof unsubscribe === 'function') {
        unsubscribe();
      }
    }
  }, [getUser, authListener])
  return(
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default App
