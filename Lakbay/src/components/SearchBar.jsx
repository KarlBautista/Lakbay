import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import useMap from './LakbayZustand';
import Swal from 'sweetalert2';
import Lakbay from "../assets/LakbayPH.png"
const SearchBar = () => {
  const geoapifyAPI = import.meta.env.VITE_GEOAPIFY_API_KEY;
  const [search, setSearch] = useState("");
  const { storePointOfPlaces, clearInformationOfThePlace, setIsLoading, userLocation} = useMap();
 
  const fetchData = async () => {
    const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${search}&filter=circle:${userLocation[1]},${userLocation[0]},10000&apiKey=${geoapifyAPI}`)
    return response.json();
  }
  const { data, error, isLoading, refetch} = useQuery({
    queryKey: ["searchedPlaces", search],
    queryFn: () => fetchData(),
    enabled: false,
    refetch: false,
    retry: false,
  });

  const searchPlace = () => {
    if(search.trim() === "") return;
    refetch();
    clearInformationOfThePlace();
  }

  if(error){
    Swal.fire({
      title: `Sorry, No point of place found in "${search}"`,
      text: "try searching other places",
      imageUrl: Lakbay,
      imageHeight: '120px',
      imageWidth: '120px',
    });
    console.error(`Error fetching data: ${error.statusText}`);
  }

  useEffect(() => {
    if(data){
        setIsLoading(false);
        storePointOfPlaces(data.features);
    }
  }, [data]);

  useEffect(() => {
    if(isLoading){
      setIsLoading(isLoading)
    }
  }, [isLoading])
  
  return (
    <div className='flex flex-col gap-2 px-4 py-2 rounded-sm bg-white'>
    
         <p className='text-[#D64545] font-bold w-full h-[30%] border-b-1 border-gray-300 p-1'>Find a Place</p>
     
      <div className='flex gap-3'>
          <input type="text" 
            className=' w-[70%] h-[60%] px-3 py-2 border border-gray-300 rounded-lg focus:border-[#D64545] outline-none' 
            placeholder='Search Places'
            onChange={e => setSearch(e.target.value)}
            value={search}
            />
        <button onClick={() => searchPlace()}
            className='bg-red-500 text-white rounded-lg px-3 py-2 hover:cursor-pointer'>Search</button>
      </div>
     
    </div>

  )
}

export default SearchBar
