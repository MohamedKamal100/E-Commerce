import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function AuthGurad({ children }) {
  const token = localStorage.getItem('token')
  return <>

    {token ? <Navigate to={'/'} /> : children}
  </>

}
