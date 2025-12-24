import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  Store, User, Mail, Phone, MapPin, 
  Lock, ArrowRight, AlertCircle, Hamburger 
} from 'lucide-react';

// Use your central API instance
import api from '../../Services/api';
import vitamins from '../../assets/Videos/vitamins.mp4';
import AuthLayout from '../../components/layout/AuthLayout';
import InputField from '../../components/common/InputField';

const FoodPartnerRegister = () => {
  const navigate = useNavigate();
  
  
  const [formData, setFormData] = useState({
    name: '', 
    contactName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    if (formData.password.length < 8) {
      return toast.error("Password must be at least 8 characters.");
    }

    setLoading(true);

    try {
      
      const response = await api.post('/auth/food-partner/register', {
        name: formData.name,
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        password: formData.password
      });

      if (response.data.success) {
        toast.success("Restaurant registered successfully! 👨‍🍳");
        
      
        setTimeout(() => {
          navigate('/food-partner/login');
        }, 2000);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMsg);
      console.error("Partner Registration Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Visuals */}
        <div className="w-full md:w-5/12 bg-gray-900 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-50">
              <source src={vitamins} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-orange-900/40 mix-blend-multiply" />
          </div>
          
          <div className="relative z-10 p-10">
            <div className="flex items-center gap-2 mb-6">
              <Link to="/" className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <Hamburger size={24} />
              </Link>
              <span className="text-xl font-bold tracking-wide">FoodPartner</span>
            </div>
            <h1 className="text-4xl font-extrabold leading-tight mb-4">Grow your business with FoodView.</h1>
            <p className="text-orange-100 text-lg opacity-90">Join the smartest food network and reach more customers.</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-7/12 p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Partner Registration</h2>
          <p className="text-sm text-gray-500 mb-8">Tell us about your restaurant</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField 
                label="Restaurant Name"
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="The Pizza Place" 
              />
              <InputField 
                label="Owner Name"
                name="contactName" 
                value={formData.contactName} 
                onChange={handleChange} 
                placeholder="John Doe" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField 
                label="Business Email"
                type="email"
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="owner@restaurant.com" 
              />
              <InputField 
                label="Phone Number"
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="+92 XXX XXXXXXX" 
              />
            </div>

            <InputField 
              label="Restaurant Address"
              name="address" 
              value={formData.address} 
              onChange={handleChange} 
              placeholder="123 Food Street, City" 
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField 
                label="Password"
                type="password"
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                placeholder="••••••••" 
              />
              <InputField 
                label="Confirm Password"
                type="password"
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                placeholder="••••••••" 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full mt-6 py-3.5 rounded-xl text-white font-bold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2
                ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 hover:bg-orange-600 shadow-orange-500/10'}
              `}
            >
              {loading ? "Creating Account..." : (
                <>Register Restaurant <ArrowRight size={20} /></>
              )}
            </button>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have a partner account?{' '}
              <Link to="/food-partner/login" className="text-orange-600 font-semibold hover:underline">Log in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;