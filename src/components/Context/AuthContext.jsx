import { createContext, useEffect } from 'react'
import React, { useState } from 'react'


export let AuthContext = createContext(null)

export default function AuthContextProvider({ children }) {
  let [token, setToken] = useState(null)
  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])
  return <>
    <AuthContext.Provider value={{ token, setToken }}>
      {children}

    </AuthContext.Provider>
  </>

}
