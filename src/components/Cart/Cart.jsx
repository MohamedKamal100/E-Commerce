
// import React, { useContext, useState, useEffect } from 'react';
// import { CartContext } from '../Context/CartContext';
// import { BeatLoader } from 'react-spinners';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';

// export default function Cart() {
//   const { cart, updateProdCountToCart, removeProdFromCart } = useContext(CartContext);
//   const [loading, setLoading] = useState(true);
//   const [loadingState, setLoadingState] = useState({ id: null, action: null });
//   const [quantity, setQuantity] = useState({});

//   const handleUpdate = async (productId, newCount) => {
//     if (newCount < 1) return;
//     setLoadingState({ id: productId, action: 'update' });
//     await updateProdCountToCart(productId, newCount);
//     setLoadingState({ id: null, action: null });
//   };

//   const handleRemove = async (productId) => {
//     setLoadingState({ id: productId, action: 'remove' });
//     await removeProdFromCart(productId);
//     setLoadingState({ id: null, action: null });
//   };

//   const handleInputChange = (productId, value) => {
//     setQuantity(prev => ({ ...prev, [productId]: value }));
//   };

//   const handleInputBlur = (productId, value) => {
//     const newValue = parseInt(value);
//     if (!isNaN(newValue) && newValue > 0) {
//       handleUpdate(productId, newValue);
//     } else {
//       setQuantity(prev => ({
//         ...prev,
//         [productId]: cart.data.products.find(item => item.product.id === productId).count
//       }));
//     }
//   };

//   useEffect(() => {
//     if (cart) {
//       const initialQuantities = {};
//       cart?.data?.products?.forEach(item => {
//         initialQuantities[item.product.id] = item.count;
//       });
//       setQuantity(initialQuantities);
//       setLoading(false);
//     }
//   }, [cart]);

//   const totalPrice = cart?.data?.products?.reduce((total, item) => total + (item.price * item.count), 0);

//   if (loading) {
//     return (
//       <div className="w-full h-screen flex justify-center items-center">
//         <BeatLoader color="#22c55e" size={15} />
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-center text-2xl font-bold mb-4 text-green-500
//   transition-all duration-700
//   animate-fade-in-out">
//         Shopping Cart
//       </h2>



//       <div className="flex flex-col items-start mt-8 gap-4 lg:flex-row lg:justify-between lg:items-center">
//         <span className="text-lg font-bold text-gray-800">
//           Total Price: {totalPrice} EGP
//         </span>
//         <Link to={`/checkout`}>
//           <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300">
//             CheckOut
//           </button>
//         </Link>
//       </div>

//       <div className="grid gap-6 mt-6">
//         {cart?.data?.products?.map((item, index) => (
//           <motion.div
//             key={index}
//             className="bg-white shadow-md rounded-2xl overflow-hidden flex flex-col sm:flex-row p-4 transition-shadow hover:shadow-lg"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: index * 0.2 }}
//           >
//             <img
//               src={item.product.imageCover}
//               className="w-full sm:w-40 h-40 object-cover rounded-lg mb-4 sm:mb-0"
//               alt={item.product.title}
//             />

//             <div className="flex-1 sm:ml-4">
//               <h3 className="text-lg font-semibold text-gray-900">
//                 {item.product.title.slice(0, 50)}
//               </h3>

//               <div className="mt-2 flex items-center gap-2">
//                 {loadingState.id === item.product.id && loadingState.action === 'update' ? (
//                   <BeatLoader color="#22c55e" size={8} />
//                 ) : (
//                   <>
//                     <button
//                       onClick={() => handleUpdate(item.product.id, item.count - 1)}
//                       className="p-1 h-8 w-8 text-gray-500 bg-white border rounded-full hover:bg-gray-100"
//                       disabled={loadingState.id === item.product.id}
//                     >-</button>

//                     <input
//                       type="text"
//                       value={quantity[item.product.id] || ''}
//                       onChange={(e) => handleInputChange(item.product.id, e.target.value)}
//                       onBlur={() => handleInputBlur(item.product.id, quantity[item.product.id])}
//                       className="w-14 text-center border rounded-lg"
//                       disabled={loadingState.id === item.product.id}
//                     />

//                     <button
//                       onClick={() => handleUpdate(item.product.id, item.count + 1)}
//                       className="p-1 h-8 w-8 text-gray-500 bg-white border rounded-full hover:bg-gray-100"
//                       disabled={loadingState.id === item.product.id}
//                     >+</button>
//                   </>
//                 )}
//               </div>

//               <div className="mt-2 text-lg font-semibold text-gray-900">
//                 {item.price * item.count} EGP
//               </div>

//               <div className="flex items-center justify-between">
//                 {loadingState.id === item.product.id && loadingState.action === 'remove' ? (
//                   <BeatLoader color="#dc2626" size={8} />
//                 ) : (
//                   <button
//                     onClick={() => handleRemove(item.product.id)}
//                     className="mt-2 text-red-600 hover:underline"
//                     disabled={loadingState.id === item.product.id}
//                   >Remove</button>
//                 )}
//                 <Link to={`/details/${item.product.id}`} className="text-blue-500 hover:underline">
//                   Show Details
//                 </Link>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../Context/CartContext';
import { BeatLoader } from 'react-spinners';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cart, updateProdCountToCart, removeProdFromCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [loadingState, setLoadingState] = useState({ id: null, action: null });
  const [quantity, setQuantity] = useState({});
  const navigate = useNavigate();

  const handleUpdate = async (productId, newCount) => {
    if (newCount < 1) return;
    setLoadingState({ id: productId, action: 'update' });
    await updateProdCountToCart(productId, newCount);
    setLoadingState({ id: null, action: null });
  };

  const handleRemove = async (productId) => {
    setLoadingState({ id: productId, action: 'remove' });
    await removeProdFromCart(productId);
    setLoadingState({ id: null, action: null });
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
    <div className="container mx-auto p-12">
      <h2 className="text-center text-2xl font-bold mb-4 text-green-500 
  transition-all duration-700 
  animate-fade-in-out">
        Shopping Cart
      </h2>

      {cart?.data?.products?.length === 0 ? (
        <p className="text-center min-h-screen col-span-full flex flex-col justify-center items-center bg-gradient-to-b from-gray-100 to-gray-300 text-gray-800 rounded-lg shadow-md">
          <span className="text-7xl mb-4 animate-bounce">🔍</span>
          <span className="text-3xl font-extrabold">No Products Found</span>
          <span className="text-gray-600 mt-2 text-lg">Try exploring Products!</span>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 px-6 py-2 bg-green-500 text-white rounded-full shadow hover:bg-green-600 transition duration-300"
          >
            Go Back
          </button>
        </p>
      ) : (
        <>
          <div className="flex flex-col items-start mt-8 gap-4 lg:flex-row lg:justify-between lg:items-center">
            <span className="text-lg font-bold text-green-800">
              Total Price: {totalPrice} EGP
            </span>
            <Link to={`/checkout`}>
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300"
                disabled={cart?.data?.products?.length === 0}
              >
                CheckOut
              </button>
            </Link>
          </div>

          <div className="grid gap-6 mt-6">
            {cart?.data?.products?.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-md rounded-2xl overflow-hidden flex flex-col sm:flex-row p-4 transition-shadow hover:shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <img
                  src={item.product.imageCover}
                  className="w-full sm:w-40 h-40 object-cover rounded-lg mb-4 sm:mb-0"
                  alt={item.product.title}
                />

                <div className="flex-1 sm:ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.product.title.slice(0, 50)}
                  </h3>

                  <div className="mt-2 flex items-center gap-2">
                    {loadingState.id === item.product.id && loadingState.action === 'update' ? (
                      <BeatLoader color="#22c55e" size={8} />
                    ) : (
                      <>
                        <button
                          onClick={() => handleUpdate(item.product.id, item.count - 1)}
                          className="p-1 h-8 w-8 text-gray-500 bg-white border rounded-full hover:bg-gray-100"
                          disabled={loadingState.id === item.product.id}
                        >-</button>

                        <input
                          type="text"
                          value={quantity[item.product.id] || ''}
                          onChange={(e) => handleInputChange(item.product.id, e.target.value)}
                          onBlur={() => handleInputBlur(item.product.id, quantity[item.product.id])}
                          className="w-14 text-center border rounded-lg"
                          disabled={loadingState.id === item.product.id}
                        />

                        <button
                          onClick={() => handleUpdate(item.product.id, item.count + 1)}
                          className="p-1 h-8 w-8 text-gray-500 bg-white border rounded-full hover:bg-gray-100"
                          disabled={loadingState.id === item.product.id}
                        >+</button>
                      </>
                    )}
                  </div>

                  <div className="mt-2 text-lg font-semibold text-gray-900">
                    {item.price * item.count} EGP
                  </div>

                  <div className="flex items-center justify-between">
                    {loadingState.id === item.product.id && loadingState.action === 'remove' ? (
                      <BeatLoader color="#dc2626" size={8} />
                    ) : (
                      <button
                        onClick={() => handleRemove(item.product.id)}
                        className="mt-2 text-red-600 hover:underline"
                        disabled={loadingState.id === item.product.id}
                      >Remove</button>
                    )}
                    <Link to={`/details/${item.product.id}`} className="text-blue-500 hover:underline">
                      Show Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
