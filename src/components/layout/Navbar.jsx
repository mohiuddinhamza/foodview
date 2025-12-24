import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, User,UserPlus, LogOut,Users } from 'lucide-react';
 import logo from  '../../assets/icons/hamburger.svg'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const role = localStorage.getItem('userRole');  
 const isLoggedIn = !!localStorage.getItem('userRole'); 

const handleLogoClick = ()=>{
 if  (!isLoggedIn) navigate('/');
  else if (role === "partner") navigate('/partner/dashboard');
  else navigate('/feed');
}

  const handleLogout = () => {
    // Clear cookies logic 
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.clear()
    navigate('/');
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <button onClick={handleLogoClick} className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white font-bold">
              <img src={logo} alt="logo" width="30" height="30" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
              FoodView
            </span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-orange-500 transition-colors font-medium">Home</Link>
            <Link to="/menu" className="text-gray-600 hover:text-orange-500 transition-colors font-medium">Menu</Link>
            <Link to="/offers" className="text-gray-600 hover:text-orange-500 transition-colors font-medium">Offers</Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <button className="p-2 text-gray-600 hover:text-orange-500 transition-colors">
                  <ShoppingBag size={20} />
                </button>
                <div className="h-6 w-px bg-gray-200"></div>
                <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600">
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                 <Link to="/auth/select/user" className="flex justify-between items-center text-white  bg-orange-600 hover:bg-orange-500 py-2 px-4 rounded-full transition-all hover:text-gray-900 font-medium">
                <UserPlus color='white' size={16}/> <p className='font-semibold ml-1'>Customer</p></Link>
                 <Link to="/auth/select/partner" className="flex justify-between items-center px-4 py-2 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all">
                 <Users color='gray' size={16}/>  <p className='font-semibold ml-1'>Partner</p>
                 </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu (Animated) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link to="/" className="block py-2 text-gray-600 font-medium">Home</Link>
              <Link to="/menu" className="block py-2 text-gray-600 font-medium">Menu</Link>
              <Link to="/offers" className="block py-2 text-gray-600 font-medium">Offers</Link>
              <hr className="my-2 border-gray-100" />
              <button onClick={handleLogout} className="w-full text-left py-2 text-red-500 font-medium">Logout</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;