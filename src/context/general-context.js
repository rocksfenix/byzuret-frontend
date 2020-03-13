import React, { useState } from 'react'
import { getIsLoggedIn, getCurrentUser, logout } from '../util/auth'
import isMobile from 'ismobilejs'
import api from '../util/api'

export const GeneralContext = React.createContext()

export default (props) => {
  const [isShowNavbar, setShowNavbar] = useState(true)

  const isLoggedIn = getIsLoggedIn()
  const user = getCurrentUser()

  const onSignout = () => {
    // Handler other logout actions here
    logout()
  }

  const onRebuildApp = async () => {
    const confirm = window.confirm('Do you sure, you will re-build the site?')

    if (!confirm) return

    const res = await api.General.rebuild()
    // TODO: handle response here!
    console.log(res)
  }
  return (
    <GeneralContext.Provider value={{
      isLoggedIn,
      user,
      isShowNavbar,
      setShowNavbar,
      onSignout,
      onRebuildApp,
      isMobile: isMobile()
    }}
    >
      {props.children}
    </GeneralContext.Provider>
  )
}
