// import React from 'react';

// export default function Register() {
//   return (

//     <div className="w-full container min-h-screen flex justify-center items-center bg-gray-100">
//       <form className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center text-green-600 mb-4">Register Now</h2>

//         <label className="block text-sm font-medium">Name</label>
//         <input type="text" className="w-full border p-2 rounded mb-2" />

//         <label className="block text-sm font-medium">Email</label>
//         <input type="email" className="w-full border p-2 rounded mb-2" />

//         <label className="block text-sm font-medium">Phone</label>
//         <input type="text" className="w-full border p-2 rounded mb-2" />

//         <label className="block text-sm font-medium">Password</label>
//         <input type="password" className="w-full border p-2 rounded mb-2" />

//         <label className="block text-sm font-medium">Confirm Password</label>
//         <input type="password" className="w-full border p-2 rounded mb-4" />

//         <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }





import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

export default function Register() {
  let navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleRegister(formValues) {
    setIsLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formValues)
      .then((apiResponse) => {
        if (apiResponse?.data?.message === "success") {
          localStorage.setItem("userToken", apiResponse.data.token);
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
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(20, "Max length is 20 characters")
      .required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian number")
      .required("Phone is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "Password must start with uppercase & be 6-11 characters")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: validateSchema,
    onSubmit: handleRegister,
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="container max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">Register Now</h2>

        {apiError && (
          <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 rounded-lg">{apiError}</div>
        )}

        <form onSubmit={formik.handleSubmit}>
          {["name", "email", "phone", "password", "rePassword"].map((field, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-700 font-medium capitalize">
                {field === "rePassword" ? "Confirm Password" : field}
              </label>
              <input
                type={field.includes("password") ? "password" : field === "email" ? "email" : "text"}
                name={field}
                value={formik.values[field]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {formik.errors[field] && formik.touched[field] && (
                <div className="text-red-500 text-sm mt-1">{formik.errors[field]}</div>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={isLoading}
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:opacity-50"
          >
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Register"}
          </button>

        </form>
      </div>
    </div>
  );
}
