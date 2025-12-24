import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import bugerRun from '../../assets/Videos/burgerRun.mp4'

// Added 'formType' prop: can be "login" or "register"
const AuthLayout = ({ children, title, subtitle, formType }) => {
  return (
    <div className="min-h-screen flex bg-white font-sans">
      
      {/* LEFT SIDE: Visual & Branding */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-1/2 relative bg-gray-900 items-center justify-center overflow-hidden"
      >
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
             <video autoPlay muted loop playsInline className='w-full h-full object-cover opacity-60'>
                <source src={bugerRun} type='video/mp4' />
                Your browser does not support the video tag.
            </video>
            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-orange-900/40 mix-blend-multiply" />
        </div>
        
        {/* Content Box */}
        <div className="relative z-10 p-12 text-white max-w-lg text-center backdrop-blur-sm bg-black/20 rounded-2xl border border-white/10 shadow-2xl">
          <h1 className="text-5xl font-extrabold mb-6 tracking-tight drop-shadow-lg">FoodView</h1>
          <p className="text-xl text-orange-50 leading-relaxed font-medium">
            Experience the taste of quality. Join thousands of food lovers and partners in the smartest food network.
          </p>
        </div>
      </motion.div>

      {/* RIGHT SIDE: Form Area */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-gray-50">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Form Header */}
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">{title}</h2>
            <p className="mt-2 text-sm text-gray-500">{subtitle}</p>
          </div>

          {/* Form Content */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden">
             {/* Decorative Top Line (Orange) */}
             <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-500 to-red-600"></div>
             {children}
          </div>

          {/* DYNAMIC FOOTER SWITCHER */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              {formType === 'login' ? "Don't have an account? " : "Already have an account? "}
              
              <Link 
                to={formType === 'login' ? '/user/register' : '/user/login'} 
                className="font-bold text-orange-600 hover:text-orange-700 transition-colors hover:underline"
              >
                {formType === 'login' ? 'Create Account' : 'Login here'}
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;