import React, { useState } from 'react';

const CartDrawer = ({ cartItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Calculate Total Price
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <>
      {/* Floating Cart Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-orange-600 text-white p-4 rounded-full shadow-2xl flex items-center gap-2 hover:bg-orange-700 transition-all active:scale-90"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <span className="font-bold">{cartItems.length}</span>
      </button>

      {/* Overlay Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer Panel */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white z-[70] shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-xl font-bold">Your Order</h2>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 text-2xl">&times;</button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto py-4">
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
            ) : (
              cartItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center mb-4 bg-gray-50 p-3 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">Rs. {item.price}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout Section */}
          <div className="border-t pt-4">
            <div className="flex justify-between mb-4">
              <span className="font-semibold text-gray-600">Total:</span>
              <span className="font-bold text-xl text-gray-900">Rs. {total}</span>
            </div>
            <button 
              disabled={cartItems.length === 0}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 disabled:bg-gray-300 transition-colors"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;