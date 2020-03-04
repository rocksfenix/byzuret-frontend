import React, { useContext } from 'react'
import styled, { keyframes } from 'styled-components'
import DropZone from './dropzone'
import arrayMove from 'array-move'
import Gallery from './gallery'
import { Form, Label } from 'semantic-ui-react'
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
  color: #FFF;
  padding-top: 1em;
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
  background: #252525;
  animation: ${anima} 300ms ease forwards;
  will-change: transform;
`

const Content = styled.div`
  padding: 1em;
  background: #252525;
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

  const handlerChange = (name, event, { value }) => {
    setDesign(name, value)
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
            size='large'
            loading={isFetching}
            inverted
          >
            <Form.Group>
              <Form.Input
                label='Title'
                placeholder='Title'
                value={design.title}
                width={8}
                onChange={handlerChange.bind(this, 'title')}
              />

              <Form.Input
                label='Price'
                type='number'
                placeholder='Price'
                width={4}
                value={design.price}
                onChange={handlerChange.bind(this, 'price')}
                labelPosition='right'
              >
                <Label basic>$</Label>
                <input />
                <Label>.00</Label>
              </Form.Input>

              <Form.Input
                label='Lote Price'
                placeholder='Lote Price'
                width={4}
                value={design.lotePrice}
                type='number'
                onChange={handlerChange.bind(this, 'lotePrice')}
                labelPosition='right'
              >
                <Label basic>$</Label>
                <input />
                <Label>.00</Label>
              </Form.Input>

            </Form.Group>
            <Form.Group>
              <Form.Input
                label='Colors'
                placeholder='Colores'
                width={8}
                value={design.colors}
                onChange={handlerChange.bind(this, 'colors')}
              />
              <Form.Input
                label='Sizes'
                placeholder='Tallas'
                width={8}
                value={design.sizes}
                onChange={handlerChange.bind(this, 'sizes')}
              />
            </Form.Group>
            <Form.Group>

              <Form.Input
                label='Off'
                placeholder='Off'
                width={4}
                value={design.off}
                type='number'
                onChange={handlerChange.bind(this, 'off')}
                labelPosition='right'
              >
                <input />
                <Label basic>%</Label>
              </Form.Input>

              <Form.Input
                label='Composition'
                placeholder='Composition'
                width={12}
                value={design.composition}
                onChange={handlerChange.bind(this, 'composition')}
              />
  
            </Form.Group>
            <Form.TextArea
              label='Description'
              placeholder='Hermoso Jeans ...'
              value={design.description}
              onChange={handlerChange.bind(this, 'description')}
            />
            <Form.Button color='blue'>
              Update
            </Form.Button>
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
