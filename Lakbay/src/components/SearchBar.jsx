import React from 'react'
import { useQuery } from '@tanstack/react-query'
const SearchBar = () => {
  const geoapifyAPI = import.meta.env.VITE_GEOAPIFY_API_KEY;
  const fetchData = async () => {
    const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=sm manla&filter=circle:120.9842,14.5995,10000&apiKey=${geoapifyAPI}
`)
  }
  return (
    <div>
      <input type="text" className='px-4 py-4 border-lg' placeholder='Search Places'/>
    </div>
  )
}

export default SearchBar
