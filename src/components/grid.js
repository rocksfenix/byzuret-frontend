import styled from 'styled-components'

const Grid = styled.section`
  display: grid;
  grid-template-rows: auto;
  max-width: 1200px;
  width: 80vw;
  margin: 1em auto;
  grid-column-gap: 2em;
  grid-row-gap: 4em;
  grid-template-columns: 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 15px;

  @media(min-width: 992px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 10px;
    grid-row-gap: 15px;
  }

  @media(min-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: 10px;
    grid-row-gap: 15px;
  }

`

export default Grid
