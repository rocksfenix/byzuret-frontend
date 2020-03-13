import React, { useRef, useState } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import ReactImageMagnify from 'react-image-magnify'
import FloatPanel from '../components/float-panel'
import Layout from '../components/layout'
import imgWhatsapp from '../images/whatsapp.svg'
import imgEmail from '../images/email.svg'
import ModalContactForm from '../components/modal-contact-form'

const Panel = styled.div`
  font-family: 'Source Sans Pro', sans-serif;
  position: relative;
  min-height: 100vh;
  display: flex;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  margin-top: 40px;
  flex-direction: column;

  @media(min-width: 900px) {
    flex-direction: row;
  }
`

const Images = styled.div`
  width: 100%;
  order: 1; 

  @media(min-width: 900px) {
    max-width: 380px;
    order: 0; 
  }
`

const Information = styled.div`
  max-width: 100%;
  padding-left: 5px;
    padding-right: 5px;
  
  border: 1px solid #FFF;
  width: 100%;

  @media(min-width: 900px) {
    max-width: 500px;
    padding-left: 100px;
    padding-right: 0px;
  }

  @media(min-width: 1200px) {
    max-width: 550px;
  }
`

const SizeBox = styled.span`
  border: solid 1px #DAD9D6;
  margin: 3.6px 2.4px;
  height: 35px;
  line-height: 35px;
  min-width: 50px;
  text-align: center;
  box-sizing: border-box;
  padding: 0 5px;
  transition: background-color .2s ease-out,color .2s ease-out;
`

const SizesList = styled.div`
  margin: 0 -2.4px;
`

const ColorBall = styled.span`
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: block;
  display: inline-block;
  margin: 0 0.1em;
`

const Button = styled.button`
  color: #FFF;
  background: #026cc1;
  border-color: #026cc1;
  -webkit-appearance: none;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid;
  font-size: 1.143rem;
  font-weight: 500;
  line-height: 3.171rem;
  text-align: center;
  text-decoration: none;
  position: relative;
  cursor: pointer;
  transition: background-color 350ms ease-out, color 250ms ease-out;
  display: flex;
  justify-content: center;
`

const ButtonLink = styled.a`
  color: #FFF;
  background: #026cc1;
  display: block;
  background: #4caf50;
  border-color: #026cc1;
  -webkit-appearance: none;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid;
  font-size: 1.143rem;
  font-weight: 500;
  line-height: 3.171rem;
  text-align: center;
  text-decoration: none;
  position: relative;
  cursor: pointer;
  transition: background-color 350ms ease-out, color 250ms ease-out;
  display: flex;
  justify-content: center;
`

const ImageIcon = styled.img`
  width: 20px;
  margin: 0 0.6em;
`

export default (props) => {
  const { _id } = props.pageContext
  const { designs } = props.data.restApiDesigns
  const design = designs.find(d => d._id === _id)
  const infoRef = useRef()
  const { images } = design
  const [showModalForm, setShowModalForm] = useState(false)

  const onShowModalForm = () => {
    setShowModalForm(true)
  }

  const onCloseModalForm = () => {
    setShowModalForm(false)
  }

  return (
    <Layout>
      <Panel>
        <ModalContactForm
          show={showModalForm}
          onClose={onCloseModalForm}
          design={design}
        />
        <Images>
          {images && images.map(image => (
            <ReactImageMagnify
              key={image.public_id}
              style={{ margin: '10px', zIndex: 100 }}
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
        </Images>
        <Information ref={infoRef}>
          <h1>{design.title} Jeans</h1>
          <p>
            {design.description}
          </p>
          <div>
            Colores
          </div>
          <div>
            {design.colors.map((color, index) => (
              <ColorBall
                key={index}
                style={{ background: color }}
              />
            ))}
          </div>
          <div>
            Tallas
          </div>
          <SizesList>
            {design.sizes.split('-').map((size) => (
              <SizeBox key={size}>{size}</SizeBox>
            ))}
          </SizesList>
          <div>
            Precios especiales a mayoristas, hasta el 50% off
          </div>
          <ButtonLink href='https://wa.me/5214751314921?texto=Me%20interesa%20in%20el%20auto%20que%20vendes' target='_blank'>
            Chatear por Whatsapp <ImageIcon src={imgWhatsapp} alt='Whatsapp icon' />
          </ButtonLink>
          <Button onClick={onShowModalForm}>
            Solicitar Informacion por Email
          </Button>
          <FloatPanel parentRef={infoRef}>
            <h1>{design.title}</h1>
            <div>
              Colores
            </div>
            <div>
              <ColorBall style={{ background: '#157bc6' }} />
            </div>
            <div>
              Tallas
            </div>
            <SizesList>
              {design.sizes.split('-').map((size) => (
                <SizeBox key={size}>{size}</SizeBox>
              ))}
            </SizesList>
            <div>
              Solicita Informacion sin compromiso:
            </div>
            <ButtonLink href='https://wa.me/5214751314921?texto=Me%20interesa%20in%20el%20auto%20que%20vendes' target='_blank'>
              Chatear por Whatsapp <ImageIcon src={imgWhatsapp} alt='Whatsapp icon' />
            </ButtonLink>
            <Button>
              Informacion por Email <ImageIcon src={imgEmail} alt='Whatsapp icon' />
            </Button>
          </FloatPanel>
        </Information>
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
        sizes
        colors
        images {
          secure_url
          public_id
          width
          height
        }
      }
    }
  }
`
