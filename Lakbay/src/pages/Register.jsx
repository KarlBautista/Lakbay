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

  <div className='relative w-full max-w-md md:max-w-lg z-10 my-8'>
    {/* Main Card */}
    <div className='bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden'>
      
      <div className='bg-linear-to-r from-[#0A2A60] to-[#1a4088] px-6 md:px-8 py-6 md:py-8 text-center relative'>
        <div className='absolute inset-0 bg-linear-to-r from-[#FFDA3E]/10 to-transparent'></div>
        <div className='relative'>
          <div className='w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 md:mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30'>
            <img src={Lakbay} alt="LakbayPH Logo" className='w-10 h-10 md:w-12 md:h-12 object-contain' />
          </div>
          <h1 className='text-xl md:text-2xl font-bold text-white mb-1'>Join LakbayPH</h1>
          <p className='text-white/80 text-xs md:text-sm'>Start your travel journey with us</p>
        </div>
      </div>

      {/* Form Section */}
      <div className='px-6 md:px-8 py-6 md:py-8'>
        <form onSubmit={handleSubmit} className='space-y-4 md:space-y-5'>
          
          {/* Name Fields Row */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4'>
            <div className='space-y-1 md:space-y-2'>
              <label htmlFor="firstName" className='block text-xs md:text-sm font-semibold text-gray-700'>First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className='w-full pl-8 pr-3 py-2 md:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0A2A60] focus:border-transparent transition-all duration-200 outline-none text-xs md:text-sm'
                placeholder="First name"
                required
              />
            </div>
            <div className='space-y-1 md:space-y-2'>
              <label htmlFor="lastName" className='block text-xs md:text-sm font-semibold text-gray-700'>Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className='w-full pl-8 pr-3 py-2 md:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0A2A60] focus:border-transparent transition-all duration-200 outline-none text-xs md:text-sm'
                placeholder="Last name"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className='space-y-1 md:space-y-2'>
            <label htmlFor="email" className='block text-xs md:text-sm font-semibold text-gray-700'>Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className='w-full pl-8 pr-3 py-2 md:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0A2A60] focus:border-transparent transition-all duration-200 outline-none text-xs md:text-sm'
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className='space-y-1 md:space-y-2 relative'>
            <label htmlFor="password" className='block text-xs md:text-sm font-semibold text-gray-700'>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className='w-full pl-8 pr-10 py-2 md:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0A2A60] focus:border-transparent transition-all duration-200 outline-none text-xs md:text-sm'
              placeholder="Create a password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className='absolute inset-y-0 right-0 pr-2 md:pr-3 flex items-center text-gray-400 hover:text-gray-600'
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Confirm Password */}
          <div className='space-y-1 md:space-y-2 relative'>
            <label htmlFor="confirmPassword" className='block text-xs md:text-sm font-semibold text-gray-700'>Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className='w-full pl-8 pr-10 py-2 md:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0A2A60] focus:border-transparent transition-all duration-200 outline-none text-xs md:text-sm'
              placeholder="Confirm your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className='absolute inset-y-0 right-0 pr-2 md:pr-3 flex items-center text-gray-400 hover:text-gray-600'
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Terms */}
          <div className='flex items-start gap-2 text-xs md:text-sm'>
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className='w-4 h-4 mt-1 text-[#0A2A60] bg-gray-100 border-gray-300 rounded focus:ring-[#0A2A60] focus:ring-2'
              required
            />
            <label htmlFor="agreeToTerms" className='leading-relaxed'>
              I agree to the <a href="#" className='text-[#0A2A60] hover:text-[#1a4088] font-medium transition-colors'>Terms</a> and <a href="#" className='text-[#0A2A60] hover:text-[#1a4088] font-medium transition-colors'>Privacy Policy</a>
            </label>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={!formData.agreeToTerms}
            className='w-full bg-linear-to-r from-[#0A2A60] to-[#1a4088] hover:from-[#1a4088] hover:to-[#2d5aa8] disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl text-sm md:text-base'
          >
            Create Account
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className='px-6 md:px-8 py-4 md:py-6 bg-gray-50 border-t border-gray-100 text-center text-xs md:text-sm'>
        Already have an account?{' '}
        <Link to="/auth/login" className='text-[#0A2A60] hover:text-[#1a4088] font-semibold transition-colors'>
          Sign in here
        </Link>
      </div>
    </div>

    {/* Brand Footer */}
    <div className='text-center mt-4 md:mt-6 text-xs md:text-sm'>
      Powered by <span className='font-semibold text-[#0A2A60]'>LakbayPH</span> - Your Travel Companion
    </div>
  </div>
</div>

  )
}

export default Register
