import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import Slider from 'react-slick';
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';

export default function Details() {
  const { addToCart } = useContext(CartContext);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  let [details, setDetails] = useState(null);
  let [relatedProducts, setRelatedProducts] = useState([]);
  let [loading, setLoading] = useState(true);
  let [loadingAddToCart, setLoadingAddToCart] = useState(false);
  let [clickedProduct, setClickedProduct] = useState(null);
  let { id } = useParams();
  const navigate = useNavigate();

  async function getProductDetails(ProductId) {
    setLoading(true);
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${ProductId}`);
      setDetails(data.data);
      getRelatedProducts(data.data.category._id);
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  async function getRelatedProducts(categoryId) {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`);
      setRelatedProducts(data.data.filter((product) => product._id !== id));
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  }

  useEffect(() => {
    getProductDetails(id);
  }, [id]);

  function handleProductClick(productId) {
    setDetails(null);
    setRelatedProducts([]);
    setClickedProduct(productId);
    setLoading(true);
    navigate(`/details/${productId}`);
  }

  async function handleAddToCart(productId) {
    setLoadingAddToCart(true);
    try {
      await addToCart(productId);
    } catch (error) {
      toast.error('Failed to add to cart');
    } finally {
      setLoadingAddToCart(false);
    }
  }

  return (
    <>
      <h2 className="text-4xl font-extrabold px-6 py-2 bg-gradient-to-r from-green-500 via-white to-green-500 text-gray-900 shadow-md tracking-wide rounded-lg">
        Product Details
      </h2>

      {loading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <BeatLoader color="#22c55e" size={15} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 bg-white shadow-lg rounded-lg p-6 group">
          <div className="md:col-span-2 flex justify-center">
            <Slider {...settings} className="w-full max-w-xs md:max-w-full">
              {details?.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image of ${details?.title}`}
                  className="w-full rounded-lg shadow-md transform transition duration-500 ease-in-out hover:scale-105 hover:translate-x-2"
                />
              ))}
            </Slider>
          </div>

          <div className="md:col-span-4 flex flex-col justify-center space-y-4 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">{details?.title}</h2>
            <p className="text-gray-600 leading-relaxed">{details?.description}</p>
            <span className="text-xl font-semibold text-blue-600">{details?.price} $</span>

            {loadingAddToCart ? (
              <div className="w-full md:w-auto flex justify-center">
                <BeatLoader color="#22c55e" size={10} />
              </div>
            ) : (
              <button
                onClick={() => handleAddToCart(details?._id)}
                className="w-full md:w-auto mt-3 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Add to cart
              </button>
            )}
          </div>
        </div>
      )}

      {relatedProducts.length > 0 && (
        <>
          <h2 className="text-3xl font-bold mt-10 mb-4">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((product) => (
              <div
                key={product._id}
                className={`cursor-pointer bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition transform 
                  ${clickedProduct === product._id ? 'scale-95 opacity-70' : 'hover:scale-105'}
                  flex flex-col md:flex-row`} // تعديل هنا
                onClick={() => handleProductClick(product._id)}
              >
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full md:w-1/3 h-40 object-cover rounded-md"
                />
                <div className="mt-2 md:mt-0 md:ml-4 flex flex-col justify-center">
                  <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                  <p className="text-gray-600">{product.price} $</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
