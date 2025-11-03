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
    <div className='min-h-full h-full w-full flex flex-col'>
     
      <div className='flex h-full w-full'>
        <div className='flex flex-col bg-[#F0F6FF] w-[18%] px-5 py-5 gap-5  border-r-5 border-r-[#FFDA3E] border-b-5 border-b-[#FFDA3E]'> 
            <div className=''>
            <SearchBar />
           </div>

          <div>
            <Categories />
          </div>
          { isLoading && <div className='w-full h-[50%] flex justify-center items-center'>
              
              <img src={Loading} alt="loading" className='w-[50px] h-[50px] z-100' />
            </div>}
        { informationOfThePlace &&
          <div>
            <PlaceInformation />
          </div> 
        }
            
        </div>
      
    
        <div className='flex-1 flex items-center justify-center min-h-[400px] bg-[#D64545] backdrop-blur-md shadow-lg border border-white/20'>
          <Map />
        </div>
      </div>
    </div>
  )
}

export default DashBoard
