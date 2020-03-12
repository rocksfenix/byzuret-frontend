import { getItem, setItem, removeItem } from './localStorage'

const isBrowser = typeof window !== 'undefined'

const getUser = () => getItem('user') || {}

export const getIsLoggedIn = () => {
  if (!isBrowser) return false

  const user = getUser()
  return !!user._id
}

export const getCurrentUser = () => isBrowser && getUser()

export const logout = () => {
  if (!isBrowser) return

  console.log('Ensuring the `user` property exists.')
  removeItem('token')
  removeItem('refreshToken')
  removeItem('user')
  document.location.replace('/?signout=succesfully')
}

export const signin = ({ user, token, refreshToken }) => {
  setItem('token', token)
  setItem('refreshToken', refreshToken)
  setItem('user', user)
  // navigate('/dashboard')
  document.location.replace('/dashboard')
}
