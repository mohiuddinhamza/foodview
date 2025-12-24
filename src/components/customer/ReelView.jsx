import React from 'react';

// We pass "items" and "onBuy" as props to match FeedPage.jsx
const ReelView = ({ items, onBuy }) => {
  
  // Guard clause if no items are found
  if (!items || items.length === 0) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center text-white">
        <p>No reels available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-full snap-y snap-mandatory overflow-y-scroll bg-black hide-scrollbar">
      {items.map((item) => (
        <div 
          key={item._id} 
          className="relative h-screen w-full snap-start flex flex-col justify-end overflow-hidden"
        >
          {/* Background Video */}
          {item.video ? (
            <video 
              src={item.video} 
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay 
              loop 
              muted 
              playsInline // Important for mobile browsers
            />
          ) : (
            <div className="absolute inset-0 bg-gray-900 flex items-center justify-center text-gray-500">
              No Video Content
            </div>
          )}

          {/* Overlay Content */}
          <div className="relative z-10 p-6 pb-24 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white">
            <div className="flex items-center gap-3 mb-3">
              {/* Profile Image (Usually from foodPartner) */}
              <img 
                src={item.foodPartner?.profilePic || "/default-avatar.png"} 
                className="w-12 h-12 rounded-full border-2 border-orange-500 object-cover" 
                alt={item.foodPartner?.name}
              />
              <div>
                <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
                <p className="text-xs text-orange-400 font-medium">
                  @{item.foodPartner?.name || "Premium Kitchen"}
                </p>
              </div>
            </div>
            
            <p className="text-sm mb-6 line-clamp-2 opacity-90 max-w-[80%]">
              {item.description}
            </p>
            
            {/* Action Buttons */}
            <div className="flex gap-3">
              <button 
                onClick={() => onBuy(item)}
                className="flex-1 bg-orange-500 py-3 rounded-xl font-bold hover:bg-orange-600 active:scale-95 transition-all shadow-lg shadow-orange-500/20"
              >
                Buy Now - Rs. {item.price}
              </button>
              
              <button className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl hover:bg-white/20 transition">
                <span className="text-xs font-semibold">View Partner</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReelView;