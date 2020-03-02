
export const getItem = (key, defaulValue = null) => {
  try {
    const value = window.localStorage.getItem(key)

    if (typeof value === 'string') {
      return JSON.parse(value)
    }

    return value
  } catch (error) {
    return defaulValue
  }
}

export const setItem = (key, value) => {
  try {
    const serialized = JSON.stringify(value)
    window.localStorage.setItem(key, serialized)
  } catch (error) {
    // Ignore error
  }
}

export const removeItem = (key) => {
  try {
    window.localStorage.removeItem(key)
  } catch (error) {
    // Ignore error
  }
}
