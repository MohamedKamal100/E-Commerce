import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ContactUs = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      message: Yup.string().required('Message is required')
    }),
    onSubmit: values => {
      console.log('Form data:', values);
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={formik.handleSubmit} className="w-full max-w-lg p-8 shadow-2xl rounded-2xl bg-white mx-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Contact Us</h2>

        <div className="relative mb-6">
          <input
            type="text"
            name="name"
            placeholder=" "
            className="w-full p-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 peer transition-all duration-300"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          <label className="absolute left-3 top-3 text-gray-500 pointer-events-none transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-green-500 peer-valid:top-0 peer-valid:text-xs peer-valid:text-green-500">
            Name
          </label>
          {formik.touched.name && formik.errors.name && <p className="text-red-500 text-sm">{formik.errors.name}</p>}
        </div>

        <div className="relative mb-6">
          <input
            type="email"
            name="email"
            placeholder=" "
            className="w-full p-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 peer transition-all duration-300"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <label className="absolute left-3 top-3 text-gray-500 pointer-events-none transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-green-500 peer-valid:top-0 peer-valid:text-xs peer-valid:text-green-500">
            Email
          </label>
          {formik.touched.email && formik.errors.email && <p className="text-red-500 text-sm">{formik.errors.email}</p>}
        </div>

        <div className="relative mb-6">
          <textarea
            name="message"
            placeholder=" "
            className="w-full p-3 border border-gray-300 rounded-2xl h-32 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none peer transition-all duration-300"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
          />
          <label className="absolute left-3 top-3 text-gray-500 pointer-events-none transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-green-500 peer-valid:top-0 peer-valid:text-xs peer-valid:text-green-500">
            Message
          </label>
          {formik.touched.message && formik.errors.message && <p className="text-red-500 text-sm">{formik.errors.message}</p>}
        </div>

        <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-2xl hover:bg-green-700 transition-all duration-300">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
