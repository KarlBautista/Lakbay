import React from 'react'
import FavoritePlaceInformation from './FavoritePlaceInformation'
import useUserData from './LakbayUsersData'
const Favorites = () => {
  const { favorites } = useUserData();
  return (
    <div className='w-full h-full flex flex-col gap-5'>
      { favorites.map((fav) => {
        return <FavoritePlaceInformation favoritePlace={fav}/>
      })}
      
    </div>
  )
}

export default Favorites
