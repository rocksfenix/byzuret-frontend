import React, { useState, useEffect, useContext } from 'react'
import styled, { keyframes } from 'styled-components'
import { GeneralContext } from '../../context/general-context'

const animation = keyframes`
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
`

const FloatBox = styled.div`
  width: 500px;
  min-height: 200px;
  background-color: #FFF;
  border: 1px solid gray;
  border-radius: 3px;
  position: fixed;
  right: 10px;
  top: 80px;
  animation: ${animation} 250ms ease forwards;
  transition: top 250ms ease;
  border: 1px solid #dedede;
  padding: 1em;
`

const getOffset = (element) => {
  var top = 0; var left = 0
  do {
    top += element.offsetTop || 0
    left += element.offsetLeft || 0
    element = element.offsetParent
  } while (element)

  return {
    top: top,
    left: left
  }
}

const FloatPanel = ({ children, parentRef }) => {
  const [isShowFloatPanel, setFloatPanel] = useState(false)
  const [leftPanel, setLeftPanel] = useState(0)
  const [topPanel, setTopPanel] = useState(10)
  const { isShowNavbar, isMobile } = useContext(GeneralContext)

  const onScroll = () => {
    const { scrollTop } = document.getElementsByTagName('html')[0]

    console.log('sadsadsa')

    if (isMobile.any || window.innerWidth < 1000) {
      return setFloatPanel(false)
    }

    if (scrollTop > 250) {
      // Here we coppied the relative position of parent panel
      const left = getOffset(parentRef.current).left + 50
      setLeftPanel(left)
      setFloatPanel(true)

      if (isShowNavbar) {
        setTopPanel(80)
      } else {
        setTopPanel(10)
      }
    } else {
      setFloatPanel(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [isShowNavbar])

  if (!isShowFloatPanel) return null

  return (
    <FloatBox style={{ left: leftPanel, top: topPanel }}>
      {children}
    </FloatBox>
  )
}

export default FloatPanel
