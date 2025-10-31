import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import useMap from './LakbayZustand';

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
    throw new Error("Error fetching data: ", error);
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
    <div>
        <select 
      
          name="selected" 
          id="" 
          value={selected} 
          onChange={(e) => setSelected(e.target.value)}
          className="w-full h-full  px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#D64545] focus:border-[#D64545] outline-none transition-all duration-200 text-gray-700 cursor-pointer hover:border-gray-400
          overflow-y-auto max-h-40"
        >


          <option value="">Select Category of Places</option>
           <option value="commercial">Commercial</option>
          <option value="commercial.department_store">Department Store</option>
          <option value="commercial.shopping_mall">Shopping Mall</option>
          <option value="commercial.marketplace">Marketplace</option>
          <option value="commercial.supermarket">Supermarket / Grocery</option>
          <option value="commercial.convenience">Convenience Store</option>
          <option value="commercial.greengrocer">Greengrocer / Fresh Market</option>
          <option value="commercial.bakery">Bakery</option>
          <option value="commercial.beverages">Beverages Store</option>
          <option value="commercial.toys">Toys Store</option>
          <option value="commercial.books">Bookstore</option>
          <option value="commercial.electronics">Electronics</option>
          <option value="commercial.mobile_phone">Mobile Phone Shop</option>
          <option value="commercial.fashion">Clothing / Fashion</option>
          <option value="commercial.shoes">Shoes Store</option>
          <option value="commercial.sports">Sports Store</option>
          <option value="commercial.outdoor_and_sport">Outdoor & Sport</option>
          <option value="commercial.vehicle">Vehicle Store / Car Dealer</option>
          <option value="commercial.motorcycle">Motorcycle Store</option>
          <option value="commercial.furniture">Furniture Store</option>
          <option value="commercial.hardware">Hardware / Home Improvement</option>
          <option value="commercial.jewelry">Jewelry Store</option>
          <option value="commercial.cosmetics">Cosmetics / Beauty</option>
          <option value="commercial.gift_and_souvenir">Gift & Souvenirs</option> 
        <option value="commercial.bank">Bank</option>
        <option value="commercial.money_transfer">Money Transfer</option>
        <option value="commercial.post_office">Post Office</option>
        <option value="commercial.kiosk">Kiosk</option>

        <option value="catering.restaurant">Restaurant</option>
        <option value="catering.fast_food">Fast Food</option>
        <option value="catering.cafe">Cafe</option>
        <option value="catering.bar">Bar</option>
        <option value="catering.pub">Pub</option>
        <option value="catering.kiosk">Food Kiosk</option>
        <option value="catering.food_court">Food Court</option>
        <option value="catering.ice_cream">Ice Cream Shop</option>
        <option value="catering.bakery">Bakery</option>
        <option value="catering.vegan">Vegan Restaurant</option>
        <option value="catering.localized">Local Specialty Restaurant</option>
        <option value="catering.diner">Diner</option>

        <option value="accommodation.hotel">Hotel</option>
        <option value="accommodation.motel">Motel</option>
        <option value="accommodation.hostel">Hostel</option>
        <option value="accommodation.guest_house">Guest House</option>
        <option value="accommodation.resort">Resort</option>
        <option value="accommodation.bed_and_breakfast">Bed & Breakfast</option>
        <option value="accommodation.camp_site">Camp Site</option>
        <option value="accommodation.chalet">Chalet / Cabins</option>
        <option value="accommodation.apartments">Serviced Apartments</option>
        </select>
    </div>
  )
}

export default Categories
