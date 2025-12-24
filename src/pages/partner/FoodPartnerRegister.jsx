import React, { useState } from 'react';
import { 
  Store, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Lock, 
  ArrowRight, 
  AlertCircle,
  Hamburger
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import vitamins from '../../assets/Videos/vitamins.mp4'
import api from '../../Services/api'

const FoodPartnerRegister = () => {
  const navigate = useNavigate();
  
  // UPDATED: 'partnerName' changed to 'name'
  const [formData, setFormData] = useState({
    name: '', 
    contactName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  const [status, setStatus] = useState({ loading: false, error: '', success: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status.error) setStatus({ ...status, error: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: '', success: '' });

    if (formData.password !== formData.confirmPassword) {
      setStatus({ loading: false, error: "Passwords do not match!" });
      return;
    }

    try {
     const response = await api.post('/auth/food-partner/register', {
             name: formData.name,
             contactName: formData.contactName,
             email: formData.email,
             phone: formData.phone,
             address: formData.address,
             password: formData.password
        });

      const data = await response.json();

      if (response.ok) {
        setStatus({ loading: false, error: '', success: 'Registration Successful! Redirecting...' });
        setTimeout(() => {
          navigate('/partner/login');
        }, 2000);
      } else {
        setStatus({ loading: false, error: data.message || 'Registration failed' });
      }

    }
    catch (error) {
      
        const msg = error.response?.data?.message || 'Registration failed';
        setStatus({ loading: false, error: msg });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Brand/Visuals */}
        <div className="w-full md:w-5/12 bg-gradient-to-br from-orange-600 to-red-600 p-10 text-white flex flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 z-0">
            {/* The Video */}
            <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover opacity-60"
            >
                {/* Free Food Stock Video from Pexels (You can replace this URL with your own) */}
                <source 
                    src={vitamins} 
                    type="video/mp4" 
                />
                Your browser does not support the video tag.
            </video>
            
            {/* Gradient Overlay: Ensures text is readable over the video */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-orange-900/40 mix-blend-multiply" />
        </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <Hamburger size={28} />
              </div>
              <span className="text-xl font-bold tracking-wide">FoodPartner</span>
            </div>
            <h1 className="text-4xl font-extrabold leading-tight mb-4">
              Bring your flavor to the world.
            </h1>
            <p className="text-orange-100 text-lg opacity-90">
              Join our network and start receiving orders today.
            </p>
          </div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute top-10 right-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl"></div>
        </div>

        {/* Right Side: The Form */}
        <div className="w-full md:w-7/12 p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Create Partner Account</h2>
          <p className="text-sm text-gray-500 mb-8">Enter your restaurant details below</p>

          {/* Status Messages */}
          {status.error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center gap-3 rounded text-sm">
              <AlertCircle size={18} /> {status.error}
            </div>
          )}
          {status.success && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded text-sm font-medium">
              {status.success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* UPDATED INPUT */}
              <InputField 
                icon={Store} 
                name="name"  
                placeholder="Restaurant Name" 
                value={formData.name}
                onChange={handleChange}
              />
              <InputField 
                icon={User} 
                name="contactName" 
                placeholder="Owner/Contact Name" 
                value={formData.contactName}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField 
                icon={Mail} 
                type="email"
                name="email" 
                placeholder="Email Address" 
                value={formData.email}
                onChange={handleChange}
              />
              <InputField 
                icon={Phone} 
                name="phone" 
                placeholder="Phone Number" 
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <InputField 
              icon={MapPin} 
              name="address" 
              placeholder="Full Restaurant Address" 
              value={formData.address}
              onChange={handleChange}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField 
                icon={Lock} 
                type="password"
                name="password" 
                placeholder="Password (min 8 chars)" 
                value={formData.password}
                onChange={handleChange}
              />
              <InputField 
                icon={Lock} 
                type="password"
                name="confirmPassword" 
                placeholder="Confirm Password" 
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <button 
              type="submit" 
              disabled={status.loading}
              className="w-full mt-4 bg-gray-900 text-white py-3.5 rounded-xl font-semibold hover:bg-gray-800 focus:ring-4 focus:ring-gray-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status.loading ? 'Creating Account...' : (
                <>Register Restaurant <ArrowRight size={18} /></>
              )}
            </button>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have a partner account?{' '}
              <a href="/food-partner/login" className="text-orange-600 font-semibold hover:underline">Log in</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ icon: Icon, ...props }) => (
  <div className="relative group">
    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
      <Icon className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
    </div>
    <input 
      className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all text-sm font-medium"
      required
      {...props} 
    />
  </div>
);

export default FoodPartnerRegister;