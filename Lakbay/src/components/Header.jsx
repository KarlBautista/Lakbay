import React from 'react'
import  { Link }   from 'react-router-dom'
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
     


      <nav className='flex text-white gap-10'>
            <Link to="/">Dashboard</Link>
            <Link to="/favorites">Favorites</Link>
            <Link to="/saved-places">Saved Places</Link>
            <Link to="/auth/login">Login</Link>
      </nav>
      
    </div>
  )
}

export default Header
