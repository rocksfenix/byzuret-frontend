import React, { useContext } from 'react'
import styled, { keyframes } from 'styled-components'
import DropZone from './dropzone'
import arrayMove from 'array-move'
import Gallery from './gallery'
import { Form } from 'semantic-ui-react'
import { DashboardContext } from '../../../context/dashboard-context'
import './modal-design-editor.css'

const animaPanel = keyframes`
  0% {
    background: rgba(0, 0, 0, 0.2);
  }
  100% {
    background: rgba(0, 0, 0, 0.7);
  }
`

const Panel = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 83);
  z-index: 100;
  top: 0;
  animation: ${animaPanel} 700ms ease forwards;
  overflow-y: auto;
`

const anima = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0%);
  }
`

const PanelSide = styled.div`
  position: absolute;
  left: 0;
  width: 30%;
  height: 100vh;
  min-width: 750px;
  background: #FFF;
  animation: ${anima} 230ms ease forwards;
  will-change: transform;
`

const Content = styled.div`
  padding: 1em;
  background: #FFF;
  box-shadow: 2px 0px 13px 1px #03d3f4;
  height: 100%;
`

const ModalEditor = () => {
  const {
    isOpenEditor,
    isFetching,
    setIsOpenEditor,
    setDesignInFocus,
    onSortImages,
    onUpdateDesign,
    onUploadImageStart,
    onUploadImageEnd,
    onRemoveImage,
    designInFocus: design

  } = useContext(DashboardContext)

  if (!isOpenEditor) return null

  const setDesign = (key, value) => {
    setDesignInFocus({
      ...design,
      [key]: value
    })
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const images = arrayMove(design.images, oldIndex, newIndex)
    onSortImages(images)
  }

  return (
    <Panel onClick={() => setIsOpenEditor(false)}>
      <PanelSide onClick={e => e.stopPropagation()}>
        <Content>
          <Form
            onSubmit={(e) => {
              // console.log(e.target)
              onUpdateDesign()
            }}
            loading={isFetching}
          >
            <Form.Group>
              <Form.Input
                label='Title'
                placeholder='Title'
                value={design.title}
                width={8}
                onChange={(e, { value }) => setDesign('title', value)}
              />
              <Form.Input
                label='Price'
                placeholder='Price'
                width={4}
                value={design.price}
                onChange={(e, { value }) => setDesign('price', value)}
              />
              <Form.Input
                label='Lote Price'
                placeholder='Lote Price'
                width={4}
                value={design.lotePrice}
                onChange={(e, { value }) => setDesign('lotePrice', value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                label='Colors'
                placeholder='Colores'
                width={8}
                value={design.colors}
                onChange={(e, { value }) => setDesign('colors', value)}
              />
              <Form.Input
                label='Sizes'
                placeholder='Tallas'
                width={8}
                value={design.sizes}
                onChange={(e, { value }) => setDesign('sizes', value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                label='Off'
                placeholder='off'
                width={4}
                value={design.off}
                onChange={(e, { value }) => setDesign('off', value)}
              />
              <Form.Input
                label='Composition'
                placeholder='Composition'
                width={12}
                value={design.Composition}
                onChange={(e, { value }) => setDesign('Composition', value)}
              />
            </Form.Group>
            <Form.TextArea
              label='Description'
              placeholder='Super elástico que dura de día a noche; ajuste cómodo que no pierde forma...'
              value={design.description}
              onChange={(e, { value }) => setDesign('description', value)}
            />
            <Form.Button>Submit</Form.Button>
          </Form>
          <DropZone
            design={design}
            onUploadImageEnd={onUploadImageEnd}
            onUploadImageStart={onUploadImageStart}
          />
          <Gallery
            design={design}
            deleteImage={onRemoveImage}
            onSortEnd={onSortEnd}
          />
        </Content>
      </PanelSide>
    </Panel>
  )
}

export default ModalEditor
