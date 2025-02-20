import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.h1
          className="text-5xl font-bold text-blue-600 text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Us
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Welcome to our leading e-commerce platform where quality meets convenience. Our mission is to deliver an unparalleled shopping experience with a vast range of products, competitive pricing, and exceptional customer service. We are committed to making online shopping easy, enjoyable, and accessible for everyone.
        </motion.p>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Wide Range of Products', description: 'Discover everything from electronics and fashion to home essentials and more.' },
            { title: 'Fast & Secure Delivery', description: 'Enjoy quick and reliable delivery, ensuring your order reaches you in perfect condition.' },
            { title: '24/7 Customer Support', description: 'Our dedicated support team is available around the clock to assist you with any inquiries.' },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 shadow-md rounded-xl p-6 text-center hover:shadow-xl transition-transform duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * index }}
            >
              <h3 className="text-2xl font-semibold text-blue-600 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
