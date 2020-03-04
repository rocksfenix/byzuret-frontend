import React, { useContext } from 'react'
import { BeatLoader } from 'react-spinners'
import styled from 'styled-components'
import InfiniteScroll from 'react-infinite-scroll-component'
import { DashboardContext } from '../../context/dashboard-context'
import { Table, Button, Icon } from 'semantic-ui-react'
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
    <InfiniteScroll
      dataLength={designs.length}
      next={loadMore}
      hasMore={hasMore}
      loader={<BeatLoader color='#3b3b3b' loading />}
    >
      <Table singleLine celled inverted selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Images</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
            {designs.map(design => (
              <Table.Row  key={design._id} onDoubleClick={() => openEditor(design)}>
                <Table.Cell>$ {design.price}.00</Table.Cell>
                <Table.Cell>{design.title}</Table.Cell>
                <Table.Cell>{design.images.length > 0 && <img src={design.images[0].secure_url} alt='diseño pantalon' width={30} />}</Table.Cell>
                <Table.Cell>
                  <Button icon basic color='red'>
                    <Icon name='trash alternate' />
                  </Button>
                </Table.Cell>
              </Table.Row>
              // <Item>
              //   <button onClick={() => openEditor(design)}>
              //     <i className='icon-pencil2' />
              //   </button>
              //   <span>{design.title}</span>
              //   {design.images.length > 0 && <img src={design.images[0].secure_url} alt='diseño pantalon' width={30} />}
              //   <button onClick={() => onDeleteDesign(design)}>
              //     DELETE
              //   </button>
              // </Item>
            ))}
              
        </Table.Body>
      </Table>
    </InfiniteScroll>
  )
}
export default DesignsList
