import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroImage from "../../assets/Images/food-burger.jpg"

const Hero = () => {
  return (
    <div className="relative pt-24 pb-12 lg:pt-32 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold mb-6">
              Hungry? We’re Already on Our Way.
            </span>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
              It’s not just Food, It’s an <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Experience.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Order from the best restaurants near you with real-time tracking and delicious discounts.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/menu" className="px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-all flex items-center gap-2 group">
                Order Now 
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-full font-semibold hover:border-gray-400 transition-all">
                View Process
              </button>
            </div>
            
            {/* Stats */}
            <div className="mt-12 flex gap-8">
              <div>
                <p className="text-3xl font-bold text-gray-900">50+</p>
                <p className="text-sm text-gray-500">Restaurants</p>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div>
                <p className="text-3xl font-bold text-gray-900">20k+</p>
                <p className="text-sm text-gray-500">Happy Users</p>
              </div>
            </div>
          </motion.div>

          {/* Right Image Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
             {/* Decorative blob behind image */}
             <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-gradient-to-br from-orange-200 to-red-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>
             
             <img 
               src={HeroImage} 
               alt="Delicious Pizza" 
               className="rounded-3xl shadow-2xl w-full object-cover transform rotate-2 hover:rotate-0 transition-all duration-500"
             />

             {/* Floating Card Animation */}
             <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-3"
             >
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  ⭐️
                </div>
                <div>
                  <p className="font-bold text-gray-900">4.9 Rating</p>
                  <p className="text-xs text-gray-500">Best Quality Food</p>
                </div>
             </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Hero;