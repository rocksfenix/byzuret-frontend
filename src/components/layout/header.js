import React from 'react'
import { Link, navigate } from 'gatsby'
import PropTypes from 'prop-types'
import Headroom from 'react-headroom'
import Img from '../../images/logo-byzuret.svg'
import Context, { DashboardContext } from '../../context/dashboard-context'
import { getIsLoggedIn, getCurrentUser } from '../../util/auth'
import Seo from './seo'

const Header = () => {
  const isLoggedIn = getIsLoggedIn()
  const user = getCurrentUser()

  return (
    <Headroom>
      <Seo />
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
            height: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
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
          {isLoggedIn && (
            <Context>
              <DashboardContext.Consumer>
                {({ onLoggout, onRebuildApp }) => (
                  <div>
                    <button onClick={() => navigate('/dashboard')}>Dashboard</button>
                    <span>
                      {user.fullname}
                    </span>
                    <button onClick={onLoggout}>Loggout</button>
                    <button onClick={onRebuildApp}>Re-Build</button>
                  </div>
                )}
              </DashboardContext.Consumer>
            </Context>
          )}
        </div>
      </header>
    </Headroom>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ''
}

export default Header
