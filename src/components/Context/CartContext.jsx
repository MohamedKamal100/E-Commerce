import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
export const CartContext = createContext()
export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  let headers = { token: localStorage.getItem('token') }
  async function addToCart(productId) {

    try {
      setLoading(true);
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId }, { headers })
      console.log(data);

      getProductsCart()
      toast.success(data.message, {
        duration: 5000,
        position: 'right,top:50px',

        removeDelay: 1000,

      }

      )
      setLoading(false);
    }
    catch (err) {
      console.log(err)
      toast.error(data.message)
    }



  }
  async function removeProdFromCart(productId) {

    try {
      let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers })
      console.log(data);
      getProductsCart()
      toast.success(data.status, {
        duration: 1000,
        position: 'right,top:50px',

        removeDelay: 1000,

      })
    }
    catch (err) {
      console.log(err)
      toast.error(data.status)
    }



  }
  async function updateProdCountToCart(productId, count) {

    try {
      let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count }, { headers })
      console.log(data);
      getProductsCart()
      toast.success(data.status, {
        duration: 1000,
        position: 'right,top:50px',

        removeDelay: 1000,

      })
    }
    catch (err) {
      console.log(err)
      toast.error(data.status)
    }



  }
  async function getProductsCart() {

    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      console.log(data);
      setCart(data)

    }
    catch (err) {
      console.log(err)
    }



  }
  useEffect(() => {
    getProductsCart()
  }, [])

  return <CartContext.Provider value={{ addToCart, cart, updateProdCountToCart, removeProdFromCart }}>

    {children}
  </CartContext.Provider>
}
