import React, { useState } from 'react'
import styled from 'styled-components'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Icon } from 'semantic-ui-react'

const Box = styled.li`
  width: 100%;
  padding: .7em 1em;
  margin: 0 auto;
  display: block;
  background: #FFF;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e6e6e6;
  position: relative;
  z-index: 1000;
  position: relative;
  font-size: 15px;
  box-sizing: border-box;
  background: #e8e8e8;
  user-select: none;
  transition: background 300ms ease;
  cursor: move;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    background: #97ffe7;
  }
`

const BoxContainer = styled.div`
  width: 100px;
  background: #d7d7d7;
  position: relative;
`

const Delete = styled.button`
  position: absolute;
  width: 30px;
  height: 35px;
  border: 0;
  background: rgba(0,0,0,0.8);
  right: -30px;
  cursor: pointer;

  & > i {
    pointer-events: none;
  }
`

const SortableItem = SortableElement((props) => {
  const [isHover, setHover] = useState(false)

  const hoverActive = () => setHover(true)
  const hoverInactive = () => setHover(false)

  return (
    <Box
      onMouseOver={hoverActive}
      onMouseLeave={hoverInactive}
      {...props}
    >
      {props.image.isUploading && <div>...Upload</div>}
      <img
        src={props.image.secure_url}
        alt='foto'
        width={50}
      />
      {isHover && (
        <Delete  onClick={(e) => {
          props.onDeleteImage(props.image)
        }}>
          <Icon
            name='trash alternate'
            color='red'
          />
        </Delete>
      )}
    </Box>
  )
})

const SortableList = SortableContainer(({ images, ...props }) => {
  return (
    <BoxContainer>
      {images.map((image, index) => (
        <SortableItem
          key={image._id}
          image={image}
          index={index}
          {...props}
        />
      ))}
    </BoxContainer>
  )
})

const Panel = styled.div`
  display: flex;
  overflow: hidden;
  margin: 1.7em 0;
  justify-content: center;
`

const MainImage = styled.div`
  width: 60%;
  height: 400px;
  & img {
    width: 100%;
  }
`

const ImageBox = styled.div`
  width: 100%;
  position: relative;
  top: 0;
`
const Image = styled.img`
  position: absolute;
  top: 0;
  width: 100%;
`

const Gallery = ({ design, onSortEnd, deleteImage }) => {
  const des = design && design.images.length
    ? design
    : {
      images: [
        {
          secure_url: 'https://res.cloudinary.com/byzuret/image/upload/v1583267799/default/default-image_desings_by_zuret_aarsxy.svg'
        }
      ]
    }

  return (
    <Panel>
      <MainImage>
        <TransitionGroup>
          <CSSTransition
            timeout={2000} key={des.images[0].secure_url}
            classNames='slide'
          >
            <ImageBox>
              <Image src={des.images[0].secure_url} alt='main image' />
            </ImageBox>
          </CSSTransition>
        </TransitionGroup>
      </MainImage>
      <SortableList
        images={design.images}
        onSortEnd={onSortEnd}
        onDeleteImage={deleteImage}
      />
    </Panel>
  )
}

export default Gallery
