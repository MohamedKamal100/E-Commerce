import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../Context/CartContext';
import { BeatLoader } from 'react-spinners';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cart, updateProdCountToCart, removeProdFromCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState(null);
  const [loadingRemoveId, setLoadingRemoveId] = useState(null);
  const [quantity, setQuantity] = useState({});

  const handleUpdate = async (productId, newCount) => {
    if (newCount < 1) return;
    setLoadingId(productId);
    await updateProdCountToCart(productId, newCount);
    setLoadingId(null);
  };

  const handleRemove = async (productId) => {
    setLoadingRemoveId(productId);
    await removeProdFromCart(productId);
    setLoadingRemoveId(null);
  };

  const handleInputChange = (productId, value) => {
    setQuantity(prev => ({ ...prev, [productId]: value }));
  };

  const handleInputBlur = (productId, value) => {
    const newValue = parseInt(value);
    if (!isNaN(newValue) && newValue > 0) {
      handleUpdate(productId, newValue);
    } else {
      setQuantity(prev => ({
        ...prev,
        [productId]: cart.data.products.find(item => item.product.id === productId).count
      }));
    }
  };

  useEffect(() => {
    if (cart) {
      const initialQuantities = {};
      cart?.data?.products?.forEach(item => {
        initialQuantities[item.product.id] = item.count;
      });
      setQuantity(initialQuantities);
      setLoading(false);
    }
  }, [cart]);

  const totalPrice = cart?.data?.products?.reduce((total, item) => total + (item.price * item.count), 0);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <BeatLoader color="#22c55e" size={15} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-center text-2xl font-bold mb-4">Shopping Cart</h2>
      <div className="mt-8 text-md font-bold text-left">
        <span className="text-md font-medium flex items-center px-4 py-2 rounded-lg lg:inline-block transition-colors duration-300 text-gray-800 hover:text-green-500">Total Price</span>: {totalPrice} EGP
      </div>
      <Link to={`/checkout`}><button className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4">CheckOut</button></Link>
      <div className="grid gap-6 mt-6">
        {cart?.data?.products?.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col sm:flex-row"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <img
              src={item.product.imageCover}
              className="w-full sm:w-48 h-48 object-cover"
              alt={item.product.title}
            />
            <div className="p-4 flex-1">
              <h3 className="text-xl font-semibold text-gray-900">{item.product.title.slice(0, 50)}</h3>
              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => handleUpdate(item.product.id, item.count - 1)}
                  className="p-1 h-8 w-8 text-gray-500 bg-white border rounded-full hover:bg-gray-100"
                  disabled={loadingId === item.product.id}
                >-</button>
                <input
                  type="text"
                  value={quantity[item.product.id] || ''}
                  onChange={(e) => handleInputChange(item.product.id, e.target.value)}
                  onBlur={() => handleInputBlur(item.product.id, quantity[item.product.id])}
                  className="w-14 text-center border rounded-lg"
                />
                <button
                  onClick={() => handleUpdate(item.product.id, item.count + 1)}
                  className="p-1 h-8 w-8 text-gray-500 bg-white border rounded-full hover:bg-gray-100"
                  disabled={loadingId === item.product.id}
                >+</button>
              </div>
              <div className="mt-4 text-lg font-semibold text-gray-900">{item.price * item.count} EGP</div>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleRemove(item.product.id)}
                  className="mt-2 text-red-600 hover:underline"
                  disabled={loadingRemoveId === item.product.id}
                >Remove</button>
                <Link to={`/details/${item.product.id}`} className="text-blue-500 hover:underline">Show Details</Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}