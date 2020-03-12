import React, { useContext } from 'react'
import { navigate } from 'gatsby'
import { slide as Menu } from 'react-burger-menu'
import { GeneralContext } from '../../context/general-context'
import styled from 'styled-components'

const Item = styled.div`
  color: #80b4ea;
  padding: 0.8em;
  cursor: pointer;

  :hover {
    color: orange;
  }
`

const Icon = styled.i`
  margin: 0 0.3em;
`

const BurguerMenu = () => {
  const { onSignout, onRebuildApp, user } = useContext(GeneralContext)

  return (
    <Menu right>
      <span className='menu-item'>
        {user.fullname}
      </span>
      <Item onClick={() => navigate('/dashboard')}>
        <Icon className=' icon-flickr3' />Dashboard
      </Item>
      <Item onClick={onSignout}>
        <Icon className=' icon-unlocked' />Loggout
      </Item>
      <Item onClick={onRebuildApp}>
        <Icon className=' icon-fire' />Re-Build
      </Item>
    </Menu>
  )
}

export default BurguerMenu
