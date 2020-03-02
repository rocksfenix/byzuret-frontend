// Config env var .env
require('dotenv').config()

const DESINGS_API = process.env.DESINGS_API || 'http://localhost:4000/designs'

module.exports = {
  siteMetadata: {
    title: 'ByZuret Jeans',
    description: 'Surte tu tienda de la ultima moda con grandes estandares de calidad al mejor precio.',
    author: '@ByZuret'
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`
      }
    },
    // 'gatsby-transformer-sharp',
    // 'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'ByZuret',
        start_url: '/',
        background_color: '#071b4d',
        theme_color: '#071b4d',
        display: 'minimal-ui',
        icon: 'src/images/byzuret-icon.png' // This path is relative to the root of the site.
      }
    },

    // This plugin exists only once but can consume an array of endpoints
    {
      resolve: 'gatsby-source-rest-api',
      options: {
        endpoints: [DESINGS_API]
      }
    },
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: { prefixes: ['/dashboard/*'] }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
}
