import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Lakbay from "../assets/LakbayPH.png"
import useAuthStore from '../components/LakbayAuthZustand'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const { signIn, signInWithGoogle, signInWithGithub } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.email.trim() === "" || formData.password.trim() === "") return;

    try {
      const { data, error } = await signIn(formData);
      if(error){
        const messages = {
          "Invalid login credentials": "Double check your email or password",
          "Email not confirmed": "Please confirm your Email first."
        };
        Swal.fire({
          title: error.message === "Invalid login credentials" ? "Cannot find User" : error.message,
          imageUrl: Lakbay,
          imageHeight: "150px",
          imageWidth: "150px",
          text: messages[error.message],
          icon: "error"
        });
        return;
      }
      navigate("/");
      Swal.fire({
        title: `Welcome to LakbayPH ${data.user.first_name}`,
        imageUrl: Lakbay,
        imageHeight: "150px",
        imageWidth: "150px",
        text: "Enjoy your journey with your map companion",
        icon: "success"
      });
    } catch(err){
      console.error(err);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      const { error } = await signInWithGoogle();
      if(error){
        Swal.fire({
          title: `Google Auth Error`,
          imageUrl: Lakbay,
          imageHeight: "150px",
          imageWidth: "150px",
          text: error.message,
          icon: "error"
        });
      }
    } catch(err){ console.error(err); }
  }

  const handleSignInWithGithub = async () => {
    try {
      const { error } = await signInWithGithub();
      if(error){
        Swal.fire({
          title: `Github Auth Error`,
          imageUrl: Lakbay,
          imageHeight: "150px",
          imageWidth: "150px",
          text: error.message,
          icon: "error"
        });
      }
    } catch(err){
      Swal.fire({
        title: `Something went wrong`,
        imageUrl: Lakbay,
        imageHeight: "150px",
        imageWidth: "150px",
        text: err.message,
        icon: "error"
      });
    }
  }

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-[#F0F6FF] via-white to-[#E8F4FD] flex items-center justify-center p-4 relative'>

      {/* Decorative Background Circles */}
      <div className='absolute overflow-hidden w-full h-full'>
        <div className='absolute top-20 left-10 w-32 h-32 bg-[#FFDA3E]/20 rounded-full blur-xl'></div>
        <div className='absolute bottom-32 right-10 w-48 h-48 bg-[#0A2A60]/10 rounded-full blur-2xl'></div>
        <div className='absolute top-1/2 left-1/3 w-24 h-24 bg-[#D64545]/15 rounded-full blur-lg'></div>
      </div>

      {/* Login Card */}
      <div className='relative w-full max-w-md z-10'>
        <div className='bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden'>

          {/* Header */}
          <div className='bg-gradient-to-r from-[#0A2A60] to-[#1a4088] px-6 py-6 text-center relative'>
            <div className='relative z-10'>
              <div className='w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30'>
                <img src={Lakbay} alt="LakbayPH Logo" className='w-12 h-12 object-contain' />
              </div>
              <h1 className='text-2xl font-bold text-white mb-1'>Welcome Back</h1>
              <p className='text-white/80 text-sm'>Sign in to continue your journey</p>
            </div>
          </div>

          {/* Form */}
          <div className='px-6 py-6'>
            <form onSubmit={handleSubmit} className='space-y-5'>

              {/* Email */}
              <div className='space-y-1'>
                <label htmlFor="email" className='block text-sm font-semibold text-gray-700'>
                  Email Address
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207' />
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className='w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0A2A60] focus:border-transparent transition-all duration-200 outline-none text-sm sm:text-base'
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className='space-y-1'>
                <label htmlFor="password" className='block text-sm font-semibold text-gray-700'>
                  Password
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
                    </svg>
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className='w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0A2A60] focus:border-transparent transition-all duration-200 outline-none text-sm sm:text-base'
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm'>
                <label className='flex items-center mb-2 sm:mb-0'>
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className='w-4 h-4 text-[#0A2A60] bg-gray-100 border-gray-300 rounded focus:ring-[#0A2A60] focus:ring-2'
                  />
                  <span className='ml-2 text-gray-600'>Remember me</span>
                </label>
                <a href="#" className='text-[#0A2A60] hover:text-[#1a4088] font-medium transition-colors'>
                  Forgot password?
                </a>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className='w-full bg-gradient-to-r from-[#0A2A60] to-[#1a4088] hover:from-[#1a4088] hover:to-[#2d5aa8] text-white font-semibold py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl text-sm sm:text-base'
              >
                Sign In
              </button>

              {/* Divider */}
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-gray-200'></div>
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className='px-4 bg-white text-gray-500'>or continue with</span>
                </div>
              </div>

              {/* Social Buttons */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                <button type="button" onClick={handleSignInWithGoogle} className='flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200'>
                  <span className='mr-2'>
                    <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className='w-5 h-5'/>
                  </span>
                  Google
                </button>
                <button type="button" onClick={handleSignInWithGithub} className='flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200'>
                  <span className='mr-2'>
                    <img src="https://www.svgrepo.com/show/341847/github.svg" alt="GitHub" className='w-5 h-5'/>
                  </span>
                  GitHub
                </button>
              </div>

            </form>
          </div>

          {/* Footer */}
          <div className='px-6 py-4 bg-gray-50 border-t border-gray-100 text-center text-sm'>
            <p className='text-gray-600'>
              Don't have an account?{' '}
              <Link to="/auth/register" className='text-[#0A2A60] hover:text-[#1a4088] font-semibold transition-colors'>
                Sign up here
              </Link>
            </p>
          </div>

        </div>

        {/* Brand Footer */}
        <div className='text-center mt-6 text-sm text-gray-500'>
          Powered by <span className='font-semibold text-[#0A2A60]'>LakbayPH</span> - Your Travel Companion
        </div>

      </div>
    </div>
  )
}

export default Login
