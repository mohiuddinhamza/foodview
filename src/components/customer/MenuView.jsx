import React from 'react';

// FIX: We receive 'items' and 'onBuy' as props directly
const MenuView = ({ items, onBuy }) => {
  
  // Safety check: If items are still loading or empty
  if (!items || items.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 animate-pulse">Loading menu items...</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50 min-h-screen pt-20"> {/* pt-20 added to clear the navbar */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800 px-2">Our Menu</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div 
            key={item._id} 
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Image Section */}
            <div className="relative h-40 w-full bg-gray-200">
              <img 
                src={item.image || "/default.jpg"} 
                className="h-full w-full object-cover" 
                alt={item.name} 
              />
            </div>

            {/* Content Section */}
            <div className="p-3">
              <span className="text-[10px] uppercase font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded">
                {item.category}
              </span>
              
              <h4 className="font-semibold text-gray-800 mt-2 truncate" title={item.name}>
                {item.name}
              </h4>
              
              <div className="flex justify-between items-center mt-3">
                <p className="font-bold text-gray-900 text-sm">Rs. {item.price}</p>
                
                <button 
                  onClick={() => onBuy(item)}
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 active:scale-90 transition-transform"
                  aria-label="Add to cart"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuView;