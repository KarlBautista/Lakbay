import React, { useState, useRef, useEffect } from 'react'
import  { Link }   from 'react-router-dom'
import Lakbay from "../assets/LakbayPH.png"
import useAuthStore from './LakbayAuthZustand'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
const Header = () => {
  const { authenticatedUser, signOut } = useAuthStore();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const signOutUser = async () => {
    setIsDropdownOpen(false); // Close dropdown when signing out
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

   console.log(authenticatedUser);
  return (
    <div className='w-full h-[100px] px-5 bg-[#0A2A60] flex items-center justify-evenly shadow-2xl border-b-4 border-[#FFDA3E] relative z-50'>
      <div className='flex items-center w-[20%] h-full justify-center  '>
        <div className='w-[30%] h-full'>
            <img src={Lakbay} alt="LakbayPH Logo" className='w-full h-full' />
        </div>
          <h1 className='text-2xl text-white font-semibold'>LakbayPH</h1>
      </div>
     

      <nav className='flex text-white items-center gap-10'>
        <Link 
          to="/" 
          className='flex items-center justify-center w-10 h-10 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200'
          title="Dashboard"
        >
          {/* Dashboard Icon SVG */}
          <svg 
            className="w-6 h-6 text-white" 
            fill="currentColor" 
            viewBox="0 0 20 20" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
          </svg>
        </Link>
        
        {/* User Icon Dropdown */}
        <div className='relative' ref={dropdownRef}>
          <button 
            onClick={toggleDropdown}
            className='flex items-center justify-center w-10 h-10 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200 cursor-pointer'
            title="User Menu"
          >
            {/* User Icon SVG */}
            <svg 
              className="w-6 h-6 text-white" 
              fill="currentColor" 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                fillRule="evenodd" 
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" 
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 animate-in slide-in-from-top-2 duration-200'>
              {authenticatedUser !== null ? (
                // Authenticated User Menu
                <>
                  <div className='px-4 py-2 text-sm text-gray-500 border-b border-gray-100'>
                    Signed in as <br />
                    
                      <span className='flex items-center gap-2 p-2 font-medium text-gray-900'>
                      
                        <img src={authenticatedUser?.user_metadata.avatar_url} alt="user porfile avatar" className='w-[25px] h-[25px] rounded-lg'/>
                      
                      {authenticatedUser?.user_metadata?.full_name || authenticatedUser?.email || 'User'}
                    </span>
                   
                  
                  </div>
                  <Link 
                    to="/profile" 
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150'
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <svg className="inline w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                    </svg>
                    Profile
                  </Link>
                  <button 
                    onClick={signOutUser}
                    className='w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors duration-150'
                  >
                    <svg className="inline w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"/>
                    </svg>
                    Sign Out
                  </button>
                </>
              ) : (
                // Non-authenticated User Menu
                <>
                  <div className='px-4 py-2 text-sm text-gray-500 border-b border-gray-100'>
                    Welcome to LakbayPH
                  </div>
                  <Link 
                    to="/auth/login" 
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150'
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <svg className="inline w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 11-2 0V4H5v12h10v-2a1 1 0 112 0v3a1 1 0 01-1 1H4a1 1 0 01-1-1V3z" clipRule="evenodd"/>
                      <path fillRule="evenodd" d="M6 10a1 1 0 011-1h7.586l-1.293-1.293a1 1 0 111.414-1.414l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L14.586 11H7a1 1 0 01-1-1z" clipRule="evenodd"/>
                    </svg>
                    Login
                  </Link>
                  <Link 
                    to="/auth/register" 
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150'
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <svg className="inline w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"/>
                    </svg>
                    Register
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
  
      
    </div>
  )
}

export default Header
