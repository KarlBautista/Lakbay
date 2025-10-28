import React from 'react'
import Map from '../components/Map'
import Categories from '../components/Categories'
import SearchBar from '../components/SearchBar'
import Header from '../components/Header'
import PlaceInformation from '../components/PlaceInformation'
import useMap from '../components/LakbayZustand'
import Loading from "../assets/loading.gif"
const DashBoard = () => {
  const { informationOfThePlace, isLoading } = useMap();
  return (
    <div className='min-h-screen w-full flex flex-col'>
      <Header />
      <div className='flex h-[90%] w-full'>
        <div className='flex flex-col bg-[#F8F9FA] w-[18%] px-5 py-5 gap-5'> 
            <div className=''>
            <SearchBar />
           </div>

          <div>
            <Categories />
          </div>
          { isLoading && <div className='w-full h-[50%] flex justify-center items-center'>
              <img src={Loading} alt="loading" className='w-[50px] h-[50px]' />
            </div>}
        { informationOfThePlace &&
          <div>
            <PlaceInformation />
          </div> 
        }
            
        </div>
      
    
        <div className='flex-1 flex items-center justify-center min-h-[400px] bg-[#F8F9FA] backdrop-blur-md shadow-lg border border-white/20'>
          <Map />
        </div>
      </div>
    </div>
  )
}

export default DashBoard
