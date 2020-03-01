import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import Headroom from 'react-headroom'
import Img from '../../images/logo-byzuret.svg'

const Header = () => (
  <Headroom>
    <header
      style={{
        // background: 'linear-gradient(45deg, rgb(0, 0, 0), #02287d)',
        background: 'linear-gradient(45deg, rgb(0, 0, 0), rgb(59, 59, 59))',
        marginBottom: '1.45rem'
      }}
    >
      <div
        style={{
          margin: '0 auto',
          maxWidth: 960,
          height: 100
        }}
      >
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
            style={{ height: '70px', marginTop: 10 }}
          />
        </Link>
      </div>
    </header>
  </Headroom>
)

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ''
}

export default Header
