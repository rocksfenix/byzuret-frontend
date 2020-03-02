import React from 'react'
import { useFormik } from 'formik'
import { navigate } from 'gatsby'
import { Auth } from '../util/api'
import { getIsLoggedIn, signin } from '../util/auth'

const validate = values => {
  const errors = {}
  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 6) {
    errors.password = 'Must be min 6 characters'
  }

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  return errors
}

const Login = () => {
  const isLoggedIn = getIsLoggedIn()

  const formik = useFormik({
    initialValues: {
      password: '123456789',
      email: 'puxerop@gmail.com'
    },
    validate,
    onSubmit: async (formData) => {
      const { error, errorMessage, token, refreshToken, user } = await Auth.login(formData)

      if (error) {
        return window.alert(errorMessage)
      }

      if (token && refreshToken) {
        signin({ user, token, refreshToken })
      }
    }
  })

  if (isLoggedIn) {
    navigate('/dashboard')
    return null
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      {formik.errors.email && <div>{formik.errors.email}</div>}
      <label htmlFor='email'>Email Address</label>
      <input
        id='email'
        name='email'
        type='email'
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {formik.errors.password && <div>{formik.errors.password}</div>}
      <label htmlFor='password'>Password</label>
      <input
        id='password'
        name='password'
        type='password'
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      <button type='submit'>Login</button>
    </form>
  )
}

export default Login
