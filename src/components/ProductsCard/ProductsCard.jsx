import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { CartContext } from "../Context/CartContext";
import { WishlistContext } from "../Context/WishlistContext"; // تأكد من صحة الاستيراد

export default function ProductsCard({ product }) {
  const { imageCover, description, price, title, _id, ratingsAverage } = product;
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, wishlist } = useContext(WishlistContext); // استخدام الـ Context هنا
  const [liked, setLiked] = useState(wishlist.some(item => item._id === _id)); // التحقق من وجود المنتج في القائمة  
  const [animate, setAnimate] = useState(false);

  const toggleWishlist = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 500);

    if (liked) {
      removeFromWishlist(_id);
    } else {
      addToWishlist(product); // لازم تبعت المنتج كله مش الـ _id بس
    }
    setLiked(!liked);
  };

  // حساب النجوم  
  const fullStars = Math.floor(ratingsAverage);
  const hasHalfStar = ratingsAverage % 1 !== 0;
  const totalStars = 5;

  return (
    <div className="group relative w-60 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-green-500">
      <Link to={`/details/${_id}`} className="block">
        <div className="relative">
          <img
            className="rounded-lg w-full h-44 object-cover transition-all duration-500 group-hover:scale-110"
            src={imageCover}
            alt="Product"
          />
        </div>
        <div className="py-3 flex-grow">
          <h5 className="text-md font-bold text-gray-800 dark:text-gray-200">
            {title.length > 40 ? `${title.slice(0, 37)}...` : title}
          </h5>

          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mt-2">
            {description?.slice(0, 50)}...{" "}
            <span className="text-gray-500">Show More</span>
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

          <div className="mt-3 flex items-center justify-between">
            <span className="text-lg font-bold text-green-600 dark:text-green-400">
              ${price}
            </span>
          </div>
        </div>
      </Link>

      <button

        onClick={toggleWishlist}
        className={`absolute top-3 right-3 text-2xl transition-all duration-300 transform hover:scale-125 focus:outline-none ${liked ? "text-red-500" : "text-gray-400"
          } ${animate ? "animate-bounce" : ""}`}
      >
        <FaHeart />
      </button>

      <button
        onClick={() => addToCart(_id)}
        className="opacity-0 translate-y-6 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:translate-y-0 w-full mt-3 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
