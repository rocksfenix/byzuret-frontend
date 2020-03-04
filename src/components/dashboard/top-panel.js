import React, { useContext } from 'react'
import styled from 'styled-components'
import { DashboardContext } from '../../context/dashboard-context'
import { Input } from 'semantic-ui-react'

const Panel = styled.div`
  width: 100%;
  background-color: #353535;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1em;
`

const TopPanel = () => {
  const { designs, setTitle, title, onPostDesign, total } = useContext(DashboardContext)

  return (
    <Panel>
      <Input
          action={{
            color: 'blue',
            labelPosition: 'left',
            icon: 'check',
            content: 'Create New Design',
            onClick: onPostDesign
          }}
          actionPosition='right'
          placeholder='Design name'
          defaultValue='52.03'
          value={title}
          size='big'
          onChange={(e) => setTitle(e.target.value)}
        />
    </Panel>
  )
}

export default TopPanel
