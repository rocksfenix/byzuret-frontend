import React, { useState } from 'react'
import { Link } from 'gatsby'
import styled, { keyframes } from 'styled-components'
import SearchImage from '../images/search.svg'

const CardBox = styled.div`
  font-family: 'Source Sans Pro', sans-serif;
  width: 100%;
  font-size: 18px;
  text-align: center;
  line-height: 1.3;
  font-weight: 300;
  letter-spacing: .1em;
  line-height: 1.3;
  color: #111;
  position: relative;
  border: 1px solid #e0e0e0;
  transition: filter 100ms linear;
  filter: sepia(0) hue-rotate(0);
  will-change: filter;
  
  & img {
    width: 100%;
  }

  :hover {
    filter: sepia(0.9) hue-rotate(540deg);
  }
`

const anima = keyframes`
  0% {
    transform: scale(2);
  }
  50% {
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`

const Search = styled.div`
  position: absolute;
  opacity: 0;
  will-change: transform ;
  pointer-events: none;
  background: rgba(0,0,0,0.3) url(${SearchImage});
  background-size: 50%;
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  animation: ${anima} ease 400ms forwards;
  top: 1em;
  right: 1em;
`

const Content = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
`

const Footer = styled.div`
  width: 100%;
  height: 35px;
  background: white;
  color: #898989;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Img = styled.img`
  transition: transform 300ms linear;
  transform: scale(1)  rotate(0deg);
  will-change: transform;
`

const Card = ({ design }) => {
  const [isHover, setHover] = useState(false)

  return (
    <Link
      to={'/design/' + design._id} onMouseOver={(e) => {
        e.stopPropagation()
        setHover(true)
      }} onMouseOut={() => setHover(false)}
    >
      <CardBox>
        <Content>
          <Img
            src={design.images[0].secure_url} alt='' style={{
              transform: isHover ? 'scale(1.02)  rotate(-0.2deg)' : 'scale(1)  rotate(0deg)'
            }}
          />
          {isHover && <Search />}
        </Content>
        <Footer>
          {design.title}
        </Footer>
      </CardBox>
    </Link>
  )
}

export default Card
