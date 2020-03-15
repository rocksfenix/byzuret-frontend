/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { loadReCaptcha } from 'react-recaptcha-v3'
import Footer from './footer'
import Header from './header'
import GeneralContext from '../../context/general-context'
import BurguerMenu from './burger-menu'

// Icons
import '../../styles/icomoon/style.css'
import './layout.css'

const Layout = ({ children }) => {
  useEffect(() => {
    // Config ReCaptcha
    loadReCaptcha('6LfC4-AUAAAAACh7UUoO2vAripfN-dynRdao2s0s')
  })

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <GeneralContext>
      <BurguerMenu />
      <Header siteTitle={data.site.siteMetadata.title} />
      <main>{children}</main>
      <Footer>
        <a href='https://byzuret.com'>
            ByZuret - Jeans
          <span>
            © {new Date().getFullYear()}
          </span>
        </a>
      </Footer>
    </GeneralContext>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
