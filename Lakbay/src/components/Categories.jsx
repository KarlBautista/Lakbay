import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import useMap from './LakbayZustand';
const Categories = () => {
  const [selected, setSelected] = useState("");
  const geoapifyAPI = import.meta.env.VITE_GEOAPIFY_API_KEY;
  const { storePointOfPlaces } = useMap();

  const fetchData = async () => {
        const response = await fetch(`https://api.geoapify.com/v2/places?categories=${selected}&filter=circle:120.9842,14.5995,10000&limit=50&apiKey=${geoapifyAPI}`);
        return response.json();
    }
  const { data, error, isLoading } = useQuery({
    queryKey: ["selectedCategory", selected],
    queryFn: () => fetchData(),
    enabled: !!selected,
    retry: false,
  });

  if(error){
    throw new Error("Error fetching data: ", error);
  }

  useEffect(() => {
    if(data){
      storePointOfPlaces(data.features);
    }
  }, [data]);




 

   

  return (
    <div>
        <select name="selected" id="" value={selected} onChange={(e) => setSelected(e.target.value)}>
            <option value="">Select Category of Places</option>
           <option value="commercial">Commercial</option>
            <option value="commercial.supermarket">Commercial / Supermarket</option>
            <option value="commercial.marketplace">Commercial / Marketplace</option>
            <option value="commercial.shopping_mall">Commercial / Shopping Mall</option>
            <option value="commercial.department_store">Commercial / Department Store</option>
            <option value="commercial.elektronics">Commercial / Electronics</option>
            <option value="commercial.outdoor_and_sport">Commercial / Outdoor and Sport</option>
            <option value="commercial.outdoor_and_sport">Commercial / Vehicle</option>
            <option value="commercial.books">Commercial / Books</option>
            <option value="commercial.gift_and_souvenir">Commercial / Gift and souvenir</option>
        </select>

        { isLoading && <div>Loading....</div> }
    </div>
  )
}

export default Categories
