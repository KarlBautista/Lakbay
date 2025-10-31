import React from 'react'
import useMap from './LakbayZustand'

const PlaceInformation = () => {
  const { informationOfThePlace } = useMap();
  
  // Empty state when no place is selected
  if (!informationOfThePlace) {
    return (
      <div className='bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8 w-full'>
        <div className='text-center text-gray-400'>
          <div className='w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full flex items-center justify-center'>
            <svg className='w-8 h-8 text-blue-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
            </svg>
          </div>
          <p className='text-sm font-medium text-gray-500'>Select a place to view details</p>
          <p className='text-xs text-gray-400 mt-1'>Click on any location marker</p>
        </div>
      </div>
    )
  }

  const place = informationOfThePlace.properties;

  return (
    <div className='bg-white/95 rounded-sm border border-gray-100 w-full overflow-hidden max-h-[500px] overflow-y-auto'>
  
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
    </div>
  )
}

export default PlaceInformation
