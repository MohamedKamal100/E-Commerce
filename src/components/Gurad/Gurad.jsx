import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Gurad({ children }) {
  const token = localStorage.getItem('token')
  return <>

    {token ? children : <Navigate to={'/login'} />}
  </>

}
