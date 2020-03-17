import axios from 'axios'
import { getItem, setItem, removeItem } from './localStorage'

const HOST = process.env.API_HOST || 'https://byzuret-api.now.sh'

console.log('HOST', HOST)

axios.interceptors.request.use((config) => {
  return {
    ...config,
    headers: {
      token: getItem('token'),
      'refresh-token': getItem('refreshToken')
    }
  }
}, (error) => {
  // Do something with request error
  return Promise.reject(error)
})

axios.interceptors.response.use((response) => {
  const token = response.headers['x-app-token']

  if (token) {
    setItem('token', token)
  }

  if (response.headers['x-app-session-expired']) {
    removeItem('token')
    removeItem('refreshToken')
    removeItem('user')
    window.location = '/login?sessionExpired=true'
  }

  return response
}, (error) => {
  // Do something with request error
  return Promise.reject(error)
})

export const Auth = {
  async login ({ password, email }) {
    const res = await axios.post(`${HOST}/auth`, { credentials: { password, email } })
    return res.data
  },

  async signup ({ password, fullname, email }) {
    const res = await axios.post(`${HOST}/signup`, { user: { password, fullname, email } })
    return res.data
  }
}

export const Design = {
  async getAll ({ skip = 0, text }) {
    const query = text
      ? `&text=${text}`
      : ''

    console.log('DESIGN', `${HOST}/designs?skip=${skip}${query}`)

    const res = await axios.get(`${HOST}/designs?skip=${skip}${query}`)
    return res.data
  },

  async post ({ title }) {
    const res = await axios.post(`${HOST}/designs`, { design: { title } })
    return res.data
  },

  async postImage ({ design, formData }, config) {
    const res = await axios.post(`${HOST}/design/${design._id}/image`, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return res.data
  },

  async update (design) {
    const res = await axios.put(`${HOST}/design/${design._id}`, { design })
    return res.data
  },

  async remove (design) {
    const res = await axios.delete(`${HOST}/design/${design._id}`)
    return res.data
  }

}

export const Image = {
  async getAll () {
    const res = await axios.get(`${HOST}/images`)
    return res.data
  },

  async deleteById (id) {
    const res = await axios.delete(`${HOST}/image/${id}`)
    return res.data
  }
}

export const General = {
  async rebuild () {
    const res = await axios.post(`${HOST}/rebuild`)
    return res.data
  },

  async contactForm (data) {
    console.log(HOST)
    const res = await axios.post(`${HOST}/contact-form`, { data })
    return res.data
  }
}

export default {
  Auth,
  Design,
  Image,
  General
}
