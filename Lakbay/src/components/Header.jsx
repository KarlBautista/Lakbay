import React from 'react'
import  { Link }   from 'react-router-dom'
import Lakbay from "../assets/LakbayPH.png"
import useAuthStore from './LakbayAuthZustand'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
const Header = () => {
  const { authenticatedUser, signOut } = useAuthStore();
  const navigate = useNavigate();
  const signOutUser = async () => {
    const { success, error } = await signOut();
    if(success){
      navigate("/")
      Swal.fire({
        title: "Signed Out",
        imageUrl: Lakbay,
        imageHeight: "150px",
        imageWidth: "150px",
        text: "Thank you for using LakbayPH",
        icon: "success"
      });
    } else {
      
        Swal.fire({
        title: "Something went wrong",
        imageUrl: Lakbay,
        imageHeight: "150px",
        imageWidth: "150px",
        text: error.message,
        icon: "error"
      });
    }

  }
  return (
    <div className='w-full h-[100px] px-5 bg-[#0A2A60] flex items-center justify-evenly shadow-2xl border-b-4 border-[#FFDA3E] relative z-50'>
      <div className='flex items-center w-[20%] h-full justify-center  '>
        <div className='w-[30%] h-[100%]'>
            <img src={Lakbay} alt="LakbayPH Logo" className='w-[100%] h-[100%]' />
        </div>
          <h1 className='text-2xl text-white font-semibold'>LakbayPH</h1>
      </div>
     

      {authenticatedUser !== null ? (
        <nav className='flex text-white gap-10'>
              <Link to="/">Dashboard</Link>
              <Link to="/favorites">Favorites</Link>
              <Link to="/saved-places">Saved Places</Link>
              <Link to="/profile">Profile</Link>
                <button onClick={() => signOutUser() } className='cursor-pointer'>Signout</button>
        </nav>
      ) : ( 
        <nav className='flex text-white gap-10'>
            <Link to="/">Dashboard</Link>
             <Link to="/auth/login">Login</Link>
             <Link to="/auth/register">Register</Link>
          
          
        </nav>
      )}
  
      
    </div>
  )
}

export default Header
