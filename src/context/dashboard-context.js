import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby'
import { getIsLoggedIn, getCurrentUser } from '../util/auth'
import useDesigns from '../hooks/useDesigns'
import api from '../util/api'

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
    if (!isLoggedIn || user.role !== 'admin') {
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

  const onUpdateDesign = async (showSpinner = true) => {
    if (showSpinner) {
      setFetching(true)
    }
    const res = await api.Design.update(designInFocus)
    // Update in designs
    setDesigns(designs.map(_desing => {
      if (_desing._id === res.design._id) {
        return res.design
      }

      return _desing
    }))

    if (showSpinner) {
      setFetching(false)
    }
  }

  const onDeleteDesign = async (designToDelete) => {
    const confirm = window.confirm('En verdad quieres eliminar el diseño y todas sus imagenes?')

    if (!confirm) return

    setDesigns(
      designs.filter(_desing => _desing._id !== designToDelete._id)
    )
    setTotal(total - 1)
    await api.Design.remove(designToDelete)
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

  const onRemoveImage = async (imageToDelete) => {
    const confirm = window.confirm('En verdad quieres eliminar la imagen?')

    if (!confirm) return

    // Update local state
    const designUpdated = {
      ...designInFocus,
      images: designInFocus.images.filter(image => {
        return image._id !== imageToDelete._id
      })
    }

    setDesignInFocus(designUpdated)

    await api.Image.deleteById(imageToDelete._id)
  }

  const openEditor = (design) => {
    setDesignInFocus(design)
    setIsOpenEditor(true)
  }

  const onChangeColor = async (indexInFocus, newColor) => {
    const designUpdated = {
      ...designInFocus,
      colors: designInFocus.colors.map((color, index) => {
        if (indexInFocus === index) {
          return newColor
        }
        return color
      })
    }

    setDesignInFocus(designUpdated)
  }

  const onConfirmColor = (indexInFocus, newColor) => {
    // Do more thinks here
    onUpdateDesign(false)
  }

  const onAddNewColor = (newColor) => {
    const designUpdated = {
      ...designInFocus,
      colors: [
        ...designInFocus.colors,
        newColor
      ]
    }

    setDesignInFocus(designUpdated)
  }

  const onDeleteColor = (indexToRemove) => {
    const designUpdated = {
      ...designInFocus,
      colors: designInFocus.colors.filter((color, index) => {
        return index !== indexToRemove
      })
    }

    setDesignInFocus(designUpdated)
    onUpdateDesign(false)
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
      // Colors
      onChangeColor,
      onAddNewColor,
      onConfirmColor,
      onDeleteColor,
      // Images
      onSortImages,
      onUploadImageStart,
      onUploadImageEnd,
      onRemoveImage,
      openEditor
    }}
    >
      {props.children}
    </DashboardContext.Provider>
  )
}
