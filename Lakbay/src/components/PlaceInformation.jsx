import React, { use } from 'react'
import useMap from './LakbayZustand'
const PlaceInformation = () => {
  const { informationOfThePlace } = useMap();
  console.log(informationOfThePlace)
  return (
    <div className='flex flex-col gap-4 border w-full h-130 px-5 py-5 items-center justify-center rounded-sm'>
        <div>
             <h2 className='font-semibold'>{informationOfThePlace?.properties?.name}</h2>
        </div>
        <div>
            <p>{informationOfThePlace?.properties?.address_line2}</p>
            <p>{informationOfThePlace?.properties?.opening_hours}</p>
            { informationOfThePlace?.properties?.website &&
            <a href={informationOfThePlace?.properties?.website} target='_blank'>
                Visit {informationOfThePlace?.properties?.name} website
            </a>
            }
        </div>
        <div>
            { informationOfThePlace?.properties?.contact?.phone &&
            <p>Phone: {informationOfThePlace?.properties?.contact?.phone}</p>
            }
        </div>
    
    </div>
  )
}

export default PlaceInformation
