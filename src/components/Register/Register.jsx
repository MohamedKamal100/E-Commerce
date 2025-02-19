




// import React from "react";
// import { useState } from "react";
// import { useFormik } from "formik";
// import { useNavigate } from "react-router-dom";
// import * as Yup from "yup";
// import axios from "axios";

// export default function Register() {
//   let navigate = useNavigate();
//   const [apiError, setApiError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   function handleRegister(formValues) {
//     setIsLoading(true);
//     axios
//       .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formValues)
//       .then((apiResponse) => {
//         if (apiResponse?.data?.message === "success") {
//           localStorage.setItem("userToken", apiResponse.data.token);
//           setIsLoading(false);
//           navigate("/");
//         }
//       })
//       .catch((apiResponse) => {
//         setApiError(apiResponse?.response?.data?.message);
//         setIsLoading(false);
//       });
//   }

//   let validateSchema = Yup.object().shape({
//     name: Yup.string()
//       .matches(/^[a-zA-Z ]+$/, "Name can only contain letters and spaces")
//       .min(3, "Name must be at least 3 characters")
//       .max(20, "Name can't be longer than 20 characters")
//       .required("Name is required"),

//     email: Yup.string()
//       .email("Invalid email format")
//       .required("Email is required"),

//     phone: Yup.string()
//       .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian number")
//       .required("Phone is required"),

//     password: Yup.string()
//       .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,15}$/,
//         "Password must be 6-15 characters and include uppercase, lowercase, number, and special character")
//       .required("Password is required"),

//     rePassword: Yup.string()
//       .oneOf([Yup.ref("password")], "Passwords must match")
//       .required("Confirm Password is required"),
//   });

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       phone: "",
//       email: "",
//       password: "",
//       rePassword: "",
//     },
//     validationSchema: validateSchema,
//     onSubmit: handleRegister,
//   });

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
//       <div className="container max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-8">
//         <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">Register Now</h2>

//         {apiError && (
//           <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 rounded-lg">{apiError}</div>
//         )}

//         <form onSubmit={formik.handleSubmit}>
//           {["name", "email", "phone", "password", "rePassword"].map((field, index) => (
//             <div key={index} className="mb-4">
//               <label className="block text-gray-700 font-medium capitalize">
//                 {field === "rePassword" ? "Confirm Password" : field}
//               </label>
//               <input
//                 type={field.includes("password") ? "password" : field === "email" ? "email" : "text"}
//                 name={field}
//                 value={formik.values[field]}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//               {formik.errors[field] && formik.touched[field] && (
//                 <div className="text-red-500 text-sm mt-1">{formik.errors[field]}</div>
//               )}
//             </div>
//           ))}

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:opacity-50"
//           >
//             {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Register"}
//           </button>

//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

export default function Register() {
  let navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

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
      .matches(/^[a-zA-Z ]+$/, "Name can only contain letters and spaces")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name can't be longer than 20 characters")
      .required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian number")
      .required("Phone is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(15, "Password can't be longer than 15 characters")
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
    <div className="min-h-screen flex justify-center items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-blue-500 to-indigo-600 animate-gradient-xy"></div>
      <div className="relative z-10 container max-w-lg mx-auto backdrop-blur-sm bg-white/50 shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Register Now</h2>

        {apiError && (
          <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 rounded-lg">{apiError}</div>
        )}

        <form onSubmit={formik.handleSubmit}>
          {["name", "email", "phone"].map((field, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-800 font-medium capitalize">
                {field}
              </label>
              <input
                type={field}
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

          {["password", "rePassword"].map((field, index) => (
            <div key={index} className="mb-4 relative">
              <label className="block text-gray-800 font-medium capitalize">
                {field === "rePassword" ? "Confirm Password" : "Password"}
              </label>
              <input
                type={(field === "password" && !showPassword) || (field === "rePassword" && !showRePassword) ? "password" : "text"}
                name={field}
                value={formik.values[field]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
                onClick={() =>
                  field === "password"
                    ? setShowPassword(!showPassword)
                    : setShowRePassword(!showRePassword)
                }
              >
                <i className={`fas fa-eye${(field === "password" && showPassword) || (field === "rePassword" && showRePassword) ? "-slash" : ""}`}></i>
              </span>
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