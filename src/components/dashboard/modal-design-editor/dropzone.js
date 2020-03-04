import React from 'react'
import Dropzone from 'react-dropzone'
import api from '../../../util/api'

export default ({ design, onUploadImageStart, onUploadImageEnd }) => {
  const onDrop = async (files) => {
    if (files[0]) {
      const formData = new window.FormData()
      formData.append('image', files[0])
      formData.set('description', 'Insert description here!')

      // Progress
      const config = {
        onUploadProgress (progressEvent) {
          var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          console.log(percentCompleted)
        }
      }

      // Push pending spinner image
      onUploadImageStart({
        ...design,
        images: [
          ...design.images,
          {
            isUploading: true,
            // preview
            secure_url: window.URL.createObjectURL(files[0])
          }
        ]
      })

      // Make request
      const res = await api.Design.postImage({ design, formData }, config)
      console.log(res)

      if (res.design) {
        onUploadImageEnd(res.design)
      }

    }
  }

  return (
    <Dropzone onDrop={onDrop} accept='image/*'>
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Upload an image</p>
          </div>
        </section>
      )}
    </Dropzone>
  )
}
