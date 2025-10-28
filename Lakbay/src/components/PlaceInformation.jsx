import React, { use } from 'react'
import useMap from './LakbayZustand'
const PlaceInformation = () => {
  const { informationOfThePlace } = useMap();
  console.log(informationOfThePlace)
  return (
    <div className='flex flex-col gap-5 border w-full h-130 px-5 py-5 rounded-sm overflow-y-auto max-h-124'>
        <div>
           
              <div className='w-full flex justify-center items-center'>
                <h2 className='font-semibold text-2xl text-gray-800'>{informationOfThePlace?.properties?.name}</h2>
              </div> 
        </div>
        <div className=''>
          <div className='mb-5'>
              <p className='text-gray-400 italic text-sm'>address</p>
              <p className='text-gray-700'>{informationOfThePlace?.properties?.address_line2}</p>
          </div>
        
            <div className='mb-5'>
                 <p className='text-gray-400 italic text-sm'>opening hours</p>
                    {informationOfThePlace?.properties?.opening_hours ?
                 <p className='text-gray-700'>{informationOfThePlace?.properties?.opening_hours}</p>
                  : <p className='text-gray-600 italic'>N/A</p>
                    }
              </div>

        

               <div className='mb-5'>
                <p className='text-gray-400 italic text-sm'>phone</p>
                { informationOfThePlace?.properties?.contact?.phone ?
              <p className='text-gray-700'>{informationOfThePlace?.properties?.contact?.phone}</p>
              : <p className='text-gray-600 italic'>N/A</p>
                }
              </div>
          
        
         
         
            <div className='mb-5'>
              <p className='text-gray-400 italic text-sm'>website</p>
              { informationOfThePlace?.properties?.website ? 
            <a href={informationOfThePlace?.properties?.website} target='_blank'>
              Visit {informationOfThePlace?.properties?.name} website
            </a> : <p className='text-gray-600 italic'>N/A</p>
              }
            </div>
          
          
        </div>
       
    
    </div>
  )
}

export default PlaceInformation
