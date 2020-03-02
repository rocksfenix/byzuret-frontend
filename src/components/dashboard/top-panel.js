import React, { useContext } from 'react'
import styled from 'styled-components'
import { DashboardContext } from '../../context/dashboard-context'

const Panel = styled.div`
  width: 100%;
  background-color: orange;
  height: 100px;
`

const TopPanel = () => {
  const { designs, setTitle, title, onPostDesign, total } = useContext(DashboardContext)

  return (
    <Panel>
      <input
        type='text' onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <button onClick={onPostDesign}>
        create Design
      </button>
      <div>
        Mostrando {designs.length} diseños de {total}
      </div>
    </Panel>
  )
}

export default TopPanel
