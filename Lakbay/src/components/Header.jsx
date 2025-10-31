import React from 'react'
import Lakbay3 from "../assets/LakbayPH.png"
const Header = () => {
  return (
    <div className='w-full h-[100px] px-5  bg-[#0A2A60] flex items-center justify-evenly shadow-2xl border-b-4  border-[#FFDA3E]'>
      <div className='flex items-center w-[20%] h-full justify-center  '>
        <div className='w-[30%] h-[100%]'>
            <img src={Lakbay3} alt="LakbayPH Logo" className='w-[100%] h-[100%]' />
        </div>
          <h1 className='text-2xl text-white font-semibold'>LakbayPH</h1>
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
