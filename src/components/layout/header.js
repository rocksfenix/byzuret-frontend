import React, { useContext } from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import Headroom from 'react-headroom'
import styled from 'styled-components'
import Img from '../../images/logo-byzuret.svg'
import { GeneralContext } from '../../context/general-context'
import Seo from './seo'

const Header = styled.header`
  background: linear-gradient(45deg, rgb(0, 0, 0), rgb(137, 33, 33));
  margin-bottom: 1.45rem;
  margin: '0 auto';
  max-width: 960;
  height: 85;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 7vw;
  color: #FFF;
  user-select: none;
`

const HeaderComponent = () => {
  const { isLoggedIn, user, setShowNavbar } = useContext(GeneralContext)

  return (
    <Headroom
      onPin={() => setShowNavbar(true)}
      onUnpin={() => setShowNavbar(false)}
      style={{ zIndex: 999 }}
    >
      <Seo />
      <Header>
        <Link
          to='/'
          style={{
            color: 'white',
            textDecoration: 'none'
          }}
        >
          <img
            src={Img}
            alt='Logo ByZuret - Jeans'
            style={{ height: '73px' }}
          />
        </Link>
        {isLoggedIn && user.role === 'admin' && (
          <div>
            {user.fullname}
          </div>
        )}
      </Header>
    </Headroom>
  )
}

HeaderComponent.propTypes = {
  siteTitle: PropTypes.string
}

HeaderComponent.defaultProps = {
  siteTitle: ''
}

export default HeaderComponent
