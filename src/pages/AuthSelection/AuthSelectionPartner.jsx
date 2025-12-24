import React from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {  ArrowRight, Hamburger, Store } from 'lucide-react';


const AuthSelectionPartner = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative flex items-center justify-center font-sans overflow-hidden bg-gray-900">
      
      {/* --- BACKGROUND VIDEO --- */}
      <div className="absolute inset-0 z-0">
        <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-50"
        >
            <source 
                src="https://www.pexels.com/download/video/1111421/"
                type="video/mp4" 
            />
        </video>
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-orange-900/30 mix-blend-multiply" />
      </div>

      {/* --- CONTENT --- */}
      <div className="relative z-10 container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
            <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-6"
            >
               <Link to={'/'} > <Hamburger className="text-orange-400" size={20} /></Link>
                <span className="text-white font-medium tracking-wide">Welcome to FoodView</span>
            </motion.div>
            
            <motion.h1 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-4xl md:text-5xl font-extrabold text-white mb-4"
            >
                How would you like to continue?
            </motion.h1>
            <motion.p 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-gray-300 text-lg max-w-xl mx-auto"
            >
              Partner Authentication
            </motion.p>
        </div>

        {/* Selection Cards */}
        <div className="flex flex-col md:flex-row gap-6 max-w-4xl mx-auto">
            
             {/* login Partner */}
            <SelectionCard 
                icon={Store}
                title="Restaurant Partner Portal "
                description="access for business owners. Log in to track live orders, update your menu availability, and view your daily revenue reports."
                buttonText="Sign In"
                colorClass="group-hover:text-indigo-400"
                bgGradient="group-hover:from-indigo-600/20 group-hover:to-purple-600/20"
                onClick={() => navigate('/food-partner/login')}
                delay={0.3}
            />

            {/* Register PARTNER */}
            <SelectionCard 
                icon={Store}
                title="Partner With Us & Grow"
                description="Join the fastest-growing food delivery network. Sign up to list your restaurant, manage your menu, and start receiving orders today."
                buttonText="SignUp"
                colorClass="group-hover:text-orange-400"
                bgGradient="group-hover:from-orange-600/20 group-hover:to-red-600/20"
                onClick={() => navigate('/food-partner/register')}
                delay={0.4}
            />

        </div>
      </div>
    </div>
  );
};

// Reusable Card Component
const SelectionCard = ({ icon: Icon, title, description, buttonText, onClick, delay, colorClass, bgGradient }) => (
    <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: delay, duration: 0.5 }}
        onClick={onClick}
        className={`group flex-1 bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-3xl cursor-pointer hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] hover:border-white/30 relative overflow-hidden`}
    >
        {/* Hover Gradient Effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        <div className="relative z-10 flex flex-col h-full">
            <div className={`bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors ${colorClass.replace('text-', 'bg-').replace('400', '500/20')}`}>
                <Icon size={32} className={`text-gray-200 transition-colors ${colorClass}`} />
            </div>

            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-white transition-colors">{title}</h3>
            <p className="text-gray-400 mb-8 flex-grow group-hover:text-gray-200 transition-colors">{description}</p>

            <div className="flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform duration-300">
                {buttonText} <ArrowRight size={20} className="ml-2" />
            </div>
        </div>
    </motion.div>
);

export default AuthSelectionPartner;