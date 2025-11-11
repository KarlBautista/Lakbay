import React, { useEffect, useState } from 'react'
import Map from '../components/Map'
import Categories from '../components/Categories'
import SearchBar from '../components/SearchBar'
import Header from '../components/Header'
import PlaceInformation from '../components/PlaceInformation'
import useMap from '../components/LakbayZustand'
import useAuthStore from '../components/LakbayAuthZustand'
import SavedPlaces from '../components/SavePlaces'
import Swal from 'sweetalert2'
import Lakbay from "../assets/LakbayPH.png"
import Favorites from '../components/Favorites'
import useUserData from '../components/LakbayUsersData'
import Loading from "../assets/Loading.gif"

const DashBoard = () => {

  const { informationOfThePlace, isLoading } = useMap();
  const { authenticatedUser } = useAuthStore();
  const { getFavorites, favorites, addToFavorites, deleteFromFavorites, getSaved } = useUserData();
  const [openSideBar, setOpenSideBar ] = useState("searchSideBar");

  useEffect(() => {
    if(authenticatedUser && authenticatedUser.id){
      getFavorites(authenticatedUser.id)
      getSaved(authenticatedUser.id)
    }
  }, [authenticatedUser])

  const handleSideBar = (sideBarValue) => {
    if(sideBarValue === "searchSideBar"){
      setOpenSideBar(sideBarValue);
      return;
    }
    if(authenticatedUser){
      setOpenSideBar(sideBarValue);
    } else{
      Swal.fire({
        icon: "info",
        imageUrl: Lakbay,
        imageHeight: "150px",
        imageWidth: "150px",
        title: "Sign-in first to Save Places",
        text: "Please Sign-in your account first to be able to save your favorite spots.",    
      })
    }
  }

  return (
    <div className='min-h-full h-full w-full flex flex-col md:flex-row-reverse'>
      
      {/* Map Section */}
     <div className='flex-1 w-full md:w-[80%] min-h-[300px] md:h-[89.5vh] md:min-h-[400px] bg-[#D64545] flex items-center justify-center backdrop-blur-md shadow-lg border border-white/20'>

        <Map />
      </div>

      {/* Sidebar Section */}
      <div className='flex flex-col bg-[#F0F6FF] px-5 py-5 gap-5 w-full md:w-[40%] lg:w-[30%] xl:w-[20%] overflow-y-auto border-r-5 border-r-[#FFDA3E] border-b-5 border-b-[#FFDA3E] md:overflow-hidden'>
        
        {/* Top Action Icons */}
        <div className='flex justify-center items-center gap-4 pb-3 border-b border-gray-300'>
          {/* Search Icon */}
          <button 
            className='flex items-center justify-center w-12 h-12 md:w-10 md:h-10 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors duration-200 shadow-md'
            title="Search Places"
            onClick={() => handleSideBar("searchSideBar")}
          >
            <svg 
              className="w-5 h-5 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </button>

          {/* Favorites Icon */}
          <button 
            className='flex items-center justify-center w-12 h-12 md:w-10 md:h-10 bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-200 shadow-md'
            title="Favorites"
            onClick={() => handleSideBar("favoritesSideBar")}
          >
            <svg 
              className="w-5 h-5 text-white" 
              fill="currentColor" 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                fillRule="evenodd" 
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
                clipRule="evenodd" 
              />
            </svg>
          </button>

          {/* Saved Icon */}
          <button 
            className='flex items-center justify-center w-12 h-12 md:w-10 md:h-10 bg-[#FED141] rounded-lg transition-colors duration-200 shadow-md'
            title="Saved Places"
            onClick={() => handleSideBar("savedSideBar")}
          >
            <svg 
              className="w-5 h-5 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" 
              />
            </svg>
          </button>
        </div>

        {/* Sidebar Content */}
        {openSideBar === "searchSideBar" && (
          <div className='w-full flex-1 flex flex-col gap-3 overflow-visible'>
            <div className='shrink-0'>
              <SearchBar />
            </div>

            <div className="w-full">
              <Categories />
            </div>

       {isLoading && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.2)] bg-opacity-20 flex justify-center items-center z-50">
            <img
          src={Loading} 
          alt="loading"
          className="w-[50px] h-[50px]"
          style={{ filter: 'invert(31%) sepia(97%) saturate(7471%) hue-rotate(206deg) brightness(92%) contrast(97%)' }}/>
          </div>
        )}
        {informationOfThePlace && (
              <div className='shrink-0 max-h-[calc(100vh-400px)] overflow-y-auto'>
                <PlaceInformation />
              </div> 
            )}
          </div>
        )}

        {openSideBar === "favoritesSideBar" && (
          <div className='w-full flex-1 overflow-y-auto'>
            <div className='w-full h-[8%] p-2'>
              <h2 className='text-2xl font-semibold text-red-500'>Favorite Places</h2>
            </div>
            <Favorites />
          </div>
        )}

        {openSideBar === "savedSideBar" && (
          <div className='w-full flex-1 overflow-y-auto'>
            <div className='w-full h-[8%] p-2'>
              <h2 className='text-2xl font-semibold text-[#FED141]'>Saved Places</h2>
            </div>
            <SavedPlaces />
          </div>
        )}

      </div>
    </div>
  )
}

export default DashBoard
