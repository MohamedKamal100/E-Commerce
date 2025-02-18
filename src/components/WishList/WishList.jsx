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
      <h2 className="text-2xl font-bold mb-6">My wish List</h2>
      {wishlist?.length === 0 ? (
        <div className="text-center text-gray-600">
          <p className="text-lg">Your wishlist is empty</p>
        </div>
      ) : (
        <div className="space-y-8">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between bg-white shadow-md rounded-lg p-4"
            >
              {/* صورة المنتج */}
              <div className="flex items-center">
                <img
                  src={item.imageCover}
                  alt={item.title}
                  className="w-28 h-28 object-cover rounded-lg mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.title.slice(0, 50)} .... <Link to={`/details/${item._id}`} className="text-blue-500 hover:underline">Show More</Link></h3>
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

              {/* زر الإضافة إلى السلة */}
              <button onClick={() => addToCart(item._id)} className="border border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-semibold rounded-lg px-4 py-2 transition">
                add To Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
