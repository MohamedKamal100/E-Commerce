// src/components/WishlistComponent.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../Context/WishlistContext';
import { CartContext } from "../Context/CartContext";
import { BeatLoader } from 'react-spinners';


export default function Wishlist() {
  const { wishlist, loading, loadingRemoveId, removeFromWishlist } = useWishlist();
  const { addToCart } = useContext(CartContext);
  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <BeatLoader color="#22c55e" size={15} />      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-center text-2xl font-bold mb-4 text-green-500 
  transition-all duration-700  py-6
  animate-fade-in-out">
        Your Wish Lists
      </h2>
      {wishlist?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-600 py-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h18M4 6h16M5 9h14m-9 3h4m-7 3h10m-6 3h2"
            />
          </svg>
          <p className="text-xl font-semibold">Your wishlist is empty</p>
          <p className="text-gray-500 mb-6">Start adding items you love!</p>
          <Link to={'/products'}> <button
            className="px-6 py-2 border border-gray-300 rounded-2xl text-gray-700 hover:bg-gray-100 transition">
            Explore Products
          </button></Link>
        </div>
      ) : (
        <div className="space-y-8">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between bg-white shadow-md rounded-lg p-4"
            >
              <div className="flex items-center">
                <img
                  src={item.imageCover}
                  alt={item.title}
                  className="w-28 h-28 object-cover rounded-lg mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.title.slice(0, 25)} .... <Link to={`/details/${item._id}`} className="text-blue-500 hover:underline">Show More</Link></h3>
                  <p className="text-green-600 font-bold text-xl">{item.price} EGP</p>
                  <button
                    onClick={() => removeFromWishlist(item._id)}
                    className="text-red-500 hover:text-red-600 flex items-center mt-2"
                  >
                    <i className="ri-delete-bin-line mr-1"></i>
                    {loadingRemoveId === item._id ? 'Removing...' : 'Remove'}
                  </button>
                </div>
              </div>

              <button onClick={() => addToCart(item._id)} className="border  border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-semibold rounded-lg px-4 py-2 transition">
                add To Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
