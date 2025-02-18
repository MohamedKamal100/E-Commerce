import React from 'react'
import style from './Layout.module.css'
import { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {


  return <>

    <Navbar />
    <div className="container mx-auto mt-10 py-10">
      <Outlet></Outlet>
    </div>
    <Footer />
  </>
}
