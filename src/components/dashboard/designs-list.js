import React, { useContext } from 'react'
import { BeatLoader } from 'react-spinners'
import styled from 'styled-components'
import InfiniteScroll from 'react-infinite-scroll-component'
import { DashboardContext } from '../../context/dashboard-context'

const Item = styled.div`
  height: 100px;
  border-bottom: 1px solid #c5c5c5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 22px;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
`

const DesignsList = () => {
  const { designs, loadMore, hasMore, openEditor, onDeleteDesign, total } = useContext(DashboardContext)

  return (
    <div>
      <InfiniteScroll
        dataLength={designs.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<BeatLoader color='#3b3b3b' loading />}
      >
        {designs.map(design => (
          <Item key={design._id}>
            <button onClick={() => openEditor(design)}>
              <i className='icon-pencil2' />
            </button>
            <span>{design.title}</span>
            {design.images.length > 0 && <img src={design.images[0].secure_url} alt='diseño pantalon' width={30} />}
            <button onClick={() => onDeleteDesign(design)}>
              DELETE
            </button>
          </Item>
        ))}
      </InfiniteScroll>
      <div>
              Mostrando {designs.length} diseños de {total}
      </div>
    </div>
  )
}
export default DesignsList
