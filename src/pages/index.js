import React from 'react'
import styled from 'styled-components'
import Layout from '../components/layout'
import Grid from '../components/grid'
import { graphql, Link } from 'gatsby'
import CardDesign from '../components/card-design'

const Box = styled.div`
  width: 100%;
  height: 300px;
  background: gray;
`

export default (props) => {
  const { designs } = props.data.allRestApiDesigns.edges[0].node

  return (
    <Layout>
      <Grid>
        {designs.map(design => (
          <CardDesign key={design._id} design={design} />
        ))}
      </Grid>
    </Layout>
  )
}

export const pageQuery = graphql`
  {
    allRestApiDesigns {
      edges {
        node {
          designs {
            _id
            title
            images {
              _id
              secure_url
            }
          }
        }
      }
    }
  }
`
