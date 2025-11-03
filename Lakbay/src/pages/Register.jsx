import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Lakbay from "../assets/LakbayPH.png"
import Swal from 'sweetalert2'
import axios from "axios"
import useAuthStore from '../components/LakbayAuthZustand'

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const { signUp, signInWithGithub, signInWithGoogle } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        title: "Password do not Match",
        imageUrl: Lakbay,
        imageHeight: "150px",
        imageWidth: "150px",
        text: "Please check your password",
        icon: "error"
      });
      return;
    }
    if (formData.password.trim().length < 6){
        Swal.fire({
          title: "Minimum password length is 6 Characters",
          imageUrl: Lakbay,
          imageHeight: "150px",
          imageWidth: "150px",
          text: "Please strengthen your password.",
          icon: "error"
      });
    }

    try{
      const user = await signUp(formData);
      if(user){
         Swal.fire({
          title: "Check your email",
          imageUrl: Lakbay,
          imageHeight: "150px",
          imageWidth: "150px",
          text: "We've sent a confirmation link.  Please verify to continue",
          icon: "info"
      });
      setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          agreeToTerms: false
      })
      }
    } catch(err){
      throw new Error(err);
    }
    console.log('Registration attempt:', formData);
  };

    const handleSignInWithGoogle = async () => {
        try{
          const { data, error } = await signInWithGoogle();
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
         
        } catch(err){
          console.error(err);
        }
    }
  
    const handleSignInWithGithub = async () => {
          try{
            const { data, error } = await signInWithGithub();
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
    <div className='h-full w-full bg-linear-to-br from-[#F0F6FF] via-white to-[#E8F4FD] flex items-center justify-center p-4 relative overflow-y-auto'>
   
      <div className='absolute inset-0 overflow-hidden z-0'>
        <div className='absolute top-20 left-20 w-32 h-32 bg-[#FFDA3E]/20 rounded-full blur-xl'></div>
        <div className='absolute bottom-32 right-32 w-48 h-48 bg-[#0A2A60]/10 rounded-full blur-2xl'></div>
        <div className='absolute top-1/2 left-1/3 w-24 h-24 bg-[#D64545]/15 rounded-full blur-lg'></div>
        <div className='absolute top-32 right-20 w-20 h-20 bg-[#FFDA3E]/15 rounded-full blur-lg'></div>
      </div>

 
      <div className='relative w-full max-w-lg z-10 my-8'>
        {/* Main Card */}
        <div className='bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden'>
          
     
          <div className='bg-linear-to-r from-[#0A2A60] to-[#1a4088] px-8 py-8 text-center relative'>
            <div className='absolute inset-0 bg-linear-to-r from-[#FFDA3E]/10 to-transparent'></div>
            <div className='relative'>
              <div className='w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30'>
                <img src={Lakbay} alt="LakbayPH Logo" className='w-12 h-12 object-contain' />
              </div>
              <h1 className='text-2xl font-bold text-white mb-1'>Join LakbayPH</h1>
              <p className='text-white/80 text-sm'>Start your travel journey with us</p>
            </div>
          </div>

          {/* Form Section */}
          <div className='px-8 py-8'>
            <form onSubmit={handleSubmit} className='space-y-5'>
              
              {/* Name Fields Row */}
              <div className='grid grid-cols-2 gap-4'>
                {/* First Name Field */}
                <div className='space-y-2'>
                  <label htmlFor="firstName" className='block text-sm font-semibold text-gray-700'>
                    First Name
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className='w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0A2A60] focus:border-transparent transition-all duration-200 outline-none'
                      placeholder="First name"
                      required
                    />
                  </div>
                </div>

                {/* Last Name Field */}
                <div className='space-y-2'>
                  <label htmlFor="lastName" className='block text-sm font-semibold text-gray-700'>
                    Last Name
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className='w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0A2A60] focus:border-transparent transition-all duration-200 outline-none'
                      placeholder="Last name"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className='space-y-2'>
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
                    className='w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0A2A60] focus:border-transparent transition-all duration-200 outline-none'
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className='space-y-2'>
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
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className='w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0A2A60] focus:border-transparent transition-all duration-200 outline-none'
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600'
                  >
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      {showPassword ? (
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464m1.414 1.414L8.464 8.464m5.656 5.656l1.415 1.415m-1.415-1.415l-4.243-4.242m0 0l1.415-1.415m-1.414 1.414L8.464 8.464' />
                      ) : (
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className='space-y-2'>
                <label htmlFor="confirmPassword" className='block text-sm font-semibold text-gray-700'>
                  Confirm Password
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className='w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0A2A60] focus:border-transparent transition-all duration-200 outline-none'
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600'
                  >
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      {showConfirmPassword ? (
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464m1.414 1.414L8.464 8.464m5.656 5.656l1.415 1.415m-1.415-1.415l-4.243-4.242m0 0l1.415-1.415m-1.414 1.414L8.464 8.464' />
                      ) : (
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className='flex items-start gap-3'>
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className='w-4 h-4 mt-1 text-[#0A2A60] bg-gray-100 border-gray-300 rounded focus:ring-[#0A2A60] focus:ring-2'
                  required
                />
                <label htmlFor="agreeToTerms" className='text-sm text-gray-600 leading-relaxed'>
                  I agree to the{' '}
                  <a href="#" className='text-[#0A2A60] hover:text-[#1a4088] font-medium transition-colors'>
                    Terms of Service
                  </a>
                  {' '}and{' '}
                  <a href="#" className='text-[#0A2A60] hover:text-[#1a4088] font-medium transition-colors'>
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={!formData.agreeToTerms}
                className='w-full bg-linear-to-r from-[#0A2A60] to-[#1a4088] hover:from-[#1a4088] hover:to-[#2d5aa8] disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
              >
                <span className='flex items-center justify-center gap-2'>
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' />
                  </svg>
                  Create Account
                </span>
              </button>

              {/* Divider */}
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-gray-200'></div>
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className='px-4 bg-white text-gray-500'>or sign up with</span>
                </div>
              </div>

              {/* Social Register Buttons */}
              <div className='grid grid-cols-2 gap-3'>
                <button
                  type="button"
                  className='flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200 cursor-pointer'
                  onClick={() => handleSignInWithGoogle()}
                >
                  <svg className='w-5 h-5 text-red-500' viewBox='0 0 24 24'>
                    <path fill='currentColor' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'/>
                    <path fill='currentColor' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'/>
                    <path fill='currentColor' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'/>
                    <path fill='currentColor' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'/>
                  </svg>
                  <span className='ml-2 text-sm font-medium text-gray-700'>Google</span>
                </button>
                <button
                  type="button"
                  className='flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200 cursor-pointer'
                  onClick={() => handleSignInWithGithub()}
                >
                  <svg className='w-5 h-5 text-gray-900' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'/>
                  </svg>
                  <span className='ml-2 text-sm font-medium text-gray-700'>GitHub</span>
                </button>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className='px-8 py-6 bg-gray-50 border-t border-gray-100 text-center'>
            <p className='text-sm text-gray-600'>
              Already have an account?{' '}
              <Link to="/auth/login" className='text-[#0A2A60] hover:text-[#1a4088] font-semibold transition-colors'>
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Brand Footer */}
        <div className='text-center mt-6'>
          <p className='text-sm text-gray-500'>
            Powered by <span className='font-semibold text-[#0A2A60]'>LakbayPH</span> - Your Travel Companion
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
