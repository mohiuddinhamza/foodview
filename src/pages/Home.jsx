import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      
      {/* You can add more sections here later like <FeaturedRestaurants /> */}
    </div>
  );
};

export default Home;