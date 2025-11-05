import React from 'react'
import FavoritePlaceInformation from './FavoritePlaceInformation'
import useUserData from './LakbayUsersData'
const Favorites = () => {
  const { favorites } = useUserData();
  return (
    <div className='w-full h-full flex flex-col gap-5'>
      {favorites && favorites.length > 0 ? (
        favorites.map((fav) => {
          return <FavoritePlaceInformation key={fav.id} favoritePlace={fav}/>
        })
      ) : (
        <div className='text-center text-gray-500 p-4'>
          No favorites yet. Add some places to your favorites!
        </div>
      )}
    </div>
  )
}

export default Favorites
