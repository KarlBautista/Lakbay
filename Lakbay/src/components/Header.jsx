import React from 'react'
import LakbayPH2 from "../assets/LakbayPH.png"
const Header = () => {
  return (
    <div className='w-full h-[100px] px-5 py-1 bg-[#0A2A60] flex items-center justify-evenly shadow-2xl border-b-4  border-[#FFDA3E]'>
      <div className='w-[10%] h-[100%] bg-amber-50'>
          <img src={LakbayPH2} alt="LakbayPH Logo" className='w-[100%] h-[100%]' />
      </div>

      <div className='flex text-white gap-10'>
          <div>Favorites</div>
          <div>Saved Places</div>
          <div>Login</div>
      </div>
      
    </div>
  )
}

export default Header
