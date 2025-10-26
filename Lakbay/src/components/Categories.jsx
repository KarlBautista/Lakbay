import React, { useEffect, useState } from 'react'

const Categories = () => {
  const [selected, setSelected] = useState("");
  const geoapifyAPI = import.meta.env.VITE_GEOAPIFY_API_KEY;
  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch(`https://api.geoapify.com/v2/places?categories=${selected}&filter=circle:120.9842,14.5995,10000&limit=50&apiKey=${geoapifyAPI}`);
        if(!response.ok){
            throw new Error(response.error);
        }
        const place = await response.json();
        console.log(place);
        console.log(place.features)
      
    }
    fetchData();
  }, [selected]);
  return (
    <div>
        <select name="selected" id="" value={selected} onChange={(e) => setSelected(e.target.value)}>
            <option value="">Select Category of Places</option>
            <option value="commercial">Commercial</option>
            <option value="sport">Sports Places</option>
        </select>
    </div>
  )
}

export default Categories
