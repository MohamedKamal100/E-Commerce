import React, { useState, useEffect } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/orders/user/6407cf6f515bdcf347c09f17",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders(response.data);
    } catch (err) {
      setError("Failed to fetch orders. Please try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <BeatLoader color="#22c55e" size={15} />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-center text-2xl font-bold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <p className="text-center text-gray-600">You have no orders yet.</p>
      ) : (
        <div className="grid gap-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Order ID: {order.id}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Status: {order.status}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Total Price: {order.totalPrice} EGP
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <Link
                to={`/orderdetails/${order.id}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
