import React from 'react'
import SavedPlaceInformation from "./SavedPlaceInformation"
import useUserData from './LakbayUsersData'
const SavePlaces = () => {
  const { saved } = useUserData();

  return (
    <div className='w-full h-full flex flex-col gap-5'>
      {saved && saved.length > 0 ? (
        saved.map((s) => {
          return <SavedPlaceInformation key={s.id} savedPlace={s}/>
        })
      ) : (
        <div className='text-center text-gray-500 p-4'>
          No saved places yet. Add some places to your favorites!
        </div>
      )}
    </div>
  )
}

export default SavePlaces
