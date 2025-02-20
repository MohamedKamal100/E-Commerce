import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';

export default function Login() {
  let navigate = useNavigate();
  const { token, setToken } = useContext(AuthContext);

  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleLogin(formValues) {
    setIsLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formValues)
      .then((apiResponse) => {
        if (apiResponse?.data?.message === 'success') {
          setToken(apiResponse.data.token);
          localStorage.setItem('token', apiResponse.data.token);
          setIsLoading(false);
          navigate('/');
        }
      })
      .catch((apiResponse) => {
        setApiError(apiResponse?.response?.data?.message);
        setIsLoading(false);
      });
  }

  let validateSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, 'Password must start with uppercase & be at least 8 characters')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validateSchema,
    onSubmit: handleLogin,
  });

  return (
    <div className="py-6 max-w-md mx-auto">
      {apiError && (
        <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
          <svg
            className="shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 1 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          {apiError}
        </div>
      )}

      <h2 className="text-3xl font-bold text-green-600 mb-6">Login Now</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <div className="relative z-0 w-full group">
          <input
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-gray-100 rounded-md border border-gray-300 focus:border-green-500 focus:ring-green-500"
            placeholder="Enter Your Email"
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
          )}
        </div>

        <div className="relative z-0 w-full group">
          <input
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-gray-100 rounded-md border border-gray-300 focus:border-green-500 focus:ring-green-500"
            placeholder="Enter Your Password"
          />
          {formik.errors.password && formik.touched.password && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.password}</p>
          )}
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
              'Login'
            )}
          </button>

          <p>
            Didn't have an account yet?{' '}
            <span className="font-semibold">
              <Link to={'/register'} className="text-green-600 hover:underline">
                Register Now
              </Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}
