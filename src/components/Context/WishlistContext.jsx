// src/context/WishlistContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRemoveId, setLoadingRemoveId] = useState(null);

  // تهيئة الـ Headers
  const headers = {
    token: localStorage.getItem('token')
  };

  // إضافة منتج للمفضلة
  async function addToWishlist(productId) {
    try {
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId }, { headers });
      console.log('Added to Wishlist:', data);
      getProductsWishlist(); // إعادة جلب المفضلة بعد الإضافة

      toast.success(data.message, {
        duration: 5000,
        position: 'top-right',
      });
    } catch (err) {
      console.error('Error adding to wishlist:', err);
      toast.error(err.response?.data?.message || 'Error adding to wishlist');
    }
  };

  // جلب المنتجات في المفضلة
  async function getProductsWishlist() {
    setLoading(true); // تفعيل حالة التحميل
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers });
      console.log('Wishlist Data:', data);
      setWishlist(data.data || []); // التحقق من البيانات

    } catch (err) {
      console.error('Error fetching wishlist:', err);
    } finally {
      setLoading(false); // إيقاف حالة التحميل
    }
  }

  // إزالة منتج من المفضلة
  async function removeFromWishlist(id) {
    setLoadingRemoveId(id); // تفعيل حالة التحميل للمنتج المحدد
    try {
      let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { headers });
      console.log('Removed from Wishlist:', data);
      getProductsWishlist(); // تحديث المفضلة بعد الحذف

      toast.success(data.status, {
        duration: 1000,
        position: 'top-right',
      });
    } catch (err) {
      console.error('Error removing from wishlist:', err);
      toast.error(err.response?.data?.message || 'Error removing from wishlist');
    } finally {
      setLoadingRemoveId(null); // إيقاف حالة التحميل
    }
  };

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
