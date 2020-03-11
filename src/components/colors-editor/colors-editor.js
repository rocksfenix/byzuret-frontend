import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { SketchPicker } from 'react-color'
import useClickOutside from '../../hooks/useClickOutside'

const Panel = styled.div`
  height: 66px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  padding: 0 8px;
  position: relative;
`

const Label = styled.label`
  display: block;
  margin: 0 0 .28571429rem 0;
  color: rgba(0,0,0,.87);
  font-size: .92857143em;
  font-weight: 700;
  text-transform: none;
`

const ColorBox = styled.span`
  background: gray;
  width: 35px;
  height: 35px;
  margin: 0 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 2px solid transparent;
`

const Colors = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`

const EditorBox = styled.div`
  position: absolute;
  left: 0;
  top: 46px;
  width: 222px;
  height: 335px;
  z-index: 100;
  background: #FFF;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const ColorsEditor = (props) => {
  const [showEditor, setShowEditor] = useState(false)
  const [indexInFocus, setIndexInFocus] = useState(-1)
  const [color, setColor] = useState('red')
  const elRef = useRef()

  const handleShowEditor = (index, color) => {
    setIndexInFocus(index)
    setShowEditor(true)
    setColor(color)
  }

  const handleColorChange = (color) => {
    setColor(color)

    // Emit Color to parent
    props.onChange(indexInFocus, color.hex)
  }

  const handleConfirm = () => {
    props.onConfirmColor(indexInFocus, color.hex)
    closeEditor()
  }

  const handleDelete = () => {
    props.onDelete(indexInFocus, color)
    closeEditor()
  }

  const closeEditor = () => {
    setIndexInFocus(-1)
    setShowEditor(false)
  }

  const handleAddNewColor = () => {
    const { defaultNewColor } = props
    setIndexInFocus(props.colors.length)
    setShowEditor(true)
    setColor(defaultNewColor)
    props.onAddNewColor(defaultNewColor)
  }

  useClickOutside(elRef, closeEditor)

  return (
    <Panel ref={elRef}>
      <Label>Colors</Label>
      <Colors>
        {props.colors.map((color, index) => (
          <ColorBox
            key={index}
            style={{
              background: color,
              border: indexInFocus === index
                ? '2px solid #FFF'
                : '2px solid transparent'
            }}
            onClick={() => handleShowEditor(index, color)}
          />
        ))}

        <ColorBox onClick={handleAddNewColor}>
          +
        </ColorBox>
        {showEditor && (
          <EditorBox>
            <div>
              <button onClick={handleDelete}>
                <i className='icon-bin2' />
              </button>
              <button onClick={handleConfirm}>
                <i className='icon-checkmark' />
              </button>
            </div>
            <SketchPicker color={color} onChange={handleColorChange} />
          </EditorBox>
        )}
      </Colors>
    </Panel>
  )
}

const noop = () => {}

ColorsEditor.defaultProps = {
  colors: [],
  defaultNewColor: '#157BC6',
  onChange: noop,
  onConfirmColor: noop,
  onDelete: noop,
  onAddNewColor: noop
}

export default ColorsEditor
