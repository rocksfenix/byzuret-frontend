import React from 'react'
import Layout from '../components/layout'
import ModalDesignEditor from '../components/dashboard/modal-design-editor'
import DesingsList from '../components/dashboard/designs-list'
import TopPanel from '../components/dashboard/top-panel'
import Container from '../components/dashboard/container'
import Context from '../context/dashboard-context'

const App = () => (
  <Context>
    <Layout title='Dashboard'>
      <ModalDesignEditor />
      <Container>
        <TopPanel />
        <DesingsList />
      </Container>
    </Layout>
  </Context>
)

export default App
