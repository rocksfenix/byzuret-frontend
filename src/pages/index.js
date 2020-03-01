import React from 'react'
import styled from 'styled-components'
import Layout from '../components/layout'
import Grid from '../components/grid'

const Box = styled.div`
  width: 100%;
  height: 300px;
  background: gray;
`

export default () => {
  return (
    <Layout>
      <Grid>
        <Box>Hey 1</Box>
        <Box>Hey 2</Box>
        <Box>Hey 3</Box>
        <Box>Hey 4</Box>
        <Box>Hey 5</Box>
        <Box>Hey 6</Box>
        <Box>Hey 7</Box>
        <Box>Hey 8</Box>
        <Box>Hey 9</Box>
      </Grid>
    </Layout>
  )
}
