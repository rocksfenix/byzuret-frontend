import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby'
import { getIsLoggedIn, getCurrentUser, logout } from '../util/auth'
import isMobile from 'ismobilejs'

export const GeneralContext = React.createContext()

export default (props) => {
  const [isShowNavbar, setShowNavbar] = useState(true)

  const isLoggedIn = getIsLoggedIn()
  const user = getCurrentUser()

  // Hook is necessary to avoid
  // breaking the gatsby build
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    }
  }, [])

  return (
    <GeneralContext.Provider value={{
      isLoggedIn,
      user,
      isShowNavbar,
      setShowNavbar,
      logout,
      isMobile: isMobile()
    }}
    >
      {props.children}
    </GeneralContext.Provider>
  )
}
