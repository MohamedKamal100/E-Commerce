import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';



export default function CheckOut() {
  let { CheckOut, cart } = useContext(CartContext)
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },

    onSubmit: () => handleCheckOut(`${cart.cartId}`, 'http://localhost:5174'),
  });


  async function handleCheckOut(cartId, url) {
    let { data } = await CheckOut(cartId, url, formik.values);
    if (data.status === 'success') {
      window.location.href = data.session.url;
    }
  }




  return <>

    <div className='py-6 max-w-xl mx-auto'>
      <h2 className="text-3xl font-bold text-green-600 mb-6">CheckOut Now</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <div className="relative z-0 w-full group">
          <input
            value={formik.values.details}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            name="details"
            id="details"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-gray-100 rounded-md border border-gray-300 focus:border-green-500 focus:ring-green-500"
            placeholder="Enter Your details"
          />

        </div>

        <div className="relative z-0 w-full group">
          <input
            value={formik.values.city}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            name="city"
            id="city"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-gray-100 rounded-md border border-gray-300 focus:border-green-500 focus:ring-green-500"
            placeholder="Enter Your city"
          />

        </div>

        <div className="relative z-0 w-full group">
          <input
            value={formik.values.phone}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="tel"
            name="phone"
            id="phone"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-gray-100 rounded-md border border-gray-300 focus:border-green-500 focus:ring-green-500"
            placeholder="Enter Your phone"
          />

        </div>

        <div className="flex items-center gap-6">
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center flex items-center justify-center"
            disabled={isLoading} // تعطيل الزر أثناء التحميل
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              'CheckOut'
            )}
          </button>


        </div>

      </form>
    </div>
  </>;
}
