import React from 'react'
import styled from 'styled-components'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

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
  z-index: 100;
  position: relative;
  overflow: hidden;
  font-size: 15px;
  box-sizing: border-box;
  background: pink;
  user-select: none;
`

const BoxContainer = styled.div`
  width: 100px;
  background: #d7d7d7;
`

const SortableItem = SortableElement((props) => {
  return (
    <Box {...props}>
      {props.image.isUploading && <div>...Upload</div>}
      <img
        src={props.image.secure_url}
        alt='foto'
        width={50}
      />
      <button onClick={() => props.onDeleteImage(props.image)}>
        X
      </button>
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
