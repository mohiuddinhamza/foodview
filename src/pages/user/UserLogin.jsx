import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import AuthLayout from '../../components/layout/AuthLayout';
import InputField from '../../components/common/InputField';
import api from '../../Services/api';
import { Check } from 'lucide-react';

const UserLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/auth/user/login', formData);
        // save in localstorage
      localStorage.setItem('userRole', 'customer');
      localStorage.setItem('userName', response.data?.fullname)

      toast.success(`Welcome back, ${response.data?.fullname || 'User'}!`, {
        icon: <Check/>,
        style: {
          borderRadius: '10px',
          background: '#1f2937', 
          color: '#fff',
        },
        duration : 4000,
      });
      console.log( "Server Data : ", response.data)
      setTimeout(() => {
        navigate('/feed'); 
      }, 1000);

    } catch (err) {
      const errorMsg = err.response?.data?.message || "Login failed!";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    // PASSING formType="login"
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to continue your food journey" 
      formType="login" 
    >
      <motion.form 
        className="space-y-6" 
        onSubmit={handleSubmit}
        variants={container}
        initial="hidden"
        animate="show"
      >
        
        <motion.div variants={item}>
          <InputField
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="user@example.com"
          />
        </motion.div>

        <motion.div variants={item}>
          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
          />
        </motion.div>

        <motion.div variants={item} className="flex items-center justify-between text-sm">
            <div className="flex items-center">
               <input 
                 id="remember-me" 
                 name="remember-me" 
                 type="checkbox" 
                 className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded cursor-pointer accent-orange-600"
               />
               <label htmlFor="remember-me" className="ml-2 block text-gray-700 cursor-pointer select-none">Remember me</label>
            </div>
            <a href="#" className="font-medium text-orange-600 hover:text-orange-500 transition-colors">
              Forgot password?
            </a>
        </motion.div>

        <motion.div variants={item} className="pt-2">
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3 px-4 rounded-xl text-white font-bold text-lg shadow-lg transform transition-all duration-300
              ${loading 
                ? `bg-gray-400 cursor-not-allowed` 
                : `bg-gradient-to-r from-gray-900 to-gray-800 hover:from-orange-600 hover:to-red-600 hover:shadow-orange-500/30`
              }`}
          >
              {loading ? "Signing In..." : "Login to Account"}
          </button>
        </motion.div>
      </motion.form>
    </AuthLayout>
  );
};

export default UserLogin;