import React from 'react'
import useMap from './LakbayZustand'
import useUserData from "./LakbayUsersData"
import useAuthStore from './LakbayAuthZustand'
import Swal from 'sweetalert2'
import Lakbay from "../assets/LakbayPH.png"
const PlaceInformation = () => {
  const { informationOfThePlace, storeShowRoute, isShowRoute } = useMap();
  const { getFavorites, favorites, addToFavorites } = useUserData();
  const { authenticatedUser } = useAuthStore();
  console.log(authenticatedUser)

  const handleAddToFavorites = async () => {
      if(!authenticatedUser){
           Swal.fire({
            icon: "info",
            imageUrl: Lakbay,
            imageHeight: "150px",
            imageWidth: "150px",
            title: "Sign-in first to Save Places",
            text: "Please Sign-in your account first to be able to save your favorite spots.",    
          })
      }
      try{
        const response = await addToFavorites({
          userId: authenticatedUser.id,
          placeName: informationOfThePlace.properties.name || null,
          address: informationOfThePlace.properties.address_line2 || null,
          openingHours: informationOfThePlace.properties.opening_hours || null,
          phone: informationOfThePlace.properties.phone || null,
          website: informationOfThePlace.properties.website || null,
          lat: informationOfThePlace.geometry.coordinates[1],
          long: informationOfThePlace.geometry.coordinates[0],
          placeId: informationOfThePlace.properties.place_id
        });
        if(response && response.success){
            Swal.fire({
            icon: "success",
            imageUrl: Lakbay,
            imageHeight: "150px",
            imageWidth: "150px",
            title: "Added to your Favorites",
            text: "Browse more places",
            timer: 2000,
            showConfirmButton: false    
          })
        }
        if(response && response.error){
           Swal.fire({
            icon: "error",
            title: "Error",
            text: response.error || "Failed to add to favorites"
          });
           return;
        }
      } catch(err){
        throw new Error(err)
      }
  }

   const place = informationOfThePlace.properties;

  return (
    <div className='bg-white/95 rounded-sm border border-gray-100 w-full '>
  
      <div className='bg-[#D64545] p-6 text-white'>
        <div className='flex items-center gap-3'>
          <div className='w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0'>
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' />
            </svg>
          </div>
          <div className=''>
            <h2 className='text-xl font-bold text-white'>
              {place?.name || 'Unknown Place'}
            </h2>
            <p className='text-white/80 text-sm mt-1'>Place Information</p>
          </div>
        </div>
      </div>

   
      <div className='p-6 space-y-6'>
        {/* Address */}
        {place?.address_line2 ? (
          <div className='flex items-start gap-4'>
            <div className='w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center shrink-0'>
              <svg className='w-5 h-5 text-red-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
              </svg>
            </div>
            <div className='flex-1'>
              <p className='text-sm font-semibold text-gray-700 mb-1'>Address</p>
              <p className='text-gray-600 text-sm leading-relaxed'>{place.address_line2}</p>
            </div>
          </div>
        ) : (
          <div className='flex items-start gap-4'>
            <div className='w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center shrink-0'>
              <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
              </svg>
            </div>
            <div className='flex-1'>
              <p className='text-sm font-semibold text-gray-700 mb-1'>Address</p>
              <p className='text-gray-400 text-sm italic'>Not available</p>
            </div>
          </div>
        )}

        {/* Opening Hours */}
        <div className='flex items-start gap-4'>
          <div className='w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center shrink-0'>
            <svg className='w-5 h-5 text-green-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
            </svg>
          </div>
          <div className='flex-1'>
            <p className='text-sm font-semibold text-gray-700 mb-1'>Opening Hours</p>
            {place?.opening_hours ? (
              <p className='text-gray-600 text-sm'>{place.opening_hours}</p>
            ) : (
              <p className='text-gray-400 text-sm italic'>Not available</p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div className='flex items-start gap-4'>
          <div className='w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0'>
            <svg className='w-5 h-5 text-blue-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
            </svg>
          </div>
          <div className='flex-1'>
            <p className='text-sm font-semibold text-gray-700 mb-1'>Phone</p>
            {place?.contact?.phone ? (
              <a 
                href={`tel:${place.contact.phone}`}
                className='text-blue-600 text-sm hover:text-blue-800 hover:underline transition-colors font-medium'
              >
                {place.contact.phone}
              </a>
            ) : (
              <p className='text-gray-400 text-sm italic'>Not available</p>
            )}
          </div>
        </div>

        {/* Website */}
        <div className='flex items-start gap-4'>
          <div className='w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center shrink-0'>
            <svg className='w-5 h-5 text-purple-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9' />
            </svg>
          </div>
          <div className='flex-1'>
            <p className='text-sm font-semibold text-gray-700 mb-1'>Website</p>
            {place?.website ? (
              <a 
                href={place.website} 
                target='_blank' 
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 text-purple-600 text-sm hover:text-purple-800 hover:underline transition-colors font-medium'
              >
                <span>Visit Website</span>
                <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
                </svg>
              </a>
            ) : (
              <p className='text-gray-400 text-sm italic'>Not available</p>
            )}
          </div>
        </div>
      </div>

      {/* Show Route Button */}
      <div className='p-6 pt-0'>
        <button className='w-full bg-[#0A2A60] hover:bg-[#0A2A60]/90 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2'
          onClick={() => {
            storeShowRoute(false);
            setTimeout(() => storeShowRoute(true), 100);
          }}>
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' />
          </svg>
          Show Route
        </button>
      </div>

      {/* Divider */}
      <div className='mx-6 border-t border-gray-200'></div>

      {/* Action Buttons */}
      <div className='flex gap-3 p-6 pt-4'>
        {/* Add to Favorites Button */}
        <button className='flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
        onClick={() => handleAddToFavorites()}>
          <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
            <path fillRule='evenodd' d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z' clipRule='evenodd' />
          </svg>
          <span className='text-sm'>Add to Favorites</span>
        </button>

        {/* Add to Saved Places Button */}
        <button className='flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'>
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z' />
          </svg>
          <span className='text-sm'>Save Place</span>
        </button>
      </div>
   
    </div>
  )
}

export default PlaceInformation
