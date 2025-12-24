import React, { useState, useEffect } from 'react';
import ReelView from '../../components/customer/ReelView'
import MenuView from '../../components/customer/MenuView';
import CartDrawer from '../../components/customer/CartDrawer';
import { getMenuItems } from '../../Services/menuService';

const FeedPage = () => {
    const [items, setItems] = useState([]);
    const [cart, setCart] = useState([]);
    const [viewMode, setViewMode] = useState('reel'); // 'reel' or 'grid'

    useEffect(() => {
        const loadMenu = async () => {
            try {
                const data = await getMenuItems();
                setItems(data.menuItems);
            } catch (err) {
                console.error("Failed to load menu", err);
            }
        };
        loadMenu();
    }, []);

    const handleAddToCart = (item) => {
        setCart((prev) => [...prev, item]);
    };

    return (
        <div className="relative">
            {/* Toggle Switch */}
            <div className="fixed top-20 right-4 z-50">
                <button 
                    onClick={() => setViewMode(viewMode === 'reel' ? 'grid' : 'reel')}
                    className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white border border-white/30"
                >
                    {viewMode === 'reel' ? 'View Grid' : 'View Reels'}
                </button>
            </div>

            {viewMode === 'reel' ? (
                <ReelView items={items} onBuy={handleAddToCart} />
            ) : (
                <MenuView items={items} onBuy={handleAddToCart} />
            )}

            <CartDrawer cartItems={cart} />
        </div>
    );
};

export default FeedPage;