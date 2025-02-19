// src/context/WishlistContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRemoveId, setLoadingRemoveId] = useState(null);

  // إضافة منتج للمفضلة
  async function addToWishlist(productId) {
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      );
      console.log('Added to Wishlist:', data);
      getProductsWishlist();
      toast.success(data.message || 'Added successfully');
    } catch (err) {
      console.error('Error adding to wishlist:', err);
      toast.error(err.response?.data?.message || 'Error adding to wishlist');
    }
  }

  // جلب المنتجات في المفضلة
  async function getProductsWishlist() {
    setLoading(true);
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      console.log('Wishlist Data:', data);
      setWishlist(data.data || []);
    } catch (err) {
      console.error('Error fetching wishlist:', err);
    } finally {
      setLoading(false);
    }
  }

  // إزالة منتج من المفضلة
  async function removeFromWishlist(id) {
    setLoadingRemoveId(id);
    try {
      let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      console.log('Removed from Wishlist:', data);
      getProductsWishlist();
      toast.success(data.status || 'Removed successfully');
    } catch (err) {
      console.error('Error removing from wishlist:', err);
      toast.error(err.response?.data?.message || 'Error removing from wishlist');
    } finally {
      setLoadingRemoveId(null);
    }
  }

  // جلب المنتجات عند تحميل الصفحة
  useEffect(() => {
    getProductsWishlist();
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, loading, loadingRemoveId, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
