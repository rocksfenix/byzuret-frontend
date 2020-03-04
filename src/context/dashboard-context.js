import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby'
import { getIsLoggedIn, getCurrentUser, logout } from '../util/auth'
import api from '../util/api'
import useDesigns from '../hooks/useDesigns'

export const DashboardContext = React.createContext()

export default (props) => {
  const [title, setTitle] = useState('')
  const [isFetching, setFetching] = useState(false)
  const [isOpenEditor, setIsOpenEditor] = useState(false)
  const [designInFocus, setDesignInFocus] = useState({})
  const [designs, total, hasMore, setDesigns, setTotal, loadMore] = useDesigns()

  const isLoggedIn = getIsLoggedIn()
  const user = getCurrentUser()

  // Hook is necessary to avoid
  // breaking the gatsby build
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    }
  }, [])

  // Designs handling
  const onPostDesign = async () => {
    const res = await api.Design.post({ title })
    setDesigns([res.design, ...designs])
    setTotal(total + 1)
    setTitle('')
  }

  const onUpdateDesign = async () => {
    setFetching(true)
    const res = await api.Design.update(designInFocus)
    // Update in designs
    setDesigns(designs.map(_desing => {
      if (_desing._id === res.design._id) {
        return res.design
      }

      return _desing
    }))
    setFetching(false)
  }

  const onDeleteDesign = async (design) => {
    const res = await api.Design.remove(design)

    setDesigns(
      designs.filter(_desing => _desing._id !== res.design._id)
    )
    setTotal(total - 1)
  }

  // Handlers for images

  const onSortImages = async (images) => {
    const designUpdated = {
      ...designInFocus,
      images
    }

    // We wait to finish the upload to update
    let isUploading = false

    images.forEach(img => {
      if (img.isUploading) {
        isUploading = true
      }
    })

    if (!isUploading) {
      setDesignInFocus(designUpdated)
      const res = await api.Design.update(designUpdated)

      setDesigns(designs.map(_desing => {
        if (_desing._id === res.design._id) {
          return res.design
        }

        return _desing
      }))
    }
  }

  const onUploadImageStart = (design) => {
    // Update locally
    setDesignInFocus(design)
    setDesigns(designs.map(_desing => {
      if (_desing._id === design._id) {
        return design
      }

      return _desing
    }))
  }

  const onUploadImageEnd = (design) => {
    // Update locally
    setDesignInFocus(design)
    setDesigns(designs.map(_desing => {
      if (_desing._id === design._id) {
        return design
      }

      return _desing
    }))
  }

  const onRemoveImage = async (image) => {
    const res = await api.Image.deleteById(image._id)
    console.log(res)
  }

  const openEditor = (design) => {
    setDesignInFocus(design)
    setIsOpenEditor(true)
  }

  const onLogout = () => {
    logout()
  }

  const onRebuildApp = async () => {
    const res = await api.General.rebuild()
    console.log(res)
  }

  return (
    <DashboardContext.Provider value={{
      // Properties
      title,
      isOpenEditor,
      isFetching,
      designInFocus,
      designs,
      total,
      hasMore,
      isLoggedIn,
      user,
      // Handlers
      setDesigns,
      setTotal,
      loadMore,
      setTitle,
      setIsOpenEditor,
      setDesignInFocus,
      // Desings
      onPostDesign,
      onUpdateDesign,
      onDeleteDesign,
      // Images
      onSortImages,
      onUploadImageStart,
      onUploadImageEnd,
      onRemoveImage,
      openEditor,
      onLogout,
      onRebuildApp
    }}
    >
      {props.children}
    </DashboardContext.Provider>
  )
}
