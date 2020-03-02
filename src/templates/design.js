import React, { useState } from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import ReactImageMagnify from 'react-image-magnify'

const Panel = styled.div`
  font-family: 'Source Sans Pro', sans-serif;
  position: relative;
  min-height: 100vh;
  display: flex;
`

const Fluid = styled.div`
  max-width: 400px;
  /* position: absolute; */
  top: 100px;
  /* z-index: 10; */
  left: 100px;
  left: 18vw;
  border: 1px solid #FFF;
  margin-left: 20vw;
  margin-top: 40px;
`

export default (props) => {
  const { _id } = props.pageContext
  const { designs } = props.data.restApiDesigns
  const design = designs.find(d => d._id === _id)

  const { images } = design

  console.log(design)
  return (
    <Layout>
      <Panel>
        <Fluid>
          {images && images.map(image => (
            <ReactImageMagnify
              key={image.public_id}
              style={{ margin: '10px' }}
              {...{
                smallImage: {
                  alt: 'Wristwatch by Ted Baker London',
                  isFluidWidth: true,
                  src: `https://res.cloudinary.com/byzuret/image/upload/w_400/${image.public_id}`
                },
                largeImage: {
                  src: image.secure_url,
                  width: image.width,
                  height: image.height
                }
              }}
            />
          ))}
        </Fluid>
        <Fluid>
          <h1>{design.title} Jeans</h1>
          <p>
            {design.description}
          </p>
          <div>
            {design.colors}
          </div>
          <button>Solicitar Informacion</button>
        </Fluid>
      </Panel>
    </Layout>
  )
}

export const query = graphql`
  {
    restApiDesigns(designs: {}) {
      designs {
        _id
        title
        description
        price
        lotePrice
        # images {
        #   secure_url
        #   public_id
        #   width
        #   height
        # }
      }
    }
  }
`
