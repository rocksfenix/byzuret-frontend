import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { useFormik } from 'formik'
import { ReCaptcha } from 'react-recaptcha-v3'
import api from '../util/api'

const Panel = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(4, 7, 22, 0.82);
  position: fixed;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`

const anima = keyframes`
  0% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
`

const Form = styled.form`
  max-width: 430px;
  min-height: 400px;
  background: #FFF;
  width: 100%;
  padding: 1em;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  animation: ${anima} 350ms ease forwards;
  will-change: transform;
`

const Button = styled.button`
  color: #FFF;
  background: #022bc1;
  border-color: #022bc1;
  -webkit-appearance: none;
  user-select: none;
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

const Input = styled.input`
  border: 1px solid gray;
  width: 100%;
  margin: 0.4em 0;
  font-size: 18px;
  padding: 0.5em 1em;
`

const Label = styled.label`
  font-size: 16px;
`

const WarnMessage = styled.div`
  background: #ffebdd;
`

const CloseButton = styled.button`
  font-size: 18px;
  margin: 1em 0;
  margin: 0;
`

const Row = styled.div`
  width: 100%;
`

const Box = styled.div`
  max-width: 430px;
  min-height: 140px;
  background: #FFF;
  width: 100%;
  padding: 1em;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${anima} 350ms ease forwards;
  will-change: transform;
  font-size: 18px;
`

const validate = values => {
  const errors = {}

  if (!values.fullname) {
    errors.fullname = 'Requerido'
  } else if (values.fullname.length < 5) {
    errors.fullname = 'Deben ser minimo 3 caracteres'
  }

  if (!values.email) {
    errors.email = 'Requerido'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Email invalido'
  }

  return errors
}

const ModalContactForm = ({ show, onClose, design }) => {
  const [recaptchaToken, setRecaptchaToken] = useState('')
  const [isSuccess, setSuccess] = useState(false)

  const formik = useFormik({
    initialValues: {
      fullname: '',
      password: '',
      email: ''
    },

    validate,

    onSubmit: async (formData) => {

      console.log(formData)
      const { ok } = await api.General.contactForm({
        ...formData,
        design,
        recaptchaToken
      })

      if (ok) {
        setSuccess(true)
      }
    }
  })

  if (!show) return null

  const recaptchaCallback = (token) => {
    setRecaptchaToken(token)
  }

  return (
    <Panel>
      {isSuccess
        ? (
          <Box>
            <Box>
              Te contactaremos a la brevedad
            </Box>
            <Button onClick={onClose}>Listo</Button>
          </Box>
        )
        : (
          <Form onSubmit={formik.handleSubmit}>
            <CloseButton onClick={onClose}>
              X
            </CloseButton>
            <Row>
              <Label htmlFor='fullname'>Nombre</Label>
              {formik.errors.fullname && <WarnMessage>{formik.errors.fullname}</WarnMessage>}
              <Input
                id='fullname'
                name='fullname'
                type='text'
                placeholder='Tu Nombre'
                onChange={formik.handleChange}
                value={formik.values.fullname}
              />
            </Row>
            <Row>
              <Label htmlFor='email'>Email</Label>
              {formik.errors.email && <WarnMessage>{formik.errors.email}</WarnMessage>}
              <Input
                id='email'
                name='email'
                type='email'
                placeholder='Tu Email'
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <ReCaptcha
                sitekey='6LfC4-AUAAAAACh7UUoO2vAripfN-dynRdao2s0s'
                action='action_name'
                verifyCallback={recaptchaCallback}
              />
            </Row>
            <Button type='submit'>Solicitar Informacion</Button>
          </Form>
        )}

    </Panel>
  )
}

ModalContactForm.defaulProps = {
  show: false
}

export default ModalContactForm
