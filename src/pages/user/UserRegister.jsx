import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import AuthLayout from '../../components/layout/AuthLayout';
import InputField from '../../components/common/InputField';
import api from '../../Services/api';
import { UserCheck } from 'lucide-react';

const UserRegister = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({ fullname: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error[e.target.name]) setError({ ...error, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newError = {};
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newError.email = "Please use a valid email";
    if (formData.password.length < 8) newError.password = "Min 8 characters required";
    
    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }

    try {
      setLoading(true);
      await api.post('/auth/user/register', formData);
      toast.success("Account created successfully!",
         {icon : <UserCheck/>, duration : 4000, position : 'top-center'} );
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Registration failed!";
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
    // PASSING formType="register"
    <AuthLayout title="Create Account" subtitle="Join us today" formType="register">
      <motion.form 
        className="space-y-5" 
        onSubmit={handleSubmit}
        variants={container}
        initial="hidden"
        animate="show"
      >
        
        <motion.div variants={item}>
          <InputField
            label="Full Name"
            type="text"
            name="fullname"
            value={formData.fullname} 
            onChange={handleChange}  
            placeholder="John Doe"
          />
        </motion.div>

        <motion.div variants={item}>
          <InputField
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}    
            onChange={handleChange}   
            placeholder="user@example.com"
            error={error.email}
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
            error={error.password}
          />
        </motion.div>

        <motion.div variants={item} className="pt-2">
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3 px-4 rounded-xl text-white font-bold text-lg shadow-lg transform transition-all duration-300
              ${loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-gray-900 to-gray-800 hover:from-orange-600 hover:to-red-600 hover:shadow-orange-500/30'
              }`}
          >
              {loading ? "Creating..." : "Create Account"}
          </button>
        </motion.div>
      </motion.form>
    </AuthLayout>
  );
};

export default UserRegister;