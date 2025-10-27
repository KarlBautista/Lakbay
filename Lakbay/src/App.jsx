import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Map from './components/Map'
import Categories from './components/Categories'
import SearchBar from './components/SearchBar'
function App() {
 
  return(
    <div className='w-full h-auto flex'>
      <Map />
      <Categories />
      <SearchBar />
    </div>
  )
}

export default App
