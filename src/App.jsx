import './app.css'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import About from './components/About/About'
import Brands from './components/Brands/Brands'
import Cart from './components/Cart/Cart'

import Categories from './components/Categories/Categories'
import Login from './components/Login/Login'
import NotFound from './components/NotFound/NotFound'
import Products from './components/Products/Products'
import Register from './components/Register/Register'
import AuthContextProvider from './components/Context/AuthContext'
import { WishlistProvider } from './components/Context/WishlistContext'
import Gurad from './components/Gurad/Gurad'
import AuthGurad from './components/AuthGurad/AuthGurad'




import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Details from './components/Details/Details'
import Wishlist from './components/WishList/Wishlist'
import CartContextProvider from './components/Context/CartContext'
import { Toaster } from 'react-hot-toast'
import CheckOut from './components/CheckOut/CheckOut'
import AllOrders from './components/AllOrders/AllOrders'


const queryClient = new QueryClient()

let router = createHashRouter([

  {
    path: '', element: <Layout />, children: [
      { index: true, element: <Gurad><Home /></Gurad> },
      { path: 'about', element: <Gurad><About /></Gurad> },
      { path: 'allorders', element: <Gurad><AllOrders /></Gurad> },
      { path: 'brands', element: <Gurad><Brands /></Gurad> },
      { path: 'wishlist', element: <Gurad><Wishlist /></Gurad> },
      { path: 'products', element: <Gurad><Products /></Gurad> },
      { path: 'cart', element: <Gurad><Cart /></Gurad> },
      { path: 'checkout', element: <Gurad><CheckOut /></Gurad> },
      { path: 'categories', element: <Gurad><Categories /></Gurad> },
      { path: 'login', element: <AuthGurad><Login /></AuthGurad> },
      { path: '*', element: <NotFound /> },
      { path: 'details/:id', element: <Gurad><Details /></Gurad> },
      { path: 'register', element: <AuthGurad><Register /></AuthGurad> },
    ]
  }
])

export default function App() {
  return (
    <AuthContextProvider>
      <CartContextProvider>
        <WishlistProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <Toaster />
          </QueryClientProvider>
        </WishlistProvider>
      </CartContextProvider>
    </AuthContextProvider>
  )
}
