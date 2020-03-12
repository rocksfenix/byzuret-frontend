import React, { useState } from 'react'
import { getIsLoggedIn, getCurrentUser, logout } from '../util/auth'
import isMobile from 'ismobilejs'

export const GeneralContext = React.createContext()

export default (props) => {
  const [isShowNavbar, setShowNavbar] = useState(true)

  const isLoggedIn = getIsLoggedIn()
  const user = getCurrentUser()

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
