import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import useMap from './LakbayZustand';
import Swal from "sweetalert2"
import Lakbay from "../assets/LakbayPH.png"
const Categories = () => {
  const [selected, setSelected] = useState("");
  const geoapifyAPI = import.meta.env.VITE_GEOAPIFY_API_KEY;
  const { storePointOfPlaces, clearInformationOfThePlace, setIsLoading, userLocation } = useMap();

  const fetchData = async () => {
        clearInformationOfThePlace();
        const response = await fetch(`https://api.geoapify.com/v2/places?categories=${selected}&filter=circle:${userLocation[1]},${userLocation[0]},10000&limit=50&apiKey=${geoapifyAPI}`);
        return response.json();
    }
  const { data, error, isLoading } = useQuery({
    queryKey: ["selectedCategory", selected],
    queryFn: () => fetchData(),
    enabled: !!selected,
    retry: false,
  });

  

   if(error){
     Swal.fire({
       title: `Sorry, No point of place found in "${selected}"`,
       text: "try searching other places",
       imageUrl: Lakbay,
       imageHeight: '120px',
       imageWidth: '120px',
     });
     console.error(`Error fetching data: ${error.statusText}`);
   }

  useEffect(() => {
    if(data){
      storePointOfPlaces(data.features);
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if(isLoading){
      setIsLoading(isLoading);
    }
  }, [isLoading]);


  return (
    <div className='w-full h-full bg-white px-4 py-4'>
        <select 
      
          name="selected" 
          id="" 
          value={selected} 
          onChange={(e) => setSelected(e.target.value)}
          className="w-full h-full  px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#D64545] focus:border-[#D64545] outline-none transition-all duration-200 text-gray-700 cursor-pointer hover:border-gray-400
          overflow-y-auto max-h-40"
        >

         <option value="commercial">Commercial</option>
        <option value="commercial.department_store">Department Store</option>
        <option value="commercial.shopping_mall">Shopping Mall</option>
        <option value="commercial.marketplace">Marketplace</option>
        <option value="commercial.supermarket">Supermarket / Grocery</option>
        <option value="commercial.convenience">Convenience Store</option>
        <option value="commercial.electronics">Electronics</option>
        <option value="commercial.books">Book Store</option>
        <option value="commercial.gift_and_souvenir">Gift & Souvenir</option>
        <option value="commercial.clothing">Clothing Store</option>
        <option value="commercial.furniture">Furniture Store</option>
        <option value="commercial.health_and_beauty">Health & Beauty</option>
        <option value="commercial.jewelry">Jewelry</option>
        <option value="commercial.pet">Pet Store</option>
        <option value="commercial.toys">Toys & Games</option>

        </select>
    </div>
  )
}

export default Categories
