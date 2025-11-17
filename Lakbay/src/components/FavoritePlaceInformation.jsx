import React from 'react'
import useMap from './LakbayZustand'
import useUserData from "./LakbayUsersData"
import useAuthStore from './LakbayAuthZustand'
import Swal from 'sweetalert2'
import Lakbay from "../assets/LakbayPH.png"

const FavoritePlaceInformation = ({ favoritePlace }) => {
  const { storeShowRoute, storeInformationOfThePlace, setFavoriteToShow, favoriteToShow } = useMap();
  const { deleteFromFavorites, favorites } = useUserData();
  const { authenticatedUser } = useAuthStore();

  const handleRemoveFromFavorites = async () => {
    try {
      const result = await Swal.fire({
        title: 'Remove from Favorites?',
        text: 'Are you sure you want to remove this place from your favorites?',
        imageUrl: Lakbay,
        imageHeight: "120px",
        imageWidth: "120px",
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, remove it!'
      });

      if (result.isConfirmed) {
        const response = await deleteFromFavorites(favoritePlace.id, authenticatedUser.id);
        console.log(response);
        if (response) {
          Swal.fire({
            title: 'Removed!',
            text: 'Place has been removed from your favorites.',
            imageUrl: Lakbay,
            imageHeight: "120px",
            imageWidth: "120px",
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });
        
        }
      }
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to remove from favorites. Please try again.',
        imageUrl: Lakbay,
        imageHeight: "120px",
        imageWidth: "120px",
        icon: 'error'
      });
    }
  };

  const handleShowRoute = () => {
 
    const placeInfo = {
      properties: {
        name: favoritePlace.place_name,
        address_line2: favoritePlace.address,
        opening_hours: favoritePlace.opening_hours,
        phone: favoritePlace.phone,
        website: favoritePlace.website,
        place_id: favoritePlace.place_id
      },
      geometry: {
        coordinates: [favoritePlace.long, favoritePlace.lat]
      }
    };
    
   
    setFavoriteToShow(placeInfo);
    storeShowRoute(true);
    
    
  };

  return (
    
    <div className={`bg-white/95 rounded-lg border ${favoriteToShow && favoriteToShow.properties.place_id === favoritePlace.place_id ? "border-red-500" : "border-gray-100" }  w-full shadow-md hover:shadow-lg transition-shadow duration-200`}>
  
 
      <div className='bg-red-500 p-5 text-white rounded-t-lg'>
        <div className='flex items-center gap-3'>
          <div className='w-11 h-11 bg-white/20 rounded-full flex items-center justify-center shrink-0'>
            <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z' clipRule='evenodd' />
            </svg>
          </div>
          <div className='flex-1'>
            <h3 className='text-lg font-bold text-white'>
              {favoritePlace?.place_name || 'Favorite Place'}
            </h3>
            <p className='text-white/80 text-sm'>Place Information</p>
          </div>
        </div>
      </div>


      <div className='p-5 space-y-4'>
   
        <div className='flex items-start gap-3'>
          <div className='w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center shrink-0'>
            <svg className='w-4 h-4 text-red-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
            </svg>
          </div>
          <div className='flex-1 min-w-0'>
            <p className='text-xs font-semibold text-gray-600 mb-1'>Address</p>
            {favoritePlace?.address ? (
              <p className='text-gray-700 text-sm leading-relaxed'>{favoritePlace.address}</p>
            ) : (
              <p className='text-gray-400 text-sm italic'>Not available</p>
            )}
          </div>
        </div>

   
        {favoritePlace?.opening_hours && (
          <div className='flex items-start gap-3'>
            <div className='w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center shrink-0'>
              <svg className='w-4 h-4 text-green-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-xs font-semibold text-gray-600 mb-1'>Opening Hours</p>
              <p className='text-gray-700 text-sm'>{favoritePlace.opening_hours}</p>
            </div>
          </div>
        )}

  
        {favoritePlace?.phone && (
          <div className='flex items-start gap-3'>
            <div className='w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center shrink-0'>
              <svg className='w-4 h-4 text-blue-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
              </svg>
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-xs font-semibold text-gray-600 mb-1'>Phone</p>
              <a 
                href={`tel:${favoritePlace.phone}`}
                className='text-blue-600 text-sm hover:text-blue-800 hover:underline transition-colors font-medium'
              >
                {favoritePlace.phone}
              </a>
            </div>
          </div>
        )}

        {favoritePlace?.website && (
          <div className='flex items-start gap-3'>
            <div className='w-9 h-9 bg-purple-50 rounded-lg flex items-center justify-center shrink-0'>
              <svg className='w-4 h-4 text-purple-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9' />
              </svg>
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-xs font-semibold text-gray-600 mb-1'>Website</p>
              <a 
                href={favoritePlace.website} 
                target='_blank' 
                rel='noopener noreferrer'
                className='inline-flex items-center gap-1 text-purple-600 text-sm hover:text-purple-800 hover:underline transition-colors font-medium'
              >
                <span>Visit Website</span>
                <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>


      <div className='flex gap-3 p-5 pt-3'>
  
        <button 
          className='flex-1 flex items-center justify-center gap-2 bg-[#0A2A60] hover:bg-[#0A2A60]/90 text-white font-medium py-2.5 px-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
          onClick={handleShowRoute}
        >
          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' />
          </svg>
          <span className='text-sm'>Show Route</span>
        </button>

        <button 
          className='flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 px-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
          onClick={handleRemoveFromFavorites}
        >
          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
          </svg>
          <span className='text-sm'>Remove</span>
        </button>
      </div>
    </div>
  )
}

export default FavoritePlaceInformation
