

import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

export default function Login() {
  let navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleLogin(formValues) {
    setIsLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formValues)
      .then((apiResponse) => {
        if (apiResponse?.data?.message === "success") {
          setToken(apiResponse.data.token);
          localStorage.setItem("token", apiResponse.data.token);
          setIsLoading(false);
          navigate("/");
        }
      })
      .catch((apiResponse) => {
        setApiError(apiResponse?.response?.data?.message);
        setIsLoading(false);
      });
  }

  let validateSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(15, "Password can't be longer than 15 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validateSchema,
    onSubmit: handleLogin,
  });

  return (
    <div className="min-h-screen flex justify-center items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-blue-500 to-indigo-600 animate-gradient-xy"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-indigo-600 opacity-70 animate-gradient-xy"></div>
      <div className="relative z-10 w-full max-w-md mx-auto backdrop-blur-md bg-white/30 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Login Now</h2>

        {apiError && (
          <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 rounded-lg">{apiError}</div>
        )}

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-800 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter Your Email"
            />
            {formik.errors.email && formik.touched.email && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            )}
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-800 font-medium">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter Your Password"
            />
            <span
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`fas fa-eye${showPassword ? "-slash" : ""}`}></i>
            </span>
            {formik.errors.password && formik.touched.password && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            )}
          </div>

          <div className="sm:flex-col lg:flex-row justify-between items-center gap-6">
            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
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
                "Login"
              )}
            </button>

            <p className="my-4 text-bold text-blue-600 text-lg">
              Don't have an account?{" "}
              <span className="font-semibold">
                <Link to={"/register"} className="text-green-600 text-sm hover:underline">
                  Register Now
                </Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
