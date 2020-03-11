import { useEffect } from 'react'

const useClickOutside = (elementRef, callback) => {

  const handler = (e) => {
    var domNode = elementRef.current
    if ((!domNode || !domNode.contains(e.target)) && typeof callback === 'function') {
      callback(e)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handler, true)

    return () => {
      document.removeEventListener('click', handler, true)
    }
  }, [])

  return [
    callback
  ]
}

export default useClickOutside
