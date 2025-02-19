import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { CartContext } from "../Context/CartContext";
import { WishlistContext } from "../Context/WishlistContext";

export default function ProductsCard({ product }) {
  const { imageCover, description, price, title, _id, ratingsAverage } = product;
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, wishlist } = useContext(WishlistContext);
  const [liked, setLiked] = useState(wishlist.some(item => item._id === _id));
  const [animate, setAnimate] = useState(false);

  const toggleWishlist = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 500);

    if (liked) {
      removeFromWishlist(_id);
    } else {
      addToWishlist(product);
    }
    setLiked(!liked);
  };

  const fullStars = Math.floor(ratingsAverage);
  const hasHalfStar = ratingsAverage % 1 !== 0;
  const totalStars = 5;

  return (
    <div className="w-full md:w-full p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:-translate-y-2">
      <Link to={`/details/${_id}`} className="block">
        <img
          className="rounded-lg w-full h-44 object-cover"
          src={imageCover}
          alt="Product"
        />
        <div className="py-3">
          <h5 className="text-base font-bold text-gray-800 dark:text-gray-200">
            {title.length > 40 ? `${title.slice(0, 37)}...` : title}
          </h5>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {description?.slice(0, 50)}... <span className="text-gray-500">Show More</span>
          </p>
          <div className="flex items-center mt-2">
            {[...Array(fullStars)].map((_, index) => (
              <FaStar key={index} className="text-yellow-400 text-sm" />
            ))}
            {hasHalfStar && <FaStarHalfAlt className="text-yellow-400 text-sm" />}
            {[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
              <FaStar key={index + fullStars + 1} className="text-gray-300 text-sm" />
            ))}
            <span className="ml-2 text-gray-600 dark:text-gray-400 text-sm font-medium">
              {ratingsAverage.toFixed(1)}
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-lg font-bold text-green-600 dark:text-green-400">
              ${price}
            </span>
          </div>
        </div>
      </Link>

      <button
        onClick={toggleWishlist}
        className={`absolute top-3 right-3 text-2xl transition-transform duration-300 ease-in-out hover:rotate-12 active:scale-95 transform hover:scale-125 focus:outline-none ${liked ? "text-red-500" : "text-gray-400"} ${animate ? "animate-bounce" : ""}`}
      >
        <FaHeart />
      </button>

      <button
        onClick={() => addToCart(_id)}
        className="w-full mt-4 text-white bg-green-600 hover:bg-green-700 hover:scale-105 transition-transform duration-300 ease-in-out focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
