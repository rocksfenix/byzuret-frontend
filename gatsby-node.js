/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')

exports.onCreateWebpackConfig = ({ getConfig, stage }) => {
  const config = getConfig()
  if (stage.startsWith('develop') && config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-dom': '@hot-loader/react-dom'
    }
  }
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === 'RestApiApiDesigns') {
    // console.log('*****>>>>  ', node.designs.length)
    const { createNodeField } = actions
    node.designs.forEach(design => (
      createNodeField({
        node,
        name: 'slug',
        value: `/design/${design._id}`
      })
    ))
  }
}

exports.createPages = async ({ graphql, actions }) => {
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const result = await graphql(`
    query {
      allRestApiApiDesigns {
        edges {
          node {
            designs {
              _id
            }
          }
        }
      }
    }
  `)

  const { createPage } = actions

  result.data.allRestApiApiDesigns.edges[0].node.designs.forEach((design) => {
    createPage({
      path: `/design/${design._id}`,
      component: path.resolve('./src/templates/design.js'),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: `/design/${design._id}`,
        _id: design._id
      }
    })
  })

  // console.log(JSON.stringify(result, null, 4))
}
