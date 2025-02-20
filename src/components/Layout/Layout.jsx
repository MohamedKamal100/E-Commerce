import React from 'react'
import style from './Layout.module.css'
import { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {


  return <>

    <Navbar />
    <div className=" mx-auto mt-5 pt-5 min-h-screen">
      <Outlet></Outlet>
    </div>
    <Footer />
  </>
}
